#!/usr/bin/env bash
set -Eeuo pipefail

# Always use a fresh, container-local database. Never seed an external DATABASE_URL.
export PGDATA
PGDATA=$(mktemp -d /tmp/sunroof-postgres.XXXXXX)
export DATABASE_URL='postgresql://sunroof@127.0.0.1:5432/sunroof'
unset PGHOST PGPORT PGUSER PGPASSWORD PGSERVICE PGSERVICEFILE

if [[ -z "${SUNROOF_MCP_URL:-}" && -n "${RENDER_EXTERNAL_URL:-}" ]]; then
  export SUNROOF_MCP_URL="${RENDER_EXTERNAL_URL%/}/mcp"
fi

postgres_pid=''
api_pid=''
cleanup() {
  trap - EXIT TERM INT
  if [[ -n "$api_pid" ]]; then kill -TERM "$api_pid" 2>/dev/null || true; fi
  if [[ -n "$postgres_pid" ]]; then kill -TERM "$postgres_pid" 2>/dev/null || true; fi
  if [[ -n "$api_pid" ]]; then wait "$api_pid" 2>/dev/null || true; fi
  if [[ -n "$postgres_pid" ]]; then wait "$postgres_pid" 2>/dev/null || true; fi
}
trap cleanup EXIT
trap 'exit 143' TERM
trap 'exit 130' INT

initdb -D "$PGDATA" -U sunroof --auth-local=trust --auth-host=trust --encoding=UTF8 --no-locale
# Only the API in this container can connect; Postgres is not exposed publicly.
postgres -D "$PGDATA" -h 127.0.0.1 -k "$PGDATA" \
  -c shared_buffers=32MB -c max_connections=20 &
postgres_pid=$!

ready=false
for ((attempt=0; attempt<60; attempt++)); do
  if pg_isready -h 127.0.0.1 -U sunroof -d postgres >/dev/null 2>&1; then
    ready=true
    break
  fi
  if ! kill -0 "$postgres_pid" 2>/dev/null; then
    echo 'Postgres exited before becoming ready.' >&2
    exit 1
  fi
  sleep 1
done
if [[ "$ready" != true ]]; then
  echo 'Timed out waiting for Postgres.' >&2
  exit 1
fi

createdb -h 127.0.0.1 -U sunroof sunroof
npm run db:migrate
node dist/prisma/seed.js
node dist/main.js &
api_pid=$!

# Stop the container if either process exits; cleanup stops the other process.
set +e
wait -n "$postgres_pid" "$api_pid"
status=$?
set -e
if [[ "$status" == 0 ]]; then status=1; fi
exit "$status"
