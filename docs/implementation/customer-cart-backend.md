# Customer cart backend

Active Customer context is required. The server derives ownership solely from the authenticated session; no cart/user ID is accepted from the client. One durable cart is shared by a user's Customer sessions. Artist, Staff and other active roles cannot manage it.

## API

All responses use `Cache-Control: no-store`.

- GET `/api/v1/customer/cart`: initialize/read the current user's cart; query fields reject.
- PUT `/api/v1/customer/cart/items/:productId`: `{ "version": 0, "quantity": 2 }`, sets an absolute quantity.
- DELETE the same item path: `{ "version": 1 }`.
- DELETE `/api/v1/customer/cart`: `{ "version": 2 }`, clears all items.

Only version and quantity (for PUT) are accepted. Unknown ownership/price/discount fields reject with 400. Quantity must be an integer 1–100; remove explicitly instead of setting zero. Initial limit: 50 distinct product lines. These are backend bounds, not membership-plan pricing rules.

Commands require the current cart version. Stale/concurrent commands reject with 409. Changes increment version; a validated no-op preserves it. Cart creation uses the unique user key and skipDuplicates to handle first visits. Mutations conditionally update/lock the cart row before editing lines and checking the line cap. Failed item writes roll back the version and lines. Cart reads use a repeatable-read snapshot.

## Product state and money

Only currently published, unarchived products can be added/set. Unknown or non-public products return 404; insufficient stock returns 409. A failed command changes neither the cart nor inventory. Removing/clearing unavailable products is allowed.

Cart read checks current product visibility and stock. Item status is `available`, `out_of_stock`, `insufficient_stock` or `unavailable`. Hidden/archived items retain the known productId and requested quantity but return product and lineSubtotalToman as null, excluding hidden title/price/images.

Published item product contains id/title/current exact priceToman/coverImageId. Client prices are ignored by rejecting the field. BigInt arithmetic returns string lineSubtotalToman/subtotalToman, including values above JavaScript's safe-number range. When any item is non-public, subtotalToman is null because a complete current subtotal is unavailable. Empty cart subtotal is "0".

`canCheckout` means a nonempty cart with all lines currently available at this read. It is a UI eligibility hint, not a checkout guarantee or checkout endpoint. Price and stock may change afterward. The subtotal is merchandise only: shipping, tax, discounts and final payment totals are not implemented. No commission is added.

Cart items do not reserve or decrement stock and do not emit inventory history. Checkout/orders must recheck price, visibility and quantities and atomically reserve stock in a later slice. Product price/visibility writes during a mutation can change the returned status; the cart is not a reservation.

## Verification and remaining work

Contract tests cover strict versions/quantities, ownership/price-field rejection, arbitrary-precision arithmetic, empty carts and hidden content. PostgreSQL/session HTTP tests cover cross-session persistence, account isolation, role denial, price/stock changes, hidden-item cleanup, stale/concurrent writes, rollback through a failing database trigger and concurrent additions at the 50-line boundary.

Remaining: Customer UI binding, shipping addresses, checkout/order snapshots and stock reservations, payment integration and abandoned-cart policy. No guest cart or corporate/export cart is added. No demo deployment changes.
