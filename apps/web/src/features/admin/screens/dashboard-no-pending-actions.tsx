// Figma 870:394 — Admin / Dashboard — No Pending Actions
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminDashboardNoPendingActions() {
  return (
    <div className="fg-95cbbbbdb3" data-node-id="870:394" data-name="Admin / Dashboard — No Pending Actions">
      <div className="fg-4d95428dfd" data-node-id="870:396" data-name="Negarin Admin Dashboard Desktop">
        <div className="fg-f7cede9c7c" data-node-id="870:397" data-name="Main Workspace">
          <div className="fg-982b1ce7e4" data-node-id="870:398" data-name="Header">
            <div className="fg-a34c8fe932" data-node-id="870:399" data-name="Left Actions">
              <div className="fg-08c31cb510" data-node-id="870:400" data-name="Staff Profile Circle">
                <img alt="" className="fg-8038e5755b" src="/admin-assets/602925cf.png" />
              </div>
              <DesignAction className="fg-a6f8c7bf2d" data-node-id="870:401" data-name="Notification Bell Button" label="Notification Bell Button">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/cd271c58.svg" />
              </DesignAction>
            </div>
            <div className="fg-460d084997" data-node-id="870:404" data-name="Right Header">
              <DesignField className="fg-bed5bc97c2" data-node-id="870:405" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، محصولات، سفارش‌ها و ...">
                <p className="fg-3a06ee4cfb" dir="auto" data-node-id="870:406">
                  جستجو در هنرمندان، محصولات، سفارش‌ها و ...
                </p>
                <div className="fg-c51752dc8c" data-node-id="870:716" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </DesignField>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="870:408">
                داشبورد عملیات نگارین
              </p>
            </div>
          </div>
          <div className="fg-28892a2677" data-node-id="870:409" data-name="Scrollable Content">
            <div className="fg-867b1b2e34" data-node-id="870:410" data-name="Zeroed Summary">
              <DesignAction className="fg-89dbc7beb5" data-node-id="870:411" data-name="Metric Shortcut" label="۰ درخواست‌های خدمات فعال" destination="service-requests">
                <p className="fg-35aeab7481" data-node-id="870:412">
                  ۰
                </p>
                <p className="fg-8f2e8dbd17" dir="auto" data-node-id="870:413">
                  درخواست‌های خدمات فعال
                </p>
              </DesignAction>
              <DesignAction className="fg-89dbc7beb5" data-node-id="870:414" data-name="Metric Shortcut" label="۰ تسویه‌های در انتظار" destination="settlement-requests">
                <p className="fg-35aeab7481" data-node-id="870:415">
                  ۰
                </p>
                <p className="fg-8f2e8dbd17" dir="auto" data-node-id="870:416">
                  تسویه‌های در انتظار
                </p>
              </DesignAction>
              <DesignAction className="fg-89dbc7beb5" data-node-id="870:417" data-name="Metric Shortcut" label="۰ سفارش‌های نیازمند مداخله" destination="orders-needs-action">
                <p className="fg-35aeab7481" data-node-id="870:418">
                  ۰
                </p>
                <p className="fg-8f2e8dbd17" dir="auto" data-node-id="870:419">
                  سفارش‌های نیازمند مداخله
                </p>
              </DesignAction>
              <DesignAction className="fg-89dbc7beb5" data-node-id="870:420" data-name="Metric Shortcut" label="۰ بررسی‌های باز" destination="product-review-queue">
                <p className="fg-35aeab7481" data-node-id="870:421">
                  ۰
                </p>
                <p className="fg-8f2e8dbd17" dir="auto" data-node-id="870:422">
                  بررسی‌های باز
                </p>
              </DesignAction>
            </div>
            <div className="fg-c7a881f669" data-node-id="870:423" data-name="Worklist Section">
              <p className="fg-4f3073a855" dir="auto" data-node-id="870:424">
                نیازمند اقدام
              </p>
              <div className="fg-d991c66d37" data-node-id="870:425" data-name="Empty State Inner">
                <div className="fg-82600f4c4b" data-node-id="870:426" data-name="Success Ring">
                  <div className="fg-f84de76785" data-node-id="870:794" data-name="check-circle">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/11da885e.svg" />
                  </div>
                </div>
                <p className="fg-595646e4fb" dir="auto" data-node-id="870:428">
                  همه موارد بررسی شده‌اند
                </p>
                <p className="fg-a9aa6f2769" dir="auto" data-node-id="870:429">
                  هیچ کار معلقی در صف رسیدگی شما وجود ندارد. روز خوبی داشته باشید!
                </p>
              </div>
            </div>
            <div className="fg-243899f592" data-node-id="870:430" data-name="Active Flows Row">
              <p className="fg-224af4107d" dir="auto" data-node-id="870:431">
                جریان‌های فعال سیستم
              </p>
              <div className="fg-0bab63b93d" data-node-id="870:432" data-name="Flows Container">
                <DesignAction className="fg-c32a7b0ac8" data-node-id="870:433" data-name="Flow Card" label="مسائل سفارش ● ۰ مورد باز" destination="order-issues">
                  <p className="fg-f9065292ba" dir="auto" data-node-id="870:434">
                    مسائل سفارش
                  </p>
                  <div className="fg-7ced9ecbbc" data-node-id="870:435" data-name="Value Group">
                    <p className="fg-58d61dbfc5" data-node-id="870:436">
                      ●
                    </p>
                    <p className="fg-6c1fe9d28c" dir="auto" data-node-id="870:437">
                      ۰ مورد باز
                    </p>
                  </div>
                </DesignAction>
                <DesignAction className="fg-c32a7b0ac8" data-node-id="870:438" data-name="Flow Card" label="تسویه‌ها ● ۰ درخواست فعال" destination="settlement-requests">
                  <p className="fg-f9065292ba" dir="auto" data-node-id="870:439">
                    تسویه‌ها
                  </p>
                  <div className="fg-7ced9ecbbc" data-node-id="870:440" data-name="Value Group">
                    <p className="fg-58d61dbfc5" data-node-id="870:441">
                      ●
                    </p>
                    <p className="fg-6c1fe9d28c" dir="auto" data-node-id="870:442">
                      ۰ درخواست فعال
                    </p>
                  </div>
                </DesignAction>
                <DesignAction className="fg-c32a7b0ac8" data-node-id="870:443" data-name="Flow Card" label="مدارک حرفه‌ای ● ۰ مورد در انتظار" destination="order-issues">
                  <p className="fg-f9065292ba" dir="auto" data-node-id="870:444">
                    مدارک حرفه‌ای
                  </p>
                  <div className="fg-7ced9ecbbc" data-node-id="870:445" data-name="Value Group">
                    <p className="fg-58d61dbfc5" data-node-id="870:446">
                      ●
                    </p>
                    <p className="fg-6c1fe9d28c" dir="auto" data-node-id="870:447">
                      ۰ مورد در انتظار
                    </p>
                  </div>
                </DesignAction>
                <DesignAction className="fg-c32a7b0ac8" data-node-id="870:448" data-name="Flow Card" label="بررسی محصولات ● ۰ مورد در صف" destination="product-review-queue">
                  <p className="fg-f9065292ba" dir="auto" data-node-id="870:449">
                    بررسی محصولات
                  </p>
                  <div className="fg-7ced9ecbbc" data-node-id="870:450" data-name="Value Group">
                    <p className="fg-58d61dbfc5" data-node-id="870:451">
                      ●
                    </p>
                    <p className="fg-6c1fe9d28c" dir="auto" data-node-id="870:452">
                      ۰ مورد در صف
                    </p>
                  </div>
                </DesignAction>
              </div>
            </div>
            <div className="fg-153c0a1809" data-node-id="870:453" data-name="Ecosystem Grid Section">
              <div className="fg-88379b3ff7" data-node-id="870:454" data-name="Eco Tile">
                <p className="fg-537045f06d" data-node-id="870:455">
                  ۸۴۲
                </p>
                <p className="fg-d3f6cdc950" dir="auto" data-node-id="870:456">
                  هنرمندان فعال
                </p>
              </div>
            </div>
          </div>
        </div>
        <AdminSidebar className="fg-1ae6468b1f" data-node-id="870:457" data-name="Sidebar">
          <div className="fg-bfcc56511d" data-node-id="870:458" data-name="Brand">
            <p className="fg-013587b973" dir="auto" data-node-id="870:459">
              خانه نگارین
            </p>
            <div className="fg-85567f1031" data-node-id="870:460" data-name="Logo Container">
              <div className="fg-842ae29a35" data-node-id="880:4" data-name="Brand / Negarin Logo">
                <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
              </div>
            </div>
          </div>
          <div className="fg-47d4dde56b" data-node-id="870:462" data-name="Navigation">
            <DesignAction className="fg-4a871e0b11" data-node-id="870:463" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
              <div className="fg-c51752dc8c" data-node-id="870:464" data-name="Dashboard Icon">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/2f386285.svg" />
              </div>
              <p className="fg-6abfcd3772" dir="auto" data-node-id="870:465">
                داشبورد
              </p>
            </DesignAction>
            <div className="fg-b9552021d1" data-node-id="870:466" data-name="Nav Groups">
              <div className="fg-3f106e1f96" data-node-id="870:467" data-name="Group-0">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:468" data-name="Group Header" label="هنرمندان" destination="artists">
                  <div className="fg-fc08538add" data-node-id="870:719" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:470">
                    هنرمندان
                  </p>
                </DesignAction>
              </div>
              <div className="fg-239f54e425" data-node-id="870:471" data-name="Group-1">
                <DesignAction className="fg-95957b1f9c" data-node-id="870:472" data-name="Group Header" label="بازار" destination="products">
                  <div className="fg-fc08538add" data-node-id="870:722" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:474">
                    بازار
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:475" data-name="Group-2">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:476" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                  <div className="fg-fc08538add" data-node-id="870:725" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:478">
                    سفارش و ارسال
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:479" data-name="Group-3">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:480" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                  <div className="fg-fc08538add" data-node-id="870:728" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:482">
                    رشد و خدمات
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:483" data-name="Group-4">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:484" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                  <div className="fg-fc08538add" data-node-id="870:731" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:486">
                    فرصت‌ها
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:487" data-name="Group-5">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:488" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                  <div className="fg-fc08538add" data-node-id="870:734" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:490">
                    مالی و عضویت
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:491" data-name="Group-6">
                <div className="fg-558da3a1d5" data-node-id="870:492" data-name="Group Header">
                  <div className="fg-fc08538add" data-node-id="870:737" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:494">
                    بین‌الملل
                  </p>
                </div>
              </div>
              <div className="fg-3f106e1f96" data-node-id="874:13" data-name="Group-7">
                <DesignAction className="fg-558da3a1d5" data-node-id="874:14" data-name="Group Header" label="گزارش‌ها" destination="reports">
                  <div className="fg-fc08538add" data-node-id="874:15" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="874:17">
                    گزارش‌ها
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="874:18" data-name="Group-8">
                <DesignAction className="fg-558da3a1d5" data-node-id="874:19" data-name="Group Header" label="تنظیمات" destination="settings">
                  <div className="fg-fc08538add" data-node-id="874:20" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="874:22">
                    تنظیمات
                  </p>
                </DesignAction>
              </div>
            </div>
          </div>
          <div className="fg-2f3d1bdf48" data-node-id="870:495" data-name="Staff Profile">
            <div className="fg-0d2351e917" data-node-id="870:496" data-name="Profile Details">
              <p className="fg-7ec414a4a7" dir="auto" data-node-id="870:497">
                کارشناس عملیات
              </p>
              <p className="fg-80235ae490" dir="auto" data-node-id="870:498">
                مدیر عملیات سیستم
              </p>
            </div>
            <div className="fg-3dfce0fd89" data-node-id="870:499" data-name="Staff Avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/fa5460f5.png" />
            </div>
          </div>
        </AdminSidebar>
      </div>
    </div>
  );
}
