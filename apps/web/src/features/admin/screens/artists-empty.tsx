// Figma 884:586 — Admin / Artists — Empty
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminArtistsEmpty() {
  return (
    <div className="fg-360fef389f" data-node-id="884:586" data-name="Admin / Artists — Empty">
      <div className="fg-f7cede9c7c" data-node-id="884:647" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="884:648" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="884:649" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="884:650" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="884:651" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/72b768a8.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="884:655" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="884:656" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، محصولات، سفارش‌ها و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="884:657">
                جستجو در هنرمندان، محصولات، سفارش‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="884:658" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="884:660">
              مدیریت هنرمندان نگارین
            </p>
          </div>
        </div>
        <div className="fg-3790a374a3" data-node-id="884:661" data-name="Scrollable Content">
          <div className="fg-d7ea37967a" data-node-id="884:662" data-name="Empty State Card">
            <div className="fg-ce9cdda2b8" data-node-id="884:663" data-name="Frame">
              <div className="fg-19efab1ec1" data-node-id="884:950" data-name="user-x">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/d1fa3c8e.svg" />
              </div>
            </div>
            <p className="fg-3c2ea8c9ad" dir="auto" data-node-id="884:665">
              هنرمندی یافت نشد
            </p>
            <p className="fg-1de467dad1" dir="auto" data-node-id="884:666">
              هیچ هنرمندی مطابق با فیلترهای انتخابی وجود ندارد. لطفا فیلترهای خود را تغییر دهید و دوباره تلاش کنید.
            </p>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="884:587" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="884:588" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="884:589">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="884:590" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="884:591" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="884:592" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="884:593" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="884:594" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/a4cc0b99.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="884:595">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="884:596" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="884:597" data-name="Group-0">
              <DesignAction className="fg-fcc641ace6" data-node-id="884:598" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="884:599" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="884:601">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="884:602" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="884:603" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="884:604" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:606">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:607" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="884:608" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="884:609" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:611">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:612" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="884:613" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="884:614" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:616">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:617" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="884:618" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="884:619" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:621">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:622" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="884:623" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="884:624" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:626">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:627" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="884:628" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="884:629" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:631">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:632" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="884:633" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="884:634" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:636">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:637" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="884:638" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="884:639" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:641">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="884:642" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="884:643" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="884:644">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="884:645">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="884:646" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
