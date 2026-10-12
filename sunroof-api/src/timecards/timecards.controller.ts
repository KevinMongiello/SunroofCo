import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TimecardsService } from './timecards.service.js';
import { TimecardsQueryDto } from './dto/timecards-query.dto.js';
import { CreateTimecardDto } from './dto/create-timecard.dto.js';
import { UpdateTimecardDto } from './dto/update-timecard.dto.js';

@Controller('timecards')
export class TimecardsController {
  constructor(private readonly timecardsService: TimecardsService) {}

  @Get()
  async findAll(@Query() query: TimecardsQueryDto) {
    return await this.timecardsService.findAll({
      ...query,
      includeUser: query.includeUser === 'true',
    });
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.timecardsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTimecardDto) {
    return this.timecardsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTimecardDto,
  ) {
    return this.timecardsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.timecardsService.delete(id);
  }
}
