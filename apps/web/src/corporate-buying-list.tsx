"use client";

import { useEffect, useState } from "react";

type PurchaseItem = {
  id: string; productTitle: string; quantity: number; unitPriceToman: string; totalToman: string;
  status: string; createdAt: string; note?: string | null;
  proposedUnitPriceToman?: string | null; proposalTotalToman?: string | null; proposalNote?: string | null;
};

const statusLabels: Record<string, string> = {
  submitted: "ثبت‌شده", in_review: "در حال بررسی", quoted: "پیشنهاد قیمت آماده است",
  declined: "ردشده", converted: "تبدیل به سفارش‌شده", awaiting_payment: "در انتظار پرداخت",
  paid: "پرداخت‌شده", processing: "در حال آماده‌سازی", shipped: "ارسال‌شده", delivered: "تحویل‌شده", cancelled: "لغوشده"
};

function money(value: string) {
  try { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; } catch { return "—"; }
}

export function CorporateBuyingList({ endpoint, kind }: { endpoint: string; kind: "orders" | "requests" }) {
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "sign-in" | "unavailable">("loading");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void fetch(endpoint, { cache: "no-store" }).then(async (response) => {
      if (!active) return;
      if (response.status === 401 || response.status === 403) { setState("sign-in"); return; }
      if (!response.ok) { setState("unavailable"); return; }
      const data = await response.json() as PurchaseItem[];
      setItems(data); setState("ready");
    }).catch(() => { if (active) setState("unavailable"); });
    return () => { active = false; };
  }, [endpoint]);

  async function cancelOrder(orderId: string) {
    setPendingId(orderId); setMessage(null);
    try {
      const response = await fetch(`/api/corporate-buyer/orders/${encodeURIComponent(orderId)}/cancel`, { method: "POST", cache: "no-store" });
      if (!response.ok) throw new Error("cancel-failed");
      const cancelled = await response.json() as PurchaseItem;
      setItems((current) => current.map((item) => item.id === cancelled.id ? cancelled : item));
      setMessage("سفارش لغو شد و موجودی به کاتالوگ برگشت.");
    } catch { setMessage("لغو سفارش انجام نشد؛ فهرست را تازه کن و دوباره تلاش کن."); }
    finally { setPendingId(null); }
  }

  async function answerProposal(requestId: string, answer: "accept" | "decline") {
    setPendingId(requestId); setMessage(null);
    try {
      const response = await fetch(`/api/corporate-buyer/purchase-requests/${encodeURIComponent(requestId)}/${answer}`, {
        method: "POST", cache: "no-store"
      });
      if (!response.ok) throw new Error("proposal-answer-failed");
      const result = await response.json() as { status: string; order?: PurchaseItem | null };
      setItems((current) => current.map((item) => item.id === requestId ? {
        ...item, status: result.status,
        ...(result.order ? { unitPriceToman: result.order.unitPriceToman, totalToman: result.order.totalToman } : {})
      } : item));
      setMessage(answer === "accept" ? "پیشنهاد پذیرفته شد و سفارش برای پرداخت ایجاد شد." : "پیشنهاد رد شد.");
    } catch {
      setMessage(answer === "accept" ? "پذیرش انجام نشد؛ ممکن است موجودی کافی نباشد. فهرست را تازه کن." : "رد پیشنهاد انجام نشد؛ صفحه را تازه کن و دوباره تلاش کن.");
    } finally { setPendingId(null); }
  }

  if (state === "loading") return <section className="catalog-empty" role="status">در حال دریافت اطلاعات…</section>;
  if (state === "sign-in") return <section className="catalog-empty" role="status">برای مشاهدهٔ این بخش با دسترسی خریدار سازمانی وارد شو.</section>;
  if (state === "unavailable") return <section className="catalog-empty" role="status">دریافت اطلاعات انجام نشد؛ بعداً دوباره تلاش کن.</section>;
  if (items.length === 0) return <section className="catalog-empty" role="status">
    <h2>{kind === "orders" ? "هنوز سفارشی ثبت نشده" : "هنوز درخواست خریدی ثبت نشده"}</h2>
    <p><a href="/customer">مشاهدهٔ کاتالوگ محصولات</a></p>
  </section>;

  return <div className="corporate-buying-list" dir="rtl">
    {items.map((item) => <article key={item.id} className="corporate-buying-list-card">
      <div><h2>{item.productTitle}</h2><span className="product-status">{statusLabels[item.status] ?? item.status}</span></div>
      <p>تعداد: {new Intl.NumberFormat("fa-IR").format(item.quantity)} عدد</p>
      {kind === "requests" && (item.status === "quoted" || item.status === "converted") && item.proposedUnitPriceToman
        ? <><p>قیمت هنگام ثبت درخواست: {money(item.unitPriceToman)}</p>
          <p>قیمت پیشنهادی فروشنده برای هر عدد: {money(item.proposedUnitPriceToman)}</p>
          <strong>جمع پیشنهاد: {money(item.proposalTotalToman ?? "0")}</strong></>
        : <><p>قیمت واحد: {money(item.unitPriceToman)}</p><strong>جمع: {money(item.totalToman)}</strong></>}
      {item.note && <p>توضیح: {item.note}</p>}
      {kind === "requests" && item.status === "quoted" && <>
        {item.proposalNote && <p>پیام فروشنده: {item.proposalNote}</p>}
        <div className="corporate-request-actions">
          <button type="button" disabled={pendingId !== null} onClick={() => void answerProposal(item.id, "accept")}>
            {pendingId === item.id ? "در حال ثبت…" : "پذیرش پیشنهاد و ساخت سفارش"}
          </button>
          <button type="button" className="corporate-order-cancel" disabled={pendingId !== null}
            onClick={() => void answerProposal(item.id, "decline")}>رد پیشنهاد</button>
        </div>
      </>}
      {kind === "requests" && item.status === "converted" && <p><a href="/corporate-buyer/orders">مشاهدهٔ سفارش و ادامهٔ پرداخت</a></p>}
      <small>{new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.createdAt))}</small>
      {kind === "orders" && item.status === "awaiting_payment" && <button type="button" className="corporate-order-cancel"
        disabled={pendingId !== null} onClick={() => void cancelOrder(item.id)}>{pendingId === item.id ? "در حال لغو…" : "لغو سفارش و آزادسازی موجودی"}</button>}
    </article>)}
    {message && <p className="catalog-empty" role="status">{message}</p>}
  </div>;
}
