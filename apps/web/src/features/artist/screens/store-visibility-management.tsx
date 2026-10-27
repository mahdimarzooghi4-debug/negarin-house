// Figma 329:12 — Artist / Store Visibility Management — Desktop
import { DesignAction, DesignChoice } from "../design-controls";
import { ArtistSidebar } from "../artist-sidebar";

export default function ArtistStoreVisibilityManagementDesktop() {
  return (
    <div className="fg-3984f97129" data-node-id="329:12" data-name="Artist / Store Visibility Management — Desktop">
      <div className="fg-feae86cbdc" data-node-id="329:13" data-name="Artist / Main">
        <div className="fg-e1f4917983" data-node-id="333:12" data-name="Store Visibility / Header">
          <p className="fg-8302523846" dir="auto" data-node-id="333:13">
            مدیریت نمایش فروشگاه
          </p>
          <p className="fg-aa9e7d23e8" dir="auto" data-node-id="333:14">
            کنترل وضعیت نمایش عمومی فروشگاه برای مشتریان
          </p>
          <DesignAction className="fg-d09e3fa179" data-node-id="333:15" data-name="Back" destination="store" label="بازگشت به فروشگاه من">
            <p className="fg-9498c3f068" dir="auto" data-node-id="333:16">
              بازگشت به فروشگاه من
            </p>
          </DesignAction>
        </div>
        <div className="fg-ee635a7427" data-node-id="333:17" data-name="Store Visibility / Hero">
          <div className="fg-1170f79ea8" data-node-id="333:18" data-name="Status / Active">
            <p className="fg-213492d853" dir="auto" data-node-id="333:19">
              نمایش عمومی فعال
            </p>
          </div>
          <p className="fg-91d7d6c81b" dir="auto" data-node-id="333:20">
            فروشگاه شما در نگارین قابل مشاهده است
          </p>
          <p className="fg-c13295ade6" dir="auto" data-node-id="333:21">
            می‌توانی نمایش عمومی فروشگاه را موقتاً متوقف یا دوباره فعال کنی. این تنظیم از عضویت سالانه، سطح رشد و نشان تأیید حرفه‌ای مستقل است.
          </p>
          <div className="fg-d142a93e0f" data-node-id="333:22" data-name="View Store">
            <p className="fg-48d868a02d" dir="auto" data-node-id="333:23">
              مشاهده صفحه عمومی
            </p>
          </div>
        </div>
        <div className="fg-dafc30fe7f" data-node-id="333:24" data-name="Store Visibility / Public Setting">
          <p className="fg-57a30c93b4" dir="auto" data-node-id="333:25">
            نمایش عمومی فروشگاه
          </p>
          <p className="fg-521ab8d8bf" dir="auto" data-node-id="333:26">
            مشخص می‌کند فروشگاه برای مشتریان قابل مشاهده باشد یا خیر.
          </p>
          <div className="fg-d667cdbde6" data-node-id="333:27" data-name="Public Visibility Toggle">
            <p className="fg-ae2b575cd5" dir="auto" data-node-id="333:28">
              نمایش فروشگاه در نگارین
            </p>
            <p className="fg-b15e542698" dir="auto" data-node-id="333:29">
              فروشگاه و محصولات منتشرشده برای مشتریان قابل مشاهده هستند.
            </p>
            <DesignChoice className="fg-d63c214531" data-node-id="333:30" data-name="Toggle / Active" label="Toggle / Active" group="Public Visibility Toggle" initial={true} multiple>
              <img alt="" className="fg-8faf267d30" src="/artist-assets/d2ac58f262a0599e.svg" />
            </DesignChoice>
          </div>
          <p className="fg-5769149105" dir="auto" data-node-id="333:32">
            با خاموش‌کردن این گزینه، فروشگاه از نمایش عمومی خارج می‌شود.
          </p>
        </div>
        <div className="fg-761d3a1d64" data-node-id="333:33" data-name="Store Visibility / Temporary Pause">
          <p className="fg-7bf9eeae19" dir="auto" data-node-id="333:34">
            توقف موقت
          </p>
          <p className="fg-d13a091ae3" dir="auto" data-node-id="333:35">
            برای زمانی که نمی‌خواهی فروشگاه به‌صورت عمومی نمایش داده شود.
          </p>
          <div className="fg-657dec9679" data-node-id="333:36" data-name="Pause Info">
            <p className="fg-ed21b8a01b" dir="auto" data-node-id="333:37">
              در حالت توقف
            </p>
            <p className="fg-ba9f57726c" dir="auto" data-node-id="333:38">
              فروشگاه برای مشتریان نمایش داده نمی‌شود؛ اما عضویت، سطح رشد و سابقه فروشگاه تغییر نمی‌کند.
            </p>
          </div>
          <div className="fg-c8aa062b92" data-node-id="333:39" data-name="Resume Note">
            <p className="fg-579971a289" dir="auto" data-node-id="333:40">
              برای بازگشت، نمایش عمومی را دوباره فعال کن.
            </p>
          </div>
        </div>
        <div className="fg-ab485b01d7" data-node-id="333:41" data-name="Store Visibility / Independence">
          <p className="fg-dceef1f0bd" dir="auto" data-node-id="333:42">
            این تنظیم چه چیزهایی را تغییر نمی‌دهد؟
          </p>
          <p className="fg-d7e76f25f0" dir="auto" data-node-id="333:43">
            نمایش عمومی یک وضعیت مستقل است و نباید با عضویت، رشد یا تأیید حرفه‌ای اشتباه شود.
          </p>
          <div className="fg-e4c4fb0e4f" data-node-id="333:44" data-name="Independence / عضویت سالانه">
            <p className="fg-2d0705edb6" dir="auto" data-node-id="333:45">
              عضویت سالانه
            </p>
            <p className="fg-f4595bff0c" dir="auto" data-node-id="333:46">
              فعال
            </p>
            <p className="fg-3d37c88dab" dir="auto" data-node-id="333:47">
              توقف نمایش، عضویت را لغو نمی‌کند.
            </p>
          </div>
          <div className="fg-3fa7901654" data-node-id="333:48" data-name="Independence / سطح رشد">
            <p className="fg-2d0705edb6" dir="auto" data-node-id="333:49">
              سطح رشد
            </p>
            <p className="fg-f4595bff0c" dir="auto" data-node-id="333:50">
              جوانه
            </p>
            <p className="fg-3d37c88dab" dir="auto" data-node-id="333:51">
              تغییر نمایش عمومی سطح رشد را تغییر نمی‌دهد.
            </p>
          </div>
          <div className="fg-8c6926b4a4" data-node-id="333:52" data-name="Independence / تأیید حرفه‌ای">
            <p className="fg-2d0705edb6" dir="auto" data-node-id="333:53">
              تأیید حرفه‌ای
            </p>
            <p className="fg-f4595bff0c" dir="auto" data-node-id="333:54">
              مستقل
            </p>
            <p className="fg-3d37c88dab" dir="auto" data-node-id="333:55">
              تیک آبی به این تنظیم وابسته نیست.
            </p>
          </div>
        </div>
        <div className="fg-6d990712b9" data-node-id="333:56" data-name="Store Visibility / Note">
          <p className="fg-7e27db0a8a" dir="auto" data-node-id="333:57">
            مرز این صفحه
          </p>
          <p className="fg-0fbad4b0ac" dir="auto" data-node-id="333:58">
            این بخش فقط وضعیت نمایش عمومی فروشگاه را کنترل می‌کند. محتوای فروشگاه و تنظیمات فروش از بخش‌های جداگانه مدیریت می‌شوند.
          </p>
        </div>
        <div className="fg-f2d2f62cbc" data-node-id="333:59" data-name="Store Visibility / Actions">
          <p className="fg-029145475a" dir="auto" data-node-id="333:60">
            تغییرات پس از ذخیره روی وضعیت نمایش عمومی اعمال می‌شوند.
          </p>
          <DesignAction className="fg-8532ea2725" data-node-id="333:61" data-name="Cancel" destination="store" label="انصراف">
            <p className="fg-ed0168dbce" dir="auto" data-node-id="333:62">
              انصراف
            </p>
          </DesignAction>
          <DesignAction className="fg-6b9f9c6e82" data-node-id="333:63" data-name="Save" destination="store" label="ذخیره تنظیمات">
            <p className="fg-c92f7a0925" dir="auto" data-node-id="333:64">
              ذخیره تنظیمات
            </p>
          </DesignAction>
        </div>
      </div>
      <ArtistSidebar variant="sidebar-632ae3e730" />
    </div>
  );
}