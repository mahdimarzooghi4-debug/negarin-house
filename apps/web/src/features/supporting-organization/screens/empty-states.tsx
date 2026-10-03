// Figma 955:1091 — Supporting Organization / Empty States - Desktop
import { DesignField } from "../../artist/design-controls";
import { OrganizationAction, OrganizationSidebar } from "../organization-controls";

export default function SupportingOrganizationEmptyStatesDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="955:1091" data-name="Supporting Organization / Empty States - Desktop">
      <div className="fg-c92c0aceed" data-node-id="955:1092" data-name="main-content-area">
        <div className="fg-bb9338a234" data-node-id="955:1093" data-name="portal-topbar">
          <div className="fg-a34c8fe932" data-node-id="955:1094" data-name="topbar-actions">
            <OrganizationAction className="fg-9d9b633ec4" data-node-id="955:1095" data-name="notification-bell" label="اعلان‌ها" destination="notifications">
              <div className="fg-58d29b27c0" data-node-id="955:1325" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/4f0056d3.svg" />
              </div>
            </OrganizationAction>
            <DesignField className="fg-0b33f69ef8" data-node-id="955:1097" data-name="search-container" label="جستجو" placeholder="جستجو...">
              <p className="fg-e357bfcc9f" dir="auto" data-node-id="955:1098">
                جستجو...
              </p>
              <div className="fg-c51752dc8c" data-node-id="955:1328" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/f474079b.svg" />
              </div>
            </DesignField>
          </div>
          <p className="fg-bb8c050689" dir="auto" data-node-id="955:1100">
            هنرمندان معرفی‌شده
          </p>
        </div>
        <div className="fg-959e861787" data-node-id="955:1101" data-name="scrollable-content">
          <div className="fg-a59809ce57" data-node-id="958:63" data-name="qa-matrix-card">
            <p className="fg-e529438eeb" dir="auto" data-node-id="958:64">
              ماتریس وضعیت‌های QA - پرتال سازمان حامی
            </p>
            <div className="fg-445d37cc95" data-node-id="958:65" data-name="qa-matrix-table">
              <div className="fg-6177313933" data-node-id="958:66" data-name="qa-header-row">
                <p className="fg-fc96b312c7" dir="auto" data-node-id="958:67">
                  حالت بارگذاری
                </p>
                <p className="fg-fc96b312c7" dir="auto" data-node-id="958:68">
                  حالت خطا
                </p>
                <p className="fg-fc96b312c7" dir="auto" data-node-id="958:69">
                  حالت خالی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="958:70">
                  ماژول
                </p>
              </div>
              <div className="fg-622e717f7f" data-node-id="958:71" data-name="qa-row-dashboard">
                <div className="fg-d3ec405d27" data-node-id="958:72" data-name="cell-loading">
                  <div className="fg-13567bc981" data-node-id="958:73" data-name="Rectangle" />
                  <div className="fg-f6ce1ba312" data-node-id="958:74" data-name="Rectangle" />
                </div>
                <div className="fg-06e5f1f063" data-node-id="958:75" data-name="cell-error">
                  <div className="fg-31aa68f9cd" data-node-id="958:76" data-name="error-icon">
                    <div className="fg-5cca20e57d" data-node-id="958:127" data-name="alert-circle">
                      <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/7a24349d.svg" />
                    </div>
                  </div>
                  <p className="fg-00d3ce37f1" dir="auto" data-node-id="958:78">
                    خطا در بارگذاری پیشخوان
                  </p>
                </div>
                <div className="fg-04338a46c4" data-node-id="958:79" data-name="cell-empty">
                  <p className="fg-a5f3a4bba3" dir="auto" data-node-id="958:80">
                    هنوز فعالیتی ثبت نشده است.
                  </p>
                </div>
                <p className="fg-367f068f7a" dir="auto" data-node-id="958:81">
                  پیشخوان
                </p>
              </div>
              <div className="fg-622e717f7f" data-node-id="958:82" data-name="qa-row-support-programs">
                <div className="fg-d3ec405d27" data-node-id="958:83" data-name="cell-loading">
                  <div className="fg-13567bc981" data-node-id="958:84" data-name="Rectangle" />
                  <div className="fg-f6ce1ba312" data-node-id="958:85" data-name="Rectangle" />
                </div>
                <div className="fg-06e5f1f063" data-node-id="958:86" data-name="cell-error">
                  <div className="fg-31aa68f9cd" data-node-id="958:87" data-name="error-icon">
                    <div className="fg-5cca20e57d" data-node-id="958:130" data-name="alert-circle">
                      <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/c8939051.svg" />
                    </div>
                  </div>
                  <p className="fg-00d3ce37f1" dir="auto" data-node-id="958:89">
                    خطا در دریافت برنامه‌ها
                  </p>
                </div>
                <div className="fg-04338a46c4" data-node-id="958:90" data-name="cell-empty">
                  <p className="fg-a5f3a4bba3" dir="auto" data-node-id="958:91">
                    برنامه حمایتی فعالی وجود ندارد.
                  </p>
                </div>
                <p className="fg-367f068f7a" dir="auto" data-node-id="958:92">
                  برنامه‌های حمایتی
                </p>
              </div>
              <div className="fg-622e717f7f" data-node-id="958:93" data-name="qa-row-referred-artists">
                <div className="fg-d3ec405d27" data-node-id="958:94" data-name="cell-loading">
                  <div className="fg-13567bc981" data-node-id="958:95" data-name="Rectangle" />
                  <div className="fg-f6ce1ba312" data-node-id="958:96" data-name="Rectangle" />
                </div>
                <div className="fg-06e5f1f063" data-node-id="958:97" data-name="cell-error">
                  <div className="fg-31aa68f9cd" data-node-id="958:98" data-name="error-icon">
                    <div className="fg-5cca20e57d" data-node-id="958:133" data-name="alert-circle">
                      <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/92fc2ba9.svg" />
                    </div>
                  </div>
                  <p className="fg-00d3ce37f1" dir="auto" data-node-id="958:100">
                    خطا در بارگذاری لیست معرفی‌ها
                  </p>
                </div>
                <div className="fg-04338a46c4" data-node-id="958:101" data-name="cell-empty">
                  <p className="fg-a5f3a4bba3" dir="auto" data-node-id="958:102">
                    هنوز هنرمندی معرفی نکرده‌اید.
                  </p>
                </div>
                <p className="fg-367f068f7a" dir="auto" data-node-id="958:103">
                  هنرمندان معرفی‌شده
                </p>
              </div>
              <div className="fg-622e717f7f" data-node-id="958:104" data-name="qa-row-my-supports">
                <div className="fg-d3ec405d27" data-node-id="958:105" data-name="cell-loading">
                  <div className="fg-13567bc981" data-node-id="958:106" data-name="Rectangle" />
                  <div className="fg-f6ce1ba312" data-node-id="958:107" data-name="Rectangle" />
                </div>
                <div className="fg-06e5f1f063" data-node-id="958:108" data-name="cell-error">
                  <div className="fg-31aa68f9cd" data-node-id="958:109" data-name="error-icon">
                    <div className="fg-5cca20e57d" data-node-id="958:136" data-name="alert-circle">
                      <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/cb943ac5.svg" />
                    </div>
                  </div>
                  <p className="fg-00d3ce37f1" dir="auto" data-node-id="958:111">
                    خطا در دریافت حمایت‌ها
                  </p>
                </div>
                <div className="fg-04338a46c4" data-node-id="958:112" data-name="cell-empty">
                  <p className="fg-a5f3a4bba3" dir="auto" data-node-id="958:113">
                    حمایت فعالی وجود ندارد.
                  </p>
                </div>
                <p className="fg-367f068f7a" dir="auto" data-node-id="958:114">
                  حمایت‌های من
                </p>
              </div>
              <div className="fg-1c2aa801f5" data-node-id="958:115" data-name="qa-row-activity-report">
                <div className="fg-d3ec405d27" data-node-id="958:116" data-name="cell-loading">
                  <div className="fg-13567bc981" data-node-id="958:117" data-name="Rectangle" />
                  <div className="fg-f6ce1ba312" data-node-id="958:118" data-name="Rectangle" />
                </div>
                <div className="fg-06e5f1f063" data-node-id="958:119" data-name="cell-error">
                  <div className="fg-31aa68f9cd" data-node-id="958:120" data-name="error-icon">
                    <div className="fg-5cca20e57d" data-node-id="958:139" data-name="alert-circle">
                      <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/fa8193dd.svg" />
                    </div>
                  </div>
                  <p className="fg-00d3ce37f1" dir="auto" data-node-id="958:122">
                    خطا در تولید گزارش
                  </p>
                </div>
                <div className="fg-04338a46c4" data-node-id="958:123" data-name="cell-empty">
                  <p className="fg-a5f3a4bba3" dir="auto" data-node-id="958:124">
                    گزارشی در بازه انتخابی یافت نشد.
                  </p>
                </div>
                <p className="fg-367f068f7a" dir="auto" data-node-id="958:125">
                  گزارش فعالیت
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrganizationSidebar className="fg-3ec5d2c2c0" data-node-id="955:1126" data-name="portal-sidebar">
        <div className="fg-47aacf6d1d" data-node-id="955:1127" data-name="brand-header">
          <div className="fg-0629e67c84" data-node-id="955:1128" data-name="brand-text">
            <div className="fg-35f9b3d3c7" data-node-id="955:1432" data-name="negarin-logo">
              <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
            </div>
            <p className="fg-013587b973" dir="auto" data-node-id="955:1129">
              نگارین
            </p>
            <p className="fg-ff6622b61b" dir="auto" data-node-id="955:1130">
              پرتال سازمان حامی
            </p>
          </div>
          <div className="fg-35f9b3d3c7" data-node-id="955:1131" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
          </div>
        </div>
        <div className="fg-1831b6b598" data-node-id="955:1133" data-name="nav-menu">
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1134" data-name="nav-item-پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1135">
              پیشخوان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1400" data-name="home">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/89b3bfaf.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1137" data-name="nav-item-برنامه‌های حمایتی" label="برنامه‌های حمایتی" destination="support-programs">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1138">
              برنامه‌های حمایتی
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1355" data-name="briefcase-business">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/00ec1fb4.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-f4b0f3aef1" data-node-id="955:1140" data-name="nav-item-هنرمندان معرفی‌شده" label="هنرمندان معرفی‌شده" destination="artist-referrals">
            <p className="fg-084aa3ec29" dir="auto" data-node-id="955:1141">
              هنرمندان معرفی‌شده
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1391" data-name="users">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/361b484c.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1143" data-name="nav-item-حمایت‌های من" label="حمایت‌های من" destination="my-supports">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1144">
              حمایت‌های من
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1373" data-name="shield-check">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/2bdcf1c1.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1146" data-name="nav-item-گزارش فعالیت" label="گزارش فعالیت" destination="activity-report">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1147">
              گزارش فعالیت
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1382" data-name="bar-chart">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/3500faf4.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1149" data-name="nav-item-اعلان‌ها" label="اعلان‌ها" destination="notifications">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1150">
              اعلان‌ها
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1409" data-name="bell-dot">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/426f72bb.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-98680f9eff" data-node-id="955:1152" data-name="nav-item-حساب سازمان" label="حساب سازمان" destination="account">
            <p className="fg-b602562261" dir="auto" data-node-id="955:1153">
              حساب سازمان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1364" data-name="user-cog">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/5e43e7e1.svg" />
            </div>
          </OrganizationAction>
        </div>
        <div className="fg-e6a1c73fbd" data-node-id="955:1155" data-name="sidebar-footer">
          <div className="fg-c2b55f47f4" data-node-id="955:1156" data-name="user-profile">
            <div className="fg-08e95fc79b" data-node-id="955:1157" data-name="user-details">
              <p className="fg-9e677605c9" dir="auto" data-node-id="955:1158">
                بنیاد فرهنگی آرین
              </p>
              <p className="fg-d4235d1d7b" dir="auto" data-node-id="955:1159">
                مدیر حساب
              </p>
            </div>
            <div className="fg-39bba4cfcc" data-node-id="955:1160" data-name="Frame">
              <p className="fg-651f5349a3" dir="auto" data-node-id="955:1161">
                ب
              </p>
            </div>
          </div>
        </div>
      </OrganizationSidebar>
    </div>
  );
}
