// Figma 899:1970 — Admin / Export Orders — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminExportOrdersDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="899:1970" data-name="Admin / Export Orders — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="899:1971" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="899:1972" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="899:1973" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="899:1974" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/3cf664a7.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="899:1975" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="899:1978" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="899:1979" data-name="Global Search" label="جستجو" placeholder="جستجو در سفارش‌های صادراتی، شرکا و کدهای EXP...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="899:1980">
                جستجو در سفارش‌های صادراتی، شرکا و کدهای EXP...
              </p>
              <div className="fg-c51752dc8c" data-node-id="899:2468" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="899:1982">
              مدیریت سفارش‌های صادراتی
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="899:1983" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="899:1984" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="899:1985" data-name="Metric Shortcut" label="۱۸۲ کل سفارش‌های صادراتی" >
              <p className="fg-f4472f86ce" data-node-id="899:1986">
                ۱۸۲
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="899:1987">
                کل سفارش‌های صادراتی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="899:1988" data-name="Metric Shortcut" label="۱۴ در حال آماده‌سازی" >
              <p className="fg-c9547361f2" data-node-id="899:1989">
                ۱۴
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="899:1990">
                در حال آماده‌سازی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="899:1991" data-name="Metric Shortcut" label="۸ در حال ارسال بین‌المللی" >
              <p className="fg-5061c0f8a0" data-node-id="899:1992">
                ۸
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="899:1993">
                در حال ارسال بین‌المللی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="899:1994" data-name="Metric Shortcut" label="۱۶۰ تحویل‌شده / در انتظار تأیید کیفیت" >
              <p className="fg-bdab2c756d" data-node-id="899:1995">
                ۱۶۰
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="899:1996">
                تحویل‌شده / در انتظار تأیید کیفیت
              </p>
            </DesignAction>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="899:1997" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="899:1998" data-name="Filter Content">
              <div className="fg-9708e8d183" data-node-id="899:1999" data-name="Interactive Filter Badges">
                <div className="fg-89553f2c19" data-node-id="899:2000" data-name="Filter">
                  <p className="fg-7c79984bbb" dir="auto" data-node-id="899:2001">
                    همه سفارش‌ها
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="899:2002" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="899:2003">
                    نیاز به اقدام فوری
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="899:2004" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="899:2005">
                    بر اساس شریک تجاری (EXP)
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="899:2006" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="899:2007">
                    بازار مقصد
                  </p>
                </div>
              </div>
              <div className="fg-3bdbfadc43" data-node-id="899:2008" data-name="Search Input Container">
                <p className="fg-72b13cff4d" dir="auto" data-node-id="899:2009">
                  جستجوی کدهای XORD, EXP, ART...
                </p>
              </div>
            </div>
          </div>
          <div className="fg-e16ac02b64" data-node-id="899:2010" data-name="Worklist Section">
            <div className="fg-ceebe80a1f" data-node-id="899:2011" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="899:2012" data-name="Table Header Row">
                <p className="fg-976b6a194c" dir="auto" data-node-id="899:2013">
                  اقدام
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="899:2014">
                  آخرین بروزرسانی
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="899:2015">
                  ارسال بین‌الملل
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="899:2016">
                  وضعیت عملیاتی
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="899:2017">
                  محصول
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="899:2018">
                  هنرمند مرجع
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="899:2019">
                  بازار مقصد
                </p>
                <p className="fg-c7dd25f208" dir="auto" data-node-id="899:2020">
                  شریک صادراتی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="899:2021">
                  شناسه سفارش
                </p>
              </div>
              <div className="fg-1c3fd25193" data-node-id="899:2022" data-name="Table Row">
                <DesignAction className="fg-80643d08ac" data-node-id="899:2023" data-name="Col Action" label="مشاهده" destination="export-order-detail">
                  <p className="fg-c094a3d14b" dir="auto" data-node-id="899:2024">
                    مشاهده
                  </p>
                </DesignAction>
                <p className="fg-87b315bb1c" dir="auto" data-node-id="899:2025">
                  ۳ ساعت پیش
                </p>
                <p className="fg-8fda5c5742" dir="auto" data-node-id="899:2026">
                  ارسال شده
                </p>
                <div className="fg-82303a202c" data-node-id="899:2027" data-name="Frame">
                  <div className="fg-8c9afb9183" data-node-id="899:2028" data-name="Frame">
                    <p className="fg-de972ba962" dir="auto" data-node-id="899:2029">
                      در حال ارسال
                    </p>
                  </div>
                </div>
                <p className="fg-a9e26a31a8" dir="auto" data-node-id="899:2030">
                  گلدان میناکاری بزرگ
                </p>
                <p className="fg-f0dea7981f" dir="auto" data-node-id="899:2031">
                  زهرا محمدی (ART-1092)
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="899:2032">
                  آلمان
                </p>
                <p className="fg-6e4c7b63e5" dir="auto" data-node-id="899:2033">
                  Hakim Trading GmbH (EXP-0847)
                </p>
                <p className="fg-28843bd48a" data-node-id="899:2034">
                  XORD-2024-0847
                </p>
              </div>
              <div className="fg-1c3fd25193" data-node-id="899:2035" data-name="Table Row">
                <DesignAction className="fg-80643d08ac" data-node-id="899:2036" data-name="Col Action" label="مشاهده" destination="export-order-detail">
                  <p className="fg-c094a3d14b" dir="auto" data-node-id="899:2037">
                    مشاهده
                  </p>
                </DesignAction>
                <p className="fg-87b315bb1c" dir="auto" data-node-id="899:2038">
                  ۵ ساعت پیش
                </p>
                <p className="fg-8fda5c5742" dir="auto" data-node-id="899:2039">
                  در انتظار ارسال
                </p>
                <div className="fg-82303a202c" data-node-id="899:2040" data-name="Frame">
                  <div className="fg-c9a49f4476" data-node-id="899:2041" data-name="Frame">
                    <p className="fg-645e8110ca" dir="auto" data-node-id="899:2042">
                      آماده‌سازی
                    </p>
                  </div>
                </div>
                <p className="fg-a9e26a31a8" dir="auto" data-node-id="899:2043">
                  گلدان میناکاری اصفهان
                </p>
                <p className="fg-f0dea7981f" dir="auto" data-node-id="899:2044">
                  کریمی (ART-304)
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="899:2045">
                  امارات
                </p>
                <p className="fg-6e4c7b63e5" dir="auto" data-node-id="899:2046">
                  الخلیج دبی (EXP-205)
                </p>
                <p className="fg-28843bd48a" data-node-id="899:2047">
                  XORD-1025
                </p>
              </div>
              <div className="fg-1c3fd25193" data-node-id="899:2048" data-name="Table Row">
                <DesignAction className="fg-80643d08ac" data-node-id="899:2049" data-name="Col Action" label="پیگیری">
                  <p className="fg-c094a3d14b" dir="auto" data-node-id="899:2050">
                    پیگیری
                  </p>
                </DesignAction>
                <p className="fg-87b315bb1c" dir="auto" data-node-id="899:2051">
                  ۱ روز پیش
                </p>
                <p className="fg-8fda5c5742" dir="auto" data-node-id="899:2052">
                  در انتظار
                </p>
                <div className="fg-82303a202c" data-node-id="899:2053" data-name="Frame">
                  <div className="fg-f5a735ebf8" data-node-id="899:2054" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="899:2055">
                      ثبت‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-a9e26a31a8" dir="auto" data-node-id="899:2056">
                  فرش دستبافت تبریز
                </p>
                <p className="fg-f0dea7981f" dir="auto" data-node-id="899:2057">
                  باقری (ART-105)
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="899:2058">
                  آلمان
                </p>
                <p className="fg-6e4c7b63e5" dir="auto" data-node-id="899:2059">
                  گالری مونیخ (EXP-112)
                </p>
                <p className="fg-28843bd48a" data-node-id="899:2060">
                  XORD-1026
                </p>
              </div>
              <div className="fg-1c3fd25193" data-node-id="899:2061" data-name="Table Row">
                <DesignAction className="fg-80643d08ac" data-node-id="899:2062" data-name="Col Action" label="مشاهده" destination="export-order-detail">
                  <p className="fg-c094a3d14b" dir="auto" data-node-id="899:2063">
                    مشاهده
                  </p>
                </DesignAction>
                <p className="fg-87b315bb1c" dir="auto" data-node-id="899:2064">
                  ۲ روز پیش
                </p>
                <p className="fg-8fda5c5742" dir="auto" data-node-id="899:2065">
                  تحویل‌شده
                </p>
                <div className="fg-82303a202c" data-node-id="899:2066" data-name="Frame">
                  <div className="fg-489a397814" data-node-id="899:2067" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="899:2068">
                      تکمیل‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-a9e26a31a8" dir="auto" data-node-id="899:2069">
                  تابلو نگارگری اصفهان
                </p>
                <p className="fg-f0dea7981f" dir="auto" data-node-id="899:2070">
                  کمالی (ART-802)
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="899:2071">
                  کانادا
                </p>
                <p className="fg-6e4c7b63e5" dir="auto" data-node-id="899:2072">
                  رافائل تورنتو (EXP-099)
                </p>
                <p className="fg-28843bd48a" data-node-id="899:2073">
                  XORD-1027
                </p>
              </div>
              <div className="fg-1c3fd25193" data-node-id="899:2074" data-name="Table Row">
                <DesignAction className="fg-80643d08ac" data-node-id="899:2075" data-name="Col Action" label="مشاهده" destination="export-order-detail">
                  <p className="fg-c094a3d14b" dir="auto" data-node-id="899:2076">
                    مشاهده
                  </p>
                </DesignAction>
                <p className="fg-87b315bb1c" dir="auto" data-node-id="899:2077">
                  ۳ روز پیش
                </p>
                <p className="fg-8fda5c5742" dir="auto" data-node-id="899:2078">
                  ارسال شده
                </p>
                <div className="fg-82303a202c" data-node-id="899:2079" data-name="Frame">
                  <div className="fg-8c9afb9183" data-node-id="899:2080" data-name="Frame">
                    <p className="fg-de972ba962" dir="auto" data-node-id="899:2081">
                      در حال ارسال
                    </p>
                  </div>
                </div>
                <p className="fg-a9e26a31a8" dir="auto" data-node-id="899:2082">
                  سفالینه‌های لالجین
                </p>
                <p className="fg-f0dea7981f" dir="auto" data-node-id="899:2083">
                  موسوی (ART-229)
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="899:2084">
                  فرانسه
                </p>
                <p className="fg-6e4c7b63e5" dir="auto" data-node-id="899:2085">
                  توزیع یورو پاریس (EXP-145)
                </p>
                <p className="fg-28843bd48a" data-node-id="899:2086">
                  XORD-1028
                </p>
              </div>
              <div className="fg-1c3fd25193" data-node-id="899:2087" data-name="Table Row">
                <DesignAction className="fg-80643d08ac" data-node-id="899:2088" data-name="Col Action" label="مشاهده" destination="export-order-detail">
                  <p className="fg-c094a3d14b" dir="auto" data-node-id="899:2089">
                    مشاهده
                  </p>
                </DesignAction>
                <p className="fg-87b315bb1c" dir="auto" data-node-id="899:2090">
                  ۵ روز پیش
                </p>
                <p className="fg-8fda5c5742" dir="auto" data-node-id="899:2091">
                  تحویل‌شده
                </p>
                <div className="fg-82303a202c" data-node-id="899:2092" data-name="Frame">
                  <div className="fg-489a397814" data-node-id="899:2093" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="899:2094">
                      تکمیل‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-a9e26a31a8" dir="auto" data-node-id="899:2095">
                  فرش قشقایی اعلا
                </p>
                <p className="fg-f0dea7981f" dir="auto" data-node-id="899:2096">
                  قشقایی (ART-089)
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="899:2097">
                  آلمان
                </p>
                <p className="fg-6e4c7b63e5" dir="auto" data-node-id="899:2098">
                  Hakim Trading GmbH (EXP-0847)
                </p>
                <p className="fg-28843bd48a" data-node-id="899:2099">
                  XORD-1029
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="899:2100" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="899:2101" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="899:2102">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="899:2103" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:274" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="899:2105" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="899:2106" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="899:2471" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="899:2108">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="899:2109" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="899:2110" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2111" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="899:2474" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2113">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="899:2114" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="899:2115" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="899:2477" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2117">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2118" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2119" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="899:2480" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2121">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2122" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2123" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="899:2483" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2125">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2126" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2127" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="899:2486" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2129">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2130" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2131" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="899:2489" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2133">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2134" data-name="Group-6">
              <div className="fg-9dda82322e" data-node-id="899:2135" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="899:2492" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="899:2137">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2138" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2139" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="899:2495" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2141">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2142" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2143" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="899:2498" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2145">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="899:2146" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="899:2147" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="899:2148">
              کارشناس عملیات صادرات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="899:2149">
              مدیر بخش بین‌الملل
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="899:2150" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/c5c66d41.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
