# ADR-0005 — Web-First Responsive Application

- Status: Superseded by ADR-0007 for mobile application scope
- Date: 2026-09-27

## Context

Current Product/UX surfaces include desktop portals and mobile layouts, but the approved Phase 1 scope does not require native iOS or Android applications.

Duplicating frontend stacks would slow implementation and increase cross-role inconsistency.

## Decision

Implement the Phase 1 user interfaces in one Next.js + React TypeScript application.

The application supports:

- responsive Customer experience
- Artist desktop/mobile parity
- Admin desktop
- Service Partner desktop
- Supporting Organization desktop
- Corporate Buyer desktop
- Export Partner localized desktop

Route groups and role-specific shells organize the interfaces.

The application may be PWA-capable, but offline-first behavior is not a Phase 1 requirement.

## Consequences

- shared UI/design-system implementation
- shared localization and bidi handling
- faster cross-portal consistency fixes
- one deployment surface for frontend

## Non-goal

This ADR does not prevent later native apps. Native clients may reuse the same API/contracts if product need is established.
