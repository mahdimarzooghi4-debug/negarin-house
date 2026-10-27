// Figma 888:1092 — Admin / Order Issues — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOrderIssuesDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="888:1092" data-name="Admin / Order Issues — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="888:1093" data-name="Main Workspace">
        <div className="fg-982b1ce7e4" data-node-id="888:1094" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="888:1095" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="888:1096" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="888:1097" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="888:1101" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="888:1102" data-name="Global Search" label="جستجو" placeholder="جستجو در سفارش‌ها، مشکلات، خریداران و ...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="888:1103">
                جستجو در سفارش‌ها، مشکلات، خریداران و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="888:1104" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="888:1106">
              مدیریت مشکلات سفارش‌ها
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="888:1107" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="888:1108" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="888:1109" data-name="Metric Shortcut" label="۴۲ مشکل کل مشکلات ثبت شده" destination="service-requests">
              <p className="fg-5061c0f8a0" dir="auto" data-node-id="888:1110">
                ۴۲ مشکل
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="888:1111">
                کل مشکلات ثبت شده
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="888:1112" data-name="Metric Shortcut" label="۱۵ مورد مشکلات باز و حل‌نشده" destination="service-requests">
              <p className="fg-73ab430732" dir="auto" data-node-id="888:1113">
                ۱۵ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="888:1114">
                مشکلات باز و حل‌نشده
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="888:1115" data-name="Metric Shortcut" label="۸ مورد در حال بررسی کارشناسان" destination="product-review-queue">
              <p className="fg-c9547361f2" dir="auto" data-node-id="888:1116">
                ۸ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="888:1117">
                در حال بررسی کارشناسان
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="888:1118" data-name="Metric Shortcut" label="۱۹ مورد حل شده و خاتمه یافته" destination="service-requests">
              <p className="fg-bdab2c756d" dir="auto" data-node-id="888:1119">
                ۱۹ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="888:1120">
                حل شده و خاتمه یافته
              </p>
            </DesignAction>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="888:1121" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="888:1122" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="888:1123" data-name="Frame">
                <div className="fg-a3b2a587b5" data-node-id="888:1124" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:1125">
                    وضعیت مشکل: همه
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:1126" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:1127">
                    منبع مشکل: خریدار/هنرمند
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:1128" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:1129">
                    مسئول رسیدگی: کارشناس عملیات
                  </p>
                </div>
              </div>
              <div className="fg-e8210ba625" data-node-id="888:1130" data-name="Frame">
                <DesignField className="fg-8c27ae93a2" data-node-id="888:1131" data-name="Search Input" label="جستجو" placeholder="جستجو در شناسه‌ها...">
                  <p className="fg-f68c5e162d" dir="auto" data-node-id="888:1132">
                    جستجو در شناسه‌ها...
                  </p>
                </DesignField>
              </div>
            </div>
          </div>
          <div className="fg-c7a881f669" data-node-id="888:1133" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="888:1134">
              لیست مشکلات سفارش‌ها
            </p>
            <div className="fg-ceebe80a1f" data-node-id="888:1135" data-name="Table Wrapper">
              <div className="fg-6b03877725" data-node-id="888:1136" data-name="Table Header Row">
                <p className="fg-df82248898" dir="auto" data-node-id="888:1137">
                  اقدام
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="888:1138">
                  تاریخ ثبت
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="888:1139">
                  مسئول رسیدگی
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:1140">
                  وضعیت مشکل
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="888:1141">
                  منبع مشکل
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="888:1142">
                  هنرمند
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:1143">
                  سفارش مرتبط
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="888:1144">
                  شناسه مشکل
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="888:1145" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="888:1146" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1147" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1148" data-name="Negarin / Button" label="بررسی" destination="order-issue-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1148;46:3">
                        بررسی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-4238471968" data-node-id="888:1150">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1151">
                    مریم احمدی
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1152" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="888:1153" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="888:1154">
                        در حال بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="888:1155">
                    خریدار
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1156">
                    زهرا کریمی
                  </p>
                  <p className="fg-83bc562964" data-node-id="888:1157">
                    ORD-1024
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1158">
                    ISS-1024
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1159" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1160" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1161" data-name="Negarin / Button" label="بررسی" destination="order-issue-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1161;46:3">
                        بررسی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-4238471968" data-node-id="888:1163">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1164">
                    تخصیص نشده
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1165" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="888:1166" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="888:1167">
                        باز
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="888:1168">
                    سیستم
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1169">
                    علی علوی
                  </p>
                  <p className="fg-83bc562964" data-node-id="888:1170">
                    ORD-1025
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1171">
                    ISS-1025
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1172" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1173" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1174" data-name="Negarin / Button" label="بررسی" destination="order-issue-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1174;46:3">
                        بررسی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-4238471968" data-node-id="888:1176">
                    ۱۴۰۲/۱۰/۱۳
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1177">
                    رضا کرمی
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1178" data-name="Col Status">
                    <div className="fg-c9a49f4476" data-node-id="888:1179" data-name="Badge">
                      <p className="fg-645e8110ca" dir="auto" data-node-id="888:1180">
                        در انتظار پاسخ
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="888:1181">
                    هنرمند
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1182">
                    مریم حسینی
                  </p>
                  <p className="fg-83bc562964" data-node-id="888:1183">
                    ORD-1026
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1184">
                    ISS-1026
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1185" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1186" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1187" data-name="Negarin / Button" label="بررسی" destination="order-issue-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1187;46:3">
                        بررسی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-4238471968" data-node-id="888:1189">
                    ۱۴۰۲/۱۰/۱۳
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1190">
                    امیر محسنی
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1191" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="888:1192" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="888:1193">
                        حل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="888:1194">
                    عملیات داخلی
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1195">
                    رضا رضایی
                  </p>
                  <p className="fg-83bc562964" data-node-id="888:1196">
                    ORD-1027
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1197">
                    ISS-1027
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1198" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1199" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1200" data-name="Negarin / Button" label="بررسی" destination="order-issue-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1200;46:3">
                        بررسی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-4238471968" data-node-id="888:1202">
                    ۱۴۰۲/۱۰/۱۴
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1203">
                    مریم احمدی
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1204" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="888:1205" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="888:1206">
                        در حال بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="888:1207">
                    خریدار
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1208">
                    فاطمه معتمد
                  </p>
                  <p className="fg-83bc562964" data-node-id="888:1209">
                    ORD-1028
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1210">
                    ISS-1028
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1211" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1212" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1213" data-name="Negarin / Button" label="بررسی" destination="order-issue-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1213;46:3">
                        بررسی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-4238471968" data-node-id="888:1215">
                    ۱۴۰۲/۱۰/۱۴
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1216">
                    تخصیص نشده
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1217" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="888:1218" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="888:1219">
                        باز
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="888:1220">
                    هنرمند
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1221">
                    حسین موسوی
                  </p>
                  <p className="fg-83bc562964" data-node-id="888:1222">
                    ORD-1029
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1223">
                    ISS-1029
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1224" data-name="Table Row">
                  <div className="fg-635daaec03" data-node-id="888:1225" data-name="Col Action">
                    <DesignAction className="fg-61b2399ccb" data-node-id="888:1226" data-name="Negarin / Button" label="بررسی" destination="order-issue-detail">
                      <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:1226;46:3">
                        بررسی
                      </p>
                    </DesignAction>
                  </div>
                  <p className="fg-4238471968" data-node-id="888:1228">
                    ۱۴۰2/۱۰/۱۵
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1229">
                    امیر محسنی
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1230" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="888:1231" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="888:1232">
                        حل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="888:1233">
                    سیستم
                  </p>
                  <p className="fg-af06ab84d3" dir="auto" data-node-id="888:1234">
                    سارا محمدی
                  </p>
                  <p className="fg-83bc562964" data-node-id="888:1235">
                    ORD-1030
                  </p>
                  <p className="fg-363a4d0690" data-node-id="888:1236">
                    ISS-1030
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="888:1237" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="888:1238" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="888:1239">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="888:1240" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="888:1241" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="888:1242" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="888:1243" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="888:1244" data-name="Dashboard Icon Frame">
              <div className="fg-b9638d5378" data-node-id="888:1482" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/06ed4f22.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="888:1246">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="888:1247" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="888:1248" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1249" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="888:1250" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1252">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="888:1253" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="888:1254" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="888:1255" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1257">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1258" data-name="Group-2">
              <DesignAction className="fg-fcc641ace6" data-node-id="888:1259" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="888:1260" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="888:1262">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1263" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1264" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="888:1265" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1267">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1268" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1269" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="888:1270" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1272">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1273" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1274" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="888:1275" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1277">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1278" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="888:1279" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="888:1280" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1282">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1283" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1284" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="888:1285" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1287">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1288" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1289" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="888:1290" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1292">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="888:1293" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="888:1294" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="888:1295">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="888:1296">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="888:1297" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
