# Admin order trace backend

The trace is a read model over existing E4/finance records. It creates no table and no secondary source of truth.

## Dimensions

The endpoint projects:

- order identity/status/version, current payment status, quote and item snapshots;
- payment attempt status + append-only PaymentEvent history + receipt summary;
- one fulfillment branch per Artist with OrderPreparationEvent history;
- Artist shipment report, customer receipt/issue, ShipmentIssueEvent history and refund reviews;
- ProductInventoryEvent entries linked to the order;
- FinancialEvent ledger entries linked to the order.

The response deliberately preserves these as separate arrays/objects. It does not synthesize a single "overall order status".

## Authorization and privacy

Only Staff with `orders` permission may read the trace.

The projection excludes:
- shipping-address details;
- payment redirect URL;
- provider transaction/reference secrets;
- raw gateway response;
- Artist bank data/private settlement data;
- Growth data;
- unrelated Admin notes.

IDs required for cross-portal operational tracing are retained: order, product, Artist, payment receipt, refund review and shipment identities.

## Consistency

All component reads execute in one Prisma transaction with PostgreSQL `RepeatableRead` isolation. No write or side effect is performed.

No migration is required.
