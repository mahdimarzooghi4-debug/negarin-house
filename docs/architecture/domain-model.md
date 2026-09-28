# Phase 1 Domain Model

Status: Accepted baseline.

This document names the domain objects engineering must preserve across portals. It is not a physical database schema.

## Identity and organizations

- User
- Session
- RoleMembership
- Organization
- OrganizationUser
- PartnerOrganization / ExportPartner

A single user may hold multiple authorized contexts. The active context must be explicit; role switching is never inferred from URL alone.

## Artist

- Artist
- ArtistProfile
- ArtistCredentialReference
- GrowthRecord
- Membership

Private credentials and private financial fields are not exposed through generic Artist DTOs.

## Product

- Product
- ProductImage
- ProductAvailability
- ArtistPrice
- ProductPublicationStatus
- PublicationReview
- PublicationDecision
- ExportEligibility
- ExportPublicationApproval
- MarketAvailability
- LocalizedProductContent

Important invariants:

1. ArtistPrice is Artist-owned.
2. PublicationReview does not approve price.
3. ExportEligibility, ExportPublicationApproval, and MarketAvailability are separate concepts.
4. Archiving is reversible; it does not delete the product or its historical order and sales records.
5. Product ownership and ArtistPrice remain Artist-scoped. Publication review does not grant price mutation authority.

## Orders

Use a shared order identity plus domain-specific context.

- CustomerOrder
- CorporateOrder
- PartnerOrder
- OrderItem
- ArtistAllocation

An aggregate CorporateOrder or PartnerOrder may contain multiple ArtistAllocation records.

ArtistAllocation includes only execution-relevant quantity/product/deadline/context.

## Fulfillment and delivery

- ArtistFulfillment
- FulfillmentEvent
- Delivery
- DeliveryEvent
- QualityDeliveryConfirmation

Do not encode settlement completion into delivery state.

## Issues

- Issue
- IssueEvidence
- IssueEvent
- ResolutionOutcome

Issue status is separate from delivery/payment/settlement status.

## Finance

- Payment
- PartnerCommercialTransaction
- ProtectedFundsState
- SettlementEligibility
- ArtistSettlement
- SettlementEvent

Important invariants:

- Partner payment goes to Negarin.
- Partner payment does not equal Artist settlement.
- Delivered does not automatically mean SettlementEligible.
- Open issue may prevent settlement eligibility.
- Artist does not receive Partner fee/FX/commercial internals.
- Partner does not receive Artist domestic settlement internals.

No domain type should be named `Escrow` in Phase 1.

## Corporate

- PurchaseRequest
- PurchaseRequestItem
- CorporateProposal
- ProposalItem
- CorporateOrder

Canonical transition:

```text
Draft PurchaseRequest
→ Submitted
→ Negarin Review
→ Proposal Ready
→ Buyer Confirmed
→ CorporateOrder
→ ArtistAllocation(s)
→ Fulfillment
→ Delivery
→ Completion
```

## Export

- ExportPartner
- ExportMarketContext
- PartnerOrder
- PartnerOrderItem
- PartnerCommercialTransaction
- ForeignPayment
- ProtectedFundsState
- ArtistAllocation
- QualityDeliveryConfirmation
- ArtistSettlement

Sample public identity:
`XORD-2024-0847`

The same XORD must trace through Partner, Admin, Artist fulfillment, and Artist finance views.

## Services

- ServiceRequest
- ServiceAssignment
- ServiceSchedule
- ServiceExecution
- ServiceDeliverable

Only Negarin assigns work in Phase 1.

## Support

- SupportingOrganization
- SupportProgram
- ArtistReferral
- SupportRelationship
- MembershipSupport
- ServiceCreditAllocation
- ServiceQuota
- SupportUsage
- SupportActivity

Referral does not automatically create SupportRelationship.

Organization and Artist views read the same underlying SupportRelationship with different permissions.

## Public IDs

Use:

- internal primary key: UUIDv7
- optional public/business ID: stable prefixed string

Prefixes already used in product design include:

- ART
- PRD
- REF
- SUP
- EXP
- XORD

Do not derive authorization from the prefix or ID shape.

## Status separation

Each aggregate owns its status.

Do not create a generic `status` shared enum across unrelated modules.

Examples:

- PublicationStatus
- OrderStatus
- FulfillmentStatus
- DeliveryStatus
- PaymentStatus
- ProtectedFundsStatus
- IssueStatus
- SettlementEligibilityStatus
- SettlementStatus
- ReferralStatus
- SupportStatus
- ServiceExecutionStatus

State transitions must be validated by application services and audited for sensitive domains.
