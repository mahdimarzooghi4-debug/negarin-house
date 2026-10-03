// Figma 858:532 — Artist / Story Editor — Edit Published — Mobile
import { DesignAction, DesignChoice, DesignField } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistStoryEditorEditPublishedMobile() {
  return (
    <div className="fg-edd573f1d7" data-node-id="858:532" data-name="Artist / Story Editor — Edit Published — Mobile">
      <div className="fg-153c0a1809" data-node-id="858:533" data-name="top-sticky">
        <div className="fg-aaf8c1e790" data-node-id="858:534" data-name="Status Bar">
          <p className="fg-ec74edce3f" data-node-id="858:535">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="858:536" data-name="Frame">
            <div className="fg-e73a823889" data-node-id="858:537" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/41b84214.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="858:539" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/74ea8bf8.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="858:541" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c420297b.svg" />
            </div>
          </div>
        </div>
        <div className="fg-1afef469be" data-node-id="858:543" data-name="Header">
          <div className="fg-c96fe10678" data-node-id="858:544" data-name="Frame">
            <DesignAction className="fg-2c9e8a1c8a" data-node-id="858:545" data-name="back-btn" label="بازگشت" destination="story-published">
              <div className="fg-15cc5ceed7" data-node-id="858:712">
                <div className="fg-c23fd9c194">
                  <div className="fg-f14442793f" data-name="chevron-left">
                    <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/828db915.svg" />
                  </div>
                </div>
              </div>
            </DesignAction>
            <p className="fg-11eee50b43" dir="auto" data-node-id="858:547">
              ویرایش روایت
            </p>
            <div className="fg-f84de76785" data-node-id="858:548" data-name="Frame" />
          </div>
          <p className="fg-2ec3a12418" dir="auto" data-node-id="858:549">
            ویرایش روایت منتشرشده
          </p>
        </div>
      </div>
      <div className="fg-094a029af2" data-node-id="858:550" data-name="scrollable-content">
        <div className="fg-0ce3dabe75" data-node-id="858:551" data-name="editing-notice">
          <p className="fg-f58269b4ce" dir="auto" data-node-id="858:552">
            تغییرات پس از ذخیره بلافاصله در شبکه نگارین اعمال می‌شود.
          </p>
        </div>
        <div className="fg-62f39da6b2" data-node-id="858:553" data-name="media-type-section">
          <p className="fg-62649dea4d" dir="auto" data-node-id="858:554">
            نوع رسانه
          </p>
          <div className="fg-fbb5fbd514" data-node-id="858:555" data-name="toggles">
            <DesignChoice className="fg-b6a8f1867b" data-node-id="858:556" data-name="toggle-image" label="عکس" group="toggles" initial={false}>
              <p className="fg-5aae26f1a2" dir="auto" data-node-id="858:557">
                عکس
              </p>
              <div className="fg-c51752dc8c" data-node-id="858:715" data-name="image">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/aaea060.svg" />
              </div>
            </DesignChoice>
            <DesignChoice className="fg-7b8ba95a57" data-node-id="858:559" data-name="toggle-video" label="ویدیو" group="toggles" initial={false}>
              <p className="fg-05ebd28202" dir="auto" data-node-id="858:560">
                ویدیو
              </p>
              <div className="fg-c51752dc8c" data-node-id="858:724" data-name="video">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/4f43fe87.svg" />
              </div>
            </DesignChoice>
          </div>
        </div>
        <div className="fg-62f39da6b2" data-node-id="858:562" data-name="media-section">
          <p className="fg-62649dea4d" dir="auto" data-node-id="858:563">
            رسانه بارگذاری‌شده
          </p>
          <div className="fg-8f1d78f5b1" data-node-id="858:564" data-name="upload-zone-filled">
            <div className="fg-c96fe10678" data-node-id="858:565" data-name="Frame">
              <div className="fg-e8210ba625" data-node-id="858:566" data-name="Frame">
                <DesignAction className="fg-eda67a0b31" data-node-id="858:567" data-name="Negarin / Button" label="تغییر فایل">
                  <p className="fg-ff0711159e" dir="auto" data-node-id="I858:567;46:49">
                    تغییر فایل
                  </p>
                </DesignAction>
              </div>
              <div className="fg-ad50363799" data-node-id="858:570" data-name="Frame">
                <p className="fg-ca24398ad6" data-node-id="858:571">
                  video_sample.mp4
                </p>
                <div className="fg-b2a182ecf4" data-node-id="858:727" data-name="video">
                  <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/82bcec13.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fg-62f39da6b2" data-node-id="858:573" data-name="caption-section">
          <p className="fg-62649dea4d" dir="auto" data-node-id="858:574">
            متن روایت
          </p>
          <DesignField className="fg-c5688e1e1b" data-node-id="858:575" data-name="textarea-prefilled" label="textarea-prefilled" placeholder="فرایند لعاب‌کاری و ظرافت‌های مینیاتور روی مس قبل از پخت نهایی در کوره نگارستان. این روایت به محصول متصل است.">
            <p className="fg-2413d59242" dir="auto" data-node-id="858:576">
              فرایند لعاب‌کاری و ظرافت‌های مینیاتور روی مس قبل از پخت نهایی در کوره نگارستان. این روایت به محصول متصل است.
            </p>
          </DesignField>
        </div>
        <div className="fg-62f39da6b2" data-node-id="858:577" data-name="product-link-section">
          <p className="fg-62649dea4d" dir="auto" data-node-id="858:578">
            اتصال به محصول (اختیاری)
          </p>
          <div className="fg-c54c66fac2" data-node-id="858:579" data-name="select-trigger-filled">
            <div className="fg-c51752dc8c" data-node-id="858:733" data-name="chevron-down">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/e60c2229.svg" />
            </div>
            <p className="fg-5aae26f1a2" dir="auto" data-node-id="858:581">
              بشقاب میناکاری طرح شاه‌عباسی
            </p>
          </div>
        </div>
        <div className="fg-ab493c410b" data-node-id="858:582" data-name="edit-actions">
          <DesignAction className="fg-7902cb33b7" data-node-id="858:583" data-name="Negarin / Button" label="ذخیره تغییرات">
            <p className="fg-d1070e8258" dir="auto" data-node-id="I858:583;45:11">
              ذخیره تغییرات
            </p>
          </DesignAction>
          <DesignAction className="fg-60c3fad335" data-node-id="858:586" data-name="Negarin / Button" label="انصراف" destination="story-published">
            <p className="fg-bf29e071b6" dir="auto" data-node-id="I858:586;46:17">
              انصراف
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-9d3091e236" data-node-id="858:589" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="858:590" data-name="nav-items-container">
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:591" data-name="tab-account" label="حساب" destination="account">
            <div className="fg-14f6aaa9d9" data-node-id="858:592" data-name="active-indicator" />
            <div className="fg-1e8a144f74" data-node-id="858:593" data-name="icon-account">
              <div className="fg-b2a182ecf4" data-node-id="858:594" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/5ad8483e.svg" />
              </div>
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="858:596">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:597" data-name="tab-opps" label="فرصت‌ها" destination="opportunities">
            <div className="fg-1e8a144f74" data-node-id="858:598" data-name="icon-opps">
              <div className="fg-b2a182ecf4" data-node-id="858:599" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/927da6e5.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:601">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:602" data-name="tab-products" label="محصولات" destination="products">
            <div className="fg-1e8a144f74" data-node-id="858:603" data-name="icon-products">
              <div className="fg-b2a182ecf4" data-node-id="858:604" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/f609b2e6.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:606">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:607" data-name="tab-orders" label="سفارش‌ها" destination="orders">
            <div className="fg-1e8a144f74" data-node-id="858:608" data-name="icon-orders">
              <div className="fg-b2a182ecf4" data-node-id="858:609" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/67be8c72.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:611">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:612" data-name="tab-home" label="خانه" destination="dashboard">
            <div className="fg-1e8a144f74" data-node-id="858:613" data-name="icon-home">
              <div className="fg-b2a182ecf4" data-node-id="858:614" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c0c93308.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:616">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
