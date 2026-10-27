// Figma 722:5 — Customer / Login & Register - Mobile
import { DesignAction, DesignField } from "../../artist/design-controls";
export default function CustomerLoginRegisterMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="722:5" data-name="Customer / Login & Register - Mobile">
      <div className="fg-df6cf3423b" data-node-id="722:6" data-name="Auth / Top Bar">
        <div className="fg-16e87832b1" data-node-id="722:7">
          <p className="fg-32bd4c7660" dir="auto">
            ورود به نگارین
          </p>
        </div>
        <DesignAction className="fg-f74a27cf1c" data-node-id="717:264" label="arrow_forward" destination="landing">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
        <div className="fg-2015877f56" data-node-id="722:9" data-name="Divider" />
      </div>
      <div className="fg-42e56ad5db" data-node-id="722:10" data-name="Auth / Welcome">
        <div className="fg-e57424ed06" data-node-id="722:11">
          <p className="fg-32bd4c7660" dir="auto">
            خانه نگارین
          </p>
        </div>
        <div className="fg-7349b1ca11" data-node-id="722:12">
          <p className="fg-32bd4c7660" dir="auto">
            ورود یا ثبت‌نام
          </p>
        </div>
        <div className="fg-67cce025d6" data-node-id="722:13">
          <p className="fg-32bd4c7660" dir="auto">
            با شماره موبایل وارد حساب شو یا ثبت‌نامت را شروع کن.
          </p>
        </div>
      </div>
      <div className="fg-ea66d837c7" data-node-id="722:14" data-name="Auth / Mobile Form">
        <div className="fg-ab1a536997" data-node-id="722:15">
          <p className="fg-32bd4c7660" dir="auto">
            شماره موبایل
          </p>
        </div>
        <div className="fg-58070cf28c" data-node-id="722:16">
          <p className="fg-32bd4c7660" dir="auto">
            کد تأیید به این شماره ارسال می‌شود.
          </p>
        </div>
        <DesignField className="fg-e2acb86f78" data-node-id="722:17" data-name="Input / Mobile" label="شماره موبایل" placeholder="۰۹•• ••• ••••">
          <div className="fg-a6c3704db7" data-node-id="722:18">
            <p className="fg-32bd4c7660">۰۹•• ••• ••••</p>
          </div>
        </DesignField>
        <DesignAction className="fg-f146997cad" data-node-id="722:19" data-name="CTA / Continue" label="ادامه" destination="otp-verification">
          <p className="fg-7ee08abcb6" dir="auto" data-node-id="I722:19;45:11">
            ادامه
          </p>
        </DesignAction>
        <DesignAction className="fg-4b55b43e89" data-node-id="772:7" data-name="Auth / Legal Registration" label="business برای شرکت یا سازمان خرید می‌کنی؟ ادامه با نقش خریدار سازمانی" destination="corporate-buyer-access">
          <p className="fg-463b5eeac0" data-node-id="772:8">
            business
          </p>
          <p className="fg-e8d399a28e" dir="auto" data-node-id="772:9">
            برای شرکت یا سازمان خرید می‌کنی؟ ادامه با نقش خریدار سازمانی
          </p>
        </DesignAction>
      </div>
    </div>
  );
}
