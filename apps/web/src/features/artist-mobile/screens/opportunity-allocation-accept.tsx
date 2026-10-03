// Figma 853:1617 — Artist / Opportunity Allocation Accept — Mobile
import { DesignAction, DesignDialog, DesignChoice } from "../../artist/design-controls";

export default function ArtistOpportunityAllocationAcceptMobile() {
  return (
    <div className="fg-086df3af3b" data-node-id="853:1617" data-name="Artist / Opportunity Allocation Accept — Mobile">
      <div className="fg-0ec3da1218" data-node-id="853:1618" data-name="order-allocation" inert>
        <div className="fg-aaf8c1e790" data-node-id="853:1619" data-name="Status Bar">
          <p className="fg-d94878d1d1" data-node-id="853:1620">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="853:1621" data-name="Status Icons">
            <div className="fg-e73a823889" data-node-id="853:1622" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="853:1624" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/3027da5b.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="853:1626" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2b3b7d1d.svg" />
            </div>
          </div>
        </div>
        <div className="fg-0dd56935fa" data-node-id="853:1628" data-name="Header">
          <div className="fg-c96fe10678" data-node-id="853:1629" data-name="Frame">
            <DesignAction className="fg-4687f21c7b" data-node-id="853:1630" data-name="Back Button" label="بازگشت به فرصت‌ها" destination="opportunities">
              <p className="fg-a3692aa1db" dir="auto" data-node-id="853:1631">
                بازگشت به فرصت‌ها
              </p>
              <div className="fg-8a0ff48924" data-node-id="853:1946" data-name="chevron-right">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/778be68a.svg" />
              </div>
            </DesignAction>
            <p className="fg-344e60d5fe" dir="auto" data-node-id="853:1633">
              تخصیص سفارش
            </p>
          </div>
          <p className="fg-6e641f6fda" dir="auto" data-node-id="853:1634">
            سهم نهایی سفارش برای تو مشخص شده؛ جزئیات را بررسی و تا مهلت اعلام‌شده تأیید کن.
          </p>
        </div>
        <div className="fg-6742a384ae" data-node-id="853:1635" data-name="Content">
          <DesignAction className="fg-4ad55bfc65" data-node-id="853:1636" data-name="Status Card" label="تخصیص آماده ۲۴ عدد به تو تخصیص یافت برای شروع تولید، سهم سفارش را تأیید کن." destination="opportunity-order-allocation">
            <div className="fg-c96fe10678" data-node-id="853:1637" data-name="Frame">
              <div className="fg-5ce25e4c73" data-node-id="853:1638" data-name="Frame">
                <p className="fg-a3692aa1db" dir="auto" data-node-id="853:1639">
                  تخصیص آماده
                </p>
              </div>
              <p className="fg-9cd03e8a10" dir="auto" data-node-id="853:1640">
                ۲۴ عدد به تو تخصیص یافت
              </p>
            </div>
            <p className="fg-05d6b083a4" dir="auto" data-node-id="853:1641">
              برای شروع تولید، سهم سفارش را تأیید کن.
            </p>
          </DesignAction>
          <div className="fg-3e0318f2ab" data-node-id="853:1642" data-name="Opportunity Header">
            <div className="fg-9a8cd0e455" data-node-id="853:1643" data-name="Header Tags">
              <div className="fg-a3de5def30" data-node-id="853:1644" data-name="Frame">
                <p className="fg-9d67af1ff0" dir="auto" data-node-id="853:1645">
                  سفارش سازمانی
                </p>
              </div>
              <DesignAction className="fg-714b3ad1e5" data-node-id="853:1646" data-name="Frame" label="تأیید اولیه" destination="opportunity-order-allocation">
                <p className="fg-c8f424774e" dir="auto" data-node-id="853:1647">
                  تأیید اولیه
                </p>
              </DesignAction>
            </div>
            <p className="fg-d81bac7b9a" dir="auto" data-node-id="853:1648">
              تأمین هدیه دست‌ساز برای رویداد شرکتی
            </p>
            <p className="fg-cf71043c25" dir="auto" data-node-id="853:1649">
              پس از بررسی ظرفیت، ۲۴ عدد از سفارش برای تو در نظر گرفته شده است.
            </p>
            <div className="fg-ff0cfe19e1" data-node-id="853:1650" data-name="Stats Row">
              <div className="fg-f991e4a80b" data-node-id="853:1651" data-name="Frame">
                <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1652">
                  سهم نهایی
                </p>
                <p className="fg-6068afdc55" dir="auto" data-node-id="853:1653">
                  ۲۴ عدد
                </p>
              </div>
              <div className="fg-f991e4a80b" data-node-id="853:1654" data-name="Frame">
                <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1655">
                  مهلت آماده‌سازی
                </p>
                <p className="fg-6068afdc55" dir="auto" data-node-id="853:1656">
                  ۱۰ روز کاری
                </p>
              </div>
              <DesignAction className="fg-f991e4a80b" data-node-id="853:1657" data-name="Frame" label="وضعیت نیازمند تأیید" destination="opportunity-order-allocation">
                <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1658">
                  وضعیت
                </p>
                <p className="fg-d490f43715" dir="auto" data-node-id="853:1659">
                  نیازمند تأیید
                </p>
              </DesignAction>
            </div>
          </div>
          <div className="fg-8312781e48" data-node-id="853:1660" data-name="Review Timeline">
            <div className="fg-e88c62ad4c" data-node-id="853:1661" data-name="Frame">
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1662">
                وضعیت فعلی: تخصیص سفارش
              </p>
              <p className="fg-6454f41814" dir="auto" data-node-id="853:1663">
                روند درخواست فرصت
              </p>
            </div>
            <div className="fg-900a7dc8c9" data-node-id="853:1664" data-name="Timeline Steps">
              <div className="fg-4f7be699df" data-node-id="853:1665" data-name="Frame">
                <p className="fg-c46076e90c" data-node-id="853:1666">
                  ۴
                </p>
                <p className="fg-cb0d3cfdf1" dir="auto" data-node-id="853:1667">
                  تخصیص
                </p>
              </div>
              <div className="fg-d58ade0163" data-node-id="853:1668" data-name="Frame">
                <p className="fg-28f2d89a39" data-node-id="853:1669">
                  ✓ ۳
                </p>
                <p className="fg-edcd71d70b" dir="auto" data-node-id="853:1670">
                  تطبیق
                </p>
              </div>
              <div className="fg-d58ade0163" data-node-id="853:1671" data-name="Frame">
                <p className="fg-28f2d89a39" data-node-id="853:1672">
                  ✓ ۲
                </p>
                <p className="fg-edcd71d70b" dir="auto" data-node-id="853:1673">
                  بررسی
                </p>
              </div>
              <DesignAction className="fg-d58ade0163" data-node-id="853:1674" data-name="Frame" label="✓ ۱ ثبت" destination="opportunity-order-allocation">
                <p className="fg-28f2d89a39" data-node-id="853:1675">
                  ✓ ۱
                </p>
                <p className="fg-edcd71d70b" dir="auto" data-node-id="853:1676">
                  ثبت
                </p>
              </DesignAction>
            </div>
            <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1677">
              سهم تخصیص‌یافته را تا مهلت اعلام‌شده تأیید یا رد کن.
            </p>
          </div>
          <div className="fg-21122d25cd" data-node-id="853:1678" data-name="Request Summary">
            <p className="fg-e9b0b2df65" dir="auto" data-node-id="853:1679">
              خلاصه درخواست
            </p>
            <div className="fg-e8a3dbfa7a" data-node-id="853:1680" data-name="Frame">
              <p className="fg-6068afdc55" dir="auto" data-node-id="853:1681">
                ست پذیرایی دست‌ساز طرح فیروزه
              </p>
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1682">
                محصول
              </p>
            </div>
            <div className="fg-e8a3dbfa7a" data-node-id="853:1683" data-name="Frame">
              <p className="fg-6068afdc55" dir="auto" data-node-id="853:1684">
                ۲۴ از ۴۰ عدد
              </p>
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1685">
                ظرفیت
              </p>
            </div>
            <div className="fg-e8a3dbfa7a" data-node-id="853:1686" data-name="Frame">
              <p className="fg-6068afdc55" dir="auto" data-node-id="853:1687">
                ۱۰ روز کاری
              </p>
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1688">
                آماده‌سازی
              </p>
            </div>
            <div className="fg-e8a3dbfa7a" data-node-id="853:1689" data-name="Frame">
              <p className="fg-6068afdc55" dir="auto" data-node-id="853:1690">
                استاندارد نگارین
              </p>
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1691">
                بسته‌بندی
              </p>
            </div>
          </div>
          <div className="fg-5084ee251d" data-node-id="853:1692" data-name="Allocation Details">
            <p className="fg-1f5bd86875" dir="auto" data-node-id="853:1693">
              جزئیات تخصیص تو
            </p>
            <div className="fg-3f38be74b1" data-node-id="853:1694" data-name="Frame">
              <p className="fg-8ed12620f3" dir="auto" data-node-id="853:1695">
                سهم تخصیص‌یافته: ۲۴ عدد
              </p>
              <p className="fg-7bce30494d" data-node-id="853:1696">
                ✓
              </p>
            </div>
            <div className="fg-3f38be74b1" data-node-id="853:1697" data-name="Frame">
              <p className="fg-8ed12620f3" dir="auto" data-node-id="853:1698">
                زمان آماده‌سازی مورد انتظار: ۱۰ روز کاری
              </p>
              <p className="fg-7bce30494d" data-node-id="853:1699">
                ✓
              </p>
            </div>
            <div className="fg-3f38be74b1" data-node-id="853:1700" data-name="Frame">
              <p className="fg-8ed12620f3" dir="auto" data-node-id="853:1701">
                بسته‌بندی طبق استاندارد نگارین
              </p>
              <p className="fg-7bce30494d" data-node-id="853:1702">
                ✓
              </p>
            </div>
            <div className="fg-3f38be74b1" data-node-id="853:1703" data-name="Frame">
              <p className="fg-8ed12620f3" dir="auto" data-node-id="853:1704">
                پس از پذیرش، سفارش در بخش «سفارش‌ها» ایجاد می‌شود
              </p>
              <p className="fg-7bce30494d" data-node-id="853:1705">
                ✓
              </p>
            </div>
          </div>
          <div className="fg-c9aaeebf5e" data-node-id="853:1706" data-name="Action Card">
            <DesignAction className="fg-c96fe10678" data-node-id="853:1707" data-name="Frame" label="اقدام لازم سهم سفارش را تأیید کن" destination="opportunity-order-allocation">
              <div className="fg-5ce25e4c73" data-node-id="853:1708" data-name="Frame">
                <p className="fg-a3692aa1db" dir="auto" data-node-id="853:1709">
                  اقدام لازم
                </p>
              </div>
              <p className="fg-9cd03e8a10" dir="auto" data-node-id="853:1710">
                سهم سفارش را تأیید کن
              </p>
            </DesignAction>
            <p className="fg-a6174f2584" dir="auto" data-node-id="853:1711">
              با تأیید، سفارش برای تو ایجاد می‌شود و وارد بخش سفارش‌ها خواهد شد.
            </p>
            <div className="fg-fbb5fbd514" data-node-id="853:1712" data-name="Frame">
              <div className="fg-9d74613703" data-node-id="853:1713" data-name="Frame">
                <p className="fg-7ea9d4186a" dir="auto" data-node-id="853:1714">
                  رد تخصیص
                </p>
              </div>
              <div className="fg-e702a3f7ed" data-node-id="853:1715" data-name="Frame">
                <p className="fg-fcdff1eff0" dir="auto" data-node-id="853:1716">
                  پذیرش سفارش
                </p>
              </div>
            </div>
          </div>
          <DesignAction className="fg-2597d853a2" data-node-id="853:1717" data-name="Commitment Note" label="تعهد پس از پذیرش سفارش با پذیرش این تخصیص، ظرفیت و زمان آماده‌سازی اعلام‌شده به‌عنوان تعهد سفارش ثبت می‌شود و سفارش وارد جریان اجرایی خواهد شد." destination="opportunity-order-allocation">
            <p className="fg-aea68b7354" dir="auto" data-node-id="853:1718">
              تعهد پس از پذیرش سفارش
            </p>
            <p className="fg-34d070c87e" dir="auto" data-node-id="853:1719">
              با پذیرش این تخصیص، ظرفیت و زمان آماده‌سازی اعلام‌شده به‌عنوان تعهد سفارش ثبت می‌شود و سفارش وارد جریان اجرایی خواهد شد.
            </p>
          </DesignAction>
        </div>
        <div className="fg-97849b76a8" data-node-id="853:1720" data-name="Bottom Nav">
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1721" data-name="Tab-حساب" label="حساب" destination="account">
            <div className="fg-b2a182ecf4" data-node-id="853:1722" data-name="Icon-profile">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/4c8e3296.svg" />
            </div>
            <p className="fg-5c87ac42ec" dir="auto" data-node-id="853:1724">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1725" data-name="Tab-فرصت‌ها" label="فرصت‌ها">
            <div className="fg-b2a182ecf4" data-node-id="853:1726" data-name="Icon-opportunities">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/4836fca5.svg" />
            </div>
            <p className="fg-c07cb6c830" dir="auto" data-node-id="853:1728">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1729" data-name="Tab-محصولات" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="853:1730" data-name="Icon-products">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/5727e4ec.svg" />
            </div>
            <p className="fg-5c87ac42ec" dir="auto" data-node-id="853:1732">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1733" data-name="Tab-سفارش‌ها" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="853:1734" data-name="Icon-orders">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/d6d42b84.svg" />
            </div>
            <p className="fg-5c87ac42ec" dir="auto" data-node-id="853:1736">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1737" data-name="Tab-خانه" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="853:1738" data-name="Icon-home">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/705856a5.svg" />
            </div>
            <p className="fg-5c87ac42ec" dir="auto" data-node-id="853:1740">
              خانه
            </p>
          </DesignAction>
        </div>
      </div>
      <div className="fg-4401716318" data-node-id="853:1741" data-name="Scrim" />
      <DesignDialog className="fg-f404237b98" data-node-id="853:1742" data-name="Accept Bottom Sheet" label="Artist / Opportunity Allocation Accept — Mobile" closeDestination="opportunities">
        <div className="fg-43fc3f35b0" data-node-id="853:1743" data-name="Frame">
          <DesignAction className="fg-0d301f6ddb" data-node-id="853:1744" label="×" destination="opportunities">
            ×
          </DesignAction>
          <p className="fg-bf5a29f145" dir="auto" data-node-id="853:1745">
            پذیرش سفارش تخصیص‌یافته
          </p>
        </div>
        <p className="fg-56a4577600" dir="auto" data-node-id="853:1746">
          با تأیید، این تخصیص به سفارش فعال تبدیل می‌شود و در بخش «سفارش‌ها» قرار می‌گیرد.
        </p>
        <div className="fg-4742ed97ea" data-node-id="853:1747" data-name="Allocation Summary">
          <p className="fg-f477bfcc9c" dir="auto" data-node-id="853:1748">
            خلاصه تخصیص
          </p>
          <p className="fg-aacdad8b86" dir="auto" data-node-id="853:1749">
            تأمین هدیه دست‌ساز برای رویداد شرکتی
          </p>
          <p className="fg-d2fb4072eb" dir="auto" data-node-id="853:1750">
            ۲۴ عدد تخصیص‌یافته • زمان آماده‌سازی نمونه: ۱۲ روز کاری
          </p>
        </div>
        <div className="fg-ab493c410b" data-node-id="853:1751" data-name="Checklist">
          <p className="fg-cf354ecbf1" dir="auto" data-node-id="853:1752">
            قبل از پذیرش تأیید کن:
          </p>
          <div className="fg-f4b4d8a455" data-node-id="853:1753" data-name="Confirm Row 0">
            <DesignChoice className="fg-c30d29103c" data-node-id="853:1754" data-name="Checkbox" label="✓" group="Confirm Row 0" initial={false} multiple>
              <p className="fg-584b94d333" data-node-id="853:1755">
                ✓
              </p>
            </DesignChoice>
            <p className="fg-392b031b7e" dir="auto" data-node-id="853:1756">
              ظرفیت تولید برای ۲۴ عدد را بررسی کرده‌ام.
            </p>
          </div>
          <div className="fg-f4b4d8a455" data-node-id="853:1757" data-name="Confirm Row 1">
            <DesignChoice className="fg-c30d29103c" data-node-id="853:1758" data-name="Checkbox" label="✓" group="Confirm Row 1" initial={false} multiple>
              <p className="fg-584b94d333" data-node-id="853:1759">
                ✓
              </p>
            </DesignChoice>
            <p className="fg-392b031b7e" dir="auto" data-node-id="853:1760">
              زمان آماده‌سازی اعلام‌شده را بررسی کرده‌ام.
            </p>
          </div>
          <div className="fg-f4b4d8a455" data-node-id="853:1761" data-name="Confirm Row 2">
            <DesignChoice className="fg-c30d29103c" data-node-id="853:1762" data-name="Checkbox" label="✓" group="Confirm Row 2" initial={false} multiple>
              <p className="fg-584b94d333" data-node-id="853:1763">
                ✓
              </p>
            </DesignChoice>
            <p className="fg-392b031b7e" dir="auto" data-node-id="853:1764">
              می‌دانم پس از پذیرش، سفارش وارد فرایند اجرای سفارش‌ها می‌شود.
            </p>
          </div>
        </div>
        <DesignAction className="fg-58c0c1f7aa" data-node-id="853:1765" data-name="Info Banner" label="پذیرش این سفارش به‌تنهایی باعث ارتقای سطح نمی‌شود؛ نتیجه اجرای موفق آن در معیارهای کمی رشد ثبت می‌شود." destination="opportunity-order-allocation">
          <p className="fg-28e88cbde5" dir="auto" data-node-id="853:1766">
            پذیرش این سفارش به‌تنهایی باعث ارتقای سطح نمی‌شود؛ نتیجه اجرای موفق آن در معیارهای کمی رشد ثبت می‌شود.
          </p>
        </DesignAction>
        <div className="fg-fbb5fbd514" data-node-id="853:1767" data-name="Frame">
          <DesignAction className="fg-3651dc4f5f" data-node-id="853:1768" data-name="Negarin / Button" label="انصراف" destination="opportunities">
            <p className="fg-54beba6aa5" dir="auto" data-node-id="I853:1768;46:53">
              انصراف
            </p>
          </DesignAction>
          <DesignAction className="fg-7902cb33b7" data-node-id="853:1771" data-name="Negarin / Button" label="تأیید و پذیرش" destination="opportunity-order-allocation">
            <p className="fg-7ee08abcb6" dir="auto" data-node-id="I853:1771;45:11">
              تأیید و پذیرش
            </p>
          </DesignAction>
        </div>
      </DesignDialog>
    </div>
  );
}
