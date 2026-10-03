# Export Partner / Market Operations preview

Figma file `Uo0ifnpFmJFhWqaEVmVOZ1`, page `915:77` (“70 - Export Partner / Market Operations”). Native Next/React markup is saved for all 77 source screens. **66 are complete and rendered; 11 remain pending original images because the Figma MCP tool quota interrupted exports.** Seven small loose helper frames are not screens.

Open `/preview/export-partner` after `pnpm --filter @negarin/web dev`. The catalog accounts for all 77 frames and marks the 11 pending routes. Completed routes use `<language>-<screen>`, for example `/preview/export-partner/en-export-products`, `/preview/export-partner/ar-order-draft`. Production previews require `NEGARIN_UI_PREVIEW=1`.

| Language | Complete | Pending |
| --- | ---: | --- |
| English `en` | 11 / 11 | — |
| Arabic `ar` | 11 / 11 | — |
| Turkish `tr-TR` | 10 / 11 | Product Detail |
| Russian `ru` | 8 / 11 | Network Artists, Export Products, Product Detail |
| Chinese `zh-CN` | 9 / 11 | Product Detail, Account Preferences |
| French `fr` | 8 / 11 | Network Artists, Export Products, Product Detail |
| Spanish `es` | 9 / 11 | Network Artists, Product Detail |

Each language has Dashboard, Network Artists, Export Products, Product Detail, Orders List, Order Detail, Order Draft, Account Preferences, Order Review, Order Submitted, and Artist Profile. Canvas dimensions come from the inventory: desktop references only, with no tablet or adaptive production layout.

## Original source and layout

The implementation uses native markup and scoped CSS, not full-frame screenshots. It preserves 4,353 retrieved native auto-layout boxes and 1,454 utility CSS groups. Original Figma exports are local under `public/export-partner-assets`: 343 verified complete files are saved, including assets for pending checkpoints. The 66 rendered screens use 304 unique originals in 1,002 image slots. Their load status, callsite paths and bounds were checked individually. There are no temporary Figma asset URLs or external font URLs in the runtime.

Nineteen source vectors have no rendered bounds and cannot export: their source wrapper geometry is retained with a non-rendering span, without replacement artwork. Three visible Spanish timeline lines were exported from their original LINE children because the zero-height wrapper could not export. Those use stroke bounds, with the original child IDs recorded. Full-bounds sector SVGs in the Spanish dashboard retain their original transparent margins; their DOM crop wrappers are expanded to avoid applying the source crop twice. Small original-icon position adjustments accommodate packaged font metrics and are explicitly scoped to inspected node IDs.

SVG exports can assign different internal clip-path IDs on successive exports. `key` is the original export grouping identifier; `savedContentHash` records FNV-1a of the received file. Complete PNG chunks were checked against the original FNV key and length before decoding; SVG payloads were validated as complete XML. No SVG paths were redrawn.

Fonts are packaged locally: Inter, Noto Sans Arabic, Noto Sans SC, Outfit, JetBrains Mono and the existing Vazirmatn. The canvas root stays LTR because Arabic source children already put the main area before the sidebar. Arabic text retains source `dir="auto"`, Arabic fonts and native right-side geometry. Its accessible labels and preview feedback use Arabic. The other partner panels use their respective languages; internal review toolbar/catalog text remains Persian.

## Navigation and local interaction

All 66 completed pages use one semantic sidebar component while preserving source variants. The six source destinations are dashboard, network/artists, export products, orders, order draft and account. The seventh Reports item acknowledges preview scope: there is no Reports screen on this source canvas.

The 744 recorded native action callsites are inferred preview mappings. The source prototype audit could not be completed before the Figma quota; no claim of zero prototype links is made. Catalog actions and table buttons open sample product or artist details, draft/review/submitted/order-detail flows keep the current language, and language controls open the equivalent screen. Pending destinations show a localized explanation rather than an incomplete canvas. Arabic draft “تفاصيل التشغيل” is inferred as the review action; its original label is retained.

Editable fields and choices persist during client-side navigation within this preview. Search Enter opens the same-language sample catalog. Language controls offer all seven languages. Save/report/filter/download/support and other unconnected actions show localized preview messages. Account choices and field edits do not change server data. Quantities, totals, currency values, product selections, shipment estimates, search results and order IDs remain static reference examples; entering a quantity does not recalculate the ledger or create an order. The source “API Connected” badge and added-to-draft labels are static artwork, not connectivity evidence.

Some source financial captions overlap or run past their cards, and Arabic Dashboard table rows extend below their white card. These source geometries are retained and are not declared polished production layouts. Sample companies, industries, product units, currencies and order IDs differ across languages and between related source screens. These are separate reference canvases, not a synchronized live dataset.

## Remaining work and recovery

`screen-inventory.json` records all 77 statuses. `pending-assets.json` records all 34 still-missing unique original PNG exports, native node IDs, bounds and pending callsites. Native markup for the 11 pending screens is saved under `src/features/export-partner/screens-pending`; it is excluded from runtime loaders until every original asset is available. The catalog and route notice remain accessible. Resume by exporting those original nodes, checking their bytes/callsites, moving completed screens into `screens`, enabling their registry loaders and rerunning the geometry/browser checks. Do not replace missing photographs with unrelated local images.

Backend authentication, partner/market authorization, real catalog search/filtering, inventory and export eligibility, currency/price contracts, drafts/orders, notification preferences, document download and server persistence remain outstanding. No live order, shipment, charge, upload, login or logout occurs here.

Validation is recorded in `export-partner-verification.json`. Native asset-bound checks and selected visual comparisons do not establish full pixel equivalence.
