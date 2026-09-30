"use client";

import { FormEvent, useState } from "react";
import { Button, EmptyState } from "@negarin/ui";

type InitialState = Awaited<ReturnType<typeof import("./artist-api").loadStaffServiceAssignmentOptions>>;

function emptyState(state: Exclude<InitialState, { kind: "ready" }>) {
  const messages = {
    "connection-required": ["ورود کارکنان فعال نیست", "پس از فعال‌شدن ورود امن کارکنان، امکان ثبت درخواست در دسترس قرار می‌گیرد."],
    "access-denied": ["دسترسی خدمات فعال نیست", "این صفحه فقط برای کارمند نگارین با مجوز خدمات در دسترس است."],
    unavailable: ["سرویس خدمات در دسترس نیست", "دریافت دسترسی خدمات انجام نشد. کمی بعد دوباره تلاش کن."]
  } as const;
  const [title, description] = messages[state.kind];
  return <EmptyState title={title} description={description} note="در این صفحه دادهٔ نمونه نمایش داده نمی‌شود." />;
}

export function StaffServiceRequestScreen({ initialState }: { initialState: InitialState }) {
  const [state, setState] = useState<InitialState>(initialState);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, summary: summary.trim() || null }),
        cache: "no-store"
      });
      if (response.status === 401) { setState({ kind: "connection-required" }); return; }
      if (response.status === 403) { setState({ kind: "access-denied" }); return; }
      if (!response.ok) {
        setError(response.status === 400 ? "عنوان درخواست را بررسی کن." : "ثبت درخواست انجام نشد.");
        return;
      }
      const result = await response.json() as { title?: string };
      setNotice(result.title ? `درخواست «${result.title}» ثبت شد و برای تخصیص آماده است.` : "درخواست ثبت شد و برای تخصیص آماده است.");
      setTitle("");
      setSummary("");
    } catch {
      setError("ارتباط با سرویس درخواست خدمت برقرار نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  if (state.kind !== "ready") return emptyState(state);

  return (
    <section className="staff-service-assignments" aria-labelledby="staff-service-requests-title">
      <div className="staff-service-assignments-heading">
        <div>
          <h2 id="staff-service-requests-title">ثبت درخواست خدمت</h2>
          <p>عنوان و شرحی ثبت کن که شریک خدماتی برای انجام درخواست باید ببیند.</p>
        </div>
      </div>
      {error && <p className="artist-products-error" role="alert">{error}</p>}
      {notice && <p className="staff-review-notice" role="status">{notice}</p>}
      <form className="staff-service-assignment-form" onSubmit={(event) => void submit(event)}>
        <label>
          <span>عنوان درخواست</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} required />
        </label>
        <label>
          <span>شرح برای شریک خدماتی</span>
          <textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={5} />
          <small>شرح اختیاری است؛ فقط اطلاعات لازم برای اجرای خدمت را وارد کن.</small>
        </label>
        <p className="staff-service-assignment-note">ثبت این درخواست آن را به شریک خدماتی تخصیص نمی‌دهد؛ تخصیص از بخش جداگانهٔ «تخصیص درخواست» انجام می‌شود.</p>
        <div className="staff-service-assignment-actions">
          <Button type="submit" disabled={submitting || !title.trim()}>
            {submitting ? "در حال ثبت…" : "ثبت درخواست"}
          </Button>
        </div>
      </form>
    </section>
  );
}
