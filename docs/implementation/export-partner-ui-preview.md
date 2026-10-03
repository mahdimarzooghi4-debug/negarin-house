# Export Partner / Market Operations preview

Source: [Export Partner canvas 915:77](https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=915-77). All 77 native screens are enabled at `/preview/export-partner`: 11 each for English, Arabic, Turkish, Russian, Chinese, French and Spanish. The retry recovered all 34 missing PNG exports and enabled all 11 pending screens. Seven loose helper frames are excluded from the screen inventory.

Routes use `<language>-<screen>`, such as `/preview/export-partner/ru-export-products`. Production previews require `NEGARIN_UI_PREVIEW=1`. `?canvas=1` hides the toolbar. These are fixed 1440px source references with no tablet/adaptive production layout.

## Assets, language and navigation

All 377 local originals are complete in 1,203 rendering callsites, with 4,353 native auto-layout boxes, scoped CSS and packaged language fonts. SVG stroke networks, source viewBox margins and non-rendering source vector wrappers retain their original artwork/geometry. One fresh native PNG export changed length/hash at node `915:5995`; the current native export was verified and all callsites point to its complete `6157b1c5.png` file.

The shared semantic sidebar retains every language variant, six source links and a localized Reports acknowledgement because no Reports source screen exists. Native Arabic main/sidebar order is preserved. Product/artist actions, order draft/review/submitted/detail navigation and language selectors stay in the selected language. Newly enabled Russian/French catalog buttons compose the existing ExportAction control with their native labels and styles. Foreign panels retain their source language; internal panels remain Persian.

A fresh source audit checked 9,475 frame/instance/component/text nodes and found zero reactions. All preview navigation mappings are inferred. Local fields/choices persist across client navigation; sample data, quantities, companies, currencies, order identities and status badges remain static. Filter/pagination/preferences/logout/reporting controls acknowledge preview scope without creating business operations. Source financial caption overlap and Arabic table overflow remain documented reference defects.

## Verification and integration limits

All 77 screens returned HTTP 200 without page errors, broken images or original-path mismatches. All 1,203 original-image bounds match recorded native slots within 2px. The 11 newly enabled screens were checked again against the final production build. Build/scoped ESLint and seven unit tests passed; all four Export Partner Playwright tests passed, covering every asset slot, seven-language sidebar/order flows, local state and equivalent-screen language switching. Geometry checks do not establish full pixel equivalence.

Page inventory is complete. Organization/market isolation, authorization, live catalog/artist access, pricing/commercial terms, export purchasing/orders/shipping, real preferences, uploads, reporting and persistence remain backend/production integration work. See the inventories, control mappings and `export-partner-verification.json`.
