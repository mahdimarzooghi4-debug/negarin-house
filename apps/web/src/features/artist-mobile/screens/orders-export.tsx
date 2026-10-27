// Figma 847:1428 — Artist / Orders Export — Mobile
import { DesignDialog, DesignAction } from "../../artist/design-controls";

export default function ArtistOrdersExportMobile() {
  return (
    <div className="fg-d37209cb37" data-node-id="847:1428" data-name="Artist / Orders Export — Mobile">
      <div className="fg-aaf8c1e790" data-node-id="847:1429" data-name="Status Bar" inert>
        <p className="fg-be6cbad51a" data-node-id="847:1430">
          ۹:۴۱
        </p>
        <div className="fg-860c2f1554" data-node-id="847:1431" data-name="Status Icons">
          <div className="fg-e73a823889" data-node-id="847:1432" data-name="Android / Mobile Signal">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
          </div>
          <div className="fg-d72f4eabc0" data-node-id="847:1434" data-name="Android / Wi-Fi">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/3027da5b.svg" />
          </div>
          <div className="fg-cbb4bfb8a6" data-node-id="847:1436" data-name="Android / Battery">
            <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2241d5a9.svg" />
          </div>
        </div>
      </div>
      <DesignDialog className="fg-d8714f50aa" data-node-id="847:1438" data-name="Sheet Wrapper" label="Artist / Orders Export — Mobile" closeDestination="orders">
        <div className="fg-e520bea30b" data-node-id="847:1439" data-name="Frame">
          <div className="fg-c8b6a5b18e" data-node-id="847:1440" data-name="Rectangle" />
        </div>
        <div className="fg-c96fe10678" data-node-id="847:1441" data-name="Frame">
          <div className="fg-557fad3eb8" data-node-id="847:1442" data-name="Close Area">
            <DesignAction className="fg-a0365615fe" data-node-id="847:1443" label="×" destination="orders">
              ×
            </DesignAction>
          </div>
          <div className="fg-7744c1925a" data-node-id="847:1444" data-name="Frame">
            <p className="fg-00b08f6bc3" dir="auto" data-node-id="847:1445">
              خروجی سفارش‌ها
            </p>
            <p className="fg-7f846ac2e7" dir="auto" data-node-id="847:1446">
              فیلترهای خروجی را انتخاب کن و فایل سفارش‌ها را دریافت کن.
            </p>
          </div>
        </div>
        <div className="fg-df0a3de519" data-node-id="847:1447" data-name="Line">
          <div className="fg-cf771a9448">
            <img alt="" className="fg-acc3667e96" src="/artist-mobile-assets/1e636316.svg" />
          </div>
        </div>
        <div className="fg-16f39653dc" data-node-id="847:1448" data-name="Frame">
          <div className="fg-62f39da6b2" data-node-id="847:1449" data-name="Frame">
            <p className="fg-19fa1bb32b" dir="auto" data-node-id="847:1450">
              بازه زمانی
            </p>
            <div className="fg-452d346712" data-node-id="847:1451" data-name="Frame">
              <div className="fg-09d21e39db" data-node-id="847:1452" data-name="Frame">
                <p className="fg-3bbe0f7654" dir="auto" data-node-id="847:1453">
                  تا تاریخ
                </p>
              </div>
              <div className="fg-09d21e39db" data-node-id="847:1454" data-name="Frame">
                <p className="fg-3bbe0f7654" dir="auto" data-node-id="847:1455">
                  از تاریخ
                </p>
              </div>
            </div>
          </div>
          <div className="fg-6a45c3dffb" data-node-id="847:1456" data-name="Frame">
            <p className="fg-dd217ff3c9" dir="auto" data-node-id="847:1457">
              وضعیت سفارش‌ها
            </p>
            <div className="fg-858446c7de" data-node-id="847:1458" data-name="Frame">
              <div className="fg-4bb9446c34" data-node-id="847:1459" data-name="Frame">
                <p className="fg-2d0fa8a474" data-node-id="847:1460">
                  ●
                </p>
                <p className="fg-dae01e360d" dir="auto" data-node-id="847:1461">
                  همه سفارش‌ها
                </p>
              </div>
              <div className="fg-c1ae9b8df2" data-node-id="847:1462" data-name="Frame">
                <p className="fg-fc7a3d01c3" data-node-id="847:1463">
                  ○
                </p>
                <p className="fg-a512ec1c49" dir="auto" data-node-id="847:1464">
                  در حال انجام
                </p>
              </div>
              <div className="fg-2e943f7295" data-node-id="847:1465" data-name="Frame">
                <p className="fg-fc7a3d01c3" data-node-id="847:1466">
                  ○
                </p>
                <p className="fg-a512ec1c49" dir="auto" data-node-id="847:1467">
                  نیازمند اقدام
                </p>
              </div>
              <div className="fg-67299ecc95" data-node-id="847:1468" data-name="Frame">
                <p className="fg-fc7a3d01c3" data-node-id="847:1469">
                  ○
                </p>
                <p className="fg-a512ec1c49" dir="auto" data-node-id="847:1470">
                  تکمیل‌شده
                </p>
              </div>
            </div>
          </div>
          <div className="fg-62f39da6b2" data-node-id="847:1471" data-name="Frame">
            <p className="fg-19fa1bb32b" dir="auto" data-node-id="847:1472">
              فرمت خروجی
            </p>
            <div className="fg-fbb5fbd514" data-node-id="847:1473" data-name="Frame">
              <div className="fg-fce86b4bda" data-node-id="847:1474" data-name="Frame">
                <p className="fg-9a5ffe1fb1" data-node-id="847:1475">
                  Excel (.xlsx)
                </p>
              </div>
              <div className="fg-c6f8d73ed4" data-node-id="847:1476" data-name="Frame">
                <p className="fg-d007d9646c" data-node-id="847:1477">
                  CSV (.csv)
                </p>
              </div>
              <div className="fg-c6f8d73ed4" data-node-id="847:1478" data-name="Frame">
                <p className="fg-d007d9646c" data-node-id="847:1479">
                  PDF
                </p>
              </div>
            </div>
          </div>
          <div className="fg-8016e29c44" data-node-id="847:1480" data-name="Frame">
            <p className="fg-04557a654e" dir="auto" data-node-id="847:1481">
              خروجی شامل شماره سفارش، وضعیت، تاریخ، نوع سفارش، تعداد/مبلغ و منبع سفارش خواهد بود.
            </p>
          </div>
          <div className="fg-099309aee6" data-node-id="847:1482" data-name="Frame">
            <DesignAction className="fg-5f5f993372" data-node-id="847:1483" data-name="Negarin / Button" label="دریافت خروجی سفارش‌ها">
              <p className="fg-55a6ebf983" dir="auto" data-node-id="I847:1483;46:29">
                دریافت خروجی سفارش‌ها
              </p>
            </DesignAction>
            <DesignAction className="fg-bb956a90c0" data-node-id="847:1486" data-name="Frame" label="انصراف" destination="orders">
              <p className="fg-4eb881e388" dir="auto" data-node-id="847:1487">
                انصراف
              </p>
            </DesignAction>
          </div>
        </div>
      </DesignDialog>
    </div>
  );
}
