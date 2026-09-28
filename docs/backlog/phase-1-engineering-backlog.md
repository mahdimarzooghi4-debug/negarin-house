# Phase 1 Engineering Backlog

Status: **Ready for execution**

Source:
- `docs/product/phase-1-handoff.md`
- `docs/architecture/phase-1-technical-architecture.md`
- ADR-0002 through ADR-0006

Backlog hierarchy:

Epic → Feature → Story → Acceptance Criteria → Implementation Task

## Delivery principles

1. Security and authorization are implementation requirements, not later hardening.
2. Shared object identity must survive cross-portal views.
3. Artist-owned pricing cannot be overridden by Admin, Buyer, Partner, or Service/Support roles.
4. Order, fulfillment, delivery, payment, issue, and settlement statuses stay separate.
5. External organization access is relationship-scoped.
6. Deferred Product Decisions remain abstract/configurable and are not invented in code.
7. Every user-facing story includes relevant empty/error/loading/accessibility/localization states.
8. Every sensitive backend story includes authorization, audit, and negative tests.

---

## Epic E0 — Platform Foundation

### Goal
Create the repository, runtime, CI, infrastructure, shared packages, observability, and engineering conventions required by every product domain.

### Features
- monorepo scaffolding
- shared TypeScript configuration
- environment/config validation
- web/API/worker application shells
- PostgreSQL/Prisma baseline
- Redis/BullMQ baseline
- S3-compatible storage adapter
- OpenAPI setup
- logging/tracing/audit baseline
- CI pipeline
- test harness
- Stage deployment baseline

### Exit criteria
- applications build in CI
- database migrations run in test
- health/readiness endpoints exist
- environment validation fails safely
- one background job can be enqueued and processed
- one signed-storage integration can be exercised through an adapter
- CI runs lint/typecheck/test/build/schema validation
- Stage deployment path is defined

Dependency: none

---

## Epic E1 — Identity, Authentication & Authorization

### Goal
Implement shared identity/session primitives and policy-based authorization for all current roles.

### Features
- phone/OTP authentication abstraction
- session lifecycle and revocation
- active role/context resolution
- organization memberships
- Export Partner membership/context
- staff permission domains
- authorization policy engine
- unauthorized deep-link behavior
- audit for access-sensitive actions

### Core stories

#### E1-S1 — Shared domestic authentication
Acceptance:
- Customer, Artist, Admin/Staff, Service Partner, Supporting Organization, Corporate Buyer can authenticate through the same identity layer
- OTP provider is adapter-based
- OTP retry/expiry/rate limits exist
- OTP values are never logged

#### E1-S2 — Export Partner authentication context
Acceptance:
- Partner auth uses the same identity primitives but a separate localized context flow
- active Partner/market context is resolved server-side
- locale and currency are not conflated

#### E1-S3 — Policy-based authorization
Acceptance:
- authorization evaluates role + organization/relationship/resource/action
- frontend navigation is not considered a security check
- denial paths have 403/404 non-disclosure behavior as appropriate

#### E1-S4 — Staff permission domains
Acceptance:
- staff access is permission-domain based
- no universal `isAdmin === true` behavior for every internal account
- finance and international actions can be independently denied

#### E1-S5 — Authorization negative test suite
Required cases:
- Supporting Organization → Artist finance: denied
- Corporate Buyer A → Buyer B order: denied
- Export Partner → Artist domestic settlement: denied
- Service Partner → unassigned request: denied
- Artist A → Artist B product edit: denied
- external role → Admin internal notes: denied
- direct Artist payment command for Corporate/Partner: endpoint absent

Dependency: E0

---

## Epic E2 — Shared UI, Localization & Application Shells

### Goal
Translate the Figma design system into reusable production components and role-aware shells.

### Features
- design tokens
- Negarin logo/brand usage
- buttons/inputs/status/cards/tables
- page/entity headers
- empty/loading/error/permission denied
- operational timeline/stepper
- money display
- bidi-safe IDs
- RTL/LTR shells
- Artist mobile bottom navigation
- locale message architecture
- mobile app foundation: React Native/TypeScript, shared API contracts, role-aware navigation, secure session storage, RTL/LTR behavior, and independent build/test gates (ADR-0007)

### Acceptance
- Persian desktop organization portals use canonical RTL shell
- Partner Arabic is RTL
- tr-TR/ar/ru/en/zh-CN/fr/es are supported exactly
- Portuguese is absent
- currency derives from market/transaction context, not language
- Artist domestic money displays as Toman
- shared UI does not grant business permissions
- critical components pass accessibility baseline
- mobile release roles and workflows are approved in Product/UX before screen implementation; no mobile-only authorization or financial calculations

Dependency: E0

---

## Epic E3 — Artist & Product Lifecycle

### Goal
Implement Artist profile/product ownership and publication review without price-control leakage.

### Features
- Artist profile
- Product CRUD
- ArtistPrice
- media upload
- product availability
- reversible Artist product archive/restore
- publication review submission
- Admin review/approve/request revision
- publication status
- Artist desktop/mobile product parity

### Core invariants
- Artist sets price
- Admin does not set/edit/approve Artist price
- publication review covers content/images/specifications/quality
- significant content/image changes may return to review
- price edit is not automatically an Admin approval flow

### Acceptance
- Admin APIs expose no price-setting command
- Artist sees review feedback
- public/read-only price views are role-appropriate
- product IDs remain stable across Artist/Admin/Buyer/Partner views
- archive hides a product from public discovery and new purchases without deleting its record or history
- only the owning Artist can edit price or archive/restore a product; cross-Artist IDs are concealed
- Admin publication review has no Artist price mutation command

Dependencies: E0, E1, E2

---

## Epic E4 — Customer Commerce & Standard Artist Fulfillment

### Goal
Implement consumer purchase and reuse the same Artist fulfillment engine later used by Corporate and Export allocations.

### Features
- customer product discovery/detail
- customer order creation
- order item model
- Artist order inbox
- preparation/packaging/shipping/delivery states
- customer order tracking
- customer issue reporting
- Artist desktop/mobile fulfillment parity

### Acceptance
- consumer orders do not expose Corporate/Export internals
- Artist sees only execution-relevant customer data
- fulfillment state is separate from payment/delivery/settlement
- no domestic Artist sales commission is deducted
- Artist domestic finance values are Toman

Dependencies: E1, E2, E3

---

## Epic E5 — Artist Finance, Settlement & Growth

### Goal
Implement Artist-facing finance, settlement state, and Growth while preserving locked rules.

### Features
- Artist transaction history
- settlement eligibility
- settlement status
- settlement audit trail
- Growth record/history
- Growth level presentation
- Growth recommendations/read models

### Growth levels exactly
1. جوانه
2. شکوفه
3. سرو زرین
4. سفیر جهانی

### Acceptance
- Growth cannot be purchased
- no service/training action directly changes level
- real sales remain primary Growth criterion
- Delivered does not automatically equal Settled
- Artist finance does not expose Partner fee/FX internals

Dependencies: E4 plus finance foundations from E0/E1

---

## Epic E6 — Service Partner Execution

### Goal
Implement assignment-scoped service execution.

### Features
- ServiceRequest
- ServiceAssignment
- assigned request list/detail
- accept/decline where supported
- schedule/coordination
- execution progress
- deliverable upload
- Negarin review where required
- history
- Service Partner account/users

### Acceptance
- Service Partner cannot browse unrestricted Artists
- unassigned request deep-link is denied
- Artist private finance/Growth/membership/unrelated orders/Admin notes are absent
- Negarin remains system of record
- execution output is traceable to ServiceAssignment

Dependencies: E0, E1, E2

---

## Epic E7 — Supporting Organization

### Goal
Implement referral/support programs and one shared support relationship with scoped visibility.

### Features
- SupportProgram
- ArtistReferral
- referral review/status
- SupportRelationship
- MembershipSupport
- ServiceCreditAllocation / ServiceQuota
- SupportUsage
- organization users
- organization-scoped reporting

### Acceptance
- Referral does not equal Artist approval
- Referral does not automatically create SupportRelationship
- Supporting Organization cannot change Growth/credentials/products/prices
- Artist finance/bank/Admin notes are inaccessible
- Organization and Artist views read the same underlying support balance/relationship
- no unrestricted cash/wallet/grant model is invented

Dependencies: E1, E2, E3, E6 where service-credit usage requires services

---

## Epic E8 — Corporate Buyer & Multi-Artist Procurement

### Goal
Implement B2B purchase requests, Negarin proposals, Corporate Orders, multi-Artist allocation, delivery, and issue flow.

### Features
- Corporate Products read model
- PurchaseRequest
- Proposal
- proposal revision request
- CorporateOrder
- ArtistAllocation
- aggregate fulfillment progress
- delivery
- issue report
- organization users/addresses/reports

### Canonical flow
Purchase Request
→ Negarin Review
→ Proposal
→ Buyer Confirmation
→ Corporate Order
→ Artist Allocation(s)
→ Artist Fulfillment
→ Delivery
→ Completion

### Acceptance
- one Corporate Order may contain multiple Artist allocations
- Buyer cannot edit Artist price
- Buyer cannot directly pay/contact Artist outside defined platform flow
- Buyer cannot see Artist settlement/bank/private finance/Growth/Admin notes
- each Artist sees only own allocation
- Corporate Order ID remains consistent across Buyer/Admin/Artist views

Dependencies: E1, E2, E3, E4

---

## Epic E9 — Export Network & Protected International Transaction

### Goal
Implement Export Product visibility, Partner ordering, payment/protected-funds state, fulfillment, delivery/quality confirmation, issue handling, and Artist domestic settlement.

### Features
- ExportEligibility
- ExportPublicationApproval
- MarketAvailability
- LocalizedProductContent
- Export Network / Export Products
- PartnerOrder
- PartnerCommercialTransaction
- ForeignPayment
- ProtectedFundsState
- ArtistAllocation
- international delivery context
- QualityDeliveryConfirmation
- issue/dispute state
- SettlementEligibility
- ArtistDomesticSettlement
- XORD cross-portal trace

### Canonical flow
Partner Order
→ Payment to Negarin
→ Payment Received
→ Funds Held/Protected
→ Artist Fulfillment
→ Delivery
→ Quality/Delivery Confirmation
→ Settlement Eligible
→ Artist Domestic Settlement

Issue branch:
Issue/Claim
→ funds remain protected
→ Negarin resolution
→ eligibility recalculated

### Acceptance
- same XORD visible across Partner/Admin/Artist fulfillment/Artist finance
- Partner payment and Artist settlement are distinct
- Delivered does not equal Settled
- Partner cannot pay Artist directly
- Partner cannot see Artist domestic settlement/bank/private finance/Growth/private credentials
- Artist cannot see Partner fee/FX/commercial internals
- `Escrow` is not used as a legal type/claim
- no FX formula is hardcoded
- exact fee/legal/dispute rules remain behind accepted abstractions until decided

Dependencies: E1, E2, E3, E4, E5

---

## Epic E10 — Admin Operations

### Goal
Provide Negarin internal operational views and commands without violating domain ownership.

### Features
- Artist operations
- publication review
- orders/allocations
- service assignment
- support/referrals
- Corporate review/proposals
- Export Partner/market/order oversight
- issues
- finance/settlement
- reports
- settings
- staff permission enforcement

### Acceptance
- Admin cannot set Artist product price
- staff permissions are domain-scoped
- sensitive actions are audited
- same object IDs/status meanings are used as external portals
- payment/fulfillment/delivery/issue/settlement dimensions remain separate

Dependencies: E1 plus corresponding domain Epics

---

## Epic E11 — Reporting, Notifications & Cross-Portal Read Models

### Goal
Provide scoped operational reporting and notifications without creating privacy bypasses.

### Features
- notification preferences
- notification outbox consumers
- role-scoped report read models
- CSV/report export where approved
- audit/read models for operations
- cross-portal shared ID trace

### Acceptance
- report export never includes fields unavailable in UI permission scope
- notifications are not authoritative business truth
- no unrelated organization data appears
- reporting read models do not bypass policy checks

Dependencies: domain Epics

---

## Epic E12 — End-to-End Hardening & Release

### Goal
Validate Phase 1 as one product before Release Approval.

### Required E2E journeys
- Authentication and role context
- Artist Product Publication
- Consumer Purchase → Artist Fulfillment
- Artist Finance / Settlement
- Growth
- Service Partner Assigned Execution
- Supporting Organization Referral / Support Usage
- Corporate Request → Proposal → Multi-Artist Order → Delivery
- Export Product → Partner Order → Protected Funds → Artist Fulfillment → Quality/Delivery → Settlement
- unauthorized cross-tenant/deep-link attempts

### Release gates
- authorization
- data privacy
- financial state separation
- localization
- accessibility
- migrations
- observability
- backup/restore evidence
- Stage smoke/E2E
- QA sign-off

Dependencies: E0–E11

---

## Recommended delivery order

1. E0 — Platform Foundation
2. E1 — Identity/Auth/AuthZ
3. E2 — Shared UI & Localization
4. E3 — Artist & Product Lifecycle
5. E4 — Customer Commerce & Fulfillment
6. E5 — Artist Finance & Growth
7. E10 — Admin foundations for implemented domains
8. E6 — Service Partner
9. E7 — Supporting Organization
10. E8 — Corporate Buyer
11. E9 — Export Network
12. E11 — Reporting/Notifications expansion
13. E12 — E2E hardening and release

Admin is developed incrementally alongside each domain rather than only at the end.

## Deferred Product Decisions

These do not block Sprint 0 or non-dependent domain work:

- exact FX conversion mechanism
- exact final post-delivery quality-confirmation actor
- exact dispute adjudication rules
- exact international fee formula/visibility
- formal legal-support scope
- unspecified banking/settlement mechanism

Any story that requires one of these must stop at an abstraction/configuration boundary until the corresponding decision is accepted.
