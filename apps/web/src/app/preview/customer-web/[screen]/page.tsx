import Link from "next/link";
import {notFound} from "next/navigation";
import {customerWebScreens,customerWebLoaders,type CustomerWebScreenSlug} from "../../../../features/customer-web/screen-registry";

export default async function CustomerWebScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
 const {screen}=await params;const {canvas}=await searchParams;const entry=customerWebScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const reference="https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-");
 const {default:Screen}=await customerWebLoaders[screen as CustomerWebScreenSlug]();
 return <>{canvas!=="1"&&<header className="preview-toolbar"><Link href="/preview/customer-web">همهٔ صفحه‌های خریدار سازمانی</Link><span>{entry.name} · دادهٔ نمونه</span><a href={reference} target="_blank" rel="noreferrer">مرجع فیگما</a></header>}<div className="customer-web-design" lang="fa" dir="ltr" style={{height:entry.h}}><Screen/></div></>;
}
