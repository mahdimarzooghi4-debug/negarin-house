CREATE TABLE "customer_carts" (
  "id" UUID NOT NULL PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX "customer_carts_userId_key" ON "customer_carts"("userId");
CREATE TABLE "cart_items" (
  "cartId" UUID NOT NULL REFERENCES "customer_carts"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "productId" UUID NOT NULL REFERENCES "artist_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "quantity" INTEGER NOT NULL CHECK ("quantity" BETWEEN 1 AND 100),
  PRIMARY KEY ("cartId", "productId")
);
CREATE INDEX "cart_items_productId_idx" ON "cart_items"("productId");
