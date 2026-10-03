// Figma 894:2249 — Admin / Corporate Requests — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminCorporateRequestsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:2249" data-name="Admin / Corporate Requests — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:2250" data-name="Main Workspace">
        <div className="fg-982b1ce7e4" data-node-id="894:2251" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:2252" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:2253" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/e2d100ef.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="894:2254" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="894:2255" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-87f65ec773" data-node-id="894:2256" data-name="bell">
                <div className="fg-ad11617f24" data-node-id="894:2869" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/ebf6f138.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:2258" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:2259" data-name="Global Search" label="جستجو" placeholder="جستجو در کدهای درخواست، سازمان‌های خریدار، شرح کالا...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:2260">
                جستجو در کدهای درخواست، سازمان‌های خریدار، شرح کالا...
              </p>
              <div className="fg-c55cd499f6" data-node-id="894:2261" data-name="search">
                <div className="fg-a0cc0c55d5" data-node-id="894:2872" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/e889532a.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:2263">
              مدیریت درخواست‌های سازمانی (B2B)
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:2264" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="894:2265" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:2266" data-name="Metric Shortcut" label="۹۴ کل درخواست‌ها" destination="service-requests">
              <p className="fg-5061c0f8a0" data-node-id="894:2267">
                ۹۴
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:2268">
                کل درخواست‌ها
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:2269" data-name="Metric Shortcut" label="۱۵ درخواست‌های فعال" destination="service-requests">
              <p className="fg-f4472f86ce" data-node-id="894:2270">
                ۱۵
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:2271">
                درخواست‌های فعال
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:2272" data-name="Metric Shortcut" label="۶ در انتظار پیشنهاد" destination="service-requests">
              <p className="fg-c9547361f2" data-node-id="894:2273">
                ۶
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:2274">
                در انتظار پیشنهاد
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:2275" data-name="Metric Shortcut" label="۷۳ تکمیل شده" destination="service-requests">
              <p className="fg-bdab2c756d" data-node-id="894:2276">
                ۷۳
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:2277">
                تکمیل شده
              </p>
            </DesignAction>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="894:2278" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="894:2279" data-name="Filter Content">
              <div className="fg-9708e8d183" data-node-id="894:2280" data-name="Interactive Filter Badges">
                <div className="fg-4688866a31" data-node-id="894:2281" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="894:2282">
                    وضعیت درخواست: همه
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:2283" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="894:2284">
                    سازمان خریدار: همه
                  </p>
                </div>
              </div>
              <div className="fg-8c27ae93a2" data-node-id="894:2285" data-name="Search Input Container">
                <p className="fg-72b13cff4d" dir="auto" data-node-id="894:2286">
                  شناسه یا کلیدواژه...
                </p>
              </div>
            </div>
          </div>
          <div className="fg-a1f410f2dc" data-node-id="894:2287" data-name="Worklist Section">
            <p className="fg-8c96560c87" dir="auto" data-node-id="894:2288">
              کارتابل درخواست‌های B2B
            </p>
            <div className="fg-ceebe80a1f" data-node-id="894:2289" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="894:2290" data-name="Table Header Row">
                <p className="fg-207ea3ad86" dir="auto" data-node-id="894:2291">
                  اقدام
                </p>
                <p className="fg-648e3447c7" dir="auto" data-node-id="894:2292">
                  نیازمند اقدام
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:2293">
                  تاریخ ثبت
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:2294">
                  وضعیت
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:2295">
                  تعداد درخواست
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:2296">
                  موضوع و شرح درخواست
                </p>
                <p className="fg-7bce7dd075" dir="auto" data-node-id="894:2297">
                  سازمان
                </p>
                <p className="fg-648e3447c7" dir="auto" data-node-id="894:2298">
                  شناسه
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="894:2299" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="894:2300" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:2301" data-name="Col Action" label="بررسی" destination="corporate-request-detail">
                    <p className="fg-7c79984bbb" dir="auto" data-node-id="894:2302">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-fd83d7fca4" dir="auto" data-node-id="894:2303">
                    بله
                  </p>
                  <p className="fg-de861aa5d7" data-node-id="894:2304">
                    ۱۴۰۲/۱۰/۱۸
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:2305" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="894:2306" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:2307">
                        پیشنهاد ارسال شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:2308">
                    ۵۰ عدد
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="894:2309">
                    خرید سالانه ۵۰ گلدان فیروزه‌کوب نفیس
                  </p>
                  <div className="fg-0d78c79b81" data-node-id="894:2310" data-name="Col Corp">
                    <p className="fg-74ad00c29d" dir="auto" data-node-id="894:2311">
                      سازمان اداری استخدامی
                    </p>
                    <p className="fg-9be80d9f03" data-node-id="894:2312">
                      CORP-1024
                    </p>
                  </div>
                  <p className="fg-07e0312483" data-node-id="894:2313">
                    REQ-1024
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:2314" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:2315" data-name="Col Action" label="بررسی" destination="corporate-request-detail">
                    <p className="fg-7c79984bbb" dir="auto" data-node-id="894:2316">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-fd83d7fca4" dir="auto" data-node-id="894:2317">
                    بله
                  </p>
                  <p className="fg-de861aa5d7" data-node-id="894:2318">
                    ۱۴۰۲/۱۰/۱۷
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:2319" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="894:2320" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:2321">
                        در حال بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:2322">
                    ۲۰۰ عدد
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="894:2323">
                    تامین ۲۰۰ بشقاب میناکاری همایش سالانه
                  </p>
                  <div className="fg-0d78c79b81" data-node-id="894:2324" data-name="Col Corp">
                    <p className="fg-74ad00c29d" dir="auto" data-node-id="894:2325">
                      بانک ملی ایران
                    </p>
                    <p className="fg-9be80d9f03" data-node-id="894:2326">
                      CORP-1025
                    </p>
                  </div>
                  <p className="fg-07e0312483" data-node-id="894:2327">
                    REQ-1025
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:2328" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:2329" data-name="Col Action" label="پیگیری">
                    <p className="fg-7c79984bbb" dir="auto" data-node-id="894:2330">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-579e87df70" data-node-id="894:2331">
                    —
                  </p>
                  <p className="fg-de861aa5d7" data-node-id="894:2332">
                    ۱۴۰۲/۱۰/۱۵
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:2333" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="894:2334" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:2335">
                        تأیید خریدار
                      </p>
                    </div>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:2336">
                    ۳۵۰ بسته
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="894:2337">
                    بسته‌های هدیه سفارشی خاتم‌کاری یلدا
                  </p>
                  <div className="fg-0d78c79b81" data-node-id="894:2338" data-name="Col Corp">
                    <p className="fg-74ad00c29d" dir="auto" data-node-id="894:2339">
                      شرکت فولاد مبارکه اصفهان
                    </p>
                    <p className="fg-9be80d9f03" data-node-id="894:2340">
                      CORP-1026
                    </p>
                  </div>
                  <p className="fg-07e0312483" data-node-id="894:2341">
                    REQ-1026
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:2342" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:2343" data-name="Col Action" label="بررسی" destination="corporate-request-detail">
                    <p className="fg-7c79984bbb" dir="auto" data-node-id="894:2344">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-fd83d7fca4" dir="auto" data-node-id="894:2345">
                    بله
                  </p>
                  <p className="fg-de861aa5d7" data-node-id="894:2346">
                    ۱۴۰۲/۱۰/۱۴
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:2347" data-name="Col Status">
                    <div className="fg-bc154bd16e" data-node-id="894:2348" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="894:2349">
                        ثبت شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:2350">
                    ۸۰ تندیس
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="894:2351">
                    سفارش تندیس‌های شیشه‌ای نمایشگاه صنایع‌دستی
                  </p>
                  <div className="fg-0d78c79b81" data-node-id="894:2352" data-name="Col Corp">
                    <p className="fg-74ad00c29d" dir="auto" data-node-id="894:2353">
                      وزارت میراث فرهنگی
                    </p>
                    <p className="fg-9be80d9f03" data-node-id="894:2354">
                      CORP-1027
                    </p>
                  </div>
                  <p className="fg-07e0312483" data-node-id="894:2355">
                    REQ-1027
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:2356" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:2357" data-name="Col Action" label="پیگیری">
                    <p className="fg-7c79984bbb" dir="auto" data-node-id="894:2358">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-579e87df70" data-node-id="894:2359">
                    —
                  </p>
                  <p className="fg-de861aa5d7" data-node-id="894:2360">
                    ۱۴۰۲/۱۰/۰۵
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:2361" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="894:2362" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:2363">
                        در حال تولید
                      </p>
                    </div>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:2364">
                    ۴۰ تخته
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="894:2365">
                    اقلام تزیینی گلیم‌بافی دکوراسیون شهرداری
                  </p>
                  <div className="fg-0d78c79b81" data-node-id="894:2366" data-name="Col Corp">
                    <p className="fg-74ad00c29d" dir="auto" data-node-id="894:2367">
                      شهرداری مشهد
                    </p>
                    <p className="fg-9be80d9f03" data-node-id="894:2368">
                      CORP-1028
                    </p>
                  </div>
                  <p className="fg-07e0312483" data-node-id="894:2369">
                    REQ-1028
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:2370" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:2371" data-name="Col Action" label="پیگیری">
                    <p className="fg-7c79984bbb" dir="auto" data-node-id="894:2372">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-579e87df70" data-node-id="894:2373">
                    —
                  </p>
                  <p className="fg-de861aa5d7" data-node-id="894:2374">
                    ۱۴۰۲/۰۹/۲۸
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:2375" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="894:2376" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:2377">
                        تکمیل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:2378">
                    ۱۲۰ پکیج
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="894:2379">
                    گیفت‌باکس‌های چرمی سفارشی اداری
                  </p>
                  <div className="fg-0d78c79b81" data-node-id="894:2380" data-name="Col Corp">
                    <p className="fg-74ad00c29d" dir="auto" data-node-id="894:2381">
                      همراه‌اول
                    </p>
                    <p className="fg-9be80d9f03" data-node-id="894:2382">
                      CORP-1029
                    </p>
                  </div>
                  <p className="fg-07e0312483" data-node-id="894:2383">
                    REQ-1029
                  </p>
                </div>
              </div>
              <div className="fg-0e1225defb" data-node-id="894:2384" data-name="Pagination">
                <DesignAction className="fg-92b7da7864" data-node-id="894:2385" data-name="Pagination Buttons" label="قبلی ۱ ۲ بعدی">
                  <div className="fg-ea51d20d85" data-node-id="894:2386" data-name="Prev">
                    <p className="fg-63174a1a4b" dir="auto" data-node-id="894:2387">
                      قبلی
                    </p>
                  </div>
                  <div className="fg-9951e6e211" data-node-id="894:2388" data-name="Page Pill Active">
                    <p className="fg-7c79984bbb" data-node-id="894:2389">
                      ۱
                    </p>
                  </div>
                  <div className="fg-fef640a389" data-node-id="894:2390" data-name="Page Pill Default">
                    <p className="fg-35eebb81d9" data-node-id="894:2391">
                      ۲
                    </p>
                  </div>
                  <div className="fg-ea51d20d85" data-node-id="894:2392" data-name="Next">
                    <p className="fg-63174a1a4b" dir="auto" data-node-id="894:2393">
                      بعدی
                    </p>
                  </div>
                </DesignAction>
                <p className="fg-35eebb81d9" dir="auto" data-node-id="894:2394">
                  نمایش ۱ تا ۶ از ۹۴ درخواست سازمانی
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:2395" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:2396" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:2397">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="894:2398" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:256" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:2400" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:2401" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:2402" data-name="icon">
              <div className="fg-169610c3a2" data-node-id="894:2971" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
              </div>
            </div>
            <p className="fg-5674321d7e" dir="auto" data-node-id="894:2404">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:2405" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:2406" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2407" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:2408" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2875" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2410">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:2411" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:2412" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:2413" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2878" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2415">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2416" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2417" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:2418" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2881" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2420">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2421" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2422" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:2423" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2884" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2425">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2426" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:2427" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:2428" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2887" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:2430">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2431" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2432" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:2433" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2890" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2435">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2436" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:2437" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:2438" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2893" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2440">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2441" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2442" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:2443" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2896" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2445">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2446" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2447" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:2448" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2899" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2450">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:2451" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:2452" data-name="Profile Details">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="894:2453">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:2454">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:2455" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/24471ccd.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
