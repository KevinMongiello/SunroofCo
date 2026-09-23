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
    const userStats = await this.prisma.db.orm.public.User.aggregate((agg) => ({
      totalUsers: agg.count(),
    }));
    const timecardStats = await this.prisma.db.orm.public.TimeCard
    .where(t => t.date.gte(startOfWeek))
    .where(t => t.date.lt(startOfNextWeek))
    .aggregate((agg) => ({
      totalHoursThisWeek: agg.sum('hoursWorked'),
      totalTimecards: agg.count(),
    }));

    return { ...userStats, ...timecardStats, totalHoursThisWeek: timecardStats.totalHoursThisWeek ?? 0 };
  }
}
