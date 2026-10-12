# SunRoof API demo

The Docker image runs the Nest API and a disposable Postgres 15 database in one
container. Each startup creates a fresh local database, applies the committed
migrations, loads `src/prisma/seed.ts`, and then starts the API. Edits made during
a demo last only until the container restarts. No database service or disk is needed.

## Deploy to Render

1. Commit and push the repository changes, including the root `render.yaml`,
   `sunroof-api/Dockerfile`, and `sunroof-api/docker/start-demo.sh`.
2. In Render, select **New → Blueprint** and connect the repository and branch.
   Use `render.yaml` as the Blueprint path.
3. Enter the requested environment values:
   - `ANTHROPIC_API_KEY`: your Anthropic key.
   - `CORS_ORIGINS`: the frontend's origin, without a trailing slash. For local
     Vite development, use `http://localhost:5173`. Multiple origins can be
     comma-separated.
4. Review and deploy the Blueprint. It declares one paid Docker web service (`0.5c-512mb`: 0.5 CPU, 512 MB RAM).
5. Open `https://<assigned-service-name>.onrender.com/health`; expect
   `{"status":"ok"}`. Startup logs should show migrations, `Seed complete`, and
   the Nest server starting.
6. Set the frontend's `VITE_API_URL` to that API URL, without a trailing slash.
   Restart local Vite, or rebuild/redeploy the hosted frontend.

The startup script derives `SUNROOF_MCP_URL` from Render's own external service
URL. You can explicitly override it if necessary. `DATABASE_URL` is always set
by the demo startup script to its own local database, so it cannot accidentally
seed a separately configured database.

The paid service avoids the Free tier's idle spin-down. Restarts and redeploys
still load fresh seed data. See [Render compute plans](https://render.com/docs/blueprint-spec#plan)
and [pricing](https://render.com/pricing).

### If you already created a Render web service

Use these settings instead of creating a second service through a Blueprint:

| Setting | Value |
| --- | --- |
| Runtime | Docker |
| Root Directory | Leave blank (repository root) |
| Dockerfile Path | `sunroof-api/Dockerfile` |
| Docker Build Context Directory | `sunroof-api` |
| Docker Command | Leave blank (use the image default) |
| Pre-Deploy Command | Leave blank (initialization runs at startup) |
| Health Check Path | `/health` |

Set the environment variables above and deploy the updated branch. A separate
Postgres service or attached disk is not used by this image.

## Run locally

Start Docker Desktop. From `sunroof-api`, create `.env` from `.env.example` if
needed, fill in your Anthropic key, and run:

```sh
docker compose up --build -d
docker compose logs -f api
```

The API is at `http://localhost:3000`. Only the API port is published; Postgres
listens on loopback inside the container. For local AI tool calls,
`SUNROOF_MCP_URL` must point to an HTTPS endpoint reachable by Anthropic (such as
your deployed Render API); Anthropic cannot reach your laptop's localhost.

## Implementation

- Node 24 builds and runs the API; the image retains Prisma CLI dependencies.
- The unprivileged `node` user runs both Postgres and the API.
- `tini` and the startup script handle child processes and shutdown; the container
  stops if either server exits.
- Postgres initializes in a fresh temporary directory on every startup.
- `/health` is a liveness endpoint, not a database query.
- The seed has fixed September–November 2026 dates; update those for later demos.
- `.dockerignore` keeps local `.env` files out of the image.

[Render Docker docs](https://render.com/docs/docker) ·
[Render Blueprints](https://render.com/docs/infrastructure-as-code)
