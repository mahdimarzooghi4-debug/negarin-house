"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./product-review-live.module.css";

type ProgramRow = { program: { id: string; source: "negarin_csr" | "supporting_organization"; organizationId: string | null; title: string; description: string; rules: string; createdAt: string }; relationships: { total: number; eligible: number; pendingNegarinApproval: number }; allocations: { total: number; allocatedToman: string; currentAvailableToman: string; currentReservedToman: string; currentConsumedToman: string } };
type Report = { totals: { programs: number; relationships: number; eligibleRelationships: number; pendingNegarinApprovalRelationships: number; allocations: number; allocatedToman: string; currentAvailableToman: string; currentReservedToman: string; currentConsumedToman: string }; lifecycle: Record<string, { count: number; amountToman: string }>; programs: ProgramRow[] };
type Activity = { id: string; version: number; action: string; amountToman: string; actorUserId: string; reason: string | null; createdAt: string; allocation: { id: string }; program: { id: string; source: string; organizationId: string | null; title: string }; relationship: { id: string; artistUserId: string }; serviceRequest: null | { id: string; serviceId: string | null; title: string; description: string; status: string } };
type ActivityPage = { page: number; pageSize: number; hasMore: boolean; items: Activity[] };
type Grant = { id: string };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function moneyValue(value: unknown): value is string { return typeof value === "string" && /^(0|[1-9]\d*)$/.test(value); }
function parseReport(value: unknown): Report | null {
  if (!record(value) || !record(value.totals) || !record(value.lifecycle) || !Array.isArray(value.programs)) return null;
  const totals = value.totals;
  if (![totals.programs, totals.relationships, totals.eligibleRelationships, totals.pendingNegarinApprovalRelationships, totals.allocations].every(Number.isSafeInteger) ||
      ![totals.allocatedToman, totals.currentAvailableToman, totals.currentReservedToman, totals.currentConsumedToman].every(moneyValue)) return null;
  const lifecycle: Report["lifecycle"] = {};
  for (const action of ["allocated", "reserved", "released", "consumed", "reversed"]) {
    const entry = value.lifecycle[action]; if (!record(entry) || !Number.isSafeInteger(entry.count) || !moneyValue(entry.amountToman)) return null;
    lifecycle[action] = { count: entry.count as number, amountToman: entry.amountToman };
  }
  const programs = value.programs.map(row => {
    if (!record(row) || !record(row.program) || !record(row.relationships) || !record(row.allocations)) return null;
    const p = row.program; const relationships = row.relationships; const allocations = row.allocations;
    if (!uuid(p.id) || !["negarin_csr", "supporting_organization"].includes(String(p.source)) || !(uuid(p.organizationId) || p.organizationId === null) || typeof p.title !== "string" || typeof p.description !== "string" || typeof p.rules !== "string" || typeof p.createdAt !== "string" ||
        ![relationships.total, relationships.eligible, relationships.pendingNegarinApproval, allocations.total].every(Number.isSafeInteger) || ![allocations.allocatedToman, allocations.currentAvailableToman, allocations.currentReservedToman, allocations.currentConsumedToman].every(moneyValue)) return null;
    return { program: { id: p.id, source: p.source as ProgramRow["program"]["source"], organizationId: p.organizationId as string | null, title: p.title, description: p.description, rules: p.rules, createdAt: p.createdAt }, relationships: relationships as ProgramRow["relationships"], allocations: allocations as ProgramRow["allocations"] };
  });
  if (programs.some(row => row === null)) return null;
  return { totals: totals as Report["totals"], lifecycle, programs: programs as ProgramRow[] };
}
function parseActivity(value: unknown, page: number, pageSize: number): ActivityPage | null {
  if (!record(value) || value.page !== page || value.pageSize !== pageSize || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) return null;
  const items = value.items.map(item => {
    if (!record(item) || !uuid(item.id) || !Number.isSafeInteger(item.version) || typeof item.action !== "string" || !moneyValue(item.amountToman) || !uuid(item.actorUserId) || !(typeof item.reason === "string" || item.reason === null) || typeof item.createdAt !== "string" || !record(item.allocation) || !uuid(item.allocation.id) || !record(item.program) || !uuid(item.program.id) || typeof item.program.source !== "string" || !(uuid(item.program.organizationId) || item.program.organizationId === null) || typeof item.program.title !== "string" || !record(item.relationship) || !uuid(item.relationship.id) || !uuid(item.relationship.artistUserId) || !(item.serviceRequest === null || (record(item.serviceRequest) && uuid(item.serviceRequest.id) && (uuid(item.serviceRequest.serviceId) || item.serviceRequest.serviceId === null) && typeof item.serviceRequest.title === "string" && typeof item.serviceRequest.description === "string" && typeof item.serviceRequest.status === "string"))) return null;
    return item as unknown as Activity;
  });
  if (items.some(item => item === null)) return null;
  return { page, pageSize, hasMore: value.hasMore, items: items as Activity[] };
}
const toman = (value: string) => `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`;
const date = (value: string) => { const d = new Date(value); return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(d) : "—"; };
const actionText: Record<string, string> = { allocated: "تخصیص اعتبار", reserved: "رزرو اعتبار", released: "آزادسازی اعتبار", consumed: "مصرف اعتبار", reversed: "برگشت اعتبار" };

export function AdminSupportReportsLive() {
  const [session, setSession] = useState<Session>("loading"); const [grants, setGrants] = useState<Grant[]>([]); const [report, setReport] = useState<Report | null>(null);
  const [pageNumber, setPageNumber] = useState(1); const [activity, setActivity] = useState<ActivityPage | null>(null); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try { const response = await fetch("/api/auth/context", { cache: "no-store" }); if (response.ok) { const context: unknown = await response.json(); if (!record(context) || typeof context.activeRole !== "string") { setSession("error"); return; } if (context.activeRole === "staff") { setSession("ready"); return; } } else if (response.status !== 401) { setSession("error"); return; }
      const r = await fetch("/api/auth/grants", { cache: "no-store" }); if (r.status === 401) { setSession("signed-out"); return; } if (!r.ok) { setSession("error"); return; } const body: unknown = await r.json(); if (!record(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const staff = body.grants.filter((grant): grant is Grant => record(grant) && typeof grant.id === "string" && grant.role === "staff"); setGrants(staff); setSession(staff.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);
  const loadData = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try {
      const [summaryResponse, activityResponse] = await Promise.all([fetch("/api/admin/support-report", { cache: "no-store" }), fetch(`/api/admin/support-activity?page=${pageNumber}&pageSize=10`, { cache: "no-store" })]);
      if (summaryResponse.status === 403 || activityResponse.status === 403) throw new Error("این گزارش به مجوز دامنهٔ گزارش‌ها نیاز دارد.");
      if (summaryResponse.status === 401 || activityResponse.status === 401) throw new Error("نشست کارشناسی معتبر نیست یا پایان یافته است.");
      if (!summaryResponse.ok || !activityResponse.ok) throw new Error("گزارش پشتیبانی دریافت نشد.");
      const summary = parseReport(await summaryResponse.json()); const events = parseActivity(await activityResponse.json(), pageNumber, 10);
      if (!summary || !events) throw new Error("ساختار گزارش پشتیبانی معتبر نیست."); setReport(summary); setActivity(events);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس گزارش برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber, session]);
  useEffect(() => { void loadData(); }, [loadData]);
  async function chooseGrant(id: string) { setSession("loading"); setError(""); try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); } catch { setError("فعال‌سازی دسترسی کارشناسی انجام نشد."); setSession("error"); } }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }
  const lifecycle = report?.lifecycle;
  return <main className={styles.page} dir="rtl" lang="fa-IR"><aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a><nav aria-label="منوی مدیریت"><a href="/admin/product-reviews">بررسی محصولات</a><a href="/admin/shipment-issues">رسیدگی به مشکلات سفارش</a><a href="/admin/refund-reviews">بررسی مالی بازپرداخت</a><a href="/admin/domestic-finance">صورت‌وضعیت سفارش‌ها</a><a href="/admin/service-reviews">بازبینی تحویل خدمات</a><a href="/admin/support-reviews">بازبینی ارجاع حمایتی</a><a className={styles.active} href="/admin/support-reports" aria-current="page">گزارش حمایت‌ها</a><a href="/admin/support-programs">مدیریت برنامه‌های حمایتی</a><a href="/admin/support-allocations">تخصیص اعتبار حمایتی</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a href="/preview/admin">سایر بخش‌های پنل</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / گزارش‌ها</p><h1>گزارش حمایت و اعتبار</h1><span>گزارش فقط‌خواندنی از موجودی و گردش ثبت‌شده در دفترکل حمایت.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}{session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای مشاهدهٔ گزارش، نشست کارشناسی لازم است.</p></section>}{session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p>این صفحه به نقش کارشناس و مجوز گزارش‌ها نیاز دارد.</p></section>}{session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><p>مجوز دامنهٔ گزارش‌ها در سرور بررسی می‌شود.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی دسترسی گزارش‌ها</button>)}</div></section>}{session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <>{error && <p className={styles.error} role="alert">{error}</p>}<div className={styles.reportTop}><section className={styles.panel}><div className={styles.toolbar}><div><h2>موجودی جاری حمایت</h2><p>مقادیر بر پایهٔ وضعیت فعلی تخصیص‌ها هستند.</p></div><button type="button" disabled={loading} onClick={() => void loadData()}>تازه‌سازی</button></div>{loading && !report && <p className={styles.muted}>در حال دریافت گزارش…</p>}{report && <dl className={styles.reportMetrics}><div><dt>برنامه‌ها</dt><dd>{report.totals.programs.toLocaleString("fa-IR")}</dd></div><div><dt>رابطه‌های هنرمندی</dt><dd>{report.totals.relationships.toLocaleString("fa-IR")} · واجد شرایط {report.totals.eligibleRelationships.toLocaleString("fa-IR")}</dd></div><div><dt>تخصیص اعتبار</dt><dd>{toman(report.totals.allocatedToman)}</dd></div><div><dt>اعتبار آماده</dt><dd>{toman(report.totals.currentAvailableToman)}</dd></div><div><dt>اعتبار رزروشده</dt><dd>{toman(report.totals.currentReservedToman)}</dd></div><div><dt>اعتبار مصرف‌شده</dt><dd>{toman(report.totals.currentConsumedToman)}</dd></div></dl>}</section><section className={styles.panel}><h2>گردش تاریخی اعتبار</h2><p className={styles.muted}>رویدادها در تاریخچه باقی می‌مانند؛ آزادسازی و برگشت از جمع تاریخی حذف نمی‌شوند.</p>{lifecycle && <dl className={styles.lifecycle}>{Object.entries(lifecycle).map(([action, value]) => <div key={action}><dt>{actionText[action] ?? action} · {value.count.toLocaleString("fa-IR")} مورد</dt><dd>{toman(value.amountToman)}</dd></div>)}</dl>}</section></div>
        <section className={styles.panel}><h2>برنامه‌های حمایت</h2>{report?.programs.length ? <div className={styles.programList}>{report.programs.map(row => <article key={row.program.id}><header><strong>{row.program.title}</strong><span>{row.program.source === "negarin_csr" ? "حمایت نگارین" : "حمایت سازمان"}</span></header><p>{row.program.description}</p><small>هنرمند واجد شرایط: {row.relationships.eligible.toLocaleString("fa-IR")} از {row.relationships.total.toLocaleString("fa-IR")} · تخصیص: {row.allocations.total.toLocaleString("fa-IR")}</small><div className={styles.programMoney}><span>آزاد {toman(row.allocations.currentAvailableToman)}</span><span>رزرو {toman(row.allocations.currentReservedToman)}</span><span>مصرف {toman(row.allocations.currentConsumedToman)}</span></div></article>)}</div> : <p className={styles.muted}>برنامه‌ای در دامنهٔ گزارش ثبت نشده است.</p>}</section>
        <section className={styles.panel}><div className={styles.toolbar}><div><h2>رویدادهای اخیر</h2><p>دلیل انسانی ثبت‌شده نمایش داده می‌شود؛ فرمان خام و کلیدهای تکرار نمایش داده نمی‌شوند.</p></div></div>{activity?.items.length ? <div className={styles.activity}>{activity.items.map(item => <article key={item.id}><header><strong>{actionText[item.action] ?? "رویداد اعتبار"} · {toman(item.amountToman)}</strong><small>{date(item.createdAt)} · نسخهٔ {item.version.toLocaleString("fa-IR")}</small></header><p>{item.program.title} · هنرمند <bdi dir="ltr">{item.relationship.artistUserId.slice(0, 8)}…</bdi></p>{item.serviceRequest && <p>درخواست خدمت: {item.serviceRequest.title} · {item.serviceRequest.status}</p>}{item.reason && <small>{item.reason}</small>}</article>)}</div> : !loading && <p className={styles.muted}>رویدادی برای نمایش وجود ندارد.</p>}{activity && (pageNumber > 1 || activity.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(n => Math.max(1, n - 1))}>صفحهٔ قبل</button><span>{pageNumber.toLocaleString("fa-IR")}</span><button type="button" disabled={loading || !activity.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(n => n + 1)}>صفحهٔ بعد</button></div>}</section>
      </>}
    </section>
  </main>;
}
