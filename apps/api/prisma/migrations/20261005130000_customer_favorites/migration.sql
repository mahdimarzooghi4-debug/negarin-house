CREATE TABLE "customer_favorites" (
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_favorites_pkey" PRIMARY KEY ("userId", "productId")
);

CREATE INDEX "customer_favorites_userId_createdAt_productId_idx"
ON "customer_favorites"("userId", "createdAt", "productId");

ALTER TABLE "customer_favorites"
ADD CONSTRAINT "customer_favorites_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "customer_favorites"
ADD CONSTRAINT "customer_favorites_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
