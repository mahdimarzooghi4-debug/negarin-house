# ADR-0008 — Android-only Artist Native Application

- Status: Accepted
- Date: 2026-11-06
- Supersedes: ADR-0007 only where native platform selection and the first native role scope were left unresolved

## Context

The product owner confirmed that the Artist application is required on Android only. An iOS version is not required. The existing mobile web previews are not a substitute for a native Android application.

## Decision

- The first native mobile deliverable is the **Negarin Artist Android application**. iOS is explicitly out of scope.
- Implement the independent client in `apps/mobile` using React Native + TypeScript. Keep the existing Next.js web application separate; do not implement the native client as a WebView or PWA.
- Adopt stable Expo SDK 58 as the initial React Native toolchain baseline, using an Android-only Expo configuration and Development Build. SDK 58 targets React Native 0.88 and React 19.3 and requires Node.js 22.13 or newer; the repository requires Node.js 22.18 or newer. Dependency lockfile generation and a real Android build remain mandatory validation gates before the toolchain is considered implementation-ready.
- Generate and build only the Android native project. Do not create or maintain an iOS project, Xcode/CocoaPods configuration, iOS simulator tests, TestFlight workflow, Apple signing assets, or iOS CI jobs.
- The Android client uses the existing NestJS API and server-side authorization. It must not connect directly to PostgreSQL, Redis, queues, or private object storage. Authentication must use the shared identity service and Android secure session storage.
- Backend contracts remain authoritative for product, order, fulfillment, delivery, finance, and authorization state. The mobile client must not infer or independently calculate authoritative outcomes.
- Preserve Negarin's Artist rules: the Artist controls product price; Artist sales have no commission; payment must not be presented as real while real payment is not implemented; preparation, shipping, receipt, issues, refund, and settlement remain independent states.
- Do not invent the final Android application ID, signing key, store listing, provider credentials, or production configuration. These require verified ownership and explicit operational setup.
- No store publication or production release is authorized by this ADR. Android build, device QA, release approval, and deployment remain separate gates.

## Consequences

- Android emulator/device build and test coverage are required; iOS validation is not a release gate.
- The first native app scope is the Artist journey. Existing Customer mobile web work remains separate and does not silently expand this native app scope.
- Android distribution channel, supported device range, offline behavior, deep links, notification provider, camera/media permissions, and final visual acceptance remain to be decided where they affect implementation.
- This ADR records the platform and toolchain direction; it does not claim that an Android package or release build already exists.

## Toolchain reference

- Expo SDK reference and compatibility table: https://docs.expo.dev/versions/latest/
- Android development build: https://docs.expo.dev/tutorial/eas/android-development-build/
- Android build configuration: https://docs.expo.dev/build-reference/android-builds/
