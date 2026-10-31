"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./product-review-live.module.css";

type Status = "open" | "in_review" | "closed";
type Resolution = "customer_follow_up_complete" | "referred_for_refund_review";
type History = { version: number; fromStatus: Status | null; toStatus: Status; resolution: Resolution | null; summary: string; actorUserId: string; createdAt: string };
type Issue = { shipmentId: string; orderId: string; status: Status; version: number; kind: "not_received" | "damaged" | "wrong_items" | "missing_items"; description: string; reportedAt: string; resolution: Resolution | null; resolutionSummary: string | null; carrierName?: string; trackingCode?: string; history?: History[] };
type Grant = { id: string };
type SessionState = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
type Page = { page: number; pageSize: number; hasMore: boolean; items: Issue[] };
const statuses: Status[] = ["open", "in_review", "closed"];
const statusNames: Record<Status, string> = { open: "باز", in_review: "در حال بررسی", closed: "بسته‌شده" };
const kinds = { not_received: "به‌دست مشتری نرسیده", damaged: "آسیب‌دیده", wrong_items: "کالای اشتباه", missing_items: "کالا یا بخشی از سفارش کم است" };
const resolutions: Record<Resolution, string> = { customer_follow_up_complete: "پیگیری مشتری کامل شد", referred_for_refund_review: "ارجاع به بررسی مالی" };
const uuid = (v: unknown): v is string => typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
function record(v: unknown): v is Record<string, unknown> { return !!v && typeof v === "object" && !Array.isArray(v); }
function parseIssue(v: unknown, detail = false): Issue | null {
  if (!record(v) || !uuid(v.shipmentId) || !uuid(v.orderId) || !statuses.includes(v.status as Status) || !Number.isSafeInteger(v.version) || !["not_received", "damaged", "wrong_items", "missing_items"].includes(v.kind as string) || typeof v.description !== "string" || typeof v.reportedAt !== "string" || !(v.resolution === null || ["customer_follow_up_complete", "referred_for_refund_review"].includes(v.resolution as string)) || !(v.resolutionSummary === null || typeof v.resolutionSummary === "string")) return null;
  const result: Issue = { shipmentId: v.shipmentId, orderId: v.orderId, status: v.status as Status, version: v.version as number, kind: v.kind as Issue["kind"], description: v.description, reportedAt: v.reportedAt, resolution: v.resolution as Resolution | null, resolutionSummary: v.resolutionSummary as string | null };
  if (detail) {
    if (typeof v.carrierName !== "string" || typeof v.trackingCode !== "string" || !Array.isArray(v.history)) return null;
    const history = v.history.map(event => record(event) && Number.isSafeInteger(event.version) && (event.fromStatus === null || statuses.includes(event.fromStatus as Status)) && statuses.includes(event.toStatus as Status) && (event.resolution === null || ["customer_follow_up_complete", "referred_for_refund_review"].includes(event.resolution as string)) && typeof event.summary === "string" && uuid(event.actorUserId) && typeof event.createdAt === "string" ? { version: event.version as number, fromStatus: event.fromStatus as Status | null, toStatus: event.toStatus as Status, resolution: event.resolution as Resolution | null, summary: event.summary, actorUserId: event.actorUserId, createdAt: event.createdAt } : null);
    if (history.some(item => item === null)) return null;
    result.carrierName = v.carrierName; result.trackingCode = v.trackingCode; result.history = history as History[];
  }
  return result;
}
function date(value: string) { const parsed = new Date(value); return Number.isFinite(parsed.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(parsed) : "—"; }

export function AdminShipmentIssuesLive() {
  const [session, setSession] = useState<SessionState>("loading");
  const [grants, setGrants] = useState<Grant[]>([]);
  const [filter, setFilter] = useState<Status>("open");
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<Page | null>(null);
  const [selected, setSelected] = useState<Issue | null>(null);
  const [summary, setSummary] = useState("");
  const [resolution, setResolution] = useState<Resolution>("customer_follow_up_complete");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try {
      const response = await fetch("/api/auth/context", { cache: "no-store" });
      if (response.ok) {
        const context: unknown = await response.json();
        if (!record(context) || typeof context.activeRole !== "string") { setSession("error"); return; }
        if (context.activeRole === "staff") { setSession("ready"); return; }
      } else if (response.status !== 401) { setSession("error"); return; }
      const grantResponse = await fetch("/api/auth/grants", { cache: "no-store" });
      if (grantResponse.status === 401) { setSession("signed-out"); return; }
      if (!grantResponse.ok) { setSession("error"); return; }
      const body: unknown = await grantResponse.json();
      if (!record(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const staff = body.grants.filter((grant): grant is Grant => record(grant) && typeof grant.id === "string" && grant.role === "staff");
      setGrants(staff); setSession(staff.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);

  const loadQueue = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/admin/shipment-issues?status=${filter}&page=${pageNumber}&pageSize=10`, { cache: "no-store" });
      if (response.status === 401) throw new Error("نشست معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("این صفحه به مجوز دامنهٔ سفارش‌ها نیاز دارد.");
      if (!response.ok) throw new Error("صف گزارش‌های پشتیبانی دریافت نشد.");
      const value: unknown = await response.json();
      if (!record(value) || value.page !== pageNumber || value.pageSize !== 10 || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) throw new Error("ساختار صف گزارش‌ها معتبر نیست.");
      const items = value.items.map(item => parseIssue(item));
      if (items.some(item => !item)) throw new Error("اطلاعات صف گزارش‌ها معتبر نیست.");
      const next = { page: pageNumber, pageSize: 10, hasMore: value.hasMore, items: items as Issue[] };
      setPage(next); setSelected(previous => previous ? next.items.find(item => item.shipmentId === previous.shipmentId) ?? previous : null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس پشتیبانی برقرار نشد."); }
    finally { setLoading(false); }
  }, [filter, pageNumber, session]);
  useEffect(() => { void loadQueue(); }, [loadQueue]);

  async function openIssue(shipmentId: string) {
    setSelected(null); setError(""); setNotice(""); setSummary(""); setLoading(true);
    try {
      const response = await fetch(`/api/admin/shipment-issues/${shipmentId}`, { cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 403 ? "مجوز دامنهٔ سفارش‌ها فعال نیست." : "جزئیات گزارش دریافت نشد.");
      const issue = parseIssue(await response.json(), true);
      if (!issue) throw new Error("پاسخ جزئیات گزارش معتبر نیست.");
      setSelected(issue); setResolution("customer_follow_up_complete");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای دریافت گزارش."); }
    finally { setLoading(false); }
  }

  async function transition(status: "in_review" | "closed", outcome?: Resolution) {
    if (!selected || busy) return;
    if (!summary.trim()) { setError("یادداشت رسیدگی را وارد کنید."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/shipment-issues/${selected.shipmentId}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: selected.version, status, summary: summary.trim(), ...(status === "closed" ? { resolution: outcome } : {}) }) });
      if (response.status === 409) { await openIssue(selected.shipmentId); setNotice("وضعیت گزارش تغییر کرده است؛ آخرین نسخه بارگیری شد."); return; }
      if (response.status === 401) throw new Error("نشست معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("مجوز دامنهٔ سفارش‌ها فعال نیست.");
      if (!response.ok) throw new Error("ثبت وضعیت گزارش انجام نشد.");
      const issue = parseIssue(await response.json(), true);
      if (!issue) throw new Error("گزارش به‌روزرسانی شد اما پاسخ معتبر نیست.");
      setSelected(issue); setSummary(""); setNotice(status === "closed" ? "نتیجهٔ رسیدگی ثبت شد. این کار بازپرداخت یا تأیید تحویل انجام نمی‌دهد." : "گزارش به وضعیت در حال بررسی منتقل شد.");
      setPage(current => current ? { ...current, items: current.items.flatMap(item => item.shipmentId !== issue.shipmentId ? [item] : issue.status === filter ? [issue] : []) } : current);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای ثبت نتیجه."); }
    finally { setBusy(false); }
  }

  async function chooseGrant(id: string) {
    setSession("loading"); setError("");
    try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); }
    catch { setError("فعال‌سازی دسترسی کارشناسی انجام نشد."); setSession("error"); }
  }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a><nav aria-label="منوی مدیریت"><a href="/admin/product-reviews">بررسی محصولات</a><a className={styles.active} href="/admin/shipment-issues">رسیدگی به مشکلات سفارش</a><a href="/admin/refund-reviews">بررسی مالی بازپرداخت</a><a href="/admin/domestic-finance">صورت‌وضعیت سفارش‌ها</a><a href="/admin/service-reviews">بازبینی تحویل خدمات</a><a href="/admin/support-reviews">بازبینی ارجاع حمایتی</a><a href="/admin/support-reports">گزارش حمایت‌ها</a><a href="/admin/support-programs">مدیریت برنامه‌های حمایتی</a><a href="/admin/support-allocations">تخصیص اعتبار حمایتی</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a href="/preview/admin">سایر بخش‌های پنل</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / سفارش‌ها</p><h1>رسیدگی به گزارش‌های مشتری</h1><span>تصمیم رسیدگی، ثبت تحویل یا اجرای بازپرداخت را انجام نمی‌دهد.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}
      {session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای رسیدگی، نشست معتبر پنل را فعال کنید.</p></section>}
      {session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p>این صفحه به نقش کارشناس و مجوز دامنهٔ سفارش‌ها نیاز دارد.</p></section>}
      {session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><p>مجوز دامنهٔ سفارش‌ها در سرور بررسی می‌شود.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی دسترسی کارشناسی</button>)}</div></section>}
      {session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.columns}>
        <section className={styles.panel}><div className={styles.toolbar}><div><h2>صف گزارش‌ها</h2><p>قدیمی‌ترین گزارش‌ها ابتدا نمایش داده می‌شوند.</p></div><button type="button" disabled={loading} onClick={() => void loadQueue()}>تازه‌سازی</button></div>
          <label className={styles.filter}>وضعیت رسیدگی<select value={filter} disabled={loading} onChange={event => { setFilter(event.target.value as Status); setPageNumber(1); setSelected(null); }}><option value="open">باز</option><option value="in_review">در حال بررسی</option><option value="closed">بسته‌شده</option></select></label>
          {error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{loading && <p className={styles.muted}>در حال دریافت گزارش‌ها…</p>}{!loading && !error && page?.items.length === 0 && <p className={styles.muted}>گزارشی در این وضعیت پیدا نشد.</p>}
          <div className={styles.queue}>{page?.items.map(issue => <button key={issue.shipmentId} type="button" className={styles.queueItem} aria-current={selected?.shipmentId === issue.shipmentId ? "true" : undefined} onClick={() => void openIssue(issue.shipmentId)}><strong>{kinds[issue.kind]}</strong><span>{issue.description}</span><small>{statusNames[issue.status]} · {date(issue.reportedAt)}</small></button>)}</div>
          {page && (pageNumber > 1 || page.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(pageNumber)}</span><button type="button" disabled={loading || !page.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(value => value + 1)}>صفحهٔ بعد</button></div>}
        </section>
        <section className={styles.panel}>{!selected && <p className={styles.muted}>یک گزارش را برای مشاهدهٔ جزئیات و ثبت نتیجه انتخاب کنید.</p>}{selected && <>
          <div className={styles.toolbar}><div><h2>{kinds[selected.kind]}</h2><p>گزارش {date(selected.reportedAt)} · سفارش <bdi dir="ltr">{selected.orderId}</bdi></p></div><span className={styles.status}>{statusNames[selected.status]}</span></div>
          <section className={styles.content}><h3>شرح مشتری</h3><p>{selected.description}</p></section>
          <section className={styles.content}><h3>اطلاعات ارسال</h3><p>حمل‌کننده: {selected.carrierName}</p><p>کد رهگیری: <bdi dir="ltr">{selected.trackingCode}</bdi></p><p className={styles.muted}>این اطلاعات را هنرمند ثبت کرده و از شرکت حمل‌ونقل تأیید نشده است.</p></section>
          {selected.resolutionSummary && <section className={styles.content}><h3>نتیجهٔ فعلی</h3><p>{selected.resolution ? resolutions[selected.resolution] : "بدون نتیجهٔ ثبت‌شده"}: {selected.resolutionSummary}</p></section>}
          <section className={styles.content}><h3>تاریخچهٔ رسیدگی</h3>{selected.history?.length ? <ol className={styles.history}>{selected.history.map(event => <li key={event.version}><strong>{event.fromStatus ? statusNames[event.fromStatus] : "ثبت اولیه"} ← {statusNames[event.toStatus]}</strong><span>{date(event.createdAt)} · کارشناس <bdi dir="ltr">{event.actorUserId}</bdi></span><span>{event.summary}</span></li>)}</ol> : <p className={styles.muted}>تاریخچه‌ای ثبت نشده است.</p>}</section>
          {selected.status !== "closed" ? <section className={styles.decision}><label htmlFor="support-summary">یادداشت رسیدگی</label><textarea id="support-summary" maxLength={2000} value={summary} onChange={event => setSummary(event.target.value)} placeholder="اقدام یا نتیجهٔ پیگیری را ثبت کنید."/><div className={styles.actions}>{selected.status === "open" ? <button className={styles.approve} type="button" disabled={busy || !summary.trim()} onClick={() => void transition("in_review")}>{busy ? "در حال ثبت…" : "شروع بررسی"}</button> : <><select aria-label="نتیجهٔ بستن گزارش" value={resolution} onChange={event => setResolution(event.target.value as Resolution)}><option value="customer_follow_up_complete">پیگیری مشتری کامل شد</option><option value="referred_for_refund_review">ارجاع برای بررسی مالی</option></select><button className={styles.approve} type="button" disabled={busy || !summary.trim()} onClick={() => void transition("closed", resolution)}>{busy ? "در حال ثبت…" : "ثبت نتیجه و بستن"}</button></>}</div><p>بستن گزارش، دریافت کالا یا اجرای بازپرداخت را تأیید نمی‌کند.</p></section> : <section className={styles.decision}><label htmlFor="support-summary">یادداشت بازگشایی</label><textarea id="support-summary" maxLength={2000} value={summary} onChange={event => setSummary(event.target.value)} placeholder="دلیل ادامهٔ پیگیری را ثبت کنید."/><div className={styles.actions}><button className={styles.requestChanges} type="button" disabled={busy || !summary.trim()} onClick={() => void transition("in_review")}>{busy ? "در حال ثبت…" : "بازگشایی و ادامهٔ بررسی"}</button></div></section>}
        </>}</section>
      </div>}
    </section>
  </main>;
}
