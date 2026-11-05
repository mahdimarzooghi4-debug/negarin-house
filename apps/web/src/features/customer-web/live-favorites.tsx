"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import CustomerFavoritesEmptyWeb from "./screens/favorites-empty";
import CustomerFavoritesWeb from "./screens/favorites";
import {CustomerLiveNavigation} from "./customer-controls";
import {ProductImage} from "./live-catalog";
import {formatToman} from "../corporate-buyer/live-data";
import {requestFavorites,type Favorites} from "./favorite-data";
import styles from "./live-catalog.module.css";

export function FavoriteToggle({productId}:{productId:string}){
  const [data,setData]=useState<Favorites|null>(null);
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const [retry,setRetry]=useState(0);
  const lock=useRef(false);
  useEffect(()=>{
    const controller=new AbortController();setData(null);setError("");
    void requestFavorites(undefined,{signal:controller.signal}).then(result=>{if(!controller.signal.aborted)setData(result);}).catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"ارتباط برقرار نشد.");});
    return()=>controller.abort();
  },[productId,retry]);
  const saved=data?.items.some(item=>item.productId.toLowerCase()===productId.toLowerCase())??false;
  async function change(){
    if(!data||lock.current)return;lock.current=true;setBusy(true);setError("");
    try{setData(await requestFavorites("/api/customer/favorites/"+productId,{method:saved?"DELETE":"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({version:data.version})}));}
    catch(error){setData(null);setError(error instanceof Error?error.message:"نتیجه مشخص نیست. اطلاعات را تازه کنید.");}
    finally{lock.current=false;setBusy(false);}
  }
  return <div className={styles.shipmentActions}>
    {data?<button disabled={busy||data.version>=2147483647} aria-pressed={saved} onClick={()=>void change()}>{busy?"در حال ثبت…":saved?"حذف از علاقه‌مندی‌ها":"ذخیره اثر"}</button>:!error&&<p role="status">در حال دریافت وضعیت ذخیره…</p>}
    {error&&<div role="alert"><p>{error}</p><button onClick={()=>setRetry(value=>value+1)}>تازه‌سازی علاقه‌مندی‌ها</button></div>}
  </div>;
}
export default function CustomerFavoritesLive(){
  const [data,setData]=useState<Favorites|null>(null);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(true);
  const [retry,setRetry]=useState(0);
  const [busy,setBusy]=useState(false);
  const lock=useRef(false);
  useEffect(()=>{
    const controller=new AbortController();setLoading(true);setData(null);setError("");
    void requestFavorites(undefined,{signal:controller.signal}).then(result=>{if(!controller.signal.aborted)setData(result);}).catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"ارتباط برقرار نشد.");}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return()=>controller.abort();
  },[retry]);
  async function remove(id:string){
    if(!data||lock.current)return;lock.current=true;setBusy(true);setError("");
    try{setData(await requestFavorites("/api/customer/favorites/"+id,{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({version:data.version})}));}
    catch(error){setData(null);setError(error instanceof Error?error.message:"نتیجه مشخص نیست. اطلاعات را تازه کنید.");}
    finally{lock.current=false;setBusy(false);}
  }
  const content=<>
    {loading&&<p role="status">در حال دریافت علاقه‌مندی‌ها…</p>}
    {error&&<div role="alert"><p>{error}</p><button onClick={()=>setRetry(value=>value+1)}>تلاش دوباره</button></div>}
    {data&&<><div className="fg-0a09a79c4c" dir="rtl"><div><h2>آثار ذخیره‌شده</h2><p>{new Intl.NumberFormat("fa-IR").format(data.items.length)} اثر در علاقه‌مندی‌های تو</p></div><span>تازه‌ترین ذخیره‌ها</span></div>
      {data.items.length===0&&<div dir="rtl"><p>هنوز اثری ذخیره نکرده‌ای.</p><Link href="/customer/products">کشف آثار</Link></div>}
      <div className={styles.favoriteGrid} dir="rtl">{data.items.map(item=><article className="fg-462efdcecd" key={item.productId}>
        {item.product?<><div className={`fg-0653586f90 ${styles.favoriteImage}`}><ProductImage product={item.product}/></div><h3>{item.product.title}</h3><p>{item.product.category}</p><strong>{formatToman(item.product.priceToman)}</strong><p>{item.product.availability==="in_stock"?"موجود":"ناموجود"}</p><Link className={styles.accountLink} href={"/customer/product-detail?id="+item.productId}>مشاهده محصول</Link></>:<p>این اثر دیگر در دسترس نیست.</p>}
        <button className={styles.favoriteRemove} disabled={busy||data.version>=2147483647} onClick={()=>void remove(item.productId)}>حذف از علاقه‌مندی‌ها</button>
      </article>)}</div>
    </>}
  </>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page}`} lang="fa" dir="ltr">{data&&data.items.length===0?<CustomerFavoritesEmptyWeb emptyTitle="هنوز اثری ذخیره نکرده‌ای."/>:<CustomerFavoritesWeb content={content}/>}</main></CustomerLiveNavigation.Provider>;
}
