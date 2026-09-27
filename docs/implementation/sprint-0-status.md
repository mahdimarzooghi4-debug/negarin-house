# Sprint 0 Implementation Status

Parent: #5 — Platform Foundation / Sprint 0

Branch: `feat/sprint-0-platform-foundation`

Status: **IN PROGRESS**

This file records what is actually implemented. A checked planning item must not be interpreted as production-ready unless its acceptance criteria and CI evidence are complete.

## Current implementation slice

### Implemented in code

- [x] pnpm workspace + Turborepo task graph
- [x] shared strict TypeScript baseline
- [x] ESLint baseline
- [x] Next.js web application shell
- [x] Phase 1 portal route placeholders
- [x] global web loading/error states
- [x] NestJS + Fastify API shell
- [x] `/api/v1/health` and `/api/v1/ready`
- [x] OpenAPI bootstrap outside production
- [x] request correlation ID
- [x] canonical API error envelope
- [x] Prisma 7 configuration + foundation migration
- [x] PostgreSQL readiness check
- [x] BullMQ worker shell + Redis connection parser
- [x] typed environment configuration
- [x] shared contracts foundation
- [x] authorization context / deny-by-default foundation
- [x] canonical role registry
- [x] exact Partner locale registry + RTL/LTR resolver
- [x] bidi-safe business-ID helper
- [x] provider-neutral storage interface
- [x] observability redaction + audit-event contract
- [x] shared UI tokens + primary/secondary Button primitive
- [x] deterministic test utility
- [x] local PostgreSQL + Redis Docker services
- [x] baseline GitHub Actions quality workflow

### Still required before Sprint 0 can close

- [ ] commit deterministic `pnpm-lock.yaml` and switch CI to frozen install
- [ ] verify the complete workspace through GitHub Actions
- [ ] API integration-test harness
- [ ] web E2E harness and a passing smoke test
- [ ] API → BullMQ enqueue path and end-to-end sample job
- [ ] concrete S3-compatible adapter/local object-storage setup and signed URL smoke test
- [ ] OpenTelemetry-compatible runtime wiring
- [ ] error tracking adapter implementation boundary
- [ ] reusable Audit logger/sink beyond the event contract
- [ ] component preview strategy for `@negarin/ui`
- [ ] Stage deployment/infrastructure skeleton
- [ ] developer bootstrap documentation verified from a clean environment
- [ ] migration apply/reset validation in CI, not schema validation only
- [ ] security/dependency scan in CI

## Product safety check

This implementation slice does **not** introduce:

- Artist product-price control by Admin
- FX formulas
- international fee formulas
- legal Escrow behavior
- Growth algorithm
- dispute adjudication
- direct Corporate/Export Partner → Artist payment

The unresolved Product Decisions remain abstract.

## Merge policy for this branch

This branch may be merged as a Sprint 0 foundation slice only after CI is green and the PR review finds no architecture or product-rule regression.

Issue #5 remains open until all Sprint 0 exit criteria are satisfied.
