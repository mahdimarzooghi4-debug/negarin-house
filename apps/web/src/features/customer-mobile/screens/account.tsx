// Figma 603:5 — Customer / Account - Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";
export default function CustomerAccountMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="603:5" data-name="Customer / Account - Mobile">
      <div className="fg-1fdc37da61" data-node-id="603:6" data-name="Account / Top Bar">
        <div className="fg-506a6082d1" data-node-id="603:7">
          <p className="fg-32bd4c7660" dir="auto">
            حساب من
          </p>
        </div>
      </div>
      <div className="fg-d69134c910" data-node-id="603:8" data-name="Account / Profile Card">
        <div className="fg-f10d3a9aaa" data-node-id="603:9" data-name="Profile Avatar" />
        <div className="fg-78c3a4166a" data-node-id="603:10">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <div className="fg-c5d57de80f" data-node-id="603:11">
          <p className="fg-32bd4c7660" dir="auto">
            پروفایل من
          </p>
        </div>
        <div className="fg-0496648432" data-node-id="603:12">
          <p className="fg-32bd4c7660" dir="auto">
            اطلاعات حساب و ترجیحاتت را مدیریت کن.
          </p>
        </div>
        <div className="fg-5c27ca4b47" data-node-id="603:13">
          <p className="fg-32bd4c7660">chevron_left</p>
        </div>
      </div>
      <div className="fg-49041efe75" data-node-id="603:14">
        <p className="fg-32bd4c7660" dir="auto">
          دسترسی سریع
        </p>
      </div>
      <div className="fg-ad65dc8ea6" data-node-id="603:15" data-name="Tile / Orders">
        <div className="fg-661f7c9a9a" data-node-id="603:16">
          <p className="fg-32bd4c7660">receipt_long</p>
        </div>
        <DesignAction className="fg-1881a9c979" data-node-id="603:17" label="سفارش‌های من" destination="my-orders">
          <p className="fg-32bd4c7660" dir="auto">
            سفارش‌های من
          </p>
        </DesignAction>
        <div className="fg-f95bc97d20" data-node-id="603:18">
          <p className="fg-32bd4c7660" dir="auto">
            پیگیری سفارش‌های جاری و گذشته
          </p>
        </div>
      </div>
      <div className="fg-3f7fbc7162" data-node-id="603:19" data-name="Tile / Saved">
        <div className="fg-661f7c9a9a" data-node-id="603:20">
          <DesignChoice className="fg-32bd4c7660" label="bookmark_border" group="" initial={false} multiple>bookmark_border</DesignChoice>
        </div>
        <div className="fg-1881a9c979" data-node-id="603:21">
          <p className="fg-32bd4c7660" dir="auto">
            ذخیره‌شده‌ها
          </p>
        </div>
        <div className="fg-f95bc97d20" data-node-id="603:22">
          <p className="fg-32bd4c7660" dir="auto">
            محصول‌ها و روایت‌هایی که ذخیره کردی
          </p>
        </div>
      </div>
      <DesignAction className="fg-3830f6b7d9" data-node-id="603:23" data-name="Tile / Followed" label="groups دنبال‌شده‌ها هنرمندهایی که دنبال می‌کنی" destination="followed-artists">
        <div className="fg-661f7c9a9a" data-node-id="603:24">
          <p className="fg-32bd4c7660">groups</p>
        </div>
        <div className="fg-1881a9c979" data-node-id="603:25">
          <p className="fg-32bd4c7660" dir="auto">
            دنبال‌شده‌ها
          </p>
        </div>
        <div className="fg-f95bc97d20" data-node-id="603:26">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندهایی که دنبال می‌کنی
          </p>
        </div>
      </DesignAction>
      <DesignAction className="fg-1f76256940" data-node-id="603:27" data-name="Tile / Addresses" label="location_on آدرس‌ها مدیریت آدرس‌های تحویل" destination="addresses">
        <div className="fg-661f7c9a9a" data-node-id="603:28">
          <p className="fg-32bd4c7660">location_on</p>
        </div>
        <div className="fg-1881a9c979" data-node-id="603:29">
          <p className="fg-32bd4c7660" dir="auto">
            آدرس‌ها
          </p>
        </div>
        <div className="fg-f95bc97d20" data-node-id="603:30">
          <p className="fg-32bd4c7660" dir="auto">
            مدیریت آدرس‌های تحویل
          </p>
        </div>
      </DesignAction>
      <div className="fg-5e7ece62f7" data-node-id="603:31">
        <p className="fg-32bd4c7660" dir="auto">
          حساب و پشتیبانی
        </p>
      </div>
      <div className="fg-d08f2f3595" data-node-id="603:32" data-name="Row / Account Info">
        <div className="fg-647c51fb7f" data-node-id="603:33">
          <p className="fg-32bd4c7660">manage_accounts</p>
        </div>
        <DesignAction className="fg-e61298686f" data-node-id="603:34" label="اطلاعات حساب" destination="account-information">
          <p className="fg-32bd4c7660" dir="auto">
            اطلاعات حساب
          </p>
        </DesignAction>
        <div className="fg-3def98c817" data-node-id="603:35">
          <p className="fg-32bd4c7660" dir="auto">
            ویرایش اطلاعات پایه و تنظیمات حساب
          </p>
        </div>
        <div className="fg-5f6a3ae813" data-node-id="603:36">
          <p className="fg-32bd4c7660">chevron_left</p>
        </div>
      </div>
      <div className="fg-fb2c410cf4" data-node-id="603:37" data-name="Row / Notifications">
        <div className="fg-647c51fb7f" data-node-id="603:38">
          <p className="fg-32bd4c7660">notifications_none</p>
        </div>
        <DesignAction className="fg-e61298686f" data-node-id="603:39" label="اعلان‌ها" destination="notifications">
          <p className="fg-32bd4c7660" dir="auto">
            اعلان‌ها
          </p>
        </DesignAction>
        <div className="fg-3def98c817" data-node-id="603:40">
          <p className="fg-32bd4c7660" dir="auto">
            تنظیم اعلان سفارش‌ها و فعالیت‌ها
          </p>
        </div>
        <div className="fg-5f6a3ae813" data-node-id="603:41">
          <p className="fg-32bd4c7660">chevron_left</p>
        </div>
      </div>
      <div className="fg-2255555bfa" data-node-id="603:42" data-name="Row / Support">
        <div className="fg-647c51fb7f" data-node-id="603:43">
          <p className="fg-32bd4c7660">help_outline</p>
        </div>
        <DesignAction className="fg-e61298686f" data-node-id="603:44" label="راهنما و پشتیبانی" destination="help-and-support">
          <p className="fg-32bd4c7660" dir="auto">
            راهنما و پشتیبانی
          </p>
        </DesignAction>
        <div className="fg-3def98c817" data-node-id="603:45">
          <p className="fg-32bd4c7660" dir="auto">
            پرسش‌های متداول و ارتباط با پشتیبانی
          </p>
        </div>
        <div className="fg-5f6a3ae813" data-node-id="603:46">
          <p className="fg-32bd4c7660">chevron_left</p>
        </div>
      </div>
      <DesignAction className="fg-58551b0ec1" data-node-id="603:47" data-name="Account / Corporate Purchase" label="business_center خرید سازمانی و عمده ثبت درخواست برای شرکت یا سازمان" destination="corporate-buyer-handoff">
        <div className="fg-661010a87d" data-node-id="603:48">
          <p className="fg-32bd4c7660">business_center</p>
        </div>
        <div className="fg-92ff9f7dd7" data-node-id="603:49">
          <p className="fg-32bd4c7660" dir="auto">
            خرید سازمانی و عمده
          </p>
        </div>
        <div className="fg-59c76cc1d3" data-node-id="603:50">
          <p className="fg-32bd4c7660" dir="auto">
            ثبت درخواست برای شرکت یا سازمان
          </p>
        </div>
      </DesignAction>
      <MobileNavigation className="fg-5ed0a0b18c" data-node-id="612:43" data-name="Bottom Navigation / حساب Active">
        <div className="fg-7cc7d053de" data-node-id="612:44" data-name="Frame">
          <div className="fg-f6276bcc43" data-node-id="612:45" data-name="Frame">
            <p className="fg-29e2aa54a1" dir="auto" data-node-id="612:46">
              حساب
            </p>
            <div className="fg-9b83615bf5" data-node-id="612:47">
              <p className="fg-32bd4c7660">person</p>
            </div>
            <div className="fg-eefc7937f8" data-node-id="612:61" data-name="Active Indicator" />
          </div>
          <div className="fg-09f6bc0a81" data-node-id="612:48" data-name="Frame">
            <p className="fg-5df00cecfa" dir="auto" data-node-id="612:49">
              سبد
            </p>
            <div className="fg-4a5d6fb0b4" data-node-id="612:50">
              <p className="fg-32bd4c7660">shopping_cart</p>
            </div>
          </div>
          <div className="fg-09f6bc0a81" data-node-id="612:51" data-name="Frame">
            <p className="fg-5df00cecfa" dir="auto" data-node-id="612:52">
              روایت‌ها
            </p>
            <div className="fg-b69530fac1" data-node-id="612:53">
              <p className="fg-32bd4c7660">dynamic_feed</p>
            </div>
          </div>
          <div className="fg-09f6bc0a81" data-node-id="612:55" data-name="Frame">
            <p className="fg-5df00cecfa" dir="auto" data-node-id="612:56">
              کشف
            </p>
            <div className="fg-4a5d6fb0b4" data-node-id="612:57">
              <p className="fg-32bd4c7660">search</p>
            </div>
          </div>
          <div className="fg-09f6bc0a81" data-node-id="612:58" data-name="Frame">
            <p className="fg-5df00cecfa" dir="auto" data-node-id="612:59">
              خانه
            </p>
            <div className="fg-4a5d6fb0b4" data-node-id="612:60">
              <p className="fg-32bd4c7660">home</p>
            </div>
          </div>
        </div>
      </MobileNavigation>
    </div>
  );
}
