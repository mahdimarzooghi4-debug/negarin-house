// Figma 894:1733 — Admin / Order Allocation — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOrderAllocationDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:1733" data-name="Admin / Order Allocation — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:1734" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:1735" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:1736" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:1737" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/4b7f3d2f.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="894:1738" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="894:1739" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-87f65ec773" data-node-id="894:1740" data-name="bell">
                <div className="fg-0bb5547f93" data-node-id="894:2025" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/03ae448d.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:1742" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:1743" data-name="Global Search" label="جستجو" placeholder="جستجو در فرصت‌ها، هنرمندان و ...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:1744">
                جستجو در فرصت‌ها، هنرمندان و ...
              </p>
              <div className="fg-c55cd499f6" data-node-id="894:1745" data-name="search">
                <div className="fg-0bb5547f93" data-node-id="894:2028" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/1d6399f8.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:1747">
              مدیریت تخصیص سفارش
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:1748" data-name="Scrollable Content">
          <div className="fg-787154cfd0" data-node-id="894:1749" data-name="Breadcrumbs">
            <div className="fg-98b2f2b29d" data-node-id="894:1750" data-name="Frame">
              <p className="fg-8fc2866737" dir="auto" data-node-id="894:1751">
                تخصیص سفارش
              </p>
              <p className="fg-58d61dbfc5" data-node-id="894:1752">{`<`}</p>
            </div>
            <div className="fg-54b45105c3" data-node-id="894:1753" data-name="Frame">
              <p className="fg-e0a2bb2a5c" data-node-id="894:1754">
                OPP-1024
              </p>
              <p className="fg-95fadf4847" data-node-id="894:1755">{`<`}</p>
            </div>
            <div className="fg-e8210ba625" data-node-id="894:1756" data-name="Frame">
              <p className="fg-8de26e16c8" dir="auto" data-node-id="894:1757">
                فرصت‌ها
              </p>
            </div>
          </div>
          <div className="fg-867b1b2e34" data-node-id="894:1758" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:1759" data-name="Metric Shortcut" label="۱ در انتظار پاسخ" destination="service-requests">
              <p className="fg-c9547361f2" data-node-id="894:1760">
                ۱
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:1761">
                در انتظار پاسخ
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:1762" data-name="Metric Shortcut" label="۱ رد هنرمند" destination="service-requests">
              <p className="fg-73ab430732" data-node-id="894:1763">
                ۱
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:1764">
                رد هنرمند
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:1765" data-name="Metric Shortcut" label="۳ تأیید هنرمند" destination="service-requests">
              <p className="fg-bdab2c756d" data-node-id="894:1766">
                ۳
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:1767">
                تأیید هنرمند
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:1768" data-name="Metric Shortcut" label="۵ کل تخصیص‌ها" destination="service-requests">
              <p className="fg-5061c0f8a0" data-node-id="894:1769">
                ۵
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:1770">
                کل تخصیص‌ها
              </p>
            </DesignAction>
          </div>
          <div className="fg-a1f410f2dc" data-node-id="894:1771" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="894:1772">
              لیست پاسخ‌ها و سفارش‌های ایجاد شده
            </p>
            <div className="fg-ceebe80a1f" data-node-id="894:1773" data-name="Table Wrapper">
              <div className="fg-0611869c9d" data-node-id="894:1774" data-name="Table Header Row">
                <p className="fg-7e3af72b0e" dir="auto" data-node-id="894:1775">
                  اقدام
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:1776">
                  تاریخ تخصیص
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:1777">
                  وضعیت انجام
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:1778">
                  سفارش مرتبط
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="894:1779">
                  وضعیت پاسخ هنرمند
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:1780">
                  تعداد تخصیص
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:1781">
                  هنرمند منتخب
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="894:1782" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="894:1783" data-name="Table Row">
                  <div className="fg-9eaf4f10dd" data-node-id="894:1784" data-name="Frame">
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1785">
                      پیگیری
                    </p>
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1786">
                      مشاهده
                    </p>
                  </div>
                  <p className="fg-063362e6ef" data-node-id="894:1787">
                    ۱۴۰۲/۱۰/۱۶
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="894:1788">
                    آماده‌سازی
                  </p>
                  <p className="fg-2afdd39038" data-node-id="894:1789">
                    ORD-1024
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:1790" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1791" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1792">
                        پذیرفته
                      </p>
                    </div>
                  </div>
                  <p className="fg-f108d02eff" dir="auto" data-node-id="894:1793">
                    ۱۵ عدد
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1794" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1795">
                      ART-1092
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1796">
                      زهرا کریمی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1797" data-name="Table Row">
                  <div className="fg-9eaf4f10dd" data-node-id="894:1798" data-name="Frame">
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1799">
                      پیگیری
                    </p>
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1800">
                      مشاهده
                    </p>
                  </div>
                  <p className="fg-063362e6ef" data-node-id="894:1801">
                    ۱۴۰۲/۱۰/۱۶
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="894:1802">
                    شروع نشده
                  </p>
                  <p className="fg-2afdd39038" data-node-id="894:1803">
                    ORD-1025
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:1804" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1805" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1806">
                        پذیرفته
                      </p>
                    </div>
                  </div>
                  <p className="fg-f108d02eff" dir="auto" data-node-id="894:1807">
                    ۱۵ عدد
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1808" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1809">
                      ART-1104
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1810">
                      محمد محسنی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1811" data-name="Table Row">
                  <div className="fg-9eaf4f10dd" data-node-id="894:1812" data-name="Frame">
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1813">
                      پیگیری
                    </p>
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1814">
                      مشاهده
                    </p>
                  </div>
                  <p className="fg-063362e6ef" data-node-id="894:1815">
                    ۱۴۰۲/۱۰/۱۷
                  </p>
                  <p className="fg-a641f5bf4c" data-node-id="894:1816">
                    —
                  </p>
                  <p className="fg-2afdd39038" data-node-id="894:1817">
                    —
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:1818" data-name="Frame">
                    <div className="fg-b121f56fe2" data-node-id="894:1819" data-name="Badge">
                      <p className="fg-8357c38e8d" dir="auto" data-node-id="894:1820">
                        در انتظار پاسخ
                      </p>
                    </div>
                  </div>
                  <p className="fg-f108d02eff" dir="auto" data-node-id="894:1821">
                    ۲۰ عدد
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1822" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1823">
                      ART-1212
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1824">
                      مریم رضایی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1825" data-name="Table Row">
                  <div className="fg-9eaf4f10dd" data-node-id="894:1826" data-name="Frame">
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1827">
                      پیگیری
                    </p>
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1828">
                      مشاهده
                    </p>
                  </div>
                  <p className="fg-063362e6ef" data-node-id="894:1829">
                    ۱۴۰۲/۱۰/۱۵
                  </p>
                  <p className="fg-a641f5bf4c" data-node-id="894:1830">
                    —
                  </p>
                  <p className="fg-2afdd39038" data-node-id="894:1831">
                    —
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:1832" data-name="Frame">
                    <div className="fg-f5a735ebf8" data-node-id="894:1833" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="894:1834">
                        رد شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-f108d02eff" dir="auto" data-node-id="894:1835">
                    ۱۰ عدد
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1836" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1837">
                      ART-1051
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1838">
                      علی علوی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1839" data-name="Table Row">
                  <div className="fg-9eaf4f10dd" data-node-id="894:1840" data-name="Frame">
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1841">
                      پیگیری
                    </p>
                    <p className="fg-164aa46729" dir="auto" data-node-id="894:1842">
                      مشاهده
                    </p>
                  </div>
                  <p className="fg-063362e6ef" data-node-id="894:1843">
                    ۱۴۰۲/۱۰/۱۶
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="894:1844">
                    آماده‌سازی
                  </p>
                  <p className="fg-2afdd39038" data-node-id="894:1845">
                    ORD-1026
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:1846" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1847" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1848">
                        پذیرفته
                      </p>
                    </div>
                  </div>
                  <p className="fg-f108d02eff" dir="auto" data-node-id="894:1849">
                    ۲۰ عدد
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1850" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1851">
                      ART-1088
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1852">
                      امیر کاظمی
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-f1caf25ba6" data-node-id="894:1853" data-name="Alert Banner">
              <p className="fg-14fcf72395" dir="auto" data-node-id="894:1854">
                توجه: ظرفیت‌های رد شده توسط هنرمندان به‌طور خودکار به استخر تطبیق فرصت بازگردانده می‌شود.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:1855" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:1856" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:1857">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="894:1858" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:254" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:1860" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:1861" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-0a9542d889" data-node-id="894:1862" data-name="chevron-left">
              <div className="fg-0bb5547f93" data-node-id="894:2031" data-name="chevron-left">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/4c0815cf.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:1864">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:1865" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:1866" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1867" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-0a9542d889" data-node-id="894:1868" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2034" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1870">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:1871" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:1872" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-0a9542d889" data-node-id="894:1873" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2037" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1875">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1876" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1877" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-0a9542d889" data-node-id="894:1878" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2040" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1880">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1881" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1882" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-0a9542d889" data-node-id="894:1883" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2043" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1885">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1886" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:1887" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-0a9542d889" data-node-id="894:1888" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2046" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/e8fe059c.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:1890">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1891" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1892" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-0a9542d889" data-node-id="894:1893" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2049" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1895">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1896" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:1897" data-name="Group Header">
                <div className="fg-0a9542d889" data-node-id="894:1898" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2052" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1900">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1901" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1902" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-0a9542d889" data-node-id="894:1903" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2055" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1905">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1906" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1907" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-0a9542d889" data-node-id="894:1908" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:2058" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1910">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:1911" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:1912" data-name="Profile Details">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="894:1913">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:1914">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:1915" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/e1fa3a17.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
