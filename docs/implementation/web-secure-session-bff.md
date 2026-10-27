# Web secure session BFF implementation

This slice creates the server-side authentication boundary required before live portal data can safely replace preview data.

## Session boundary

Cookie: `negarin_session`

Properties:
- HttpOnly;
- SameSite=Lax;
- Secure in production;
- Path=/;
- max age 24 hours.

The opaque API token is forwarded only by server-side Next.js Route Handlers.

## API target

`NEGARIN_API_URL` is server-only and defaults to `http://localhost:4000` for local development. It must be a bare HTTP(S) origin. Credentials, URL paths, query strings and fragments are rejected.

No `NEXT_PUBLIC_*` token or API credential is introduced.

## Browser auth routes

- `GET /api/auth/grants`
- `GET /api/auth/context`
- `POST /api/auth/context`
- `DELETE /api/auth/session`

Logout calls the new backend command:

- `POST /api/v1/identity/session/revoke`

The backend command is self-scoped by the presented bearer token and returns no session data.

## Development-only session attachment

`POST /api/auth/dev-session`

This route is:
- disabled by default;
- enabled only with `NEGARIN_DEV_SESSION_ATTACH=1`;
- always unavailable when `NODE_ENV=production`;
- validates a pre-existing session against `GET /api/v1/identity/grants` before setting the HttpOnly cookie.

It is a local integration/testing bridge, not an authentication product surface.

## Corporate BFF routes

Read:
- `GET /api/corporate/products`
- `GET /api/corporate/products/:id`
- `GET /api/corporate/products/:id/images/:imageId`
- `GET /api/corporate/purchase-requests`
- `GET /api/corporate/purchase-requests/:id`

Commands:
- `POST /api/corporate/purchase-requests`
- `POST /api/corporate/purchase-requests/:id/submit`

All authorization, active-role, tenant scope, idempotency and business validation remain authoritative in the Nest API. The BFF does not duplicate or weaken those policies.

## Security behavior

- no generic proxy endpoint;\n- every cookie-authenticated POST/DELETE requires exact same-origin `Origin` validation;
- UUID validation on dynamic Corporate resource IDs;
- JSON request body size bounds;
- no-store on browser and upstream requests;
- no redirect following upstream;
- 401 invalidates browser cookie;\n- logout clears the cookie only after successful backend revocation (or when no valid browser session exists);
- backend request ID is forwarded when supplied.

## Remaining login blocker

`IdentityCore` already implements OTP persistence/session issuance, but the API intentionally exposes no public OTP request/verify routes until a real OTP transport and HTTP abuse controls are configured. This slice does not bypass that safety boundary.
