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

## Sprint completion gate

Sprint 1 remains open until identity/session, membership resolution, API enforcement, web shell, and relevant CI and Stage QA evidence are complete. Passing this first policy slice alone does not close E1, E2, or Sprint 1.
