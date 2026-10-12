// src/mcp/mcp.service.ts

import { Injectable } from '@nestjs/common';
import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { toNodeHandler } from '@modelcontextprotocol/node';
import * as z from 'zod/v4';
import { ProjectsService } from '../projects/projects.service.js';

@Injectable()
export class McpService {
  readonly handler;

  constructor(private readonly projectService: ProjectsService) {
    const webHandler = createMcpHandler(() => {
      const server = new McpServer({
        name: 'sunroof-mcp',
        version: '1.0.0',
      });

      server.registerTool(
        'list_projects',
        {
          description:
            'List all projects with their IDs, names, and statuses. Use this to discover available projects without knowing a name. Use get_project_details for a project’s full details.',
          inputSchema: z.object({}),
        },
        async () => {
          const projects = await this.projectService.findAll();
          const results = projects.map(({ id, name, status }) => ({
            id,
            name,
            status,
          }));

          return {
            content: [{ type: 'text', text: JSON.stringify(results) }],
          };
        },
      );

      server.registerTool(
        'find_project',
        {
          description:
            'Find projects via partial, case-insensitive name match.',
          inputSchema: z.object({
            name: z.string().trim().min(1),
          }),
        },
        async ({ name }) => {
          const results = (await this.projectService.matchByName(name)).map(
            (res) => ({ id: res.id, name: res.name, status: res.status }),
          );

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(results),
              },
            ],
          };
        },
      );
      server.registerTool(
        'get_project_details',
        {
          description:
            'Gets full project details by project ID, including assigned users and related tickets. Use this when you need project context for summaries, completed or upcoming work, status, or staffing.',
          inputSchema: z.object({
            projectId: z.uuid(),
          }),
        },
        async ({ projectId }) => {
          const results =
            await this.projectService.getProjectDetails(projectId);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(results),
              },
            ],
          };
        },
      );

      return server;
    });

    this.handler = toNodeHandler(webHandler);
  }
}
