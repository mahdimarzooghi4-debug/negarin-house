ALTER TABLE "artist_products"
ADD COLUMN "availableQuantity" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "artist_products_availableQuantity_check" CHECK ("availableQuantity" >= 0);

CREATE TYPE "CorporatePurchaseRequestStatus" AS ENUM ('submitted', 'in_review', 'quoted', 'declined', 'converted');
CREATE TYPE "CorporateOrderStatus" AS ENUM ('awaiting_payment', 'paid', 'processing', 'shipped', 'delivered', 'cancelled');

CREATE TABLE "corporate_purchase_requests" (
  "id" UUID NOT NULL,
  "buyerOrganizationId" UUID NOT NULL,
  "requestedByUserId" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "productTitleSnapshot" TEXT NOT NULL,
  "unitPriceTomanSnapshot" BIGINT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "note" TEXT,
  "status" "CorporatePurchaseRequestStatus" NOT NULL DEFAULT 'submitted',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "corporate_purchase_requests_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "corporate_purchase_requests_quantity_check" CHECK ("quantity" > 0),
  CONSTRAINT "corporate_purchase_requests_buyerOrganizationId_fkey" FOREIGN KEY ("buyerOrganizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "corporate_purchase_requests_requestedByUserId_fkey" FOREIGN KEY ("requestedByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "corporate_purchase_requests_productId_fkey" FOREIGN KEY ("productId") REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "corporate_orders" (
  "id" UUID NOT NULL,
  "buyerOrganizationId" UUID NOT NULL,
  "createdByUserId" UUID NOT NULL,
  "productId" UUID NOT NULL,
  "productTitleSnapshot" TEXT NOT NULL,
  "unitPriceTomanSnapshot" BIGINT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "totalToman" BIGINT NOT NULL,
  "status" "CorporateOrderStatus" NOT NULL DEFAULT 'awaiting_payment',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "corporate_orders_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "corporate_orders_quantity_check" CHECK ("quantity" > 0),
  CONSTRAINT "corporate_orders_buyerOrganizationId_fkey" FOREIGN KEY ("buyerOrganizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "corporate_orders_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "corporate_orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "corporate_purchase_requests_buyerOrganizationId_createdAt_idx" ON "corporate_purchase_requests"("buyerOrganizationId", "createdAt");
CREATE INDEX "corporate_purchase_requests_productId_createdAt_idx" ON "corporate_purchase_requests"("productId", "createdAt");
CREATE INDEX "corporate_orders_buyerOrganizationId_createdAt_idx" ON "corporate_orders"("buyerOrganizationId", "createdAt");
CREATE INDEX "corporate_orders_productId_createdAt_idx" ON "corporate_orders"("productId", "createdAt");
