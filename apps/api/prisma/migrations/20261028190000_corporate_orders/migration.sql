CREATE TYPE "CorporateOrderStatus" AS ENUM ('awaiting_payment_setup', 'awaiting_payment', 'paid', 'fulfilling', 'completed', 'cancelled');

CREATE TABLE "corporate_orders" (
  "id" UUID NOT NULL,
  "proposalId" UUID NOT NULL,
  "buyerOrganizationId" UUID NOT NULL,
  "createdByUserId" UUID NOT NULL,
  "status" "CorporateOrderStatus" NOT NULL DEFAULT 'awaiting_payment_setup',
  "version" INTEGER NOT NULL DEFAULT 0,
  "totalToman" BIGINT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "corporate_orders_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "corporate_orders_valid" CHECK ("version" >= 0 AND "totalToman" > 0)
);

CREATE TABLE "corporate_order_items" (
  "orderId" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "artistUserId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "unitPriceToman" BIGINT NOT NULL,
  CONSTRAINT "corporate_order_items_pkey" PRIMARY KEY ("orderId", "productId"),
  CONSTRAINT "corporate_order_items_valid" CHECK (
    "quantity" > 0 AND "unitPriceToman" > 0 AND char_length(btrim("title")) BETWEEN 1 AND 200
  )
);

CREATE TABLE "corporate_order_events" (
  "id" UUID NOT NULL,
  "orderId" UUID NOT NULL,
  "version" INTEGER NOT NULL,
  "action" TEXT NOT NULL,
  "actorUserId" UUID NOT NULL,
  "command" JSONB NOT NULL,
  "requestTraceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "corporate_order_events_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "corporate_order_events_valid" CHECK ("version" >= 0 AND "action" = 'created_from_accepted_proposal')
);

CREATE UNIQUE INDEX "corporate_orders_proposalId_key" ON "corporate_orders"("proposalId");
CREATE INDEX "corporate_orders_buyerOrganizationId_createdAt_id_idx" ON "corporate_orders"("buyerOrganizationId", "createdAt", "id");
CREATE INDEX "corporate_orders_status_createdAt_id_idx" ON "corporate_orders"("status", "createdAt", "id");
CREATE INDEX "corporate_order_items_productId_idx" ON "corporate_order_items"("productId");
CREATE INDEX "corporate_order_items_artistUserId_orderId_idx" ON "corporate_order_items"("artistUserId", "orderId");
CREATE UNIQUE INDEX "corporate_order_events_orderId_version_key" ON "corporate_order_events"("orderId", "version");

ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_proposalId_fkey"
  FOREIGN KEY ("proposalId") REFERENCES "corporate_proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_createdByUserId_fkey"
  FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_order_items" ADD CONSTRAINT "corporate_order_items_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "corporate_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_order_items" ADD CONSTRAINT "corporate_order_items_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_order_events" ADD CONSTRAINT "corporate_order_events_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "corporate_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_order_events" ADD CONSTRAINT "corporate_order_events_actorUserId_fkey"
  FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE FUNCTION corporate_order_items_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Corporate order items are immutable'; END $$;
CREATE TRIGGER corporate_order_items_immutable
BEFORE UPDATE OR DELETE ON "corporate_order_items"
FOR EACH ROW EXECUTE FUNCTION corporate_order_items_immutable();
CREATE FUNCTION corporate_order_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Corporate order events are append-only'; END $$;
CREATE TRIGGER corporate_order_events_immutable
BEFORE UPDATE OR DELETE ON "corporate_order_events"
FOR EACH ROW EXECUTE FUNCTION corporate_order_events_immutable();
