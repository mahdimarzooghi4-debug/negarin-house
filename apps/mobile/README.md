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
