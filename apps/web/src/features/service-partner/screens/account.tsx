// Figma 1001:358 — Service Partner / Account — Desktop
import { DesignAction } from "../../artist/design-controls";
import { ServicePartnerSidebar } from "../service-partner-sidebar";

export default function ServicePartnerAccountDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="1001:358" data-name="Service Partner / Account — Desktop">
      <div className="fg-adb70edf68" data-node-id="1001:359" data-name="Main Content">
        <div className="fg-2fcaf9ae9b" data-node-id="1001:360" data-name="Page Header">
          <p className="fg-023749cc88" dir="auto" data-node-id="1001:361">
            حساب سازمان
          </p>
          <p className="fg-49d1e9f62c" dir="auto" data-node-id="1001:362">
            اطلاعات سازمان، کاربران مجاز، اعلان‌ها و امنیت حساب را مدیریت کن.
          </p>
        </div>
        <div className="fg-57048b9f4a" data-node-id="1001:387" data-name="Account Grid">
          <div className="fg-dcc2cb9291" data-node-id="1001:388" data-name="Account Card">
            <p className="fg-4ab88bcc3c" dir="auto" data-node-id="1001:389">
              اطلاعات سازمان
            </p>
            <p className="fg-41048ee25a" dir="auto" data-node-id="1001:390">
              نام سازمان، شناسه همکاری و اطلاعات تماس
            </p>
            <DesignAction className="fg-1cc5c2f442" dir="auto" data-node-id="1001:391" label="مدیریت">
              مدیریت
            </DesignAction>
          </div>
          <div className="fg-dcc2cb9291" data-node-id="1001:392" data-name="Account Card">
            <p className="fg-4ab88bcc3c" dir="auto" data-node-id="1001:393">
              کاربران سازمان
            </p>
            <p className="fg-41048ee25a" dir="auto" data-node-id="1001:394">
              کاربران مجاز همین سازمان و سطح دسترسی محدود
            </p>
            <DesignAction className="fg-1cc5c2f442" dir="auto" data-node-id="1001:395" label="مدیریت">
              مدیریت
            </DesignAction>
          </div>
          <div className="fg-dcc2cb9291" data-node-id="1001:396" data-name="Account Card">
            <p className="fg-4ab88bcc3c" dir="auto" data-node-id="1001:397">
              ترجیحات اعلان
            </p>
            <p className="fg-41048ee25a" dir="auto" data-node-id="1001:398">
              درخواست جدید، تغییر وضعیت، موعد اجرا و بررسی خروجی
            </p>
            <DesignAction className="fg-1cc5c2f442" dir="auto" data-node-id="1001:399" label="مدیریت">
              مدیریت
            </DesignAction>
          </div>
        </div>
        <div className="fg-ef88f411f4" data-node-id="1001:400" data-name="Security">
          <p className="fg-4ab88bcc3c" dir="auto" data-node-id="1001:401">
            امنیت
          </p>
          <p className="fg-1ca1292f6a" dir="auto" data-node-id="1001:402">
            ورود، نشست‌های فعال و امنیت حساب طبق معماری احراز هویت مشترک نگارین مدیریت می‌شود. دسترسی Admin از این پرتال قابل ایجاد نیست.
          </p>
        </div>
        <div className="fg-8fa07def0a" data-node-id="1001:403" data-name="Logout">
          <DesignAction className="fg-1cc6ce199b" data-node-id="1001:404" data-name="Button / خروج از حساب" label="خروج از حساب">
            <p className="fg-aee9e8e6f6" dir="auto" data-node-id="1001:405">
              خروج از حساب
            </p>
          </DesignAction>
        </div>
      </div>
      <ServicePartnerSidebar className="fg-1cadfd0310" data-node-id="1001:363" data-name="Sidebar">
        <div className="fg-24e47e687d" data-node-id="1001:364" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="1001:365">
            خانه نگارین
          </p>
          <div className="fg-842ae29a35" data-node-id="1001:366" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-71eecc63f8" src="/service-partner-assets/negarin-logo.png" />
          </div>
        </div>
        <div className="fg-4c64003eb7" data-node-id="1001:367" data-name="Role Tag">
          <p className="fg-fd87dcd811" dir="auto" data-node-id="1001:368">
            همکار خدمات
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:369">
            فقط درخواست‌های تخصیص‌یافته
          </p>
        </div>
        <div className="fg-37d4680dcb" data-node-id="1001:370" data-name="Navigation">
          <DesignAction className="fg-a0fb7113d8" data-node-id="1001:371" data-name="Nav / پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:372">
              پیشخوان
            </p>
          </DesignAction>
          <DesignAction className="fg-20b7c84d7d" data-node-id="1001:373" data-name="Nav / درخواست‌های خدمات" label="درخواست‌های خدمات" destination="assigned-requests">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:374">
              درخواست‌های خدمات
            </p>
          </DesignAction>
          <DesignAction className="fg-f1f51e5cb3" data-node-id="1001:375" data-name="Nav / برنامه و اجرا" label="برنامه و اجرا" destination="schedule-and-execution">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:376">
              برنامه و اجرا
            </p>
          </DesignAction>
          <DesignAction className="fg-4f8b47c40f" data-node-id="1001:377" data-name="Nav / تحویل‌ها / خروجی‌ها" label="تحویل‌ها / خروجی‌ها" destination="submit-deliverable">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:378">
              تحویل‌ها / خروجی‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-73b8701e5a" data-node-id="1001:379" data-name="Nav / سوابق" label="سوابق" destination="history">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:380">
              سوابق
            </p>
          </DesignAction>
          <DesignAction className="fg-a5496e51db" data-node-id="1001:381" data-name="Nav / حساب" label="حساب" destination="account">
            <p className="fg-356a992da1" dir="auto" data-node-id="1001:382">
              حساب
            </p>
          </DesignAction>
        </div>
        <div className="fg-f6f80a477f" data-node-id="1001:383" data-name="Spacer" />
        <div className="fg-f6a3ad7b8b" data-node-id="1001:384" data-name="Account Summary">
          <p className="fg-7ec414a4a7" dir="auto" data-node-id="1001:385">
            استودیو هنر و بسته‌بندی سپهر
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:386">
            کاربر اجرایی سازمان
          </p>
        </div>
      </ServicePartnerSidebar>
    </div>
  );
}
