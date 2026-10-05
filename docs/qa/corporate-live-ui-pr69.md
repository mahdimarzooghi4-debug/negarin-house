# Corporate Live UI QA Readiness — PR #69

Status: **QA readiness package only — not QA Approved, not Release Approved**

Scope: Corporate Buyer live runtime introduced by PR #69, stacked on draft PR #68.

Runtime evidence baseline before this documentation-only package:
- runtime candidate SHA: `65d1e71bc8afc5d3dc3a8302ed3508a3a23b6602`
- CI run: `37315433132`
- lint: passed
- typecheck: passed
- build: passed
- unit/integration: 46 files / 464 tests passed
- Playwright: 47 / 47 passed
- PR #69: Draft, mergeable, not merged
- PR #68 dependency: Draft, mergeable, not merged

## Release evidence matrix

| Required evidence | Status | Evidence / boundary |
| --- | --- | --- |
| Happy path | Automated PASS | `tests/e2e/corporate-buyer-live.spec.ts` exercises multi-role session → explicit Corporate context selection → catalog/search → product detail/image metadata → Draft PurchaseRequest → detail/history → optimistic submit → Submitted detail/list. |
| Revision / issue path | Not applicable to PR #69 | Current Corporate PurchaseRequest contract has only Draft and Submitted states. No revision/issue workflow may be inferred or invented in this PR. |
| Unauthorized access | Automated PASS | Operational route does not fall back to preview/sample data without session; Corporate BFF reads reject requests without the HttpOnly session cookie. |
| Empty state | Pending Stage QA | Live Product and PurchaseRequest screens implement empty-state UI, but Stage evidence must verify it against a production-like empty organization/catalog. |
| Error recovery | Pending Stage QA | Live screens expose explicit retry/error paths; Stage QA must verify recoverability against controlled API failure and restoration. |
| Cross-role handoff | Automated PASS | Golden Path starts with Artist active plus organization-scoped Corporate Buyer grant and requires explicit Corporate context selection. |
| Localization | Pending Stage QA | Operational Corporate UI is Persian/RTL; Stage QA must verify copy, layout direction and date/number rendering in the production-like browser environment. |
| Accessibility | Pending Stage QA | Automated browser coverage uses semantic roles/labels, but release evidence still requires keyboard/focus/readability review on Stage. |
| Data privacy | Automated PASS | Golden Path verifies bearer token is absent from URL, localStorage and sessionStorage. Client parsers also fail closed on privileged/internal fields. |
| Finance / status separation | Automated PASS | PurchaseRequest read model and UI do not invent price, payment, settlement, negotiated pricing, Proposal or CorporateOrder state; status remains Draft/Submitted only. |

## Stage QA checklist

These checks are intentionally **not** marked complete because no Stage deployment or QA approval has been authorized:

- [ ] Deploy one immutable candidate SHA for web/API/worker to Stage.
- [ ] Verify HTTPS, API health/readiness, PostgreSQL, Redis and private S3 dependencies.
- [ ] Run authenticated Corporate Golden Path against Stage.
- [ ] Verify empty catalog and empty PurchaseRequest list states.
- [ ] Induce a controlled recoverable API failure and verify retry behavior.
- [ ] Verify Artist-active → Corporate-grant explicit context switch.
- [ ] Verify unauthorized/no-grant/no-session behavior.
- [ ] Verify Persian RTL layout, dates and number formatting.
- [ ] Perform keyboard/focus/readability accessibility pass.
- [ ] Confirm bearer/session secrets are absent from URL and browser storage.
- [ ] Confirm PurchaseRequest screens do not expose commercial price/payment/settlement fields.
- [ ] Record screenshots/log references for failed and passed checks.
- [ ] Obtain explicit QA approval.
- [ ] Obtain explicit Release Approval before Production.

## Release blockers

PR #69 must not be promoted while any of the following remains true:
- PR #68 dependency has not completed its approved merge/release path.
- Stage deployment has not been explicitly authorized and executed.
- Stage QA evidence above is incomplete.
- QA Approval has not been explicitly granted.
- Release Approval has not been explicitly granted.

This package is evidence preparation only. It does not authorize merge, Stage deployment, Production deployment or any business behavior outside the existing Corporate PurchaseRequest contract.
