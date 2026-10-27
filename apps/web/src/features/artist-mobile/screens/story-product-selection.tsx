// Figma 858:617 — Artist / Story Product Selection — Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistStoryProductSelectionMobile() {
  return (
    <div className="fg-edd573f1d7" data-node-id="858:617" data-name="Artist / Story Product Selection — Mobile">
      <div className="fg-153c0a1809" data-node-id="858:618" data-name="top-sticky">
        <div className="fg-aaf8c1e790" data-node-id="858:619" data-name="Status Bar">
          <p className="fg-ec74edce3f" data-node-id="858:620">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="858:621" data-name="Frame">
            <div className="fg-e73a823889" data-node-id="858:622" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/833c5160.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="858:624" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/1f7e5c02.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="858:626" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c369042f.svg" />
            </div>
          </div>
        </div>
        <div className="fg-1afef469be" data-node-id="858:628" data-name="Header">
          <div className="fg-c96fe10678" data-node-id="858:629" data-name="Frame">
            <DesignAction className="fg-2c9e8a1c8a" data-node-id="858:630" data-name="back-btn" label="بازگشت" destination="story-editor">
              <div className="fg-15cc5ceed7" data-node-id="858:718">
                <div className="fg-c23fd9c194">
                  <div className="fg-f14442793f" data-name="chevron-left">
                    <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/828db915.svg" />
                  </div>
                </div>
              </div>
            </DesignAction>
            <p className="fg-11eee50b43" dir="auto" data-node-id="858:632">
              انتخاب محصول
            </p>
            <div className="fg-f84de76785" data-node-id="858:633" data-name="Frame" />
          </div>
          <p className="fg-2ec3a12418" dir="auto" data-node-id="858:634">
            محصول مرتبط با این روایت را انتخاب کن
          </p>
        </div>
      </div>
      <div className="fg-094a029af2" data-node-id="858:635" data-name="scrollable-content">
        <div className="fg-c808f3ea15" data-node-id="858:636" data-name="search-bar">
          <p className="fg-4560c542b9" dir="auto" data-node-id="858:637">
            جست‌وجوی نام محصول…
          </p>
        </div>
        <div className="fg-ab493c410b" data-node-id="858:638" data-name="product-selector-list">
          <DesignChoice className="fg-279034fcd7" data-node-id="858:639" data-name="option-empty" label="بدون محصول مرتبط (روایت کلی)" group="product-selector-list" initial={false}>
            <div className="fg-e09c3d448f" data-node-id="858:640" data-name="radio-unselected" />
            <p className="fg-63174a1a4b" dir="auto" data-node-id="858:641">
              بدون محصول مرتبط (روایت کلی)
            </p>
          </DesignChoice>
          <div className="fg-e8ae9cc9c1" data-node-id="858:642" data-name="product-option-1">
            <DesignChoice className="fg-b2a182ecf4" data-node-id="858:643" data-name="radio-selected" label="radio-selected" group="product-option-1" initial={false}>
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/74ded7a6.svg" />
            </DesignChoice>
            <div className="fg-6bf18d6b1a" data-node-id="858:645" data-name="Frame">
              <div className="fg-ef1c18a4d5" data-node-id="858:646" data-name="Frame">
                <p className="fg-80f54b1ead" dir="auto" data-node-id="858:647">
                  بشقاب میناکاری طرح شاه‌عباسی
                </p>
                <p className="fg-14435892cd" dir="auto" data-node-id="858:648">
                  ۲,۴۵۰,۰۰۰ تومان • منتشرشده
                </p>
              </div>
              <div className="fg-aed9492ac2" data-node-id="858:649" data-name="Rectangle">
                <img alt="" className="fg-baf1000bd5" src="/artist-mobile-assets/3eefd396.png" />
              </div>
            </div>
          </div>
          <DesignChoice className="fg-73e0673dfe" data-node-id="858:650" data-name="product-option-2" label="کیف سوزندوزی بلوچ ۱,۸۹۰,۰۰۰ تومان • پیش‌نویس" group="product-selector-list" initial={false}>
            <div className="fg-e09c3d448f" data-node-id="858:651" data-name="radio-unselected" />
            <div className="fg-6bf18d6b1a" data-node-id="858:652" data-name="Frame">
              <div className="fg-ef1c18a4d5" data-node-id="858:653" data-name="Frame">
                <p className="fg-80f54b1ead" dir="auto" data-node-id="858:654">
                  کیف سوزندوزی بلوچ
                </p>
                <p className="fg-14435892cd" dir="auto" data-node-id="858:655">
                  ۱,۸۹۰,۰۰۰ تومان • پیش‌نویس
                </p>
              </div>
              <div className="fg-aed9492ac2" data-node-id="858:656" data-name="Rectangle">
                <img alt="" className="fg-baf1000bd5" src="/artist-mobile-assets/8ca41c3f.png" />
              </div>
            </div>
          </DesignChoice>
          <DesignChoice className="fg-73e0673dfe" data-node-id="858:657" data-name="product-option-3" label="گلدان سفالی میناکاری ۹۸۰,۰۰۰ تومان • منتشرشده" group="product-selector-list" initial={false}>
            <div className="fg-e09c3d448f" data-node-id="858:658" data-name="radio-unselected" />
            <div className="fg-6bf18d6b1a" data-node-id="858:659" data-name="Frame">
              <div className="fg-ef1c18a4d5" data-node-id="858:660" data-name="Frame">
                <p className="fg-80f54b1ead" dir="auto" data-node-id="858:661">
                  گلدان سفالی میناکاری
                </p>
                <p className="fg-14435892cd" dir="auto" data-node-id="858:662">
                  ۹۸۰,۰۰۰ تومان • منتشرشده
                </p>
              </div>
              <div className="fg-aed9492ac2" data-node-id="858:663" data-name="Rectangle">
                <img alt="" className="fg-baf1000bd5" src="/artist-mobile-assets/3eefd396.png" />
              </div>
            </div>
          </DesignChoice>
        </div>
        <div className="fg-153c0a1809" data-node-id="858:664" data-name="selection-actions">
          <DesignAction className="fg-7902cb33b7" data-node-id="858:665" data-name="Negarin / Button" label="تأیید انتخاب" destination="story-editor">
            <p className="fg-d1070e8258" dir="auto" data-node-id="I858:665;45:11">
              تأیید انتخاب
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-9d3091e236" data-node-id="858:668" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="858:669" data-name="nav-items-container">
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:670" data-name="tab-account" label="حساب" destination="account">
            <div className="fg-14f6aaa9d9" data-node-id="858:671" data-name="active-indicator" />
            <div className="fg-1e8a144f74" data-node-id="858:672" data-name="icon-account">
              <div className="fg-b2a182ecf4" data-node-id="858:673" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/406b678a.svg" />
              </div>
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="858:675">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:676" data-name="tab-opps" label="فرصت‌ها" destination="opportunities">
            <div className="fg-1e8a144f74" data-node-id="858:677" data-name="icon-opps">
              <div className="fg-b2a182ecf4" data-node-id="858:678" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/ce802009.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:680">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:681" data-name="tab-products" label="محصولات" destination="products">
            <div className="fg-1e8a144f74" data-node-id="858:682" data-name="icon-products">
              <div className="fg-b2a182ecf4" data-node-id="858:683" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/93bef7e4.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:685">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:686" data-name="tab-orders" label="سفارش‌ها" destination="orders">
            <div className="fg-1e8a144f74" data-node-id="858:687" data-name="icon-orders">
              <div className="fg-b2a182ecf4" data-node-id="858:688" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/f32d1e74.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:690">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:691" data-name="tab-home" label="خانه" destination="dashboard">
            <div className="fg-1e8a144f74" data-node-id="858:692" data-name="icon-home">
              <div className="fg-b2a182ecf4" data-node-id="858:693" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c77d2cb4.svg" />
              </div>
            </div>
            <p className="fg-c3e61902e3" dir="auto" data-node-id="858:695">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
