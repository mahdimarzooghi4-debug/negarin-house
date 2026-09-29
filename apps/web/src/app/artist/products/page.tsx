import { PortalShell } from "../../portal-shell";
import { loadArtistProducts } from "../../../artist-api";
import { ArtistProductsScreen } from "../../../artist-products-screen";

export const dynamic = "force-dynamic";

export default async function ArtistProductsPage() {
  const initialState = await loadArtistProducts();
  return (
    <PortalShell
      portal="artist"
      activeNavigation="محصولات"
      connectionActive={initialState.kind === "ready"}
      title="محصولات"
      description="ثبت، بازبینی و مدیریت محصول‌های هنرمند"
      direction="rtl"
    >
      <ArtistProductsScreen initialState={initialState} />
    </PortalShell>
  );
}
