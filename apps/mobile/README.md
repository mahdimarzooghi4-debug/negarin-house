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
`expo-secure-store`. It does not issue tokens or implement login. The public OTP
delivery path and a user-facing session lifecycle must be available before the
adapter is connected to an authentication flow.
The Android config plugin also excludes SecureStore preferences from Android
backup and device transfer.

The logout boundary is available for a future authenticated flow. It posts the
stored bearer token to `/api/v1/identity/logout`, then clears secure storage on
success or when the API reports that the session is already invalid. Network
and server failures preserve the token so revocation can be retried. The helper
is not connected to a login screen or a user-facing mobile journey yet.
