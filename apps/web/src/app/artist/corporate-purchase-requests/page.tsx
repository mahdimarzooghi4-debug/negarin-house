import { loadArtistCorporatePurchaseRequests } from "../../../artist-api";
import { ArtistCorporatePurchaseRequests } from "../../../artist-corporate-purchase-requests";
import { PortalShell } from "../../portal-shell";

export const dynamic = "force-dynamic";

export default async function ArtistCorporatePurchaseRequestsPage() {
  const result = await loadArtistCorporatePurchaseRequests();
  return <PortalShell portal="artist" activeNavigation="درخواست‌های سازمانی" title="درخواست‌های خرید سازمانی"
    description="درخواست‌های خریداران برای محصولات منتشرشدهٔ شما را بررسی کنید." direction="rtl" connectionActive={result.kind === "ready"}>
    {result.kind === "ready" ? <ArtistCorporatePurchaseRequests initialRequests={result.requests} /> :
      <section className="catalog-empty" role="status">{result.kind === "connection-required"
        ? "برای مشاهدهٔ درخواست‌ها با دسترسی هنرمند وارد شو."
        : "دریافت درخواست‌ها انجام نشد؛ بعداً دوباره تلاش کن."}</section>}
  </PortalShell>;
}
