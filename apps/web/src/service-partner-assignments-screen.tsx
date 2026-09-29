import { EmptyState } from "@negarin/ui";
import type { ServicePartnerAssignment } from "./artist-api";

type AssignmentsState =
  | { kind: "ready"; assignments: ServicePartnerAssignment[] }
  | { kind: "connection-required" }
  | { kind: "unavailable" };

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleString("fa-IR");
}

export function ServicePartnerAssignmentsScreen({ initialState }: { initialState: AssignmentsState }) {
  if (initialState.kind !== "ready") {
    return (
      <EmptyState
        title={initialState.kind === "connection-required" ? "اتصال حساب همکار خدمات فعال نیست" : "درخواست‌ها در دسترس نیستند"}
        description={initialState.kind === "connection-required"
          ? "پس از فعال‌شدن ورود امن، درخواست‌های تخصیص‌یافته از سرویس دریافت می‌شوند."
          : "سرویس درخواست‌ها در حال حاضر پاسخ نمی‌دهد. کمی بعد دوباره تلاش کن."}
        note="در این صفحه درخواست یا اطلاعات هنرمند نمونه نمایش داده نمی‌شود."
      />
    );
  }

  return (
    <section className="service-partner-assignments" aria-labelledby="service-partner-assignments-title">
      <div className="service-partner-assignments-heading">
        <div>
          <h2 id="service-partner-assignments-title">درخواست‌های تخصیص‌یافته</h2>
          <p>درخواست‌هایی که برای سازمان یا حساب شما تخصیص داده شده‌اند.</p>
        </div>
        <span className="service-partner-assignment-count">
          {new Intl.NumberFormat("fa-IR").format(initialState.assignments.length)} درخواست
        </span>
      </div>

      {initialState.assignments.length === 0 ? (
        <EmptyState
          title="درخواستی تخصیص داده نشده"
          description="پس از تخصیص یک درخواست به سازمان یا حساب شما، اطلاعات آن در این فهرست نمایش داده می‌شود."
          note="این بخش فقط درخواست‌های تخصیص‌یافته را نشان می‌دهد."
        />
      ) : (
        <div className="service-partner-assignment-list">
          {initialState.assignments.map((assignment) => (
            <article className="service-partner-assignment-card" key={assignment.assignmentId}>
              <div className="service-partner-assignment-card-heading">
                <h3>
                  <a href={`/service-partner/assignments/${encodeURIComponent(assignment.assignmentId)}`}>
                    {assignment.title}
                  </a>
                </h3>
              </div>
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
          ))}
        </div>
      )}
    </section>
  );
}
