import { loadSupportPrograms } from "../../../artist-api";
import { SupportingOrganizationProgramsScreen } from "../../../support-programs-screen";
import { PortalShell } from "../../portal-shell";

export const dynamic = "force-dynamic";

export default async function SupportingOrganizationProgramsPage() {
  const initialState = await loadSupportPrograms();
  return <PortalShell portal="supporting-organization" activeNavigation="برنامه‌های حمایتی"
    connectionActive={initialState.kind === "ready"} title="برنامه‌های حمایتی"
    description="ثبت و مشاهدهٔ برنامه‌های متعلق به سازمان شما" direction="rtl">
    <SupportingOrganizationProgramsScreen initialState={initialState} />
  </PortalShell>;
}
