// Figma 870:618 — Admin / Dashboard — Error
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminDashboardError() {
  return (
    <div className="fg-95cbbbbdb3" data-node-id="870:618" data-name="Admin / Dashboard — Error">
      <div className="fg-4d95428dfd" data-node-id="870:620" data-name="Negarin Admin Dashboard Desktop">
        <div className="fg-f7cede9c7c" data-node-id="870:621" data-name="Main Workspace">
          <div className="fg-982b1ce7e4" data-node-id="870:622" data-name="Header">
            <div className="fg-a34c8fe932" data-node-id="870:623" data-name="Left Actions">
              <div className="fg-08c31cb510" data-node-id="870:624" data-name="Staff Profile Circle">
                <img alt="" className="fg-8038e5755b" src="/admin-assets/10ca501c.png" />
              </div>
              <DesignAction className="fg-a6f8c7bf2d" data-node-id="870:625" data-name="Notification Bell Button" label="Notification Bell Button">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/cd271c58.svg" />
              </DesignAction>
            </div>
            <div className="fg-460d084997" data-node-id="870:628" data-name="Right Header">
              <DesignField className="fg-bed5bc97c2" data-node-id="870:629" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، محصولات، سفارش‌ها و ...">
                <p className="fg-3a06ee4cfb" dir="auto" data-node-id="870:630">
                  جستجو در هنرمندان، محصولات، سفارش‌ها و ...
                </p>
                <div className="fg-c51752dc8c" data-node-id="870:770" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </DesignField>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="870:632">
                داشبورد عملیات نگارین
              </p>
            </div>
          </div>
          <div className="fg-3790a374a3" data-node-id="870:633" data-name="Scrollable Content">
            <div className="fg-d4d4f74c67" data-node-id="870:634" data-name="Error Main">
              <div className="fg-5dcfdcaff5" data-node-id="870:635" data-name="Error Icon Container">
                <div className="fg-f84de76785" data-node-id="870:809" data-name="alert-triangle">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3e713171.svg" />
                </div>
              </div>
              <p className="fg-595646e4fb" dir="auto" data-node-id="870:637">
                خطا در بارگذاری اطلاعات پیشخوان
              </p>
              <p className="fg-a9aa6f2769" dir="auto" data-node-id="870:638">
                سیستم با مشکل ارتباط با سرور مواجه شد. لطفاً دوباره تلاش کنید.
              </p>
              <DesignAction className="fg-7902cb33b7" data-node-id="870:639" data-name="Negarin / Button" label="تلاش مجدد" destination="dashboard">
                <p className="fg-7ee08abcb6" dir="auto" data-node-id="I870:639;45:11">
                  تلاش مجدد
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <AdminSidebar className="fg-1ae6468b1f" data-node-id="870:642" data-name="Sidebar">
          <div className="fg-bfcc56511d" data-node-id="870:643" data-name="Brand">
            <p className="fg-013587b973" dir="auto" data-node-id="870:644">
              خانه نگارین
            </p>
            <div className="fg-85567f1031" data-node-id="870:645" data-name="Logo Container">
              <div className="fg-842ae29a35" data-node-id="880:6" data-name="Brand / Negarin Logo">
                <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
              </div>
            </div>
          </div>
          <div className="fg-47d4dde56b" data-node-id="870:647" data-name="Navigation">
            <DesignAction className="fg-4a871e0b11" data-node-id="870:648" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
              <div className="fg-c51752dc8c" data-node-id="870:649" data-name="Dashboard Icon">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/2f386285.svg" />
              </div>
              <p className="fg-6abfcd3772" dir="auto" data-node-id="870:650">
                داشبورد
              </p>
            </DesignAction>
            <div className="fg-b9552021d1" data-node-id="870:651" data-name="Nav Groups">
              <div className="fg-3f106e1f96" data-node-id="870:652" data-name="Group-0">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:653" data-name="Group Header" label="هنرمندان" destination="artists">
                  <div className="fg-fc08538add" data-node-id="870:773" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:655">
                    هنرمندان
                  </p>
                </DesignAction>
              </div>
              <div className="fg-239f54e425" data-node-id="870:656" data-name="Group-1">
                <DesignAction className="fg-95957b1f9c" data-node-id="870:657" data-name="Group Header" label="بازار" destination="products">
                  <div className="fg-fc08538add" data-node-id="870:776" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:659">
                    بازار
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:660" data-name="Group-2">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:661" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                  <div className="fg-fc08538add" data-node-id="870:779" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:663">
                    سفارش و ارسال
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:664" data-name="Group-3">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:665" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                  <div className="fg-fc08538add" data-node-id="870:782" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:667">
                    رشد و خدمات
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:668" data-name="Group-4">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:669" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                  <div className="fg-fc08538add" data-node-id="870:785" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:671">
                    فرصت‌ها
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:672" data-name="Group-5">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:673" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                  <div className="fg-fc08538add" data-node-id="870:788" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:675">
                    مالی و عضویت
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:676" data-name="Group-6">
                <div className="fg-558da3a1d5" data-node-id="870:677" data-name="Group Header">
                  <div className="fg-fc08538add" data-node-id="870:791" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:679">
                    بین‌الملل
                  </p>
                </div>
              </div>
              <div className="fg-3f106e1f96" data-node-id="874:33" data-name="Group-7">
                <DesignAction className="fg-558da3a1d5" data-node-id="874:34" data-name="Group Header" label="گزارش‌ها" destination="reports">
                  <div className="fg-fc08538add" data-node-id="874:35" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="874:37">
                    گزارش‌ها
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="874:38" data-name="Group-8">
                <DesignAction className="fg-558da3a1d5" data-node-id="874:39" data-name="Group Header" label="تنظیمات" destination="settings">
                  <div className="fg-fc08538add" data-node-id="874:40" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="874:42">
                    تنظیمات
                  </p>
                </DesignAction>
              </div>
            </div>
          </div>
          <div className="fg-2f3d1bdf48" data-node-id="870:680" data-name="Staff Profile">
            <div className="fg-0d2351e917" data-node-id="870:681" data-name="Profile Details">
              <p className="fg-7ec414a4a7" dir="auto" data-node-id="870:682">
                کارشناس عملیات
              </p>
              <p className="fg-80235ae490" dir="auto" data-node-id="870:683">
                مدیر عملیات سیستم
              </p>
            </div>
            <div className="fg-3dfce0fd89" data-node-id="870:684" data-name="Staff Avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/b384eacb.png" />
            </div>
          </div>
        </AdminSidebar>
      </div>
    </div>
  );
}
