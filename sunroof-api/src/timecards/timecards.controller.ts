import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TimecardsService } from './timecards.service.js';
import { CreateTimecardDto } from './dto/create-timecard.dto.js';
import type { UpdateTimecardDto } from './dto/update-timecard.dto.js';

@Controller('timecards')
export class TimecardsController {
  constructor(private readonly timecardsService: TimecardsService) {}

  @Get()
  findAll() {
    return this.timecardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timecardsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTimecardDto) {
    return this.timecardsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTimecardDto
  ) {
    return this.timecardsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.timecardsService.delete(id);
  }
}
