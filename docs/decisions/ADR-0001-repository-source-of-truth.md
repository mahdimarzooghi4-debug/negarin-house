# ADR-0001 — Repository as Delivery Source of Truth

- Status: Accepted
- Date: 2026-09-27

## Context

Negarin House Phase 1 Product/UX architecture is complete and implementation is beginning.

## Decision

The GitHub repository `mahdimarzooghi4-debug/negarin-house` is the canonical source of truth for engineering and delivery work from this point forward.

The repository must record:
- technical architecture
- architecture decisions
- product/engineering backlog
- sprint plans
- implementation
- code review
- QA evidence
- release readiness
- deployment and operations documentation

Figma remains the canonical source for visual Product/UX design.

## Consequences

1. Important decisions should be committed as documentation or ADRs.
2. Implementation work should be traceable through issues, branches, commits, and pull requests.
3. Product rules must not be changed only in code or chat; the corresponding repository documentation must be updated.
4. Unresolved product decisions must be explicitly documented instead of being silently hardcoded.
5. Release decisions must be backed by repository-visible QA/release artifacts.
