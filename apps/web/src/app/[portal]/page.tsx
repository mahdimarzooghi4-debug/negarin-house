import { notFound } from "next/navigation";
import { getPortalDefinition, type PortalKey } from "../../portal-registry";

export default async function PortalPlaceholder({
  params
}: {
  params: Promise<{ portal: string }>;
}) {
  const { portal } = await params;
  const definition = getPortalDefinition(portal as PortalKey);

  if (!definition) notFound();

  return (
    <main dir={definition.direction}>
      <section className="panel">
        <p className="muted">Sprint 0 placeholder</p>
        <h1>{definition.title}</h1>
        <p>{definition.description}</p>
        <p className="muted">
          این Route فقط اسکلت فنی است. مجوز دسترسی در Epic E1 به‌صورت server-side policy اجرا می‌شود.
        </p>
      </section>
    </main>
  );
}
