"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./live-growth.module.css";

type ProgramReport = {
  program: { id: string; source: "supporting_organization" | "negarin_csr"; title: string; description: string; rules: string; createdAt: string };
  relationships: { total: number; eligible: number; pendingNegarinApproval: number };
  allocations: { total: number; allocatedToman: string; currentAvailableToman: string; currentReservedToman: string; currentConsumedToman: string };
};
type Summary = { totals: { programs: number; relationships: number; eligibleRelationships: number; pendingNegarinApprovalRelationships: number; allocations: number; allocatedToman: string; currentAvailableToman: string; currentReservedToman: string; currentConsumedToman: string }; programs: ProgramReport[] };
type Activity = { id: string; action: string; amountToman: string; reason: string | null; createdAt: string; program: { title: string }; serviceRequest: { title: string } | null };
type ActivityPage = { page: number; pageSize: number; hasMore: boolean; items: Activity[] };
type Allocation = { id: string; amountToman: string; status: "available" | "reserved" | "consumed"; createdAt: string; program: { title: string }; currentServiceRequest: { title: string; status: string } | null };
type AllocationPage = { page: number; pageSize: number; hasMore: boolean; items: Allocation[] };
type GrowthLevel = { order: number; name: string };
const pageSize = 20;

function record(value: unknown): Record<string, unknown> | null { return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null; }
function amount(value: unknown): value is string { return typeof value === "string" && /^(0|[1-9][0-9]*)$/.test(value); }
function count(value: unknown): value is number { return Number.isSafeInteger(value) && (value as number) >= 0; }
function parseSummary(value: unknown): Summary | null {
  const root = record(value); const totals = record(root?.totals);
  if (!root || !totals || !Array.isArray(root.programs) || !["programs", "relationships", "eligibleRelationships", "pendingNegarinApprovalRelationships", "allocations"].every(key => count(totals[key])) ||
      !["allocatedToman", "currentAvailableToman", "currentReservedToman", "currentConsumedToman"].every(key => amount(totals[key]))) return null;
  const programs = root.programs.map(value => {
    const item = record(value); const program = record(item?.program); const relationships = record(item?.relationships); const allocations = record(item?.allocations);
    if (!program || typeof program.id !== "string" || (program.source !== "supporting_organization" && program.source !== "negarin_csr") ||
        typeof program.title !== "string" || typeof program.description !== "string" || typeof program.rules !== "string" ||
        !relationships || !["total", "eligible", "pendingNegarinApproval"].every(key => count(relationships[key])) || !allocations ||
        !count(allocations.total) || !["allocatedToman", "currentAvailableToman", "currentReservedToman", "currentConsumedToman"].every(key => amount(allocations[key]))) return null;
    return { program: { id: program.id, source: program.source, title: program.title, description: program.description, rules: program.rules, createdAt: typeof program.createdAt === "string" ? program.createdAt : "" },
      relationships: relationships as ProgramReport["relationships"], allocations: allocations as ProgramReport["allocations"] } as ProgramReport;
  });
  if (programs.some(item => item === null)) return null;
  return { totals: totals as Summary["totals"], programs: programs as ProgramReport[] };
}
function parseActivity(value: unknown, page: number): ActivityPage | null {
  const root = record(value);
  if (!root || root.page !== page || root.pageSize !== pageSize || typeof root.hasMore !== "boolean" || !Array.isArray(root.items) || root.items.length > pageSize) return null;
  const items = root.items.map(value => {
    const item = record(value); const program = record(item?.program); const service = item?.serviceRequest === null ? null : record(item?.serviceRequest);
    if (!item || typeof item.id !== "string" || typeof item.action !== "string" || !amount(item.amountToman) ||
        !(item.reason === null || typeof item.reason === "string") || typeof item.createdAt !== "string" || !program || typeof program.title !== "string" ||
        (item.serviceRequest !== null && (!service || typeof service.title !== "string"))) return null;
    return { id: item.id, action: item.action, amountToman: item.amountToman, reason: item.reason as string | null, createdAt: item.createdAt,
      program: { title: program.title }, serviceRequest: service ? { title: service.title as string } : null };
  });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: root.hasMore, items: items as Activity[] };
}
function parseLevels(value: unknown): GrowthLevel[] | null {
  const root = record(value);
  if (!root || root.purchasable !== false || !Array.isArray(root.levels)) return null;
  const levels = root.levels.map(value => { const item = record(value); return item && count(item.order) && typeof item.name === "string" ? { order: item.order, name: item.name } : null; });
  return levels.some(level => level === null) ? null : levels as GrowthLevel[];
}
function parseAllocations(value: unknown, page: number): AllocationPage | null {
  const root = record(value);
  if (!root || root.page !== page || root.pageSize !== pageSize || typeof root.hasMore !== "boolean" || !Array.isArray(root.items) || root.items.length > pageSize) return null;
  const items = root.items.map(value => {
    const item = record(value); const program = record(item?.program);
    const request = item?.currentServiceRequest === null ? null : record(item?.currentServiceRequest);
    if (!item || typeof item.id !== "string" || !amount(item.amountToman) || !["available", "reserved", "consumed"].includes(String(item.status)) ||
        typeof item.createdAt !== "string" || !program || typeof program.title !== "string" ||
        (item.currentServiceRequest !== null && (!request || typeof request.title !== "string" || typeof request.status !== "string"))) return null;
    return { id: item.id, amountToman: item.amountToman, status: item.status as Allocation["status"], createdAt: item.createdAt,
      program: { title: program.title }, currentServiceRequest: request ? { title: request.title as string, status: request.status as string } : null };
  });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: root.hasMore, items: items as Allocation[] };
}
function formatToman(value: string) { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
function formatDate(value: string) { const date = new Date(value); return Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(date) : "تاریخ ثبت‌نشده"; }
const actionLabel: Record<string, string> = { allocated: "اعتبار تخصیص‌یافته", reserved: "اعتبار رزروشده", released: "اعتبار آزادشده", consumed: "اعتبار مصرف‌شده", reversed: "اعتبار برگشت‌خورده" };

export function ArtistGrowthLive() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [levels, setLevels] = useState<GrowthLevel[]>([]);
  const [activity, setActivity] = useState<ActivityPage | null>(null);
  const [allocations, setAllocations] = useState<AllocationPage | null>(null);
  const [page, setPage] = useState(1);
  const [allocationPage, setAllocationPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError("");
    void Promise.all([
      fetch("/api/artist/support-report", { cache: "no-store", signal: controller.signal }),
      fetch("/api/artist/support-activity?page=" + page + "&pageSize=" + pageSize, { cache: "no-store", signal: controller.signal }),
      fetch("/api/artist/support-allocations?page=" + allocationPage + "&pageSize=" + pageSize, { cache: "no-store", signal: controller.signal }),
      fetch("/api/artist/growth/levels", { cache: "no-store", signal: controller.signal })
    ]).then(async ([summaryResponse, activityResponse, allocationResponse, levelsResponse]) => {
      if ([summaryResponse, activityResponse, allocationResponse, levelsResponse].some(response => response.status === 401)) throw new Error("برای مشاهدهٔ گزارش رشد و حمایت وارد حساب هنرمند شوید.");
      if ([summaryResponse, activityResponse, allocationResponse, levelsResponse].some(response => response.status === 403)) throw new Error("این گزارش فقط برای نقش هنرمند در دسترس است.");
      if (![summaryResponse, activityResponse, allocationResponse, levelsResponse].every(response => response.ok)) throw new Error("گزارش رشد و حمایت دریافت نشد.");
      const [summaryValue, activityValue, allocationValue, levelsValue] = await Promise.all([summaryResponse.json(), activityResponse.json(), allocationResponse.json(), levelsResponse.json()]);
      const nextSummary = parseSummary(summaryValue); const nextActivity = parseActivity(activityValue, page); const nextAllocations = parseAllocations(allocationValue, allocationPage); const nextLevels = parseLevels(levelsValue);
      if (!nextSummary || !nextActivity || !nextAllocations || !nextLevels) throw new Error("پاسخ گزارش رشد و حمایت معتبر نیست.");
      setSummary(nextSummary); setActivity(nextActivity); setAllocations(nextAllocations); setLevels(nextLevels);
    }).catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با گزارش برقرار نشد."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [allocationPage, page]);
  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <header className={styles.header}><div><p className={styles.eyebrow}>خانهٔ نگارین / رشد من</p><h1>رشد و حمایت</h1><p>گزارش برنامه‌های حمایتی و مسیرهای رشد حساب هنرمند.</p></div><span className={styles.badge}>اطلاعات زنده</span></header>
    <nav className={styles.workspaceNav} aria-label="بخش‌های پنل هنرمند"><Link href="/artist/storefront">فروشگاه من</Link><Link href="/artist/products">محصولات</Link><Link href="/artist/orders">سفارش‌ها</Link><Link href="/artist/corporate-orders">سفارش‌های سازمانی</Link><Link aria-current="page" href="/artist/growth">رشد من</Link><Link href="/artist/services">خدمات</Link><Link href="/artist/finance">مالی</Link></nav>
    {loading && <p className={styles.notice} role="status">در حال دریافت گزارش‌ها…</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {summary && <>
      <section className={styles.totals} aria-label="خلاصهٔ حمایت‌ها">
        <article><span>برنامه‌های حمایتی</span><strong>{new Intl.NumberFormat("fa-IR").format(summary.totals.programs)}</strong></article>
        <article><span>روابط حمایتی</span><strong>{new Intl.NumberFormat("fa-IR").format(summary.totals.relationships)}</strong></article>
        <article><span>اعتبار در دسترس</span><strong>{formatToman(summary.totals.currentAvailableToman)}</strong></article>
        <article><span>اعتبار رزروشده</span><strong>{formatToman(summary.totals.currentReservedToman)}</strong></article>
        <article><span>اعتبار مصرف‌شده</span><strong>{formatToman(summary.totals.currentConsumedToman)}</strong></article>
      </section>
      <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>برنامه‌ها</p><h2>حمایت‌های مرتبط با حساب</h2></div></div>
        {summary.programs.length === 0 ? <p className={styles.empty}>هنوز برنامه یا رابطهٔ حمایتی برای این حساب ثبت نشده است.</p> : <div className={styles.programGrid}>{summary.programs.map(item => <article className={styles.program} key={item.program.id}>
          <span className={styles.source}>{item.program.source === "negarin_csr" ? "مسئولیت اجتماعی نگارین" : "سازمان حمایتی"}</span><h3>{item.program.title}</h3><p>{item.program.description}</p><details><summary>شرایط برنامه</summary><p>{item.program.rules}</p></details>
          <dl><div><dt>رابطهٔ حمایتی</dt><dd>{new Intl.NumberFormat("fa-IR").format(item.relationships.total)}</dd></div><div><dt>تأییدشدهٔ نگارین</dt><dd>{new Intl.NumberFormat("fa-IR").format(item.relationships.eligible)}</dd></div><div><dt>اعتبار در دسترس</dt><dd>{formatToman(item.allocations.currentAvailableToman)}</dd></div><div><dt>اعتبار مصرف‌شده</dt><dd>{formatToman(item.allocations.currentConsumedToman)}</dd></div></dl>
        </article>)}</div>}
      </section>
    </>}
    {allocations && <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>جزئیات اعتبار</p><h2>اعتبارهای تخصیص‌یافته</h2></div></div>
      {allocations.items.length === 0 ? <p className={styles.empty}>اعتباری برای این حساب تخصیص داده نشده است.</p> : <div className={styles.creditGrid}>{allocations.items.map(item => <article key={item.id} className={styles.credit}><div><span className={styles.source}>{item.program.title}</span><strong>{formatToman(item.amountToman)}</strong><time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time></div><span className={styles.status} data-status={item.status}>{item.status === "available" ? "در دسترس" : item.status === "reserved" ? "رزروشده" : "مصرف‌شده"}</span>{item.currentServiceRequest && <p>درخواست مرتبط: {item.currentServiceRequest.title} · {item.currentServiceRequest.status}</p>}</article>)}</div>}
      {(allocationPage > 1 || allocations.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی اعتبارها"><button type="button" disabled={loading || allocationPage <= 1} onClick={() => setAllocationPage(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(allocationPage)}</span><button type="button" disabled={loading || !allocations.hasMore || allocationPage >= 1000} onClick={() => setAllocationPage(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>}
    {levels.length > 0 && <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>چارچوب رشد</p><h2>سطوح رشد نگارین</h2></div></div><p className={styles.explainer}>این فهرست نام سطوح تعریف‌شده را نشان می‌دهد؛ سطح فعلی یا پیشرفت فردی در این API ارائه نشده است.</p><ol className={styles.levels}>{levels.map(level => <li key={level.order}><span>{new Intl.NumberFormat("fa-IR").format(level.order)}</span><strong>{level.name}</strong></li>)}</ol></section>}
    {activity && <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>تاریخچه</p><h2>رویدادهای اعتبار حمایتی</h2></div></div>
      {activity.items.length === 0 ? <p className={styles.empty}>رویدادی ثبت نشده است.</p> : <div className={styles.activity}>{activity.items.map(item => <article key={item.id}><div><strong>{actionLabel[item.action] ?? "رویداد اعتباری"}</strong><span>{item.program.title}{item.serviceRequest ? ` · ${item.serviceRequest.title}` : ""}</span>{item.reason && <small>{item.reason}</small>}</div><div className={styles.activityMeta}><strong>{formatToman(item.amountToman)}</strong><time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time></div></article>)}</div>}
      {(page > 1 || activity.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی رویدادها"><button type="button" disabled={loading || page <= 1} onClick={() => setPage(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(page)}</span><button type="button" disabled={loading || !activity.hasMore || page >= 1000} onClick={() => setPage(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>}
  </main>;
}
