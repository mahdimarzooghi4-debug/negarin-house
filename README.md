# Negarin House

Negarin House is the implementation repository for the Phase 1 Negarin product ecosystem.

## Source of truth

From this point forward, implementation decisions, architecture, backlog, sprint work, code, review notes, release readiness, and operational documentation are recorded in this repository.

Figma remains the canonical visual/product design source for UI/UX, while this repository is the canonical engineering and delivery source.

## Current status

**Phase 1 Product/UX Architecture: READY FOR IMPLEMENTATION**

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

Define and approve **Phase 1 Technical Architecture**, then convert it into the engineering backlog and Sprint 0 foundation.
