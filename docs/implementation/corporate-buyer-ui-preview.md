# Corporate Buyer desktop preview

Source: [Negarin House — Corporate Buyer / Portal](https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=961-2). The source page contains 26 frames in nine sections. All 26 high-fidelity contexts and native React/CSS checkpoints are saved. **Only Dashboard and Corporate Products are complete and enabled. The other 24 screens are pending original assets. Full portal completion is not claimed.**

The catalog is `/preview/corporate-buyer`. Every source frame has a catalog entry and route. Complete screens render their native canvas; pending routes show a Persian explanation, original Figma link and return link, without incomplete images. `?canvas=1` hides the review toolbar. Production access is disabled unless `NEGARIN_UI_PREVIEW=1`. Source width is 1440px, heights are recorded per frame; there is no tablet layout.

## Coverage and saved checkpoints

Complete: Dashboard; Corporate Products (six original product photographs, all source filters and product actions).

Pending: Product Detail; Artist Profile; Purchase Requests; New Purchase Request; Purchase Request Detail; Request Needs Info; Proposals; Proposal Detail; Proposal Revision; Order Submitted; Orders; Order Detail; Deliveries; Delivery Detail; Report Issue; Issue Detail; Reports; Notifications; Account; Users & Access; Delivery Addresses; Empty States; Loading States; Error States.

Figma quota stopped the original asset export at batch 99 of 211. There are 266 incomplete/missing unique exports: 18 PNGs and 248 SVGs, across 329 source callsites. `pending-assets.json` records their native node/frame IDs, dimensions, expected export hashes and lengths. The large Product Detail photo at node `961:661` has a durable, private-to-source checkpoint under `corporate-buyer-pending-asset-chunks/a64808e0.json`: 391,500 of 428,136 base64 characters received, next offset 391,500. It is incomplete and is never decoded or exposed as a public image. The available complete files are under `public/corporate-buyer-assets`; 38 verified originals are saved, of which 34 are used in the two runtime screens.

All 24 pending React/CSS source checkpoints are under `src/features/corporate-buyer/screens-pending` and excluded from runtime loaders. Native forms have preliminary semantic field/action mappings, but uploads, selectors, field validation, account preferences and end-to-end purchase/revision/delivery/issue flows are not implemented or browser-verified there. Do not present those checkpoints as functional pages.

## Layout, assets and source limits

Native markup and scoped CSS retain 1,643 retrieved auto-layout boxes and 529 utility groups across all 26 source frames. The two completed screens use 51 original-image slots, checked individually for file contents, callsites and browser bounds. Locally packaged Vazirmatn matches the native font audit. The canvas root remains LTR to preserve the source main-area/right-sidebar order; Persian text retains source `dir="auto"`.

SVG exports use `svgSimplifyStroke:false` to preserve internal network strokes. Native zero-height LINE exports use physical stroke bounds. Product-photo wrappers account for source card strokes overlaying rather than reducing photo width. PNG payloads are checked against original base64 length/FNV; SVGs are complete XML, with received payload hashes recorded separately because internal mask/clip IDs can vary between native exports. No icon paths are redrawn, photographs substituted or full-frame screenshots used as implementation assets. Runtime files have no temporary Figma asset URLs or remote font dependency.

Four filled, open-segment source vectors (native children `961:2224`, `961:2416`, `961:2568`, `961:2688`) fail export from both their wrappers and original VECTOR children. They have no strokes and no exported visible artwork. Their original 18px wrappers remain in the pending checkpoints with non-rendering spans, with the source error recorded in `non-rendering-assets.json`. No replacement icon is drawn. These pending designs are not visually verified.

The source sidebar leaves a large vertical gap between its separate small logo and brand/navigation group. Dashboard has a circle-X icon for its active menu item. Those source geometries/variants remain unchanged. The source QA logo size differs from the regular 32px logo; pending markup preserves those source values rather than declaring a uniform, polished sidebar.

## Preview actions and remaining work

One semantic sidebar component preserves the native destinations. The completed canvases have eight links: dashboard, purchase requests, corporate products, proposals, orders, deliveries, reports and account. Other source variants may include Notifications as a ninth item. Header bell links to the recorded Notifications checkpoint. All native container/instance/component/text prototype audits found zero reactions. All 345 recorded action mappings are inferred; only the 43 callsites in complete screens are currently enabled. Browser tests cover navigation, checkpoints and filter feedback.

Dashboard quick actions open the catalog or the relevant pending request/order route. Each product has independent View Product and Add to Request links to the corresponding pending source screen. These links do not add a product to a live draft. Filter/dropdown/pagination actions acknowledge preview scope without filtering or changing the six source sample products. No order, request, approval, allocation, upload, delivery confirmation, invitation, email or permission change is performed.

Resume by exporting the missing originals, continuing the saved Product Detail photo from its checkpoint, verifying complete file hashes, and inspecting every source callsite. Then move each fully sourced screen from `screens-pending` to `screens`, enable its registry loader, implement and test its form/select/upload validation and semantic navigation, and rerun native geometry and visual checks. Do not enable a page whose visible static assets remain incomplete.

Backend corporate organization isolation, role enforcement, eligible products/pricing, real requests/proposals/approvals/orders, delivery addresses, issue attachments, reporting and notifications remain future work. Geometry checks and selected visual comparisons do not establish full pixel equivalence. Verification and coverage are recorded in `corporate-buyer-ui-verification.json`.
