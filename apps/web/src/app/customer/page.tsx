import { loadCustomerCatalog } from "../../artist-api";
import { CustomerCatalogScreen } from "../../customer-catalog-screen";

export const dynamic = "force-dynamic";

export default async function CustomerCatalogPage() {
  const state = await loadCustomerCatalog();
  return <CustomerCatalogScreen items={state.kind === "ready" ? state.items : []} available={state.kind === "ready"} />;
}
