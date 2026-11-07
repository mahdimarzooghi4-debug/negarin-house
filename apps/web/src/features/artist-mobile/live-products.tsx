"use client";
import Link from "next/link";
import {useEffect,useRef,useState,type FormEvent} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import {formatToman,isUuid} from "../corporate-buyer/live-data";
import {parseArtistProduct,parseArtistProducts,requestArtistProduct,type ArtistProduct} from "./live-products-data";
import styles from "./live-products.module.css";

const statuses:Record<ArtistProduct["publicationStatus"],string>={
  draft:"پیش‌نویس",under_review:"در حال بررسی",changes_requested:"نیاز به اصلاح",
  approved:"تأییدشده",published:"منتشرشده"
};
const number=new Intl.NumberFormat("fa-IR");
function digits(value:string):string{return value.replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632));}
function errorText(error:unknown){return error instanceof Error?error.message:"عملیات تأیید نشد. وضعیت را از سرور دوباره دریافت کنید.";}
function action(body:unknown,method="POST"):RequestInit{
  return {method,headers:{"Content-Type":"application/json"},body:JSON.stringify(body)};
}
function Navigation(){
  return <nav className={styles.navigation} aria-label="منوی هنرمند">
    <Link href="/artist-mobile/products" aria-current="page"><span className={styles.icon} aria-hidden="true">inventory_2</span>محصولات</Link>
    <Link href="/artist/storefront-editor"><span className={styles.icon} aria-hidden="true">storefront</span>غرفه</Link>
    <Link href="/artist/stories"><span className={styles.icon} aria-hidden="true">movie</span>روایت‌ها</Link>
  </nav>;
}
function ProductPhoto({product}:{product:ArtistProduct}){
  const imageId=product.imageIds[0];
  const [url,setUrl]=useState<string|null>(null);
  useEffect(()=>{
    if(!imageId)return;
    const controller=new AbortController();
    setUrl(null);
    void fetch("/api/artist/products/"+product.id+"/images/"+imageId,{signal:controller.signal,cache:"no-store"})
      .then(async r=>{if(!r.ok)throw Error("image-unavailable");return r.json();})
      .then(value=>{if(!controller.signal.aborted&&value&&typeof value.url==="string"&&/^https:\/\//.test(value.url))setUrl(value.url);})
      .catch(()=>{if(!controller.signal.aborted)setUrl(null);});
    return()=>controller.abort();
  },[product.id,imageId]);
  return <div className={styles.photo}>{url?<img src={url} alt={product.title} referrerPolicy="no-referrer"/>:<span className={styles.icon} aria-hidden="true">image</span>}</div>;
}
export function ArtistProductsListLive(){
  const [products,setProducts]=useState<ArtistProduct[]|null>(null);
  const [error,setError]=useState(""),[retry,setRetry]=useState(0),[query,setQuery]=useState(""),[filter,setFilter]=useState("all");
  useEffect(()=>{
    const controller=new AbortController();setProducts(null);setError("");
    void requestArtistProduct("/api/artist/products",parseArtistProducts,{signal:controller.signal})
      .then(items=>{if(!controller.signal.aborted)setProducts(items);})
      .catch(e=>{if(!controller.signal.aborted)setError(errorText(e));});
    return()=>controller.abort();
  },[retry]);
  const visible=products?.filter(p=>(filter==="all"||(filter==="out_of_stock"?p.availability==="out_of_stock":p.publicationStatus===filter))&&
    p.title.toLocaleLowerCase("fa").includes(query.trim().toLocaleLowerCase("fa")))??[];
  return <main className={styles.page} dir="rtl" lang="fa" data-node-id="840:59">
    <header className={styles.header}><h1>محصولات من</h1><p>{products?number.format(products.length)+" محصول ثبت‌شده":"محصولات هنرمند"}</p></header>
    <section className={styles.workspace}>
      <div className={styles.summary}>
        <div><strong>{products?number.format(products.length):"—"}</strong><small>همه محصولات</small></div>
        <div><strong>{products?number.format(products.filter(p=>p.publicationStatus==="published").length):"—"}</strong><small>منتشرشده</small></div>
        <div><strong>{products?number.format(products.filter(p=>p.publicationStatus==="draft").length):"—"}</strong><small>پیش‌نویس</small></div>
      </div>
      <section className={styles.notice}><p>محصولات این صفحه فقط از اطلاعات حساب هنرمند دریافت می‌شوند. بررسی و انتشار محصول، مراحل جداگانه دارند.</p></section>
      <label className={styles.search}>جست‌وجوی نام محصول<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="نام محصول…" type="search"/></label>
      <div className={styles.filters} role="group" aria-label="فیلتر محصولات">
        {[{id:"all",label:"همه"},{id:"draft",label:"پیش‌نویس"},{id:"under_review",label:"در حال بررسی"},{id:"out_of_stock",label:"ناموجود"}].map(f=><button key={f.id} aria-pressed={filter===f.id} onClick={()=>setFilter(f.id)}>{f.label}</button>)}
      </div>
      {error?<section role="alert" className={styles.state}><p>{error}</p><button onClick={()=>setRetry(n=>n+1)}>دریافت دوباره محصولات</button></section>:
       products===null?<p role="status">در حال دریافت محصولات…</p>:
       visible.length===0?<p className={styles.state}>محصولی مطابق این وضعیت یافت نشد.</p>:
       <section className={styles.cards} aria-label="فهرست محصولات">
        {visible.map(product=><article className={styles.card} key={product.id}>
          <div className={styles.top}><ProductPhoto product={product}/><div><h2>{product.title}</h2>{product.category&&<p>{product.category}</p>}
          <p className={styles.badge}>{statuses[product.publicationStatus]}</p></div></div>
          <div className={styles.meta}><strong>{formatToman(product.priceToman)}</strong><span>موجودی: {number.format(product.stockQuantity)}</span></div>
          <Link className={styles.link} href={"/artist-mobile/product-editor?id="+product.id}>مدیریت محصول</Link>
        </article>)}
       </section>}
      <Link className={styles.primary} href="/artist-mobile/product-editor">افزودن محصول</Link>
    </section><Navigation/>
  </main>;
}
export function ArtistProductEditorLive({id}:{id:string}){
  const isNew=id==="";
  const [product,setProduct]=useState<ArtistProduct|null>(null),[ready,setReady]=useState(isNew);
  const [title,setTitle]=useState(""),[description,setDescription]=useState(""),[category,setCategory]=useState(""),[price,setPrice]=useState(""),[stock,setStock]=useState("0");
  const [busy,setBusy]=useState(false),[error,setError]=useState(""),[message,setMessage]=useState(""),[retry,setRetry]=useState(0);
  const lock=useRef(false);
  useEffect(()=>{
    if(isNew)return;
    if(!isUuid(id)){setReady(false);setError("شناسه محصول معتبر نیست.");return;}
    const controller=new AbortController();setReady(false);setProduct(null);setError("");setMessage("");
    void requestArtistProduct("/api/artist/products/"+id,parseArtistProduct,{signal:controller.signal})
      .then(item=>{if(controller.signal.aborted)return;setProduct(item);setTitle(item.title);setDescription(item.description??"");setCategory(item.category??"");setPrice(item.priceToman);setStock(String(item.stockQuantity));setReady(true);})
      .catch(e=>{if(!controller.signal.aborted)setError(errorText(e));});
    return()=>controller.abort();
  },[id,isNew,retry]);
  async function save(e:FormEvent){e.preventDefault();if(lock.current||!ready)return;
    const amount=digits(price.trim()),name=title.trim();
    if(!name||name.length>200||!/^[1-9]\d{0,18}$/.test(amount)||BigInt(amount)>9223372036854775807n){setError("نام و قیمت معتبر وارد کنید.");return;}
    lock.current=true;setBusy(true);setError("");setMessage("");
    try{
      const result=await requestArtistProduct(isNew?"/api/artist/products":"/api/artist/products/"+id,parseArtistProduct,
        action({...(isNew?{}:{version:product?.version}),title:name,description:description.trim()||null,category:category.trim()||null,priceToman:amount},isNew?"POST":"PATCH"));
      if(isNew){window.location.assign("/artist-mobile/product-editor?id="+result.id);return;}
      if(result.id!==id)throw Error("هویت محصول در پاسخ سرور تغییر کرده است.");
      setProduct(result);setTitle(result.title);setDescription(result.description??"");setCategory(result.category??"");setPrice(result.priceToman);setStock(String(result.stockQuantity));
      setMessage("تغییرات محصول از سرور تأیید شد.");
    }catch(e){setReady(false);setProduct(null);setError(errorText(e));}
    finally{lock.current=false;setBusy(false);}
  }
  async function updateInventory(e:FormEvent){e.preventDefault();if(!product||!ready||lock.current)return;
    const quantity=digits(stock.trim());
    if(!/^(0|[1-9]\d*)$/.test(quantity)||Number(quantity)>2147483647){setError("موجودی باید یک عدد صحیح نامنفی معتبر باشد.");return;}
    lock.current=true;setBusy(true);setError("");setMessage("");
    try{
      const response=await fetch("/api/artist/products/"+id+"/inventory",{
        ...action({inventoryVersion:product.inventoryVersion,stockQuantity:Number(quantity)},"PATCH"),cache:"no-store"
      });
      if(!response.ok)throw Error(response.status===409?"موجودی تغییر کرده است؛ دوباره دریافت کنید.":"ثبت موجودی تأیید نشد.");
      const result=await response.json();
      if(result?.productId!==id||result?.stockQuantity!==Number(quantity)||result?.inventoryVersion!==product.inventoryVersion+1)
        throw Error("پاسخ تغییر موجودی معتبر نیست.");
      const fresh=await requestArtistProduct("/api/artist/products/"+id,parseArtistProduct);
      if(fresh.id!==id||fresh.stockQuantity!==Number(quantity)||fresh.inventoryVersion!==result.inventoryVersion)throw Error("ثبت موجودی با خواندن مجدد تأیید نشد.");
      setProduct(fresh);setStock(String(fresh.stockQuantity));setMessage("موجودی ثبت و از سرور تأیید شد.");
    }catch(e){setReady(false);setProduct(null);setError(errorText(e));}
    finally{lock.current=false;setBusy(false);}
  }
  async function uploadImage(file:File){
    if(!product||!ready||lock.current)return;
    if(file.size<1||file.size>5*1024*1024||!["image/jpeg","image/png","image/webp"].includes(file.type)){
      setError("تصویر باید JPEG، PNG یا WebP و حداکثر ۵ مگابایت باشد.");return;
    }
    lock.current=true;setBusy(true);setError("");setMessage("");
    try{
      const bytes=new Uint8Array(await file.arrayBuffer());
      let binary="";for(const byte of bytes)binary+=String.fromCharCode(byte);
      const response=await fetch("/api/artist/products/"+id+"/images",{
        ...action({version:product.version,base64:btoa(binary)}),cache:"no-store"
      });
      if(!response.ok)throw Error(response.status===409?"نسخه محصول یا گالری تغییر کرده است؛ دوباره دریافت کنید.":"آپلود تصویر تأیید نشد.");
      const result=await response.json();
      if(!isUuid(result?.id)||result?.version!==product.version+1)throw Error("پاسخ ثبت تصویر معتبر نیست.");
      const fresh=await requestArtistProduct("/api/artist/products/"+id,parseArtistProduct);
      if(fresh.id!==id||fresh.version!==result.version||!fresh.imageIds.includes(result.id))throw Error("تصویر در خواندن مجدد ثبت نشده است.");
      setProduct(fresh);setMessage("تصویر محصول ثبت و از سرور تأیید شد.");
    }catch(e){setReady(false);setProduct(null);setError(errorText(e));}
    finally{lock.current=false;setBusy(false);}
  }
  async function transition(actionName:"submit"|"publish"){
    if(!product||!ready||lock.current)return;
    lock.current=true;setBusy(true);setError("");setMessage("");
    try{
      const response=await fetch("/api/artist/products/"+id+"/"+actionName,{
        ...action({version:product.version}),cache:"no-store"
      });
      if(!response.ok)throw Error(response.status===409?"وضعیت محصول تغییر کرده است؛ دوباره دریافت کنید.":"درخواست وضعیت تأیید نشد.");
      const fresh=await requestArtistProduct("/api/artist/products/"+id,parseArtistProduct);
      const target=actionName==="submit"?"under_review":"published";
      if(fresh.id!==id||fresh.publicationStatus!==target)throw Error("وضعیت جدید در خواندن مجدد تأیید نشد.");
      setProduct(fresh);setMessage(actionName==="submit"?"برای بررسی ارسال شد؛ هنوز تأیید یا منتشر نشده است.":"انتشار از سرور تأیید شد.");
    }catch(e){setReady(false);setProduct(null);setError(errorText(e));}
    finally{lock.current=false;setBusy(false);}
  }
  const editable=!!product&&["draft","changes_requested","approved"].includes(product.publicationStatus);
  const dirty=!!product&&(title.trim()!==product.title||(description.trim()||null)!==product.description||(category.trim()||null)!==product.category||digits(price.trim())!==product.priceToman);
  return <main className={styles.page} dir="rtl" lang="fa" data-node-id="840:155">
    <header className={styles.header}><Link href="/artist-mobile/products" aria-label="بازگشت به محصولات" className={styles.back}><span className={styles.icon} aria-hidden="true">arrow_forward</span></Link><h1>{isNew?"افزودن محصول":"مدیریت محصول"}</h1><p>{isNew?"اطلاعات اثر را ثبت کنید":"اطلاعات ثبت‌شده محصول"}</p></header>
    <div className={styles.workspace}>
      {error&&<div className={styles.state} role="alert"><p>{error}</p>{!isNew&&isUuid(id)&&<button disabled={busy} onClick={()=>setRetry(n=>n+1)}>دریافت دوباره محصول</button>}</div>}
      {message&&<p role="status" className={styles.notice}>{message}</p>}
      {!isNew&&!ready&&!error&&<p role="status">در حال دریافت محصول…</p>}
      {ready&&<><form onSubmit={save} className={styles.form}><h2>اطلاعات اصلی</h2>
        <label>نام محصول<input maxLength={200} required disabled={busy||(!isNew&&!editable)} value={title} onChange={e=>setTitle(e.target.value)}/></label>
        <label>دسته هنری<input maxLength={200} disabled={busy||(!isNew&&!editable)} value={category} onChange={e=>setCategory(e.target.value)}/></label>
        <label>توضیحات<textarea maxLength={20000} rows={3} disabled={busy||(!isNew&&!editable)} value={description} onChange={e=>setDescription(e.target.value)}/></label>
        <label>قیمت فروش (تومان)<input inputMode="numeric" required disabled={busy||(!isNew&&!editable)} value={price} onChange={e=>setPrice(e.target.value)}/></label>
        {(isNew||editable)&&<button className={styles.primary} disabled={busy||(!isNew&&!dirty)} type="submit">{isNew?"ذخیره پیش‌نویس":"ذخیره تغییرات"}</button>}
      </form>
      {product&&<><p className={styles.state}>وضعیت: {statuses[product.publicationStatus]}</p>
        <section className={styles.form}><h2>تصاویر محصول</h2>
          <p>{number.format(product.imageIds.length)} تصویر ثبت‌شده</p>
          <label>افزودن تصویر<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy||!editable||dirty||product.imageIds.length>=8} onChange={e=>{const file=e.currentTarget.files?.[0];e.currentTarget.value="";if(file)void uploadImage(file);}}/></label>
          {dirty&&<p>پیش از افزودن تصویر، تغییرات متن و قیمت را ذخیره کنید.</p>}
        </section>
        <form className={styles.form} onSubmit={updateInventory}><h2>موجودی</h2><label>موجودی قابل فروش<input inputMode="numeric" disabled={busy} value={stock} onChange={e=>setStock(e.target.value)}/></label><button disabled={busy||product.stockQuantity===Number(digits(stock))||product.inventoryVersion>=2147483647} type="submit">ثبت موجودی</button></form>
        <section className={styles.form}><h2>بررسی و انتشار</h2><p>ثبت پیش‌نویس، بررسی انسانی و انتشار مراحل مستقل هستند.</p>
          {["draft","changes_requested"].includes(product.publicationStatus)&&<button disabled={busy||dirty||product.version>=2147483647} onClick={()=>void transition("submit")}>ارسال برای بررسی</button>}
          {product.publicationStatus==="approved"&&<button disabled={busy||dirty||product.version>=2147483647} onClick={()=>void transition("publish")}>انتشار محصول تأییدشده</button>}
          {dirty&&<p>ابتدا تغییرات را ذخیره کنید.</p>}
        </section></>}
      <p className={styles.hint}>تصاویر فقط از رسانه معتبر محصول نمایش داده می‌شوند؛ تصویر نمونه استفاده نمی‌شود.</p></>}
    </div><Navigation/>
  </main>;
}
