"use client";

import { useState } from "react";
import type { ArtistCorporatePurchaseRequest } from "./artist-api";

function money(value: string) {
  try { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; } catch { return "—"; }
}

const labels: Record<string, string> = {
  submitted: "در انتظار بررسی", in_review: "در حال بررسی", quoted: "پیشنهاد آماده است",
  declined: "ردشده", converted: "تبدیل‌شده به سفارش"
};

export function ArtistCorporatePurchaseRequests({ initialRequests }: { initialRequests: ArtistCorporatePurchaseRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [proposalNotes, setProposalNotes] = useState<Record<string, string>>({});

  async function review(id: string, status: "in_review" | "declined") {
    setPendingId(id); setMessage(null);
    try {
      const response = await fetch(`/api/artist/corporate-purchase-requests/${encodeURIComponent(id)}/review`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }), cache: "no-store"
      });
      if (!response.ok) throw new Error("review-failed");
      const result = await response.json() as { id: string; status: ArtistCorporatePurchaseRequest["status"] };
      setRequests((current) => current.map((item) => item.id === id ? {
        ...item, status: result.status,
        history: [...item.history, { status: result.status, createdAt: new Date().toISOString() }]
      } : item));
      setMessage(status === "in_review" ? "درخواست برای بررسی ثبت شد." : "درخواست رد شد.");
    } catch { setMessage("تغییر وضعیت انجام نشد؛ صفحه را تازه کن و دوباره تلاش کن."); }
    finally { setPendingId(null); }
  }

  async function propose(request: ArtistCorporatePurchaseRequest) {
    const unitPriceToman = prices[request.id] ?? request.unitPriceToman;
    setPendingId(request.id); setMessage(null);
    try {
      const response = await fetch(`/api/artist/corporate-purchase-requests/${encodeURIComponent(request.id)}/proposal`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitPriceToman, note: proposalNotes[request.id] ?? "" }), cache: "no-store"
      });
      if (!response.ok) throw new Error("proposal-failed");
      const proposalTotalToman = (BigInt(unitPriceToman) * BigInt(request.quantity)).toString();
      setRequests((current) => current.map((item) => item.id === request.id ? {
        ...item, status: "quoted", proposedUnitPriceToman: unitPriceToman,
        proposalTotalToman, proposalNote: proposalNotes[request.id]?.trim() || null,
        proposedAt: new Date().toISOString(),
        history: [...item.history, { status: "quoted", createdAt: new Date().toISOString(), proposedUnitPriceToman: unitPriceToman, proposalNote: proposalNotes[request.id]?.trim() || null }]
      } : item));
      setMessage("پیشنهاد برای خریدار ارسال شد.");
    } catch { setMessage("ارسال پیشنهاد انجام نشد؛ صفحه را تازه کن و دوباره تلاش کن."); }
    finally { setPendingId(null); }
  }

  if (!requests.length) return <section className="catalog-empty" role="status">
    <h2>درخواست خرید سازمانی ندارید</h2><p>درخواست‌های مربوط به محصولات منتشرشدهٔ شما اینجا نمایش داده می‌شوند.</p>
  </section>;

  return <div className="corporate-buying-list" dir="rtl">
    {requests.map((request) => <article key={request.id} className="corporate-buying-list-card">
      <div><h2>{request.productTitle}</h2><span className="product-status">{labels[request.status] ?? request.status}</span></div>
      <p>خریدار: {request.buyerOrganizationName}</p>
      <p>تعداد درخواستی: {new Intl.NumberFormat("fa-IR").format(request.quantity)} عدد</p>
      <p>قیمت فعلی هنگام ثبت: {money(request.unitPriceToman)}</p>
      <strong>جمع برآوردی: {money(request.totalToman)}</strong>
      {request.note && <p>توضیح خریدار: {request.note}</p>}
      <small>{new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(request.createdAt))}</small>
      {(request.status === "submitted" || request.status === "in_review") && <>
        {request.status === "submitted" && <button type="button" className="artist-request-start-review" disabled={pendingId !== null}
          onClick={() => void review(request.id, "in_review")}>{pendingId === request.id ? "در حال ثبت…" : "شروع بررسی"}</button>}
        <div className="corporate-request-proposal">
          <label>قیمت پیشنهادی هر عدد، تومان
            <input inputMode="numeric" dir="ltr" value={prices[request.id] ?? request.unitPriceToman}
              onChange={(event) => setPrices((current) => ({ ...current, [request.id]: event.target.value.replace(/\D/g, "") }))} />
          </label>
          <label>توضیح برای خریدار
            <textarea value={proposalNotes[request.id] ?? ""} maxLength={2000}
              onChange={(event) => setProposalNotes((current) => ({ ...current, [request.id]: event.target.value }))} />
          </label>
          <div className="corporate-request-actions">
            <button type="button" disabled={pendingId !== null || !(prices[request.id] ?? request.unitPriceToman)}
              onClick={() => void propose(request)}>{pendingId === request.id ? "در حال ارسال…" : "ارسال پیشنهاد قیمت"}</button>
            <button type="button" className="corporate-order-cancel" disabled={pendingId !== null}
              onClick={() => void review(request.id, "declined")}>رد درخواست</button>
          </div>
        </div>
      </>}
      {(request.status === "quoted" || request.status === "converted") && request.proposedUnitPriceToman && <section className="artist-request-quote">
        <strong>{request.status === "converted" ? "قیمت پیشنهاد پذیرفته‌شده" : "پیشنهاد ارسالی"}: {money(request.proposedUnitPriceToman)} برای هر عدد</strong>
        {request.proposalNote && <p>{request.proposalNote}</p>}
        <small>موجودی تا زمان پذیرش خریدار رزرو نمی‌شود.</small>
      </section>}
    </article>)}
    {message && <p className="catalog-empty" role="status">{message}</p>}
  </div>;
}
