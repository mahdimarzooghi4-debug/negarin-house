# Artist growth and support view

The artist workspace now exposes a live read-only overview at `/artist/growth`. The same-origin routes proxy the authenticated artist endpoints for support summary, paginated support activity, paginated credit allocations, and the configured growth-level registry.

The view shows reported programs and eligibility/credit totals exactly as returned by the API. It distinguishes the configured level names from an artist's individual current level; the current API does not provide per-artist growth progress. All money is formatted from integer Toman strings, and activity pagination is bounded to the API's page limits.
