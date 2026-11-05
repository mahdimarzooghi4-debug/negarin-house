"use client";
import {useEffect, useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import CustomerProductsWeb from "./screens/products";
import {CustomerLiveNavigation} from "./customer-controls";
import {formatToman, parseProductPage, type CorporateProduct} from "../corporate-buyer/live-data";
import styles from "./live-catalog.module.css";

const categories = [
  ["میناکاری","edefd154"], ["سفال","08481530"], ["گلیم","a7e91d2f"], ["چرم","0c011643"],
  ["چوب","fd6780e8"], ["پارچه","36b2bf23"], ["زیور","2c1b163a"], ["فلز","a90c9966"]
] as const;

function ProductImage({product}:{product:CorporateProduct}) {
  const [url,setUrl] = useState<string|null>(null);
  useEffect(()=>{
    setUrl(null);
    if(!product.coverImageId) return;
    const controller = new AbortController();
    void fetch(`/api/catalog/products/${product.id}/images/${product.coverImageId}`, {signal:controller.signal,cache:"no-store"})
      .then(async response=>response.ok ? response.json() : null)
      .then(body=>{if(!controller.signal.aborted && typeof body?.url==="string") setUrl(body.url);})
      .catch(()=>{});
    return ()=>controller.abort();
  },[product.id,product.coverImageId]);
  return <div className="fg-cd82b7c1b5">{url ? <img className={styles.image} src={url} alt={product.title} onError={()=>setUrl(null)}/> : <span className={styles.placeholder}>تصویر در دسترس نیست</span>}</div>;
}

export default function CustomerCatalogLive() {
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("");
  const [inStock,setInStock] = useState(false);
  const [sort,setSort] = useState("newest");
  const [page,setPage] = useState(1);
  const [data,setData] = useState<ReturnType<typeof parseProductPage>>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [retry,setRetry] = useState(0);

  useEffect(()=>{
    const controller = new AbortController();
    setLoading(true); setError(""); setData(null);
    const params = new URLSearchParams({page:String(page),pageSize:"6",sort});
    if(query) params.set("q",query);
    if(category) params.set("category",category);
    if(inStock) params.set("inStock","true");
    void fetch("/api/catalog/products?"+params, {signal:controller.signal,cache:"no-store"})
      .then(async response=>{
        if(!response.ok) throw new Error("دریافت آثار انجام نشد. دوباره تلاش کنید.");
        const result = parseProductPage(await response.json(),{page,pageSize:6});
        if(!result) throw new Error("اطلاعات آثار قابل نمایش نیست. دوباره تلاش کنید.");
        if(!controller.signal.aborted) setData(result);
      })
      .catch(error=>{if(!controller.signal.aborted) setError(error instanceof Error?error.message:"اتصال برقرار نشد.");})
      .finally(()=>{if(!controller.signal.aborted) setLoading(false);});
    return ()=>controller.abort();
  },[page,query,category,inStock,sort,retry]);

  function clearFilters() {setSearch("");setQuery("");setCategory("");setInStock(false);setSort("newest");setPage(1);}
  const catalog = <section className="fg-92a0d0998e" dir="rtl" aria-label="کاتالوگ آثار">
    <aside className="fg-0911d11db5">
      <h2>فیلترها</h2>
      <label><input type="checkbox" checked={inStock} onChange={e=>{setInStock(e.target.checked);setPage(1);}}/> فقط آثار موجود</label>
      <button className={styles.secondary} type="button" onClick={clearFilters}>پاک کردن فیلترها</button>
    </aside>
    <div className="fg-da907fb7ae">
      <div className={styles.heading}>
        <h2>{category || "همه آثار"}</h2>
        <label>مرتب‌سازی <select value={sort} onChange={e=>{setSort(e.target.value);setPage(1);}}><option value="newest">جدیدترین</option><option value="price_asc">کمترین قیمت</option><option value="price_desc">بیشترین قیمت</option></select></label>
      </div>
      {loading&&<p role="status">در حال دریافت آثار…</p>}
      {error&&<div role="alert"><p>{error}</p><button onClick={()=>setRetry(value=>value+1)}>تلاش دوباره</button></div>}
      {data&&data.items.length===0&&<div className={styles.empty}><h3>اثری با این فیلترها پیدا نشد</h3><button onClick={clearFilters}>پاک کردن فیلترها</button></div>}
      {data&&<div className={styles.grid}>{data.items.map(product=><article className="fg-462efdcecd" key={product.id}>
        <ProductImage product={product}/>
        <span className="fg-9fef477172">{product.category}</span>
        <h3 className="fg-1376618a75">{product.title}</h3>
        <p className="fg-826fb50f4c">{formatToman(product.priceToman)}</p>
        <p>{product.availability==="in_stock"?"موجود":"ناموجود"}</p>
      </article>)}</div>}
      {data&&<nav className={styles.pagination} aria-label="صفحه‌بندی آثار"><button disabled={page<=1} onClick={()=>setPage(value=>value-1)}>قبلی</button><span>صفحهٔ {new Intl.NumberFormat("fa-IR").format(page)}</span><button disabled={!data.hasMore||page>=1000} onClick={()=>setPage(value=>value+1)}>بعدی</button></nav>}
    </div>
  </section>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page}`} lang="fa" dir="ltr">
    <CustomerProductsWeb catalog={catalog}
      search={<form className={styles.search} dir="rtl" onSubmit={e=>{e.preventDefault();setPage(1);setQuery(search.trim());}}><input aria-label="جستجوی آثار" value={search} onChange={e=>setSearch(e.target.value)} placeholder="جست‌وجوی عنوان یا توضیحات اثر"/><button type="submit">جست‌وجو</button></form>}
      categories={<div className="fg-7757f91b36">{categories.map(([name,asset])=><button type="button" key={name} className="fg-7c0d221aa3" aria-pressed={category===name} onClick={()=>{setCategory(category===name?"":name);setPage(1);}}><div className="fg-4e1c3419fa"><img className="fg-8e3c2e60fd" src={`/customer-web-assets/${asset}.png`} alt=""/></div><span className="fg-a338e5e67b">{name}</span></button>)}</div>}
    />
  </main></CustomerLiveNavigation.Provider>;
}
