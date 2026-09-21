import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTimecardDto } from './dto/create-timecard.dto.js';
import { UpdateTimecardDto } from './dto/update-timecard.dto.js';

@Injectable()
export class TimecardsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.db.orm.public.TimeCard.all();
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
