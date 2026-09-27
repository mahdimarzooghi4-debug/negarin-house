# ADR-0003 — Modular Monolith First

- Status: Accepted
- Date: 2026-09-27

## Context

Negarin Phase 1 has substantial domain breadth but does not yet have evidence that independent microservice scaling or independently staffed service ownership is required.

Starting with distributed services would add deployment, transaction, observability, testing, and consistency cost before those costs are justified.

## Decision

Implement the Phase 1 backend as a NestJS modular monolith with explicit module boundaries.

Use:

- one API deployment
- one primary PostgreSQL database
- one worker deployment for asynchronous jobs
- module-owned application services/repositories
- transactional outbox for important async side effects

No module may directly mutate another module's tables.

## Consequences

- cross-domain transactions remain manageable
- operational footprint is smaller
- module seams remain available for later extraction
- data ownership must still be explicit even though one database is used

## Extraction criteria

A module may become a service later when there is demonstrated need such as:

- independent scaling
- distinct security/availability requirement
- independent release cadence
- high operational load
- external integration isolation

Extraction is not a Phase 1 goal.
