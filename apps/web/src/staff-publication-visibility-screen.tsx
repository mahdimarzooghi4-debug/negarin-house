"use client";

import { useState } from "react";
import { Button, EmptyState } from "@negarin/ui";
import type { PublicationVisibilityItem } from "./artist-api";

type QueueState =
  | { kind: "ready"; items: PublicationVisibilityItem[] }
  | { kind: "connection-required" }
  | { kind: "unavailable" };

export function StaffPublicationVisibilityScreen({ initialState }: { initialState: QueueState }) {
  const [items, setItems] = useState(initialState.kind === "ready" ? initialState.items : []);
  const [connected, setConnected] = useState(initialState.kind === "ready");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function reload() {
    const response = await fetch("/api/staff/publication-reviews/visibility", { cache: "no-store" });
    if (response.status === 401 || response.status === 403) {
      setConnected(false);
      setItems([]);
      return;
    }
    if (!response.ok) throw new Error("دریافت فهرست انتشار انجام نشد.");
    setItems(await response.json() as PublicationVisibilityItem[]);
  }

  async function setVisibility(item: PublicationVisibilityItem, visible: boolean) {
    setPendingId(item.id);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`/api/staff/publication-reviews/${encodeURIComponent(item.id)}/visibility`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible }), cache: "no-store"
      });
      if (response.status === 409) {
        await reload();
        setError("وضعیت محصول تغییر کرده؛ فهرست به‌روز شد.");
        return;
      }
      if (response.status === 401 || response.status === 403) {
        setConnected(false);
        setItems([]);
        return;
      }
      if (!response.ok) {
        setError("ثبت وضعیت نمایش محصول انجام نشد.");
        return;
      }
      setItems((current) => current.map((product) => product.id === item.id
        ? { ...product, publicationStatus: visible ? "published" : "approved" }
        : product));
      setNotice(visible ? "محصول در کاتالوگ مشتری نمایش داده می‌شود." : "محصول از کاتالوگ مشتری پنهان شد.");
    } catch {
      setError("ارتباط با سرویس انتشار برقرار نشد.");
    } finally {
      setPendingId(null);
    }
  }

  if (!connected) {
    return <EmptyState title={initialState.kind === "connection-required" ? "دسترسی انتشار فعال نیست" : "فهرست انتشار در دسترس نیست"}
      description={initialState.kind === "connection-required" ? "پس از فعال‌شدن ورود کارکنان و دسترسی محصولات، کنترل انتشار در دسترس خواهد بود." : "سرویس انتشار پاسخ نمی‌دهد. کمی بعد دوباره تلاش کن."} />;
  }

  return (
    <section className="staff-review-queue" aria-labelledby="publication-visibility-title">
      <div className="staff-review-heading">
        <div><h2 id="publication-visibility-title">نمایش در کاتالوگ</h2><p>انتشار عمومی اقدام جداگانهٔ ادمین پس از تأیید محتواست.</p></div>
        <span className="staff-review-count">{new Intl.NumberFormat("fa-IR").format(items.length)} محصول</span>
      </div>
      {error && <p className="artist-products-error" role="alert">{error}</p>}
      {notice && <p className="staff-review-notice" role="status">{notice}</p>}
      {items.length === 0 ? <EmptyState title="محصول تأییدشده‌ای نیست" description="محصول‌های تأییدشده برای کنترل انتشار در اینجا نمایش داده می‌شوند." /> : (
        <div className="staff-review-list">
          {items.map((item) => (
            <article className="staff-review-card" key={item.id}>
              <div className="staff-review-card-heading"><div>
                <span className={`product-status product-status-${item.publicationStatus}`}>{item.publicationStatus === "published" ? "نمایش در کاتالوگ" : "تأییدشده؛ پنهان"}</span>
                <h3>{item.title}</h3>
              </div></div>
              {item.description && <p className="staff-review-description">{item.description}</p>}
              <div className="staff-review-actions">
                {item.publicationStatus === "approved" ? (
                  <Button disabled={pendingId !== null} onClick={() => void setVisibility(item, true)}>{pendingId === item.id ? "در حال ثبت…" : "انتشار در کاتالوگ"}</Button>
                ) : (
                  <Button variant="secondary" disabled={pendingId !== null} onClick={() => void setVisibility(item, false)}>{pendingId === item.id ? "در حال ثبت…" : "پنهان‌کردن از کاتالوگ"}</Button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
