import Image from "next/image";
import Link from "next/link";
import { loadCustomerCatalog } from "../../artist-api";
import { PortalShell } from "../portal-shell";

export const dynamic = "force-dynamic";

function formatPrice(value: string) {
  try { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
  catch { return "قیمت ناموجود"; }
}

export default async function CustomerCatalogPage() {
  const state = await loadCustomerCatalog();
  return <PortalShell portal="customer" title="کاتالوگ نگارین" description="محصول‌های منتشرشده در بازار نگارین" direction="rtl" connectionActive={state.kind === "ready"}>
    {state.kind !== "ready" ? <section className="catalog-empty" role="status">کاتالوگ در حال حاضر در دسترس نیست. کمی بعد دوباره تلاش کنید.</section> : state.items.length === 0 ?
      <section className="catalog-empty"><h2>هنوز محصولی برای نمایش نیست</h2><p>محصول‌ها پس از تأیید محتوا و انتشار توسط ادمین در این صفحه نمایش داده می‌شوند.</p></section> :
      <section className="customer-catalog-grid" aria-label="محصول‌های منتشرشده">
        {state.items.map((item) => <article className="customer-catalog-card" key={item.id}>
          <Link className="customer-catalog-image" href={`/customer/products/${encodeURIComponent(item.id)}`} aria-label={`مشاهده ${item.title}`}>
            {item.media[0] ? <Image src={item.media[0].readUrl} alt={item.title} width={480} height={360} unoptimized /> : <span>تصویر ندارد</span>}
          </Link>
          <div className="customer-catalog-card-body"><h2><Link href={`/customer/products/${encodeURIComponent(item.id)}`}>{item.title}</Link></h2>
            {item.description && <p>{item.description}</p>}<strong>{formatPrice(item.priceToman)}</strong></div>
        </article>)}
      </section>}
  </PortalShell>;
}
