// Figma 894:2067 — Admin / Corporate Request Detail — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminCorporateRequestDetailDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:2067" data-name="Admin / Corporate Request Detail — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:2068" data-name="Main Workspace">
        <div className="fg-982b1ce7e4" data-node-id="894:2069" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:2070" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:2071" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/e25d2a8b.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="894:2072" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="894:2073" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-87f65ec773" data-node-id="894:2074" data-name="bell">
                <div className="fg-ad11617f24" data-node-id="894:2836" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/85625c04.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:2076" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:2077" data-name="Global Search" label="جستجو" placeholder="جستجو...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:2078">
                جستجو...
              </p>
              <div className="fg-c55cd499f6" data-node-id="894:2079" data-name="search">
                <div className="fg-a0cc0c55d5" data-node-id="894:2839" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/e38cb304.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:2081">
              جزئیات درخواست سازمانی
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:2082" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="894:2083" data-name="Action bar & Breadcrumbs">
            <div className="fg-92b7da7864" data-node-id="894:2084" data-name="Actions">
              <DesignAction className="fg-61b2399ccb" data-node-id="894:2085" data-name="Negarin / Button" label="بررسی پروپوزال‌ها">
                <p className="fg-7ee08abcb6" dir="auto" data-node-id="I894:2085;46:3">
                  بررسی پروپوزال‌ها
                </p>
              </DesignAction>
              <DesignAction className="fg-61b2399ccb" data-node-id="894:2087" data-name="Negarin / Button" label="ارسال فاکتور نهایی">
                <p className="fg-7ee08abcb6" dir="auto" data-node-id="I894:2087;46:3">
                  ارسال فاکتور نهایی
                </p>
              </DesignAction>
            </div>
            <div className="fg-b70ce7a913" data-node-id="894:2089" data-name="Breadcrumbs">
              <p className="fg-9eb0d25c1f" data-node-id="894:2090">
                REQ-1024
              </p>
              <p className="fg-b80efb661d" data-node-id="894:2091">{`>`}</p>
              <p className="fg-b80efb661d" dir="auto" data-node-id="894:2092">
                درخواست‌های سازمانی
              </p>
              <p className="fg-b80efb661d" data-node-id="894:2093">{`>`}</p>
              <DesignAction className="fg-b80efb661d" dir="auto" data-node-id="894:2094" label="بازگشت" destination="corporate-requests">
                بازگشت
              </DesignAction>
            </div>
          </div>
          <div className="fg-03bb2e10b3" data-node-id="894:2095" data-name="Detail Workspace Grid">
            <div className="fg-d4e119791e" data-node-id="894:2096" data-name="Left Timeline Panel">
              <p className="fg-8c96560c87" dir="auto" data-node-id="894:2097">
                تایم‌لاین درخواست
              </p>
              <div className="fg-df0a3de519" data-node-id="894:2098" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/3d93e1dc.svg" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="894:2099" data-name="Timeline List">
                <div className="fg-47aacf6d1d" data-node-id="894:2100" data-name="Frame">
                  <p className="fg-b2e13de1fc" data-node-id="894:2101">
                    ۱۴۰۲/۱۰/۱۸
                  </p>
                  <p className="fg-7c141e2478" dir="auto" data-node-id="894:2102">
                    ثبت درخواست اولیه در سیستم
                  </p>
                  <div className="fg-ed684af670" data-node-id="894:2103" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                </div>
                <div className="fg-47aacf6d1d" data-node-id="894:2104" data-name="Frame">
                  <p className="fg-b2e13de1fc" data-node-id="894:2105">
                    ۱۴۰۲/۱۰/۱۹
                  </p>
                  <p className="fg-7c141e2478" dir="auto" data-node-id="894:2106">
                    بررسی کیفی اولیه توسط کارشناس
                  </p>
                  <div className="fg-ed684af670" data-node-id="894:2107" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                </div>
                <div className="fg-47aacf6d1d" data-node-id="894:2108" data-name="Frame">
                  <p className="fg-b2e13de1fc" data-node-id="894:2109">
                    ۱۴۰۲/۱۰/۲۲
                  </p>
                  <p className="fg-7c141e2478" dir="auto" data-node-id="894:2110">
                    ارسال لیست هنرمندان پیشنهادی
                  </p>
                  <div className="fg-ed684af670" data-node-id="894:2111" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                </div>
                <div className="fg-fb126cbc19" data-node-id="894:2112" data-name="Frame">
                  <p className="fg-b2e13de1fc" data-node-id="894:2113">
                    —
                  </p>
                  <p className="fg-7c141e2478" dir="auto" data-node-id="894:2114">
                    تأیید نمونه فیزیکی توسط خریدار
                  </p>
                  <div className="fg-ed684af670" data-node-id="894:2115" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/71887c1b.svg" />
                  </div>
                </div>
                <div className="fg-fb126cbc19" data-node-id="894:2116" data-name="Frame">
                  <p className="fg-b2e13de1fc" data-node-id="894:2117">
                    —
                  </p>
                  <p className="fg-7c141e2478" dir="auto" data-node-id="894:2118">
                    شروع فرآیند تولید و تخصیص قطعی
                  </p>
                  <div className="fg-ed684af670" data-node-id="894:2119" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/71887c1b.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-ee0ddf2a8d" data-node-id="894:2120" data-name="Right Panel Content">
              <div className="fg-cd12f2a8cf" data-node-id="894:2121" data-name="Request Summary Card">
                <div className="fg-c96fe10678" data-node-id="894:2122" data-name="Frame">
                  <div className="fg-8c9afb9183" data-node-id="894:2123" data-name="Badge">
                    <p className="fg-de972ba962" dir="auto" data-node-id="894:2124">
                      پیشنهاد ارسال شده
                    </p>
                  </div>
                  <p className="fg-8c96560c87" dir="auto" data-node-id="894:2125">
                    خلاصه درخواست REQ-1024
                  </p>
                </div>
                <div className="fg-24081ceef5" data-node-id="894:2126" data-name="Summary details">
                  <div className="fg-1edcdaada8" data-node-id="894:2127" data-name="Frame">
                    <p className="fg-9eb0d25c1f" dir="auto" data-node-id="894:2128">
                      خرید سالانه ۵۰ گلدان فیروزه‌کوب نفیس مس به عنوان هدیه تشریفاتی یلدا
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:2129">
                      شرح و موضوع
                    </p>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="894:2130" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/ece95345.svg" />
                    </div>
                  </div>
                  <div className="fg-1edcdaada8" data-node-id="894:2131" data-name="Frame">
                    <p className="fg-9eb0d25c1f" dir="auto" data-node-id="894:2132">
                      ۵۰ عدد گلدان فیروزه‌کوب ارتفاع ۳۰ سانتی‌متر با امضا و گارانتی اصالت
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:2133">
                      جزئیات سفارشی‌سازی
                    </p>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="894:2134" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/ece95345.svg" />
                    </div>
                  </div>
                  <div className="fg-1edcdaada8" data-node-id="894:2135" data-name="Frame">
                    <p className="fg-f49fd59fa7" dir="auto" data-node-id="894:2136">
                      ۵۰۰۰۰۰۰۰ تومان برای هر واحد
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:2137">
                      بودجه برآورد شده
                    </p>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="894:2138" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/ece95345.svg" />
                    </div>
                  </div>
                  <div className="fg-1edcdaada8" data-node-id="894:2139" data-name="Frame">
                    <p className="fg-9eb0d25c1f" dir="auto" data-node-id="894:2140">
                      ۳۰ آذر ۱۴۰۲ (یلدا)
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:2141">
                      تاریخ تحویل مد نظر
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-cd12f2a8cf" data-node-id="894:2142" data-name="Requester Corp Card">
                <p className="fg-8c96560c87" dir="auto" data-node-id="894:2143">
                  سازمان درخواست‌دهنده
                </p>
                <div className="fg-c96fe10678" data-node-id="894:2144" data-name="Frame">
                  <p className="fg-e7934d44e5" dir="auto" data-node-id="894:2145">
                    مشاهده پروفایل سازمانی (CORP-1024)
                  </p>
                  <div className="fg-ad50363799" data-node-id="894:2146" data-name="Frame">
                    <p className="fg-63174a1a4b" dir="auto" data-node-id="894:2147">
                      شرکت هنر ایرانیان / مسئول ارتباط: سرکار خانم حسینی
                    </p>
                    <div className="fg-35f9b3d3c7" data-node-id="894:2148" data-name="Rectangle">
                      <img alt="" className="fg-baf1000bd5" src="/admin-assets/7ffa7aa6.png" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-cd12f2a8cf" data-node-id="894:2149" data-name="Proposed Artists Card">
                <p className="fg-8c96560c87" dir="auto" data-node-id="894:2150">
                  هنرمندان پیشنهادی و تطبیق داده شده
                </p>
                <div className="fg-cfdd37b604" data-node-id="894:2151" data-name="Proposed Artists Table">
                  <div className="fg-bcb8f05b60" data-node-id="894:2152" data-name="THead">
                    <p className="fg-7f2be8036c" dir="auto" data-node-id="894:2153">
                      وضعیت تایید نمونه
                    </p>
                    <p className="fg-097e9474ee" dir="auto" data-node-id="894:2154">
                      ظرفیت ماهانه آزاد
                    </p>
                    <p className="fg-47facc161d" dir="auto" data-node-id="894:2155">
                      رسته و تخصص هنری
                    </p>
                    <p className="fg-4a9b73a3b7" dir="auto" data-node-id="894:2156">
                      هنرمند صنایع‌دستی
                    </p>
                  </div>
                  <div className="fg-0feb1f5b6b" data-node-id="894:2157" data-name="TRow">
                    <div className="fg-82303a202c" data-node-id="894:2158" data-name="Frame">
                      <div className="fg-489a397814" data-node-id="894:2159" data-name="Badge">
                        <p className="fg-5daf48ad35" dir="auto" data-node-id="894:2160">
                          تایید شده
                        </p>
                      </div>
                    </div>
                    <p className="fg-5abe7c9ea4" dir="auto" data-node-id="894:2161">
                      ۸۰ گلدان
                    </p>
                    <p className="fg-dc89a9dc5d" dir="auto" data-node-id="894:2162">
                      فیروزه‌کوبی و مس‌گری
                    </p>
                    <p className="fg-3ee574d3a2" dir="auto" data-node-id="894:2163">
                      استاد علی کریمی (اصفهان)
                    </p>
                  </div>
                  <div className="fg-0feb1f5b6b" data-node-id="894:2164" data-name="TRow">
                    <div className="fg-82303a202c" data-node-id="894:2165" data-name="Frame">
                      <div className="fg-8c9afb9183" data-node-id="894:2166" data-name="Badge">
                        <p className="fg-de972ba962" dir="auto" data-node-id="894:2167">
                          در انتظار ارسال نمونه
                        </p>
                      </div>
                    </div>
                    <p className="fg-5abe7c9ea4" dir="auto" data-node-id="894:2168">
                      ۳۰ گلدان
                    </p>
                    <p className="fg-dc89a9dc5d" dir="auto" data-node-id="894:2169">
                      فیروزه‌کوبی اصفهان
                    </p>
                    <p className="fg-3ee574d3a2" dir="auto" data-node-id="894:2170">
                      سرکار خانم زهرا محسنی
                    </p>
                  </div>
                  <div className="fg-0feb1f5b6b" data-node-id="894:2171" data-name="TRow">
                    <div className="fg-82303a202c" data-node-id="894:2172" data-name="Frame">
                      <div className="fg-bc154bd16e" data-node-id="894:2173" data-name="Badge">
                        <p className="fg-1636b45c60" dir="auto" data-node-id="894:2174">
                          در انتظار بررسی
                        </p>
                      </div>
                    </div>
                    <p className="fg-5abe7c9ea4" dir="auto" data-node-id="894:2175">
                      ۱۵۰ گلدان
                    </p>
                    <p className="fg-dc89a9dc5d" dir="auto" data-node-id="894:2176">
                      خاتم‌کاری و قلم‌زنی
                    </p>
                    <p className="fg-3ee574d3a2" dir="auto" data-node-id="894:2177">
                      کارگاه صنایع‌دستی اصفهان‌هنر
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-867b1b2e34" data-node-id="894:2178" data-name="Status Details Row">
                <div className="fg-3023b2c5e5" data-node-id="894:2179" data-name="Commercial Status">
                  <p className="fg-0696b29e72" dir="auto" data-node-id="894:2180">
                    وضعیت تجاری و مالی
                  </p>
                  <p className="fg-fa628fb147" dir="auto" data-node-id="894:2181">
                    پیش‌فاکتور: ارسال‌شده و تایید اولیه
                  </p>
                  <p className="fg-fa628fb147" dir="auto" data-node-id="894:2182">
                    قرارداد کلان: در انتظار دریافت فیش قسط اول
                  </p>
                  <p className="fg-d17d81fca6" dir="auto" data-node-id="894:2183">
                    مشاهده جزییات مالی سیستم
                  </p>
                </div>
                <div className="fg-3023b2c5e5" data-node-id="894:2184" data-name="Execution Status">
                  <p className="fg-0696b29e72" dir="auto" data-node-id="894:2185">
                    وضعیت انجام و ساخت
                  </p>
                  <p className="fg-fa628fb147" dir="auto" data-node-id="894:2186">
                    سفارش مرتبط: ORD-1024 ایجاد شد
                  </p>
                  <p className="fg-fa628fb147" dir="auto" data-node-id="894:2187">
                    وضعیت تولید کارگاه‌ها: در انتظار تایید قطعی نمونه فیزیکی
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:2188" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:2189" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:2190">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="894:2191" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:255" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:2193" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:2194" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:2195" data-name="icon">
              <div className="fg-169610c3a2" data-node-id="894:2968" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
              </div>
            </div>
            <p className="fg-5674321d7e" dir="auto" data-node-id="894:2197">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:2198" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:2199" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2200" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:2201" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2842" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2203">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:2204" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:2205" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:2206" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2845" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2208">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2209" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2210" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:2211" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2848" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2213">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2214" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2215" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:2216" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2851" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2218">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2219" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:2220" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:2221" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2854" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:2223">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2224" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2225" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:2226" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2857" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2228">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2229" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:2230" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:2231" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2860" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2233">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2234" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2235" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:2236" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2863" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2238">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:2239" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:2240" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:2241" data-name="chevron">
                  <div className="fg-6c085e001e" data-node-id="894:2866" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:2243">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:2244" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:2245" data-name="Profile Details">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="894:2246">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:2247">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-1869b3f909" data-node-id="894:2248" data-name="Staff Avatar" />
        </div>
      </AdminSidebar>
    </div>
  );
}
