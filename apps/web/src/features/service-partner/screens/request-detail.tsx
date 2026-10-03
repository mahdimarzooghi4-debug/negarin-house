// Figma 1001:157 — Service Partner / Request Detail — Desktop
import { DesignAction } from "../../artist/design-controls";
import { ServicePartnerSidebar } from "../service-partner-sidebar";

export default function ServicePartnerRequestDetailDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="1001:157" data-name="Service Partner / Request Detail — Desktop">
      <div className="fg-adb70edf68" data-node-id="1001:158" data-name="Main Content">
        <div className="fg-34403a96f4" data-node-id="1001:159" data-name="Page Header">
          <p className="fg-023749cc88" dir="auto" data-node-id="1001:160">
            جزئیات درخواست SRV-2042
          </p>
          <p className="fg-49d1e9f62c" dir="auto" data-node-id="1001:161">
            درخواست تخصیص‌یافته را بررسی کن و فقط در محدوده خدمت اقدام کن.
          </p>
        </div>
        <div className="fg-dd188bd897" data-node-id="1001:186" data-name="Top Row">
          <div className="fg-65d44a4480" data-node-id="1001:187" data-name="Request Summary">
            <p className="fg-4d3e1fa6ef" dir="auto" data-node-id="1001:188">
              خدمت: تولید محتوا
            </p>
            <p className="fg-ac985c02f6" dir="auto" data-node-id="1001:189">
              هنرمند: سارا اکبری · سفال
            </p>
            <p className="fg-28f81a11ff" dir="auto" data-node-id="1001:190">
              موعد پیشنهادی: ۱۶ مهر
            </p>
            <p className="fg-edb29d790c" dir="auto" data-node-id="1001:191">
              دامنه درخواست: تولید ۶ تصویر محصول و یک متن معرفی کوتاه برای محصول موجود. اطلاعات خصوصی فروش یا مالی نمایش داده نمی‌شود.
            </p>
          </div>
          <div className="fg-a3b177af58" data-node-id="1001:192" data-name="Assignment Info">
            <p className="fg-91a358a8f5" dir="auto" data-node-id="1001:193">
              وضعیت تخصیص
            </p>
            <div className="fg-14d0654f3f" data-node-id="1001:194" data-name="Status / تخصیص‌یافته">
              <p className="fg-e6d885b49c" dir="auto" data-node-id="1001:195">
                تخصیص‌یافته
              </p>
            </div>
            <p className="fg-91a358a8f5" dir="auto" data-node-id="1001:196">
              تخصیص‌دهنده
            </p>
            <p className="fg-ad707f5d72" dir="auto" data-node-id="1001:197">
              نگارین
            </p>
          </div>
        </div>
        <div className="fg-f95cb69b0f" data-node-id="1001:198" data-name="Alert / info">
          <p className="fg-0907b2641a" dir="auto" data-node-id="1001:199">
            هماهنگی از مسیر نگارین
          </p>
          <p className="fg-0123034dc1" dir="auto" data-node-id="1001:200">
            ارتباط و اجرای خدمت در چارچوب همین درخواست انجام می‌شود. این پرتال مسیر جذب آزاد هنرمند یا رابطه خارج از شبکه ایجاد نمی‌کند.
          </p>
        </div>
        <div className="fg-0e9b819a28" data-node-id="1001:201" data-name="Decision Actions">
          <DesignAction className="fg-1cc6ce199b" data-node-id="1001:202" data-name="Button / رد درخواست" label="رد درخواست" destination="assigned-requests">
            <p className="fg-aee9e8e6f6" dir="auto" data-node-id="1001:203">
              رد درخواست
            </p>
          </DesignAction>
          <DesignAction className="fg-c92aae01e4" data-node-id="1001:204" data-name="Button / پذیرش درخواست" label="پذیرش درخواست" destination="schedule-and-execution">
            <p className="fg-31b19a5ba7" dir="auto" data-node-id="1001:205">
              پذیرش درخواست
            </p>
          </DesignAction>
        </div>
      </div>
      <ServicePartnerSidebar className="fg-1cadfd0310" data-node-id="1001:162" data-name="Sidebar">
        <div className="fg-24e47e687d" data-node-id="1001:163" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="1001:164">
            خانه نگارین
          </p>
          <div className="fg-842ae29a35" data-node-id="1001:165" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-71eecc63f8" src="/service-partner-assets/negarin-logo.png" />
          </div>
        </div>
        <div className="fg-4c64003eb7" data-node-id="1001:166" data-name="Role Tag">
          <p className="fg-fd87dcd811" dir="auto" data-node-id="1001:167">
            همکار خدمات
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:168">
            فقط درخواست‌های تخصیص‌یافته
          </p>
        </div>
        <div className="fg-37d4680dcb" data-node-id="1001:169" data-name="Navigation">
          <DesignAction className="fg-a0fb7113d8" data-node-id="1001:170" data-name="Nav / پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:171">
              پیشخوان
            </p>
          </DesignAction>
          <DesignAction className="fg-11f10ff929" data-node-id="1001:172" data-name="Nav / درخواست‌های خدمات" label="درخواست‌های خدمات" destination="assigned-requests">
            <p className="fg-356a992da1" dir="auto" data-node-id="1001:173">
              درخواست‌های خدمات
            </p>
          </DesignAction>
          <DesignAction className="fg-f1f51e5cb3" data-node-id="1001:174" data-name="Nav / برنامه و اجرا" label="برنامه و اجرا" destination="schedule-and-execution">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:175">
              برنامه و اجرا
            </p>
          </DesignAction>
          <DesignAction className="fg-4f8b47c40f" data-node-id="1001:176" data-name="Nav / تحویل‌ها / خروجی‌ها" label="تحویل‌ها / خروجی‌ها" destination="submit-deliverable">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:177">
              تحویل‌ها / خروجی‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-73b8701e5a" data-node-id="1001:178" data-name="Nav / سوابق" label="سوابق" destination="history">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:179">
              سوابق
            </p>
          </DesignAction>
          <DesignAction className="fg-3b661fe153" data-node-id="1001:180" data-name="Nav / حساب" label="حساب" destination="account">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:181">
              حساب
            </p>
          </DesignAction>
        </div>
        <div className="fg-f6f80a477f" data-node-id="1001:182" data-name="Spacer" />
        <div className="fg-f6a3ad7b8b" data-node-id="1001:183" data-name="Account Summary">
          <p className="fg-7ec414a4a7" dir="auto" data-node-id="1001:184">
            استودیو هنر و بسته‌بندی سپهر
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:185">
            کاربر اجرایی سازمان
          </p>
        </div>
      </ServicePartnerSidebar>
    </div>
  );
}
