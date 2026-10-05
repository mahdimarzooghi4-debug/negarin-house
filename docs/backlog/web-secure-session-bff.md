# Web secure session BFF foundation

## Problem

The Figma-derived portals are currently preview/static surfaces. The API uses short-lived opaque bearer session tokens and role/organization context, but the web app has no production browser-session boundary yet.

Directly storing API bearer tokens in client JavaScript or localStorage is not accepted.

## Acceptance

1. Next.js acts as a Backend-for-Frontend for authenticated browser calls.
2. The API bearer session token is stored only in an HttpOnly cookie and is never returned to client JavaScript.
3. Cookie uses SameSite=Lax, root path, a 24-hour upper bound matching the current API session lifetime, and Secure in production.
4. Server-side API origin comes from `NEGARIN_API_URL`; only an http(s) origin with no credentials/path/query/fragment is accepted.
5. Proxy helpers accept only explicit `/api/v1/*` paths and reject path traversal / alternate origins.
6. Upstream redirects are not followed.
7. All cookie-authenticated mutation routes require an exact same-origin `Origin` header; missing or cross-origin mutations are rejected.
8. Upstream 401 clears the browser session cookie.
9. Context discovery/select remains enforced by the existing API:
   - `GET /identity/grants`
   - `GET /identity/context`
   - `POST /identity/context/select`
10. Logout revokes the API session server-side and clears the browser cookie.
11. Corporate product/PurchaseRequest BFF routes are explicit and hardcoded; there is no generic arbitrary-path proxy.
12. A local development session-attach route exists only when `NEGARIN_DEV_SESSION_ATTACH=1` and is impossible when `NODE_ENV=production`. It validates the candidate token against `identity/grants` before setting the cookie.
13. This slice does not claim that OTP login is production-ready. Public OTP HTTP routes remain disabled until a real transport/provider and HTTP controls are accepted.

## Explicitly out of scope

- SMS/OTP provider integration;
- public production login/verification endpoints;
- password authentication;
- localStorage/sessionStorage bearer tokens;
- Corporate screen data binding;
- Proposal/Order flows;
- merge, Stage deploy, QA approval or Production release.
