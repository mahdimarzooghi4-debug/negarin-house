-- AlterTable
ALTER TABLE "service_executions" ADD COLUMN     "submittedFileIds" UUID[] DEFAULT ARRAY[]::UUID[];

-- AlterTable
ALTER TABLE "service_execution_events" ADD COLUMN     "fileIds" UUID[] DEFAULT ARRAY[]::UUID[];

-- CreateTable
CREATE TABLE "service_deliverable_files" (
    "id" UUID NOT NULL,
    "assignmentId" UUID NOT NULL,
    "uploadedByUserId" UUID NOT NULL,
    "idempotencyKey" UUID NOT NULL,
    "commandHash" TEXT NOT NULL,
    "uploadedExecutionVersion" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "byteLength" INTEGER NOT NULL,
    "sha256" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_deliverable_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_deliverable_files_objectKey_key" ON "service_deliverable_files"("objectKey");

-- CreateIndex
CREATE UNIQUE INDEX "service_deliverable_files_assignmentId_idempotencyKey_key" ON "service_deliverable_files"("assignmentId", "idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "service_deliverable_files_assignmentId_uploadedExecutionVer_key" ON "service_deliverable_files"("assignmentId", "uploadedExecutionVersion");

-- AddForeignKey
ALTER TABLE "service_deliverable_files" ADD CONSTRAINT "service_deliverable_files_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "service_executions"("assignmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_deliverable_files" ADD CONSTRAINT "service_deliverable_files_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "identity_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "service_deliverable_files" ADD CONSTRAINT "service_file_valid" CHECK ("uploadedExecutionVersion" > 0 AND "sha256" ~ '^[0-9a-f]{64}$' AND "commandHash" ~ '^[0-9a-f]{64}$' AND "byteLength" > 0 AND (("contentType" = 'image/webp' AND "byteLength" <= 5242880) OR ("contentType" = 'text/plain; charset=utf-8' AND "byteLength" <= 1048576)));
ALTER TABLE "service_executions" ADD CONSTRAINT "service_submission_files_bounded" CHECK (cardinality("submittedFileIds") <= 8 AND array_position("submittedFileIds", NULL) IS NULL);
ALTER TABLE "service_execution_events" ADD CONSTRAINT "service_event_files_bounded" CHECK (cardinality("fileIds") <= 8 AND array_position("fileIds", NULL) IS NULL);
CREATE FUNCTION service_deliverable_files_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Service deliverable files are immutable'; END $$;
CREATE TRIGGER service_deliverable_files_immutable BEFORE UPDATE OR DELETE ON "service_deliverable_files" FOR EACH ROW EXECUTE FUNCTION service_deliverable_files_immutable();
ALTER TABLE "service_executions" ALTER COLUMN "submittedFileIds" SET NOT NULL;
ALTER TABLE "service_execution_events" ALTER COLUMN "fileIds" SET NOT NULL;
