# Technical Architecture

Phase 1 Technical Architecture is now defined and ready to drive the engineering backlog.

## Architecture index

- [Phase 1 Technical Architecture](./phase-1-technical-architecture.md)
- [System Context & Module Boundaries](./system-context.md)
- [Domain Model](./domain-model.md)
- [Authentication, Authorization & Tenant Isolation](./authz-and-tenancy.md)
- [API & Integration Architecture](./api-and-integration.md)
- [Operations, Security & Quality Baseline](./operations-security-and-quality.md)

## Accepted architecture decisions

- [ADR-0002 — TypeScript Monorepo](../decisions/ADR-0002-typescript-monorepo.md)
- [ADR-0003 — Modular Monolith First](../decisions/ADR-0003-modular-monolith-first.md)
- [ADR-0004 — PostgreSQL + Prisma](../decisions/ADR-0004-postgresql-and-prisma.md)
- [ADR-0005 — Web-First Next.js](../decisions/ADR-0005-web-first-nextjs.md)
- [ADR-0006 — Policy-Based Authorization](../decisions/ADR-0006-policy-based-authorization.md)

## Implementation baseline

- TypeScript monorepo
- pnpm + Turborepo
- Next.js web app
- NestJS modular-monolith API
- worker process for async jobs
- PostgreSQL + Prisma
- Redis + BullMQ
- S3-compatible object storage
- REST/JSON + OpenAPI
- GitHub Actions CI/CD
- local / test / stage / production environments

## Non-negotiable product constraints

Architecture must preserve `docs/product/phase-1-handoff.md`.

In particular:

- Artist owns product price.
- Negarin reviews publication quality, not Artist price.
- Growth is not purchasable.
- organization/Partner roles are relationship-scoped.
- Corporate Buyer and Export Partner cannot bypass Negarin.
- Partner payment and Artist settlement are separate.
- Export funds stay protected until the required delivery/quality state.
- no legal Escrow claim is hardcoded.
- unresolved FX/legal/dispute/settlement details stay abstract until accepted.

## Next step

Convert the accepted architecture into:

1. Engineering Epic/Feature/Story backlog
2. Sprint 0 / Foundation plan
3. repository/application scaffolding
