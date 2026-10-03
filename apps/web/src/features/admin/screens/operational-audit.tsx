// Figma 903:2610 — Admin / Operational Audit — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOperationalAuditDesktop() {
  return (
    <div className="fg-2f84151df8" data-node-id="903:2610" data-name="Admin / Operational Audit — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:2611" data-name="Main Workspace">
        <div className="fg-03e03d5fa6" data-node-id="903:2612" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:2613" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:2614" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/5d2a96d0.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="903:2615" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/34973d08.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="903:2619" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="903:2620" data-name="Global Search" label="جستجو" placeholder="جستجو در رویدادها، شناسه‌ها و ...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="903:2621">
                جستجو در رویدادها، شناسه‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="903:2622" data-name="search">
                <span aria-hidden="true" data-source-non-rendering="903:2622" />
              </div>
            </DesignField>
            <div className="fg-db65f399cd" data-node-id="903:2624" data-name="Title and Path">
              <div className="fg-860c2f1554" data-node-id="903:2625" data-name="Breadcrumbs">
                <div className="fg-f1a0c10dac" data-node-id="903:2626" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:2627">
                    داشبورد مدیریت
                  </p>
                  <p className="fg-29a4797011" data-node-id="903:2628">{`>`}</p>
                </div>
                <div className="fg-e8210ba625" data-node-id="903:2629" data-name="Frame">
                  <p className="fg-79f0034e69" dir="auto" data-node-id="903:2630">
                    تنظیمات سیستم
                  </p>
                </div>
              </div>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="903:2631">
                تاریخچه عملیات سیستم (Audit Log)
              </p>
            </div>
          </div>
        </div>
        <div className="fg-318cb33346" data-node-id="903:2632" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="903:2633" data-name="Operational Summary">
            <DesignAction className="fg-35866692f7" data-node-id="903:2634" data-name="Metric Shortcut" label="۲,۴۵۶ رویداد کل رویدادهای ثبت‌شده" >
              <p className="fg-5d24156dfa" dir="auto" data-node-id="903:2635">
                ۲,۴۵۶ رویداد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="903:2636">
                کل رویدادهای ثبت‌شده
              </p>
            </DesignAction>
            <DesignAction className="fg-35866692f7" data-node-id="903:2637" data-name="Metric Shortcut" label="۱۸ رویداد عملیات امروز" >
              <p className="fg-8834b4fe70" dir="auto" data-node-id="903:2638">
                ۱۸ رویداد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="903:2639">
                عملیات امروز
              </p>
            </DesignAction>
            <DesignAction className="fg-35866692f7" data-node-id="903:2640" data-name="Metric Shortcut" label="۱۲۴ رویداد عملیات هفته جاری" >
              <p className="fg-eea57500b3" dir="auto" data-node-id="903:2641">
                ۱۲۴ رویداد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="903:2642">
                عملیات هفته جاری
              </p>
            </DesignAction>
          </div>
          <div className="fg-e389b74f87" data-node-id="903:2643" data-name="Disclaimer Banner">
            <p className="fg-9ea872ef69" dir="auto" data-node-id="903:2644">
              توجه: این گزارش صرفاً جهت ردیابی رویدادهای سیستمی و امنیت داده‌ها تدوین شده است و کاربردی در رتبه‌بندی پرسنل یا ارزیابی کارایی ندارد.
            </p>
            <div className="fg-c51752dc8c" data-node-id="903:2914" data-name="info">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/09d78954.svg" />
            </div>
          </div>
          <div className="fg-a82e23779d" data-node-id="903:2646" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="903:2647" data-name="Filter Content">
              <DesignAction className="fg-e8210ba625" data-node-id="903:2648" data-name="Reset Action" label="حذف فیلترها">
                <p className="fg-7c79984bbb" dir="auto" data-node-id="903:2649">
                  حذف فیلترها
                </p>
              </DesignAction>
              <div className="fg-ad50363799" data-node-id="903:2650" data-name="Interactive Filter Badges">
                <div className="fg-edfa22ff40" data-node-id="903:2651" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2652">
                    محدوده تاریخ
                  </p>
                  <div className="fg-fc08538add" data-node-id="903:2917" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/992f9f7a.svg" />
                  </div>
                </div>
                <div className="fg-e2b1b8dbaf" data-node-id="903:2654" data-name="Filter">
                  <p className="fg-e7934d44e5" dir="auto" data-node-id="903:2655">
                    نوع عملیات
                  </p>
                  <div className="fg-fc08538add" data-node-id="903:2920" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/771b217f.svg" />
                  </div>
                </div>
                <div className="fg-edfa22ff40" data-node-id="903:2657" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2658">
                    کاربر عامل
                  </p>
                  <div className="fg-fc08538add" data-node-id="903:2923" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/992f9f7a.svg" />
                  </div>
                </div>
                <div className="fg-edfa22ff40" data-node-id="903:2660" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2661">
                    ماژول
                  </p>
                  <div className="fg-fc08538add" data-node-id="903:2926" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/992f9f7a.svg" />
                  </div>
                </div>
                <div className="fg-910dfc2293" data-node-id="903:2663" data-name="Search Input Container">
                  <p className="fg-72b13cff4d" dir="auto" data-node-id="903:2664">
                    جستجوی AUD-XXXX یا شناسه موجودیت...
                  </p>
                  <div className="fg-5cca20e57d" data-node-id="903:2929" data-name="search">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/507ab01f.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fg-c7ad551efe" data-node-id="903:2666" data-name="Worklist Section">
            <div className="fg-c96fe10678" data-node-id="903:2667" data-name="Section Header Row">
              <DesignAction className="fg-765fed4140" data-node-id="903:2668" data-name="Export Button" label="دریافت خروجی گزارش">
                <p className="fg-23a6b4336d" dir="auto" data-node-id="903:2669">
                  دریافت خروجی گزارش
                </p>
                <div className="fg-5cca20e57d" data-node-id="903:2932" data-name="download">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/82dcc009.svg" />
                </div>
              </DesignAction>
              <p className="fg-8c96560c87" dir="auto" data-node-id="903:2671">
                لیست آخرین تغییرات و رویدادهای امنیتی
              </p>
            </div>
            <div className="fg-d6978f0ecf" data-node-id="903:2672" data-name="Table Wrapper">
              <div className="fg-6a7c42418e" data-node-id="903:2673" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="903:2674">
                  اقدام
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="903:2675">
                  نتیجه عملیات
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="903:2676">
                  زمان و تاریخ رویداد
                </p>
                <p className="fg-648e3447c7" dir="auto" data-node-id="903:2677">
                  ماژول سیستمی
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="903:2678">
                  کاربر عامل
                </p>
                <p className="fg-71eba2fd3b" dir="auto" data-node-id="903:2679">
                  موجودیت مرتبط
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:2680">
                  شرح عملیات انجام شده
                </p>
                <p className="fg-648e3447c7" dir="auto" data-node-id="903:2681">
                  شناسه رویداد
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="903:2682" data-name="Table Body">
                <div className="fg-a5637434d8" data-node-id="903:2683" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:2684" data-name="Col Action" label="جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:2685">
                      جزئیات
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="903:2686" data-name="Frame">
                    <div className="fg-e6bf96a33c" data-node-id="903:2687" data-name="Module Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:2688">
                        تأیید‌شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="903:2689">
                    ۱۴۰۲/۱۲/۰۷ - ۱۴:۳۲
                  </p>
                  <div className="fg-e19e594884" data-node-id="903:2690" data-name="Frame">
                    <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2691">
                      محصولات
                    </p>
                  </div>
                  <div className="fg-9496ba1fd3" data-node-id="903:2692" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="903:2693">
                      مریم علیزاده
                    </p>
                    <p className="fg-56eba8c972" data-node-id="903:2694">
                      USR-1022
                    </p>
                  </div>
                  <div className="fg-a3268ec0b3" data-node-id="903:2695" data-name="Frame">
                    <p className="fg-8368b401b8" dir="auto" data-node-id="903:2696">
                      تابلو فرش طرح بهار
                    </p>
                    <p className="fg-ce4a7a25d5" data-node-id="903:2697">
                      PRD-3045
                    </p>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:2698">
                    تأیید محصول و انتشار در بازار
                  </p>
                  <p className="fg-653ea2b11e" data-node-id="903:2699">
                    AUD-9982
                  </p>
                </div>
                <div className="fg-a5637434d8" data-node-id="903:2700" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:2701" data-name="Col Action" label="جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:2702">
                      جزئیات
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="903:2703" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="903:2704" data-name="Module Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="903:2705">
                        نیاز به بازنگری
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="903:2706">
                    ۱۴۰۲/۱۲/۰۷ - ۱۳:۱۵
                  </p>
                  <div className="fg-e19e594884" data-node-id="903:2707" data-name="Frame">
                    <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2708">
                      محصولات
                    </p>
                  </div>
                  <div className="fg-9496ba1fd3" data-node-id="903:2709" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="903:2710">
                      رضا رضایی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="903:2711">
                      USR-3044
                    </p>
                  </div>
                  <div className="fg-a3268ec0b3" data-node-id="903:2712" data-name="Frame">
                    <p className="fg-8368b401b8" dir="auto" data-node-id="903:2713">
                      سفالینه لاجورد
                    </p>
                    <p className="fg-ce4a7a25d5" data-node-id="903:2714">
                      PRD-1024
                    </p>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:2715">
                    درخواست بازنگری کیفیت تصویر اثر
                  </p>
                  <p className="fg-653ea2b11e" data-node-id="903:2716">
                    AUD-9981
                  </p>
                </div>
                <div className="fg-a5637434d8" data-node-id="903:2717" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:2718" data-name="Col Action" label="جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:2719">
                      جزئیات
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="903:2720" data-name="Frame">
                    <div className="fg-e6bf96a33c" data-node-id="903:2721" data-name="Module Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:2722">
                        فعال‌شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="903:2723">
                    ۱۴۰۲/۱۲/۰۷ - ۱۱:۰۵
                  </p>
                  <div className="fg-e19e594884" data-node-id="903:2724" data-name="Frame">
                    <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2725">
                      هنرمندان
                    </p>
                  </div>
                  <div className="fg-9496ba1fd3" data-node-id="903:2726" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="903:2727">
                      امیرحسین عباسی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="903:2728">
                      USR-0941
                    </p>
                  </div>
                  <div className="fg-a3268ec0b3" data-node-id="903:2729" data-name="Frame">
                    <p className="fg-8368b401b8" dir="auto" data-node-id="903:2730">
                      زهرا کریمی (نگارگر)
                    </p>
                    <p className="fg-ce4a7a25d5" data-node-id="903:2731">
                      ART-8821
                    </p>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:2732">
                    تأیید مدرک شناسایی و احراز هویت هنرمند
                  </p>
                  <p className="fg-653ea2b11e" data-node-id="903:2733">
                    AUD-9980
                  </p>
                </div>
                <div className="fg-a5637434d8" data-node-id="903:2734" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:2735" data-name="Col Action" label="جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:2736">
                      جزئیات
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="903:2737" data-name="Frame">
                    <div className="fg-e6bf96a33c" data-node-id="903:2738" data-name="Module Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:2739">
                        تکمیل‌شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="903:2740">
                    ۱۴۰۲/۱۲/۰۶ - ۱۷:۴۰
                  </p>
                  <div className="fg-e19e594884" data-node-id="903:2741" data-name="Frame">
                    <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2742">
                      مالی
                    </p>
                  </div>
                  <div className="fg-9496ba1fd3" data-node-id="903:2743" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="903:2744">
                      سارا احمدی (مالی)
                    </p>
                    <p className="fg-56eba8c972" data-node-id="903:2745">
                      USR-1122
                    </p>
                  </div>
                  <div className="fg-a3268ec0b3" data-node-id="903:2746" data-name="Frame">
                    <p className="fg-8368b401b8" dir="auto" data-node-id="903:2747">
                      درخواست تسویه مریم حسینی
                    </p>
                    <p className="fg-ce4a7a25d5" data-node-id="903:2748">
                      SET-1026
                    </p>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:2749">
                    تغییر وضعیت تسویه به تکمیل‌شده (واریز حواله)
                  </p>
                  <p className="fg-653ea2b11e" data-node-id="903:2750">
                    AUD-9979
                  </p>
                </div>
                <div className="fg-a5637434d8" data-node-id="903:2751" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:2752" data-name="Col Action" label="جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:2753">
                      جزئیات
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="903:2754" data-name="Frame">
                    <div className="fg-fef4f244a3" data-node-id="903:2755" data-name="Module Badge">
                      <p className="fg-d37d7f60e8" dir="auto" data-node-id="903:2756">
                        تخصیص‌یافته
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="903:2757">
                    ۱۴۰۲/۱۲/۰۶ - ۱۵:۱۰
                  </p>
                  <div className="fg-e19e594884" data-node-id="903:2758" data-name="Frame">
                    <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2759">
                      خدمات
                    </p>
                  </div>
                  <div className="fg-9496ba1fd3" data-node-id="903:2760" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="903:2761">
                      حمید رضایی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="903:2762">
                      USR-2004
                    </p>
                  </div>
                  <div className="fg-a3268ec0b3" data-node-id="903:2763" data-name="Frame">
                    <p className="fg-8368b401b8" dir="auto" data-node-id="903:2764">
                      قرارداد خدمات باربری ارس
                    </p>
                    <p className="fg-ce4a7a25d5" data-node-id="903:2765">
                      SRV-4091
                    </p>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:2766">
                    تخصیص خدمت پشتیبانی لجستیک به شریک
                  </p>
                  <p className="fg-653ea2b11e" data-node-id="903:2767">
                    AUD-9978
                  </p>
                </div>
                <div className="fg-a5637434d8" data-node-id="903:2768" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:2769" data-name="Col Action" label="جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:2770">
                      جزئیات
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="903:2771" data-name="Frame">
                    <div className="fg-fef4f244a3" data-node-id="903:2772" data-name="Module Badge">
                      <p className="fg-d37d7f60e8" dir="auto" data-node-id="903:2773">
                        تغییر نقش
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="903:2774">
                    ۱۴۰۲/۱۲/۰۶ - ۰۹:۱۵
                  </p>
                  <div className="fg-e19e594884" data-node-id="903:2775" data-name="Frame">
                    <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2776">
                      دسترسی
                    </p>
                  </div>
                  <div className="fg-9496ba1fd3" data-node-id="903:2777" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="903:2778">
                      مدیر سیستم پشتیبان
                    </p>
                    <p className="fg-56eba8c972" data-node-id="903:2779">
                      USR-0001
                    </p>
                  </div>
                  <div className="fg-a3268ec0b3" data-node-id="903:2780" data-name="Frame">
                    <p className="fg-8368b401b8" dir="auto" data-node-id="903:2781">
                      حسین حسینی (پشتیبانی)
                    </p>
                    <p className="fg-ce4a7a25d5" data-node-id="903:2782">
                      USR-0452
                    </p>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:2783">
                    تغییر نقش کاربری و ارتقا به کارشناس ارشد
                  </p>
                  <p className="fg-653ea2b11e" data-node-id="903:2784">
                    AUD-9977
                  </p>
                </div>
                <div className="fg-a5637434d8" data-node-id="903:2785" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:2786" data-name="Col Action" label="جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:2787">
                      جزئیات
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="903:2788" data-name="Frame">
                    <div className="fg-e6bf96a33c" data-node-id="903:2789" data-name="Module Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:2790">
                        تأیید‌شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="903:2791">
                    ۱۴۰۲/۱۲/۰۵ - ۱۸:۲۰
                  </p>
                  <div className="fg-e19e594884" data-node-id="903:2792" data-name="Frame">
                    <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2793">
                      محتوا
                    </p>
                  </div>
                  <div className="fg-9496ba1fd3" data-node-id="903:2794" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="903:2795">
                      مریم علیزاده
                    </p>
                    <p className="fg-56eba8c972" data-node-id="903:2796">
                      USR-1022
                    </p>
                  </div>
                  <div className="fg-a3268ec0b3" data-node-id="903:2797" data-name="Frame">
                    <p className="fg-8368b401b8" dir="auto" data-node-id="903:2798">
                      داستان کارگاه لاله
                    </p>
                    <p className="fg-ce4a7a25d5" data-node-id="903:2799">
                      STR-0911
                    </p>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:2800">
                    تأیید روایت داستانی محصول کارگاه سفال
                  </p>
                  <p className="fg-653ea2b11e" data-node-id="903:2801">
                    AUD-9976
                  </p>
                </div>
                <div className="fg-a5637434d8" data-node-id="903:2802" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:2803" data-name="Col Action" label="جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:2804">
                      جزئیات
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="903:2805" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="903:2806" data-name="Module Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="903:2807">
                        بروزرسانی
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="903:2808">
                    ۱۴۰۲/۱۲/۰۵ - ۱۶:۴۵
                  </p>
                  <div className="fg-e19e594884" data-node-id="903:2809" data-name="Frame">
                    <p className="fg-35eebb81d9" dir="auto" data-node-id="903:2810">
                      تنظیمات
                    </p>
                  </div>
                  <div className="fg-9496ba1fd3" data-node-id="903:2811" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="903:2812">
                      مدیر سیستم پشتیبان
                    </p>
                    <p className="fg-56eba8c972" data-node-id="903:2813">
                      USR-0001
                    </p>
                  </div>
                  <div className="fg-a3268ec0b3" data-node-id="903:2814" data-name="Frame">
                    <p className="fg-8368b401b8" dir="auto" data-node-id="903:2815">
                      پیکربندی اعلان‌های تراکنشی
                    </p>
                    <p className="fg-ce4a7a25d5" data-node-id="903:2816">
                      CFG-2004
                    </p>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:2817">
                    تغییر تنظیمات اعلان پیامکی تأیید تراکنش
                  </p>
                  <p className="fg-653ea2b11e" data-node-id="903:2818">
                    AUD-9975
                  </p>
                </div>
              </div>
              <div className="fg-b6e67a57e2" data-node-id="903:2819" data-name="Table Pagination Row">
                <div className="fg-a34c8fe932" data-node-id="903:2820" data-name="Pagination Action">
                  <DesignAction className="fg-b1dceb6d81" data-node-id="903:2821" data-name="Prev Button" label="بعدی">
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:2822">
                      بعدی
                    </p>
                  </DesignAction>
                  <div className="fg-92b7da7864" data-node-id="903:2823" data-name="Page Numbers">
                    <div className="fg-f0efdfdfef" data-node-id="903:2824" data-name="Page Num Active">
                      <p className="fg-437b715459" data-node-id="903:2825">
                        ۱
                      </p>
                    </div>
                    <div className="fg-1389babf2a" data-node-id="903:2826" data-name="Page Num Inactive">
                      <p className="fg-71ce793e77" data-node-id="903:2827">
                        ۲
                      </p>
                    </div>
                    <div className="fg-1389babf2a" data-node-id="903:2828" data-name="Page Num Inactive">
                      <p className="fg-71ce793e77" data-node-id="903:2829">
                        ۳
                      </p>
                    </div>
                  </div>
                  <DesignAction className="fg-b1dceb6d81" data-node-id="903:2830" data-name="Next Button" label="قبلی">
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:2831">
                      قبلی
                    </p>
                  </DesignAction>
                </div>
                <p className="fg-a7cd4a14c6" dir="auto" data-node-id="903:2832">
                  نمایش ۱ تا ۸ از ۲,۴۵۶ رویداد سیستمی
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:2833" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="903:2834" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="903:2835">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="903:2836" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="903:2837" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="903:2838" data-name="Navigation">
          <div className="fg-4a871e0b11" data-node-id="903:2839" data-name="Sidebar Item">
            <div className="fg-914cbaa88f" data-node-id="903:2840" data-name="Label and Icon">
              <p className="fg-68399534eb" dir="auto" data-node-id="903:2841">
                داشبورد سیستمی
              </p>
              <div className="fg-c51752dc8c" data-node-id="903:2842" data-name="icon-container">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/c4f60255.svg" />
              </div>
            </div>
          </div>
          <div className="fg-d339eb034a" data-node-id="903:2844" data-name="Group List">
            <div className="fg-7c9fd82229" data-node-id="903:2845" data-name="Sidebar Item">
              <div className="fg-fc08538add" data-node-id="903:2846" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9cd3f922.svg" />
                </div>
              </div>
              <div className="fg-914cbaa88f" data-node-id="903:2848" data-name="Label and Icon">
                <p className="fg-68399534eb" dir="auto" data-node-id="903:2849">
                  هنرمندان
                </p>
                <div className="fg-647d031420" data-node-id="903:2850" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2935" data-name="users">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/d5ad7769.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-239f54e425" data-node-id="903:2852" data-name="Sidebar Item">
              <div className="fg-333d1655d4" data-node-id="903:2853" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9cd3f922.svg" />
                </div>
              </div>
              <div className="fg-be0f507b91" data-node-id="903:2855" data-name="Label and Icon">
                <p className="fg-68399534eb" dir="auto" data-node-id="903:2856">
                  بازار
                </p>
                <div className="fg-647d031420" data-node-id="903:2857" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2938" data-name="shopping-bag">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/c6447200.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-7c9fd82229" data-node-id="903:2859" data-name="Sidebar Item">
              <div className="fg-fc08538add" data-node-id="903:2860" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9cd3f922.svg" />
                </div>
              </div>
              <div className="fg-914cbaa88f" data-node-id="903:2862" data-name="Label and Icon">
                <p className="fg-68399534eb" dir="auto" data-node-id="903:2863">
                  سفارش و ارسال
                </p>
                <div className="fg-647d031420" data-node-id="903:2864" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2941" data-name="truck">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/7acbf22d.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-7c9fd82229" data-node-id="903:2866" data-name="Sidebar Item">
              <div className="fg-fc08538add" data-node-id="903:2867" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9cd3f922.svg" />
                </div>
              </div>
              <div className="fg-914cbaa88f" data-node-id="903:2869" data-name="Label and Icon">
                <p className="fg-68399534eb" dir="auto" data-node-id="903:2870">
                  رشد و خدمات
                </p>
                <div className="fg-647d031420" data-node-id="903:2871" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2944" data-name="award">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/d9e2c307.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-7c9fd82229" data-node-id="903:2873" data-name="Sidebar Item">
              <div className="fg-fc08538add" data-node-id="903:2874" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9cd3f922.svg" />
                </div>
              </div>
              <div className="fg-914cbaa88f" data-node-id="903:2876" data-name="Label and Icon">
                <p className="fg-68399534eb" dir="auto" data-node-id="903:2877">
                  فرصت‌ها
                </p>
                <div className="fg-647d031420" data-node-id="903:2878" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2947" data-name="briefcase">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/45846e2b.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-7c9fd82229" data-node-id="903:2880" data-name="Sidebar Item">
              <div className="fg-fc08538add" data-node-id="903:2881" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9cd3f922.svg" />
                </div>
              </div>
              <div className="fg-914cbaa88f" data-node-id="903:2883" data-name="Label and Icon">
                <p className="fg-68399534eb" dir="auto" data-node-id="903:2884">
                  مالی و عضویت
                </p>
                <div className="fg-647d031420" data-node-id="903:2885" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2950" data-name="credit-card">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/3ef08650.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-7c9fd82229" data-node-id="903:2887" data-name="Sidebar Item">
              <div className="fg-fc08538add" data-node-id="903:2888" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9cd3f922.svg" />
                </div>
              </div>
              <div className="fg-914cbaa88f" data-node-id="903:2890" data-name="Label and Icon">
                <p className="fg-68399534eb" dir="auto" data-node-id="903:2891">
                  بین‌الملل
                </p>
                <div className="fg-647d031420" data-node-id="903:2892" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2953" data-name="globe">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/0e829806.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-7c9fd82229" data-node-id="903:2894" data-name="Sidebar Item">
              <div className="fg-fc08538add" data-node-id="903:2895" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9cd3f922.svg" />
                </div>
              </div>
              <div className="fg-914cbaa88f" data-node-id="903:2897" data-name="Label and Icon">
                <p className="fg-68399534eb" dir="auto" data-node-id="903:2898">
                  گزارش‌ها
                </p>
                <div className="fg-647d031420" data-node-id="903:2899" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2956" data-name="trending-up">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5e73fa9d.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-4e3f7991ea" data-node-id="903:2901" data-name="Sidebar Item">
              <div className="fg-fc08538add" data-node-id="903:2902" data-name="chevron">
                <div className="fg-7afa20deae">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/33c5c864.svg" />
                </div>
              </div>
              <div className="fg-914cbaa88f" data-node-id="903:2904" data-name="Label and Icon">
                <p className="fg-72a7c04d51" dir="auto" data-node-id="903:2905">
                  تنظیمات
                </p>
                <div className="fg-647d031420" data-node-id="903:2906" data-name="icon-container">
                  <div className="fg-c51752dc8c" data-node-id="903:2959" data-name="settings">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/3d74564c.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="903:2908" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="903:2909" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="903:2910">
              کارشناس امنیت سیستم
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="903:2911">
              مدیر ارشد دسترسی‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="903:2912" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/2b5cc521.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
