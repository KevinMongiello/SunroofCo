import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class AiService {
  private readonly anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  async ask(message: string) {
    try {
      const response = await this.anthropic.beta.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: Number(process.env.MAX_AI_TOKENS) || 5000,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        mcp_servers: [
          {
            type: 'url',
            name: 'sunroof',
            url: process.env.SUNROOF_MCP_URL!,
          },
        ],
        tools: [
          {
            type: 'mcp_toolset',
            mcp_server_name: 'sunroof',
          },
        ],
        betas: ['mcp-client-2025-11-20'],
      });

      const text = response.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n\n');

      return text;
    } catch(error) {
      if (error instanceof Anthropic.APIError) {
        console.error('Anthropic API error', {
          status: error.status,
          message: error.message,
        });

        throw new ServiceUnavailableException(
          'AI service is temporarily unavailable.',
        );
      }

      console.error('Unexpected AI error', error);

      throw error;
    }
  }
}
