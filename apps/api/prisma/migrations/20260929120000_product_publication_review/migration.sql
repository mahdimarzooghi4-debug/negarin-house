CREATE TABLE "product_publication_events" (
  "id" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "actorUserId" UUID NOT NULL,
  "status" "ProductPublicationStatus" NOT NULL,
  "feedback" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "product_publication_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "product_publication_events_productId_createdAt_idx"
  ON "product_publication_events"("productId", "createdAt");

ALTER TABLE "product_publication_events"
  ADD CONSTRAINT "product_publication_events_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "artist_products"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "product_publication_events"
  ADD CONSTRAINT "product_publication_events_actorUserId_fkey"
  FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
