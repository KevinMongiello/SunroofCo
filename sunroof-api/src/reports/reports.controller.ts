import { ReportQueryDto } from './dto/report-query.dto.js';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service.js';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard')
  dashboard() {
    return this.reportsService.dashboard();
  }

  @Get('labor')
  labor(@Query() query: ReportQueryDto) {
    if (query.startDate > query.endDate) {
      throw new BadRequestException('startDate must be on or before endDate');
    }
    return this.reportsService.labor(query.startDate, query.endDate);
  }

  @Get('user-hours')
  userHours(@Query() query: ReportQueryDto) {
    if (query.startDate > query.endDate) {
      throw new BadRequestException('startDate must be on or before endDate');
    }
    return this.reportsService.userHours(query.startDate, query.endDate);
  }
}
