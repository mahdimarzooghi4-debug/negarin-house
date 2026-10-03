// Figma 903:1571 — Admin / Staff & Access — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStaffAccessDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="903:1571" data-name="Admin / Staff & Access — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:1572" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="903:1573" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:1574" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:1575" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/f439db53.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="903:1576" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-e36f3c3d24" data-node-id="903:1579" data-name="Right Header">
            <DesignField className="fg-26c42d8f06" data-node-id="903:1580" data-name="Search and Title" label="جستجو" placeholder="جستجو در نام، شناسه کاربری یا نقش... مدیریت دسترسی کارکنان">
              <DesignField className="fg-9ce4e1a1a3" data-node-id="903:1581" data-name="Global Search" label="جستجو" placeholder="جستجو در نام، شناسه کاربری یا نقش...">
                <p className="fg-7350bdf7b6" dir="auto" data-node-id="903:1582">
                  جستجو در نام، شناسه کاربری یا نقش...
                </p>
                <div className="fg-c51752dc8c" data-node-id="903:2432" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </DesignField>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="903:1584">
                مدیریت دسترسی کارکنان
              </p>
            </DesignField>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="903:1585" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="903:1586" data-name="Operational Summary">
            <DesignAction className="fg-bff106adf2" data-node-id="903:1587" data-name="Metric Shortcut" label="۱۲ کل کارکنان" >
              <p className="fg-cbf2c4bfe6" data-node-id="903:1588">
                ۱۲
              </p>
              <p className="fg-0929981b97" dir="auto" data-node-id="903:1589">
                کل کارکنان
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="903:1590" data-name="Metric Shortcut" label="۱۰ کاربران فعال" >
              <p className="fg-f81d05d172" data-node-id="903:1591">
                ۱۰
              </p>
              <p className="fg-0929981b97" dir="auto" data-node-id="903:1592">
                کاربران فعال
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="903:1593" data-name="Metric Shortcut" label="۲ کاربران غیرفعال" >
              <p className="fg-2181579efc" data-node-id="903:1594">
                ۲
              </p>
              <p className="fg-0929981b97" dir="auto" data-node-id="903:1595">
                کاربران غیرفعال
              </p>
            </DesignAction>
          </div>
          <div className="fg-c96fe10678" data-node-id="903:1596" data-name="Table Action Bar">
            <DesignAction className="fg-a47da601aa" data-node-id="903:1597" data-name="Add User Button" label="+ افزودن کاربر جدید">
              <p className="fg-8ffc872800" dir="auto" data-node-id="903:1598">
                + افزودن کاربر جدید
              </p>
            </DesignAction>
            <p className="fg-ebba4376f7" dir="auto" data-node-id="903:1599">
              لیست کاربران سیستم
            </p>
          </div>
          <div className="fg-347137de39" data-node-id="903:1600" data-name="Worklist Section">
            <div className="fg-cb667e7a05" data-node-id="903:1601" data-name="Table Wrapper">
              <div className="fg-5a60ba4653" data-node-id="903:1602" data-name="Table Header Row">
                <p className="fg-7e3af72b0e" dir="auto" data-node-id="903:1603">
                  اقدام
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="903:1604">
                  آخرین فعالیت
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="903:1605">
                  وضعیت دسترسی
                </p>
                <p className="fg-c7dd25f208" dir="auto" data-node-id="903:1606">
                  نقش
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:1607">
                  کاربر
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="903:1608" data-name="Table Body">
                <div className="fg-4f547a8b42" data-node-id="903:1609" data-name="Table Row">
                  <DesignAction className="fg-6dc9add6a9" data-node-id="903:1610" data-name="Col Action" label="مشاهده / ویرایش" destination="staff-access-detail">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1611">
                      مشاهده / ویرایش
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="903:1612">
                    ۱۰ دقیقه پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:1613" data-name="Col Status">
                    <div className="fg-e6bf96a33c" data-node-id="903:1614" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:1615">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-3e35081b09" dir="auto" data-node-id="903:1616">
                    مدیر سیستم
                  </p>
                  <div className="fg-aee6f31316" data-node-id="903:1617" data-name="Col User">
                    <p className="fg-7f846ac2e7" data-node-id="903:1618">
                      USR-1024
                    </p>
                    <p className="fg-4398fa8b14" dir="auto" data-node-id="903:1619">
                      علیرضا موسوی
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1620" data-name="Table Row">
                  <DesignAction className="fg-6dc9add6a9" data-node-id="903:1621" data-name="Col Action" label="مشاهده / ویرایش" destination="staff-access-detail">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1622">
                      مشاهده / ویرایش
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="903:1623">
                    ۲ ساعت پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:1624" data-name="Col Status">
                    <div className="fg-e6bf96a33c" data-node-id="903:1625" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:1626">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-3e35081b09" dir="auto" data-node-id="903:1627">
                    عملیات سفارشات
                  </p>
                  <div className="fg-aee6f31316" data-node-id="903:1628" data-name="Col User">
                    <p className="fg-7f846ac2e7" data-node-id="903:1629">
                      USR-1025
                    </p>
                    <p className="fg-4398fa8b14" dir="auto" data-node-id="903:1630">
                      سارا احمدی
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1631" data-name="Table Row">
                  <DesignAction className="fg-6dc9add6a9" data-node-id="903:1632" data-name="Col Action" label="مشاهده / ویرایش" destination="staff-access-detail">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1633">
                      مشاهده / ویرایش
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="903:1634">
                    ۱ روز پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:1635" data-name="Col Status">
                    <div className="fg-e6bf96a33c" data-node-id="903:1636" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:1637">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-3e35081b09" dir="auto" data-node-id="903:1638">
                    بررسی محصول
                  </p>
                  <div className="fg-aee6f31316" data-node-id="903:1639" data-name="Col User">
                    <p className="fg-7f846ac2e7" data-node-id="903:1640">
                      USR-1026
                    </p>
                    <p className="fg-4398fa8b14" dir="auto" data-node-id="903:1641">
                      حمید رضا بهرامی
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1642" data-name="Table Row">
                  <DesignAction className="fg-6dc9add6a9" data-node-id="903:1643" data-name="Col Action" label="مشاهده / ویرایش" destination="staff-access-detail">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1644">
                      مشاهده / ویرایش
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="903:1645">
                    ۳ روز پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:1646" data-name="Col Status">
                    <div className="fg-e6bf96a33c" data-node-id="903:1647" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:1648">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-3e35081b09" dir="auto" data-node-id="903:1649">
                    مالی
                  </p>
                  <div className="fg-aee6f31316" data-node-id="903:1650" data-name="Col User">
                    <p className="fg-7f846ac2e7" data-node-id="903:1651">
                      USR-1027
                    </p>
                    <p className="fg-4398fa8b14" dir="auto" data-node-id="903:1652">
                      مهسا کریمی
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1653" data-name="Table Row">
                  <DesignAction className="fg-6dc9add6a9" data-node-id="903:1654" data-name="Col Action" label="مشاهده / ویرایش" destination="staff-access-detail">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1655">
                      مشاهده / ویرایش
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="903:1656">
                    ۱ هفته پیش
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:1657" data-name="Col Status">
                    <div className="fg-bc154bd16e" data-node-id="903:1658" data-name="Badge">
                      <p className="fg-5c87ac42ec" dir="auto" data-node-id="903:1659">
                        غیرفعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-3e35081b09" dir="auto" data-node-id="903:1660">
                    بررسی محصول
                  </p>
                  <div className="fg-aee6f31316" data-node-id="903:1661" data-name="Col User">
                    <p className="fg-7f846ac2e7" data-node-id="903:1662">
                      USR-1028
                    </p>
                    <p className="fg-4398fa8b14" dir="auto" data-node-id="903:1663">
                      نیما راد
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1664" data-name="Table Row">
                  <DesignAction className="fg-6dc9add6a9" data-node-id="903:1665" data-name="Col Action" label="مشاهده / ویرایش" destination="staff-access-detail">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1666">
                      مشاهده / ویرایش
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="903:1667">
                    دیروز
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:1668" data-name="Col Status">
                    <div className="fg-e6bf96a33c" data-node-id="903:1669" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="903:1670">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-3e35081b09" dir="auto" data-node-id="903:1671">
                    عملیات هنرمندان
                  </p>
                  <div className="fg-aee6f31316" data-node-id="903:1672" data-name="Col User">
                    <p className="fg-7f846ac2e7" data-node-id="903:1673">
                      USR-1029
                    </p>
                    <p className="fg-4398fa8b14" dir="auto" data-node-id="903:1674">
                      امیرحسین رضایی
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:1675" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="903:1676" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="903:1677">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="903:1678" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:281" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="903:1680" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="903:1681" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="903:2594" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="903:1683">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-b9552021d1" data-node-id="903:1684" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="903:1685" data-name="Group-هنرمندان">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1686" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="903:2435" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1688">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="903:1689" data-name="Group-بازار">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="903:1690" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="903:2438" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1692">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1693" data-name="Group-سفارش و ارسال">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1694" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="903:2441" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1696">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1697" data-name="Group-رشد و خدمات">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1698" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="903:2444" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1700">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1701" data-name="Group-فرصت‌ها">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1702" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="903:2447" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1704">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1705" data-name="Group-مالی و عضویت">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1706" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="903:2450" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1708">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1709" data-name="Group-بین‌الملل">
              <div className="fg-c7482c92d9" data-node-id="903:1710" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="903:2453" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1712">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1713" data-name="Group-گزارش‌ها">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1714" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="903:2456" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1716">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1717" data-name="Group-تنظیمات">
              <DesignAction className="fg-9dda82322e" data-node-id="903:1718" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="903:2459" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-44cbb6f8f0" dir="auto" data-node-id="903:1720">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="903:1721" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="903:1722" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="903:1723">
              کارشناس ارشد سیستم
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="903:1724">
              مدیر کنترل دسترسی
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="903:1725" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/b51246d8.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
