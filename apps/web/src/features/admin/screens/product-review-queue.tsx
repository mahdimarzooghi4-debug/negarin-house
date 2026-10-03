// Figma 887:1216 — Admin / Product Review Queue — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminProductReviewQueueDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="887:1216" data-name="Admin / Product Review Queue — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="887:1217" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="887:1218" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="887:1219" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="887:1220" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/ac33a3df.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="887:1221" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/ffb547dd.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="887:1225" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="887:1226" data-name="Global Search" label="جستجو" placeholder="جستجو در محصولات...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="887:1227">
                جستجو در محصولات...
              </p>
              <div className="fg-c51752dc8c" data-node-id="887:1228" data-name="Icon-search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/b531729d.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="887:1230">
              صف بررسی محصولات
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="887:1231" data-name="Scrollable Content">
          <div className="fg-347137de39" data-node-id="887:1271" data-name="Worklist Section">
            <div className="fg-ceebe80a1f" data-node-id="887:1272" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="887:1273" data-name="Table Header Row">
                <p className="fg-c38b582c4c" dir="auto" data-node-id="887:1274">
                  اقدام
                </p>
                <p className="fg-4b3039cae4" dir="auto" data-node-id="887:1276">
                  وضعیت بررسی
                </p>
                <p className="fg-1645e57d0a" dir="auto" data-node-id="887:1277">
                  تاریخ ارسال
                </p>
                <p className="fg-9f8254621b" dir="auto" data-node-id="887:1280">
                  محصول
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="887:1281" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="887:1282" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="887:1283" data-name="Col Action" label="بررسی" destination="product-review-new-product">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:1284">
                      بررسی
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="887:1286" data-name="Col Status">
                    <div className="fg-d7139b82ce" data-node-id="887:1287" data-name="Badge">
                      <p className="fg-ade22fcf80" dir="auto" data-node-id="887:1288">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-de861aa5d7" data-node-id="887:1289">
                    ۱۴۰۲/۰۸/۲۲
                  </p>
                  <div className="fg-0d48e329f1" data-node-id="887:1296" data-name="Col Product">
                    <p className="fg-fb8b27c5c5" dir="auto" data-node-id="887:1297">
                      کاسه سفالی لعاب‌دار فیروزه‌ای
                    </p>
                    <p className="fg-d69fadf45a" data-node-id="887:1298">
                      PRD-4091
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="887:1299" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="887:1300" data-name="Col Action" label="بررسی" destination="product-review-new-product">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:1301">
                      بررسی
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="887:1303" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="887:1304" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="887:1305">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-de861aa5d7" data-node-id="887:1306">
                    ۱۴۰۲/۰۸/۲۲
                  </p>
                  <div className="fg-0d48e329f1" data-node-id="887:1313" data-name="Col Product">
                    <p className="fg-fb8b27c5c5" dir="auto" data-node-id="887:1314">
                      کیف چرم دوزی زنانه طرح اسلیمی
                    </p>
                    <p className="fg-d69fadf45a" data-node-id="887:1315">
                      PRD-4092
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="887:1316" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="887:1317" data-name="Col Action" label="بررسی" destination="product-review-new-product">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:1318">
                      بررسی
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="887:1320" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="887:1321" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="887:1322">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-de861aa5d7" data-node-id="887:1323">
                    ۱۴۰۲/۰۸/۲۱
                  </p>
                  <div className="fg-0d48e329f1" data-node-id="887:1330" data-name="Col Product">
                    <p className="fg-fb8b27c5c5" dir="auto" data-node-id="887:1331">
                      گلدان میناکاری طرح شاه‌عباسی
                    </p>
                    <p className="fg-d69fadf45a" data-node-id="887:1332">
                      PRD-4093
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="887:1333" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="887:1334" data-name="Col Action" label="بررسی" destination="product-review-new-product">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:1335">
                      بررسی
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="887:1337" data-name="Col Status">
                    <div className="fg-d7139b82ce" data-node-id="887:1338" data-name="Badge">
                      <p className="fg-ade22fcf80" dir="auto" data-node-id="887:1339">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-de861aa5d7" data-node-id="887:1340">
                    ۱۴۰۲/۰۸/۲۱
                  </p>
                  <div className="fg-0d48e329f1" data-node-id="887:1347" data-name="Col Product">
                    <p className="fg-fb8b27c5c5" dir="auto" data-node-id="887:1348">
                      بشقاب دیوارکوب نقطه کوبی
                    </p>
                    <p className="fg-d69fadf45a" data-node-id="887:1349">
                      PRD-4094
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="887:1350" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="887:1351" data-name="Col Action" label="بررسی" destination="product-review-new-product">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:1352">
                      بررسی
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="887:1354" data-name="Col Status">
                    <div className="fg-d7139b82ce" data-node-id="887:1355" data-name="Badge">
                      <p className="fg-ade22fcf80" dir="auto" data-node-id="887:1356">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-de861aa5d7" data-node-id="887:1357">
                    ۱۴۰۲/۰۸/۲۰
                  </p>
                  <div className="fg-0d48e329f1" data-node-id="887:1364" data-name="Col Product">
                    <p className="fg-fb8b27c5c5" dir="auto" data-node-id="887:1365">
                      شال ابریشم دستبافت پته‌دوزی
                    </p>
                    <p className="fg-d69fadf45a" data-node-id="887:1366">
                      PRD-4095
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="887:1367" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="887:1368" data-name="Col Action" label="بررسی" destination="product-review-new-product">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:1369">
                      بررسی
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="887:1371" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="887:1372" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="887:1373">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-de861aa5d7" data-node-id="887:1374">
                    ۱۴۰۲/۰۸/۱۹
                  </p>
                  <div className="fg-0d48e329f1" data-node-id="887:1381" data-name="Col Product">
                    <p className="fg-fb8b27c5c5" dir="auto" data-node-id="887:1382">
                      جعبه جواهرات خاتم‌کاری اصفهان
                    </p>
                    <p className="fg-d69fadf45a" data-node-id="887:1383">
                      PRD-4096
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="887:1384" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="887:1385" data-name="Col Action" label="بررسی" destination="product-review-new-product">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:1386">
                      بررسی
                    </p>
                  </DesignAction>
                  <div className="fg-d3a9b73303" data-node-id="887:1388" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="887:1389" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="887:1390">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-de861aa5d7" data-node-id="887:1391">
                    ۱۴۰۲/۰۸/۱۸
                  </p>
                  <div className="fg-0d48e329f1" data-node-id="887:1398" data-name="Col Product">
                    <p className="fg-fb8b27c5c5" dir="auto" data-node-id="887:1399">
                      سرمه‌دان برنجی قلم‌زنی
                    </p>
                    <p className="fg-d69fadf45a" data-node-id="887:1400">
                      PRD-4097
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="887:1412" data-name="Sidebar">
        <div className="fg-4a6a7d5965" data-node-id="887:1413" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="887:1414">
            خانه نگارین
          </p>
          <div className="fg-7d8647fa8b" data-node-id="887:1415" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:242" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="887:1417" data-name="Navigation">
          <div className="fg-35181ed007" data-node-id="887:1418" data-name="Nav Dashboard">
            <div className="fg-c51752dc8c" data-node-id="887:1419" data-name="Icon-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/b73d30e9.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="887:1421">
              داشبورد
            </p>
          </div>
          <div className="fg-c02ab258ae" data-node-id="887:1422" data-name="Nav Groups">
            <div className="fg-aea76cc67b" data-node-id="887:1423" data-name="Group-0">
              <div className="fg-fc08538add" data-node-id="887:1424" data-name="Icon-chevronDown">
                <span aria-hidden="true" data-source-non-rendering="887:1424" />
              </div>
              <p className="fg-68399534eb" dir="auto" data-node-id="887:1426">
                هنرمندان
              </p>
            </div>
            <div className="fg-239f54e425" data-node-id="887:1427" data-name="Group-1">
              <div className="fg-dcabc08b94" data-node-id="887:1428" data-name="Icon-chevronDown">
                <span aria-hidden="true" data-source-non-rendering="887:1428" />
              </div>
              <p className="fg-5e31783152" dir="auto" data-node-id="887:1430">
                بازار
              </p>
            </div>
            <div className="fg-aea76cc67b" data-node-id="887:1431" data-name="Group-2">
              <div className="fg-fc08538add" data-node-id="887:1432" data-name="Icon-chevronDown">
                <span aria-hidden="true" data-source-non-rendering="887:1432" />
              </div>
              <p className="fg-a335a2535b" dir="auto" data-node-id="887:1434">
                سفارش و ارسال
              </p>
            </div>
            <div className="fg-aea76cc67b" data-node-id="887:1435" data-name="Group-3">
              <div className="fg-fc08538add" data-node-id="887:1436" data-name="Icon-chevronDown">
                <span aria-hidden="true" data-source-non-rendering="887:1436" />
              </div>
              <p className="fg-68399534eb" dir="auto" data-node-id="887:1438">
                رشد و خدمات
              </p>
            </div>
            <div className="fg-aea76cc67b" data-node-id="887:1439" data-name="Group-4">
              <div className="fg-fc08538add" data-node-id="887:1440" data-name="Icon-chevronDown">
                <span aria-hidden="true" data-source-non-rendering="887:1440" />
              </div>
              <p className="fg-68399534eb" dir="auto" data-node-id="887:1442">
                فرصت‌ها
              </p>
            </div>
            <div className="fg-aea76cc67b" data-node-id="887:1443" data-name="Group-5">
              <div className="fg-fc08538add" data-node-id="887:1444" data-name="Icon-chevronDown">
                <span aria-hidden="true" data-source-non-rendering="887:1444" />
              </div>
              <p className="fg-68399534eb" dir="auto" data-node-id="887:1446">
                مالی و عضویت
              </p>
            </div>
            <div className="fg-3f106e1f96" data-node-id="909:50" data-name="Group-6">
              <div className="fg-558da3a1d5" data-node-id="909:51" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="909:52" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="909:54">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-aea76cc67b" data-node-id="887:1447" data-name="Group-6">
              <div className="fg-fc08538add" data-node-id="887:1448" data-name="Icon-chevronDown">
                <span aria-hidden="true" data-source-non-rendering="887:1448" />
              </div>
              <p className="fg-68399534eb" dir="auto" data-node-id="887:1450">
                گزارش‌ها
              </p>
            </div>
            <div className="fg-aea76cc67b" data-node-id="887:1451" data-name="Group-7">
              <div className="fg-fc08538add" data-node-id="887:1452" data-name="Icon-chevronDown">
                <span aria-hidden="true" data-source-non-rendering="887:1452" />
              </div>
              <p className="fg-68399534eb" dir="auto" data-node-id="887:1454">
                تنظیمات
              </p>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="887:1455" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="887:1456" data-name="Profile Details">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="887:1457">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="887:1458">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="887:1459" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/1c1653ae.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
