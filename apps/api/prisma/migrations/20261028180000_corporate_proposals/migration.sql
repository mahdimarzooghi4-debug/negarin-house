CREATE TYPE "CorporateProposalStatus" AS ENUM ('sent', 'accepted', 'rejected', 'revision_requested');

CREATE TABLE "corporate_proposals" (
  "id" UUID NOT NULL,
  "requestId" UUID NOT NULL,
  "buyerOrganizationId" UUID NOT NULL,
  "createdByUserId" UUID NOT NULL,
  "idempotencyKey" UUID NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 0,
  "status" "CorporateProposalStatus" NOT NULL DEFAULT 'sent',
  "summary" TEXT NOT NULL,
  "productionStartsAt" TIMESTAMP(3) NOT NULL,
  "productionCompletesAt" TIMESTAMP(3) NOT NULL,
  "estimatedDeliveryAt" TIMESTAMP(3) NOT NULL,
  "packagingDetails" TEXT NOT NULL,
  "customizationDetails" TEXT NOT NULL,
  "totalToman" BIGINT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "corporate_proposals_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "corporate_proposals_valid" CHECK (
    "version" >= 0 AND "totalToman" > 0 AND
    "productionStartsAt" <= "productionCompletesAt" AND
    "productionCompletesAt" <= "estimatedDeliveryAt" AND
    char_length(btrim("summary")) BETWEEN 1 AND 1000 AND
    char_length(btrim("packagingDetails")) BETWEEN 1 AND 2000 AND
    char_length(btrim("customizationDetails")) BETWEEN 1 AND 2000
  )
);

CREATE TABLE "corporate_proposal_items" (
  "proposalId" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "artistUserId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "unitPriceToman" BIGINT NOT NULL,
  "packagingDetails" TEXT NOT NULL,
  "customizationDetails" TEXT NOT NULL,
  CONSTRAINT "corporate_proposal_items_pkey" PRIMARY KEY ("proposalId", "productId"),
  CONSTRAINT "corporate_proposal_items_valid" CHECK (
    "quantity" > 0 AND "unitPriceToman" > 0 AND
    char_length(btrim("title")) BETWEEN 1 AND 200 AND
    char_length(btrim("packagingDetails")) BETWEEN 1 AND 2000 AND
    char_length(btrim("customizationDetails")) BETWEEN 1 AND 2000
  )
);

CREATE TABLE "corporate_proposal_events" (
  "id" UUID NOT NULL,
  "proposalId" UUID NOT NULL,
  "version" INTEGER NOT NULL,
  "action" TEXT NOT NULL,
  "actorUserId" UUID NOT NULL,
  "command" JSONB NOT NULL,
  "requestTraceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "corporate_proposal_events_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "corporate_proposal_events_valid" CHECK (
    "version" >= 0 AND "action" IN ('sent', 'accepted', 'rejected', 'revision_requested')
  )
);

CREATE UNIQUE INDEX "corporate_proposals_requestId_createdByUserId_idempotencyKey_key"
  ON "corporate_proposals"("requestId", "createdByUserId", "idempotencyKey");
CREATE INDEX "corporate_proposals_buyerOrganizationId_createdAt_id_idx"
  ON "corporate_proposals"("buyerOrganizationId", "createdAt", "id");
CREATE INDEX "corporate_proposals_requestId_createdAt_id_idx"
  ON "corporate_proposals"("requestId", "createdAt", "id");
CREATE INDEX "corporate_proposals_status_createdAt_id_idx"
  ON "corporate_proposals"("status", "createdAt", "id");
CREATE INDEX "corporate_proposal_items_productId_idx" ON "corporate_proposal_items"("productId");
CREATE INDEX "corporate_proposal_items_artistUserId_proposalId_idx" ON "corporate_proposal_items"("artistUserId", "proposalId");
CREATE UNIQUE INDEX "corporate_proposal_events_proposalId_version_key" ON "corporate_proposal_events"("proposalId", "version");

ALTER TABLE "corporate_proposals" ADD CONSTRAINT "corporate_proposals_requestId_fkey"
  FOREIGN KEY ("requestId") REFERENCES "corporate_purchase_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_proposals" ADD CONSTRAINT "corporate_proposals_createdByUserId_fkey"
  FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_proposal_items" ADD CONSTRAINT "corporate_proposal_items_proposalId_fkey"
  FOREIGN KEY ("proposalId") REFERENCES "corporate_proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_proposal_items" ADD CONSTRAINT "corporate_proposal_items_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_proposal_items" ADD CONSTRAINT "corporate_proposal_items_artistUserId_fkey"
  FOREIGN KEY ("artistUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_proposal_events" ADD CONSTRAINT "corporate_proposal_events_proposalId_fkey"
  FOREIGN KEY ("proposalId") REFERENCES "corporate_proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "corporate_proposal_events" ADD CONSTRAINT "corporate_proposal_events_actorUserId_fkey"
  FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE FUNCTION corporate_proposal_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Corporate proposal events are append-only'; END $$;
CREATE TRIGGER corporate_proposal_events_immutable
BEFORE UPDATE OR DELETE ON "corporate_proposal_events"
FOR EACH ROW EXECUTE FUNCTION corporate_proposal_events_immutable();
CREATE FUNCTION corporate_proposal_items_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Corporate proposal items are immutable'; END $$;
CREATE TRIGGER corporate_proposal_items_immutable
BEFORE UPDATE OR DELETE ON "corporate_proposal_items"
FOR EACH ROW EXECUTE FUNCTION corporate_proposal_items_immutable();
