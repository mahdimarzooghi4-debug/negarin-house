CREATE TYPE "CorporateFulfillmentStatus" AS ENUM ('awaiting_acceptance', 'accepted', 'preparing', 'packaging', 'ready_for_dispatch');

CREATE TABLE "corporate_order_preparations" (
  "corporateOrderId" UUID NOT NULL,
  "artistUserId" UUID NOT NULL,
  "status" "CorporateFulfillmentStatus" NOT NULL DEFAULT 'awaiting_acceptance',
  "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "corporate_order_preparations_pkey" PRIMARY KEY ("corporateOrderId", "artistUserId"),
  CONSTRAINT "corporate_order_preparations_version_valid" CHECK ("version" >= 0),
  CONSTRAINT "corporate_order_preparations_order_fkey" FOREIGN KEY ("corporateOrderId") REFERENCES "corporate_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "corporate_order_preparations_artist_fkey" FOREIGN KEY ("artistUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "corporate_order_preparation_events" (
  "corporateOrderId" UUID NOT NULL,
  "artistUserId" UUID NOT NULL,
  "version" INTEGER NOT NULL,
  "action" TEXT NOT NULL,
  "status" "CorporateFulfillmentStatus" NOT NULL,
  "actorUserId" UUID NOT NULL,
  "requestTraceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "corporate_order_preparation_events_pkey" PRIMARY KEY ("corporateOrderId", "artistUserId", "version"),
  CONSTRAINT "corporate_order_preparation_events_version_valid" CHECK ("version" >= 0),
  CONSTRAINT "corporate_order_preparation_events_action_valid" CHECK ("action" IN ('assigned', 'status_changed', 'shipment_reported')),
  CONSTRAINT "corporate_order_preparation_events_preparation_fkey" FOREIGN KEY ("corporateOrderId", "artistUserId") REFERENCES "corporate_order_preparations"("corporateOrderId", "artistUserId") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "corporate_order_preparation_events_actor_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "corporate_order_preparations_artistUserId_status_createdAt_idx" ON "corporate_order_preparations"("artistUserId", "status", "createdAt");

ALTER TABLE "corporate_order_events" DROP CONSTRAINT "corporate_order_events_valid";
ALTER TABLE "corporate_order_events" ADD CONSTRAINT "corporate_order_events_valid"
  CHECK ("version" >= 0 AND "action" IN ('created_from_accepted_proposal', 'shipping_address_set', 'payment_setup_completed', 'payment_reported', 'payment_verified', 'payment_review_returned', 'fulfillment_started'));

CREATE FUNCTION corporate_order_preparation_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Corporate order preparation events are append-only'; END $$;
CREATE TRIGGER corporate_order_preparation_events_immutable
BEFORE UPDATE OR DELETE ON "corporate_order_preparation_events"
FOR EACH ROW EXECUTE FUNCTION corporate_order_preparation_events_immutable();
