# Artist story photos

Artist story editors now upload, replace and remove one current JPEG/PNG/WebP photo (maximum 5 MiB source). The backend reuses the existing full-decode, metadata-stripping, pixel-limited WebP normalization and private immutable object storage. Video is not implemented.

Save the story before uploading; unsaved text disables photo changes. Every photo change requires the current story version, increments it and unpublishes the story. Failed or ambiguous uploads require a fresh story-list read before retry. Owners can preview only the current photo; public reads require both profile and story publication and the current image ID. Previous immutable objects remain private for history; each story has a serialized quota of 100 stored photos. Committed uploads are retained after ambiguous transaction errors.

Read URLs use the existing 300-second signed URL expiry. Previously issued URLs can remain valid until expiry after unpublishing/replacement; no immediate revocation is promised. Storage configuration is the existing S3-compatible private bucket setup. No new external service is provisioned.

Validation includes real HTTP/PostgreSQL tests with an in-memory object-storage adapter for ownership, publication, stale/concurrent writes, removal, malformed image input and storage outages; browser coverage exercises upload/removal and draft status. PostgreSQL/browser suites execute in CI.
