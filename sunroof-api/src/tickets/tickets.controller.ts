import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ticketsService.delete(id);
  }
}
