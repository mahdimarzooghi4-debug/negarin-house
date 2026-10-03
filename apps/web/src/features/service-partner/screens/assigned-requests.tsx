// Figma 1001:85 — Service Partner / Assigned Requests — Desktop
import { DesignAction } from "../../artist/design-controls";
import { ServicePartnerSidebar } from "../service-partner-sidebar";

export default function ServicePartnerAssignedRequestsDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="1001:85" data-name="Service Partner / Assigned Requests — Desktop">
      <div className="fg-adb70edf68" data-node-id="1001:86" data-name="Main Content">
        <div className="fg-34403a96f4" data-node-id="1001:87" data-name="Page Header">
          <p className="fg-023749cc88" dir="auto" data-node-id="1001:88">
            درخواست‌های خدمات
          </p>
          <p className="fg-49d1e9f62c" dir="auto" data-node-id="1001:89">
            فقط درخواست‌های تخصیص‌یافته توسط نگارین را مشاهده و پیگیری کن.
          </p>
        </div>
        <div className="fg-174720c08d" data-node-id="1001:114" data-name="Header Actions">
          <DesignAction className="fg-1cc6ce199b" data-node-id="1001:115" data-name="Button / فیلتر وضعیت" label="فیلتر وضعیت">
            <p className="fg-aee9e8e6f6" dir="auto" data-node-id="1001:116">
              فیلتر وضعیت
            </p>
          </DesignAction>
          <DesignAction className="fg-1cc6ce199b" data-node-id="1001:117" data-name="Button / جستجو" label="جستجو">
            <p className="fg-aee9e8e6f6" dir="auto" data-node-id="1001:118">
              جستجو
            </p>
          </DesignAction>
        </div>
        <div className="fg-b42518d6eb" data-node-id="1001:119" data-name="Requests Table">
          <div className="fg-75f05708d9" data-node-id="1001:120" data-name="Table Header">
            <p className="fg-0adffb3583" dir="auto" data-node-id="1001:121">
              شناسه
            </p>
            <p className="fg-1e60f3b59c" dir="auto" data-node-id="1001:122">
              نوع خدمت
            </p>
            <p className="fg-211206b772" dir="auto" data-node-id="1001:123">
              هنرمند
            </p>
            <p className="fg-a48c6e520b" dir="auto" data-node-id="1001:124">
              موعد
            </p>
            <p className="fg-211206b772" dir="auto" data-node-id="1001:125">
              وضعیت
            </p>
            <p className="fg-4cee4eb4fe" dir="auto" data-node-id="1001:126">
              اقدام
            </p>
          </div>
          <div className="fg-6f0546d1e2" data-node-id="1001:127" data-name="Table Row">
            <p className="fg-851200f9f4" data-node-id="1001:128">
              SRV-2048
            </p>
            <p className="fg-c6d319b6a6" dir="auto" data-node-id="1001:129">
              عکاسی محصول
            </p>
            <p className="fg-643e0c22e5" dir="auto" data-node-id="1001:130">
              زهرا محمدی
            </p>
            <p className="fg-8098d1844c" dir="auto" data-node-id="1001:131">
              ۱۴ مهر
            </p>
            <div className="fg-4515865cf7" data-node-id="1001:132" data-name="Status Cell">
              <div className="fg-6fe4eb8a6c" data-node-id="1001:133" data-name="Status / پذیرفته‌شده">
                <p className="fg-a3a09b1bc5" dir="auto" data-node-id="1001:134">
                  پذیرفته‌شده
                </p>
              </div>
            </div>
            <DesignAction className="fg-ce752824ee" dir="auto" data-node-id="1001:135" label="مشاهده" destination="request-detail">
              مشاهده
            </DesignAction>
          </div>
          <div className="fg-6f0546d1e2" data-node-id="1001:136" data-name="Table Row">
            <p className="fg-851200f9f4" data-node-id="1001:137">
              SRV-2042
            </p>
            <p className="fg-c6d319b6a6" dir="auto" data-node-id="1001:138">
              تولید محتوا
            </p>
            <p className="fg-643e0c22e5" dir="auto" data-node-id="1001:139">
              سارا اکبری
            </p>
            <p className="fg-8098d1844c" dir="auto" data-node-id="1001:140">
              ۱۶ مهر
            </p>
            <div className="fg-4515865cf7" data-node-id="1001:141" data-name="Status Cell">
              <div className="fg-5e9d02b0a6" data-node-id="1001:142" data-name="Status / تخصیص‌یافته">
                <p className="fg-e6d885b49c" dir="auto" data-node-id="1001:143">
                  تخصیص‌یافته
                </p>
              </div>
            </div>
            <DesignAction className="fg-ce752824ee" dir="auto" data-node-id="1001:144" label="بررسی" destination="request-detail">
              بررسی
            </DesignAction>
          </div>
          <div className="fg-6f0546d1e2" data-node-id="1001:145" data-name="Table Row">
            <p className="fg-851200f9f4" data-node-id="1001:146">
              SRV-2037
            </p>
            <p className="fg-c6d319b6a6" dir="auto" data-node-id="1001:147">
              خدمات بسته‌بندی
            </p>
            <p className="fg-643e0c22e5" dir="auto" data-node-id="1001:148">
              مهدی رضایی
            </p>
            <p className="fg-8098d1844c" dir="auto" data-node-id="1001:149">
              ۱۲ مهر
            </p>
            <div className="fg-4515865cf7" data-node-id="1001:150" data-name="Status Cell">
              <div className="fg-b6593401f2" data-node-id="1001:151" data-name="Status / در حال اجرا">
                <p className="fg-a3a09b1bc5" dir="auto" data-node-id="1001:152">
                  در حال اجرا
                </p>
              </div>
            </div>
            <DesignAction className="fg-ce752824ee" dir="auto" data-node-id="1001:153" label="ادامه اجرا" destination="schedule-and-execution">
              ادامه اجرا
            </DesignAction>
          </div>
        </div>
        <div className="fg-f95cb69b0f" data-node-id="1001:154" data-name="Alert / info">
          <p className="fg-0907b2641a" dir="auto" data-node-id="1001:155">
            اصل Least Privilege
          </p>
          <p className="fg-0123034dc1" dir="auto" data-node-id="1001:156">
            نام هنرمند و اطلاعات اجرایی فقط برای درخواست مرتبط نمایش داده می‌شود؛ امور مالی، رشد، عضویت، سفارش‌های دیگر و یادداشت‌های داخلی نگارین قابل مشاهده نیست.
          </p>
        </div>
      </div>
      <ServicePartnerSidebar className="fg-1cadfd0310" data-node-id="1001:90" data-name="Sidebar">
        <div className="fg-24e47e687d" data-node-id="1001:91" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="1001:92">
            خانه نگارین
          </p>
          <div className="fg-842ae29a35" data-node-id="1001:93" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-71eecc63f8" src="/service-partner-assets/negarin-logo.png" />
          </div>
        </div>
        <div className="fg-4c64003eb7" data-node-id="1001:94" data-name="Role Tag">
          <p className="fg-fd87dcd811" dir="auto" data-node-id="1001:95">
            همکار خدمات
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:96">
            فقط درخواست‌های تخصیص‌یافته
          </p>
        </div>
        <div className="fg-37d4680dcb" data-node-id="1001:97" data-name="Navigation">
          <DesignAction className="fg-a0fb7113d8" data-node-id="1001:98" data-name="Nav / پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:99">
              پیشخوان
            </p>
          </DesignAction>
          <DesignAction className="fg-11f10ff929" data-node-id="1001:100" data-name="Nav / درخواست‌های خدمات" label="درخواست‌های خدمات" destination="assigned-requests">
            <p className="fg-356a992da1" dir="auto" data-node-id="1001:101">
              درخواست‌های خدمات
            </p>
          </DesignAction>
          <DesignAction className="fg-f1f51e5cb3" data-node-id="1001:102" data-name="Nav / برنامه و اجرا" label="برنامه و اجرا" destination="schedule-and-execution">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:103">
              برنامه و اجرا
            </p>
          </DesignAction>
          <DesignAction className="fg-4f8b47c40f" data-node-id="1001:104" data-name="Nav / تحویل‌ها / خروجی‌ها" label="تحویل‌ها / خروجی‌ها" destination="submit-deliverable">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:105">
              تحویل‌ها / خروجی‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-73b8701e5a" data-node-id="1001:106" data-name="Nav / سوابق" label="سوابق" destination="history">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:107">
              سوابق
            </p>
          </DesignAction>
          <DesignAction className="fg-3b661fe153" data-node-id="1001:108" data-name="Nav / حساب" label="حساب" destination="account">
            <p className="fg-690109829f" dir="auto" data-node-id="1001:109">
              حساب
            </p>
          </DesignAction>
        </div>
        <div className="fg-f6f80a477f" data-node-id="1001:110" data-name="Spacer" />
        <div className="fg-f6a3ad7b8b" data-node-id="1001:111" data-name="Account Summary">
          <p className="fg-7ec414a4a7" dir="auto" data-node-id="1001:112">
            استودیو هنر و بسته‌بندی سپهر
          </p>
          <p className="fg-d4235d1d7b" dir="auto" data-node-id="1001:113">
            کاربر اجرایی سازمان
          </p>
        </div>
      </ServicePartnerSidebar>
    </div>
  );
}
