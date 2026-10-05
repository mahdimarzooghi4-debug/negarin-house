DROP INDEX "support_allocations_createdByUserId_idempotencyKey_key";

CREATE UNIQUE INDEX "support_allocation_relationship_creator_idem_key"
  ON "support_allocations"("relationshipId","createdByUserId","idempotencyKey");
