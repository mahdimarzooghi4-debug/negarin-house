// Figma 617:5 — Customer / Followed Artists - Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerFollowedArtistsMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="617:5" data-name="Customer / Followed Artists - Mobile">
      <div className="fg-cbfa65986b" data-node-id="617:6" data-name="Followed Artists / Top Bar">
        <div className="fg-786a347f58" data-node-id="617:7">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندان دنبال‌شده
          </p>
        </div>
        <DesignAction className="fg-59b0ad3200" data-node-id="617:8" label="arrow_forward" destination="account">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
      </div>
      <div className="fg-f8842af29e" data-node-id="617:9" data-name="Followed Artists / Intro">
        <div className="fg-82be8bc987" data-node-id="617:10">
          <p className="fg-32bd4c7660">groups</p>
        </div>
        <div className="fg-7e032ddaed" data-node-id="617:11">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندهایی که دنبال می‌کنی
          </p>
        </div>
        <div className="fg-a66e9ec188" data-node-id="617:12">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها و آثار تازه آن‌ها را راحت‌تر پیدا کن.
          </p>
        </div>
      </div>
      <div className="fg-a7a64dbcbf" data-node-id="617:13">
        <p className="fg-32bd4c7660" dir="auto">
          دنبال‌شده‌ها
        </p>
      </div>
      <div className="fg-f3c0e3e9bf" data-node-id="675:233" data-name="Suggested Artist / Zahra">
        <div className="fg-b9c63e94a8" data-node-id="675:234" data-name="Artist Avatar">
          <img alt="" className="fg-8faf267d30" height="64" src="/customer-mobile-assets/115c7a19.png" width="64" />
        </div>
        <div className="fg-e75c3f78fd" data-node-id="675:235">
          <p className="fg-32bd4c7660" dir="auto">
            زهرا محمدی
          </p>
        </div>
        <div className="fg-7dbba679dc" data-node-id="675:236">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
        <div className="fg-77123cc3b8" data-node-id="675:237">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمند تأییدشده نگارین
          </p>
        </div>
        <div className="fg-3b28990d82" data-node-id="675:238" data-name="View Store">
          <div className="fg-d0f46b2a22" data-node-id="675:239">
            <p className="fg-32bd4c7660" dir="auto">
              مشاهده فروشگاه
            </p>
          </div>
        </div>
        <DesignChoice className="fg-daef63d21c" data-node-id="675:240" data-name="Follow" label="دنبال کردن" group="Suggested Artist / Zahra" initial={false} multiple>
          <div className="fg-189adbf0c0" data-node-id="675:241">
            <p className="fg-32bd4c7660" dir="auto">
              دنبال کردن
            </p>
          </div>
        </DesignChoice>
        <div className="fg-8c63677593" data-node-id="675:242" data-name="Verification / Verified Badge">
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/3af45321.svg" />
        </div>
      </div>
      <div className="fg-75f7d7bffc" data-node-id="617:28">
        <p className="fg-32bd4c7660" dir="auto">
          روایت‌های تازه
        </p>
      </div>
      <div className="fg-d666c1e317" data-node-id="617:29" data-name="Followed Artist / Latest Story">
        <div className="fg-a0ec2e2ce3" data-node-id="617:30" data-name="Story Image">
          <div className="fg-4984e1e2f3" data-node-id="617:31" data-name="Rectangle">
            <img alt="" className="fg-71eecc63f8" src="/customer-mobile-assets/d53368d8.png" />
          </div>
        </div>
        <div className="fg-10089b56f6" data-node-id="617:32">
          <p className="fg-32bd4c7660" dir="auto">
            زهرا محمدی
          </p>
        </div>
        <div className="fg-a749672b29" data-node-id="617:33">
          <p className="fg-32bd4c7660" dir="auto">
            روایت ساخت این اثر و جزئیات پشت آن را ببین.
          </p>
        </div>
        <div className="fg-422c177d1c" data-node-id="617:34">
          <p className="fg-32bd4c7660" dir="auto">
            دیدن روایت
          </p>
        </div>
        <div className="fg-37ff8bb553" data-node-id="671:20" data-name="Verification / Verified Badge">
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/3af45321.svg" />
        </div>
      </div>
      <div className="fg-68b51bfdca" data-node-id="617:35" data-name="Discover More Artists">
        <div className="fg-fba6dfb04f" data-node-id="617:36">
          <p className="fg-32bd4c7660">explore</p>
        </div>
        <div className="fg-a4e170a0df" data-node-id="617:37">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندهای بیشتری کشف کن
          </p>
        </div>
        <div className="fg-64d1908979" data-node-id="617:38">
          <p className="fg-32bd4c7660" dir="auto">
            از جستجو یا روایت‌ها هنرمندهای تازه را پیدا و دنبال کن.
          </p>
        </div>
      </div>
      <MobileNavigation className="fg-00e574a480" data-node-id="617:39" data-name="Bottom Navigation">
        <div className="fg-14f2865cdc" data-node-id="617:40">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-0522aaa5d9" data-node-id="617:41" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
        <div className="fg-e517d25164" data-node-id="617:42">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-e3cd9f2345" data-node-id="617:43">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-c797679009" data-node-id="617:44">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-f0b23649f0" data-node-id="617:45" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-8ccaa646b2" data-node-id="633:14">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <DesignAction className="fg-7114f8c810" data-node-id="617:47" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-2fdc568b77" data-node-id="617:48">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-46f3fbe85e" data-node-id="617:49" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
        <div className="fg-8c027253a6" data-node-id="633:12">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
      </MobileNavigation>
    </div>
  );
}
