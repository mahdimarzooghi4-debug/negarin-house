# Mobile application readiness

## Platform decision

The native Negarin Artist application is **Android-only**. An iOS version is not required and is outside the release scope (ADR-0008). Do not create an iOS project, Xcode/CocoaPods setup, iOS simulator tests, Apple signing configuration, TestFlight workflow, or iOS CI jobs.

The existing artist/customer mobile screen sets are responsive web previews, not native Android packages. The independent native Artist workspace now exists at `apps/mobile`; this is a foundation slice, not an APK/AAB or a production release.

## Native Artist Android application

The client is a separate Expo SDK 58 / React Native 0.88.1 / React 19.3.0 TypeScript app. Its Expo config enables only the Android platform. It uses `expo-secure-store` for bearer-session persistence and calls the existing NestJS API; it never connects directly to PostgreSQL, Redis, queues, or private object storage.

The first native slice includes:
- Android-only app configuration and package scripts.
- A typed API client with a required build-time API origin and HTTPS enforcement outside development.
- Secure session read/write/revoke boundaries.
- Identity grant discovery and explicit user selection of an Artist grant using existing API contracts.
- Live, read-only Artist product and paid-order lists, with strict response parsing and no fabricated records or financial/fulfillment state.

### Authentication and release blockers

The API currently exposes grant discovery, active-context selection, context reads, and session revocation, but **does not expose public mobile request-code/verify-code endpoints**. The repository's `IdentityCore` is not itself a public login API, and no OTP delivery adapter/provider is configured. The app therefore does not invent an OTP provider, simulate a successful login, or accept a pasted production bearer token. End-user sign-in remains blocked until a real OTP transport and public authentication contract are implemented.

The following inputs are still required and must not be guessed:
- `EXPO_PUBLIC_API_BASE_URL`: reachable HTTPS API origin for the target environment.
- `NEGARIN_ANDROID_APPLICATION_ID`: owner-confirmed final Android application ID.
- Android signing and distribution configuration, after the application identity is approved.

The app's `build` script runs `expo export --platform android` to validate the Android JavaScript bundle. This is **not** a native Gradle build and does not produce an APK/AAB. Native Android build, emulator/device QA, and signed distribution remain separate gates.

### Next implementation sequence

1. Complete the real mobile sign-in API and configured OTP transport without weakening the existing session/grant authorization model.
2. Configure the API origin and owner-confirmed Android application ID; validate the actual Android Gradle development build.
3. Port the Figma Artist dashboard, product editor/media, order detail, preparation, and shipment flows against existing backend contracts.
4. Add Android emulator/device tests for authentication, ownership, revision conflicts, RTL, media permissions, and error recovery.
5. Establish Android development/preview/production build profiles and signing only after operational configuration is explicitly approved.

No fake/sample orders, payment confirmations, settlements, delivery outcomes, or buyer identities may be shown as real. Artist price ownership and the no-commission rule remain unchanged. Real payment remains unimplemented and must not be implied. No store publication or production deployment is authorized by this plan.

## Existing mobile-web implementation

The first live customer-mobile route is `/customer-mobile/saved` (source frame 613:5). It uses the existing authenticated customer favorites BFF/API and exact server revisions for deletion. Unavailable products remain removable; empty lists are server-derived. Failed writes clear actionable stale data and require a fresh read. Product images use real catalog media; no sample artist names/images or unsupported personalization claims are rendered. Story bookmarking is not implemented. Navigation and product links currently lead to the existing live web routes while those mobile flows await connection.

The page uses Figma typography, colors and card proportions with an adaptive 320–390px layout, bounded images and a bottom navigation. Browser tests cover real request shapes/revisions, conflicts/reconciliation, authentication and viewport overflow. Full screenshot parity and native Android runtime behavior are not verified.

## Customer account web slice

`/customer-mobile/account` reads the real customer profile and links to mobile saved products. `/customer-mobile/account-info` edits the display name using the existing revision-checked profile API; phone remains read-only. Logout calls the existing session-revocation BFF and redirects to public catalog only on success. Shared mobile navigation currently links to the mobile account, while orders, addresses, cart and discovery still use their existing live web routes. Browser coverage includes profile saving, conflict recovery, real logout request/error handling, missing sessions and mobile width. Mobile login and APK packaging remain pending.
