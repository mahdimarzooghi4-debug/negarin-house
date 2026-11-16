import Image from "next/image";
import Link from "next/link";

const apps = [
  {
    name: "اپ خریدار",
    description: "آثار را پیدا کنید، هنرمندان را دنبال کنید و از خود هنرمند خرید کنید.",
    icon: "/brand/customer-pwa-icon-192.png",
    android: "https://github.com/mahdimarzooghi4-debug/negarin-house/releases/download/stage-app-downloads/negarin-customer-android.apk",
    pwa: "/preview/customer-mobile/install",
  },
  {
    name: "اپ هنرمند",
    description: "فروشگاه، محصولات، سفارش‌ها و فرصت‌های هنری خود را مدیریت کنید.",
    icon: "/brand/artist-pwa-icon-192.png",
    android: "https://github.com/mahdimarzooghi4-debug/negarin-house/releases/download/stage-app-downloads/negarin-artist-android.apk",
    pwa: "/preview/artist-mobile/install",
  },
];

export default function NegarinAppDownloadsPage() {
  return (
    <main className="customer-download-page" dir="rtl">
      <Link className="customer-download-back" href="/preview/customer-web/home?canvas=1">
        بازگشت به خانه
      </Link>
      <header className="customer-download-header">
        <Image src="/customer-web-assets/b65a7682.png" alt="نشان خانه نگارین" width={76} height={84} priority />
        <p>خانه نگارین</p>
        <h1>اپلیکیشن نگارین را دریافت کنید</h1>
        <span>نسخه مناسب خود را انتخاب کنید؛ هر دو اپ برای اندروید و نصب به شکل وب‌اپ آماده‌اند.</span>
      </header>
      <section className="customer-download-grid" aria-label="انتخاب اپلیکیشن نگارین">
        {apps.map((app) => (
          <article className="customer-download-card" key={app.name}>
            <div className="customer-download-app-heading">
              <Image src={app.icon} alt="" width={64} height={64} />
              <div>
                <h2>{app.name}</h2>
                <p>{app.description}</p>
              </div>
            </div>
            <div className="customer-download-options">
              <a className="customer-download-action customer-download-android" href={app.android}>
                <span>دریافت نسخه اندروید</span>
                <small>فایل نصب APK</small>
              </a>
              <Link className="customer-download-action customer-download-pwa" href={app.pwa}>
                <span>نصب نسخه وب‌اپ</span>
                <small>PWA؛ بدون نیاز به فروشگاه اپلیکیشن</small>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
