"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import styles from "./product-review-live.module.css";
import { parseCorporateOrder, type CorporateOrder } from "../corporate-buyer/live-data";

type Page = { page: number; pageSize: number; hasMore: boolean; items: CorporateOrder[] };
type Detail = CorporateOrder & { buyerOrganizationId: string; createdByUserId: string };
type Grant = { id: string };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const uuid = (v: unknown): v is string => typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
const date = (v: string) => { const d = new Date(v); return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(d) : "—"; };
const money = (v: string) => `${new Intl.NumberFormat("fa-IR").format(BigInt(v))} تومان`;
const status: Record<CorporateOrder["status"], string> = { awaiting_payment_setup: "نیازمند تکمیل مالی", awaiting_payment: "در انتظار پرداخت", payment_under_review: "در انتظار بررسی پرداخت", paid: "پرداخت‌شده", fulfilling: "در حال اجرا", completed: "تکمیل‌شده", cancelled: "لغوشده" };

export function AdminCorporateOrdersLive() {
  const [session, setSession] = useState<Session>("loading"), [grants, setGrants] = useState<Grant[]>([]);
  const [pageNo, setPageNo] = useState(1), [page, setPage] = useState<Page | null>(null), [selected, setSelected] = useState<Detail | null>(null);
  const [amount, setAmount] = useState(""), [due, setDue] = useState(""), [instructions, setInstructions] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [loading, setLoading] = useState(false), [working, setWorking] = useState(false), [error, setError] = useState(""), [notice, setNotice] = useState("");
  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try { const res = await fetch("/api/auth/context", { cache: "no-store" }); if (res.ok) { const ctx: unknown = await res.json(); if (!record(ctx) || typeof ctx.activeRole !== "string") throw new Error(); if (ctx.activeRole === "staff") { setSession("ready"); return; } } else if (res.status !== 401) throw new Error();
      const grantsRes = await fetch("/api/auth/grants", { cache: "no-store" }); if (grantsRes.status === 401) { setSession("signed-out"); return; } if (!grantsRes.ok) throw new Error(); const body: unknown = await grantsRes.json(); if (!record(body) || !Array.isArray(body.grants)) throw new Error(); const staff = body.grants.filter((g): g is Grant => record(g) && typeof g.id === "string" && g.role === "staff"); setGrants(staff); setSession(staff.length ? "choose" : "forbidden");
    } catch { setSession("error"); setError("نشست کاربری قابل بررسی نیست."); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);
  const loadPage = useCallback(async () => {
    if (session !== "ready") return; setLoading(true); setError("");
    try { const res = await fetch(`/api/admin/corporate/orders?page=${pageNo}&pageSize=20`, { cache: "no-store" }); if (res.status === 403) throw new Error("این بخش به مجوز دامنهٔ سفارش‌ها نیاز دارد."); if (!res.ok) throw new Error("فهرست سفارش‌های سازمانی دریافت نشد."); const body: unknown = await res.json();
      if (!record(body) || body.page !== pageNo || body.pageSize !== 20 || typeof body.hasMore !== "boolean" || !Array.isArray(body.items)) throw new Error("ساختار پاسخ سفارش‌ها معتبر نیست."); const rows = body.items.map(parseCorporateOrder); if (rows.some(row => !row)) throw new Error("اطلاعات سفارش معتبر نیست."); setPage({ page: pageNo, pageSize: 20, hasMore: body.hasMore, items: rows as CorporateOrder[] });
    } catch (e) { setError(e instanceof Error ? e.message : "خطا در دریافت سفارش‌ها."); } finally { setLoading(false); }
  }, [pageNo, session]);
  useEffect(() => { void loadPage(); }, [loadPage]);
  async function open(id: string) {
    setSelected(null); setLoading(true); setError(""); setNotice("");
    try { const res = await fetch(`/api/admin/corporate/orders/${id}`, { cache: "no-store" }); if (!res.ok) throw new Error("جزئیات سفارش دریافت نشد."); const body: unknown = await res.json(); const order = parseCorporateOrder(body); if (!order || !record(body) || !uuid(body.buyerOrganizationId) || !uuid(body.createdByUserId)) throw new Error("ساختار جزئیات سفارش معتبر نیست."); const detail = { ...order, buyerOrganizationId: body.buyerOrganizationId, createdByUserId: body.createdByUserId }; setSelected(detail); setAmount(order.paymentAmountToman ?? order.totalToman); setDue(order.paymentDueAt ? new Date(order.paymentDueAt).toISOString().slice(0, 16) : ""); setInstructions(order.paymentInstructions ?? ""); }
    catch (e) { setError(e instanceof Error ? e.message : "خطا در دریافت جزئیات."); } finally { setLoading(false); }
  }
  async function chooseGrant(id: string) { setSession("loading"); try { const res = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!res.ok) throw new Error(); setSession("ready"); } catch { setSession("error"); setError("فعال‌سازی دسترسی انجام نشد."); } }
  async function savePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!selected || selected.status !== "awaiting_payment_setup" || working) return;
    const normalizedAmount = amount.replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 1632));
    if (!/^[1-9]\d{0,18}$/.test(normalizedAmount) || !due || !instructions.trim()) { setError("مبلغ، مهلت و دستور پرداخت را کامل کنید."); return; }
    setWorking(true); setError(""); setNotice("");
    try { const res = await fetch(`/api/admin/corporate/orders/${selected.id}/payment-setup`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: selected.version, paymentAmountToman: normalizedAmount, paymentDueAt: new Date(due).toISOString(), paymentInstructions: instructions.trim() }) }); if (res.status === 409) throw new Error("سفارش تغییر کرده یا نشانی تحویل ثبت نشده؛ جزئیات را تازه کنید."); if (!res.ok) throw new Error("ثبت مبلغ و شرایط پرداخت انجام نشد."); const updated = parseCorporateOrder(await res.json()); if (!updated) throw new Error("پاسخ ثبت مالی معتبر نیست."); setSelected({ ...selected, ...updated }); setNotice("مبلغ و مهلت پرداخت ثبت شد؛ سفارش برای پرداخت آماده است."); await loadPage(); }
    catch (e) { setError(e instanceof Error ? e.message : "خطا در ثبت اطلاعات مالی."); } finally { setWorking(false); }
  }
  async function reviewPayment(decision: "verified" | "returned") {
    if (!selected || selected.status !== "payment_under_review" || working) return;
    if (decision === "returned" && !reviewMessage.trim()) { setError("برای بازگرداندن گزارش، علت را بنویسید."); return; }
    setWorking(true); setError(""); setNotice("");
    try { const res = await fetch(`/api/admin/corporate/orders/${selected.id}/payment-review`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: selected.version, decision, message: reviewMessage.trim() }) }); if (res.status === 409) throw new Error("گزارش تغییر کرده، مبلغ با صورتحساب تطابق ندارد یا موجودی کافی نیست؛ اطلاعات را تازه کنید و دوباره بررسی کنید."); if (!res.ok) throw new Error("تصمیم بررسی پرداخت ثبت نشد."); const updated = parseCorporateOrder(await res.json()); if (!updated) throw new Error("پاسخ بررسی پرداخت معتبر نیست."); setSelected({ ...selected, ...updated }); setReviewMessage(""); setNotice(decision === "verified" ? "پرداخت تأیید شد و سفارش پرداخت‌شده است." : "گزارش برای پیگیری بیشتر به خریدار بازگردانده شد."); await loadPage(); }
    catch (e) { setError(e instanceof Error ? e.message : "خطا در بررسی پرداخت."); } finally { setWorking(false); }
  }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }
  return <main className={styles.page} dir="rtl" lang="fa-IR"><aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a><nav aria-label="منوی مدیریت"><a href="/admin/product-reviews">بررسی محصولات</a><a href="/admin/domestic-finance">صورت‌وضعیت سفارش‌ها</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a className={styles.active} href="/admin/corporate-orders" aria-current="page">آماده‌سازی پرداخت سازمانی</a></nav><button className={styles.logout} onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / سفارش‌های سازمانی</p><h1>آماده‌سازی پرداخت سازمانی</h1><span>مبلغ نهایی و دستور پرداخت را پس از ثبت نشانی تحویل تعیین کنید.</span></div></header>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}{session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای مشاهدهٔ سفارش‌ها نشست کارشناسی لازم است.</p></section>}{session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p>این بخش به مجوز دامنهٔ سفارش‌ها نیاز دارد.</p></section>}{session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><div className={styles.grants}>{grants.map(g => <button key={g.id} onClick={() => void chooseGrant(g.id)}>فعال‌سازی دسترسی سفارش‌ها</button>)}</div></section>}{session === "error" && <section className={styles.panel}><p className={styles.error}>{error}</p><button onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <>{error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}<div className={styles.columns}><section className={styles.panel}><div className={styles.toolbar}><h2>سفارش‌ها</h2><button disabled={loading} onClick={() => void loadPage()}>تازه‌سازی</button></div>{loading && <p className={styles.muted}>در حال دریافت…</p>}{page?.items.map(row => <button className={styles.queueItem} key={row.id} onClick={() => void open(row.id)}><strong>{row.proposalSummary}</strong><span>{status[row.status]}</span><small>{date(row.createdAt)} · {money(row.totalToman)}</small><bdi dir="ltr">{row.id.slice(0, 8)}…</bdi></button>)}{page && <div className={styles.paging}><button disabled={loading || pageNo <= 1} onClick={() => setPageNo(n => Math.max(1, n - 1))}>قبل</button><span>{pageNo.toLocaleString("fa-IR")}</span><button disabled={loading || !page.hasMore || pageNo >= 1000} onClick={() => setPageNo(n => n + 1)}>بعد</button></div>}</section>
        <section className={styles.panel}>
          {!selected && <p className={styles.muted}>یک سفارش را انتخاب کنید.</p>}
          {selected && <>
            <div className={styles.toolbar}><h2>{selected.proposalSummary}</h2><span className={styles.status}>{status[selected.status]}</span></div>
            <dl className={styles.metrics}><div><dt>سازمان خریدار</dt><dd><bdi dir="ltr">{selected.buyerOrganizationId}</bdi></dd></div><div><dt>جمع پیشنهاد</dt><dd>{money(selected.totalToman)}</dd></div></dl>
            <h3>نشانی تحویل</h3>
            {selected.shippingAddress ? <section className={styles.details}><strong>{selected.shippingAddress.recipientName} · {selected.shippingAddress.recipientPhone}</strong><p>{selected.shippingAddress.province}، {selected.shippingAddress.city} · {selected.shippingAddress.postalCode}</p><p>{selected.shippingAddress.fullAddress}</p></section> : <p className={styles.notice}>تا ثبت نشانی خریدار، امکان آماده‌سازی پرداخت وجود ندارد.</p>}
            {selected.status === "awaiting_payment_setup" && <form className={styles.proposalForm} onSubmit={event => void savePayment(event)}>
              <h3>ثبت اطلاعات پرداخت</h3>
              <label>مبلغ نهایی (تومان)<input required inputMode="numeric" dir="ltr" maxLength={19} value={amount} onChange={e => setAmount(e.target.value)} /></label>
              <label>مهلت پرداخت<input required type="datetime-local" value={due} onChange={e => setDue(e.target.value)} /></label>
              <label>دستور و شرایط پرداخت<textarea required maxLength={2000} rows={4} value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="برای نمونه: شماره حساب یا روش هماهنگی پرداخت" /></label>
              <button type="submit" disabled={working || !selected.shippingAddress}>{working ? "در حال ثبت…" : "ثبت و آماده‌سازی برای پرداخت"}</button>
            </form>}
            {selected.paymentAmountToman && <section className={styles.details}><h3>اطلاعات پرداخت ثبت‌شده</h3><p>مبلغ: {money(selected.paymentAmountToman)}</p><p>مهلت: {selected.paymentDueAt ? date(selected.paymentDueAt) : "—"}</p><p>{selected.paymentInstructions}</p></section>}
            {selected.status === "payment_under_review" && <section className={styles.details}><h3>گزارش پرداخت خریدار</h3><p>مبلغ اعلام‌شده: {selected.paymentReportedAmountToman ? money(selected.paymentReportedAmountToman) : "—"}</p><p>مبلغ صورتحساب: {selected.paymentAmountToman ? money(selected.paymentAmountToman) : "—"}</p><p>شناسه پیگیری: <bdi dir="ltr">{selected.paymentReference}</bdi></p><p>زمان ثبت گزارش: {selected.paymentReportedAt ? date(selected.paymentReportedAt) : "—"}</p><p className={styles.notice}>شناسهٔ پیگیری را با گردش حساب بانکی تطبیق دهید؛ گزارش خریدار به‌تنهایی تأیید پرداخت نیست.</p><form className={styles.proposalForm} onSubmit={event => { event.preventDefault(); void reviewPayment("returned"); }}><label>علت بازگرداندن به خریدار<textarea required maxLength={1000} rows={3} value={reviewMessage} onChange={e => setReviewMessage(e.target.value)} /></label><div className={styles.actions}><button type="button" disabled={working || selected.paymentReportedAmountToman !== selected.paymentAmountToman} onClick={() => void reviewPayment("verified")}>{working ? "در حال ثبت…" : "تطبیق شد؛ تأیید پرداخت"}</button><button type="submit" disabled={working}>{working ? "در حال ثبت…" : "بازگرداندن برای پیگیری"}</button></div></form></section>}
          </>}
        </section></div></>}
    </section></main>;
}
