// Figma 858:391 — Artist / Story Draft — Mobile
import { DesignAction } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistStoryDraftMobile() {
  return (
    <div className="fg-edd573f1d7" data-node-id="858:391" data-name="Artist / Story Draft — Mobile">
      <div className="fg-153c0a1809" data-node-id="858:392" data-name="top-sticky">
        <div className="fg-aaf8c1e790" data-node-id="858:393" data-name="Status Bar">
          <p className="fg-ec74edce3f" data-node-id="858:394">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="858:395" data-name="Frame">
            <div className="fg-e73a823889" data-node-id="858:396" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/7561d238.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="858:398" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/26882506.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="858:400" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/7c477c8b.svg" />
            </div>
          </div>
        </div>
        <div className="fg-1afef469be" data-node-id="858:402" data-name="Header">
          <div className="fg-c96fe10678" data-node-id="858:403" data-name="Frame">
            <DesignAction className="fg-2c9e8a1c8a" data-node-id="858:404" data-name="back-btn" label="بازگشت" destination="stories">
              <div className="fg-15cc5ceed7" data-node-id="858:706">
                <div className="fg-c23fd9c194">
                  <div className="fg-f14442793f" data-name="chevron-left">
                    <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/828db915.svg" />
                  </div>
                </div>
              </div>
            </DesignAction>
            <p className="fg-11eee50b43" dir="auto" data-node-id="858:406">
              روایت پیش‌نویس
            </p>
            <div className="fg-f84de76785" data-node-id="858:407" data-name="Frame" />
          </div>
          <p className="fg-2ec3a12418" dir="auto" data-node-id="858:408">
            مدیریت و تکمیل روایت‌های ذخیره شده
          </p>
        </div>
      </div>
      <div className="fg-094a029af2" data-node-id="858:409" data-name="scrollable-content">
        <div className="fg-c96fe10678" data-node-id="858:410" data-name="status-row">
          <p className="fg-b2e13de1fc" dir="auto" data-node-id="858:411">
            آخرین تغییر: ۲ ساعت پیش
          </p>
          <div className="fg-7ebea062a6" data-node-id="858:412" data-name="Frame">
            <p className="fg-216230b279" dir="auto" data-node-id="858:413">
              پیش‌نویس
            </p>
          </div>
        </div>
        <DesignAction className="fg-dd12ed7bfa" data-node-id="858:414" data-name="draft-banner" label="این روایت هنوز منتشر نشده است. برای نمایش در شبکه نگارین، دکمه انتشار روایت را لمس کنید." destination="story-published">
          <p className="fg-ce43ab65eb" dir="auto" data-node-id="858:415">
            این روایت هنوز منتشر نشده است. برای نمایش در شبکه نگارین، دکمه انتشار روایت را لمس کنید.
          </p>
        </DesignAction>
        <div className="fg-7ea8b4c56f" data-node-id="858:416" data-name="draft-content-card">
          <div className="fg-47aacf6d1d" data-node-id="858:417" data-name="media-preview">
            <div className="fg-ef1c18a4d5" data-node-id="858:418" data-name="Frame">
              <p className="fg-bd44308bf8" dir="auto" data-node-id="858:419">
                طرح شاه‌عباسی روی سفال
              </p>
              <p className="fg-14435892cd" dir="auto" data-node-id="858:420">
                نوع رسانه: ویدیو
              </p>
            </div>
            <div className="fg-034963b45a" data-node-id="858:421" data-name="Frame">
              <div className="fg-58d29b27c0" data-node-id="858:745" data-name="play-circle">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/7f8f8d8b.svg" />
              </div>
            </div>
          </div>
          <p className="fg-70ec1c8137" dir="auto" data-node-id="858:423">
            پیش‌نویس متن نهایی مربوط به شیوه پخت کوره و رنگ‌آمیزی سنتی…
          </p>
        </div>
        <div className="fg-ab493c410b" data-node-id="858:424" data-name="draft-actions">
          <DesignAction className="fg-7902cb33b7" data-node-id="858:425" data-name="Negarin / Button" label="انتشار روایت" destination="story-published">
            <p className="fg-d1070e8258" dir="auto" data-node-id="I858:425;45:11">
              انتشار روایت
            </p>
          </DesignAction>
          <DesignAction className="fg-60c3fad335" data-node-id="858:428" data-name="Negarin / Button" label="ویرایش پیش‌نویس">
            <p className="fg-bf29e071b6" dir="auto" data-node-id="I858:428;46:17">
              ویرایش پیش‌نویس
            </p>
          </DesignAction>
          <DesignAction className="fg-9536590778" data-node-id="858:431" data-name="Negarin / Button" label="حذف پیش‌نویس">
            <p className="fg-a608bfd471" dir="auto" data-node-id="I858:431;46:41">
              حذف پیش‌نویس
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-9d3091e236" data-node-id="858:434" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="858:435" data-name="nav-items-container">
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:436" data-name="tab-account" label="حساب" destination="account">
            <div className="fg-14f6aaa9d9" data-node-id="858:437" data-name="active-indicator" />
            <div className="fg-1e8a144f74" data-node-id="858:438" data-name="icon-account">
              <div className="fg-b2a182ecf4" data-node-id="858:439" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/247068ea.svg" />
              </div>
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="858:441">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:442" data-name="tab-opps" label="فرصت‌ها" destination="opportunities">
            <div className="fg-1e8a144f74" data-node-id="858:443" data-name="icon-opps">
              <div className="fg-b2a182ecf4" data-node-id="858:444" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/f25866a1.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:446">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:447" data-name="tab-products" label="محصولات" destination="products">
            <div className="fg-1e8a144f74" data-node-id="858:448" data-name="icon-products">
              <div className="fg-b2a182ecf4" data-node-id="858:449" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/351b9f14.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:451">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:452" data-name="tab-orders" label="سفارش‌ها" destination="orders">
            <div className="fg-1e8a144f74" data-node-id="858:453" data-name="icon-orders">
              <div className="fg-b2a182ecf4" data-node-id="858:454" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/1126896a.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:456">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:457" data-name="tab-home" label="خانه" destination="dashboard">
            <div className="fg-1e8a144f74" data-node-id="858:458" data-name="icon-home">
              <div className="fg-b2a182ecf4" data-node-id="858:459" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/f306344.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:461">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
