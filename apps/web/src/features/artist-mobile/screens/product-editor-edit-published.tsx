// Figma 840:969 — Artist / Product Editor — Edit Published — Mobile
import { DesignAction, DesignField, DesignUpload } from "../../artist/design-controls";

export default function ArtistProductEditorEditPublishedMobile() {
  return (
    <div className="fg-d76c19fac3" data-node-id="840:969" data-name="Artist / Product Editor — Edit Published — Mobile">
      <div className="fg-153c0a1809" data-node-id="840:970" data-name="Frame">
        <div className="fg-ba504c440d" data-node-id="840:971" data-name="Status Bar">
          <p className="fg-ec74edce3f" data-node-id="840:972">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="840:973" data-name="icons">
            <div className="fg-e73a823889" data-node-id="840:974" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/1f4b7dd4.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="840:976" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/40118668.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="840:978" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/f44815d3.svg" />
            </div>
          </div>
        </div>
        <div className="fg-abe5af09cf" data-node-id="840:980" data-name="Header">
          <div className="fg-c96fe10678" data-node-id="840:981" data-name="Frame">
            <DesignAction className="fg-aab9086be4" data-node-id="840:982" data-name="Back Button" label="بازگشت" destination="product-published">
              <div className="fg-c51752dc8c" data-node-id="840:983" data-name="chevron-right">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/38e94c80.svg" />
              </div>
            </DesignAction>
            <p className="fg-11eee50b43" dir="auto" data-node-id="840:985">
              ویرایش محصول
            </p>
          </div>
          <p className="fg-46dca51fd1" dir="auto" data-node-id="840:986">
            ویرایش اطلاعات اثر هنری منتشرشده در نگارین
          </p>
        </div>
        <div className="fg-754a75e52f" data-node-id="840:987" data-name="Content Scroll Area">
          <DesignAction className="fg-2275ba82df" data-node-id="840:988" data-name="Frame" label="توجه برای ویرایش محصول منتشرشده تغییرات جزئی (موجودی/قیمت) آنی ثبت می‌شوند. اما تغییر تصاویر، عنوان یا دسته‌بندی هنری نیازمند بررسی مجدد توسط کارشناسان نگارین است." destination="product-editor">
            <p className="fg-3f7b054217" dir="auto" data-node-id="840:989">
              توجه برای ویرایش محصول منتشرشده
            </p>
            <p className="fg-46f7e129f4" dir="auto" data-node-id="840:990">
              تغییرات جزئی (موجودی/قیمت) آنی ثبت می‌شوند. اما تغییر تصاویر، عنوان یا دسته‌بندی هنری نیازمند بررسی مجدد توسط کارشناسان نگارین است.
            </p>
          </DesignAction>
          <div className="fg-24081ceef5" data-node-id="840:991" data-name="Frame">
            <p className="fg-f0783bb98a" dir="auto" data-node-id="840:992">
              اطلاعات اصلی اثر
            </p>
            <div className="fg-011d44306d" data-node-id="840:993" data-name="Frame">
              <p className="fg-d67d430e04" dir="auto" data-node-id="840:994">
                نام محصول
              </p>
              <DesignField className="fg-53c760f8c7" data-node-id="840:995" data-name="Frame" label="نام محصول" placeholder="بشقاب میناکاری طرح شاه‌عباسی">
                <p className="fg-7c141e2478" dir="auto" data-node-id="840:996">
                  بشقاب میناکاری طرح شاه‌عباسی
                </p>
              </DesignField>
            </div>
            <div className="fg-011d44306d" data-node-id="840:997" data-name="Frame">
              <p className="fg-d67d430e04" dir="auto" data-node-id="840:998">
                دسته‌بندی هنری
              </p>
              <DesignField className="fg-53c760f8c7" data-node-id="840:999" data-name="Frame" label="دسته‌بندی هنری" placeholder="صنایع دستی / میناکاری">
                <p className="fg-7c141e2478" dir="auto" data-node-id="840:1000">
                  صنایع دستی / میناکاری
                </p>
              </DesignField>
            </div>
            <div className="fg-011d44306d" data-node-id="840:1001" data-name="Frame">
              <p className="fg-d67d430e04" dir="auto" data-node-id="840:1002">
                توضیحات و داستان محصول
              </p>
              <DesignField className="fg-e31da067aa" data-node-id="840:1003" data-name="Frame" label="توضیحات و داستان محصول" placeholder="بشقاب سفالی با لعاب برجسته میناکاری، طرح کلاسیک شاه‌عباسی، کاملاً دست‌ساز و پخته شده در کوره...">
                <p className="fg-7c141e2478" dir="auto" data-node-id="840:1004">
                  بشقاب سفالی با لعاب برجسته میناکاری، طرح کلاسیک شاه‌عباسی، کاملاً دست‌ساز و پخته شده در کوره...
                </p>
              </DesignField>
            </div>
          </div>
          <div className="fg-62f39da6b2" data-node-id="840:1005" data-name="Frame">
            <p className="fg-f0783bb98a" dir="auto" data-node-id="840:1006">
              تصاویر محصول
            </p>
            <div className="fg-fbb5fbd514" data-node-id="840:1007" data-name="Frame">
              <DesignUpload className="fg-a927bd3048" data-node-id="840:1008" data-name="add-image" preserveLayout label="Image / 840:1008">
                <p className="fg-acb51a8f08" data-node-id="840:1009">
                  ＋
                </p>
              </DesignUpload>
              <div className="fg-41da8139f5" data-node-id="840:1010" data-name="thumb-1">
                <div className="fg-a126978fb0" data-node-id="840:1011" data-name="Rectangle">
                  <img alt="" className="fg-baf1000bd5" src="/artist-mobile-assets/d6ea175e.png" />
                </div>
              </div>
              <div className="fg-2034846ee2" data-node-id="840:1012" data-name="primary-image-notice">
                <p className="fg-31ac235ce6" dir="auto" data-node-id="840:1013">
                  تصویر اصلی غرفه
                </p>
              </div>
            </div>
          </div>
          <div className="fg-24081ceef5" data-node-id="840:1014" data-name="Frame">
            <p className="fg-f0783bb98a" dir="auto" data-node-id="840:1015">
              قیمت و موجودی انبار
            </p>
            <div className="fg-011d44306d" data-node-id="840:1016" data-name="Frame">
              <p className="fg-d67d430e04" dir="auto" data-node-id="840:1017">
                قیمت فروش (تومان)
              </p>
              <DesignField className="fg-53c760f8c7" data-node-id="840:1018" data-name="Frame" label="قیمت فروش (تومان)" placeholder="۲,۴۵۰,۰۰۰">
                <p className="fg-7c141e2478" data-node-id="840:1019">
                  ۲,۴۵۰,۰۰۰
                </p>
              </DesignField>
            </div>
            <div className="fg-011d44306d" data-node-id="840:1020" data-name="Frame">
              <p className="fg-d67d430e04" dir="auto" data-node-id="840:1021">
                موجودی فعلی قابل عرضه
              </p>
              <DesignField className="fg-53c760f8c7" data-node-id="840:1022" data-name="Frame" label="موجودی فعلی قابل عرضه" placeholder="۸">
                <p className="fg-7c141e2478" data-node-id="840:1023">
                  ۸
                </p>
              </DesignField>
            </div>
          </div>
        </div>
      </div>
      <div className="fg-19cd847a0f" data-node-id="840:1024" data-name="Editor Sticky Bottom">
        <div className="fg-ddbc412ce4" data-node-id="840:1025" data-name="Frame">
          <DesignAction className="fg-1d5f574e9a" data-node-id="840:1026" data-name="Negarin / Button" label="ارسال تغییرات برای بررسی">
            <p className="fg-336e74147d" dir="auto" data-node-id="I840:1026;46:29">
              ارسال تغییرات برای بررسی
            </p>
          </DesignAction>
          <DesignAction className="fg-b16c7dd938" data-node-id="840:1029" data-name="Negarin / Button" label="ذخیره پیش‌نویس تغییرات" destination="products">
            <p className="fg-ebb87c2e95" dir="auto" data-node-id="I840:1029;46:53">
              ذخیره پیش‌نویس تغییرات
            </p>
          </DesignAction>
        </div>
        <div className="fg-3e2c0b060b" data-node-id="840:1032" data-name="Home Bar">
          <div className="fg-1a1cdf5dc6" data-node-id="840:1033" data-name="Rectangle" />
        </div>
      </div>
    </div>
  );
}
