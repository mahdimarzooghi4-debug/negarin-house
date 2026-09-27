# ADR-0002 — TypeScript Monorepo

- Status: Accepted
- Date: 2026-09-27

## Context

Phase 1 contains multiple portals that share domain contracts, authorization rules, localization behavior, UI primitives, and test fixtures.

The implementation is expected to move quickly while keeping cross-portal rules consistent.

## Decision

Use a single TypeScript monorepo with:

- pnpm workspaces
- Turborepo task orchestration
- shared packages for UI, contracts, domain types, authz, i18n, config, observability, and test utilities
- independently deployable `web`, `api`, and `worker` applications

Package/framework versions are pinned to stable releases at Sprint 0.

## Consequences

### Positive

- one language across web/API/worker
- easy sharing of safe contracts and validation schemas
- lower coordination cost for one product ecosystem
- centralized lint/type/test tooling
- easier refactoring while boundaries are still evolving

### Constraints

- shared packages must not become a reason to bypass module boundaries
- backend-only data types containing sensitive fields must not be exported to frontend packages
- domain logic should avoid framework coupling

## Revisit when

A separate runtime/language provides a clear operational or domain advantage that outweighs repository complexity.
