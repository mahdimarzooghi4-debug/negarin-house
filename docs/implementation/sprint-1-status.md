# Sprint 1 Implementation Status

| Status | Evidence |
|---|---|
| Sprint | In progress |
| GitHub PR | [#35 — Artist product publication and media flow](https://github.com/mahdimarzooghi4-debug/negarin-house/pull/35), draft and not merged |
| Code commit verified by CI | `ce1b2bf523fb5db30378fe77a5fff2291ab919c5` |
| CI | [GitHub Actions run #73](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36587813918): success |

## Delivered and verified

- Artist-owned product CRUD and reversible archive behavior are guarded by server-derived Artist ownership; price remains Artist-controlled.
- Artist publication submission, staff review permission, approve/request-changes decisions, and append-only review history are implemented. Review payloads omit Artist price.
- When Artist content or images cause an approved/published product to return to draft, the status change is written to publication history in the same database transaction. Price-only edits preserve status and do not create publication events.
- The staff review queue includes ready product images through signed read URLs; it does not return storage object keys.
- Artist media uploads are limited to JPEG, PNG, and WebP up to 10 MiB. Completion checks stored object metadata and promotes the staged upload to a unique final object key.
- Artists can request a fresh signed URL for a still-pending upload. The stored key and signed MIME/length contract remain unchanged; ready uploads and another Artist's media are denied or concealed.
- Portal smoke tests cover shared Partner locale shell behavior and do not claim that login, OTP delivery, or payment is active.

## CI evidence

Run #73 completed all configured gates successfully: frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full test suite, build, and Playwright E2E smoke.

This is automated CI evidence for the cited commit. It is not Stage QA, Release Approval, or Production evidence.

## Remaining Sprint 1 work and constraints

- Functional Artist product management pages and complete role-aware product review UI are not part of PR #35 yet.
- The product/API slice has no Stage deployment or Stage QA evidence because no hosted Stage server is available.
- No OTP/SMS provider is available; public login and session delivery remain disabled.
- No payment gateway is available; purchase, payment, and settlement flows remain unimplemented.
- Mobile scope is Android. iOS is out of scope. Mobile workflows and design acceptance still need Product/UX and Sprint planning before implementation.
- PR #35 has no submitted GitHub review yet and remains draft.

Sprint 1 remains open until its identity/session, UI, Stage QA, and release gates are completed with real evidence.
