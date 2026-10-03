// Figma 888:915 — Admin / Orders — Needs Action — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOrdersNeedsActionDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="888:915" data-name="Admin / Orders — Needs Action — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="888:916" data-name="Main Workspace">
        <div className="fg-982b1ce7e4" data-node-id="888:917" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="888:918" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="888:919" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="888:920" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="888:924" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="888:925" data-name="Global Search" label="جستجو" placeholder="جستجو در سفارش‌ها، مشکلات، خریداران و ...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="888:926">
                جستجو در سفارش‌ها، مشکلات، خریداران و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="888:927" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="888:929">
              سفارش‌های نیازمند اقدام
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="888:930" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="888:931" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="888:932" data-name="Metric Shortcut" label="۶ مورد نیازمند رسیدگی فوری" destination="service-requests">
              <p className="fg-73ab430732" dir="auto" data-node-id="888:933">
                ۶ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="888:934">
                نیازمند رسیدگی فوری
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="888:935" data-name="Metric Shortcut" label="۲ مورد عدم پذیرش هنرمند" destination="service-requests">
              <p className="fg-c9547361f2" dir="auto" data-node-id="888:936">
                ۲ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="888:937">
                عدم پذیرش هنرمند
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="888:938" data-name="Metric Shortcut" label="۳ مورد مشکل ارسال پستی" destination="service-requests">
              <p className="fg-2806b13ae0" dir="auto" data-node-id="888:939">
                ۳ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="888:940">
                مشکل ارسال پستی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="888:941" data-name="Metric Shortcut" label="۱ مورد گزارش تأخیر خریدار" destination="service-requests">
              <p className="fg-5061c0f8a0" dir="auto" data-node-id="888:942">
                ۱ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="888:943">
                گزارش تأخیر خریدار
              </p>
            </DesignAction>
          </div>
          <div className="fg-ed24daf445" data-node-id="888:944" data-name="Filter Banner">
            <p className="fg-e7934d44e5" dir="auto" data-node-id="888:945">{`فیلتر فعال: نمایش سفارش‌های "نیازمند رسیدگی کارشناس"`}</p>
          </div>
          <div className="fg-c7a881f669" data-node-id="888:946" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="888:947">
              صف اقدام سفارش‌ها
            </p>
            <div className="fg-ceebe80a1f" data-node-id="888:948" data-name="Table Wrapper">
              <div className="fg-6b03877725" data-node-id="888:949" data-name="Table Header Row">
                <p className="fg-df82248898" dir="auto" data-node-id="888:950">
                  اقدام
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="888:951">
                  آخرین بروزرسانی
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:952">
                  وضعیت انجام
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="888:953">
                  دلیل رسیدگی
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="888:954">
                  هنرمند
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="888:955">
                  خریدار
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="888:956">
                  سفارش
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="888:957" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="888:958" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:959" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:960" data-name="Negarin / Button" label="رسیدگی" destination="order-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:960;46:3">
                        رسیدگی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="888:962">
                    ۱۰ دقیقه پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:963" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="888:964" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="888:965">
                        عدم پذیرش
                      </p>
                    </div>
                  </div>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="888:966">
                    هنرمند سفارش را نپذیرفته است
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:967">
                    زهرا کریمی
                  </p>
                  <p className="fg-e891805ef1" dir="auto" data-node-id="888:968">
                    حمید رضا رضایی
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:969">
                    ORD-1024
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:970" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:971" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:972" data-name="Negarin / Button" label="رسیدگی" destination="order-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:972;46:3">
                        رسیدگی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="888:974">
                    ۱ ساعت پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:975" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="888:976" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="888:977">
                        مشکل ارسال
                      </p>
                    </div>
                  </div>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="888:978">
                    مشکل در ارسال پستی - عدم تطابق کد رهگیری
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:979">
                    علی علوی
                  </p>
                  <p className="fg-e891805ef1" dir="auto" data-node-id="888:980">
                    سارا احمدی
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:981">
                    ORD-1025
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:982" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:983" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:984" data-name="Negarin / Button" label="رسیدگی" destination="order-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:984;46:3">
                        رسیدگی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="888:986">
                    ۳ ساعت پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:987" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="888:988" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="888:989">
                        شکایت خریدار
                      </p>
                    </div>
                  </div>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="888:990">
                    گزارش خریدار - کالا معیوب تحویل شده
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:991">
                    مریم حسینی
                  </p>
                  <p className="fg-e891805ef1" dir="auto" data-node-id="888:992">
                    محمد محسنی
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:993">
                    ORD-1026
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:994" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:995" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:996" data-name="Negarin / Button" label="رسیدگی" destination="order-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:996;46:3">
                        رسیدگی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="888:998">
                    ۵ ساعت پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:999" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="888:1000" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="888:1001">
                        تأخیر آماده‌سازی
                      </p>
                    </div>
                  </div>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="888:1002">
                    تأخیر در آماده‌سازی بیش از حد مجاز
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1003">
                    رضا رضایی
                  </p>
                  <p className="fg-e891805ef1" dir="auto" data-node-id="888:1004">
                    نیلوفر عباسی
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1005">
                    ORD-1027
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1006" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1007" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1008" data-name="Negarin / Button" label="رسیدگی" destination="order-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1008;46:3">
                        رسیدگی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="888:1010">
                    ۱ روز پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1011" data-name="Col Status">
                    <div className="fg-c9a49f4476" data-node-id="888:1012" data-name="Badge">
                      <p className="fg-645e8110ca" dir="auto" data-node-id="888:1013">
                        مشکل در ارسال
                      </p>
                    </div>
                  </div>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="888:1014">
                    مشکل بسته‌بندی نامناسب در مرکز پستی
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1015">
                    فاطمه معتمد
                  </p>
                  <p className="fg-e891805ef1" dir="auto" data-node-id="888:1016">
                    آرش رحیمی
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1017">
                    ORD-1028
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1018" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1019" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1020" data-name="Negarin / Button" label="رسیدگی" destination="order-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1020;46:3">
                        رسیدگی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="888:1022">
                    ۲ روز پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1023" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="888:1024" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="888:1025">
                        عدم پذیرش
                      </p>
                    </div>
                  </div>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="888:1026">
                    هنرمند بیش از ۴۸ ساعت سفارش را بی‌پاسخ گذاشته
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1027">
                    حسین موسوی
                  </p>
                  <p className="fg-e891805ef1" dir="auto" data-node-id="888:1028">
                    نسرین مقصودی
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1029">
                    ORD-1029
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="888:1030" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="888:1031" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="888:1032">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="888:1033" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="888:1034" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="888:1035" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="888:1036" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="888:1037" data-name="Dashboard Icon Frame">
              <div className="fg-b9638d5378" data-node-id="888:1479" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/35028716.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="888:1039">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="888:1040" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="888:1041" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1042" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="888:1043" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1045">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="888:1046" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="888:1047" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="888:1048" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1050">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1051" data-name="Group-2">
              <DesignAction className="fg-fcc641ace6" data-node-id="888:1052" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="888:1053" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="888:1055">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1056" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1057" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="888:1058" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1060">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1061" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1062" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="888:1063" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1065">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1066" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1067" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="888:1068" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1070">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1071" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="888:1072" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="888:1073" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1075">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1076" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1077" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="888:1078" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1080">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1081" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1082" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="888:1083" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1085">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="888:1086" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="888:1087" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="888:1088">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="888:1089">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="888:1090" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
