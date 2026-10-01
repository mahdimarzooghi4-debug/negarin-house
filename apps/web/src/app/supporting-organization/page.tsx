import { loadSupportPrograms } from "../../artist-api";
import { OperationalOverview, OverviewUnavailable } from "../../operational-overview";
import { PortalShell } from "../portal-shell";

export const dynamic = "force-dynamic";

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "short", day: "numeric", timeZone: "Asia/Tehran" }).format(date);
}

export default async function SupportingOrganizationDashboardPage() {
  const state = await loadSupportPrograms();
  if (state.kind !== "ready") return <PortalShell portal="supporting-organization" title="پیشخوان سازمان حامی" description="نمای کلی برنامه‌های حمایتی سازمان" direction="rtl">
    <OverviewUnavailable kind={state.kind} />
  </PortalShell>;
  const latest = [...state.programs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 6).map((program) => ({
    title: program.name, description: program.description, meta: dateLabel(program.updatedAt), status: "ثبت‌شده", href: "/supporting-organization/programs"
  }));
  return <PortalShell portal="supporting-organization" activeNavigation="پیشخوان" title="پیشخوان سازمان حامی" description="نمای کلی برنامه‌های حمایتی سازمان" direction="rtl" connectionActive>
    <OperationalOverview eyebrow="سازمان حامی" title="خلاصهٔ برنامه‌ها" description="اطلاعات این صفحه به برنامه‌های ثبت‌شده در سازمان فعال شما محدود است."
      entryHeading="آخرین برنامه‌ها" emptyCopy="هنوز برنامه‌ای ثبت نشده است."
      metrics={[{ label: "برنامه‌های ثبت‌شده", value: state.programs.length }, { label: "آخرین ویرایش", value: latest[0]?.meta ?? "—" }]}
      actions={[{ label: "مدیریت برنامه‌های حمایتی", href: "/supporting-organization/programs", description: "ثبت و ویرایش برنامهٔ سازمان" }]}
      entries={latest} note="بودجه، سهمیه، اعتبار خدمات و ارجاع هنرمندان در این نسخه ثبت یا محاسبه نمی‌شود." />
  </PortalShell>;
}
