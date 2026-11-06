# Mobile application readiness

## Platform decision

The native Negarin Artist application is **Android-only**. An iOS version is not required and is outside the release scope (ADR-0008). Do not create an iOS project, Xcode/CocoaPods setup, iOS simulator tests, Apple signing configuration, TestFlight workflow, or iOS CI jobs.

The existing artist/customer mobile screen sets are responsive web previews, not native Android packages. No APK/AAB, native Android project, or production mobile release is provided by the existing web changes.

## Native Artist Android application

The native client is planned at `apps/mobile` as React Native + TypeScript, separate from the Next.js browser application. Expo SDK 58 is the selected initial toolchain baseline; it targets React Native 0.88 / React 19.3 and supports the repository's Node.js 22.18+ requirement. Before feature implementation is treated as buildable, CI must generate the pnpm lockfile with the new dependencies and complete an actual Android development build. Only Android platform configuration and artifacts are in scope.

The native client must call the existing NestJS API, use the shared identity service with Android secure session storage, and rely on backend authorization and domain state. It must not connect directly to PostgreSQL, Redis, queues, or private object storage.

### Planned implementation sequence

1. Create the Android-only React Native application workspace and verify dependency resolution, lockfile integrity, and Android Gradle build.
2. Implement artist authentication/session lifecycle and role-scoped navigation.
3. Connect the artist home, product list/editor, product media, and order list/detail to existing authenticated API contracts.
4. Add only backend-supported preparation and fulfillment commands, preserving independent order, preparation, shipping, receipt, issue, refund, and settlement states.
5. Add Android emulator/device tests for authentication, ownership, revision conflicts, RTL layout, media permissions, and error recovery.
6. Establish Android development/preview/production build profiles and signing only after the application identity and operational credentials are explicitly configured.

No fake/sample orders, payment confirmations, settlements, or delivery outcomes may be shown as real. Artist price ownership and the no-commission rule remain unchanged. Real payment remains unimplemented and must not be implied.

The final Android application ID, signing key, store listing, supported device range, distribution channel, and provider credentials are not yet established and must not be guessed. No store publication or production deployment is authorized by this plan.

## Existing mobile-web implementation

The first live customer-mobile route is `/customer-mobile/saved` (source frame 613:5). It uses the existing authenticated customer favorites BFF/API and exact server revisions for deletion. Unavailable products remain removable; empty lists are server-derived. Failed writes clear actionable stale data and require a fresh read. Product images use real catalog media; no sample artist names/images or unsupported personalization claims are rendered. Story bookmarking is not implemented. Navigation and product links currently lead to the existing live web routes while those mobile flows await connection.

The page uses Figma typography, colors and card proportions with an adaptive 320–390px layout, bounded images and a bottom navigation. Browser tests cover real request shapes/revisions, conflicts/reconciliation, authentication and viewport overflow. Full screenshot parity and native Android runtime behavior are not verified.

## Customer account web slice

`/customer-mobile/account` reads the real customer profile and links to mobile saved products. `/customer-mobile/account-info` edits the display name using the existing revision-checked profile API; phone remains read-only. Logout calls the existing session-revocation BFF and redirects to public catalog only on success. Shared mobile navigation currently links to the mobile account, while orders, addresses, cart and discovery still use their existing live web routes. Browser coverage includes profile saving, conflict recovery, real logout request/error handling, missing sessions and mobile width. Mobile login and APK packaging remain pending.
