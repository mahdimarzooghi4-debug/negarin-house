import { DesignField } from "../../artist/design-controls";
// Figma 858:1243 — Artist / Edit Profile — Mobile
import { DesignAction } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistEditProfileMobile() {
  return (
    <div className="fg-7f00553c2d" data-node-id="858:1243" data-name="Artist / Edit Profile — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="858:1244" data-name="Status Bar">
        <p className="fg-ec74edce3f" data-node-id="858:1245">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="858:1246" data-name="Frame">
          <div className="fg-e73a823889" data-node-id="858:1247" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="858:1249" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/1495e939.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="858:1251" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/5e7c5ab5.svg" />
          </div>
        </div>
      </div>
      <div className="fg-96664a729c" data-node-id="858:1253" data-name="Header">
        <div className="fg-c96fe10678" data-node-id="858:1254" data-name="Frame">
          <DesignAction className="fg-46bbc80874" data-node-id="858:1255" data-name="Back Chevron" label="بازگشت" destination="account">
            <div className="fg-962a796ef6" data-node-id="858:1504" data-name="chevron-left">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/e374b517.svg" />
            </div>
          </DesignAction>
          <p className="fg-11eee50b43" dir="auto" data-node-id="858:1257">
            ویرایش اطلاعات
          </p>
          <div className="fg-eaa60f1c42" data-node-id="858:1258" data-name="Frame" />
        </div>
      </div>
      <div className="fg-31849ffb1e" data-node-id="858:1259" data-name="Content">
        <div className="fg-329882efb1" data-node-id="858:1260" data-name="Frame">
          <div className="fg-46df4811e5" data-node-id="858:1261" data-name="Artist Avatar Large">
            <img alt="" className="fg-6296272086" src="/artist-mobile-assets/016df151.png" />
          </div>
          <p className="fg-7c79984bbb" dir="auto" data-node-id="858:1263">
            تغییر تصویر
          </p>
        </div>
        <div className="fg-d6f889b3e9" data-node-id="858:1264" data-name="Frame">
          <div className="fg-011d44306d" data-node-id="858:1265" data-name="Frame">
            <p className="fg-62649dea4d" dir="auto" data-node-id="858:1266">
              نام هنرمند / نام نمایشی غرفه
            </p>
            <DesignField className="fg-ec094056d0" data-node-id="858:1267" data-name="Frame" label="نام هنرمند / نام نمایشی غرفه" placeholder="زهرا محمدی">
              <p className="fg-80df9777bf" dir="auto" data-node-id="858:1268">
                زهرا محمدی
              </p>
            </DesignField>
          </div>
          <div className="fg-011d44306d" data-node-id="858:1269" data-name="Frame">
            <p className="fg-349ae70dcd" dir="auto" data-node-id="858:1270">
              شماره موبایل (غیرقابل تغییر)
            </p>
            <div className="fg-cfd266a0fe" data-node-id="858:1271" data-name="Frame">
              <div className="fg-5cca20e57d" data-node-id="858:1507" data-name="lock">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/fa577ad0.svg" />
              </div>
              <p className="fg-6b3f9e6ce4" data-node-id="858:1273">
                ۰۹۱۲***۴۵۶۷
              </p>
            </div>
          </div>
        </div>
        <div className="fg-58b06eae44" data-node-id="858:1274" data-name="Frame">
          <div className="fg-c51752dc8c" data-node-id="858:1510" data-name="info">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/1a6d601d.svg" />
          </div>
          <p className="fg-f58269b4ce" dir="auto" data-node-id="858:1276">
            تغییر نام و اطلاعات رسمی غرفه ممکن است نیاز به بررسی مجدد کارشناسان نگارین و تأیید مدارک جدید داشته باشد.
          </p>
        </div>
        <div className="fg-4418723840" data-node-id="858:1277" data-name="Frame">
          <DesignAction className="fg-a900263ddf" data-node-id="858:1278" data-name="Negarin / Button" label="ذخیره تغییرات">
            <p className="fg-d1070e8258" dir="auto" data-node-id="I858:1278;45:11">
              ذخیره تغییرات
            </p>
          </DesignAction>
          <DesignAction className="fg-757a28680d" data-node-id="858:1281" data-name="Negarin / Button" label="انصراف" destination="account">
            <p className="fg-bf29e071b6" dir="auto" data-node-id="I858:1281;46:17">
              انصراف
            </p>
          </DesignAction>
        </div>
      </div>
      <MobileNavigation className="fg-0146312cb0" data-node-id="858:1284" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="858:1285" data-name="nav-items-container">
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1286" data-name="tab-account" label="حساب" destination="account">
            <div className="fg-14f6aaa9d9" data-node-id="858:1287" data-name="active-indicator" />
            <div className="fg-b2a182ecf4" data-node-id="858:1288" data-name="icon-account">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/6682d7f2.svg" />
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="858:1290">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1291" data-name="tab-opportunities" label="فرصت‌ها" destination="opportunities">
            <div className="fg-b2a182ecf4" data-node-id="858:1292" data-name="icon-opps">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/16629c35.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="858:1294">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1295" data-name="tab-products" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="858:1296" data-name="icon-products">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c5bac744.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="858:1298">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1299" data-name="tab-orders" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="858:1300" data-name="icon-orders">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/027c66f1.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="858:1302">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1303" data-name="tab-home" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="858:1304" data-name="icon-home">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/f070d35f.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="858:1306">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
