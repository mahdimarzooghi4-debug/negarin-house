"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import type {ReactNode} from "react";
import styles from "./live.module.css";

const nav=[
  ["محصولات سازمانی","/corporate-buyer/corporate-products"],
  ["درخواست‌های خرید","/corporate-buyer/purchase-requests"],
  ["ثبت درخواست","/corporate-buyer/new-purchase-request"]
] as const;

export function CorporateLiveShell({title,children}:{title:string;children:ReactNode}){
  const router=useRouter();
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
        {nav.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}
        <span aria-disabled="true">پیشنهادها <small>پس از تصویب قرارداد Proposal</small></span>
        <span aria-disabled="true">سفارش‌ها <small>پس از CorporateOrder</small></span>
      </nav>
      <button className={styles.logout} type="button" onClick={()=>void logout()}>خروج امن</button>
    </aside>
    <main className={styles.main}>
      <header className={styles.header}><div><p>خانه نگارین / فضای کاری سازمانی</p><h1>{title}</h1></div><span className={styles.liveBadge}>دادهٔ واقعی</span></header>
      {children}
    </main>
  </div>;
}
