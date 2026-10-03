// Figma 269:10 — Artist / Product Editor — Edit Published
import { DesignAction, DesignField } from "../design-controls";
import { ArtistSidebar } from "../artist-sidebar";

export default function ArtistProductEditorEditPublished() {
  return (
    <div className="fg-3984f97129" data-node-id="269:10" data-name="Artist / Product Editor — Edit Published">
      <div className="fg-893efa80c6" data-node-id="269:11" data-name="Artist / Main">
        <div className="fg-e1f4917983" data-node-id="269:12" data-name="Product Editor / Header">
          <div className="fg-6109b5a331" data-node-id="269:13">
            <p className="fg-32bd4c7660" dir="auto">
              ویرایش محصول
            </p>
          </div>
          <div className="fg-4998427b64" data-node-id="269:14">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات محصول منتشرشده را ویرایش کن. تغییرات عملیاتی ساده مستقیم ذخیره می‌شوند؛ تغییرات محتوایی مهم ممکن است دوباره نیازمند بررسی نگارین باشند.
            </p>
          </div>
          <DesignAction className="fg-53c77ce51e" data-node-id="269:15" data-name="Button / بازگشت به محصولات" destination="future-artist-product-published-separate-publication-flow" label="بازگشت به محصول منتشرشده">
            <div className="fg-adf48c0cef" data-node-id="269:16">
              <p className="fg-32bd4c7660" dir="auto">
                بازگشت به محصول منتشرشده
              </p>
            </div>
          </DesignAction>
        </div>
        <div className="fg-feb91caf12" data-node-id="269:17" data-name="Product Editor / Draft Notice">
          <div className="fg-8cfc544760" data-node-id="269:18" data-name="Status / Draft">
            <div className="fg-e85de403c5" data-node-id="269:19">
              <p className="fg-32bd4c7660" dir="auto">
                پیش‌نویس قابل ذخیره
              </p>
            </div>
          </div>
          <div className="fg-13133c4010" data-node-id="269:20">
            <p className="fg-32bd4c7660" dir="auto">
              برای ساخت محصول لازم نیست منتظر فعال‌شدن فروشگاه بمانی.
            </p>
          </div>
          <div className="fg-e11017464c" data-node-id="269:21">
            <p className="fg-32bd4c7660" dir="auto">
              محصول را به‌صورت Draft آماده کن؛ نمایش عمومی و فروش فقط بعد از فعال‌شدن عضویت سالانه و فروشگاه انجام می‌شود.
            </p>
          </div>
        </div>
        <div className="fg-ad76746890" data-node-id="269:22" data-name="Product Editor / Images">
          <div className="fg-a07b232dd0" data-node-id="269:23">
            <p className="fg-32bd4c7660" dir="auto">
              تصاویر محصول
            </p>
          </div>
          <div className="fg-45d514398d" data-node-id="269:24">
            <p className="fg-32bd4c7660" dir="auto">
              حداقل یک تصویر واضح برای معرفی محصول اضافه کن.
            </p>
          </div>
          <div className="fg-ca1b95c430" data-node-id="269:25" data-name="Image Upload / Main">
            <div className="fg-33fa59a8d8" data-node-id="269:26">
              <p className="fg-32bd4c7660">＋</p>
            </div>
            <div className="fg-71596953bb" data-node-id="269:27">
              <p className="fg-32bd4c7660" dir="auto">
                افزودن تصویر اصلی
              </p>
            </div>
            <div className="fg-87d5028233" data-node-id="269:28">
              <p className="fg-32bd4c7660" dir="auto">
                JPG یا PNG • تصویر نمونه
              </p>
            </div>
          </div>
          <div className="fg-315a58b91e" data-node-id="269:29" data-name="Image Upload / Thumb 1">
            <div className="fg-1828b58caf" data-node-id="269:30">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
          <div className="fg-4d78409505" data-node-id="269:31" data-name="Image Upload / Thumb 2">
            <div className="fg-1828b58caf" data-node-id="269:32">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
          <div className="fg-578d9e2055" data-node-id="269:33" data-name="Image Upload / Thumb 3">
            <div className="fg-1828b58caf" data-node-id="269:34">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
        </div>
        <div className="fg-ed1983bc52" data-node-id="269:35" data-name="Product Editor / Basic Info">
          <div className="fg-af9c3d3e83" data-node-id="269:36">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات اصلی
            </p>
          </div>
          <div className="fg-6ad1eb64c6" data-node-id="269:37">
            <p className="fg-32bd4c7660" dir="auto">
              عنوان، دسته و توضیحی که مشتری در صفحه محصول می‌بیند.
            </p>
          </div>
          <div className="fg-2f52f2626c" data-node-id="269:38">
            <p className="fg-32bd4c7660" dir="auto">
              نام محصول
            </p>
          </div>
          <DesignField className="fg-abc35a4e75" data-node-id="269:39" data-name="نام محصول / Field" label="نام محصول" placeholder="بشقاب میناکاری طرح شاه‌عباسی">
            <div className="fg-c11b089520" data-node-id="269:40">
              <p className="fg-32bd4c7660" dir="auto">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
            </div>
          </DesignField>
          <div className="fg-c545f5b1d9" data-node-id="269:41">
            <p className="fg-32bd4c7660" dir="auto">
              دسته هنری
            </p>
          </div>
          <DesignField className="fg-429daa008c" data-node-id="269:42" data-name="دسته هنری / Field" label="دسته هنری" placeholder="انتخاب دسته">
            <div className="fg-a9fbb28550" data-node-id="269:43">
              <p className="fg-32bd4c7660" dir="auto">
                انتخاب دسته
              </p>
            </div>
          </DesignField>
          <div className="fg-5a83ae8deb" data-node-id="269:44">
            <p className="fg-32bd4c7660" dir="auto">
              عنوان کوتاه / ویژگی اصلی
            </p>
          </div>
          <DesignField className="fg-c51552de49" data-node-id="269:45" data-name="عنوان کوتاه / ویژگی اصلی / Field" label="عنوان کوتاه / ویژگی اصلی" placeholder="مثلاً دست‌دوز و تولید محدود">
            <div className="fg-c07eded23f" data-node-id="269:46">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً دست‌دوز و تولید محدود
              </p>
            </div>
          </DesignField>
          <div className="fg-659f9fab27" data-node-id="269:47">
            <p className="fg-32bd4c7660" dir="auto">
              توضیحات محصول
            </p>
          </div>
          <DesignField className="fg-395e07d9b2" data-node-id="269:48" data-name="توضیحات محصول / Field" label="توضیحات محصول" placeholder="داستان، تکنیک ساخت و ویژگی‌های محصول را کوتاه و روشن بنویس.">
            <div className="fg-9d63bf49b3" data-node-id="269:49">
              <p className="fg-32bd4c7660" dir="auto">
                داستان، تکنیک ساخت و ویژگی‌های محصول را کوتاه و روشن بنویس.
              </p>
            </div>
          </DesignField>
        </div>
        <div className="fg-573bd459f5" data-node-id="269:50" data-name="Product Editor / Sales Info">
          <div className="fg-af9c3d3e83" data-node-id="269:51">
            <p className="fg-32bd4c7660" dir="auto">
              قیمت و موجودی
            </p>
          </div>
          <div className="fg-6ad1eb64c6" data-node-id="269:52">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات فروش محصول را برای سفارش‌های خرده‌فروشی تنظیم کن.
            </p>
          </div>
          <div className="fg-6c960a82b9" data-node-id="269:53">
            <p className="fg-32bd4c7660" dir="auto">
              قیمت فروش
            </p>
          </div>
          <DesignField className="fg-d2badb12aa" data-node-id="269:54" data-name="قیمت فروش / Field" label="قیمت فروش" placeholder="۳ روز کاری">
            <div className="fg-a9fbb28550" data-node-id="269:55">
              <p className="fg-32bd4c7660" dir="auto">
                ۳ روز کاری
              </p>
            </div>
          </DesignField>
          <div className="fg-d9c9f0cd60" data-node-id="269:56">
            <p className="fg-32bd4c7660" dir="auto">
              موجودی قابل فروش
            </p>
          </div>
          <DesignField className="fg-c13152b7fa" data-node-id="269:57" data-name="موجودی قابل فروش / Field" label="موجودی قابل فروش" placeholder="تعداد">
            <div className="fg-c07eded23f" data-node-id="269:58">
              <p className="fg-32bd4c7660" dir="auto">
                تعداد
              </p>
            </div>
          </DesignField>
          <div className="fg-c545f5b1d9" data-node-id="269:59">
            <p className="fg-32bd4c7660" dir="auto">
              زمان آماده‌سازی
            </p>
          </div>
          <DesignField className="fg-429daa008c" data-node-id="269:60" data-name="زمان آماده‌سازی / Field" label="زمان آماده‌سازی" placeholder="مثلاً ۳ روز کاری">
            <div className="fg-a9fbb28550" data-node-id="269:61">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً ۳ روز کاری
              </p>
            </div>
          </DesignField>
          <div className="fg-5a83ae8deb" data-node-id="269:62">
            <p className="fg-32bd4c7660" dir="auto">
              کد محصول (اختیاری)
            </p>
          </div>
          <DesignField className="fg-c51552de49" data-node-id="269:63" data-name="کد محصول (اختیاری) / Field" label="کد محصول (اختیاری)" placeholder="برای مدیریت داخلی">
            <div className="fg-c07eded23f" data-node-id="269:64">
              <p className="fg-32bd4c7660" dir="auto">
                برای مدیریت داخلی
              </p>
            </div>
          </DesignField>
        </div>
        <div className="fg-5ab2049706" data-node-id="269:65" data-name="Product Editor / Publication">
          <div className="fg-a07b232dd0" data-node-id="269:66">
            <p className="fg-32bd4c7660" dir="auto">
              وضعیت انتشار
            </p>
          </div>
          <div className="fg-23543805f8" data-node-id="269:67" data-name="Draft Status">
            <div className="fg-4a9c6114fc" data-node-id="269:68">
              <p className="fg-32bd4c7660" dir="auto">
                پیش‌نویس
              </p>
            </div>
          </div>
          <div className="fg-a8a40b125c" data-node-id="269:69">
            <p className="fg-32bd4c7660" dir="auto">
              تا وقتی محصول را برای بررسی نفرستی، فقط در پنل خودت دیده می‌شود.
            </p>
          </div>
          <div className="fg-5d1337458c" data-node-id="269:70" data-name="Lifecycle Hint">
            <div className="fg-94520e28c3" data-node-id="269:71">
              <p className="fg-0a21096298" dir="auto">{`پیش‌نویس  ←  بررسی  ←  انتشار`}</p>
            </div>
          </div>
          <div className="fg-e7e11b88c1" data-node-id="269:72">
            <p className="fg-32bd4c7660" dir="auto">
              انتشار عمومی فقط وقتی فروشگاه فعال باشد انجام می‌شود.
            </p>
          </div>
        </div>
        <div className="fg-afeaaded47" data-node-id="269:73" data-name="Product Editor / Review Readiness">
          <div className="fg-76567020d7" data-node-id="269:74">
            <p className="fg-32bd4c7660" dir="auto">
              آمادگی برای ارسال به بررسی
            </p>
          </div>
          <div className="fg-0e085046c8" data-node-id="269:75">
            <p className="fg-32bd4c7660" dir="auto">
              قبل از ارسال، کامل‌بودن اطلاعات اصلی را بررسی کن.
            </p>
          </div>
          <div className="fg-4633e9f7e7" data-node-id="269:76" data-name="Checklist / عنوان و دسته محصول">
            <div className="fg-ef069641e3" data-node-id="269:77" data-name="Ellipse">
              <img alt="" className="fg-8faf267d30" src="/artist-assets/21977f995a484739.svg" />
            </div>
            <div className="fg-f5747320f2" data-node-id="269:78">
              <p className="fg-32bd4c7660">✓</p>
            </div>
            <div className="fg-56c009c0be" data-node-id="269:79">
              <p className="fg-32bd4c7660" dir="auto">
                عنوان و دسته محصول
              </p>
            </div>
          </div>
          <div className="fg-4c4a2a7a61" data-node-id="269:80" data-name="Checklist / حداقل یک تصویر">
            <div className="fg-ef069641e3" data-node-id="269:81" data-name="Ellipse">
              <img alt="" className="fg-8faf267d30" src="/artist-assets/21977f995a484739.svg" />
            </div>
            <div className="fg-f5747320f2" data-node-id="269:82">
              <p className="fg-32bd4c7660">✓</p>
            </div>
            <div className="fg-56c009c0be" data-node-id="269:83">
              <p className="fg-32bd4c7660" dir="auto">
                حداقل یک تصویر
              </p>
            </div>
          </div>
          <div className="fg-3bc81edad5" data-node-id="269:84" data-name="Checklist / قیمت و موجودی">
            <div className="fg-ef069641e3" data-node-id="269:85" data-name="Ellipse">
              <img alt="" className="fg-8faf267d30" src="/artist-assets/21977f995a484739.svg" />
            </div>
            <div className="fg-f5747320f2" data-node-id="269:86">
              <p className="fg-32bd4c7660">✓</p>
            </div>
            <div className="fg-56c009c0be" data-node-id="269:87">
              <p className="fg-32bd4c7660" dir="auto">
                قیمت و موجودی
              </p>
            </div>
          </div>
          <div className="fg-6748151ee1" data-node-id="269:88" data-name="Checklist / توضیح و زمان آماده‌سازی">
            <div className="fg-ef069641e3" data-node-id="269:89" data-name="Ellipse">
              <img alt="" className="fg-8faf267d30" src="/artist-assets/21977f995a484739.svg" />
            </div>
            <div className="fg-f5747320f2" data-node-id="269:90">
              <p className="fg-32bd4c7660">✓</p>
            </div>
            <div className="fg-56c009c0be" data-node-id="269:91">
              <p className="fg-32bd4c7660" dir="auto">
                توضیح و زمان آماده‌سازی
              </p>
            </div>
          </div>
        </div>
        <div className="fg-d02c4edeae" data-node-id="269:92" data-name="Product Editor / Actions">
          <div className="fg-7d29952c7b" data-node-id="269:93">
            <p className="fg-32bd4c7660" dir="auto">
              ذخیره پیش‌نویس همیشه در دسترس است؛ ارسال برای بررسی زمانی انجام می‌شود که اطلاعات لازم را تکمیل کرده باشی.
            </p>
          </div>
          <DesignAction className="fg-0bb8ed929a" data-node-id="269:94" data-name="Button / ذخیره پیش‌نویس" destination="future-artist-product-published-separate-publication-flow" label="ذخیره تغییرات">
            <div className="fg-adf48c0cef" data-node-id="269:95">
              <p className="fg-32bd4c7660" dir="auto">
                ذخیره تغییرات
              </p>
            </div>
          </DesignAction>
          <DesignAction className="fg-a6b0162819" data-node-id="269:96" data-name="Button / ارسال برای بررسی" destination="product-changes-review-confirmation-modal" label="ذخیره و ارسال برای بررسی">
            <div className="fg-3199be5902" data-node-id="269:97">
              <p className="fg-32bd4c7660" dir="auto">
                ذخیره و ارسال برای بررسی
              </p>
            </div>
          </DesignAction>
        </div>
      </div>
      <ArtistSidebar variant="sidebar-329e1ed69a" />
    </div>
  );
}