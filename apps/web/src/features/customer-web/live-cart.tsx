"use client";
import Link from "next/link";
import {useCallback,useEffect,useRef,useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import {ProductImage} from "./live-catalog";
import CustomerCartWeb from "./screens/cart";
import {CustomerLiveNavigation} from "./customer-controls";
import {formatToman} from "../corporate-buyer/live-data";
import {requestCart,type CustomerCart} from "./cart-data";
import styles from "./live-catalog.module.css";

export default function CustomerCartLive(){
  const [cart,setCart]=useState<CustomerCart|null>(null);
  const [loading,setLoading]=useState(true);
  const [working,setWorking]=useState(false);
  const [error,setError]=useState("");
  const busy=useRef(false);
  const load=useCallback(async(signal?:AbortSignal)=>{
    setLoading(true);setError("");
    try{const result=await requestCart(undefined,{signal});if(!signal?.aborted)setCart(result);}
    catch(error){if(!signal?.aborted)setError(error instanceof Error?error.message:"اتصال برقرار نشد.");}
    finally{if(!signal?.aborted)setLoading(false);}
  },[]);
  useEffect(()=>{const controller=new AbortController();void load(controller.signal);return()=>controller.abort();},[load]);

  async function change(productId:string,quantity?:number){
    if(!cart||busy.current)return;
    busy.current=true;setWorking(true);setError("");
    try{
      const result=await requestCart("/api/customer/cart/items/"+productId,{method:quantity===undefined?"DELETE":"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({version:cart.version,...(quantity===undefined?{}:{quantity})})});
      setCart(result);
    }catch(error){setError(error instanceof Error?error.message:"نتیجهٔ تغییر مشخص نیست. سبد خرید را تازه کنید.");setCart(null);}
    finally{busy.current=false;setWorking(false);}
  }

  const content=<>
    <div className="fg-9890a7b8e5" dir="rtl"><h1>سبد خرید</h1><Link href="/customer/products">ادامهٔ کشف آثار</Link></div>
    {loading&&<p role="status" className={styles.empty}>در حال دریافت سبد خرید…</p>}
    {error&&<div role="alert" className={styles.empty}><p>{error}</p><button disabled={working} onClick={()=>void load()}>تازه‌سازی سبد</button></div>}
    {!loading&&!error&&cart&&<section className="fg-973b6e4c3a">
      <div className="fg-e5b6735640" dir="rtl">
        {cart.items.length===0&&<p className={styles.empty}>سبد خرید شما خالی است.</p>}
        {cart.items.map(item=><article key={item.productId} className="fg-2092a3a3b1">
          <div className={styles.cartControls}>
            <button disabled={working||item.quantity<=1||item.status==="unavailable"||item.status==="out_of_stock"} aria-label={"کاهش تعداد "+(item.product?.title??"اثر")} onClick={()=>void change(item.productId,item.quantity-1)}>−</button>
            <output aria-label={"تعداد "+(item.product?.title??"اثر")}>{new Intl.NumberFormat("fa-IR").format(item.quantity)}</output>
            <button disabled={working||item.quantity>=100||item.status!=="available"} aria-label={"افزایش تعداد "+(item.product?.title??"اثر")} onClick={()=>void change(item.productId,item.quantity+1)}>+</button>
            <button disabled={working} onClick={()=>void change(item.productId)}>حذف</button>
          </div>
          <div className="fg-e19e0142ae"><h2>{item.product?.title??"اثر از دسترس خارج شده"}</h2><p>{item.lineSubtotalToman===null?"قیمت در دسترس نیست":formatToman(item.lineSubtotalToman)}</p><p>{({available:"موجود",out_of_stock:"ناموجود",insufficient_stock:"موجودی کمتر از تعداد انتخابی",unavailable:"غیرقابل خرید"})[item.status]}</p></div>
          {item.product&&<div className={styles.cartImage}><ProductImage product={item.product}/></div>}
        </article>)}
      </div>
      <aside className="fg-e8dcb6caf1" dir="rtl"><h2>خلاصه سبد</h2><p>{cart.subtotalToman===null?"جمع مبلغ قابل محاسبه نیست":formatToman(cart.subtotalToman)}</p><button disabled className={`fg-321947be2e ${styles.productLink}`}>ادامهٔ خرید</button></aside>
    </section>}
  </>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page}`} lang="fa" dir="ltr"><CustomerCartWeb content={content}/></main></CustomerLiveNavigation.Provider>;
}
