# E8 — Corporate product read model and PurchaseRequest intake

Source: accepted Corporate canonical flow:
Draft PurchaseRequest → Submitted → Negarin Review → Proposal Ready → Buyer Confirmed → CorporateOrder → ArtistAllocation(s) → Fulfillment → Delivery → Completion.

Acceptance:
1. Authenticated Corporate Buyer can read the published/unarchived product catalog inside an explicit corporate organization context.
2. Corporate product view may show the current Artist price read-only. It exposes no price mutation command.
3. Corporate Buyer can create a Draft PurchaseRequest containing one or more unique published product IDs and positive integer quantities.
4. Buyer organization and creator identity are derived from authenticated context; clients cannot override them.
5. PurchaseRequest contains no buyer-supplied price, negotiated price, discount, fee, payment, settlement or Artist allocation field.
6. PurchaseRequestItem snapshots product identity, Artist ownership and title for traceability, but does not snapshot a commercial price.
7. Draft creation does not reserve/decrement inventory, create an order, create a payment/financial event, contact/pay an Artist, or create ArtistAllocation.
8. Exact create retries are idempotent; changed reuse of the same key conflicts.
9. Submission is an explicit optimistic-version transition Draft → Submitted.
10. Submit revalidates that every requested product is still published and unarchived. Stock quantity is not reserved or treated as procurement availability.
11. A successfully submitted request remains replayable even if a product is later unpublished/archived.
12. Request items and request event history are immutable at the database layer.
13. Buyer list/detail is scoped to buyerOrganizationId. Cross-organization IDs are concealed.
14. Orders-domain Staff can read the same request with operational organization/Artist ownership fields. Other Staff domains are denied.
15. Artist price remains Artist-owned. Proposal commercial terms belong to a future CorporateProposal aggregate and are not invented in this slice.

Technical safety:
- maximum 100 lines per request is an API/resource bound, not a commercial rule;
- quantity is a positive PostgreSQL/Int-safe integer;
- product rows are share-locked while snapshots/submit visibility are validated;
- request transition + audit event are atomic.

Out of scope:
- draft editing;
- Negarin review decision/status;
- CorporateProposal and proposal pricing;
- proposal revision/confirmation;
- CorporateOrder / ArtistAllocation;
- inventory reservation;
- payment/settlement;
- addresses/delivery;
- organization-user administration;
- UI binding, merge, Stage deployment, QA approval or Production release.
