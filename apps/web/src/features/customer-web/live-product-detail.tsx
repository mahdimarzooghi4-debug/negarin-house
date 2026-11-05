"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import CustomerProductDetailWeb from "./screens/product-detail";
import {CustomerLiveNavigation} from "./customer-controls";
import {ProductImage} from "./live-catalog";
import {formatToman,isUuid,parseCorporateProduct,type CorporateProduct} from "../corporate-buyer/live-data";
import styles from "./live-catalog.module.css";

export default function CustomerProductDetailLive({id}:{id:string}) {
  const [product,setProduct]=useState<CorporateProduct|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [retry,setRetry]=useState(0);
  useEffect(()=>{
    setProduct(null);setLoading(true);setError("");
    if(!isUuid(id)){setError("شناسهٔ اثر معتبر نیست.");setLoading(false);return;}
    const controller=new AbortController();
    void fetch("/api/catalog/products/"+id,{signal:controller.signal,cache:"no-store"})
      .then(async response=>{
        if(response.status===404)throw new Error("این اثر برای نمایش در دسترس نیست.");
        if(!response.ok)throw new Error("دریافت اطلاعات اثر انجام نشد.");
        const result=parseCorporateProduct(await response.json());
        if(!result||result.id.toLowerCase()!==id.toLowerCase())throw new Error("اطلاعات اثر قابل نمایش نیست.");
        if(!controller.signal.aborted)setProduct(result);
      })
      .catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"اتصال برقرار نشد.");})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[id,retry]);

  const content=<>
    <nav className="fg-3bc09ce3d9" dir="rtl" aria-label="مسیر صفحه"><Link href="/customer/products">کشف آثار</Link><span>{product?.title}</span></nav>
    {loading&&<p role="status" className={styles.empty}>در حال دریافت اثر…</p>}
    {error&&<section role="alert" className={styles.empty}><p>{error}</p>{isUuid(id)&&<button onClick={()=>setRetry(value=>value+1)}>تلاش دوباره</button>}</section>}
    {!loading&&!error&&product&&<section className="fg-5441fa8366">
      <div className={`fg-e2ec8b0acd ${styles.gallery}`}><ProductImage product={product}/></div>
      <div className="fg-af2bba6a06" dir="rtl">
        <span className="fg-585f829b1a">{product.category}</span>
        <h1 className="fg-28b3225b4a">{product.title}</h1>
        <p className="fg-4c6177599c">{formatToman(product.priceToman)}</p>
        <h2 className="fg-372374564f">درباره اثر</h2>
        <p className="fg-949e5e7c85">{product.description??"توضیحی برای این اثر ثبت نشده است."}</p>
        <dl className="fg-0cd8e02b4c">
          {[["دسته",product.category],["جنس",product.materials],["ابعاد",product.dimensions],["تکنیک",product.technique],["رنگ",product.color],["نگهداری",product.careInstructions],["وضعیت",product.availability==="in_stock"?"موجود":"ناموجود"]].map(([label,value])=><div className={styles.specification} key={label}><dt>{label}</dt><dd>{value??"ثبت نشده"}</dd></div>)}
        </dl>
        <button className={`fg-321947be2e ${styles.productLink}`} disabled>افزودن به سبد</button>
      </div>
    </section>}
  </>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page}`} lang="fa" dir="ltr"><CustomerProductDetailWeb content={content}/></main></CustomerLiveNavigation.Provider>;
}
