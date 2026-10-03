// Figma 847:2470 — Artist / Credential Replacement — Mobile
import { DesignAction, DesignField, DesignUpload } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistCredentialReplacementMobile() {
  return (
    <div className="fg-228f2c9ae1" data-node-id="847:2470" data-name="Artist / Credential Replacement — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="847:2471" data-name="Status Bar">
        <p className="fg-ec74edce3f" data-node-id="847:2472">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="847:2473" data-name="Status Icons">
          <div className="fg-e73a823889" data-node-id="847:2474" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2c3c2c1c.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="847:2476" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/86d82bd8.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="847:2478" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/f63980d.svg" />
          </div>
        </div>
      </div>
      <div className="fg-1afef469be" data-node-id="847:2480" data-name="Header">
        <div className="fg-c96fe10678" data-node-id="847:2481" data-name="Frame">
          <DesignAction className="fg-9299479f60" data-node-id="847:2482" data-name="Back Button" label="مدارک" destination="professional-credentials">
            <div className="fg-5cca20e57d" data-node-id="847:2550" data-name="chevron-right">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/8428132b.svg" />
            </div>
            <p className="fg-31ac235ce6" dir="auto" data-node-id="847:2484">
              مدارک
            </p>
          </DesignAction>
          <p className="fg-11eee50b43" dir="auto" data-node-id="847:2485">
            جایگزینی مدرک حرفه‌ای
          </p>
        </div>
        <p className="fg-46dca51fd1" dir="auto" data-node-id="847:2486">
          ارسال اختیاری مدرک جدید برای جایگزینی مدرک فعلی
        </p>
      </div>
      <div className="fg-6742a384ae" data-node-id="847:2487" data-name="Content Body">
        <div className="fg-da3edf07dc" data-node-id="847:2488" data-name="Intro Banner">
          <div className="fg-c96fe10678" data-node-id="847:2489" data-name="Frame">
            <div className="fg-2d994197da" data-node-id="847:2490" data-name="Frame">
              <p className="fg-a3692aa1db" dir="auto" data-node-id="847:2491">
                اختیاری
              </p>
            </div>
            <p className="fg-7d346f89f5" dir="auto" data-node-id="847:2492">
              مدرک جدید را جایگزین کن
            </p>
          </div>
          <p className="fg-560e19e6ce" dir="auto" data-node-id="847:2493">
            جایگزینی مدرک اختیاری است. ارسال مدرک جدید به‌خودی‌خود عضویت، فروشگاه، فروش یا سطح رشد را تغییر نمی‌دهد.
          </p>
        </div>
        <div className="fg-36344e1513" data-node-id="847:2494" data-name="Form replacement">
          <p className="fg-a531b28426" dir="auto" data-node-id="847:2495">
            اطلاعات مدرک جایگزین
          </p>
          <div className="fg-011d44306d" data-node-id="847:2496" data-name="Frame">
            <p className="fg-bf30d0c149" dir="auto" data-node-id="847:2497">
              نوع مدرک
            </p>
            <div className="fg-88e8631eaf" data-node-id="847:2498" data-name="Frame">
              <div className="fg-c96fe10678" data-node-id="847:2499" data-name="Frame">
                <p className="fg-c4c392d04c" dir="auto" data-node-id="847:2500">
                  گواهینامه سازمان فنی‌وحرفه‌ای
                </p>
                <div className="fg-58d29b27c0" data-node-id="847:2501" data-name="Ellipse">
                  <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/59ef5b3c.svg" />
                </div>
              </div>
              <div className="fg-c96fe10678" data-node-id="847:2502" data-name="Frame">
                <p className="fg-c4c392d04c" dir="auto" data-node-id="847:2503">
                  مجوز وزارت میراث فرهنگی و صنایع‌دستی
                </p>
                <div className="fg-58d29b27c0" data-node-id="847:2504" data-name="Ellipse">
                  <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c2ba55d1.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-011d44306d" data-node-id="847:2505" data-name="Frame">
            <p className="fg-bf30d0c149" dir="auto" data-node-id="847:2506">
              شماره مدرک / مجوز
            </p>
            <DesignField className="fg-9d132ccfbd" data-node-id="847:2507" data-name="Frame" label="شماره مدرک / مجوز" placeholder="شماره درج‌شده روی مدرک">
              <p className="fg-87a46f802f" dir="auto" data-node-id="847:2508">
                شماره درج‌شده روی مدرک
              </p>
            </DesignField>
          </div>
          <div className="fg-011d44306d" data-node-id="847:2509" data-name="Frame">
            <p className="fg-bf30d0c149" dir="auto" data-node-id="847:2510">
              تاریخ اعتبار
            </p>
            <DesignField className="fg-9d132ccfbd" data-node-id="847:2511" data-name="Frame" label="تاریخ اعتبار" placeholder="تاریخ پایان اعتبار مدرک جایگزین">
              <p className="fg-87a46f802f" dir="auto" data-node-id="847:2512">
                تاریخ پایان اعتبار مدرک جایگزین
              </p>
            </DesignField>
          </div>
          <div className="fg-011d44306d" data-node-id="847:2513" data-name="Frame">
            <p className="fg-bf30d0c149" dir="auto" data-node-id="847:2514">
              فایل مدرک جدید
            </p>
            <div className="fg-3dbd85002b" data-node-id="847:2515" data-name="Frame">
              <p className="fg-da2d5fb183" dir="auto" data-node-id="847:2516">
                بارگذاری تصویر یا فایل مدرک جدید
              </p>
              <p className="fg-31ed27ccd8" dir="auto" data-node-id="847:2517">
                فایل خوانا و کامل از مدرک جایگزین
              </p>
              <DesignUpload className="fg-24e0a26911" data-node-id="847:2518" data-name="Upload Button" preserveLayout label="انتخاب فایل">
                <p className="fg-31ac235ce6" dir="auto" data-node-id="847:2519">
                  انتخاب فایل
                </p>
              </DesignUpload>
            </div>
          </div>
        </div>
        <DesignAction className="fg-9ca136d176" data-node-id="847:2520" data-name="Warning Note" label="جایگزینی مدرک هم اختیاری است اگر مدرک فعلی برایت کافی است، می‌توانی بدون هیچ تغییری ادامه دهی. جایگزینی فقط برای به‌روزرسانی اعتبار حرفه‌ای و نشان تأیید انجام می‌شود و به عضویت یا سطح رشد وابسته نیست." destination="credential-under-review">
          <p className="fg-34cd42c54b" dir="auto" data-node-id="847:2521">
            جایگزینی مدرک هم اختیاری است
          </p>
          <p className="fg-233ec00607" dir="auto" data-node-id="847:2522">
            اگر مدرک فعلی برایت کافی است، می‌توانی بدون هیچ تغییری ادامه دهی. جایگزینی فقط برای به‌روزرسانی اعتبار حرفه‌ای و نشان تأیید انجام می‌شود و به عضویت یا سطح رشد وابسته نیست.
          </p>
        </DesignAction>
        <div className="fg-f87dcc3d37" data-node-id="847:2523" data-name="Actions Box">
          <p className="fg-415cfcd138" dir="auto" data-node-id="847:2524">
            پس از ارسال مدرک، «جایگزین» درخواست جدید با وضعیت «در حال بررسی» ثبت می‌شود.
          </p>
          <div className="fg-fbb5fbd514" data-node-id="847:2525" data-name="Frame">
            <DesignAction className="fg-b16c7dd938" data-node-id="847:2526" data-name="Negarin / Button" label="انصراف" destination="professional-credentials">
              <p className="fg-bf29e071b6" dir="auto" data-node-id="I847:2526;46:53">
                انصراف
              </p>
            </DesignAction>
            <DesignAction className="fg-c0c04ac187" data-node-id="847:2529" data-name="Negarin / Button" label="ارسال برای بررسی" destination="credential-under-review">
              <p className="fg-7ee08abcb6" dir="auto" data-node-id="I847:2529;45:11">
                ارسال برای بررسی
              </p>
            </DesignAction>
          </div>
        </div>
      </div>
      <MobileNavigation className="fg-0146312cb0" data-node-id="863:282" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="863:283" data-name="nav-items-container">
          <DesignAction className="fg-5cce6a5a00" data-node-id="863:284" data-name="tab-account" label="حساب" destination="account">
            <div className="fg-14f6aaa9d9" data-node-id="863:285" data-name="active-indicator" />
            <div className="fg-b2a182ecf4" data-node-id="863:286" data-name="icon-account">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/dd821e5a.svg" />
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="863:288">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="863:289" data-name="tab-opportunities" label="فرصت‌ها" destination="opportunities">
            <div className="fg-b2a182ecf4" data-node-id="863:290" data-name="icon-opps">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/24ebfc4d.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="863:292">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="863:293" data-name="tab-products" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="863:294" data-name="icon-products">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/74287368.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="863:296">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="863:297" data-name="tab-orders" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="863:298" data-name="icon-orders">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/73e7ac87.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="863:300">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="863:301" data-name="tab-home" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="863:302" data-name="icon-home">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c24317eb.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="863:304">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
      <div className="fg-b572f8f866" data-node-id="847:2532" data-name="Android / Gesture Navigation Area">
        <div className="fg-6351c51b08" data-node-id="847:2533" data-name="Android / Gesture Bar" />
      </div>
    </div>
  );
}
