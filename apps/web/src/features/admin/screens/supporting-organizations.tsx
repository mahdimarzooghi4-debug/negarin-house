// Figma 894:2983 — Admin / Supporting Organizations — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminSupportingOrganizationsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:2983" data-name="Admin / Supporting Organizations — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:2984" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:2985" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:2986" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:2987" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/25ff48f0.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:2988" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:2992" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:2993" data-name="Global Search" label="جستجو" placeholder="جستجو در سازمان‌ها، برنامه‌های حمایتی و کدهای پیگیری...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="894:2994">
                جستجو در سازمان‌ها، برنامه‌های حمایتی و کدهای پیگیری...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:2995" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:2997">
              مدیریت سازمان‌های حامی
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:2998" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="894:2999" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:3000" data-name="Metric Shortcut" label="۱۲ کل سازمان‌های حامی" destination="service-requests">
              <p className="fg-5061c0f8a0" data-node-id="894:3001">
                ۱۲
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="894:3002">
                کل سازمان‌های حامی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:3003" data-name="Metric Shortcut" label="۸ سازمان‌های فعال" destination="service-requests">
              <p className="fg-f4472f86ce" data-node-id="894:3004">
                ۸
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="894:3005">
                سازمان‌های فعال
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:3006" data-name="Metric Shortcut" label="۵ برنامه حمایتی فعال" destination="service-requests">
              <p className="fg-c9547361f2" data-node-id="894:3007">
                ۵
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="894:3008">
                برنامه حمایتی فعال
              </p>
            </DesignAction>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="894:3009" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="894:3010" data-name="Filter Content">
              <div className="fg-9708e8d183" data-node-id="894:3011" data-name="Interactive Filter Badges">
                <div className="fg-89553f2c19" data-node-id="894:3012" data-name="Filter">
                  <p className="fg-7c79984bbb" dir="auto" data-node-id="894:3013">
                    همه وضعیت‌ها
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:3014" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="894:3015">
                    برنامه فعال
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:3016" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="894:3017">
                    در حال بررسی
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:3018" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="894:3019">
                    پایان‌یافته
                  </p>
                </div>
              </div>
              <DesignField className="fg-e8210ba625" data-node-id="894:3020" data-name="Search Section" label="جستجو" placeholder="شناسه یا نام سازمان حامی...">
                <div className="fg-8c27ae93a2" data-node-id="894:3021" data-name="Search Input Container">
                  <p className="fg-72b13cff4d" dir="auto" data-node-id="894:3022">
                    شناسه یا نام سازمان حامی...
                  </p>
                </div>
              </DesignField>
            </div>
          </div>
          <div className="fg-c7a881f669" data-node-id="894:3023" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="894:3024">
              لیست سازمان‌های حامی و برنامه‌های حمایتی
            </p>
            <div className="fg-ceebe80a1f" data-node-id="894:3025" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="894:3026" data-name="Table Header Row">
                <p className="fg-207ea3ad86" dir="auto" data-node-id="894:3027">
                  اقدام
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3028">
                  آخرین فعالیت
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3029">
                  وضعیت برنامه
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="894:3030">
                  فعالیت عضویت/سهمیه
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:3031">
                  هنرمندان تحت حمایت
                </p>
                <p className="fg-71eba2fd3b" dir="auto" data-node-id="894:3032">
                  برنامه حمایتی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:3033">
                  سازمان حامی
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="894:3034" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="894:3035" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3036" data-name="Col Action" label="مشاهده" destination="supporting-organization-detail">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3037">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="894:3038">
                    ۱۴۰۲/۱۰/۱۶
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:3039" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:3040" data-name="Frame">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3041">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-d21b5969c3" dir="auto" data-node-id="894:3042">
                    حمایت فعال
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="894:3043">
                    ۳۴ هنرمند
                  </p>
                  <p className="fg-2103826d2e" dir="auto" data-node-id="894:3044">
                    طرح توسعه سفالگری بومی
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3045" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3046">
                      بنیاد هنرهای سنتی
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3047">
                      ORG-1024
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:3048" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3049" data-name="Col Action" label="مشاهده" destination="supporting-organization-detail">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3050">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="894:3051">
                    ۱۴۰۲/۱۰/۱۵
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:3052" data-name="Frame">
                    <div className="fg-8c9afb9183" data-node-id="894:3053" data-name="Frame">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:3054">
                        در حال بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="894:3055">
                    —
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="894:3056">
                    ۱۲ هنرمند
                  </p>
                  <p className="fg-2103826d2e" dir="auto" data-node-id="894:3057">
                    توسعه کارگاه‌های قالی‌بافی
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3058" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3059">
                      انجمن حامیان کارآفرینی هنری
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3060">
                      ORG-1025
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:3061" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3062" data-name="Col Action" label="مشاهده" destination="supporting-organization-detail">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3063">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="894:3064">
                    ۱۴۰۲/۱۰/۱۰
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:3065" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:3066" data-name="Frame">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3067">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-d21b5969c3" dir="auto" data-node-id="894:3068">
                    حمایت فعال
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="894:3069">
                    ۴۵ هنرمند
                  </p>
                  <p className="fg-2103826d2e" dir="auto" data-node-id="894:3070">
                    برنامه ملی ارتقای دست‌بافته‌ها
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3071" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3072">
                      مؤسسه فرهنگی نورپردازان
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3073">
                      ORG-1026
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:3074" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3075" data-name="Col Action" label="مشاهده" destination="supporting-organization-detail">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3076">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="894:3077">
                    ۱۴۰۲/۰۹/۲۸
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:3078" data-name="Frame">
                    <div className="fg-bc154bd16e" data-node-id="894:3079" data-name="Frame">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="894:3080">
                        پایان‌یافته
                      </p>
                    </div>
                  </div>
                  <p className="fg-8b05b86e89" data-node-id="894:3081">
                    —
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="894:3082">
                    ۸ هنرمند
                  </p>
                  <p className="fg-2103826d2e" dir="auto" data-node-id="894:3083">
                    توانمندسازی نگارگری جوانان
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3084" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3085">
                      کانون حامیان فرهنگ سنتی
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3086">
                      ORG-1027
                    </p>
                  </div>
                </div>
                <div className="fg-836f598d9f" data-node-id="894:3087" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3088" data-name="Col Action" label="مشاهده" destination="supporting-organization-detail">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3089">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="894:3090">
                    ۱۴۰۲/۰۹/۱۵
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:3091" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:3092" data-name="Frame">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3093">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-d21b5969c3" dir="auto" data-node-id="894:3094">
                    حمایت فعال
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="894:3095">
                    ۲۰ هنرمند
                  </p>
                  <p className="fg-2103826d2e" dir="auto" data-node-id="894:3096">
                    سهمیه ویژه خدمات کارگاهی
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3097" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3098">
                      صندوق رشد صنایع خلاق
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3099">
                      ORG-1028
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:3100" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:3101" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:3102">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="894:3103" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:259" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:3105" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:3106" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:3107" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/0f5a52de.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:3108">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:3109" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:3110" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3111" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:3112" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3114">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:3115" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:3116" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:3117" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3119">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3120" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3121" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:3122" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3124">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3125" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3126" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:3127" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3129">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3130" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:3131" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:3132" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:3134">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3135" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3136" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:3137" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3139">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3140" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:3141" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:3142" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3144">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3145" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3146" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:3147" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3149">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3150" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3151" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:3152" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3154">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:3155" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:3156" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:3157">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:3158">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:3159" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a07fccca.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
