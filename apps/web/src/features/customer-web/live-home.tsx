"use client";
import {PublicArtistTeasers,PublicStoryTeasers} from "./live-public-content";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect,useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import CustomerWebHome from "./screens/home";
import {CustomerLiveNavigation} from "./customer-controls";
import {ProductImage} from "./live-catalog";
import {formatToman,parseProductPage} from "../corporate-buyer/live-data";
import styles from "./live-catalog.module.css";
const categories:[string,string][]=[["9eaff63a.png", "چرم"], ["2a209d45.png", "گلیم"], ["ce72a622.png", "فلز"], ["bc3f405d.png", "پارچه"], ["59ca727f.png", "زیور"], ["3481d4b1.png", "چوب"], ["5626da65.png", "بافت"], ["28da9482.png", "سفال"], ["e8b31449.png", "مینا"]];
export default function CustomerHomeLive(){
 const router=useRouter();
 const [query,setQuery]=useState("");
 const [data,setData]=useState<ReturnType<typeof parseProductPage>>(null);
 const [error,setError]=useState("");
 const [retry,setRetry]=useState(0);
 useEffect(()=>{
  const controller=new AbortController();setData(null);setError("");
  void fetch("/api/catalog/products?page=1&pageSize=4&sort=newest",{signal:controller.signal,cache:"no-store"}).then(async response=>{
   if(!response.ok)throw new Error("دریافت آثار انجام نشد.");
   const parsed=parseProductPage(await response.json(),{page:1,pageSize:4});if(!parsed)throw new Error("اطلاعات آثار قابل نمایش نیست.");
   if(!controller.signal.aborted)setData(parsed);
  }).catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"ارتباط برقرار نشد.");});
  return()=>controller.abort();
 },[retry]);
 const products=<div className={styles.homeWorks} dir="rtl"><div className={styles.heading}><h2>تازه‌ترین آثار</h2><Link href="/customer/products">مشاهده همه آثار</Link></div>
  {!data&&!error&&<p role="status">در حال دریافت آثار…</p>}
  {error&&<div role="alert"><p>{error}</p><button onClick={()=>setRetry(value=>value+1)}>تلاش دوباره</button></div>}
  {data?.items.length===0&&<p>هنوز اثری برای نمایش وجود ندارد.</p>}
  {data&&<div className={styles.favoriteGrid}>{data.items.map(product=><article className="fg-359ac6e667" key={product.id}><div className={styles.homeImage}><ProductImage product={product}/></div><h3>{product.title}</h3><p>{formatToman(product.priceToman)}</p><Link className={styles.accountLink} href={"/customer/product-detail?id="+product.id}>مشاهده اثر</Link></article>)}</div>}
 </div>;
 return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page} ${styles.homePage}`} lang="fa" dir="ltr"><CustomerWebHome
  search={<form className={styles.search} dir="rtl" onSubmit={event=>{event.preventDefault();const value=query.trim();router.push("/customer/products"+(value?"?q="+encodeURIComponent(value):""));}}><input aria-label="جستجوی آثار" maxLength={200} value={query} onChange={event=>setQuery(event.target.value)} placeholder="جست‌وجوی عنوان یا توضیحات اثر"/><button type="submit">جست‌وجو</button></form>}
  categories={categories.map(([asset,name])=><Link className="fg-5cfab7290c" key={name} href={"/customer/products?category="+encodeURIComponent(name)}><div className="fg-c3029439ce"><img alt="" className="fg-7f65b5d6bb" src={"/customer-web-assets/"+asset}/></div><span className="fg-99538ea78b">{name}</span></Link>)}
  artists={<PublicArtistTeasers/>}
  stories={<PublicStoryTeasers/>}
  products={products}
 /></main></CustomerLiveNavigation.Provider>;
}
