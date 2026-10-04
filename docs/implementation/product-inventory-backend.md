# Product inventory backend

PATCH /api/v1/artist/products/:id/inventory accepts stockQuantity (integer 0..2147483647),
inventoryVersion (current stock revision) and optional reason (nonblank, max 500 characters).
Only the active owning Artist may write. Foreign products and history are concealed with 404;
non-Artist roles are denied. Archived products reject inventory changes.

Products start with stockQuantity=0, inventoryVersion=0 and availability=out_of_stock.
Stock > 0 yields in_stock. Existing products also migrate to zero until their owners enter stock.
Quantity changes increment only inventoryVersion; publication status, content version and price
remain independent. Same-quantity writes at the current revision are no-ops. Stale revisions
reject with 409, including stale no-ops. Archive/content races are guarded with the existing
product version. Concurrent quantity writers cannot overwrite each other.

A stock change and its durable inventory event commit in one database transaction.
History stores actor, request ID, old/new quantity, revision, reason and timestamp.
GET /api/v1/artist/products/:id/inventory-history returns the newest 100 events to the owner,
without exposing internal actor IDs. Event revisions are unique per product; no history update
or delete endpoint exists. SQL CHECK constraints keep persisted quantities nonnegative.

This is a manual stock ledger. Order reservation, overselling prevention, shipment deductions,
cancellations and returns must be added with the order lifecycle. It is not an available-to-promise
calculation. Product images, specifications, public catalog and live UI binding remain separate work.

Verification: input boundary tests and HTTP integration tests cover zero stock, no-op behavior,
stale updates, archived products, tenant/role access, concurrent writers, publication independence
and transactional rollback on inventory-history insertion failure.

