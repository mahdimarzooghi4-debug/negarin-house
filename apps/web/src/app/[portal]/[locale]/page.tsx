import { notFound } from "next/navigation";
import { directionForLocale, partnerLocales, type PartnerLocale } from "@negarin/i18n";
import { getPartnerMessages } from "../../../partner-localization";
import { PortalShell } from "../../portal-shell";

export default async function LocalizedPortalPage({
  params
}: {
  params: Promise<{ portal: string; locale: string }>;
}) {
  const { portal, locale } = await params;
  if (portal !== "partner" || !partnerLocales.includes(locale as PartnerLocale)) notFound();

  const partnerLocale = locale as PartnerLocale;
  const messages = getPartnerMessages(partnerLocale);

  return (
    <PortalShell
      portal="partner"
      locale={partnerLocale}
      title={messages.title}
      description={messages.description}
      direction={directionForLocale(partnerLocale)}
    />
  );
}
