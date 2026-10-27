DROP INDEX "corporate_purchase_requests_createdByUserId_idempotencyKey_key";

CREATE UNIQUE INDEX "corp_purchase_request_org_creator_idem_key"
  ON "corporate_purchase_requests"("buyerOrganizationId","createdByUserId","idempotencyKey");
