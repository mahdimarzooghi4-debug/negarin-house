# E5 — Canonical Growth level registry

Source: Phase 1 Product/UX handoff and traceability.

## Locked contract

Growth levels are exactly, in this order:

1. جوانه
2. شکوفه
3. سرو زرین
4. سفیر جهانی

Growth cannot be purchased.

## Acceptance

1. The four labels and their order are defined once in the shared API contract package.
2. The shared schema rejects:
   - unknown level names;
   - reordered levels;
   - renamed levels;
   - any registry marked purchasable.
3. Artist can read the canonical registry.
4. Negarin Staff can read it only with the existing `growth` permission domain.
5. Customer and unrelated Staff domains are denied.
6. There is no API command for:
   - buying a Growth level;
   - directly promoting/demoting an Artist;
   - editing the level taxonomy.
7. This slice defines no score, threshold, sales count, sales amount, service criterion, training criterion, recommendation formula, or automatic promotion rule.
8. Existing service/training/payment flows are not coupled to Growth.

## APIs

- `GET /api/v1/artist/growth/levels`
- `GET /api/v1/admin/growth/levels`

Response is read-only and contains the exact ordered registry plus `purchasable: false`.

## Out of scope

- GrowthRecord persistence;
- current Artist level;
- Growth history;
- Growth recommendations;
- promotion/demotion commands;
- threshold/criteria definitions;
- settlement rules;
- UI binding;
- merge, Stage deployment, QA approval, Production release.
