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

The identity core slice did not wire OTP transport, secret provisioning, browser cookie, mobile secure storage, HTTP rate limiter, membership resolution, or a public login endpoint. The server must supply a high-entropy secret from its secret store; the code does not ship a default. Before enabling login, add transport failure handling, IP/device throttling, secure cookie and CSRF rules for web, mobile token handling, and end-to-end HTTP tests. Product-facing authentication is not yet complete.

## Active context progress

The next E1-S2 slice stores server-administered role grants, organization or Export Partner scope, and staff permission domains. A session selects only a grant belonging to its user. Every protected context resolution rereads session validity, grant revocation, and current staff domains from PostgreSQL. Invalid role/scope combinations fail closed; a client-provided role or organization ID cannot become an authorization context by itself.

Grant provisioning has no public API. Organization/Partner registries and their administrative approval workflows are not implemented by this slice. API guards, HTTP context switching, and cross-portal data queries must use this resolver in later slices before product endpoints are exposed.

## HTTP authorization boundary

The next E1-S3 slice wires a reusable Nest guard to bearer sessions and the live active context resolver. Missing, expired, or revoked credentials return 401. After a service loads a resource from its own trusted query, policy decisions map forbidden access to 403 and concealed cross-owner resources to 404. HTTP integration tests exercise both responses and live grant/permission revocation. The test resource controller is not registered in the product API; product data endpoints and browser cookie/CSRF handling remain separate delivery work.

## Context HTTP contract

Authenticated clients can list only their own active role grants, select a grant by ID, and read the resulting server-derived context using a bearer session. The list is available before a grant is selected; the context read requires an active grant. Responses use `no-store`. The API rechecks session expiry/revocation and grant ownership on selection and reads; another user's grant never becomes an active context. This contract supports a future mobile client, but no public OTP endpoint, SMS provider, browser cookie, or mobile secure storage is enabled yet. The HTTP tests create sessions through the internal test transport only.

## OTP delivery failure boundary

If an OTP provider rejects delivery, the core invalidates that challenge's code before returning a generic delivery error. A code that arrives late after an ambiguous provider failure cannot create a session. The existing resend interval and hourly request cap still apply; a subsequent successful request issues a new code. PostgreSQL integration tests cover this recovery. Provider selection, IP/device throttling, HTTP entry points, and browser/mobile credential storage remain open.

## Sprint completion gate

Sprint 1 remains open until identity/session, membership resolution, API enforcement, web shell, and relevant CI and Stage QA evidence are complete. Passing this first policy slice alone does not close E1, E2, or Sprint 1.
