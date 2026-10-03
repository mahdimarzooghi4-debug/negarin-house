# Artist desktop UI preview

This milestone implements the 83 top-level desktop screens and states on [Figma Artist canvas 49:2](https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=49-2). The inventory includes shared authentication and explicitly marked Future states. Customer, foreign partner and native mobile panels are outside this milestone. No tablet layout is included.

## Open the preview

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm --filter @negarin/ui build
pnpm --filter @negarin/i18n build
pnpm --filter @negarin/web dev
```

Open `http://localhost:3000/preview/artist` for the grouped screen catalog. Each screen has a route at `/preview/artist/<slug>`, a link to its Figma frame, and a review toolbar. Add `?canvas=1` to hide the toolbar and suppress modal autofocus and the verification-success redirect for visual comparison. Screens preserve the original 1440px desktop frame width and scroll on narrower viewports.

Production preview access is disabled by default. To review a production build locally or on an explicitly configured staging service:

```sh
pnpm --filter @negarin/web build
NEGARIN_UI_PREVIEW=1 pnpm --filter @negarin/web start
```

This does not replace the existing `/artist` portal route or publish the preview. Keep the preview flag unset on public production services until integration is complete.

## Implementation and coverage

- Native React/Next screen components and scoped CSS; no Tailwind dependency or embedded screenshot screens.
- 88 local original SVG/PNG asset files used in 1,087 image slots; no temporary Figma asset URLs are required at runtime.
- Locally packaged Vazirmatn Variable and Material Icons fonts. Persian text and desktop sidebar placement follow the reference.
- One shared sidebar component preserves the frame-specific active, muted and inert states.
- Designed prototype links navigate between screen routes. Inputs, choices, local file selection, dialog focus handling and sample phone/OTP validation work in the preview.

Traceability files:

- `artist-screen-inventory.json`: all 83 frame IDs, names, dimensions, groups and route slugs.
- `artist-asset-slots.json`: image slots mapped to local assets and source frames.
- `artist-controls.json`: control labels and destinations.
- `artist-ui-verification.json`: scope and completed verification results.

## Completed verification

All 83 screens rendered with HTTP 200 and no observed page/hydration errors. All 1,087 image slots loaded. Their positions and dimensions were checked against exported Figma bounds: no outliers beyond a 2px tolerance. Dashboard, product, authentication and modal screenshots were visually reviewed. This geometry audit is not a complete pixel-by-pixel comparison or an accessibility certification.

Web build and ESLint passed, along with 7 web unit tests, 10 UI unit tests and 4 Artist Playwright tests. The browser tests cover catalog/route completeness, product draft navigation and local file selection, inert modal backgrounds/Escape, and Persian phone/OTP validation. The frozen lockfile check also passed.

To rerun the browser checks after building the web app:

```sh
pnpm exec playwright install chromium
pnpm exec playwright test tests/e2e/artist-preview.spec.ts
```

An existing Chromium executable can instead be supplied with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. The Playwright server enables the preview flag for tests.

## Integration still required

Preview content is sample Figma data. Input values survive route navigation in the shared layout but are lost on refresh. Saving does not persist a server draft or update the sample table rows. Choices and filters demonstrate selection; they do not implement complete data queries. Controls without a designed destination show an integration notice.

Authentication uses the sample OTP `123456`; no SMS, account session or real authorization is created. Files are checked locally for type/size and selected only; no upload or document storage occurs. Payments, memberships, order progress, shipping, settlement, messaging and product review/publication do not mutate backend data. Future frames remain available for design review only.

Before backend work is considered complete, map the screen inventory and controls to real API contracts, connect authentication/permissions, draft persistence and uploads, replace sample lists/detail data, implement filtering/pagination, and test the real order/payment/settlement workflows. Remaining customer and foreign partner canvases must also be implemented and checked before claiming coverage of the whole Figma file.
