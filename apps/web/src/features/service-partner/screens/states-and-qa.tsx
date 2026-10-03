// Figma 1001:406 — Service Partner / States & QA — Desktop
import { DesignAction } from "../../artist/design-controls";
import { ServicePartnerSidebar } from "../service-partner-sidebar";

export default function ServicePartnerStatesQaDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="1001:406" data-name="Service Partner / States & QA — Desktop">
      <div className="fg-adb70edf68" data-node-id="1001:407" data-name="Main Content">
        <div className="fg-2fcaf9ae9b" data-node-id="1001:408" data-name="Page Header">
          <p className="fg-023749cc88" data-node-id="1001:409">{`States & QA`}</p>
          <p className="fg-49d1e9f62c" dir="auto" data-node-id="1001:410">
            حالت‌های اصلی داده و دسترسی برای پیاده‌سازی و QA.
          </p>
        </div>
        <div className="fg-07d697be21" data-node-id="1001:435" data-name="States">
          <div className="fg-a7e55a25b8" data-node-id="1001:436" data-name="State / Loading">
            <p className="fg-4d3e1fa6ef" data-node-id="1001:437">
              Loading
            </p>
            <p className="fg-aceeb6ecd8" dir="auto" data-node-id="1001:438">
              در حال دریافت درخواست‌های تخصیص‌یافته…
            </p>
          </div>
          <div className="fg-4e991a62f8" data-node-id="1001:439" data-name="State / Empty">
            <p className="fg-4d3e1fa6ef" data-node-id="1001:440">
              Empty
            </p>
            <p className="fg-aceeb6ecd8" dir="auto" data-node-id="1001:441">
              درخواستی به سازمان شما تخصیص داده نشده است.
            </p>
          </div>
          <div className="fg-f79df38427" data-node-id="1001:442" data-name="State / Error">
            <p className="fg-096bc5b425" data-node-id="1001:443">
              Error
            </p>
            <p className="fg-f140eaeae8" dir="auto" data-node-id="1001:444">
              دریافت اطلاعات ممکن نشد. دوباره تلاش کنید.
            </p>
            <DesignAction className="fg-1cc6ce199b" data-node-id="1001:445" data-name="Button / تلاش دوباره" label="تلاش دوباره" destination="assigned-requests">
              <p className="fg-aee9e8e6f6" dir="auto" data-node-id="1001:446">
                تلاش دوباره
              </p>
            </DesignAction>
          </div>
        </div>
        <div className="fg-568a154680" data-node-id="1001:447" data-name="Alert / warning">
          <p className="fg-0907b2641a" data-node-id="1001:448">
            Permission Denied
          </p>
          <p className="fg-0123034dc1" dir="auto" data-node-id="1001:449">
            اگر کاربر لینک درخواست تخصیص‌نیافته یا داده خصوصی هنرمند را باز کند، فقط پیام عدم دسترسی نشان داده می‌شود و هیچ متادیتای محافظت‌شده‌ای افشا نمی‌شود.
          </p>
        </div>
        <div className="fg-5d462fab1f" data-node-id="1001:450" data-name="Alert / success">
          <p className="fg-0907b2641a" data-node-id="1001:451">
            Acceptance
          </p>
          <p className="fg-0123034dc1" dir="auto" data-node-id="1001:452">
            این پرتال فقط اجرای درخواست تخصیص‌یافته را پوشش می‌دهد؛ Artist Growth، Finance، Membership، سفارش‌های نامرتبط و یادداشت‌های Admin خارج از محدوده‌اند.
          </p>
        </div>
      </div>
      <ServicePartnerSidebar className="fg-1cadfd0310" data-node-id="1001:411" data-name="Sidebar">
        <div className="fg-24e47e687d" data-node-id="1001:412" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="1001:413">
            خانه نگارین
          </p>
          <div className="fg-842ae29a35" data-node-id="1001:414" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-71eecc63f8" src="/service-partner-assets/negarin-logo.png" />
          </div>
        </div>
        <div className="fg-4c64003eb7" data-node-id="1001:415" data-name="Role Tag">
          <p className="fg-fd87dcd811" dir="auto" data-node-id="1001:416">
            همکار خدمات
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:417">
            فقط درخواست‌های تخصیص‌یافته
          </p>
        </div>
        <div className="fg-37d4680dcb" data-node-id="1001:418" data-name="Navigation">
          <DesignAction className="fg-a0fb7113d8" data-node-id="1001:419" data-name="Nav / پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:420">
              پیشخوان
            </p>
          </DesignAction>
          <DesignAction className="fg-11f10ff929" data-node-id="1001:421" data-name="Nav / درخواست‌های خدمات" label="درخواست‌های خدمات" destination="assigned-requests">
            <p className="fg-356a992da1" dir="auto" data-node-id="1001:422">
              درخواست‌های خدمات
            </p>
          </DesignAction>
          <DesignAction className="fg-f1f51e5cb3" data-node-id="1001:423" data-name="Nav / برنامه و اجرا" label="برنامه و اجرا" destination="schedule-and-execution">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:424">
              برنامه و اجرا
            </p>
          </DesignAction>
          <DesignAction className="fg-4f8b47c40f" data-node-id="1001:425" data-name="Nav / تحویل‌ها / خروجی‌ها" label="تحویل‌ها / خروجی‌ها" destination="submit-deliverable">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:426">
              تحویل‌ها / خروجی‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-73b8701e5a" data-node-id="1001:427" data-name="Nav / سوابق" label="سوابق" destination="history">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:428">
              سوابق
            </p>
          </DesignAction>
          <DesignAction className="fg-3b661fe153" data-node-id="1001:429" data-name="Nav / حساب" label="حساب" destination="account">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:430">
              حساب
            </p>
          </DesignAction>
        </div>
        <div className="fg-f6f80a477f" data-node-id="1001:431" data-name="Spacer" />
        <div className="fg-f6a3ad7b8b" data-node-id="1001:432" data-name="Account Summary">
          <p className="fg-7ec414a4a7" dir="auto" data-node-id="1001:433">
            استودیو هنر و بسته‌بندی سپهر
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:434">
            کاربر اجرایی سازمان
          </p>
        </div>
      </ServicePartnerSidebar>
    </div>
  );
}
