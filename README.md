# Negarin House

Negarin House is the implementation repository for the Phase 1 Negarin product ecosystem.

## Source of truth

From this point forward, implementation decisions, architecture, backlog, sprint work, code, review notes, release readiness, and operational documentation are recorded in this repository.

Figma remains the canonical visual/product design source for UI/UX, while this repository is the canonical engineering and delivery source.

## Current status

**Phase 1 Product/UX Architecture: READY FOR IMPLEMENTATION**

**Phase 1 Technical Architecture: DEFINED**

**Phase 1 Engineering Backlog: DEFINED**

**Sprint 0 / Foundation: READY TO START**

Canonical design file:
- Figma: https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House

Current Phase 1 surfaces:
- Customer Mobile
- Artist Desktop
- Artist Mobile
- Negarin Admin Backoffice
- Service Partner Portal
- Supporting Organization Portal
- Corporate Buyer Portal
- Export Partner / Market Operations
- Cross-Ecosystem Permissions & Access
- Shared Design System
- End-to-End Prototype Audit
- Phase 1 Release Readiness

## Technical baseline

- TypeScript monorepo
- pnpm + Turborepo
- Next.js web
- NestJS modular-monolith API
- PostgreSQL + Prisma
- Redis + BullMQ
- S3-compatible object storage
- REST/JSON + OpenAPI
- policy-based authorization
- GitHub Actions CI/CD

See `docs/architecture/`, `docs/decisions/`, and `docs/backlog/`.

## Delivery process

Business → Technical → Scrum/Product Backlog → Sprint → Code → Code Review → Stage → QA/Testing → Release Approval → Production → Monitoring → Improvement

## Repository structure

- `docs/product/` — product scope, business rules, UX-to-engineering handoff
- `docs/architecture/` — technical architecture and system design
- `docs/decisions/` — ADRs and major decisions
- `docs/backlog/` — product/engineering backlog and sprint planning
- `docs/qa/` — QA strategy, test cases, release gates
- `apps/` — deployable applications
- `packages/` — shared libraries and packages
- `infra/` — infrastructure and deployment configuration

## Next step

Start **Epic E0 / Sprint 0 — Platform Foundation** in GitHub Issue #5 and scaffold the actual monorepo/applications/packages.
