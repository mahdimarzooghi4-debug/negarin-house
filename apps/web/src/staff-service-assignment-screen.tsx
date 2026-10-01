"use client";

import { FormEvent, useState } from "react";
import { Button, EmptyState } from "@negarin/ui";
import type { StaffServiceAssignmentOptions } from "./artist-api";

type PageState =
  | { kind: "ready"; options: StaffServiceAssignmentOptions }
  | { kind: "connection-required" }
  | { kind: "access-denied" }
  | { kind: "unavailable" };

function emptyState(state: Exclude<PageState, { kind: "ready" }>) {
  const messages = {
    "connection-required": ["ورود کارکنان فعال نیست", "پس از فعال‌شدن ورود امن کارکنان، گزینه‌های واقعی تخصیص از سرویس دریافت می‌شود."],
    "access-denied": ["دسترسی خدمات فعال نیست", "این صفحه فقط برای کارمند نگارین با مجوز خدمات در دسترس است."],
    unavailable: ["گزینه‌های تخصیص در دسترس نیستند", "سرویس گزینه‌های تخصیص فعلاً پاسخ نمی‌دهد. کمی بعد دوباره تلاش کن."]
  } as const;
  const [title, description] = messages[state.kind];
  return <EmptyState title={title} description={description} note="در این صفحه دادهٔ نمونه نمایش داده نمی‌شود." />;
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleDateString("fa-IR");
}

export function StaffServiceAssignmentScreen({ initialState }: { initialState: PageState }) {
  const [state, setState] = useState<PageState>(initialState);
  const [requestId, setRequestId] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function reload() {
    const response = await fetch("/api/admin/service-assignments/options", { cache: "no-store" });
    if (response.status === 401) return setState({ kind: "connection-required" });
    if (response.status === 403) return setState({ kind: "access-denied" });
    if (!response.ok) return setState({ kind: "unavailable" });
    const options = await response.json() as StaffServiceAssignmentOptions;
    setState({ kind: "ready", options });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requestId || !organizationId || submitting) return;
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/service-assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, partnerOrganizationId: organizationId }),
        cache: "no-store"
      });
      if (response.status === 401) { setState({ kind: "connection-required" }); return; }
      if (response.status === 403) { setState({ kind: "access-denied" }); return; }
      if (response.status === 404) {
        await reload();
        setError("درخواست یا سازمان انتخاب‌شده دیگر در دسترس نیست؛ فهرست تازه شد.");
        return;
      }
      if (!response.ok) {
        setError(response.status === 400 ? "اطلاعات تخصیص معتبر نیست." : "ثبت تخصیص انجام نشد.");
        return;
      }
      const result = await response.json() as { title?: string };
      setNotice(result.title ? `تخصیص «${result.title}» ثبت شد.` : "تخصیص ثبت شد.");
      setRequestId("");
    } catch {
      setError("ارتباط با سرویس تخصیص برقرار نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  if (state.kind !== "ready") return emptyState(state);
  const { requests, organizations } = state.options;

  return (
    <section className="staff-service-assignments" aria-labelledby="staff-service-assignments-title">
      <div className="staff-service-assignments-heading">
        <div>
          <h2 id="staff-service-assignments-title">تخصیص درخواست</h2>
          <p>درخواست موجود را انتخاب کن و تخصیص آن را به سازمان شریک خدماتی ثبت کن.</p>
        </div>
      </div>
      {error && <p className="artist-products-error" role="alert">{error}</p>}
      {notice && <p className="staff-review-notice" role="status">{notice}</p>}
      {requests.length === 0 ? (
        <EmptyState title="درخواست موجودی ثبت نشده" description="ابتدا از بخش «ثبت درخواست» یک درخواست بساز؛ سپس آن را از این فهرست به سازمان شریک خدماتی تخصیص بده." />
      ) : organizations.length === 0 ? (
        <EmptyState title="سازمان شریک خدماتی ثبت نشده" description="برای تخصیص، سازمان شریک خدماتی باید در رجیستری سازمان‌ها موجود باشد." />
      ) : (
        <form className="staff-service-assignment-form" onSubmit={(event) => void submit(event)}>
          <label>
            <span>درخواست موجود</span>
            <select value={requestId} onChange={(event) => setRequestId(event.target.value)} required>
              <option value="">انتخاب درخواست</option>
              {requests.map((request) => (
                <option key={request.id} value={request.id}>
                  {request.title} · {formatDate(request.createdAt)}
                </option>
              ))}
            </select>
            {requestId && requests.find((request) => request.id === requestId)?.summary && (
              <small>{requests.find((request) => request.id === requestId)?.summary}</small>
            )}
          </label>
          <label>
            <span>سازمان شریک خدماتی</span>
            <select value={organizationId} onChange={(event) => setOrganizationId(event.target.value)} required>
              <option value="">انتخاب سازمان</option>
              {organizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.displayName?.trim() || `سازمان بدون نام · ${organization.id.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </label>
          <p className="staff-service-assignment-note">تخصیص به سازمان ثبت می‌شود؛ اطلاعات درخواست از سرویس واقعی دریافت می‌شود.</p>
          <div className="staff-service-assignment-actions">
            <Button type="submit" disabled={submitting || !requestId || !organizationId}>
              {submitting ? "در حال ثبت…" : "ثبت تخصیص"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
