"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./live-finance.module.css";

type Position = {
  orderId: string; currency: "toman"; createdAt: string; paidAt: string | null; preparationStatus: string;
  customerReceiptConfirmed: boolean; merchandiseSubtotalToman: string; approvedRefundToman: string;
  remainingMerchandiseToman: string | null; reviewableForSettlementToman: string; commissionToman: string;
  shippingAllocationToman: string | null; recordedRefundExecutedToman: string; recordedSettledToman: string;
  settlementStatus: "blocked" | "awaiting_finance_review"; holds: string[];
  items: Array<{ productId: string; title: string; quantity: number; unitPriceToman: string }>;
};
type Page = { page: number; pageSize: number; hasMore: boolean; items: Position[]; pageTotals: { merchandiseSubtotalToman: string; approvedRefundToman: string; reviewableForSettlementToman: string } };
type Session = "loading" | "ready" | "choose" | "signed-out" | "forbidden" | "error";
type Grant = { id: string };
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function money(value: unknown): value is string { return typeof value === "string" && /^(0|[1-9]\d*)$/.test(value); }
function parsePosition(value: unknown): Position | null {
  if (!record(value) || !uuid(value.orderId) || value.currency !== "toman" || typeof value.createdAt !== "string" ||
      !(typeof value.paidAt === "string" || value.paidAt === null) || typeof value.preparationStatus !== "string" ||
      typeof value.customerReceiptConfirmed !== "boolean" || !money(value.merchandiseSubtotalToman) || !money(value.approvedRefundToman) ||
      !(money(value.remainingMerchandiseToman) || value.remainingMerchandiseToman === null) || !money(value.reviewableForSettlementToman) ||
      !money(value.commissionToman) || !(money(value.shippingAllocationToman) || value.shippingAllocationToman === null) ||
      !money(value.recordedRefundExecutedToman) || !money(value.recordedSettledToman) ||
      !["blocked", "awaiting_finance_review"].includes(String(value.settlementStatus)) || !Array.isArray(value.holds) || !value.holds.every(hold => typeof hold === "string") ||
      !Array.isArray(value.items) || !value.items.every(item => record(item) && uuid(item.productId) && typeof item.title === "string" && Number.isSafeInteger(item.quantity) && (item.quantity as number) > 0 && money(item.unitPriceToman))) return null;
  return value as unknown as Position;
}
function parsePage(value: unknown, page: number, pageSize: number): Page | null {
  if (!record(value) || value.page !== page || value.pageSize !== pageSize || typeof value.hasMore !== "boolean" || !Array.isArray(value.items)) return null;
  const items = value.items.map(parsePosition);
  if (items.some(item => !item) || !record(value.pageTotals) || !money(value.pageTotals.merchandiseSubtotalToman) || !money(value.pageTotals.approvedRefundToman) || !money(value.pageTotals.reviewableForSettlementToman)) return null;
  return { page, pageSize, hasMore: value.hasMore, items: items as Position[], pageTotals: value.pageTotals as Page["pageTotals"] };
}
function toman(value: string) { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
function date(value: string) { const parsed = new Date(value); return Number.isFinite(parsed.getTime()) ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(parsed) : "—"; }
const holdLabels: Record<string, string> = {
  order_not_paid: "سفارش پرداخت نشده است", payment_evidence_missing_or_inconsistent: "مدرک پرداخت ناقص یا ناسازگار است",
  customer_receipt_missing: "دریافت سفارش هنوز از سوی مشتری تأیید نشده است", shipment_issue_open: "پروندهٔ مشکل ارسال باز است",
  refund_review_pending: "بررسی بازپرداخت در انتظار تصمیم است", approved_refund_not_executed: "بازپرداخت تأییدشده هنوز اجرا نشده است",
  financial_records_inconsistent: "مبالغ مالی نیازمند بررسی است"
};
const prepLabels: Record<string, string> = { awaiting_acceptance: "در انتظار پذیرش", accepted: "پذیرفته‌شده", preparing: "در حال آماده‌سازی", packaging: "در حال بسته‌بندی", ready_for_dispatch: "آمادهٔ ارسال" };

export function ArtistFinanceLive() {
  const [session, setSession] = useState<Session>("loading"); const [grants, setGrants] = useState<Grant[]>([]);
  const [pageNumber, setPageNumber] = useState(1); const [page, setPage] = useState<Page | null>(null);
  const [selected, setSelected] = useState<Position | null>(null); const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadSession = useCallback(async () => {
    setSession("loading");
    try {
      const active = await fetch("/api/auth/context", { cache: "no-store" });
      if (active.ok) { const context: unknown = await active.json(); if (record(context) && context.activeRole === "artist") { setSession("ready"); return; } }
      else if (active.status !== 401) { setSession("error"); return; }
      const response = await fetch("/api/auth/grants", { cache: "no-store" });
      if (response.status === 401) { setSession("signed-out"); return; }
      if (!response.ok) { setSession("error"); return; }
      const body: unknown = await response.json(); if (!record(body) || !Array.isArray(body.grants)) { setSession("error"); return; }
      const artists = body.grants.filter((grant): grant is Grant => record(grant) && typeof grant.id === "string" && grant.role === "artist");
      setGrants(artists); setSession(artists.length ? "choose" : "forbidden");
    } catch { setSession("error"); }
  }, []);
  useEffect(() => { void loadSession(); }, [loadSession]);

  const loadPage = useCallback(async () => {
    if (session !== "ready") return;
    setLoading(true); setError("");
    try {
      const pageSize = 10; const response = await fetch(`/api/artist/finance/orders?page=${pageNumber}&pageSize=${pageSize}`, { cache: "no-store" });
      if (response.status === 401) throw new Error("نشست هنرمند معتبر نیست یا پایان یافته است.");
      if (response.status === 403) throw new Error("دسترسی مالی هنرمند فعال نیست.");
      if (!response.ok) throw new Error("صورت‌وضعیت مالی دریافت نشد.");
      const parsed = parsePage(await response.json(), pageNumber, pageSize);
      if (!parsed) throw new Error("ساختار صورت‌وضعیت مالی معتبر نیست.");
      setPage(parsed); setSelected(current => current ? parsed.items.find(item => item.orderId === current.orderId) ?? current : null);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس مالی برقرار نشد."); }
    finally { setLoading(false); }
  }, [pageNumber, session]);
  useEffect(() => { void loadPage(); }, [loadPage]);

  async function openOrder(orderId: string) {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/artist/finance/orders/${orderId}`, { cache: "no-store" });
      if (response.status === 404) throw new Error("این سفارش مالی برای حساب هنرمند شما پیدا نشد.");
      if (!response.ok) throw new Error("جزئیات صورت‌وضعیت دریافت نشد.");
      const position = parsePosition(await response.json()); if (!position) throw new Error("پاسخ جزئیات مالی معتبر نیست.");
      setSelected(position);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "جزئیات مالی دریافت نشد."); }
    finally { setLoading(false); }
  }
  async function chooseGrant(id: string) {
    setSession("loading");
    try { const response = await fetch("/api/auth/context", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ grantId: id }) }); if (!response.ok) throw new Error(); setSession("ready"); }
    catch { setError("فعال‌سازی حساب هنرمند انجام نشد."); setSession("error"); }
  }
  async function logout() { await fetch("/api/auth/session", { method: "DELETE" }); location.assign("/"); }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <aside className={styles.sidebar}><a className={styles.brand} href="/artist/storefront"><span>ن</span><strong>نگارین<small>پنل هنرمند</small></strong></a><nav aria-label="منوی هنرمند"><a href="/artist/storefront">فروشگاه من</a><a href="/artist/products">محصولات</a><a href="/artist/orders">سفارش‌ها</a><a href="/artist/corporate-orders">سفارش‌های سازمانی</a><a href="/artist/growth">رشد من</a><a href="/artist/services">خدمات</a><a className={styles.active} href="/artist/finance" aria-current="page">مالی</a><a href="/preview/artist">پیش‌نمایش سایر بخش‌ها</a></nav><button type="button" className={styles.logout} onClick={() => void logout()}>خروج امن</button></aside>
    <section className={styles.main}><header className={styles.header}><div><p>خانه نگارین / فروشگاه من</p><h1>صورت‌وضعیت مالی</h1><span>نمای مالی سفارش‌های حساب فعال؛ مبالغ پرداختی و تسویه‌شده فقط با مدرک معتبر گزارش می‌شوند.</span></div><span className={styles.badge}>اتصال زنده به API</span></header>
      <p className={styles.disclaimer}>این صفحه گزارش مالی است و تأیید دریافت مشتری را از پرداخت بانکی جدا می‌کند. مبلغ «قابل بررسی» به معنی درخواست یا انجام واریز نیست؛ ثبت تسویه هنوز در این سامانه فعال نشده است.</p>
      {session === "loading" && <section className={styles.panel}>در حال بررسی نشست امن…</section>}
      {session === "signed-out" && <section className={styles.panel}><h2>ورود لازم است</h2><p>برای مشاهدهٔ وضعیت مالی، نشست معتبر هنرمند لازم است.</p></section>}
      {session === "forbidden" && <section className={styles.panel}><h2>دسترسی هنرمند موجود نیست</h2><p>در نشست فعال حساب هنرمند در دسترس نیست.</p></section>}
      {session === "choose" && <section className={styles.panel}><h2>انتخاب حساب هنرمند</h2><p>برای مشاهدهٔ وضعیت مالی، حساب هنرمند را فعال کنید.</p><div className={styles.grants}>{grants.map(grant => <button key={grant.id} type="button" onClick={() => void chooseGrant(grant.id)}>فعال‌سازی حساب هنرمند</button>)}</div></section>}
      {session === "error" && <section className={styles.panel}><p className={styles.error} role="alert">{error || "نشست کاربری قابل بررسی نیست."}</p><button type="button" onClick={() => void loadSession()}>تلاش دوباره</button></section>}
      {session === "ready" && <div className={styles.columns}>
        <section className={styles.panel}><div className={styles.toolbar}><div><h2>سفارش‌ها</h2><p>مبالغ صفحهٔ جاری، جمع کل حساب نیستند.</p></div><button type="button" disabled={loading} onClick={() => void loadPage()}>تازه‌سازی</button></div>{error && <p className={styles.error} role="alert">{error}</p>}{loading && <p className={styles.muted}>در حال دریافت صورت‌وضعیت…</p>}{!loading && !error && page?.items.length === 0 && <p className={styles.muted}>سفارش مالی برای نمایش وجود ندارد.</p>}
          <div className={styles.orderList}>{page?.items.map(position => <button type="button" key={position.orderId} className={styles.orderCard} aria-current={selected?.orderId === position.orderId ? "true" : undefined} onClick={() => void openOrder(position.orderId)}><strong>{position.items.map(item => item.title).join("، ")}</strong><span>{position.settlementStatus === "blocked" ? "دارای مانع مالی" : "در انتظار بررسی مالی"}</span><small>{date(position.createdAt)} · {toman(position.merchandiseSubtotalToman)}</small></button>)}</div>
          {page && <section className={styles.totals}><h3>جمع همین صفحه</h3><p><span>فروش کالا</span><strong>{toman(page.pageTotals.merchandiseSubtotalToman)}</strong></p><p><span>بازپرداخت تأییدشده</span><strong>{toman(page.pageTotals.approvedRefundToman)}</strong></p><p><span>قابل بررسی پس از رفع موانع</span><strong>{toman(page.pageTotals.reviewableForSettlementToman)}</strong></p></section>}
          {page && (pageNumber > 1 || page.hasMore) && <div className={styles.pagination}><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(n => Math.max(1, n - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(pageNumber)}</span><button type="button" disabled={loading || !page.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(n => n + 1)}>صفحهٔ بعد</button></div>}
        </section>
        <section className={styles.panel}>{!selected && <p className={styles.muted}>برای دیدن اقلام و موانع مالی، یک سفارش را انتخاب کنید.</p>}{selected && <>
          <div className={styles.toolbar}><div><h2>جزئیات سفارش</h2><p><bdi dir="ltr">{selected.orderId}</bdi></p></div><span className={selected.settlementStatus === "blocked" ? styles.blocked : styles.status}>{selected.settlementStatus === "blocked" ? "دارای مانع" : "در انتظار بررسی مالی"}</span></div>
          <div className={styles.metrics}><div><span>مبلغ کالا</span><strong>{toman(selected.merchandiseSubtotalToman)}</strong></div><div><span>بازپرداخت تأییدشده</span><strong>{toman(selected.approvedRefundToman)}</strong></div><div><span>باقی‌ماندهٔ کالا</span><strong>{selected.remainingMerchandiseToman === null ? "نیازمند تطبیق" : toman(selected.remainingMerchandiseToman)}</strong></div><div><span>قابل بررسی برای تسویه</span><strong>{toman(selected.reviewableForSettlementToman)}</strong></div></div>
          <div className={styles.facts}><p>وضعیت آماده‌سازی: <strong>{prepLabels[selected.preparationStatus] ?? selected.preparationStatus}</strong></p><p>ثبت تأیید دریافت مشتری: <strong>{selected.customerReceiptConfirmed ? "بله" : "خیر"}</strong></p><p>وضعیت پرداخت سفارش: <strong>{selected.holds.includes("order_not_paid") ? "پرداخت ثبت نشده" : "پرداخت‌شده طبق سوابق سامانه"}</strong></p><p>تسویهٔ ثبت‌شده: <strong>{toman(selected.recordedSettledToman)}</strong></p><p>بازپرداخت اجراشده: <strong>{toman(selected.recordedRefundExecutedToman)}</strong></p></div>
          <section className={styles.items}><h3>اقلام این سفارش</h3><ul>{selected.items.map(item => <li key={item.productId}><span>{item.title} × {new Intl.NumberFormat("fa-IR").format(item.quantity)}</span><strong>{toman((BigInt(item.unitPriceToman) * BigInt(item.quantity)).toString())}</strong></li>)}</ul></section>
          {selected.holds.length > 0 ? <section className={styles.holds}><h3>موارد نیازمند رفع</h3><ul>{selected.holds.map(hold => <li key={hold}>{holdLabels[hold] ?? "وضعیت مالی نیازمند بررسی"}</li>)}</ul></section> : <p className={styles.clear}>مانع ثبت‌شده‌ای در این برآورد دیده نمی‌شود؛ تأیید نهایی و اجرای تسویه در گردش‌کار مالی انجام می‌شود.</p>}
          <p className={styles.muted}>کارمزد و سهم ارسال در این برآورد محاسبه نشده‌اند. این صفحه عملیات بانکی یا ثبت تسویه انجام نمی‌دهد.</p>
        </>}</section>
      </div>}
    </section>
  </main>;
}
