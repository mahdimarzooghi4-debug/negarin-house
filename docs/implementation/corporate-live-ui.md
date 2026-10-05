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
3. if no context is active, read `/api/auth/grants`;
4. list only Corporate Buyer grants with organization scope;
5. require an explicit organization selection through `POST /api/auth/context`;
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

The response parser rejects known privileged fields if they appear unexpectedly.

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

## Figma boundary

The generated Figma preview screens remain unchanged and continue to show sample visual content under `/preview/corporate-buyer`.

The operational route does not reuse sample names, request IDs, prices or statuses as runtime data.
