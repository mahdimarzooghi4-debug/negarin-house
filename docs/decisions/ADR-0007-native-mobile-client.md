# ADR-0007 — Negarin Mobile Application

- Status: Accepted for architecture; Android is in scope, iOS is out of scope
- Date: 2026-09-27
- Supersedes: ADR-0005 only where it excludes a native mobile application

## Context

The product owner confirmed that Negarin includes an independent mobile application. The previous web-first decision treated responsive mobile web as the only approved mobile surface. The existing API, identity, domain rules, and data store must remain authoritative for both clients.

## Decision

- Keep Next.js for the website and browser-based portals.
- Add a separate `apps/mobile` React Native + TypeScript client in the existing pnpm/Turborepo repository. Expo Development Build is the proposed initial toolchain, subject to a dependency/build check when implementation starts.
- Mobile calls the same NestJS API as web; it does not connect directly to PostgreSQL, Redis, queues, or private object storage.
- Share safe API contracts, domain value types, and localization resources where compatible. Platform UI components and navigation are implemented for mobile rather than imported from the web DOM package.
- Authenticate through the shared identity service with mobile-specific secure session storage. Every command and read remains authorized on the API by role, relationship, and resource ownership.
- Keep payment, order, growth, organization, and export rules in the backend; mobile must not calculate authoritative outcomes independently.

## Scope to resolve in Product/UX and Sprint planning

- Which roles and workflows appear in the first mobile release, including the Customer and Artist journeys.
- Android release distribution, supported devices, and notification providers.
- Offline behavior, deep links, camera/media permissions, app update policy, and exact mobile design acceptance criteria.

Android is the mobile platform in scope. No iOS application or iOS release is planned. Android workflows, distribution, supported devices, and notifications still require Product/UX and Sprint planning. These choices must not be inferred from responsive Figma frames alone. The mobile app is a product requirement, but this ADR does not claim that a mobile build exists or that every web portal needs a mobile counterpart.

## Consequences

- One backend and one source of truth serve web and mobile.
- Mobile has its own build, release, accessibility, RTL/LTR, and device test gates.
- Sprint 0 remains the completed web/API/worker foundation; mobile implementation is planned in subsequent backlog work.
