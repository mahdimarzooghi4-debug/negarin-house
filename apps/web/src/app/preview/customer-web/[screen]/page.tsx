import Link from "next/link";
import {notFound} from "next/navigation";
import {customerWebScreens,customerWebLoaders,type CustomerWebScreenSlug} from "../../../../features/customer-web/screen-registry";

export default async function CustomerWebScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
 const {screen}=await params;const {canvas}=await searchParams;const entry=customerWebScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const position=customerWebScreens.findIndex(item=>item.slug===screen);
 const previous=customerWebScreens[position-1];
 const next=customerWebScreens[position+1];
 const number=new Intl.NumberFormat("fa-IR");
 const reference="https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-");
 const {default:Screen}=await customerWebLoaders[screen as CustomerWebScreenSlug]();
 return <>{canvas!=="1"&&<header className="preview-toolbar"><Link href="/preview/customer-web">همهٔ صفحه‌های وب مشتری</Link><span>{entry.name} · دادهٔ نمونه · {number.format(position+1)} از {number.format(customerWebScreens.length)}</span><a href={reference} target="_blank" rel="noreferrer">مرجع فیگما</a><nav aria-label="مرور صفحات وب مشتری">
  {previous&&<Link rel="prev" href={"/preview/customer-web/"+previous.slug}>صفحهٔ قبلی</Link>}
  {" "}
  {next&&<Link rel="next" href={"/preview/customer-web/"+next.slug}>صفحهٔ بعدی</Link>}
 </nav></header>}<div className="customer-web-design" lang="fa" dir="ltr" style={{height:entry.h}}><Screen/></div></>;
}
