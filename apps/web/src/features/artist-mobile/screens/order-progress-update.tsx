// Figma 847:398 — Artist / Order Progress Update — Mobile
import { DesignDialog, DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileCounterStep, MobileCounterValue } from "../mobile-counter";

export default function ArtistOrderProgressUpdateMobile() {
  return (
    <div className="fg-d37209cb37" data-node-id="847:398" data-name="Artist / Order Progress Update — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="847:399" data-name="Status Bar" inert>
        <p className="fg-ec74edce3f" data-node-id="847:400">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="847:401" data-name="Status Icons">
          <div className="fg-e73a823889" data-node-id="847:639" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="847:684" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/bd394e83.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="847:642" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/797d5ae1.svg" />
          </div>
        </div>
      </div>
      <div className="fg-96664a729c" data-node-id="847:405" data-name="Header" inert>
        <div className="fg-c96fe10678" data-node-id="847:406" data-name="Frame">
          <div className="fg-2d3663d59a" data-node-id="847:407" data-name="Frame" />
          <p className="fg-11eee50b43" dir="auto" data-node-id="847:408">
            جزئیات سفارش #NG-1054
          </p>
        </div>
      </div>
      <div className="fg-0259247786" data-node-id="847:409" data-name="Backdrop Content" inert>
        <div className="fg-4f08d3eef2" data-node-id="847:410" data-name="Progress Card">
          <p className="fg-abe46541cc" dir="auto" data-node-id="847:411">
            ۱۰ از ۲۴ عدد آماده شده
          </p>
        </div>
      </div>
      <div className="fg-ec59750afc" data-node-id="847:412" data-name="Rectangle" />
      <DesignDialog className="fg-93dfa505b2" data-node-id="847:413" data-name="Modal Sheet" label="Artist / Order Progress Update — Mobile" closeDestination="order-detail-preparing">
        <div className="fg-5f6203b662" data-node-id="847:414" data-name="Frame">
          <DesignAction className="fg-2244c16b05" data-node-id="847:415" label="×" destination="order-detail-preparing">
            ×
          </DesignAction>
          <p className="fg-feb0a902a3" dir="auto" data-node-id="847:416">
            ثبت پیشرفت تولید
          </p>
        </div>
        <p className="fg-1768f9d874" dir="auto" data-node-id="847:417">
          تعداد محصولاتی را ثبت کن که آماده‌اند و از کنترل کیفیت گذشته‌اند.
        </p>
        <div className="fg-b7dd07ad23" data-node-id="847:418" data-name="Current Indicator">
          <p className="fg-75aab8e729" dir="auto" data-node-id="847:419">
            پیشرفت ثبت‌شده فعلی
          </p>
          <p className="fg-d65d64ca5a" dir="auto" data-node-id="847:420">
            ۱۰ از ۲۴ عدد • ۴۲٪
          </p>
        </div>
        <p className="fg-5f7d8b7240" dir="auto" data-node-id="847:421">
          تعداد آماده‌شده تا این لحظه
        </p>
        <div className="fg-dc82073688" data-node-id="847:422" data-name="Counter">
          <MobileCounterStep className="fg-1a70ea5fc7" data-node-id="847:423" data-name="Minus Action" step={-1}>
            <p className="fg-05ac0459f3" data-node-id="847:424">
              −
            </p>
          </MobileCounterStep>
          <MobileCounterValue className="fg-11eee50b43" data-node-id="847:425" initial="۱۴">
            ۱۴
          </MobileCounterValue>
          <MobileCounterStep className="fg-83e22eceb8" data-node-id="847:426" data-name="Plus Action" step={1}>
            <p className="fg-f045cb8139" data-node-id="847:427">
              +
            </p>
          </MobileCounterStep>
        </div>
        <div className="fg-28b2ac35a5" data-node-id="847:428" data-name="Preview Alert">
          <p className="fg-be58c55429" dir="auto" data-node-id="847:429">
            پس از ثبت: ۱۴ از ۲۴ عدد • ۵۸٪ تکمیل
          </p>
        </div>
        <DesignChoice className="fg-2176b57748" data-node-id="847:430" data-name="Checkbox" label="✓ این تعداد از کنترل کیفیت داخلی عبور کرده است." group="Modal Sheet" initial={false} multiple>
          <div className="fg-b8313a45ce" data-node-id="847:431" data-name="Box">
            <p className="fg-258b20c45a" data-node-id="847:432">
              ✓
            </p>
          </div>
          <p className="fg-6fabfd959d" dir="auto" data-node-id="847:433">
            این تعداد از کنترل کیفیت داخلی عبور کرده است.
          </p>
        </DesignChoice>
        <div className="fg-fbb5fbd514" data-node-id="847:434" data-name="Actions">
          <DesignAction className="fg-3651dc4f5f" data-node-id="847:435" data-name="Negarin / Button" label="انصراف" destination="order-detail-preparing">
            <p className="fg-bf29e071b6" dir="auto" data-node-id="I847:435;46:53">
              انصراف
            </p>
          </DesignAction>
          <DesignAction className="fg-5f5f993372" data-node-id="847:438" data-name="Negarin / Button" label="ثبت پیشرفت" destination="order-detail-preparing">
            <p className="fg-336e74147d" dir="auto" data-node-id="I847:438;46:29">
              ثبت پیشرفت
            </p>
          </DesignAction>
        </div>
      </DesignDialog>
    </div>
  );
}
