# Customer orders and stock reservations

This slice persists Customer checkout reservations. It does not charge money or declare an order paid, accepted by an Artist, shipped or delivered. No commission, shipping fee, discount or tax policy is introduced. subtotalToman is the exact sum of merchandise prices, not a final payable amount.

## API

All endpoints require the active Customer session and emit Cache-Control: no-store. Ownership is derived from the session. Foreign orders return 404.

| Endpoint | Input | Output |
| --- | --- | --- |
| POST /api/v1/customer/orders | cartVersion, addressBookVersion, addressId, idempotencyKey (UUID), expectedSubtotalToman (canonical positive decimal text) | 201 order |
| GET /api/v1/customer/orders | page 1..1000, pageSize 1..50, defaults 1/20 | page, pageSize, hasMore, items |
| GET /api/v1/customer/orders/:id | UUID | order |
| POST /api/v1/customer/orders/:id/cancel | version | 201 current order |

Unknown/privileged fields, numeric money, malformed UUIDs and unbounded query values are rejected. List ordering is createdAt descending, UUID ascending with bounded offset pagination; concurrent additions can shift page boundaries. No owner ID, idempotency key or request hash is returned.

## Checkout transaction

1. Lock the account cart. Look up the account-scoped idempotency key before checking revisions. Identical retries return the same order, including its current cancelled/expired state; changed payload with the same key returns 409. Reusing a key never creates a new order.
2. Validate the nonempty cart and current cart revision. Lock the address book at its expected revision and verify address ownership.
3. Lock products in sorted UUID order, then read their current price, content, visibility and available quantity. Recheck all lines, requiring published/unarchived products and sufficient stock. Compare the exact live merchandise subtotal with the customer's expected subtotal; a mismatch returns 409 and requires renewed confirmation.
4. Store independent address, title, unit-price and image-ID snapshots. Totals use BigInt arithmetic and canonical decimal text, supporting a 50-line/100-quantity cart even when its subtotal exceeds PostgreSQL BIGINT.
5. Decrement available stock and increment inventory revisions; append order-linked inventory audit events. Clear the cart and increment its revision in the same transaction. A failure anywhere before commit rolls everything back. If a response fails after commit, retry with the same key to recover the persisted order.

stockQuantity continues to mean available-to-sell units. Pending reservations are quantities in reserved orders. Artist inventory commands set available stock; replenishing available units does not erase a reservation. Release adds the reserved quantities to the current available count, preserving intervening replenishment. Product content/publication revisions are unaffected by reservations. Row locks serialize Artist inventory edits with checkout/release; Artist optimistic revisions become stale after stock changes.

## Release and expiry

Initial hold: 30 minutes, server time. State transitions are reserved -> cancelled or reserved -> expired. Release locks the order first, then products in UUID order, restores stock, appends audit events and increments the order revision in one transaction. Repeated/concurrent release never restores twice. A stale version on a live reservation returns 409; already-released orders return their current state. Cancelling an already-due reservation records expiry. Archived products still receive stock restoration.

OrderReservationExpiry is registered in the API process. Outside NODE_ENV=test it scans on startup and every 30 seconds, with at most 100 due orders per batch, no overlapping batches per process and shutdown cleanup. Multiple API processes cooperate through database row locks. Each release has a separate transaction; failed entries remain reserved for retry while other entries continue. Logs contain failure events/counts without raw database errors or shipping data. Read/list and idempotent checkout retries also opportunistically expire the referenced order. No public expiry endpoint or client-supplied clock exists.

Polling depends on a running API and a healthy database; after downtime, startup scanning catches up. At high volume, batch limits can delay physical release beyond the deadline, so monitor backlog/failures before production scaling. An exhausted inventory revision or available-stock integer overflow blocks release atomically rather than corrupting stock. Image IDs are historical references; authenticated order-image delivery remains a later feature because catalog media access checks current publication/gallery membership.

## Validation and remaining work

18 checkout/pagination contract tests, 4 expiry scheduler lifecycle tests and 11 PostgreSQL HTTP tests cover exact arithmetic, immutable snapshots, repeat requests, account/role isolation, last-unit contention, price/address/cart conflicts, cancellation/restocking, expiry races, pagination, reserve/release rollback and retry after batch failure. Full CI runs migration reset/deploy, dependency audit, lint/types, tests, production build and browser regressions.

Customer UI binding and deployment remain pending. Next work: verified payment state machine and outbox/provider adapter, final shipping quotations and payable amounts, Artist fulfillment/read access, authenticated historical media, operational expiry monitoring. Paid-order transitions must be added with the same order lock and must reject expired/released reservations. Never treat a browser redirect or client amount as payment confirmation.
