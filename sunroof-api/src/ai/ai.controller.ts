import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service.js';

@Controller('ai')
export class AiController {
  constructor (private readonly aiService: AiService) {}

  @Post()
  ask(@Body('message') message: string) {
    return this.aiService.ask(message);
  }
}
