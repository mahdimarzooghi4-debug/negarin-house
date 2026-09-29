# Negarin Android app

This package is the Android-only React Native foundation for Negarin House. It
contains a branded RTL bootstrap screen and Android bundle checks; role-specific
journeys remain out of scope until Product/UX planning approves them.

## Local development

From the repository root:

```sh
pnpm --filter @negarin/mobile start
pnpm --filter @negarin/mobile android
```

The Android command requires Android Studio or an Android SDK/emulator. It
creates local native Android files that are ignored by Git.

## Validation

```sh
pnpm --filter @negarin/mobile test
pnpm --filter @negarin/mobile lint
pnpm --filter @negarin/mobile typecheck
pnpm --filter @negarin/mobile build
```

The build command exports the JavaScript bundle for Android. It does not produce
an installable APK/AAB or replace device QA. Login and account flows remain
disabled until the authentication provider and mobile journeys are approved.
The stable Android application ID, signing, and distribution channel must be
decided during release planning before creating a distributable build.

## Session storage boundary

The app has a small adapter for storing an opaque session token with
`expo-secure-store`. It does not issue tokens, implement login/logout, or call
an authentication endpoint. The public OTP delivery path and session lifecycle
must be available before the adapter is connected to an authentication flow.
The Android config plugin also excludes SecureStore preferences from Android
backup and device transfer.
