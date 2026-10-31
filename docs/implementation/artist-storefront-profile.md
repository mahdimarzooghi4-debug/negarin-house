# Artist storefront profile

The artist workspace exposes `GET /api/v1/artist/storefront` and `PATCH /api/v1/artist/storefront` for the authenticated artist's public store name, short introduction, and about text. The one-to-one storefront row is created on first read, so a new artist starts with empty copy and version `0`.

Updates require the version returned by the last read. A successful content change increments the version and writes an append-only event snapshot in the same transaction. Repeated unchanged values do not add audit events. A stale version returns `409 storefront-state-changed`; clients reload the current snapshot before another save.

The Next.js same-origin routes apply the session proxy and cross-origin mutation guard. Text input is trimmed and bounded to 80, 180, and 3000 characters. Cover and avatar uploads accept at most 5 MiB of JPEG, PNG, or WebP input; the backend decodes and converts the image to immutable WebP, strips metadata, bounds pixels, and keeps previous objects as private history. Only currently selected images can be read, through short-lived signed URLs, and each replacement increments the storefront version and writes an audit snapshot. Profile media does not change membership or verification state.

The public catalog adds `GET /api/v1/catalog/storefronts/:id?page=&pageSize=`. It returns storefront copy and only currently published, non-archived products; a storefront without a published product is not discoverable. Public product views expose only the storefront UUID needed for the link, never the artist account UUID. The customer product detail links to the storefront, which displays the selected cover/avatar and product grid through signed image reads.
