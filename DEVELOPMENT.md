# Development Setup

Sprint 0 foundation is still in progress. These steps describe the intended local baseline and will be verified before Issue #5 is closed.

## Requirements

- Node.js 22.x
- pnpm 12.7.x
- Docker with Compose

## Local infrastructure

Copy the example environment:

```bash
cp .env.example .env
```

Start PostgreSQL and Redis:

```bash
docker compose up -d
```

## Install

```bash
pnpm install
```

The repository will switch to a frozen-lockfile install after `pnpm-lock.yaml` is generated and committed.

## Foundation commands

```bash
pnpm db:generate
pnpm db:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run all applications in development:

```bash
pnpm dev
```

Default local ports:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- API health: `http://localhost:4000/api/v1/health`
- API readiness: `http://localhost:4000/api/v1/ready`
- OpenAPI UI in non-production: `http://localhost:4000/docs`

## Product rule

Route visibility is never authorization. The route placeholders created in Sprint 0 are not security boundaries; authorization is implemented server-side under Epic E1.
