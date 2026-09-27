# Shared UI Preview Strategy

Status: **Accepted for Sprint 0**

The shared `@negarin/ui` package is the canonical implementation home for design-system primitives.

During Sprint 0:
- components are tested as package-level React primitives
- visual examples remain anchored to the canonical Figma Design System page
- production application screens consume `@negarin/ui` rather than duplicating primitives

During Epic E2:
- add an isolated component preview surface (Storybook or equivalent)
- cover RTL/LTR, state, accessibility and text expansion
- keep preview tooling out of the production runtime bundle

This defers preview tooling choice without deferring the shared component contract itself.
