import { loadServicePartnerAssignments } from "../../../artist-api";
import { PortalShell } from "../../portal-shell";
import { ServicePartnerAssignmentsScreen } from "../../../service-partner-assignments-screen";

export const dynamic = "force-dynamic";

export default async function ServicePartnerAssignmentsPage() {
  const initialState = await loadServicePartnerAssignments();
  return (
    <PortalShell
      portal="service-partner"
      activeNavigation="درخواست‌های تخصیص‌یافته"
      connectionActive={initialState.kind === "ready"}
      title="درخواست‌های تخصیص‌یافته"
      description="درخواست‌های تخصیص‌یافته به همکار خدمات"
      direction="rtl"
    >
      <ServicePartnerAssignmentsScreen initialState={initialState} />
    </PortalShell>
  );
}
