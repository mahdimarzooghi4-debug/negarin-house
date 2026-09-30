import { loadStaffServiceDeliverableSubmissions } from "../../../artist-api";
import { PortalShell } from "../../portal-shell";
import { StaffServiceDeliverableScreen } from "../../../staff-service-deliverable-screen";
import { StaffServiceNavigation } from "../../../staff-service-navigation";

export const dynamic = "force-dynamic";

export default async function StaffServiceDeliverablesPage() {
  const initialState = await loadStaffServiceDeliverableSubmissions();
  return (
    <PortalShell
      portal="admin"
      activeNavigation="رشد و خدمات"
      connectionActive={initialState.kind === "ready"}
      title="فایل‌های ارسالی خدمات"
      description="مشاهده فایل‌های آماده‌ای که شرکای خدماتی برای نگارین فرستاده‌اند"
      direction="rtl"
    >
      <StaffServiceNavigation active="submissions" />
      <StaffServiceDeliverableScreen initialState={initialState} />
    </PortalShell>
  );
}
