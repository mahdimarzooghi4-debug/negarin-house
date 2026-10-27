import Link from "next/link";
import { mobileScreens } from "../../../features/customer-mobile/screen-registry";
export default function CustomerMobileCatalog(){
 return <main className="preview-catalog mobile-preview-catalog" dir="rtl">
  <h1>مشتری — موبایل</h1>
  <p>تمام ۳۲ صفحهٔ این بخش فیگما پیاده شده است. داده‌ها نمونه‌اند و عملیات سرور انجام نمی‌شود.</p>
  <p><Link href="/preview/artist-mobile">موبایل هنرمند</Link> · <Link href="/preview/artist">دسکتاپ هنرمند</Link></p>
  <div className="preview-groups"><section><h2>صفحه‌ها و حالت‌ها</h2><ul>{mobileScreens.map(s=><li key={s.id}><Link href={"/preview/customer-mobile/"+s.slug}>{s.name.replace("Customer / ","").replace(" - Mobile","")}</Link></li>)}</ul></section></div>
 </main>;
}
