// Figma 847:1825 — Artist / Store Visibility Management — Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistStoreVisibilityManagementMobile() {
  return (
    <div className="fg-b5a48f9434" data-node-id="847:1825" data-name="Artist / Store Visibility Management — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="847:1826" data-name="Status Bar">
        <p className="fg-ec74edce3f" data-node-id="847:1827">
          ۹:۴۱
        </p>
        <div className="fg-77658e6a2c" data-node-id="847:1828" data-name="Status Icons">
          <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/98c6c7b5.svg" />
        </div>
      </div>
      <div className="fg-799f37102e" data-node-id="847:1832" data-name="Header">
        <div className="fg-c96fe10678" data-node-id="847:1833" data-name="Frame">
          <div className="fg-9eae8902b4" data-node-id="847:1834" data-name="Back Nav Group">
            <p className="fg-11eee50b43" dir="auto" data-node-id="847:1835">
              مدیریت نمایش
            </p>
            <DesignAction className="fg-aab9086be4" data-node-id="847:1836" data-name="Back Button" label="بازگشت" destination="store">
              <div className="fg-c51752dc8c" data-node-id="847:2081" data-name="chevron-right">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/38e94c80.svg" />
              </div>
            </DesignAction>
          </div>
        </div>
        <p className="fg-46dca51fd1" dir="auto" data-node-id="847:1838">
          کنترل وضعیت نمایش عمومی فروشگاه برای مشتریان
        </p>
      </div>
      <div className="fg-b6b958e61a" data-node-id="847:1839" data-name="Frame">
        <div className="fg-3444805f36" data-node-id="847:1840" data-name="Frame">
          <div className="fg-c96fe10678" data-node-id="847:1841" data-name="Frame">
            <div className="fg-cff24659a3" data-node-id="847:1842" data-name="Frame">
              <p className="fg-a3692aa1db" dir="auto" data-node-id="847:1843">
                نمایش عمومی فعال
              </p>
            </div>
            <p className="fg-7d346f89f5" dir="auto" data-node-id="847:1844">
              فروشگاه شما قابل مشاهده است
            </p>
          </div>
          <p className="fg-b9689f3248" dir="auto" data-node-id="847:1845">
            می‌توانی نمایش عمومی فروشگاه را موقتاً متوقف یا دوباره فعال کنی. این تنظیم از عضویت سالانه، سطح رشد و نشان تأیید حرفه‌ای مستقل است.
          </p>
        </div>
        <div className="fg-4fd8c44cb7" data-node-id="847:1846" data-name="Frame">
          <p className="fg-d96eab494f" dir="auto" data-node-id="847:1847">
            نمایش عمومی فروشگاه
          </p>
          <div className="fg-deac9b8267" data-node-id="847:1848" data-name="Frame">
            <DesignChoice className="fg-d7b3c4bd4f" data-node-id="847:1849" data-name="Toggle" label="Toggle" group="Frame" initial={false} multiple>
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/82f803b2.svg" />
            </DesignChoice>
            <p className="fg-01af75c3f6" dir="auto" data-node-id="847:1851">
              نمایش فروشگاه در نگارین
            </p>
          </div>
          <p className="fg-7b224c3de8" dir="auto" data-node-id="847:1852">
            با فعال بودن، فروشگاه و محصولات منتشرشده برای مشتریان قابل مشاهده هستند. با غیرفعال‌کردن این گزینه فروشگاه از نمایش عمومی خارج می‌شود.
          </p>
        </div>
        <div className="fg-b9fe381840" data-node-id="847:1853" data-name="Frame">
          <p className="fg-0aa03ed6da" dir="auto" data-node-id="847:1854">
            توقف موقت
          </p>
          <p className="fg-5addd866f3" dir="auto" data-node-id="847:1855">
            برای زمانی که نمی‌خواهی فروشگاه به‌صورت عمومی نمایش داده شود (مانند مرخصی).
          </p>
          <div className="fg-eac3e6e7b8" data-node-id="847:1856" data-name="Frame">
            <p className="fg-b8d70a48e5" dir="auto" data-node-id="847:1857">
              در حالت توقف
            </p>
            <p className="fg-5addd866f3" dir="auto" data-node-id="847:1858">
              فروشگاه برای مشتریان نمایش داده نمی‌شود؛ اما عضویت، سطح رشد و سابقه فروشگاه تغییر نمی‌کند.
            </p>
          </div>
        </div>
        <div className="fg-e997b03456" data-node-id="847:1859" data-name="Frame">
          <p className="fg-320936cacf" dir="auto" data-node-id="847:1860">
            این تنظیم چه چیزهایی را تغییر نمی‌دهد؟
          </p>
          <div className="fg-f8bbdf2c02" data-node-id="847:1861" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:1862">
              مستقل (تیک آبی)
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:1863">
              تأیید حرفه‌ای
            </p>
          </div>
          <div className="fg-f8bbdf2c02" data-node-id="847:1864" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:1865">
              فعال (بدون تغییر)
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:1866">
              عضویت سالانه
            </p>
          </div>
          <div className="fg-f8bbdf2c02" data-node-id="847:1867" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:1868">
              جوانه (حفظ سابقه)
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:1869">
              سطح رشد
            </p>
          </div>
        </div>
        <div className="fg-a4f2a2990d" data-node-id="847:1870" data-name="Frame">
          <p className="fg-615516ac45" dir="auto" data-node-id="847:1871">
            مرز این صفحه
          </p>
          <p className="fg-5addd866f3" dir="auto" data-node-id="847:1872">
            این بخش فقط وضعیت نمایش عمومی فروشگاه را کنترل می‌کند. محتوای فروشگاه و تنظیمات فروش از بخش‌های جداگانه مدیریت می‌شوند.
          </p>
        </div>
        <div className="fg-099309aee6" data-node-id="847:1873" data-name="Frame">
          <DesignAction className="fg-5f5f993372" data-node-id="847:1874" data-name="Negarin / Button" label="ذخیره تنظیمات">
            <p className="fg-336e74147d" dir="auto" data-node-id="I847:1874;46:29">
              ذخیره تنظیمات
            </p>
          </DesignAction>
          <DesignAction className="fg-61b2399ccb" data-node-id="847:1877" data-name="Negarin / Button" label="انصراف" destination="store">
            <p className="fg-7ee08abcb6" dir="auto" data-node-id="I847:1877;46:3">
              انصراف
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-c206451d2e" data-node-id="847:1879" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="847:1880" data-name="Frame">
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1881" data-name="Frame" label="حساب" destination="account">
            <div className="fg-b2a182ecf4" data-node-id="847:2084" data-name="user">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/625d2e33.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1883">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1884" data-name="Frame" label="فرصت‌ها" destination="opportunities">
            <div className="fg-b2a182ecf4" data-node-id="847:2087" data-name="briefcase">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/b20df04d.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1886">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1887" data-name="Frame" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="847:2090" data-name="package">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/e3f4bcda.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1889">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1890" data-name="Frame" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="847:2093" data-name="shopping-bag">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/a286ab5e.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1892">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1893" data-name="Frame" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="847:2096" data-name="home">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/a58a3598.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1895">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
