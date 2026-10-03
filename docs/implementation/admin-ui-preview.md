# Admin desktop Figma preview

Reference: https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=863-319

The 105-frame inventory covers the Admin Backoffice canvas. Seventy-nine frames are implemented from high-fidelity Figma context as native Next/React screens. Twenty-six remain explicitly pending: 23 missing design contexts and three Story Review states whose original image exports could not be completed before the Figma tool quota was exhausted. Partial contexts are retained under `admin-pending-context`; they are not loaded as screens. No replacement artwork or guessed missing screens is shipped.

## Review

Run `pnpm --filter @negarin/web dev` and open `/preview/admin`. Routes are `/preview/admin/<inventory-slug>`; `?canvas=1` hides the review toolbar. The source canvases are 1440 × 1100px. Production access requires `NEGARIN_UI_PREVIEW=1`. This adds a separate preview; it does not integrate or change the production Admin portal. No tablet layout is included.

Implemented groups include the dashboard and its states; artists, credentials and review dialogs; products and new/published-content moderation; orders, issues and shipping; growth and services; opportunities, applications, corporate buyers and supporting organizations; finance, settlement, transactions and memberships; stories and their review queue. The inventory distinguishes missing context from incomplete assets for every pending route.

## Behavior and source limitations

Shared preview controls provide links, editable fields, local choices, notifications and keyboard-accessible dialogs. Modal backgrounds are inert; Tab stays within the dialog and Escape returns to the documented parent. Field edits persist during client navigation and reset on reload. Revision submissions and confirmations navigate to static sample states. They do not moderate a product, verify a credential or initiate a payout. Authentication, permissions, live search, filtering, pagination, uploads, persistence and business operations require backend integration.

The Admin source contains no ON_CLICK frame/instance/component/text prototype links. All 1,122 rendered action mappings are inferred preview routes or explicitly inactive sample controls, documented in `admin-controls.json`. Links to pending states open an explanation instead of a fabricated screen.

A shared semantic AdminSidebar preserves each source variant's geometry. The source places navigation groups horizontally, with fixed-width groups clipped by the sidebar; its short Brand container also clips the title/logo. Those source defects are preserved and recorded for a design correction. The preview catalog provides access to every implemented screen while the source sidebar remains incomplete.

## Fidelity and verification

The 1,445 runtime image slots use 380 distinct original local assets. An additional original PNG is retained for a pending Story Review checkpoint (381 files total). Exports are unmodified, tracked per node and callsite, and contain no temporary Figma URLs. Thirty-two source chevron wrappers have no native rendered vector bounds; their wrapper geometry is preserved without substituting artwork. These are recorded separately in `admin-non-rendering-slots.json`.

Scoped CSS translates the high-fidelity auto-layout source. Native box dimensions were retrieved for 767 containers before the quota; complete native container-box coverage is not claimed. Content-sized navigation groups and already-rotated SVG exports are corrected for browser layout. A small number of original image offsets are aligned to measured native slot bounds without editing exports. Fonts are packaged Vazirmatn and Material Icons. Admin has its own base styles to avoid importing Artist utility overrides.

The geometry audit compares every original image path, load state and browser bounding box against recorded native bounds with a 2px tolerance. Zero-dimensional native strokes may export as 1px strokes. This audit and selected screenshot inspections do not establish full pixel equivalence or responsive production readiness. See `admin-ui-verification.json` and `tests/e2e/admin-preview.spec.ts` for measured results and automated coverage.

Remaining work includes completing the 26 pending Admin states, correcting the source sidebar design, seven pending Artist mobile frames, Customer desktop and foreign-partner panels, viewport-adaptive production pages, and backend integration.
