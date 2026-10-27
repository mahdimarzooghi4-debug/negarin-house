-- AlterTable
ALTER TABLE "service_requests" ADD COLUMN "serviceCatalogItemId" UUID;

-- CreateTable
CREATE TABLE "service_catalog_items" (
    "id" UUID NOT NULL,
    "createdByUserId" UUID NOT NULL,
    "idempotencyKey" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_catalog_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_catalog_events" (
    "id" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "actorUserId" UUID NOT NULL,
    "command" JSONB NOT NULL,
    "requestTraceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_catalog_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_catalog_items_createdByUserId_idempotencyKey_key" ON "service_catalog_items"("createdByUserId", "idempotencyKey");

-- CreateIndex
CREATE INDEX "service_catalog_items_isActive_createdAt_id_idx" ON "service_catalog_items"("isActive", "createdAt", "id");

-- CreateIndex
CREATE UNIQUE INDEX "service_catalog_events_itemId_version_key" ON "service_catalog_events"("itemId", "version");

-- CreateIndex
CREATE INDEX "service_requests_serviceCatalogItemId_idx" ON "service_requests"("serviceCatalogItemId");

-- AddForeignKey
ALTER TABLE "service_catalog_items" ADD CONSTRAINT "service_catalog_items_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_catalog_events" ADD CONSTRAINT "service_catalog_events_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "service_catalog_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_catalog_events" ADD CONSTRAINT "service_catalog_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_serviceCatalogItemId_fkey" FOREIGN KEY ("serviceCatalogItemId") REFERENCES "service_catalog_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "service_catalog_items" ADD CONSTRAINT "service_catalog_item_valid" CHECK (
  "version" >= 0
  AND char_length(btrim("title")) BETWEEN 1 AND 200
  AND char_length(btrim("description")) BETWEEN 1 AND 2000
);
ALTER TABLE "service_catalog_events" ADD CONSTRAINT "service_catalog_event_valid" CHECK (
  "version" >= 0 AND "action" IN ('created','availability_changed')
);

CREATE FUNCTION service_catalog_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Service catalog events are append-only'; END $$;
CREATE TRIGGER service_catalog_events_immutable BEFORE UPDATE OR DELETE ON "service_catalog_events" FOR EACH ROW EXECUTE FUNCTION service_catalog_events_immutable();
