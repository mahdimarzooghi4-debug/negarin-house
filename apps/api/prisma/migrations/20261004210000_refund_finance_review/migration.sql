CREATE TYPE "RefundReviewDecision" AS ENUM ('approved','rejected');
CREATE TABLE "shipment_refund_reviews" (
 "id" UUID NOT NULL PRIMARY KEY,
 "shipmentId" UUID NOT NULL REFERENCES "customer_shipment_issues"("shipmentId") ON DELETE RESTRICT,
 "issueVersion" INTEGER NOT NULL CHECK ("issueVersion" >= 0),
 "orderId" UUID NOT NULL REFERENCES "customer_orders"("id") ON DELETE RESTRICT,
 "receiptId" UUID REFERENCES "payment_receipts"("id") ON DELETE RESTRICT,
 "decision" "RefundReviewDecision" NOT NULL,
 "amountToman" TEXT,
 "reason" TEXT NOT NULL CHECK (char_length("reason") BETWEEN 1 AND 2000),
 "actorUserId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT,
 "requestId" TEXT NOT NULL,
 "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CHECK (("decision" = 'approved' AND "receiptId" IS NOT NULL AND "amountToman" IS NOT NULL AND "amountToman" ~ '^[1-9][0-9]{0,22}$')
 OR ("decision" = 'rejected' AND "amountToman" IS NULL AND "receiptId" IS NULL))
);
CREATE UNIQUE INDEX "shipment_refund_reviews_shipmentId_issueVersion_key" ON "shipment_refund_reviews"("shipmentId","issueVersion");
CREATE UNIQUE INDEX "shipment_refund_reviews_one_approval" ON "shipment_refund_reviews"("shipmentId") WHERE "decision" = 'approved';
CREATE INDEX "shipment_refund_reviews_orderId_decision_idx" ON "shipment_refund_reviews"("orderId","decision");
