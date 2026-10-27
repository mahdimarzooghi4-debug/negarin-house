# Customer shipping address book

Account-scoped domestic Iranian shipping addresses, aligned with the current Customer web/mobile form fields. Active Customer context is required; bearer authentication uses the existing identity infrastructure. Account ownership is derived from the session, never accepted from the payload.

| Endpoint | Payload | Result |
| --- | --- | --- |
| GET /api/v1/customer/addresses | No query fields | `{version, addresses}` |
| POST /api/v1/customer/addresses | version + all address fields + optional makeDefault | 201, full book |
| PUT /api/v1/customer/addresses/:id | version + all address fields + optional makeDefault | 200, full book |
| PUT /api/v1/customer/addresses/:id/default | version | 200, full book |
| DELETE /api/v1/customer/addresses/:id | version | 200, full book |

Fields: recipientName (200), recipientPhone (Iranian mobile `09…` or `+989…`), province (100), city (100), postalCode (10 digits as text), fullAddress (2000). Text is trimmed; empty, control-character and oversized values are rejected. Persian and Arabic digits in phone/postalCode are normalized to ASCII; phone is stored as `+989…`. This checks format only; it does not verify carrier ownership, postal deliverability or geographic relationships. Province/city are display text, not a location taxonomy. Unknown fields are rejected. All responses use Cache-Control: no-store.

PUT replaces the entire address, preserving its default status unless makeDefault=true promotes it. makeDefault=false means no promotion; it does not clear an existing default. The first address is automatically default. Deleting the default promotes the oldest remaining address (createdAt ascending, UUID tie break). A nonempty book therefore has one default through service writes. A PostgreSQL partial unique index independently prevents multiple defaults. The service caps books at 20 entries; this is an initial technical bound, not a subscription rule.

Every mutation requires the current book revision, including create and default selection. A conditional revision update locks the book row before any limit/default change. Competing or stale writes return 409; missing/foreign addresses return 404 under a current revision. Identical replacements/default selections are no-ops and retain the revision. Failures roll back revision, address and default changes together. Reads use a consistent RepeatableRead snapshot. Returned entries exclude owner/book IDs and internal timestamps. First visits initialize one book using a unique user constraint.

Validation: 26 contract tests plus 8 HTTP integration tests on PostgreSQL cover normalization, role/account isolation, session persistence, concurrent initialization/default selection/cap, rollback and direct database unique-default enforcement. CI also checks migrations, lint, types, production build and browser regression tests.

Not yet connected to the Customer UI or deployed. Checkout must revalidate ownership and copy an immutable shipping-address snapshot into the order; later address edits/deletions must never rewrite existing orders. Orders, stock reservation, shipping quotations, payment and real SMS transport remain separate work. No commission or shipping fee policy is introduced here.
