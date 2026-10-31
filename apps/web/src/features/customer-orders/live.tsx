"use client";

import "@fontsource-variable/vazirmatn";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { formatToman, parseCustomerOrder, parseCustomerOrderPage, type CustomerOrder, type CustomerShipment } from "../customer-checkout/data";
import styles from "./live.module.css";

const pageSize = 10;
function statusText(status: CustomerOrder["status"]) {
  return status === "reserved" ? "رزروشده" : status === "placed" ? "ثبت‌شده" : status === "cancelled" ? "لغوشده" : "منقضی‌شده";
}
function paymentText(status: CustomerOrder["paymentStatus"]) {
  return status === "paid" ? "پرداخت‌شده" : status === "reconciliation_required" ? "نیازمند بررسی پرداخت" : "پرداخت‌نشده";
}
function dateText(value: string) {
  return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
function HistoricalOrderImage({ orderId, productId, imageId, title }: { orderId: string; productId: string; imageId: string; title: string }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    void fetch(`/api/customer/orders/${orderId}/items/${productId}/images/${imageId}`, { cache: "no-store", signal: controller.signal })
      .then(async response => response.ok ? await response.json() as unknown : null)
      .then(value => { if (value && typeof value === "object" && "url" in value && typeof value.url === "string") setUrl(value.url); })
      .catch(() => {});
    return () => controller.abort();
  }, [imageId, orderId, productId]);
  return <div className={styles.historicalThumb}>{url ? <img src={url} alt={title} loading="lazy" /> : <span>تصویر کالا</span>}</div>;
}
function Header() {
  return <header className={styles.header}><Link href="/customer/products" className={styles.brand}><img src="/brand/negarin-logo.png" alt="" width="40" height="40" /><span><strong>خانه نگارین</strong><small>روایتگر هنر اصیل ایرانی</small></span></Link><nav><Link href="/customer/products">کشف آثار</Link><Link href="/customer/cart">سبد خرید</Link><Link href="/customer/orders">سفارش‌های من</Link></nav></header>;
}

export function CustomerOrdersLive() {
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<ReturnType<typeof parseCustomerOrderPage>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError("");
    void fetch(`/api/customer/orders?page=${pageNumber}&pageSize=${pageSize}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        if (response.status === 401) throw new Error("برای دیدن سفارش‌ها، ابتدا وارد حساب مشتری شوید.");
        if (!response.ok) throw new Error("فهرست سفارش‌ها دریافت نشد.");
        const value = parseCustomerOrderPage(await response.json(), pageNumber, pageSize);
        if (!value) throw new Error("پاسخ فهرست سفارش‌ها معتبر نیست.");
        setPage(value);
      }).catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با سرویس سفارش برقرار نشد."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [pageNumber]);
  return <main className={styles.page} dir="rtl" lang="fa-IR"><Header />
    <section className={styles.heading}><p>حساب مشتری</p><h1>سفارش‌های من</h1><span>وضعیت رزرو و پرداخت سفارش‌ها را ببینید.</span></section>
    {loading && <p className={styles.notice}>در حال دریافت سفارش‌ها…</p>}
    {error && <p className={styles.error} role="alert">{error}{error.includes("وارد حساب") && <span> ورود واقعی مشتری هنوز به این صفحه متصل نشده است.</span>}</p>}
    {!loading && !error && page?.items.length === 0 && <section className={styles.empty}><h2>هنوز سفارشی ثبت نشده است</h2><p>بعد از ثبت سفارش، وضعیت آن را از همین صفحه پیگیری کنید.</p><Link className={styles.primary} href="/customer/products">کشف آثار</Link></section>}
    {!loading && !error && !!page?.items.length && <section className={styles.list}>{page.items.map(order => <article className={styles.orderCard} key={order.id}>
      <div className={styles.orderTop}><div><small>شناسهٔ سفارش</small><bdi dir="ltr">{order.id}</bdi></div><span data-status={order.status}>{statusText(order.status)}</span></div>
      <div className={styles.orderMeta}><span>ثبت: {dateText(order.createdAt)}</span><span>پرداخت: {paymentText(order.paymentStatus)}</span><strong>{formatToman(order.subtotalToman)}</strong></div>
      {order.status === "reserved" && <p className={styles.expiry}>پایان مهلت رزرو: {dateText(order.reservedUntil)}</p>}
      <Link className={styles.detailLink} href={`/customer/order-detail?id=${order.id}`}>جزئیات سفارش <span aria-hidden="true">←</span></Link>
    </article>)}</section>}
    {page && (pageNumber > 1 || page.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی سفارش‌ها"><button disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(pageNumber)}</span><button disabled={loading || !page.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(value => value + 1)}>صفحهٔ بعد</button></nav>}
    <footer className={styles.footer}><Link href="/customer/products">بازگشت به فروشگاه</Link><span>نگارین · حساب مشتری</span></footer>
  </main>;
}

export function CustomerOrderDetailLive({ id }: { id: string }) {
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [issueForms, setIssueForms] = useState<Record<string, { kind: "not_received" | "damaged" | "wrong_items" | "missing_items"; description: string }>>({});
  async function refresh(signal?: AbortSignal) {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) { setError("شناسهٔ سفارش معتبر نیست."); setLoading(false); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/customer/orders/${id}`, { cache: "no-store", signal });
      if (response.status === 401) throw new Error("برای دیدن این سفارش، ابتدا وارد حساب مشتری شوید.");
      if (response.status === 404) throw new Error("این سفارش در حساب شما پیدا نشد.");
      if (!response.ok) throw new Error("جزئیات سفارش دریافت نشد.");
      const value = parseCustomerOrder(await response.json());
      if (!value) throw new Error("پاسخ جزئیات سفارش معتبر نیست.");
      setOrder(value);
    } catch (cause) { if (!signal?.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با سرویس سفارش برقرار نشد."); }
    finally { if (!signal?.aborted) setLoading(false); }
  }
  useEffect(() => { const controller = new AbortController(); void refresh(controller.signal); return () => controller.abort(); }, [id]);
  async function cancel() {
    if (!order || busy || order.status !== "reserved" || !window.confirm("رزرو این سفارش لغو شود و کالاها به موجودی برگردند؟")) return;
    setBusy("cancel"); setError("");
    try {
      const response = await fetch(`/api/customer/orders/${order.id}/cancel`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: order.version }) });
      if (response.status === 409) { await refresh(); setError("وضعیت سفارش تغییر کرده است؛ آخرین وضعیت را می‌بینید."); return; }
      if (response.status === 401) throw new Error("نشست مشتری معتبر نیست؛ دوباره وارد شوید.");
      if (!response.ok) throw new Error("لغو رزرو انجام نشد.");
      const value = parseCustomerOrder(await response.json());
      if (!value) throw new Error("پاسخ لغو سفارش معتبر نیست.");
      setOrder(value);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس سفارش برقرار نشد."); }
    finally { setBusy(""); }
  }
  async function shipmentCommand(shipment: CustomerShipment, kind: "receipt" | "issue", issue?: { kind: "not_received" | "damaged" | "wrong_items" | "missing_items"; description: string }) {
    if (!order || busy) return;
    const key = `${shipment.id}:${kind}`;
    setBusy(key); setError("");
    try {
      const response = await fetch(`/api/customer/orders/${order.id}/shipments/${shipment.id}/${kind === "receipt" ? "receipt" : "issues"}`, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify(kind === "receipt" ? { version: shipment.customerVersion } : { version: shipment.customerVersion, ...issue })
      });
      if (response.status === 409) { await refresh(); setError("وضعیت ارسال تغییر کرده است؛ اطلاعات تازه را بررسی کنید."); return; }
      if (response.status === 401) throw new Error("نشست مشتری معتبر نیست؛ دوباره وارد شوید.");
      if (!response.ok) throw new Error(kind === "receipt" ? "تأیید دریافت ثبت نشد." : "گزارش مشکل ثبت نشد.");
      const latest = await fetch(`/api/customer/orders/${order.id}`, { cache: "no-store" });
      if (!latest.ok) throw new Error("وضعیت به‌روزشدهٔ سفارش دریافت نشد.");
      const value = parseCustomerOrder(await latest.json());
      if (!value) throw new Error("پاسخ به‌روزرسانی سفارش معتبر نیست.");
      setOrder(value);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با سرویس ارسال برقرار نشد."); }
    finally { setBusy(""); }
  }
  function reportIssue(event: FormEvent<HTMLFormElement>, shipment: CustomerShipment) {
    event.preventDefault();
    const draft = issueForms[shipment.id] ?? { kind: "damaged" as const, description: "" };
    if (!draft.description.trim()) { setError("شرح مشکل را وارد کنید."); return; }
    void shipmentCommand(shipment, "issue", { ...draft, description: draft.description.trim() });
  }
  return <main className={styles.page} dir="rtl" lang="fa-IR"><Header />
    <section className={styles.heading}><p>حساب مشتری</p><h1>جزئیات سفارش</h1></section>
    {loading && <p className={styles.notice}>در حال دریافت جزئیات سفارش…</p>}
    {error && <p className={styles.error} role="alert">{error}{error.includes("وارد حساب") && <span> ورود واقعی مشتری هنوز به این صفحه متصل نشده است.</span>}<button onClick={() => void refresh()}>تلاش دوباره</button></p>}
    {!loading && !error && order && <article className={styles.orderDetail}>
      <div className={styles.orderTop}><div><small>شناسهٔ سفارش</small><bdi dir="ltr">{order.id}</bdi></div><span data-status={order.status}>{statusText(order.status)}</span></div>
      <div className={styles.orderMeta}><span>زمان ثبت: {dateText(order.createdAt)}</span><span>پرداخت: {paymentText(order.paymentStatus)}</span></div>
      {order.status === "reserved" && <p className={styles.expiry}>رزرو تا {dateText(order.reservedUntil)}</p>}
      <section><h2>اقلام سفارش</h2><div className={styles.itemList}>{order.items.map(item => <div className={styles.orderLine} key={item.productId}>{item.imageIds[0] && <HistoricalOrderImage orderId={order.id} productId={item.productId} imageId={item.imageIds[0]} title={item.title} />}<span>{item.title} × {new Intl.NumberFormat("fa-IR").format(item.quantity)}</span><strong>{formatToman(item.lineSubtotalToman)}</strong></div>)}</div><div className={styles.total}><span>جمع کالاها</span><strong>{formatToman(order.subtotalToman)}</strong></div></section>
      <section><h2>نشانی ثبت‌شده برای این سفارش</h2><p>{order.shippingAddress.recipientName} · {order.shippingAddress.recipientPhone}</p><p>{order.shippingAddress.province}، {order.shippingAddress.city}، {order.shippingAddress.fullAddress}</p><p>کد پستی: {order.shippingAddress.postalCode}</p><small>این snapshot سفارش است و با ویرایش دفتر نشانی تغییر نمی‌کند.</small></section>
      {order.status === "reserved" && order.paymentStatus === "unpaid" && <Link className={styles.paymentLink} href={`/customer/order-payment?id=${order.id}`}>وضعیت و اقدام پرداخت</Link>}
      {order.status === "placed" && <section className={styles.fulfillment}><h2>پیگیری ارسال</h2>{order.preparation.map((group, index) => <div className={styles.shipmentGroup} key={index}>
        <h3>ارسال بخش {new Intl.NumberFormat("fa-IR").format(index + 1)}</h3><p className={styles.groupItems}>{group.items.map(productId => order.items.find(item => item.productId === productId)?.title ?? "کالای سفارش").join("، ")}</p>
        {!group.shipment && <p className={styles.shipmentPending}>هنرمند هنوز گزارش ارسال این بخش را ثبت نکرده است.</p>}
        {group.shipment && <div className={styles.shipmentInfo}><p>وضعیت: ارسال توسط هنرمند گزارش شده</p><p>حمل‌کننده: {group.shipment.carrierName}</p><p>کد رهگیری: <bdi dir="ltr">{group.shipment.trackingCode}</bdi></p><small>این گزارش از شرکت حمل‌ونقل تأیید نشده است.</small>
          {group.shipment.receipt && <p className={styles.receiptDone}>دریافت را در {dateText(group.shipment.receipt.receivedAt)} تأیید کرده‌اید.</p>}
          {group.shipment.issue && <div className={styles.issueState}><strong>{group.shipment.issue.status === "open" ? "گزارش مشکل در حال بررسی است" : group.shipment.issue.status === "in_review" ? "گزارش مشکل بررسی می‌شود" : "بررسی گزارش مشکل بسته شده است"}</strong><p>{group.shipment.issue.description}</p>{group.shipment.issue.resolutionSummary && <small>{group.shipment.issue.resolutionSummary}</small>}</div>}
          {!group.shipment.receipt && (!group.shipment.issue || (group.shipment.issue.status === "closed" && group.shipment.issue.resolution === "customer_follow_up_complete")) && <button type="button" className={styles.receiptButton} disabled={busy !== ""} onClick={() => { if (window.confirm("دریافت این بخش از سفارش را تأیید می‌کنید؟")) void shipmentCommand(group.shipment!, "receipt"); }}>{busy === `${group.shipment.id}:receipt` ? "در حال ثبت…" : "تأیید دریافت سفارش"}</button>}
          {!group.shipment.issue && <form className={styles.issueForm} onSubmit={event => reportIssue(event, group.shipment!)}><label>گزارش مشکل<select value={(issueForms[group.shipment.id]?.kind ?? "damaged")} onChange={event => setIssueForms(current => ({ ...current, [group.shipment!.id]: { kind: event.target.value as "not_received" | "damaged" | "wrong_items" | "missing_items", description: current[group.shipment!.id]?.description ?? "" } }))}>{!group.shipment.receipt && <option value="not_received">سفارش به دستم نرسیده</option>}<option value="damaged">کالا آسیب‌دیده است</option><option value="wrong_items">کالای اشتباه دریافت کردم</option><option value="missing_items">کالا یا بخشی از سفارش کم است</option></select></label><label>شرح مشکل<textarea required maxLength={2000} rows={3} value={issueForms[group.shipment.id]?.description ?? ""} onChange={event => setIssueForms(current => ({ ...current, [group.shipment!.id]: { kind: current[group.shipment!.id]?.kind ?? "damaged", description: event.target.value } }))} /></label><button type="submit" className={styles.issueButton} disabled={busy !== ""}>{busy === `${group.shipment.id}:issue` ? "در حال ثبت…" : "ثبت گزارش مشکل"}</button></form>}
        </div>}
      </div>)}</section>}
      {order.status === "reserved" && order.paymentStatus === "unpaid" && <button className={styles.cancel} type="button" disabled={busy !== ""} onClick={() => void cancel()}>{busy === "cancel" ? "در حال لغو…" : "لغو رزرو"}</button>}
    </article>}
    <footer className={styles.footer}><Link href="/customer/orders">بازگشت به سفارش‌ها</Link><Link href="/customer/products">بازگشت به فروشگاه</Link></footer>
  </main>;
}
