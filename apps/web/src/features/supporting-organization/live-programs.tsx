"use client";

import { useEffect, useState } from "react";
import styles from "./live-programs.module.css";
import { SupportReferral } from "./support-referral";
import { SupportAllocation } from "./support-allocation";
import { SupportProgramCreate } from "./support-program-create";
import { OrganizationInvitations } from "./organization-invitations";

type Program = { id: string; title: string; description: string; rules: string; createdAt: string };
type ProgramPage = { page: number; pageSize: number; hasMore: boolean; items: Program[] };
type ProgramSummary = { program: Program; relationships: { total: number; eligible: number; pendingNegarinApproval: number }; allocations: { total: number; allocatedToman: string; currentAvailableToman: string; currentReservedToman: string; currentConsumedToman: string } };
type Report = { totals: { programs: number; relationships: number; eligibleRelationships: number; pendingNegarinApprovalRelationships: number; allocations: number; allocatedToman: string; currentAvailableToman: string; currentReservedToman: string; currentConsumedToman: string }; programs: ProgramSummary[] };
type Activity = { id: string; action: string; amountToman: string; reason: string | null; createdAt: string; program: { title: string }; serviceRequest: { title: string } | null };
type ActivityPage = { page: number; pageSize: number; hasMore: boolean; items: Activity[] };
type Relationship = { id: string; programId: string; programTitle: string; artistUserId: string; artist: { storeName: string; shortIntro: string }; eligible: boolean; createdAt: string };
type RelationshipPage = { page: number; pageSize: number; hasMore: boolean; items: Relationship[] };
type Allocation = { id: string; amountToman: string; status: "available" | "reserved" | "consumed"; createdAt: string; programTitle: string; artistName: string; requestTitle: string | null };
type AllocationPage = { page: number; pageSize: number; hasMore: boolean; items: Allocation[] };
type Member = { id: string; maskedPhone: string; accessGrantedAt: string };
type MemberPage = { page: number; pageSize: number; hasMore: boolean; items: Member[] };
const pageSize = 20;
type SupportingOrganizationView = "programs" | "referrals" | "allocations" | "reports" | "members";
const views: { id: SupportingOrganizationView; href: string; label: string }[] = [
  { id: "programs", href: "/supporting-organization/support-programs", label: "برنامه‌های حمایتی" },
  { id: "referrals", href: "/supporting-organization/referrals", label: "ارجاع هنرمندان" },
  { id: "allocations", href: "/supporting-organization/allocations", label: "تعهدها و مصرف" },
  { id: "reports", href: "/supporting-organization/reports", label: "گزارش‌ها" },
  { id: "members", href: "/supporting-organization/members", label: "حساب و دسترسی‌ها" }
];

function record(value: unknown): Record<string, unknown> | null { return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null; }
function isCount(value: unknown): value is number { return Number.isSafeInteger(value) && (value as number) >= 0; }
function isAmount(value: unknown): value is string { return typeof value === "string" && /^(0|[1-9][0-9]*)$/.test(value); }
function parsePrograms(value: unknown, page: number): ProgramPage | null {
  const root = record(value);
  if (!root || root.page !== page || root.pageSize !== pageSize || typeof root.hasMore !== "boolean" || !Array.isArray(root.items) || root.items.length > pageSize) return null;
  const items = root.items.map(value => { const item = record(value); return item && typeof item.id === "string" && typeof item.title === "string" && typeof item.description === "string" && typeof item.rules === "string" && typeof item.createdAt === "string" ? { id: item.id, title: item.title, description: item.description, rules: item.rules, createdAt: item.createdAt } : null; });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: root.hasMore, items: items as Program[] };
}
function parseReport(value: unknown): Report | null {
  const root = record(value); const totals = record(root?.totals);
  if (!root || !totals || !Array.isArray(root.programs) || !["programs", "relationships", "eligibleRelationships", "pendingNegarinApprovalRelationships", "allocations"].every(key => isCount(totals[key])) ||
      !["allocatedToman", "currentAvailableToman", "currentReservedToman", "currentConsumedToman"].every(key => isAmount(totals[key]))) return null;
  const programs = root.programs.map(value => {
    const item = record(value); const p = record(item?.program); const rel = record(item?.relationships); const alloc = record(item?.allocations);
    if (!p || typeof p.id !== "string" || typeof p.title !== "string" || typeof p.description !== "string" || typeof p.rules !== "string" || typeof p.createdAt !== "string" ||
        !rel || !["total", "eligible", "pendingNegarinApproval"].every(key => isCount(rel[key])) || !alloc || !isCount(alloc.total) ||
        !["allocatedToman", "currentAvailableToman", "currentReservedToman", "currentConsumedToman"].every(key => isAmount(alloc[key]))) return null;
    const program = { id: p.id, title: p.title, description: p.description, rules: p.rules, createdAt: p.createdAt };
    return { program, relationships: rel as ProgramSummary["relationships"], allocations: alloc as ProgramSummary["allocations"] };
  });
  return programs.some(item => item === null) ? null : { totals: totals as Report["totals"], programs: programs as ProgramSummary[] };
}
function parseActivity(value: unknown, page: number): ActivityPage | null {
  const root = record(value);
  if (!root || root.page !== page || root.pageSize !== pageSize || typeof root.hasMore !== "boolean" || !Array.isArray(root.items) || root.items.length > pageSize) return null;
  const items = root.items.map(value => {
    const item = record(value); const p = record(item?.program); const request = item?.serviceRequest === null ? null : record(item?.serviceRequest);
    if (!item || typeof item.id !== "string" || typeof item.action !== "string" || !isAmount(item.amountToman) || !(item.reason === null || typeof item.reason === "string") ||
        typeof item.createdAt !== "string" || !p || typeof p.title !== "string" || (item.serviceRequest !== null && (!request || typeof request.title !== "string"))) return null;
    return { id: item.id, action: item.action, amountToman: item.amountToman, reason: item.reason as string | null, createdAt: item.createdAt,
      program: { title: p.title }, serviceRequest: request ? { title: request.title as string } : null };
  });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: root.hasMore, items: items as Activity[] };
}
function parseRelationships(value: unknown, page: number): RelationshipPage | null {
  const root = record(value);
  if (!root || root.page !== page || root.pageSize !== pageSize || typeof root.hasMore !== "boolean" || !Array.isArray(root.items) || root.items.length > pageSize) return null;
  const items = root.items.map(value => {
    const item = record(value); const artist = record(item?.artist);
    if (!item || typeof item.id !== "string" || typeof item.programId !== "string" || typeof item.programTitle !== "string" ||
        typeof item.artistUserId !== "string" || typeof item.eligible !== "boolean" || typeof item.createdAt !== "string" ||
        !artist || typeof artist.storeName !== "string" || typeof artist.shortIntro !== "string") return null;
    return { id: item.id, programId: item.programId, programTitle: item.programTitle, artistUserId: item.artistUserId,
      artist: { storeName: artist.storeName, shortIntro: artist.shortIntro }, eligible: item.eligible, createdAt: item.createdAt };
  });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: root.hasMore, items: items as Relationship[] };
}
function parseAllocations(value: unknown, page: number): AllocationPage | null {
  const root = record(value);
  if (!root || root.page !== page || root.pageSize !== pageSize || typeof root.hasMore !== "boolean" || !Array.isArray(root.items) || root.items.length > pageSize) return null;
  const items = root.items.map(value => {
    const item = record(value); const program = record(item?.program); const artist = record(item?.artist);
    const request = item?.currentServiceRequest === null ? null : record(item?.currentServiceRequest);
    if (!item || typeof item.id !== "string" || !isAmount(item.amountToman) || !["available", "reserved", "consumed"].includes(String(item.status)) ||
        typeof item.createdAt !== "string" || !program || typeof program.title !== "string" || !artist || typeof artist.storeName !== "string" ||
        (item.currentServiceRequest !== null && (!request || typeof request.title !== "string"))) return null;
    return { id: item.id, amountToman: item.amountToman, status: item.status as Allocation["status"], createdAt: item.createdAt,
      programTitle: program.title, artistName: artist.storeName, requestTitle: request ? request.title as string : null };
  });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: root.hasMore, items: items as Allocation[] };
}
function parseMembers(value: unknown, page: number): MemberPage | null {
  const root = record(value);
  if (!root || root.page !== page || root.pageSize !== pageSize || typeof root.hasMore !== "boolean" || !Array.isArray(root.items) || root.items.length > pageSize) return null;
  const items = root.items.map(value => { const item = record(value); return item && typeof item.id === "string" && typeof item.maskedPhone === "string" && typeof item.accessGrantedAt === "string" ? { id: item.id, maskedPhone: item.maskedPhone, accessGrantedAt: item.accessGrantedAt } : null; });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: root.hasMore, items: items as Member[] };
}
function money(value: string) { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
function date(value: string) { const d = new Date(value); return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(d) : "تاریخ نامشخص"; }
const actionLabel: Record<string, string> = { allocated: "اعتبار تخصیص‌یافت", reserved: "اعتبار رزروشده", released: "اعتبار آزادشده", consumed: "اعتبار مصرف‌شده", reversed: "اعتبار برگشت‌خورده" };
const allocationStatus: Record<Allocation["status"], string> = { available: "در دسترس", reserved: "رزروشده", consumed: "مصرف‌شده" };

export function SupportingOrganizationProgramsLive({ view }: { view: SupportingOrganizationView }) {
  const [programPage, setProgramPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const [relationshipPage, setRelationshipPage] = useState(1);
  const [allocationPage, setAllocationPage] = useState(1);
  const [memberPage, setMemberPage] = useState(1);
  const [programs, setPrograms] = useState<ProgramPage | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [activity, setActivity] = useState<ActivityPage | null>(null);
  const [relationships, setRelationships] = useState<RelationshipPage | null>(null);
  const [allocations, setAllocations] = useState<AllocationPage | null>(null);
  const [members, setMembers] = useState<MemberPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [referralProgramId, setReferralProgramId] = useState("");
  const [allocationRelationshipId, setAllocationRelationshipId] = useState("");
  const [creatingProgram, setCreatingProgram] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError("");
    void Promise.all([
      fetch(`/api/supporting-organization/support-programs?page=${programPage}&pageSize=${pageSize}`, { cache: "no-store", signal: controller.signal }),
      fetch("/api/supporting-organization/support-report", { cache: "no-store", signal: controller.signal }),
      fetch(`/api/supporting-organization/support-activity?page=${activityPage}&pageSize=${pageSize}`, { cache: "no-store", signal: controller.signal }),
      fetch(`/api/supporting-organization/support-relationships?page=${relationshipPage}&pageSize=${pageSize}`, { cache: "no-store", signal: controller.signal }),
      fetch(`/api/supporting-organization/support-allocations?page=${allocationPage}&pageSize=${pageSize}`, { cache: "no-store", signal: controller.signal }),
      fetch(`/api/supporting-organization/members?page=${memberPage}&pageSize=${pageSize}`, { cache: "no-store", signal: controller.signal })
    ]).then(async ([programResponse, reportResponse, activityResponse, relationshipResponse, allocationResponse, memberResponse]) => {
      const responses = [programResponse, reportResponse, activityResponse, relationshipResponse, allocationResponse, memberResponse];
      if (responses.some(response => response.status === 401)) throw new Error("برای مشاهدهٔ برنامه‌ها وارد حساب سازمان حمایتی شوید.");
      if (responses.some(response => response.status === 403)) throw new Error("این بخش فقط برای نقش سازمان حمایتی در دسترس است.");
      if (!responses.every(response => response.ok)) throw new Error("اطلاعات برنامه‌های حمایتی دریافت نشد.");
      const [programValue, reportValue, activityValue, relationshipValue, allocationValue, memberValue] = await Promise.all(responses.map(response => response.json()));
      const nextPrograms = parsePrograms(programValue, programPage); const nextReport = parseReport(reportValue); const nextActivity = parseActivity(activityValue, activityPage); const nextRelationships = parseRelationships(relationshipValue, relationshipPage); const nextAllocations = parseAllocations(allocationValue, allocationPage); const nextMembers = parseMembers(memberValue, memberPage);
      if (!nextPrograms || !nextReport || !nextActivity || !nextRelationships || !nextAllocations || !nextMembers) throw new Error("پاسخ برنامه‌های حمایتی معتبر نیست.");
      setPrograms(nextPrograms); setReport(nextReport); setActivity(nextActivity); setRelationships(nextRelationships); setAllocations(nextAllocations); setMembers(nextMembers);
    }).catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با سامانه برقرار نشد."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [activityPage, allocationPage, memberPage, programPage, relationshipPage, refreshVersion]);
  const reports = new Map(report?.programs.map(item => [item.program.id, item]) ?? []);
  const title: Record<SupportingOrganizationView, string> = { programs: "برنامه‌های حمایتی", referrals: "ارجاع هنرمندان", allocations: "تعهدها و مصرف", reports: "گزارش‌های حمایتی", members: "حساب و دسترسی‌ها" };
  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <header className={styles.header}><div><p className={styles.eyebrow}>خانهٔ نگارین / سازمان حمایتی</p><h1>{title[view]}</h1><p>برنامه‌ها، روابط هنرمندان و گردش اعتبارهای ثبت‌شده برای سازمان شما.</p></div><span className={styles.badge}>گزارش زنده</span></header>
    <nav className={styles.workspaceNav} aria-label="بخش‌های سازمان حمایتی">{views.map(item => <a key={item.id} href={item.href} aria-current={view === item.id ? "page" : undefined}>{item.label}</a>)}</nav>
    {loading && <p className={styles.notice} role="status">در حال دریافت اطلاعات…</p>}{error && <p className={styles.error} role="alert">{error}</p>}
    {notice && <p className={styles.notice} role="status">{notice}</p>}
    {report && <section className={styles.totals} aria-label="خلاصهٔ برنامه‌ها"><article><span>برنامه‌ها</span><strong>{new Intl.NumberFormat("fa-IR").format(report.totals.programs)}</strong></article><article><span>روابط هنرمندان</span><strong>{new Intl.NumberFormat("fa-IR").format(report.totals.relationships)}</strong></article><article><span>در انتظار تأیید نگارین</span><strong>{new Intl.NumberFormat("fa-IR").format(report.totals.pendingNegarinApprovalRelationships)}</strong></article><article><span>اعتبار در دسترس</span><strong>{money(report.totals.currentAvailableToman)}</strong></article><article><span>اعتبار مصرف‌شده</span><strong>{money(report.totals.currentConsumedToman)}</strong></article></section>}
    {view === "programs" && programs && <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>فهرست</p><h2>برنامه‌های سازمان شما</h2></div><button type="button" onClick={() => setCreatingProgram(value => !value)}>{creatingProgram ? "بستن فرم" : "ایجاد برنامه"}</button></div>
      {creatingProgram && <SupportProgramCreate onCancel={() => setCreatingProgram(false)} onComplete={() => { setCreatingProgram(false); setNotice("برنامهٔ حمایتی ثبت شد."); setProgramPage(1); setRefreshVersion(value => value + 1); }} />}
      {referralProgramId && <SupportReferral programs={programs.items} initialProgramId={referralProgramId} onCancel={() => setReferralProgramId("")} onComplete={artistName => { setReferralProgramId(""); setNotice(`ارتباط حمایتی با «${artistName}» ثبت شد و برای واجدشرایط‌شدن منتظر تأیید نگارین است.`); setRefreshVersion(value => value + 1); }} />}
      {programs.items.length === 0 ? <p className={styles.empty}>برای این سازمان هنوز برنامه‌ای ثبت نشده است.</p> : <div className={styles.grid}>{programs.items.map(program => { const totals = reports.get(program.id); return <article className={styles.program} key={program.id}><div className={styles.programTitle}><h3>{program.title}</h3><button type="button" onClick={() => setReferralProgramId(program.id)}>ارجاع هنرمند</button></div><p>{program.description}</p><details><summary>قواعد برنامه</summary><p>{program.rules}</p></details><dl><div><dt>رابطه‌های هنرمندی</dt><dd>{new Intl.NumberFormat("fa-IR").format(totals?.relationships.total ?? 0)}</dd></div><div><dt>تأییدشدهٔ نگارین</dt><dd>{new Intl.NumberFormat("fa-IR").format(totals?.relationships.eligible ?? 0)}</dd></div><div><dt>اعتبار در دسترس</dt><dd>{money(totals?.allocations.currentAvailableToman ?? "0")}</dd></div><div><dt>اعتبار مصرف‌شده</dt><dd>{money(totals?.allocations.currentConsumedToman ?? "0")}</dd></div></dl></article>; })}</div>}
      {(programPage > 1 || programs.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی برنامه‌ها"><button type="button" disabled={loading || programPage <= 1} onClick={() => setProgramPage(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(programPage)}</span><button type="button" disabled={loading || !programs.hasMore} onClick={() => setProgramPage(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>}
    {view === "referrals" && relationships && <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>ارجاع‌ها</p><h2>ارتباط‌های ثبت‌شده با هنرمندان</h2></div></div>
      {allocationRelationshipId && relationships.items.find(item => item.id === allocationRelationshipId) && <SupportAllocation relationshipId={allocationRelationshipId} artistName={relationships.items.find(item => item.id === allocationRelationshipId)!.artist.storeName} onCancel={() => setAllocationRelationshipId("")} onComplete={amount => { setAllocationRelationshipId(""); setNotice(`تخصیص ${money(amount)} ثبت شد.`); setRefreshVersion(value => value + 1); }} />}
      {relationships.items.length === 0 ? <p className={styles.empty}>هنوز ارتباطی با هنرمندان ثبت نشده است.</p> : <div className={styles.relationships}>{relationships.items.map(item => <article key={item.id}><div><strong>{item.artist.storeName}</strong><span>{item.programTitle}</span>{item.artist.shortIntro && <small>{item.artist.shortIntro}</small>}</div><div className={styles.relationshipActions}><span className={styles.approval} data-eligible={item.eligible}>{item.eligible ? "تأییدشدهٔ نگارین" : "در انتظار تأیید نگارین"}</span>{item.eligible && <button type="button" onClick={() => setAllocationRelationshipId(item.id)}>تخصیص اعتبار</button>}</div></article>)}</div>}
      {(relationshipPage > 1 || relationships.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی ارجاع‌ها"><button type="button" disabled={loading || relationshipPage <= 1} onClick={() => setRelationshipPage(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(relationshipPage)}</span><button type="button" disabled={loading || !relationships.hasMore} onClick={() => setRelationshipPage(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>}
    {view === "allocations" && allocations && <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>تعهدها و مصرف</p><h2>تخصیص‌های اعتبار</h2></div></div>
      {allocations.items.length === 0 ? <p className={styles.empty}>هنوز اعتباری به هنرمندان تخصیص نیافته است.</p> : <div className={styles.allocations}>{allocations.items.map(item => <article key={item.id}><div><strong>{item.artistName}</strong><span>{item.programTitle}{item.requestTitle ? ` · ${item.requestTitle}` : ""}</span></div><div><b>{money(item.amountToman)}</b><span className={styles.creditStatus} data-status={item.status}>{allocationStatus[item.status]}</span><time dateTime={item.createdAt}>{date(item.createdAt)}</time></div></article>)}</div>}
      {(allocationPage > 1 || allocations.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی تخصیص‌های اعتبار"><button type="button" disabled={loading || allocationPage <= 1} onClick={() => setAllocationPage(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(allocationPage)}</span><button type="button" disabled={loading || !allocations.hasMore} onClick={() => setAllocationPage(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>}
    {view === "reports" && activity && <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>گردش اعتبار</p><h2>آخرین رویدادها</h2></div></div>{activity.items.length === 0 ? <p className={styles.empty}>هنوز رویدادی ثبت نشده است.</p> : <div className={styles.events}>{activity.items.map(item => <article key={item.id}><div><strong>{actionLabel[item.action] ?? "رویداد اعتبار"}</strong><span>{item.program.title}{item.serviceRequest ? ` · ${item.serviceRequest.title}` : ""}</span>{item.reason && <small>{item.reason}</small>}</div><div><b>{money(item.amountToman)}</b><time dateTime={item.createdAt}>{date(item.createdAt)}</time></div></article>)}</div>}
      {(activityPage > 1 || activity.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی رویدادها"><button type="button" disabled={loading || activityPage <= 1} onClick={() => setActivityPage(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(activityPage)}</span><button type="button" disabled={loading || !activity.hasMore} onClick={() => setActivityPage(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>}
    {view === "members" && members && <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>دسترسی‌های فعال</p><h2>اعضای سازمان</h2></div></div>
      <p className={styles.explainer}>فقط دسترسی‌های فعال همین سازمان نمایش داده می‌شوند. شمارهٔ تماس برای حفظ حریم خصوصی پوشیده شده است.</p>
      {members.items.length === 0 ? <p className={styles.empty}>عضو فعالی برای این سازمان پیدا نشد.</p> : <div className={styles.members}>{members.items.map((member, index) => <article key={member.id}><div><strong>عضو سازمان {new Intl.NumberFormat("fa-IR").format(index + 1 + (memberPage - 1) * pageSize)}</strong><span dir="ltr">{member.maskedPhone}</span></div><time dateTime={member.accessGrantedAt}>دسترسی از {date(member.accessGrantedAt)}</time></article>)}</div>}
      {(memberPage > 1 || members.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی اعضای سازمان"><button type="button" disabled={loading || memberPage <= 1} onClick={() => setMemberPage(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(memberPage)}</span><button type="button" disabled={loading || !members.hasMore} onClick={() => setMemberPage(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>}
    {view === "members" && <OrganizationInvitations />}
  </main>;
}
