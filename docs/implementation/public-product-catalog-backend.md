# Public product catalog backend

Read-only visitor endpoints, without session or active role:

- GET `/api/v1/catalog/products`
- GET `/api/v1/catalog/products/:id`
- GET `/api/v1/catalog/products/:id/images/:imageId`

Every read requires `published` and `archivedAt = null`. Draft, under-review, changes-requested, approved, archived and missing products return the same 404 on detail/image reads. Invalid UUIDs return 400. Public endpoints expose no mutation route.

## Queries

| Query | Contract |
| --- | --- |
| q | Nonblank trimmed text, max 200 characters; case-insensitive literal substring in title or description |
| category | Nonblank trimmed text, max 200 characters; exact case-sensitive display category, not a taxonomy ID |
| minPriceToman / maxPriceToman | Inclusive canonical decimal strings, 0 through PostgreSQL signed BigInt maximum; lower must not exceed upper |
| inStock | `true` for stock above zero, `false` for zero; omitted includes both |
| sort | `newest` (default), `price_asc`, `price_desc` |
| page | 1–1000, default 1 |
| pageSize | 1–50, default 20 |

Unknown/repeated fields, arrays, malformed numbers and invalid bounds reject with 400. Percent, underscore and backslash in q are escaped as literal search characters, not wildcard operators. Queries combine with AND, with title/description search combined using OR.

List response is `{ items, page, pageSize, hasMore }`. One extra row determines hasMore, without a full count query. Sort ties use ascending UUID. Pagination is bounded offset pagination, deterministic for an unchanged dataset; writes during browsing may shift pages. This is not a consistent snapshot across separate page requests.

## Public response and media

Products contain public specifications, exact string priceToman, ordered imageIds, coverImageId (first ID or null), createdAt and availability (`in_stock`/`out_of_stock`). Owner IDs, exact stock counts, inventory/content revisions, archive/publication state, history and request identifiers are excluded using an explicit database select. Product text is plain text for the frontend to render safely.

Image endpoint checks asset ownership, current-gallery membership and product visibility together in one database read. Detached historical assets stay private even if their IDs are known. Private S3 keys never appear as a separate response field; the signed URL necessarily identifies its resource. Signed read URLs expire after five minutes. Archival/detachment blocks new URL issuance; already issued URLs can remain usable until expiry. Responses use `Cache-Control: no-store`. Signing failures return 503.

## Checks and remaining integration

Tests cover query boundaries, wide exact Toman prices, visibility for every publication state, archive removal, private-field exclusion, literal searches/category matching, sort ties/pagination, public-image membership, hidden/foreign/detached images, storage failure, invalid input and absence of public writes. HTTP tests use PostgreSQL and a controlled signing adapter, not a deployed bucket.

Two indexes support published/unarchived price and creation-time reads. Contains search may still scan rows; Persian linguistic normalization, search ranking/trigram indexes, taxonomy/category discovery and cursor/snapshot pagination are later slices.

Remaining: bind Customer pages to this API, verify the private bucket, and build the cart/order/reservation path. No demo deployment changes.
