// Figma 892:1497 — Admin / Service Request Detail — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminServiceRequestDetailDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="892:1497" data-name="Admin / Service Request Detail — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="892:1498" data-name="Main Workspace">
        <div className="fg-982b1ce7e4" data-node-id="892:1499" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="892:1500" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="892:1501" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/07afde8b.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="892:1502" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="892:1506" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="892:1507" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، برنامه‌های رشد، خدمات و ...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="892:1508">
                جستجو در هنرمندان، برنامه‌های رشد، خدمات و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="892:1509" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="892:1511">
              جزئیات درخواست خدمات سیستم
            </p>
          </div>
        </div>
        <div className="fg-2a49f2c04d" data-node-id="892:1512" data-name="Scrollable Content Area 3">
          <div className="fg-c96fe10678" data-node-id="892:1513" data-name="Breadcrumbs Row">
            <div className="fg-e8210ba625" data-node-id="892:1514" data-name="Back CTA">
              <DesignAction className="fg-19ad7f67c4" dir="auto" data-node-id="892:1515" label="بازگشت" destination="service-requests">
                بازگشت
              </DesignAction>
            </div>
            <div className="fg-811d881bcb" data-node-id="892:1516" data-name="Breadcrumbs">
              <p className="fg-31a2b6f0b0" dir="auto" data-node-id="892:1517">
                درخواست‌های خدمات
              </p>
              <p className="fg-b80efb661d" data-node-id="892:1518">{`>`}</p>
              <p className="fg-9eb0d25c1f" data-node-id="892:1519">
                SRV-1024
              </p>
            </div>
          </div>
          <div className="fg-4af8193516" data-node-id="892:1520" data-name="Detail Header Panel">
            <div className="fg-9708e8d183" data-node-id="892:1521" data-name="Left Panel Actions">
              <DesignAction className="fg-3d41fc4c78" data-node-id="892:1522" data-name="Button Secondary" label="پیگیری وضعیت">
                <p className="fg-0edaeac592" dir="auto" data-node-id="892:1523">
                  پیگیری وضعیت
                </p>
              </DesignAction>
              <DesignAction className="fg-e54722c263" data-node-id="892:1524" data-name="Button Primary" label="تغییر تخصیص شریک" destination="service-assignment">
                <p className="fg-8ffc872800" dir="auto" data-node-id="892:1525">
                  تغییر تخصیص شریک
                </p>
              </DesignAction>
            </div>
            <div className="fg-ad50363799" data-node-id="892:1526" data-name="Right Identity">
              <div className="fg-de4de0d814" data-node-id="892:1527" data-name="Status Badge">
                <p className="fg-5778f11f94" dir="auto" data-node-id="892:1528">
                  در حال انجام
                </p>
              </div>
              <p className="fg-d96aa1abe1" dir="auto" data-node-id="892:1529">
                درخواست خدمت SRV-1024
              </p>
            </div>
          </div>
          <div className="fg-03bb2e10b3" data-node-id="892:1530" data-name="Split Panel">
            <div className="fg-d4e119791e" data-node-id="892:1531" data-name="Left Timeline Panel">
              <p className="fg-4f3073a855" dir="auto" data-node-id="892:1532">
                تایم‌لاین درخواست
              </p>
              <div className="fg-df0a3de519" data-node-id="892:1533" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/3d93e1dc.svg" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="892:1534" data-name="Timeline Steps">
                <div className="fg-47aacf6d1d" data-node-id="892:1535" data-name="Step">
                  <p className="fg-b2e13de1fc" data-node-id="892:1536">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <div className="fg-8d22ca4f90" data-node-id="892:1537" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1538">
                      ثبت درخواست
                    </p>
                    <p className="fg-812fcd728b" dir="auto" data-node-id="892:1539">
                      ثبت توسط زهرا کریمی
                    </p>
                  </div>
                  <div className="fg-ed684af670" data-node-id="892:1540" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                </div>
                <div className="fg-47aacf6d1d" data-node-id="892:1541" data-name="Step">
                  <p className="fg-b2e13de1fc" data-node-id="892:1542">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <div className="fg-8d22ca4f90" data-node-id="892:1543" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1544">
                      بررسی سهمیه
                    </p>
                    <p className="fg-812fcd728b" dir="auto" data-node-id="892:1545">
                      تایید سهمیه حرفه‌ای فعال
                    </p>
                  </div>
                  <div className="fg-ed684af670" data-node-id="892:1546" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                </div>
                <div className="fg-47aacf6d1d" data-node-id="892:1547" data-name="Step">
                  <p className="fg-b2e13de1fc" data-node-id="892:1548">
                    ۱۴۰۲/۱۰/۱۳
                  </p>
                  <div className="fg-8d22ca4f90" data-node-id="892:1549" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1550">
                      تخصیص شریک
                    </p>
                    <p className="fg-812fcd728b" dir="auto" data-node-id="892:1551">
                      تخصیص به استودیو تصویر نوین
                    </p>
                  </div>
                  <div className="fg-ed684af670" data-node-id="892:1552" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                </div>
                <div className="fg-47aacf6d1d" data-node-id="892:1553" data-name="Step">
                  <p className="fg-b2e13de1fc" data-node-id="892:1554">
                    ۱۴۰۲/۱۰/۱۴
                  </p>
                  <div className="fg-8d22ca4f90" data-node-id="892:1555" data-name="Frame">
                    <p className="fg-379a645d7e" dir="auto" data-node-id="892:1556">
                      هماهنگی و زمان‌بندی
                    </p>
                    <p className="fg-812fcd728b" dir="auto" data-node-id="892:1557">
                      تعیین زمان اجرا برای ۱۸ دی
                    </p>
                  </div>
                  <div className="fg-ed684af670" data-node-id="892:1558" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
                  </div>
                </div>
                <div className="fg-47aacf6d1d" data-node-id="892:1559" data-name="StepCurrent">
                  <p className="fg-b2e13de1fc" dir="auto" data-node-id="892:1560">
                    جاری
                  </p>
                  <div className="fg-8d22ca4f90" data-node-id="892:1561" data-name="Frame">
                    <p className="fg-4318939073" dir="auto" data-node-id="892:1562">
                      در حال انجام
                    </p>
                    <p className="fg-812fcd728b" dir="auto" data-node-id="892:1563">
                      انجام عکاسی و پردازش تصاویر
                    </p>
                  </div>
                  <div className="fg-8a0ff48924" data-node-id="892:1564" data-name="Ellipse">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/232beb99.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-ee0ddf2a8d" data-node-id="892:1565" data-name="Right Panel Content">
              <div className="fg-0bab63b93d" data-node-id="892:1566" data-name="Combined Info Card">
                <div className="fg-80fbbb05d1" data-node-id="892:1567" data-name="Card">
                  <p className="fg-3c3426ebaa" dir="auto" data-node-id="892:1568">
                    اطلاعات هنرمند
                  </p>
                  <div className="fg-df0a3de519" data-node-id="892:1569" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/7423fd18.svg" />
                    </div>
                  </div>
                  <div className="fg-fd5e65c324" data-node-id="892:1570" data-name="Frame">
                    <div className="fg-33a96cd610" data-node-id="892:1571" data-name="Frame">
                      <p className="fg-80d4c3a7e2" data-node-id="892:1572">
                        ART-1092
                      </p>
                      <p className="fg-bf7028acf4" dir="auto" data-node-id="892:1573">
                        نام هنرمند: زهرا کریمی
                      </p>
                    </div>
                    <div className="fg-805279ee72" data-node-id="892:1574" data-name="Frame">
                      <p className="fg-47adb5c92a" dir="auto" data-node-id="892:1575">
                        جوانه
                      </p>
                      <p className="fg-0580cfa320" dir="auto" data-node-id="892:1576">
                        سطح رشد هنری:
                      </p>
                    </div>
                    <div className="fg-805279ee72" data-node-id="892:1577" data-name="Frame">
                      <p className="fg-47adb5c92a" dir="auto" data-node-id="892:1578">
                        صنایع دستی و سفال
                      </p>
                      <p className="fg-0580cfa320" dir="auto" data-node-id="892:1579">
                        رشته تخصصی:
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fg-80fbbb05d1" data-node-id="892:1580" data-name="Card">
                  <p className="fg-3c3426ebaa" dir="auto" data-node-id="892:1581">
                    اطلاعات درخواست
                  </p>
                  <div className="fg-df0a3de519" data-node-id="892:1582" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/7423fd18.svg" />
                    </div>
                  </div>
                  <div className="fg-115cd427fd" data-node-id="892:1583" data-name="Frame">
                    <div className="fg-c4e52c9812" data-node-id="892:1584" data-name="Frame">
                      <p className="fg-47adb5c92a" dir="auto" data-node-id="892:1585">
                        عکاسی صنعتی و تبلیغاتی
                      </p>
                      <p className="fg-0580cfa320" dir="auto" data-node-id="892:1586">
                        نوع خدمت:
                      </p>
                    </div>
                    <div className="fg-c4e52c9812" data-node-id="892:1587" data-name="Frame">
                      <p className="fg-47adb5c92a" data-node-id="892:1588">
                        ۱۴۰۲/۱۰/۱۲
                      </p>
                      <p className="fg-0580cfa320" dir="auto" data-node-id="892:1589">
                        تاریخ ثبت:
                      </p>
                    </div>
                    <div className="fg-33a96cd610" data-node-id="892:1590" data-name="Frame">
                      <p className="fg-b403838cf9" dir="auto" data-node-id="892:1591">
                        دارای سهمیه فعال (حرفه‌ای)
                      </p>
                      <p className="fg-b80efb661d" dir="auto" data-node-id="892:1592">
                        وضعیت سهمیه:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-0bab63b93d" data-node-id="892:1593" data-name="Partner & Exec Info">
                <div className="fg-80fbbb05d1" data-node-id="892:1594" data-name="Card">
                  <p className="fg-3c3426ebaa" dir="auto" data-node-id="892:1595">
                    زمان‌بندی و اجرا
                  </p>
                  <div className="fg-df0a3de519" data-node-id="892:1596" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/7423fd18.svg" />
                    </div>
                  </div>
                  <div className="fg-60df224e02" data-node-id="892:1597" data-name="Frame">
                    <div className="fg-33a96cd610" data-node-id="892:1598" data-name="Frame">
                      <p className="fg-47adb5c92a" dir="auto" data-node-id="892:1599">
                        ۱۴۰۲/۱۰/۱۸ (ساعت ۱۰:۰۰)
                      </p>
                      <p className="fg-0580cfa320" dir="auto" data-node-id="892:1600">
                        تاریخ عکاسی:
                      </p>
                    </div>
                    <div className="fg-33a96cd610" data-node-id="892:1601" data-name="Frame">
                      <p className="fg-47adb5c92a" dir="auto" data-node-id="892:1602">
                        در حال هماهنگی فایل‌ها
                      </p>
                      <p className="fg-0580cfa320" dir="auto" data-node-id="892:1603">
                        وضعیت خروجی:
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fg-80fbbb05d1" data-node-id="892:1604" data-name="Card">
                  <p className="fg-3c3426ebaa" dir="auto" data-node-id="892:1605">
                    شریک خدمات تخصیص‌یافته
                  </p>
                  <div className="fg-df0a3de519" data-node-id="892:1606" data-name="Line">
                    <div className="fg-cf771a9448">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/7423fd18.svg" />
                    </div>
                  </div>
                  <div className="fg-115cd427fd" data-node-id="892:1607" data-name="Frame">
                    <div className="fg-33a96cd610" data-node-id="892:1608" data-name="Frame">
                      <p className="fg-303633f353" dir="auto" data-node-id="892:1609">
                        استودیو تصویر نوین (PTR-8802)
                      </p>
                      <p className="fg-b80efb661d" dir="auto" data-node-id="892:1610">
                        نام شریک:
                      </p>
                    </div>
                    <div className="fg-c4e52c9812" data-node-id="892:1611" data-name="Frame">
                      <p className="fg-47adb5c92a" dir="auto" data-node-id="892:1612">
                        خدمات چندرسانه‌ای و عکاسی
                      </p>
                      <p className="fg-0580cfa320" dir="auto" data-node-id="892:1613">
                        دسته‌بندی:
                      </p>
                    </div>
                    <div className="fg-33a96cd610" data-node-id="892:1614" data-name="Frame">
                      <p className="fg-b403838cf9" dir="auto" data-node-id="892:1615">
                        فعال
                      </p>
                      <p className="fg-b80efb661d" dir="auto" data-node-id="892:1616">
                        وضعیت فعالیت:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-34c5cca676" data-node-id="892:1617" data-name="Completion Status Card">
                <p className="fg-3c3426ebaa" dir="auto" data-node-id="892:1618">
                  وضعیت تکمیل و بازخورد
                </p>
                <div className="fg-df0a3de519" data-node-id="892:1619" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/admin-assets/ece95345.svg" />
                  </div>
                </div>
                <div className="fg-2f9efff8a2" data-node-id="892:1620" data-name="Feedback Area">
                  <p className="fg-6db69fe38c" dir="auto" data-node-id="892:1621">
                    هنوز بازخورد یا ارزیابی کیفی برای این خدمت ثبت نشده است. پس از بارگذاری نهایی فایل‌های عکاسی، نظرسنجی از هنرمند فعال خواهد شد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="892:1622" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="892:1623" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="892:1624">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="892:1625" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="892:1626" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="892:1627" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="892:1628" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="892:1629" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/a4cc0b99.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="892:1630">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="892:1631" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="892:1632" data-name="Group-artists">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1633" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="892:1634" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1636">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="892:1637" data-name="Group-market">
              <DesignAction className="fg-ca8b7daf93" data-node-id="892:1638" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="892:1639" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1641">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1642" data-name="Group-order">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1643" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="892:1644" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1646">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1647" data-name="Group-growth">
              <DesignAction className="fg-fcc641ace6" data-node-id="892:1648" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="892:1649" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="892:1651">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1652" data-name="Group-opportunities">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1653" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="892:1654" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1656">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1657" data-name="Group-finance">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1658" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="892:1659" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1661">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1662" data-name="Group-intl">
              <div className="fg-9e3538324e" data-node-id="892:1663" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="892:1664" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1666">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1667" data-name="Group-reports">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1668" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="892:1669" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1671">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1672" data-name="Group-settings">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1673" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="892:1674" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1676">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="892:1677" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="892:1678" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="892:1679">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="892:1680">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="892:1681" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
