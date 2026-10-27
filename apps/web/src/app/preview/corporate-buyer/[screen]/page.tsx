import Link from "next/link";
import {notFound} from "next/navigation";
import {corporateBuyerScreens,corporateBuyerLoaders,type CorporateBuyerScreenSlug} from "../../../../features/corporate-buyer/screen-registry";

export default async function CorporateBuyerScreenPage({params,searchParams}:{params:Promise<{screen:string}>;searchParams:Promise<{canvas?:string}>}){
 const {screen}=await params;const {canvas}=await searchParams;const entry=corporateBuyerScreens.find(s=>s.slug===screen);if(!entry)notFound();
 const reference="https://www.figma.com/design/Uo0ifnpFmJFhWqaEVmVOZ1/Negarin-House?node-id="+entry.id.replace(":","-");
 if(!entry.implemented)return <main className="preview-catalog" dir="rtl"><h1>{entry.name.replace("Corporate Buyer / ","")}</h1><p>این صفحه در انتظار دریافت تصاویر و آیکن‌های اصلی فیگما است.</p><p>طرح و کد اولیه ذخیره شده‌اند؛ سقف دسترسی فیگما مانع دریافت کامل {entry.missingImageSlots} دارایی این صفحه شد. نسخهٔ ناقص نمایش داده نمی‌شود.</p><p><Link href="/preview/corporate-buyer">همهٔ صفحه‌های خریدار سازمانی</Link> · <a href={reference} target="_blank" rel="noreferrer">مشاهدهٔ طرح فیگما</a></p></main>;
 const {default:Screen}=await corporateBuyerLoaders[screen as CorporateBuyerScreenSlug]();
 return <>{canvas!=="1"&&<header className="preview-toolbar"><Link href="/preview/corporate-buyer">همهٔ صفحه‌های خریدار سازمانی</Link><span>{entry.name} · دادهٔ نمونه</span><a href={reference} target="_blank" rel="noreferrer">مرجع فیگما</a></header>}<div className="corporate-buyer-design" lang="fa" dir="ltr" style={{height:entry.h}}><Screen/></div></>;
}
