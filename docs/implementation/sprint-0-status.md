# Sprint 0 Implementation Status

Parent: #5 — Platform Foundation / Sprint 0

Delivery branch: `feat/sprint-0-hardening`

Status: **CLOSED — PR #20 MERGED; Issue #5 CLOSED**

PR head: `1f2da6fd3d6df1c9f143e1601647ed6843820628`

Merge commit: `cc17de2e52f41c0e0b71119783f669af09a9432d`

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

## Closure checklist

- [x] regenerate lockfile after telemetry dependency changes
- [x] make hardening PR CI fully green — CI run #31 on PR head `1f2da6fd3d6df1c9f143e1601647ed6843820628`
- [x] verify clean bootstrap through CI evidence — frozen install, Prisma generate/validate/reset/deploy succeeded in run #31
- [x] remove temporary lockfile bootstrap workflow before merge
- [x] verify the merged PR's product-safety statement and development/test-only foundation job boundary
- [x] record that PR #20 has no formal GitHub review submissions

## CI evidence

GitHub Actions [CI run #31](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36341285262) completed successfully on PR head `1f2da6fd3d6df1c9f143e1601647ed6843820628`. Frozen install, Prisma generate/validate/reset/deploy, production dependency audit, lint, typecheck, unit/integration tests, build, Chromium install, and Playwright E2E all passed. PR #20 was merged as `cc17de2e52f41c0e0b71119783f669af09a9432d`; GitHub reports Issue #5 closed as completed. Stage deployment and Release Approval remain separate steps.

## Product safety

This slice does not introduce Artist price control by Admin, FX/fee formulas, legal Escrow behavior, Growth algorithm, dispute adjudication, or direct Corporate/Export Partner → Artist payment.

## Closure rule

Issue #5 is closed after the hardening PR passed CI and was merged. Stage QA, Release Approval, and Production deployment are outside Sprint 0 closure.
