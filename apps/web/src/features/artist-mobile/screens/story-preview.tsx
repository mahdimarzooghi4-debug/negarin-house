// Figma 858:323 — Artist / Story Preview — Mobile
import { DesignAction } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistStoryPreviewMobile() {
  return (
    <div className="fg-edd573f1d7" data-node-id="858:323" data-name="Artist / Story Preview — Mobile">
      <div className="fg-153c0a1809" data-node-id="858:324" data-name="top-sticky">
        <div className="fg-aaf8c1e790" data-node-id="858:325" data-name="Status Bar">
          <p className="fg-ec74edce3f" data-node-id="858:326">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="858:327" data-name="Frame">
            <div className="fg-e73a823889" data-node-id="858:328" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/fdc7e650.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="858:330" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/e42dc36e.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="858:332" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/6773a373.svg" />
            </div>
          </div>
        </div>
        <div className="fg-1afef469be" data-node-id="858:334" data-name="Header">
          <div className="fg-c96fe10678" data-node-id="858:335" data-name="Frame">
            <DesignAction className="fg-2c9e8a1c8a" data-node-id="858:336" data-name="back-btn" label="بازگشت" destination="story-editor">
              <div className="fg-15cc5ceed7" data-node-id="858:703">
                <div className="fg-c23fd9c194">
                  <div className="fg-f14442793f" data-name="chevron-left">
                    <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/828db915.svg" />
                  </div>
                </div>
              </div>
            </DesignAction>
            <p className="fg-11eee50b43" dir="auto" data-node-id="858:338">
              پیش‌نمایش روایت
            </p>
            <div className="fg-f84de76785" data-node-id="858:339" data-name="Frame" />
          </div>
          <p className="fg-2ec3a12418" dir="auto" data-node-id="858:340">
            پیش‌نمایش قبل از انتشار نهایی
          </p>
        </div>
      </div>
      <div className="fg-094a029af2" data-node-id="858:341" data-name="scrollable-content">
        <div className="fg-5516adab5a" data-node-id="858:342" data-name="preview-notice">
          <p className="fg-20923647df" dir="auto" data-node-id="858:343">
            پیش‌نمایش — این نمایش قبل از انتشار است
          </p>
        </div>
        <div className="fg-3e11cb24f6" data-node-id="858:344" data-name="preview-card">
          <div className="fg-c96fe10678" data-node-id="858:345" data-name="header-artist">
            <div className="fg-9eae8902b4" data-node-id="858:346" data-name="Frame">
              <p className="fg-de8fba3b9f" dir="auto" data-node-id="858:347">
                زهرا محمدی
              </p>
              <div className="fg-c51752dc8c" data-node-id="858:348" data-name="verified">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/817882df.svg" />
              </div>
            </div>
            <div className="fg-7aa28c3629" data-node-id="858:351" data-name="avatar">
              <img alt="" className="fg-8b28323869" src="/artist-mobile-assets/e50f7a33.png" />
            </div>
          </div>
          <div className="fg-ab2d1e680d" data-node-id="858:352" data-name="media-frame">
            <div className="fg-19efab1ec1" data-node-id="858:742" data-name="play-circle">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/d83183d4.svg" />
            </div>
          </div>
          <p className="fg-2731f04bd6" dir="auto" data-node-id="858:354">
            روایت ویدیویی از فرایند ساخت اثر؛ متن نهایی پس از تکمیل فرم در این بخش دیده می‌شود.
          </p>
        </div>
        <p className="fg-af5b71f9d9" dir="auto" data-node-id="858:355">
          روایت پس از انتشار در شبکه نگارین نمایش داده می‌شود
        </p>
        <div className="fg-ab493c410b" data-node-id="858:356" data-name="preview-actions">
          <DesignAction className="fg-7902cb33b7" data-node-id="858:357" data-name="Negarin / Button" label="انتشار روایت" destination="story-published">
            <p className="fg-d1070e8258" dir="auto" data-node-id="I858:357;45:11">
              انتشار روایت
            </p>
          </DesignAction>
          <DesignAction className="fg-60c3fad335" data-node-id="858:360" data-name="Negarin / Button" label="بازگشت به ویرایش" destination="story-editor">
            <p className="fg-bf29e071b6" dir="auto" data-node-id="I858:360;46:17">
              بازگشت به ویرایش
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-9d3091e236" data-node-id="858:363" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="858:364" data-name="nav-items-container">
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:365" data-name="tab-account" label="حساب" destination="account">
            <div className="fg-14f6aaa9d9" data-node-id="858:366" data-name="active-indicator" />
            <div className="fg-1e8a144f74" data-node-id="858:367" data-name="icon-account">
              <div className="fg-b2a182ecf4" data-node-id="858:368" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/34a017a2.svg" />
              </div>
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="858:370">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:371" data-name="tab-opps" label="فرصت‌ها" destination="opportunities">
            <div className="fg-1e8a144f74" data-node-id="858:372" data-name="icon-opps">
              <div className="fg-b2a182ecf4" data-node-id="858:373" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/4c76455d.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:375">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:376" data-name="tab-products" label="محصولات" destination="products">
            <div className="fg-1e8a144f74" data-node-id="858:377" data-name="icon-products">
              <div className="fg-b2a182ecf4" data-node-id="858:378" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/23f3726e.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:380">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:381" data-name="tab-orders" label="سفارش‌ها" destination="orders">
            <div className="fg-1e8a144f74" data-node-id="858:382" data-name="icon-orders">
              <div className="fg-b2a182ecf4" data-node-id="858:383" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/bb5a4804.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:385">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:386" data-name="tab-home" label="خانه" destination="dashboard">
            <div className="fg-1e8a144f74" data-node-id="858:387" data-name="icon-home">
              <div className="fg-b2a182ecf4" data-node-id="858:388" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/72fb8f7c.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:390">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
