# Supporting organization program view

The supporting organization portal now has a live read-only `/supporting-organization/support-programs` page. Same-origin authenticated routes proxy the organization's program list, support report, and credit activity. The API applies the active organization's scope before returning data.

Program list and activity use independent pagination. Per-program relationship and allocation totals are joined by program ID from the reporting response. The view does not create programs or relationships; the current UI has no artist directory/search workflow for safely selecting an artist.
