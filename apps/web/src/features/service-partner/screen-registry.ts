export const servicePartnerScreens = [
  {
    "id": "1001:10",
    "slug": "dashboard",
    "name": "Service Partner / Dashboard — Desktop",
    "w": 1440,
    "h": 1024,
    "implemented": true
  },
  {
    "id": "1001:85",
    "slug": "assigned-requests",
    "name": "Service Partner / Assigned Requests — Desktop",
    "w": 1440,
    "h": 1024,
    "implemented": true
  },
  {
    "id": "1001:157",
    "slug": "request-detail",
    "name": "Service Partner / Request Detail — Desktop",
    "w": 1440,
    "h": 1024,
    "implemented": true
  },
  {
    "id": "1001:206",
    "slug": "schedule-and-execution",
    "name": "Service Partner / Schedule & Execution — Desktop",
    "w": 1440,
    "h": 1024,
    "implemented": true
  },
  {
    "id": "1001:258",
    "slug": "submit-deliverable",
    "name": "Service Partner / Submit Deliverable — Desktop",
    "w": 1440,
    "h": 1024,
    "implemented": true
  },
  {
    "id": "1001:300",
    "slug": "history",
    "name": "Service Partner / History — Desktop",
    "w": 1440,
    "h": 1024,
    "implemented": true
  },
  {
    "id": "1001:358",
    "slug": "account",
    "name": "Service Partner / Account — Desktop",
    "w": 1440,
    "h": 1024,
    "implemented": true
  },
  {
    "id": "1001:406",
    "slug": "states-and-qa",
    "name": "Service Partner / States & QA — Desktop",
    "w": 1440,
    "h": 1024,
    "implemented": true
  }
] as const;
export const servicePartnerLoaders = {
 "dashboard": () => import("./screens/dashboard"),
 "assigned-requests": () => import("./screens/assigned-requests"),
 "request-detail": () => import("./screens/request-detail"),
 "schedule-and-execution": () => import("./screens/schedule-and-execution"),
 "submit-deliverable": () => import("./screens/submit-deliverable"),
 "history": () => import("./screens/history"),
 "account": () => import("./screens/account"),
 "states-and-qa": () => import("./screens/states-and-qa")
};
export type ServicePartnerScreenSlug = keyof typeof servicePartnerLoaders;
