// Figma 241:10 — Artist / Product Editor — Desktop
import { DesignAction, DesignField, DesignUpload } from "../design-controls";
import { ArtistSidebar } from "../artist-sidebar";

export default function ArtistProductEditorDesktop() {
  return (
    <div className="fg-3984f97129" data-node-id="241:10" data-name="Artist / Product Editor — Desktop">
      <div className="fg-893efa80c6" data-node-id="241:11" data-name="Artist / Main">
        <div className="fg-e1f4917983" data-node-id="241:220" data-name="Product Editor / Header">
          <div className="fg-6109b5a331" data-node-id="241:221">
            <p className="fg-32bd4c7660" dir="auto">
              افزودن محصول
            </p>
          </div>
          <div className="fg-4998427b64" data-node-id="241:222">
            <p className="fg-32bd4c7660" dir="auto">
              عنوان، توضیحات و مشخصات محصول را ثبت کن؛ تصاویر را جداگانه پیوست کن.
            </p>
          </div>
          <DesignAction className="fg-53c77ce51e" data-node-id="241:223" data-name="Button / بازگشت به محصولات" destination="products" label="بازگشت به محصولات">
            <div className="fg-adf48c0cef" data-node-id="241:224">
              <p className="fg-32bd4c7660" dir="auto">
                بازگشت به محصولات
              </p>
            </div>
          </DesignAction>
        </div>
        <div className="fg-feb91caf12" data-node-id="241:225" data-name="Product Editor / Draft Notice">
          <div className="fg-8cfc544760" data-node-id="241:226" data-name="Status / Draft">
            <div className="fg-e85de403c5" data-node-id="241:227">
              <p className="fg-32bd4c7660" dir="auto">
                پیش‌نویس قابل ذخیره
              </p>
            </div>
          </div>
          <div className="fg-13133c4010" data-node-id="241:228">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات محصول را برای بازبینی محتوا آماده کن.
            </p>
          </div>
          <div className="fg-e11017464c" data-node-id="241:229">
            <p className="fg-32bd4c7660" dir="auto">
              تأیید محتوا به‌تنهایی محصول را در فروشگاه عمومی منتشر نمی‌کند.
            </p>
          </div>
        </div>
        <div className="fg-ad76746890" data-node-id="241:230" data-name="Product Editor / Images">
          <div className="fg-a07b232dd0" data-node-id="241:231">
            <p className="fg-32bd4c7660" dir="auto">
              تصاویر محصول
            </p>
          </div>
          <div className="fg-45d514398d" data-node-id="241:232">
            <p className="fg-32bd4c7660" dir="auto">
              چند تصویر از محصول را پیوست کن.
            </p>
          </div>
          <DesignUpload className="fg-ca1b95c430" data-node-id="241:233" data-name="Image Upload / Attachment" label="Image Upload / Attachment">
            <div className="fg-33fa59a8d8" data-node-id="241:234">
              <p className="fg-32bd4c7660">＋</p>
            </div>
            <div className="fg-71596953bb" data-node-id="241:235">
              <p className="fg-32bd4c7660" dir="auto">
                افزودن تصویر
              </p>
            </div>
            <div className="fg-87d5028233" data-node-id="241:236">
              <p className="fg-32bd4c7660" dir="auto">
                JPG، PNG یا WebP • حداکثر ۲۰ مگابایت برای هر تصویر
              </p>
            </div>
          </DesignUpload>
          <div className="fg-315a58b91e" data-node-id="241:237" data-name="Image Upload / Thumb 1">
            <div className="fg-1828b58caf" data-node-id="241:238">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
          <div className="fg-4d78409505" data-node-id="241:239" data-name="Image Upload / Thumb 2">
            <div className="fg-1828b58caf" data-node-id="241:240">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
          <div className="fg-578d9e2055" data-node-id="241:241" data-name="Image Upload / Thumb 3">
            <div className="fg-1828b58caf" data-node-id="241:242">
              <p className="fg-32bd4c7660">＋</p>
            </div>
          </div>
        </div>
        <div className="fg-ed1983bc52" data-node-id="241:243" data-name="Product Editor / Basic Info">
          <div className="fg-af9c3d3e83" data-node-id="241:244">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات محصول
            </p>
          </div>
          <div className="fg-6ad1eb64c6" data-node-id="241:245">
            <p className="fg-32bd4c7660" dir="auto">
              عنوان، ابعاد و جنس محصول را وارد کن.
            </p>
          </div>
          <div className="fg-2f52f2626c" data-node-id="241:246">
            <p className="fg-32bd4c7660" dir="auto">
              نام محصول
            </p>
          </div>
          <DesignField className="fg-abc35a4e75" data-node-id="241:247" data-name="نام محصول / Field" label="نام محصول" placeholder="مثلاً کیف سوزندوزی بلوچ">
            <div className="fg-c11b089520" data-node-id="241:248">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً کیف سوزندوزی بلوچ
              </p>
            </div>
          </DesignField>
          <div className="fg-c545f5b1d9" data-node-id="241:249">
            <p className="fg-32bd4c7660" dir="auto">
              ابعاد
            </p>
          </div>
          <DesignField className="fg-429daa008c" data-node-id="241:250" data-name="دسته هنری / Field" label="ابعاد" placeholder="مثلاً ارتفاع ۲۵ سانتی‌متر، قطر ۱۰ سانتی‌متر">
            <div className="fg-a9fbb28550" data-node-id="241:251">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً ارتفاع ۲۵ سانتی‌متر، قطر ۱۰ سانتی‌متر
              </p>
            </div>
          </DesignField>
          <div className="fg-5a83ae8deb" data-node-id="241:252">
            <p className="fg-32bd4c7660" dir="auto">
              جنس مواد
            </p>
          </div>
          <DesignField className="fg-c51552de49" data-node-id="241:253" data-name="عنوان کوتاه / ویژگی اصلی / Field" label="جنس مواد" placeholder="مثلاً گل رس و لعاب">
            <div className="fg-c07eded23f" data-node-id="241:254">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً گل رس و لعاب
              </p>
            </div>
          </DesignField>
          <div className="fg-659f9fab27" data-node-id="241:255">
            <p className="fg-32bd4c7660" dir="auto">
              توضیحات محصول
            </p>
          </div>
          <DesignField className="fg-395e07d9b2" data-node-id="241:256" data-name="توضیحات محصول / Field" label="توضیحات محصول" placeholder="داستان، تکنیک ساخت و ویژگی‌های محصول را کوتاه و روشن بنویس.">
            <div className="fg-9d63bf49b3" data-node-id="241:257">
              <p className="fg-32bd4c7660" dir="auto">
                داستان، تکنیک ساخت و ویژگی‌های محصول را کوتاه و روشن بنویس.
              </p>
            </div>
          </DesignField>
        </div>
        <div className="fg-573bd459f5" data-node-id="241:258" data-name="Product Editor / Sales Info">
          <div className="fg-af9c3d3e83" data-node-id="241:259">
            <p className="fg-32bd4c7660" dir="auto">
              قیمت و مشخصات تکمیلی
            </p>
          </div>
          <div className="fg-6ad1eb64c6" data-node-id="241:260">
            <p className="fg-32bd4c7660" dir="auto">
              قیمت را خودت تعیین می‌کنی؛ وزن، رنگ و تکنیک را متنی بنویس.
            </p>
          </div>
          <div className="fg-6c960a82b9" data-node-id="241:261">
            <p className="fg-32bd4c7660" dir="auto">
              قیمت فروش
            </p>
          </div>
          <DesignField className="fg-d2badb12aa" data-node-id="241:262" data-name="قیمت فروش / Field" label="قیمت فروش" placeholder="تومان">
            <div className="fg-a9fbb28550" data-node-id="241:263">
              <p className="fg-32bd4c7660" dir="auto">
                تومان
              </p>
            </div>
          </DesignField>
          <div className="fg-d9c9f0cd60" data-node-id="241:264">
            <p className="fg-32bd4c7660" dir="auto">
              وزن
            </p>
          </div>
          <DesignField className="fg-c13152b7fa" data-node-id="241:265" data-name="موجودی قابل فروش / Field" label="وزن" placeholder="مثلاً ۸۵۰ گرم">
            <div className="fg-c07eded23f" data-node-id="241:266">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً ۸۵۰ گرم
              </p>
            </div>
          </DesignField>
          <div className="fg-c545f5b1d9" data-node-id="241:267">
            <p className="fg-32bd4c7660" dir="auto">
              رنگ
            </p>
          </div>
          <DesignField className="fg-429daa008c" data-node-id="241:268" data-name="زمان آماده‌سازی / Field" label="رنگ" placeholder="مثلاً فیروزه‌ای، سفید">
            <div className="fg-a9fbb28550" data-node-id="241:269">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً فیروزه‌ای، سفید
              </p>
            </div>
          </DesignField>
          <div className="fg-5a83ae8deb" data-node-id="241:270">
            <p className="fg-32bd4c7660" dir="auto">
              تکنیک ساخت
            </p>
          </div>
          <DesignField className="fg-c51552de49" data-node-id="241:271" data-name="کد محصول (اختیاری) / Field" label="تکنیک ساخت" placeholder="مثلاً چرخ‌کاری دستی">
            <div className="fg-c07eded23f" data-node-id="241:272">
              <p className="fg-32bd4c7660" dir="auto">
                مثلاً چرخ‌کاری دستی
              </p>
            </div>
          </DesignField>
        </div>
        <div className="fg-5ab2049706" data-node-id="241:273" data-name="Product Editor / Publication">
          <div className="fg-a07b232dd0" data-node-id="241:274">
            <p className="fg-32bd4c7660" dir="auto">
              گردش بازبینی
            </p>
          </div>
          <div className="fg-23543805f8" data-node-id="241:275" data-name="Draft Status">
            <div className="fg-4a9c6114fc" data-node-id="241:276">
              <p className="fg-32bd4c7660" dir="auto">
                پیش‌نویس
              </p>
            </div>
          </div>
          <div className="fg-a8a40b125c" data-node-id="241:277">
            <p className="fg-32bd4c7660" dir="auto">
              پیش‌نویس → ارسال برای بازبینی → ثبت نتیجه
            </p>
          </div>
          <div className="fg-5d1337458c" data-node-id="241:278" data-name="Lifecycle Hint">
            <div className="fg-94520e28c3" data-node-id="241:279">
              <p className="fg-32bd4c7660" dir="auto">
                تأیید محتوا به‌تنهایی انتشار عمومی را فعال نمی‌کند.
              </p>
            </div>
          </div>
          <div className="fg-e7e11b88c1" data-node-id="241:280">
            <p className="fg-32bd4c7660" dir="auto">
              قیمت‌گذاری در اختیار هنرمند است و بخشی از بازبینی محتوا نیست.
            </p>
          </div>
        </div>
        <div className="fg-4627289ab8" data-node-id="241:300" data-name="Product Editor / Actions">
          <div className="fg-7d29952c7b" data-node-id="241:301">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات لازم را تکمیل کن؛ نتیجه بازبینی انتشار عمومی را انجام نمی‌دهد.
            </p>
          </div>
          <DesignAction className="fg-0bb8ed929a" data-node-id="241:302" data-name="Button / ذخیره پیش‌نویس" destination="products" label="ذخیره پیش‌نویس">
            <div className="fg-adf48c0cef" data-node-id="241:303">
              <p className="fg-32bd4c7660" dir="auto">
                ذخیره پیش‌نویس
              </p>
            </div>
          </DesignAction>
          <DesignAction className="fg-a6b0162819" data-node-id="241:304" data-name="Button / ارسال برای بررسی" destination="product-review-status" label="ارسال برای بررسی">
            <div className="fg-3199be5902" data-node-id="241:305">
              <p className="fg-32bd4c7660" dir="auto">
                ارسال برای بررسی
              </p>
            </div>
          </DesignAction>
        </div>
      </div>
      <ArtistSidebar variant="sidebar-329e1ed69a" />
    </div>
  );
}