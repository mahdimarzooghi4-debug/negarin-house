# Admin desktop Figma preview

Source: [Negarin Admin Backoffice](https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=863-319). All 105 source frames are enabled at `/preview/admin`; the retry completed 23 missing contexts and the three Story Review asset checkpoints. Pending notices and checkpoint sources have been removed. These are fixed 1440px reference previews; production access requires `NEGARIN_UI_PREVIEW=1`, and `?canvas=1` hides review controls. No tablet layout or production Admin integration is added.

## Coverage and native assets

Coverage includes dashboard/states; artists/credentials/review dialogs; products/moderation; orders/issues/shipping; growth/services; opportunities/corporate/organizations; finance/settlement/transactions/membership; stories/review/content operations; export partners/markets/catalog/terms/orders/needs-action; reports/detail; settings/notifications; staff/access; roles/detail/editor; and operational audit.

All 508 local originals are complete in 2,033 rendering callsites. Native box retrieval now covers 3,352 containers, including every newly enabled frame; full native-box coverage for older frames is not claimed. Scoped CSS, source geometry and packaged Vazirmatn/Material Icons remain. SVG network strokes are retained, source SVG viewBox margins are applied once, and originals are positioned against inspected native bounds. Thirty-three source non-rendering slots preserve geometry without replacement artwork, including `903:2622`, which has no visible layers to export. See `admin-non-rendering-slots.json` and verification hashes.

## Preview behavior

Shared semantic controls provide navigation, editable drafts, independent local choices, notices and keyboard-accessible dialogs. Modal backgrounds are inert; Tab stays in a dialog and Escape returns to its recorded parent. Story Review confirmation and revision dialogs are now enabled. Nested inferred links are removed to prevent hydration errors. Export/report/staff/role drilldowns connect source detail references. Report Link Rows open the same static report-detail sample rather than generate datasets. Role name/description are editable; role permissions and notification channels retain distinct local state with native initial defaults. Save controls send no server request, email or authorization mutation.

Native frame/instance/component/text reaction audits found zero links, so all preview mappings are inferred. The control inventory records both actions and new form/choice/dialog callsites. Other filters, pagination, uploads, approval/payout/export controls and business operations remain sample previews; they do not moderate, charge, publish, invite or alter real permissions.

The shared AdminSidebar preserves source variants, including horizontal/clipped groups and clipped Brand content. These source design defects remain and require a design correction. Every screen is directly accessible from the catalog even when clipped source navigation hides a destination.

## Verification and remaining integration

All 105 screens returned HTTP 200 with zero page errors or broken images. All 2,033 original-image paths and bounds match recorded native slots within 2px. Newly enabled screens were checked again against the final production build. Build, scoped ESLint, seven web unit tests and the final six-test Admin suite passed. The combined portal run passed 42 tests and exposed one missing report mapping; that mapping was fixed before the complete Admin suite passed. Other portal code was unchanged after its passing tests. Selected source/runtime visual comparisons include Role Editor. These checks do not establish full pixel equivalence.

Page inventory is complete. Production responsive integration, source sidebar correction, live authentication/authorization, persistence, reports/files, actual notifications and all business operations remain future work. Exact coverage and limits are recorded in `admin-ui-verification.json`.
