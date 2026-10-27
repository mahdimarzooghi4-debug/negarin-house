// Figma 884:1484 — Admin / Credential Approve — Confirmation
import { DesignAction, DesignField, DesignDialog } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminCredentialApproveConfirmation() {
  return (
    <div className="fg-360fef389f" data-node-id="884:1484" data-name="Admin / Credential Approve — Confirmation">
      <div className="fg-44dd13c7dd" data-node-id="884:1485" data-name="Frame" inert>
        <div className="fg-45e3d85eed" data-node-id="884:1486" data-name="Admin / Credential Review — Desktop">
          <div className="fg-f7cede9c7c" data-node-id="884:1487" data-name="Main Workspace">
            <div className="fg-77ab100845" data-node-id="884:1488" data-name="Header">
              <div className="fg-a34c8fe932" data-node-id="884:1489" data-name="Left Actions">
                <div className="fg-08c31cb510" data-node-id="884:1490" data-name="Staff Profile Circle">
                  <img alt="" className="fg-8038e5755b" src="/admin-assets/111d23a2.png" />
                </div>
                <DesignAction className="fg-328252374d" data-node-id="884:1491" data-name="Notification Bell Button" label="Notification Bell Button">
                  <div className="fg-b04bb497e9" data-node-id="884:1492" data-name="Notification dot">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                  <div className="fg-87f65ec773" data-node-id="884:1493" data-name="bell">
                    <div className="fg-ad11617f24" data-node-id="884:1762" data-name="bell">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/bd03b6be.svg" />
                    </div>
                  </div>
                </DesignAction>
              </div>
              <div className="fg-460d084997" data-node-id="884:1495" data-name="Right Header">
                <DesignField className="fg-9ce4e1a1a3" data-node-id="884:1496" data-name="Global Search" label="جستجو" placeholder="جستجو در مدارک...">
                  <p className="fg-f68c5e162d" dir="auto" data-node-id="884:1497">
                    جستجو در مدارک...
                  </p>
                  <div className="fg-c55cd499f6" data-node-id="884:1498" data-name="search">
                    <div className="fg-a0cc0c55d5" data-node-id="884:1765" data-name="search">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/a35b7feb.svg" />
                    </div>
                  </div>
                </DesignField>
                <p className="fg-5330a4ecde" dir="auto" data-node-id="884:1500">
                  بررسی مدرک
                </p>
              </div>
            </div>
            <div className="fg-28892a2677" data-node-id="884:1501" data-name="Scrollable Content">
              <div className="fg-c96fe10678" data-node-id="884:1502" data-name="Frame">
                <div className="fg-480aeaca9c" data-node-id="884:1503" data-name="Frame">
                  <DesignAction className="fg-934ca87244" dir="auto" data-node-id="884:1504" label="بازگشت به لیست" destination="professional-credentials">
                    بازگشت به لیست
                  </DesignAction>
                </div>
                <div className="fg-aeb445f664" data-node-id="884:1505" data-name="Frame">
                  <p className="fg-180507194b" dir="auto" data-node-id="884:1506">
                    گواهی درجه ۲ صنایع دستی
                  </p>
                  <p className="fg-3502070eee" data-node-id="884:1507">{`>`}</p>
                  <p className="fg-7de654a4e5" dir="auto" data-node-id="884:1508">
                    هنرمند نمونه
                  </p>
                  <p className="fg-3502070eee" data-node-id="884:1509">{`>`}</p>
                  <p className="fg-7de654a4e5" dir="auto" data-node-id="884:1510">
                    مدارک حرفه‌ای
                  </p>
                </div>
              </div>
              <div className="fg-03bb2e10b3" data-node-id="884:1511" data-name="Frame">
                <div className="fg-ee0ddf2a8d" data-node-id="884:1512" data-name="Frame">
                  <div className="fg-5d2b1fe4be" data-node-id="884:1513" data-name="Frame">
                    <div className="fg-3d51711349" data-node-id="884:1768" data-name="file-text">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/673917e9.svg" />
                    </div>
                    <p className="fg-ebba4376f7" dir="auto" data-node-id="884:1515">
                      پیش‌نمایش مدرک
                    </p>
                    <p className="fg-0add9fcee1" dir="auto" data-node-id="884:1516">
                      تصویر بارگذاری شده گواهی درجه ۲ صنایع دستی (زری‌بافی)
                    </p>
                  </div>
                  <div className="fg-5dc79e25e0" data-node-id="884:1517" data-name="Frame">
                    <p className="fg-5f8b9f0bac" dir="auto" data-node-id="884:1518">
                      مشخصات ارسال مدرک
                    </p>
                    <div className="fg-452d346712" data-node-id="884:1519" data-name="Frame">
                      <div className="fg-d112749c30" data-node-id="884:1520" data-name="Frame">
                        <p className="fg-37aeb78d0d" dir="auto" data-node-id="884:1521">
                          وضعیت فعلی
                        </p>
                        <div className="fg-5aa1b320cb" data-node-id="884:1522" data-name="Frame">
                          <div className="fg-dfbfc9032f" data-node-id="884:1523" data-name="Frame">
                            <p className="fg-024e3e4169" dir="auto" data-node-id="884:1524">
                              در حال بررسی
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="fg-301e4331a7" data-node-id="884:1525" data-name="Frame">
                        <p className="fg-7f846ac2e7" dir="auto" data-node-id="884:1526">
                          شناسه مدرک
                        </p>
                        <p className="fg-6454f41814" data-node-id="884:1527">
                          CRD-4921
                        </p>
                      </div>
                      <div className="fg-301e4331a7" data-node-id="884:1528" data-name="Frame">
                        <p className="fg-7f846ac2e7" dir="auto" data-node-id="884:1529">
                          تاریخ ارسال
                        </p>
                        <p className="fg-6454f41814" data-node-id="884:1530">
                          ۱۴۰۲/۰۸/۱۰
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-de9376ae60" data-node-id="884:1531" data-name="Right Panel">
                  <div className="fg-93778178b8" data-node-id="884:1532" data-name="Frame">
                    <div className="fg-6f19774f23" data-node-id="884:1533" data-name="Frame">
                      <p className="fg-4504ee7a2f" dir="auto" data-node-id="884:1534">
                        هنرمند نمونه
                      </p>
                      <p className="fg-1e0701e555" data-node-id="884:1535">
                        ART-1092
                      </p>
                    </div>
                    <div className="fg-6b8676953c" data-node-id="884:1536" data-name="Rectangle">
                      <img alt="" className="fg-d63441eb10" src="/admin-assets/cc94e213.png" />
                    </div>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="884:1537" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                    </div>
                  </div>
                  <div className="fg-24081ceef5" data-node-id="884:1538" data-name="Frame">
                    <div className="fg-c96fe10678" data-node-id="884:1539" data-name="Frame">
                      <div className="fg-e6bf96a33c" data-node-id="884:1540" data-name="Frame">
                        <p className="fg-f412706158" dir="auto" data-node-id="884:1541">
                          فعال
                        </p>
                      </div>
                      <p className="fg-fa7abe4be3" dir="auto" data-node-id="884:1542">
                        وضعیت حساب
                      </p>
                    </div>
                    <div className="fg-6dd7f43e28" data-node-id="884:1543" data-name="Frame">
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="884:1544">
                        نگارستان زری
                      </p>
                      <p className="fg-1e0701e555" dir="auto" data-node-id="884:1545">
                        نام غرفه / برند
                      </p>
                    </div>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="884:1546" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                    </div>
                  </div>
                  <div className="fg-24081ceef5" data-node-id="884:1547" data-name="Frame">
                    <p className="fg-19fa1bb32b" dir="auto" data-node-id="884:1548">
                      اقدامات ارزیابی
                    </p>
                    <div className="fg-452d346712" data-node-id="884:1549" data-name="Frame">
                      <DesignAction className="fg-3651dc4f5f" data-node-id="884:1550" data-name="Negarin / Button" label="درخواست اصلاح">
                        <p className="fg-158fccfd2c" dir="auto" data-node-id="I884:1550;46:53">
                          درخواست اصلاح
                        </p>
                      </DesignAction>
                      <DesignAction className="fg-7902cb33b7" data-node-id="884:1553" data-name="Negarin / Button" label="تأیید مدرک" destination="professional-credentials">
                        <p className="fg-dfcb367ffa" dir="auto" data-node-id="I884:1553;45:11">
                          تأیید مدرک
                        </p>
                      </DesignAction>
                    </div>
                  </div>
                  <div className="fg-df0a3de519" data-node-id="884:1556" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                    </div>
                  </div>
                  <div className="fg-d6f889b3e9" data-node-id="884:1557" data-name="Frame">
                    <p className="fg-19fa1bb32b" dir="auto" data-node-id="884:1558">
                      تاریخچه مدرک
                    </p>
                    <div className="fg-24081ceef5" data-node-id="884:1559" data-name="Frame">
                      <div className="fg-47aacf6d1d" data-node-id="884:1560" data-name="Frame">
                        <p className="fg-5192a2fdb5" data-node-id="884:1561">
                          ۱۴۰۲/۰۸/۱۱
                        </p>
                        <p className="fg-50f4508c2f" dir="auto" data-node-id="884:1562">
                          شروع بررسی توسط کارشناس
                        </p>
                        <div className="fg-814236e220" data-node-id="884:1563" data-name="Ellipse">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/e42ace74.svg" />
                        </div>
                      </div>
                      <div className="fg-47aacf6d1d" data-node-id="884:1564" data-name="Frame">
                        <p className="fg-5192a2fdb5" data-node-id="884:1565">
                          ۱۴۰۲/۰۸/۱۰
                        </p>
                        <p className="fg-50f4508c2f" dir="auto" data-node-id="884:1566">
                          ارسال مدرک توسط هنرمند
                        </p>
                        <div className="fg-814236e220" data-node-id="884:1567" data-name="Ellipse">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/70d8473c.svg" />
                        </div>
                      </div>
                      <div className="fg-47aacf6d1d" data-node-id="884:1568" data-name="Frame">
                        <p className="fg-5192a2fdb5" data-node-id="884:1569">
                          ۱۴۰۲/۰۸/۰۸
                        </p>
                        <p className="fg-50f4508c2f" dir="auto" data-node-id="884:1570">
                          ایجاد درخواست ارسال مدرک
                        </p>
                        <div className="fg-814236e220" data-node-id="884:1571" data-name="Ellipse">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/70d8473c.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AdminSidebar className="fg-1ae6468b1f" data-node-id="884:1572" data-name="Sidebar" inert>
            <div className="fg-bfcc56511d" data-node-id="884:1573" data-name="Brand">
              <p className="fg-013587b973" dir="auto" data-node-id="884:1574">
                خانه نگارین
              </p>
              <div className="fg-bb3f247d9d" data-node-id="884:1575" data-name="Logo Container">
                <div className="fg-f84de76785" data-node-id="884:1576" data-name="Brand / Negarin Logo">
                  <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
                </div>
              </div>
            </div>
            <div className="fg-6803f66aba" data-node-id="884:1577" data-name="Navigation">
              <DesignAction className="fg-4a871e0b11" data-node-id="884:1578" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
                <div className="fg-c51752dc8c" data-node-id="884:1813" data-name="layout-dashboard">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
                </div>
                <p className="fg-6abfcd3772" dir="auto" data-node-id="884:1580">
                  داشبورد
                </p>
              </DesignAction>
              <div className="fg-c1bc7f9234" data-node-id="884:1581" data-name="Nav Groups">
                <div className="fg-3f106e1f96" data-node-id="884:1582" data-name="Group-0">
                  <DesignAction className="fg-fcc641ace6" data-node-id="884:1583" data-name="Group Header" label="هنرمندان" destination="artists">
                    <div className="fg-0a9542d889" data-node-id="884:1584" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1771" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/d84fcec8.svg" />
                      </div>
                    </div>
                    <p className="fg-81a7a808ad" dir="auto" data-node-id="884:1586">
                      هنرمندان
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-239f54e425" data-node-id="884:1587" data-name="Group-1">
                  <DesignAction className="fg-ca8b7daf93" data-node-id="884:1588" data-name="Group Header" label="بازار" destination="products">
                    <div className="fg-0a9542d889" data-node-id="884:1589" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1774" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/5ed50bb6.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1591">
                      بازار
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1592" data-name="Group-2">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1593" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                    <div className="fg-0a9542d889" data-node-id="884:1594" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1777" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/255c8a54.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1596">
                      سفارش و ارسال
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1597" data-name="Group-3">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1598" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                    <div className="fg-0a9542d889" data-node-id="884:1599" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1780" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/97e14c44.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1601">
                      رشد و خدمات
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1602" data-name="Group-4">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1603" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                    <div className="fg-0a9542d889" data-node-id="884:1604" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1783" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/68be558a.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1606">
                      فرصت‌ها
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1607" data-name="Group-5">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1608" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                    <div className="fg-0a9542d889" data-node-id="884:1609" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1786" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/c89251c8.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1611">
                      مالی و عضویت
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1612" data-name="Group-6">
                  <div className="fg-9e3538324e" data-node-id="884:1613" data-name="Group Header">
                    <div className="fg-0a9542d889" data-node-id="884:1614" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1789" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/5b258d3a.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1616">
                      بین‌الملل
                    </p>
                  </div>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1617" data-name="Group-7">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1618" data-name="Group Header" label="گزارش‌ها" destination="reports">
                    <div className="fg-0a9542d889" data-node-id="884:1619" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1792" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/55fcf262.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1621">
                      گزارش‌ها
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="884:1622" data-name="Group-8">
                  <DesignAction className="fg-9e3538324e" data-node-id="884:1623" data-name="Group Header" label="تنظیمات" destination="settings">
                    <div className="fg-0a9542d889" data-node-id="884:1624" data-name="chevron-down">
                      <div className="fg-f43d93deaa" data-node-id="884:1795" data-name="chevron-down">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/9ebac2e4.svg" />
                      </div>
                    </div>
                    <p className="fg-4bd985e862" dir="auto" data-node-id="884:1626">
                      تنظیمات
                    </p>
                  </DesignAction>
                </div>
              </div>
            </div>
            <div className="fg-20fc7845ff" data-node-id="884:1627" data-name="Staff Profile">
              <div className="fg-15b486e966" data-node-id="884:1628" data-name="Profile Details">
                <p className="fg-fe647e601f" dir="auto" data-node-id="884:1629">
                  کارشناس عملیات
                </p>
                <p className="fg-a9d1c863d0" dir="auto" data-node-id="884:1630">
                  مدیر عملیات سیستم
                </p>
              </div>
              <div className="fg-e409306ac6" data-node-id="884:1631" data-name="Staff Avatar">
                <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/32553ce8.png" />
              </div>
            </div>
          </AdminSidebar>
        </div>
      </div>
      <div className="fg-b64d55ba81" data-node-id="884:1632" data-name="Backdrop">
        <DesignDialog className="fg-2b3e1c8973" data-node-id="884:1633" data-name="Modal Box" label="Admin / Credential Approve — Confirmation" closeDestination="professional-credentials">
          <div className="fg-ee484e0c7e" data-node-id="884:1634" data-name="Frame">
            <div className="fg-2d3663d59a" data-node-id="884:1798" data-name="check">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/631b94f3.svg" />
            </div>
          </div>
          <p className="fg-c6f2a3c572" dir="auto" data-node-id="884:1636">
            تأیید مدرک حرفه‌ای
          </p>
          <div className="fg-df0a3de519" data-node-id="884:1637" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/admin-assets/160ca80d.svg" />
            </div>
          </div>
          <div className="fg-243899f592" data-node-id="884:1638" data-name="Frame">
            <p className="fg-d5aeae23f9" dir="auto" data-node-id="884:1639">
              آیا از تأیید نهایی این مدرک اطمینان دارید؟
            </p>
            <div className="fg-bc169e84ad" data-node-id="884:1640" data-name="Frame">
              <div className="fg-33a96cd610" data-node-id="884:1641" data-name="Frame">
                <p className="fg-c34c9a845e" dir="auto" data-node-id="884:1642">
                  هنرمند نمونه
                </p>
                <p className="fg-1e0701e555" dir="auto" data-node-id="884:1643">
                  هنرمند
                </p>
              </div>
              <div className="fg-c4e52c9812" data-node-id="884:1644" data-name="Frame">
                <p className="fg-b899329ac4" dir="auto" data-node-id="884:1645">
                  گواهی درجه ۲ صنایع دستی
                </p>
                <p className="fg-4104cd2227" dir="auto" data-node-id="884:1646">
                  مدرک ارسالی
                </p>
              </div>
            </div>
            <p className="fg-74a0120a75" dir="auto" data-node-id="884:1647">
              با تأیید این مدرک، وضعیت مدرک حرفه‌ای هنرمند به «تأیید شده» تغییر خواهد کرد و در بخش گواهینامه‌های عمومی غرفه نمایش داده می‌شود.
            </p>
          </div>
          <div className="fg-df0a3de519" data-node-id="884:1648" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/admin-assets/160ca80d.svg" />
            </div>
          </div>
          <div className="fg-b2d1dcb9c4" data-node-id="884:1649" data-name="Frame">
            <DesignAction className="fg-3651dc4f5f" data-node-id="884:1650" data-name="Negarin / Button" label="انصراف" destination="professional-credentials">
              <p className="fg-964f9fc750" dir="auto" data-node-id="I884:1650;46:53">
                انصراف
              </p>
            </DesignAction>
            <DesignAction className="fg-5f5f993372" data-node-id="884:1653" data-name="Negarin / Button" label="تأیید و ثبت" destination="professional-credentials">
              <p className="fg-e19b4eb252" dir="auto" data-node-id="I884:1653;46:29">
                تأیید و ثبت
              </p>
            </DesignAction>
          </div>
        </DesignDialog>
      </div>
    </div>
  );
}
