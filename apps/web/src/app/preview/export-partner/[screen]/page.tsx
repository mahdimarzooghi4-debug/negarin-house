import Link from "next/link";
import { exportPending } from "../../../../features/export-partner/languages";
import { notFound } from "next/navigation";
import { exportPartnerScreens,exportPartnerLoaders,type ExportPartnerScreenSlug } from "../../../../features/export-partner/screen-registry";

export default async function ExportPartnerScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
 const {screen}=await params;const {canvas}=await searchParams;
 const entry=exportPartnerScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const languageDir=entry.language==="ar"?"rtl":"ltr";
 if(!entry.implemented)return <main className="preview-catalog" lang={entry.language} dir={languageDir}><h1>{entry.name}</h1><p>{exportPending[entry.language]}</p><Link href="/preview/export-partner">← Negarin · 77 screens</Link><p><a href={"https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-")}>Figma</a></p></main>;
 const {default:Screen}=await exportPartnerLoaders[screen as ExportPartnerScreenSlug]();
 return <>
  {canvas!=="1"&&<header className="preview-toolbar"><Link href="/preview/export-partner">همهٔ صفحه‌های شریک خارجی</Link><span>{entry.name} · دادهٔ نمونه</span><a href={"https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-")} target="_blank" rel="noreferrer">مرجع فیگما</a></header>}
  <div className="export-partner-design" lang={entry.language} dir="ltr" style={{height:entry.h}}><Screen/></div>
 </>;
}
