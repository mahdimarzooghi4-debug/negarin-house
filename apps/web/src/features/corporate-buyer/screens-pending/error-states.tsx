// Figma 962:1472 — Corporate Buyer / Error States — Desktop
import { CorporateAction, CorporateSidebar } from "../corporate-controls";

export default function CorporateBuyerErrorStatesDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="962:1472" data-name="Corporate Buyer / Error States — Desktop">
      <div className="fg-c92c0aceed" data-node-id="962:1473" data-name="main-container">
        <div className="fg-15f4aa1b2d" data-node-id="962:1474" data-name="topbar">
          <div className="fg-a34c8fe932" data-node-id="962:1475" data-name="topbar-left">
            <CorporateAction className="fg-efb4742ac1" data-node-id="962:1476" data-name="bell-container" label="اعلان‌ها" destination="notifications">
              <div className="fg-b2a182ecf4" data-node-id="962:1651" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/a6f8c5b4.svg" />
              </div>
            </CorporateAction>
            <div className="fg-ad50363799" data-node-id="962:1478" data-name="user-profile">
              <div className="fg-a214e008aa" data-node-id="962:1479" data-name="profile-text">
                <p className="fg-75512d01b6" dir="auto" data-node-id="962:1480">
                  امیرحسین کریمی
                </p>
                <p className="fg-8c28c3d92c" dir="auto" data-node-id="962:1481">
                  مسئول خرید
                </p>
              </div>
              <div className="fg-88436b85ac" data-node-id="962:1482" data-name="user-avatar">
                <img alt="" className="fg-b440a5c4af" src="/corporate-buyer-assets/303771b9.png" />
              </div>
            </div>
          </div>
          <p className="fg-35e98a7c03" dir="auto" data-node-id="962:1483">
            وضعیت خطا — QA
          </p>
        </div>
        <div className="fg-1353533246" data-node-id="962:1484" data-name="content">
          <div className="fg-3ed396a233" data-node-id="962:1485" data-name="section-header">
            <p className="fg-3595d64c2c" dir="auto" data-node-id="962:1486">
              لیست خطاهای سیستمی و دسترسی
            </p>
            <p className="fg-f67fe8535c" dir="auto" data-node-id="962:1487">
              کارت‌های استاندارد مدیریت استثناها، عدم دسترسی و مشکلات اتصال در بستر پرتال
            </p>
          </div>
          <div className="fg-a7f8a02685" data-node-id="962:1488" data-name="errors-grid">
            <div className="fg-a9e747032a" data-node-id="962:1489" data-name="error-card">
              <div className="fg-7b3d5b8b17" data-node-id="962:1490" data-name="icon-wrapper">
                <div className="fg-2d3663d59a" data-node-id="962:1654" data-name="wifi-off">
                  <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/ffb7e2d9.svg" />
                </div>
              </div>
              <div className="fg-f6f63d2473" data-node-id="962:1492" data-name="text-group">
                <div className="fg-e8210ba625" data-node-id="962:1493" data-name="title-row">
                  <p className="fg-bc89376834" dir="auto" data-node-id="962:1494">
                    اتصال به سرور برقرار نشد
                  </p>
                </div>
                <p className="fg-5195ad2178" dir="auto" data-node-id="962:1495">
                  برقراری ارتباط با پایگاه داده یا سرورهای مرکزی نگارین ناموفق بود. لطفاً اتصال اینترنت خود را بررسی کرده و مجدداً تلاش نمایید.
                </p>
              </div>
              <CorporateAction className="fg-5a473e117c" data-node-id="962:1496" data-name="action-button" label="تلاش مجدد" destination="dashboard">
                <p className="fg-8ffc872800" dir="auto" data-node-id="962:1497">
                  تلاش مجدد
                </p>
              </CorporateAction>
            </div>
            <div className="fg-1d7b177b61" data-node-id="962:1498" data-name="error-card">
              <div className="fg-7b3d5b8b17" data-node-id="962:1499" data-name="icon-wrapper">
                <div className="fg-2d3663d59a" data-node-id="962:1657" data-name="server">
                  <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/2d90554a.svg" />
                </div>
              </div>
              <div className="fg-f6f63d2473" data-node-id="962:1501" data-name="text-group">
                <div className="fg-9eae8902b4" data-node-id="962:1502" data-name="title-row">
                  <div className="fg-ac7b9959ab" data-node-id="962:1503" data-name="code-badge">
                    <p className="fg-6c645bbbb4" data-node-id="962:1504">
                      ۵۰۰
                    </p>
                  </div>
                  <p className="fg-bc89376834" dir="auto" data-node-id="962:1505">
                    خطای داخلی سرور
                  </p>
                </div>
                <p className="fg-5195ad2178" dir="auto" data-node-id="962:1506">
                  خطای نامشخصی در پردازش اطلاعات رخ داده است. همکاران فنی ما در جریان خطا قرار گرفته‌اند و در حال رفع آن هستند.
                </p>
              </div>
              <CorporateAction className="fg-5a473e117c" data-node-id="962:1507" data-name="action-button" label="تلاش مجدد" destination="dashboard">
                <p className="fg-8ffc872800" dir="auto" data-node-id="962:1508">
                  تلاش مجدد
                </p>
              </CorporateAction>
            </div>
            <div className="fg-fe1a529ee9" data-node-id="962:1509" data-name="error-card">
              <div className="fg-117b2a938a" data-node-id="962:1510" data-name="icon-wrapper">
                <div className="fg-2d3663d59a" data-node-id="962:1660" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/df10a644.svg" />
                </div>
              </div>
              <div className="fg-f6f63d2473" data-node-id="962:1512" data-name="text-group">
                <div className="fg-9eae8902b4" data-node-id="962:1513" data-name="title-row">
                  <div className="fg-1edcf79373" data-node-id="962:1514" data-name="code-badge">
                    <p className="fg-f4574f5648" data-node-id="962:1515">
                      ۴۰۴
                    </p>
                  </div>
                  <p className="fg-bc89376834" dir="auto" data-node-id="962:1516">
                    صفحه مورد نظر یافت نشد
                  </p>
                </div>
                <p className="fg-5195ad2178" dir="auto" data-node-id="962:1517">
                  آدرس وارد شده نامعتبر است یا این بخش از پرتال تغییر کرده است. می‌توانید به بخش اصلی بازگردید.
                </p>
              </div>
              <CorporateAction className="fg-5a473e117c" data-node-id="962:1518" data-name="action-button" label="بازگشت به پیشخوان" destination="dashboard">
                <p className="fg-8ffc872800" dir="auto" data-node-id="962:1519">
                  بازگشت به پیشخوان
                </p>
              </CorporateAction>
            </div>
            <div className="fg-a038347fd3" data-node-id="962:1520" data-name="error-card">
              <div className="fg-117b2a938a" data-node-id="962:1521" data-name="icon-wrapper">
                <div className="fg-2d3663d59a" data-node-id="962:1663" data-name="lock">
                  <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/639832f4.svg" />
                </div>
              </div>
              <div className="fg-f6f63d2473" data-node-id="962:1523" data-name="text-group">
                <div className="fg-9eae8902b4" data-node-id="962:1524" data-name="title-row">
                  <div className="fg-1edcf79373" data-node-id="962:1525" data-name="code-badge">
                    <p className="fg-f4574f5648" data-node-id="962:1526">
                      ۴۰۳
                    </p>
                  </div>
                  <p className="fg-bc89376834" dir="auto" data-node-id="962:1527">
                    عدم دسترسی لازم
                  </p>
                </div>
                <p className="fg-5195ad2178" dir="auto" data-node-id="962:1528">
                  حساب کاربری شما سطح دسترسی مورد نیاز جهت مشاهده این گزارش یا ثبت خرید را ندارد. لطفاً با مدیر سازمان هماهنگ کنید.
                </p>
              </div>
              <CorporateAction className="fg-5a473e117c" data-node-id="962:1529" data-name="action-button" label="بازگشت">
                <p className="fg-8ffc872800" dir="auto" data-node-id="962:1530">
                  بازگشت
                </p>
              </CorporateAction>
            </div>
            <div className="fg-91d7bdfdc1" data-node-id="962:1531" data-name="error-card">
              <div className="fg-117b2a938a" data-node-id="962:1532" data-name="icon-wrapper">
                <div className="fg-2d3663d59a" data-node-id="962:1666" data-name="clock">
                  <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/63337532.svg" />
                </div>
              </div>
              <div className="fg-f6f63d2473" data-node-id="962:1534" data-name="text-group">
                <div className="fg-e8210ba625" data-node-id="962:1535" data-name="title-row">
                  <p className="fg-bc89376834" dir="auto" data-node-id="962:1536">
                    نشست کاربری منقضی‌شده
                  </p>
                </div>
                <p className="fg-5195ad2178" dir="auto" data-node-id="962:1537">
                  به دلیل عدم فعالیت در چند ساعت گذشته، نشست امنیتی شما پایان یافته است. جهت ادامه فعالیت، مجدداً وارد حساب خود شوید.
                </p>
              </div>
              <CorporateAction className="fg-5a473e117c" data-node-id="962:1538" data-name="action-button" label="ورود مجدد">
                <p className="fg-8ffc872800" dir="auto" data-node-id="962:1539">
                  ورود مجدد
                </p>
              </CorporateAction>
            </div>
          </div>
        </div>
      </div>
      <CorporateSidebar className="fg-7826810f37" data-node-id="962:1540" data-name="sidebar">
        <div className="fg-58d2e6303a" data-node-id="962:1694" data-name="Negarin Logo">
          <img alt="" className="fg-71eecc63f8" src="/corporate-buyer-assets/742e6917.png" />
        </div>
        <div className="fg-f380acb1b8" data-node-id="962:1541" data-name="logo-section">
          <div className="fg-6a0a0c42d7" data-node-id="962:1542" data-name="logo-title">
            <div className="fg-914cbaa88f" data-node-id="962:1543" data-name="brand-row">
              <p className="fg-b3ed119fef" dir="auto" data-node-id="962:1544">
                نگارین
              </p>
              <div className="fg-6d8bff7f85" data-node-id="962:1545" data-name="brand-indicator" />
            </div>
            <p className="fg-9f013eccd1" dir="auto" data-node-id="962:1546">
              پرتال خریدار سازمانی
            </p>
          </div>
          <div className="fg-df0a3de519" data-node-id="962:1547" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/bd008523.svg" />
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="962:1548" data-name="nav-list">
            <CorporateAction className="fg-d373383830" data-node-id="962:1549" data-name="nav-item-dashboard" label="پیشخوان" destination="dashboard">
              <p className="fg-356a992da1" dir="auto" data-node-id="962:1550">
                پیشخوان
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:1669" data-name="circle-x">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/0e9e34cf.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:1552" data-name="nav-item-requests" label="درخواست‌های خرید" destination="purchase-requests">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:1553">
                درخواست‌های خرید
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:1672" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/820b37ed.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:1555" data-name="nav-item-products" label="محصولات سازمانی" destination="corporate-products">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:1556">
                محصولات سازمانی
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:1675" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/89f05f1f.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:1558" data-name="nav-item-offers" label="پیشنهادها" destination="proposals">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:1559">
                پیشنهادها
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:1678" data-name="tag">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/25492c57.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:1561" data-name="nav-item-orders" label="سفارش‌ها" destination="orders">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:1562">
                سفارش‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:1681" data-name="shopping-cart">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/c24e6919.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:1564" data-name="nav-item-deliveries" label="تحویل‌ها" destination="deliveries">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:1565">
                تحویل‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:1684" data-name="truck">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/8bdfe2a1.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:1567" data-name="nav-item-reports" label="گزارش‌ها" destination="reports">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:1568">
                گزارش‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:1687" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/1ab461fd.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:1570" data-name="nav-item-account" label="حساب سازمان" destination="account">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:1571">
                حساب سازمان
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:1690" data-name="users">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/a21d0153.svg" />
              </div>
            </CorporateAction>
          </div>
        </div>
        <div className="fg-24081ceef5" data-node-id="962:1573" data-name="sidebar-footer">
          <div className="fg-df0a3de519" data-node-id="962:1574" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/bd008523.svg" />
            </div>
          </div>
          <div className="fg-6079b9fd3c" data-node-id="962:1575" data-name="user-details">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="962:1576">
              شرکت آریان صنعت پارس
            </p>
            <p className="fg-d4235d1d7b" dir="auto" data-node-id="962:1577">
              مدیر حساب سازمانی
            </p>
          </div>
        </div>
      </CorporateSidebar>
    </div>
  );
}
