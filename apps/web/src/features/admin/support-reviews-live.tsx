"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./support-reviews-live.module.css";

type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
type Grant = { id: string };
type Review = { id: string; programId: string; programTitle: string; programSource: string; artistUserId: string; artistName: string; shortIntro: string; eligible: boolean; version: number; createdAt: string };
type Page = { page: number; pageSize: number; hasMore: boolean; items: Review[] };
const pageSize = 20;
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function uuid(value: unknown): value is string { return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value); }
function parsePage(value: unknown, page: number): Page | null {
  if (!record(value) || value.page !== page || value.pageSize !== pageSize || typeof value.hasMore !== "boolean" || !Array.isArray(value.items) || value.items.length > pageSize) return null;
  const items = value.items.map(item => {
    if (!record(item) || !uuid(item.id) || !uuid(item.programId) || !uuid(item.artistUserId) || typeof item.programTitle !== "string" || typeof item.programSource !== "string" || typeof item.eligible !== "boolean" || !Number.isSafeInteger(item.version) || typeof item.createdAt !== "string" || !record(item.artist) || typeof item.artist.storeName !== "string" || typeof item.artist.shortIntro !== "string") return null;
    return { id: item.id, programId: item.programId, programTitle: item.programTitle, programSource: item.programSource, artistUserId: item.artistUserId, artistName: item.artist.storeName, shortIntro: item.artist.shortIntro, eligible: item.eligible, version: item.version as number, createdAt: item.createdAt };
  });
  return items.some(item => item === null) ? null : { page, pageSize, hasMore: value.hasMore, items: items as Review[] };
}
function formatDate(value: string) { const date = new Date(value); return Number.isFinite(date.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(date) : "تاریخ نامشخص"; }

export function AdminSupportReviewsLive() {
  const [session, setSession] = useState<Session>("loading");
  const [grants, setGrants] = useState<Grant[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [view, setView] = useState<"pending" | "all">("pending");
  const [page, setPage] = useState<Page | null>(null);
  const [busyId, setBusyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [refresh, setRefresh] = useState(0);

  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try {
      const active = await fetch("/api/auth/context", { cache: "no-store" });
      if (active.ok) {
        const context: unknown = await active.json();
        if (!record(context) || typeof context.activeRole !== "string") { setSession("error"); return; }
        if (context.activeRole === "staff") { setSession("ready"); return; }
      } else if (active.status !== 401) { setSession("error"); return; }
      const response = await fetch("/api/auth/grants", { cache: "no-store" });
      if (response.status === 401) { setSession("signed-out"); return; }
      if (!response.ok) { setSession("error"); return; }
      const value: unknown = await response.json();
      if (!record(value) || !Array.isArray(value.grants)) { setSession("error"); return; }
      const staff = value.grants.filter((grant): grant is Grant => record(grant) && uuid(grant.id) && grant.role === "staff");
      setGrants(staff); setSession(staff.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);

  const loadQueue = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/admin/support-relationships?status=${view}&page=${pageNumber}&pageSize=${pageSize}`, { cache: "no-store" });
      if (response.status === 401) throw new Error("نشست کارشناسی معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("این صف به مجوز دامنهٔ هنرمندان نیاز دارد.");
      if (!response.ok) throw new Error("صف ارجاع‌های حمایتی دریافت نشد.");
      const next = parsePage(await response.json(), pageNumber);
      if (!next) throw new Error("ساختار صف ارجاع‌ها معتبر نیست.");
      setPage(next);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس ارجاع‌ها برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber, session, view]);
  useEffect(() => { void loadQueue(); }, [loadQueue, refresh]);

  async function approve(item: Review) {
    if (busyId) return;
    setBusyId(item.id); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/support-relationships/${item.id}/approve`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: item.version }) });
      if (response.status === 409) { setNotice("وضعیت ارجاع تغییر کرده بود؛ فهرست با آخرین داده‌ها تازه شد."); setRefresh(value => value + 1); return; }
      if (response.status === 401) throw new Error("نشست کارشناسی معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("مجوز دامنهٔ هنرمندان فعال نیست.");
      if (!response.ok) throw new Error("تأیید ارجاع ثبت نشد.");
      setNotice(`ارجاع «${item.artistName}» تأیید شد.`); setRefresh(value => value + 1);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای ثبت تأیید."); }
    finally { setBusyId(""); }
  }
  async function chooseGrant(id: string) {
    setSession("loading"); setError("");
    try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); }
    catch { setError("فعال‌سازی دسترسی کارشناسی انجام نشد."); setSession("error"); }
  }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a><nav aria-label="منوی مدیریت"><a href="/admin/product-reviews">بررسی محصولات</a><a href="/admin/shipment-issues">رسیدگی به مشکلات سفارش</a><a href="/admin/refund-reviews">بررسی مالی بازپرداخت</a><a href="/admin/domestic-finance">صورت‌وضعیت سفارش‌ها</a><a href="/admin/service-reviews">بازبینی تحویل خدمات</a><a href="/admin/support-reviews" aria-current="page">بازبینی ارجاع‌های حمایتی</a><a href="/admin/support-reports">گزارش حمایت‌ها</a><a href="/admin/support-programs">مدیریت برنامه‌های حمایتی</a><a href="/admin/support-allocations">تخصیص اعتبار حمایتی</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a href="/preview/admin">سایر بخش‌های پنل</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانهٔ نگارین / رشد و حمایت</p><h1>بازبینی ارجاع‌های حمایتی</h1><span>تأیید واجدشرایط‌بودن هنرمند برای استفاده از برنامهٔ حمایتی.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}
      {session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p className={styles.muted}>برای بازبینی ارجاع‌ها نشست کارشناسی لازم است.</p></section>}
      {session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p className={styles.muted}>این صفحه به نقش کارشناس و مجوز دامنهٔ هنرمندان نیاز دارد.</p></section>}
      {session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><p className={styles.muted}>مجوز دامنهٔ هنرمندان در سرور بررسی می‌شود.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی دسترسی کارشناسی</button>)}</div></section>}
      {session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button className={styles.approve} type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <section className={styles.panel}><div className={styles.toolbar}><div><h2>ارجاع سازمان‌ها</h2><p>تأییدشده‌ها امکان دریافت تخصیص اعتبار پیدا می‌کنند.</p></div><select aria-label="وضعیت ارجاع" value={view} onChange={event => { setView(event.target.value as "pending" | "all"); setPageNumber(1); }}><option value="pending">در انتظار تأیید</option><option value="all">همهٔ ارجاع‌ها</option></select></div>
        {error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{loading && <p className={styles.muted}>در حال دریافت ارجاع‌ها…</p>}
        {page && (page.items.length ? <div className={styles.rows}>{page.items.map(item => <article className={styles.row} key={item.id}><div className={styles.rowMain}><strong>{item.artistName}</strong><span>{item.programTitle} · {item.programSource === "supporting_organization" ? "برنامهٔ سازمان حمایتی" : "برنامهٔ نگارین"}</span>{item.shortIntro && <p>{item.shortIntro}</p>}<small>ثبت ارجاع: {formatDate(item.createdAt)} · نسخهٔ {item.version.toLocaleString("fa-IR")}</small></div><div className={styles.rowMeta}><span className={styles.status} data-approved={item.eligible}>{item.eligible ? "تأییدشده" : "در انتظار تأیید"}</span>{!item.eligible && <button className={styles.approve} type="button" disabled={busyId === item.id || !!busyId} onClick={() => void approve(item)}>{busyId === item.id ? "در حال ثبت…" : "تأیید هنرمند"}</button>}</div></article>)}</div> : !loading && <p className={styles.empty}>{view === "pending" ? "ارجاعی در انتظار بررسی نیست." : "هنوز ارجاعی ثبت نشده است."}</p>)}
        {page && (pageNumber > 1 || page.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(value => value - 1)}>صفحهٔ قبل</button><span>{pageNumber.toLocaleString("fa-IR")}</span><button type="button" disabled={loading || !page.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(value => value + 1)}>صفحهٔ بعد</button></div>}
      </section>}
    </section>
  </main>;
}
