// Figma 955:417 — Supporting Organization / Activity Detail Report — Desktop
import { DesignField } from "../../artist/design-controls";
import { OrganizationAction, OrganizationSidebar } from "../organization-controls";

export default function SupportingOrganizationActivityDetailReportDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="955:417" data-name="Supporting Organization / Activity Detail Report — Desktop">
      <div className="fg-c92c0aceed" data-node-id="955:418" data-name="main-content-area">
        <div className="fg-bb9338a234" data-node-id="955:419" data-name="portal-topbar">
          <div className="fg-a34c8fe932" data-node-id="955:420" data-name="topbar-left-actions">
            <OrganizationAction className="fg-9d9b633ec4" data-node-id="955:421" data-name="notification-bell" label="اعلان‌ها" destination="notifications">
              <div className="fg-58d29b27c0" data-node-id="955:422" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/711bb800.svg" />
              </div>
            </OrganizationAction>
            <DesignField className="fg-0b33f69ef8" data-node-id="955:424" data-name="search-container" label="جستجو" placeholder="جستجو...">
              <p className="fg-01111b4028" dir="auto" data-node-id="955:425">
                جستجو...
              </p>
              <div className="fg-c51752dc8c" data-node-id="955:426" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/d09790d0.svg" />
              </div>
            </DesignField>
          </div>
          <p className="fg-bb8c050689" dir="auto" data-node-id="955:428">
            گزارش تفصیلی
          </p>
        </div>
        <div className="fg-597aaf7207" data-node-id="955:429" data-name="scrollable-content">
          <div className="fg-c96fe10678" data-node-id="955:430" data-name="detail-header">
            <div className="fg-e8210ba625" data-node-id="955:431" data-name="header-left">
              <OrganizationAction className="fg-12443ed81f" data-node-id="955:432" data-name="download-button" label="دانلود گزارش">
                <p className="fg-8ffc872800" dir="auto" data-node-id="955:433">
                  دانلود گزارش
                </p>
              </OrganizationAction>
            </div>
            <div className="fg-485a33b60b" data-node-id="955:434" data-name="breadcrumbs-wrapper">
              <p className="fg-fffad9d9a0" dir="auto" data-node-id="955:435" style={{ fontVariationSettings: '"wdth" 100' }}>
                <span className="fg-e67f880d4b">{`گزارش فعالیت  >  `}</span>
                <span className="fg-2169d1b528">گزارش تفصیلی</span>
              </p>
              <p className="fg-e9d8696dfc" dir="auto" data-node-id="955:436">
                لیست جامع مصارف و تخصیص‌ها
              </p>
            </div>
          </div>
          <div className="fg-bf4f4cca63" data-node-id="955:437" data-name="filters-section-card">
            <div className="fg-e8fd000608" data-node-id="955:438" data-name="filters-row">
              <div className="fg-98873ec365" data-node-id="955:439" data-name="filter-dropdown">
                <p className="fg-54c0c84ef4" dir="auto" data-node-id="955:440">
                  هنرمند
                </p>
                <OrganizationAction className="fg-e3222833ee" data-node-id="955:441" data-name="dropdown-input" label="همه هنرمندان">
                  <div className="fg-5cca20e57d" data-node-id="955:705" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/a7e00a3d.svg" />
                  </div>
                  <p className="fg-638a840835" dir="auto" data-node-id="955:443">
                    همه هنرمندان
                  </p>
                </OrganizationAction>
              </div>
              <div className="fg-98873ec365" data-node-id="955:444" data-name="filter-dropdown">
                <p className="fg-54c0c84ef4" dir="auto" data-node-id="955:445">
                  نوع فعالیت
                </p>
                <OrganizationAction className="fg-e3222833ee" data-node-id="955:446" data-name="dropdown-input" label="همه فعالیت‌ها">
                  <div className="fg-5cca20e57d" data-node-id="955:711" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/a7e00a3d.svg" />
                  </div>
                  <p className="fg-638a840835" dir="auto" data-node-id="955:448">
                    همه فعالیت‌ها
                  </p>
                </OrganizationAction>
              </div>
              <div className="fg-98873ec365" data-node-id="955:449" data-name="filter-dropdown">
                <p className="fg-54c0c84ef4" dir="auto" data-node-id="955:450">
                  بازه زمانی
                </p>
                <OrganizationAction className="fg-e3222833ee" data-node-id="955:451" data-name="dropdown-input" label="۱۴۰۳/۰۶/۰۱ تا ۱۴۰۳/۰۷/۱۵">
                  <div className="fg-5cca20e57d" data-node-id="955:717" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/a7e00a3d.svg" />
                  </div>
                  <p className="fg-638a840835" dir="auto" data-node-id="955:453">
                    ۱۴۰۳/۰۶/۰۱ تا ۱۴۰۳/۰۷/۱۵
                  </p>
                </OrganizationAction>
              </div>
            </div>
          </div>
          <div className="fg-a4428f16b8" data-node-id="955:454" data-name="detailed-table-card">
            <div className="fg-153c0a1809" data-node-id="955:455" data-name="table-container">
              <div className="fg-fe92a735d6" data-node-id="955:456" data-name="table-header-row">
                <p className="fg-097e9474ee" dir="auto" data-node-id="955:457">
                  وضعیت
                </p>
                <p className="fg-4a9b73a3b7" dir="auto" data-node-id="955:458">
                  جزئیات
                </p>
                <p className="fg-abfdcc2ea2" dir="auto" data-node-id="955:459">
                  هنرمند
                </p>
                <p className="fg-abfdcc2ea2" dir="auto" data-node-id="955:460">
                  نوع فعالیت
                </p>
                <p className="fg-097e9474ee" dir="auto" data-node-id="955:461">
                  تاریخ
                </p>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="955:462" data-name="table-row-0">
                <div className="fg-d3a9b73303" data-node-id="955:463" data-name="status-col">
                  <div className="fg-2ddf63ac1c" data-node-id="955:464" data-name="badge">
                    <p className="fg-26311c0772" dir="auto" data-node-id="955:465">
                      انجام‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-29f45c629b" dir="auto" data-node-id="955:466">
                  خدمات آموزشی — ۱ اعتبار
                </p>
                <p className="fg-d03303d5d4" dir="auto" data-node-id="955:467">
                  مریم رضایی
                </p>
                <p className="fg-bda68f859c" dir="auto" data-node-id="955:468">
                  مصرف اعتبار
                </p>
                <p className="fg-5091871c55" data-node-id="955:469">
                  ۱۴۰۳/۰۷/۱۲
                </p>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="955:470" data-name="table-row-1">
                <div className="fg-d3a9b73303" data-node-id="955:471" data-name="status-col">
                  <div className="fg-cbc48c3379" data-node-id="955:472" data-name="badge">
                    <p className="fg-1ca1f75c5d" dir="auto" data-node-id="955:473">
                      ارسال‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-29f45c629b" dir="auto" data-node-id="955:474">
                  میناکاری — اصفهان
                </p>
                <p className="fg-d03303d5d4" dir="auto" data-node-id="955:475">
                  نرگس احمدی
                </p>
                <p className="fg-bda68f859c" dir="auto" data-node-id="955:476">
                  معرفی هنرمند
                </p>
                <p className="fg-5091871c55" data-node-id="955:477">
                  ۱۴۰۳/۰۷/۱۰
                </p>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="955:478" data-name="table-row-2">
                <div className="fg-d3a9b73303" data-node-id="955:479" data-name="status-col">
                  <div className="fg-2ddf63ac1c" data-node-id="955:480" data-name="badge">
                    <p className="fg-26311c0772" dir="auto" data-node-id="955:481">
                      فعال
                    </p>
                  </div>
                </div>
                <p className="fg-29f45c629b" dir="auto" data-node-id="955:482">
                  اعتبار خدمات حرفه‌ای
                </p>
                <p className="fg-d03303d5d4" dir="auto" data-node-id="955:483">
                  علی محمدی
                </p>
                <p className="fg-bda68f859c" dir="auto" data-node-id="955:484">
                  فعال‌سازی حمایت
                </p>
                <p className="fg-5091871c55" data-node-id="955:485">
                  ۱۴۰۳/۰۷/۰۵
                </p>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="955:486" data-name="table-row-3">
                <div className="fg-d3a9b73303" data-node-id="955:487" data-name="status-col">
                  <div className="fg-cbc48c3379" data-node-id="955:488" data-name="badge">
                    <p className="fg-1ca1f75c5d" dir="auto" data-node-id="955:489">
                      پذیرفته‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-29f45c629b" dir="auto" data-node-id="955:490">
                  سفالگری — شیراز
                </p>
                <p className="fg-d03303d5d4" dir="auto" data-node-id="955:491">
                  سارا موسوی
                </p>
                <p className="fg-bda68f859c" dir="auto" data-node-id="955:492">
                  پذیرش توسط نگارین
                </p>
                <p className="fg-5091871c55" data-node-id="955:493">
                  ۱۴۰۳/۰۶/۲۸
                </p>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="955:494" data-name="table-row-4">
                <div className="fg-d3a9b73303" data-node-id="955:495" data-name="status-col">
                  <div className="fg-2ddf63ac1c" data-node-id="955:496" data-name="badge">
                    <p className="fg-26311c0772" dir="auto" data-node-id="955:497">
                      انجام‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-29f45c629b" dir="auto" data-node-id="955:498">
                  خدمات بسته‌بندی — ۱ اعتبار
                </p>
                <p className="fg-d03303d5d4" dir="auto" data-node-id="955:499">
                  مریم رضایی
                </p>
                <p className="fg-bda68f859c" dir="auto" data-node-id="955:500">
                  مصرف اعتبار
                </p>
                <p className="fg-5091871c55" data-node-id="955:501">
                  ۱۴۰۳/۰۶/۲۵
                </p>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="955:502" data-name="table-row-5">
                <div className="fg-d3a9b73303" data-node-id="955:503" data-name="status-col">
                  <div className="fg-2ddf63ac1c" data-node-id="955:504" data-name="badge">
                    <p className="fg-26311c0772" dir="auto" data-node-id="955:505">
                      فعال
                    </p>
                  </div>
                </div>
                <p className="fg-29f45c629b" dir="auto" data-node-id="955:506">
                  اعتبار خدمات حرفه‌ای
                </p>
                <p className="fg-d03303d5d4" dir="auto" data-node-id="955:507">
                  مریم رضایی
                </p>
                <p className="fg-bda68f859c" dir="auto" data-node-id="955:508">
                  فعال‌سازی حمایت
                </p>
                <p className="fg-5091871c55" data-node-id="955:509">
                  ۱۴۰۳/۰۶/۲۰
                </p>
              </div>
            </div>
            <div className="fg-9b5dc38ea3" data-node-id="955:510" data-name="pagination-row">
              <div className="fg-9eae8902b4" data-node-id="955:511" data-name="page-indicators">
                <div className="fg-540b0b57aa" data-node-id="955:512" data-name="arrow-left">
                  <div className="fg-5cca20e57d" data-node-id="955:720" data-name="chevron-left">
                    <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/3d19b23d.svg" />
                  </div>
                </div>
                <div className="fg-809462c929" data-node-id="955:514" data-name="page-number-active">
                  <p className="fg-2a2672efd4" data-node-id="955:515">
                    ۱
                  </p>
                </div>
                <div className="fg-540b0b57aa" data-node-id="955:516" data-name="page-number">
                  <p className="fg-96c9a52cd5" data-node-id="955:517">
                    ۲
                  </p>
                </div>
                <div className="fg-540b0b57aa" data-node-id="955:518" data-name="page-number">
                  <p className="fg-96c9a52cd5" data-node-id="955:519">
                    ۳
                  </p>
                </div>
                <div className="fg-540b0b57aa" data-node-id="955:520" data-name="arrow-right">
                  <div className="fg-5cca20e57d" data-node-id="955:723" data-name="chevron-right">
                    <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/c6d01721.svg" />
                  </div>
                </div>
              </div>
              <p className="fg-53a5efc0e6" dir="auto" data-node-id="955:522">
                نمایش ۶ از ۲۴ ردیف گزارش تفصیلی
              </p>
            </div>
          </div>
        </div>
      </div>
      <OrganizationSidebar className="fg-3ec5d2c2c0" data-node-id="955:523" data-name="portal-sidebar">
        <div className="fg-47aacf6d1d" data-node-id="955:524" data-name="brand-header">
          <div className="fg-0629e67c84" data-node-id="955:525" data-name="brand-text">
            <div className="fg-35f9b3d3c7" data-node-id="955:1427" data-name="negarin-logo">
              <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
            </div>
            <p className="fg-013587b973" dir="auto" data-node-id="955:526">
              نگارین
            </p>
            <p className="fg-ff6622b61b" dir="auto" data-node-id="955:527">
              پرتال سازمان حامی
            </p>
          </div>
          <div className="fg-35f9b3d3c7" data-node-id="955:528" data-name="Brand / Negarin Logo">
            <img alt="" className="fg-b5304dc4b2" src="/supporting-organization-assets/530a0f8f.png" />
          </div>
        </div>
        <div className="fg-1831b6b598" data-node-id="955:530" data-name="nav-menu">
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:531" data-name="nav-item-پیشخوان" label="پیشخوان" destination="dashboard">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:532">
              پیشخوان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:533" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/4ec29cb5.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:535" data-name="nav-item-برنامه‌های حمایتی" label="برنامه‌های حمایتی" destination="support-programs">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:536">
              برنامه‌های حمایتی
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:537" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/bd636184.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:539" data-name="nav-item-هنرمندان معرفی‌شده" label="هنرمندان معرفی‌شده" destination="artist-referrals">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:540">
              هنرمندان معرفی‌شده
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:541" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/83c07219.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:543" data-name="nav-item-حمایت‌های من" label="حمایت‌های من" destination="my-supports">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:544">
              حمایت‌های من
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:545" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/bd636184.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-f4b0f3aef1" data-node-id="955:547" data-name="nav-item-گزارش فعالیت" label="گزارش فعالیت" destination="activity-report">
            <p className="fg-084aa3ec29" dir="auto" data-node-id="955:548">
              گزارش فعالیت
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:549" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/892aba84.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:551" data-name="nav-item-اعلان‌ها" label="اعلان‌ها" destination="notifications">
            <div className="fg-8ccbd1898c" data-node-id="955:552" data-name="count-badge">
              <p className="fg-690a7efe84" data-node-id="955:553">
                4
              </p>
            </div>
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:554">
              اعلان‌ها
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:555" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/47b002dc.svg" />
            </div>
          </OrganizationAction>
          <OrganizationAction className="fg-a93f5c1d05" data-node-id="955:557" data-name="nav-item-حساب سازمان" label="حساب سازمان" destination="account">
            <p className="fg-5b6a88efe9" dir="auto" data-node-id="955:558">
              حساب سازمان
            </p>
            <div className="fg-58d29b27c0" data-node-id="955:559" data-name="icon-frame">
              <img alt="" className="fg-8faf267d30" src="/supporting-organization-assets/635bd113.svg" />
            </div>
          </OrganizationAction>
        </div>
        <div className="fg-f6ec52d86e" data-node-id="955:561" data-name="sidebar-footer">
          <div className="fg-c2b55f47f4" data-node-id="955:562" data-name="user-profile">
            <div className="fg-08e95fc79b" data-node-id="955:563" data-name="user-details">
              <p className="fg-9e677605c9" dir="auto" data-node-id="955:564">
                بنیاد فرهنگی آرین
              </p>
              <p className="fg-d4235d1d7b" dir="auto" data-node-id="955:565">
                مدیر حساب
              </p>
            </div>
            <div className="fg-d05a0d0fe8" data-node-id="955:566" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/supporting-organization-assets/a3df46be.png" />
            </div>
          </div>
        </div>
      </OrganizationSidebar>
    </div>
  );
}
