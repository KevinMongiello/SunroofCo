import { Module } from '@nestjs/common';
import { McpService } from './mcp.service.js';
import { McpController } from './mcp.controller.js';
import { UsersModule } from '../users/users.module.js';
import { ReportsModule } from '../reports/reports.module.js';
import { ProjectsModule } from '../projects/projects.module.js';
import { TicketsModule } from '../tickets/tickets.module.js';
import { TimecardsModule } from '../timecards/timecards.module.js';

@Module({
  imports: [UsersModule, ReportsModule, ProjectsModule, TicketsModule, TimecardsModule],
  providers: [McpService],
  controllers: [McpController]
})
export class McpModule {}
