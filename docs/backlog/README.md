# Product & Engineering Backlog

Backlog hierarchy:

Epic → Feature → Story → Acceptance Criteria → Implementation Task

All backlog items must reference the relevant product rule, architecture decision, Figma surface, or parent Epic where practical.

## Phase 1 documents

- [Engineering Backlog](./phase-1-engineering-backlog.md)
- [Sprint 0 — Foundation](./sprint-0-foundation.md)
- [Sprint 1 — Identity and Application Shells](./sprint-1-identity-and-shells.md)
- [Product → Engineering Traceability](./phase-1-traceability.md)

## GitHub Epic issues

- #5 — E0 Platform Foundation / Sprint 0
- #6 — E1 Identity, Authentication & Authorization
- #7 — E2 Shared UI, Localization & Application Shells
- #8 — E3 Artist & Product Lifecycle
- #9 — E4 Customer Commerce & Standard Artist Fulfillment
- #10 — E5 Artist Finance, Settlement & Growth
- #11 — E6 Service Partner Execution
- #12 — E7 Supporting Organization
- #13 — E8 Corporate Buyer & Multi-Artist Procurement
- #14 — E9 Export Network & Protected International Transaction
- #15 — E10 Admin Operations
- #16 — E11 Reporting, Notifications & Cross-Portal Read Models
- #17 — E12 End-to-End Hardening & Release

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
