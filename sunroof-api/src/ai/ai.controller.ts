import { AskDto } from './dto/ask.dto.js';
import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service.js';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  ask(@Body() dto: AskDto) {
    return this.aiService.ask(dto.message);
  }
}
