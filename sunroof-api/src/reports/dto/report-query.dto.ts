import { IsDateOnly } from '../../validation/is-date-only.js';

export class ReportQueryDto {
  @IsDateOnly()
  startDate: string;

  @IsDateOnly()
  endDate: string;
}
