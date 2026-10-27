# E6 — Deliverable file slice

Source: approved E6 assignment-scoped deliverable upload and Negarin review; service execution foundation.

Acceptance:
1. Assigned Partner uploads actual validated image/text bytes while execution is in_progress; no trusted client MIME, paths or URLs.
2. Private immutable objects and metadata connect to the shared assignment/execution identity.
3. Idempotent upload key, version control and atomic audit prevent duplicate/partial records; only known uncommitted objects are removed on failure.
4. Submission explicitly snapshots up to8 same-assignment files; staff decisions retain that snapshot across later corrections.
5. Artist reads own submitted files only, Partner own draft/submitted files, staff services-scoped files. Cross-user/org/Artist/assignment IDs are concealed.
6. Metadata and history are immutable; signed reads are short-lived/no-store and expose no internal keys/actor data.
7. Contracts and PostgreSQL HTTP concurrency/privacy/rollback tests pass in CI; review precedes Stage/QA/Release approval.

Supported formats are deliberately bounded to normalized JPEG/PNG/WebP and UTF8 text. Further formats require validation; orphan reconciliation and live private-bucket QA remain operational release work. No payment/credit/Growth side effects or UI binding are in this slice.
