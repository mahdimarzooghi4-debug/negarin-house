import Link from "next/link";
import { notFound } from "next/navigation";
import { supportingOrganizationScreens,supportingOrganizationLoaders,type SupportingOrganizationScreenSlug } from "../../../../features/supporting-organization/screen-registry";

export default async function SupportingOrganizationScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
 const {screen}=await params;const {canvas}=await searchParams;
 const entry=supportingOrganizationScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const {default:Screen}=await supportingOrganizationLoaders[screen as SupportingOrganizationScreenSlug]();
 return <>
  {canvas!=="1"&&<header className="preview-toolbar"><Link href="/preview/supporting-organization">همهٔ صفحه‌های سازمان حامی</Link><span>{entry.name} · دادهٔ نمونه</span><a href={"https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-")} target="_blank" rel="noreferrer">مرجع فیگما</a></header>}
  <div className="supporting-organization-design" lang="fa" dir="ltr" style={{height:entry.h}}><Screen/></div>
 </>;
}
