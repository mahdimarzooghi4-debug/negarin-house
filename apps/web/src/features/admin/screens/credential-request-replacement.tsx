// Figma 884:1309 — Admin / Credential Request Replacement
import { DesignAction, DesignField, DesignDialog } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminCredentialRequestReplacement() {
  return (
    <div className="fg-360fef389f" data-node-id="884:1309" data-name="Admin / Credential Request Replacement">
      <div className="fg-44dd13c7dd" data-node-id="884:1310" data-name="Frame" inert>
        <div className="fg-45e3d85eed" data-node-id="884:1311" data-name="Admin / Credential Review — Desktop">
          <div className="fg-f7cede9c7c" data-node-id="884:1312" data-name="Main Workspace">
            <div className="fg-77ab100845" data-node-id="884:1313" data-name="Header">
              <div className="fg-a34c8fe932" data-node-id="884:1314" data-name="Left Actions">
                <div className="fg-08c31cb510" data-node-id="884:1315" data-name="Staff Profile Circle">
                  <img alt="" className="fg-8038e5755b" src="/admin-assets/c80bfa52.png" />
                </div>
                <DesignAction className="fg-328252374d" data-node-id="884:1316" data-name="Notification Bell Button" label="Notification Bell Button">
                  <div className="fg-b04bb497e9" data-node-id="884:1317" data-name="Notification dot">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                  <div className="fg-87f65ec773" data-node-id="884:1318" data-name="bell">
                    <div className="fg-ad11617f24" data-node-id="884:1726" data-name="bell">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/03409b2e.svg" />
                    </div>
                  </div>
                </DesignAction>
              </div>
              <div className="fg-460d084997" data-node-id="884:1320" data-name="Right Header">
                <DesignField className="fg-9ce4e1a1a3" data-node-id="884:1321" data-name="Global Search" label="جستجو" placeholder="جستجو در مدارک...">
                  <p className="fg-f68c5e162d" dir="auto" data-node-id="884:1322">
                    جستجو در مدارک...
                  </p>
                  <div className="fg-c55cd499f6" data-node-id="884:1323" data-name="search">
                    <div className="fg-a0cc0c55d5" data-node-id="884:1729" data-name="search">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/5bd0496b.svg" />
                    </div>
                  </div>
                </DesignField>
                <p className="fg-5330a4ecde" dir="auto" data-node-id="884:1325">
                  بررسی مدرک
                </p>
              </div>
            </div>
            <div className="fg-28892a2677" data-node-id="884:1326" data-name="Scrollable Content">
              <div className="fg-c96fe10678" data-node-id="884:1327" data-name="Frame">
                <div className="fg-480aeaca9c" data-node-id="884:1328" data-name="Frame">
                  <DesignAction className="fg-934ca87244" dir="auto" data-node-id="884:1329" label="بازگشت به لیست" destination="professional-credentials">
                    بازگشت به لیست
                  </DesignAction>
                </div>
                <div className="fg-aeb445f664" data-node-id="884:1330" data-name="Frame">
                  <p className="fg-180507194b" dir="auto" data-node-id="884:1331">
                    گواهی درجه ۲ صنایع دستی
                  </p>
                  <p className="fg-3502070eee" data-node-id="884:1332">{`>`}</p>
                  <p className="fg-7de654a4e5" dir="auto" data-node-id="884:1333">
                    هنرمند نمونه
                  </p>
                  <p className="fg-3502070eee" data-node-id="884:1334">{`>`}</p>
                  <p className="fg-7de654a4e5" dir="auto" data-node-id="884:1335">
                    مدارک حرفه‌ای
                  </p>
                </div>
              </div>
              <div className="fg-03bb2e10b3" data-node-id="884:1336" data-name="Frame">
                <div className="fg-ee0ddf2a8d" data-node-id="884:1337" data-name="Frame">
                  <div className="fg-5d2b1fe4be" data-node-id="884:1338" data-name="Frame">
                    <div className="fg-3d51711349" data-node-id="884:1732" data-name="file-text">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/673917e9.svg" />
                    </div>
                    <p className="fg-ebba4376f7" dir="auto" data-node-id="884:1340">
                      پیش‌نمایش مدرک
                    </p>
                    <p className="fg-0add9fcee1" dir="auto" data-node-id="884:1341">
                      تصویر بارگذاری شده گواهی درجه ۲ صنایع دستی (زری‌بافی)
                    </p>
                  </div>
                  <div className="fg-5dc79e25e0" data-node-id="884:1342" data-name="Frame">
                    <p className="fg-5f8b9f0bac" dir="auto" data-node-id="884:1343">
                      مشخصات ارسال مدرک
                    </p>
                    <div className="fg-452d346712" data-node-id="884:1344" data-name="Frame">
                      <div className="fg-d112749c30" data-node-id="884:1345" data-name="Frame">
                        <p className="fg-37aeb78d0d" dir="auto" data-node-id="884:1346">
                          وضعیت فعلی
                        </p>
                        <div className="fg-5aa1b320cb" data-node-id="884:1347" data-name="Frame">
                          <div className="fg-dfbfc9032f" data-node-id="884:1348" data-name="Frame">
                            <p className="fg-024e3e4169" dir="auto" data-node-id="884:1349">
                              در حال بررسی
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="fg-301e4331a7" data-node-id="884:1350" data-name="Frame">
                        <p className="fg-7f846ac2e7" dir="auto" data-node-id="884:1351">
                          شناسه مدرک
                        </p>
                        <p className="fg-6454f41814" data-node-id="884:1352">
                          CRD-4921
                        </p>
                      </div>
                      <div className="fg-301e4331a7" data-node-id="884:1353" data-name="Frame">
                        <p className="fg-7f846ac2e7" dir="auto" data-node-id="884:1354">
                          تاریخ ارسال
                        </p>
                        <p className="fg-6454f41814" data-node-id="884:1355">
                          ۱۴۰۲/۰۸/۱۰
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-de9376ae60" data-node-id="884:1356" data-name="Right Panel">
                  <div className="fg-93778178b8" data-node-id="884:1357" data-name="Frame">
                    <div className="fg-6f19774f23" data-node-id="884:1358" data-name="Frame">
                      <p className="fg-4504ee7a2f" dir="auto" data-node-id="884:1359">
                        هنرمند نمونه
                      </p>
                      <p className="fg-1e0701e555" data-node-id="884:1360">
                        ART-1092
                      </p>
                    </div>
                    <div className="fg-6b8676953c" data-node-id="884:1361" data-name="Rectangle">
                      <img alt="" className="fg-d63441eb10" src="/admin-assets/2caf008c.png" />
                    </div>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="884:1362" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                    </div>
                  </div>
                  <div className="fg-24081ceef5" data-node-id="884:1363" data-name="Frame">
                    <div className="fg-c96fe10678" data-node-id="884:1364" data-name="Frame">
                      <div className="fg-e6bf96a33c" data-node-id="884:1365" data-name="Frame">
                        <p className="fg-f412706158" dir="auto" data-node-id="884:1366">
                          فعال
                        </p>
                      </div>
                      <p className="fg-fa7abe4be3" dir="auto" data-node-id="884:1367">
                        وضعیت حساب
                      </p>
                    </div>
                    <div className="fg-6dd7f43e28" data-node-id="884:1368" data-name="Frame">
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="884:1369">
                        نگارستان زری
                      </p>
                      <p className="fg-1e0701e555" dir="auto" data-node-id="884:1370">
                        نام غرفه / برند
                      </p>
                    </div>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="884:1371" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                    </div>
                  </div>
                  <div className="fg-24081ceef5" data-node-id="884:1372" data-name="Frame">
                    <p className="fg-19fa1bb32b" dir="auto" data-node-id="884:1373">
                      اقدامات ارزیابی
                    </p>
                    <div className="fg-452d346712" data-node-id="884:1374" data-name="Frame">
                      <DesignAction className="fg-3651dc4f5f" data-node-id="884:1375" data-name="Negarin / Button" label="درخواست اصلاح">
                        <p className="fg-158fccfd2c" dir="auto" data-node-id="I884:1375;46:53">
                          درخواست اصلاح
                        </p>
                      </DesignAction>
                      <DesignAction className="fg-7902cb33b7" data-node-id="884:1378" data-name="Negarin / Button" label="تأیید مدرک">
                        <p className="fg-dfcb367ffa" dir="auto" data-node-id="I884:1378;45:11">
                          تأیید مدرک
                        </p>
                      </DesignAction>
                    </div>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="884:1381" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                    </div>
                  </div>
                  <div className="fg-d6f889b3e9" data-node-id="884:1382" data-name="Frame">
                    <p className="fg-19fa1bb32b" dir="auto" data-node-id="884:1383">
                      تاریخچه مدرک
                    </p>
                    <div className="fg-24081ceef5" data-node-id="884:1384" data-name="Frame">
                      <div className="fg-47aacf6d1d" data-node-id="884:1385" data-name="Frame">
                        <p className="fg-5192a2fdb5" data-node-id="884:1386">
                          ۱۴۰۲/۰۸/۱۱
                        </p>
                        <p className="fg-50f4508c2f" dir="auto" data-node-id="884:1387">
                          شروع بررسی توسط کارشناس
                        </p>
                        <div className="fg-814236e220" data-node-id="884:1388" data-name="Ellipse">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/e42ace74.svg" />
                        </div>
                      </div>
                      <div className="fg-47aacf6d1d" data-node-id="884:1389" data-name="Frame">
                        <p className="fg-5192a2fdb5" data-node-id="884:1390">
                          ۱۴۰۲/۰۸/۱۰
                        </p>
                        <p className="fg-50f4508c2f" dir="auto" data-node-id="884:1391">
                          ارسال مدرک توسط هنرمند
                        </p>
                        <div className="fg-814236e220" data-node-id="884:1392" data-name="Ellipse">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/70d8473c.svg" />
                        </div>
                      </div>
                      <div className="fg-47aacf6d1d" data-node-id="884:1393" data-name="Frame">
                        <p className="fg-5192a2fdb5" data-node-id="884:1394">
                          ۱۴۰۲/۰۸/۰۸
                        </p>
                        <p className="fg-50f4508c2f" dir="auto" data-node-id="884:1395">
                          ایجاد درخواست ارسال مدرک
                        </p>
                        <div className="fg-814236e220" data-node-id="884:1396" data-name="Ellipse">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/70d8473c.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AdminSidebar className="fg-1ae6468b1f" data-node-id="884:1397" data-name="Sidebar" inert>
            <div className="fg-bfcc56511d" data-node-id="884:1398" data-name="Brand">
              <p className="fg-013587b973" dir="auto" data-node-id="884:1399">
                خانه نگارین
              </p>
              <div className="fg-bb3f247d9d" data-node-id="884:1400" data-name="Logo Container">
                <div className="fg-f84de76785" data-node-id="884:1401" data-name="Brand / Negarin Logo">
                  <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
                </div>
              </div>
            </div>
            <div className="fg-6803f66aba" data-node-id="884:1402" data-name="Navigation">
              <DesignAction className="fg-4a871e0b11" data-node-id="884:1403" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
                <div className="fg-c51752dc8c" data-node-id="884:1810" data-name="layout-dashboard">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
                </div>
                <p className="fg-6abfcd3772" dir="auto" data-node-id="884:1405">
                  داشبورد
                </p>
              </DesignAction>
              <div className="fg-c1bc7f9234" data-node-id="884:1406" data-name="Nav Groups">
                <div className="fg-3f106e1f96" data-node-id="884:1407" data-name="Group-0">
                  <DesignAction className="fg-fcc641ace6" data-node-id="884:1408" data-name="Group Header" label="هنرمندان" destination="artists">
                    <div className="fg-0a9542d889" data-node-id="884:1409" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1735" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/5ac3a538.svg" />
                      </div>
                    </div>
                    <p className="fg-81a7a808ad" dir="auto" data-node-id="884:1411">
                      هنرمندان
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-239f54e425" data-node-id="884:1412" data-name="Group-1">
                  <DesignAction className="fg-ca8b7daf93" data-node-id="884:1413" data-name="Group Header" label="بازار" destination="products">
                    <div className="fg-0a9542d889" data-node-id="884:1414" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1738" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/01f26a36.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1416">
                      بازار
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1417" data-name="Group-2">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1418" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                    <div className="fg-0a9542d889" data-node-id="884:1419" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1741" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/a433f362.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1421">
                      سفارش و ارسال
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1422" data-name="Group-3">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1423" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                    <div className="fg-0a9542d889" data-node-id="884:1424" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1744" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/11b1fa74.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1426">
                      رشد و خدمات
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1427" data-name="Group-4">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1428" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                    <div className="fg-0a9542d889" data-node-id="884:1429" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1747" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/0038fdca.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1431">
                      فرصت‌ها
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1432" data-name="Group-5">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1433" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                    <div className="fg-0a9542d889" data-node-id="884:1434" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1750" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/a4c8634e.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1436">
                      مالی و عضویت
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1437" data-name="Group-6">
                  <div className="fg-9e3538324e" data-node-id="884:1438" data-name="Group Header">
                    <div className="fg-0a9542d889" data-node-id="884:1439" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1753" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/7c8ff974.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1441">
                      بین‌الملل
                    </p>
                  </div>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1442" data-name="Group-7">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1443" data-name="Group Header" label="گزارش‌ها" destination="reports">
                    <div className="fg-0a9542d889" data-node-id="884:1444" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1756" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/b09d3d2a.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1446">
                      گزارش‌ها
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1447" data-name="Group-8">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1448" data-name="Group Header" label="تنظیمات" destination="settings">
                    <div className="fg-0a9542d889" data-node-id="884:1449" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1759" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/b7a41bac.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1451">
                      تنظیمات
                    </p>
                  </DesignAction>
                </div>
              </div>
            </div>
            <div className="fg-20fc7845ff" data-node-id="884:1452" data-name="Staff Profile">
              <div className="fg-15b486e966" data-node-id="884:1453" data-name="Profile Details">
                <p className="fg-fe647e601f" dir="auto" data-node-id="884:1454">
                  کارشناس عملیات
                </p>
                <p className="fg-a9d1c863d0" dir="auto" data-node-id="884:1455">
                  مدیر عملیات سیستم
                </p>
              </div>
              <div className="fg-e409306ac6" data-node-id="884:1456" data-name="Staff Avatar">
                <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/c51413a8.png" />
              </div>
            </div>
          </AdminSidebar>
        </div>
      </div>
      <div className="fg-b64d55ba81" data-node-id="884:1457" data-name="Backdrop">
        <DesignDialog className="fg-022a67ddb5" data-node-id="884:1458" data-name="Modal Box" label="Admin / Credential Request Replacement" closeDestination="professional-credentials">
          <div className="fg-c96fe10678" data-node-id="884:1459" data-name="Frame">
            <div className="fg-c51752dc8c" data-node-id="884:1460" data-name="close">
              <div className="fg-0bb5547f93" data-node-id="884:1801" data-name="x-circle">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/674d1bb6.svg" />
              </div>
            </div>
            <p className="fg-3c2ea8c9ad" dir="auto" data-node-id="884:1462">
              درخواست اصلاح مدرک حرفه‌ای
            </p>
          </div>
          <div className="fg-df0a3de519" data-node-id="884:1463" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/admin-assets/316bd4b5.svg" />
            </div>
          </div>
          <div className="fg-c9f126fc53" data-node-id="884:1464" data-name="Frame">
            <div className="fg-33a96cd610" data-node-id="884:1465" data-name="Frame">
              <p className="fg-c34c9a845e" dir="auto" data-node-id="884:1466">
                هنرمند نمونه
              </p>
              <p className="fg-1e0701e555" dir="auto" data-node-id="884:1467">
                نام هنرمند
              </p>
            </div>
            <div className="fg-c4e52c9812" data-node-id="884:1468" data-name="Frame">
              <p className="fg-b899329ac4" dir="auto" data-node-id="884:1469">
                گواهی درجه ۲ صنایع دستی
              </p>
              <p className="fg-4104cd2227" dir="auto" data-node-id="884:1470">
                عنوان مدرک
              </p>
            </div>
          </div>
          <div className="fg-62f39da6b2" data-node-id="884:1471" data-name="Frame">
            <p className="fg-7b343898ff" dir="auto" data-node-id="884:1472">
              توضیحات اصلاح مورد نیاز *
            </p>
            <div className="fg-85b7e0ace4" data-node-id="884:1473" data-name="Frame">
              <p className="fg-f68c5e162d" dir="auto" data-node-id="884:1474">
                دلیل درخواست اصلاح و راهنمایی برای هنرمند را بنویسید... برای مثال: «تصویر گواهی ناخواناست، لطفا مجددا با وضوح بالاتر ارسال کنید.»
              </p>
            </div>
          </div>
          <div className="fg-df0a3de519" data-node-id="884:1475" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/admin-assets/316bd4b5.svg" />
            </div>
          </div>
          <div className="fg-452d346712" data-node-id="884:1476" data-name="Frame">
            <DesignAction className="fg-3651dc4f5f" data-node-id="884:1477" data-name="Negarin / Button" label="انصراف" destination="professional-credentials">
              <p className="fg-964f9fc750" dir="auto" data-node-id="I884:1477;46:53">
                انصراف
              </p>
            </DesignAction>
            <DesignAction className="fg-9536590778" data-node-id="884:1480" data-name="Negarin / Button" label="ارسال درخواست" destination="professional-credentials">
              <p className="fg-e19b4eb252" dir="auto" data-node-id="I884:1480;46:41">
                ارسال درخواست
              </p>
            </DesignAction>
          </div>
        </DesignDialog>
      </div>
    </div>
  );
}
