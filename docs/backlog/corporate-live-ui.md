# Corporate Buyer live UI binding

Source: E8 PurchaseRequest backend (#60/#61), secure browser session BFF (#68), and existing Figma-derived Corporate Buyer screens.

## Acceptance

1. `/corporate-buyer` is an operational route, not a sample-data preview. It routes to the live Corporate product workspace.
2. Figma preview remains separately available under `/preview/corporate-buyer/*` and continues to be explicitly labeled sample data.
3. Live Corporate screens require a valid HttpOnly-backed browser session and an active `corporate-buyer` context before operational data is rendered.
4. When a valid session has an organization-scoped Corporate Buyer grant but the active context is missing or belongs to another role, the user must explicitly choose the Corporate organization context. The UI never silently replaces the active grant.
5. Live catalog reads only the authenticated Corporate BFF:
   - product list;
   - product detail;
   - signed product image metadata.
6. Product UI renders only public Corporate fields. Known privileged fields such as Artist user IDs, publication internals and inventory versions are rejected by the client contract parser.
7. Current Artist price is presented as read-only. UI text must not represent it as a negotiated or Corporate Proposal price.
8. Buyer can select up to 100 published products and provide a positive integer quantity per line.
9. New PurchaseRequest UI sends only:
   - server-generated browser UUID idempotency key;
   - product ID;
   - quantity.
10. Budget, city, occasion, customization, discount, fee and negotiated price fields from the Figma preview are not shown in the operational request form because the backend contract does not persist them.
11. Buyer can:
   - save Draft;
   - explicitly submit Draft for Negarin review;
   - list organization-scoped requests;
   - view request items and append-only history;
   - submit an existing Draft.
12. Submit uses the current optimistic version from the real API.
13. The UI never claims inventory reservation, Corporate Proposal, CorporateOrder, payment or settlement effects.
14. 401/404/409 states are surfaced without falling back to sample operational data.
15. Product selection state may exist in route/query UI state, but bearer credentials never enter URL, localStorage or sessionStorage.
16. Client read models fail closed on malformed identifiers, non-canonical timestamps, inconsistent PurchaseRequest state/history, invalid selection/query boundaries, duplicate entities, and pagination envelopes that do not match the requested page.
17. Browser coverage exercises an authenticated multi-role session through explicit Corporate context selection, live catalog search/detail/image metadata, Draft creation, Draft detail/history, optimistic submit, Submitted detail/list, and verifies the bearer token is absent from URL and browser storage.

## Out of scope

- production OTP transport/login;
- CorporateProposal fields/pricing/revision;
- CorporateOrder / ArtistAllocation;
- delivery/address fields;
- organization-user management;
- merge, Stage deployment, QA approval or Production release.
