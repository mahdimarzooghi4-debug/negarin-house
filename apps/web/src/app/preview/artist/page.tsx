import Link from "next/link";
import { artistScreens } from "../../../features/artist/screen-registry";
const groups:Record<string,string>={growth:"پیشخوان و رشد",store:"غرفه و تنظیمات فروش",products:"محصولات",orders:"سفارش و ارسال",finance:"مالی و تسویه",membership:"عضویت",credentials:"مدارک حرفه‌ای",opportunities:"فرصت‌ها",services:"خدمات و آموزش",auth:"ورود و حساب"};
export default function ArtistCatalog(){return <div className="preview-catalog" dir="rtl">
 <h1>پیش‌نمایش پنل هنرمند نگارین</h1>
 <p>۸۳ صفحه و حالت از صفحهٔ هنرمند فیگما. داده‌ها نمونه‌اند؛ پرداخت، ارسال و تسویه واقعی انجام نمی‌شود.</p>
 <p><Link href="/preview/artist/dashboard">شروع از پیشخوان ←</Link></p>
 <div className="preview-groups">{Object.entries(groups).map(([key,label])=><section key={key}><h2>{label}</h2><ul>{artistScreens.filter(s=>s.group===key).map(s=><li key={s.id}><Link href={"/preview/artist/"+s.slug}>{s.name.replace(/^(Artist|Auth) \/ /,"").replace(/&amp;/g,"&")}</Link><br/><small>فیگما: {s.id}{s.name.includes("Future")?" · حالت آینده":s.name.includes("Modal")?" · پنجره": ""}</small></li>)}</ul></section>)}</div>
 </div>;}
