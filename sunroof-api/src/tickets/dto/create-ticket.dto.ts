import { IsArray, IsIn, IsNumber, IsOptional, IsString, IsUUID, Matches, Min } from 'class-validator';

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
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(TICKET_STATUSES)
  status?: TicketStatus;

  @IsOptional()
  @IsIn(TICKET_PRIORITIES)
  priority?: TicketPriority;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  scheduledStart?: string;
  
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  scheduledEnd?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  completedAt?: string;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedHours?: number;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  userIds?: string[];
}
