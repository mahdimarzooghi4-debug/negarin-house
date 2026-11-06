"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import {formatToman} from "../corporate-buyer/live-data";
import {requestArtistOrders,type ArtistOrder,type ArtistOrderStatus} from "./live-orders-data";
import styles from "./live-orders.module.css";
const labels:Record<ArtistOrderStatus,string>={awaiting_acceptance:"نیاز به اقدام",accepted:"پذیرفته‌شده",preparing:"در حال آماده‌سازی",packaging:"بسته‌بندی",ready_for_dispatch:"آماده ارسال"};
const filters:Array<{id:"all"|ArtistOrderStatus;label:string}>=[{id:"all",label:"همه"},{id:"awaiting_acceptance",label:"نیازمند اقدام"},{id:"accepted",label:"پذیرفته‌شده"},{id:"preparing",label:"آماده‌سازی"},{id:"packaging",label:"بسته‌بندی"},{id:"ready_for_dispatch",label:"آماده ارسال"}];
const digits=new Intl.NumberFormat("fa-IR");
function date(value:string){return new Intl.DateTimeFormat("fa-IR",{day:"numeric",month:"long"}).format(new Date(value));}
function OrderCard({order}:{order:ArtistOrder}){const itemTitle=order.items.length===1?order.items[0]!.title:"سفارش چندمحصولی";const quantity=order.items.reduce((sum,item)=>sum+item.quantity,0);
 return <article className={styles.card}><div className={styles.cardTop}><h2>#{order.orderId.slice(0,8).toUpperCase()}</h2><span className={styles.badge+" "+styles[order.status]}>{labels[order.status]}</span></div>
 <div className={styles.details}><div><div className={styles.buyer}>{itemTitle}</div><div className={styles.date}>{date(order.createdAt)} · {digits.format(quantity)} عدد</div></div><strong className={styles.amount}>{formatToman(order.merchandiseSubtotalToman)}</strong></div>
 <div className={styles.lines}><span>{digits.format(order.items.length)} قلم کالا</span><span>آخرین بروزرسانی: {date(order.updatedAt)}</span></div></article>;
}
function Navigation(){return <nav className={styles.navigation} aria-label="منوی هنرمند">
 <Link href="/artist-mobile/products"><span className={styles.icon}>inventory_2</span>محصولات</Link><Link href="/artist/storefront-editor"><span className={styles.icon}>storefront</span>غرفه</Link><Link href="/artist/stories"><span className={styles.icon}>movie</span>روایت‌ها</Link><Link href="/artist-mobile/orders" aria-current="page"><span className={styles.icon}>shopping_bag</span>سفارش‌ها</Link>
 </nav>;}
export function ArtistOrdersLive(){
 const [orders,setOrders]=useState<ArtistOrder[]|null>(null),[page,setPage]=useState(1),[hasMore,setHasMore]=useState(false);
 const [filter,setFilter]=useState<"all"|ArtistOrderStatus>("all"),[error,setError]=useState(""),[retry,setRetry]=useState(0),[loadingMore,setLoadingMore]=useState(false);
 useEffect(()=>{const controller=new AbortController();setOrders(null);setError("");setPage(1);
  void requestArtistOrders(1,controller.signal).then(result=>{if(!controller.signal.aborted){setOrders(result.items);setHasMore(result.hasMore);}}).catch(e=>{if(!controller.signal.aborted)setError(e instanceof Error?e.message:"دریافت سفارش‌ها انجام نشد.");});
  return()=>controller.abort();
 },[retry]);
 const counts=useMemo(()=>({action:orders?.filter(o=>o.status==="awaiting_acceptance").length??0,preparing:orders?.filter(o=>o.status==="preparing"||o.status==="packaging").length??0,dispatch:orders?.filter(o=>o.status==="ready_for_dispatch").length??0}),[orders]);
 const visible=orders?.filter(o=>filter==="all"||o.status===filter)??[];
 async function more(){if(loadingMore||!hasMore)return;setLoadingMore(true);setError("");try{const result=await requestArtistOrders(page+1);setOrders(old=>[...(old??[]),...result.items]);setPage(result.page);setHasMore(result.hasMore);}catch(e){setError(e instanceof Error?e.message:"دریافت صفحه بعد انجام نشد.");}finally{setLoadingMore(false);}}
 return <main className={styles.page} dir="rtl" lang="fa" data-node-id="847:87"><header className={styles.header}><h1>سفارش‌ها</h1><p>مدیریت سفارش‌های فروشگاه</p></header><section className={styles.workspace}>
 {orders&&<div className={styles.summary}><div className={styles.metric}><small>نیاز به اقدام · در این صفحه</small><strong>{digits.format(counts.action)} سفارش</strong></div><div className={styles.metric}><small>در حال آماده‌سازی · در این صفحه</small><strong>{digits.format(counts.preparing)} سفارش</strong></div><div className={styles.metric}><small>آماده ارسال · در این صفحه</small><strong>{digits.format(counts.dispatch)} سفارش</strong></div></div>}
 <div className={styles.filters} role="group" aria-label="فیلتر سفارش‌ها">{filters.map(item=><button key={item.id} aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}>{item.label}</button>)}</div>
 {error&&<section className={styles.state} role="alert"><p>{error}</p><button onClick={()=>setRetry(n=>n+1)}>دریافت دوباره</button></section>}
 {orders===null&&!error&&<p className={styles.state} role="status">در حال دریافت سفارش‌ها…</p>}
 {orders&&visible.length===0&&<p className={styles.state}>سفارشی در این وضعیت وجود ندارد.</p>}
 {orders&&visible.length>0&&<section className={styles.cards} aria-label="فهرست سفارش‌های هنرمند">{visible.map(order=><OrderCard key={order.orderId} order={order}/>)}</section>}
 {hasMore&&<button className={styles.more} disabled={loadingMore} onClick={()=>void more()}>{loadingMore?"در حال دریافت…":"نمایش سفارش‌های بیشتر"}</button>}
 </section><Navigation/></main>;
}