# Supporting Organization desktop preview

Source: [Negarin House — Supporting Organization / Portal](https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id=954-2). All 19 source frames in eight sections are implemented. The catalog is `/preview/supporting-organization`; each entry links to its individual route and original Figma frame. `?canvas=1` hides the review toolbar for geometry comparisons. Production access is disabled unless `NEGARIN_UI_PREVIEW=1`.

## Coverage

- Dashboard; support programs and program detail.
- Artist referrals; new referral form, submitted sample and referral detail.
- My supports; support detail and supported artist profile.
- Activity report and activity detail report.
- Notifications; organization account, users/access and invite user.
- Combined empty/error QA matrix; loading and error reference states.

All frames use the 1440px desktop source width. Account is 1544px tall; the other 18 frames are 1024px tall. There is no tablet layout. These are separate reference canvases with static sample records, rather than a connected production dataset.

## Native layout and original assets

Native React markup and scoped CSS preserve 1,041 retrieved auto-layout boxes and 439 utility groups. Locally packaged Vazirmatn and Inter fonts match the native font audit. The canvas remains LTR because the source main area precedes the right-side sidebar; Persian text retains its original `dir="auto"`. Every screen uses the same semantic organization sidebar with seven Persian navigation destinations.

The 299 image callsites use 111 complete original exports: 95 SVGs and 16 PNGs. No full-screen screenshot, substituted photo, redrawn SVG path, remote temporary asset URL or external font service is used at runtime. SVGs are exported with `svgSimplifyStroke:false`: the default Figma export incorrectly omitted internal vector-network strokes from several original icons. Native zero-height LINE nodes use physical stroke bounds; the five vertical timeline SVGs already contain rotation, so their browser wrappers do not rotate them again. The exported artist portrait includes its original border; its wrapper avoids applying that border twice. Side-specific border variables reset per node to prevent inherited border widths from shrinking avatars and icons. Small inspected original-node offsets accommodate browser text/border layout without changing asset contents.

`asset-slots.json` records native node IDs, source bounds, paths and received content hashes. SVG internal mask/clip IDs can vary between exports: `key` identifies the native export group and `savedContentHash` identifies the complete received payload. SVGs were checked as complete XML; original PNG chunks were verified against export length and FNV hash before decoding. SHA-256 of every saved asset is recorded in the verification file.

## Navigation and preview behavior

Native FRAME/INSTANCE/COMPONENT and TEXT prototype audits found zero ON_CLICK links. All 231 action callsites are inferred preview mappings, recorded in `controls.json`.

Program cards open program detail; sample artist rows open supported artist, then support detail. Referrals link to the new form, submitted sample and referral detail. Activity entries open detail reports, notification cards open the relevant sample detail, and account/users/invitation links remain inside the organization preview. Error retry opens the sample dashboard; the source loading canvas is a static `aria-busy` reference, not a live loading operation.

Fields and individual notification preferences persist during client-side navigation in this preview. Preferences have separate labels and state keys. The referral description is an explicit multiline textarea using the shared field primitive. Referral submission validates the name, Iranian mobile number including Persian/Arabic digits, and source contact-permission checkbox. Its original initially checked appearance is retained; turning it off blocks sample submission. Valid submission opens the original static submitted canvas: the sample tracking ID and artist information are not generated from the entered draft. Invite user requires a name and valid work email and acknowledges local validation only; it sends no email and creates no access. Search/filter/pagination/report-download/account-edit/security/logout and other unconnected controls acknowledge preview scope. Art-category and user-role fields accept local text; they are not connected catalog or permission selectors.

## Source issues and remaining integration

The source Brand includes two original logo images; both are retained. Some frames use circle-X sidebar icons, and some source icon descendants are much larger than their clipped 16/18px containers. These source inconsistencies are retained, not claimed as polished production navigation. Static sample organizations, artists, support amounts, dates, invitation text and tracking IDs are not synchronized across canvases. Loading, empty and error frames are source QA examples, not server status evidence.

Backend organization authentication and isolation, authorized artist visibility, support budgets/credit consumption, referrals and consent persistence, real invitations and role enforcement, audit history, notifications, search/filtering, report generation/downloads and account/security operations remain outstanding. This preview makes no server mutation, upload, email, allocation or permission change.

Validation is recorded in `supporting-organization-ui-verification.json`. All 19 frames rendered with zero page errors and zero broken images, and all 299 original asset callsites matched source paths/bounds within 2px. Geometry checks and selected visual comparisons do not establish full pixel equivalence. The browser tests also cover sample drilldown, consent/phone validation, multiline draft persistence, independent preferences and no-request invitation validation.
