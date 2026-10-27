// Figma 831:498 — Auth / Login &amp; Register — Desktop
import { DesignAction, DesignField } from "../design-controls";

export default function AuthLoginRegisterDesktop() {
  return (
    <div className="fg-99d0c089cd" data-node-id="831:498" data-name="Auth / Login & Register — Desktop">
      <div className="fg-7cf5347c35" data-node-id="831:499" data-name="form-area">
        <div className="fg-2714b01eb3" data-node-id="831:500" data-name="desktop-topbar">
          <div className="fg-976f46d270" data-node-id="831:501" data-name="Frame">
            <p className="fg-a59e64f9d3" dir="auto" data-node-id="831:502">
              پشتیبانی نگارین
            </p>
          </div>
          <p className="fg-3f962418df" dir="auto" data-node-id="831:503">
            نگارین
          </p>
        </div>
        <div className="fg-14c82fb485" data-node-id="831:504" data-name="center-form-container">
          <div className="fg-d1b9d61d4b" data-node-id="831:505" data-name="auth-card">
            <div className="fg-d476bf8fa2" data-node-id="1163:50">
              <div className="fg-f9fe332456">
                <div className="fg-e7a56e8a37" data-name="brand-header">
                  <div className="fg-15cc5ceed7" data-node-id="1163:51">
                    <div className="fg-c4925c4387">
                      <div className="fg-2c4391ba8b" data-name="لوگوی نگارین (2) 1">
                        <img alt="" className="fg-6296272086" src="/artist-assets/d1620814bc0bdfda.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-6cddd9a7df" data-node-id="831:511" data-name="text-group">
              <p className="fg-4d9e492183" dir="auto" data-node-id="831:512">
                ورود یا ثبت‌نام
              </p>
              <p className="fg-12130b1280" dir="auto" data-node-id="831:513">
                برای ادامه، شماره تلفن همراه خود را وارد کنید.
              </p>
            </div>
            <div className="fg-f14f88cf06" data-node-id="831:514" data-name="input-wrapper">
              <p className="fg-a92f49d8df" dir="auto" data-node-id="831:515">
                شماره تلفن همراه
              </p>
              <DesignField className="fg-56b6b58fcb" data-node-id="831:516" data-name="input-container" label="شماره تلفن همراه" placeholder="+۹۸ ۰۹۱۲۳۴۵۶۷۸۹">
                <p className="fg-7816a88acf" data-node-id="831:517">
                  +۹۸
                </p>
                <div className="fg-3aae7b1f2f" data-node-id="831:518"><img alt="" src="/artist-assets/539d3acb730dcca9.svg" style={{position:"absolute",width:1,height:16,maxWidth:"none"}} /></div>
                <p className="fg-41a395677e" data-node-id="831:519">
                  ۰۹۱۲۳۴۵۶۷۸۹
                </p>
              </DesignField>
            </div>
            <DesignAction className="fg-a9c1ba3b38" data-node-id="831:520" data-name="Negarin / Button" destination="otp-verification" label="دریافت کد تأیید">
              <p className="fg-d10f2ddccf" dir="auto" data-node-id="I831:520;46:9">
                دریافت کد تأیید
              </p>
            </DesignAction>
            <p className="fg-78221dbb2e" dir="auto" data-node-id="831:523">
              با ورود یا ثبت‌نام، شرایط استفاده و حریم خصوصی نگارین را می‌پذیرید.
            </p>
          </div>
        </div>
        <div className="fg-b79c743993" data-node-id="831:524" data-name="desktop-footer">
          <p className="fg-62927fc617" dir="auto" data-node-id="831:525">
            تمامی حقوق مادی و معنوی محفوظ است.
          </p>
        </div>
      </div>
      <div className="fg-7ee2aca82a" data-node-id="831:526" data-name="visual-panel">
        <div className="fg-b2439d383f" data-node-id="1171:29" data-name="Persian Girih Pattern">
          <div className="fg-dbf3c7319b">
            <img alt="" className="fg-acc3667e96" src="/artist-assets/5a2c9b9eab881522.svg" />
          </div>
        </div>
        <div className="fg-d476bf8fa2" data-node-id="1163:53">
          <div className="fg-f9fe332456">
            <div className="fg-e7a56e8a37" data-name="brand-header">
              <div className="fg-15cc5ceed7" data-node-id="1163:54">
                <div className="fg-c4925c4387">
                  <div className="fg-2c4391ba8b" data-name="لوگوی نگارین (2) 1">
                    <img alt="" className="fg-6296272086" src="/artist-assets/d1620814bc0bdfda.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fg-0fd3ae64ad" data-node-id="831:533" data-name="hero-copy">
          <p className="fg-03b587c50b" dir="auto" data-node-id="831:534">
            خانه نگارین
          </p>
          <p className="fg-889bf1aa9a" dir="auto" data-node-id="831:535">
            فضایی امن برای هنرمندان، خریداران و همکاران اکوسیستم نگارین.
          </p>
        </div>
        <div className="fg-397ec49421" data-node-id="831:536" data-name="footer-stamp">
          <p className="fg-2464397d98" dir="auto" data-node-id="831:537">
            تمامی حقوق مادی و معنوی برای نگارین محفوظ است.
          </p>
        </div>
      </div>
    </div>
  );
}