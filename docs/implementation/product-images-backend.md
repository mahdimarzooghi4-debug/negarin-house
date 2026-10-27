# Product images backend

## Contract

Authenticated Artist endpoints (all responses `Cache-Control: no-store`):

- POST `/api/v1/artist/products/:id/images`: `{ "version": 0, "base64": "<canonical raw base64>" }`. Upload through the API; no filename, external URL or object key is accepted. Returns image id, pixel dimensions, byteLength, ordered imageIds and new content version.
- PATCH the same path: `{ "version": 1, "imageIds": ["uuid"] }`. Replace ordered gallery using only immutable assets belonging to this product. The first ID is the cover. Omitted IDs detach; `[]` clears. Duplicate IDs reject. Identical gallery is a no-op for the current version.
- GET `/api/v1/artist/products/:id/images/:imageId`: owner-only image metadata and a five-minute signed read URL. Retained historical images are readable even when detached or archived.
- GET `/api/v1/admin/product-reviews/:id/images/:imageId`: equivalent read for Staff with products-domain permission. Other products/roles cannot access or attach an image.

Artist reads and Staff review/queue return ordered imageIds. New publication history snapshots include those exact immutable IDs. Existing snapshots retain their original shape.

## Validation and limits

Accept JPEG, PNG and WebP; fully decode and re-encode WebP at quality 85, auto-orient and strip source metadata. SVG, GIF, corrupted/truncated input, animated WebP/APNG and overlarge pixel dimensions reject with 400. Maximum input and normalized output: 5 MiB; maximum input pixels: 16 million; decoder timeout: ten seconds. API JSON body maximum: 8 MiB with oversized-body status 413. Base64 is validated before decode; data URLs and remote URLs reject.

Maximum current gallery: eight images. Maximum retained assets per product: 100 (409 `product-media-limit`), including detached images. These are initial backend limits, not per-plan pricing rules; change them deliberately alongside retention policy later.

## State, storage and history

Requires owner, active Artist context, unarchived editable content and expected content version. Under-review/published images are locked. Upload/order/detach increment content version; editing approved content resets to draft. Price and stock are independent. Gallery, immutable asset metadata and publication history commit in one PostgreSQL transaction. A failed history insert rolls back database changes.

S3 private bucket is required. Only the server writes unique `product-images/<product UUID>/<image UUID>.webp` keys using `If-None-Match: *`; clients receive read URLs only. Provision the bucket and credentials using existing S3 configuration. Unsupported conditional-write stores must not silently fall back to overwrites.

Storage precedes the database transaction. On database failure, delete only a key confirmed uncommitted. If a commit outcome or cleanup is uncertain, keep the private object for later reconciliation. Never delete committed media on detachment: audit history references it. A crash between storage and database commit can leave a private orphan. A reconciliation worker, cross-product quotas and automatic retention remain future work.

## Verification and remaining work

Unit tests cover real JPEG/PNG/WebP decode, corruption/pixel limits, animation rejection, EXIF rotation/stripping, base64 limits and gallery validation. Storage transport tests use a local HTTP server and verify signed conditional PUT and replacement refusal. HTTP integration uses real PostgreSQL/session/authorization and an in-memory storage adapter: ownership/domains, review snapshots, approval invalidation, concurrent uploads, storage failures, gallery limits, audit rollback and cleanup. These do not prove a live S3 bucket is provisioned.

Remaining: connect the Artist upload/reorder UI and Admin gallery, public catalog image access, real private-bucket deployment verification and orphan reconciliation. Demo deployment remains unchanged.
