FROM node:24-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
RUN npm run build

FROM node:24-bookworm-slim AS runtime
RUN apt-get update \
    && apt-get install -y --no-install-recommends postgresql-15 tini \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV PATH="/usr/lib/postgresql/15/bin:${PATH}"
ENV NODE_ENV=production
ENV PORT=10000

# Keep Prisma's CLI dependencies for fresh demo database initialization.
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/package.json /app/package-lock.json ./
COPY --chown=node:node prisma.config.ts ./
COPY --chown=node:node src/prisma/contract.prisma src/prisma/contract.json src/prisma/contract.d.ts ./src/prisma/
COPY --chown=node:node migrations ./migrations

COPY --chown=node:node docker/start-demo.sh ./docker/start-demo.sh

USER node
EXPOSE 10000
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["bash", "/app/docker/start-demo.sh"]
