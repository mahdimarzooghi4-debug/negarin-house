CREATE TABLE "customer_profiles" (
 "userId" UUID PRIMARY KEY REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
 "version" INTEGER NOT NULL DEFAULT 0 CHECK ("version" >= 0),
 "displayName" TEXT NOT NULL DEFAULT ''
);
