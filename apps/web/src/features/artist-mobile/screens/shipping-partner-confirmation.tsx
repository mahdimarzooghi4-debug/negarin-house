// Figma 847:876 — Artist / Shipping Partner Confirmation — Mobile
import { DesignAction, DesignDialog } from "../../artist/design-controls";

export default function ArtistShippingPartnerConfirmationMobile() {
  return (
    <div className="fg-d37209cb37" data-node-id="847:876" data-name="Artist / Shipping Partner Confirmation — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="847:877" data-name="Status Bar" inert>
        <p className="fg-ec74edce3f" data-node-id="847:878">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="847:879" data-name="Status Icons">
          <div className="fg-e73a823889" data-node-id="847:880" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="847:882" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/3027da5b.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="847:884" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2241d5a9.svg" />
          </div>
        </div>
      </div>
      <div className="fg-799f37102e" data-node-id="847:886" data-name="Header" inert>
        <div className="fg-c96fe10678" data-node-id="847:887" data-name="Frame">
          <DesignAction className="fg-aab9086be4" data-node-id="847:888" data-name="Back Button" label="بازگشت" destination="order-shipping-partner-selection">
            <div className="fg-c51752dc8c" data-node-id="847:1150" data-name="chevron-right">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/c83e1f65.svg" />
            </div>
          </DesignAction>
          <p className="fg-11eee50b43" dir="auto" data-node-id="847:890">
            انتخاب همکار ارسال
          </p>
        </div>
        <p className="fg-46dca51fd1" dir="auto" data-node-id="847:891">
          همکار حمل را انتخاب کن
        </p>
      </div>
      <DesignAction className="fg-68513bb7cf" data-node-id="847:892" data-name="Background Mockup Content" label="ست پذیرایی دست‌ساز طرح فیروزه" destination="order-shipping-partner-selection" inert>
        <div className="fg-908cd90da1" data-node-id="847:893" data-name="Hero Block Mock">
          <p className="fg-c65d257723" dir="auto" data-node-id="847:894">
            ست پذیرایی دست‌ساز طرح فیروزه
          </p>
        </div>
      </DesignAction>
      <div className="fg-83e21fd3cf" data-node-id="847:895" data-name="Frame" inert>
        <DesignDialog className="fg-87e75ca692" data-node-id="847:896" data-name="Shipping Partner Bottom Sheet" label="Artist / Shipping Partner Confirmation — Mobile" closeDestination="order-shipping-partner-selection">
          <div className="fg-43fc3f35b0" data-node-id="847:897" data-name="Frame">
            <DesignAction className="fg-85c9b684ab" data-node-id="847:898" label="×" destination="order-shipping-partner-selection">
              ×
            </DesignAction>
            <p className="fg-b09d306a31" dir="auto" data-node-id="847:899">
              تأیید همکار ارسال
            </p>
          </div>
          <p className="fg-3bbe0f7654" dir="auto" data-node-id="847:900">
            روش تحویل مرسوله به همکار انتخاب‌شده را مشخص کن.
          </p>
          <div className="fg-c8076a3fdc" data-node-id="847:901" data-name="Frame">
            <p className="fg-37d4966b51" dir="auto" data-node-id="847:902">
              همکار انتخاب‌شده
            </p>
            <p className="fg-49dc593ea8" dir="auto" data-node-id="847:903">
              راه‌سبار
            </p>
            <p className="fg-ded3611b9a" dir="auto" data-node-id="847:904">
              پوشش سراسری • رهگیری پس از دریافت مرسوله
            </p>
          </div>
          <p className="fg-19fa1bb32b" dir="auto" data-node-id="847:905">
            روش تحویل مرسوله
          </p>
          <DesignAction className="fg-5e948655c8" data-node-id="847:906" data-name="Frame" label="● جمع‌آوری از کارگاه همکار پس از پذیرش، بازه جمع‌آوری را اعلام می‌کند. آدرس: کارگاه ثبت‌شده در پروفایل هنرمند" destination="order-detail-shipping">
            <div className="fg-7ced9ecbbc" data-node-id="847:907" data-name="Frame">
              <p className="fg-018f6b9453" data-node-id="847:908">
                ●
              </p>
              <p className="fg-4287da1e1e" dir="auto" data-node-id="847:909">
                جمع‌آوری از کارگاه
              </p>
            </div>
            <p className="fg-77ec1eef68" dir="auto" data-node-id="847:910">
              همکار پس از پذیرش، بازه جمع‌آوری را اعلام می‌کند.
            </p>
            <p className="fg-166379ff8b" dir="auto" data-node-id="847:911">
              آدرس: کارگاه ثبت‌شده در پروفایل هنرمند
            </p>
          </DesignAction>
          <div className="fg-7b64852c59" data-node-id="847:912" data-name="Frame">
            <p className="fg-4c595c0497" data-node-id="847:913">
              ○
            </p>
            <DesignAction className="fg-9a03972ef9" data-node-id="847:914" data-name="Frame" label="تحویل حضوری به شعبه محل تحویل قابل انتخاب پس از ثبت درخواست نمایش داده می‌شود." destination="order-detail-shipping">
              <p className="fg-dc86360f68" dir="auto" data-node-id="847:915">
                تحویل حضوری به شعبه
              </p>
              <p className="fg-462605063d" dir="auto" data-node-id="847:916">
                محل تحویل قابل انتخاب پس از ثبت درخواست نمایش داده می‌شود.
              </p>
            </DesignAction>
          </div>
          <div className="fg-7465a6181f" data-node-id="847:917" data-name="Frame">
            <p className="fg-9cdb4453e0" dir="auto" data-node-id="847:918">
              خلاصه مرسوله
            </p>
            <p className="fg-608e4add36" dir="auto" data-node-id="847:919">
              ۲۴ عدد • ۱ مرسوله
            </p>
            <p className="fg-2760bc63ba" dir="auto" data-node-id="847:920">
              مقصد: مرکز تجمیع نگارین
            </p>
          </div>
          <div className="fg-7cafb89ef9" data-node-id="847:921" data-name="Frame">
            <p className="fg-0f3ed3f2aa" dir="auto" data-node-id="847:922">
              هزینه ارسال: پرداخت توسط سفارش‌دهنده
            </p>
            <p className="fg-88fc5683e6" dir="auto" data-node-id="847:923">
              سهم قابل پرداخت شما: ۰ تومان
            </p>
          </div>
          <div className="fg-c4fde51420" data-node-id="847:924" data-name="Frame">
            <DesignAction className="fg-b8a229c582" data-node-id="846:127" data-name="Negarin / Button" label="تأیید و انتخاب همکار" destination="order-detail-shipping">
              <p className="fg-6800479218" dir="auto" data-node-id="I846:127;46:29">
                تأیید و انتخاب همکار
              </p>
            </DesignAction>
            <DesignAction className="fg-5a77109667" data-node-id="847:928" data-name="Frame" label="انصراف" destination="order-shipping-partner-selection">
              <p className="fg-54beba6aa5" dir="auto" data-node-id="847:929">
                انصراف
              </p>
            </DesignAction>
          </div>
        </DesignDialog>
      </div>
    </div>
  );
}
