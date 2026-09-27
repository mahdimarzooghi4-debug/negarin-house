# Product & Engineering Backlog

Backlog hierarchy:

Epic → Feature → Story → Acceptance Criteria → Implementation Task

All backlog items must reference the relevant product rule, architecture decision, Figma surface, or parent Epic where practical.

## Phase 1 documents

- [Engineering Backlog](./phase-1-engineering-backlog.md)
- [Sprint 0 — Foundation](./sprint-0-foundation.md)
- [Product → Engineering Traceability](./phase-1-traceability.md)

## Delivery order

1. Sprint 0 / Foundation
2. Identity, Authentication & Authorization
3. Shared UI / Localization
4. Artist & Product
5. Customer Commerce / Standard Fulfillment
6. Artist Finance / Growth
7. Admin capabilities for implemented domains
8. Service Partner
9. Supporting Organization
10. Corporate Buyer
11. Export Partner / Market Operations
12. Reporting / Notifications
13. End-to-End hardening and release

Admin work is incremental and follows each domain; it is not deferred entirely until the end.

## Rules

- security and authorization are part of each story
- no external role gets data because a screen happens to render it
- shared IDs/states stay consistent across portals
- deferred Product Decisions remain abstract until accepted
- a story is not Done without applicable validation, authorization, tests, error states, observability, localization/accessibility, and documentation
