# Authentication, Authorization & Tenant Isolation

Status: Accepted baseline.

## Principle

Authentication answers **who is the user?**

Authorization answers **may this user perform this action on this resource in this context?**

UI visibility is not a security boundary.

## Authentication

Shared domestic authentication supports:

- Customer
- Artist
- Admin / Staff
- Service Partner
- Supporting Organization
- Corporate Buyer

Primary domestic flow is phone/OTP as designed.

Export Partner uses localized Partner authentication screens but the backend identity/session primitives remain shared.

OTP provider is an adapter; no SMS vendor is hardcoded into domain logic.

## Session model

Recommended browser model:

- secure, HTTP-only session/refresh cookie
- short-lived access/session state
- server-side revocation support
- session records include user ID, security metadata, and active context
- sensitive role/context changes require server validation

Tokens must not contain authoritative mutable permissions that outlive server-side changes.

## Authorization context

Every protected request derives an AuthorizationContext:

```ts
type AuthorizationContext = {
  userId: string
  activeRole: Role
  organizationId?: string
  exportPartnerId?: string
  staffPermissionDomains?: StaffPermissionDomain[]
}
```

The server then evaluates relationship/resource scope.

## Permission decision inputs

A policy may evaluate:

- role
- action
- resource owner
- organization membership
- Partner membership
- ServiceAssignment relationship
- SupportRelationship
- Order relationship
- Artist ownership
- internal staff permission domain
- resource state

## External role scoping

### Artist

Allowed only on own private resources unless the resource is public.

### Service Partner

Requires matching ServiceAssignment to the Service Partner organization/user.

No assignment → deny.

### Supporting Organization

Requires matching organization scope and, for Artist-related data, a valid referral/support relationship.

### Corporate Buyer

Requires matching Corporate Buyer organization on requests/proposals/orders/deliveries/issues.

### Export Partner

Requires matching Export Partner relationship and market/transaction scope.

### Customer

Requires own Customer resources or public marketplace resources.

## Admin / Staff

Internal staff access is permission-domain based.

Example domains:

- artists
- products
- orders
- services
- growth
- opportunities
- finance
- international
- reports
- settings

Do not implement `isAdmin === true` as unlimited access for every staff account.

A break-glass/super-admin capability, if later needed, must be explicit and audited.

## Deep-link security

For a request such as:

```text
GET /corporate/orders/:id
```

the API:

1. authenticates the session
2. resolves active Corporate Buyer organization
3. loads the resource in a query constrained by that organization, or verifies relationship after load
4. evaluates the action
5. returns data only after authorization

Do not fetch an arbitrary record then rely on the frontend to hide it.

## Data-transfer objects

DTOs are role/context specific where data sensitivity differs.

Avoid one giant Artist DTO containing bank, finance, credentials, Growth internals, public profile, and Admin notes.

Prefer explicit projections:

- PublicArtistView
- ArtistSelfView
- AdminArtistOperationalView
- CorporateArtistPublicView
- PartnerArtistExportView
- SupportingOrgArtistScopedView

## Denial behavior

Unauthorized deep link:

- return 403 when existence may be known in the current context
- use 404-style non-disclosure when revealing existence would itself expose private data
- never include hidden resource metadata in the error

## Required authorization tests

At minimum:

- Supporting Organization → Artist finance: denied
- Corporate Buyer A → Buyer B order: denied
- Export Partner → Artist domestic settlement: denied
- Service Partner → unassigned request: denied
- Artist A → Artist B product editor: denied
- external role → Admin notes: denied
- Corporate/Export Partner → direct Artist payment command: endpoint does not exist
- Admin without finance permission → sensitive finance action: denied

Authorization tests are release-gate tests, not optional unit-test coverage.
