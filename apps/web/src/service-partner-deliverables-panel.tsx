"use client";

import { useState } from "react";
import type { ServicePartnerDeliverable } from "./artist-api";

type State =
  | { kind: "ready"; deliverables: ServicePartnerDeliverable[] }
  | { kind: "connection-required" | "access-denied" | "not-found" | "unavailable" };

const acceptedTypes = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const maxBytes = 10 * 1024 * 1024;

function formatBytes(bytes: number) {
  return new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(bytes / 1024) + " کیلوبایت";
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleString("fa-IR");
}

export function ServicePartnerDeliverablesPanel({ assignmentId, initialState }: { assignmentId: string; initialState: State }) {
  const [state, setState] = useState<State>(initialState);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function refresh() {
    const response = await fetch(`/api/service-partner/assignments/${encodeURIComponent(assignmentId)}/deliverables`, {
      cache: "no-store"
    });
    if (!response.ok) throw new Error("load-failed");
    const body = await response.json() as unknown;
    if (!Array.isArray(body)) throw new Error("invalid-response");
    setState({ kind: "ready", deliverables: body as ServicePartnerDeliverable[] });
  }

  async function upload(file: File) {
    setMessage("");
    if (!acceptedTypes.has(file.type)) {
      setMessage("فقط فایل PDF، JPEG، PNG یا WebP قابل بارگذاری است.");
      return;
    }
    if (file.size < 1 || file.size > maxBytes) {
      setMessage("اندازه فایل باید حداکثر ۱۰ مگابایت باشد.");
      return;
    }
    setBusy(true);
    try {
      const base = `/api/service-partner/assignments/${encodeURIComponent(assignmentId)}/deliverables`;
      const created = await fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, contentLength: file.size })
      });
      const metadata = await created.json() as { id?: unknown } | null;
      if (!created.ok || !metadata || typeof metadata.id !== "string") throw new Error("create-failed");
      const stored = await fetch(`${base}/${encodeURIComponent(metadata.id)}/upload`, {
        method: "PUT", headers: { "Content-Type": file.type }, body: file
      });
      if (!stored.ok) throw new Error("upload-failed");
      await refresh();
      setMessage("فایل تحویلی بارگذاری شد.");
    } catch {
      setMessage("بارگذاری کامل نشد. دوباره تلاش کن.");
    } finally {
      setBusy(false);
    }
  }

  async function submitForReview(deliverableId: string) {
    setMessage("");
    setBusy(true);
    try {
      const response = await fetch(
        `/api/service-partner/assignments/${encodeURIComponent(assignmentId)}/deliverables/${encodeURIComponent(deliverableId)}/submit`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("submit-failed");
      await refresh();
      setMessage("فایل برای بررسی نگارین ارسال شد.");
    } catch {
      setMessage("ارسال فایل انجام نشد. وضعیت را دوباره بررسی کن.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="service-partner-deliverables" aria-labelledby="service-partner-deliverables-title">
      <div className="service-partner-deliverables-heading">
        <div>
          <h3 id="service-partner-deliverables-title">فایل‌های تحویلی</h3>
          <p>فایل‌های مربوط به همین درخواست تخصیص‌یافته.</p>
        </div>
      </div>
      {state.kind !== "ready" ? (
        <p role="status">{state.kind === "connection-required"
          ? "برای بارگذاری فایل، ورود همکار خدمات لازم است."
          : state.kind === "access-denied" ? "دسترسی به این درخواست مجاز نیست."
            : state.kind === "not-found" ? "این درخواست در دسترس نیست."
              : "فهرست فایل‌ها در دسترس نیست."}</p>
      ) : (
        <>
          <label className="service-partner-deliverable-input">
            انتخاب فایل تحویلی
            <input
              type="file"
              accept="application/pdf,image/jpeg,image/png,image/webp"
              disabled={busy}
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) void upload(file);
                event.currentTarget.value = "";
              }}
            />
          </label>
          <p className="service-partner-deliverable-hint">PDF، JPEG، PNG یا WebP؛ حداکثر ۱۰ مگابایت.</p>
          {busy && <p role="status">در حال بارگذاری فایل…</p>}
          {message && <p role="status">{message}</p>}
          {state.deliverables.length === 0 ? (
            <p className="service-partner-deliverables-empty">هنوز فایلی برای این درخواست ثبت نشده است.</p>
          ) : (
            <ul className="service-partner-deliverables-list">
              {state.deliverables.map((item) => (
                <li key={item.id}>
                  <span>{item.fileName}</span>
                  <span>{formatBytes(item.contentLength)}</span>
                  <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                  {item.status === "ready" && item.readUrl
                    ? <a href={item.readUrl} target="_blank" rel="noreferrer">دریافت فایل</a>
                    : <span>در انتظار تکمیل آپلود</span>}
                  {item.status === "ready" && (item.submittedAt
                    ? <span>ارسال‌شده برای بررسی نگارین</span>
                    : <button type="button" disabled={busy} onClick={() => void submitForReview(item.id)}>
                        ارسال برای بررسی نگارین
                      </button>)}
                  {item.submittedAt && <time dateTime={item.submittedAt}>{formatDate(item.submittedAt)}</time>}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
