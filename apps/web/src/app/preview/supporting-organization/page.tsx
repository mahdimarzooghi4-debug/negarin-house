import Link from "next/link";
import { supportingOrganizationScreens } from "../../../features/supporting-organization/screen-registry";

export default function SupportingOrganizationCatalog(){
 return <main className="preview-catalog" dir="rtl">
  <h1>پنل سازمان حامی نگارین — دسکتاپ</h1>
  <p>هر ۱۹ صفحهٔ بوم فیگما آمادهٔ بازبینی است. اطلاعات نمونه‌اند و عملیات واقعی سرور انجام نمی‌شود.</p>
  <p><Link href="/preview/admin">مدیریت نگارین</Link> · <Link href="/preview/export-partner">شریک خارجی</Link> · <Link href="/preview/service-partner">همکار خدمات</Link></p>
  <div className="preview-groups">{[...new Set(supportingOrganizationScreens.map(s=>s.section))].map(section=><section key={section}><h2>{section}</h2><ul>{supportingOrganizationScreens.filter(s=>s.section===section).map(s=><li key={s.id}><Link href={"/preview/supporting-organization/"+s.slug}>{s.name.replace("Supporting Organization / ","")}</Link></li>)}</ul></section>)}</div>
 </main>;
}
