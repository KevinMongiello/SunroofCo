# SunRoof API

NestJS API with PostgreSQL and MCP tools for the AI chat.

## Run locally with Docker

Start Docker Desktop. In `sunroof-api`, copy `.env.example` to `.env` if needed
and set `ANTHROPIC_API_KEY`, then run:

```sh
docker compose up --build
```

API: `http://localhost:3000` · Health check: `/health`

Docker runs the API and database together. **Data resets to the seed on every
container startup.** For local AI tool calls, set `SUNROOF_MCP_URL` to a publicly
reachable HTTPS URL ending in `/mcp`.

## Run locally without Docker

Install Node.js 24 and PostgreSQL 15+, and create a database. In `sunroof-api`,
copy `.env.example` to `.env` if needed and set `DATABASE_URL` to your database.

```sh
npm ci
npm run db:migrate
npx tsx src/prisma/seed.ts
npm run start:dev
```

The seed replaces existing data. The API runs at `http://localhost:3000`.
**The AI Chatbox will not work with a localhost-only API**, because Anthropic
needs a publicly reachable MCP endpoint.

## Render.com

Create a Blueprint using the root `render.yaml`. Set `ANTHROPIC_API_KEY` and
`CORS_ORIGINS` (your frontend origin, without a trailing slash). The MCP URL is
configured automatically.
