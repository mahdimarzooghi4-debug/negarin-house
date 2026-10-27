# Shipment issue support

Domestic consumer scope: Staff with the orders domain can review shipment complaints. No AI, commission, money movement or automatic delivery.

GET /api/v1/admin/shipment-issues supports strict status=open/in_review/closed, page and pageSize. GET /:shipmentId shows the complaint, carrier/tracking and accountable history, without customer phone/address or payment details.
POST /:shipmentId/status accepts {version,status,summary,resolution?}. Only open → in_review → closed, or closed → in_review (reopen). Summary is trimmed, 1..2000 characters; controls rejected. Closure requires customer_follow_up_complete or referred_for_refund_review. These are case outcomes, not proof of delivery or an executed refund.

Independent support revision and append-only events record actor, request, from/to state and summary atomically. The shared order lock serializes against customer receipt/reporting. Immediate identical retry by the same Staff recovers the result; changed/older commands and competing Staff conflict. Original customer report is retained.

Customer and owning Artist projections expose current status/revision and public closure summary only. Review/reopening notes and Staff actor history are not exposed publicly. Reopening clears current resolution but preserves history. Closed customer_follow_up_complete permits a new customer receipt; closure itself creates none. Refund-review referral keeps new receipt blocked, with finance handling still pending. No auto-refund, settlement, inventory or payment changes.

Validation: strict contracts and PostgreSQL HTTP cover domain authorization, queue bounds, transitions/reopen, concurrency/replay, audit privacy, receipt gates and audit rollback. Full migration/security/lint/typecheck/build/browser CI required.

API-only draft, no UI binding, merge or deployment. Attachments, additional issue history, actual finance refund review and settlement remain future work.
