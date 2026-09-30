import { loadStaffServiceAssignmentOptions } from "../../../artist-api";
import { PortalShell } from "../../portal-shell";
import { StaffServiceAssignmentScreen } from "../../../staff-service-assignment-screen";
import { StaffServiceNavigation } from "../../../staff-service-navigation";

export const dynamic = "force-dynamic";

export default async function StaffServiceAssignmentsPage() {
  const initialState = await loadStaffServiceAssignmentOptions();
  return (
    <PortalShell
      portal="admin"
      activeNavigation="رشد و خدمات"
      connectionActive={initialState.kind === "ready"}
      title="تخصیص خدمات"
      description="تخصیص درخواست‌های موجود به سازمان‌های شریک خدماتی"
      direction="rtl"
    >
      <StaffServiceNavigation active="assignments" />
      <StaffServiceAssignmentScreen initialState={initialState} />
    </PortalShell>
  );
}
