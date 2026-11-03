import Link from "next/link";
import { exportPending } from "../../../../features/export-partner/languages";
import { ResponsivePartnerPreview } from "../../../../features/export-partner/responsive-partner-preview";
import { notFound } from "next/navigation";
import { exportPartnerScreens,exportPartnerLoaders,type ExportPartnerScreenSlug } from "../../../../features/export-partner/screen-registry";

export default async function ExportPartnerScreenPage({params}:{params:Promise<{screen:string}>}){
 const {screen}=await params;
 const entry=exportPartnerScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const languageDir=entry.language==="ar"?"rtl":"ltr";
 if(!entry.implemented)return <main className="preview-catalog" lang={entry.language} dir={languageDir}><h1>{entry.name}</h1><p>{exportPending[entry.language]}</p><Link href="/preview/export-partner">← Negarin · 77 screens</Link><p><a href={"https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-")}>Figma</a></p></main>;
 const {default:Screen}=await exportPartnerLoaders[screen as ExportPartnerScreenSlug]();
 return <ResponsivePartnerPreview className="partner-preview-frame" dir="ltr">
  <div className="export-partner-design" lang={entry.language} dir="ltr" style={{height:entry.h}}><Screen/></div>
 </ResponsivePartnerPreview>;
}
