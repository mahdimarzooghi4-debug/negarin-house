# Phase 1 Product → Engineering Traceability

This file maps locked Product/UX rules to engineering work so they cannot disappear between design and implementation.

| Product rule | Engineering owner | Verification |
|---|---|---|
| Artist owns product price | E3 Artist/Product | API contract test: no Admin price mutation endpoint; authorization tests |
| Negarin reviews publication quality, not price | E3 + E10 | publication-review tests; DTO review |
| Artist can recover a pending media upload after its signed URL expires | E3 Artist/Product | media service and authenticated HTTP contract tests |
| Domestic Artist money uses Toman | E2 + E5 | UI formatter tests; E2E Artist finance |
| Growth levels exactly جوانه / شکوفه / سرو زرین / سفیر جهانی | E5 | enum/value test + UI test |
| Growth cannot be purchased | E5 | domain transition tests |
| Service Partner is assignment-scoped | E1 + E6 | unassigned deep-link denied |
| Supporting Organization cannot administer Artist | E1 + E7 | negative authorization tests |
| Referral ≠ Artist approval | E7 | state-transition tests |
| Support balances are shared underlying relationship | E7 | integration test on SupportRelationship/Usage |
| Corporate Buyer cannot bypass Negarin | E1 + E8 | no direct-payment/contact command; API surface review |
| Corporate Orders can be multi-Artist | E8 | multi-allocation integration test |
| Export Partner cannot bypass Negarin | E1 + E9 | no direct Artist payment endpoint |
| Partner payment goes to Negarin | E9 | payment domain integration test |
| Protected funds remain controlled until required delivery/quality state | E9 | state-machine test |
| Delivered ≠ Settled | E5 + E9 | transition guard integration test |
| Issue may block settlement eligibility | E9 | issue/settlement integration test |
| Artist cannot see Partner fee/FX internals | E1 + E9 | role-specific DTO test |
| Partner cannot see Artist settlement/bank/private finance | E1 + E9 | negative authorization/projection tests |
| XORD stays same across Partner/Admin/Artist/Finance | E9 + E10 | E2E trace assertion |
| Export locales exactly tr-TR/ar/ru/en/zh-CN/fr/es | E2 + E9 | locale registry test |
| Arabic Partner RTL; other six LTR | E2 | layout-direction tests |
| Currency is context-aware, not language-derived | E2 + E9 | formatter/API tests |
| Portuguese absent | E2 | locale registry test |
| Do not claim legal Escrow | E9 | code/content search gate |
| No invented FX formula | E9 | architecture/API review + no configured implementation until accepted |
| Organization isolation | E1 + E6/E7/E8/E9 | cross-tenant negative tests |
| Admin is permission-scoped | E1 + E10 | staff-domain authorization tests |
| Customer/Artist/Service/Support/Corporate/Partner data boundaries | E1 | projection tests + E2E unauthorized paths |

## Release trace

Every row above must have at least one automated or Stage QA verification before Phase 1 Release Approval.
