import { EmptyState } from "@negarin/ui";
import type { ServicePartnerAssignment, ServicePartnerDeliverable } from "./artist-api";
import { ServicePartnerDeliverablesPanel } from "./service-partner-deliverables-panel";
import { ServicePartnerAssignmentResponse } from "./service-partner-assignment-response";

type DetailState =
  | { kind: "ready"; assignment: ServicePartnerAssignment }
  | { kind: "connection-required" }
  | { kind: "access-denied" }
  | { kind: "not-found" }
  | { kind: "unavailable" };

type DeliverablesState =
  | { kind: "ready"; deliverables: ServicePartnerDeliverable[] }
  | { kind: "connection-required" | "access-denied" | "not-found" | "unavailable" };

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleString("fa-IR");
}

export function ServicePartnerAssignmentDetailScreen({
  initialState,
  deliverablesState
}: {
  initialState: DetailState;
  deliverablesState: DeliverablesState;
}) {
  if (initialState.kind !== "ready") {
    return (
      <EmptyState
        title={initialState.kind === "connection-required"
          ? "اتصال حساب همکار خدمات فعال نیست"
          : initialState.kind === "access-denied"
            ? "دسترسی همکار خدمات فعال نیست"
            : initialState.kind === "not-found" ? "درخواست در دسترس نیست" : "سرویس درخواست‌ها در دسترس نیست"}
        description={initialState.kind === "connection-required"
          ? "پس از فعال‌شدن ورود امن، جزئیات درخواست‌های تخصیص‌یافته از سرویس دریافت می‌شوند."
          : initialState.kind === "access-denied"
            ? "برای دیدن این صفحه، نقش فعال همکار خدمات و دسترسی سازمانی معتبر لازم است."
            : initialState.kind === "not-found"
            ? "درخواست پیدا نشد یا به این حساب تخصیص داده نشده است."
            : "سرویس درخواست‌ها در حال حاضر پاسخ نمی‌دهد. کمی بعد دوباره تلاش کن."}
        note="اطلاعات درخواست‌های خارج از دسترسی حساب نمایش داده نمی‌شود."
      />
    );
  }

  const { assignment } = initialState;
  const historyLabels = {
    assigned: "تخصیص درخواست",
    accepted: "تخصیص پذیرفته شد",
    declined: "تخصیص رد شد",
    deliverable_added: "فایل برای بارگذاری ثبت شد",
    deliverable_submitted: "فایل برای بررسی نگارین ارسال شد",
    deliverable_approved: "تحویل تأیید شد",
    deliverable_changes_requested: "برای تحویل اصلاح درخواست شد",
    service_completed: "خدمت تکمیل شد"
  } as const;
  return (
    <article className="service-partner-assignment-detail" aria-labelledby="service-partner-assignment-title">
      <a className="service-partner-assignment-back" href="/service-partner/assignments">بازگشت به درخواست‌های تخصیص‌یافته</a>
      <h2 id="service-partner-assignment-title">{assignment.title}</h2>
      {assignment.summary && <p className="service-partner-assignment-summary">{assignment.summary}</p>}
      <dl className="service-partner-assignment-dates">
        <div>
          <dt>زمان تخصیص</dt>
          <dd><time dateTime={assignment.assignedAt}>{formatDate(assignment.assignedAt)}</time></dd>
        </div>
        <div>
          <dt>زمان ثبت درخواست</dt>
          <dd><time dateTime={assignment.requestedAt}>{formatDate(assignment.requestedAt)}</time></dd>
        </div>
      </dl>
      <section className="service-partner-assignment-history" aria-labelledby="service-partner-assignment-history-title">
        <h3 id="service-partner-assignment-history-title">تاریخچهٔ درخواست</h3>
        {assignment.history?.length ? (
          <ol>
            {assignment.history.map((event, index) => (
              <li key={`${event.type}-${event.createdAt}-${index}`}>
                <div>
                  <strong>{historyLabels[event.type]}</strong>
                  {event.fileName && <span className="service-partner-assignment-history-file">{event.fileName}</span>}
                  {event.uploadStatus && <span className="service-partner-assignment-history-status">
                    وضعیت فنی بارگذاری: {event.uploadStatus === "ready" ? "آماده" : "در انتظار تکمیل"}
                  </span>}
                  {event.feedback && <span className="service-partner-assignment-history-status">یادداشت: {event.feedback}</span>}
                </div>
                <time dateTime={event.createdAt}>{formatDate(event.createdAt)}</time>
              </li>
            ))}
          </ol>
        ) : <p className="service-partner-deliverable-hint">رویدادی برای نمایش ثبت نشده است.</p>}
      </section>
      <ServicePartnerAssignmentResponse assignment={assignment} />
      {assignment.responseStatus === "accepted" ? (
        <ServicePartnerDeliverablesPanel assignmentId={assignment.assignmentId} completed={assignment.completedAt !== null} initialState={deliverablesState} />
      ) : (
        <p className="service-partner-deliverable-hint service-partner-deliverable-locked">
          بارگذاری فایل پس از پذیرش تخصیص در دسترس است.
        </p>
      )}
    </article>
  );
}
