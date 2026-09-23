import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service.js';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  
  @Get('dashboard')
  dashboard() {
    return this.reportsService.dashboard();
  }

  @Get('user-hours')
  userHours(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportsService.userHours(startDate, endDate);
  }
}