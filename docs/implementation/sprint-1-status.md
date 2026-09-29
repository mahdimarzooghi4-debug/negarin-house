# Sprint 1 Implementation Status

| Status | Evidence |
|---|---|
| Sprint | In progress |
| GitHub PR | [#35 — Artist product publication and media flow](https://github.com/mahdimarzooghi4-debug/negarin-house/pull/35), draft and not merged |
| Code commit verified by CI | `3b0496b2b4f812d9995d68c1ba26aeedc8d91326` |
| CI | [GitHub Actions run #82](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36600344744): success |

## Delivered and verified

- Artist-owned product CRUD and reversible archive behavior are guarded by server-derived Artist ownership; price remains Artist-controlled.
- Artist publication submission, staff review permission, approve/request-changes decisions, and append-only review history are implemented. Review payloads omit Artist price.
- When Artist content or images cause an approved/published product to return to draft, the status change is written to publication history in the same database transaction. Price-only edits preserve status and do not create publication events.
- The staff review queue includes ready product images through signed read URLs; it does not return storage object keys.
- Artist media uploads are limited to JPEG, PNG, and WebP up to 10 MiB. Completion checks stored object metadata and promotes the staged upload to a unique final object key.
- Artists can request a fresh signed URL for a still-pending upload. The stored key and signed MIME/length contract remain unchanged; ready uploads and another Artist's media are denied or concealed.
- A new RTL Artist product workspace is available at `/artist/products`: it reads real API data, supports Artist-owned product creation/editing/archive/restore, shows review status, and presents the archive confirmation flow.
- A staff publication review queue is available at `/admin/publication-reviews`: authorized staff can see product content and signed ready-image previews, approve content, or request changes with required feedback. Artist prices are omitted.
- Mutating browser requests use same-origin Next.js routes; the server reads the expected `negarin_session` cookie and forwards its Bearer token to the API. No cookie is issued by this page, and unauthenticated visitors see a connection-required empty state with no sample product/price.
- Playwright smoke checks cover the unauthenticated Artist workspace, staff review queue, and partner locale shell.
- The Artist web page does not yet expose image upload or media management controls. The API permits submission without images, does not define a minimum image count, and rejects submission while any upload is pending.

## CI evidence

Run #82 completed all configured gates successfully for commit `3b0496b2b4f812d9995d68c1ba26aeedc8d91326`: frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full test suite, build, Chromium install, and Playwright E2E smoke. API tests run with one Vitest worker because concurrent Serializable OTP tests previously produced PostgreSQL serialization conflicts.

This is automated CI evidence for the cited commit. It is not Stage QA, Release Approval, or Production evidence.

## Remaining Sprint 1 work and constraints

- No OTP/SMS provider is available; public login and session delivery remain disabled.
- Artist image upload and media management controls remain before product media is usable end to end in web. API submission requires uploads to be complete when present; it does not define a minimum image count.
- The product/API slice has no Stage deployment or Stage QA evidence because no hosted Stage server is available.
- No payment gateway is available; purchase, payment, and settlement flows remain unimplemented.
- Mobile scope is Android. iOS is out of scope. Mobile workflows and design acceptance still need Product/UX and Sprint planning before implementation.
- PR #35 has no submitted GitHub review yet and remains draft.

Sprint 1 remains open until identity/session, Artist image management, Stage QA, and release gates are completed with real evidence.
