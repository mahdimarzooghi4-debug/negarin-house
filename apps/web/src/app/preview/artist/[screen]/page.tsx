import Link from "next/link";
import { notFound } from "next/navigation";
import { artistScreens,screenLoaders,type ArtistScreenSlug } from "../../../../features/artist/screen-registry";
export default async function ArtistScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
 const {screen}=await params;const {canvas}=await searchParams;
 const entry=artistScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const {default:Screen}=await screenLoaders[screen as ArtistScreenSlug]();
 return <>
  {canvas!=="1"&&<header className="preview-toolbar"><Link href="/preview/artist">همهٔ ۸۳ صفحه</Link><span>{entry.name.replace(/&amp;/g,"&")} · دادهٔ نمونه</span><a target="_blank" rel="noreferrer" href={"https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-")}>مرجع فیگما</a></header>}
  <div className="artist-design" dir="ltr" style={{height:entry.h}}><Screen/></div>
 </>;
}
