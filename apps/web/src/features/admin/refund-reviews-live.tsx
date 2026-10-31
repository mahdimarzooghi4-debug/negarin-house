"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./product-review-live.module.css";

type Decision = "approved" | "rejected";
type Review = { issueVersion: number; decision: Decision; amountToman: string | null; reason: string; actorUserId: string; reviewedAt: string; executionStatus: "not_executed" };
type Case = { shipmentId: string; orderId: string; issueVersion: number; status: "closed"; resolution: "referred_for_refund_review"; kind: string; description: string; merchandiseSubtotalToman: string; reviews: Review[] };
type Grant = { id: string };
type SessionState = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
type Page = { page: number; pageSize: number; hasMore: boolean; items: Case[] };
const uuid = (v: unknown): v is string => typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
function record(v: unknown): v is Record<string, unknown> { return !!v && typeof v === "object" && !Array.isArray(v); }
function parseCase(v: unknown): Case | null {
  if (!record(v) || !uuid(v.shipmentId) || !uuid(v.orderId) || !Number.isSafeInteger(v.issueVersion) || v.status !== "closed" || v.resolution !== "referred_for_refund_review" || typeof v.kind !== "string" || typeof v.description !== "string" || typeof v.merchandiseSubtotalToman !== "string" || !/^(0|[1-9]\d*)$/.test(v.merchandiseSubtotalToman) || !Array.isArray(v.reviews)) return null;
  const reviews = v.reviews.map(review => record(review) && Number.isSafeInteger(review.issueVersion) && ["approved", "rejected"].includes(review.decision as string) && (review.amountToman === null || (typeof review.amountToman === "string" && /^(0|[1-9]\d*)$/.test(review.amountToman))) && typeof review.reason === "string" && uuid(review.actorUserId) && typeof review.reviewedAt === "string" && review.executionStatus === "not_executed" ? { issueVersion: review.issueVersion as number, decision: review.decision as Decision, amountToman: review.amountToman as string | null, reason: review.reason, actorUserId: review.actorUserId, reviewedAt: review.reviewedAt, executionStatus: "not_executed" as const } : null);
  if (reviews.some(review => review === null)) return null;
  return { shipmentId: v.shipmentId, orderId: v.orderId, issueVersion: v.issueVersion as number, status: "closed", resolution: "referred_for_refund_review", kind: v.kind, description: v.description, merchandiseSubtotalToman: v.merchandiseSubtotalToman, reviews: reviews as Review[] };
}
function money(value: string) { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
function date(value: string) { const parsed = new Date(value); return Number.isFinite(parsed.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(parsed) : "—"; }
function issueLabel(kind: string) { return ({ not_received: "به‌دست مشتری نرسیده", damaged: "کالای آسیب‌دیده", wrong_items: "کالای اشتباه", missing_items: "کالای ناقص" } as Record<string, string>)[kind] ?? kind; }
function asciiDigits(value: string) { return value.replace(/[۰-۹٠-٩]/g, digit => String(digit.charCodeAt(0) - (digit >= "۰" ? 1776 : 1632))); }

export function AdminRefundReviewsLive() {
  const [session, setSession] = useState<SessionState>("loading");
  const [grants, setGrants] = useState<Grant[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<Page | null>(null);
  const [selected, setSelected] = useState<Case | null>(null);
  const [decision, setDecision] = useState<Decision>("approved");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
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
      const grantsResponse = await fetch("/api/auth/grants", { cache: "no-store" });
      if (grantsResponse.status === 401) { setSession("signed-out"); return; }
      if (!grantsResponse.ok) { setSession("error"); return; }
      const body: unknown = await grantsResponse.json();
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
      const response = await fetch(`/api/admin/refund-reviews?page=${pageNumber}&pageSize=10`, { cache: "no-store" });
      if (response.status === 401) throw new Error("نشست معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("این صفحه به مجوز دامنهٔ مالی نیاز دارد.");
      if (!response.ok) throw new Error("صف پرونده‌های مالی دریافت نشد.");
      const raw: unknown = await response.json();
      if (!record(raw) || raw.page !== pageNumber || raw.pageSize !== 10 || typeof raw.hasMore !== "boolean" || !Array.isArray(raw.items)) throw new Error("ساختار صف پرونده‌ها معتبر نیست.");
      const items = raw.items.map(parseCase);
      if (items.some(item => !item)) throw new Error("اطلاعات پروندهٔ دریافتی معتبر نیست.");
      const next = { page: pageNumber, pageSize: 10, hasMore: raw.hasMore, items: items as Case[] };
      setPage(next); setSelected(previous => previous ? next.items.find(item => item.shipmentId === previous.shipmentId) ?? previous : null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس مالی برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber, session]);
  useEffect(() => { void loadQueue(); }, [loadQueue]);

  async function openCase(shipmentId: string) {
    setSelected(null); setError(""); setNotice(""); setLoading(true);
    try {
      const response = await fetch(`/api/admin/refund-reviews/${shipmentId}`, { cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 403 ? "مجوز دامنهٔ مالی فعال نیست." : "جزئیات پرونده دریافت نشد.");
      const item = parseCase(await response.json());
      if (!item) throw new Error("پاسخ پروندهٔ مالی معتبر نیست.");
      setSelected(item); setDecision("approved"); setAmount(""); setReason("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای دریافت پرونده."); }
    finally { setLoading(false); }
  }

  async function review() {
    if (!selected || busy) return;
    const exactAmount = amount.trim();
    if (!reason.trim()) { setError("دلیل تصمیم را وارد کنید."); return; }
    if (decision === "approved" && (!/^[1-9]\d{0,22}$/.test(exactAmount) || BigInt(exactAmount) > BigInt(selected.merchandiseSubtotalToman))) { setError("مبلغ باید عدد صحیح مثبت و حداکثر برابر با جمع کالای این بخش باشد."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const body = { issueVersion: selected.issueVersion, decision, reason: reason.trim(), ...(decision === "approved" ? { amountToman: exactAmount } : {}) };
      const response = await fetch(`/api/admin/refund-reviews/${selected.shipmentId}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      if (response.status === 409) { await openCase(selected.shipmentId); setNotice("وضعیت پرونده تغییر کرده است؛ آخرین نسخه بارگیری شد."); return; }
      if (response.status === 401) throw new Error("نشست معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("مجوز دامنهٔ مالی فعال نیست.");
      if (!response.ok) throw new Error("ثبت تصمیم مالی انجام نشد. وضعیت پرداخت و سقف مبلغ را بررسی کنید.");
      const item = parseCase(await response.json());
      if (!item) throw new Error("تصمیم ثبت شد اما پاسخ سرور معتبر نیست.");
      setSelected(item); setPage(current => current ? { ...current, items: current.items.map(row => row.shipmentId === item.shipmentId ? item : row) } : current);
      setAmount(""); setReason(""); setNotice(item.reviews.some(row => row.issueVersion === item.issueVersion) ? "تصمیم مالی ثبت شد؛ اجرای بازپرداخت در این سامانه انجام نشده است." : "تصمیم ثبت شد.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "خطای ثبت تصمیم."); }
    finally { setBusy(false); }
  }

  async function chooseGrant(id: string) {
    setSession("loading"); setError("");
    try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); }
    catch { setError("فعال‌سازی دسترسی کارشناسی انجام نشد."); setSession("error"); }
  }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }

  const currentDecision = selected?.reviews.find(item => item.issueVersion === selected.issueVersion);
  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a><nav aria-label="منوی مدیریت"><a href="/admin/product-reviews">بررسی محصولات</a><a href="/admin/shipment-issues">رسیدگی به مشکلات سفارش</a><a className={styles.active} href="/admin/refund-reviews">بررسی مالی بازپرداخت</a><a href="/admin/domestic-finance">صورت‌وضعیت سفارش‌ها</a><a href="/admin/service-reviews">بازبینی تحویل خدمات</a><a href="/admin/support-reviews">بازبینی ارجاع حمایتی</a><a href="/admin/support-reports">گزارش حمایت‌ها</a><a href="/admin/support-programs">مدیریت برنامه‌های حمایتی</a><a href="/admin/support-allocations">تخصیص اعتبار حمایتی</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a href="/preview/admin">سایر بخش‌های پنل</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / مالی</p><h1>بررسی درخواست‌های بازپرداخت</h1><span>تصمیم ثبت‌شده به‌معنی اجرای انتقال وجه نیست.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}
      {session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای بررسی مالی، نشست معتبر پنل را فعال کنید.</p></section>}
      {session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p>این صفحه به نقش کارشناس و مجوز دامنهٔ مالی نیاز دارد.</p></section>}
      {session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><p>مجوز دامنهٔ مالی در سرور بررسی می‌شود.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی دسترسی کارشناسی</button>)}</div></section>}
      {session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.columns}>
        <section className={styles.panel}><div className={styles.toolbar}><div><h2>ارجاع‌های مالی</h2><p>پرونده‌های بسته‌شده‌ای که پشتیبانی ارجاع داده است.</p></div><button type="button" disabled={loading} onClick={() => void loadQueue()}>تازه‌سازی</button></div>
          {error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{loading && <p className={styles.muted}>در حال دریافت پرونده‌ها…</p>}{!loading && !error && page?.items.length === 0 && <p className={styles.muted}>ارجاع مالی ثبت‌شده‌ای وجود ندارد.</p>}
          <div className={styles.queue}>{page?.items.map(item => { const decided = item.reviews.some(review => review.issueVersion === item.issueVersion); return <button type="button" key={item.shipmentId} className={styles.queueItem} aria-current={selected?.shipmentId === item.shipmentId ? "true" : undefined} onClick={() => void openCase(item.shipmentId)}><strong>{issueLabel(item.kind)}</strong><span>{item.description}</span><small>{decided ? "تصمیم ثبت شده" : "در انتظار تصمیم"} · نسخهٔ {item.issueVersion} · {money(item.merchandiseSubtotalToman)}</small></button>; })}</div>
          {page && (pageNumber > 1 || page.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(n => Math.max(1, n - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(pageNumber)}</span><button type="button" disabled={loading || !page.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(n => n + 1)}>صفحهٔ بعد</button></div>}
        </section>
        <section className={styles.panel}>{!selected && <p className={styles.muted}>پرونده‌ای را برای مشاهدهٔ ارجاع و سابقه انتخاب کنید.</p>}{selected && <>
          <div className={styles.toolbar}><div><h2>{issueLabel(selected.kind)}</h2><p>شناسهٔ سفارش <bdi dir="ltr">{selected.orderId}</bdi></p></div><span className={styles.status}>نسخهٔ مسئله {selected.issueVersion}</span></div>
          <section className={styles.content}><h3>گزارش مشتری</h3><p>{selected.description}</p><p>جمع کالای این بخش: <strong>{money(selected.merchandiseSubtotalToman)}</strong></p></section>
          <section className={styles.content}><h3>تصمیم‌های ثبت‌شده</h3>{selected.reviews.length ? <ol className={styles.history}>{selected.reviews.map((review, index) => <li key={`${review.issueVersion}-${index}`}><strong>نسخهٔ {review.issueVersion} · {review.decision === "approved" ? `تأیید · ${money(review.amountToman ?? "0")}` : "رد درخواست"}</strong><span>{date(review.reviewedAt)} · کارشناس <bdi dir="ltr">{review.actorUserId}</bdi></span><p>{review.reason}</p><small>وضعیت اجرا: انجام نشده</small></li>)}</ol> : <p className={styles.muted}>هنوز تصمیمی ثبت نشده است.</p>}</section>
          {currentDecision ? <p className={styles.notice}>برای نسخهٔ جاری تصمیم ثبت شده است. اجرای بازپرداخت در این سرویس انجام نشده است.</p> : <section className={styles.decision}><label htmlFor="finance-reason">دلیل تصمیم</label><textarea id="finance-reason" maxLength={2000} value={reason} onChange={event => setReason(event.target.value)} placeholder="مبنای تصمیم را ثبت کنید."/><label htmlFor="finance-decision">نتیجه</label><select id="finance-decision" value={decision} disabled={busy} onChange={event => setDecision(event.target.value as Decision)}><option value="approved">تأیید مبلغ بازپرداخت</option><option value="rejected">رد درخواست</option></select>{decision === "approved" && <label htmlFor="finance-amount">مبلغ به تومان<input id="finance-amount" inputMode="numeric" dir="ltr" value={amount} onChange={event => setAmount(asciiDigits(event.target.value).replace(/[^0-9]/g, ""))} placeholder="عدد صحیح، بدون جداکننده"/><small>سقف این بخش {money(selected.merchandiseSubtotalToman)} است. سرور پرداخت تأییدشده و سقف کل سفارش را نیز بررسی می‌کند.</small></label>}<div className={styles.actions}><button className={decision === "approved" ? styles.approve : styles.requestChanges} type="button" disabled={busy || !reason.trim() || (decision === "approved" && !amount.trim())} onClick={() => void review()}>{busy ? "در حال ثبت…" : decision === "approved" ? "ثبت تأیید مالی" : "ثبت رد درخواست"}</button></div><p>تأیید مالی فقط تصمیم و سقف مبلغ را ثبت می‌کند؛ پولی جابه‌جا نمی‌شود.</p></section>}
        </>}</section>
      </div>}
    </section>
  </main>;
}
