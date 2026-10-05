#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/31708ee3f670d3f57ae978761ce187e997be2262e2d81476990d5821480c1073/contract';
import startContract from '../../snapshots/31708ee3f670d3f57ae978761ce187e997be2262e2d81476990d5821480c1073/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/99c0b1b9b067a62de1fa5b9d875f95c4eb6e52681c89bccfad309e5adaf8dc70/contract';
import endContract from '../../snapshots/99c0b1b9b067a62de1fa5b9d875f95c4eb6e52681c89bccfad309e5adaf8dc70/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Project',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('endDate', 'date', { codecRef: { codecId: 'pg/date-string@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startDate', 'date', { codecRef: { codecId: 'pg/date-string@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PLANNED'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Project_status_check_1f998618',
            "\"status\" IN ('PLANNED', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Ticket',
        columns: [
          col('completedAt', 'date', { codecRef: { codecId: 'pg/date-string@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('estimatedHours', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('priority', 'text', {
            notNull: true,
            default: lit('MEDIUM'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('projectId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('scheduledEnd', 'date', { codecRef: { codecId: 'pg/date-string@1' } }),
          col('scheduledStart', 'date', { codecRef: { codecId: 'pg/date-string@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('BACKLOG'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Ticket_priority_check_8918b779',
            "\"priority\" IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')",
          ),
          checkExpression(
            'Ticket_status_check_6322b789',
            "\"status\" IN ('BACKLOG', 'SCHEDULED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'ARCHIVED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'UserProject',
        columns: [
          col('projectId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['userId', 'projectId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'UserTicket',
        columns: [
          col('ticketId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['userId', 'ticketId'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'TimeCard',
        column: col('ticketId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.createIndex({
        schema: 'public',
        table: 'Ticket',
        index: 'Ticket_projectId_idx_a96e4d92',
        columns: ['projectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'TimeCard',
        index: 'TimeCard_ticketId_idx_2fe526c3',
        columns: ['ticketId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserProject',
        index: 'UserProject_projectId_idx_a96e4d92',
        columns: ['projectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserProject',
        index: 'UserProject_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserTicket',
        index: 'UserTicket_ticketId_idx_2fe526c3',
        columns: ['ticketId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserTicket',
        index: 'UserTicket_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Ticket',
        foreignKey: {
          name: 'Ticket_projectId_fkey',
          columns: ['projectId'],
          references: { schema: 'public', table: 'Project', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TimeCard',
        foreignKey: {
          name: 'TimeCard_ticketId_fkey',
          columns: ['ticketId'],
          references: { schema: 'public', table: 'Ticket', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserProject',
        foreignKey: {
          name: 'UserProject_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserProject',
        foreignKey: {
          name: 'UserProject_projectId_fkey',
          columns: ['projectId'],
          references: { schema: 'public', table: 'Project', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserTicket',
        foreignKey: {
          name: 'UserTicket_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserTicket',
        foreignKey: {
          name: 'UserTicket_ticketId_fkey',
          columns: ['ticketId'],
          references: { schema: 'public', table: 'Ticket', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
