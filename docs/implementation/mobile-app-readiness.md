# Mobile application readiness

The existing artist/customer mobile screen sets are web previews, not Android packages. No APK/AAB, native Android project, mobile packaging toolchain or production mobile release is provided by this change.

The first live customer-mobile route is `/customer-mobile/saved` (source frame 613:5). It uses the existing authenticated customer favorites BFF/API and exact server revisions for deletion. Unavailable products remain removable; empty lists are server-derived. Failed writes clear actionable stale data and require a fresh read. Product images use real catalog media; no sample artist names/images or unsupported personalization claims are rendered. Story bookmarking is not implemented. Navigation and product links currently lead to the existing live web routes while those mobile flows await connection.

The page uses Figma typography, colors and card proportions with an adaptive 320–390px layout, bounded images and a bottom navigation. Browser tests cover real request shapes/revisions, conflicts/reconciliation, authentication and viewport overflow. Full screenshot parity and native Android runtime behavior are not verified.

Remaining release work includes the other customer and artist mobile API flows, mobile authentication, mobile navigation across those flows, an Android packaging/build pipeline, a reachable backend deployment and device testing. Payment gateway remains deferred.
