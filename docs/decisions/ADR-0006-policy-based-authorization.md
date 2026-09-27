# ADR-0006 — Policy-Based Authorization and Relationship Scoping

- Status: Accepted
- Date: 2026-09-27

## Context

Negarin has several external roles with overlapping views of shared objects but different allowed fields/actions.

A simple role check is insufficient because access also depends on organization ownership, assignment, support relationship, order relationship, Artist ownership, and staff permission domains.

## Decision

Every protected action is evaluated using a server-side authorization context plus resource/relationship policy.

Authorization decisions may use:

- active role
- organization membership
- Export Partner membership
- Artist ownership
- ServiceAssignment
- SupportRelationship
- order relationship
- resource state
- staff permission domain

Navigation hiding is not security.

## Required patterns

- scoped queries or relationship validation
- role/context-specific DTO projections
- explicit action policies
- deep-link authorization
- negative authorization tests
- audit logging for sensitive actions

## Explicitly rejected

- `isAdmin` as unrestricted access for all staff
- client-only access control
- tenant filtering performed only after returning data to the client
- a single shared DTO exposing private fields to every role

## Consequences

Permission logic becomes a first-class tested part of application services and API design.
