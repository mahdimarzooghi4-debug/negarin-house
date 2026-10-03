// Figma 334:12 — Artist / Sales Settings — Desktop
import { DesignAction, DesignField, DesignChoice } from "../design-controls";
import { ArtistSidebar } from "../artist-sidebar";

export default function ArtistSalesSettingsDesktop() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="334:12" data-name="Artist / Sales Settings — Desktop">
      <div className="fg-24990da9c2" data-node-id="334:13" data-name="Artist / Main">
        <div className="fg-e1f4917983" data-node-id="334:179" data-name="Sales Settings / Header">
          <div className="fg-2e02f269f2" data-node-id="334:180">
            <p className="fg-32bd4c7660" dir="auto">
              تنظیمات فروش
            </p>
          </div>
          <div className="fg-dd4f1eba89" data-node-id="334:181">
            <p className="fg-32bd4c7660" dir="auto">
              مدیریت نحوه پذیرش سفارش، ظرفیت و زمان آماده‌سازی
            </p>
          </div>
          <DesignAction className="fg-d09e3fa179" data-node-id="334:182" data-name="Button / Back" destination="store" label="بازگشت به فروشگاه من">
            <div className="fg-bee8176a42" data-node-id="334:183">
              <p className="fg-32bd4c7660" dir="auto">
                بازگشت به فروشگاه من
              </p>
            </div>
          </DesignAction>
        </div>
        <div className="fg-2f078c51c0" data-node-id="334:184" data-name="Sales Settings / Hero">
          <div className="fg-296e02d2d7" data-node-id="334:185" data-name="Status">
            <div className="fg-c284686102" data-node-id="334:186">
              <p className="fg-32bd4c7660" dir="auto">
                تنظیمات فروشگاه
              </p>
            </div>
          </div>
          <div className="fg-c949535be9" data-node-id="334:187">
            <p className="fg-32bd4c7660" dir="auto">
              نحوه دریافت و آماده‌سازی سفارش‌ها را مدیریت کن
            </p>
          </div>
          <div className="fg-9c0040773b" data-node-id="334:188">
            <p className="fg-32bd4c7660" dir="auto">
              این تنظیمات به تو کمک می‌کند ظرفیت واقعی تولید و نوع سفارش‌هایی را که می‌پذیری کنترل کنی. هیچ مقدار عددی نمونه‌ای از طرف نگارین برایت تعیین نشده است.
            </p>
          </div>
        </div>
        <div className="fg-4f13b938a3" data-node-id="334:189" data-name="Sales Settings / Custom Orders">
          <div className="fg-2b9efe91f6" data-node-id="334:190">
            <p className="fg-32bd4c7660" dir="auto">
              سفارش سفارشی
            </p>
          </div>
          <div className="fg-0ab7fb7b88" data-node-id="334:191">
            <p className="fg-32bd4c7660" dir="auto">
              مشخص کن آیا مشتری بتواند برای ساخت محصول سفارشی درخواست ثبت کند یا نه.
            </p>
          </div>
          <DesignChoice className="fg-9cc15abc6c" data-node-id="334:192" data-name="Custom Order Toggle" label="Custom Order Toggle" group="Sales Settings / Custom Orders" initial={false} multiple>
            <img alt="" className="fg-8faf267d30" src="/artist-assets/157c875baa67fdf.svg" />
          </DesignChoice>
          <div className="fg-808107aaba" data-node-id="334:194" data-name="Current State">
            <div className="fg-241cd2ac4c" data-node-id="334:195">
              <p className="fg-32bd4c7660" dir="auto">
                روشن
              </p>
            </div>
          </div>
          <div className="fg-de57cfc406" data-node-id="334:196">
            <p className="fg-32bd4c7660" dir="auto">
              خاموش‌کردن این گزینه فقط دریافت درخواست‌های سفارشی جدید را متوقف می‌کند.
            </p>
          </div>
        </div>
        <div className="fg-8802c32bcc" data-node-id="334:197" data-name="Sales Settings / Capacity">
          <div className="fg-7c3c1e1226" data-node-id="334:198">
            <p className="fg-32bd4c7660" dir="auto">
              ظرفیت پذیرش سفارش
            </p>
          </div>
          <div className="fg-56a6328413" data-node-id="334:199">
            <p className="fg-32bd4c7660" dir="auto">
              ظرفیت را بر اساس توان واقعی تولیدت مدیریت کن تا سفارش بیش از توان دریافت نکنی.
            </p>
          </div>
          <div className="fg-803a6a7515" data-node-id="334:200" data-name="State">
            <div className="fg-d43a8f8413" data-node-id="334:201">
              <p className="fg-32bd4c7660" dir="auto">
                قابل مدیریت
              </p>
            </div>
          </div>
          <div className="fg-808b7d2549" data-node-id="334:202">
            <p className="fg-32bd4c7660" dir="auto">
              تنظیم ظرفیت
            </p>
          </div>
          <DesignField className="fg-e19cc884eb" data-node-id="334:203" data-name="Capacity Control / Field" label="تنظیم ظرفیت" placeholder="مقدار ظرفیت را مشخص کن">
            <div className="fg-2213eace27" data-node-id="334:204">
              <p className="fg-32bd4c7660" dir="auto">
                مقدار ظرفیت را مشخص کن
              </p>
            </div>
          </DesignField>
          <div className="fg-daff469fc3" data-node-id="334:205">
            <p className="fg-32bd4c7660" dir="auto">
              هیچ عدد پیش‌فرضی در این نمونه تعیین نشده است.
            </p>
          </div>
          <DesignAction className="fg-7e2c213669" data-node-id="334:206" data-name="Button / Capacity" label="مدیریت ظرفیت">
            <div className="fg-2fe0fd6069" data-node-id="334:207">
              <p className="fg-32bd4c7660" dir="auto">
                مدیریت ظرفیت
              </p>
            </div>
          </DesignAction>
        </div>
        <div className="fg-ad2e95a2e7" data-node-id="334:208" data-name="Sales Settings / Preparation Time">
          <div className="fg-7c3c1e1226" data-node-id="334:209">
            <p className="fg-32bd4c7660" dir="auto">
              زمان آماده‌سازی
            </p>
          </div>
          <div className="fg-8c376bb6ce" data-node-id="334:210">
            <p className="fg-32bd4c7660" dir="auto">
              زمان لازم برای آماده‌سازی سفارش پیش از تحویل به همکار ارسال را متناسب با محصول و توان تولید تنظیم کن.
            </p>
          </div>
          <div className="fg-2bd7895fae" data-node-id="334:211" data-name="State">
            <div className="fg-d43a8f8413" data-node-id="334:212">
              <p className="fg-32bd4c7660" dir="auto">
                تنظیم‌شده
              </p>
            </div>
          </div>
          <div className="fg-808b7d2549" data-node-id="334:213">
            <p className="fg-32bd4c7660" dir="auto">
              زمان آماده‌سازی
            </p>
          </div>
          <DesignField className="fg-e19cc884eb" data-node-id="334:214" data-name="Preparation Time / Field" label="زمان آماده‌سازی" placeholder="زمان موردنظر را انتخاب کن">
            <div className="fg-2213eace27" data-node-id="334:215">
              <p className="fg-32bd4c7660" dir="auto">
                زمان موردنظر را انتخاب کن
              </p>
            </div>
          </DesignField>
          <div className="fg-daff469fc3" data-node-id="334:216">
            <p className="fg-32bd4c7660" dir="auto">
              در این ماکاپ زمان یا SLA ساختگی درج نشده است.
            </p>
          </div>
          <DesignAction className="fg-7e2c213669" data-node-id="334:217" data-name="Button / Prep" label="تنظیم زمان">
            <div className="fg-2fe0fd6069" data-node-id="334:218">
              <p className="fg-32bd4c7660" dir="auto">
                تنظیم زمان
              </p>
            </div>
          </DesignAction>
        </div>
        <div className="fg-629e556b50" data-node-id="334:219" data-name="Sales Settings / Impact Note">
          <div className="fg-b26c50828c" data-node-id="334:220">
            <p className="fg-32bd4c7660" dir="auto">
              این تنظیمات چه چیزی را تغییر می‌دهند؟
            </p>
          </div>
          <div className="fg-c1b9602069" data-node-id="334:221" data-name="Impact / سفارش سفارشی">
            <div className="fg-519c25ac1a" data-node-id="334:222">
              <p className="fg-32bd4c7660" dir="auto">
                سفارش سفارشی
              </p>
            </div>
            <div className="fg-b05f1d582b" data-node-id="334:223">
              <p className="fg-32bd4c7660" dir="auto">
                امکان ثبت درخواست ساخت سفارشی توسط مشتری
              </p>
            </div>
          </div>
          <div className="fg-9295855100" data-node-id="334:224" data-name="Impact / ظرفیت سفارش">
            <div className="fg-519c25ac1a" data-node-id="334:225">
              <p className="fg-32bd4c7660" dir="auto">
                ظرفیت سفارش
              </p>
            </div>
            <div className="fg-b05f1d582b" data-node-id="334:226">
              <p className="fg-32bd4c7660" dir="auto">
                میزان سفارشی که می‌خواهی بپذیری
              </p>
            </div>
          </div>
          <div className="fg-5157553117" data-node-id="334:227" data-name="Impact / زمان آماده‌سازی">
            <div className="fg-519c25ac1a" data-node-id="334:228">
              <p className="fg-32bd4c7660" dir="auto">
                زمان آماده‌سازی
              </p>
            </div>
            <div className="fg-b05f1d582b" data-node-id="334:229">
              <p className="fg-32bd4c7660" dir="auto">
                مدت آماده‌سازی پیش از ارسال
              </p>
            </div>
          </div>
        </div>
        <div className="fg-d758ebf09a" data-node-id="334:230" data-name="Sales Settings / Independence">
          <div className="fg-ca7b55d93b" data-node-id="334:231">
            <p className="fg-32bd4c7660" dir="auto">
              مستقل از عضویت، سطح رشد و تیک تأیید
            </p>
          </div>
          <div className="fg-a31fb5601a" data-node-id="334:232">
            <p className="fg-32bd4c7660" dir="auto">
              تغییر این تنظیمات به‌خودی‌خود سطح رشد، وضعیت عضویت یا تأیید حرفه‌ای را تغییر نمی‌دهد.
            </p>
          </div>
        </div>
        <div className="fg-afe2e0c555" data-node-id="334:233" data-name="Sales Settings / Actions">
          <DesignAction className="fg-41624f3ad2" data-node-id="334:234" data-name="Button / Cancel" destination="store" label="انصراف">
            <div className="fg-737c7f2029" data-node-id="334:235">
              <p className="fg-32bd4c7660" dir="auto">
                انصراف
              </p>
            </div>
          </DesignAction>
          <DesignAction className="fg-6d75a09fa8" data-node-id="334:236" data-name="Button / Save" destination="store" label="ذخیره تنظیمات فروش">
            <div className="fg-8194038fca" data-node-id="334:237">
              <p className="fg-32bd4c7660" dir="auto">
                ذخیره تنظیمات فروش
              </p>
            </div>
          </DesignAction>
        </div>
      </div>
      <ArtistSidebar variant="sidebar-f5fc1d697b" />
    </div>
  );
}