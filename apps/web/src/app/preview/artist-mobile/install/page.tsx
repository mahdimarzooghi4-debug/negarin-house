import Image from "next/image";
import Link from "next/link";
import { ArtistPwaInstallControl } from "../../../../features/artist-mobile/pwa-registration";

export default function ArtistPwaInstallPage() {
  return (
    <main className="artist-pwa-install-page" dir="rtl">
      <section className="artist-pwa-install-card" aria-labelledby="artist-pwa-title">
        <Image
          className="artist-pwa-install-icon"
          src="/brand/artist-pwa-icon-192.png"
          alt="نشان خانه نگارین"
          width={112}
          height={112}
          priority
        />
        <p className="artist-pwa-eyebrow">خانه نگارین</p>
        <h1 id="artist-pwa-title">اپ هنرمند نگارین</h1>
        <p className="artist-pwa-description">
          پنل هنرمند را به صفحهٔ اصلی دستگاه اضافه کنید تا مانند یک اپ مستقل باز شود.
        </p>
        <ArtistPwaInstallControl />
        <Link className="artist-pwa-open-link" href="/preview/artist-mobile/dashboard?canvas=1">
          ورود به پنل هنرمند
        </Link>
        <p className="artist-pwa-footnote">
          برای نصب، دستگاه باید به اینترنت متصل باشد. این نسخه از اینترنت برای بارگذاری صفحه‌ها استفاده می‌کند.
        </p>
      </section>
    </main>
  );
}
