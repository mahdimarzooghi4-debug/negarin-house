import { CustomerSearchField } from "../customer-controls";
// Figma 682:68 — Customer / Artists - Mobile
import { DesignChoice, DesignAction } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerArtistsMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="682:68" data-name="Customer / Artists - Mobile">
      <div className="fg-a2ba6bca05" data-node-id="682:69" data-name="Search / Top Bar">
        <div className="fg-1f483ac642" data-node-id="682:70">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندان
          </p>
        </div>
      </div>
      <CustomerSearchField className="fg-a5b1c67edd" data-node-id="682:71" data-name="Search Field" label="جستجو" placeholder="search نام هنرمند یا رشته هنری را جستجو کن">
        <div className="fg-31957669cf" data-node-id="682:72">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-841bc27e83" data-node-id="682:73">
          <p className="fg-32bd4c7660" dir="auto">
            نام هنرمند یا رشته هنری را جستجو کن
          </p>
        </div>
      </CustomerSearchField>
      <div className="fg-4c4b104593" data-node-id="682:74" data-name="Filter / همه">
        <div className="fg-b2b215e153" data-node-id="682:75">
          <p className="fg-32bd4c7660" dir="auto">
            همه
          </p>
        </div>
      </div>
      <div className="fg-a88d728a46" data-node-id="682:76" data-name="Filter / آثار">
        <div className="fg-5175244a95" data-node-id="682:77">
          <p className="fg-32bd4c7660" dir="auto">
            تأییدشده
          </p>
        </div>
      </div>
      <div className="fg-9e71d1ac9f" data-node-id="682:78" data-name="Filter / هنرمندان">
        <div className="fg-6ece41568f" data-node-id="682:79">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
      </div>
      <div className="fg-277db0180f" data-node-id="682:80" data-name="Filter / روایت‌ها">
        <div className="fg-89ea61ae7d" data-node-id="682:81">
          <p className="fg-32bd4c7660" dir="auto">
            سفال
          </p>
        </div>
      </div>
      <div className="fg-ee33718352" data-node-id="682:82">
        <p className="fg-32bd4c7660" dir="auto">
          هنرمندان برای کشف
        </p>
      </div>
      <div className="fg-764ca633a8" data-node-id="682:99">
        <p className="fg-32bd4c7660" dir="auto">
          هنرمندان تأییدشده
        </p>
      </div>
      <div className="fg-1c0775b7e9" data-node-id="675:168" data-name="Suggested Artist / Zahra">
        <div className="fg-b9c63e94a8" data-node-id="675:169" data-name="Artist Avatar">
          <img alt="" className="fg-8faf267d30" height="64" src="/customer-mobile-assets/115c7a19.png" width="64" />
        </div>
        <div className="fg-e75c3f78fd" data-node-id="675:170">
          <p className="fg-32bd4c7660" dir="auto">
            زهرا محمدی
          </p>
        </div>
        <div className="fg-7dbba679dc" data-node-id="675:171">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
        <div className="fg-77123cc3b8" data-node-id="675:172">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمند تأییدشده نگارین
          </p>
        </div>
        <div className="fg-3b28990d82" data-node-id="675:173" data-name="View Store">
          <div className="fg-d0f46b2a22" data-node-id="675:174">
            <p className="fg-32bd4c7660" dir="auto">
              مشاهده فروشگاه
            </p>
          </div>
        </div>
        <DesignChoice className="fg-daef63d21c" data-node-id="675:175" data-name="Follow" label="دنبال کردن" group="Suggested Artist / Zahra" initial={false} multiple>
          <div className="fg-189adbf0c0" data-node-id="675:176">
            <p className="fg-32bd4c7660" dir="auto">
              دنبال کردن
            </p>
          </div>
        </DesignChoice>
        <div className="fg-8c63677593" data-node-id="675:177" data-name="Verification / Verified Badge">
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/3af45321.svg" />
        </div>
      </div>
      <MobileNavigation className="fg-df983d935c" data-node-id="682:120" data-name="Bottom Navigation">
        <div className="fg-d39f212892" data-node-id="682:121">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-0f5f1290ca" data-node-id="682:122" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
        <div className="fg-4edc1ea99c" data-node-id="682:123">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-92ae24095f" data-node-id="682:124" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-d021d0ddc9" data-node-id="682:125">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-65ddd92ba1" data-node-id="682:126" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-42ae53004c" data-node-id="682:127">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-eaef08fe31" data-node-id="682:128">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-0077ccce1f" data-node-id="682:129">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-10c7bb0959" data-node-id="682:130" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
      </MobileNavigation>
      <div className="fg-f31ccf1508" data-node-id="685:5" data-name="Artists / Discovery Note">
        <p className="fg-9f097702aa" data-node-id="685:6">
          groups
        </p>
        <div className="fg-9b02f36a7b" data-node-id="685:7">
          <p className="fg-32bd4c7660" dir="auto">
            کشف بر اساس رشته هنری
          </p>
        </div>
        <div className="fg-078b898fd1" data-node-id="685:8">
          <p className="fg-32bd4c7660" dir="auto">
            برای پیدا کردن هنرمندان بیشتر، رشته هنری موردنظرت را انتخاب کن.
          </p>
        </div>
      </div>
      <div className="fg-85404c9c98" data-node-id="685:9" data-name="Artist Filter / میناکاری">
        <div className="fg-bf6de3aa35" data-node-id="685:10">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
      </div>
      <div className="fg-4a8bc0d03d" data-node-id="685:11" data-name="Artist Filter / سفال">
        <div className="fg-bf6de3aa35" data-node-id="685:12">
          <p className="fg-32bd4c7660" dir="auto">
            سفال
          </p>
        </div>
      </div>
      <div className="fg-0c101362f0" data-node-id="685:13" data-name="Artist Filter / گلیم">
        <div className="fg-bf6de3aa35" data-node-id="685:14">
          <p className="fg-32bd4c7660" dir="auto">
            گلیم
          </p>
        </div>
      </div>
      <div className="fg-9e2f2e5d7b" data-node-id="685:15" data-name="Artist Filter / چرم">
        <div className="fg-bf6de3aa35" data-node-id="685:16">
          <p className="fg-32bd4c7660" dir="auto">
            چرم
          </p>
        </div>
      </div>
    </div>
  );
}
