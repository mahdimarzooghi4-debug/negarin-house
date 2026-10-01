"use client";

import { useState, type FormEvent } from "react";
import { Button, EmptyState } from "@negarin/ui";
import type { ArtistServiceRequest, loadArtistServiceRequests } from "./artist-api";

type InitialState = Awaited<ReturnType<typeof loadArtistServiceRequests>>;

function displayDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleString("fa-IR");
}

function unavailable(state: Exclude<InitialState, { kind: "ready" }>) {
  const message = {
    "connection-required": ["اتصال حساب هنرمند فعال نیست", "پس از فعال‌شدن ورود امن هنرمندان، ثبت و پیگیری درخواست خدمت در دسترس خواهد بود."],
    "access-denied": ["دسترسی هنرمند لازم است", "این صفحه فقط در context فعال هنرمند در دسترس است."],
    unavailable: ["خدمات در دسترس نیست", "دریافت درخواست‌های شما انجام نشد. کمی بعد دوباره تلاش کنید."]
  } as const;
  return <EmptyState title={message[state.kind][0]} description={message[state.kind][1]} note="در این صفحه دادهٔ نمونه نمایش داده نمی‌شود." />;
}

export function ArtistServiceRequestsScreen({ initialState }: { initialState: InitialState }) {
  const [state, setState] = useState<InitialState>(initialState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !title.trim()) return;
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/artist/service-requests", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: description.trim() || null }), cache: "no-store"
      });
      if (response.status === 401) { setState({ kind: "connection-required" }); return; }
      if (response.status === 403) { setState({ kind: "access-denied" }); return; }
      if (!response.ok) {
        setError(response.status === 400 ? "عنوان یا شرح درخواست را بررسی کنید." : "ثبت درخواست انجام نشد.");
        return;
      }
      const created = await response.json() as ArtistServiceRequest;
      setState((current) => current.kind === "ready" ? { kind: "ready", requests: [created, ...current.requests] } : current);
      setTitle("");
      setDescription("");
      setNotice("درخواست ثبت شد و برای تخصیص به ادمین ارسال شد.");
    } catch {
      setError("ارتباط با سرویس درخواست خدمت برقرار نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  if (state.kind !== "ready") return unavailable(state);

  return <section className="artist-service-requests" aria-labelledby="artist-service-requests-title">
    <div className="staff-review-heading"><div><h2 id="artist-service-requests-title">درخواست خدمات</h2>
      <p>نیاز خود را ثبت کنید تا ادمین آن را بررسی و در صورت نیاز به شریک خدماتی تخصیص دهد.</p></div></div>
    {error && <p className="artist-products-error" role="alert">{error}</p>}
    {notice && <p className="staff-review-notice" role="status">{notice}</p>}
    <form className="staff-service-assignment-form" onSubmit={(event) => void submit(event)}>
      <label><span>عنوان درخواست</span><input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200} required /></label>
      <label><span>شرح درخواست</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={5000} rows={5} />
        <small>جزئیات موردنیاز خدمت را بنویسید. ادمین درخواست را بررسی و شریک خدماتی را تخصیص می‌دهد.</small></label>
      <div className="staff-service-assignment-actions"><Button type="submit" disabled={submitting || !title.trim()}>
        {submitting ? "در حال ثبت…" : "ثبت درخواست برای ادمین"}
      </Button></div>
    </form>
    <div className="artist-service-requests-list" aria-label="درخواست‌های ثبت‌شده">
      <h3>درخواست‌های من</h3>
      {state.requests.length === 0 ? <EmptyState title="درخواستی ثبت نشده" description="درخواست‌های شما پس از ثبت در اینجا نمایش داده می‌شوند." /> :
        state.requests.map((request) => <article className="artist-service-request-card" key={request.requestId}>
          <div className="staff-review-card-heading"><div><h4>{request.title}</h4><span className="product-status">{request.completedAt ? "خدمت تکمیل شد" : request.assignedAt ? "به شریک خدماتی تخصیص یافت" : "در انتظار بررسی و تخصیص ادمین"}</span></div>
            <time dateTime={request.requestedAt}>ثبت: {displayDate(request.requestedAt)}</time></div>
          {request.description && <p className="staff-review-description">{request.description}</p>}
        </article>)}
    </div>
  </section>;
}
