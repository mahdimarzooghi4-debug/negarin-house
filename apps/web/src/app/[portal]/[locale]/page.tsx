import { notFound } from "next/navigation";
import { directionForLocale, partnerLocales, type PartnerLocale } from "@negarin/i18n";
import { getPartnerMessages } from "../../../partner-localization";
import { PortalShell } from "../../portal-shell";
import { CorporateProductsLive, CorporateProductDetailLive } from "../../../features/corporate-buyer/live-products";
import {
  CorporateNewPurchaseRequestLive,
  CorporateOrderDetailLive,
  CorporateOrdersLive,
  CorporatePurchaseRequestDetailLive,
  CorporatePurchaseRequestsLive
} from "../../../features/corporate-buyer/live-requests";
import { parsePurchaseRequestProductQuery, parseRequiredUuidQuery } from "../../../features/corporate-buyer/live-data";
import { CustomerArtistStorefrontLive, CustomerCartLive, CustomerCategoriesLive, CustomerFavoritesLive, CustomerMarketplaceLive, CustomerProductDetailLive } from "../../../features/customer-marketplace/live";
import { CustomerCheckoutLive } from "../../../features/customer-checkout/live";
import { CustomerOrderDetailLive, CustomerOrdersLive } from "../../../features/customer-orders/live";
import { CustomerOrderPaymentLive } from "../../../features/customer-payment/live";
import { CustomerAddressesLive } from "../../../features/customer-addresses/live";
import { SupportingOrganizationProgramsLive } from "../../../features/supporting-organization/live-programs";
import { OrganizationInvitationAccept } from "../../../features/supporting-organization/accept-invitation";

export default async function LocalizedPortalPage({
  params,
  searchParams
}: {
  params: Promise<{ portal: string; locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { portal, locale } = await params;
  const query = await searchParams;

  if (portal === "customer") {
    if (locale === "products") { const category = typeof query.category === "string" ? query.category : ""; return <CustomerMarketplaceLive key={category || "all"} initialCategory={category} />; }
    if (locale === "categories") return <CustomerCategoriesLive />;
    if (locale === "cart") return <CustomerCartLive />;
    if (locale === "favorites") return <CustomerFavoritesLive />;
    if (locale === "addresses") return <CustomerAddressesLive />;
    if (locale === "checkout") return <CustomerCheckoutLive />;
    if (locale === "orders") return <CustomerOrdersLive />;
    if (locale === "order-detail") {
      const value = query.id;
      const id = typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value) ? value : "";
      return <CustomerOrderDetailLive id={id} />;
    }
    if (locale === "order-payment") {
      const value = query.id;
      const id = typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value) ? value : "";
      return <CustomerOrderPaymentLive orderId={id} />;
    }
    if (locale === "product-detail") {
      const value = query.id;
      const id = typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value) ? value : "";
      return <CustomerProductDetailLive id={id} />;
    }
    if (locale === "artist-storefront") {
      const value = query.id;
      const id = typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value) ? value : "";
      return <CustomerArtistStorefrontLive id={id} />;
    }
    notFound();
  }

  if (portal === "corporate-buyer") {
    if (locale === "corporate-products") return <CorporateProductsLive />;
    if (locale === "product-detail") return <CorporateProductDetailLive id={parseRequiredUuidQuery(query.id) ?? ""} />;
    if (locale === "purchase-requests") return <CorporatePurchaseRequestsLive />;
    if (locale === "orders") return <CorporateOrdersLive />;
    if (locale === "order-detail") return <CorporateOrderDetailLive id={parseRequiredUuidQuery(query.id) ?? ""} />;
    if (locale === "new-purchase-request") {
      return <CorporateNewPurchaseRequestLive selection={parsePurchaseRequestProductQuery(query.products)} />;
    }
    if (locale === "purchase-request-detail") return <CorporatePurchaseRequestDetailLive id={parseRequiredUuidQuery(query.id) ?? ""} />;
    notFound();
  }

  if (portal === "supporting-organization") {
    if (locale === "support-programs") return <SupportingOrganizationProgramsLive view="programs" />;
    if (locale === "referrals") return <SupportingOrganizationProgramsLive view="referrals" />;
    if (locale === "allocations") return <SupportingOrganizationProgramsLive view="allocations" />;
    if (locale === "reports") return <SupportingOrganizationProgramsLive view="reports" />;
    if (locale === "members") return <SupportingOrganizationProgramsLive view="members" />;
    if (locale === "accept-invitation") return <OrganizationInvitationAccept />;
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
