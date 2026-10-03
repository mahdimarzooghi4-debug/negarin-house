// Figma 892:1829 — Admin / Service Partners — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminServicePartnersDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="892:1829" data-name="Admin / Service Partners — Desktop">
      <div className="fg-708b484433" data-node-id="892:1830" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="892:1831" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="892:1832" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="892:1833" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/6b2554cf.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="892:1834" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/6b13689b.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="892:1838" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="892:1839" data-name="Global Search" label="جستجو" placeholder="جستجو در شرکای خدمات، شناسه، دسته‌بندی...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="892:1840">
                جستجو در شرکای خدمات، شناسه، دسته‌بندی...
              </p>
              <div className="fg-c51752dc8c" data-node-id="892:1841" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="892:1843">
              شرکای خدمات سیستم
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="892:1844" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="892:1845" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:1846" data-name="Metric Shortcut" label="۲۴ شریک کل شرکای خدمات" destination="service-requests">
              <p className="fg-5061c0f8a0" dir="auto" data-node-id="892:1847">
                ۲۴ شریک
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:1848">
                کل شرکای خدمات
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:1849" data-name="Metric Shortcut" label="۱۵ شریک فعال" destination="service-requests">
              <p className="fg-bdab2c756d" dir="auto" data-node-id="892:1850">
                ۱۵ شریک
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:1851">
                فعال
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:1852" data-name="Metric Shortcut" label="۵ شریک موقتاً غیرفعال" destination="service-requests">
              <p className="fg-c9547361f2" dir="auto" data-node-id="892:1853">
                ۵ شریک
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:1854">
                موقتاً غیرفعال
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:1855" data-name="Metric Shortcut" label="۴ شریک غیرفعال" destination="service-requests">
              <p className="fg-73ab430732" dir="auto" data-node-id="892:1856">
                ۴ شریک
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:1857">
                غیرفعال
              </p>
            </DesignAction>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="892:1858" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="892:1859" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="892:1860" data-name="Frame">
                <div className="fg-a3b2a587b5" data-node-id="892:1861" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="892:1862">
                    دسته‌بندی خدمات (همه)
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="892:1863" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="892:1864">
                    وضعیت عملیاتی (فعال)
                  </p>
                </div>
              </div>
              <DesignField className="fg-4d06bcac78" data-node-id="892:1865" data-name="Search Input" label="جستجو" placeholder="جستجو در نام شریک یا کد...">
                <p className="fg-f68c5e162d" dir="auto" data-node-id="892:1866">
                  جستجو در نام شریک یا کد...
                </p>
              </DesignField>
            </div>
          </div>
          <div className="fg-a1f410f2dc" data-node-id="892:1867" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="892:1868">
              لیست تفصیلی شرکای خدمات فعال و همکار
            </p>
            <div className="fg-ceebe80a1f" data-node-id="892:1869" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="892:1870" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="892:1871">
                  اقدام
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="892:1872">
                  آخرین فعالیت
                </p>
                <p className="fg-648e3447c7" dir="auto" data-node-id="892:1873">
                  ظرفیت جاری
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="892:1874">
                  تخصیص‌های فعال
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="892:1875">
                  وضعیت عملیاتی
                </p>
                <p className="fg-c7dd25f208" dir="auto" data-node-id="892:1876">
                  دسته‌بندی خدمات
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="892:1877">
                  شریک خدمات
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="892:1878" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="892:1879" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1880" data-name="Col Action" label="مشاهده" destination="service-partner-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1881">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" data-node-id="892:1882">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <div className="fg-e19e594884" data-node-id="892:1883" data-name="Frame">
                    <div className="fg-0b35a51330" data-node-id="892:1884" data-name="Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="892:1885">
                        مناسب
                      </p>
                    </div>
                  </div>
                  <p className="fg-5abe7c9ea4" dir="auto" data-node-id="892:1886">
                    ۳ مورد
                  </p>
                  <div className="fg-7aeb751870" data-node-id="892:1887" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="892:1888" data-name="Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="892:1889">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-a4277f76fb" dir="auto" data-node-id="892:1890">
                    عکاسی صنعتی، محتوا
                  </p>
                  <div className="fg-7744c1925a" data-node-id="892:1891" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1892">
                      استودیو نور
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="892:1893">
                      PTR-1024
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="892:1894" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1895" data-name="Col Action" label="مشاهده" destination="service-partner-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1896">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" data-node-id="892:1897">
                    ۱۴۰۲/۱۰/۱۱
                  </p>
                  <div className="fg-e19e594884" data-node-id="892:1898" data-name="Frame">
                    <div className="fg-8f979bf992" data-node-id="892:1899" data-name="Badge">
                      <p className="fg-c9037b27ab" dir="auto" data-node-id="892:1900">
                        پر
                      </p>
                    </div>
                  </div>
                  <p className="fg-5abe7c9ea4" dir="auto" data-node-id="892:1901">
                    ۸ مورد
                  </p>
                  <div className="fg-7aeb751870" data-node-id="892:1902" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="892:1903" data-name="Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="892:1904">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-a4277f76fb" dir="auto" data-node-id="892:1905">
                    طراحی بسته‌بندی
                  </p>
                  <div className="fg-7744c1925a" data-node-id="892:1906" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1907">
                      کارگاه چاپ آریا
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="892:1908">
                      PTR-1025
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="892:1909" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1910" data-name="Col Action" label="مشاهده" destination="service-partner-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1911">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" data-node-id="892:1912">
                    ۱۴۰۲/۱۰/۱۰
                  </p>
                  <div className="fg-e19e594884" data-node-id="892:1913" data-name="Frame">
                    <div className="fg-0b35a51330" data-node-id="892:1914" data-name="Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="892:1915">
                        مناسب
                      </p>
                    </div>
                  </div>
                  <p className="fg-5abe7c9ea4" dir="auto" data-node-id="892:1916">
                    ۵ مورد
                  </p>
                  <div className="fg-7aeb751870" data-node-id="892:1917" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="892:1918" data-name="Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="892:1919">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-a4277f76fb" dir="auto" data-node-id="892:1920">
                    آموزش پیشرفته
                  </p>
                  <div className="fg-7744c1925a" data-node-id="892:1921" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1922">
                      مدرسه هنرهای تجسمی پارس
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="892:1923">
                      PTR-1026
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="892:1924" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1925" data-name="Col Action" label="مشاهده" destination="service-partner-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1926">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" data-node-id="892:1927">
                    ۱۴۰۲/۱۰/۰۸
                  </p>
                  <div className="fg-e19e594884" data-node-id="892:1928" data-name="Frame">
                    <div className="fg-00e94fc8c3" data-node-id="892:1929" data-name="Badge">
                      <p className="fg-5778f11f94" dir="auto" data-node-id="892:1930">
                        محدود
                      </p>
                    </div>
                  </div>
                  <p className="fg-5abe7c9ea4" dir="auto" data-node-id="892:1931">
                    ۰ مورد
                  </p>
                  <div className="fg-7aeb751870" data-node-id="892:1932" data-name="Frame">
                    <div className="fg-8c9afb9183" data-node-id="892:1933" data-name="Badge">
                      <p className="fg-5778f11f94" dir="auto" data-node-id="892:1934">
                        موقتاً غیرفعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-a4277f76fb" dir="auto" data-node-id="892:1935">
                    تولید محتوا، عکاسی
                  </p>
                  <div className="fg-7744c1925a" data-node-id="892:1936" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1937">
                      استودیو قلم نقره‌ای
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="892:1938">
                      PTR-1027
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="892:1939" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1940" data-name="Col Action" label="مشاهده" destination="service-partner-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1941">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" data-node-id="892:1942">
                    ۱۴۰۲/۱۰/۰۵
                  </p>
                  <div className="fg-e19e594884" data-node-id="892:1943" data-name="Frame">
                    <div className="fg-0b35a51330" data-node-id="892:1944" data-name="Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="892:1945">
                        مناسب
                      </p>
                    </div>
                  </div>
                  <p className="fg-5abe7c9ea4" dir="auto" data-node-id="892:1946">
                    ۰ مورد
                  </p>
                  <div className="fg-7aeb751870" data-node-id="892:1947" data-name="Frame">
                    <div className="fg-d7139b82ce" data-node-id="892:1948" data-name="Badge">
                      <p className="fg-2ae4ebf3de" dir="auto" data-node-id="892:1949">
                        در انتظار راه‌اندازی
                      </p>
                    </div>
                  </div>
                  <p className="fg-a4277f76fb" dir="auto" data-node-id="892:1950">
                    طراحی بسته‌بندی
                  </p>
                  <div className="fg-7744c1925a" data-node-id="892:1951" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1952">
                      آتلیه طراحی ترنج
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="892:1953">
                      PTR-1028
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="892:1954" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1955" data-name="Col Action" label="مشاهده" destination="service-partner-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1956">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" data-node-id="892:1957">
                    ۱۴۰۲/۰۹/۲۰
                  </p>
                  <div className="fg-e19e594884" data-node-id="892:1958" data-name="Frame">
                    <div className="fg-0b35a51330" data-node-id="892:1959" data-name="Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="892:1960">
                        مناسب
                      </p>
                    </div>
                  </div>
                  <p className="fg-5abe7c9ea4" dir="auto" data-node-id="892:1961">
                    ۰ مورد
                  </p>
                  <div className="fg-7aeb751870" data-node-id="892:1962" data-name="Frame">
                    <div className="fg-f5a735ebf8" data-node-id="892:1963" data-name="Badge">
                      <p className="fg-c9037b27ab" dir="auto" data-node-id="892:1964">
                        غیرفعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-a4277f76fb" dir="auto" data-node-id="892:1965">
                    عکاسی، تولید محتوا
                  </p>
                  <div className="fg-7744c1925a" data-node-id="892:1966" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1967">
                      کانون تبلیغاتی راد
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="892:1968">
                      PTR-1029
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-b14d76332e" data-node-id="892:1969" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="892:1970" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="892:1971">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="892:1972" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="892:1973" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="892:1974" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="892:1975" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="892:1976" data-name="dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/60d9763a.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="892:1978">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="892:1979" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="892:1980" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1981" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="892:1982" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/e0f86b1c.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1984">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="892:1985" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="892:1986" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="892:1987" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/89ace09e.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1989">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1990" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1991" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="892:1992" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/eb1ab77e.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1994">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1995" data-name="Group-3">
              <DesignAction className="fg-fcc641ace6" data-node-id="892:1996" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="892:1997" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/66725192.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="892:1999">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:2000" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="892:2001" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="892:2002" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/d920329c.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:2004">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:2005" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="892:2006" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="892:2007" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/ddf4c662.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:2009">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:2010" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="892:2011" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="892:2012" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/502f0fde.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:2014">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:2015" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="892:2016" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="892:2017" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2de534ec.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:2019">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:2020" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="892:2021" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="892:2022" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/ab2cb3f8.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:2024">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="892:2025" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="892:2026" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="892:2027">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="892:2028">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="892:2029" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/c3338474.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
