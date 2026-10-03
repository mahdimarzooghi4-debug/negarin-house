// Figma 1001:206 — Service Partner / Schedule & Execution — Desktop
import { DesignAction } from "../../artist/design-controls";
import { ServicePartnerSidebar } from "../service-partner-sidebar";

export default function ServicePartnerScheduleExecutionDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="1001:206" data-name="Service Partner / Schedule & Execution — Desktop">
      <div className="fg-928b3ee152" data-node-id="1001:207" data-name="Main Content">
        <div className="fg-2fcaf9ae9b" data-node-id="1001:208" data-name="Page Header">
          <p className="fg-023749cc88" dir="auto" data-node-id="1001:209">
            برنامه و اجرای خدمت
          </p>
          <p className="fg-49d1e9f62c" dir="auto" data-node-id="1001:210">
            برنامه اجرای درخواست‌های پذیرفته‌شده و وضعیت پیشرفت را ثبت کن.
          </p>
        </div>
        <div className="fg-555590dea7" data-node-id="1001:235" data-name="Execution Card">
          <p className="fg-096bc5b425" dir="auto" data-node-id="1001:236">
            SRV-2048 · عکاسی محصول
          </p>
          <div className="fg-bf342ddfb8" data-node-id="1001:237" data-name="Status / در حال اجرا">
            <p className="fg-a3a09b1bc5" dir="auto" data-node-id="1001:238">
              در حال اجرا
            </p>
          </div>
          <div className="fg-8ba9b67e15" data-node-id="1001:239" data-name="Fields">
            <div className="fg-2bd2dc0e3b" data-node-id="1001:240" data-name="Field">
              <p className="fg-3d41c327c2" dir="auto" data-node-id="1001:241">
                تاریخ اجرا
              </p>
              <p className="fg-0a9c72324d" dir="auto" data-node-id="1001:242">
                ۱۴ مهر
              </p>
            </div>
            <div className="fg-2bd2dc0e3b" data-node-id="1001:243" data-name="Field">
              <p className="fg-3d41c327c2" dir="auto" data-node-id="1001:244">
                بازه زمانی
              </p>
              <p className="fg-0a9c72324d" dir="auto" data-node-id="1001:245">
                ۱۰:۰۰ تا ۱۳:۰۰
              </p>
            </div>
            <div className="fg-2bd2dc0e3b" data-node-id="1001:246" data-name="Field">
              <p className="fg-3d41c327c2" dir="auto" data-node-id="1001:247">
                محل اجرا
              </p>
              <p className="fg-0a9c72324d" dir="auto" data-node-id="1001:248">
                کارگاه هنرمند — اصفهان
              </p>
            </div>
          </div>
          <p className="fg-58ec510514" dir="auto" data-node-id="1001:249">
            یادداشت اجرایی: نورپردازی محصول و پس‌زمینه خنثی طبق توضیحات درخواست. هر تغییر دامنه باید از مسیر نگارین ثبت شود.
          </p>
          <div className="fg-48b6bad7ad" data-node-id="1001:250" data-name="Actions">
            <DesignAction className="fg-1cc6ce199b" data-node-id="1001:251" data-name="Button / ثبت مشکل اجرایی" label="ثبت مشکل اجرایی">
              <p className="fg-aee9e8e6f6" dir="auto" data-node-id="1001:252">
                ثبت مشکل اجرایی
              </p>
            </DesignAction>
            <DesignAction className="fg-c92aae01e4" data-node-id="1001:253" data-name="Button / ثبت پیشرفت" label="ثبت پیشرفت">
              <p className="fg-31b19a5ba7" dir="auto" data-node-id="1001:254">
                ثبت پیشرفت
              </p>
            </DesignAction>
          </div>
        </div>
        <div className="fg-37a87af7f0" data-node-id="1001:255" data-name="Alert / info">
          <p className="fg-0907b2641a" dir="auto" data-node-id="1001:256">
            عدم دسترسی به داده نامرتبط
          </p>
          <p className="fg-0123034dc1" dir="auto" data-node-id="1001:257">
            برای اجرا فقط اطلاعات لازم مانند نوع خدمت، زمان، محل و خروجی مورد انتظار نمایش داده می‌شود.
          </p>
        </div>
      </div>
      <ServicePartnerSidebar className="fg-1cadfd0310" data-node-id="1001:211" data-name="Sidebar">
        <div className="fg-24e47e687d" data-node-id="1001:212" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="1001:213">
            خانه نگارین
          </p>
          <div className="fg-842ae29a35" data-node-id="1001:214" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-71eecc63f8" src="/service-partner-assets/negarin-logo.png" />
          </div>
        </div>
        <div className="fg-4c64003eb7" data-node-id="1001:215" data-name="Role Tag">
          <p className="fg-fd87dcd811" dir="auto" data-node-id="1001:216">
            همکار خدمات
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:217">
            فقط درخواست‌های تخصیص‌یافته
          </p>
        </div>
        <div className="fg-37d4680dcb" data-node-id="1001:218" data-name="Navigation">
          <DesignAction className="fg-a0fb7113d8" data-node-id="1001:219" data-name="Nav / پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:220">
              پیشخوان
            </p>
          </DesignAction>
          <DesignAction className="fg-20b7c84d7d" data-node-id="1001:221" data-name="Nav / درخواست‌های خدمات" label="درخواست‌های خدمات" destination="assigned-requests">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:222">
              درخواست‌های خدمات
            </p>
          </DesignAction>
          <DesignAction className="fg-8a8f62dd67" data-node-id="1001:223" data-name="Nav / برنامه و اجرا" label="برنامه و اجرا" destination="schedule-and-execution">
            <p className="fg-356a992da1" dir="auto" data-node-id="1001:224">
              برنامه و اجرا
            </p>
          </DesignAction>
          <DesignAction className="fg-4f8b47c40f" data-node-id="1001:225" data-name="Nav / تحویل‌ها / خروجی‌ها" label="تحویل‌ها / خروجی‌ها" destination="submit-deliverable">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:226">
              تحویل‌ها / خروجی‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-73b8701e5a" data-node-id="1001:227" data-name="Nav / سوابق" label="سوابق" destination="history">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:228">
              سوابق
            </p>
          </DesignAction>
          <DesignAction className="fg-3b661fe153" data-node-id="1001:229" data-name="Nav / حساب" label="حساب" destination="account">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:230">
              حساب
            </p>
          </DesignAction>
        </div>
        <div className="fg-f6f80a477f" data-node-id="1001:231" data-name="Spacer" />
        <div className="fg-f6a3ad7b8b" data-node-id="1001:232" data-name="Account Summary">
          <p className="fg-7ec414a4a7" dir="auto" data-node-id="1001:233">
            استودیو هنر و بسته‌بندی سپهر
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:234">
            کاربر اجرایی سازمان
          </p>
        </div>
      </ServicePartnerSidebar>
    </div>
  );
}
