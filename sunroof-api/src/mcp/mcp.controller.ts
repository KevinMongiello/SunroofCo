import { All, Controller, Req, Res } from '@nestjs/common';
import { McpService } from './mcp.service.js';
import type { Request, Response } from 'express';

@Controller('mcp')
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  @All()
  handleMcp(@Req() req: Request, @Res() res: Response) {
    return this.mcpService.handler(req, res, req.body);
  }
}
