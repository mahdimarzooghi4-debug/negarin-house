# E11 — Admin order trace read model

## Goal

Give Negarin operations one read-only trace for an existing CustomerOrder without collapsing independent business dimensions into one status.

## Acceptance

1. Requires Staff with the existing `orders` permission domain.
2. Unknown order returns 404.
3. Trace uses one existing CustomerOrder ID as the root identity.
4. The response keeps these dimensions separate:
   - order/reservation state;
   - payment attempts and payment-event history;
   - per-Artist fulfillment/preparation state;
   - shipment declaration;
   - customer receipt or issue;
   - issue review history and refund decision;
   - inventory reservation/release history;
   - immutable FinancialEvent records.
5. Money is returned from existing persisted exact values; no new financial calculation or settlement rule is introduced.
6. Payment receipt is summarized without redirect URLs, provider credentials, raw gateway payloads, or bank data.
7. Shipping/customer PII is not duplicated into the trace response; the read model is operational-state focused.
8. The trace is read-only and cannot mutate payment, fulfillment, delivery, issue, refund, settlement, inventory, or order state.
9. Existing state meanings remain unchanged: paid != fulfilled != delivered != issue-resolved != refunded != settled.
10. Query runs under a RepeatableRead transaction so the multi-table trace is internally coherent.

## API

`GET /api/v1/admin/orders/:id/trace`

## Out of scope

- Customer-facing timeline redesign;
- settlement execution;
- cross-order reporting/export;
- notification delivery;
- new state transitions;
- UI binding;
- merge, Stage deployment, QA approval, Production release.
