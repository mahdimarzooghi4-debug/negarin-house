// Figma 892:1350 — Admin / Services — Needs Assignment — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminServicesNeedsAssignmentDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="892:1350" data-name="Admin / Services — Needs Assignment — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="892:1351" data-name="Main Workspace">
        <div className="fg-982b1ce7e4" data-node-id="892:1352" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="892:1353" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="892:1354" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/07afde8b.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="892:1355" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="892:1359" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="892:1360" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، برنامه‌های رشد، خدمات و ...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="892:1361">
                جستجو در هنرمندان، برنامه‌های رشد، خدمات و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="892:1362" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="892:1364">
              لیست درخواست‌های خدمات سیستم
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="892:1365" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="892:1366" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:1367" data-name="Metric Shortcut" label="۱۵ مورد در انتظار تخصیص" destination="service-requests">
              <p className="fg-c9547361f2" dir="auto" data-node-id="892:1368">
                ۱۵ مورد
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="892:1369">
                در انتظار تخصیص
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:1370" data-name="Metric Shortcut" label="۴ مورد تخصیص‌های امروز" destination="service-requests">
              <p className="fg-f4472f86ce" dir="auto" data-node-id="892:1371">
                ۴ مورد
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="892:1372">
                تخصیص‌های امروز
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:1373" data-name="Metric Shortcut" label="۲ مورد بدون شریک مناسب" destination="service-requests">
              <p className="fg-73ab430732" dir="auto" data-node-id="892:1374">
                ۲ مورد
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="892:1375">
                بدون شریک مناسب
              </p>
            </DesignAction>
          </div>
          <div className="fg-a1f410f2dc" data-node-id="892:1376" data-name="Worklist Section">
            <div className="fg-c96fe10678" data-node-id="892:1377" data-name="List Header">
              <div className="fg-291f2e73e9" data-node-id="892:1378" data-name="Badge">
                <p className="fg-ff4c51614b" dir="auto" data-node-id="892:1379">
                  نمایش درخواست‌های در انتظار تخصیص
                </p>
              </div>
              <p className="fg-8c96560c87" dir="auto" data-node-id="892:1380">
                صف فعال ارزیابی و تخصیص خدمات
              </p>
            </div>
            <div className="fg-ceebe80a1f" data-node-id="892:1381" data-name="Table Wrapper">
              <div className="fg-6b03877725" data-node-id="892:1382" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="892:1383">
                  اقدام
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="892:1384">
                  اولویت
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="892:1385">
                  وضعیت سهمیه
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="892:1386">
                  تاریخ درخواست
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="892:1387">
                  نوع خدمت
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="892:1388">
                  هنرمند
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="892:1389">
                  شناسه
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="892:1390" data-name="Table Body">
                <div className="fg-12192fcff3" data-node-id="892:1391" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1392" data-name="Col Action" label="تخصیص" destination="service-assignment">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1393">
                      تخصیص
                    </p>
                  </DesignAction>
                  <p className="fg-4f96cddf2a" dir="auto" data-node-id="892:1394">
                    بالا
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="892:1395">
                    سهمیه حرفه‌ای
                  </p>
                  <p className="fg-063362e6ef" data-node-id="892:1396">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1397">
                    عکاسی صنعتی
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1398">
                    زهرا کریمی
                  </p>
                  <p className="fg-3ee574d3a2" data-node-id="892:1399">
                    SRV-1024
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="892:1400" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1401" data-name="Col Action" label="تخصیص" destination="service-assignment">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1402">
                      تخصیص
                    </p>
                  </DesignAction>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="892:1403">
                    متوسط
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="892:1404">
                    سهمیه ویژه
                  </p>
                  <p className="fg-063362e6ef" data-node-id="892:1405">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1406">
                    طراحی بسته‌بندی
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1407">
                    علیرضا طاهری
                  </p>
                  <p className="fg-3ee574d3a2" data-node-id="892:1408">
                    SRV-1025
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="892:1409" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1410" data-name="Col Action" label="تخصیص" destination="service-assignment">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1411">
                      تخصیص
                    </p>
                  </DesignAction>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="892:1412">
                    معمولی
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="892:1413">
                    سهمیه پایه
                  </p>
                  <p className="fg-063362e6ef" data-node-id="892:1414">
                    ۱۴۰۲/۱۰/۱۱
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1415">
                    تولید محتوا
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1416">
                    مریم حسینی
                  </p>
                  <p className="fg-3ee574d3a2" data-node-id="892:1417">
                    SRV-1026
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="892:1418" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1419" data-name="Col Action" label="تخصیص" destination="service-assignment">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1420">
                      تخصیص
                    </p>
                  </DesignAction>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="892:1421">
                    معمولی
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="892:1422">
                    بدون سهمیه
                  </p>
                  <p className="fg-063362e6ef" data-node-id="892:1423">
                    ۱۴۰۲/۱۰/۱۰
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1424">
                    آموزش پیشرفته
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1425">
                    حمید رضا رضایی
                  </p>
                  <p className="fg-3ee574d3a2" data-node-id="892:1426">
                    SRV-1027
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="892:1427" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1428" data-name="Col Action" label="تخصیص" destination="service-assignment">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="892:1429">
                      تخصیص
                    </p>
                  </DesignAction>
                  <p className="fg-4f96cddf2a" dir="auto" data-node-id="892:1430">
                    بالا
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="892:1431">
                    سهمیه ویژه
                  </p>
                  <p className="fg-063362e6ef" data-node-id="892:1432">
                    ۱۴۰۲/۱۰/۰۹
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1433">
                    عکاسی صنعتی
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="892:1434">
                    نیلوفر عباسی
                  </p>
                  <p className="fg-3ee574d3a2" data-node-id="892:1435">
                    SRV-1028
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="892:1436" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="892:1437" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="892:1438">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="892:1439" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="892:1440" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="892:1441" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="892:1442" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="892:1443" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/a4cc0b99.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="892:1444">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="892:1445" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="892:1446" data-name="Group-artists">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1447" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="892:1448" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1450">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="892:1451" data-name="Group-market">
              <DesignAction className="fg-ca8b7daf93" data-node-id="892:1452" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="892:1453" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1455">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1456" data-name="Group-order">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1457" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="892:1458" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1460">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1461" data-name="Group-growth">
              <DesignAction className="fg-fcc641ace6" data-node-id="892:1462" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="892:1463" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="892:1465">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1466" data-name="Group-opportunities">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1467" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="892:1468" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1470">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1471" data-name="Group-finance">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1472" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="892:1473" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1475">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1476" data-name="Group-intl">
              <div className="fg-9e3538324e" data-node-id="892:1477" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="892:1478" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1480">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1481" data-name="Group-reports">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1482" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="892:1483" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1485">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1486" data-name="Group-settings">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1487" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="892:1488" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1490">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="892:1491" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="892:1492" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="892:1493">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="892:1494">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="892:1495" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
