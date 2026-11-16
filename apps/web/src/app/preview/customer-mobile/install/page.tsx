import Image from "next/image";
import Link from "next/link";
import { CustomerPwaInstallControl } from "../../../../features/customer-mobile/pwa-registration";

export default function CustomerPwaInstallPage() {
  return (
    <main className="customer-pwa-install-page" dir="rtl">
      <section className="customer-pwa-install-card" aria-labelledby="customer-pwa-title">
        <Image
          className="customer-pwa-install-icon"
          src="/brand/customer-pwa-icon-192.png"
          alt="نشان خانه نگارین"
          width={112}
          height={112}
          priority
        />
        <p className="customer-pwa-eyebrow">خانه نگارین</p>
        <h1 id="customer-pwa-title">اپ خریدار نگارین</h1>
        <p className="customer-pwa-description">
          آثار را کشف کنید، هنرمندان را دنبال کنید و خرید هنر را از خود هنرمند انجام دهید.
        </p>
        <CustomerPwaInstallControl />
        <Link className="customer-pwa-open-link" href="/preview/customer-mobile/landing?canvas=1">
          ورود به خانه نگارین
        </Link>
        <p className="customer-pwa-footnote">
          برای نصب، دستگاه باید به اینترنت متصل باشد. این نسخه از اینترنت برای بارگذاری صفحه‌ها استفاده می‌کند.
        </p>
      </section>
    </main>
  );
}
