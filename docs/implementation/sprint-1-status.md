# Sprint 1 Implementation Status

| Status | Evidence |
|---|---|
| Sprint | In progress |
| GitHub PR | [#35 — Artist product publication and media flow](https://github.com/mahdimarzooghi4-debug/negarin-house/pull/35), draft and not merged |
| Code commit verified by CI | `07a62eae51ecd82c1a635127fcc8152a021062ac` |
| Code CI | [GitHub Actions run #89](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36612998304): success |
| Product decision documentation | Commit `2527fa0985ab0bdabbe90fbb5b740320d0faf7d1`, verified by [CI run #91](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36615921765): success |
| Service Partner assigned request inbox | Commit `b25f5a890ba2acfedeaf5a7d67a24da2ae873483`, verified by [CI run #96](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36620594070): success |
| Service Partner web inbox | Commit `89a258628dc758bfccce009fd467b070081f634c`, verified by [CI run #98](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36622466621): success |
| Service Partner assigned request detail | Commit `1d856a0bfdd7e23cafdc0d6d9c7b94e71b4ce313`, verified by [CI run #100](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36623722611): success |
| Service Partner access-state handling | Commit `8f7b245c93b23eb422bcec7e0a16c4b6957cd5b5`, verified by [CI run #102](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36624962410): success |
| Organization registry and context validation | Commit `f5353cf4fae019fcd44151425fffd2f9670de3d7`, verified by [CI run #104](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36626783684): success |
| Service assignment authoring API | Commit `eb67808de3f9134210579a2315d888be72efe889`, verified by [CI run #108](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36628941018): success |
| Staff service assignment options and Admin page | Commit `e8d3ad6aa8138a4016a2684cd159dd086ba1c407`, verified by [CI run #111](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36632451376): success |
| Service Partner authorization tests | Commit `01be95c62b17534ec06d0e40be6f0c7dbd9118c7`, verified by [CI run #93](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36618211205): success |

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
- Web route tests verify same-origin protection, signed URL secrecy, body-size limits, storage forwarding, and upload completion. Playwright smoke checks cover the unauthenticated Artist workspace, staff review queue, Service Partner inbox and detail page, and partner locale shell.
- The API permits review submission without images, does not define a minimum image count, and rejects submission while any upload is pending.
- Service Partner assignments have a read-only API at `GET /api/v1/service-partner/assignments`. Its database query scopes results to the active partner organization and either organization-wide or current-user assignments; its response contains only partner-facing title, summary, assignment time, and request time.
- Service Partner HTTP tests verify organization/user assignment filtering, same-organization user assignment visibility, no-store responses, unauthenticated denial, other-role denial, and omission of Artist/financial fields.
- The RTL Service Partner web inbox is available at `/service-partner/assignments`. Its server-side loader uses the existing session-cookie-to-Bearer boundary and displays only the API's title, summary, assignment time, and request time. Missing-session, service-unavailable, and empty states contain no sample requests or Artist data; no request actions or lifecycle statuses are invented.
- A read-only request detail API and page are available at `GET /api/v1/service-partner/assignments/:assignmentId` and `/service-partner/assignments/:assignmentId`. The database query scopes by active organization and either organization-wide or current-user assignment; other assignments are concealed as 404. The response/page expose only the same partner-facing fields as the inbox.
- The Service Partner pages distinguish missing/invalid sessions (401) from role or organization authorization denial (403); a concealed assignment is shown as unavailable without revealing whether another user's assignment exists. Unit tests cover these states.
- A persisted `Organization` registry now covers Service Partner, Supporting Organization, and Corporate Buyer organizations. Role grants and Service Partner assignments reference registered organizations; active-context resolution verifies that the grant role matches the organization's kind. The migration backfills inferable organization scopes and aborts if one ID is used for conflicting organization kinds. Organization/member provisioning endpoints are not exposed.
- Staff with the live `services` permission can append an assignment for an existing service request through `POST /api/v1/admin/service-assignments`. The API requires a registered Service Partner organization, validates an optional individual assignee against an active grant in that same organization, and stores the authoring staff user ID. Legacy assignment authors remain null because their actors cannot be recovered. This API does not create requests, alter existing assignments, or add lifecycle, schedule, or deliverable rules.
- Staff can read real request and Service Partner organization choices from `GET /api/v1/admin/service-assignments/options`. The RTL authoring page is available at `/admin/service-assignments` under the existing “رشد و خدمات” navigation group; publication review is linked under “بازار”, preserving the approved nine Admin groups. The page uses same-origin writes, no-store responses, and truthful missing-session/forbidden/unavailable/empty states. It assigns to an organization and does not display sample requests or organizations.
- An Android-only React Native foundation is available at `apps/mobile`, with the shared Negarin logo, a Persian RTL bootstrap screen, and Android system UI theme support.
- The mobile app has a SecureStore adapter for an opaque session token. It rejects empty tokens, propagates storage errors, and configures Android backup rules to exclude SecureStore preferences. No token issuance, OTP screen, login endpoint, or logout/revocation flow is connected.
- Root CI run #89 verified frozen install, Prisma gates, audit, lint, typecheck, full tests, monorepo build (including Android bundle export), and Playwright E2E on the current code commit.

## Android validation and release scope

- Local `expo prebuild --platform android --no-install --clean` completed successfully, processing the Android icon, system theme, and SecureStore backup plugin. The generated native directory is local-only and ignored by Git.
- The CI build exports the Android JavaScript bundle; it does not produce or install an APK/AAB. No Android device/emulator QA has been run.
- Role-specific mobile journeys await Product/UX acceptance and Sprint planning. The stable Android application ID, signing, distribution channel, and supported-device matrix also remain release-planning decisions.

## CI evidence

Run #89 completed all configured gates successfully for code commit `07a62eae51ecd82c1a635127fcc8152a021062ac`: frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full test suite, monorepo build, Chromium install, and Playwright E2E smoke. API tests run with one Vitest worker because concurrent Serializable OTP tests previously produced PostgreSQL serialization conflicts.

Run #91 completed all configured gates successfully for product decision documentation commit `2527fa0985ab0bdabbe90fbb5b740320d0faf7d1`. The update records that public catalog visibility must not be inferred from the `approved` or `published` states until Product defines the rule.

Run #95 completed all configured gates successfully for Service Partner assignment API commit `ee3311cfb94d2e46d2a751514835fdccda522408`, including Prisma migration reset/deploy, API tests, and build.

Run #96 completed all configured gates successfully for the follow-up HTTP authorization test commit `b25f5a890ba2acfedeaf5a7d67a24da2ae873483`, including the positive case for a user-specific assignment.

Run #98 completed all configured gates successfully for Service Partner web inbox commit `89a258628dc758bfccce009fd467b070081f634c`, including frozen install, Prisma gates, security audit, lint, typecheck, tests, monorepo build, Chromium installation, and Playwright E2E smoke.

Run #100 completed all configured gates successfully for Service Partner read-only detail commit `1d856a0bfdd7e23cafdc0d6d9c7b94e71b4ce313`, including scoped detail authorization tests, migrations, build, and Playwright E2E smoke.

Run #102 completed all configured gates successfully for Service Partner 401/403/404 page-state handling commit `8f7b245c93b23eb422bcec7e0a16c4b6957cd5b5`, including unit tests, build, and Playwright E2E smoke.

Run #104 completed all configured gates successfully for Organization registry and active-context kind validation commit `f5353cf4fae019fcd44151425fffd2f9670de3d7`, including migration reset/deploy, PostgreSQL integration tests, build, and Playwright E2E smoke.

Run #107 failed because one test expected input validation to precede authorization for a staff user without the `services` permission. The test was corrected to check assignment membership with an authorized services user; the API continued to deny staff without that permission.

Run #108 completed all configured gates successfully for staff Service Partner assignment authoring commit `eb67808de3f9134210579a2315d888be72efe889`, including migration reset/deploy, authorization HTTP tests, build, and Playwright E2E smoke.

Run #110 failed because the options integration test assumed an otherwise empty database; the other API fixtures had already added requests and organizations. The assertion now targets its own fixture records.

Run #111 completed all configured gates successfully for staff assignment options and Admin page commit `e8d3ad6aa8138a4016a2684cd159dd086ba1c407`, including PostgreSQL tests, web route tests, build, and Playwright E2E smoke.

Run #93 completed all configured gates successfully for authorization test commit `01be95c62b17534ec06d0e40be6f0c7dbd9118c7`, including the expanded Service Partner assignment-isolation matrix.

This is automated CI evidence. It is not Stage QA, Release Approval, or Production evidence.

## Remaining Sprint 1 work and constraints

- No OTP/SMS provider is available; public login and session delivery remain disabled.
- The product/API slice has no Stage deployment or Stage QA evidence because no hosted Stage server is available.
- No payment gateway is available; purchase, payment, and settlement flows remain unimplemented.
- Customer public catalog work awaits the Product decision on whether `approved` or `published` makes an active product publicly visible, or whether a separate publish action is required.
- Service Partner assignment list/detail and staff assignment API/page are implemented. Organization/member provisioning, request creation, lifecycle transitions, and schedules/deliverables remain unimplemented.
- Mobile scope is Android. iOS is out of scope. Android app release identity and device QA are still open.
- PR #35 has no submitted GitHub review yet and remains draft.

Sprint 1 remains open until identity/session, Stage QA, and release gates are completed with real evidence.
