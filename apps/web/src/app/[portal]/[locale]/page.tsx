import { notFound } from "next/navigation";
import { directionForLocale, partnerLocales, type PartnerLocale } from "@negarin/i18n";
import { getPartnerMessages } from "../../../partner-localization";
import { PortalShell } from "../../portal-shell";
import { CorporateProductsLive, CorporateProductDetailLive } from "../../../features/corporate-buyer/live-products";
import {
  CorporateNewPurchaseRequestLive,
  CorporatePurchaseRequestDetailLive,
  CorporatePurchaseRequestsLive
} from "../../../features/corporate-buyer/live-requests";
import { parsePurchaseRequestProductQuery } from "../../../features/corporate-buyer/live-data";

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function LocalizedPortalPage({
  params,
  searchParams
}: {
  params: Promise<{ portal: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { portal, locale } = await params;
  const query = await searchParams;

  if (portal === "corporate-buyer") {
    if (locale === "corporate-products") return <CorporateProductsLive />;
    if (locale === "product-detail") return <CorporateProductDetailLive id={first(query.id)} />;
    if (locale === "purchase-requests") return <CorporatePurchaseRequestsLive />;
    if (locale === "new-purchase-request") {
      return <CorporateNewPurchaseRequestLive selection={parsePurchaseRequestProductQuery(query.products)} />;
    }
    if (locale === "purchase-request-detail") return <CorporatePurchaseRequestDetailLive id={first(query.id)} />;
    notFound();
  }

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
