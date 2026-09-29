import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTimecardDto } from './dto/create-timecard.dto.js';
import { UpdateTimecardDto } from './dto/update-timecard.dto.js';

export type TimeCardSortFields = keyof UpdateTimecardDto;
export type TimecardSortDirection = 'asc' | 'desc';
interface findAllOptions {
  includeUser?: boolean;
  limit?: string;
  orderBy?: TimeCardSortFields;
  orderDir?: TimecardSortDirection;
}

@Injectable()
export class TimecardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options: findAllOptions = {}) {
    const { limit, includeUser, orderBy, orderDir } = options;
    let query = this.prisma.db.orm.public.TimeCard;
    if (includeUser) query = query.include('user');
    if (limit) query = query.limit(Number(limit));
    if (orderBy)
      query = query.orderBy((timecard) =>
        timecard[orderBy][orderDir || 'asc'](),
      );
    return await query.all();
  }

  findOne(id: string) {
    return this.prisma.db.orm.public.TimeCard.first({ id });
  }

  create(dto: CreateTimecardDto) {
    return this.prisma.db.orm.public.TimeCard.create(dto);
  }

  update(id: string, dto: UpdateTimecardDto) {
    return this.prisma.db.orm.public.TimeCard.where({ id }).update(dto);
  }

  delete(id: string) {
    return this.prisma.db.orm.public.TimeCard.where({ id }).delete();
  }
}
