# Sprint 0 Implementation Status

Parent: #5 — Platform Foundation / Sprint 0

Branch: `feat/sprint-0-hardening`

Status: **PR #20 READY FOR MERGE — CI GREEN, REVIEW COMPLETE**

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
- [x] make hardening PR CI fully green — CI run #30, commit `b38fc9c64dc70988166015ba0422ee7d26602c49`
- [x] verify clean bootstrap through CI evidence — frozen install, Prisma generate/validate/reset/deploy succeeded in run #30
- [x] remove temporary lockfile bootstrap workflow before merge
- [x] final PR review for architecture/product-rule regressions — no product formulas or payment routing added; foundation job endpoint restricted to development/test

## CI evidence

GitHub Actions CI run #30 completed successfully on `b38fc9c64dc70988166015ba0422ee7d26602c49`: frozen install, Prisma generate/validate/reset/deploy, production dependency audit, lint, typecheck, unit/integration tests, build, Chromium install, and Playwright E2E all passed. This is PR evidence; Stage deployment and Release Approval remain separate steps.

## Product safety

This slice does not introduce Artist price control by Admin, FX/fee formulas, legal Escrow behavior, Growth algorithm, dispute adjudication, or direct Corporate/Export Partner → Artist payment.

## Closure rule

Issue #5 closes only after the hardening PR is green, reviewed, merged, and all Sprint 0 exit criteria are satisfied.
