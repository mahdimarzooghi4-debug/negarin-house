// Figma 955:860 — Supporting Organization / Users & Access — Desktop
import { DesignField } from "../../artist/design-controls";
import { OrganizationAction, OrganizationSidebar } from "../organization-controls";

export default function SupportingOrganizationUsersAccessDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="955:860" data-name="Supporting Organization / Users & Access — Desktop">
      <div className="fg-c92c0aceed" data-node-id="955:861" data-name="main-content-area">
        <div className="fg-bb9338a234" data-node-id="955:862" data-name="portal-topbar">
          <div className="fg-a34c8fe932" data-node-id="955:863" data-name="topbar-actions">
            <OrganizationAction className="fg-9d9b633ec4" data-node-id="955:864" data-name="notification-bell" label="اعلان‌ها" destination="notifications">
              <div className="fg-58d29b27c0" data-node-id="955:865" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/4f0056d3.svg" />
              </div>
            </OrganizationAction>
            <DesignField className="fg-0b33f69ef8" data-node-id="955:867" data-name="search-container" label="جستجو" placeholder="جستجو...">
              <p className="fg-01111b4028" dir="auto" data-node-id="955:868">
                جستجو...
              </p>
              <div className="fg-c51752dc8c" data-node-id="955:869" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/d09790d0.svg" />
              </div>
            </DesignField>
          </div>
          <p className="fg-bb8c050689" dir="auto" data-node-id="955:871">
            حساب سازمان
          </p>
        </div>
        <div className="fg-597aaf7207" data-node-id="955:872" data-name="scrollable-content">
          <div className="fg-492a5d05e9" data-node-id="955:873" data-name="portal-tabs">
            <OrganizationAction className="fg-6b3bf45b18" data-node-id="955:874" data-name="tab-مشخصات" label="مشخصات سازمان" destination="account">
              <p className="fg-e23da2f2fa" dir="auto" data-node-id="955:875">
                مشخصات سازمان
              </p>
            </OrganizationAction>
            <OrganizationAction className="fg-56bf4d03b9" data-node-id="955:876" data-name="tab-کاربران" label="کاربران و دسترسی‌ها" destination="users-and-access">
              <p className="fg-379062992d" dir="auto" data-node-id="955:877">
                کاربران و دسترسی‌ها
              </p>
            </OrganizationAction>
          </div>
          <div className="fg-c96fe10678" data-node-id="955:878" data-name="controls-row">
            <div className="fg-e8210ba625" data-node-id="955:879" data-name="actions-right">
              <DesignField className="fg-841034ea1f" data-node-id="955:880" data-name="search-users" label="جستجو" placeholder="جستجوی کاربر...">
                <p className="fg-7fa51e4bb6" dir="auto" data-node-id="955:881">
                  جستجوی کاربر...
                </p>
                <div className="fg-5cca20e57d" data-node-id="955:882" data-name="Vector">
                  <div className="fg-8c190c527d">
                    <img alt="" className="fg-acc3667e96" src="/supporting-organization-assets/bbeb51b8.svg" />
                  </div>
                </div>
              </DesignField>
            </div>
            <OrganizationAction className="fg-2d448000c5" data-node-id="955:883" data-name="btn-invite" label="دعوت کاربر جدید" destination="invite-user">
              <p className="fg-31b19a5ba7" dir="auto" data-node-id="955:884">
                دعوت کاربر جدید
              </p>
              <div className="fg-c51752dc8c" data-node-id="955:1070" data-name="plus">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/f3a36602.svg" />
              </div>
            </OrganizationAction>
          </div>
          <div className="fg-c93a8f5cea" data-node-id="955:886" data-name="users-grid">
            <div className="fg-93bc226d6e" data-node-id="955:887" data-name="legend-card">
              <p className="fg-badc02d898" dir="auto" data-node-id="955:888">
                راهنمای نقش‌های کاربری
              </p>
              <div className="fg-d6f889b3e9" data-node-id="955:889" data-name="roles-list">
                <div className="fg-4c62e33c8f" data-node-id="955:890" data-name="role-item-admin">
                  <p className="fg-778f07ce81" dir="auto" data-node-id="955:891">
                    مدیر حساب
                  </p>
                  <p className="fg-bf96b6776b" dir="auto" data-node-id="955:892">
                    دسترسی کامل به تمام بخش‌ها، ویرایش مشخصات سازمان، و مدیریت کامل کاربران و دسترسی‌ها
                  </p>
                </div>
                <div className="fg-4c62e33c8f" data-node-id="955:893" data-name="role-item-agent">
                  <p className="fg-47d975a2af" dir="auto" data-node-id="955:894">
                    کارشناس حمایت
                  </p>
                  <p className="fg-bf96b6776b" dir="auto" data-node-id="955:895">
                    پیگیری حمایت‌های سازمان، معرفی هنرمند، مشاهده وضعیت حمایت‌ها و مصرف اعتبار
                  </p>
                </div>
                <div className="fg-4c62e33c8f" data-node-id="955:896" data-name="role-item-observer">
                  <p className="fg-e476ad6fe6" dir="auto" data-node-id="955:897">
                    ناظر
                  </p>
                  <p className="fg-bf96b6776b" dir="auto" data-node-id="955:898">
                    مشاهده گزارش‌ها، بررسی پیشخوان و حمایت‌ها بدون امکان ایجاد تغییر یا ثبت کاربر جدید
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-d4d9a46223" data-node-id="955:899" data-name="users-table-card">
              <p className="fg-f1a8fae329" dir="auto" data-node-id="955:900">
                لیست کاربران سازمان
              </p>
              <div className="fg-153c0a1809" data-node-id="955:901" data-name="users-table">
                <div className="fg-368185accc" data-node-id="955:902" data-name="table-head">
                  <p className="fg-c37becc1f9" dir="auto" data-node-id="955:903">
                    عملیات
                  </p>
                  <p className="fg-4a9b73a3b7" dir="auto" data-node-id="955:904">
                    آخرین ورود
                  </p>
                  <p className="fg-fc82b04d0c" dir="auto" data-node-id="955:905">
                    وضعیت
                  </p>
                  <p className="fg-4a9b73a3b7" dir="auto" data-node-id="955:906">
                    نقش
                  </p>
                  <p className="fg-4a9b73a3b7" dir="auto" data-node-id="955:907">
                    ایمیل
                  </p>
                  <p className="fg-4a9b73a3b7" dir="auto" data-node-id="955:908">
                    نام کاربر
                  </p>
                </div>
                <div className="fg-3efe76534a" data-node-id="955:909" data-name="table-row-0">
                  <div className="fg-65a1d7c191" data-node-id="955:910" data-name="action-cell">
                    <OrganizationAction className="fg-2a2672efd4" dir="auto" data-node-id="955:911" label="ویرایش">
                      ویرایش
                    </OrganizationAction>
                  </div>
                  <p className="fg-e357bfcc9f" data-node-id="955:912">
                    ۱۴۰۳/۰۷/۱۲
                  </p>
                  <div className="fg-bf03e2ee0f" data-node-id="955:913" data-name="row-status-wrap">
                    <div className="fg-2ddf63ac1c" data-node-id="955:914" data-name="status-badge">
                      <p className="fg-26311c0772" dir="auto" data-node-id="955:915">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-c7aa5e7ea4" dir="auto" data-node-id="955:916">
                    مدیر حساب
                  </p>
                  <p className="fg-e357bfcc9f" data-node-id="955:917">
                    f.hosseini@aryanfoundation.ir
                  </p>
                  <p className="fg-367f068f7a" dir="auto" data-node-id="955:918">
                    دکتر فاطمه حسینی
                  </p>
                </div>
                <div className="fg-3efe76534a" data-node-id="955:919" data-name="table-row-1">
                  <div className="fg-65a1d7c191" data-node-id="955:920" data-name="action-cell">
                    <OrganizationAction className="fg-2a2672efd4" dir="auto" data-node-id="955:921" label="ویرایش">
                      ویرایش
                    </OrganizationAction>
                  </div>
                  <p className="fg-e357bfcc9f" data-node-id="955:922">
                    ۱۴۰۳/۰۷/۱۱
                  </p>
                  <div className="fg-bf03e2ee0f" data-node-id="955:923" data-name="row-status-wrap">
                    <div className="fg-2ddf63ac1c" data-node-id="955:924" data-name="status-badge">
                      <p className="fg-26311c0772" dir="auto" data-node-id="955:925">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-c7aa5e7ea4" dir="auto" data-node-id="955:926">
                    کارشناس حمایت
                  </p>
                  <p className="fg-e357bfcc9f" data-node-id="955:927">
                    s.rahmani@aryanfoundation.ir
                  </p>
                  <p className="fg-367f068f7a" dir="auto" data-node-id="955:928">
                    سعید رحمانی
                  </p>
                </div>
                <div className="fg-3efe76534a" data-node-id="955:929" data-name="table-row-2">
                  <div className="fg-65a1d7c191" data-node-id="955:930" data-name="action-cell">
                    <OrganizationAction className="fg-2a2672efd4" dir="auto" data-node-id="955:931" label="ویرایش">
                      ویرایش
                    </OrganizationAction>
                  </div>
                  <p className="fg-e357bfcc9f" data-node-id="955:932">
                    ۱۴۰۳/۰۷/۰۸
                  </p>
                  <div className="fg-bf03e2ee0f" data-node-id="955:933" data-name="row-status-wrap">
                    <div className="fg-2ddf63ac1c" data-node-id="955:934" data-name="status-badge">
                      <p className="fg-26311c0772" dir="auto" data-node-id="955:935">
                        فعال
                      </p>
                    </div>
                  </div>
                  <p className="fg-c7aa5e7ea4" dir="auto" data-node-id="955:936">
                    ناظر
                  </p>
                  <p className="fg-e357bfcc9f" data-node-id="955:937">
                    m.tavakoli@aryanfoundation.ir
                  </p>
                  <p className="fg-367f068f7a" dir="auto" data-node-id="955:938">
                    مهناز توکلی
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrganizationSidebar className="fg-3ec5d2c2c0" data-node-id="955:939" data-name="portal-sidebar">
        <div className="fg-47aacf6d1d" data-node-id="955:940" data-name="brand-header">
          <div className="fg-0629e67c84" data-node-id="955:941" data-name="brand-text">
            <div className="fg-35f9b3d3c7" data-node-id="955:1430" data-name="negarin-logo">
              <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
            </div>
            <p className="fg-013587b973" dir="auto" data-node-id="955:942">
              نگارین
            </p>
            <p className="fg-ff6622b61b" dir="auto" data-node-id="955:943">
              پرتال سازمان حامی
            </p>
          </div>
          <div className="fg-165a3ec904" data-node-id="955:944" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-092d128a1f" src="/supporting-organization-assets/530a0f8f.png" />
          </div>
        </div>
        <div className="fg-1831b6b598" data-node-id="955:946" data-name="nav-menu">
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:947" data-name="nav-item-پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:948">
              پیشخوان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:949" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/4ec29cb5.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:951" data-name="nav-item-برنامه‌های حمایتی" label="برنامه‌های حمایتی" destination="support-programs">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:952">
              برنامه‌های حمایتی
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:953" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/bd636184.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:955" data-name="nav-item-هنرمندان معرفی‌شده" label="هنرمندان معرفی‌شده" destination="artist-referrals">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:956">
              هنرمندان معرفی‌شده
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:957" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/83c07219.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:959" data-name="nav-item-حمایت‌های من" label="حمایت‌های من" destination="my-supports">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:960">
              حمایت‌های من
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:961" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/bd636184.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:963" data-name="nav-item-گزارش فعالیت" label="گزارش فعالیت" destination="activity-report">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:964">
              گزارش فعالیت
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:965" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/ff189230.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:967" data-name="nav-item-اعلان‌ها" label="اعلان‌ها" destination="notifications">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:968">
              اعلان‌ها
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:969" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/47b002dc.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-f4b0f3aef1" data-node-id="955:971" data-name="nav-item-حساب سازمان" label="حساب سازمان" destination="account">
            <p className="fg-084aa3ec29" dir="auto" data-node-id="955:972">
              حساب سازمان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:973" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/cb39ff4b.svg" />
            </div>
          </OrganizationAction>
        </div>
        <div className="fg-f6ec52d86e" data-node-id="955:975" data-name="sidebar-footer">
          <div className="fg-c2b55f47f4" data-node-id="955:976" data-name="user-profile">
            <div className="fg-08e95fc79b" data-node-id="955:977" data-name="user-details">
              <p className="fg-9e677605c9" dir="auto" data-node-id="955:978">
                بنیاد فرهنگی آرین
              </p>
              <p className="fg-d4235d1d7b" dir="auto" data-node-id="955:979">
                مدیر حساب
              </p>
            </div>
            <div className="fg-d05a0d0fe8" data-node-id="955:980" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/supporting-organization-assets/ac571189.png" />
            </div>
          </div>
        </div>
      </OrganizationSidebar>
    </div>
  );
}
