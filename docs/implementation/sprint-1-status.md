# Sprint 1 Implementation Status

| Status | Evidence |
|---|---|
| Sprint | In progress |
| GitHub PR | [#35 — Artist product publication and media flow](https://github.com/mahdimarzooghi4-debug/negarin-house/pull/35), draft and not merged |
| Code commit verified by CI | `647ed09f12d89f7f9fe8a61429593a75cf0f3ba5` |
| CI | [GitHub Actions run #87](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36606809990): success |

## Delivered and verified

- Artist-owned product CRUD and reversible archive behavior are guarded by server-derived Artist ownership; price remains Artist-controlled.
- Artist publication submission, staff review permission, approve/request-changes decisions, and append-only review history are implemented. Review payloads omit Artist price.
- When Artist content or images cause an approved/published product to return to draft, the status change is written to publication history in the same database transaction. Price-only edits preserve status and do not create publication events.
- The staff review queue includes ready product images through signed read URLs; it does not return storage object keys.
- Artist media uploads are limited to JPEG, PNG, and WebP up to 10 MiB. Completion checks stored object metadata and promotes the staged upload to a unique final object key.
- Artists can request a fresh signed URL for a still-pending upload. The stored key and signed MIME/length contract remain unchanged; ready uploads and another Artist's media are denied or concealed.
- A new RTL Artist product workspace is available at `/artist/products`: it reads real API data, supports Artist-owned product creation/editing/archive/restore, shows review status, and presents the archive confirmation flow.
- A staff publication review queue is available at `/admin/publication-reviews`: authorized staff can see product content and signed ready-image previews, approve content, or request changes with required feedback. Artist prices are omitted.
- The Artist product page can add multiple JPEG, PNG, or WebP images (up to 10 MiB each), show signed previews, and retry pending uploads by selecting the same file. The same-origin web handler keeps signed upload URLs server-side and bounds streamed bodies.
- Mutating browser requests use same-origin Next.js routes; the server reads the expected `negarin_session` cookie and forwards its Bearer token to the API. No cookie is issued by this page, and unauthenticated visitors see a connection-required empty state with no sample product/price.
- Web route tests verify same-origin protection, signed URL secrecy, body-size limits, storage forwarding, and upload completion. Playwright smoke checks cover the unauthenticated Artist workspace, staff review queue, and partner locale shell.
- The API permits review submission without images, does not define a minimum image count, and rejects submission while any upload is pending.
- An Android-only React Native foundation is available at `apps/mobile`, with the shared Negarin logo, a Persian RTL bootstrap screen, and Android system UI theme support. Root CI run #87 verified frozen install, mobile lint/typecheck/test, and Android JavaScript bundle export as part of the complete monorepo gates.

## Android validation and release scope

- Local `expo prebuild --platform android --no-install` completed successfully and processed the Android icon configuration. The generated native directory is local-only and ignored by Git.
- The CI build exports the Android JavaScript bundle; it does not produce or install an APK/AAB. No Android device/emulator QA has been run.
- Role-specific mobile journeys await Product/UX acceptance and Sprint planning. The stable Android application ID, signing, distribution channel, and supported-device matrix also remain release-planning decisions.

## CI evidence

Run #87 completed all configured gates successfully for commit `647ed09f12d89f7f9fe8a61429593a75cf0f3ba5`: frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full test suite, monorepo build, Chromium install, and Playwright E2E smoke. API tests run with one Vitest worker because concurrent Serializable OTP tests previously produced PostgreSQL serialization conflicts.

This is automated CI evidence for the cited commit. It is not Stage QA, Release Approval, or Production evidence.

## Remaining Sprint 1 work and constraints

- No OTP/SMS provider is available; public login and session delivery remain disabled.
- The product/API slice has no Stage deployment or Stage QA evidence because no hosted Stage server is available.
- No payment gateway is available; purchase, payment, and settlement flows remain unimplemented.
- Mobile scope is Android. iOS is out of scope. Android app release identity and device QA are still open.
- PR #35 has no submitted GitHub review yet and remains draft.

Sprint 1 remains open until identity/session, Stage QA, and release gates are completed with real evidence.
