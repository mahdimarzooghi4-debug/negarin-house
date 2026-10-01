import Link from "next/link";
import { loadArtistProducts, loadArtistServiceRequests } from "../../artist-api";
import { OperationalOverview, OverviewUnavailable } from "../../operational-overview";
import { PortalShell } from "../portal-shell";

export const dynamic = "force-dynamic";

function statusLabel(status: string) {
  return ({ draft: "پیش‌نویس", under_review: "در انتظار بازبینی", changes_requested: "نیازمند اصلاح", approved: "تأیید محتوا", published: "منتشرشده" } as Record<string, string>)[status] ?? "نامشخص";
}

function dateLabel(value: string) {
  const time = new Date(value);
  return Number.isNaN(time.getTime()) ? "" : new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "short", day: "numeric", timeZone: "Asia/Tehran" }).format(time);
}

export default async function ArtistDashboardPage() {
  const [productState, serviceState] = await Promise.all([loadArtistProducts(), loadArtistServiceRequests()]);
  const products = productState.kind === "ready" ? productState.products : [];
  const services = serviceState.kind === "ready" ? serviceState.requests : [];
  const latest = [
    ...products.map((item) => ({ title: item.title, description: "محصول هنرمند", meta: dateLabel(item.updatedAt), status: statusLabel(item.publicationStatus), href: "/artist/products", at: item.updatedAt })),
    ...services.map((item) => ({ title: item.title, description: item.description, meta: dateLabel(item.requestedAt), status: item.completedAt ? "تکمیل‌شده" : item.assignedAt ? "تخصیص‌یافته" : "ثبت‌شده", href: "/artist/services", at: item.requestedAt }))
  ].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 6);
  const productsReady = productState.kind === "ready";
  const servicesReady = serviceState.kind === "ready";
  const notReady = productState.kind === "connection-required" || serviceState.kind === "connection-required" ? "connection-required"
    : productState.kind === "unavailable" || serviceState.kind === "unavailable" ? "unavailable" : null;

  return <PortalShell portal="artist" activeNavigation="پیشخوان" title="پیشخوان هنرمند" description="مدیریت محصولات و درخواست‌های خدمات" direction="rtl" connectionActive={productsReady || servicesReady}>
    {notReady ? <OverviewUnavailable kind={notReady} /> : <OperationalOverview eyebrow="فضای کاری هنرمند" title="خلاصهٔ فعالیت"
      description="این نمای کلی بر اساس اطلاعات ثبت‌شده در حساب شما ساخته می‌شود." entryHeading="آخرین تغییرها"
      metrics={[
        { label: "محصول‌های ثبت‌شده", value: productsReady ? products.length : "—", detail: productsReady ? "شامل محصول‌های بایگانی‌شده" : "اطلاعات ناموجود" },
        { label: "در انتظار بازبینی", value: productsReady ? products.filter((item) => item.publicationStatus === "under_review").length : "—" },
        { label: "محصول‌های منتشرشده", value: productsReady ? products.filter((item) => item.publicationStatus === "published" && !item.archivedAt).length : "—" },
        { label: "درخواست‌های خدمات", value: servicesReady ? services.length : "—" }
      ]}
      actions={[
        { label: "مدیریت محصولات", href: "/artist/products", description: "ثبت، ویرایش و ارسال برای بازبینی" },
        { label: "درخواست خدمات", href: "/artist/services", description: "ثبت نیاز و پیگیری تخصیص" }
      ]}
      entries={latest} emptyCopy="هنوز محصول یا درخواست خدماتی ثبت نشده است. از دسترسی‌های سریع برای شروع استفاده کنید."
      note={<>آمار فروش و سفارش زمانی نمایش داده می‌شود که جریان سفارش و گزارش‌گیری در محصول فعال شود. <Link href="/customer">دیدن کاتالوگ عمومی</Link></>} />}
  </PortalShell>;
}
