# Service Partner desktop Figma preview

All eight frames on Figma canvas `1001:2` (60 — Service Partner / Portal) are implemented as native Next/React screens. Reference: https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=1001-2

## Review and coverage

Run `pnpm --filter @negarin/web dev` and open `/preview/service-partner`. Each inventory slug is available at `/preview/service-partner/<slug>`. `?canvas=1` hides the review toolbar. These are fixed 1440 × 1024px desktop reference canvases, with no tablet layout. Production previews require `NEGARIN_UI_PREVIEW=1`; the existing portals and backend are unchanged.

The inventory includes dashboard, assigned requests, request detail, schedule/execution, submit deliverable, history, account, and states/QA. Seven empty organizational sections on the Figma page contain no additional frames. The states/QA frame shows loading, empty, error, permission-denied and acceptance reference content together; those are not five invented production routes.

## Interactions and integration limits

A shared semantic ServicePartnerSidebar preserves all six source navigation links and their source styles on every screen. All 66 action controls are mapped in `service-partner-controls.json`. The source has no native ON_CLICK prototype links: navigation is inferred from visible controls. Assigned-request actions open the request-detail or execution reference frame; acceptance opens execution and rejection returns to the sample list. Retry opens the sample assigned-request list. These actions do not accept or reject real work.

Delivery notes are editable and retained across client navigation in the same layout; reload resets the sample state. File selection reuses the existing local upload control (JPEG, PNG, WebP or PDF; max 20MB); it displays the selected filename and sends no upload. Draft save acknowledges local preview state. Deliverable submission, progress/problem actions, account management, logout, search and status filtering explain that backend behavior is not integrated. No source subdialogs or filter/search form designs were provided, so no extra screens or actual filtering/authentication are claimed.

The source list/details/execution frames use different example request IDs (detail SRV-2042; execution/output SRV-2048). Those reference texts are preserved; static navigation is not a record-aware workflow. Historical rows do not open the current request as if it were the historical record; they acknowledge the missing backend behavior.

Production integration must restrict both list queries and individual request, deliverable and file operations to the authenticated organization and its assigned requests. The explanatory source copy does not enforce access control. No permissions, cross-organization isolation or live business data are implemented by this preview.

## Fidelity and verification

High-fidelity source context and screenshots were retrieved for every frame. Scoped native CSS translates 122 unique utility groups and preserves 166 native auto-layout dimensions. Packaged Vazirmatn is reused; no Tailwind dependency was added. The source Brand container is only 40px high and clips its title/logo; the account summary also clips long text. These source defects are retained for design correction, not reported as repaired.

Eight original image slots use the same local native logo export. All eight native image fills have identical image hash, dimensions and no effects; the exact export is reused without modification. Paths and bounds are recorded in `service-partner-asset-slots.json`. Every frame and image was rendered and compared with native slot geometry at a 2px tolerance. Selected full-page screenshots were visually inspected. This does not establish full pixel equivalence or viewport-adaptive production readiness.

Playwright coverage includes every route and original image geometry, six sidebar links per frame, assigned-request navigation, sample actions, persistent delivery feedback, local file selection, QA retry and account behavior. Existing Admin, Artist desktop/mobile and Customer mobile suites provide regression coverage. Results are recorded in `service-partner-ui-verification.json`.

The 26 pending Admin states and seven pending Artist mobile frames remain separate work. Customer desktop, foreign export-partner panels, responsive production integration and backend completion are still outstanding.
