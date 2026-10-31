"use client";

import "@fontsource-variable/vazirmatn";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatPaymentToman, parsePaymentAttempt, parsePaymentState, type PaymentState } from "./data";
import styles from "./live.module.css";

type StartCommand = { version: number; idempotencyKey: string; expectedPayableToman: string };
const paymentStatusText = (status: PaymentState["paymentStatus"]) => status === "paid" ? "پرداخت‌شده" : status === "reconciliation_required" ? "در انتظار بررسی مالی" : "پرداخت‌نشده";
const attemptStatusText = (status: string) => status === "initializing" ? "در حال شروع" : status === "pending" ? "در انتظار بررسی درگاه" : status === "succeeded" ? "موفق" : status === "failed" ? "ناموفق" : "نیازمند بررسی";
const dateText = (value: string) => new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export function CustomerOrderPaymentLive({ orderId }: { orderId: string }) {
  const [state, setState] = useState<PaymentState | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const pendingStart = useRef<StartCommand | null>(null);

  async function refresh(signal?: AbortSignal) {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)) { setError("شناسهٔ سفارش معتبر نیست."); setLoading(false); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/customer/orders/${orderId}/payment`, { cache: "no-store", signal });
      if (response.status === 401) throw new Error("برای مشاهدهٔ پرداخت، ابتدا وارد حساب مشتری شوید.");
      if (response.status === 404) throw new Error("سفارش در حساب شما پیدا نشد.");
      if (!response.ok) throw new Error("وضعیت پرداخت دریافت نشد.");
      const value = parsePaymentState(await response.json());
      if (!value) throw new Error("پاسخ وضعیت پرداخت معتبر نیست.");
      setState(value);
    } catch (cause) { if (!signal?.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با سرویس پرداخت برقرار نشد."); }
    finally { if (!signal?.aborted) setLoading(false); }
  }
  useEffect(() => { const controller = new AbortController(); void refresh(controller.signal); return () => controller.abort(); }, [orderId]);

  async function start() {
    if ((!state?.canStart && !pendingStart.current) || busyId) return;
    if (!pendingStart.current) {
      if (!state?.quote) return;
      pendingStart.current = { version: state.orderVersion, idempotencyKey: crypto.randomUUID(), expectedPayableToman: state.quote.payableToman };
    }
    setBusyId("start"); setError("");
    try {
      const response = await fetch(`/api/customer/orders/${orderId}/payment`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(pendingStart.current) });
      if (response.status === 503) throw new Error("نتیجهٔ شروع پرداخت نامشخص است؛ با همان کلید دوباره تلاش کنید.");
      if (response.status === 409) { pendingStart.current = null; await refresh(); throw new Error("وضعیت سفارش یا مبلغ نهایی تغییر کرده است؛ وضعیت تازه را بررسی کنید."); }
      if (response.status === 401) { pendingStart.current = null; throw new Error("نشست مشتری معتبر نیست؛ دوباره وارد شوید."); }
      if (!response.ok) { pendingStart.current = null; throw new Error("شروع پرداخت انجام نشد."); }
      const attempt = parsePaymentAttempt(await response.json());
      if (!attempt || attempt.orderId !== orderId) throw new Error("پاسخ تلاش پرداخت معتبر نیست؛ برای بازیابی، دوباره وضعیت را بخوانید.");
      pendingStart.current = null;
      await refresh();
    } catch (cause) { const message = cause instanceof Error ? cause.message : "ارتباط قطع شد؛ همان درخواست را دوباره ارسال کنید."; if (pendingStart.current) await refresh(); setError(message); }
    finally { setBusyId(""); }
  }

  async function verify(attemptId: string) {
    if (busyId) return;
    setBusyId(attemptId); setError("");
    try {
      const response = await fetch(`/api/customer/orders/${orderId}/payment/${attemptId}/verify`, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
      if (response.status === 503) throw new Error("پاسخ درگاه هنوز قطعی نیست؛ کمی بعد دوباره بررسی کنید.");
      if (!response.ok) throw new Error(response.status === 409 ? "این تلاش دیگر قابل بررسی نیست؛ آخرین وضعیت دریافت شد." : "بررسی سروری پرداخت انجام نشد.");
      const attempt = parsePaymentAttempt(await response.json());
      if (!attempt || attempt.id !== attemptId || attempt.orderId !== orderId) throw new Error("پاسخ بررسی پرداخت معتبر نیست.");
      await refresh();
    } catch (cause) { const message = cause instanceof Error ? cause.message : "ارتباط با درگاه برقرار نشد."; await refresh(); setError(message); }
    finally { setBusyId(""); }
  }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <header className={styles.header}><Link href="/customer/products" className={styles.brand}><img src="/brand/negarin-logo.png" alt="" width="40" height="40" /><span><strong>خانه نگارین</strong><small>روایتگر هنر اصیل ایرانی</small></span></Link><nav><Link href="/customer/orders">سفارش‌ها</Link><Link href="/customer/cart">سبد خرید</Link></nav></header>
    <section className={styles.heading}><p>حساب مشتری</p><h1>وضعیت پرداخت سفارش</h1><span>تأیید پرداخت فقط از پاسخ سرور و درگاه معتبر انجام می‌شود.</span></section>
    {loading && <p className={styles.notice}>در حال دریافت وضعیت پرداخت…</p>}
    {error && <p className={styles.error} role="alert">{error}{error.includes("وارد حساب") && <span> ورود واقعی مشتری هنوز به این صفحه متصل نشده است.</span>}<button type="button" onClick={() => void refresh()}>تازه‌سازی وضعیت</button></p>}
    {!loading && !error && state && <>
      <section className={styles.paymentCard}>
        <div className={styles.statusRow}><span>وضعیت سفارش</span><strong>{paymentStatusText(state.paymentStatus)}</strong></div>
        <div className={styles.statusRow}><span>درگاه پرداخت</span><strong>{state.enabled ? "فعال" : "هنوز پیکربندی نشده"}</strong></div>
        {state.quote ? <><div className={styles.statusRow}><span>هزینهٔ ارسال ثبت‌شده</span><strong>{formatPaymentToman(state.quote.shippingFeeToman)}</strong></div><div className={styles.statusRow}><span>مبلغ نهایی قابل پرداخت</span><strong>{formatPaymentToman(state.quote.payableToman)}</strong></div><small>اعتبار مبلغ تا {dateText(state.quote.expiresAt)}</small></> : <p className={styles.notice}>مبلغ نهایی و هزینهٔ ارسال هنوز توسط فرایند مالی ثبت نشده است؛ تا ثبت آن امکان پرداخت وجود ندارد.</p>}
        {(state.canStart || pendingStart.current) && <button className={styles.primary} type="button" disabled={busyId !== ""} onClick={() => void start()}>{busyId === "start" ? "در حال اتصال امن…" : pendingStart.current ? "تلاش دوباره با همان درخواست" : "رفتن به درگاه پرداخت"}</button>}
        {!state.enabled && <p className={styles.notice}>اتصال درگاه در محیط فعلی فعال نیست؛ سفارش شما پرداخت‌شده محسوب نمی‌شود.</p>}
        {state.paymentStatus === "paid" && <p className={styles.success}>پرداخت توسط سرور تأیید شده است. <Link href={`/customer/order-detail?id=${orderId}`}>مشاهدهٔ سفارش</Link></p>}
        {state.paymentStatus === "reconciliation_required" && <p className={styles.error}>پرداخت نیازمند بررسی مالی است؛ وضعیت سفارش در این صفحه تغییر نمی‌کند.</p>}
      </section>
      <section className={styles.attempts}><h2>تلاش‌های پرداخت</h2>
        {state.attempts.length === 0 && <p className={styles.notice}>برای این سفارش هنوز تلاش پرداختی ثبت نشده است.</p>}
        {state.attempts.map(attempt => <article className={styles.attempt} key={attempt.id}>
          <div><strong>{attemptStatusText(attempt.status)}</strong><small>{dateText(attempt.createdAt)}</small><small>{formatPaymentToman(attempt.amountToman)}</small></div>
          <div className={styles.attemptActions}>
            {attempt.redirectUrl && attempt.status === "pending" && <a className={styles.secondary} href={attempt.redirectUrl}>بازگشت به درگاه امن</a>}
            {attempt.status === "pending" && <button type="button" disabled={busyId !== ""} onClick={() => void verify(attempt.id)}>{busyId === attempt.id ? "در حال بررسی…" : "بررسی پرداخت از سرور"}</button>}
          </div>
        </article>)}
      </section>
    </>}
    <footer className={styles.footer}><Link href={`/customer/order-detail?id=${orderId}`}>بازگشت به جزئیات سفارش</Link><Link href="/customer/orders">سفارش‌های من</Link></footer>
  </main>;
}
