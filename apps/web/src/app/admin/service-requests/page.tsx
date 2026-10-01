import { loadStaffServiceAssignmentOptions } from "../../../artist-api";
import { StaffServiceRequestScreen } from "../../../staff-service-request-screen";
import { StaffServiceNavigation } from "../../../staff-service-navigation";
import { PortalShell } from "../../portal-shell";

export const dynamic = "force-dynamic";

export default async function StaffServiceRequestsPage() {
  const initialState = await loadStaffServiceAssignmentOptions();
  return (
    <PortalShell
      portal="admin"
      activeNavigation="رشد و خدمات"
      connectionActive={initialState.kind === "ready"}
      title="ثبت درخواست خدمت"
      description="ثبت درخواست برای بررسی و تخصیص توسط کارکنان مجاز"
      direction="rtl"
    >
      <StaffServiceNavigation active="requests" />
      <StaffServiceRequestScreen initialState={initialState} />
    </PortalShell>
  );
}
