import Link from "next/link";
import { adminScreens } from "../../../features/admin/screen-registry";

export default function AdminCatalog(){
 const sections=[...new Set(adminScreens.map(s=>s.section))];
 const completed=adminScreens.filter(s=>s.implemented).length;
 return <main className="preview-catalog admin-preview-catalog" dir="rtl">
  <h1>مدیریت نگارین — دسکتاپ</h1>
  <p>{completed} صفحه از {adminScreens.length} صفحهٔ فیگما پیاده شده است. داده‌ها نمونه‌اند و عملیات سرور انجام نمی‌شود.</p>
  <p>هر ۱۰۵ صفحهٔ مدیریت با تصاویر اصلی آمادهٔ بازبینی است.</p>
  <p>در طرح فعلی، برخی گروه‌های سایدبار به صورت افقی چیده شده‌اند و بریده می‌شوند. هندسهٔ منبع حفظ شده است؛ اصلاح طراحی سایدبار در فهرست کارهای باقی‌مانده ثبت شده است.</p>
  <p><Link href="/preview/artist">هنرمند — دسکتاپ</Link> · <Link href="/preview/customer-mobile">مشتری — موبایل</Link></p>
  <div className="preview-groups">{sections.map(section=><section key={section}>
   <h2>{section}</h2>
   <ul>{adminScreens.filter(s=>s.section===section).map(s=><li key={s.id}>
    <Link className={s.implemented?undefined:"pending-screen"} href={"/preview/admin/"+s.slug}>{s.name.replace("Admin / ","")}</Link>
    {!s.implemented&&<small> · {s.pendingReason === "asset-quota" ? "در انتظار تصاویر اصلی" : "در انتظار دریافت طرح"}</small>}
   </li>)}</ul>
  </section>)}</div>
 </main>;
}
