# E6 — Private deliverable files

Business source: Phase 1 E6 deliverable upload, traceable assignment output and Negarin review; continues execution/review in PR #54. This slice supports server-validated images and UTF8 text. PDF, archives, Office documents, audio/video and arbitrary client URLs are not accepted; adding formats requires a corresponding validation pipeline.

## Intake and storage

Partner POST `/api/v1/service-partner/assignments/:id/files`: `{version,idempotencyKey,kind,label,base64}`. Assignment must be accepted and execution in_progress; shared execution version advances on every committed upload. kind image uses JPEG/PNG/WebP input max5MiB, actual image decode, pixel/animation/timeout constraints and metadata-stripped WebP re-encoding via the existing product-image normalization pipeline. kind text uses max1MiB, fatal UTF8 decode, canonical LF line endings and rejection of null/control/bidi bytes; stored as text/plain UTF8. Label max200, strict fields, canonical base64. No client object keys, MIME trust or external file URLs.

Server writes a unique private immutable object before the database transaction. Request row lock, version/state checks and a lifetime limit of100 committed files are rechecked inside the transaction. File metadata/hash, execution version and append-only event commit together. creator is authenticated assigned Partner, never a client override. A stable assignment+idempotencyKey plus original-command hash permits exact retries after later state changes; changed payload conflicts. Concurrent identical uploads keep one committed file and remove their own unused object. Competing versions conflict.

On database/audit failure the service checks for committed file metadata before deleting its own object. A failed/uncertain database lookup preserves the object rather than risking deletion after an uncertain commit. Such private orphans need an operational reconciliation task. A storage write failure returns503 and makes no database change. File metadata cannot be updated or deleted (DB trigger); no file overwrite/removal endpoint exists.

## Submission and review snapshots

Partner execution submit accepts optional fileIds (max8 unique UUIDs, default empty); other progress actions forbid fileIds. Every ID must refer to a committed file on this execution. Current submittedFileIds and submission event fileIds are written atomically. Staff correction/completion events retain the selected file IDs, so a later replacement submission does not rewrite what was reviewed. Existing text-only flows remain valid. Public submissionKind is text_report or report_with_files.

Partner and staff see own/scoped draft file metadata; Artist sees only files ever explicitly submitted to their own request. Artist view omits draft upload events and metadata. Previously submitted versions remain accessible after corrections, with a stable file ID, byte length, content type and SHA256. Metadata excludes objectKey, uploader, raw command hashes and request traces. Explicit file-ID snapshots are part of public operational history; financial/Artist-private information remains absent.

## Reads and permissions

- Partner GET `/api/v1/service-partner/assignments/:id/files/:fileId`: active organization + assigned user, including own draft files.
- Artist GET `/api/v1/artist/service-assignments/:id/files/:fileId`: own request and an actual submitted-event reference; draft/other Artist IDs return404.
- Staff GET `/api/v1/admin/service-assignments/:id/files/:fileId`: services permission, not finance/products permission.

Each read verifies assignment/file relationship before requesting a signed private URL (300 seconds); responses no-store. Signed URLs are bearer capabilities for their short lifetime, not permanent/public links. Production storage configuration must keep the bucket private. The tests exercise the adapter through an in-memory object store, not a deployed S3 bucket.

## Verification and remaining scope

Local tests cover strict contracts, malformed image/text bytes, normalization and role gates. Real PostgreSQL HTTP tests cover image re-encoding, draft/submitted visibility, cross-user/org/Artist/assignment denials, foreign submission IDs, exact concurrent retries and competing versions, correction/review snapshots, immutable metadata, storage failure and audit-failure rollback/object cleanup. Full CI required before review completion.

No service pricing/booking/credit consumption, Growth or money transfer, new AI, UI binding, merge or deploy. Remaining delivery operations: supported document formats, orphan reconciliation and live private-bucket QA. Next domain work can continue with service catalog/Artist booking under approved product rules.
