import CustomerAddressBookLive from "../../../features/customer-web/live-address-book";
import CustomerCartLive from "../../../features/customer-web/live-cart";
import CustomerProductDetailLive from "../../../features/customer-web/live-product-detail";
import CustomerCatalogLive from "../../../features/customer-web/live-catalog";
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
import { parsePurchaseRequestProductQuery, parseRequiredUuidQuery } from "../../../features/corporate-buyer/live-data";

export default async function LocalizedPortalPage({
  params,
  searchParams
}: {
  params: Promise<{ portal: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { portal, locale } = await params;
  const query = await searchParams;

  if (portal === "customer" && locale === "address-book") return <CustomerAddressBookLive />;
  if (portal === "customer" && locale === "cart") return <CustomerCartLive />;
  if (portal === "customer" && locale === "products") return <CustomerCatalogLive />;
  if (portal === "customer" && locale === "product-detail") return <CustomerProductDetailLive id={parseRequiredUuidQuery(query.id)??""}/>;

  if (portal === "corporate-buyer") {
    if (locale === "corporate-products") return <CorporateProductsLive />;
    if (locale === "product-detail") return <CorporateProductDetailLive id={parseRequiredUuidQuery(query.id) ?? ""} />;
    if (locale === "dashboard") return <CorporatePurchaseRequestsLive dashboard />;
    if (locale === "purchase-requests") return <CorporatePurchaseRequestsLive />;
    if (locale === "new-purchase-request") {
      return <CorporateNewPurchaseRequestLive selection={parsePurchaseRequestProductQuery(query.products)} />;
    }
    if (locale === "purchase-request-detail") return <CorporatePurchaseRequestDetailLive id={parseRequiredUuidQuery(query.id) ?? ""} />;
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
