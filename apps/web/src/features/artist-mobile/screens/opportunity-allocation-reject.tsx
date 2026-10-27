// Figma 853:1774 — Artist / Opportunity Allocation Reject — Mobile
import { DesignAction, DesignDialog, DesignChoice } from "../../artist/design-controls";

export default function ArtistOpportunityAllocationRejectMobile() {
  return (
    <div className="fg-086df3af3b" data-node-id="853:1774" data-name="Artist / Opportunity Allocation Reject — Mobile">
      <div className="fg-0ec3da1218" data-node-id="853:1775" data-name="order-allocation" inert>
        <div className="fg-aaf8c1e790" data-node-id="853:1776" data-name="Status Bar">
          <p className="fg-d94878d1d1" data-node-id="853:1777">
            ۹:۴۱
          </p>
          <div className="fg-860c2f1554" data-node-id="853:1778" data-name="Status Icons">
            <div className="fg-e73a823889" data-node-id="853:1779" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/70dcaa26.svg" />
            </div>
            <div className="fg-d72f4eabc0" data-node-id="853:1781" data-name="Android / Wi-Fi">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/3027da5b.svg" />
            </div>
            <div className="fg-cbb4bfb8a6" data-node-id="853:1783" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/2b3b7d1d.svg" />
            </div>
          </div>
        </div>
        <div className="fg-0dd56935fa" data-node-id="853:1785" data-name="Header">
          <div className="fg-c96fe10678" data-node-id="853:1786" data-name="Frame">
            <DesignAction className="fg-4687f21c7b" data-node-id="853:1787" data-name="Back Button" label="بازگشت به فرصت‌ها" destination="opportunities">
              <p className="fg-a3692aa1db" dir="auto" data-node-id="853:1788">
                بازگشت به فرصت‌ها
              </p>
              <div className="fg-8a0ff48924" data-node-id="853:1949" data-name="chevron-right">
                <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/778be68a.svg" />
              </div>
            </DesignAction>
            <p className="fg-344e60d5fe" dir="auto" data-node-id="853:1790">
              تخصیص سفارش
            </p>
          </div>
          <p className="fg-6e641f6fda" dir="auto" data-node-id="853:1791">
            سهم نهایی سفارش برای تو مشخص شده؛ جزئیات را بررسی و تا مهلت اعلام‌شده تأیید کن.
          </p>
        </div>
        <div className="fg-6742a384ae" data-node-id="853:1792" data-name="Content">
          <DesignAction className="fg-4ad55bfc65" data-node-id="853:1793" data-name="Status Card" label="تخصیص آماده ۲۴ عدد به تو تخصیص یافت برای شروع تولید، سهم سفارش را تأیید کن." destination="opportunity-order-allocation">
            <div className="fg-c96fe10678" data-node-id="853:1794" data-name="Frame">
              <div className="fg-5ce25e4c73" data-node-id="853:1795" data-name="Frame">
                <p className="fg-a3692aa1db" dir="auto" data-node-id="853:1796">
                  تخصیص آماده
                </p>
              </div>
              <p className="fg-9cd03e8a10" dir="auto" data-node-id="853:1797">
                ۲۴ عدد به تو تخصیص یافت
              </p>
            </div>
            <p className="fg-05d6b083a4" dir="auto" data-node-id="853:1798">
              برای شروع تولید، سهم سفارش را تأیید کن.
            </p>
          </DesignAction>
          <div className="fg-3e0318f2ab" data-node-id="853:1799" data-name="Opportunity Header">
            <div className="fg-9a8cd0e455" data-node-id="853:1800" data-name="Header Tags">
              <div className="fg-a3de5def30" data-node-id="853:1801" data-name="Frame">
                <p className="fg-9d67af1ff0" dir="auto" data-node-id="853:1802">
                  سفارش سازمانی
                </p>
              </div>
              <DesignAction className="fg-714b3ad1e5" data-node-id="853:1803" data-name="Frame" label="تأیید اولیه" destination="opportunity-order-allocation">
                <p className="fg-c8f424774e" dir="auto" data-node-id="853:1804">
                  تأیید اولیه
                </p>
              </DesignAction>
            </div>
            <p className="fg-d81bac7b9a" dir="auto" data-node-id="853:1805">
              تأمین هدیه دست‌ساز برای رویداد شرکتی
            </p>
            <p className="fg-cf71043c25" dir="auto" data-node-id="853:1806">
              پس از بررسی ظرفیت، ۲۴ عدد از سفارش برای تو در نظر گرفته شده است.
            </p>
            <div className="fg-ff0cfe19e1" data-node-id="853:1807" data-name="Stats Row">
              <div className="fg-f991e4a80b" data-node-id="853:1808" data-name="Frame">
                <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1809">
                  سهم نهایی
                </p>
                <p className="fg-6068afdc55" dir="auto" data-node-id="853:1810">
                  ۲۴ عدد
                </p>
              </div>
              <div className="fg-f991e4a80b" data-node-id="853:1811" data-name="Frame">
                <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1812">
                  مهلت آماده‌سازی
                </p>
                <p className="fg-6068afdc55" dir="auto" data-node-id="853:1813">
                  ۱۰ روز کاری
                </p>
              </div>
              <DesignAction className="fg-f991e4a80b" data-node-id="853:1814" data-name="Frame" label="وضعیت نیازمند تأیید" destination="opportunity-order-allocation">
                <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1815">
                  وضعیت
                </p>
                <p className="fg-d490f43715" dir="auto" data-node-id="853:1816">
                  نیازمند تأیید
                </p>
              </DesignAction>
            </div>
          </div>
          <div className="fg-8312781e48" data-node-id="853:1817" data-name="Review Timeline">
            <div className="fg-e88c62ad4c" data-node-id="853:1818" data-name="Frame">
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1819">
                وضعیت فعلی: تخصیص سفارش
              </p>
              <p className="fg-6454f41814" dir="auto" data-node-id="853:1820">
                روند درخواست فرصت
              </p>
            </div>
            <div className="fg-900a7dc8c9" data-node-id="853:1821" data-name="Timeline Steps">
              <div className="fg-4f7be699df" data-node-id="853:1822" data-name="Frame">
                <p className="fg-c46076e90c" data-node-id="853:1823">
                  ۴
                </p>
                <p className="fg-cb0d3cfdf1" dir="auto" data-node-id="853:1824">
                  تخصیص
                </p>
              </div>
              <div className="fg-d58ade0163" data-node-id="853:1825" data-name="Frame">
                <p className="fg-28f2d89a39" data-node-id="853:1826">
                  ✓ ۳
                </p>
                <p className="fg-edcd71d70b" dir="auto" data-node-id="853:1827">
                  تطبیق
                </p>
              </div>
              <div className="fg-d58ade0163" data-node-id="853:1828" data-name="Frame">
                <p className="fg-28f2d89a39" data-node-id="853:1829">
                  ✓ ۲
                </p>
                <p className="fg-edcd71d70b" dir="auto" data-node-id="853:1830">
                  بررسی
                </p>
              </div>
              <DesignAction className="fg-d58ade0163" data-node-id="853:1831" data-name="Frame" label="✓ ۱ ثبت" destination="opportunity-order-allocation">
                <p className="fg-28f2d89a39" data-node-id="853:1832">
                  ✓ ۱
                </p>
                <p className="fg-edcd71d70b" dir="auto" data-node-id="853:1833">
                  ثبت
                </p>
              </DesignAction>
            </div>
            <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1834">
              سهم تخصیص‌یافته را تا مهلت اعلام‌شده تأیید یا رد کن.
            </p>
          </div>
          <div className="fg-21122d25cd" data-node-id="853:1835" data-name="Request Summary">
            <p className="fg-e9b0b2df65" dir="auto" data-node-id="853:1836">
              خلاصه درخواست
            </p>
            <div className="fg-e8a3dbfa7a" data-node-id="853:1837" data-name="Frame">
              <p className="fg-6068afdc55" dir="auto" data-node-id="853:1838">
                ست پذیرایی دست‌ساز طرح فیروزه
              </p>
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1839">
                محصول
              </p>
            </div>
            <div className="fg-e8a3dbfa7a" data-node-id="853:1840" data-name="Frame">
              <p className="fg-6068afdc55" dir="auto" data-node-id="853:1841">
                ۲۴ از ۴۰ عدد
              </p>
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1842">
                ظرفیت
              </p>
            </div>
            <div className="fg-e8a3dbfa7a" data-node-id="853:1843" data-name="Frame">
              <p className="fg-6068afdc55" dir="auto" data-node-id="853:1844">
                ۱۰ روز کاری
              </p>
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1845">
                آماده‌سازی
              </p>
            </div>
            <div className="fg-e8a3dbfa7a" data-node-id="853:1846" data-name="Frame">
              <p className="fg-6068afdc55" dir="auto" data-node-id="853:1847">
                استاندارد نگارین
              </p>
              <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1848">
                بسته‌بندی
              </p>
            </div>
          </div>
          <div className="fg-5084ee251d" data-node-id="853:1849" data-name="Allocation Details">
            <p className="fg-1f5bd86875" dir="auto" data-node-id="853:1850">
              جزئیات تخصیص تو
            </p>
            <div className="fg-3f38be74b1" data-node-id="853:1851" data-name="Frame">
              <p className="fg-8ed12620f3" dir="auto" data-node-id="853:1852">
                سهم تخصیص‌یافته: ۲۴ عدد
              </p>
              <p className="fg-7bce30494d" data-node-id="853:1853">
                ✓
              </p>
            </div>
            <div className="fg-3f38be74b1" data-node-id="853:1854" data-name="Frame">
              <p className="fg-8ed12620f3" dir="auto" data-node-id="853:1855">
                زمان آماده‌سازی مورد انتظار: ۱۰ روز کاری
              </p>
              <p className="fg-7bce30494d" data-node-id="853:1856">
                ✓
              </p>
            </div>
            <div className="fg-3f38be74b1" data-node-id="853:1857" data-name="Frame">
              <p className="fg-8ed12620f3" dir="auto" data-node-id="853:1858">
                بسته‌بندی طبق استاندارد نگارین
              </p>
              <p className="fg-7bce30494d" data-node-id="853:1859">
                ✓
              </p>
            </div>
            <div className="fg-3f38be74b1" data-node-id="853:1860" data-name="Frame">
              <p className="fg-8ed12620f3" dir="auto" data-node-id="853:1861">
                پس از پذیرش، سفارش در بخش «سفارش‌ها» ایجاد می‌شود
              </p>
              <p className="fg-7bce30494d" data-node-id="853:1862">
                ✓
              </p>
            </div>
          </div>
          <div className="fg-c9aaeebf5e" data-node-id="853:1863" data-name="Action Card">
            <DesignAction className="fg-c96fe10678" data-node-id="853:1864" data-name="Frame" label="اقدام لازم سهم سفارش را تأیید کن" destination="opportunity-order-allocation">
              <div className="fg-5ce25e4c73" data-node-id="853:1865" data-name="Frame">
                <p className="fg-a3692aa1db" dir="auto" data-node-id="853:1866">
                  اقدام لازم
                </p>
              </div>
              <p className="fg-9cd03e8a10" dir="auto" data-node-id="853:1867">
                سهم سفارش را تأیید کن
              </p>
            </DesignAction>
            <p className="fg-a6174f2584" dir="auto" data-node-id="853:1868">
              با تأیید، سفارش برای تو ایجاد می‌شود و وارد بخش سفارش‌ها خواهد شد.
            </p>
            <div className="fg-fbb5fbd514" data-node-id="853:1869" data-name="Frame">
              <div className="fg-9d74613703" data-node-id="853:1870" data-name="Frame">
                <p className="fg-7ea9d4186a" dir="auto" data-node-id="853:1871">
                  رد تخصیص
                </p>
              </div>
              <div className="fg-e702a3f7ed" data-node-id="853:1872" data-name="Frame">
                <p className="fg-fcdff1eff0" dir="auto" data-node-id="853:1873">
                  پذیرش سفارش
                </p>
              </div>
            </div>
          </div>
          <DesignAction className="fg-2597d853a2" data-node-id="853:1874" data-name="Commitment Note" label="تعهد پس از پذیرش سفارش با پذیرش این تخصیص، ظرفیت و زمان آماده‌سازی اعلام‌شده به‌عنوان تعهد سفارش ثبت می‌شود و سفارش وارد جریان اجرایی خواهد شد." destination="opportunity-order-allocation">
            <p className="fg-aea68b7354" dir="auto" data-node-id="853:1875">
              تعهد پس از پذیرش سفارش
            </p>
            <p className="fg-34d070c87e" dir="auto" data-node-id="853:1876">
              با پذیرش این تخصیص، ظرفیت و زمان آماده‌سازی اعلام‌شده به‌عنوان تعهد سفارش ثبت می‌شود و سفارش وارد جریان اجرایی خواهد شد.
            </p>
          </DesignAction>
        </div>
        <div className="fg-97849b76a8" data-node-id="853:1877" data-name="Bottom Nav">
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1878" data-name="Tab-حساب" label="حساب" destination="account">
            <div className="fg-b2a182ecf4" data-node-id="853:1879" data-name="Icon-profile">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/4c8e3296.svg" />
            </div>
            <p className="fg-5c87ac42ec" dir="auto" data-node-id="853:1881">
              حساب
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1882" data-name="Tab-فرصت‌ها" label="فرصت‌ها">
            <div className="fg-b2a182ecf4" data-node-id="853:1883" data-name="Icon-opportunities">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/4836fca5.svg" />
            </div>
            <p className="fg-c07cb6c830" dir="auto" data-node-id="853:1885">
              فرصت‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1886" data-name="Tab-محصولات" label="محصولات" destination="products">
            <div className="fg-b2a182ecf4" data-node-id="853:1887" data-name="Icon-products">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/5727e4ec.svg" />
            </div>
            <p className="fg-5c87ac42ec" dir="auto" data-node-id="853:1889">
              محصولات
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1890" data-name="Tab-سفارش‌ها" label="سفارش‌ها" destination="orders">
            <div className="fg-b2a182ecf4" data-node-id="853:1891" data-name="Icon-orders">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/d6d42b84.svg" />
            </div>
            <p className="fg-5c87ac42ec" dir="auto" data-node-id="853:1893">
              سفارش‌ها
            </p>
          </DesignAction>
          <DesignAction className="fg-5cce6a5a00" data-node-id="853:1894" data-name="Tab-خانه" label="خانه" destination="dashboard">
            <div className="fg-b2a182ecf4" data-node-id="853:1895" data-name="Icon-home">
              <img alt="" className="fg-8faf267d30" src="/artist-mobile-assets/705856a5.svg" />
            </div>
            <p className="fg-5c87ac42ec" dir="auto" data-node-id="853:1897">
              خانه
            </p>
          </DesignAction>
        </div>
      </div>
      <div className="fg-4401716318" data-node-id="853:1898" data-name="Scrim" />
      <DesignDialog className="fg-bef36ed445" data-node-id="853:1899" data-name="Reject Bottom Sheet" label="Artist / Opportunity Allocation Reject — Mobile" closeDestination="opportunities">
        <div className="fg-43fc3f35b0" data-node-id="853:1900" data-name="Frame">
          <DesignAction className="fg-0d301f6ddb" data-node-id="853:1901" label="×" destination="opportunities">
            ×
          </DesignAction>
          <p className="fg-bf5a29f145" dir="auto" data-node-id="853:1902">
            رد تخصیص سفارش
          </p>
        </div>
        <p className="fg-6e641f6fda" dir="auto" data-node-id="853:1903">
          اگر این سهم را نمی‌پذیری، دلیل را مشخص کن. پس از تأیید، سفارشی برای این تخصیص در بخش سفارش‌ها ایجاد نمی‌شود.
        </p>
        <div className="fg-32b1f56598" data-node-id="853:1904" data-name="Allocation Summary">
          <p className="fg-7f846ac2e7" dir="auto" data-node-id="853:1905">
            تخصیص فعلی
          </p>
          <p className="fg-aacdad8b86" dir="auto" data-node-id="853:1906">
            ۲۴ عدد · سفارش سازمانی
          </p>
          <p className="fg-d2fb4072eb" dir="auto" data-node-id="853:1907">
            تأمین هدیه دست‌ساز برای رویداد شرکتی
          </p>
        </div>
        <div className="fg-62f39da6b2" data-node-id="853:1908" data-name="Reasons List">
          <p className="fg-cf354ecbf1" dir="auto" data-node-id="853:1909">
            دلیل رد تخصیص
          </p>
          <div className="fg-7cd00e79c5" data-node-id="853:1910" data-name="Reason Row 0">
            <DesignChoice className="fg-188b00133f" data-node-id="853:1911" data-name="Radio Circle" label="Radio Circle" group="Reason Row 0" initial={false}>
              <div className="fg-09049ce5b9" data-node-id="853:1912" data-name="Rectangle" />
            </DesignChoice>
            <p className="fg-5b38b81baf" dir="auto" data-node-id="853:1913">
              ظرفیت کافی برای این تعداد ندارم
            </p>
          </div>
          <div className="fg-8e7605d77c" data-node-id="853:1914" data-name="Reason Row 1">
            <div className="fg-ac92024439" data-node-id="853:1915" data-name="Radio Circle" />
            <p className="fg-5b38b81baf" dir="auto" data-node-id="853:1916">
              زمان آماده‌سازی برایم مناسب نیست
            </p>
          </div>
          <div className="fg-8e7605d77c" data-node-id="853:1917" data-name="Reason Row 2">
            <div className="fg-ac92024439" data-node-id="853:1918" data-name="Radio Circle" />
            <p className="fg-5b38b81baf" dir="auto" data-node-id="853:1919">
              مواد اولیه یا امکانات لازم آماده نیست
            </p>
          </div>
          <div className="fg-8e7605d77c" data-node-id="853:1920" data-name="Reason Row 3">
            <div className="fg-ac92024439" data-node-id="853:1921" data-name="Radio Circle" />
            <p className="fg-5b38b81baf" dir="auto" data-node-id="853:1922">
              شرایط این سفارش برایم مناسب نیست
            </p>
          </div>
          <div className="fg-8e7605d77c" data-node-id="853:1923" data-name="Reason Row 4">
            <div className="fg-ac92024439" data-node-id="853:1924" data-name="Radio Circle" />
            <p className="fg-5b38b81baf" dir="auto" data-node-id="853:1925">
              سایر
            </p>
          </div>
        </div>
        <div className="fg-011d44306d" data-node-id="853:1926" data-name="Additional Notes">
          <p className="fg-cf354ecbf1" dir="auto" data-node-id="853:1927">
            توضیح تکمیلی (اختیاری)
          </p>
          <div className="fg-d8cb4ec18d" data-node-id="853:1928" data-name="Textarea Wrapper">
            <p className="fg-7350bdf7b6" dir="auto" data-node-id="853:1929">
              اگر لازم است جزئیات بیشتری برای نگارین بنویس...
            </p>
          </div>
        </div>
        <DesignAction className="fg-21785cc83c" data-node-id="853:1930" data-name="Alert Banner" label="پس از تأیید، این سهم می‌تواند برای تخصیص به هنرمند دیگری آزاد شود." destination="opportunity-order-allocation">
          <p className="fg-8927a281a0" dir="auto" data-node-id="853:1931">
            پس از تأیید، این سهم می‌تواند برای تخصیص به هنرمند دیگری آزاد شود.
          </p>
        </DesignAction>
        <div className="fg-fbb5fbd514" data-node-id="853:1932" data-name="Frame">
          <DesignAction className="fg-3651dc4f5f" data-node-id="853:1933" data-name="Negarin / Button" label="انصراف" destination="opportunities">
            <p className="fg-54beba6aa5" dir="auto" data-node-id="I853:1933;46:53">
              انصراف
            </p>
          </DesignAction>
          <DesignAction className="fg-9536590778" data-node-id="853:1936" data-name="Negarin / Button" label="تأیید رد تخصیص" destination="opportunity-order-allocation">
            <p className="fg-6f2c757254" dir="auto" data-node-id="I853:1936;46:41">
              تأیید رد تخصیص
            </p>
          </DesignAction>
        </div>
      </DesignDialog>
    </div>
  );
}
