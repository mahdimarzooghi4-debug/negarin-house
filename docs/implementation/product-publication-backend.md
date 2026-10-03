# Product publication backend — E3 initial lifecycle

Branch: `feat/product-publication-lifecycle` (stacked on the completed preview branch).

## Scope

Adds persistent initial-product publication to the existing Artist product API. This slice covers the existing title/description content model, with separate Artist-owned pricing. It does not complete E3 or connect the Figma previews to these endpoints.

| Actor | Command | Required current state | Result |
| --- | --- | --- | --- |
| Owning Artist | submit | draft / changes_requested | under_review |
| Staff with products permission | request-changes, nonempty reason | under_review | changes_requested |
| Staff with products permission | approve | under_review | approved |
| Owning Artist | publish | approved | published |

Every command includes `{ "version": <current integer> }`. Request-changes additionally requires `reason` (1–2000 characters after trimming). All other fields, including price/owner/status, are rejected. Invalid states, archived resources and stale versions return 409. No automatic publication occurs on approval.

## Endpoints

All routes are under `/api/v1`, require a live bearer session/resolved active grant and use `Cache-Control: no-store`.

- `POST /artist/products/:id/submit`
- `POST /artist/products/:id/publish`
- `GET /artist/products/:id/publication-history`
- `GET /admin/product-reviews` — first 100 active under-review products, deterministic order; pagination remains to be added
- `GET /admin/product-reviews/:id`
- `GET /admin/product-reviews/:id/history`
- `POST /admin/product-reviews/:id/approve`
- `POST /admin/product-reviews/:id/request-changes`

Review projections exclude price, ownership/session data and private Artist information. History exposes only publication action/state/version/reason/content snapshot/time; internal actor and request identifiers remain in storage. Artist product GET/list/create/PATCH/archive responses now include `version`.

## Concurrency and history

Publication state and its immutable application history entry are written in the same transaction. A conditional version/state/archival update allows only one competing decision to succeed. The history stores actor, active role, action, source/target state, version, request ID and the reviewed title/description snapshot. No history update/delete endpoint exists; database operators still need ordinary operational access controls.

Content edits increment the version and record a content-updated entry transactionally. Editing approved content returns it to draft and requires fresh submission/review. Content is locked while under review. Content edits on a published product are blocked until a separate pending-change/version workflow is implemented, preserving the currently published record. Artist price-only edits are allowed independently of review/publication, do not change the content version and require no Admin price approval. Archive/restore increments version to invalidate stale commands.

## Validation

- API dependency builds, API TypeScript/build, scoped ESLint, Prisma generation/validation: passed locally.
- Publication command validation plus existing product contract units: 16 passed locally.
- All five SQL migrations applied successfully to an isolated PGlite engine. This checks SQL execution, not native PostgreSQL concurrency or Prisma migrate deploy.
- Native PostgreSQL HTTP integration tests are added for the real session/role/HTTP path, complete feedback/resubmission/publication, ownership concealment, staff domain restrictions, price separation, reviewed-content locks, stale/archive rejection and competing decisions. Native PostgreSQL evidence is required in CI before merge. A local PGlite socket experiment failed on simultaneous Prisma connections; it is not claimed as passing HTTP evidence and adds no repository dependency.

## Next work and release limits

Media upload, image/specification/quality validation, required-field publication gates, availability/inventory, published-content change proposals, cursor pagination, denial audit expansion, browser authentication, live panel binding and a public marketplace read model remain separate work. An approved/published row here is not sufficient evidence for production storefront release. No marketplace purchase, export eligibility, price approval, payment or settlement capability is created. Stage/QA/release approval remain required by the repository delivery process.
