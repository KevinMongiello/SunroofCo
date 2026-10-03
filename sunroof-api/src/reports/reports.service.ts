import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { getWeek } from './reports.util.js';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async userHours(startDate: string, endDate: string) {
    const users = await this.prisma.db.orm.public.User.include(
      'timecards',
      (timecards) =>
        timecards
          .where((t) => t.date.gte(startDate))
          .where((t) => t.date.lte(endDate))
          .sum('hoursWorked'),
    ).all();

    return users.map((user) => ({
      userId: user.id,
      name: user.name,
      email: user.email,
      totalHours: user.timecards ?? 0,
    }));
  }

  async dashboard() {
    const [startOfWeek, startOfNextWeek] = getWeek();
    const userStatsAgg = await this.prisma.db.orm.public.User.aggregate(
      (agg) => ({
        totalUsers: agg.count(),
      }),
    );
    const totalHoursAgg = await this.prisma.db.orm.public.TimeCard.where((t) =>
      t.date.gte(startOfWeek),
    )
      .where((t) => t.date.lt(startOfNextWeek))
      .aggregate((agg) => ({
        totalHoursThisWeek: agg.sum('hoursWorked'),
      }));

    const totalTimecardsAgg =
      await this.prisma.db.orm.public.TimeCard.aggregate((agg) => ({
        totalTimecards: agg.count(),
      }));

    return {
      totalUsers: userStatsAgg.totalUsers ?? 0,
      totalTimeCards: totalTimecardsAgg.totalTimecards ?? 0,
      totalHoursThisWeek: totalHoursAgg.totalHoursThisWeek ?? 0,
    };
  }

  async labor(startDate: string, endDate: string) {
    const users = await this.prisma.db.orm.public.User.all();

    const hoursByUser = await this.prisma.db.orm.public.TimeCard.where((t) =>
      t.date.gte(startDate),
    )
      .where((t) => t.date.lt(endDate))
      .groupBy('userId')
      .aggregate((agg) => ({
        hours: agg.sum('hoursWorked'),
      }));

    const hoursByUserId = new Map(
      hoursByUser.map(row => [
        row.userId,
        row.hours ?? 0
      ])
    );
    let totalHours = 0;
    let totalLaborCost = 0;
    let totalCustomerValue = 0;
    const reportUsers = users.map(user => {
      const hours = hoursByUserId.get(user.id) ?? 0;
      totalHours += hours;
      totalLaborCost += user.costPerHour * hours;
      totalCustomerValue += user.priceToCustomerPerHour * hours;
      return {
        ...user,
        hours,
        laborCost: hours * user.costPerHour,
        customerValue: hours * user.priceToCustomerPerHour
      };
    });

    return {
      totalHours,
      totalLaborCost,
      totalCustomerValue,
      grossMargin: totalCustomerValue - totalLaborCost,
      users: reportUsers
    };
  }
}
