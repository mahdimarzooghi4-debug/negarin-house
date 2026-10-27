// Figma 840:1100 — Artist / Product Changes Review — Confirmation — Mobile
import { DesignAction, DesignDialog } from "../../artist/design-controls";

export default function ArtistProductChangesReviewConfirmationMobile() {
  return (
    <div className="fg-d37209cb37" data-node-id="840:1100" data-name="Artist / Product Changes Review — Confirmation — Mobile">
      <div className="fg-ba504c440d" data-node-id="840:1101" data-name="Status Bar" inert>
        <p className="fg-ec74edce3f" data-node-id="840:1102">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="840:1103" data-name="Status Icons">
          <div className="fg-e73a823889" data-node-id="840:1104" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/f6c2f779.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="840:1106" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/604f5baa.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="840:1108" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/9a227b09.svg" />
          </div>
        </div>
      </div>
      <div className="fg-e2d6ec8fad" data-node-id="840:1110" data-name="Form_Context_Dimmed" inert>
        <div className="fg-96664a729c" data-node-id="840:1111" data-name="Header">
          <DesignAction className="fg-c96fe10678" data-node-id="840:1112" data-name="Frame" label="ویرایش محصول" destination="product-editor">
            <div className="fg-2d3663d59a" data-node-id="840:1113" data-name="Frame" />
            <p className="fg-11eee50b43" dir="auto" data-node-id="840:1114">
              ویرایش محصول
            </p>
          </DesignAction>
        </div>
        <DesignAction className="fg-236159d87e" data-node-id="840:1115" data-name="Draft_Notice_Dummy" label="پیش‌نویس محصول آماده ذخیره است" destination="product-changes-review-status">
          <p className="fg-4f4bf82b78" dir="auto" data-node-id="840:1116">
            پیش‌نویس محصول آماده ذخیره است
          </p>
        </DesignAction>
        <div className="fg-c2fd84b4b9" data-node-id="840:1117" data-name="Card_Dummy" />
      </div>
      <div className="fg-30a3c0c4c8" data-node-id="840:1118" data-name="Scrim_Overlay" inert>
        <DesignDialog className="fg-41a0751a1b" data-node-id="840:1119" data-name="Bottom_Sheet" label="Artist / Product Changes Review — Confirmation — Mobile" closeDestination="product-editor-edit-published">
          <div className="fg-e520bea30b" data-node-id="840:1120" data-name="Frame">
            <div className="fg-8ccbac8b7b" data-node-id="840:1121" data-name="Rectangle" />
          </div>
          <div className="fg-47aacf6d1d" data-node-id="840:1122" data-name="Frame">
            <div className="fg-bbd89e5837" data-node-id="840:1123" data-name="Frame">
              <p className="fg-b49203a995" data-node-id="840:1124">
                ✓
              </p>
            </div>
            <p className="fg-98c9cea4d1" dir="auto" data-node-id="840:1125">
              ارسال تغییرات برای بررسی؟
            </p>
          </div>
          <p className="fg-56a4577600" dir="auto" data-node-id="840:1126">
            این محصول منتشرشده تغییرات مهم دارد. با تأیید، نسخه تغییرکرده برای بررسی نگارین ارسال می‌شود و نسخه فعلی عمومی تا تأیید نهایی بدون تغییر می‌ماند.
          </p>
          <div className="fg-dd330a06df" data-node-id="840:1127" data-name="Frame">
            <div className="fg-dda75386be" data-node-id="840:1128" data-name="Rectangle">
              <img alt="" className="fg-3cf40fed90" src="/artist-mobile-assets/ca6ed47b.png" />
            </div>
            <div className="fg-1e0456ea49" data-node-id="840:1129" data-name="Frame">
              <p className="fg-315b860373" dir="auto" data-node-id="840:1130">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
              <div className="fg-6a233c377e" data-node-id="840:1131" data-name="Frame">
                <div className="fg-94e999359d" data-node-id="840:1132" data-name="Frame">
                  <p className="fg-dfc8458928" dir="auto" data-node-id="840:1133">
                    تغییر مهم
                  </p>
                </div>
                <p className="fg-a7cd4a14c6" dir="auto" data-node-id="840:1134">
                  محصول منتشرشده
                </p>
              </div>
            </div>
          </div>
          <div className="fg-62f39da6b2" data-node-id="840:1135" data-name="Frame">
            <DesignAction className="fg-7902cb33b7" data-node-id="840:1136" data-name="Negarin / Button" label="ارسال تغییرات برای بررسی">
              <p className="fg-e370cbda69" dir="auto" data-node-id="I840:1136;45:11">
                ارسال تغییرات برای بررسی
              </p>
            </DesignAction>
            <DesignAction className="fg-3651dc4f5f" data-node-id="840:1139" data-name="Negarin / Button" label="انصراف" destination="product-editor-edit-published">
              <p className="fg-8d74a5732e" dir="auto" data-node-id="I840:1139;46:53">
                انصراف
              </p>
            </DesignAction>
          </div>
          <p className="fg-bee20572d8" dir="auto" data-node-id="840:1142">
            بعد از ارسال، وضعیت بررسی تغییرات از بخش محصولات قابل پیگیری است.
          </p>
        </DesignDialog>
      </div>
    </div>
  );
}
