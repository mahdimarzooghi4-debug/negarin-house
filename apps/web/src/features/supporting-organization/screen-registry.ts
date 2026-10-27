export const supportingOrganizationScreens = [
  {
    "id": "954:250",
    "name": "Supporting Organization / Dashboard — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "01 — Foundation & Dashboard",
    "slug": "dashboard",
    "implemented": true
  },
  {
    "id": "954:409",
    "name": "Supporting Organization / Support Programs — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "02 — Support Programs",
    "slug": "support-programs",
    "implemented": true
  },
  {
    "id": "954:548",
    "name": "Supporting Organization / Support Program Detail — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "02 — Support Programs",
    "slug": "support-program-detail",
    "implemented": true
  },
  {
    "id": "954:713",
    "name": "Supporting Organization / Artist Referrals — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "03 — Artist Referrals",
    "slug": "artist-referrals",
    "implemented": true
  },
  {
    "id": "954:853",
    "name": "Supporting Organization / New Artist Referral — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "03 — Artist Referrals",
    "slug": "new-artist-referral",
    "implemented": true
  },
  {
    "id": "954:941",
    "name": "Supporting Organization / Referral Submitted — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "03 — Artist Referrals",
    "slug": "referral-submitted",
    "implemented": true
  },
  {
    "id": "954:1016",
    "name": "Supporting Organization / Referral Detail — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "03 — Artist Referrals",
    "slug": "referral-detail",
    "implemented": true
  },
  {
    "id": "954:1243",
    "name": "Supporting Organization / My Supports — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "04 — Support Commitments & Usage",
    "slug": "my-supports",
    "implemented": true
  },
  {
    "id": "954:1407",
    "name": "Supporting Organization / Support Detail — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "04 — Support Commitments & Usage",
    "slug": "support-detail",
    "implemented": true
  },
  {
    "id": "954:1533",
    "name": "Supporting Organization / Supported Artist — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "04 — Support Commitments & Usage",
    "slug": "supported-artist",
    "implemented": true
  },
  {
    "id": "955:242",
    "name": "Supporting Organization / Activity Report — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "05 — Activity & Reports",
    "slug": "activity-report",
    "implemented": true
  },
  {
    "id": "955:417",
    "name": "Supporting Organization / Activity Detail Report — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "05 — Activity & Reports",
    "slug": "activity-detail-report",
    "implemented": true
  },
  {
    "id": "955:567",
    "name": "Supporting Organization / Notifications — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "06 — Notifications",
    "slug": "notifications",
    "implemented": true
  },
  {
    "id": "955:729",
    "name": "Supporting Organization / Account - Desktop",
    "w": 1440,
    "h": 1544,
    "section": "07 - Organization Account & Access",
    "slug": "account",
    "implemented": true
  },
  {
    "id": "955:860",
    "name": "Supporting Organization / Users & Access — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "07 - Organization Account & Access",
    "slug": "users-and-access",
    "implemented": true
  },
  {
    "id": "955:982",
    "name": "Supporting Organization / Invite User — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "07 - Organization Account & Access",
    "slug": "invite-user",
    "implemented": true
  },
  {
    "id": "955:1091",
    "name": "Supporting Organization / Empty States - Desktop",
    "w": 1440,
    "h": 1024,
    "section": "08 - States & QA",
    "slug": "empty-states",
    "implemented": true
  },
  {
    "id": "955:1163",
    "name": "Supporting Organization / Loading State — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "08 - States & QA",
    "slug": "loading-state",
    "implemented": true
  },
  {
    "id": "955:1265",
    "name": "Supporting Organization / Error State — Desktop",
    "w": 1440,
    "h": 1024,
    "section": "08 - States & QA",
    "slug": "error-state",
    "implemented": true
  }
] as const;
export const supportingOrganizationLoaders = {
 "dashboard": () => import("./screens/dashboard"),
 "support-programs": () => import("./screens/support-programs"),
 "support-program-detail": () => import("./screens/support-program-detail"),
 "artist-referrals": () => import("./screens/artist-referrals"),
 "new-artist-referral": () => import("./screens/new-artist-referral"),
 "referral-submitted": () => import("./screens/referral-submitted"),
 "referral-detail": () => import("./screens/referral-detail"),
 "my-supports": () => import("./screens/my-supports"),
 "support-detail": () => import("./screens/support-detail"),
 "supported-artist": () => import("./screens/supported-artist"),
 "activity-report": () => import("./screens/activity-report"),
 "activity-detail-report": () => import("./screens/activity-detail-report"),
 "notifications": () => import("./screens/notifications"),
 "account": () => import("./screens/account"),
 "users-and-access": () => import("./screens/users-and-access"),
 "invite-user": () => import("./screens/invite-user"),
 "empty-states": () => import("./screens/empty-states"),
 "loading-state": () => import("./screens/loading-state"),
 "error-state": () => import("./screens/error-state")
};
export type SupportingOrganizationScreenSlug = keyof typeof supportingOrganizationLoaders;
