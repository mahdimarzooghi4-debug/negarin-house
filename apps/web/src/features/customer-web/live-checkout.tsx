"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import CustomerCheckoutReviewWeb from "./screens/checkout-review";
import {ProductImage} from "./live-catalog";
import {CustomerLiveNavigation} from "./customer-controls";
import {requestCart,type CustomerCart} from "./cart-data";
import {requestAddressBook,type AddressBook} from "./address-data";
import {checkoutCommand,parseOrderReceipt,type CheckoutCommand,type OrderReceipt} from "./checkout-data";
import {formatToman,formatPersianDate} from "../corporate-buyer/live-data";
import styles from "./live-catalog.module.css";

type Review={cart:CustomerCart;book:AddressBook};
export default function CustomerCheckoutLive({addressId}:{addressId:string}){
  const [review,setReview]=useState<Review|null>(null);
  const [loading,setLoading]=useState(true);
  const [working,setWorking]=useState(false);
  const [error,setError]=useState("");
  const [refresh,setRefresh]=useState(0);
  const [receipt,setReceipt]=useState<OrderReceipt|null>(null);
  const pending=useRef<CheckoutCommand|null>(null);
  const busy=useRef(false);
  useEffect(()=>{
    const controller=new AbortController();
    setLoading(true);setError("");setReview(null);
    void Promise.all([requestCart(undefined,{signal:controller.signal}),requestAddressBook(undefined,{signal:controller.signal})])
      .then(([cart,book])=>{if(!controller.signal.aborted)setReview({cart,book});})
      .catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"دریافت اطلاعات انجام نشد.");})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return()=>controller.abort();
  },[refresh]);
  const address=review?.book.addresses.find(address=>address.id.toLowerCase()===addressId.toLowerCase());
  async function submit(){
    if(!review||!address||busy.current||receipt)return;
    busy.current=true;setWorking(true);setError("");
    try{
      // Keep the entire command fixed after the first attempt so ambiguous failures can be replayed.
      pending.current??=checkoutCommand(review.cart,review.book,address.id,crypto.randomUUID());
      const response=await fetch("/api/customer/orders",{method:"POST",headers:{"content-type":"application/json"},cache:"no-store",body:JSON.stringify(pending.current)});
      if(!response.ok){
        if(response.status>=400&&response.status<500){pending.current=null;setReview(null);}
        const messages:Record<number,string>={401:"برای ثبت سفارش وارد حساب شوید.",403:"نقش مشتری را در حساب خود انتخاب کنید.",409:"قیمت، موجودی، سبد یا آدرس تغییر کرده است. اطلاعات سفارش را تازه کنید.",404:"اثر یا آدرس انتخاب‌شده در دسترس نیست."};
        throw new Error(messages[response.status]??"ثبت سفارش تأیید نشد. دوباره تلاش کنید.");
      }
      const result=parseOrderReceipt(await response.json(),pending.current!.expectedSubtotalToman);
      if(!result)throw new Error("پاسخ ثبت سفارش قابل نمایش نیست. دوباره تلاش کنید.");
      setReceipt(result);
    }catch(error){setError(error instanceof Error?error.message:"نتیجهٔ ثبت مشخص نیست. برای دریافت نتیجه دوباره تلاش کنید.");}
    finally{busy.current=false;setWorking(false);}
  }
  const content=<>
    <div className="fg-641e585cf3" dir="rtl"><h1>بررسی سفارش</h1>{!pending.current&&!receipt&&<Link href="/customer/cart">ویرایش سبد خرید</Link>}</div>
    {!receipt&&<div className="fg-66a4315384"><div className="fg-50427a0e30"><div className="fg-46eb0284d7"><p className="fg-846320e04e">۲ بررسی سفارش</p></div><div className="fg-c5353632b5"><p className="fg-fb7015ae0f">۱ اطلاعات ارسال</p></div></div></div>}
    {loading&&<p role="status" className={styles.empty}>در حال دریافت اطلاعات سفارش…</p>}
    {error&&<div role="alert" className={styles.empty}><p>{error}</p>{!pending.current&&<button disabled={working} onClick={()=>setRefresh(value=>value+1)}>تازه‌سازی اطلاعات سفارش</button>}</div>}
    {receipt?<section className={styles.empty} dir="rtl" role="status"><h2>سفارش ثبت شد</h2><p>شناسهٔ سفارش <bdi>{receipt.id}</bdi></p><p>وضعیت {({reserved:"رزروشده",placed:"ثبت نهایی",cancelled:"لغوشده",expired:"رزرو منقضی‌شده"})[receipt.status]}</p><p>پرداخت {({unpaid:"پرداخت‌نشده",paid:"پرداخت‌شده",reconciliation_required:"در حال بررسی"})[receipt.paymentStatus]}</p><p>{formatToman(receipt.subtotalToman)}</p>{receipt.status==="reserved"&&<p>اعتبار رزرو تا {formatPersianDate(receipt.reservedUntil)}</p>}<Link href="/customer/products">بازگشت به آثار</Link></section>:
      !loading&&review&&<section className="fg-49c2cc15db">
        <div className="fg-da907fb7ae" dir="rtl"><h2>آدرس انتخاب‌شده</h2>
          {address?<div className="fg-0d6a93ce07"><div><h3>{address.recipientName}</h3><p>{address.province}، {address.city}، {address.fullAddress}</p><p><bdi>{address.recipientPhone}</bdi> · <bdi>{address.postalCode}</bdi></p></div></div>:<p>آدرس تحویل را انتخاب کنید.</p>}
          {!pending.current&&<Link href="/customer/address-book">انتخاب یا ویرایش آدرس</Link>}
          <h2>اقلام سفارش</h2>
          {review.cart.items.map(item=><article key={item.productId} className="fg-c20151b560"><h3>{item.product?.title??"اثر خارج از دسترس"}</h3><span>تعداد {new Intl.NumberFormat("fa-IR").format(item.quantity)}</span><p>{item.lineSubtotalToman===null?"قیمت در دسترس نیست":formatToman(item.lineSubtotalToman)}</p>{item.product&&<div className={styles.cartImage}><ProductImage product={item.product}/></div>}</article>)}
          {!review.cart.canCheckout&&<p>سبد خرید را برای ادامه بررسی کنید.</p>}
        </div>
        <aside className="fg-e8dcb6caf1" dir="rtl"><h2>خلاصه سفارش</h2><p>جمع بهای آثار</p><strong>{review.cart.subtotalToman===null?"قابل محاسبه نیست":formatToman(review.cart.subtotalToman)}</strong><p>با ثبت سفارش، موجودی آثار برای مدت محدود رزرو می‌شود.</p><button className={`fg-321947be2e ${styles.productLink}`} disabled={working||!address||!review.cart.canCheckout||review.cart.subtotalToman==="0"} onClick={()=>void submit()}>{working?"در حال ثبت…":pending.current?"تلاش دوباره برای ثبت سفارش":"ثبت سفارش و رزرو آثار"}</button></aside>
      </section>}
  </>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page}`} lang="fa" dir="ltr"><CustomerCheckoutReviewWeb content={content}/></main></CustomerLiveNavigation.Provider>;
}
