CREATE TABLE "corporate_purchase_request_events" (
    "id" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "actorUserId" UUID NOT NULL,
    "status" "CorporatePurchaseRequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "corporate_purchase_request_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "corporate_purchase_request_events_requestId_createdAt_idx"
    ON "corporate_purchase_request_events"("requestId", "createdAt");

ALTER TABLE "corporate_purchase_request_events"
    ADD CONSTRAINT "corporate_purchase_request_events_requestId_fkey"
    FOREIGN KEY ("requestId") REFERENCES "corporate_purchase_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "corporate_purchase_request_events"
    ADD CONSTRAINT "corporate_purchase_request_events_actorUserId_fkey"
    FOREIGN KEY ("actorUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "corporate_purchase_request_events" ("id", "requestId", "actorUserId", "status", "createdAt")
SELECT gen_random_uuid(), "id", "requestedByUserId", "status", "createdAt"
FROM "corporate_purchase_requests";
