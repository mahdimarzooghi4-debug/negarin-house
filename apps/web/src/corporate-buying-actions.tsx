"use client";

import { useState } from "react";

type Props = { productId: string; availableQuantity: number };
type CreatedResult = { id: string; status: string };

export function CorporateBuyingActions({ productId, availableQuantity }: Props) {
  const [quantity, setQuantity] = useState("1");
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(kind: "orders" | "purchase-requests") {
    const parsedQuantity = Number(quantity);
    if (!Number.isSafeInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 1_000_000) {
      setError("تعداد را به‌صورت عددی بین ۱ تا ۱٬۰۰۰٬۰۰۰ وارد کن.");
      return;
    }
    if (kind === "orders" && parsedQuantity > availableQuantity) {
      setError("تعداد درخواستی از موجودی فعلی بیشتر است.");
      return;
    }
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/corporate-buyer/${kind}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: parsedQuantity, note: note.trim() || null }), cache: "no-store"
      });
      if (response.status === 401 || response.status === 403) {
        setError("برای این کار باید با دسترسی خریدار سازمانی وارد شده باشی.");
        return;
      }
      if (response.status === 409) {
        setError("موجودی تغییر کرده است؛ صفحه را تازه کن و دوباره تلاش کن.");
        return;
      }
      if (!response.ok) throw new Error("request-failed");
      const result = await response.json() as CreatedResult;
      setMessage(kind === "orders"
        ? `سفارش ${result.id.slice(0, 8)} ثبت شد. برای تکمیل پرداخت، جزئیات درگاه پس از اتصال نمایش داده می‌شود.`
        : `درخواست خرید ${result.id.slice(0, 8)} ثبت شد.`);
      if (kind === "orders") setQuantity("1");
    } catch {
      setError("ارتباط با سرویس خرید برقرار نشد؛ دوباره تلاش کن.");
    } finally {
      setPending(false);
    }
  }

  return <section className="corporate-buying-actions" aria-label="ثبت درخواست یا سفارش سازمانی" dir="rtl">
    <h3>خرید سازمانی</h3>
    <label className="product-form-field">
      <span>تعداد</span>
      <input type="number" min={1} max={1_000_000} step={1} value={quantity}
        onChange={(event) => setQuantity(event.target.value)} disabled={pending} />
    </label>
    <label className="product-form-field">
      <span>توضیح برای نگارین (اختیاری)</span>
      <textarea maxLength={5000} rows={3} value={note} onChange={(event) => setNote(event.target.value)} disabled={pending} />
    </label>
    <div className="corporate-buying-actions-buttons">
      <button type="button" disabled={pending} onClick={() => void submit("purchase-requests")}>ثبت درخواست خرید</button>
      <button type="button" disabled={pending || availableQuantity === 0} onClick={() => void submit("orders")}>
        {pending ? "در حال ثبت…" : "ثبت سفارش مستقیم"}
      </button>
    </div>
    <p className="corporate-buying-note">درخواست خرید موجودی را رزرو نمی‌کند. سفارش مستقیم موجودی را رزرو می‌کند؛ پرداخت آنلاین پس از اتصال درگاه تکمیل می‌شود.</p>
    {message && <p className="corporate-buying-success" role="status">{message}</p>}
    {error && <p className="artist-products-error" role="alert">{error}</p>}
  </section>;
}
