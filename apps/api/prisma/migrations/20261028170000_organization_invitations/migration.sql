CREATE TABLE "organization_invitations" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "invitedPhone" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "createdByUserId" UUID NOT NULL,
    "acceptedByUserId" UUID,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "organization_invitations_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "organization_invitations_acceptor_check" CHECK (("acceptedAt" IS NULL) = ("acceptedByUserId" IS NULL)),
    CONSTRAINT "organization_invitations_terminal_state_check" CHECK ("acceptedAt" IS NULL OR "revokedAt" IS NULL),
    CONSTRAINT "organization_invitations_expiry_check" CHECK ("expiresAt" > "createdAt")
);

CREATE UNIQUE INDEX "organization_invitations_tokenHash_key" ON "organization_invitations"("tokenHash");
CREATE INDEX "organization_invitations_organizationId_createdAt_id_idx" ON "organization_invitations"("organizationId", "createdAt", "id");
CREATE INDEX "organization_invitations_invitedPhone_expiresAt_acceptedAt_revokedAt_idx" ON "organization_invitations"("invitedPhone", "expiresAt", "acceptedAt", "revokedAt");
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_acceptedByUserId_fkey" FOREIGN KEY ("acceptedByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
