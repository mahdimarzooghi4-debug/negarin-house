"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, EmptyState } from "@negarin/ui";
import type { PublicationReviewItem } from "./artist-api";

type QueueState =
  | { kind: "ready"; items: PublicationReviewItem[] }
  | { kind: "connection-required" }
  | { kind: "unavailable" };

function submittedAt(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleString("fa-IR");
}

export function StaffReviewQueueScreen({ initialState }: { initialState: QueueState }) {
  const [items, setItems] = useState(initialState.kind === "ready" ? initialState.items : []);
  const [connected, setConnected] = useState(initialState.kind === "ready");
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function reload() {
    const response = await fetch("/api/staff/publication-reviews", { cache: "no-store" });
    if (response.status === 401 || response.status === 403) {
      setConnected(false);
      setItems([]);
      return;
    }
    if (!response.ok) throw new Error("دریافت صف بازبینی انجام نشد.");
    setItems(await response.json() as PublicationReviewItem[]);
  }

  async function decide(product: PublicationReviewItem, decision: "approved" | "changes_requested") {
    const note = feedback[product.id]?.trim() ?? "";
    if (decision === "changes_requested" && note.length === 0) {
      setError("برای درخواست اصلاح، توضیح لازم است.");
      return;
    }
    setPendingId(product.id);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/staff/publication-reviews/${encodeURIComponent(product.id)}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, ...(note ? { feedback: note } : {}) }),
        cache: "no-store"
      });
      if (response.status === 409) {
        await reload();
        setError("وضعیت این محصول تغییر کرده؛ صف بازبینی به‌روز شد.");
        return;
      }
      if (response.status === 401 || response.status === 403) {
        setConnected(false);
        setItems([]);
        return;
      }
      if (!response.ok) {
        setError(decision === "changes_requested" ? "ثبت درخواست اصلاح انجام نشد." : "ثبت نتیجهٔ بررسی انجام نشد.");
        return;
      }
      setItems((current) => current.filter((item) => item.id !== product.id));
      setFeedback((current) => { const next = { ...current }; delete next[product.id]; return next; });
      setNotice(decision === "approved" ? "تأیید محتوا ثبت شد." : "درخواست اصلاح ثبت شد و به تاریخچه افزوده شد.");
    } catch {
      setError("ارتباط با سرویس بازبینی برقرار نشد.");
    } finally {
      setPendingId(null);
    }
  }

  if (!connected) {
    return (
      <EmptyState
        title={initialState.kind === "connection-required" ? "دسترسی بررسی فعال نیست" : "صف بازبینی در دسترس نیست"}
        description={initialState.kind === "connection-required"
          ? "پس از فعال‌شدن ورود کارکنان و دسترسی محصولات، صف واقعی از سرویس دریافت می‌شود."
          : "سرویس بازبینی در حال حاضر پاسخ نمی‌دهد. کمی بعد دوباره تلاش کن."}
        note="قیمت هنرمند در صف بازبینی نمایش داده نمی‌شود."
      />
    );
  }

  return (
    <section className="staff-review-queue" aria-labelledby="staff-review-title">
      <div className="staff-review-heading">
        <div>
          <h2 id="staff-review-title">صف بازبینی</h2>
          <p>تصمیم این صف دربارهٔ محتوای انتشار است؛ قیمت را هنرمند تعیین می‌کند.</p>
        </div>
        <span className="staff-review-count">{new Intl.NumberFormat("fa-IR").format(items.length)} محصول</span>
      </div>
      {error && <p className="artist-products-error" role="alert">{error}</p>}
      {notice && <p className="staff-review-notice" role="status">{notice}</p>}
      {items.length === 0 ? (
        <EmptyState title="محصولی در صف نیست" description="محصول‌های ارسال‌شده برای بررسی، پس از دریافت از سرویس در این بخش دیده می‌شوند." />
      ) : (
        <div className="staff-review-list">
          {items.map((item) => (
            <article className="staff-review-card" key={item.id}>
              <div className="staff-review-card-heading">
                <div>
                  <span className="product-status product-status-under_review">در حال بررسی</span>
                  <h3>{item.title}</h3>
                </div>
                <time dateTime={item.createdAt}>ارسال: {submittedAt(item.createdAt)}</time>
              </div>
              {item.description && <p className="staff-review-description">{item.description}</p>}
              {item.media.length > 0 ? (
                <div className="staff-review-media" aria-label="تصویرهای محصول">
                  {item.media.map((media) => (
                    <a key={media.id} href={media.readUrl} target="_blank" rel="noreferrer" aria-label="بازکردن تصویر محصول">
                      <Image src={media.readUrl} alt="تصویر محصول" width={144} height={112} unoptimized />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="staff-review-no-media">برای این محصول تصویری در صف دریافت نشده است.</p>
              )}
              <label className="staff-review-feedback">
                <span>یادداشت بازبینی</span>
                <textarea
                  rows={3}
                  maxLength={5000}
                  value={feedback[item.id] ?? ""}
                  onChange={(event) => setFeedback((current) => ({ ...current, [item.id]: event.target.value }))}
                  placeholder="برای درخواست اصلاح، موارد لازم را روشن و مشخص بنویس."
                />
              </label>
              <div className="staff-review-actions">
                <Button disabled={pendingId !== null} onClick={() => void decide(item, "approved")}>
                  {pendingId === item.id ? "در حال ثبت…" : "تأیید محتوا"}
                </Button>
                <Button variant="secondary" disabled={pendingId !== null} onClick={() => void decide(item, "changes_requested")}>
                  درخواست اصلاح
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
