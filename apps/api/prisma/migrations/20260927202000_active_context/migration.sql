CREATE TYPE "IdentityRole" AS ENUM ('customer', 'artist', 'staff', 'service_partner', 'supporting_organization', 'corporate_buyer', 'export_partner');

CREATE TABLE "role_grants" (
  "id" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "role" "IdentityRole" NOT NULL,
  "organizationId" UUID,
  "exportPartnerId" UUID,
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "role_grants_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "role_grants_userId_revokedAt_idx" ON "role_grants"("userId", "revokedAt");
ALTER TABLE "role_grants" ADD CONSTRAINT "role_grants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "identity_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "staff_domain_grants" (
  "id" UUID NOT NULL,
  "roleGrantId" UUID NOT NULL,
  "domain" TEXT NOT NULL,
  CONSTRAINT "staff_domain_grants_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "staff_domain_grants_roleGrantId_domain_key" ON "staff_domain_grants"("roleGrantId", "domain");
ALTER TABLE "staff_domain_grants" ADD CONSTRAINT "staff_domain_grants_roleGrantId_fkey" FOREIGN KEY ("roleGrantId") REFERENCES "role_grants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "auth_sessions" ADD COLUMN "activeGrantId" UUID;
