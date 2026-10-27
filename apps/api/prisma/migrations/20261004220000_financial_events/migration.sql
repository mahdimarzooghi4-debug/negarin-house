CREATE TYPE "FinancialEventKind" AS ENUM ('payment_received','sale_verified','refund_approved','refund_rejected');
CREATE TABLE "financial_events" (
 "id" UUID NOT NULL PRIMARY KEY,
 "eventKey" TEXT NOT NULL UNIQUE,
 "kind" "FinancialEventKind" NOT NULL,
 "orderId" UUID NOT NULL REFERENCES "customer_orders"("id") ON DELETE RESTRICT,
 "artistUserId" UUID REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "paymentReceiptId" UUID REFERENCES "payment_receipts"("id") ON DELETE RESTRICT,
 "refundReviewId" UUID REFERENCES "shipment_refund_reviews"("id") ON DELETE RESTRICT,
 "amountToman" TEXT,
 "actorUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "requestId" TEXT NOT NULL,
 "occurredAt" TIMESTAMP(3) NOT NULL,
 "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CHECK (("kind" = 'payment_received' AND "artistUserId" IS NULL AND "paymentReceiptId" IS NOT NULL AND "refundReviewId" IS NULL)
 OR ("kind" = 'sale_verified' AND "artistUserId" IS NOT NULL AND "paymentReceiptId" IS NOT NULL AND "refundReviewId" IS NULL)
 OR ("kind" IN ('refund_approved','refund_rejected') AND "artistUserId" IS NOT NULL AND "paymentReceiptId" IS NULL AND "refundReviewId" IS NOT NULL)),
 CHECK (("kind" = 'refund_rejected' AND "amountToman" IS NULL) OR ("kind" <> 'refund_rejected' AND "amountToman" IS NOT NULL AND "amountToman" ~ '^[1-9][0-9]{0,26}$'))
);
CREATE INDEX "financial_events_artistUserId_occurredAt_id_idx" ON "financial_events"("artistUserId","occurredAt","id");
CREATE INDEX "financial_events_orderId_occurredAt_id_idx" ON "financial_events"("orderId","occurredAt","id");
-- Backfill only consistent succeeded payment proof; reconciliation receipts do not become revenue.
INSERT INTO "financial_events" ("id","eventKey","kind","orderId","paymentReceiptId","amountToman","actorUserId","requestId","occurredAt")
SELECT gen_random_uuid(), 'payment:' || r."id", 'payment_received', a."orderId", r."id", r."amount", o."userId", 'financial-event-backfill', r."receivedAt"
FROM "payment_receipts" r JOIN "payment_attempts" a ON a."id" = r."attemptId" JOIN "customer_orders" o ON o."id" = a."orderId" JOIN "order_payable_quotes" q ON q."orderId" = o."id"
WHERE a."status" = 'succeeded' AND o."status" = 'placed' AND o."paymentStatus" = 'paid' AND r."unit" = 'toman'
AND r."provider" = a."provider" AND r."amount" = a."amountToman" AND a."amountToman" = q."payableToman"
AND q."payableToman"::numeric = o."subtotalToman"::numeric + q."shippingFeeToman"::numeric;
INSERT INTO "financial_events" ("id","eventKey","kind","orderId","artistUserId","paymentReceiptId","amountToman","actorUserId","requestId","occurredAt")
SELECT gen_random_uuid(), 'sale:' || e."paymentReceiptId" || ':' || i."artistUserId", 'sale_verified', e."orderId", i."artistUserId", e."paymentReceiptId",
sum(i."unitPriceToman"::numeric * i."quantity")::text, e."actorUserId", 'financial-event-backfill', e."occurredAt"
FROM "financial_events" e JOIN "customer_order_items" i ON i."orderId" = e."orderId" WHERE e."kind" = 'payment_received'
GROUP BY e."orderId",e."paymentReceiptId",i."artistUserId",e."actorUserId",e."occurredAt";
INSERT INTO "financial_events" ("id","eventKey","kind","orderId","artistUserId","refundReviewId","amountToman","actorUserId","requestId","occurredAt")
SELECT gen_random_uuid(), 'refund:' || r."id", CASE WHEN r."decision" = 'approved' THEN 'refund_approved'::"FinancialEventKind" ELSE 'refund_rejected'::"FinancialEventKind" END,
r."orderId", s."artistUserId", r."id", r."amountToman", r."actorUserId", 'financial-event-backfill', r."reviewedAt"
FROM "shipment_refund_reviews" r JOIN "artist_shipment_reports" s ON s."id" = r."shipmentId";
CREATE UNIQUE INDEX "financial_events_payment_once" ON "financial_events"("paymentReceiptId") WHERE "kind" = 'payment_received';
CREATE UNIQUE INDEX "financial_events_artist_sale_once" ON "financial_events"("paymentReceiptId","artistUserId") WHERE "kind" = 'sale_verified';
CREATE UNIQUE INDEX "financial_events_refund_once" ON "financial_events"("refundReviewId") WHERE "kind" IN ('refund_approved','refund_rejected');
CREATE FUNCTION financial_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Financial events are append-only'; END $$;
CREATE TRIGGER financial_events_immutable BEFORE UPDATE OR DELETE ON "financial_events" FOR EACH ROW EXECUTE FUNCTION financial_events_immutable();
