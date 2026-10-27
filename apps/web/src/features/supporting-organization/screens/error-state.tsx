// Figma 955:1265 — Supporting Organization / Error State — Desktop
import { DesignField } from "../../artist/design-controls";
import { OrganizationAction, OrganizationSidebar } from "../organization-controls";

export default function SupportingOrganizationErrorStateDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="955:1265" data-name="Supporting Organization / Error State — Desktop">
      <div className="fg-95773e0afe" data-node-id="955:1266" data-name="main-content-area">
        <div className="fg-bb9338a234" data-node-id="955:1267" data-name="portal-topbar">
          <div className="fg-a34c8fe932" data-node-id="955:1268" data-name="topbar-actions">
            <OrganizationAction className="fg-9d9b633ec4" data-node-id="955:1269" data-name="notification-bell" label="اعلان‌ها" destination="notifications">
              <div className="fg-58d29b27c0" data-node-id="955:1346" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/4f0056d3.svg" />
              </div>
            </OrganizationAction>
            <DesignField className="fg-0b33f69ef8" data-node-id="955:1271" data-name="search-container" label="جستجو" placeholder="جستجو...">
              <p className="fg-e357bfcc9f" dir="auto" data-node-id="955:1272">
                جستجو...
              </p>
              <div className="fg-c51752dc8c" data-node-id="955:1349" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/f474079b.svg" />
              </div>
            </DesignField>
          </div>
          <p className="fg-bb8c050689" dir="auto" data-node-id="955:1274">
            پیشخوان
          </p>
        </div>
        <div className="fg-52a8f28730" data-node-id="955:1275" data-name="scrollable-content">
          <div className="fg-bdf46ca15e" data-node-id="955:1276" data-name="error-card">
            <div className="fg-4155cee337" data-node-id="955:1277" data-name="error-icon">
              <div className="fg-f84de76785" data-node-id="955:1352" data-name="alert-triangle">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/6dcd0119.svg" />
              </div>
            </div>
            <div className="fg-f46df9ef0f" data-node-id="955:1279" data-name="error-text">
              <p className="fg-46de64910c" dir="auto" data-node-id="955:1280">
                خطا در بارگذاری اطلاعات
              </p>
              <p className="fg-7484ea8365" dir="auto" data-node-id="955:1281">
                متأسفانه در دریافت اطلاعات مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.
              </p>
            </div>
            <div className="fg-e8efcc8266" data-node-id="955:1282" data-name="error-actions">
              <OrganizationAction className="fg-9ee2e2889d" data-node-id="955:1283" data-name="retry-button" label="تلاش مجدد" destination="dashboard">
                <p className="fg-31b19a5ba7" dir="auto" data-node-id="955:1284">
                  تلاش مجدد
                </p>
              </OrganizationAction>
              <OrganizationAction className="fg-819b730b91" dir="auto" data-node-id="955:1285" label="بازگشت به پیشخوان" destination="dashboard">
                بازگشت به پیشخوان
              </OrganizationAction>
            </div>
            <div className="fg-df0a3de519" data-node-id="955:1286" data-name="Line">
              <div className="fg-cf771a9448">
                <img alt="" className="fg-acc3667e96" src="/supporting-organization-assets/bba1efb2.svg" />
              </div>
            </div>
            <p className="fg-68281d7602" dir="auto" data-node-id="955:1287">
              در صورت تکرار مشکل، با پشتیبانی نگارین تماس بگیرید: support@negarin.ir
            </p>
          </div>
        </div>
      </div>
      <OrganizationSidebar className="fg-7970763e16" data-node-id="955:1288" data-name="portal-sidebar">
        <div className="fg-47aacf6d1d" data-node-id="955:1289" data-name="brand-header">
          <div className="fg-0629e67c84" data-node-id="955:1290" data-name="brand-text">
            <div className="fg-35f9b3d3c7" data-node-id="955:1434" data-name="negarin-logo">
              <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
            </div>
            <p className="fg-013587b973" dir="auto" data-node-id="955:1291">
              نگارین
            </p>
            <p className="fg-ff6622b61b" dir="auto" data-node-id="955:1292">
              پرتال سازمان حامی
            </p>
          </div>
          <div className="fg-35f9b3d3c7" data-node-id="955:1293" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
          </div>
        </div>
        <div className="fg-1831b6b598" data-node-id="955:1295" data-name="nav-menu">
          <OrganizationAction className="fg-f4b0f3aef1" data-node-id="955:1296" data-name="nav-item-پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-084aa3ec29" dir="auto" data-node-id="955:1297">
              پیشخوان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1406" data-name="home">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/89b3bfaf.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1299" data-name="nav-item-برنامه‌های حمایتی" label="برنامه‌های حمایتی" destination="support-programs">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1300">
              برنامه‌های حمایتی
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1361" data-name="briefcase-business">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/6b0b7fce.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1302" data-name="nav-item-هنرمندان معرفی‌شده" label="هنرمندان معرفی‌شده" destination="artist-referrals">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1303">
              هنرمندان معرفی‌شده
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1397" data-name="users">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/b5bd680b.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1305" data-name="nav-item-حمایت‌های من" label="حمایت‌های من" destination="my-supports">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1306">
              حمایت‌های من
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1379" data-name="shield-check">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/989772cf.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1308" data-name="nav-item-گزارش فعالیت" label="گزارش فعالیت" destination="activity-report">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1309">
              گزارش فعالیت
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1388" data-name="bar-chart">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/9e1d66a9.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1311" data-name="nav-item-اعلان‌ها" label="اعلان‌ها" destination="notifications">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1312">
              اعلان‌ها
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1415" data-name="bell-dot">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/426f72bb.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1314" data-name="nav-item-حساب سازمان" label="حساب سازمان" destination="account">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1315">
              حساب سازمان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1370" data-name="user-cog">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/38c127f9.svg" />
            </div>
          </OrganizationAction>
        </div>
        <div className="fg-e6a1c73fbd" data-node-id="955:1317" data-name="sidebar-footer">
          <div className="fg-c2b55f47f4" data-node-id="955:1318" data-name="user-profile">
            <div className="fg-08e95fc79b" data-node-id="955:1319" data-name="user-details">
              <p className="fg-9e677605c9" dir="auto" data-node-id="955:1320">
                بنیاد فرهنگی آرین
              </p>
              <p className="fg-d4235d1d7b" dir="auto" data-node-id="955:1321">
                مدیر حساب
              </p>
            </div>
            <div className="fg-39bba4cfcc" data-node-id="955:1322" data-name="Frame">
              <p className="fg-651f5349a3" dir="auto" data-node-id="955:1323">
                ب
              </p>
            </div>
          </div>
        </div>
      </OrganizationSidebar>
    </div>
  );
}
