-- CreateEnum
CREATE TYPE "CorporatePurchaseRequestStatus" AS ENUM ('draft', 'submitted');

-- CreateTable
CREATE TABLE "corporate_purchase_requests" (
  "id" UUID NOT NULL,
  "buyerOrganizationId" UUID NOT NULL,
  "createdByUserId" UUID NOT NULL,
  "idempotencyKey" UUID NOT NULL,
  "status" "CorporatePurchaseRequestStatus" NOT NULL DEFAULT 'draft',
  "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "submittedAt" TIMESTAMP(3),
  CONSTRAINT "corporate_purchase_requests_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "corporate_purchase_request_items" (
  "requestId" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "artistUserId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  CONSTRAINT "corporate_purchase_request_items_pkey" PRIMARY KEY ("requestId","productId")
);

CREATE TABLE "corporate_purchase_request_events" (
  "id" UUID NOT NULL,
  "requestId" UUID NOT NULL,
  "version" INTEGER NOT NULL,
  "action" TEXT NOT NULL,
  "actorUserId" UUID NOT NULL,
  "command" JSONB NOT NULL,
  "requestTraceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "corporate_purchase_request_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "corporate_purchase_requests_createdByUserId_idempotencyKey_key"
  ON "corporate_purchase_requests"("createdByUserId","idempotencyKey");
CREATE INDEX "corporate_purchase_requests_buyerOrganizationId_createdAt_id_idx"
  ON "corporate_purchase_requests"("buyerOrganizationId","createdAt","id");
CREATE INDEX "corporate_purchase_requests_status_createdAt_id_idx"
  ON "corporate_purchase_requests"("status","createdAt","id");
CREATE INDEX "corporate_purchase_request_items_productId_idx"
  ON "corporate_purchase_request_items"("productId");
CREATE INDEX "corporate_purchase_request_items_artistUserId_requestId_idx"
  ON "corporate_purchase_request_items"("artistUserId","requestId");
CREATE UNIQUE INDEX "corporate_purchase_request_events_requestId_version_key"
  ON "corporate_purchase_request_events"("requestId","version");

ALTER TABLE "corporate_purchase_requests"
  ADD CONSTRAINT "corporate_purchase_requests_createdByUserId_fkey"
  FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_purchase_request_items"
  ADD CONSTRAINT "corporate_purchase_request_items_requestId_fkey"
  FOREIGN KEY ("requestId") REFERENCES "corporate_purchase_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_purchase_request_items"
  ADD CONSTRAINT "corporate_purchase_request_items_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_purchase_request_events"
  ADD CONSTRAINT "corporate_purchase_request_events_requestId_fkey"
  FOREIGN KEY ("requestId") REFERENCES "corporate_purchase_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_purchase_request_events"
  ADD CONSTRAINT "corporate_purchase_request_events_actorUserId_fkey"
  FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "corporate_purchase_requests" ADD CONSTRAINT "corporate_purchase_request_state_valid" CHECK (
  "version" >= 0
  AND (("status" = 'draft' AND "submittedAt" IS NULL)
       OR ("status" = 'submitted' AND "submittedAt" IS NOT NULL))
);
ALTER TABLE "corporate_purchase_request_items" ADD CONSTRAINT "corporate_purchase_request_item_valid" CHECK (
  "quantity" > 0 AND char_length(btrim("title")) BETWEEN 1 AND 200
);
ALTER TABLE "corporate_purchase_request_events" ADD CONSTRAINT "corporate_purchase_request_event_valid" CHECK (
  "version" >= 0 AND "action" IN ('created','submitted')
);

CREATE FUNCTION corporate_purchase_request_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Corporate purchase request events are append-only'; END $$;
CREATE TRIGGER corporate_purchase_request_events_immutable
BEFORE UPDATE OR DELETE ON "corporate_purchase_request_events"
FOR EACH ROW EXECUTE FUNCTION corporate_purchase_request_events_immutable();

CREATE FUNCTION corporate_purchase_request_items_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Corporate purchase request items are immutable'; END $$;
CREATE TRIGGER corporate_purchase_request_items_immutable
BEFORE UPDATE OR DELETE ON "corporate_purchase_request_items"
FOR EACH ROW EXECUTE FUNCTION corporate_purchase_request_items_immutable();
