import Link from "next/link";
import { notFound } from "next/navigation";
import { mobileScreens,mobileLoaders,type MobileScreenSlug } from "../../../../features/artist-mobile/screen-registry";

export default async function MobileScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
  const {screen}=await params;const {canvas}=await searchParams;
  const entry=mobileScreens.find(s=>s.slug===screen);if(!entry)notFound();
  const figmaURL="https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-");
  if(!entry.implemented)return <main className="mobile-preview-pending" data-pending-screen={entry.slug}>
    <h1>این طرح هنوز دریافت نشده است</h1>
    <p>{entry.name}</p><p>سقف استفادهٔ اتصال فیگما مانع دریافت طرح کامل این صفحه شد. این مورد در فهرست کارهای باقی‌مانده ثبت شده است.</p>
    <p><a href={figmaURL} target="_blank" rel="noreferrer">طرح در فیگما</a></p><Link href="/preview/artist-mobile">فهرست صفحه‌ها</Link>
  </main>;
  const {default:Screen}=await mobileLoaders[screen as MobileScreenSlug]();
  return <>
    {canvas!=="1"&&<header className="preview-toolbar mobile-preview-toolbar"><Link href="/preview/artist-mobile">همهٔ صفحه‌های موبایل</Link><span>{entry.name} · دادهٔ نمونه</span><a target="_blank" rel="noreferrer" href={figmaURL}>مرجع فیگما</a></header>}
    <div className="artist-design artist-mobile" dir="ltr" style={{height:entry.h}}><Screen/></div>
  </>;
}
