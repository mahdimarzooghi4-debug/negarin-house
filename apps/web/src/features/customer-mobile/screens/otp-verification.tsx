// Figma 723:6 — Customer / OTP Verification - Mobile
import { DesignAction, DesignField } from "../../artist/design-controls";
export default function CustomerOtpVerificationMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="723:6" data-name="Customer / OTP Verification - Mobile">
      <div className="fg-df6cf3423b" data-node-id="723:7" data-name="Auth / Top Bar">
        <div className="fg-16e87832b1" data-node-id="723:8">
          <p className="fg-32bd4c7660" dir="auto">
            تأیید شماره موبایل
          </p>
        </div>
        <DesignAction className="fg-f74a27cf1c" data-node-id="723:9" label="arrow_forward" destination="login-and-register">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
        <div className="fg-2015877f56" data-node-id="723:10" data-name="Divider" />
      </div>
      <div className="fg-42e56ad5db" data-node-id="723:11" data-name="Auth / Welcome">
        <div className="fg-e57424ed06" data-node-id="723:12">
          <p className="fg-32bd4c7660" dir="auto">
            خانه نگارین
          </p>
        </div>
        <div className="fg-7349b1ca11" data-node-id="723:13">
          <p className="fg-32bd4c7660" dir="auto">
            کد تأیید را وارد کن
          </p>
        </div>
        <div className="fg-67cce025d6" data-node-id="723:14">
          <p className="fg-32bd4c7660" dir="auto">
            کد یک‌بارمصرف برای شماره موبایل شما ارسال شده است.
          </p>
        </div>
      </div>
      <div className="fg-ea66d837c7" data-node-id="723:15" data-name="Auth / Mobile Form">
        <div className="fg-ab1a536997" data-node-id="723:16">
          <p className="fg-32bd4c7660" dir="auto">
            کد تأیید
          </p>
        </div>
        <div className="fg-58070cf28c" data-node-id="723:17">
          <p className="fg-32bd4c7660" dir="auto">
            کد ارسال‌شده را در کادر زیر وارد کن.
          </p>
        </div>
        <div className="fg-e2acb86f78" data-node-id="723:18" data-name="Input / Mobile">
          <DesignField className="fg-f37025215f" data-node-id="723:22" data-name="OTP / Digit 1" label="رقم 1 کد تأیید" placeholder="—" otp>
            <div className="fg-9d015eb631" data-node-id="723:23">
              <p className="fg-32bd4c7660">—</p>
            </div>
          </DesignField>
          <DesignField className="fg-61efa28912" data-node-id="723:24" data-name="OTP / Digit 2" label="رقم 2 کد تأیید" placeholder="—" otp>
            <div className="fg-9d015eb631" data-node-id="723:25">
              <p className="fg-32bd4c7660">—</p>
            </div>
          </DesignField>
          <DesignField className="fg-740fa2bfa5" data-node-id="723:26" data-name="OTP / Digit 3" label="رقم 3 کد تأیید" placeholder="—" otp>
            <div className="fg-9d015eb631" data-node-id="723:27">
              <p className="fg-32bd4c7660">—</p>
            </div>
          </DesignField>
          <DesignField className="fg-67e4f22542" data-node-id="723:28" data-name="OTP / Digit 4" label="رقم 4 کد تأیید" placeholder="—" otp>
            <div className="fg-9d015eb631" data-node-id="723:29">
              <p className="fg-32bd4c7660">—</p>
            </div>
          </DesignField>
          <DesignField className="fg-0cf9ffbd29" data-node-id="723:30" data-name="OTP / Digit 5" label="رقم 5 کد تأیید" placeholder="—" otp>
            <div className="fg-9d015eb631" data-node-id="723:31">
              <p className="fg-32bd4c7660">—</p>
            </div>
          </DesignField>
          <DesignField className="fg-03c82d322c" data-node-id="723:32" data-name="OTP / Digit 6" label="رقم 6 کد تأیید" placeholder="—" otp>
            <div className="fg-9d015eb631" data-node-id="723:33">
              <p className="fg-32bd4c7660">—</p>
            </div>
          </DesignField>
        </div>
        <DesignAction className="fg-f146997cad" data-node-id="723:20" data-name="CTA / Continue" label="تأیید و ادامه" destination="checkout-shipping-info">
          <p className="fg-27c9c6b7d2" dir="auto" data-node-id="I723:20;45:11">
            تأیید و ادامه
          </p>
        </DesignAction>
        <p className="fg-190d9c9fbf" dir="auto" data-node-id="724:3">
          ارسال دوباره کد
        </p>
        <DesignAction className="fg-7c86426528" data-node-id="724:4" label="ویرایش شماره موبایل" destination="login-and-register">
          <p className="fg-32bd4c7660" dir="auto">
            ویرایش شماره موبایل
          </p>
        </DesignAction>
      </div>
    </div>
  );
}
