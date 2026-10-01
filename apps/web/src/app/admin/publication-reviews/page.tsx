import { loadPublicationReviews, loadPublicationVisibility } from "../../../artist-api";
import { PortalShell } from "../../portal-shell";
import { StaffReviewQueueScreen } from "../../../staff-review-queue-screen";
import { StaffPublicationVisibilityScreen } from "../../../staff-publication-visibility-screen";

export const dynamic = "force-dynamic";

export default async function PublicationReviewsPage() {
  const [initialState, visibilityState] = await Promise.all([loadPublicationReviews(), loadPublicationVisibility()]);
  return (
    <PortalShell
      portal="admin"
      activeNavigation="بازار"
      connectionActive={initialState.kind === "ready"}
      title="بازبینی محصولات"
      description="بررسی محتوای محصول‌های ارسالی هنرمندان"
      direction="rtl"
    >
      <StaffReviewQueueScreen initialState={initialState} />
      <div className="staff-review-section-divider" />
      <StaffPublicationVisibilityScreen initialState={visibilityState} />
    </PortalShell>
  );
}
