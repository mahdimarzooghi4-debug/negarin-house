"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import styles from "./product-review-live.module.css";

type Position = {
  orderId: string; artistUserId: string; currency: "toman"; createdAt: string; paidAt: string | null; preparationStatus: string;
  customerReceiptConfirmed: boolean; merchandiseSubtotalToman: string; approvedRefundToman: string; remainingMerchandiseToman: string | null;
  reviewableForSettlementToman: string; commissionToman: string; shippingAllocationToman: string | null; recordedRefundExecutedToman: string;
  recordedSettledToman: string; settlementStatus: "blocked" | "awaiting_finance_review"; holds: string[];
  items: Array<{ productId: string; title: string; quantity: number; unitPriceToman: string }>;
};
type Page = { page: number; pageSize: number; hasMore: boolean; items: Position[]; pageTotals: { merchandiseSubtotalToman: string; approvedRefundToman: string; reviewableForSettlementToman: string } };
type Grant = { id: string };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function moneyValue(value: unknown): value is string { return typeof value === "string" && /^(0|[1-9]\d*)$/.test(value); }
function position(value: unknown): Position | null {
  if (!record(value) || !uuid(value.orderId) || !uuid(value.artistUserId) || value.currency !== "toman" || typeof value.createdAt !== "string" || !(typeof value.paidAt === "string" || value.paidAt === null) ||
      typeof value.preparationStatus !== "string" || typeof value.customerReceiptConfirmed !== "boolean" || !moneyValue(value.merchandiseSubtotalToman) || !moneyValue(value.approvedRefundToman) ||
      !(moneyValue(value.remainingMerchandiseToman) || value.remainingMerchandiseToman === null) || !moneyValue(value.reviewableForSettlementToman) || !moneyValue(value.commissionToman) ||
      !(moneyValue(value.shippingAllocationToman) || value.shippingAllocationToman === null) || !moneyValue(value.recordedRefundExecutedToman) || !moneyValue(value.recordedSettledToman) ||
      !["blocked", "awaiting_finance_review"].includes(String(value.settlementStatus)) || !Array.isArray(value.holds) || !value.holds.every(x => typeof x === "string") ||
      !Array.isArray(value.items) || !value.items.every(item => record(item) && uuid(item.productId) && typeof item.title === "string" && Number.isSafeInteger(item.quantity) && (item.quantity as number) > 0 && moneyValue(item.unitPriceToman))) return null;
  return value as unknown as Position;
}
function parsePage(value: unknown, page: number, pageSize: number): Page | null {
  if (!record(value) || value.page !== page || value.pageSize !== pageSize || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) return null;
  const items = value.items.map(position);
  if (items.some(row => !row) || !record(value.pageTotals) || !moneyValue(value.pageTotals.merchandiseSubtotalToman) || !moneyValue(value.pageTotals.approvedRefundToman) || !moneyValue(value.pageTotals.reviewableForSettlementToman)) return null;
  return { page, pageSize, hasMore: value.hasMore, items: items as Position[], pageTotals: value.pageTotals as Page["pageTotals"] };
}
function toman(value: string) { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
function date(value: string) { const d = new Date(value); return Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(d) : "—"; }
const holdText: Record<string, string> = { order_not_paid: "سفارش پرداخت نشده است", payment_evidence_missing_or_inconsistent: "مدرک پرداخت ناقص یا ناسازگار است", customer_receipt_missing: "تأیید دریافت مشتری ثبت نشده است", shipment_issue_open: "پروندهٔ مشکل ارسال باز است", refund_review_pending: "بررسی بازپرداخت در انتظار تصمیم است", approved_refund_not_executed: "بازپرداخت تأییدشده اجرا نشده است", financial_records_inconsistent: "سوابق مبالغ نیازمند تطبیق است" };
const prepText: Record<string, string> = { awaiting_acceptance: "در انتظار پذیرش", accepted: "پذیرفته‌شده", preparing: "در حال آماده‌سازی", packaging: "در حال بسته‌بندی", ready_for_dispatch: "آمادهٔ ارسال" };

export function AdminDomesticFinanceLive() {
  const [session, setSession] = useState<Session>("loading"); const [grants, setGrants] = useState<Grant[]>([]);
  const [pageNumber, setPageNumber] = useState(1); const [artistFilter, setArtistFilter] = useState(""); const [filterDraft, setFilterDraft] = useState("");
  const [page, setPage] = useState<Page | null>(null); const [selected, setSelected] = useState<Position | null>(null); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const loadSession = useCallback(async () => {
    setSession("loading"); setError("");
    try {
      const response = await fetch("/api/auth/context", { cache: "no-store" });
      if (response.ok) { const context: unknown = await response.json(); if (!record(context) || typeof context.activeRole !== "string") { setSession("error"); return; } if (context.activeRole === "staff") { setSession("ready"); return; } }
      else if (response.status !== 401) { setSession("error"); return; }
      const grantsResponse = await fetch("/api/auth/grants", { cache: "no-store" }); if (grantsResponse.status === 401) { setSession("signed-out"); return; } if (!grantsResponse.ok) { setSession("error"); return; }
      const body: unknown = await grantsResponse.json(); if (!record(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const staff = body.grants.filter((grant): grant is Grant => record(grant) && typeof grant.id === "string" && grant.role === "staff"); setGrants(staff); setSession(staff.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);
  const loadPage = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams({ page: String(pageNumber), pageSize: "10" }); if (artistFilter) params.set("artistUserId", artistFilter);
      const response = await fetch(`/api/admin/domestic-finance/orders?${params}`, { cache: "no-store" });
      if (response.status === 401) throw new Error("نشست کارشناسی معتبر نیست یا پایان یافته است."); if (response.status === 403) throw new Error("این صفحه به مجوز دامنهٔ مالی نیاز دارد."); if (!response.ok) throw new Error("صورت‌وضعیت مالی دریافت نشد.");
      const next = parsePage(await response.json(), pageNumber, 10); if (!next) throw new Error("ساختار صورت‌وضعیت مالی معتبر نیست."); setPage(next);
      setSelected(current => current ? next.items.find(item => item.orderId === current.orderId && item.artistUserId === current.artistUserId) ?? null : null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس مالی برقرار نشد."); }
    finally { setLoading(false); }
  }, [artistFilter, pageNumber, session]);
  useEffect(() => { void loadPage(); }, [loadPage]);
  async function openPosition(row: Position) {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/admin/domestic-finance/orders/${row.orderId}/artists/${row.artistUserId}`, { cache: "no-store" });
      if (response.status === 403) throw new Error("مجوز دامنهٔ مالی فعال نیست."); if (!response.ok) throw new Error("جزئیات موقعیت مالی دریافت نشد.");
      const value = position(await response.json()); if (!value || value.orderId !== row.orderId || value.artistUserId !== row.artistUserId) throw new Error("پاسخ موقعیت مالی معتبر نیست."); setSelected(value);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "جزئیات مالی دریافت نشد."); }
    finally { setLoading(false); }
  }
  function applyFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const normalized = filterDraft.trim(); if (normalized && !uuid(normalized)) { setError("شناسهٔ حساب هنرمند باید UUID معتبر باشد."); return; }
    setError(""); setSelected(null); setPageNumber(1); setArtistFilter(normalized);
  }
  async function chooseGrant(id: string) { setSession("loading"); setError(""); try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); } catch { setError("فعال‌سازی دسترسی کارشناسی انجام نشد."); setSession("error"); } }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }
  return <main className={styles.page} dir="rtl" lang="fa-IR"><aside className={styles.sidebar}><a className={styles.brand} href="/"><span className={styles.brandMark}>ن</span><strong>نگارین<small>مدیریت محتوا و بازار</small></strong></a><nav aria-label="منوی مدیریت"><a href="/admin/product-reviews">بررسی محصولات</a><a href="/admin/shipment-issues">رسیدگی به مشکلات سفارش</a><a href="/admin/refund-reviews">بررسی مالی بازپرداخت</a><a className={styles.active} href="/admin/domestic-finance" aria-current="page">صورت‌وضعیت سفارش‌ها</a><a href="/admin/service-reviews">بازبینی تحویل خدمات</a><a href="/admin/support-reviews">بازبینی ارجاع حمایتی</a><a href="/admin/support-reports">گزارش حمایت‌ها</a><a href="/admin/support-programs">مدیریت برنامه‌های حمایتی</a><a href="/admin/support-allocations">تخصیص اعتبار حمایتی</a><a href="/admin/corporate-purchase-requests">درخواست‌های خرید سازمانی</a><a href="/preview/admin">سایر بخش‌های پنل</a></nav><button className={styles.logout} type="button" onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / مالی</p><h1>صورت‌وضعیت مالی سفارش‌ها</h1><span>اطلاعات فقط برای بررسی است؛ هیچ تسویه یا انتقال وجهی ثبت نمی‌شود.</span></div><span className={styles.badge}>اتصال زنده به API</span></header><p className={styles.notice}>جمع‌ها فقط مربوط به سفارش‌های همین صفحه‌اند. مبلغ قابل بررسی پس از رفع موانع مالی است و جایگزین تأیید یا اجرای بانکی نیست.</p>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}{session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای این صفحه نشست معتبر کارشناسی لازم است.</p></section>}{session === "forbidden" && <section className={styles.panel}><h2>دسترسی کارشناسی موجود نیست</h2><p>این صفحه به نقش کارشناس و مجوز دامنهٔ مالی نیاز دارد.</p></section>}{session === "choose" && <section className={styles.panel}><h2>انتخاب دسترسی کارشناسی</h2><p>مجوز مالی در سرور بررسی می‌شود.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی دسترسی کارشناسی</button>)}</div></section>}{session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.columns}><section className={styles.panel}><div className={styles.toolbar}><div><h2>موقعیت‌های سفارش</h2><p>سفارش‌های ثبت‌شده با وضعیت مالی سامانه</p></div><button type="button" disabled={loading} onClick={() => void loadPage()}>تازه‌سازی</button></div><form className={styles.filter} onSubmit={applyFilter}><label>فیلتر حساب هنرمند با شناسه<input dir="ltr" value={filterDraft} onChange={event => setFilterDraft(event.target.value)} placeholder="اختیاری · UUID"/></label><button type="submit">اعمال</button>{artistFilter && <button type="button" onClick={() => { setFilterDraft(""); setArtistFilter(""); setPageNumber(1); setSelected(null); }}>پاک‌کردن</button>}</form>{error && <p className={styles.error} role="alert">{error}</p>}{loading && <p className={styles.muted}>در حال دریافت موقعیت‌ها…</p>}{!loading && !error && page?.items.length === 0 && <p className={styles.muted}>موقعیت مالی برای نمایش وجود ندارد.</p>}<div className={styles.queue}>{page?.items.map(row => <button type="button" key={`${row.orderId}-${row.artistUserId}`} className={styles.queueItem} aria-current={selected?.orderId === row.orderId && selected.artistUserId === row.artistUserId ? "true" : undefined} onClick={() => void openPosition(row)}><strong>{row.items.map(item => item.title).join("، ")}</strong><span>هنرمند <bdi dir="ltr">{row.artistUserId.slice(0, 8)}…</bdi> · {row.settlementStatus === "blocked" ? "دارای مانع" : "در انتظار بررسی"}</span><small>{date(row.createdAt)} · {toman(row.merchandiseSubtotalToman)}</small></button>)}</div>{page && <div className={styles.totals}><strong>جمع همین صفحه</strong><span>فروش کالا: {toman(page.pageTotals.merchandiseSubtotalToman)}</span><span>بازپرداخت مصوب: {toman(page.pageTotals.approvedRefundToman)}</span><span>قابل بررسی: {toman(page.pageTotals.reviewableForSettlementToman)}</span></div>}{page && (pageNumber > 1 || page.hasMore) && <div className={styles.paging}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(n => Math.max(1, n - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(pageNumber)}</span><button type="button" disabled={loading || !page.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(n => n + 1)}>صفحهٔ بعد</button></div>}</section>
        <section className={styles.panel}>{!selected && <p className={styles.muted}>یک موقعیت مالی را برای مشاهدهٔ جزئیات انتخاب کنید.</p>}{selected && <><div className={styles.toolbar}><div><h2>جزئیات موقعیت</h2><p>سفارش <bdi dir="ltr">{selected.orderId}</bdi></p></div><span className={selected.settlementStatus === "blocked" ? styles.statusBlocked : styles.status}>{selected.settlementStatus === "blocked" ? "دارای مانع" : "در انتظار بررسی مالی"}</span></div><dl className={styles.metrics}><div><dt>هنرمند</dt><dd><bdi dir="ltr">{selected.artistUserId}</bdi></dd></div><div><dt>فروش کالا</dt><dd>{toman(selected.merchandiseSubtotalToman)}</dd></div><div><dt>بازپرداخت مصوب</dt><dd>{toman(selected.approvedRefundToman)}</dd></div><div><dt>باقی‌مانده</dt><dd>{selected.remainingMerchandiseToman === null ? "نیازمند تطبیق" : toman(selected.remainingMerchandiseToman)}</dd></div><div><dt>قابل بررسی</dt><dd>{toman(selected.reviewableForSettlementToman)}</dd></div><div><dt>تسویهٔ ثبت‌شده</dt><dd>{toman(selected.recordedSettledToman)}</dd></div><div><dt>بازپرداخت اجراشده</dt><dd>{toman(selected.recordedRefundExecutedToman)}</dd></div><div><dt>وضعیت آماده‌سازی</dt><dd>{prepText[selected.preparationStatus] ?? selected.preparationStatus}</dd></div><div><dt>دریافت مشتری تأیید شده</dt><dd>{selected.customerReceiptConfirmed ? "بله" : "خیر"}</dd></div></dl><section className={styles.details}><h3>اقلام سفارش</h3><ul>{selected.items.map(item => <li key={item.productId}><span>{item.title} × {item.quantity}</span><strong>{toman((BigInt(item.unitPriceToman) * BigInt(item.quantity)).toString())}</strong></li>)}</ul></section>{selected.holds.length > 0 ? <section className={styles.holds}><h3>علت توقف</h3><ul>{selected.holds.map(hold => <li key={hold}>{holdText[hold] ?? "نیازمند بررسی مالی"}</li>)}</ul></section> : <p className={styles.notice}>مانع ثبت‌شده‌ای در برآورد جاری نیست. این مورد همچنان جایگزین تأیید و اجرای تسویه نیست.</p>}<p className={styles.muted}>کارمزد و سهم ارسال محاسبه نشده‌اند؛ هیچ عملیات مالی در این صفحه انجام نمی‌شود.</p></>}</section></div>}
    </section></main>;
}
