"use client";
import Link from "next/link";
import {usePathname,useRouter} from "next/navigation";
import type {ReactNode} from "react";
import styles from "./live.module.css";

const nav = [
  {label:"پیشخوان", icon:"0b38f240.svg"},
  {label:"درخواست‌های خرید", icon:"79a7e40d.svg", href:"/corporate-buyer/purchase-requests"},
  {label:"محصولات سازمانی", icon:"75294634.svg", href:"/corporate-buyer/corporate-products"},
  {label:"پیشنهادها", icon:"443db617.svg"},
  {label:"سفارش‌ها", icon:"12af18ad.svg"},
  {label:"تحویل‌ها", icon:"a063a5f7.svg"},
  {label:"گزارش‌ها", icon:"add8ee80.svg"},
  {label:"حساب سازمان", icon:"a05b23e8.svg"}
];

export function CorporateLiveShell({title,children}:{title:string;children:ReactNode}){
  const router=useRouter();
  const pathname=usePathname();
  async function logout(){
    const response=await fetch("/api/auth/session",{method:"DELETE"});
    if(response.ok) router.refresh();
  }
  return <div className={styles.shell} dir="rtl" lang="fa-IR">
    <aside className={styles.sidebar}>
      <Link href="/corporate-buyer/corporate-products" className={styles.brand}>
        <img src="/corporate-buyer-assets/530a0f8f.png" alt="" />
        <span><strong>نگارین</strong><small>پرتال خریدار سازمانی</small></span>
      </Link>
      <nav className={styles.nav} aria-label="منوی خریدار سازمانی">
        {nav.map(({label,href,icon})=>{
          const content=<><img src={"/corporate-buyer-assets/"+icon} width={18} height={18} alt="" />{label}</>;
          return href
            ? <Link key={label} href={href} aria-current={pathname===href?"page":undefined}>{content}</Link>
            : <span key={label} aria-disabled="true">{content}</span>;
        })}
        <Link href="/corporate-buyer/new-purchase-request" aria-current={pathname==="/corporate-buyer/new-purchase-request"?"page":undefined}>ثبت درخواست</Link>
      </nav>
      <button className={styles.logout} type="button" onClick={()=>void logout()}>خروج امن</button>
    </aside>
    <main className={styles.main}>
      <header className={styles.header}><div><p>خانه نگارین / فضای کاری سازمانی</p><h1>{title}</h1></div><span className={styles.liveBadge}>دادهٔ واقعی</span></header>
      {children}
    </main>
  </div>;
}
