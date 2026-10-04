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
- Referral does not equal Artist approval.
- No Artist administration authority.
- No access to Artist private finance or bank information.

### Corporate Buyer
- External B2B buyer.
- Purchase Request → Negarin Review → Proposal → Buyer Confirmation → Corporate Order → Artist Allocation(s) → Fulfillment → Delivery → Completion.
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
