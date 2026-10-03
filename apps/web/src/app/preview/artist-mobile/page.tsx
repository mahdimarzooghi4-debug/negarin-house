import Link from "next/link";
import { mobileScreens } from "../../../features/artist-mobile/screen-registry";

export default function MobileCatalog(){
  const groups=[...new Set(mobileScreens.map(s=>s.section))];
  const completed=mobileScreens.filter(s=>s.implemented).length;
  return <main className="preview-catalog mobile-preview-catalog" dir="rtl">
    <h1>پنل هنرمند — موبایل</h1>
    <p>{completed} صفحه از {mobileScreens.length} صفحهٔ فیگما پیاده شده است. داده‌ها نمونه‌اند و عملیات سرور انجام نمی‌شود.</p>
    <p>۷ صفحهٔ باقی‌مانده به دلیل سقف استفادهٔ اتصال فیگما هنوز دریافت نشده‌اند؛ در فهرست مشخص‌اند.</p>
    <p><Link href="/preview/artist">نسخهٔ دسکتاپ</Link></p>
    <div className="preview-groups">{groups.map(group=><section key={group}>
      <h2>{group.replace(/^\d+ — /,"")}</h2>
      <ul>{mobileScreens.filter(s=>s.section===group).map(s=><li key={s.id}>
        <Link href={"/preview/artist-mobile/"+s.slug} className={s.implemented?undefined:"pending-screen"}>{s.name.replace("Artist / ","").replace(" — Mobile","")}</Link>
        {!s.implemented&&<small> · در انتظار دریافت طرح</small>}
      </li>)}</ul>
    </section>)}</div>
  </main>;
}
