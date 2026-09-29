import { loadPublicationReviews } from "../../../artist-api";
import { PortalShell } from "../../portal-shell";
import { StaffReviewQueueScreen } from "../../../staff-review-queue-screen";

export const dynamic = "force-dynamic";

export default async function PublicationReviewsPage() {
  const initialState = await loadPublicationReviews();
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
    </PortalShell>
  );
}
