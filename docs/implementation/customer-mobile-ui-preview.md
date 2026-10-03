# Customer mobile Figma preview

All 32 top-level frames on Figma page `401:2` (40 - Customer / Mobile) are implemented as native React screens with scoped CSS. Reference: https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=401-2

## Open and review

Run `pnpm --filter @negarin/web dev` and open `/preview/customer-mobile`. Each inventory slug is available at `/preview/customer-mobile/<slug>`. Add `?canvas=1` to hide the review toolbar. Production previews require `NEGARIN_UI_PREVIEW=1`; the existing customer portal is unchanged.

These are fixed 390px reference canvases, with the source frame heights (landing 1850px; other frames 844px). Scroll areas preserve the source clipping and horizontal/vertical scrolling. Viewport-adaptive production integration is still required. No tablet design or native app binary is included.

## Coverage and interactions

The inventory covers landing, stories, product detail, artist profile, cart, both checkout steps, order confirmation, orders, order detail, account, saved works, followed artists, addresses, account information, notifications, help, edit profile, address form, search/discovery, search results, category, filters/sort, filtered results, all categories, artists, products, story detail, login, OTP, corporate buyer access and corporate buyer handoff.

All 42 source ON_CLICK frame/instance prototype links are preserved. Other documented destinations are inferred preview mappings from the visible controls, not extracted prototypes. Cards containing independent like/save buttons use a keyboard-accessible card link so clicking a nested control does not also navigate.

The source purchase sequence is product → cart → shared login → OTP → shipping information → payment review → confirmation → order detail. Phone input accepts Persian digits and validates an Iranian mobile number. OTP accepts six digits; the sample code is `123456`. Nothing is sent by SMS. Payment review preserves Figma's failed-payment state; retry navigates to the sample confirmation without charging or creating an order.

Fields and choices persist during client navigation in the same preview layout and reset on reload. Search Enter opens the reference results page. Filters open the reference filtered-results state; result contents are static. The cart counter is a bounded sample interaction (1–99); source amounts and order quantities in other frames remain static. File selection, where applicable, is local only. Server authentication, customer records, order creation, uploads, payments, shipping, notifications and support are not integrated.

## Design fidelity and verification

High-fidelity Figma design context was retrieved for every frame, converted to the existing Next/React/CSS stack and adapted to shared preview controls. No Tailwind dependency was added. Ninety original local assets occupy 162 image slots. Asset replacement is tracked per node/callsite rather than by reused Figma variable names. Native effect/render bounds are recorded for blurred decorations and the rotated search stroke; exported artwork is unmodified. Sixty-seven native auto-layout container dimensions are preserved.

The source fonts use packaged Vazirmatn and Material Icons. Shared Artist styles and preview state are reused under a separate Customer layout and base path. Existing Artist routes retain their own navigation and validation behavior.

The verification JSON records route, image and browser checks. Geometry tolerance is 2px and does not establish full pixel equivalence. Playwright tests cover all frames, sample checkout validation/navigation, filters/search, persistent account fields and source card/header navigation. The Artist suites provide regression coverage for the shared controls.

See `customer-mobile-screen-inventory.json`, `customer-mobile-asset-slots.json`, `customer-mobile-controls.json`, `customer-mobile-ui-verification.json` and `tests/e2e/customer-mobile-preview.spec.ts`. The previously pending seven Artist mobile frames are separate outstanding work, not part of this 32-frame canvas.
