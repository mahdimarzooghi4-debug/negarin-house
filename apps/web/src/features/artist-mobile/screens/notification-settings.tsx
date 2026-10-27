import { DesignChoice } from "../../artist/design-controls";
// Figma 858:1307 — Artist / Notification Settings — Mobile
import { DesignAction } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function ArtistNotificationSettingsMobile() {
  return (
    <div className="fg-7f00553c2d" data-node-id="858:1307" data-name="Artist / Notification Settings — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="858:1308" data-name="Status Bar">
        <p className="fg-ec74edce3f" data-node-id="858:1309">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="858:1310" data-name="Frame">
          <div className="fg-e73a823889" data-node-id="858:1311" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="858:1313" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/1495e939.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="858:1315" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/5e7c5ab5.svg" />
          </div>
        </div>
      </div>
      <div className="fg-1afef469be" data-node-id="858:1317" data-name="Header">
        <div className="fg-c96fe10678" data-node-id="858:1318" data-name="Frame">
          <DesignAction className="fg-46bbc80874" data-node-id="858:1319" data-name="Back Chevron" label="بازگشت" destination="account">
            <div className="fg-962a796ef6" data-node-id="858:1513" data-name="chevron-left">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/e374b517.svg" />
            </div>
          </DesignAction>
          <p className="fg-11eee50b43" dir="auto" data-node-id="858:1321">
            تنظیمات اعلان‌ها
          </p>
          <div className="fg-eaa60f1c42" data-node-id="858:1322" data-name="Frame" />
        </div>
        <p className="fg-46dca51fd1" dir="auto" data-node-id="858:1323">
          مدیریت اعلان‌های دریافتی غرفه
        </p>
      </div>
      <div className="fg-094a029af2" data-node-id="858:1324" data-name="Content">
        <div className="fg-011d44306d" data-node-id="858:1325" data-name="Frame">
          <p className="fg-c153ec489d" dir="auto" data-node-id="858:1326">
            سفارش‌ها
          </p>
          <div className="fg-d6978f0ecf" data-node-id="858:1327" data-name="Frame">
            <div className="fg-a1e0b00ba3" data-node-id="858:1328" data-name="Frame">
              <DesignChoice className="fg-6409cbf8ab" data-node-id="858:1329" data-name="Toggle Track" label="سفارش جدید غرفه" group="858:1329" multiple initial>
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2a07f39b.svg" />
              </DesignChoice>
              <p className="fg-01af75c3f6" dir="auto" data-node-id="858:1331">
                سفارش جدید غرفه
              </p>
            </div>
            <div className="fg-df0a3de519" data-node-id="858:1332" data-name="Line">
              <div className="fg-cf771a9448">
                <img alt="" className="fg-acc3667e96" src="/artist-mobile-assets/1e636316.svg" />
              </div>
            </div>
            <div className="fg-a1e0b00ba3" data-node-id="858:1333" data-name="Frame">
              <DesignChoice className="fg-6409cbf8ab" data-node-id="858:1334" data-name="Toggle Track" label="به‌روزرسانی وضعیت سفارش" group="858:1334" multiple initial>
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2a07f39b.svg" />
              </DesignChoice>
              <p className="fg-01af75c3f6" dir="auto" data-node-id="858:1336">
                به‌روزرسانی وضعیت سفارش
              </p>
            </div>
          </div>
        </div>
        <div className="fg-011d44306d" data-node-id="858:1337" data-name="Frame">
          <p className="fg-c153ec489d" dir="auto" data-node-id="858:1338">
            فرصت‌ها
          </p>
          <div className="fg-d6978f0ecf" data-node-id="858:1339" data-name="Frame">
            <div className="fg-a1e0b00ba3" data-node-id="858:1340" data-name="Frame">
              <DesignChoice className="fg-6409cbf8ab" data-node-id="858:1341" data-name="Toggle Track" label="اطلاع‌رسانی فرصت‌های جدید" group="858:1341" multiple initial>
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2a07f39b.svg" />
              </DesignChoice>
              <p className="fg-01af75c3f6" dir="auto" data-node-id="858:1343">
                اطلاع‌رسانی فرصت‌های جدید
              </p>
            </div>
            <div className="fg-df0a3de519" data-node-id="858:1344" data-name="Line">
              <div className="fg-cf771a9448">
                <img alt="" className="fg-acc3667e96" src="/artist-mobile-assets/1e636316.svg" />
              </div>
            </div>
            <div className="fg-a1e0b00ba3" data-node-id="858:1345" data-name="Frame">
              <DesignChoice className="fg-6409cbf8ab" data-node-id="858:1346" data-name="Toggle Track" label="نتیجه بررسی درخواست فرصت" group="858:1346" multiple initial>
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2a07f39b.svg" />
              </DesignChoice>
              <p className="fg-01af75c3f6" dir="auto" data-node-id="858:1348">
                نتیجه بررسی درخواست فرصت
              </p>
            </div>
          </div>
        </div>
        <div className="fg-011d44306d" data-node-id="858:1349" data-name="Frame">
          <p className="fg-c153ec489d" dir="auto" data-node-id="858:1350">
            مالی و تسویه
          </p>
          <div className="fg-d6978f0ecf" data-node-id="858:1351" data-name="Frame">
            <div className="fg-a1e0b00ba3" data-node-id="858:1352" data-name="Frame">
              <DesignChoice className="fg-6409cbf8ab" data-node-id="858:1353" data-name="Toggle Track" label="تغییرات وضعیت تسویه حساب" group="858:1353" multiple initial>
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2a07f39b.svg" />
              </DesignChoice>
              <p className="fg-01af75c3f6" dir="auto" data-node-id="858:1355">
                تغییرات وضعیت تسویه حساب
              </p>
            </div>
            <div className="fg-df0a3de519" data-node-id="858:1356" data-name="Line">
              <div className="fg-cf771a9448">
                <img alt="" className="fg-acc3667e96" src="/artist-mobile-assets/1e636316.svg" />
              </div>
            </div>
            <div className="fg-a1e0b00ba3" data-node-id="858:1357" data-name="Frame">
              <DesignChoice className="fg-6409cbf8ab" data-node-id="858:1358" data-name="Toggle Track" label="پیامک تراکنش جدید مالی" group="858:1358" multiple>
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/bcc8010d.svg" />
              </DesignChoice>
              <p className="fg-01af75c3f6" dir="auto" data-node-id="858:1360">
                پیامک تراکنش جدید مالی
              </p>
            </div>
          </div>
        </div>
        <div className="fg-011d44306d" data-node-id="858:1361" data-name="Frame">
          <p className="fg-c153ec489d" dir="auto" data-node-id="858:1362">
            خدمات و محصولات
          </p>
          <div className="fg-d6978f0ecf" data-node-id="858:1363" data-name="Frame">
            <div className="fg-a1e0b00ba3" data-node-id="858:1364" data-name="Frame">
              <DesignChoice className="fg-6409cbf8ab" data-node-id="858:1365" data-name="Toggle Track" label="یادآوری اعتبارهای خدماتی" group="858:1365" multiple initial>
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2a07f39b.svg" />
              </DesignChoice>
              <p className="fg-01af75c3f6" dir="auto" data-node-id="858:1367">
                یادآوری اعتبارهای خدماتی
              </p>
            </div>
            <div className="fg-df0a3de519" data-node-id="858:1368" data-name="Line">
              <div className="fg-cf771a9448">
                <img alt="" className="fg-acc3667e96" src="/artist-mobile-assets/1e636316.svg" />
              </div>
            </div>
            <div className="fg-a1e0b00ba3" data-node-id="858:1369" data-name="Frame">
              <DesignChoice className="fg-6409cbf8ab" data-node-id="858:1370" data-name="Toggle Track" label="نتیجه ارزیابی و بررسی محصولات" group="858:1370" multiple initial>
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2a07f39b.svg" />
              </DesignChoice>
              <p className="fg-01af75c3f6" dir="auto" data-node-id="858:1372">
                نتیجه ارزیابی و بررسی محصولات
              </p>
            </div>
          </div>
        </div>
        <p className="fg-839bd3457a" dir="auto" data-node-id="858:1373">
          توجه: پیامک‌های سیستمی مانند هشدارهای امنیتی ورود به حساب، کدهای ورود و انقضای تمدید عضویت اضطراری همواره ارسال خواهند شد و قابل غیرفعال‌سازی نیستند.
        </p>
        <DesignAction className="fg-a900263ddf" data-node-id="858:1374" data-name="Negarin / Button" label="ذخیره تنظیمات">
          <p className="fg-d1070e8258" dir="auto" data-node-id="I858:1374;45:11">
            ذخیره تنظیمات
          </p>
        </DesignAction>
      </div>
      <MobileNavigation className="fg-0146312cb0" data-node-id="858:1377" data-name="bottom-nav">
        <div className="fg-732ddba2a9" data-node-id="858:1378" data-name="nav-items-container">
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1379" data-name="tab-account" label="حساب" destination="account">
            <div className="fg-14f6aaa9d9" data-node-id="858:1380" data-name="active-indicator" />
            <div className="fg-b2a182ecf4" data-node-id="858:1381" data-name="icon-account">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/da7377f2.svg" />
            </div>
            <p className="fg-ab7be76e75" dir="auto" data-node-id="858:1383">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1384" data-name="tab-opportunities" label="فرصت‌ها" destination="opportunities">
            <div className="fg-b2a182ecf4" data-node-id="858:1385" data-name="icon-opps">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/6a1694eb.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="858:1387">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1388" data-name="tab-products" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="858:1389" data-name="icon-products">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/209d719c.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="858:1391">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1392" data-name="tab-orders" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="858:1393" data-name="icon-orders">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/96df4f4d.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="858:1395">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="858:1396" data-name="tab-home" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="858:1397" data-name="icon-home">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/9a58a767.svg" />
            </div>
            <p className="fg-79bf9dfa35" dir="auto" data-node-id="858:1399">
              خانه
            </p>
          </DesignAction>
        </div>
      </MobileNavigation>
    </div>
  );
}
