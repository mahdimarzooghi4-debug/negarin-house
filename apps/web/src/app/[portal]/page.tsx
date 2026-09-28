import { notFound } from "next/navigation";
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

  return <PortalShell portal={portal as PortalKey} {...definition} />;
}
