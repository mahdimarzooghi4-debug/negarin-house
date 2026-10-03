-- AlterTable
ALTER TABLE "artist_products" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "product_publication_events" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "actorUserId" UUID NOT NULL,
    "actorRole" "IdentityRole" NOT NULL,
    "action" TEXT NOT NULL,
    "fromStatus" "ProductPublicationStatus" NOT NULL,
    "toStatus" "ProductPublicationStatus" NOT NULL,
    "version" INTEGER NOT NULL,
    "reason" TEXT,
    "content" JSONB NOT NULL,
    "requestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_publication_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_publication_events_productId_createdAt_idx" ON "product_publication_events"("productId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "product_publication_events_productId_version_key" ON "product_publication_events"("productId", "version");

-- AddForeignKey
ALTER TABLE "product_publication_events" ADD CONSTRAINT "product_publication_events_productId_fkey" FOREIGN KEY ("productId") REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_publication_events" ADD CONSTRAINT "product_publication_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
