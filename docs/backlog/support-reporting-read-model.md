# E7 — Support reporting and activity read models

Source: Phase 1 E7 organization-scoped reporting, existing support-credit lifecycle, and locked rule that Artist and Supporting Organization can see all support information inside their authorized scope.

Acceptance:
1. Support reporting is derived from authoritative SupportProgram, SupportRelationship, SupportAllocation and SupportCreditEvent records. No duplicate balance table/source of truth is introduced.
2. Supporting Organization reporting is restricted to its own organization programs and their linked Artists/usage.
3. Artist reporting is restricted to the Artist's own support relationships, allocations and usage, including both organization programs and Negarin CSR programs.
4. Negarin internal reporting is permission-scoped to staff with the reports domain.
5. Report distinguishes:
   - cumulative allocated amount;
   - current available amount;
   - current reserved amount;
   - current consumed amount;
   - historical lifecycle event counts/amounts for allocated/reserved/released/consumed/reversed.
6. Monetary aggregation uses BigInt and returns decimal Toman strings; no JavaScript Number arithmetic is used for money.
7. Program-level reporting preserves program source, organization scope, title, description and rules.
8. Relationship reporting distinguishes eligible vs pending Negarin approval.
9. Support activity is pageable and includes support event identity, action, full allocation amount, actor, normalized reason, program, relationship, and linked service request when present.
10. Raw command JSON and idempotency keys are not exposed by reporting APIs.
11. Service Partner has no reporting endpoint and no support-credit visibility.
12. Reporting exposes no Artist bank data, unrelated finance, Growth internals, private Admin notes, payment or settlement internals.
13. Empty authorized scopes return zero totals / empty activity rather than leaking whether another tenant has data.
14. ArtistReferral is not implemented or inferred by these read models.

Out of scope:
- ArtistReferral state machine;
- stored/materialized balance cache;
- CSV export;
- notification delivery;
- UI binding;
- banking, payment or settlement;
- merge, Stage deployment, QA approval or Production release.
