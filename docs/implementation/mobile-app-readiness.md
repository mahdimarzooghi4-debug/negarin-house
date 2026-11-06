# Mobile application readiness

The existing artist/customer mobile screen sets are web previews, not Android packages. No APK/AAB, native Android project, mobile packaging toolchain or production mobile release is provided by this change.

The first live customer-mobile route is `/customer-mobile/saved` (source frame 613:5). It uses the existing authenticated customer favorites BFF/API and exact server revisions for deletion. Unavailable products remain removable; empty lists are server-derived. Failed writes clear actionable stale data and require a fresh read. Product images use real catalog media; no sample artist names/images or unsupported personalization claims are rendered. Story bookmarking is not implemented. Navigation and product links currently lead to the existing live web routes while those mobile flows await connection.

The page uses Figma typography, colors and card proportions with an adaptive 320–390px layout, bounded images and a bottom navigation. Browser tests cover real request shapes/revisions, conflicts/reconciliation, authentication and viewport overflow. Full screenshot parity and native Android runtime behavior are not verified.

Remaining release work includes the other customer and artist mobile API flows, mobile authentication, mobile navigation across those flows, an Android packaging/build pipeline, a reachable backend deployment and device testing. Payment gateway remains deferred.

## Customer account slice

`/customer-mobile/account` reads the real customer profile and links to mobile saved products. `/customer-mobile/account-info` edits the display name using the existing revision-checked profile API; phone remains read-only. Failed writes require reloading before another edit. Logout calls the existing session-revocation BFF and redirects to public catalog only on success; failures keep the current page. Shared mobile navigation now links to the mobile account, while orders, addresses, cart and discovery still use their existing live web routes. Browser coverage includes profile saving, conflict recovery, real logout request/error handling, missing sessions and mobile width. Mobile login and APK packaging remain pending.

The artist editor also uses the existing versioned product-image upload contract (`base64`, JPEG/PNG/WebP, 5 MiB) and fetches owned-media signed read links. Uploads and stock updates are checked by a fresh backend read after the response; if that verification fails the screen refuses to claim success. Actual production mobile packaging remains a separate release gate.
