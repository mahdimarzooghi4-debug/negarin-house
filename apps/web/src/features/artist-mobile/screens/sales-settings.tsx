// Figma 847:1896 — Artist / Sales Settings — Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistSalesSettingsMobile() {
  return (
    <div className="fg-b5a48f9434" data-node-id="847:1896" data-name="Artist / Sales Settings — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="847:1897" data-name="Status Bar">
        <p className="fg-ec74edce3f" data-node-id="847:1898">
          ۹:۴۱
        </p>
        <div className="fg-77658e6a2c" data-node-id="847:1899" data-name="Status Icons">
          <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/98c6c7b5.svg" />
        </div>
      </div>
      <div className="fg-799f37102e" data-node-id="847:1903" data-name="Header">
        <div className="fg-c96fe10678" data-node-id="847:1904" data-name="Frame">
          <div className="fg-9eae8902b4" data-node-id="847:1905" data-name="Back Nav Group">
            <p className="fg-11eee50b43" dir="auto" data-node-id="847:1906">
              تنظیمات فروش
            </p>
            <DesignAction className="fg-aab9086be4" data-node-id="847:1907" data-name="Back Button" label="بازگشت" destination="store">
              <div className="fg-c51752dc8c" data-node-id="847:2099" data-name="chevron-right">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/38e94c80.svg" />
              </div>
            </DesignAction>
          </div>
        </div>
        <p className="fg-46dca51fd1" dir="auto" data-node-id="847:1909">
          مدیریت نحوه پذیرش سفارش، ظرفیت و زمان آماده‌سازی
        </p>
      </div>
      <div className="fg-b6b958e61a" data-node-id="847:1910" data-name="Frame">
        <div className="fg-a4f2a2990d" data-node-id="847:1911" data-name="Frame">
          <p className="fg-615516ac45" dir="auto" data-node-id="847:1912">
            تنظیمات فروشگاه
          </p>
          <p className="fg-5addd866f3" dir="auto" data-node-id="847:1913">
            نحوه دریافت و آماده‌سازی سفارش‌ها را مدیریت کن. این تنظیمات به تو کمک می‌کند ظرفیت واقعی تولید و نوع سفارش‌هایی را که می‌پذیری کنترل کنی.
          </p>
        </div>
        <div className="fg-4fd8c44cb7" data-node-id="847:1914" data-name="Frame">
          <div className="fg-c96fe10678" data-node-id="847:1915" data-name="Frame">
            <DesignChoice className="fg-d7b3c4bd4f" data-node-id="847:1916" data-name="Toggle" label="Toggle" group="Frame" initial={false} multiple>
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/82f803b2.svg" />
            </DesignChoice>
            <p className="fg-0aa7f67e9e" dir="auto" data-node-id="847:1918">
              سفارش سفارشی
            </p>
          </div>
          <p className="fg-70ec1c8137" dir="auto" data-node-id="847:1919">
            امکان ثبت درخواست ساخت محصول سفارشی توسط مشتری. خاموش‌کردن این گزینه فقط دریافت درخواست‌های سفارشی جدید را متوقف می‌کند.
          </p>
        </div>
        <div className="fg-4fd8c44cb7" data-node-id="847:1920" data-name="Frame">
          <p className="fg-0075988123" dir="auto" data-node-id="847:1921">
            زمان آماده‌سازی
          </p>
          <p className="fg-863b2523f8" dir="auto" data-node-id="847:1922">
            زمان لازم برای آماده‌سازی سفارش پیش از تحویل به همکار ارسال، مناسب با محصول و توان واقعی تولید.
          </p>
          <div className="fg-52e34680ca" data-node-id="847:1923" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:1924">
              تنظیم‌شده
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:1925">
              وضعیت
            </p>
          </div>
          <div className="fg-62f39da6b2" data-node-id="847:1926" data-name="Frame">
            <p className="fg-58b7979170" dir="auto" data-node-id="847:1927">
              زمان آماده‌سازی
            </p>
            <div className="fg-ddfcca1df4" data-node-id="847:1928" data-name="Frame">
              <p className="fg-80df9777bf" dir="auto" data-node-id="847:1929">
                ۱۰ روز کاری
              </p>
            </div>
          </div>
          <DesignAction className="fg-61b2399ccb" data-node-id="847:1930" data-name="Negarin / Button" label="تنظیم زمان">
            <p className="fg-7ee08abcb6" dir="auto" data-node-id="I847:1930;46:3">
              تنظیم زمان
            </p>
          </DesignAction>
        </div>
        <div className="fg-4fd8c44cb7" data-node-id="847:1932" data-name="Frame">
          <p className="fg-0075988123" dir="auto" data-node-id="847:1933">
            ظرفیت پذیرش سفارش
          </p>
          <p className="fg-863b2523f8" dir="auto" data-node-id="847:1934">
            ظرفیت را بر اساس توان واقعی تولیدت مدیریت کن تا سفارش بیش از توان دریافت نکنی.
          </p>
          <div className="fg-52e34680ca" data-node-id="847:1935" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:1936">
              قابل مدیریت
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:1937">
              وضعیت
            </p>
          </div>
          <div className="fg-62f39da6b2" data-node-id="847:1938" data-name="Frame">
            <p className="fg-58b7979170" dir="auto" data-node-id="847:1939">
              ظرفیت فعلی
            </p>
            <div className="fg-ddfcca1df4" data-node-id="847:1940" data-name="Frame">
              <p className="fg-80df9777bf" dir="auto" data-node-id="847:1941">
                ۲۴ عدد
              </p>
            </div>
          </div>
          <DesignAction className="fg-61b2399ccb" data-node-id="847:1942" data-name="Negarin / Button" label="مدیریت ظرفیت">
            <p className="fg-7ee08abcb6" dir="auto" data-node-id="I847:1942;46:3">
              مدیریت ظرفیت
            </p>
          </DesignAction>
        </div>
        <DesignAction className="fg-256a1bd24f" data-node-id="847:1944" data-name="Frame" label="مستقل از عضویت و سطح رشد تغییر این تنظیمات به‌خودی‌خود سطح رشد، وضعیت عضویت یا تیک تأیید حرفه‌ای شما را تغییر نمی‌دهد." destination="store">
          <p className="fg-b8d70a48e5" dir="auto" data-node-id="847:1945">
            مستقل از عضویت و سطح رشد
          </p>
          <p className="fg-5addd866f3" dir="auto" data-node-id="847:1946">
            تغییر این تنظیمات به‌خودی‌خود سطح رشد، وضعیت عضویت یا تیک تأیید حرفه‌ای شما را تغییر نمی‌دهد.
          </p>
        </DesignAction>
        <div className="fg-099309aee6" data-node-id="847:1947" data-name="Frame">
          <DesignAction className="fg-5f5f993372" data-node-id="847:1948" data-name="Negarin / Button" label="ذخیره تنظیمات فروش" destination="store">
            <p className="fg-336e74147d" dir="auto" data-node-id="I847:1948;46:29">
              ذخیره تنظیمات فروش
            </p>
          </DesignAction>
          <DesignAction className="fg-61b2399ccb" data-node-id="847:1951" data-name="Negarin / Button" label="انصراف" destination="store">
            <p className="fg-7ee08abcb6" dir="auto" data-node-id="I847:1951;46:3">
              انصراف
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-c206451d2e" data-node-id="847:1953" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="847:1954" data-name="Frame">
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1955" data-name="Frame" label="حساب" destination="account">
            <div className="fg-b2a182ecf4" data-node-id="847:2102" data-name="user">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/625d2e33.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1957">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1958" data-name="Frame" label="فرصت‌ها" destination="opportunities">
            <div className="fg-b2a182ecf4" data-node-id="847:2105" data-name="briefcase">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/b20df04d.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1960">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1961" data-name="Frame" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="847:2108" data-name="package">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/e3f4bcda.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1963">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1964" data-name="Frame" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="847:2111" data-name="shopping-bag">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/a286ab5e.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1966">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:1967" data-name="Frame" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="847:2114" data-name="home">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/a58a3598.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:1969">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
