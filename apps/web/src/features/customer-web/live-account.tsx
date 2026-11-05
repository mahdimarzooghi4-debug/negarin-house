"use client";
import {CustomerProfileEditor} from "./profile-editor";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import CustomerAccountOverviewWeb from "./screens/account-overview";
import {CustomerLiveNavigation} from "./customer-controls";
import {isUuid,formatToman,formatPersianDate} from "../corporate-buyer/live-data";
import {requestAddressBook,type AddressBook} from "./address-data";
import {parseCustomerOrderPage,readCustomerOrders,orderStatusLabels,paymentStatusLabels,type OrderPage} from "./order-data";
import styles from "./live-catalog.module.css";

export default function CustomerAccountLive(){
  const [name,setName]=useState("");
  const [ready,setReady]=useState(false);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [orders,setOrders]=useState<OrderPage|null>(null);
  const [book,setBook]=useState<AddressBook|null>(null);
  const [ordersError,setOrdersError]=useState("");
  const [bookError,setBookError]=useState("");
  const [retry,setRetry]=useState(0);
  const [loggingOut,setLoggingOut]=useState(false);
  const [logoutError,setLogoutError]=useState("");
  const logoutLock=useRef(false);
  useEffect(()=>{
    const controller=new AbortController();
    setName("");setReady(false);setLoading(true);setError("");setOrders(null);setBook(null);setOrdersError("");setBookError("");
    async function load(){
      try{
        const response=await fetch("/api/auth/context",{signal:controller.signal,cache:"no-store"});
        if(!response.ok)throw new Error(response.status===401?"برای مشاهدهٔ حساب وارد شوید.":"دریافت حساب انجام نشد.");
        const context=await response.json();
        if(!isUuid(context?.userId)||context?.activeRole!=="customer")throw new Error("نقش مشتری را در حساب خود انتخاب کنید.");
        if(controller.signal.aborted)return;
        setReady(true);
        const results=await Promise.allSettled([
          readCustomerOrders("/api/customer/orders?page=1&pageSize=3",controller.signal).then(value=>{
            const parsed=parseCustomerOrderPage(value,1,3);
            if(!parsed)throw new Error("اطلاعات سفارش‌ها قابل نمایش نیست.");return parsed;
          }),
          requestAddressBook("/api/customer/addresses",{signal:controller.signal})
        ]);
        if(controller.signal.aborted)return;
        const [orderResult,bookResult]=results;
        if(orderResult.status==="fulfilled")setOrders(orderResult.value);else setOrdersError(orderResult.reason instanceof Error?orderResult.reason.message:"دریافت سفارش‌ها انجام نشد.");
        if(bookResult.status==="fulfilled")setBook(bookResult.value);else setBookError(bookResult.reason instanceof Error?bookResult.reason.message:"دریافت آدرس‌ها انجام نشد.");
      }catch(error){if(!controller.signal.aborted)setError(error instanceof Error?error.message:"ارتباط برقرار نشد.");}
      finally{if(!controller.signal.aborted)setLoading(false);}
    }
    void load();return()=>controller.abort();
  },[retry]);
  async function logout(){
    if(logoutLock.current)return;
    logoutLock.current=true;setLoggingOut(true);setLogoutError("");
    try{
      const response=await fetch("/api/auth/session",{method:"DELETE"});
      if(!response.ok)throw new Error("خروج انجام نشد. دوباره تلاش کنید.");
      window.location.replace("/customer/products");
    }catch(error){setLogoutError(error instanceof Error?error.message:"ارتباط برقرار نشد.");setLoggingOut(false);logoutLock.current=false;}
  }
  const number=(value:number)=>new Intl.NumberFormat("fa-IR").format(value);
  const welcome=<>
    <div className="fg-0d1b10235c" dir="rtl">
      <div className="fg-a9ffbf07ff"><p className="fg-00b08f6bc3">{orders?number(orders.items.length):"—"}</p><p className="fg-25f21a90e4">سفارش اخیر</p></div>
      <div className="fg-a9ffbf07ff"><p className="fg-00b08f6bc3">{book?number(book.addresses.length):"—"}</p><p className="fg-25f21a90e4">آدرس ذخیره‌شده</p></div>
    </div>
    <div className="fg-072aa948fb" dir="rtl"><div><h2 className="fg-6a2294b6bc">{ready?(name?name+"، خوش آمدی":"خوش آمدی"):"حساب مشتری"}</h2>
      {loading&&<p role="status">در حال دریافت اطلاعات حساب…</p>}
      {error&&<p role="alert">{error}</p>}
      {ready&&<button disabled={loggingOut} onClick={logout}>{loggingOut?"در حال خروج…":"خروج از حساب"}</button>}
      {logoutError&&<p role="alert">{logoutError}</p>}
      {!loading&&<button onClick={()=>setRetry(value=>value+1)}>تازه‌سازی حساب</button>}
    </div></div>
  </>;
  const paths=<>
    {[{title:"سفارش‌های من",description:"پیگیری وضعیت و مرور خریدهای قبلی",icon:"receipt_long",href:"/customer/orders",label:"مشاهده سفارش‌ها"},{title:"آدرس‌ها",description:"مدیریت نشانی‌های تحویل ذخیره‌شده",icon:"location_on",href:"/customer/address-book",label:"مدیریت آدرس‌ها"},{title:"علاقه‌مندی‌ها",description:"بازگشت به آثار ذخیره‌شده",icon:"favorite_border",href:"/customer/favorites",label:"دیدن علاقه‌مندی‌ها"}].map(path=><article className="fg-b909c45a8e" key={path.href} dir="rtl"><div className="fg-4e378bdac5"><span className="fg-440e08aff4" aria-hidden="true">{path.icon}</span><h3>{path.title}</h3><p>{path.description}</p></div>{ready&&<Link className={styles.accountLink} href={path.href}>{path.label}</Link>}</article>)}
    {ready&&<CustomerProfileEditor key={retry} onName={setName}/>}
  </>;
  const recent=<div className={styles.accountRecent} dir="rtl">
    {ordersError&&<p role="alert">{ordersError}</p>}{bookError&&<p role="alert">{bookError}</p>}
    {orders?.items.length===0&&<p>هنوز سفارشی در حساب شما ثبت نشده است.</p>}
    {orders?.items.map(order=><Link key={order.id} className="fg-3cde6a351a" href={"/customer/order-detail?id="+order.id}><span>{orderStatusLabels[order.status]}</span><strong>{formatToman(order.subtotalToman)}</strong><span>{formatPersianDate(order.createdAt)}</span><span>سفارش <bdi>{order.id}</bdi><br/>{paymentStatusLabels[order.paymentStatus]}</span><span className="fg-751ef583d4" aria-hidden="true">arrow_back</span></Link>)}
  </div>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page} ${styles.accountPage}`} lang="fa" dir="ltr"><CustomerAccountOverviewWeb welcome={welcome} paths={paths} recent={recent}/></main></CustomerLiveNavigation.Provider>;
}
