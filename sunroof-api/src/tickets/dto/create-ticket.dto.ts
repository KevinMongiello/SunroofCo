import { IsDateOnly } from '../../validation/is-date-only.js';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';

export const TICKET_STATUSES = [
  'BACKLOG',
  'SCHEDULED',
  'IN_PROGRESS',
  'BLOCKED',
  'COMPLETED',
  'ARCHIVED',
] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];
export const TICKET_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export class CreateTicketDto {
  @IsUUID()
  projectId: string;

  @IsString()
  @Matches(/\S/, { message: 'title must not be blank' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsIn(TICKET_STATUSES)
  status?: TicketStatus;

  @ValidateIf((_object, value) => value !== undefined)
  @IsIn(TICKET_PRIORITIES)
  priority?: TicketPriority;

  @IsOptional()
  @IsDateOnly()
  scheduledStart?: string;

  @IsOptional()
  @IsDateOnly()
  scheduledEnd?: string;

  @IsOptional()
  @IsDateOnly()
  completedAt?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedHours?: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @IsUUID('all', { each: true })
  userIds?: string[];
}
