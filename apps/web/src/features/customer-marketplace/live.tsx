"use client";

import "@fontsource-variable/vazirmatn";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { formatMarketplaceToman, parseCustomerCart, parseFavoritePage, parseMarketplaceCategories, parseMarketplacePage, parseMarketplaceProduct, parsePublicArtistStorefront, type FavoriteProduct, type MarketplaceProduct } from "./data";
import styles from "./live.module.css";

const pageSize = 20;

function MarketHeader({ current }: { current: "products" | "detail" | "cart" | "favorites" | "categories" }) {
  return <header className={styles.header}>
    <Link href="/customer/products" className={styles.brand}>
      <img src="/brand/negarin-logo.png" alt="" width={44} height={44} />
      <span><strong>خانه نگارین</strong><small>روایتگر هنر اصیل ایرانی</small></span>
    </Link>
    <nav aria-label="ناوبری فروشگاه" className={styles.marketNav}>
      <Link href="/customer/products" aria-current={current === "products" ? "page" : undefined}>کشف آثار</Link>
      <Link href="/customer/categories" aria-current={current === "categories" ? "page" : undefined}>دسته‌بندی‌ها</Link>
      <Link href="/customer/cart" aria-current={current === "cart" ? "page" : undefined}>سبد خرید</Link>
      <Link href="/customer/orders">سفارش‌ها</Link>
      <Link href="/customer/favorites" aria-current={current === "favorites" ? "page" : undefined}>علاقه‌مندی‌ها</Link>
      <Link href="/customer/addresses">نشانی‌ها</Link>
    </nav>
  </header>;
}

function ProductCover({ product }: { product: Pick<MarketplaceProduct, "id" | "coverImageId" | "title"> }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl("");
    if (!product.coverImageId) return;
    const controller = new AbortController();
    void fetch(`/api/catalog/products/${product.id}/images/${product.coverImageId}`, { cache: "no-store", signal: controller.signal })
      .then(async response => response.ok ? await response.json() as unknown : null)
      .then(value => {
        if (value && typeof value === "object" && "url" in value && typeof value.url === "string") setUrl(value.url);
      }).catch(() => {});
    return () => controller.abort();
  }, [product.id, product.coverImageId]);
  return <div className={styles.cover}>{url ? <img src={url} alt={product.title} loading="lazy" /> : <span>تصویر اثر</span>}</div>;
}

export function CustomerMarketplaceLive({ initialCategory = "" }: { initialCategory?: string }) {
  const [queryDraft, setQueryDraft] = useState("");
  const [categoryDraft, setCategoryDraft] = useState(initialCategory);
  const [minDraft, setMinDraft] = useState("");
  const [maxDraft, setMaxDraft] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState<"newest" | "price_asc" | "price_desc">("newest");
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<ReturnType<typeof parseMarketplacePage>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterError, setFilterError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    const params = new URLSearchParams({ page: String(pageNumber), pageSize: String(pageSize), sort });
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPriceToman", minPrice);
    if (maxPrice) params.set("maxPriceToman", maxPrice);
    if (inStock) params.set("inStock", "true");
    void fetch(`/api/catalog/products?${params.toString()}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error("فهرست آثار دریافت نشد. دوباره تلاش کنید.");
        const result = parseMarketplacePage(await response.json(), { page: pageNumber, pageSize });
        if (!result) throw new Error("پاسخ فهرست آثار معتبر نیست.");
        setPage(result);
      }).catch(cause => {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با فروشگاه برقرار نشد.");
      }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [category, inStock, maxPrice, minPrice, pageNumber, query, sort]);

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const min = minDraft.trim(); const max = maxDraft.trim();
    if ((min && !/^(0|[1-9]\d{0,18})$/.test(min)) || (max && !/^(0|[1-9]\d{0,18})$/.test(max))) {
      setFilterError("بازهٔ قیمت را با عدد صحیح و بدون جداکننده وارد کنید."); return;
    }
    if (min && max && BigInt(min) > BigInt(max)) { setFilterError("حداقل قیمت نباید از حداکثر قیمت بیشتر باشد."); return; }
    setFilterError(""); setQuery(queryDraft.trim()); setCategory(categoryDraft.trim()); setMinPrice(min); setMaxPrice(max); setPageNumber(1);
  }

  function clearFilters() {
    setQueryDraft(""); setCategoryDraft(""); setMinDraft(""); setMaxDraft(""); setQuery(""); setCategory(""); setMinPrice(""); setMaxPrice(""); setInStock(false); setPageNumber(1); setFilterError("");
  }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <MarketHeader current="products" />
    <section className={styles.hero}><p className={styles.eyebrow}>بازار نگارین</p><h1>کشف آثار هنرمندان</h1><p>آثار منتشرشده را جست‌وجو و بر اساس دسته، قیمت و موجودی پیدا کنید.</p></section>
    <form className={styles.filters} onSubmit={applyFilters}>
      <label className={styles.search}>جست‌وجوی اثر<input value={queryDraft} onChange={event => setQueryDraft(event.target.value)} maxLength={200} placeholder="عنوان یا توضیحات اثر" /></label>
      <label>دسته‌بندی<input value={categoryDraft} onChange={event => setCategoryDraft(event.target.value)} maxLength={200} placeholder="مثلاً سفال" /></label>
      <label>حداقل قیمت<input inputMode="numeric" dir="ltr" value={minDraft} onChange={event => setMinDraft(event.target.value.replace(/[^0-9]/g, ""))} placeholder="تومان" /></label>
      <label>حداکثر قیمت<input inputMode="numeric" dir="ltr" value={maxDraft} onChange={event => setMaxDraft(event.target.value.replace(/[^0-9]/g, ""))} placeholder="تومان" /></label>
      <label className={styles.sort}>مرتب‌سازی<select value={sort} onChange={event => { setSort(event.target.value as typeof sort); setPageNumber(1); }}><option value="newest">جدیدترین</option><option value="price_asc">ارزان‌ترین</option><option value="price_desc">گران‌ترین</option></select></label>
      <label className={styles.stock}><input type="checkbox" checked={inStock} onChange={event => { setInStock(event.target.checked); setPageNumber(1); }} /> فقط آثار موجود</label>
      <div className={styles.filterActions}><button className={styles.primary} type="submit">نمایش نتایج</button><button className={styles.secondary} type="button" onClick={clearFilters}>پاک‌کردن فیلترها</button></div>
      {filterError && <p className={styles.error} role="alert">{filterError}</p>}
    </form>
    <section className={styles.results} aria-live="polite" aria-busy={loading}>
      <div className={styles.resultsHeading}><h2>آثار منتشرشده</h2><span>{page ? `صفحهٔ ${page.page}` : ""}</span></div>
      {loading && <p className={styles.message}>در حال دریافت آثار…</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!loading && !error && page?.items.length === 0 && <div className={styles.message}><strong>اثری با این فیلترها پیدا نشد.</strong><button type="button" className={styles.secondary} onClick={clearFilters}>پاک‌کردن فیلترها</button></div>}
      {!loading && !error && !!page?.items.length && <div className={styles.grid}>{page.items.map(product => <article className={styles.card} key={product.id}>
        <Link className={styles.cardLink} href={`/customer/product-detail?id=${product.id}`} aria-label={`مشاهدهٔ ${product.title}`}><ProductCover product={product} /></Link>
        <div className={styles.cardBody}><div className={styles.meta}><span>{product.category ?? "بدون دسته‌بندی"}</span><span data-stock={product.availability}>{product.availability === "in_stock" ? "موجود" : "ناموجود"}</span></div>
          <h3><Link href={`/customer/product-detail?id=${product.id}`}>{product.title}</Link></h3><p className={styles.price}>{formatMarketplaceToman(product.priceToman)}</p>
          <Link className={styles.detailLink} href={`/customer/product-detail?id=${product.id}`}>مشاهدهٔ جزئیات <span aria-hidden="true">←</span></Link>
        </div>
      </article>)}</div>}
      {page && (page.page > 1 || page.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی آثار"><button type="button" disabled={loading || page.page <= 1} onClick={() => setPageNumber(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{page.page}</span><button type="button" disabled={loading || !page.hasMore || page.page >= 1000} onClick={() => setPageNumber(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>
    <footer className={styles.footer}>نگارین · بازار آثار هنرمندان</footer>
  </main>;
}

export function CustomerCategoriesLive() {
  const [categories, setCategories] = useState<ReturnType<typeof parseMarketplaceCategories>> (null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/catalog/categories", { cache: "no-store", signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("دسته‌بندی‌ها دریافت نشدند.");
      const parsed = parseMarketplaceCategories(await response.json());
      if (!parsed) throw new Error("پاسخ دسته‌بندی‌ها معتبر نیست.");
      setCategories(parsed);
    }).catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با فروشگاه برقرار نشد."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <MarketHeader current="categories" />
    <section className={styles.hero}><p className={styles.eyebrow}>بازار نگارین</p><h1>دسته‌بندی آثار</h1><p>دسته‌ها از میان آثار منتشرشده و قابل‌نمایش ساخته می‌شوند.</p></section>
    {loading && <p className={styles.message}>در حال دریافت دسته‌بندی‌ها…</p>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {!loading && !error && categories?.length === 0 && <p className={styles.message}>در حال حاضر دسته‌بندی فعالی ثبت نشده است.</p>}
    {!!categories?.length && <section className={styles.categoryGrid} aria-label="دسته‌بندی‌های آثار">{categories.map(item => <Link className={styles.categoryCard} href={`/customer/products?category=${encodeURIComponent(item.name)}`} key={item.name}>
      <span aria-hidden="true" className={styles.categoryMark}>ن</span><span><strong>{item.name}</strong><small>{new Intl.NumberFormat("fa-IR").format(item.productCount)} اثر منتشرشده</small></span><span className={styles.categoryArrow} aria-hidden="true">←</span>
    </Link>)}</section>}
    <footer className={styles.footer}>نگارین · بازار آثار هنرمندان</footer>
  </main>;
}

export function CustomerProductDetailLive({ id }: { id: string }) {
  const [product, setProduct] = useState<MarketplaceProduct | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      setError("شناسهٔ اثر معتبر نیست."); setLoading(false); return;
    }
    const controller = new AbortController(); setLoading(true); setError(""); setProduct(null); setImageUrls([]);
    void fetch(`/api/catalog/products/${id}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        if (response.status === 404) throw new Error("این اثر دیگر برای نمایش در بازار در دسترس نیست.");
        if (!response.ok) throw new Error("جزئیات اثر دریافت نشد.");
        const value = parseMarketplaceProduct(await response.json());
        if (!value) throw new Error("پاسخ جزئیات اثر معتبر نیست.");
        setProduct(value);
        const urls = await Promise.all(value.imageIds.map(async imageId => {
          try {
            const imageResponse = await fetch(`/api/catalog/products/${value.id}/images/${imageId}`, { cache: "no-store", signal: controller.signal });
            if (!imageResponse.ok) return "";
            const image: unknown = await imageResponse.json();
            return image && typeof image === "object" && "url" in image && typeof image.url === "string" ? image.url : "";
          } catch { return ""; }
        }));
        if (!controller.signal.aborted) setImageUrls(urls);
      }).catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با فروشگاه برقرار نشد."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);

  async function addToCart() {
    if (!product || adding) return;
    setAdding(true); setCartMessage("");
    try {
      const cartResponse = await fetch("/api/customer/cart", { cache: "no-store" });
      if (!cartResponse.ok) throw new Error(cartResponse.status === 401 ? "برای افزودن اثر، ابتدا وارد حساب مشتری شوید." : "سبد خرید دریافت نشد.");
      const cart = parseCustomerCart(await cartResponse.json());
      if (!cart) throw new Error("پاسخ سبد خرید معتبر نیست.");
      const existing = cart.items.find(item => item.productId === product.id);
      const response = await fetch(`/api/customer/cart/items/${product.id}`, {
        method: "PUT", headers: { "content-type": "application/json" },
        body: JSON.stringify({ version: cart.version, quantity: (existing?.quantity ?? 0) + 1 })
      });
      if (response.status === 401) throw new Error("برای افزودن اثر، ابتدا وارد حساب مشتری شوید.");
      if (response.status === 409) throw new Error("موجودی یا وضعیت سبد تغییر کرده است؛ صفحه را تازه کنید و دوباره تلاش کنید.");
      if (!response.ok) throw new Error("افزودن اثر به سبد انجام نشد.");
      if (!parseCustomerCart(await response.json())) throw new Error("پاسخ سبد خرید معتبر نیست.");
      setCartMessage("اثر به سبد خرید اضافه شد.");
    } catch (cause) {
      setCartMessage(cause instanceof Error ? cause.message : "ارتباط با سبد خرید برقرار نشد.");
    } finally { setAdding(false); }
  }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <MarketHeader current="detail" />
    <nav className={styles.breadcrumb} aria-label="مسیر صفحه"><Link href="/customer/products">کشف آثار</Link><span aria-hidden="true">/</span><span>{product?.category ?? "جزئیات اثر"}</span></nav>
    {loading && <p className={styles.message}>در حال دریافت جزئیات اثر…</p>}
    {error && <p className={styles.error} role="alert">{error}<Link href="/customer/products">بازگشت به آثار</Link></p>}
    {!loading && !error && product && <>
      <section className={styles.detail}>
        <div className={styles.detailGallery}>{product.imageIds.length ? product.imageIds.map((imageId, index) => <figure key={imageId} className={index === 0 ? styles.mainImage : ""}>{imageUrls[index] ? <img src={imageUrls[index]} alt={`${product.title}، تصویر ${index + 1}`} /> : <div className={styles.imagePending}>تصویر اثر</div>}</figure>) : <div className={styles.imagePending}>تصویری برای این اثر ثبت نشده است.</div>}</div>
        <div className={styles.detailCopy}><span className={styles.category}>{product.category ?? "اثر هنری"}</span><h1>{product.title}</h1><p className={styles.price}>{formatMarketplaceToman(product.priceToman)}</p>
          <p className={styles.availability} data-stock={product.availability}>{product.availability === "in_stock" ? "در حال حاضر موجود است" : "در حال حاضر ناموجود است"}</p>
          <button className={styles.primary} type="button" disabled={product.availability !== "in_stock" || adding} onClick={() => void addToCart()}>{adding ? "در حال افزودن…" : "افزودن به سبد خرید"}</button>
          {cartMessage && <p className={styles.cartMessage} role="status">{cartMessage}{cartMessage.includes("وارد حساب") && <span> ورود واقعی مشتری هنوز به این صفحه متصل نشده است.</span>}</p>}
          <CustomerFavoriteToggle product={product} />
          {product.storefrontId && <Link className={styles.detailLink} href={`/customer/artist-storefront?id=${product.storefrontId}`}>مشاهدهٔ فروشگاه هنرمند</Link>}
          <section><h2>دربارهٔ اثر</h2><p className={styles.description}>{product.description || "توضیحی برای این اثر ثبت نشده است."}</p></section>
          <section className={styles.specs}><h2>مشخصات</h2><dl>{[["دسته‌بندی", product.category], ["زمان آماده‌سازی", product.preparationTime], ["ابعاد", product.dimensions], ["مواد اولیه", product.materials], ["وزن", product.weight], ["رنگ", product.color], ["تکنیک ساخت", product.technique], ["روش نگهداری", product.careInstructions]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
        </div>
      </section>
      <p className={styles.marketNote}>اطلاعات نمایش‌داده‌شده مربوط به نسخهٔ منتشرشدهٔ اثر است.</p>
    </>}
    <footer className={styles.footer}><Link href="/customer/products">بازگشت به کشف آثار</Link><span>نگارین · بازار آثار هنرمندان</span></footer>
  </main>;
}

export function CustomerArtistStorefrontLive({ id }: { id: string }) {
  const [storefront, setStorefront] = useState<ReturnType<typeof parsePublicArtistStorefront>>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      setError("شناسهٔ فروشگاه معتبر نیست."); setLoading(false); return;
    }
    const controller = new AbortController(); setLoading(true); setError("");
    void fetch(`/api/catalog/storefronts/${id}?page=${pageNumber}&pageSize=${pageSize}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        if (response.status === 404) throw new Error("این فروشگاه یا آثار منتشرشدهٔ آن در دسترس نیست.");
        if (!response.ok) throw new Error("اطلاعات فروشگاه دریافت نشد.");
        const result = parsePublicArtistStorefront(await response.json(), { page: pageNumber, pageSize });
        if (!result) throw new Error("پاسخ فروشگاه معتبر نیست.");
        setStorefront(result);
        const readImage = async (imageId: string | null) => {
          if (!imageId) return "";
          try {
            const imageResponse = await fetch(`/api/catalog/storefronts/${id}/images/${imageId}`, { cache: "no-store", signal: controller.signal });
            if (!imageResponse.ok) return "";
            const image: unknown = await imageResponse.json();
            return image && typeof image === "object" && "url" in image && typeof image.url === "string" ? image.url : "";
          } catch { return ""; }
        };
        const [nextCoverUrl, nextAvatarUrl] = await Promise.all([readImage(result.coverImageId), readImage(result.avatarImageId)]);
        if (!controller.signal.aborted) { setCoverUrl(nextCoverUrl); setAvatarUrl(nextAvatarUrl); }
      }).catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با فروشگاه برقرار نشد."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id, pageNumber]);
  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <MarketHeader current="detail" />
    <nav className={styles.breadcrumb} aria-label="مسیر صفحه"><Link href="/customer/products">کشف آثار</Link><span aria-hidden="true">/</span><span>فروشگاه هنرمند</span></nav>
    {loading && <p className={styles.message} role="status">در حال دریافت فروشگاه…</p>}
    {error && <p className={styles.error} role="alert">{error}<Link href="/customer/products">بازگشت به آثار</Link></p>}
    {!loading && !error && storefront && <>
      <section className={styles.artistHero} style={coverUrl ? { backgroundImage: `linear-gradient(90deg,#fffef9ed,#fffef99c),url("${coverUrl}")` } : undefined}><div className={styles.artistIdentity}>{avatarUrl ? <img src={avatarUrl} alt="" /> : <span aria-hidden="true">ن</span>}<div><p className={styles.eyebrow}>فروشگاه هنرمند نگارین</p><h1>{storefront.storeName || "فروشگاه هنرمند"}</h1>{storefront.shortIntro && <p>{storefront.shortIntro}</p>}</div></div></section>
      {storefront.about && <section className={styles.artistAbout}><h2>دربارهٔ فروشگاه</h2><p>{storefront.about}</p></section>}
      <section className={styles.results} aria-live="polite"><div className={styles.resultsHeading}><h2>آثار منتشرشده</h2><span>صفحهٔ {new Intl.NumberFormat("fa-IR").format(pageNumber)}</span></div>
        {storefront.items.length === 0 ? <p className={styles.message}>هنوز اثری برای نمایش وجود ندارد.</p> : <div className={styles.grid}>{storefront.items.map(product => <article className={styles.card} key={product.id}>
          <Link className={styles.cardLink} href={`/customer/product-detail?id=${product.id}`} aria-label={`مشاهدهٔ ${product.title}`}><ProductCover product={product} /></Link>
          <div className={styles.cardBody}><div className={styles.meta}><span>{product.category ?? "اثر هنری"}</span><span data-stock={product.availability}>{product.availability === "in_stock" ? "موجود" : "ناموجود"}</span></div><h3><Link href={`/customer/product-detail?id=${product.id}`}>{product.title}</Link></h3><p className={styles.price}>{formatMarketplaceToman(product.priceToman)}</p><Link className={styles.detailLink} href={`/customer/product-detail?id=${product.id}`}>مشاهدهٔ اثر</Link></div>
        </article>)}</div>}
        {(pageNumber > 1 || storefront.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی آثار فروشگاه"><button type="button" disabled={loading || pageNumber <= 1} onClick={() => setPageNumber(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(pageNumber)}</span><button type="button" disabled={loading || !storefront.hasMore || pageNumber >= 1000} onClick={() => setPageNumber(value => value + 1)}>صفحهٔ بعد</button></nav>}
      </section>
    </>}
    <footer className={styles.footer}><Link href="/customer/products">بازگشت به کشف آثار</Link><span>نگارین · بازار آثار هنرمندان</span></footer>
  </main>;
}

function CustomerFavoriteToggle({ product }: { product: Pick<MarketplaceProduct, "id" | "title"> }) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const controller = new AbortController(); setReady(false); setSaved(false);
    void fetch(`/api/customer/favorites/${product.id}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        if (!response.ok) return null;
        const value: unknown = await response.json();
        return value && typeof value === "object" && "saved" in value && typeof value.saved === "boolean" ? value.saved : null;
      }).then(value => { if (value !== null) setSaved(value); }).catch(() => {})
      .finally(() => { if (!controller.signal.aborted) setReady(true); });
    return () => controller.abort();
  }, [product.id]);
  async function toggle() {
    if (busy) return;
    setBusy(true); setMessage("");
    try {
      const response = await fetch(`/api/customer/favorites/${product.id}`, {
        method: saved ? "DELETE" : "PUT", ...(saved ? {} : { headers: { "content-type": "application/json" }, body: "{}" })
      });
      if (response.status === 401) throw new Error("برای ذخیرهٔ اثر، ابتدا وارد حساب مشتری شوید.");
      if (response.status === 403) throw new Error("برای ذخیرهٔ اثر، حساب مشتری را فعال کنید.");
      if (response.status === 404) throw new Error("این اثر دیگر برای ذخیره در دسترس نیست.");
      if (!response.ok) throw new Error("تغییر علاقه‌مندی انجام نشد.");
      const value: unknown = await response.json();
      if (!value || typeof value !== "object" || !("saved" in value) || typeof value.saved !== "boolean") throw new Error("پاسخ علاقه‌مندی معتبر نیست.");
      setSaved(value.saved); setMessage(value.saved ? "اثر به علاقه‌مندی‌ها اضافه شد." : "اثر از علاقه‌مندی‌ها حذف شد.");
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "ارتباط با علاقه‌مندی‌ها برقرار نشد."); }
    finally { setBusy(false); }
  }
  return <div className={styles.favoriteControl}><button type="button" className={styles.secondary} aria-pressed={saved} disabled={busy || !ready} onClick={() => void toggle()}>{busy ? "در حال ذخیره…" : saved ? "♥ ذخیره‌شده · حذف از علاقه‌مندی‌ها" : "♡ افزودن به علاقه‌مندی‌ها"}</button>{message && <small role="status">{message}{message.includes("وارد حساب") && " ورود واقعی مشتری هنوز به این صفحه متصل نشده است."}</small>}</div>;
}

export function CustomerFavoritesLive() {
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<ReturnType<typeof parseFavoritePage>>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const pageSize = 20;
  async function load(signal?: AbortSignal) {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/customer/favorites?page=${pageNumber}&pageSize=${pageSize}`, { cache: "no-store", signal });
      if (response.status === 401) throw new Error("برای دیدن علاقه‌مندی‌ها، ابتدا وارد حساب مشتری شوید.");
      if (response.status === 403) throw new Error("برای دیدن علاقه‌مندی‌ها، حساب مشتری را فعال کنید.");
      if (!response.ok) throw new Error("فهرست علاقه‌مندی‌ها دریافت نشد.");
      const value = parseFavoritePage(await response.json(), { page: pageNumber, pageSize });
      if (!value) throw new Error("پاسخ علاقه‌مندی‌ها معتبر نیست.");
      setPage(value);
    } catch (cause) { if (!signal?.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با علاقه‌مندی‌ها برقرار نشد."); }
    finally { if (!signal?.aborted) setLoading(false); }
  }
  useEffect(() => { const controller = new AbortController(); void load(controller.signal); return () => controller.abort(); }, [pageNumber]);
  async function remove(product: FavoriteProduct) {
    if (busyId) return;
    setBusyId(product.id); setError("");
    try {
      const response = await fetch(`/api/customer/favorites/${product.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("حذف اثر از علاقه‌مندی‌ها انجام نشد.");
      const value = await response.json() as unknown;
      if (!value || typeof value !== "object" || !("saved" in value) || value.saved !== false) throw new Error("پاسخ حذف علاقه‌مندی معتبر نیست.");
      if (page?.items.length === 1 && pageNumber > 1) setPageNumber(value => Math.max(1, value - 1));
      else setPage(current => current ? { ...current, items: current.items.filter(item => item.id !== product.id) } : current);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "ارتباط با علاقه‌مندی‌ها برقرار نشد."); }
    finally { setBusyId(""); }
  }
  return <main className={styles.page} dir="rtl" lang="fa-IR"><MarketHeader current="favorites" />
    <section className={styles.hero}><p className={styles.eyebrow}>حساب مشتری</p><h1>علاقه‌مندی‌های من</h1><p>آثاری را که ذخیره کرده‌اید اینجا پیدا می‌کنید.</p></section>
    <section className={styles.results}>
      {loading && <p className={styles.message}>در حال دریافت علاقه‌مندی‌ها…</p>}
      {error && <p className={styles.error} role="alert">{error}{error.includes("وارد حساب") && <span> ورود واقعی مشتری هنوز به این صفحه متصل نشده است.</span>}<button className={styles.secondary} type="button" onClick={() => void load()}>تلاش دوباره</button></p>}
      {!loading && !error && page?.items.length === 0 && <div className={styles.message}><strong>هنوز اثری ذخیره نکرده‌اید.</strong><Link className={styles.primary} href="/customer/products">کشف آثار</Link></div>}
      {!loading && !error && !!page?.items.length && <div className={styles.grid}>{page.items.map(product => <article className={styles.card} key={product.id}>
        <Link className={styles.cardLink} href={`/customer/product-detail?id=${product.id}`} aria-label={`مشاهدهٔ ${product.title}`}><ProductCover product={product} /></Link>
        <div className={styles.cardBody}><div className={styles.meta}><span>{product.category ?? "بدون دسته‌بندی"}</span><span data-stock={product.availability}>{product.availability === "in_stock" ? "موجود" : "ناموجود"}</span></div><h3><Link href={`/customer/product-detail?id=${product.id}`}>{product.title}</Link></h3><p className={styles.price}>{formatMarketplaceToman(product.priceToman)}</p>
          <div className={styles.favoriteActions}><Link className={styles.detailLink} href={`/customer/product-detail?id=${product.id}`}>مشاهدهٔ اثر</Link><button type="button" className={styles.removeFavorite} disabled={busyId !== ""} onClick={() => void remove(product)}>{busyId === product.id ? "در حال حذف…" : "حذف"}</button></div>
        </div>
      </article>)}</div>}
      {page && (page.page > 1 || page.hasMore) && <nav className={styles.pagination} aria-label="صفحه‌بندی علاقه‌مندی‌ها"><button type="button" disabled={loading || page.page <= 1} onClick={() => setPageNumber(value => Math.max(1, value - 1))}>صفحهٔ قبل</button><span>{new Intl.NumberFormat("fa-IR").format(page.page)}</span><button type="button" disabled={loading || !page.hasMore} onClick={() => setPageNumber(value => value + 1)}>صفحهٔ بعد</button></nav>}
    </section>
    <footer className={styles.footer}><Link href="/customer/products">بازگشت به کشف آثار</Link><span>نگارین · حساب مشتری</span></footer>
  </main>;
}

export function CustomerCartLive() {
  const [cart, setCart] = useState<ReturnType<typeof parseCustomerCart>>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function refresh(signal?: AbortSignal) {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/customer/cart", { cache: "no-store", signal });
      if (response.status === 401) throw new Error("برای دیدن سبد خرید، ابتدا وارد حساب مشتری شوید.");
      if (!response.ok) throw new Error("سبد خرید دریافت نشد.");
      const value = parseCustomerCart(await response.json());
      if (!value) throw new Error("پاسخ سبد خرید معتبر نیست.");
      setCart(value);
    } catch (cause) {
      if (!signal?.aborted) setError(cause instanceof Error ? cause.message : "ارتباط با سبد خرید برقرار نشد.");
    } finally { if (!signal?.aborted) setLoading(false); }
  }

  useEffect(() => { const controller = new AbortController(); void refresh(controller.signal); return () => controller.abort(); }, []);

  async function mutate(url: string, method: "PUT" | "DELETE", quantity?: number) {
    if (!cart || busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(url, { method, headers: { "content-type": "application/json" }, body: JSON.stringify({ version: cart.version, ...(quantity === undefined ? {} : { quantity }) }) });
      if (response.status === 401) throw new Error("نشست مشتری معتبر نیست؛ دوباره وارد شوید.");
      if (response.status === 409) throw new Error("سبد یا موجودی تغییر کرده است؛ سبد تازه‌سازی شد.");
      if (!response.ok) throw new Error("تغییر سبد خرید انجام نشد.");
      const updated = parseCustomerCart(await response.json());
      if (!updated) throw new Error("پاسخ سبد خرید معتبر نیست.");
      setCart(updated);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "ارتباط با سبد خرید برقرار نشد.");
      if (cause instanceof Error && cause.message.includes("تازه‌سازی")) await refresh();
    } finally { setBusy(false); }
  }

  return <main className={styles.page} dir="rtl" lang="fa-IR">
    <MarketHeader current="cart" />
    <section className={styles.hero}><p className={styles.eyebrow}>بازار نگارین</p><h1>سبد خرید</h1><p>{cart ? `${new Intl.NumberFormat("fa-IR").format(cart.items.length)} اثر در سبد خرید` : "آثار انتخاب‌شدهٔ شما"}</p></section>
    {loading && <p className={styles.message}>در حال دریافت سبد خرید…</p>}
    {error && <p className={styles.error} role="alert">{error}{error.includes("وارد حساب") && <span> ورود واقعی مشتری هنوز به این صفحه متصل نشده است.</span>}<button className={styles.secondary} type="button" onClick={() => void refresh()}>تلاش دوباره</button></p>}
    {!loading && !error && cart && cart.items.length === 0 && <section className={styles.emptyCart}><div aria-hidden="true">🛍</div><h2>سبد خریدت خالی است</h2><p>می‌توانی میان آثار نگارین بگردی و اثرهای مورد علاقه‌ات را به سبد اضافه کنی.</p><Link className={styles.primary} href="/customer/products">کشف آثار</Link></section>}
    {!loading && !error && cart && cart.items.length > 0 && <section className={styles.cartLayout}>
      <div className={styles.cartLines}>
        {cart.items.map(item => <article className={styles.cartLine} key={item.productId}>
          <ProductCartCover productId={item.productId} imageId={item.product?.coverImageId ?? null} title={item.product?.title ?? "اثر ناموجود"} />
          <div className={styles.cartInfo}><h2>{item.product?.title ?? "این اثر دیگر در بازار موجود نیست"}</h2><strong>{item.product ? formatMarketplaceToman(item.product.priceToman) : "قیمت در دسترس نیست"}</strong><p data-stock={item.status}>{item.status === "available" ? "موجود" : item.status === "out_of_stock" ? "ناموجود" : item.status === "insufficient_stock" ? "موجودی کمتر از تعداد انتخاب‌شده است" : "از بازار خارج شده است"}</p></div>
          <div className={styles.cartActions}><div><button type="button" disabled={busy || item.quantity <= 1} aria-label="کم‌کردن تعداد" onClick={() => void mutate(`/api/customer/cart/items/${item.productId}`, "PUT", item.quantity - 1)}>−</button><span>{new Intl.NumberFormat("fa-IR").format(item.quantity)}</span><button type="button" disabled={busy || item.quantity >= 100 || item.status !== "available"} aria-label="زیادکردن تعداد" onClick={() => void mutate(`/api/customer/cart/items/${item.productId}`, "PUT", item.quantity + 1)}>+</button></div><button type="button" className={styles.remove} disabled={busy} onClick={() => void mutate(`/api/customer/cart/items/${item.productId}`, "DELETE")}>حذف</button></div>
        </article>)}
        <button type="button" className={styles.clearCart} disabled={busy} onClick={() => void mutate("/api/customer/cart", "DELETE")}>خالی‌کردن سبد</button>
      </div>
      <aside className={styles.summary}><h2>خلاصهٔ سبد</h2><div><span>جمع کالاها</span><strong>{cart.subtotalToman === null ? "قابل محاسبه نیست" : formatMarketplaceToman(cart.subtotalToman)}</strong></div><p>هزینهٔ ارسال و مبلغ نهایی در مرحلهٔ سفارش مشخص می‌شود.</p><Link className={`${styles.primary} ${!cart.canCheckout ? styles.disabledLink : ""}`} aria-disabled={!cart.canCheckout} href={cart.canCheckout ? "/customer/checkout" : "/customer/cart"}>ادامهٔ خرید</Link>{!cart.canCheckout && <small>برای ادامه، همهٔ کالاها باید موجود باشند.</small>}</aside>
    </section>}
    <footer className={styles.footer}><Link href="/customer/products">بازگشت به کشف آثار</Link><span>نگارین · بازار آثار هنرمندان</span></footer>
  </main>;
}

function ProductCartCover({ productId, imageId, title }: { productId: string; imageId: string | null; title: string }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(""); if (!imageId) return;
    const controller = new AbortController();
    void fetch(`/api/catalog/products/${productId}/images/${imageId}`, { cache: "no-store", signal: controller.signal })
      .then(async response => response.ok ? await response.json() as unknown : null)
      .then(value => { if (value && typeof value === "object" && "url" in value && typeof value.url === "string") setUrl(value.url); }).catch(() => {});
    return () => controller.abort();
  }, [productId, imageId]);
  return <div className={styles.cartCover}>{url ? <img src={url} alt={title} loading="lazy" /> : <span>تصویر اثر</span>}</div>;
}
