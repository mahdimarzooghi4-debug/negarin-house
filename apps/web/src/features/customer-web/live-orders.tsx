"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import CustomerOrdersWeb from "./screens/orders";
import CustomerOrderDetailWeb from "./screens/order-detail";
import {CustomerLiveNavigation} from "./customer-controls";
import {formatReservationExpiry} from "./checkout-data";
import {ShipmentActions} from "./shipment-actions";
import {ProductImage} from "./live-catalog";
import {formatToman,formatPersianDate,isUuid} from "../corporate-buyer/live-data";
import {parseCustomerOrder,parseCustomerOrderPage,readCustomerOrders,orderStatusLabels,paymentStatusLabels,preparationStatusLabels,type CustomerOrder,type OrderPage} from "./order-data";
import styles from "./live-catalog.module.css";

export function CustomerOrdersLive(){
  const [page,setPage]=useState(1);
  const [data,setData]=useState<OrderPage|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [retry,setRetry]=useState(0);
  useEffect(()=>{
    const controller=new AbortController();
    setLoading(true);setError("");setData(null);
    void readCustomerOrders(`/api/customer/orders?page=${page}&pageSize=6`,controller.signal)
      .then(body=>{
        const result=parseCustomerOrderPage(body,page,6);
        if(!result)throw new Error("اطلاعات سفارش‌ها قابل نمایش نیست.");
        if(!controller.signal.aborted)setData(result);
      })
      .catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"اتصال برقرار نشد.");})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return()=>controller.abort();
  },[page,retry]);
  const content=<>
    <div className="fg-641e585cf3" dir="rtl"><h1>سفارش‌های من</h1><Link href="/customer/products">کشف آثار</Link></div>
    <section className={styles.ordersWorkspace} dir="rtl">
      {loading&&<p role="status">در حال دریافت سفارش‌ها…</p>}
      {error&&<div role="alert"><p>{error}</p><button onClick={()=>setRetry(value=>value+1)}>تلاش دوباره</button></div>}
      {data&&data.items.length===0&&<p>هنوز سفارشی در حساب شما ثبت نشده است.</p>}
      {data?.items.map(order=><article key={order.id} className="fg-a76652c027">
        <h2>سفارش <bdi>{order.id}</bdi></h2>
        <p>{orderStatusLabels[order.status]} · {paymentStatusLabels[order.paymentStatus]}</p>
        <p>{formatPersianDate(order.createdAt)}</p>
        <p>{order.items.map(item=>item.title).join("، ")}</p>
        <strong>{formatToman(order.subtotalToman)}</strong>
        <Link href={"/customer/order-detail?id="+order.id}>مشاهدهٔ جزئیات سفارش</Link>
      </article>)}
      {data&&<nav className={styles.pagination} aria-label="صفحه‌بندی سفارش‌ها"><button disabled={page<=1} onClick={()=>setPage(value=>value-1)}>قبلی</button><span>صفحهٔ {new Intl.NumberFormat("fa-IR").format(page)}</span><button disabled={!data.hasMore||page>=1000} onClick={()=>setPage(value=>value+1)}>بعدی</button></nav>}
    </section>
  </>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page}`} lang="fa" dir="ltr"><CustomerOrdersWeb content={content}/></main></CustomerLiveNavigation.Provider>;
}

export function CustomerOrderDetailLive({id}:{id:string}){
  const [order,setOrder]=useState<CustomerOrder|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [retry,setRetry]=useState(0);
  useEffect(()=>{
    setOrder(null);setLoading(true);setError("");
    if(!isUuid(id)){setLoading(false);setError("شناسهٔ سفارش معتبر نیست.");return;}
    const controller=new AbortController();
    void readCustomerOrders("/api/customer/orders/"+id,controller.signal)
      .then(body=>{
        const result=parseCustomerOrder(body);
        if(!result||result.id.toLowerCase()!==id.toLowerCase())throw new Error("اطلاعات سفارش قابل نمایش نیست.");
        if(!controller.signal.aborted)setOrder(result);
      })
      .catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"اتصال برقرار نشد.");})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return()=>controller.abort();
  },[id,retry]);
  const content=<>
    <div className="fg-641e585cf3" dir="rtl"><h1>جزئیات سفارش</h1><Link href="/customer/orders">بازگشت به سفارش‌ها</Link></div>
    <section className={styles.ordersWorkspace} dir="rtl">
      {loading&&<p role="status">در حال دریافت سفارش…</p>}
      {error&&<div role="alert"><p>{error}</p>{isUuid(id)&&<button onClick={()=>setRetry(value=>value+1)}>تلاش دوباره</button>}</div>}
      {order&&<>
        <article className="fg-a76652c027"><h2>سفارش <bdi>{order.id}</bdi></h2><p>{orderStatusLabels[order.status]}</p><p>وضعیت پرداخت {paymentStatusLabels[order.paymentStatus]}</p><p>تاریخ ثبت {formatPersianDate(order.createdAt)}</p>{order.status==="reserved"&&<p>اعتبار رزرو تا {formatReservationExpiry(order.reservedUntil)}</p>}<strong>{formatToman(order.subtotalToman)}</strong></article>
        <article className="fg-0d6a93ce07"><div><h2>آدرس تحویل</h2><p>{order.shippingAddress.recipientName}</p><p>{order.shippingAddress.province}، {order.shippingAddress.city}، {order.shippingAddress.fullAddress}</p><p><bdi>{order.shippingAddress.recipientPhone}</bdi> · <bdi>{order.shippingAddress.postalCode}</bdi></p></div></article>
        {order.status==="placed"&&<section aria-label="آماده‌سازی و ارسال" className={styles.fulfillment}>
          <h2>آماده‌سازی و ارسال</h2>
          {order.preparation.map(group=><article key={group.items[0]} className={styles.fulfillmentCard}>
            <h3>{group.items.map(id=>order.items.find(item=>item.productId.toLowerCase()===id.toLowerCase())!.title).join("، ")}</h3>
            <p>{preparationStatusLabels[group.status]}</p>
            {group.shipment?<>
              <p>ارسال توسط هنرمند گزارش شده است؛ شرکت حمل هنوز آن را تأیید نکرده است.</p>
              <dl><dt>شرکت حمل</dt><dd>{group.shipment.carrierName}</dd><dt>کد رهگیری</dt><dd><bdi dir="ltr">{group.shipment.trackingCode}</bdi></dd><dt>تاریخ اعلام ارسال</dt><dd>{formatReservationExpiry(group.shipment.reportedAt)}</dd></dl>
              {group.shipment.receivedAt&&<p>دریافت توسط مشتری تأیید شده است: {formatReservationExpiry(group.shipment.receivedAt)}</p>}
              {order.paymentStatus==="paid"&&<ShipmentActions key={group.shipment.id+":"+group.shipment.customerVersion+":"+retry} orderId={order.id} shipment={group.shipment} onRefresh={()=>setRetry(value=>value+1)}/>}
            </>:<p>هنوز اطلاعات ارسال ثبت نشده است.</p>}
          </article>)}
        </section>}
        <h2>اقلام سفارش</h2>
        {order.items.map(item=><article key={item.productId} className="fg-c20151b560"><div><h3>{item.title}</h3><p>تعداد {new Intl.NumberFormat("fa-IR").format(item.quantity)}</p><p>{formatToman(item.lineSubtotalToman)}</p></div><div className={styles.cartImage}><ProductImage product={{id:item.productId,title:item.title,coverImageId:item.imageIds[0]??null}}/></div></article>)}
      </>}
    </section>
  </>;
  return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page}`} lang="fa" dir="ltr"><CustomerOrderDetailWeb content={content}/></main></CustomerLiveNavigation.Provider>;
}
