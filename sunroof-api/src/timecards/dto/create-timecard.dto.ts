import { IsNumber, IsUUID, Max, Min } from 'class-validator';
import { IsDateOnly } from '../../validation/is-date-only.js';

export class CreateTimecardDto {
  @IsUUID()
  userId: string;

  @IsDateOnly()
  date: string;

  @IsNumber()
  @Min(0)
  @Max(8)
  hoursWorked: number;
}
