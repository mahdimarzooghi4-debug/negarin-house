# E7 — Support program, relationship and monetary credit lifecycle

Source: Phase 1 E7 Supporting Organization backlog plus product-owner decisions confirmed on 2026-10-05.

## Locked product rules

1. Support credit is monetary and denominated in Toman.
2. Support credit is not cash, not a wallet, not withdrawable, and never convertible to cash for the Artist.
3. Support credit is non-transferable between Artists or programs.
4. Support may originate from a Supporting Organization program or a Negarin CSR program.
5. Any Artist may become supported when explicitly connected to a SupportProgram.
6. External-program eligibility requires sponsor approval and explicit Negarin approval.
7. A Negarin CSR program uses the same explicit relationship + Negarin-approval flow; program source is server-derived, not client-selected.
8. Every SupportProgram has its own rules. An allocation snapshots the program rules at allocation time.
9. Credits may be applied to any ServiceRequest belonging to the supported Artist. No service category restriction is hardcoded.
10. Reservation is mandatory before consumption.
11. Each allocation is used as a whole. Reserve/consume/release/reverse commands never accept an amount.
12. Multiple independent allocations/sources may be attached to one ServiceRequest.
13. Credits do not expire; there is no expiry field.
14. Lifecycle is append-only: allocated → reserved → consumed; a reserved credit may be released; a consumed credit may be reversed.
15. Release and reversal return the allocation to available state while preserving immutable ledger history.
16. Reversal is Negarin-only. This slice requires finance-domain Staff for reversal.
17. Operational reserve/consume/release is Negarin-only. This slice requires services-domain Staff.
18. Service Partner has no support-credit read or mutation surface.
19. Artist can read all support-program/rules/allocation/usage information belonging to self.
20. Supporting Organization can read all support information belonging to its own programs, including linked ServiceRequest operational details.
21. Support data does not expose Artist bank data, unrelated private finance, Growth internals or Admin notes.
22. Support ledger is separate from payment, refund, settlement and the existing FinancialEvent ledger.

## Relationship model

A relationship begins with sponsor approval:
- external program: Supporting Organization creates the relationship for an active Artist;
- Negarin CSR: Negarin staff creates the relationship as the program sponsor.

The relationship is not eligible until Negarin explicitly approves it. Allocation before Negarin approval is rejected.

This slice does not implement ArtistReferral. Referral remains a separate E7 object and must not automatically create a SupportRelationship.

## Monetary allocation model

A SupportAllocation contains:
- program and relationship identity;
- immutable amountToman;
- immutable rules snapshot;
- lifecycle status/version;
- optional current ServiceRequest while reserved/consumed;
- append-only SupportCreditEvent history.

No program budget, payout mechanism, settlement formula or banking mechanism is invented in this slice.

## Lifecycle

available
→ reserved
→ consumed

reserved
→ released
→ available

consumed
→ reversed (Negarin finance only)
→ available

Every event stores the full allocation amount. There is no partial use.

## Release boundary

Out of scope:
- ArtistReferral workflow;
- automated machine evaluation of free-form program rules;
- program-level budget/funding bank account;
- service pricing or payment settlement;
- cash withdrawal;
- transfer between Artists/programs;
- expiration;
- Partner access;
- UI binding;
- merge, Stage deployment, QA approval or Production release.
