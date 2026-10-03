import Link from "next/link";
import { notFound } from "next/navigation";
import { servicePartnerScreens,servicePartnerLoaders,type ServicePartnerScreenSlug } from "../../../../features/service-partner/screen-registry";

export default async function ServicePartnerScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
 const {screen}=await params;const {canvas}=await searchParams;
 const entry=servicePartnerScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const {default:Screen}=await servicePartnerLoaders[screen as ServicePartnerScreenSlug]();
 return <>
  {canvas!=="1"&&<header className="preview-toolbar"><Link href="/preview/service-partner">همهٔ صفحه‌های همکار خدمات</Link><span>{entry.name} · دادهٔ نمونه</span><a href={"https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-")} target="_blank" rel="noreferrer">مرجع فیگما</a></header>}
  <div className="service-partner-design" dir="ltr"><Screen/></div>
 </>;
}
