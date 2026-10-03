// Native Figma 1176:5691 — Customer / Login - Web
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

export default function CustomerLoginWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1176:5691" data-name="Customer / Login - Web">
      <div className="fg-6f037ae468" data-node-id="1176:5692" data-name="Auth header">
        <CustomerAction className="fg-9149881df8" data-node-id="1176:5693" data-name="Back action" label="بازگشت arrow_forward">
          <p className="fg-8b2b82f27c" dir="auto" data-node-id="1176:5694">
            بازگشت
          </p>
          <p className="fg-e4e651da93" data-node-id="1176:5695">
            arrow_forward
          </p>
        </CustomerAction>
        <p className="fg-2950ae064e" dir="auto" data-node-id="1176:5696">
          ورود به نگارین
        </p>
        <div className="fg-db5114044e" data-node-id="1176:5697" data-name="Brand">
          <div className="fg-a16da19c54" data-node-id="1176:5698" data-name="Brand copy">
            <p className="fg-00b08f6bc3" dir="auto" data-node-id="1176:5699">
              خانه نگارین
            </p>
            <p className="fg-af5c52dba3" dir="auto" data-node-id="1176:5700">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-c0550a728b" data-node-id="1176:5701" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c3e19f4f.png" />
          </div>
        </div>
      </div>
      <div className="fg-0bd7b2a098" data-node-id="1176:5702" data-name="Login stage">
        <div className="fg-bcdae71b52" data-node-id="1176:5703" data-name="Login panel">
          <div className="fg-e579dd3bcb" data-node-id="1176:5704" data-name="Art welcome">
            <div className="fg-98ca71dc80" data-node-id="1176:5705" data-name="Decorative motif">
              <img alt="" className="fg-8faf267d30" src="/customer-web-assets/cf7b5fd5.svg" />
            </div>
            <div className="fg-b80d1b2eb9" data-node-id="1176:5706" data-name="Artwork composition">
              <div className="fg-bbc4281cc7" data-node-id="1176:5707" data-name="Artwork notes">
                <div className="fg-0b9eef0192" data-node-id="1176:5708" data-name="Artwork note">
                  <div className="fg-3f173f514f" data-node-id="1176:5709" data-name="Detail image">
                    <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/c6ff0338.png" />
                  </div>
                  <p className="fg-2b9750c529" dir="auto" data-node-id="1176:5710">
                    گلیم دست‌بافت
                  </p>
                </div>
                <div className="fg-0b9eef0192" data-node-id="1176:5711" data-name="Artwork note">
                  <div className="fg-3f173f514f" data-node-id="1176:5712" data-name="Detail image">
                    <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/7c219213.png" />
                  </div>
                  <p className="fg-2b9750c529" dir="auto" data-node-id="1176:5713">
                    هنر چوب
                  </p>
                </div>
              </div>
              <div className="fg-a2e5ef5f86" data-node-id="1176:5714" data-name="Featured artwork">
                <div className="fg-a46bce7c48" data-node-id="1176:5715" data-name="Artwork image">
                  <img alt="" className="fg-2ce1fee1c9" src="/customer-web-assets/5049aca4.png" />
                </div>
                <div className="fg-951a49f6ca" data-node-id="1176:5716" data-name="Artwork caption">
                  <p className="fg-8df68b0b1d" dir="auto" data-node-id="1176:5717">
                    میناکاری
                  </p>
                  <p className="fg-1b9d20432f" dir="auto" data-node-id="1176:5718">
                    بشقاب طرح شاه‌عباسی
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-12deb5dde1" data-node-id="1176:5719" data-name="Welcome copy">
              <p className="fg-6a2294b6bc" dir="auto" data-node-id="1176:5720">
                هنر را کشف کن، هنرمند را دنبال کن
              </p>
              <p className="fg-95fc052398" dir="auto" data-node-id="1176:5721">
                به خانه نگارین وارد شو و مسیر کشف هنر اصیل ایرانی را ادامه بده.
              </p>
            </div>
          </div>
          <div className="fg-37a084c7dd" data-node-id="1176:5722" data-name="Login form panel">
            <div className="fg-36ae2f104e" data-node-id="1176:5723" data-name="Welcome">
              <p className="fg-0d7f05fa94" dir="auto" data-node-id="1176:5724">
                خانه نگارین
              </p>
              <p className="fg-d701b83f3b" dir="auto" data-node-id="1176:5725">
                ورود یا ثبت‌نام
              </p>
              <p className="fg-d78f2e251a" dir="auto" data-node-id="1176:5726">
                با شماره موبایل وارد حساب شو یا ثبت‌نامت را شروع کن.
              </p>
            </div>
            <div className="fg-df7f3e66c4" data-node-id="1176:5727" data-name="Mobile form">
              <p className="fg-19a3d29174" dir="auto" data-node-id="1176:5728">
                شماره موبایل
              </p>
              <p className="fg-7b89c916bf" dir="auto" data-node-id="1176:5729">
                کد تأیید به این شماره ارسال می‌شود.
              </p>
              <DesignField className="fg-b8bbe1a1aa" data-node-id="1176:5730" data-name="Mobile input" label="شماره همراه" placeholder="+۹۸ ۰۹•• ••• ••••">
                <p className="fg-b674fb118c" data-node-id="1176:5731">
                  +۹۸
                </p>
                <p className="fg-12558bbe83" data-node-id="1176:5732">
                  ۰۹•• ••• ••••
                </p>
              </DesignField>
              <NegarinButton className="fg-bb13428c25" />
            </div>
            <div className="fg-9b605444d3" data-node-id="1176:5736" data-name="Legal registration">
              <p className="fg-cbf89e75c7" dir="auto" data-node-id="1176:5737">
                برای شرکت یا سازمان خرید می‌کنی؟ ادامه با نقش خریدار سازمانی
              </p>
              <p className="fg-0fcc229d74" data-node-id="1176:5738">
                business
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
