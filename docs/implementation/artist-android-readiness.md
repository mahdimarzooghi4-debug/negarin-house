# Negarin Artist Android application readiness

## Implemented foundation

- Independent Expo / React Native / TypeScript application at `apps/mobile`.
- Android-only Expo platform configuration (`platforms: ["android"]`); no iOS project or iOS build target is created.
- Expo SDK 58, React Native 0.88.1, React 19.3.0, and `expo-secure-store` for the Android session credential.
- API base URL is supplied at build time through `EXPO_PUBLIC_API_BASE_URL`; production builds reject non-HTTPS URLs.
- Session restoration reads the bearer credential from Android secure storage and validates it before use.
- Identity integration uses the existing `GET /api/v1/identity/grants`, `GET /api/v1/identity/context`, `POST /api/v1/identity/context/select`, and `POST /api/v1/identity/session/revoke` contracts. Artist grant selection is an explicit user action.
- Read-only Artist products and paid-order lists consume the existing NestJS APIs. Product/order response parsing fails closed; no sample records, buyer identity, invented order numbers, payment, settlement, or delivery status are added.

## Current blockers

1. **End-user sign-in is not activated.** Public request/verify contracts and native forms exist, but the delivery adapter is unavailable by default. An approved delivery provider, server-side OTP secret and shared ingress/IP rate limiting remain required before activation.
2. **API origin is not configured.** Supply `EXPO_PUBLIC_API_BASE_URL` with the reachable HTTPS API origin for a build environment. No domain is assumed.
3. **Android application ID is not selected.** Supply `NEGARIN_ANDROID_APPLICATION_ID` only after the owner confirms the final reverse-DNS identifier. No package identifier is guessed.
4. **Android signing/distribution is not configured.** Debug bundle validation is separate from signed APK/AAB and store release. No signing key, EAS project, store listing, or production release is created here.
5. **Visual assets and Vazirmatn font require native packaging.** The existing Figma assets are currently packaged for the web preview. Native asset/font packaging and screenshot parity remain a separate implementation/QA slice.

## Local development

- Install the workspace using `pnpm install --frozen-lockfile`.
- Set `EXPO_PUBLIC_API_BASE_URL` to the reachable API origin before starting the app.
- Start the Android app's Metro development server with `pnpm --filter @negarin/mobile start`.
- Validate the Android JavaScript bundle with `pnpm --filter @negarin/mobile build`.
- Do not run native prebuild or create a release package until `NEGARIN_ANDROID_APPLICATION_ID` is confirmed by the owner.

## Build semantics

- `pnpm --filter @negarin/mobile build` exports the Android JavaScript bundle for validation; it is **not** an APK/AAB.
- A native Android Gradle build and device QA remain required after the application ID and Android build environment are configured.
- iOS is explicitly out of scope.

## OTP contract and native sign-in

The native app now collects an Iranian mobile number and six-digit code, normalizes Persian/Arabic digits, calls `/api/v1/identity/otp/request` and `/verify`, and saves only a validated session token in SecureStore before discovering artist grants. The backend endpoints validate exact bodies, preserve core resend/attempt limits and return no-store responses. No role is granted by login.

`LoginDelivery` is deliberately unavailable: both endpoints return 503 before database access until an approved delivery adapter and server-side `IDENTITY_OTP_SECRET` (at least 32 characters) are configured. No fixed code, code echo, SMS delivery, authentication bypass or usable deployed sign-in is claimed. Before enabling an adapter, deployment must add shared ingress/IP rate limiting and verify provider behavior. API origin and phone/device QA remain release gates.
