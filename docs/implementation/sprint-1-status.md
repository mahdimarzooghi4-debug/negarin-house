# Sprint 1 Implementation Status

## 2026-10-01 — Corporate Buyer purchase and order flow

- Corporate Buyers can submit a purchase request or place a direct order from a published product page. Both actions require a server-validated active Corporate Buyer organization.
- Artists manage each product's available quantity. A purchase request records the requested quantity and note without reserving stock. A direct order snapshots the product title and price, atomically reserves stock, and starts in `awaiting_payment`; the buyer can cancel it to release stock.
- Request and order history are scoped to the active buyer organization and available in the Corporate Buyer portal. Web UI is implemented; Android purchasing awaits the SMS/session configuration and buyer role journey.
- No payment was collected. Direct orders remain unpaid until the payment provider is configured. Stage testing and visual review are next and will be performed together.

## 2026-10-01 — Customer storefront web and Android slice

- The responsive `/customer` web catalog now follows the supplied Customer/Mobile direction with a discovery hero, Persian search, and published-product cards. It uses only products returned by the public catalog API.
- The Android app now loads `GET /api/v1/customer/catalog`, supports Persian search, pull-to-refresh, and a read-only product detail view. Loading, empty, unavailable, missing-image, and no-result states contain no fabricated products or prices.
- Android ordering, payment, customer authentication, APK/AAB signing, and device QA remain outside this slice. The Expo build exports an Android JavaScript bundle only.
- The supplied Artist, Admin, Service Partner, and Supporting Organization dashboards now have data-backed entry pages. Export Partner still needs approved procurement rules. The new screens still need Stage QA and visual comparison on a device/browser.
- Figma's hero artwork URLs returned a host-level “Site Unavailable” page when downloaded, so the storefront uses the approved palette and layout direction but does not yet include the decorative hero vectors. No temporary Figma URLs were left in the code.
- Verification: `corepack pnpm@12.7.0 turbo run lint test typecheck build --filter=@negarin/mobile --filter=@negarin/web` passed, including 30 mobile tests, 37 web tests, Next.js production build, and Android bundle export.

| Status | Evidence |
|---|---|
| Sprint | In progress |
| GitHub PR | [#35 — Artist product publication and media flow](https://github.com/mahdimarzooghi4-debug/negarin-house/pull/35), draft and not merged |
| Code commit verified by CI | `6321f77c0867b99536ceee3c8dee1393c46522fb` |
| Code CI | [GitHub Actions run #189](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36738165919): success |
| Sprint status documentation | Commit `185772f203fcd2e203c93b87e699e2b76ec299f2`, verified by [CI run #190](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36738636593): success |
| Product decision documentation | Commit `2527fa0985ab0bdabbe90fbb5b740320d0faf7d1`, verified by [CI run #91](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36615921765): success |
| Service Partner assigned request inbox | Commit `b25f5a890ba2acfedeaf5a7d67a24da2ae873483`, verified by [CI run #96](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36620594070): success |
| Service Partner web inbox | Commit `89a258628dc758bfccce009fd467b070081f634c`, verified by [CI run #98](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36622466621): success |
| Service Partner assigned request detail | Commit `1d856a0bfdd7e23cafdc0d6d9c7b94e71b4ce313`, verified by [CI run #100](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36623722611): success |
| Service Partner access-state handling | Commit `8f7b245c93b23eb422bcec7e0a16c4b6957cd5b5`, verified by [CI run #102](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36624962410): success |
| Organization registry and context validation | Commit `f5353cf4fae019fcd44151425fffd2f9670de3d7`, verified by [CI run #104](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36626783684): success |
| Export Partner Organization registry | Commit `130587095fe77a867f2ebcf005e7c771e2fb33b6`, verified by [CI run #150](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36695628469): success |
| Export Partner locale E2E | Commit `27f22dd17a95777c460347cc84b76f31ce68f248`, verified by [CI run #152](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36698741696): success |
| Export Publication review policy | Commit `5daabe55deb2af2af1c46e1a59ba5224607c28b7`, verified by [CI run #154](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36699888271): success |
| Export Partner order-read policy | Commit `67650fce262fd446ec927707f5ac60a83b8cf87b`, verified by [CI run #156](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36701379715): success |
| Supporting Organization and Corporate Buyer shell E2E | Commit `99293570eb018704e1663a23f9011c2c19e98e5c`, verified by [CI run #158](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36703264466): success |
| Browser session logout bridge | Commit `b0918a563e2dcde0c4568e8d6ec81f056fa5cb82`, verified by [CI run #162](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36707801768): success |
| Android bearer-session logout boundary | Commit `16da2db0f15d58c1bdae22f9c96d1d6b891aeebd`, verified by [CI run #170](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36713859045): success |
| Android identity API client | Commit `c777f40b69ba6db2a95a6057a40db8ac9fd33641`, included in code head verified by [CI run #177](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36718225206): success |
| Android identity state resolver | Commit `9849caaa9acd1b4961868c1cca458e24ce0bc4c9`, verified by [CI run #179](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36719825762): success |
| Android explicit identity grant selection | Commit `3ccd88bc4ed69ab0669f133bf795e93d99046ee4`, verified by [CI run #181](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36722135712): success |
| Selectable identity grant discovery | Commit `ef2ddd4a2482ac11dc6115fa8f0e78490086fdcd`, verified by [CI run #164](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36709822036): success |
| Same-session role switching regression | Commit `1ac5050bbdc4387702a9fe4480056df67cfe8904`, verified by [CI run #166](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36710844293): success |
| Direct Artist payment authorization guard | Commit `a8d86439e60a70ba670429db5d1822ebefe36d15`, verified by [CI run #168](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36712247886): success |
| Service assignment authoring API | Commit `eb67808de3f9134210579a2315d888be72efe889`, verified by [CI run #108](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36628941018): success |
| Staff service assignment options and Admin page | Commit `e8d3ad6aa8138a4016a2684cd159dd086ba1c407`, verified by [CI run #111](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36632451376): success |
| Bounded same-origin JSON writes | Commit `f8143b50d37b4bd93c4ee2fecc77b10c9b4e17b6`, verified by [CI run #113](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36668167128): success |
| Service Partner authorization tests | Commit `01be95c62b17534ec06d0e40be6f0c7dbd9118c7`, verified by [CI run #93](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36618211205): success |
| Role coverage and deferred Stage gate | Commit `5e2706f9d248feec5d8738ad34d6b055c432fabf`, verified by [CI run #116](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36669853344): success |
| Service Partner scoped deliverable uploads | Commit `26699bea3fa083e1781cc8a373b30d50d1357c3a`, verified by [CI run #118](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36671444014): success |
| Service Partner assignment response | Commit `f482d695dfed2e0fabc966c52edc0a35ddfd945c`, verified by [CI run #121](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/36673024943): success |
| Service Partner deliverable submission | Commit `a16a2aa9c79148feeca17a56fb9ecba1e205434a`, verified in CI run #124: success |
| Staff view of submitted Service Partner deliverables | Commit `4ed97965ccd067474b369381146f8ddad935fe4e`, included in verified head `d0b36da373309876f0dee4927958b94b960f6dbf`, CI run #128: success |

## Delivered and verified

- Artist-owned product CRUD and reversible archive behavior are guarded by server-derived Artist ownership; price remains Artist-controlled.
- Artist publication submission, staff review permission, approve/request-changes decisions, and append-only review history are implemented. Review payloads omit Artist price.
- When Artist content or images cause an approved/published product to return to draft, the status change is written to publication history in the same database transaction. Price-only edits preserve status and do not create publication events.
- The staff review queue includes ready product images through signed read URLs; it does not return storage object keys.
- Artist media uploads are limited to JPEG, PNG, and WebP up to 10 MiB. Completion checks stored object metadata and promotes the staged upload to a unique final object key.
- Artists can request a fresh signed URL for a still-pending upload. The stored key and signed MIME/length contract remain unchanged; ready uploads and another Artist's media are denied or concealed.
- A new RTL Artist product workspace is available at `/artist/products`: it reads real API data, supports Artist-owned product creation/editing/archive/restore, shows review status, and presents the archive confirmation flow.
- A staff publication review queue is available at `/admin/publication-reviews`: authorized staff can see product content and signed ready-image previews, approve content, or request changes with required feedback. Artist prices are omitted.
- Admin controls public visibility through a distinct publish/unpublish action after content approval. Only active `published` products appear in the public Customer catalog; the catalog and details show Artist-set Toman prices, available quantity, and ready signed images, and expose no Artist identity or storage keys.
- Corporate Buyer product details support organization-scoped purchase requests and direct orders. Requests do not reserve stock; direct orders snapshot title and price, reserve stock atomically, and remain `awaiting_payment` until payment-provider integration. Buyers can cancel awaiting-payment orders and return reserved stock.
- The Artist product page can add multiple JPEG, PNG, or WebP images (up to 10 MiB each), show signed previews, and retry pending uploads by selecting the same file. The same-origin web handler keeps signed upload URLs server-side and bounds streamed bodies.
- Browser requests use same-origin Next.js routes; the server reads the expected `negarin_session` cookie and forwards its Bearer token to the API. No cookie is issued by this page, and unauthenticated visitors see a connection-required empty state with no sample product/price. The same-origin `POST /api/identity/logout` bridge calls the API revocation endpoint and clears a valid or stale cookie; it preserves the cookie when the API is unavailable so the request can be retried.
- Web route tests verify same-origin protection, signed URL secrecy, body-size limits, storage forwarding, and upload completion. Playwright smoke checks cover the unauthenticated Artist workspace, staff review queue, Service Partner inbox and detail page, and partner locale shell. Same-origin browser JSON writes use a shared 64 KiB streaming limit; oversized bodies are rejected before forwarding.
- The API permits review submission without images, does not define a minimum image count, and rejects submission while any upload is pending.
- Service Partner assignments have a read-only API at `GET /api/v1/service-partner/assignments`. Its database query scopes results to the active partner organization and either organization-wide or current-user assignments; its response contains only partner-facing title, summary, assignment time, and request time.
- Service Partner HTTP tests verify organization/user assignment filtering, same-organization user assignment visibility, no-store responses, unauthenticated denial, other-role denial, and omission of Artist/financial fields.
- Artists can create ServiceRequests with a title and description at `/artist/services`; they can read only their own requests. A services-authorized Admin assigns a registered Service Partner through the existing assignment flow.
- Admins with the services permission can approve a submitted Service Partner deliverable, which completes its assignment in the same transaction, or request changes with required feedback. The Partner sees the outcome and can submit a replacement file after changes are requested; Partner mutations are blocked once the service is complete.
- Supporting Organizations can create, list, and edit basic support-program records, scoped to their active registered organization. Only the program name and optional description are captured; no budget, quota, service credit, referral, or artist-approval behavior is implied.
- The RTL Service Partner web inbox is available at `/service-partner/assignments`. Its server-side loader uses the existing session-cookie-to-Bearer boundary and displays only the API's title, summary, assignment time, and request time. Missing-session, service-unavailable, and empty states contain no sample requests or Artist data; no request actions or lifecycle statuses are invented.
- A read-only request detail API and page are available at `GET /api/v1/service-partner/assignments/:assignmentId` and `/service-partner/assignments/:assignmentId`. The database query scopes by active organization and either organization-wide or current-user assignment; other assignments are concealed as 404. The response/page expose only the same partner-facing fields as the inbox.
- The Service Partner pages distinguish missing/invalid sessions (401) from role or organization authorization denial (403); a concealed assignment is shown as unavailable without revealing whether another user's assignment exists. Unit tests cover these states.
- The authenticated context HTTP test now switches one session between its Artist and Corporate Buyer grants, verifies that each selected role appears in the server-derived context, and confirms that revoking the active grant invalidates that context without invalidating the user's other grant.
- Identity grant discovery exposes only the current user's active grants that pass the same server-side role, organization-kind, and staff-permission validation used by context selection. A revoked or otherwise invalid active grant is reported as no active grant; PostgreSQL HTTP tests cover mismatched organization scope, cross-user selection, and revoked grants.
- A persisted `Organization` registry now covers Service Partner, Supporting Organization, and Corporate Buyer organizations. Role grants and Service Partner assignments reference registered organizations; active-context resolution verifies that the grant role matches the organization's kind. The migration backfills inferable organization scopes and aborts if one ID is used for conflicting organization kinds. Organization/member provisioning endpoints are not exposed.
- Export Partner identity now uses the same `Organization` registry. A guarded migration moves legacy `RoleGrant.exportPartnerId` values into `organizationId`, aborts on cross-kind identifier collisions, and clears the legacy scope field; the active-context resolver accepts Export Partner grants only when they point to a registered `export_partner` organization. No provisioning, order, or payment flow is added.
- The authorization package denies direct-to-Artist payment commands for every user role. This is a fail-closed authorization guard only; it introduces no payment endpoint, order/payment model, fee, or settlement behavior.
- The shared authorization package permits Export Publication review actions only to staff grants carrying the `international` permission domain. Other roles and staff with unrelated or missing domains are denied; the policy adds no export status or transition.
- The shared authorization package permits reading an Export Partner order only when the active Export Partner role is bound to the same registered organization as the order. Missing or mismatched organization scope is concealed, and every other role is denied. This is a policy primitive only; no order model, endpoint, workflow, or payment behavior is added.
- The HTTP authorization-boundary integration test denies a Supporting Organization access to an Artist domestic-finance resource with 403 and no resource identifier. This test-only route exercises the live session/context guard and does not expose a finance endpoint or data model.
- The shared authorization package has a fail-closed policy for reading an already-persisted `SupportRelationship`: only a Supporting Organization in the same organization scope is allowed; cross-organization resources are concealed, and other roles are denied. This policy primitive does not add a SupportRelationship model, endpoint, Artist administration, or finance access.
- Corporate Buyer HTTP integration tests deny access to Artist product list/detail/create/edit/archive operations and deny Artist domestic-finance reads with 403. The Artist's product price and state remain unchanged; no public catalog, order, or finance endpoint is added.
- The Corporate Buyer order-read policy is covered across all canonical roles: only a Corporate Buyer in the matching organization can read the order; absent or mismatched organization scope is concealed, and every other role is denied.
- Export Partner HTTP integration tests deny access to Artist product list/detail/create/edit/archive operations and Artist domestic-finance reads with 403. This protects the domestic finance boundary and price control; no export order or payment flow is implemented by these tests.
- An Artist can create a ServiceRequest through `POST /api/v1/artist/service-requests`, providing a title and description; the API records ownership and scopes reads to that Artist. Staff with the live `services` permission can also create a request through `POST /api/v1/admin/service-requests`, providing the partner-facing title and optional summary. Both paths validate input and reject unknown fields; neither adds scheduling or execution progress.
- Staff with the live `services` permission can append an assignment for an existing service request through `POST /api/v1/admin/service-assignments`. The API requires a registered Service Partner organization, validates an optional individual assignee against an active grant in that same organization, and stores the authoring staff user ID. Legacy assignment authors remain null because their actors cannot be recovered. This API does not alter existing assignments or add lifecycle, schedule, or deliverable rules.
- Service Partners can respond once to an assignment with accept/decline. The API rechecks organization and individual assignment scope, records an append-only response event, and rejects a second response. Upload is available only after acceptance.
- Service Partners can list and attach scoped PDF/JPEG/PNG/WebP deliverables to an accepted request through a same-origin upload flow. The API verifies assignment scope and object metadata, promotes completed files to private unique keys, and exposes signed read URLs only for ready files; the only upload states are technical `pending` and `ready`.
- A Service Partner can submit a ready deliverable for Negarin review. Each submission is recorded; after an Admin requests changes with feedback, the Partner can submit a replacement file. Assignment history includes recorded assignment, response, file-registration, review-submission, review-decision, and completion events while omitting actor IDs and storage keys.
- Services-authorized Admins can read submitted ready deliverables and either request changes with required feedback or approve the deliverable. Approval records the decision and completes the assignment atomically. Repeated reviews and Partner mutations after completion are rejected. The view omits storage keys, actor IDs, Artist identifiers, and prices; signed read URLs are short-lived.
- Staff can create requests from `/admin/service-requests` and read real request and Service Partner organization choices from `GET /api/v1/admin/service-assignments/options`. The RTL assignment page is available at `/admin/service-assignments` under the existing “رشد و خدمات” navigation group; publication review is linked under “بازار”, preserving the approved nine Admin groups. Both forms use same-origin writes, no-store responses, and truthful missing-session/forbidden/unavailable/empty states. They do not display sample requests or organizations.
- Playwright checks all seven approved Export Partner locales for the shared shell, exact `lang` and `dir`, seven navigation items, one logo, and the absence of the Portuguese route; Arabic is RTL and the other six locales are LTR.
- Playwright covers the Supporting Organization and Corporate Buyer shell routes, checking RTL direction, role navigation counts, truthful shared empty states, and no operational buttons or linked workflows while their business flows remain unimplemented.
- An Android-only React Native foundation is available at `apps/mobile`, with the shared Negarin logo, a Persian RTL bootstrap screen, and Android system UI theme support.
- Android now has an identity API client for grant discovery, active-context reads, and server-authoritative grant selection. It reads the opaque token from SecureStore per request, validates API response shapes, and does not issue sessions, create role grants, or add login/UI.
- Android grant activation now requires an explicit ID from the server-provided selectable-grant list, calls the server context-selection endpoint, and rejects the result unless role and organization scope match that grant. Tests cover unavailable IDs, empty grant lists, empty IDs, and mismatched server context. This adds no local default role or login/UI.
- A mobile identity-state resolver maps server responses to signed-out, no-grants, grant-selection-required, or active-context states. It never assigns a default role and rejects a context that does not match the selected grant.
- The mobile app has a SecureStore adapter for an opaque session token. It rejects empty tokens, propagates storage errors, and configures Android backup rules to exclude SecureStore preferences. A tested Android logout boundary calls the existing bearer-session revocation API; it clears the local token after 204 or an already-invalid-session 401 and retains it after network/server failure. It is not connected to a login screen or exposed as a user-facing journey. The browser also has a same-origin logout bridge. No token issuance, OTP screen, or login endpoint is connected.
- Root CI run #89 verified frozen install, Prisma gates, audit, lint, typecheck, full tests, monorepo build (including Android bundle export), and Playwright E2E on the current code commit.

## Role implementation coverage

This is a code-coverage snapshot, not a release or Stage sign-off.

| Role / capability | Implemented in code | Remaining role code |
|---|---|---|
| Customer | Public catalog and product detail for active products explicitly published by Admin; Corporate Buyer request and direct-order actions on product details | Android buyer actions, order payment, and fulfilment remain open. |
| Artist | Product CRUD, media, publication submission/status, review feedback, and owned service-request intake/status | Customer-order fulfillment, finance/settlement, Growth, and approved mobile journeys remain open. |
| Admin / Staff | Publication review and visibility control; services-authorized ServiceRequest authoring/assignment and submitted-deliverable review | Operational features for other domains remain open and must use scoped permissions. |
| Service Partner | Organization/user-scoped inbox/detail and activity history, accept/decline, scoped private uploads, submit-for-review, review feedback, and completed status | Organization/member provisioning, scheduling, and execution progress remain open; upload `pending/ready` are technical states only. |
| Supporting Organization | Organization registry/context, organization-scoped SupportProgram create/list/edit, HTTP-tested denial of Artist product and domestic-finance access, and an organization-scoped SupportRelationship read-policy primitive | Artist referrals and their review/consent rules, shared support relationships, membership support, service credits/quotas/usage, organization users, and scoped reports remain open. |
| Corporate Buyer | Organization registry/context, published-product purchase requests, direct orders with stock reservation, cancellation, organization-scoped request/order history, and HTTP integration coverage | Payment provider, request review/quotation, delivery/fulfilment, provisioning, and Android buying journey remain open. |
| Export Partner | Organization registry/context, all-locale Playwright shell coverage, HTTP-tested denial of Artist product-management/domestic-finance access, `international`-permission policy primitive for export-publication review, and organization-scoped order-read policy primitive | Export publication, orders, protected transaction state, fulfillment, quality confirmation, and settlement flow remain open behind accepted product/provider decisions. |
| Shared identity | Session, role-grant discovery and selection, active-context, API authorization primitives, bearer-session logout, same-origin browser logout bridge, and Android logout/API/state boundaries | Public OTP delivery/login and cookie issuance remain disabled until a provider and required controls are available; mobile logout has no user-facing login/session journey wired yet. |
| Android app | Android foundation, secure session storage adapter, tested bearer-session logout boundary, identity API client, and server-derived identity-state resolver | User-facing role journeys, release identity, signing, and device validation remain open; iOS is out of scope. |

## Delivery gate update

Role implementation and automated CI are the current focus. Stage deployment and Stage QA will start only after the agreed role flows have been implemented and reviewed. No hosted Stage server is currently available, so no Stage or release evidence is claimed. Release approval and production remain later gates.

## Android validation and release scope

- Local `expo prebuild --platform android --no-install --clean` completed successfully, processing the Android icon, system theme, and SecureStore backup plugin. The generated native directory is local-only and ignored by Git.
- The CI build exports the Android JavaScript bundle; it does not produce or install an APK/AAB. No Android device/emulator QA has been run.
- Role-specific mobile journeys await Product/UX acceptance and Sprint planning. The stable Android application ID, signing, distribution channel, and supported-device matrix also remain release-planning decisions.

## CI evidence

Run #89 completed all configured gates successfully for code commit `07a62eae51ecd82c1a635127fcc8152a021062ac`: frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full test suite, monorepo build, Chromium install, and Playwright E2E smoke. API tests run with one Vitest worker because concurrent Serializable OTP tests previously produced PostgreSQL serialization conflicts.

Run #91 completed all configured gates successfully for product decision documentation commit `2527fa0985ab0bdabbe90fbb5b740320d0faf7d1`. That earlier handoff left public catalog visibility open; the product decision is now recorded in `docs/product/phase-1-handoff.md` and implemented by code head `b0f031f0a252e4b2b8efeb88abe42546724df2eb`.

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

Run #113 completed all configured gates successfully for same-origin JSON body-limit commit `f8143b50d37b4bd93c4ee2fecc77b10c9b4e17b6`, including bounded-reader tests, PostgreSQL API tests, build, and Playwright E2E smoke.

Run #116 completed all configured gates successfully for role coverage and deferred Stage gate documentation commit `5e2706f9d248feec5d8738ad34d6b055c432fabf`, including migrations, security audit, lint, typecheck, tests, build, and Playwright E2E smoke.

Run #118 completed all configured gates successfully for Service Partner scoped deliverable uploads commit `26699bea3fa083e1781cc8a373b30d50d1357c3a`, including Prisma migration reset/deploy, scoped authorization tests, API and web tests, monorepo build, Chromium installation, and Playwright E2E smoke.

Run #120 failed because existing tests still attempted a deliverable upload before accepting its Service Partner assignment and read-model mocks omitted the newly exposed response status. The tests were aligned with the accepted-assignment gate and updated read projection; no implementation exception was added.

Run #121 completed all configured gates successfully for Service Partner assignment accept/decline commit `f482d695dfed2e0fabc966c52edc0a35ddfd945c`, including migration reset/deploy, authorization and response-event tests, full tests, build, and Playwright E2E smoke.

Run #93 completed all configured gates successfully for authorization test commit `01be95c62b17534ec06d0e40be6f0c7dbd9118c7`, including the expanded Service Partner assignment-isolation matrix.

Run #124 completed all configured gates successfully for code head `bd1d7514c5f7bd7f0cc324f345c1a74f5dd4fbf5`, including frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, all tests, build, Chromium installation, and Playwright E2E smoke. This head includes the Service Partner deliverable submission change from commit `a16a2aa9c79148feeca17a56fb9ecba1e205434a`.

Run #126 failed because the shared PostgreSQL test database also contained a submission fixture created by an earlier test; the assertion was changed to target its own deliverable records.

Run #127 passed migrations, API/Web tests, lint, typecheck, and build; Playwright exposed an assertion that expected authenticated content on the connection-required page. The E2E check now verifies the real page title, access state, internal service navigation, and absence of file links.

Run #128 completed all configured gates successfully for code head `d0b36da373309876f0dee4927958b94b960f6dbf`, including frozen install, Prisma gates, security audit, lint, typecheck, all tests, build, Chromium installation, and Playwright E2E smoke. This head includes the staff submitted-deliverables read view from commit `4ed97965ccd067474b369381146f8ddad935fe4e`.

Run #130 completed all configured gates successfully for code head `e761eb14bd7e5a0d576d835eb1487c543a725a44`, including frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full tests, monorepo build, Chromium installation, and Playwright E2E smoke. This commit adds the Service Partner activity history for previously recorded assignment, response, deliverable, and submission events; it does not add review outcomes or completion.

Run #131 completed all configured gates successfully for Sprint 1 status documentation commit `86e67e8a6404e2980da66b6b8cdae170cc3513e6`.

Run #132 completed all configured gates successfully for code head `0f76d6df020b1401079eb1e7c7b8a62db5f30771`, including frozen install, Prisma gates, security audit, lint, typecheck, full tests, monorepo build, Chromium installation, and Playwright E2E smoke. This adds the already-recorded activity timeline to the services-authorized staff submission view; no review result or completion state is introduced.

Run #134 completed all configured gates successfully for code head `cff6570f4dd0fe4862ce18819afa670bc26c1475`, including frozen install, Prisma gates, security audit, lint, typecheck, full tests, monorepo build, Chromium installation, and Playwright E2E smoke. The API integration test verifies a Supporting Organization cannot list, view, create, edit, or archive Artist products, and cannot change Artist prices.

Run #136 completed all configured gates successfully for code head `07b69d3cc15f195a98c52532098c9f220094bfe8`, including frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full tests, monorepo build, Chromium installation, and Playwright E2E smoke. The live authorization-guard integration test denies a Supporting Organization access to the Artist domestic-finance resource with HTTP 403.

Run #138 completed all configured gates successfully for code head `0d4ccaf42d3dee1da3d6f65aa02e82ada7dd21dc`, including frozen install, Prisma gates, security audit, lint, typecheck, full tests, monorepo build, Chromium installation, and Playwright E2E smoke. Corporate Buyer integration tests verify denial of Artist product-management routes and domestic-finance access.

Run #140 completed all configured gates successfully for code head `f786b76d1a13bed646e98c9c2a2fc26dad22a743`, including frozen install, Prisma gates, security audit, lint, typecheck, full tests, monorepo build, Chromium installation, and Playwright E2E smoke. Export Partner integration tests verify denial of Artist product-management routes and domestic-finance access.

Run #142 completed all configured gates successfully for staff ServiceRequest authoring code head `ebcde55de9d89ddbc1b79ff8294796db7434f2af`, including migration reset/deploy, authorization and validation tests, build, and Playwright E2E smoke.

Run #143 completed all configured gates successfully for the aligned service assignment empty state at code head `84d81f8d392db29fa2056385642c268c0e01144f`, including frozen install, Prisma gates, security audit, lint, typecheck, all tests, build, Chromium installation, and Playwright E2E smoke.

Run #145 completed all configured gates successfully for the Supporting Organization relationship-scope authorization policy at code head `f1e7c3be6983680af770ddeffad2e33808d5baef`, including Prisma gates, security audit, lint, typecheck, full tests, build, and Playwright E2E smoke. The policy covers only the organization scope of an existing relationship and does not add its data model or workflow.

Run #147 completed all configured gates successfully for the Corporate Buyer order-read authorization matrix at code head `5bbfd15685ea8085f0b71bdcc6b128a0fb559aac`, including Prisma gates, security audit, lint, typecheck, full tests, build, and Playwright E2E smoke.

Run #148 completed all configured gates successfully for Sprint 1 status documentation commit `27078e2e892b9818fa5b88f2a83d89a6e5993386`.

Run #149 failed during migration reset because the new PostgreSQL enum value in the Export Partner backfill was inferred as text. The migration now casts it explicitly; no later CI gates ran in #149.

Run #150 completed all configured gates successfully for Export Partner organization registration code head `130587095fe77a867f2ebcf005e7c771e2fb33b6`, including Prisma migration reset/deploy, security audit, lint, typecheck, full tests, build, and Playwright E2E smoke.

Run #152 completed all configured gates successfully for Export Partner localization Playwright coverage code head `27f22dd17a95777c460347cc84b76f31ce68f248`, including frozen install, Prisma gates, audit, lint, typecheck, full tests, build, and E2E smoke across the supported shell routes.

Run #154 completed all configured gates successfully for the Export Publication review authorization policy at code head `5daabe55deb2af2af1c46e1a59ba5224607c28b7`, including Prisma gates, security audit, lint, typecheck, all tests, build, and Playwright E2E smoke. The policy only checks the `international` staff permission; export review states and transitions are not implemented.

Run #156 completed all configured gates successfully for Export Partner order-read authorization policy commit `67650fce262fd446ec927707f5ac60a83b8cf87b`, including Prisma migration reset/deploy, security audit, lint, typecheck, full tests, monorepo build, and Playwright E2E smoke. The policy conceals an order outside the active registered Export Partner organization and denies other roles; no order or payment flow was added.

Run #158 completed all configured gates successfully for Supporting Organization and Corporate Buyer shell Playwright coverage commit `99293570eb018704e1663a23f9011c2c19e98e5c`, including migrations, security audit, lint, typecheck, full tests, build, and E2E. The new browser check verifies both RTL role shells, navigation counts, truthful empty states, and absence of operational actions or sample data.

Run #160 completed every configured CI gate successfully for bearer-session logout API commit `1713aa14f3a1123568413b7097f74f226719707b`, including migration reset/deploy, security audit, lint, typecheck, full tests, monorepo build, and Playwright E2E smoke. The endpoint revokes only the current unexpired bearer session and does not require an active role; public OTP/login and mobile logout wiring remain disabled.

Run #162 completed every configured CI gate successfully for the same-origin browser logout bridge commit `b0918a563e2dcde0c4568e8d6ec81f056fa5cb82`, including Prisma gates, security audit, lint, typecheck, all tests, build, and Playwright E2E smoke. The bridge rejects cross-origin requests, clears a valid or stale session cookie after API revocation or an already-invalid session, and preserves the cookie when the API is unavailable so logout can be retried. It does not issue cookies or enable login.

Run #164 completed every configured CI gate successfully for selectable role-grant discovery commit `ef2ddd4a2482ac11dc6115fa8f0e78490086fdcd`, including PostgreSQL HTTP tests for mismatched organization scope and revoked grants, build, and Playwright E2E smoke. Invalid or revoked grants are omitted from discovery, and `activeGrantId` is returned only if it refers to a selectable grant.

Run #166 completed every configured CI gate successfully for the same-session Artist/Corporate Buyer context-switching regression test commit `1ac5050bbdc4387702a9fe4480056df67cfe8904`, including PostgreSQL HTTP tests, build, and Playwright E2E smoke.

Run #168 completed every configured CI gate successfully for the direct Artist payment authorization guard commit `a8d86439e60a70ba670429db5d1822ebefe36d15`, including all-role policy tests, full tests, build, and Playwright E2E smoke. The policy denies the direct-to-Artist command in user contexts and adds no payment or settlement flow.

Run #170 completed every configured CI gate successfully for Android bearer-session logout boundary commit `16da2db0f15d58c1bdae22f9c96d1d6b891aeebd`, including Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full tests, build, and Playwright E2E smoke. Mobile tests verify server revocation precedes local token deletion, invalid sessions are cleared, and network/server failures retain the token for retry. This does not connect login, OTP, or a user-facing mobile journey.

Runs #172–176 stopped at frozen install and did not reach application tests. The PR branch contained a truncated `pnpm-lock.yaml` blob beginning with tool-output text; the complete lockfile was restored at code head `7c4affdac719ae3e9f8770e0b7249aa64e9966e0`.

Run #177 completed every configured CI gate successfully for code head `7c4affdac719ae3e9f8770e0b7249aa64e9966e0`, including frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full tests, monorepo build, Chromium installation, and Playwright E2E smoke. This head includes the Android identity API client for grant discovery, active-context reads, and grant selection; it does not connect login or OTP.

Run #179 completed every configured CI gate successfully for Android identity-state resolver commit `9849caaa9acd1b4961868c1cca458e24ce0bc4c9`, including Prisma gates, audit, lint, typecheck, full tests, build, and Playwright E2E smoke. Mobile unit tests cover signed-out, no-grant, selection-required, active-context, and grant/context mismatch states. No session is issued and no local role is chosen.

Run #181 completed every configured CI gate successfully for Android explicit grant-selection commit `3ccd88bc4ed69ab0669f133bf795e93d99046ee4`, including frozen install, Prisma gates, security audit, lint, typecheck, full tests, monorepo build, and Playwright E2E smoke. Mobile tests verify that only a currently selectable grant is submitted and that the returned server context matches its role and organization scope.

Run #183 completed every configured gate successfully for Admin-controlled Customer catalog publication head `b0f031f0a252e4b2b8efeb88abe42546724df2eb`, including frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full tests, monorepo build, and Playwright E2E. HTTP tests verify that approval alone does not expose a product, authorized Admin publication does, unpublishing hides it, and Customer responses omit Artist identifiers and storage keys.

Run #184 completed every configured gate successfully for the documentation update recording Admin ownership of public catalog visibility and the read-only Customer catalog decision.

Run #185 completed every configured gate successfully for Artist-owned ServiceRequest intake. HTTP tests verify Artist ownership, role denial, and Admin assignment through the registered Service Partner options.

Run #186 completed every configured gate successfully for service-deliverable review and completion at code head `aab7946d521972ce9b7b3f728256f2cb036c8638`, including frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full tests, monorepo build, Chromium installation, and Playwright E2E. HTTP tests verify change-request feedback, replacement submission, Admin approval completing the assignment, history, and denial of Partner mutations after completion.

Run #187 completed every configured CI gate successfully for the Sprint 1 status and product handoff documentation update.

Run #188 completed every configured gate successfully for organization-scoped Supporting Organization program records at code head `8c78edd6fa4af32cdeffbde5e03bb9c8cf857f4c`, including frozen install, Prisma generate/validate/reset/deploy, security audit, lint, typecheck, full tests, build, Chromium installation, and Playwright E2E. HTTP tests verify name/description validation, active-organization ownership, isolation between organizations, and denial to Artists and unauthenticated requests.

Run #189 completed every configured gate successfully for scoped SupportProgram editing at code head `6321f77c0867b99536ceee3c8dee1393c46522fb`, including frozen install, Prisma gates, security audit, lint, typecheck, full tests, build, Chromium installation, and Playwright E2E. The HTTP contract conceals another organization's program as not found and rejects malformed program IDs.

Run #190 completed every configured CI gate successfully for status and product handoff documentation commit `185772f203fcd2e203c93b87e699e2b76ec299f2`.

This is automated CI evidence. It is not Stage QA, Release Approval, or Production evidence.

## Remaining Sprint 1 work and constraints

- No OTP/SMS provider is available; public login and session delivery remain disabled.
- The product/API slice has no Stage deployment or Stage QA evidence because no hosted Stage server is available.
- No payment gateway is available; purchase, payment, and settlement flows remain unimplemented.
- Customer public catalog and detail are implemented as read-only surfaces. Purchase and order tracking still need their own product rules and an available payment provider.
- Artist service-request intake, Admin request/assignment authoring, and Admin review of submitted Service Partner deliverables are implemented. An Admin change request includes feedback; approval completes the assignment, and completed assignments reject Partner mutations. Organization/member provisioning, scheduling, and execution progress remain unimplemented.
- Mobile scope is Android. iOS is out of scope. Android app release identity and device QA are still open.
- PR #35 has no submitted GitHub review yet and remains draft.

Sprint 1 remains open while agreed role code is being delivered. Stage QA and release gates are deferred until role implementation and review are complete and a hosted Stage environment is available.
