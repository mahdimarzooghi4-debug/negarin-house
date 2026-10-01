"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CustomerCatalogItem } from "./artist-api";

function normalize(value: string) {
  return value.normalize("NFKC").replace(/[\u064A\u0649]/g, "ی").replace(/\u0643/g, "ک")
    .replace(/[\u200c\u200f\u202a-\u202e]/g, "").replace(/\s+/g, " ").trim().toLocaleLowerCase("fa-IR");
}

function formatPrice(value: string) {
  try { return `${new Intl.NumberFormat("fa-IR").format(BigInt(value))} تومان`; }
  catch { return "قیمت ناموجود"; }
}

export function CustomerCatalogScreen({ items, available }: { items: CustomerCatalogItem[]; available: boolean }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const term = normalize(query);
    return term ? items.filter((item) => normalize(`${item.title} ${item.description ?? ""}`).includes(term)) : items;
  }, [items, query]);

  return (
    <main className="customer-store" dir="rtl" lang="fa-IR">
      <header className="customer-store-header">
        <Link className="customer-store-brand" href="/" aria-label="بازگشت به خانه نگارین">
          <Image src="/brand/negarin-logo.png" alt="" width={40} height={40} priority />
          <span><strong>خانه نگارین</strong><small>روایتگر هنر اصیل ایرانی</small></span>
        </Link>
        <span className="customer-store-caption">بازار هنر و فرصت‌ها</span>
      </header>

      <section className="customer-store-hero">
        <div>
          <p className="customer-store-eyebrow">بازار هنر و فرصت‌ها</p>
          <h1>هنر را کشف کن،<br />هنرمند را دنبال کن</h1>
          <p>آثار منتشرشدهٔ هنرمندان نگارین را ببین و روایت هر اثر را بخوان.</p>
          <a href="#published-catalog" className="customer-store-cta">کشف آثار</a>
        </div>
      </section>

      <label className="customer-store-search">
        <span aria-hidden="true">⌕</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)}
          placeholder="جست‌وجو در آثار منتشرشده" aria-label="جست‌وجو در آثار منتشرشده" />
      </label>

      <section className="customer-store-catalog" id="published-catalog" aria-labelledby="customer-catalog-title">
        <div className="customer-store-section-heading">
          <h2 id="customer-catalog-title">{query.trim() ? "نتایج جست‌وجو" : "آثار منتشرشده"}</h2>
          {available ? <span>{new Intl.NumberFormat("fa-IR").format(visible.length)} اثر</span> : null}
        </div>
        {!available ? <div className="customer-store-empty" role="status">
          <h3>بازار در دسترس نیست</h3><p>کمی بعد دوباره تلاش کنید.</p>
        </div> : visible.length === 0 ? <div className="customer-store-empty" role="status">
          <h3>{query.trim() ? "اثری پیدا نشد" : "هنوز اثری برای نمایش نیست"}</h3>
          <p>{query.trim() ? "واژهٔ دیگری را جست‌وجو کنید." : "آثار پس از تأیید محتوا و انتشار توسط ادمین در این بخش دیده می‌شوند."}</p>
        </div> : <div className="customer-store-grid">
          {visible.map((item) => <article className="customer-store-product" key={item.id}>
            <Link className="customer-store-product-image" href={`/customer/products/${encodeURIComponent(item.id)}`} aria-label={`مشاهده ${item.title}`}>
              {item.media[0] ? <Image src={item.media[0].readUrl} alt={item.title} width={560} height={420} unoptimized />
                : <span>تصویری برای این اثر ثبت نشده است</span>}
            </Link>
            <div className="customer-store-product-copy">
              <h3><Link href={`/customer/products/${encodeURIComponent(item.id)}`}>{item.title}</Link></h3>
              {item.description ? <p>{item.description}</p> : null}
              <strong>{formatPrice(item.priceToman)}</strong>
              <small className="customer-stock-label">موجودی: {new Intl.NumberFormat("fa-IR").format(item.availableQuantity)} عدد</small>
            </div>
          </article>)}
        </div>}
      </section>
      <p className="customer-store-footnote">خریداران سازمانی می‌توانند از صفحهٔ هر محصول درخواست خرید یا سفارش مستقیم ثبت کنند.</p>
    </main>
  );
}
