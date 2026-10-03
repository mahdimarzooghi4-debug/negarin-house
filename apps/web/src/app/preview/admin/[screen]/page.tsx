import Link from "next/link";
import { notFound } from "next/navigation";
import { adminScreens,adminLoaders,type AdminScreenSlug } from "../../../../features/admin/screen-registry";

export default async function AdminScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
 const {screen}=await params;const {canvas}=await searchParams;
 const entry=adminScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const figmaURL="https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-");
 if(!entry.implemented)return <main className="admin-preview-pending" data-pending-screen={entry.slug}>
  <h1>{entry.pendingReason === "asset-quota" ? "تصاویر اصلی این صفحه هنوز کامل دریافت نشده‌اند" : "این طرح هنوز دریافت نشده است"}</h1>
  <p>{entry.name}</p><p>{entry.pendingReason === "asset-quota" ? "ساختار طرح دریافت شده است، اما سقف دسترسی فیگما مانع دریافت همهٔ تصاویر اصلی شده است." : "سقف دریافت طرح از فیگما مانع دریافت ساختار دقیق این صفحه شده است."} این مورد در فهرست کارهای باقی‌مانده ثبت شده است.</p>
  <p><a href={figmaURL} target="_blank" rel="noreferrer">طرح در فیگما</a></p><Link href="/preview/admin">فهرست صفحه‌های مدیریت</Link>
 </main>;
 const {default:Screen}=await adminLoaders[screen as AdminScreenSlug]();
 return <>
  {canvas!=="1"&&<header className="preview-toolbar admin-preview-toolbar"><Link href="/preview/admin">همهٔ صفحه‌های مدیریت</Link><span>{entry.name} · دادهٔ نمونه</span><a href={figmaURL} target="_blank" rel="noreferrer">مرجع فیگما</a></header>}
  <div className="artist-design admin-design" dir="ltr" style={{height:entry.h}}><Screen/></div>
 </>;
}
