import Link from "next/link";
import { exportPartnerScreens } from "../../../features/export-partner/screen-registry";
import { exportLanguages } from "../../../features/export-partner/languages";

export default function ExportPartnerCatalog(){
 return <main className="preview-catalog" dir="rtl">
  <h1>پنل شریک خارجی نگارین — دسکتاپ</h1>
  <p>۶۶ صفحه از ۷۷ صفحه در ۷ زبان آمادهٔ بازبینی است؛ ۱۱ صفحه منتظر خروجی تصاویر اصلی فیگما هستند. اطلاعات نمونه‌اند و عملیات واقعی سرور انجام نمی‌شود.</p>
  <p><Link href="/preview/admin">مدیریت نگارین</Link> · <Link href="/preview/service-partner">همکار خدمات</Link></p>
  <div className="preview-groups">{exportLanguages.map(l=><section key={l.code} lang={l.code} dir={l.code==="ar"?"rtl":"ltr"}><h2>{l.label}</h2><ul>{exportPartnerScreens.filter(s=>s.language===l.code).map(s=><li key={s.id}><Link href={"/preview/export-partner/"+s.slug}>{s.name.replace("Export Partner / ","")}</Link>{!s.implemented&&<small> · pending</small>}</li>)}</ul></section>)}</div>
 </main>;
}
