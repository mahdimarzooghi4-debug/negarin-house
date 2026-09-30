import { loadArtistServiceRequests } from "../../../artist-api";
import { ArtistServiceRequestsScreen } from "../../../artist-service-requests-screen";
import { PortalShell } from "../../portal-shell";

export const dynamic = "force-dynamic";

export default async function ArtistServicesPage() {
  const initialState = await loadArtistServiceRequests();
  return <PortalShell portal="artist" activeNavigation="خدمات" connectionActive={initialState.kind === "ready"}
    title="خدمات هنرمند" description="ثبت نیاز خدمات و پیگیری تخصیص ادمین" direction="rtl">
    <ArtistServiceRequestsScreen initialState={initialState} />
  </PortalShell>;
}
