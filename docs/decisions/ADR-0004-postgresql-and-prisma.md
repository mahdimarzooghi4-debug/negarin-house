# ADR-0004 — PostgreSQL as Transactional Source of Truth

- Status: Accepted
- Date: 2026-09-27

## Context

The product contains transactional orders, allocations, payment/settlement state, support balances, role relationships, and audit-sensitive state transitions.

These require strong consistency, constraints, transactions, indexing, and reliable migrations.

## Decision

Use PostgreSQL as the authoritative transactional database.

Use Prisma for:

- schema definition
- migrations
- typed data access

Use Redis only for ephemeral concerns such as jobs, rate limits, and non-authoritative cache.

## Rules

- money, orders, settlements, permissions, support balances, and issue state must not be authoritative in Redis
- business invariants remain in application/domain services
- database constraints should reinforce invariants where possible
- all schema changes are migration-controlled
- production backup/recovery must be tested

## Consequences

The data model can preserve shared identities and cross-portal consistency while still supporting transactional workflows.
