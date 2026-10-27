// Figma 613:5 — Customer / Saved - Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerSavedMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="613:5" data-name="Customer / Saved - Mobile">
      <div className="fg-8f19c175cd" data-node-id="613:6" data-name="Saved / Top Bar">
        <DesignAction className="fg-b9df3a7911" data-node-id="613:7" label="arrow_forward" destination="account">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
        <div className="fg-2e1ad37202" data-node-id="613:8">
          <p className="fg-32bd4c7660" dir="auto">
            ذخیره‌شده‌ها
          </p>
        </div>
      </div>
      <div className="fg-b2494c1c6a" data-node-id="613:9" data-name="Saved / Explainer">
        <div className="fg-02dfaafeee" data-node-id="613:10">
          <DesignChoice className="fg-32bd4c7660" label="bookmark" group="" initial={false} multiple>bookmark</DesignChoice>
        </div>
        <div className="fg-7140acff98" data-node-id="613:11">
          <p className="fg-32bd4c7660" dir="auto">
            ذخیره برای برگشتن بعدی
          </p>
        </div>
        <div className="fg-20e315d8bc" data-node-id="613:12">
          <p className="fg-32bd4c7660" dir="auto">
            ذخیره با آیکون نشانک انجام می‌شود؛ قلب فقط برای شخصی‌سازی پیشنهادهاست.
          </p>
        </div>
      </div>
      <div className="fg-0dc134244d" data-node-id="613:13" data-name="Saved / Tabs">
        <div className="fg-42318aeee1" data-node-id="613:14" data-name="Tab / آثار">
          <DesignAction className="fg-788c5fde26" data-node-id="613:15" label="آثار" destination="products">
            <p className="fg-32bd4c7660" dir="auto">
              آثار
            </p>
          </DesignAction>
        </div>
        <DesignAction className="fg-a6b6512a7b" data-node-id="613:16" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
      </div>
      <div className="fg-713365ab15" data-node-id="613:17">
        <p className="fg-32bd4c7660" dir="auto">
          آثار ذخیره‌شده
        </p>
      </div>
      <div className="fg-e8d5e5f488" data-node-id="613:18" data-name="Saved Product / 1">
        <div className="fg-080b5e3734" data-node-id="613:19" data-name="Product Image">
          <div className="fg-48a7b89449" data-node-id="613:20" data-name="Saved Product Image Raster">
            <img alt="" className="fg-99c40796f8" src="/customer-mobile-assets/85ecafc3.png" />
          </div>
        </div>
        <div className="fg-998f3ca6d2" data-node-id="613:21">
          <DesignChoice className="fg-32bd4c7660" label="bookmark" group="" initial={false} multiple>bookmark</DesignChoice>
        </div>
        <div className="fg-3daa8f2acd" data-node-id="613:22">
          <p className="fg-32bd4c7660" dir="auto">
            بشقاب میناکاری طرح شاه‌عباسی
          </p>
        </div>
        <div className="fg-109acfc1cd" data-node-id="613:23">
          <p className="fg-32bd4c7660" dir="auto">
            اثر زهرا محمدی
          </p>
        </div>
        <div className="fg-6eef467c32" data-node-id="613:24">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۴۵۰,۰۰۰ تومان
          </p>
        </div>
        <div className="fg-ede1042f52" data-node-id="613:25" data-name="Open Product CTA">
          <DesignAction className="fg-dd9ca6b285" data-node-id="613:26" label="مشاهده محصول" destination="product-detail">
            <p className="fg-32bd4c7660" dir="auto">
              مشاهده محصول
            </p>
          </DesignAction>
        </div>
      </div>
      <div className="fg-b902eb940a" data-node-id="613:27" data-name="Saved / Helper">
        <div className="fg-66f5b3f563" data-node-id="613:28">
          <DesignChoice className="fg-32bd4c7660" label="favorite_border" group="" initial={false} multiple>favorite_border</DesignChoice>
        </div>
        <div className="fg-bc8b27d330" data-node-id="613:29">
          <p className="fg-32bd4c7660" dir="auto">
            قلب با ذخیره فرق دارد
          </p>
        </div>
        <div className="fg-40c8d4d316" data-node-id="613:30">
          <p className="fg-32bd4c7660" dir="auto">
            با قلب‌زدن، نگارین سلیقه‌ات را بهتر می‌شناسد و پیشنهادهای بعدی را متناسب‌تر می‌کند؛ اما محصول وارد این لیست نمی‌شود.
          </p>
        </div>
      </div>
      <div className="fg-439927b686" data-node-id="613:31" data-name="Stories Saved Hint">
        <div className="fg-fe81cf243e" data-node-id="613:32">
          <p className="fg-32bd4c7660">auto_stories</p>
        </div>
        <div className="fg-130f78b1f5" data-node-id="613:33">
          <p className="fg-32bd4c7660" dir="auto">
            برای دیدن روایت‌های ذخیره‌شده، تب «روایت‌ها» را انتخاب کن.
          </p>
        </div>
      </div>
      <MobileNavigation className="fg-3b79415197" data-node-id="613:34" data-name="Bottom Navigation">
        <div className="fg-07afff17c3" data-node-id="613:35">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-30a9b49c3d" data-node-id="613:36" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
        <div className="fg-8ccaa646b2" data-node-id="613:37">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-80c1fba142" data-node-id="613:38">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-4dc3facf32" data-node-id="613:39">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-b61801a285" data-node-id="613:40" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-8c027253a6" data-node-id="633:10">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-945bf94a3e" data-node-id="613:42" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-6727da27ee" data-node-id="613:43">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-418fb5adf5" data-node-id="613:44" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
      </MobileNavigation>
    </div>
  );
}
