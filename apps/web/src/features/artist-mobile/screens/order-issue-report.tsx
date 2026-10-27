// Figma 847:441 — Artist / Order Issue Report — Mobile
import { DesignDialog, DesignAction, DesignChoice, DesignField } from "../../artist/design-controls";

export default function ArtistOrderIssueReportMobile() {
  return (
    <div className="fg-d37209cb37" data-node-id="847:441" data-name="Artist / Order Issue Report — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="847:442" data-name="Status Bar" inert>
        <p className="fg-ec74edce3f" data-node-id="847:443">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="847:444" data-name="Status Icons">
          <div className="fg-e73a823889" data-node-id="847:645" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="847:687" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/bd394e83.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="847:648" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/797d5ae1.svg" />
          </div>
        </div>
      </div>
      <div className="fg-96664a729c" data-node-id="847:448" data-name="Header" inert>
        <div className="fg-c96fe10678" data-node-id="847:449" data-name="Frame">
          <div className="fg-2d3663d59a" data-node-id="847:450" data-name="Frame" />
          <p className="fg-11eee50b43" dir="auto" data-node-id="847:451">
            جزئیات سفارش #NG-1054
          </p>
        </div>
      </div>
      <div className="fg-ec59750afc" data-node-id="847:452" data-name="Rectangle" />
      <DesignDialog className="fg-8f87e9e74b" data-node-id="847:453" data-name="Modal Sheet" label="Artist / Order Issue Report — Mobile" closeDestination="order-detail-preparing">
        <div className="fg-5f6203b662" data-node-id="847:454" data-name="Frame">
          <DesignAction className="fg-2244c16b05" data-node-id="847:455" label="×" destination="order-detail-preparing">
            ×
          </DesignAction>
          <p className="fg-feb0a902a3" dir="auto" data-node-id="847:456">
            اعلام مشکل سفارش
          </p>
        </div>
        <p className="fg-1768f9d874" dir="auto" data-node-id="847:457">
          مشکل را ثبت کن تا به سفارش #NG-1054 متصل شود و تیم نگارین پیگیری کند.
        </p>
        <div className="fg-b7dd07ad23" data-node-id="847:458" data-name="Context indicator">
          <p className="fg-75aab8e729" dir="auto" data-node-id="847:459">
            سفارش مرتبط
          </p>
          <p className="fg-d65d64ca5a" dir="auto" data-node-id="847:460">
            #NG-1054 · در حال آماده‌سازی · ۲۴ عدد
          </p>
        </div>
        <p className="fg-5f7d8b7240" dir="auto" data-node-id="847:461">
          نوع مشکل
        </p>
        <div className="fg-d18181432e" data-node-id="847:462" data-name="Chips Layout">
          <div className="fg-ec4dc4bd6c" data-node-id="847:463" data-name="Frame">
            <p className="fg-fd9f09fee2" dir="auto" data-node-id="847:464">
              زمان/ظرفیت
            </p>
          </div>
          <div className="fg-e586718881" data-node-id="847:465" data-name="Frame">
            <p className="fg-1a456d3d59" dir="auto" data-node-id="847:466">
              کیفیت
            </p>
          </div>
          <div className="fg-e586718881" data-node-id="847:467" data-name="Frame">
            <p className="fg-1a456d3d59" dir="auto" data-node-id="847:468">
              بسته‌بندی
            </p>
          </div>
          <DesignAction className="fg-e586718881" data-node-id="847:469" data-name="Frame" label="ارسال/حمل">
            <p className="fg-1a456d3d59" dir="auto" data-node-id="847:470">
              ارسال/حمل
            </p>
          </DesignAction>
        </div>
        <DesignChoice className="fg-2176b57748" data-node-id="847:471" data-name="Checkbox Warning" label="✓ این مشکل ممکن است زمان تحویل سفارش را تغییر دهد." group="Modal Sheet" initial={false} multiple>
          <div className="fg-b8313a45ce" data-node-id="847:472" data-name="Box">
            <p className="fg-258b20c45a" data-node-id="847:473">
              ✓
            </p>
          </div>
          <p className="fg-6fabfd959d" dir="auto" data-node-id="847:474">
            این مشکل ممکن است زمان تحویل سفارش را تغییر دهد.
          </p>
        </DesignChoice>
        <p className="fg-5f7d8b7240" dir="auto" data-node-id="847:475">
          شرح مشکل
        </p>
        <DesignField className="fg-fdc4ba48bd" data-node-id="847:476" data-name="Input Box" label="Input Box" placeholder="مشکل را دقیق توضیح بده؛ چه اتفاقی افتاده است؟">
          <p className="fg-8287f28781" dir="auto" data-node-id="847:477">
            مشکل را دقیق توضیح بده؛ چه اتفاقی افتاده است؟
          </p>
        </DesignField>
        <div className="fg-fbb5fbd514" data-node-id="847:478" data-name="Actions">
          <DesignAction className="fg-3651dc4f5f" data-node-id="847:479" data-name="Negarin / Button" label="انصراف" destination="order-detail-preparing">
            <p className="fg-bf29e071b6" dir="auto" data-node-id="I847:479;46:53">
              انصراف
            </p>
          </DesignAction>
          <DesignAction className="fg-5f5f993372" data-node-id="847:482" data-name="Negarin / Button" label="ثبت گزارش مشکل">
            <p className="fg-336e74147d" dir="auto" data-node-id="I847:482;46:29">
              ثبت گزارش مشکل
            </p>
          </DesignAction>
        </div>
      </DesignDialog>
    </div>
  );
}
