-- CreateEnum
CREATE TYPE "SupportProgramSource" AS ENUM ('supporting_organization', 'negarin_csr');
CREATE TYPE "SupportCreditStatus" AS ENUM ('available', 'reserved', 'consumed');
CREATE TYPE "SupportCreditAction" AS ENUM ('allocated', 'reserved', 'released', 'consumed', 'reversed');

-- CreateTable
CREATE TABLE "support_programs" (
  "id" UUID NOT NULL,
  "source" "SupportProgramSource" NOT NULL,
  "organizationId" UUID,
  "createdByUserId" UUID NOT NULL,
  "idempotencyKey" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "rules" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "support_programs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "support_program_events" (
  "id" UUID NOT NULL,
  "programId" UUID NOT NULL,
  "action" TEXT NOT NULL,
  "actorUserId" UUID NOT NULL,
  "command" JSONB NOT NULL,
  "requestTraceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "support_program_events_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "support_relationships" (
  "id" UUID NOT NULL,
  "programId" UUID NOT NULL,
  "artistUserId" UUID NOT NULL,
  "sponsorApprovedByUserId" UUID NOT NULL,
  "sponsorApprovedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "negarinApprovedByUserId" UUID,
  "negarinApprovedAt" TIMESTAMP(3),
  "version" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "support_relationships_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "support_relationship_events" (
  "id" UUID NOT NULL,
  "relationshipId" UUID NOT NULL,
  "version" INTEGER NOT NULL,
  "action" TEXT NOT NULL,
  "actorUserId" UUID NOT NULL,
  "command" JSONB NOT NULL,
  "requestTraceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "support_relationship_events_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "support_allocations" (
  "id" UUID NOT NULL,
  "programId" UUID NOT NULL,
  "relationshipId" UUID NOT NULL,
  "createdByUserId" UUID NOT NULL,
  "idempotencyKey" UUID NOT NULL,
  "amountToman" BIGINT NOT NULL,
  "rulesSnapshot" TEXT NOT NULL,
  "status" "SupportCreditStatus" NOT NULL DEFAULT 'available',
  "version" INTEGER NOT NULL DEFAULT 0,
  "currentServiceRequestId" UUID,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "support_allocations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "support_credit_events" (
  "id" UUID NOT NULL,
  "allocationId" UUID NOT NULL,
  "version" INTEGER NOT NULL,
  "action" "SupportCreditAction" NOT NULL,
  "amountToman" BIGINT NOT NULL,
  "serviceRequestId" UUID,
  "actorUserId" UUID NOT NULL,
  "command" JSONB NOT NULL,
  "requestTraceId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "support_credit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "support_programs_createdByUserId_idempotencyKey_key" ON "support_programs"("createdByUserId","idempotencyKey");
CREATE INDEX "support_programs_source_organizationId_createdAt_id_idx" ON "support_programs"("source","organizationId","createdAt","id");
CREATE UNIQUE INDEX "support_relationships_programId_artistUserId_key" ON "support_relationships"("programId","artistUserId");
CREATE UNIQUE INDEX "support_relationships_id_programId_key" ON "support_relationships"("id","programId");
CREATE INDEX "support_relationships_artistUserId_createdAt_id_idx" ON "support_relationships"("artistUserId","createdAt","id");
CREATE UNIQUE INDEX "support_relationship_events_relationshipId_version_key" ON "support_relationship_events"("relationshipId","version");
CREATE UNIQUE INDEX "support_allocations_createdByUserId_idempotencyKey_key" ON "support_allocations"("createdByUserId","idempotencyKey");
CREATE INDEX "support_allocations_relationshipId_status_createdAt_id_idx" ON "support_allocations"("relationshipId","status","createdAt","id");
CREATE INDEX "support_allocations_currentServiceRequestId_idx" ON "support_allocations"("currentServiceRequestId");
CREATE UNIQUE INDEX "support_credit_events_allocationId_version_key" ON "support_credit_events"("allocationId","version");
CREATE INDEX "support_credit_events_serviceRequestId_createdAt_id_idx" ON "support_credit_events"("serviceRequestId","createdAt","id");

-- AddForeignKey
ALTER TABLE "support_programs" ADD CONSTRAINT "support_programs_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_program_events" ADD CONSTRAINT "support_program_events_programId_fkey" FOREIGN KEY ("programId") REFERENCES "support_programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_program_events" ADD CONSTRAINT "support_program_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_relationships" ADD CONSTRAINT "support_relationships_programId_fkey" FOREIGN KEY ("programId") REFERENCES "support_programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_relationships" ADD CONSTRAINT "support_relationships_artistUserId_fkey" FOREIGN KEY ("artistUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_relationships" ADD CONSTRAINT "support_relationships_sponsorApprovedByUserId_fkey" FOREIGN KEY ("sponsorApprovedByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_relationships" ADD CONSTRAINT "support_relationships_negarinApprovedByUserId_fkey" FOREIGN KEY ("negarinApprovedByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_relationship_events" ADD CONSTRAINT "support_relationship_events_relationshipId_fkey" FOREIGN KEY ("relationshipId") REFERENCES "support_relationships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_relationship_events" ADD CONSTRAINT "support_relationship_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_allocations" ADD CONSTRAINT "support_allocations_programId_fkey" FOREIGN KEY ("programId") REFERENCES "support_programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_allocations" ADD CONSTRAINT "support_allocations_relationshipId_programId_fkey" FOREIGN KEY ("relationshipId","programId") REFERENCES "support_relationships"("id","programId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_allocations" ADD CONSTRAINT "support_allocations_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_allocations" ADD CONSTRAINT "support_allocations_currentServiceRequestId_fkey" FOREIGN KEY ("currentServiceRequestId") REFERENCES "service_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_credit_events" ADD CONSTRAINT "support_credit_events_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "support_allocations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_credit_events" ADD CONSTRAINT "support_credit_events_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "support_credit_events" ADD CONSTRAINT "support_credit_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Domain checks
ALTER TABLE "support_programs" ADD CONSTRAINT "support_program_source_scope_valid" CHECK (
  ("source" = 'supporting_organization' AND "organizationId" IS NOT NULL)
  OR ("source" = 'negarin_csr' AND "organizationId" IS NULL)
);
ALTER TABLE "support_programs" ADD CONSTRAINT "support_program_text_valid" CHECK (
  char_length(btrim("title")) BETWEEN 1 AND 200
  AND char_length(btrim("description")) BETWEEN 1 AND 4000
  AND char_length(btrim("rules")) BETWEEN 1 AND 8000
);
ALTER TABLE "support_program_events" ADD CONSTRAINT "support_program_event_valid" CHECK ("action" = 'created');
ALTER TABLE "support_relationships" ADD CONSTRAINT "support_relationship_approval_valid" CHECK (
  "version" >= 0
  AND (("negarinApprovedByUserId" IS NULL AND "negarinApprovedAt" IS NULL)
       OR ("negarinApprovedByUserId" IS NOT NULL AND "negarinApprovedAt" IS NOT NULL))
);
ALTER TABLE "support_relationship_events" ADD CONSTRAINT "support_relationship_event_valid" CHECK (
  "version" >= 0 AND "action" IN ('sponsor_approved','negarin_approved')
);
ALTER TABLE "support_allocations" ADD CONSTRAINT "support_allocation_valid" CHECK (
  "amountToman" > 0 AND "version" >= 0 AND char_length(btrim("rulesSnapshot")) BETWEEN 1 AND 8000
  AND (("status" = 'available' AND "currentServiceRequestId" IS NULL)
       OR ("status" IN ('reserved','consumed') AND "currentServiceRequestId" IS NOT NULL))
);
ALTER TABLE "support_credit_events" ADD CONSTRAINT "support_credit_event_valid" CHECK (
  "version" >= 0 AND "amountToman" > 0
  AND (("action" = 'allocated' AND "serviceRequestId" IS NULL)
       OR ("action" <> 'allocated' AND "serviceRequestId" IS NOT NULL))
);

-- Append-only audit ledgers
CREATE FUNCTION support_program_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Support program events are append-only'; END $$;
CREATE TRIGGER support_program_events_immutable BEFORE UPDATE OR DELETE ON "support_program_events" FOR EACH ROW EXECUTE FUNCTION support_program_events_immutable();

CREATE FUNCTION support_relationship_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Support relationship events are append-only'; END $$;
CREATE TRIGGER support_relationship_events_immutable BEFORE UPDATE OR DELETE ON "support_relationship_events" FOR EACH ROW EXECUTE FUNCTION support_relationship_events_immutable();

CREATE FUNCTION support_credit_events_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Support credit events are append-only'; END $$;
CREATE TRIGGER support_credit_events_immutable BEFORE UPDATE OR DELETE ON "support_credit_events" FOR EACH ROW EXECUTE FUNCTION support_credit_events_immutable();

-- Financial identity and rules are immutable after allocation. Only lifecycle status/version/current request may change.
CREATE FUNCTION support_allocation_immutable_fields() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."programId" IS DISTINCT FROM OLD."programId"
     OR NEW."relationshipId" IS DISTINCT FROM OLD."relationshipId"
     OR NEW."createdByUserId" IS DISTINCT FROM OLD."createdByUserId"
     OR NEW."idempotencyKey" IS DISTINCT FROM OLD."idempotencyKey"
     OR NEW."amountToman" IS DISTINCT FROM OLD."amountToman"
     OR NEW."rulesSnapshot" IS DISTINCT FROM OLD."rulesSnapshot"
     OR NEW."createdAt" IS DISTINCT FROM OLD."createdAt" THEN
    RAISE EXCEPTION 'Support allocation immutable fields cannot change';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER support_allocation_immutable_fields BEFORE UPDATE ON "support_allocations" FOR EACH ROW EXECUTE FUNCTION support_allocation_immutable_fields();

CREATE FUNCTION support_allocation_no_delete() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Support allocations cannot be deleted'; END $$;
CREATE TRIGGER support_allocation_no_delete BEFORE DELETE ON "support_allocations" FOR EACH ROW EXECUTE FUNCTION support_allocation_no_delete();
