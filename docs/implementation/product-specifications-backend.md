# Product specifications backend

Artist product POST/GET/list/PATCH now carry nullable text fields matching the product editor:

| Field | Maximum characters | Meaning |
| --- | ---: | --- |
| category | 200 | Display category; no taxonomy ID |
| dimensions | 500 | Human-readable dimensions |
| materials | 500 | Materials |
| weight | 200 | Human-readable weight |
| color | 200 | Color text |
| technique | 500 | Making technique |
| careInstructions | 2000 | Care instructions |

Omitted create fields and existing records default to null. Omitted PATCH fields preserve existing values; null explicitly clears. Text is trimmed; blank, nontext, oversized and unknown fields reject with 400. Weight/dimensions must not be used as numeric shipping inputs.

```json
{"materials":"مس","dimensions":"۲۵ سانتی‌متر","version":0}
```

Send this to PATCH `/api/v1/artist/products/:id`. Specification edits require the content `version` obtained from a read; stale versions return 409. Revision-only patches reject. Existing title/description/price patches remain compatible; these callers can also supply version. POST cannot set version/ownership/status.

Specifications are reviewed content, not inventory or price. Edits are restricted to owned, unarchived draft/changes_requested/approved products. Under review or published content is locked. An approved edit becomes draft. Content revision increments and a full content snapshot is inserted atomically; history failures roll back the edit. Staff review/queue and all new publication history snapshots include specifications, exclude price and inventory. Historical events from before this migration retain their original shape.

Integration checks cover create/read/defaults, null clearing, review snapshots, stale/concurrent writes, approval invalidation, role/ownership boundaries, published/archive locks and rollback when the database rejects a history insert.

Remaining: product image upload/storage verification and review snapshots; live frontend binding; public catalog, pagination/taxonomy and numeric logistics measurements. This slice does not change the demo deployment.
