# Artist Android preview APK

The owner requested an installable Android build. The preview pipeline builds the existing React Native app in apps/mobile, not a WebView replacement. It uses an isolated technical test ID (`ir.negarin.artist.preview`), a disposable debug signing certificate, and embeds the JavaScript bundle in a release-variant APK so Metro is not required on the phone. This is an internal preview, not a signed production/store release. The final production application ID and release signing identity remain unset.

The `Artist Android preview APK` workflow runs on pull requests affecting the mobile app and can be dispatched with an optional HTTPS API origin. It installs the locked dependencies, runs native TypeScript/unit checks, generates Android only, builds arm64-v8a/x86_64, verifies the APK signature and uploads `negarin-artist-android-preview.apk` plus SHA256SUMS as the `negarin-artist-android-preview` artifact. No iOS project is generated. Preview signing modifications apply only to the disposable generated Gradle project and require the preview environment guard.

Without an API origin the app deliberately displays its unconfigured state. Even with an origin, end-user sign-in is still blocked until the backend OTP request/verify API is implemented. This build does not bypass authentication, create sample orders or activate payment/SMS providers. A successful compile is not proof of device/Figma fidelity or end-to-end readiness. Device testing and the remaining native flows are still required.

Production builds do not inherit the preview application ID; the existing package-setting requirement remains. The preview workflow does not create a production keystore or publish to a store.
