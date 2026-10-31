import { notFound, redirect } from "next/navigation";
import { getPortalDefinition, type PortalKey } from "../../portal-registry";
import { PortalShell } from "../portal-shell";

export default async function PortalPage({
  params
}: {
  params: Promise<{ portal: string }>;
}) {
  const { portal } = await params;
  const definition = getPortalDefinition(portal as PortalKey);

  if (!definition) notFound();
  if (portal === "corporate-buyer") redirect("/corporate-buyer/corporate-products");
  if (portal === "customer") redirect("/customer/products");
  if (portal === "supporting-organization") redirect("/supporting-organization/support-programs");
  if (portal === "service-partner") redirect("/service-partner/assignments");

  return <PortalShell portal={portal as PortalKey} {...definition} />;
}
