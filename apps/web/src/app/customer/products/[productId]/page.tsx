import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadCustomerCatalogItem } from "../../../../artist-api";
import { PortalShell } from "../../../portal-shell";
import { CorporateBuyingActions } from "../../../../corporate-buying-actions";

export const dynamic = "force-dynamic";

function formatPrice(value: string) {
  try { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
  catch { return "قیمت ناموجود"; }
}

export default async function CustomerProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const state = await loadCustomerCatalogItem(productId);
  if (state.kind === "not-found") notFound();
  if (state.kind !== "ready") return <PortalShell portal="customer" title="محصول" description="جزئیات کاتالوگ نگارین" direction="rtl">
    <section className="catalog-empty" role="status">جزئیات محصول در حال حاضر در دسترس نیست.</section>
  </PortalShell>;

  const { item } = state;
  return <PortalShell portal="customer" title={item.title} description="جزئیات محصول منتشرشده در نگارین" direction="rtl" connectionActive>
    <main className="customer-product-detail">
      <Link href="/customer" className="customer-catalog-back">بازگشت به کاتالوگ</Link>
      {item.media.length > 0 && <div className="customer-product-media">{item.media.map((media) => <Image key={media.id} src={media.readUrl} alt={item.title} width={800} height={600} unoptimized />)}</div>}
      <h2>{item.title}</h2>
      {item.description && <p>{item.description}</p>}
      <strong>{formatPrice(item.priceToman)}</strong>
      <p className="catalog-purchase-note">موجودی: {new Intl.NumberFormat("fa-IR").format(item.availableQuantity)} عدد</p>
      <CorporateBuyingActions productId={item.id} availableQuantity={item.availableQuantity} />
    </main>
  </PortalShell>;
}
