import { EmptyState } from "@negarin/ui";
import type { ServicePartnerAssignment } from "./artist-api";

type DetailState =
  | { kind: "ready"; assignment: ServicePartnerAssignment }
  | { kind: "connection-required" }
  | { kind: "access-denied" }
  | { kind: "not-found" }
  | { kind: "unavailable" };

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleString("fa-IR");
}

export function ServicePartnerAssignmentDetailScreen({ initialState }: { initialState: DetailState }) {
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
    </article>
  );
}
