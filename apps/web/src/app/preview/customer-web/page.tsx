import Link from "next/link";
import {customerWebScreens} from "../../../features/customer-web/screen-registry";

export default function CustomerWebCatalog(){
 return <main className="preview-catalog" dir="rtl"><h1>وب مشتری خانه نگارین</h1><p>هر ۱۹ صفحهٔ بوم مشتری با تصاویر، لوگو و آیکن‌های اصلی فیگما آمادهٔ بازبینی است. داده‌ها نمونه‌اند؛ پرداخت، ورود و سفارش واقعی پس از اتصال بک‌اند فعال می‌شوند.</p><p><Link href="/preview/customer-mobile">مشتری — موبایل</Link> · <Link href="/preview/corporate-buyer">خریدار سازمانی</Link></p><div className="preview-groups"><section><h2>صفحه‌های مشتری</h2><ul>{customerWebScreens.map(s=><li key={s.id}><Link href={'/preview/customer-web/'+s.slug}>{s.name.replace('Customer / ','')}</Link></li>)}</ul></section></div></main>;
}
