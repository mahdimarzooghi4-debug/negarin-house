# Story product linking

`GET /api/v1/artist/stories/eligible-products?page=1&pageSize=20` lists only the active artist's published, unarchived products. Pagination uses the existing bounded content-page contract and returns exact string Toman amounts and stock availability.

`PUT /api/v1/artist/stories/:id/product` accepts exactly `{version, productId}`; `productId` is a UUID or explicit null to unlink. The artist must own both the story and selected product. Unpublished, archived, foreign and absent products cannot be selected. A successful selection or unlink advances the story version and unpublishes it. Stale versions return conflict; UI requires reloading before retry after failed/ambiguous writes. Text must be saved before changing product links.

Story publication refuses a currently unavailable linked product. Public story lists/details project a minimal product card only while the product remains published and unarchived, belongs to the story's artist, and the story/profile are published. Unpublishing/archiving a product hides its card without deleting the story. Out-of-stock products may remain linked with their actual availability. No historical order prices, ownership metadata or publication details are exposed.

The artist editor offers paginated choices and explicit unlinking; the customer story card/viewer links to the actual product UUID. This slice does not implement video.

Validation covers strict commands, ownership/visibility/versioning via real HTTP/PostgreSQL tests, BFF session/CSRF/conflict handling, response parsing, and browser selection/publication/customer navigation and conflict reconciliation. HTTP/database/browser execution is performed in CI.
