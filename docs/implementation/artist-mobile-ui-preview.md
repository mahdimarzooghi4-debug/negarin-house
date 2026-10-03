# Artist mobile web preview

The requested [Artist Mobile canvas 863:305](https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=863-305) contains 91 top-level screens/states in 13 sections, including one separate export-sale finance frame. **84 screens are implemented; 7 are blocked by the Figma design-context quota.** Pending routes show an explicit notice rather than an invented design.

This is a native React/Next web implementation of the mobile designs, not a screenshot-based UI or an iOS/Android binary. It preserves the 390px reference canvas and the supplied screen heights for review. No tablet design is included. It is not yet a viewport-adaptive production portal; the existing `/artist` route remains unchanged.

## Review and development

Use the same setup as the desktop preview:

```sh
pnpm install --frozen-lockfile
pnpm --filter @negarin/ui build
pnpm --filter @negarin/i18n build
pnpm --filter @negarin/web dev
```

Open `http://localhost:3000/preview/artist-mobile`. Each screen has a route at `/preview/artist-mobile/<slug>` and a Figma reference link. Add `?canvas=1` for the visual review without the toolbar or automatic dialog autofocus. `/preview/artist` contains the separate desktop inventory.

Production preview access requires `NEGARIN_UI_PREVIEW=1`, evaluated at request time. Otherwise preview routes are unavailable. This flag does not deploy anything or activate real business operations.

## Implementation

- 84 explicit screen components, scoped native CSS and a shared mobile navigation component.
- 334 original local SVG/PNG files at 849 image slots. Identical variable names in multiple design slots are resolved per callsite, so each slot keeps its original exported geometry.
- Shared desktop preview controls/state now accept a base route; mobile links stay under `/preview/artist-mobile`.
- Editable fields, sample draft state across navigation, local image/document/media selection, single/multiple choices, modal focus handling/Escape and a local order-progress counter.
- Original local Vazirmatn and icon fonts. The fullwidth `＋` glyph uses a local Noto Sans JP 5.3.0 fallback file from Fontsource, with the OFL license alongside it in `public/artist-mobile-fonts`.
- Intrinsic auto-layout bounds from Figma are preserved. Strokes render inside the frame without reducing content space. Exported zero-width dividers keep their original stroke bounds and avoid an extra rotation.

The mobile canvas has no stored prototype reactions. Preview destinations are mapped from visible control labels and screen roles, and are documented as preview mappings in `artist-mobile-controls.json`; they are not presented as extracted Figma prototype links.

## Coverage and pending designs

`artist-mobile-screen-inventory.json` records every frame ID, section, dimension, route and implementation status. `artist-mobile-asset-slots.json` records local asset paths and reference bounds. `artist-mobile-ui-verification.json` records the completed checks.

The Figma design-context tool returned: “You've reached the Figma MCP tool call limit for your Full seat on the Professional plan.” The following screens therefore remain pending:

| Frame | Route |
| --- | --- |
| `858:927` | `shipping-method-setup` |
| `858:1021` | `account` |
| `858:1172` | `account-information` |
| `858:1243` | `edit-profile` |
| `858:1307` | `notification-settings` |
| `858:1400` | `logout-confirmation` |
| `944:394` | `finance-transaction-detail-export-sale` |

Finish these from complete design-context responses before claiming full mobile canvas coverage. No customer or foreign partner pages are implemented by this mobile milestone.

## Preview limitations and integration

Sample fields survive client navigation in the shared layout but are lost on refresh. Draft navigation does not create records or update the sample product list. Choices/filters demonstrate selection rather than complete data filtering. File selection checks type and a 20MB size limit locally; media accepts images and MP4/WebM, and nothing is uploaded. Controls without a mapped destination display an integration notice.

The counter demonstrates local order-progress input; the accompanying sample summary is static. Review approval, publishing, payment, settlement, order progress, credentials and shipping states are review routes, with no backend mutation. These must be connected to real APIs, permissions, data loading and persistence after page coverage is complete.

To run the browser checks after a web build:

```sh
pnpm exec playwright install chromium
pnpm exec playwright test tests/e2e/artist-mobile-preview.spec.ts tests/e2e/artist-preview.spec.ts
```

An existing Chromium binary can be supplied with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. The tests cover mobile inventory/pending routes, mobile navigation and draft input, inert order sheets/counter/Escape, and story media/caption interaction; desktop regression checks are included in the command.
