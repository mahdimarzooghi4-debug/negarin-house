# Sprint 0 — Foundation

Status: **Ready to start after backlog approval**

Purpose: create the technical foundation that allows feature teams to implement Phase 1 without rebuilding infrastructure or inventing conventions.

Sprint 0 is not a feature-delivery sprint. Its output is a working development platform, repository scaffold, CI, core adapters, and guardrails.

## Sprint 0 goals

- runnable monorepo
- deterministic developer setup
- web/API/worker shells
- database migration pipeline
- Redis/job pipeline
- storage abstraction
- typed configuration
- API conventions
- observability baseline
- test baseline
- CI baseline
- security guardrails
- Stage-ready deployment contract

## Sprint 0 stories

### S0-01 — Initialize monorepo

Deliver:
- pnpm workspace
- Turborepo
- root scripts
- shared tsconfig
- lint/format conventions
- package boundaries

Acceptance:
- `pnpm install` works from clean clone
- root `lint`, `typecheck`, `test`, `build` tasks exist
- CI can run them without local-only assumptions

### S0-02 — Scaffold web application

Deliver:
- Next.js + React + TypeScript app
- route-group placeholders
- global error/loading boundaries
- base CSS/tokens entry
- health/build metadata page or endpoint

Acceptance:
- application boots locally
- route placeholders exist for public/auth/customer/artist/admin/service-partner/supporting-organization/corporate-buyer/partner
- no role is authorized solely by routing

### S0-03 — Scaffold API application

Deliver:
- NestJS + Fastify API
- `/api/v1`
- health/readiness endpoints
- OpenAPI bootstrap
- global validation/error envelope
- request correlation ID

Acceptance:
- API boots locally
- invalid request uses canonical error envelope
- health/readiness is testable
- generated OpenAPI document is available in non-production environments

### S0-04 — Scaffold worker

Deliver:
- worker process
- Redis connection abstraction
- BullMQ queue
- one test job
- graceful shutdown

Acceptance:
- API can enqueue a test job
- worker processes it idempotently
- queue failure is observable

### S0-05 — PostgreSQL + Prisma baseline

Deliver:
- Prisma initialization
- base migration
- DB client wrapper
- migration scripts
- test database setup

Acceptance:
- migration applies in CI
- migration reset works in test
- application can perform a DB readiness check
- no domain schema is invented beyond foundation entities needed for platform setup

### S0-06 — Typed configuration

Deliver:
- `packages/config`
- environment schema
- local/test/stage/prod configuration contract
- startup validation

Acceptance:
- missing required values fail startup clearly
- secrets are not committed
- environment-specific behavior is explicit

### S0-07 — Storage adapter

Deliver:
- S3-compatible interface
- local/test implementation strategy
- signed upload/read API contract
- file metadata model foundation

Acceptance:
- upload/read URLs can be generated through adapter
- private object access is signed
- MIME/size validation hooks exist
- storage vendor does not leak into domain code

### S0-08 — Shared contracts package

Deliver:
- `packages/contracts`
- runtime schema validation convention
- error model
- pagination model
- ID/value primitives
- OpenAPI/client-generation strategy

Acceptance:
- frontend can consume a typed safe contract
- backend-only sensitive models are not exported to frontend package

### S0-09 — Authorization package skeleton

Deliver:
- `packages/authz`
- AuthorizationContext type
- policy interface
- deny-by-default helper
- test harness

Acceptance:
- at least one positive and one negative sample policy test pass
- policy API can evaluate role + relationship/resource context
- no `isAdmin` shortcut is introduced

### S0-10 — i18n and bidi foundation

Deliver:
- `packages/i18n`
- locale registry
- RTL/LTR resolver
- number/date/money formatting boundaries
- bidi-safe ID helper

Acceptance:
- locale set exactly includes Persian domestic context plus Partner locales: tr-TR/ar/ru/en/zh-CN/fr/es
- Arabic Partner resolves RTL
- other six Partner locales resolve LTR
- Portuguese is absent
- currency is passed as transaction/market data, not inferred from locale

### S0-11 — Shared UI package foundation

Deliver:
- `packages/ui`
- tokens
- base Button/Input/Status/Alert/Empty/Loading/Error components
- Negarin brand/logo integration
- RTL/LTR primitives

Acceptance:
- Storybook or equivalent component preview strategy is defined
- components support accessibility attributes
- business permissions are not encoded in visual components

### S0-12 — Observability and audit foundation

Deliver:
- structured logger
- request/trace correlation
- OpenTelemetry-compatible wiring
- error-tracking adapter interface
- AuditEvent contract

Acceptance:
- request ID appears in API logs/errors
- secrets/OTP/tokens are redacted
- audit event can be emitted from a sample sensitive command

### S0-13 — CI pipeline

Deliver GitHub Actions for:
- install with lockfile
- lint
- typecheck
- unit test
- integration-test bootstrap
- build
- Prisma schema/migration validation
- dependency/security scan

Acceptance:
- required checks run on PR
- failed test/build blocks merge by process
- cache does not make build correctness depend on stale artifacts

### S0-14 — Local developer environment

Deliver:
- Docker Compose or equivalent for PostgreSQL/Redis/local S3-compatible service if used
- `.env.example`
- bootstrap docs
- seed/test-fixture strategy

Acceptance:
- clean developer machine can reach a runnable stack using documented steps
- no production secret is required locally

### S0-15 — Test foundation

Deliver:
- unit-test convention
- API integration test harness
- test database isolation
- authorization test helper
- E2E web test framework
- fixture factories

Acceptance:
- sample unit/integration/E2E tests pass in CI
- test data is deterministic
- authorization negative tests can be written without ad-hoc setup

### S0-16 — Stage deployment contract

Deliver:
- infrastructure/deploy skeleton under `infra/`
- artifact/version convention
- health check contract
- migration step contract
- Stage environment checklist

Acceptance:
- repository defines how immutable app artifacts reach Stage
- production release is not automatic from main
- production requires later explicit Release Approval

## Sprint 0 non-goals

Do not implement:
- Artist business workflows
- customer checkout
- Corporate proposals
- Export payment logic
- FX formulas
- international fee formulas
- legal Escrow behavior
- Growth algorithm
- dispute adjudication logic

## Definition of Done

Sprint 0 is complete when:

- clean clone boots web/API/worker locally
- PostgreSQL/Redis dependencies are documented and reproducible
- CI passes
- migrations are validated
- OpenAPI baseline exists
- typed config exists
- shared contracts/authz/i18n/ui packages exist
- sample queue and storage adapter flows work
- logging/correlation/audit baseline works
- test harness supports unit/integration/E2E
- Stage deployment contract exists
- no unresolved Product Decision has been silently implemented

## Recommended next sprint after Sprint 0

Sprint 1 should begin E1 + E2:
- authentication/session primitives
- authorization context/policies
- shared application shell/design-system implementation
- route/context guards
- localization foundation in real screens
