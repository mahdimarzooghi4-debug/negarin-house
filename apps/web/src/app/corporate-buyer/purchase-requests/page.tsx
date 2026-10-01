import { CorporateBuyingList } from "../../../corporate-buying-list";
import { PortalShell } from "../../portal-shell";

export default function CorporateBuyerPurchaseRequestsPage() {
  return <PortalShell portal="corporate-buyer" title="درخواست‌های خرید" description="پیگیری درخواست‌های ثبت‌شده برای محصولات نگارین" direction="rtl" activeNavigation="درخواست‌های خرید">
    <CorporateBuyingList endpoint="/api/corporate-buyer/purchase-requests" kind="requests" />
  </PortalShell>;
}
