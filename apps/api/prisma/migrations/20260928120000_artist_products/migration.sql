CREATE TYPE "ProductPublicationStatus" AS ENUM ('draft', 'under_review', 'changes_requested', 'approved', 'published');

CREATE TABLE "artist_products" (
  "id" UUID NOT NULL,
  "artistUserId" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "priceToman" BIGINT NOT NULL,
  "publicationStatus" "ProductPublicationStatus" NOT NULL DEFAULT 'draft',
  "archivedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "artist_products_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "artist_products_artistUserId_archivedAt_updatedAt_idx"
  ON "artist_products"("artistUserId", "archivedAt", "updatedAt");
CREATE INDEX "artist_products_publicationStatus_archivedAt_idx"
  ON "artist_products"("publicationStatus", "archivedAt");

ALTER TABLE "artist_products"
  ADD CONSTRAINT "artist_products_artistUserId_fkey"
  FOREIGN KEY ("artistUserId") REFERENCES "identity_users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
