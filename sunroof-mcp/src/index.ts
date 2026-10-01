import { McpServer, createMcpHandler } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { createServer } from 'node:http';

function createMcpServer() {
  const server = new McpServer({
    name: 'sunroof-mcp',
    version: '1.0.0',
  });

  server.registerTool(
    'get_weekly_hours',
    {
      description: 'Returns the weekly hours worked by a user.',
      inputSchema: z.object({
        userId: z.string(),
      }),
    },
    async ({ userId }) => {
      const hours = userId === '42' ? 38.5 : 0;

      return {
        content: [
          {
            type: 'text',
            text: `${hours}`,
          },
        ],
      };
    },
  );

  return server;
}

const handler = createMcpHandler(createMcpServer);

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.statusCode = 400;
    res.end('Missing URL');
    return;
  }

  const url = new URL(req.url, 'http://localhost:3000');

  if (url.pathname !== '/mcp') {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  const bodyChunks: Buffer[] = [];

  for await (const chunk of req) {
    bodyChunks.push(chunk);
  }

  const body =
    bodyChunks.length > 0 ? Buffer.concat(bodyChunks) : undefined;

  const request = new Request(`http://localhost:3000${req.url}`, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body:
      req.method === 'GET' || req.method === 'HEAD'
        ? undefined
        : body,
  });

  const response = await handler.fetch(request);

  res.statusCode = response.status;

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (response.body) {
    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      res.write(Buffer.from(value));
    }
  }

  res.end();
});

httpServer.listen(3000, () => {
  console.log('MCP server running at http://localhost:3000/mcp');
});