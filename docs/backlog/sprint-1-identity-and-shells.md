# Sprint 1 — Identity and Application Shells

Status: **IN PROGRESS**

Dependencies: Sprint 0 / E0 complete. Parent Epics: E1 (#6), E2 (#7).

## Objective

Create real server-derived identity, session, and authorization foundations, then connect role-aware web shells. Mobile remains a separate client of the same API; its first-release screens need Product/UX scope before implementation (ADR-0007).

## Delivery slices

1. **E1-S3 policy boundary (this PR):** reusable deny-by-default policies for Artist product ownership, Corporate Buyer order scope, Service Partner assignment, domestic Artist finance, and staff permission domains. Test both allowed and forbidden relationships. Policy inputs are trusted server-side resource projections, not client-provided claims.
2. **E1-S1 identity and session:** design persistence and OTP provider adapter; implement expiry, retry/rate limits, revocation, secure browser cookie, and negative tests. No SMS vendor or OTP secret logging.
3. **E1-S2 active context:** resolve role and organization/Partner memberships from the server for each protected request. A role/context switch must revalidate membership.
4. **E1-S3 integration:** enforce policies in API service/queries and test HTTP 403/404 disclosure behavior. No frontend route guard substitutes for API authorization.
5. **E2 shell:** connect real session/context to role-aware web navigation, Persian RTL and Partner locales, with loading/empty/denied states. Mobile foundation is a separate planned slice with its own build and device gates.

## Acceptance gate for this first slice

- Cross-Artist product edits and cross-organization orders are denied without revealing private resource identity.
- Unassigned Service Partner requests are denied.
- Supporting Organization and Export Partner cannot read Artist domestic finance; staff without finance permission is denied.
- Policies do not imply that authentication, database-scoped queries, or HTTP enforcement is complete.
- No direct Corporate/Export Partner → Artist payment command or unresolved financial formula is introduced.

## Identity core progress

The next E1-S1 slice adds database records for identity users, one-time challenges, and revocable sessions. The API core hashes OTP values with a server secret and challenge ID, hashes random session tokens at rest, enforces challenge expiry and attempt/request limits, consumes an OTP once, and resolves/revokes sessions. The SMS delivery dependency is an interface. The implementation is exercised against PostgreSQL in CI.

The API now includes `POST /api/v1/identity/logout`, which revokes only the current unexpired bearer session and does not require a selected role grant. It responds with no-store 204 after revocation and rejects missing, expired, or already-revoked sessions. A same-origin web route forwards the browser session cookie to this endpoint and clears it after revocation or when the API reports no valid session; it preserves the cookie if the API is unavailable so logout can be retried. The web app still does not issue session cookies, the mobile SecureStore is not connected to logout, and no public OTP/login endpoint or SMS provider is enabled.

The identity core slice did not wire OTP transport, secret provisioning, browser cookie, mobile secure storage, HTTP rate limiter, membership resolution, or a public login endpoint. The server must supply a high-entropy secret from its secret store; the code does not ship a default. Before enabling login, add transport failure handling, IP/device throttling, secure cookie and CSRF rules for web, mobile token handling, and end-to-end HTTP tests. Product-facing authentication is not yet complete.

## Active context progress

The next E1-S2 slice stores server-administered role grants, organization or Export Partner scope, and staff permission domains. A session selects only a grant belonging to its user. Every protected context resolution rereads session validity, grant revocation, and current staff domains from PostgreSQL. Invalid role/scope combinations fail closed; a client-provided role or organization ID cannot become an authorization context by itself.

The `Organization` registry now stores Service Partner, Supporting Organization, and Corporate Buyer scopes. `RoleGrant` records can reference registered organizations, and the resolver rejects a grant whose role does not match the organization kind. The migration backfills inferable organization scopes and aborts on conflicting organization-kind IDs. No organization/member provisioning API or administrative approval workflow is exposed yet; Export Partner registry work also remains open. Grant provisioning has no public API. API guards, HTTP context switching, and cross-portal data queries must use this resolver before product endpoints are exposed.

## Service Partner assignment authoring progress

Staff with the live `services` permission can append an assignment for an existing service request through `POST /api/v1/admin/service-assignments`. The options API returns existing requests and registered Service Partner organizations only; the RTL page is available under the existing Admin “Growth and Services” group at `/admin/service-assignments`. The API accepts only a registered Service Partner organization; an optional individual assignee must have an active Service Partner grant in that same organization. Each new assignment stores the authoring staff user ID. Legacy assignments retain a null author because their original actor is not recoverable. This endpoint does not create service requests, alter existing assignments, or define lifecycle, schedule, or deliverable rules. Organization/member provisioning and request creation remain open.

## HTTP authorization boundary

The next E1-S3 slice wires a reusable Nest guard to bearer sessions and the live active context resolver. Missing, expired, or revoked credentials return 401. After a service loads a resource from its own trusted query, policy decisions map forbidden access to 403 and concealed cross-owner resources to 404. HTTP integration tests exercise both responses and live grant/permission revocation. The test resource controller is not registered in the product API; product data endpoints and browser cookie/CSRF handling remain separate delivery work.

## Context HTTP contract

Authenticated clients can list only their own active role grants, select a grant by ID, and read the resulting server-derived context using a bearer session. The list is available before a grant is selected; the context read requires an active grant. Responses use `no-store`. The API rechecks session expiry/revocation and grant ownership on selection and reads; another user's grant never becomes an active context. This contract supports a future mobile client, but no public OTP endpoint, SMS provider, browser cookie, or mobile secure storage is enabled yet. The HTTP tests create sessions through the internal test transport only.

## OTP delivery failure boundary

If an OTP provider rejects delivery, the core invalidates that challenge's code before returning a generic delivery error. A code that arrives late after an ambiguous provider failure cannot create a session. The existing resend interval and hourly request cap still apply; a subsequent successful request issues a new code. PostgreSQL integration tests cover this recovery. Provider selection, IP/device throttling, HTTP entry points, and browser/mobile credential storage remain open.

## Shared web shell progress

The web portal routes share a responsive sidebar and role-specific menu definitions. The shared shell follows the approved Figma palette: light teal sidebar (`#EAF6F3`), soft teal active state (`#D3EDE8`), dark teal active content (`#0B6963`), and the Negarin PNG logo in a white frame. RTL domestic portals and the LTR Export Partner shell use the same component. Export Partner shell copy and its seven navigation labels are available at locale routes for `tr-TR`, `ar`, `ru`, `en`, `zh-CN`, `fr`, and `es`; Arabic is RTL. Full feature-page content localization remains part of the corresponding portal stories. Authentication and customer routes remain outside the staff sidebar. Content is an explicit unconnected empty state; the routes do not claim to authenticate or authorize users, and no sample customer, product, order, or financial data is shown. OTP transport, payment provider, and hosted server are not available, so this slice does not turn login, payment, or deployment on.

## Sprint completion gate

Sprint 1 remains open until identity/session, membership resolution, API enforcement, web shell, and relevant CI and Stage QA evidence are complete. Passing this first policy slice alone does not close E1, E2, or Sprint 1.
