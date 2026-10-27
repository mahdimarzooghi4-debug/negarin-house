// Figma 855:236 — Artist / Finance Settlement Request — Mobile
import { DesignAction } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistFinanceSettlementRequestMobile() {
  return (
    <div className="fg-3973358890" data-node-id="855:236" data-name="Artist / Finance Settlement Request — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="855:237" data-name="Status Bar">
        <p className="fg-ec74edce3f" data-node-id="855:238">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="855:239" data-name="Frame">
          <div className="fg-e73a823889" data-node-id="855:240" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="855:242" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/8f749c0c.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="855:244" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2b3b7d1d.svg" />
          </div>
        </div>
      </div>
      <div className="fg-799f37102e" data-node-id="855:246" data-name="Header">
        <DesignAction className="fg-c96fe10678" data-node-id="855:247" data-name="Frame" label="ثبت درخواست تسویه" destination="finance-settlement-request-submitted">
          <div className="fg-4f3c079069" data-node-id="855:248" data-name="Frame">
            <div className="fg-c51752dc8c" data-node-id="855:249" data-name="Frame">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c83e1f65.svg" />
            </div>
          </div>
          <p className="fg-11eee50b43" dir="auto" data-node-id="855:251">
            ثبت درخواست تسویه
          </p>
        </DesignAction>
        <p className="fg-46dca51fd1" dir="auto" data-node-id="855:252">
          مرحله تأیید اطلاعات تسویه مالی
        </p>
      </div>
      <div className="fg-497ec33f5a" data-node-id="855:253" data-name="Content">
        <div className="fg-89c5c241e8" data-node-id="855:254" data-name="Frame">
          <p className="fg-3fe3bd9b2d" dir="auto" data-node-id="855:255">
            موجودی قابل تسویه به حساب بانکی تاییدشده شما واریز و قابل تسویه می‌شود.
          </p>
        </div>
        <div className="fg-9f97630fd8" data-node-id="855:256" data-name="Frame">
          <p className="fg-0a20668e7d" dir="auto" data-node-id="855:257">
            مبلغ درخواست
          </p>
          <p className="fg-1555466c9e" dir="auto" data-node-id="855:258">
            ۸٬۴۲۰٬۰۰۰ تومان
          </p>
        </div>
        <div className="fg-3e37625c94" data-node-id="855:259" data-name="Frame">
          <p className="fg-0a20668e7d" dir="auto" data-node-id="855:260">
            حساب مقصد
          </p>
          <p className="fg-719ee233d9" dir="auto" data-node-id="855:261">
            بانک ملت · •••• ۴۸۲۱
          </p>
          <p className="fg-a58000e32d" dir="auto" data-node-id="855:262">
            به نام زهرا محمدی · حساب تأییدشده
          </p>
        </div>
        <div className="fg-b5ee46ad55" data-node-id="855:263" data-name="Frame">
          <p className="fg-06925cd3a9" dir="auto" data-node-id="855:264">
            فقط موجودی «قابل تسویه» در این درخواست محاسبه می‌شود؛ مبالغ در انتظار پس از تکمیل سفارش‌ها اضافه می‌گردد.
          </p>
        </div>
        <div className="fg-ab493c410b" data-node-id="855:265" data-name="Frame">
          <DesignAction className="fg-7902cb33b7" data-node-id="855:266" data-name="Negarin / Button" label="ثبت درخواست تسویه" destination="finance-settlement-request-submitted">
            <p className="fg-d1070e8258" dir="auto" data-node-id="I855:266;45:11">
              ثبت درخواست تسویه
            </p>
          </DesignAction>
          <DesignAction className="fg-3651dc4f5f" data-node-id="855:269" data-name="Negarin / Button" label="انصراف و بازگشت" destination="finance">
            <p className="fg-40d88e90bf" dir="auto" data-node-id="I855:269;46:53">
              انصراف و بازگشت
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-0146312cb0" data-node-id="855:272" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="855:273" data-name="Frame">
          <DesignAction className="fg-5cce6a5a00" data-node-id="855:274" data-name="Frame" label="حساب" destination="finance">
            <div className="fg-14f6aaa9d9" data-node-id="855:275" data-name="Rectangle" />
            <div className="fg-b2a182ecf4" data-node-id="855:276" data-name="Frame">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/d8d5f882.svg" />
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="855:280">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="855:281" data-name="Frame" label="فرصت‌ها" destination="opportunities">
            <div className="fg-b2a182ecf4" data-node-id="855:282" data-name="Frame">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/db368d98.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="855:284">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="855:285" data-name="Frame" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="855:286" data-name="Frame">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/b7a107f8.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="855:288">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="855:289" data-name="Frame" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="855:290" data-name="Frame">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/254af24.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="855:292">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="855:293" data-name="Frame" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="855:294" data-name="Frame">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/aaee4fa8.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="855:296">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
