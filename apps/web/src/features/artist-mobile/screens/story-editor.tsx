// Figma 858:245 — Artist / Story Editor — Mobile
import { DesignAction, DesignChoice, DesignUpload, DesignField } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistStoryEditorMobile() {
  return (
    <div className="fg-edd573f1d7" data-node-id="858:245" data-name="Artist / Story Editor — Mobile">
      <div className="fg-153c0a1809" data-node-id="858:246" data-name="top-sticky">
        <div className="fg-aaf8c1e790" data-node-id="858:247" data-name="Status Bar">
          <p className="fg-ec74edce3f" data-node-id="858:248">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="858:249" data-name="Frame">
            <div className="fg-e73a823889" data-node-id="858:250" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/6fc267c.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="858:252" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/3e6648b0.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="858:254" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/51266037.svg" />
            </div>
          </div>
        </div>
        <div className="fg-1afef469be" data-node-id="858:256" data-name="Header">
          <div className="fg-c96fe10678" data-node-id="858:257" data-name="Frame">
            <DesignAction className="fg-2c9e8a1c8a" data-node-id="858:258" data-name="back-btn" label="بازگشت" destination="stories">
              <div className="fg-15cc5ceed7" data-node-id="858:697">
                <div className="fg-c23fd9c194">
                  <div className="fg-f14442793f" data-name="chevron-left">
                    <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/828db915.svg" />
                  </div>
                </div>
              </div>
            </DesignAction>
            <p className="fg-11eee50b43" dir="auto" data-node-id="858:260">
              ساخت روایت جدید
            </p>
            <div className="fg-f84de76785" data-node-id="858:261" data-name="Frame" />
          </div>
          <p className="fg-2ec3a12418" dir="auto" data-node-id="858:262">
            همین‌جا بنویس و بساز، صفحه جدا لازم نیست
          </p>
        </div>
      </div>
      <div className="fg-094a029af2" data-node-id="858:263" data-name="scrollable-content">
        <div className="fg-62f39da6b2" data-node-id="858:264" data-name="media-type-section">
          <p className="fg-62649dea4d" dir="auto" data-node-id="858:265">
            نوع رسانه
          </p>
          <div className="fg-fbb5fbd514" data-node-id="858:266" data-name="toggles">
            <DesignChoice className="fg-b6a8f1867b" data-node-id="858:267" data-name="toggle-image" label="عکس" group="toggles" initial={false}>
              <p className="fg-5aae26f1a2" dir="auto" data-node-id="858:268">
                عکس
              </p>
              <div className="fg-c51752dc8c" data-node-id="858:700" data-name="image">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/aaea060.svg" />
              </div>
            </DesignChoice>
            <DesignChoice className="fg-7b8ba95a57" data-node-id="858:270" data-name="toggle-video" label="ویدیو" group="toggles" initial={false}>
              <p className="fg-05ebd28202" dir="auto" data-node-id="858:271">
                ویدیو
              </p>
              <div className="fg-c51752dc8c" data-node-id="858:721" data-name="video">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/37693d70.svg" />
              </div>
            </DesignChoice>
          </div>
        </div>
        <div className="fg-62f39da6b2" data-node-id="858:273" data-name="media-upload-section">
          <p className="fg-62649dea4d" dir="auto" data-node-id="858:274">
            رسانه
          </p>
          <DesignUpload className="fg-baea1b5afb" data-node-id="858:275" data-name="upload-zone" preserveLayout label="عکس یا ویدیو را اضافه کن فایل رسانه برای پیش‌نمایش روایت" media>
            <div className="fg-2d3663d59a" data-node-id="858:736" data-name="cloud-upload">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/a64b1340.svg" />
            </div>
            <p className="fg-63174a1a4b" dir="auto" data-node-id="858:277">
              عکس یا ویدیو را اضافه کن
            </p>
            <p className="fg-b2e13de1fc" dir="auto" data-node-id="858:278">
              فایل رسانه برای پیش‌نمایش روایت
            </p>
          </DesignUpload>
        </div>
        <div className="fg-62f39da6b2" data-node-id="858:279" data-name="caption-section">
          <p className="fg-62649dea4d" dir="auto" data-node-id="858:280">
            متن روایت
          </p>
          <DesignField className="fg-c5688e1e1b" data-node-id="858:281" data-name="textarea" label="متن روایت" placeholder="داستان ساخت اثر، جزئیات پشت صحنه یا توضیح کوتاه روایت…">
            <p className="fg-3e3beb43c2" dir="auto" data-node-id="858:282">
              داستان ساخت اثر، جزئیات پشت صحنه یا توضیح کوتاه روایت…
            </p>
          </DesignField>
        </div>
        <div className="fg-62f39da6b2" data-node-id="858:283" data-name="product-link-section">
          <p className="fg-62649dea4d" dir="auto" data-node-id="858:284">
            اتصال به محصول (اختیاری)
          </p>
          <DesignAction className="fg-c54c66fac2" data-node-id="858:285" data-name="select-trigger" label="انتخاب محصول مرتبط" destination="story-product-selection">
            <div className="fg-c51752dc8c" data-node-id="858:730" data-name="chevron-down">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/e60c2229.svg" />
            </div>
            <p className="fg-421489d5c7" dir="auto" data-node-id="858:287">
              انتخاب محصول مرتبط
            </p>
          </DesignAction>
        </div>
        <div className="fg-ab493c410b" data-node-id="858:288" data-name="composer-actions">
          <DesignAction className="fg-7902cb33b7" data-node-id="858:289" data-name="Negarin / Button" label="انتشار روایت" destination="story-published">
            <p className="fg-d1070e8258" dir="auto" data-node-id="I858:289;45:11">
              انتشار روایت
            </p>
          </DesignAction>
          <DesignAction className="fg-60c3fad335" data-node-id="858:292" data-name="Negarin / Button" label="ذخیره پیش‌نویس" destination="story-draft">
            <p className="fg-bf29e071b6" dir="auto" data-node-id="I858:292;46:17">
              ذخیره پیش‌نویس
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-9d3091e236" data-node-id="858:295" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="858:296" data-name="nav-items-container">
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:297" data-name="tab-account" label="حساب" destination="account">
            <div className="fg-14f6aaa9d9" data-node-id="858:298" data-name="active-indicator" />
            <div className="fg-1e8a144f74" data-node-id="858:299" data-name="icon-account">
              <div className="fg-b2a182ecf4" data-node-id="858:300" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2c8f1bf6.svg" />
              </div>
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="858:302">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:303" data-name="tab-opps" label="فرصت‌ها" destination="opportunities">
            <div className="fg-1e8a144f74" data-node-id="858:304" data-name="icon-opps">
              <div className="fg-b2a182ecf4" data-node-id="858:305" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/38d27841.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:307">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:308" data-name="tab-products" label="محصولات" destination="products">
            <div className="fg-1e8a144f74" data-node-id="858:309" data-name="icon-products">
              <div className="fg-b2a182ecf4" data-node-id="858:310" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/8894e9ce.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:312">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:313" data-name="tab-orders" label="سفارش‌ها" destination="orders">
            <div className="fg-1e8a144f74" data-node-id="858:314" data-name="icon-orders">
              <div className="fg-b2a182ecf4" data-node-id="858:315" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/14a2e2f2.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:317">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:318" data-name="tab-home" label="خانه" destination="dashboard">
            <div className="fg-1e8a144f74" data-node-id="858:319" data-name="icon-home">
              <div className="fg-b2a182ecf4" data-node-id="858:320" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/727e87a8.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:322">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
