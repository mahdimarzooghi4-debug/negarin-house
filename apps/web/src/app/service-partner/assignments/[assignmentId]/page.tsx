import { loadServicePartnerAssignment } from "../../../../artist-api";
import { PortalShell } from "../../../portal-shell";
import { ServicePartnerAssignmentDetailScreen } from "../../../../service-partner-assignment-detail-screen";

export const dynamic = "force-dynamic";

export default async function ServicePartnerAssignmentDetailPage({
  params
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await params;
  const initialState = await loadServicePartnerAssignment(assignmentId);
  return (
    <PortalShell
      portal="service-partner"
      activeNavigation="درخواست‌های تخصیص‌یافته"
      connectionActive={initialState.kind === "ready"}
      title="جزئیات درخواست"
      description="جزئیات درخواست تخصیص‌یافته به همکار خدمات"
      direction="rtl"
    >
      <ServicePartnerAssignmentDetailScreen initialState={initialState} />
    </PortalShell>
  );
}
