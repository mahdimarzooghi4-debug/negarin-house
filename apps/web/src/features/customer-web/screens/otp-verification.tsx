// Native Figma 1176:5740 — Customer / OTP Verification - Web
import {CustomerAction} from "../customer-controls";
import {DesignField} from "../../artist/design-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Large";
  state?: "Default";
  style?: "Primary";
};

function NegarinButton({ className, label = "ادامه", size: _size = "Large", state: _state = "Default", style: _style = "Primary" }: NegarinButtonProps) {
  return (
    <CustomerAction className={className || "customer-native-button"} data-node-id="46:8" label={label}>
      <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:9">
        {label}
      </p>
    </CustomerAction>
  );
}

export default function CustomerOtpVerificationWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1176:5740" data-name="Customer / OTP Verification - Web">
      <div className="fg-6f037ae468" data-node-id="1176:5741" data-name="Auth header">
        <CustomerAction className="fg-9149881df8" data-node-id="1176:5742" data-name="Back action" label="بازگشت arrow_forward">
          <p className="fg-8b2b82f27c" dir="auto" data-node-id="1176:5743">
            بازگشت
          </p>
          <p className="fg-e4e651da93" data-node-id="1176:5744">
            arrow_forward
          </p>
        </CustomerAction>
        <p className="fg-2950ae064e" dir="auto" data-node-id="1176:5745">
          تأیید شماره موبایل
        </p>
        <div className="fg-db5114044e" data-node-id="1176:5746" data-name="Brand">
          <div className="fg-a16da19c54" data-node-id="1176:5747" data-name="Brand copy">
            <p className="fg-00b08f6bc3" dir="auto" data-node-id="1176:5748">
              خانه نگارین
            </p>
            <p className="fg-af5c52dba3" dir="auto" data-node-id="1176:5749">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-c0550a728b" data-node-id="1176:5750" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c3e19f4f.png" />
          </div>
        </div>
      </div>
      <div className="fg-0bd7b2a098" data-node-id="1176:5751" data-name="Verification stage">
        <div className="fg-bcdae71b52" data-node-id="1176:5752" data-name="Verification panel">
          <div className="fg-60f84bc250" data-node-id="1176:5753" data-name="Art verification">
            <div className="fg-88d5a37f97" data-node-id="1176:5754" data-name="Decorative motif">
              <img alt="" className="fg-8faf267d30" src="/customer-web-assets/077dad18.svg" />
            </div>
            <div className="fg-6255747642" data-node-id="1176:5755" data-name="Artwork frame">
              <div className="fg-1047facdf7" data-node-id="1176:5756" data-name="Artwork image">
                <img alt="" className="fg-2ce1fee1c9" src="/customer-web-assets/4e2a2e91.png" />
              </div>
              <div className="fg-0a09a79c4c" data-node-id="1176:5757" data-name="Artist caption">
                <p className="fg-8df68b0b1d" dir="auto" data-node-id="1176:5758">
                  میناکاری
                </p>
                <div className="fg-e8ab585021" data-node-id="1176:5759" data-name="Artist">
                  <p className="fg-0911c133e6" dir="auto" data-node-id="1176:5760">
                    دستانی که روایت می‌کنند
                  </p>
                  <p className="fg-7442ebe12f" dir="auto" data-node-id="1176:5761">
                    اثر زهرا محمدی
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-789172be64" data-node-id="1176:5762" data-name="Verification note">
              <p className="fg-961f9068c8" dir="auto" data-node-id="1176:5763">
                یک قدم تا ادامه مسیرت در خانه نگارین باقی مانده است.
              </p>
              <p className="fg-06c382c68e" data-node-id="1176:5764">
                verified_user
              </p>
            </div>
          </div>
          <div className="fg-0229a75491" data-node-id="1176:5765" data-name="Verification form panel">
            <div className="fg-36ae2f104e" data-node-id="1176:5766" data-name="Welcome">
              <p className="fg-0d7f05fa94" dir="auto" data-node-id="1176:5767">
                خانه نگارین
              </p>
              <p className="fg-d701b83f3b" dir="auto" data-node-id="1176:5768">
                کد تأیید را وارد کن
              </p>
              <p className="fg-d78f2e251a" dir="auto" data-node-id="1176:5769">
                کد یک‌بارمصرف برای شماره موبایل شما ارسال شده است.
              </p>
            </div>
            <div className="fg-df7f3e66c4" data-node-id="1176:5770" data-name="Code form">
              <div className="fg-0a09a79c4c" data-node-id="1176:5771" data-name="Form heading">
                <div className="fg-3c294beb68" data-node-id="1176:5772" data-name="Verification state">
                  <p className="fg-3f3a6366a7" dir="auto" data-node-id="1176:5773">
                    کد ارسال شد
                  </p>
                  <p className="fg-12a143e7f7" data-node-id="1176:5774">
                    check_circle
                  </p>
                </div>
                <p className="fg-460d80656d" dir="auto" data-node-id="1176:5775">
                  کد تأیید
                </p>
              </div>
              <p className="fg-7b89c916bf" dir="auto" data-node-id="1176:5776">
                کد ارسال‌شده را در کادر زیر وارد کن.
              </p>
              <div className="fg-9ef1cfcc54" data-node-id="1176:5777" data-name="Code entry">
                <DesignField className="fg-6d6082a77f" data-node-id="1176:5778" data-name="Code field" label="رقم 1 کد تأیید" placeholder="—" otp>
                  <p className="fg-25203b7f81" data-node-id="1176:5779">
                    —
                  </p>
                </DesignField>
                <DesignField className="fg-6d6082a77f" data-node-id="1176:5780" data-name="Code field" label="رقم 2 کد تأیید" placeholder="—" otp>
                  <p className="fg-25203b7f81" data-node-id="1176:5781">
                    —
                  </p>
                </DesignField>
                <DesignField className="fg-16e52c376f" data-node-id="1176:5782" data-name="Code field" label="رقم 3 کد تأیید" placeholder="—" otp>
                  <p className="fg-25203b7f81" data-node-id="1176:5783">
                    —
                  </p>
                </DesignField>
                <DesignField className="fg-6d6082a77f" data-node-id="1176:5784" data-name="Code field" label="رقم 4 کد تأیید" placeholder="۷" otp>
                  <p className="fg-9537d592d4" data-node-id="1176:5785">
                    ۷
                  </p>
                </DesignField>
                <DesignField className="fg-6d6082a77f" data-node-id="1176:5786" data-name="Code field" label="رقم 5 کد تأیید" placeholder="۲" otp>
                  <p className="fg-9537d592d4" data-node-id="1176:5787">
                    ۲
                  </p>
                </DesignField>
                <DesignField className="fg-6d6082a77f" data-node-id="1176:5788" data-name="Code field" label="رقم 6 کد تأیید" placeholder="۴" otp>
                  <p className="fg-9537d592d4" data-node-id="1176:5789">
                    ۴
                  </p>
                </DesignField>
              </div>
              <NegarinButton className="fg-bb13428c25" label="تأیید و ادامه" />
            </div>
            <div className="fg-30354e4236" data-node-id="1176:5793" data-name="Alternative actions">
              <p className="fg-2d0fa8a474" dir="auto" data-node-id="1176:5794">
                ارسال دوباره کد
              </p>
              <p className="fg-65ab299da0" dir="auto" data-node-id="1176:5795">
                ویرایش شماره موبایل
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
