// Figma 1001:258 — Service Partner / Submit Deliverable — Desktop
import { DesignUpload, DesignField, DesignAction } from "../../artist/design-controls";
import { ServicePartnerSidebar } from "../service-partner-sidebar";

export default function ServicePartnerSubmitDeliverableDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="1001:258" data-name="Service Partner / Submit Deliverable — Desktop">
      <div className="fg-adb70edf68" data-node-id="1001:259" data-name="Main Content">
        <div className="fg-2fcaf9ae9b" data-node-id="1001:260" data-name="Page Header">
          <p className="fg-023749cc88" dir="auto" data-node-id="1001:261">
            ثبت خروجی خدمت
          </p>
          <p className="fg-49d1e9f62c" dir="auto" data-node-id="1001:262">
            خروجی درخواست SRV-2048 را برای بررسی نگارین ارسال کن.
          </p>
        </div>
        <div className="fg-33162ce9f0" data-node-id="1001:287" data-name="Upload Area">
          <p className="fg-096bc5b425" dir="auto" data-node-id="1001:288">
            فایل‌ها و خروجی
          </p>
          <p className="fg-0aa0589473" dir="auto" data-node-id="1001:289">
            فایل یا تصویر خروجی مرتبط با همین خدمت را اضافه کن. اطلاعات شخصی یا فایل‌های نامرتبط هنرمند نباید بارگذاری شود.
          </p>
          <DesignUpload className="fg-1cc6ce199b" data-node-id="1001:290" data-name="Button / افزودن فایل" label="فایل خروجی خدمت" preserveLayout>
            <p className="fg-aee9e8e6f6" dir="auto" data-node-id="1001:291">
              افزودن فایل
            </p>
          </DesignUpload>
        </div>
        <div className="fg-5b2ae1dcf3" data-node-id="1001:292" data-name="Delivery Note">
          <p className="fg-362e0773d0" dir="auto" data-node-id="1001:293">
            یادداشت تحویل
          </p>
          <DesignField className="fg-d63d49332c" dir="auto" data-node-id="1001:294" label="یادداشت تحویل" placeholder="شرح کوتاه نتیجه اجرا و نکته‌ای که نگارین برای بررسی خروجی باید بداند.">
            شرح کوتاه نتیجه اجرا و نکته‌ای که نگارین برای بررسی خروجی باید بداند.
          </DesignField>
        </div>
        <div className="fg-174720c08d" data-node-id="1001:295" data-name="Actions">
          <DesignAction className="fg-1cc6ce199b" data-node-id="1001:296" data-name="Button / ذخیره پیش‌نویس" label="ذخیره پیش‌نویس">
            <p className="fg-aee9e8e6f6" dir="auto" data-node-id="1001:297">
              ذخیره پیش‌نویس
            </p>
          </DesignAction>
          <DesignAction className="fg-c92aae01e4" data-node-id="1001:298" data-name="Button / ارسال خروجی به نگارین" label="ارسال خروجی به نگارین">
            <p className="fg-31b19a5ba7" dir="auto" data-node-id="1001:299">
              ارسال خروجی به نگارین
            </p>
          </DesignAction>
        </div>
      </div>
      <ServicePartnerSidebar className="fg-1cadfd0310" data-node-id="1001:263" data-name="Sidebar">
        <div className="fg-24e47e687d" data-node-id="1001:264" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="1001:265">
            خانه نگارین
          </p>
          <div className="fg-842ae29a35" data-node-id="1001:266" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-71eecc63f8" src="/service-partner-assets/negarin-logo.png" />
          </div>
        </div>
        <div className="fg-4c64003eb7" data-node-id="1001:267" data-name="Role Tag">
          <p className="fg-fd87dcd811" dir="auto" data-node-id="1001:268">
            همکار خدمات
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:269">
            فقط درخواست‌های تخصیص‌یافته
          </p>
        </div>
        <div className="fg-37d4680dcb" data-node-id="1001:270" data-name="Navigation">
          <DesignAction className="fg-a0fb7113d8" data-node-id="1001:271" data-name="Nav / پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:272">
              پیشخوان
            </p>
          </DesignAction>
          <DesignAction className="fg-20b7c84d7d" data-node-id="1001:273" data-name="Nav / درخواست‌های خدمات" label="درخواست‌های خدمات" destination="assigned-requests">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:274">
              درخواست‌های خدمات
            </p>
          </DesignAction>
          <DesignAction className="fg-f1f51e5cb3" data-node-id="1001:275" data-name="Nav / برنامه و اجرا" label="برنامه و اجرا" destination="schedule-and-execution">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:276">
              برنامه و اجرا
            </p>
          </DesignAction>
          <DesignAction className="fg-03263bab4d" data-node-id="1001:277" data-name="Nav / تحویل‌ها / خروجی‌ها" label="تحویل‌ها / خروجی‌ها" destination="submit-deliverable">
            <p className="fg-356a992da1" dir="auto" data-node-id="1001:278">
              تحویل‌ها / خروجی‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-73b8701e5a" data-node-id="1001:279" data-name="Nav / سوابق" label="سوابق" destination="history">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:280">
              سوابق
            </p>
          </DesignAction>
          <DesignAction className="fg-3b661fe153" data-node-id="1001:281" data-name="Nav / حساب" label="حساب" destination="account">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:282">
              حساب
            </p>
          </DesignAction>
        </div>
        <div className="fg-f6f80a477f" data-node-id="1001:283" data-name="Spacer" />
        <div className="fg-f6a3ad7b8b" data-node-id="1001:284" data-name="Account Summary">
          <p className="fg-7ec414a4a7" dir="auto" data-node-id="1001:285">
            استودیو هنر و بسته‌بندی سپهر
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:286">
            کاربر اجرایی سازمان
          </p>
        </div>
      </ServicePartnerSidebar>
    </div>
  );
}
