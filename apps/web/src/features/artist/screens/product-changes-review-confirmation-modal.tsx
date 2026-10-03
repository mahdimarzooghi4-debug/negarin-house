// Figma 271:186 — Artist / Product Changes Review — Confirmation Modal
import { DesignAction, DesignField, DesignDialog } from "../design-controls";
import { ArtistSidebar } from "../artist-sidebar";

export default function ArtistProductChangesReviewConfirmationModal() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="271:186" data-name="Artist / Product Changes Review — Confirmation Modal">
      <div className="fg-24990da9c2" data-node-id="271:187" data-name="Artist / Main" inert>
        <div className="fg-e1f4917983" data-node-id="271:188" data-name="Product Editor / Header">
          <div className="fg-6109b5a331" data-node-id="271:189">
            <p className="fg-32bd4c7660" dir="auto">
              ویرایش محصول
            </p>
          </div>
          <div className="fg-4998427b64" data-node-id="271:190">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات محصول منتشرشده را ویرایش کن. تغییرات عملیاتی ساده مستقیم ذخیره می‌شوند؛ تغییرات محتوایی مهم ممکن است دوباره نیازمند بررسی نگارین باشند.
            </p>
          </div>
          <DesignAction className="fg-f67e470da7" data-node-id="271:191" data-name="Button / بازگشت به محصولات" label="بازگشت به محصول منتشرشده">
            <div className="fg-adf48c0cef" data-node-id="271:192">
              <p className="fg-32bd4c7660" dir="auto">
                بازگشت به محصول منتشرشده
              </p>
            </div>
          </DesignAction>
        </div>
        <div className="fg-feb91caf12" data-node-id="271:193" data-name="Product Editor / Draft Notice">
          <div className="fg-8cfc544760" data-node-id="271:194" data-name="Status / Draft">
            <div className="fg-e85de403c5" data-node-id="271:195">
              <p className="fg-32bd4c7660" dir="auto">
                پیش‌نویس قابل ذخیره
              </p>
            </div>
          </div>
          <div className="fg-13133c4010" data-node-id="271:196">
            <p className="fg-32bd4c7660" dir="auto">
              برای ساخت محصول لازم نیست منتظر فعال‌شدن فروشگاه بمانی.
            </p>
          </div>
          <div className="fg-e11017464c" data-node-id="271:197">
            <p className="fg-32bd4c7660" dir="auto">
              محصول را به‌صورت Draft آماده کن؛ نمایش عمومی و فروش فقط بعد از فعال‌شدن عضویت سالانه و فروشگاه انجام می‌شود.
            </p>
          </div>
        </div>
        <div className="fg-ad76746890" data-node-id="271:198" data-name="Product Editor / Images">
          <div className="fg-a07b232dd0" data-node-id="271:199">
            <p className="fg-32bd4c7660" dir="auto">
              تصاویر محصول
            </p>
          </div>
          <div className="fg-45d514398d" data-node-id="271:200">
            <p className="fg-32bd4c7660" dir="auto">
              حداقل یک تصویر واضح برای معرفی محصول اضافه کن.
            </p>
          </div>
          <div className="fg-ca1b95c430" data-node-id="271:201" data-name="Image Upload / Main">
            <div className="fg-33fa59a8d8" data-node-id="271:202">
              <p className="fg-32bd4c7660">＋</p>
            </div>
            <div className="fg-71596953bb" data-node-id="271:203">
              <p className="fg-32bd4c7660" dir="auto">
                افزودن تصویر اصلی
              </p>
            </div>
            <div className="fg-87d5028233" data-node-id="271:204">
              <p className="fg-32bd4c7660" dir="auto">
                JPG یا PNG • تصویر نمونه
              </p>
            </div>
          </div>
          <div className="fg-315a58b91e" data-node-id="271:205" data-name="Image Upload / Thumb 1">
            <div className="fg-1828b58caf" data-node-id="271:206">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
          <div className="fg-4d78409505" data-node-id="271:207" data-name="Image Upload / Thumb 2">
            <div className="fg-1828b58caf" data-node-id="271:208">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
          <div className="fg-578d9e2055" data-node-id="271:209" data-name="Image Upload / Thumb 3">
            <div className="fg-1828b58caf" data-node-id="271:210">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
        </div>
        <div className="fg-ed1983bc52" data-node-id="271:211" data-name="Product Editor / Basic Info">
          <div className="fg-af9c3d3e83" data-node-id="271:212">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات اصلی
            </p>
          </div>
          <div className="fg-6ad1eb64c6" data-node-id="271:213">
            <p className="fg-32bd4c7660" dir="auto">
              عنوان، دسته و توضیحی که مشتری در صفحه محصول می‌بیند.
            </p>
          </div>
          <div className="fg-2f52f2626c" data-node-id="271:214">
            <p className="fg-32bd4c7660" dir="auto">
              نام محصول
            </p>
          </div>
          <DesignField className="fg-abc35a4e75" data-node-id="271:215" data-name="نام محصول / Field" label="نام محصول" placeholder="بشقاب میناکاری طرح شاه‌عباسی">
            <div className="fg-c11b089520" data-node-id="271:216">
              <p className="fg-32bd4c7660" dir="auto">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
            </div>
          </DesignField>
          <div className="fg-c545f5b1d9" data-node-id="271:217">
            <p className="fg-32bd4c7660" dir="auto">
              دسته هنری
            </p>
          </div>
          <DesignField className="fg-429daa008c" data-node-id="271:218" data-name="دسته هنری / Field" label="دسته هنری" placeholder="انتخاب دسته">
            <div className="fg-a9fbb28550" data-node-id="271:219">
              <p className="fg-32bd4c7660" dir="auto">
                انتخاب دسته
              </p>
            </div>
          </DesignField>
          <div className="fg-5a83ae8deb" data-node-id="271:220">
            <p className="fg-32bd4c7660" dir="auto">
              عنوان کوتاه / ویژگی اصلی
            </p>
          </div>
          <DesignField className="fg-c51552de49" data-node-id="271:221" data-name="عنوان کوتاه / ویژگی اصلی / Field" label="عنوان کوتاه / ویژگی اصلی" placeholder="مثلاً دست‌دوز و تولید محدود">
            <div className="fg-c07eded23f" data-node-id="271:222">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً دست‌دوز و تولید محدود
              </p>
            </div>
          </DesignField>
          <div className="fg-659f9fab27" data-node-id="271:223">
            <p className="fg-32bd4c7660" dir="auto">
              توضیحات محصول
            </p>
          </div>
          <DesignField className="fg-395e07d9b2" data-node-id="271:224" data-name="توضیحات محصول / Field" label="توضیحات محصول" placeholder="داستان، تکنیک ساخت و ویژگی‌های محصول را کوتاه و روشن بنویس.">
            <div className="fg-9d63bf49b3" data-node-id="271:225">
              <p className="fg-32bd4c7660" dir="auto">
                داستان، تکنیک ساخت و ویژگی‌های محصول را کوتاه و روشن بنویس.
              </p>
            </div>
          </DesignField>
        </div>
        <div className="fg-573bd459f5" data-node-id="271:226" data-name="Product Editor / Sales Info">
          <div className="fg-af9c3d3e83" data-node-id="271:227">
            <p className="fg-32bd4c7660" dir="auto">
              قیمت و موجودی
            </p>
          </div>
          <div className="fg-6ad1eb64c6" data-node-id="271:228">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات فروش محصول را برای سفارش‌های خرده‌فروشی تنظیم کن.
            </p>
          </div>
          <div className="fg-6c960a82b9" data-node-id="271:229">
            <p className="fg-32bd4c7660" dir="auto">
              قیمت فروش
            </p>
          </div>
          <DesignField className="fg-d2badb12aa" data-node-id="271:230" data-name="قیمت فروش / Field" label="قیمت فروش" placeholder="۳ روز کاری">
            <div className="fg-a9fbb28550" data-node-id="271:231">
              <p className="fg-32bd4c7660" dir="auto">
                ۳ روز کاری
              </p>
            </div>
          </DesignField>
          <div className="fg-d9c9f0cd60" data-node-id="271:232">
            <p className="fg-32bd4c7660" dir="auto">
              موجودی قابل فروش
            </p>
          </div>
          <DesignField className="fg-c13152b7fa" data-node-id="271:233" data-name="موجودی قابل فروش / Field" label="موجودی قابل فروش" placeholder="تعداد">
            <div className="fg-c07eded23f" data-node-id="271:234">
              <p className="fg-32bd4c7660" dir="auto">
                تعداد
              </p>
            </div>
          </DesignField>
          <div className="fg-c545f5b1d9" data-node-id="271:235">
            <p className="fg-32bd4c7660" dir="auto">
              زمان آماده‌سازی
            </p>
          </div>
          <DesignField className="fg-429daa008c" data-node-id="271:236" data-name="زمان آماده‌سازی / Field" label="زمان آماده‌سازی" placeholder="مثلاً ۳ روز کاری">
            <div className="fg-a9fbb28550" data-node-id="271:237">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً ۳ روز کاری
              </p>
            </div>
          </DesignField>
          <div className="fg-5a83ae8deb" data-node-id="271:238">
            <p className="fg-32bd4c7660" dir="auto">
              کد محصول (اختیاری)
            </p>
          </div>
          <DesignField className="fg-c51552de49" data-node-id="271:239" data-name="کد محصول (اختیاری) / Field" label="کد محصول (اختیاری)" placeholder="برای مدیریت داخلی">
            <div className="fg-c07eded23f" data-node-id="271:240">
              <p className="fg-32bd4c7660" dir="auto">
                برای مدیریت داخلی
              </p>
            </div>
          </DesignField>
        </div>
        <div className="fg-5ab2049706" data-node-id="271:241" data-name="Product Editor / Publication">
          <div className="fg-a07b232dd0" data-node-id="271:242">
            <p className="fg-32bd4c7660" dir="auto">
              وضعیت انتشار
            </p>
          </div>
          <div className="fg-23543805f8" data-node-id="271:243" data-name="Draft Status">
            <div className="fg-4a9c6114fc" data-node-id="271:244">
              <p className="fg-32bd4c7660" dir="auto">
                پیش‌نویس
              </p>
            </div>
          </div>
          <div className="fg-a8a40b125c" data-node-id="271:245">
            <p className="fg-32bd4c7660" dir="auto">
              تا وقتی محصول را برای بررسی نفرستی، فقط در پنل خودت دیده می‌شود.
            </p>
          </div>
          <div className="fg-5d1337458c" data-node-id="271:246" data-name="Lifecycle Hint">
            <div className="fg-94520e28c3" data-node-id="271:247">
              <p className="fg-0a21096298" dir="auto">{`پیش‌نویس  ←  بررسی  ←  انتشار`}</p>
            </div>
          </div>
          <div className="fg-e7e11b88c1" data-node-id="271:248">
            <p className="fg-32bd4c7660" dir="auto">
              انتشار عمومی فقط وقتی فروشگاه فعال باشد انجام می‌شود.
            </p>
          </div>
        </div>
        <div className="fg-afeaaded47" data-node-id="271:249" data-name="Product Editor / Review Readiness">
          <div className="fg-76567020d7" data-node-id="271:250">
            <p className="fg-32bd4c7660" dir="auto">
              آمادگی برای ارسال به بررسی
            </p>
          </div>
          <div className="fg-0e085046c8" data-node-id="271:251">
            <p className="fg-32bd4c7660" dir="auto">
              قبل از ارسال، کامل‌بودن اطلاعات اصلی را بررسی کن.
            </p>
          </div>
          <div className="fg-4633e9f7e7" data-node-id="271:252" data-name="Checklist / عنوان و دسته محصول">
            <div className="fg-ef069641e3" data-node-id="271:253" data-name="Ellipse">
              <img alt="" className="fg-8faf267d30" src="/artist-assets/21977f995a484739.svg" />
            </div>
            <div className="fg-f5747320f2" data-node-id="271:254">
              <p className="fg-32bd4c7660">✓</p>
            </div>
            <div className="fg-56c009c0be" data-node-id="271:255">
              <p className="fg-32bd4c7660" dir="auto">
                عنوان و دسته محصول
              </p>
            </div>
          </div>
          <div className="fg-4c4a2a7a61" data-node-id="271:256" data-name="Checklist / حداقل یک تصویر">
            <div className="fg-ef069641e3" data-node-id="271:257" data-name="Ellipse">
              <img alt="" className="fg-8faf267d30" src="/artist-assets/21977f995a484739.svg" />
            </div>
            <div className="fg-f5747320f2" data-node-id="271:258">
              <p className="fg-32bd4c7660">✓</p>
            </div>
            <div className="fg-56c009c0be" data-node-id="271:259">
              <p className="fg-32bd4c7660" dir="auto">
                حداقل یک تصویر
              </p>
            </div>
          </div>
          <div className="fg-3bc81edad5" data-node-id="271:260" data-name="Checklist / قیمت و موجودی">
            <div className="fg-ef069641e3" data-node-id="271:261" data-name="Ellipse">
              <img alt="" className="fg-8faf267d30" src="/artist-assets/21977f995a484739.svg" />
            </div>
            <div className="fg-f5747320f2" data-node-id="271:262">
              <p className="fg-32bd4c7660">✓</p>
            </div>
            <div className="fg-56c009c0be" data-node-id="271:263">
              <p className="fg-32bd4c7660" dir="auto">
                قیمت و موجودی
              </p>
            </div>
          </div>
          <div className="fg-6748151ee1" data-node-id="271:264" data-name="Checklist / توضیح و زمان آماده‌سازی">
            <div className="fg-ef069641e3" data-node-id="271:265" data-name="Ellipse">
              <img alt="" className="fg-8faf267d30" src="/artist-assets/21977f995a484739.svg" />
            </div>
            <div className="fg-f5747320f2" data-node-id="271:266">
              <p className="fg-32bd4c7660">✓</p>
            </div>
            <div className="fg-56c009c0be" data-node-id="271:267">
              <p className="fg-32bd4c7660" dir="auto">
                توضیح و زمان آماده‌سازی
              </p>
            </div>
          </div>
        </div>
        <div className="fg-d02c4edeae" data-node-id="271:268" data-name="Product Editor / Actions">
          <div className="fg-7d29952c7b" data-node-id="271:269">
            <p className="fg-32bd4c7660" dir="auto">
              ذخیره پیش‌نویس همیشه در دسترس است؛ ارسال برای بررسی زمانی انجام می‌شود که اطلاعات لازم را تکمیل کرده باشی.
            </p>
          </div>
          <DesignAction className="fg-4a55517e47" data-node-id="271:270" data-name="Button / ذخیره پیش‌نویس" label="ذخیره تغییرات">
            <div className="fg-adf48c0cef" data-node-id="271:271">
              <p className="fg-32bd4c7660" dir="auto">
                ذخیره تغییرات
              </p>
            </div>
          </DesignAction>
          <DesignAction className="fg-ce936f7e27" data-node-id="271:272" data-name="Button / ارسال برای بررسی" label="ذخیره و ارسال برای بررسی">
            <div className="fg-3199be5902" data-node-id="271:273">
              <p className="fg-32bd4c7660" dir="auto">
                ذخیره و ارسال برای بررسی
              </p>
            </div>
          </DesignAction>
        </div>
      </div>
      <ArtistSidebar variant="sidebar-6fbdc1b654" />
      <div className="fg-55f5e60589" data-node-id="271:352" data-name="Scrim" />
      <DesignDialog className="fg-9e140c5efc" data-node-id="271:353" data-name="Product Changes Review / Modal" label="Product Changes Review / Modal">
        <div className="fg-1d69239fa3" data-node-id="271:354" data-name="Review / Icon">
          <div className="fg-168262b4ae" data-node-id="271:355">
            <p className="fg-32bd4c7660">✓</p>
          </div>
        </div>
        <div className="fg-1682ce72ab" data-node-id="271:356">
          <p className="fg-32bd4c7660" dir="auto">
            ارسال تغییرات برای بررسی؟
          </p>
        </div>
        <div className="fg-bb96088676" data-node-id="271:357">
          <p className="fg-32bd4c7660" dir="auto">
            این محصول منتشرشده تغییرات مهم دارد. با تأیید، نسخه تغییرکرده برای بررسی نگارین ارسال می‌شود.
          </p>
        </div>
        <div className="fg-a1d740e313" data-node-id="271:358" data-name="Changed Product Summary">
          <div className="fg-fdcf06d925" data-node-id="271:359">
            <p className="fg-32bd4c7660" dir="auto">
              محصول منتشرشده
            </p>
          </div>
          <div className="fg-5f86120466" data-node-id="271:360">
            <p className="fg-32bd4c7660" dir="auto">
              بشقاب میناکاری طرح شاه‌عباسی
            </p>
          </div>
          <div className="fg-5204bf7aab" data-node-id="271:361" data-name="Change Type Badge">
            <div className="fg-3b1bd9118e" data-node-id="271:362">
              <p className="fg-32bd4c7660" dir="auto">
                تغییر مهم
              </p>
            </div>
          </div>
        </div>
        <div className="fg-e868432c2e" data-node-id="271:363" data-name="Review Impact">
          <div className="fg-1e5a813679" data-node-id="271:364">
            <p className="fg-32bd4c7660" dir="auto">
              چه اتفاقی می‌افتد؟
            </p>
          </div>
          <div className="fg-20aa93a6a2" data-node-id="271:365">
            <p className="fg-32bd4c7660" dir="auto">
              • تغییرات جدید تا پایان بررسی در صفحه عمومی اعمال نمی‌شوند.
            </p>
          </div>
          <div className="fg-734e62918e" data-node-id="271:366">
            <p className="fg-32bd4c7660" dir="auto">
              • تغییرات عملیاتی ساده مثل موجودی می‌توانند جداگانه ذخیره شوند.
            </p>
          </div>
          <div className="fg-04450f64ad" data-node-id="271:367">
            <p className="fg-32bd4c7660" dir="auto">
              • ارسال تغییرات برای بررسی، سطح رشد یا تیک آبی هنرمند را تغییر نمی‌دهد.
            </p>
          </div>
        </div>
        <DesignAction className="fg-7c4521aca1" data-node-id="271:368" data-name="Button / Cancel" destination="product-editor-edit-published" label="انصراف">
          <div className="fg-7e0cafb2c5" data-node-id="271:369">
            <p className="fg-32bd4c7660" dir="auto">
              انصراف
            </p>
          </div>
        </DesignAction>
        <DesignAction className="fg-540a4b2d17" data-node-id="271:370" data-name="Button / Submit Review" destination="future-artist-product-changes-review-status-published-product-flow" label="ارسال تغییرات برای بررسی">
          <div className="fg-12991f5736" data-node-id="271:371">
            <p className="fg-32bd4c7660" dir="auto">
              ارسال تغییرات برای بررسی
            </p>
          </div>
        </DesignAction>
        <div className="fg-3bd8ad0cda" data-node-id="271:372">
          <p className="fg-32bd4c7660" dir="auto">
            بعد از ارسال، وضعیت بررسی تغییرات از بخش محصولات قابل پیگیری است.
          </p>
        </div>
      </DesignDialog>
    </div>
  );
}
