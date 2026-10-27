// Figma 888:1490 — Admin / Shipping Operations — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminShippingOperationsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="888:1490" data-name="Admin / Shipping Operations — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="888:1491" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="888:1492" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="888:1493" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="888:1494" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="888:1495" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="888:1499" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="888:1500" data-name="Global Search" label="جستجو" placeholder="جستجو در مرسوله‌ها، کد رهگیری، خریداران...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="888:1501">
                جستجو در مرسوله‌ها، کد رهگیری، خریداران...
              </p>
              <div className="fg-c51752dc8c" data-node-id="888:1502" data-name="search-icon">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="888:1504">
              عملیات ارسال و لجستیک نگارین
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="888:1505" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="888:1506" data-name="Operational Summary">
            <DesignAction className="fg-74cf2420c1" data-node-id="888:1507" data-name="Metric Shortcut" label="۱۴۸ مرسوله کل مرسوله‌ها" destination="service-requests">
              <p className="fg-5061c0f8a0" dir="auto" data-node-id="888:1508">
                ۱۴۸ مرسوله
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="888:1509">
                کل مرسوله‌ها
              </p>
            </DesignAction>
            <DesignAction className="fg-74cf2420c1" data-node-id="888:1510" data-name="Metric Shortcut" label="۱۲ مرسوله در انتظار ارسال" destination="service-requests">
              <p className="fg-f4472f86ce" dir="auto" data-node-id="888:1511">
                ۱۲ مرسوله
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="888:1512">
                در انتظار ارسال
              </p>
            </DesignAction>
            <DesignAction className="fg-74cf2420c1" data-node-id="888:1513" data-name="Metric Shortcut" label="۲۴ مرسوله در حال ارسال" destination="service-requests">
              <p className="fg-c9547361f2" dir="auto" data-node-id="888:1514">
                ۲۴ مرسوله
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="888:1515">
                در حال ارسال
              </p>
            </DesignAction>
            <DesignAction className="fg-74cf2420c1" data-node-id="888:1516" data-name="Metric Shortcut" label="۱۰۶ مرسوله تحویل شده" destination="service-requests">
              <p className="fg-bdab2c756d" dir="auto" data-node-id="888:1517">
                ۱۰۶ مرسوله
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="888:1518">
                تحویل شده
              </p>
            </DesignAction>
            <DesignAction className="fg-74cf2420c1" data-node-id="888:1519" data-name="Metric Shortcut" label="۶ مورد مشکل‌دار" destination="service-requests">
              <p className="fg-73ab430732" dir="auto" data-node-id="888:1520">
                ۶ مورد
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="888:1521">
                مشکل‌دار
              </p>
            </DesignAction>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="888:1522" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="888:1523" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="888:1524" data-name="Frame">
                <div className="fg-a3b2a587b5" data-node-id="888:1525" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:1526">
                    بازه زمانی
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:1527" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:1528">
                    وضعیت مشکل
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:1529" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:1530">
                    روش ارسال
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:1531" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:1532">
                    وضعیت ارسال
                  </p>
                </div>
              </div>
              <div className="fg-e8210ba625" data-node-id="888:1533" data-name="Frame">
                <DesignField className="fg-8c27ae93a2" data-node-id="888:1534" data-name="Search Input" label="جستجو" placeholder="جستجوی سریع شناسه...">
                  <p className="fg-72b13cff4d" dir="auto" data-node-id="888:1535">
                    جستجوی سریع شناسه...
                  </p>
                </DesignField>
              </div>
            </div>
          </div>
          <div className="fg-c7a881f669" data-node-id="888:1536" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="888:1537">
              لیست لجستیک و ارسال مرسوله‌ها
            </p>
            <div className="fg-ceebe80a1f" data-node-id="888:1538" data-name="Table Wrapper">
              <div className="fg-0611869c9d" data-node-id="888:1539" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="888:1540">
                  اقدام
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:1541">
                  آخرین بروزرسانی
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="888:1542">
                  وضعیت مشکل
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:1543">
                  شناسه رهگیری
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:1544">
                  وضعیت ارسال
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:1545">
                  روش ارسال
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:1546">
                  هنرمند
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="888:1547">
                  مرسوله / سفارش
                </p>
              </div>
              <div className="fg-153c0a1809" data-node-id="888:1548" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="888:1549" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:1550" data-name="Col Action" label="پیگیری">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="888:1551">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:1552">
                    ۱۰ دقیقه پیش
                  </p>
                  <p className="fg-79fd9b2cb1" data-node-id="888:1553">
                    —
                  </p>
                  <p className="fg-9f62158923" data-node-id="888:1554">
                    TRK-4521
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1555" data-name="Col Status">
                    <div className="fg-486de22256" data-node-id="888:1556" data-name="Status Badge">
                      <p className="fg-5778f11f94" dir="auto" data-node-id="888:1557">
                        در حال ارسال
                      </p>
                    </div>
                  </div>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1558">
                    پست پیشتاز
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1559">
                    زهرا کریمی
                  </p>
                  <p className="fg-5333f623f5" data-node-id="888:1560">
                    ORD-1024
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1561" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:1562" data-name="Col Action" label="پیگیری">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="888:1563">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:1564">
                    ۱ ساعت پیش
                  </p>
                  <p className="fg-66c010659f" dir="auto" data-node-id="888:1565">
                    مشکل در آدرس
                  </p>
                  <p className="fg-9f62158923" data-node-id="888:1566">
                    TRK-9832
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1567" data-name="Col Status">
                    <div className="fg-65462f2b39" data-node-id="888:1568" data-name="Status Badge">
                      <p className="fg-79f0034e69" dir="auto" data-node-id="888:1569">
                        آماده ارسال
                      </p>
                    </div>
                  </div>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1570">
                    تیپاکس
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1571">
                    علی علوی
                  </p>
                  <p className="fg-5333f623f5" data-node-id="888:1572">
                    ORD-1025
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1573" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:1574" data-name="Col Action" label="پیگیری">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="888:1575">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:1576">
                    ۳ ساعت پیش
                  </p>
                  <p className="fg-79fd9b2cb1" data-node-id="888:1577">
                    —
                  </p>
                  <p className="fg-9f62158923" data-node-id="888:1578">
                    TRK-1102
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1579" data-name="Col Status">
                    <div className="fg-19ac934aa6" data-node-id="888:1580" data-name="Status Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="888:1581">
                        ارسال شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1582">
                    پیک اختصاصی
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1583">
                    مریم حسینی
                  </p>
                  <p className="fg-5333f623f5" data-node-id="888:1584">
                    ORD-1026
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1585" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:1586" data-name="Col Action" label="پیگیری">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="888:1587">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:1588">
                    ۵ ساعت پیش
                  </p>
                  <p className="fg-79fd9b2cb1" data-node-id="888:1589">
                    —
                  </p>
                  <p className="fg-9f62158923" data-node-id="888:1590">
                    —
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1591" data-name="Col Status">
                    <div className="fg-247bdd342d" data-node-id="888:1592" data-name="Status Badge">
                      <p className="fg-2ae4ebf3de" dir="auto" data-node-id="888:1593">
                        در انتظار تأیید
                      </p>
                    </div>
                  </div>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1594">
                    پست پیشتاز
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1595">
                    رضا رضایی
                  </p>
                  <p className="fg-5333f623f5" data-node-id="888:1596">
                    ORD-1027
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1597" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:1598" data-name="Col Action" label="پیگیری">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="888:1599">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:1600">
                    ۱ روز پیش
                  </p>
                  <p className="fg-79fd9b2cb1" data-node-id="888:1601">
                    —
                  </p>
                  <p className="fg-9f62158923" data-node-id="888:1602">
                    TRK-8841
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1603" data-name="Col Status">
                    <div className="fg-19ac934aa6" data-node-id="888:1604" data-name="Status Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="888:1605">
                        تحویل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1606">
                    تیپاکس
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1607">
                    فاطمه معتمد
                  </p>
                  <p className="fg-5333f623f5" data-node-id="888:1608">
                    ORD-1028
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1609" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:1610" data-name="Col Action" label="پیگیری">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="888:1611">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:1612">
                    ۲ روز پیش
                  </p>
                  <p className="fg-79fd9b2cb1" data-node-id="888:1613">
                    —
                  </p>
                  <p className="fg-9f62158923" data-node-id="888:1614">
                    TRK-7712
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1615" data-name="Col Status">
                    <div className="fg-19ac934aa6" data-node-id="888:1616" data-name="Status Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="888:1617">
                        تحویل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1618">
                    پست پیشتاز
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1619">
                    حسین موسوی
                  </p>
                  <p className="fg-5333f623f5" data-node-id="888:1620">
                    ORD-1029
                  </p>
                </div>
                <div className="fg-1c3fd25193" data-node-id="888:1621" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:1622" data-name="Col Action" label="پیگیری">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="888:1623">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:1624">
                    ۲ روز پیش
                  </p>
                  <p className="fg-66c010659f" dir="auto" data-node-id="888:1625">
                    تأخیر در پیک
                  </p>
                  <p className="fg-9f62158923" data-node-id="888:1626">
                    TRK-5520
                  </p>
                  <div className="fg-82303a202c" data-node-id="888:1627" data-name="Col Status">
                    <div className="fg-486de22256" data-node-id="888:1628" data-name="Status Badge">
                      <p className="fg-5778f11f94" dir="auto" data-node-id="888:1629">
                        در حال ارسال
                      </p>
                    </div>
                  </div>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1630">
                    پیک اختصاصی
                  </p>
                  <p className="fg-a641f5bf4c" dir="auto" data-node-id="888:1631">
                    سارا محمدی
                  </p>
                  <p className="fg-5333f623f5" data-node-id="888:1632">
                    ORD-1030
                  </p>
                </div>
              </div>
              <div className="fg-0e1225defb" data-node-id="888:1633" data-name="Pagination">
                <div className="fg-92b7da7864" data-node-id="888:1634" data-name="Frame">
                  <div className="fg-ea51d20d85" data-node-id="888:1635" data-name="Frame">
                    <p className="fg-934ca87244" dir="auto" data-node-id="888:1636">
                      قبلی
                    </p>
                  </div>
                  <div className="fg-9951e6e211" data-node-id="888:1637" data-name="Frame">
                    <p className="fg-7c79984bbb" data-node-id="888:1638">
                      ۱
                    </p>
                  </div>
                  <div className="fg-fef640a389" data-node-id="888:1639" data-name="Frame">
                    <p className="fg-899c8bd72f" data-node-id="888:1640">
                      ۲
                    </p>
                  </div>
                  <div className="fg-fef640a389" data-node-id="888:1641" data-name="Frame">
                    <p className="fg-899c8bd72f" data-node-id="888:1642">
                      ۳
                    </p>
                  </div>
                  <div className="fg-ea51d20d85" data-node-id="888:1643" data-name="Frame">
                    <p className="fg-934ca87244" dir="auto" data-node-id="888:1644">
                      بعدی
                    </p>
                  </div>
                </div>
                <p className="fg-899c8bd72f" dir="auto" data-node-id="888:1645">
                  نمایش ۱ تا ۷ از ۱۴۸ مرسوله فعال
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="888:1646" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="888:1647" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="888:1648">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="888:1649" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="888:1650" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="888:1651" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="888:1652" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="888:1653" data-name="dashboard-icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="888:1655">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="888:1656" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="888:1657" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1658" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="888:1659" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1661">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="888:1662" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="888:1663" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="888:1664" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1666">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1667" data-name="Group-2">
              <DesignAction className="fg-fcc641ace6" data-node-id="888:1668" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="888:1669" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="888:1671">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1672" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1673" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="888:1674" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1676">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1677" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1678" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="888:1679" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1681">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1682" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1683" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="888:1684" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1686">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1687" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="888:1688" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="888:1689" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1691">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1692" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1693" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="888:1694" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1696">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:1697" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="888:1698" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="888:1699" data-name="chevron">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:1701">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="888:1702" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="888:1703" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="888:1704">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="888:1705">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="888:1706" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
