# Negarin Artist Android app

This is the independent Android-only native client. It is not the Next.js mobile web preview and does not include an iOS target.

## Local preview

Set the API origin to a reachable environment before starting Metro:

```sh
export EXPO_PUBLIC_API_BASE_URL="https://<your-api-origin>"
pnpm --filter @negarin/mobile start
```

The app restores an existing session from Android secure storage. It does not provide a fake sign-in path: the public OTP request/verify API and delivery adapter have not yet been implemented.

## Validation

```sh
pnpm install --frozen-lockfile
pnpm --filter @negarin/mobile typecheck
pnpm --filter @negarin/mobile test
pnpm --filter @negarin/mobile build
```

The build command exports the Android JavaScript bundle. It does not create an APK/AAB.

A native Android Gradle build requires the owner-confirmed `NEGARIN_ANDROID_APPLICATION_ID`. Signing, distribution, and release are separate approval gates.

## Current live reads

- `GET /api/v1/identity/grants`
- `GET /api/v1/identity/context`
- `POST /api/v1/identity/context/select`
- `POST /api/v1/identity/session/revoke`
- `GET /api/v1/artist/products`
- `GET /api/v1/artist/orders?page=1&pageSize=20`
- `GET /api/v1/artist/orders/:id`
- `POST /api/v1/artist/orders/:id/preparation`
- `POST /api/v1/artist/orders/:id/shipment`

Order detail displays the API-pinned shipping address and status history. Preparation commands may advance only one server-defined state at a time. A shipment report is an artist statement with `carrierVerified: false`; it is not proof of carrier acceptance or customer delivery.

All business state and authorization remain owned by the NestJS API. The app displays no sample product/order data and does not calculate payment, settlement, shipment verification, or delivery outcomes.

## Native Artist product management

The Android product tab now opens an owned-product editor (Figma 840:155) and a create-draft action.
Commands use the existing NestJS API and do not introduce a second product model:

- `POST /api/v1/artist/products` creates an Artist-owned draft with an exact Toman decimal-string price.
- `GET /api/v1/artist/products/:id` re-reads authoritative product state.
- `PATCH /api/v1/artist/products/:id` updates only changed fields and sends the current product version.
- `PATCH /api/v1/artist/products/:id/inventory` uses the independent inventory revision.
- `POST /api/v1/artist/products/:id/submit` requests human review; it does not grant approval.
- `POST /api/v1/artist/products/:id/publish` is offered only for an approved product and still requires backend authorization.

The client keeps content locked during review and after publication, while the Artist retains the
backend-permitted authority to change the price. Price inputs normalize Persian/Arabic numerals
and validated thousands separators without floating-point calculations. Native inventory starts
only after an owned draft exists, and the independent inventory version is preserved.

Every acknowledged mutation is followed by a fresh product GET. Conflicts and uncertain acknowledgements
require reconciliation; if the GET fails, further commands are disabled. An uncertain *create*
is never automatically replayed, preventing accidental duplicate products.

Native image gallery uses Expo ImagePicker ~58.0.10 to select one actual image at a time, previews only private server-owned WebP images through 300-second signed reads, and uploads canonical JPEG base64 to the existing product-image endpoint. The client enforces the 5 MiB/8-image bounds, disables camera/microphone permissions, recovers Android pending picker results, and reconciles upload/gallery mutations with an authoritative product GET. Removing an image from the active gallery does not delete its immutable media record.
Full fidelity checks against Figma, Android emulator/device QA, and native APK/AAB generation are not
claimed in this slice. The app remains Android-only.
