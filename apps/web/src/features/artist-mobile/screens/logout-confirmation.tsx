// Figma 858:1400 — Artist / Logout Confirmation — Mobile
import { DesignAction, DesignDialog } from "../../artist/design-controls";

export default function ArtistLogoutConfirmationMobile() {
  return (
    <div className="fg-7f00553c2d" data-node-id="858:1400" data-name="Artist / Logout Confirmation — Mobile">
      <div className="fg-4930aac44d" data-node-id="858:1401" data-name="Background Simulated Account Screen" inert>
        <div className="fg-aaf8c1e790" data-node-id="858:1402" data-name="Status Bar">
          <p className="fg-ec74edce3f" data-node-id="858:1403">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="858:1404" data-name="Frame">
            <div className="fg-e73a823889" data-node-id="858:1405" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="858:1407" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/1495e939.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="858:1409" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/5e7c5ab5.svg" />
            </div>
          </div>
        </div>
        <div className="fg-cfc8ee6bd5" data-node-id="858:1411" data-name="Profile Banner">
          <div className="fg-f913b1a7dc" data-node-id="858:1412" data-name="Frame">
            <div className="fg-a51d8ba84b" data-node-id="858:1413" data-name="Artist Avatar" />
            <div className="fg-d6017ef577" data-node-id="858:1414" data-name="Frame">
              <p className="fg-130c7bbccd" dir="auto" data-node-id="858:1415">
                زهرا محمدی
              </p>
              <p className="fg-928c763e23" dir="auto" data-node-id="858:1416">
                سطح رشد: جوانه · عضویت فعال
              </p>
            </div>
          </div>
        </div>
        <div className="fg-6742a384ae" data-node-id="858:1417" data-name="Simulated Items">
          <div className="fg-2b1aa870d7" data-node-id="858:1418" data-name="Rectangle" />
          <div className="fg-add06d778d" data-node-id="858:1419" data-name="Rectangle" />
        </div>
      </div>
      <div className="fg-c713dd6192" data-node-id="858:1420" data-name="Rectangle" />
      <DesignDialog className="fg-9ee1ef986a" data-node-id="858:1421" data-name="Logout Bottom Sheet" label="Artist / Logout Confirmation — Mobile" closeDestination="account">
        <div className="fg-736a2c1e7e" data-node-id="858:1422" data-name="Frame">
          <div className="fg-e715e0327d" data-node-id="858:1423" data-name="Rectangle" />
        </div>
        <div className="fg-d9dd2e5a1f" data-node-id="858:1424" data-name="Frame">
          <p className="fg-b87e3ab864" dir="auto" data-node-id="858:1425">
            خروج از حساب کاربری
          </p>
          <p className="fg-24eac3a943" dir="auto" data-node-id="858:1426">
            آیا مایلید از حساب خود در سامانه نگارین خارج شوید؟ برای ورود مجدد نیاز به دریافت پیامک کد تایید خواهید داشت.
          </p>
        </div>
        <div className="fg-4418723840" data-node-id="858:1427" data-name="Frame">
          <DesignAction className="fg-a900263ddf" data-node-id="858:1428" data-name="Negarin / Button" label="بله، خروج از حساب">
            <p className="fg-406152466a" dir="auto" data-node-id="I858:1428;45:11">
              بله، خروج از حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-757a28680d" data-node-id="858:1431" data-name="Negarin / Button" label="انصراف و ماندن" destination="account">
            <p className="fg-bf29e071b6" dir="auto" data-node-id="I858:1431;46:17">
              انصراف و ماندن
            </p>
          </DesignAction>
        </div>
      </DesignDialog>
    </div>
  );
}
