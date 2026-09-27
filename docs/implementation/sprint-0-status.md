# Sprint 0 Implementation Status

Parent: #5 — Platform Foundation / Sprint 0

Branch: `feat/sprint-0-hardening`

Status: **HARDENING IN PROGRESS**

## Implemented in code

- [x] pnpm workspace + Turborepo task graph
- [x] deterministic `pnpm-lock.yaml`
- [x] strict TypeScript + ESLint baseline
- [x] Next.js web shell and Phase 1 route placeholders
- [x] NestJS + Fastify API shell, health/readiness, OpenAPI and error envelope
- [x] Prisma 7 + PostgreSQL migration baseline
- [x] shared BullMQ queue + worker + non-production API enqueue path
- [x] typed environment configuration
- [x] contracts/authz/i18n/domain foundations
- [x] concrete S3-compatible storage adapter + signed URL tests
- [x] structured redaction, AuditSink/ErrorTracker boundaries
- [x] OpenTelemetry Node SDK runtime boundary for API/worker
- [x] shared UI tokens + Button primitive
- [x] component preview strategy
- [x] local PostgreSQL + Redis + S3-compatible Docker services
- [x] API integration harness
- [x] Playwright web E2E smoke harness
- [x] Stage deployment contract
- [x] CI definition: frozen install, migrations, security audit, unit/integration/build/E2E

## Still required before Sprint 0 can close

- [x] regenerate lockfile after telemetry dependency changes
- [ ] make hardening PR CI fully green
- [ ] verify clean bootstrap through CI evidence
- [x] remove temporary lockfile bootstrap workflow before merge
- [ ] final PR review for architecture/product-rule regressions

## Product safety

This slice does not introduce Artist price control by Admin, FX/fee formulas, legal Escrow behavior, Growth algorithm, dispute adjudication, or direct Corporate/Export Partner → Artist payment.

## Closure rule

Issue #5 closes only after the hardening PR is green, reviewed, merged, and all Sprint 0 exit criteria are satisfied.
