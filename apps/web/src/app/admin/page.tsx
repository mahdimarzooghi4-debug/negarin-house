import { loadPublicationReviews, loadPublicationVisibility, loadStaffServiceDeliverableSubmissions } from "../../artist-api";
import { OperationalOverview, OverviewUnavailable } from "../../operational-overview";
import { PortalShell } from "../portal-shell";

export const dynamic = "force-dynamic";

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "short", day: "numeric", timeZone: "Asia/Tehran" }).format(date);
}

export default async function AdminDashboardPage() {
  const [reviewsState, visibilityState, deliverablesState] = await Promise.all([
    loadPublicationReviews(), loadPublicationVisibility(), loadStaffServiceDeliverableSubmissions()
  ]);
  const isReady = reviewsState.kind === "ready" || visibilityState.kind === "ready" || deliverablesState.kind === "ready";
  if (!isReady) {
    const kind = [reviewsState, visibilityState, deliverablesState].some((state) => state.kind === "access-denied") ? "access-denied"
      : [reviewsState, visibilityState, deliverablesState].some((state) => state.kind === "connection-required") ? "connection-required" : "unavailable";
    return <PortalShell portal="admin" title="داشبورد عملیات نگارین" description="صف‌های بازبینی و اجرای خدمات" direction="rtl"><OverviewUnavailable kind={kind} /></PortalShell>;
  }
  const reviews = reviewsState.kind === "ready" ? reviewsState.items : [];
  const visibility = visibilityState.kind === "ready" ? visibilityState.items : [];
  const deliverables = deliverablesState.kind === "ready" ? deliverablesState.items : [];
  const entries = [
    ...reviews.map((item) => ({ title: item.title, description: "بازبینی محتوای محصول", meta: dateLabel(item.createdAt), status: "در انتظار بازبینی", href: "/admin/publication-reviews", at: item.createdAt })),
    ...deliverables.filter((item) => !item.review).map((item) => ({ title: item.title, description: item.fileName, meta: dateLabel(item.submittedAt), status: "در انتظار تصمیم خدمات", href: "/admin/service-deliverables", at: item.submittedAt }))
  ].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 7);
  return <PortalShell portal="admin" activeNavigation="داشبورد" title="داشبورد عملیات نگارین" description="نمای زندهٔ صف‌های قابل‌دسترسی برای نقش فعال شما" direction="rtl" connectionActive>
    <OperationalOverview eyebrow="فضای عملیات نگارین" title="صف‌های نیازمند اقدام" description="هر عدد از API متناسب با مجوزهای نقش فعال خوانده شده است."
      entryHeading="موارد نیازمند رسیدگی" emptyCopy="در صف‌های در دسترس شما موردی برای رسیدگی وجود ندارد."
      metrics={[
        { label: "محصول‌های در انتظار بازبینی", value: reviewsState.kind === "ready" ? reviews.length : "—" },
        { label: "محصول‌های تأییدشده یا منتشرشده", value: visibilityState.kind === "ready" ? visibility.length : "—" },
        { label: "تحویل خدمات بدون تصمیم", value: deliverablesState.kind === "ready" ? deliverables.filter((item) => !item.review).length : "—" },
        { label: "تحویل‌های ثبت‌شده", value: deliverablesState.kind === "ready" ? deliverables.length : "—" }
      ]}
      actions={[
        { label: "بازبینی انتشار", href: "/admin/publication-reviews", description: "بررسی محتوا و تصاویر محصول" },
        { label: "بازبینی تحویل خدمات", href: "/admin/service-deliverables", description: "تصمیم ثبت‌شده برای تحویل همکار" },
        { label: "ثبت درخواست خدمات", href: "/admin/service-requests", description: "مشاهدهٔ درخواست‌های ثبت‌شده" }
      ]}
      entries={entries} note="وضعیت سفارش، مالی، عضویت و گزارش‌های مدیریتی تا زمان ارائهٔ APIهای آن‌ها در این صفحه نمایش داده نمی‌شود." />
  </PortalShell>;
}
