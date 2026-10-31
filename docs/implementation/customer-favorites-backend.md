# Customer favorites

Account-scoped list of saved, currently public products. Only an active Customer context can read or mutate favorites. Product and user ownership are derived from the session; the client cannot supply either.

## API

- `GET /api/v1/customer/favorites?page=1&pageSize=20` returns a bounded page of `{ page, pageSize, hasMore, items }`.
- `GET /api/v1/customer/favorites/:productId` reports `{ saved }` for a currently published, unarchived product.
- `PUT /api/v1/customer/favorites/:productId` with `{}` saves a currently published, unarchived product and returns `{ saved: true }`.
- `DELETE /api/v1/customer/favorites/:productId` removes the account's saved reference and returns `{ saved: false }`; repeated deletes are safe.

Page is 1–1000, pageSize 1–50, defaults 1/20. Unknown/repeated query fields and unknown body fields reject. List order is newest saved first, product UUID ascending for ties. The explicit response contains current public title, category, exact Toman price, cover image ID, availability and product creation time. Hidden/archived products do not appear in the list or saved-state lookup. A product must be published and unarchived at the add transaction's row lock. Favorite records remain if a product later becomes private, but do not reveal its details; the Customer may remove the reference by ID.

The composite `(userId, productId)` key makes concurrent saves idempotent. Foreign keys restrict user/product deletion and preserve saved references through archival. No price or inventory snapshot is stored, and a favorite does not reserve stock.

The live Customer product detail supports save/remove, and `/customer/favorites` lists saved public products with cover media and pagination. Authenticated same-origin BFF routes are under `/api/customer/favorites`. The Figma-only reference remains under `/preview/customer-web`.

No merge, deployment or real OTP/login transport is included in this UI slice.
