import { CustomerSearchField } from "../customer-controls";
// Figma 645:5 — Customer / Search Results - Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerSearchResultsMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="645:5" data-name="Customer / Search Results - Mobile">
      <div className="fg-a2ba6bca05" data-node-id="645:6" data-name="Search / Top Bar">
        <div className="fg-1f483ac642" data-node-id="645:7">
          <p className="fg-32bd4c7660" dir="auto">
            نتایج جستجو
          </p>
        </div>
      </div>
      <CustomerSearchField className="fg-a5b1c67edd" data-node-id="645:8" data-name="Search Field" label="جستجو" placeholder="search میناکاری">
        <div className="fg-31957669cf" data-node-id="645:9">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-841bc27e83" data-node-id="645:10">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
      </CustomerSearchField>
      <div className="fg-4c4b104593" data-node-id="645:11" data-name="Filter / همه">
        <div className="fg-b2b215e153" data-node-id="645:12">
          <p className="fg-32bd4c7660" dir="auto">
            همه
          </p>
        </div>
      </div>
      <div className="fg-a88d728a46" data-node-id="645:13" data-name="Filter / آثار">
        <DesignAction className="fg-5175244a95" data-node-id="645:14" label="آثار" destination="products">
          <p className="fg-32bd4c7660" dir="auto">
            آثار
          </p>
        </DesignAction>
      </div>
      <div className="fg-9e71d1ac9f" data-node-id="645:15" data-name="Filter / هنرمندان">
        <DesignAction className="fg-6ece41568f" data-node-id="645:16" label="هنرمندان" destination="artists">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندان
          </p>
        </DesignAction>
      </div>
      <div className="fg-277db0180f" data-node-id="645:17" data-name="Filter / روایت‌ها">
        <DesignAction className="fg-89ea61ae7d" data-node-id="645:18" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
      </div>
      <div className="fg-dd17a6bdc2" data-node-id="645:19">
        <p className="fg-32bd4c7660" dir="auto">
          نتایج برای «میناکاری»
        </p>
      </div>
      <DesignAction className="fg-69d8730bbe" data-node-id="645:32" label="هنرمندان" destination="artists">
        <p className="fg-32bd4c7660" dir="auto">
          هنرمندان
        </p>
      </DesignAction>
      <div className="fg-64ce033b01" data-node-id="675:207" data-name="Suggested Artist / Zahra">
        <div className="fg-b9c63e94a8" data-node-id="675:208" data-name="Artist Avatar">
          <img alt="" className="fg-8faf267d30" height="64" src="/customer-mobile-assets/115c7a19.png" width="64" />
        </div>
        <div className="fg-e75c3f78fd" data-node-id="675:209">
          <p className="fg-32bd4c7660" dir="auto">
            زهرا محمدی
          </p>
        </div>
        <div className="fg-7dbba679dc" data-node-id="675:210">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
        <div className="fg-77123cc3b8" data-node-id="675:211">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمند تأییدشده نگارین
          </p>
        </div>
        <div className="fg-3b28990d82" data-node-id="675:212" data-name="View Store">
          <div className="fg-d0f46b2a22" data-node-id="675:213">
            <p className="fg-32bd4c7660" dir="auto">
              مشاهده فروشگاه
            </p>
          </div>
        </div>
        <DesignChoice className="fg-daef63d21c" data-node-id="675:214" data-name="Follow" label="دنبال کردن" group="Suggested Artist / Zahra" initial={false} multiple>
          <div className="fg-189adbf0c0" data-node-id="675:215">
            <p className="fg-32bd4c7660" dir="auto">
              دنبال کردن
            </p>
          </div>
        </DesignChoice>
        <div className="fg-8c63677593" data-node-id="675:216" data-name="Verification / Verified Badge">
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/5642e3ae.svg" />
        </div>
      </div>
      <DesignAction className="fg-8ecd0e33c5" data-node-id="645:43" label="آثار" destination="products">
        <p className="fg-32bd4c7660" dir="auto">
          آثار
        </p>
      </DesignAction>
      <div className="fg-e7eb3332be" data-node-id="645:44" data-name="Discover Product">
        <div className="fg-867ae8fd36" data-node-id="645:45" data-name="Product Image">
          <img alt="" className="fg-d642291d8a" src="/customer-mobile-assets/777b8799.png" />
        </div>
        <div className="fg-baf8c4680e" data-node-id="645:46">
          <p className="fg-32bd4c7660" dir="auto">
            بشقاب میناکاری طرح شاه‌عباسی
          </p>
        </div>
        <div className="fg-3566d45bb8" data-node-id="645:47">
          <p className="fg-32bd4c7660" dir="auto">
            اثر زهرا محمدی
          </p>
        </div>
        <div className="fg-e5e0a7405f" data-node-id="645:48">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۴۵۰,۰۰۰ تومان
          </p>
        </div>
        <div className="fg-8a0cc1ef62" data-node-id="645:49">
          <DesignChoice className="fg-32bd4c7660" label="favorite_border" group="" initial={false} multiple>favorite_border</DesignChoice>
        </div>
        <div className="fg-af7e41b5c7" data-node-id="645:50">
          <p className="fg-32bd4c7660" dir="auto">
            برای پیشنهادهای بهتر
          </p>
        </div>
      </div>
      <MobileNavigation className="fg-df983d935c" data-node-id="645:51" data-name="Bottom Navigation">
        <div className="fg-d39f212892" data-node-id="645:52">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-0f5f1290ca" data-node-id="645:53" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
        <div className="fg-4edc1ea99c" data-node-id="645:54">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-92ae24095f" data-node-id="645:55" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-d021d0ddc9" data-node-id="645:56">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-65ddd92ba1" data-node-id="645:57" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-42ae53004c" data-node-id="645:58">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-eaef08fe31" data-node-id="645:59">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-0077ccce1f" data-node-id="645:60">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-10c7bb0959" data-node-id="645:61" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
      </MobileNavigation>
      <p className="fg-d86e6a83e0" dir="auto" data-node-id="645:62">
        روایت‌ها
      </p>
      <div className="fg-b4062e6d9c" data-node-id="645:63" data-name="Search Result / Story">
        <p className="fg-d9097375aa" data-node-id="645:64">
          dynamic_feed
        </p>
        <p className="fg-48abb2b47a" dir="auto" data-node-id="645:65">
          روایت ساخت یک اثر میناکاری
        </p>
        <p className="fg-f6abb8c8d9" dir="auto" data-node-id="645:66">
          از زهرا محمدی
        </p>
      </div>
    </div>
  );
}
