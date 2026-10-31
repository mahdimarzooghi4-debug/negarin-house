# Product publication backend — E3 publication lifecycle

Branch: `feat/admin-product-review-live`.

## Scope

Adds persistent initial-product publication to the existing Artist product API. This slice covers the existing product content/specification model, with separate Artist-owned pricing. The live Artist workspace consumes product, image, history and publication endpoints through the secure BFF, while the live Admin review workspace consumes the queue, detail, history and image endpoints and submits review decisions.

| Actor | Command | Required current state | Result |
| --- | --- | --- | --- |
| Owning Artist | submit | draft / changes_requested | under_review |
| Staff with products permission | request-changes, nonempty reason | under_review | changes_requested |
| Staff with products permission | approve | under_review | approved |
| Owning Artist | publish | approved | published |
| Owning Artist | save / submit published-content proposal | published + draft / changes_requested proposal | published + under_review proposal |
| Staff with products permission | request-changes on published-content proposal | published + under_review proposal | published + changes_requested proposal |
| Staff with products permission | approve published-content proposal | published + under_review proposal | updated published content; proposal cleared |

Every command includes `{ "version": <current integer> }`. Request-changes additionally requires `reason` (1–2000 characters after trimming). All other fields, including price/owner/status, are rejected. Invalid states, archived resources and stale versions return 409. No automatic publication occurs on approval.

## Endpoints

All routes are under `/api/v1`, require a live bearer session/resolved active grant and use `Cache-Control: no-store`.

- `POST /artist/products/:id/submit`
- `POST /artist/products/:id/publish`
- `GET /artist/products/:id/change-proposal`
- `PUT /artist/products/:id/change-proposal` — save a private proposal `{ version, content }`
- `POST /artist/products/:id/change-proposal/submit`
- `POST /artist/products/:id/change-proposal/images` and `PATCH` — upload/reorder proposal-only images
- `GET /artist/products/:id/publication-history`
- `GET /admin/product-reviews` — first 30 active under-review products in deterministic oldest-first order; returns `{ items, hasMore, nextCursor }`
- `GET /admin/product-reviews?cursor=<opaque>` — next page using the last row's timestamp and ID as a keyset cursor
- `GET /admin/product-reviews/:id`
- `GET /admin/product-reviews/:id/history`
- `POST /admin/product-reviews/:id/approve`
- `POST /admin/product-reviews/:id/request-changes`

Review projections exclude price, ownership/session data and private Artist information. Artist history exposes publication action/state/version/reason/content snapshot/time, without internal actor or request identifiers. Staff history additionally exposes the event ID, actor user ID/role and request ID for audit tracing. Artist product GET/list/create/PATCH/archive responses now include `version`. The live Admin page displays the content and stored gallery without price, uses expiring server-issued image URLs, and records approve or reasoned request-changes decisions.

## Concurrency and history

Publication state and its immutable application history entry are written in the same transaction. A conditional version/state/archival update allows only one competing decision to succeed. The history stores actor, active role, action, source/target state, version, request ID, reason and the reviewed content snapshot. Staff can trace who made each decision and correlate it with request logs; Artist views receive only the decision details relevant to them. A PostgreSQL trigger rejects event updates and deletes, including direct SQL operations through ordinary application roles. Database owners and superusers remain able to bypass application-level controls.

Content edits increment the version and record a content-updated entry transactionally. Editing approved content returns it to draft and requires fresh submission/review. Content is locked while under review. For a published product, the proposal content and its gallery are stored in separate nullable fields; the current content and public image list remain unchanged while the proposal is drafted, reviewed, or returned for changes. Proposal image files are private because the public catalog only exposes IDs in the current product image list. Approval copies the proposal snapshot into the live content and clears the proposal in the same transaction. Request-changes preserves the live version and stores the reviewer reason with the proposal. Artists can update and resubmit that proposal. Artist price and inventory edits remain independent of content review. Archive/restore increments version to invalidate stale commands.

## Validation

- API dependency builds, API TypeScript/build, scoped ESLint, Prisma generation/validation: passed locally.
- Publication command validation plus existing product contract units: 16 passed locally.
- All five SQL migrations applied successfully to an isolated PGlite engine. This checks SQL execution, not native PostgreSQL concurrency or Prisma migrate deploy.
- [CI run #216](https://github.com/mahdimarzooghi4-debug/negarin-house/actions/runs/37137091451), code commit `f43a4babb27dbec395fed21825465fed3c8db885`: PostgreSQL 17 migrations/reset/deploy, security audit, full lint/typecheck, all unit/integration suites and application builds passed. API: 36 tests across nine files passed, including six new lifecycle integration cases and three existing Artist-product HTTP cases. The sixth new case forces a history foreign-key failure and verifies the state/version write rolls back.
- Full Playwright: **43 passed / 1 failed**. The unchanged Export Partner preview geometry test reports `ar-order-review`, node `928:676`, x delta 8px (tolerance 2px), including retry. Runtime preview/CSS code was unchanged in this backend slice; this is an unresolved pre-existing preview geometry discrepancy on CI, not passing release evidence. This historical failure is followed by the targeted Arabic label compatibility correction below; current CI status is recorded in PR #37.
- A local PGlite socket experiment failed on simultaneous Prisma connections; it is not passing HTTP evidence and adds no repository dependency. Native PostgreSQL CI above is the authoritative backend result.

## Next work and release limits

Submission and publication require the Figma readiness checklist: title and category, at least one image, positive price and an explicitly configured inventory value (zero is valid), plus description and preparation time. These gates are checked in the API and shown in the Artist workspace. The checklist is visible in Figma nodes `269:80–91` and `271:249–267`; the product editor shows the preparation-time field and active-store publication note in node `269:59–61` and related publication content. The preparation-time field is versioned as product content and appears in review/history/public catalog projections; the reviewer still does not receive price or inventory. The migration recognizes existing positive stock and any prior inventory history as configured; zero-stock products without an inventory history must have the value explicitly saved before submission. The public catalog API and read-only Customer listing/detail are described in `public-product-catalog-backend.md`; materialized search ranking, taxonomy discovery and full Customer purchase-flow binding remain separate work. An approved/published row here is not sufficient evidence for production storefront release. No marketplace purchase, export eligibility, price approval, payment or settlement capability is created. Stage/QA/release approval remain required by the repository delivery process.

## Follow-up — Arabic review button compatibility

Figma context/metadata at `928:484` and `928:485` confirms a 352×42 button, a 90×17 text label and an 18×18 original arrow. Inter has no Arabic glyphs: an unspecified OS fallback changed the label width across Chromium environments. The former −8px horizontal icon compensation depended on that fallback. The label now uses the existing packaged Noto Sans Arabic after Inter, preserves the native 17px line height, and removes the horizontal compensation. The same SVG and source gap/centering remain in use. Local production inspection verified all 12 image paths/bounds in ar-order-review within the existing 2px tolerance; the button was visually compared to the fresh native screenshot. This change is scoped to that label/icon. All four Export Partner Playwright tests passed locally against the production build, including all 77 native screens. Native source inventories and test tolerances are unchanged.
