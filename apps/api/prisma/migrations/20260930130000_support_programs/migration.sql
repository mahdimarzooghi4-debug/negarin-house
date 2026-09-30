CREATE TABLE "support_programs" (
  "id" UUID NOT NULL,
  "organizationId" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "support_programs_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "support_programs_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "organizations"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "support_programs_organizationId_createdAt_idx"
  ON "support_programs"("organizationId", "createdAt");
