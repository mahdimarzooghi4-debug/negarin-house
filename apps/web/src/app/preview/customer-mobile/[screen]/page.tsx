import Link from "next/link";
import { notFound } from "next/navigation";
import { mobileScreens,mobileLoaders,type MobileScreenSlug } from "../../../../features/customer-mobile/screen-registry";

export default async function MobileScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
  const {screen}=await params;const {canvas}=await searchParams;
  const entry=mobileScreens.find(s=>s.slug===screen);if(!entry)notFound();
  const figmaURL="https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-");
  const {default:Screen}=await mobileLoaders[screen as MobileScreenSlug]();
  return <>
    {canvas!=="1"&&<header className="preview-toolbar mobile-preview-toolbar"><Link href="/preview/customer-mobile">همهٔ صفحه‌های موبایل</Link><span>{entry.name} · دادهٔ نمونه</span><a target="_blank" rel="noreferrer" href={figmaURL}>مرجع فیگما</a></header>}
    <div className="artist-design customer-mobile" dir="ltr" style={{height:entry.h}}><Screen/></div>
  </>;
}
