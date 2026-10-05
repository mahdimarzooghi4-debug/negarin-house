# Phase 1 Product/UX Handoff Status

Status: **READY FOR IMPLEMENTATION**

## Mobile application scope update

The product owner confirmed an independent Negarin mobile application in addition to the responsive website. The initial mobile roles, workflows, Android/iOS release order, and distribution must be specified in Product/UX and Sprint planning. Mobile uses the same backend rules and authorization as web; responsive layouts alone do not settle native screen scope. See ADR-0007.

## Locked product rules

### Artist
- Artist owns the product.
- Artist sets the product price.
- Negarin does not edit or approve Artist price.
- Archiving is reversible: it removes a product from public display and new purchases while retaining its record and history.
- Negarin reviews content, images, required information, and publication quality.
- Domestic Artist-facing finance is shown in Toman.

### Growth
Canonical levels:
1. جوانه
2. شکوفه
3. سرو زرین
4. سفیر جهانی

Growth cannot be purchased.

### Service Partner
- External execution role.
- Sees only assigned service requests.
- No unrestricted Artist browsing.
- No access to Artist private finance, Growth, membership internals, unrelated orders, or Admin notes.

### Supporting Organization
- Limited to its own programs, referrals, support relationships, usage, reports, and organization users.
- Referral does not equal Artist approval and does not automatically create a SupportRelationship.
- Support credit is monetary in Toman but is not cash, a wallet, withdrawable, transferable, or convertible to cash for the Artist.
- Support may originate from a Supporting Organization program or a Negarin CSR program.
- Any Artist may be supported after explicit connection to a program; external-program eligibility requires sponsor approval plus explicit Negarin approval.
- Every program has its own rules; an allocation snapshots those rules and is used only as a whole.
- Reservation is mandatory before consumption; multiple independent allocations may support one ServiceRequest.
- Support credit does not expire.
- Support lifecycle is append-only: allocated, reserved, consumed, released, reversed. Reversal is Negarin-only.
- Service Partner has no support-credit visibility or mutation responsibility.
- Artist sees all own support details. Supporting Organization sees all support and linked service-usage details for its own programs.
- No Artist administration authority and no access to Artist private finance, bank information, private Growth internals, or Admin notes.
- Support ledger remains separate from payment, refund, settlement, and banking mechanisms.

### Corporate Buyer
- External B2B buyer.
- Purchase Request → Negarin Review → Proposal → Buyer Confirmation → Corporate Order → Artist Allocation(s) → Fulfillment → Delivery → Completion.
- Corporate product catalog is read-only and may show the current Artist-owned price; Corporate Buyer has no Artist-price mutation command.
- PurchaseRequest is demand intent only: product identity + quantity. It contains no Buyer-authored price, discount, fee, payment, settlement, or Artist allocation.
- PurchaseRequest starts Draft and is explicitly submitted. Draft/submission do not reserve retail inventory or create CorporateOrder.
- Product title and Artist ownership are snapshotted for request traceability; proposal/commercial pricing belongs to the future CorporateProposal aggregate.
- Buyer organization comes only from the authenticated corporate context and all request reads are organization-scoped.
- No direct Artist payment or off-platform commercial bypass.
- No access to Artist settlement, bank details, private finance, private Growth scoring, or Admin notes.

### Export Partner
- Commercial Partner / Market Representative and authorized B2B buyer.
- Partner cannot manage Artist product price.
- Foreign payment is made to Negarin.
- Funds remain held/protected by Negarin until required delivery/quality state is reached.
- Delivered is not the same as Artist settlement.
- Artist does not see Partner commercial internals.
- Partner does not see Artist domestic settlement internals.
- Do not use `Escrow` as a legal claim unless a formal model is later defined.

Canonical export flow:

Artist Product
→ Artist Price
→ Negarin Publication Review
→ Export Publication Approval
→ Export Product
→ Partner Order
→ Payment to Negarin
→ Funds Protected
→ Artist Fulfillment
→ Delivery
→ Quality / Delivery Confirmation
→ Settlement Eligible
→ Artist Domestic Settlement

Sample cross-portal export ID:
`XORD-2024-0847`

## Localization

Export Partner locales exactly:
- tr-TR
- ar
- ru
- en
- zh-CN
- fr
- es

Arabic is RTL. The other six are LTR. Portuguese is not in scope.

## Open product decisions — non-blocking for implementation kickoff

These must remain configurable/abstract and must not be hardcoded until decided:
- Exact FX conversion mechanism
- Exact post-delivery quality-confirmation actor
- Exact dispute adjudication process
- Exact international fee formula and visibility
- Formal legal-support scope
- Exact banking/settlement mechanism where not already defined

## Engineering implication

Implementation must preserve role isolation, shared object identity, status separation, and authorization boundaries defined in the Phase 1 design.

## Product scope decision — 2026-10-04

The product owner explicitly excluded AI from Negarin. Continue with the approved commerce,
role workflows and operational backend; do not add AI features to this product scope.
