import { CustomerSearchField } from "../customer-controls";
// Figma 642:5 — Customer / Search & Discover - Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerSearchDiscoverMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="642:5" data-name="Customer / Search & Discover - Mobile">
      <div className="fg-a2ba6bca05" data-node-id="642:6" data-name="Search / Top Bar">
        <div className="fg-1f483ac642" data-node-id="642:7">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو و کشف
          </p>
        </div>
      </div>
      <CustomerSearchField className="fg-a5b1c67edd" data-node-id="642:8" data-name="Search Field" label="جستجو" placeholder="search اثر، هنرمند یا دسته را جستجو کن">
        <div className="fg-31957669cf" data-node-id="642:9">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-841bc27e83" data-node-id="642:10">
          <p className="fg-32bd4c7660" dir="auto">
            اثر، هنرمند یا دسته را جستجو کن
          </p>
        </div>
      </CustomerSearchField>
      <div className="fg-4c4b104593" data-node-id="642:11" data-name="Filter / همه">
        <div className="fg-b2b215e153" data-node-id="642:12">
          <p className="fg-32bd4c7660" dir="auto">
            همه
          </p>
        </div>
      </div>
      <div className="fg-a88d728a46" data-node-id="642:13" data-name="Filter / آثار">
        <DesignAction className="fg-5175244a95" data-node-id="642:14" label="آثار" destination="products">
          <p className="fg-32bd4c7660" dir="auto">
            آثار
          </p>
        </DesignAction>
      </div>
      <div className="fg-9e71d1ac9f" data-node-id="642:15" data-name="Filter / هنرمندان">
        <DesignAction className="fg-6ece41568f" data-node-id="642:16" label="هنرمندان" destination="artists">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندان
          </p>
        </DesignAction>
      </div>
      <div className="fg-277db0180f" data-node-id="642:17" data-name="Filter / روایت‌ها">
        <DesignAction className="fg-89ea61ae7d" data-node-id="642:18" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
      </div>
      <div className="fg-a5526fe906" data-node-id="642:19">
        <p className="fg-32bd4c7660" dir="auto">
          دسته‌ها را کشف کن
        </p>
      </div>
      <DesignAction className="fg-fb9d41d08a" data-node-id="642:20" data-name="Category / میناکاری" label="میناکاری" destination="category-minakari">
        <div className="fg-c216474a62" data-node-id="644:2" data-name="Category Image">
          <img alt="" className="fg-3cf40fed90" src="/customer-mobile-assets/16b37846.png" />
        </div>
        <div className="fg-e90ec252be" data-node-id="642:22">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
      </DesignAction>
      <DesignAction className="fg-7046e00911" data-node-id="642:23" data-name="Category / سفال" label="سفال" destination="category-minakari">
        <div className="fg-c216474a62" data-node-id="644:3" data-name="Category Image">
          <img alt="" className="fg-3cf40fed90" src="/customer-mobile-assets/c989e178.png" />
        </div>
        <div className="fg-e90ec252be" data-node-id="642:25">
          <p className="fg-32bd4c7660" dir="auto">
            سفال
          </p>
        </div>
      </DesignAction>
      <DesignAction className="fg-2da739743f" data-node-id="642:26" data-name="Category / گلیم" label="گلیم" destination="category-minakari">
        <div className="fg-c216474a62" data-node-id="644:4" data-name="Category Image">
          <img alt="" className="fg-3cf40fed90" src="/customer-mobile-assets/33c2bcaa.png" />
        </div>
        <div className="fg-e90ec252be" data-node-id="642:28">
          <p className="fg-32bd4c7660" dir="auto">
            گلیم
          </p>
        </div>
      </DesignAction>
      <DesignAction className="fg-a0f9984ce7" data-node-id="642:29" data-name="Category / چرم" label="چرم" destination="category-minakari">
        <div className="fg-c216474a62" data-node-id="644:5" data-name="Category Image">
          <img alt="" className="fg-3cf40fed90" src="/customer-mobile-assets/6e3b7b8d.png" />
        </div>
        <div className="fg-e90ec252be" data-node-id="642:31">
          <p className="fg-32bd4c7660" dir="auto">
            چرم
          </p>
        </div>
      </DesignAction>
      <div className="fg-3a8fc02213" data-node-id="642:32">
        <p className="fg-32bd4c7660" dir="auto">
          هنرمند پیشنهادی
        </p>
      </div>
      <div className="fg-0ebd181aa4" data-node-id="675:220" data-name="Suggested Artist / Zahra">
        <div className="fg-b9c63e94a8" data-node-id="675:221" data-name="Artist Avatar">
          <img alt="" className="fg-8faf267d30" height="64" src="/customer-mobile-assets/115c7a19.png" width="64" />
        </div>
        <div className="fg-e75c3f78fd" data-node-id="675:222">
          <p className="fg-32bd4c7660" dir="auto">
            زهرا محمدی
          </p>
        </div>
        <div className="fg-7dbba679dc" data-node-id="675:223">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
        <div className="fg-77123cc3b8" data-node-id="675:224">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمند تأییدشده نگارین
          </p>
        </div>
        <div className="fg-3b28990d82" data-node-id="675:225" data-name="View Store">
          <div className="fg-d0f46b2a22" data-node-id="675:226">
            <p className="fg-32bd4c7660" dir="auto">
              مشاهده فروشگاه
            </p>
          </div>
        </div>
        <DesignChoice className="fg-daef63d21c" data-node-id="675:227" data-name="Follow" label="دنبال کردن" group="Suggested Artist / Zahra" initial={false} multiple>
          <div className="fg-189adbf0c0" data-node-id="675:228">
            <p className="fg-32bd4c7660" dir="auto">
              دنبال کردن
            </p>
          </div>
        </DesignChoice>
        <div className="fg-8c63677593" data-node-id="675:229" data-name="Verification / Verified Badge">
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/0aad4384.svg" />
        </div>
      </div>
      <div className="fg-f72fadddb0" data-node-id="642:43">
        <p className="fg-32bd4c7660" dir="auto">
          آثار برای کشف
        </p>
      </div>
      <div className="fg-5c8f117fdf" data-node-id="642:44" data-name="Discover Product">
        <div className="fg-867ae8fd36" data-node-id="642:45" data-name="Product Image">
          <img alt="" className="fg-d642291d8a" src="/customer-mobile-assets/777b8799.png" />
        </div>
        <div className="fg-baf8c4680e" data-node-id="642:46">
          <p className="fg-32bd4c7660" dir="auto">
            بشقاب میناکاری طرح شاه‌عباسی
          </p>
        </div>
        <div className="fg-3566d45bb8" data-node-id="642:47">
          <p className="fg-32bd4c7660" dir="auto">
            اثر زهرا محمدی
          </p>
        </div>
        <div className="fg-e5e0a7405f" data-node-id="642:48">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۴۵۰,۰۰۰ تومان
          </p>
        </div>
        <div className="fg-8a0cc1ef62" data-node-id="642:49">
          <DesignChoice className="fg-32bd4c7660" label="favorite_border" group="" initial={false} multiple>favorite_border</DesignChoice>
        </div>
        <div className="fg-af7e41b5c7" data-node-id="642:50">
          <p className="fg-32bd4c7660" dir="auto">
            برای پیشنهادهای بهتر
          </p>
        </div>
      </div>
      <MobileNavigation className="fg-df983d935c" data-node-id="642:51" data-name="Bottom Navigation">
        <div className="fg-d39f212892" data-node-id="642:52">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-0f5f1290ca" data-node-id="642:53" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
        <div className="fg-4edc1ea99c" data-node-id="642:54">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-92ae24095f" data-node-id="642:55" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-d021d0ddc9" data-node-id="642:56">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-65ddd92ba1" data-node-id="642:57" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-42ae53004c" data-node-id="642:58">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-eaef08fe31" data-node-id="642:59">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-0077ccce1f" data-node-id="642:60">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-10c7bb0959" data-node-id="642:61" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
      </MobileNavigation>
    </div>
  );
}
