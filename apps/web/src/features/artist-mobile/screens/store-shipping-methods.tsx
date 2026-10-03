// Figma 847:1970 — Artist / Store Shipping Methods — Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistStoreShippingMethodsMobile() {
  return (
    <div className="fg-b5a48f9434" data-node-id="847:1970" data-name="Artist / Store Shipping Methods — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="847:1971" data-name="Status Bar">
        <p className="fg-ec74edce3f" data-node-id="847:1972">
          ۹:۴۱
        </p>
        <div className="fg-77658e6a2c" data-node-id="847:1973" data-name="Status Icons">
          <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/98c6c7b5.svg" />
        </div>
      </div>
      <div className="fg-799f37102e" data-node-id="847:1977" data-name="Header">
        <div className="fg-c96fe10678" data-node-id="847:1978" data-name="Frame">
          <div className="fg-9eae8902b4" data-node-id="847:1979" data-name="Back Nav Group">
            <p className="fg-11eee50b43" dir="auto" data-node-id="847:1980">
              روش‌های ارسال فروشگاه
            </p>
            <DesignAction className="fg-aab9086be4" data-node-id="847:1981" data-name="Back Button" label="بازگشت" destination="store">
              <div className="fg-c51752dc8c" data-node-id="847:2117" data-name="chevron-right">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/38e94c80.svg" />
              </div>
            </DesignAction>
          </div>
        </div>
        <p className="fg-46dca51fd1" dir="auto" data-node-id="847:1983">
          از بین روش‌های مجاز نگارین، روش‌های قابل ارائه خود را فعال یا غیرفعال کن
        </p>
      </div>
      <div className="fg-b6b958e61a" data-node-id="847:1984" data-name="Frame">
        <div className="fg-55d933fb66" data-node-id="847:1985" data-name="Frame">
          <div className="fg-ddec3fe503" data-node-id="847:1986" data-name="Frame">
            <p className="fg-f477bfcc9c" dir="auto" data-node-id="847:1987">
              متصل به Checkout
            </p>
            <p className="fg-053123e8c0" dir="auto" data-node-id="847:1988">
              روش‌های ارسال فعال
            </p>
          </div>
          <p className="fg-5addd866f3" dir="auto" data-node-id="847:1989">
            هزینه و تعرفه هر روش توسط نگارین تعیین می‌شود و قابل ویرایش نیست. روش‌های فعال مستقیماً در سبد خرید مشتری نمایش داده می‌شوند.
          </p>
        </div>
        <div className="fg-90c383f020" data-node-id="847:1990" data-name="Frame">
          <div className="fg-c96fe10678" data-node-id="847:1991" data-name="Frame">
            <DesignChoice className="fg-d7b3c4bd4f" data-node-id="847:1992" data-name="Toggle" label="Toggle" group="Frame" initial={false} multiple>
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/82f803b2.svg" />
            </DesignChoice>
            <div className="fg-9eae8902b4" data-node-id="847:1994" data-name="Frame">
              <p className="fg-0aa7f67e9e" dir="auto" data-node-id="847:1995">
                پست پیشتاز
              </p>
              <div className="fg-b2a182ecf4" data-node-id="847:2135" data-name="truck">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/ceac7a0d.svg" />
              </div>
            </div>
          </div>
          <div className="fg-52e34680ca" data-node-id="847:1997" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:1998">
              ۸۵,۰۰۰ تومان
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:1999">
              تعرفه نگارین
            </p>
          </div>
          <div className="fg-52e34680ca" data-node-id="847:2000" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:2001">
              خیر (تعرفه ثابت)
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:2002">
              قابل ویرایش توسط هنرمند
            </p>
          </div>
          <div className="fg-a4f2a2990d" data-node-id="847:2003" data-name="Frame">
            <p className="fg-615516ac45" dir="auto" data-node-id="847:2004">
              نمایش به خریدار
            </p>
            <p className="fg-5addd866f3" dir="auto" data-node-id="847:2005">
              در سبد و Checkout، «پست پیشتاز — ۸۵,۰۰۰ تومان» نمایش داده می‌شود. هنرمند فقط فعال‌بودن این روش را کنترل می‌کند.
            </p>
          </div>
        </div>
        <div className="fg-b9fe381840" data-node-id="847:2006" data-name="Frame">
          <p className="fg-0aa03ed6da" dir="auto" data-node-id="847:2007">
            ارتباط با سفارش
          </p>
          <DesignAction className="fg-c9d4bbf50d" data-node-id="847:2008" label="۱. مشتری یکی از روش‌های فعالی که ارائه می‌دهی را در Checkout انتخاب می‌کند. ۲. تعرفه ۸۵,۰۰۰ تومان توسط نگارین محاسبه و به مبلغ سفارش اضافه می‌شود. ۳. بعد از ثبت سفارش، روش و تعرفه همان سفارش قفل می‌شود و قابل تغییر نیست." destination="store">
            <p className="fg-1bcf9b724d" dir="auto">
              ۱. مشتری یکی از روش‌های فعالی که ارائه می‌دهی را در Checkout انتخاب می‌کند.
            </p>
            <p className="fg-1bcf9b724d" dir="auto">
              ۲. تعرفه ۸۵,۰۰۰ تومان توسط نگارین محاسبه و به مبلغ سفارش اضافه می‌شود.
            </p>
            <p className="fg-efcc9af6d1" dir="auto">
              ۳. بعد از ثبت سفارش، روش و تعرفه همان سفارش قفل می‌شود و قابل تغییر نیست.
            </p>
          </DesignAction>
        </div>
        <div className="fg-e997b03456" data-node-id="847:2009" data-name="Frame">
          <p className="fg-320936cacf" dir="auto" data-node-id="847:2010">
            مسیر ارتباط ارسال
          </p>
          <div className="fg-f8bbdf2c02" data-node-id="847:2011" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:2012">
              فعال‌سازی روش
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:2013">
              ۱. تنظیمات فروشگاه
            </p>
          </div>
          <div className="fg-f8bbdf2c02" data-node-id="847:2014" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:2015">
              انتخاب روش توسط مشتری
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:2016">
              ۲. سبد و Checkout
            </p>
          </div>
          <div className="fg-f8bbdf2c02" data-node-id="847:2017" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:2018">
              قفل شدن تعرفه سفارش
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:2019">
              ۳. سفارش هنرمند
            </p>
          </div>
          <div className="fg-f8bbdf2c02" data-node-id="847:2020" data-name="Frame">
            <p className="fg-7da7073880" dir="auto" data-node-id="847:2021">
              اجرای ارسال و رهگیری
            </p>
            <p className="fg-b80efb661d" dir="auto" data-node-id="847:2022">
              ۴. بخش ارسال
            </p>
          </div>
        </div>
        <div className="fg-b018956573" data-node-id="847:2023" data-name="Frame">
          <DesignAction className="fg-5f5f993372" data-node-id="847:2024" data-name="Negarin / Button" label="ذخیره روش‌های فعال" destination="store">
            <p className="fg-336e74147d" dir="auto" data-node-id="I847:2024;46:29">
              ذخیره روش‌های فعال
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-c206451d2e" data-node-id="847:2027" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="847:2028" data-name="Frame">
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:2029" data-name="Frame" label="حساب" destination="account">
            <div className="fg-b2a182ecf4" data-node-id="847:2120" data-name="user">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/625d2e33.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:2031">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:2032" data-name="Frame" label="فرصت‌ها" destination="opportunities">
            <div className="fg-b2a182ecf4" data-node-id="847:2123" data-name="briefcase">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/b20df04d.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:2034">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:2035" data-name="Frame" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="847:2126" data-name="package">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/e3f4bcda.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:2037">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:2038" data-name="Frame" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="847:2129" data-name="shopping-bag">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/a286ab5e.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:2040">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="847:2041" data-name="Frame" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="847:2132" data-name="home">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/a58a3598.svg" />
            </div>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="847:2043">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
