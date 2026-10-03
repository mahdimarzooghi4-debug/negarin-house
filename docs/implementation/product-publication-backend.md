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
- [CI run #216](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/37137091451), code commit `f43a4babb27dbec395fed21825465fed3c8db885`: PostgreSQL 17 migrations/reset/deploy, security audit, full lint/typecheck, all unit/integration suites and application builds passed. API: 36 tests across nine files passed, including six new lifecycle integration cases and three existing Artist-product HTTP cases. The sixth new case forces a history foreign-key failure and verifies the state/version write rolls back.
- Full Playwright: **43 passed / 1 failed**. The unchanged Export Partner preview geometry test reports `ar-order-review`, node `928:676`, x delta 8px (tolerance 2px), including retry. Runtime preview/CSS code was unchanged in this backend slice; this is an unresolved pre-existing preview geometry discrepancy on CI, not passing release evidence. This historical failure is followed by the targeted Arabic label compatibility correction below; current CI status is recorded in PR #37.
- A local PGlite socket experiment failed on simultaneous Prisma connections; it is not passing HTTP evidence and adds no repository dependency. Native PostgreSQL CI above is the authoritative backend result.

## Next work and release limits

Media upload, image/specification/quality validation, required-field publication gates, availability/inventory, published-content change proposals, cursor pagination, denial audit expansion, browser authentication, live panel binding and a public marketplace read model remain separate work. An approved/published row here is not sufficient evidence for production storefront release. No marketplace purchase, export eligibility, price approval, payment or settlement capability is created. Stage/QA/release approval remain required by the repository delivery process.

## Follow-up — Arabic review button compatibility

Figma context/metadata at `928:484` and `928:485` confirms a 352×42 button, a 90×17 text label and an 18×18 original arrow. Inter has no Arabic glyphs: an unspecified OS fallback changed the label width across Chromium environments. The former −8px horizontal icon compensation depended on that fallback. The label now uses the existing packaged Noto Sans Arabic after Inter, preserves the native 17px line height, and removes the horizontal compensation. The same SVG and source gap/centering remain in use. Local production inspection verified all 12 image paths/bounds in ar-order-review within the existing 2px tolerance; the button was visually compared to the fresh native screenshot. This change is scoped to that label/icon. All four Export Partner Playwright tests passed locally against the production build, including all 77 native screens. Native source inventories and test tolerances are unchanged.
