import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsInt, Min, Max } from 'class-validator';
import type {
  TimeCardSortFields,
  TimecardSortDirection,
} from '../timecards.service.js';

export class TimecardsQueryDto {
  @IsOptional()
  @IsIn(['true', 'false'])
  includeUser?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  limit?: number;

  @IsOptional()
  @IsIn(['userId', 'date', 'hoursWorked'])
  orderBy?: TimeCardSortFields;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  orderDir?: TimecardSortDirection;
}
