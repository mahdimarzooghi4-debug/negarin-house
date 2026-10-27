# Artist mobile web preview

Source: [Artist Mobile canvas 863:305](https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=863-305). All 91 source screens/states in 13 sections are enabled at `/preview/artist-mobile`, including the separate export-sale transaction frame. The retry completed all seven previously missing contexts with their original assets. No pending routes remain.

These native Next/React screens preserve the source 390px width and per-screen heights. They are reference web previews with no tablet layout, adaptive production portal or native iOS/Android binary. The existing production Artist route is unchanged. Production preview access requires `NEGARIN_UI_PREVIEW=1`; `?canvas=1` hides the review toolbar and automatic dialog focus.

## Implementation and behavior

All 393 original local files are complete in 966 callsites. Native scoped CSS preserves 3,886 retrieved auto-layout boxes, source strokes, original divider bounds and packaged Vazirmatn/icon fonts. The fullwidth plus glyph retains the local Noto Sans JP OFL fallback. No frame screenshots, replacement photographs/icons, temporary Figma URLs or remote fonts are used.

Shared mobile navigation keeps routes under `/preview/artist-mobile`. Existing editable drafts, local upload/media selection, choices, inert modal backgrounds, Tab/Escape and the order-progress counter remain. Account now links to native account information, editable profile, notification preferences and logout sheet. Profile name drafts persist during client navigation; the masked phone remains locked. Profile photo/change-photo artwork is preserved, without an implemented profile-image upload control. Notification preferences have independent local values and source defaults, including the initially disabled finance SMS choice. Save actions acknowledge preview scope. Logout confirmation performs no real session revocation; cancel/Escape returns to Account.

Shipping Method Setup is the source saved-settings reference, not a production shipping configuration API. Export-sale finance detail remains static source example data. No authentication, product publication, payment, settlement, shipping update or backend mutation is performed. Drafts reset on refresh. All native source prototype reaction audits found none, so routes are inferred mappings, documented in the control inventory.

## Verification

All 91 routes return HTTP 200 with no page errors or broken images. Every original image path and browser bound was checked against its source slot within 2px across 966 callsites. New frames were checked again against the final production build. Edit Profile was visually compared with its source screenshot. Web build/scoped ESLint and seven unit tests passed; six mobile Playwright tests passed in the combined portal run, covering catalog/routes, product drafts/media, inert sheets/counter/Escape, story choices, account/profile draft persistence, independent notifications and sample logout. Geometry checks and selected comparisons do not establish full pixel equivalence. See `artist-mobile-ui-verification.json`.

Page inventory is complete. Responsive/native app integration, live APIs, authorization, persistence and real business operations remain future work.
