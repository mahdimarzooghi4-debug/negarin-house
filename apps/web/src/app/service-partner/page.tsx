import { loadServicePartnerAssignments } from "../../artist-api";
import { OperationalOverview, OverviewUnavailable } from "../../operational-overview";
import { PortalShell } from "../portal-shell";

export const dynamic = "force-dynamic";

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "short", day: "numeric", timeZone: "Asia/Tehran" }).format(date);
}

export default async function ServicePartnerDashboardPage() {
  const state = await loadServicePartnerAssignments();
  if (state.kind !== "ready") return <PortalShell portal="service-partner" title="پیشخوان همکار خدمات" description="نمای کلی درخواست‌های تخصیص‌یافته" direction="rtl">
    <OverviewUnavailable kind={state.kind} />
  </PortalShell>;
  const active = state.assignments.filter((item) => !item.completedAt);
  const awaiting = state.assignments.filter((item) => item.responseStatus === "awaiting_response");
  const latest = [...state.assignments].sort((a, b) => b.assignedAt.localeCompare(a.assignedAt)).slice(0, 6).map((item) => ({
    title: item.title,
    description: item.summary,
    meta: dateLabel(item.assignedAt),
    status: item.completedAt ? "تکمیل‌شده" : item.responseStatus === "accepted" ? "پذیرفته‌شده" : item.responseStatus === "declined" ? "ردشده" : "در انتظار پاسخ",
    href: `/service-partner/assignments/${encodeURIComponent(item.assignmentId)}`
  }));
  return <PortalShell portal="service-partner" activeNavigation="پیشخوان" title="پیشخوان همکار خدمات" description="درخواست‌ها و تحویل‌های تخصیص‌یافته به سازمان شما" direction="rtl" connectionActive>
    <OperationalOverview eyebrow="سازمان همکار خدمات" title="خلاصهٔ اجرا" description="فقط درخواست‌های تخصیص‌یافته به سازمان و کاربر فعال شما نمایش داده می‌شوند."
      entryHeading="آخرین درخواست‌ها" emptyCopy="هنوز درخواستی به این حساب تخصیص داده نشده است."
      metrics={[
        { label: "درخواست‌های فعال", value: active.length },
        { label: "در انتظار پاسخ", value: awaiting.length },
        { label: "تکمیل‌شده", value: state.assignments.length - active.length },
        { label: "کل درخواست‌های تخصیص‌یافته", value: state.assignments.length }
      ]}
      actions={[{ label: "درخواست‌های تخصیص‌یافته", href: "/service-partner/assignments", description: "مشاهدهٔ فهرست و جزئیات درخواست‌ها" }]}
      entries={latest} note="زمان‌بندی و وضعیت تحویل فقط از سوابق ثبت‌شده نمایش داده می‌شود." />
  </PortalShell>;
}
