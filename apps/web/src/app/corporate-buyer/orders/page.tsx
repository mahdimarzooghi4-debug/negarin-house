import { CorporateBuyingList } from "../../../corporate-buying-list";
import { PortalShell } from "../../portal-shell";

export default function CorporateBuyerOrdersPage() {
  return <PortalShell portal="corporate-buyer" title="سفارش‌های سازمانی" description="سفارش‌ها و وضعیت پرداخت آن‌ها" direction="rtl" activeNavigation="سفارش‌ها">
    <CorporateBuyingList endpoint="/api/corporate-buyer/orders" kind="orders" />
  </PortalShell>;
}
