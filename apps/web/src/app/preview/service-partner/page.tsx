import Link from "next/link";
import { servicePartnerScreens } from "../../../features/service-partner/screen-registry";

export default function ServicePartnerCatalog(){
 return <main className="preview-catalog" dir="rtl">
  <h1>همکار خدمات نگارین — دسکتاپ</h1>
  <p>هر ۸ صفحهٔ بوم فیگما آمادهٔ بازبینی است. اطلاعات نمونه‌اند و عملیات واقعی سرور انجام نمی‌شود.</p>
  <p><Link href="/preview/admin">مدیریت نگارین</Link> · <Link href="/preview/artist">پنل هنرمند</Link></p>
  <div className="preview-groups"><section><h2>صفحه‌های پرتال</h2><ul>{servicePartnerScreens.map(s=><li key={s.id}><Link href={"/preview/service-partner/"+s.slug}>{s.name.replace("Service Partner / ","")}</Link></li>)}</ul></section></div>
 </main>;
}
