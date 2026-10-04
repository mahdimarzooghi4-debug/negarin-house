CREATE TABLE "customer_address_books" (
  "id" UUID NOT NULL PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX "customer_address_books_userId_key" ON "customer_address_books"("userId");
CREATE TABLE "customer_addresses" (
  "id" UUID NOT NULL PRIMARY KEY,
  "bookId" UUID NOT NULL REFERENCES "customer_address_books"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "recipientName" TEXT NOT NULL CHECK (length("recipientName") BETWEEN 1 AND 200),
  "recipientPhone" TEXT NOT NULL CHECK ("recipientPhone" ~ '^\+989[0-9]{9}$'),
  "province" TEXT NOT NULL CHECK (length("province") BETWEEN 1 AND 100),
  "city" TEXT NOT NULL CHECK (length("city") BETWEEN 1 AND 100),
  "postalCode" TEXT NOT NULL CHECK ("postalCode" ~ '^[0-9]{10}$'),
  "fullAddress" TEXT NOT NULL CHECK (length("fullAddress") BETWEEN 1 AND 2000),
  "isDefault" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX "customer_addresses_bookId_createdAt_id_idx" ON "customer_addresses"("bookId", "createdAt", "id");
-- Prisma cannot express a partial unique index; preserve this migration constraint.
CREATE UNIQUE INDEX "customer_addresses_one_default" ON "customer_addresses"("bookId") WHERE "isDefault";
