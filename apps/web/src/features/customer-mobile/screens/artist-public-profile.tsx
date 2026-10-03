import { CustomerCardLink } from "../customer-controls";
// Figma 567:5 — Customer / Artist Public Profile - Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";

export default function CustomerArtistPublicProfileMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="567:5" data-name="Customer / Artist Public Profile - Mobile">
      <div className="fg-8f19c175cd" data-node-id="567:6" data-name="Artist Profile / Top Bar">
        <DesignAction className="fg-f17f6ffe55" data-node-id="567:7" label="arrow_forward" destination="artists">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
        <div className="fg-b4a2e0618a" data-node-id="567:8">
          <p className="fg-32bd4c7660" dir="auto">
            فروشگاه هنرمند
          </p>
        </div>
        <div className="fg-9d595670cd" data-node-id="567:9">
          <p className="fg-32bd4c7660">share</p>
        </div>
        <div className="fg-a7a1ee6ad0" data-node-id="567:10">
          <DesignChoice className="fg-32bd4c7660" label="bookmark_border" group="" initial={false} multiple>bookmark_border</DesignChoice>
        </div>
      </div>
      <div className="fg-c0852f2b9b" data-node-id="567:11" data-name="Artist / Identity">
        <div className="fg-21b5b3ab6f" data-node-id="567:14" data-name="Artist Avatar">
          <img alt="" className="fg-8faf267d30" height="76" src="/customer-mobile-assets/ee32dc75.png" width="76" />
        </div>
        <div className="fg-cea59e6003" data-node-id="567:15" data-name="Verification / Verified Badge">
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/bfbb586d.svg" />
        </div>
        <div className="fg-858fa2907f" data-node-id="567:18">
          <p className="fg-32bd4c7660" dir="auto">
            زهرا محمدی
          </p>
        </div>
        <div className="fg-04e11fa4e6" data-node-id="567:19">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
        <div className="fg-6995064daf" data-node-id="567:20">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمند تأییدشده نگارین
          </p>
        </div>
        <div className="fg-aa64f9c49d" data-node-id="567:21">
          <p className="fg-32bd4c7660" dir="auto">
            فروشگاه زهرا محمدی
          </p>
        </div>
        <div className="fg-1da9fe7edb" data-node-id="567:22">
          <p className="fg-32bd4c7660" dir="auto">
            آثار، روایت ساخت و فروشگاه زهرا محمدی را یک‌جا ببین.
          </p>
        </div>
        <DesignChoice className="fg-ced2c8a43f" data-node-id="567:23" data-name="Follow Button" label="دنبال کردن" group="Artist / Identity" initial={true} multiple>
          <div className="fg-4860359cfc" data-node-id="567:24">
            <p className="fg-32bd4c7660" dir="auto">
              دنبال کردن
            </p>
          </div>
        </DesignChoice>
        <DesignAction className="fg-8114194cae" data-node-id="567:25" data-name="Stories Button" label="مشاهده روایت‌ها" destination="stories">
          <div className="fg-b192328a88" data-node-id="567:26">
            <p className="fg-32bd4c7660" dir="auto">
              مشاهده روایت‌ها
            </p>
          </div>
        </DesignAction>
      </div>
      <div className="fg-d801f8aaed" data-node-id="567:27" data-name="Artist Tabs">
        <div className="fg-1794f3bdb2" data-node-id="567:28">
          <p className="fg-32bd4c7660" dir="auto">
            درباره
          </p>
        </div>
        <DesignAction className="fg-537df51384" data-node-id="567:29" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-b3e62c88bc" data-node-id="567:30" data-name="Active Tab">
          <DesignAction className="fg-635f9f2134" data-node-id="567:31" label="آثار" destination="products">
            <p className="fg-32bd4c7660" dir="auto">
              آثار
            </p>
          </DesignAction>
        </div>
      </div>
      <div className="fg-d283c8250e" data-node-id="567:32">
        <p className="fg-32bd4c7660" dir="auto">
          آثار فروشگاه
        </p>
      </div>
      <div className="fg-be6de538c0" data-node-id="567:33">
        <p className="fg-32bd4c7660" dir="auto">
          خرید مستقیم از خود هنرمند
        </p>
      </div>
      <div className="fg-dc6eb9721f" data-node-id="567:34" data-name="Featured Product">
        <div className="fg-4da0da9875" data-node-id="567:35" data-name="Product Image">
          <div className="fg-0421d57c49" data-node-id="567:36" data-name="Rectangle">
            <img alt="" className="fg-71eecc63f8" src="/customer-mobile-assets/b17d5bc0.png" />
          </div>
        </div>
        <div className="fg-db19d7a1f6" data-node-id="567:37">
          <p className="fg-32bd4c7660" dir="auto">
            بشقاب میناکاری طرح شاه‌عباسی
          </p>
        </div>
        <div className="fg-94f265d5a8" data-node-id="567:38">
          <p className="fg-32bd4c7660" dir="auto">
            اثر زهرا محمدی
          </p>
        </div>
        <div className="fg-6ce83ab494" data-node-id="567:39">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۴۵۰,۰۰۰ تومان
          </p>
        </div>
        <CustomerCardLink className="fg-cfb2f8fe94" data-node-id="567:40" data-name="View Product" label="مشاهده اثر" destination="product-detail">
          <DesignAction className="fg-989a004c84" data-node-id="567:41" label="مشاهده اثر" destination="product-detail">
            <p className="fg-32bd4c7660" dir="auto">
              مشاهده اثر
            </p>
          </DesignAction>
        </CustomerCardLink>
      </div>
      <div className="fg-a15a3beb3e" data-node-id="567:42">
        <p className="fg-32bd4c7660" dir="auto">
          روایت‌های تازه
        </p>
      </div>
      <DesignAction className="fg-92e477b7ec" data-node-id="567:43" data-name="Story Preview" label="روایت ساخت این اثر و جزئیات پشت آن را ببین." destination="story-detail">
        <div className="fg-4371ace695" data-node-id="567:44" data-name="Story Image">
          <div className="fg-4984e1e2f3" data-node-id="567:45" data-name="Rectangle">
            <img alt="" className="fg-71eecc63f8" src="/customer-mobile-assets/d53368d8.png" />
          </div>
        </div>
        <div className="fg-4adf89829b" data-node-id="567:46">
          <p className="fg-32bd4c7660" dir="auto">
            روایت ساخت این اثر و جزئیات پشت آن را ببین.
          </p>
        </div>
        <div className="fg-9fb9d08874" data-node-id="567:47">
          <p className="fg-32bd4c7660" dir="auto">{`دیدن روایت `}</p>
        </div>
      </DesignAction>
      <div className="fg-758287eae8" data-node-id="567:48" data-name="Profile Bottom Bar">
        <div className="fg-4b94bdac28" data-node-id="567:49">
          <p className="fg-32bd4c7660" dir="auto">
            فروشگاه زهرا محمدی
          </p>
        </div>
        <div className="fg-54a04b8865" data-node-id="567:50">
          <p className="fg-32bd4c7660">storefront</p>
        </div>
      </div>
    </div>
  );
}
