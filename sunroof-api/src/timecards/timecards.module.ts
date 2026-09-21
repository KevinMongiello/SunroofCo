import { Module } from '@nestjs/common';
import { TimecardsService } from './timecards.service.js';
import { TimecardsController } from './timecards.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [TimecardsService],
  controllers: [TimecardsController]
})
export class TimecardsModule {}
