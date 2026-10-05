import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.db.orm.public.Ticket.all();
  }

  findOne(id: string) {
    return this.prisma.db.orm.public.Ticket.first({ id });
  }

  create(dto: CreateTicketDto) {
    return this.prisma.db.orm.public.Ticket.create(dto);
  }

  update(id: string, dto: UpdateTicketDto) {
    return this.prisma.db.orm.public.Ticket.where({ id }).update(dto);
  }

  delete(id: string) {
    return this.prisma.db.orm.public.Ticket.where({ id }).delete();
  }
}
