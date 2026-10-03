import "@fontsource-variable/vazirmatn";
import Link from "next/link";

const roles = [
 {title:"مشتری · وب", path:"customer-web", pages:[["خانه و بازار نگارین","home"],["جزئیات محصول","product-detail"],["سبد خرید","cart"]]},
 {title:"هنرمند", path:"artist", pages:[["پیشخوان","dashboard"],["محصولات من","products"],["مسیر رشد","growth-center"]]},
 {title:"مدیریت نگارین", path:"admin", pages:[["پیشخوان مدیریت","dashboard"],["بررسی محصول","product-review-new-product"],["عملیات سفارش","orders"]]},
 {title:"شریک خدماتی", path:"service-partner", pages:[["پیشخوان","dashboard"],["درخواست‌های واگذارشده","assigned-requests"],["جزئیات درخواست","request-detail"]]},
 {title:"سازمان حمایتی", path:"supporting-organization", pages:[["پیشخوان","dashboard"],["معرفی هنرمندان","artist-referrals"],["گزارش فعالیت","activity-report"]]},
 {title:"خریدار سازمانی", path:"corporate-buyer", pages:[["پیشخوان","dashboard"],["محصولات سازمانی","corporate-products"],["درخواست خرید","new-purchase-request"]]},
 {title:"شریک خارجی", path:"export-partner", pages:[["Dashboard · English","en-dashboard"],["Export products · English","en-export-products"],["لوحة التحكم · العربية","ar-dashboard"]]},
 {title:"مشتری · موبایل", path:"customer-mobile", pages:[["بازار نگارین","landing"],["جزئیات محصول","product-detail"],["سبد خرید","cart"]]},
 {title:"هنرمند · موبایل", path:"artist-mobile", pages:[["پیشخوان","dashboard"],["محصولات","products"],["مسیر رشد","growth-center"]]},
] as const;

export default function PresentationHome() {
 return <main style={{maxWidth:1180,fontFamily:'"Vazirmatn Variable",sans-serif',padding:"36px 24px"}}>
  <header style={{display:"flex",alignItems:"center",gap:24,marginBottom:24}}>
   <img src="/brand/negarin-logo.png" alt="خانه نگارین" width={96} height={112} style={{objectFit:"contain"}}/>
   <div><p style={{color:"#0c7570",margin:0}}>خانه نگارین</p>
    <h1 style={{fontSize:32,margin:"8px 0"}}>از هنر تا بازار، از فروش تا رشد</h1>
    <p style={{color:"#64748b",margin:0}}>برای شروع، نقش مورد نظر و سپس یکی از صفحات آن را انتخاب کنید.</p>
   </div>
  </header>
  <p style={{background:"#eaf6f3",border:"1px solid #d3ede8",padding:"14px 20px",borderRadius:12,color:"#405654",lineHeight:1.9}}>
   نسخهٔ نمایشی با دادهٔ نمونه · خرید، پرداخت و ارسال واقعی انجام نمی‌شود. صفحات منتخب در تب تازه باز می‌شوند؛ برای تغییر نقش به این صفحه برگردید.
  </p>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18,marginTop:24}}>
   {roles.map(role=><article key={role.path} style={{background:"white",border:"1px solid #e2e8f0",borderRadius:18,padding:24,boxShadow:"0 4px 20px #0f172a06"}}>
    <h2 style={{fontSize:21,margin:"0 0 18px",color:"#081c62"}}>{role.title}</h2>
    <div style={{display:"grid",gap:10}}>
     {role.pages.map(([label,slug])=><a key={slug} href={`/preview/${role.path}/${slug}?canvas=1`} target="_blank" rel="noopener noreferrer" style={{display:"block",textDecoration:"none",padding:"10px 14px",borderRadius:10,background:"#f3f9f8",color:"#0c7570",lineHeight:1.7}}>{label} ←</a>)}
    </div>
    <Link href={`/preview/${role.path}`} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:18,color:"#64748b",fontSize:14}}>مشاهدهٔ همهٔ صفحات</Link>
   </article>)}
  </section>
 </main>;
}
