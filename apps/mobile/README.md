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

All business state and authorization remain owned by the NestJS API. The app displays no sample product/order data and does not calculate payment, settlement, shipment verification, or delivery outcomes.
