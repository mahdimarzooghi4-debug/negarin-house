# Growth level registry backend

This slice closes the exact-taxonomy part of E5 without inventing any Growth decision rule.

## Shared source of truth

`@negarin/contracts` exports:

- `growthLevels`;
- `GrowthLevel`;
- `growthLevelSchema`;
- `growthRegistrySchema`.

The schema fixes both the Persian labels and their ordinal positions. A consumer cannot validate a reordered or renamed registry as canonical.

## API projection

Artist:

`GET /api/v1/artist/growth/levels`

Requires active Artist context.

Negarin Staff:

`GET /api/v1/admin/growth/levels`

Requires the existing `growth` permission domain.

Both return:

```json
{
  "purchasable": false,
  "levels": [
    { "order": 1, "name": "جوانه" },
    { "order": 2, "name": "شکوفه" },
    { "order": 3, "name": "سرو زرین" },
    { "order": 4, "name": "سفیر جهانی" }
  ]
}
```

## Safety boundary

There is deliberately no Growth mutation service or route in this slice.

No threshold, score, purchase mechanism, sales amount, service/training side effect, or automatic transition is encoded. The accepted rule that real sales are a primary Growth criterion is preserved as Product policy, but engineering does not guess a formula from it.

A later GrowthRecord/history slice must wait for explicit accepted promotion/demotion criteria and transition ownership.

## Release boundary

No database migration is introduced. This remains a Draft implementation and does not merge or deploy.
