import { IsDateOnly } from '../../validation/is-date-only.js';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateIf,
} from 'class-validator';

export const PROJECT_STATUSES = [
  'PLANNED',
  'ACTIVE',
  'ON_HOLD',
  'COMPLETED',
  'ARCHIVED',
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export class CreateProjectDto {
  @IsString()
  @Matches(/\S/, { message: 'name must not be blank' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsIn(PROJECT_STATUSES)
  status?: ProjectStatus;

  @IsOptional()
  @IsDateOnly()
  startDate?: string;

  @IsOptional()
  @IsDateOnly()
  endDate?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @IsUUID('all', { each: true })
  userIds?: string[];
}
