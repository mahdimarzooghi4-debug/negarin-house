// Figma 631:5 — Customer / Notifications - Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerNotificationsMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="631:5" data-name="Customer / Notifications - Mobile">
      <div className="fg-cbfa65986b" data-node-id="631:6" data-name="Notifications / Top Bar">
        <DesignAction className="fg-b9df3a7911" data-node-id="631:7" label="arrow_forward" destination="account">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
        <div className="fg-26bf205e3a" data-node-id="631:8">
          <p className="fg-32bd4c7660" dir="auto">
            اعلان‌ها
          </p>
        </div>
      </div>
      <div className="fg-9bbc30fba5" data-node-id="631:9" data-name="Notifications / Intro">
        <div className="fg-82810f7b15" data-node-id="631:10">
          <p className="fg-32bd4c7660">notifications_none</p>
        </div>
        <div className="fg-0d48632e24" data-node-id="631:11">
          <p className="fg-32bd4c7660" dir="auto">
            اعلان‌هایی که به کارت می‌آیند
          </p>
        </div>
        <div className="fg-dcde0f5f86" data-node-id="631:12">
          <p className="fg-32bd4c7660" dir="auto">
            مشخص کن نگارین درباره سفارش‌ها، درخواست‌های سازمانی، هنرمندان و پیشنهادهای شخصی چه زمانی به تو خبر بدهد.
          </p>
        </div>
      </div>
      <div className="fg-82eee6f60f" data-node-id="631:13">
        <p className="fg-32bd4c7660" dir="auto">
          سفارش‌ها
        </p>
      </div>
      <div className="fg-ba0e9ed261" data-node-id="631:14" data-name="Notification Setting / Orders">
        <div className="fg-4330b1974c" data-node-id="631:15">
          <p className="fg-32bd4c7660">local_shipping</p>
        </div>
        <div className="fg-728e60afb3" data-node-id="631:16">
          <p className="fg-32bd4c7660" dir="auto">
            وضعیت سفارش
          </p>
        </div>
        <div className="fg-7b587cf5fd" data-node-id="631:17">
          <p className="fg-32bd4c7660" dir="auto">
            آماده‌سازی، ارسال، تحویل و تغییرات مهم سفارش
          </p>
        </div>
        <DesignChoice className="fg-dea64f494e" data-node-id="631:18" data-name="Toggle" label="Toggle" group="Notification Setting / Orders" initial={false} multiple>
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/744144ab.svg" />
        </DesignChoice>
      </div>
      <div className="fg-0f78c3eea1" data-node-id="631:20">
        <p className="fg-32bd4c7660" dir="auto">
          شبکه و پیشنهادها
        </p>
      </div>
      <div className="fg-662e1e16fb" data-node-id="631:21" data-name="Notification Setting / Followed Artists">
        <div className="fg-4330b1974c" data-node-id="631:22">
          <p className="fg-32bd4c7660">groups</p>
        </div>
        <DesignAction className="fg-6c7ae41cd5" data-node-id="631:23" label="هنرمندان دنبال‌شده" destination="followed-artists">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندان دنبال‌شده
          </p>
        </DesignAction>
        <div className="fg-5374b1fb8a" data-node-id="631:24">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها و به‌روزرسانی‌های هنرمندانی که دنبال می‌کنی
          </p>
        </div>
        <DesignChoice className="fg-dea64f494e" data-node-id="631:25" data-name="Toggle" label="Toggle" group="Notification Setting / Followed Artists" initial={false} multiple>
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/744144ab.svg" />
        </DesignChoice>
      </div>
      <div className="fg-56bc37e1da" data-node-id="631:27" data-name="Notification Setting / Saved">
        <div className="fg-4330b1974c" data-node-id="631:28">
          <DesignChoice className="fg-32bd4c7660" label="bookmark_border" group="" initial={false} multiple>bookmark_border</DesignChoice>
        </div>
        <div className="fg-6c7ae41cd5" data-node-id="631:29">
          <p className="fg-32bd4c7660" dir="auto">
            ذخیره‌شده‌ها
          </p>
        </div>
        <div className="fg-5374b1fb8a" data-node-id="631:30">
          <p className="fg-32bd4c7660" dir="auto">
            به‌روزرسانی‌های مهم آثاری که ذخیره کرده‌ای
          </p>
        </div>
        <DesignChoice className="fg-dea64f494e" data-node-id="631:31" data-name="Toggle" label="Toggle" group="Notification Setting / Saved" initial={false} multiple>
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/744144ab.svg" />
        </DesignChoice>
      </div>
      <div className="fg-a0b617eecd" data-node-id="631:33" data-name="Notification Setting / Personalized">
        <div className="fg-907fedda2b" data-node-id="631:34">
          <DesignChoice className="fg-32bd4c7660" label="favorite_border" group="" initial={false} multiple>favorite_border</DesignChoice>
        </div>
        <div className="fg-bd48460d47" data-node-id="631:35">
          <p className="fg-32bd4c7660" dir="auto">
            پیشنهادهای شخصی‌سازی‌شده
          </p>
        </div>
        <div className="fg-925f2b8c43" data-node-id="631:36">
          <p className="fg-32bd4c7660" dir="auto">
            قلب‌هایی که می‌زنی کمک می‌کنند پیشنهادهای بعدی مرتبط‌تر شوند.
          </p>
        </div>
        <DesignChoice className="fg-097045d5f0" data-node-id="631:37" data-name="Toggle" label="Toggle" group="Notification Setting / Personalized" initial={false} multiple>
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/744144ab.svg" />
        </DesignChoice>
      </div>
      <div className="fg-9107372395" data-node-id="631:39" data-name="Notifications / Note">
        <div className="fg-0493360306" data-node-id="631:40">
          <p className="fg-32bd4c7660">info_outline</p>
        </div>
        <div className="fg-05a271d561" data-node-id="631:41">
          <p className="fg-32bd4c7660" dir="auto">
            اعلان‌های ضروری مرتبط با خرید، درخواست سازمانی و امنیت حساب همیشه نمایش داده می‌شوند.
          </p>
        </div>
      </div>
      <MobileNavigation className="fg-be6f3a92d8" data-node-id="631:42" data-name="Bottom Navigation / RTL">
        <div className="fg-07afff17c3" data-node-id="631:43">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-30a9b49c3d" data-node-id="631:44" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
        <div className="fg-8ccaa646b2" data-node-id="631:45">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-80c1fba142" data-node-id="631:46">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-4dc3facf32" data-node-id="631:47">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-b61801a285" data-node-id="631:48" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-cfb6842ef4" data-node-id="625:8">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-945bf94a3e" data-node-id="631:50" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-6727da27ee" data-node-id="631:51">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-46f3fbe85e" data-node-id="631:52" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
      </MobileNavigation>
      <div className="fg-961e251cfb" data-node-id="796:7" data-name="Notification Setting / Corporate Orders">
        <div className="fg-4330b1974c" data-node-id="796:8">
          <p className="fg-32bd4c7660">business_center</p>
        </div>
        <div className="fg-728e60afb3" data-node-id="796:9">
          <p className="fg-32bd4c7660" dir="auto">
            درخواست‌های سازمانی
          </p>
        </div>
        <div className="fg-7b587cf5fd" data-node-id="796:10">
          <p className="fg-32bd4c7660" dir="auto">
            تخصیص، شروع اجرا، ارسال و تحویل سفارش سازمانی
          </p>
        </div>
        <DesignChoice className="fg-dea64f494e" data-node-id="796:11" data-name="Toggle" label="Toggle" group="Notification Setting / Corporate Orders" initial={false} multiple>
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/744144ab.svg" />
        </DesignChoice>
      </div>
    </div>
  );
}
