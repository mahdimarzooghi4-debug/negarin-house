# Development Setup

Sprint 0 foundation is tracked in Issue #5. This document describes the reproducible local baseline.

## Requirements

- Node.js 22.x
- pnpm 12.7.x
- Docker with Compose

## Bootstrap

Copy the environment:

```bash
cp .env.example .env
```

Start PostgreSQL, Redis, and local S3-compatible storage:

```bash
docker compose up -d
```

MinIO endpoints:

- S3 API: `http://localhost:9000`
- Local console: `http://localhost:9001`

Create the local bucket `negarin-local` once through the MinIO console before exercising real uploads.

Install exactly from the committed lockfile:

```bash
pnpm install --frozen-lockfile
```

## Database

```bash
pnpm db:generate
pnpm db:validate
pnpm db:migrate:deploy
```

To reset a disposable development/test database:

```bash
pnpm db:migrate:reset:ci
```

Never run the reset command against Stage or Production.

## Quality

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

The API integration test requires PostgreSQL and Redis. The storage package validates signed S3-compatible URLs without requiring a network call.

## Run applications

```bash
pnpm dev
```

Default local endpoints:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- API health: `http://localhost:4000/api/v1/health`
- API readiness: `http://localhost:4000/api/v1/ready`
- OpenAPI UI in development/stage: `http://localhost:4000/docs`

The development/test foundation queue smoke endpoint is:

```text
POST /api/v1/foundation/jobs
```

It is intentionally unavailable in Stage and Production and is not a product API.

## Security rule

Route visibility is never authorization. Portal placeholders are not security boundaries; server-side authorization is implemented under Epic E1.
