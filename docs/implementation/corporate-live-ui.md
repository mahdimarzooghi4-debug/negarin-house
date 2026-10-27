# Corporate Buyer live frontend

This slice converts the first Corporate Buyer workflow from a Figma/sample preview into an operational browser flow while preserving the preview separately for visual QA.

## Routes

Operational:
- `/corporate-buyer/corporate-products`
- `/corporate-buyer/product-detail?id=<uuid>`
- `/corporate-buyer/new-purchase-request?products=<uuid,...>`
- `/corporate-buyer/purchase-requests`
- `/corporate-buyer/purchase-request-detail?id=<uuid>`

`/corporate-buyer` redirects to the live product route.

Visual reference remains:
- `/preview/corporate-buyer/*`

## Session/context gate

Every operational Corporate screen is wrapped by `CorporateSessionGate`.

Behavior:
1. read current context through `/api/auth/context`;
2. accept only active role `corporate-buyer` with organization scope;
3. when the current context is absent or belongs to another role, read `/api/auth/grants`;
4. list only organization-scoped Corporate Buyer grants;
5. require an explicit organization selection through `POST /api/auth/context` and never auto-replace another active role;
6. never show sample data if authentication/context is missing.

Production login remains blocked on the separate real OTP transport decision.

## Product binding

The UI reads:
- title;
- description;
- category/specification fields;
- current Artist price as a Toman string;
- availability;
- signed image URL metadata.

The response parser rejects known privileged fields if they appear unexpectedly. It also fails closed on invalid UUIDs, non-canonical timestamps, duplicate image/entity identifiers, cover-image mismatches and malformed pagination envelopes.

Catalog supports:
- text search;
- stock filter;
- server pagination;
- multi-product selection;
- direct product detail.

## PurchaseRequest binding

Selection routes to an operational request form. The form intentionally contains only fields represented by the accepted backend aggregate:
- selected product;
- quantity.

`Save Draft`:
- creates the request with a stable per-form UUID idempotency key;
- navigates to live detail.

`Submit`:
- creates/replays Draft;
- submits using the returned optimistic version;
- navigates to live detail.

If Draft creation succeeds but submit fails, the UI preserves and links the created Draft rather than pretending the whole operation failed atomically.

## Request list/detail

Live request list displays:
- request ID;
- draft/submitted status;
- item titles;
- total quantity;
- creation time.

Detail displays:
- canonical ID;
- state/version history;
- item quantities;
- Draft submit command when allowed.

No price snapshot is displayed because PurchaseRequest contains none.

The PurchaseRequest read model additionally validates the accepted backend state machine: Draft is version 0 with only the created event; Submitted is version 1 with created → submitted history. Invalid quantities, duplicate product lines, malformed route selections and stale/mismatched pagination responses are rejected rather than partially rendered.

## Browser golden path

The authenticated Playwright path seeds a real multi-role browser session with Artist active and a separate organization-scoped Corporate Buyer grant. It proves explicit context switching and then exercises the live BFF/UI path through catalog search, product detail/image metadata, Draft creation, Draft detail/history, optimistic submit and Submitted list/detail. The bearer token is also checked to remain absent from URL, localStorage and sessionStorage.

## Figma boundary

The generated Figma preview screens remain unchanged and continue to show sample visual content under `/preview/corporate-buyer`.

The operational route does not reuse sample names, request IDs, prices or statuses as runtime data.
