import Link from "next/link";
import {corporateBuyerScreens} from "../../../features/corporate-buyer/screen-registry";

export default function CorporateBuyerCatalog(){
 return <main className="preview-catalog" dir="rtl">
  <h1>پرتال خریدار سازمانی نگارین — دسکتاپ</h1>
  <p>پیشخوان و محصولات سازمانی آمادهٔ بازبینی‌اند. طرح هر ۲۶ صفحه ذخیره شده؛ ۲۴ صفحه تا دریافت کامل تصاویر و آیکن‌های اصلی، فعال نمی‌شوند.</p>
  <p>داده‌ها نمونه‌اند و عملیات واقعی سرور انجام نمی‌شود.</p>
  <p><Link href="/preview/admin">مدیریت نگارین</Link> · <Link href="/preview/supporting-organization">سازمان حامی</Link> · <Link href="/preview/customer-mobile">مشتری — موبایل</Link></p>
  <div className="preview-groups">{[...new Set(corporateBuyerScreens.map(s=>s.section))].map(section=><section key={section}><h2>{section}</h2><ul>{corporateBuyerScreens.filter(s=>s.section===section).map(s=><li key={s.id}><Link href={"/preview/corporate-buyer/"+s.slug}>{s.name.replace("Corporate Buyer / ","")}</Link>{!s.implemented&&<small> · در انتظار تصاویر اصلی</small>}</li>)}</ul></section>)}</div>
 </main>;
}
