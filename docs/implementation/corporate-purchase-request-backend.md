# Corporate PurchaseRequest intake backend

This slice starts E8 without inventing proposal/commercial rules.

## Corporate product read model

Authenticated Corporate Buyer endpoints:
- `GET /api/v1/corporate/products`
- `GET /api/v1/corporate/products/:id`
- `GET /api/v1/corporate/products/:id/images/:imageId`

They reuse the existing public product source of truth and visibility rules: only published, unarchived products are visible. The current Artist price is returned read-only as a decimal Toman string. No Corporate endpoint can mutate Artist price.

## PurchaseRequest APIs

Corporate Buyer:
- `POST /api/v1/corporate/purchase-requests`
- `GET /api/v1/corporate/purchase-requests`
- `GET /api/v1/corporate/purchase-requests/:id`
- `POST /api/v1/corporate/purchase-requests/:id/submit`

Negarin Staff with `orders` permission:
- `GET /api/v1/admin/corporate/purchase-requests`
- `GET /api/v1/admin/corporate/purchase-requests/:id`

Create body:

```json
{
  "idempotencyKey": "uuid",
  "items": [
    { "productId": "uuid", "quantity": 2 }
  ]
}
```

No price, discount, commercial term, organization ID or Artist identity is accepted from the Buyer.

Submit body:

```json
{ "version": 0 }
```

## Data model

`CorporatePurchaseRequest`
- buyerOrganizationId
- createdByUserId
- idempotencyKey
- status: draft | submitted
- version
- timestamps

`CorporatePurchaseRequestItem`
- productId
- Artist ownership snapshot
- title snapshot
- quantity

`CorporatePurchaseRequestEvent`
- append-only versioned created/submitted audit history

Items deliberately contain no price. A PurchaseRequest is demand intent, not the future CorporateProposal commercial contract.

## Concurrency and idempotency

Creation:
- creator + idempotency key uniqueness;
- advisory transaction lock;
- canonical item ordering;
- product rows locked FOR SHARE while visibility/title/ownership snapshots are read;
- exact retry returns the same request;
- changed command conflicts.

Submission:
- request row locked FOR UPDATE under the authenticated buyer organization;
- optimistic version;
- product rows share-locked and revalidated as published/unarchived;
- state mutation + submitted event in one transaction;
- audit failure rolls state back;
- exact retry by the same actor is replay-safe after submission.

## Inventory and finance boundary

PurchaseRequest does not reserve stock. Requested quantity can exceed current retail stock because this stage is a procurement request, not an order. It does not mutate inventoryVersion/stockQuantity or create ProductInventoryEvent.

No FinancialEvent, payment, settlement, refund, payable quote, CorporateOrder or ArtistAllocation is created.

## Privacy

Buyer response hides:
- Artist user identity;
- internal organization/creator IDs;
- publication/inventory internals;
- all Artist bank/private finance/Growth/Admin data.

Orders-domain Staff view includes organization and Artist ownership required for Negarin review.

## Next boundary

The next Corporate slice may begin Negarin Review / CorporateProposal only after proposal fields and commercial-price ownership are explicit. This Draft does not invent them.
