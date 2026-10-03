// Figma 954:853 — Supporting Organization / New Artist Referral — Desktop
import { DesignField, DesignChoice } from "../../artist/design-controls";
import { OrganizationAction, OrganizationSidebar } from "../organization-controls";

export default function SupportingOrganizationNewArtistReferralDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="954:853" data-name="Supporting Organization / New Artist Referral — Desktop">
      <div className="fg-c92c0aceed" data-node-id="954:854" data-name="main-content-area">
        <div className="fg-bb9338a234" data-node-id="954:855" data-name="portal-topbar">
          <div className="fg-a34c8fe932" data-node-id="954:856" data-name="topbar-actions">
            <OrganizationAction className="fg-9d9b633ec4" data-node-id="954:857" data-name="notification-bell" label="اعلان‌ها" destination="notifications">
              <div className="fg-87f65ec773" data-node-id="954:858" data-name="bell">
                <div className="fg-0bb5547f93" data-node-id="954:1132" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/dc5639a8.svg" />
                </div>
              </div>
            </OrganizationAction>
            <DesignField className="fg-0b33f69ef8" data-node-id="954:860" data-name="search-container" label="جستجو" placeholder="جستجو...">
              <p className="fg-01111b4028" dir="auto" data-node-id="954:861">
                جستجو...
              </p>
              <div className="fg-c55cd499f6" data-node-id="954:862" data-name="search">
                <div className="fg-0bb5547f93" data-node-id="954:1135" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/42d0707a.svg" />
                </div>
              </div>
            </DesignField>
          </div>
          <p className="fg-bb8c050689" dir="auto" data-node-id="954:864">
            معرفی هنرمند جدید
          </p>
        </div>
        <div className="fg-597aaf7207" data-node-id="954:865" data-name="scrollable-content">
          <div className="fg-3db3332c05" data-node-id="954:866" data-name="breadcrumbs">
            <p className="fg-2876baf180" dir="auto" data-node-id="954:867">
              معرفی هنرمند جدید
            </p>
            <p className="fg-e106bcb68b" data-node-id="954:868">{`<`}</p>
            <OrganizationAction className="fg-6463ebb9b1" dir="auto" data-node-id="954:869" label="هنرمندان معرفی‌شده" destination="artist-referrals">
              هنرمندان معرفی‌شده
            </OrganizationAction>
          </div>
          <div className="fg-f3fd937cf6" data-node-id="954:870" data-name="form-container">
            <div className="fg-4c7b237fec" data-node-id="954:871" data-name="form-card">
              <p className="fg-f966e8e0c8" dir="auto" data-node-id="954:872">
                اطلاعات هنرمند جدید جهت معرفی به نگارین
              </p>
              <div className="fg-6f66965dd3" data-node-id="954:873" data-name="fields-stack">
                <div className="fg-62f39da6b2" data-node-id="954:874" data-name="field-name">
                  <p className="fg-fc147ab955" dir="auto" data-node-id="954:875">
                    نام و نام خانوادگی هنرمند
                  </p>
                  <DesignField className="fg-e2ac013d8e" data-node-id="954:876" data-name="input-container" label="نام و نام خانوادگی هنرمند" placeholder="مثال: فاطمه احمدی">
                    <p className="fg-162d7ef36c" dir="auto" data-node-id="954:877">
                      مثال: فاطمه احمدی
                    </p>
                  </DesignField>
                </div>
                <div className="fg-6a45c3dffb" data-node-id="954:878" data-name="field-phone">
                  <p className="fg-aa98f72416" dir="auto" data-node-id="954:879">
                    شماره تماس
                  </p>
                  <DesignField className="fg-ba7c3811e0" data-node-id="954:880" data-name="input-container" label="شماره تماس" placeholder="۰۹۱۲۳۴۵۶۷۸۹ +98">
                    <p className="fg-547bbedaef" data-node-id="954:881">
                      ۰۹۱۲۳۴۵۶۷۸۹
                    </p>
                    <p className="fg-f0bd355290" data-node-id="954:882">
                      +98
                    </p>
                  </DesignField>
                </div>
                <div className="fg-62f39da6b2" data-node-id="954:883" data-name="field-category">
                  <p className="fg-fc147ab955" dir="auto" data-node-id="954:884">
                    حوزه هنری / رشته صنایع‌دستی
                  </p>
                  <DesignField className="fg-bbe9232cc7" data-node-id="954:885" data-name="select-container" label="حوزه هنری / رشته صنایع‌دستی" placeholder="میناکاری">
                    <div className="fg-5cca20e57d" data-node-id="954:1138" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/a7e00a3d.svg" />
                    </div>
                    <p className="fg-690c8aaccb" dir="auto" data-node-id="954:887">
                      میناکاری
                    </p>
                  </DesignField>
                </div>
                <div className="fg-62f39da6b2" data-node-id="954:888" data-name="field-city">
                  <p className="fg-fc147ab955" dir="auto" data-node-id="954:889">
                    شهر / استان
                  </p>
                  <DesignField className="fg-e2ac013d8e" data-node-id="954:890" data-name="input-container" label="شهر / استان" placeholder="مثال: اصفهان">
                    <p className="fg-162d7ef36c" dir="auto" data-node-id="954:891">
                      مثال: اصفهان
                    </p>
                  </DesignField>
                </div>
                <div className="fg-62f39da6b2" data-node-id="954:892" data-name="field-desc">
                  <p className="fg-fc147ab955" dir="auto" data-node-id="954:893">
                    توضیح کوتاه درباره معرفی
                  </p>
                  <DesignField className="fg-20119854f3" data-node-id="954:894" data-name="input-container" label="توضیح کوتاه درباره معرفی" placeholder="دلایل معرفی و شرایط هنرمند را در سه خط شرح دهید..." multiline>
                    <p className="fg-162d7ef36c" dir="auto" data-node-id="954:895">
                      دلایل معرفی و شرایط هنرمند را در سه خط شرح دهید...
                    </p>
                  </DesignField>
                </div>
              </div>
              <div className="fg-c2b55f47f4" data-node-id="954:896" data-name="consent-checkbox-row">
                <p className="fg-f18ad04130" dir="auto" data-node-id="954:897">
                  با ارسال اطلاعات، تأیید می‌کنم که مجوز ارائه اطلاعات تماس هنرمند به نگارین را دارم.
                </p>
                <DesignChoice className="fg-876d36cf3a" data-node-id="954:898" data-name="checkbox" label="با ارسال اطلاعات، تأیید می‌کنم که مجوز ارائه اطلاعات تماس هنرمند به نگارین را دارم." group="consent-checkbox-row" initial={true} multiple>
                  <div className="fg-fc08538add" data-node-id="954:1141" data-name="check">
                    <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/cef2a796.svg" />
                  </div>
                </DesignChoice>
              </div>
              <div className="fg-b8be7c6624" data-node-id="954:900" data-name="form-buttons">
                <OrganizationAction className="fg-92c2d7b5f5" data-node-id="954:901" data-name="cancel-btn" label="انصراف" destination="artist-referrals">
                  <p className="fg-36ac832935" dir="auto" data-node-id="954:902">
                    انصراف
                  </p>
                </OrganizationAction>
                <OrganizationAction className="fg-5a473e117c" data-node-id="954:903" data-name="submit-btn" label="ثبت معرفی" mode="referral">
                  <p className="fg-31b19a5ba7" dir="auto" data-node-id="954:904">
                    ثبت معرفی
                  </p>
                </OrganizationAction>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrganizationSidebar className="fg-3ec5d2c2c0" data-node-id="954:905" data-name="portal-sidebar">
        <div className="fg-47aacf6d1d" data-node-id="954:906" data-name="brand-header">
          <div className="fg-0629e67c84" data-node-id="954:907" data-name="brand-text">
            <div className="fg-35f9b3d3c7" data-node-id="955:1421" data-name="negarin-logo">
              <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
            </div>
            <p className="fg-013587b973" dir="auto" data-node-id="954:908">
              نگارین
            </p>
            <p className="fg-ff6622b61b" dir="auto" data-node-id="954:909">
              پرتال سازمان حامی
            </p>
          </div>
          <div className="fg-35f9b3d3c7" data-node-id="954:910" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
          </div>
        </div>
        <div className="fg-1831b6b598" data-node-id="954:912" data-name="nav-menu">
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="954:913" data-name="nav-item-پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="954:914">
              پیشخوان
            </p>
            <div className="fg-58d29b27c0" data-node-id="954:1231" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/4ec29cb5.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="954:916" data-name="nav-item-برنامه‌های حمایتی" label="برنامه‌های حمایتی" destination="support-programs">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="954:917">
              برنامه‌های حمایتی
            </p>
            <div className="fg-58d29b27c0" data-node-id="954:1171" data-name="circle-x">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/09c0484a.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-f4b0f3aef1" data-node-id="954:919" data-name="nav-item-هنرمندان معرفی‌شده" label="هنرمندان معرفی‌شده" destination="artist-referrals">
            <p className="fg-084aa3ec29" dir="auto" data-node-id="954:920">
              هنرمندان معرفی‌شده
            </p>
            <div className="fg-58d29b27c0" data-node-id="954:1219" data-name="circle-x">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/6483db40.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="954:922" data-name="nav-item-حمایت‌های من" label="حمایت‌های من" destination="my-supports">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="954:923">
              حمایت‌های من
            </p>
            <div className="fg-58d29b27c0" data-node-id="954:1207" data-name="circle-x">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/a028f1ba.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="954:925" data-name="nav-item-گزارش فعالیت" label="گزارش فعالیت" destination="activity-report">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="954:926">
              گزارش فعالیت
            </p>
            <div className="fg-58d29b27c0" data-node-id="954:1144" data-name="activity">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/ffc71f8f.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="954:928" data-name="nav-item-اعلان‌ها" label="اعلان‌ها" destination="notifications">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="954:929">
              اعلان‌ها
            </p>
            <div className="fg-58d29b27c0" data-node-id="954:1183" data-name="bell">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/7d582392.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="954:931" data-name="nav-item-حساب سازمان" label="حساب سازمان" destination="account">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="954:932">
              حساب سازمان
            </p>
            <div className="fg-58d29b27c0" data-node-id="954:1195" data-name="user">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/d4f67917.svg" />
            </div>
          </OrganizationAction>
        </div>
        <div className="fg-f6ec52d86e" data-node-id="954:934" data-name="sidebar-footer">
          <div className="fg-c2b55f47f4" data-node-id="954:935" data-name="user-profile">
            <div className="fg-08e95fc79b" data-node-id="954:936" data-name="user-details">
              <p className="fg-9e677605c9" dir="auto" data-node-id="954:937">
                بنیاد فرهنگی آرین
              </p>
              <p className="fg-d4235d1d7b" dir="auto" data-node-id="954:938">
                مدیر حساب
              </p>
            </div>
            <div className="fg-d05a0d0fe8" data-node-id="954:939" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/supporting-organization-assets/2c8056f0.png" />
            </div>
          </div>
        </div>
      </OrganizationSidebar>
    </div>
  );
}
