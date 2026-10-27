// Figma 955:982 — Supporting Organization / Invite User — Desktop
import { DesignField } from "../../artist/design-controls";
import { OrganizationAction, OrganizationSidebar } from "../organization-controls";

export default function SupportingOrganizationInviteUserDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="955:982" data-name="Supporting Organization / Invite User — Desktop">
      <div className="fg-c92c0aceed" data-node-id="955:983" data-name="main-content-area">
        <div className="fg-bb9338a234" data-node-id="955:984" data-name="portal-topbar">
          <div className="fg-a34c8fe932" data-node-id="955:985" data-name="topbar-actions">
            <OrganizationAction className="fg-9d9b633ec4" data-node-id="955:986" data-name="notification-bell" label="اعلان‌ها" destination="notifications">
              <div className="fg-58d29b27c0" data-node-id="955:987" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/4f0056d3.svg" />
              </div>
            </OrganizationAction>
            <DesignField className="fg-0b33f69ef8" data-node-id="955:989" data-name="search-container" label="جستجو" placeholder="جستجو...">
              <p className="fg-01111b4028" dir="auto" data-node-id="955:990">
                جستجو...
              </p>
              <div className="fg-c51752dc8c" data-node-id="955:991" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/d09790d0.svg" />
              </div>
            </DesignField>
          </div>
          <p className="fg-bb8c050689" dir="auto" data-node-id="955:993">
            حساب سازمان
          </p>
        </div>
        <div className="fg-597aaf7207" data-node-id="955:994" data-name="scrollable-content">
          <div className="fg-9f328bf701" data-node-id="955:995" data-name="breadcrumb-row">
            <p className="fg-f0bd2d48ce" dir="auto" data-node-id="955:996">
              دعوت کاربر جدید
            </p>
            <p className="fg-d93ba30183" data-node-id="955:997">{`<`}</p>
            <p className="fg-01151f3b84" dir="auto" data-node-id="955:998">
              کاربران و دسترسی‌ها
            </p>
          </div>
          <div className="fg-5aa1b320cb" data-node-id="955:999" data-name="form-center-wrapper">
            <div className="fg-65ecfdb45e" data-node-id="955:1000" data-name="invite-form-card">
              <div className="fg-2adc7773db" data-node-id="955:1001" data-name="card-header">
                <p className="fg-d62ef25e47" dir="auto" data-node-id="955:1002">
                  دعوت همکار جدید به پرتال سازمان
                </p>
                <p className="fg-d6806d27d7" dir="auto" data-node-id="955:1003">
                  با ارسال دعوت‌نامه، همکار شما امکان دسترسی به پرتال را خواهد داشت.
                </p>
              </div>
              <div className="fg-6f66965dd3" data-node-id="955:1004" data-name="form-fields">
                <div className="fg-62f39da6b2" data-node-id="955:1005" data-name="field-نام و نام خانوادگی همکار">
                  <p className="fg-fc147ab955" dir="auto" data-node-id="955:1006">
                    نام و نام خانوادگی همکار
                  </p>
                  <DesignField className="fg-74abd97c47" data-node-id="955:1007" data-name="input-container" label="نام و نام خانوادگی همکار" placeholder="مثال: علی رضایی">
                    <p className="fg-2e764d81dd" dir="auto" data-node-id="955:1008">
                      مثال: علی رضایی
                    </p>
                  </DesignField>
                </div>
                <div className="fg-62f39da6b2" data-node-id="955:1009" data-name="field-آدرس ایمیل کاری">
                  <p className="fg-fc147ab955" dir="auto" data-node-id="955:1010">
                    آدرس ایمیل کاری
                  </p>
                  <DesignField className="fg-74abd97c47" data-node-id="955:1011" data-name="input-container" label="آدرس ایمیل کاری" placeholder="example@aryanfoundation.ir">
                    <p className="fg-2e764d81dd" data-node-id="955:1012">
                      example@aryanfoundation.ir
                    </p>
                  </DesignField>
                </div>
                <div className="fg-62f39da6b2" data-node-id="955:1013" data-name="field-نقش کاربری">
                  <p className="fg-fc147ab955" dir="auto" data-node-id="955:1014">
                    نقش کاربری
                  </p>
                  <DesignField className="fg-74abd97c47" data-node-id="955:1015" data-name="input-container" label="نقش کاربری" placeholder="کارشناس حمایت">
                    <div className="fg-c51752dc8c" data-node-id="955:1073" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/b59bc56c.svg" />
                    </div>
                    <p className="fg-a22711244b" dir="auto" data-node-id="955:1017">
                      کارشناس حمایت
                    </p>
                  </DesignField>
                </div>
                <div className="fg-62f39da6b2" data-node-id="955:1018" data-name="field-پیام دعوت اختیاری (به همراه ایمیل فرستاده می‌شود)">
                  <p className="fg-fc147ab955" dir="auto" data-node-id="955:1019">
                    پیام دعوت اختیاری (به همراه ایمیل فرستاده می‌شود)
                  </p>
                  <DesignField className="fg-1c94db5c43" data-node-id="955:1020" data-name="textarea-container" label="پیام دعوت اختیاری (به همراه ایمیل فرستاده می‌شود)" placeholder="پیام خود را در اینجا بنویسید..." multiline>
                    <p className="fg-2e764d81dd" dir="auto" data-node-id="955:1021">
                      پیام خود را در اینجا بنویسید...
                    </p>
                  </DesignField>
                </div>
              </div>
              <div className="fg-452d346712" data-node-id="955:1022" data-name="actions-row">
                <OrganizationAction className="fg-9791f27f13" data-node-id="955:1023" data-name="btn-cancel" label="انصراف" destination="users-and-access">
                  <p className="fg-36ac832935" dir="auto" data-node-id="955:1024">
                    انصراف
                  </p>
                </OrganizationAction>
                <OrganizationAction className="fg-58256e3f6a" data-node-id="955:1025" data-name="btn-submit" label="ارسال دعوت‌نامه" mode="invite">
                  <p className="fg-31b19a5ba7" dir="auto" data-node-id="955:1026">
                    ارسال دعوت‌نامه
                  </p>
                </OrganizationAction>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrganizationSidebar className="fg-3ec5d2c2c0" data-node-id="955:1027" data-name="portal-sidebar">
        <div className="fg-47aacf6d1d" data-node-id="955:1028" data-name="brand-header">
          <div className="fg-0629e67c84" data-node-id="955:1029" data-name="brand-text">
            <div className="fg-35f9b3d3c7" data-node-id="955:1431" data-name="negarin-logo">
              <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
            </div>
            <p className="fg-013587b973" dir="auto" data-node-id="955:1030">
              نگارین
            </p>
            <p className="fg-ff6622b61b" dir="auto" data-node-id="955:1031">
              پرتال سازمان حامی
            </p>
          </div>
          <div className="fg-165a3ec904" data-node-id="955:1032" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-092d128a1f" src="/supporting-organization-assets/530a0f8f.png" />
          </div>
        </div>
        <div className="fg-1831b6b598" data-node-id="955:1034" data-name="nav-menu">
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:1035" data-name="nav-item-پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:1036">
              پیشخوان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1037" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/4ec29cb5.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:1039" data-name="nav-item-برنامه‌های حمایتی" label="برنامه‌های حمایتی" destination="support-programs">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:1040">
              برنامه‌های حمایتی
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1041" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/bd636184.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:1043" data-name="nav-item-هنرمندان معرفی‌شده" label="هنرمندان معرفی‌شده" destination="artist-referrals">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:1044">
              هنرمندان معرفی‌شده
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1045" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/83c07219.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:1047" data-name="nav-item-حمایت‌های من" label="حمایت‌های من" destination="my-supports">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:1048">
              حمایت‌های من
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1049" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/bd636184.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:1051" data-name="nav-item-گزارش فعالیت" label="گزارش فعالیت" destination="activity-report">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:1052">
              گزارش فعالیت
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1053" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/ff189230.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:1055" data-name="nav-item-اعلان‌ها" label="اعلان‌ها" destination="notifications">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:1056">
              اعلان‌ها
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1057" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/47b002dc.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-f4b0f3aef1" data-node-id="955:1059" data-name="nav-item-حساب سازمان" label="حساب سازمان" destination="account">
            <p className="fg-084aa3ec29" dir="auto" data-node-id="955:1060">
              حساب سازمان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:1061" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/cb39ff4b.svg" />
            </div>
          </OrganizationAction>
        </div>
        <div className="fg-f6ec52d86e" data-node-id="955:1063" data-name="sidebar-footer">
          <div className="fg-c2b55f47f4" data-node-id="955:1064" data-name="user-profile">
            <div className="fg-08e95fc79b" data-node-id="955:1065" data-name="user-details">
              <p className="fg-9e677605c9" dir="auto" data-node-id="955:1066">
                بنیاد فرهنگی آرین
              </p>
              <p className="fg-d4235d1d7b" dir="auto" data-node-id="955:1067">
                مدیر حساب
              </p>
            </div>
            <div className="fg-d05a0d0fe8" data-node-id="955:1068" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/supporting-organization-assets/d5ee0f39.png" />
            </div>
          </div>
        </div>
      </OrganizationSidebar>
    </div>
  );
}
