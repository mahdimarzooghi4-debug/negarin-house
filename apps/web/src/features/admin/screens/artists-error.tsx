// Figma 884:668 — Admin / Artists — Error
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminArtistsError() {
  return (
    <div className="fg-360fef389f" data-node-id="884:668" data-name="Admin / Artists — Error">
      <div className="fg-f7cede9c7c" data-node-id="884:729" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="884:730" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="884:731" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="884:732" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="884:733" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/72b768a8.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="884:737" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="884:738" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، محصولات، سفارش‌ها و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="884:739">
                جستجو در هنرمندان، محصولات، سفارش‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="884:740" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="884:742">
              مدیریت هنرمندان نگارین
            </p>
          </div>
        </div>
        <div className="fg-3790a374a3" data-node-id="884:743" data-name="Scrollable Content">
          <div className="fg-8bdb6b29ba" data-node-id="884:744" data-name="Error Card">
            <div className="fg-451140d17a" data-node-id="884:745" data-name="Frame">
              <div className="fg-19efab1ec1" data-node-id="884:953" data-name="alert-triangle">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/39c00078.svg" />
              </div>
            </div>
            <div className="fg-81c6ff72a8" data-node-id="884:747" data-name="Frame">
              <p className="fg-7eaf916cfc" dir="auto" data-node-id="884:748">
                خطا در بارگذاری اطلاعات
              </p>
              <p className="fg-e1899e3185" dir="auto" data-node-id="884:749">
                سیستم با مشکل ارتباط با سرور مواجه شد. لطفاً دوباره تلاش کنید.
              </p>
            </div>
            <div className="fg-34b3325de5" data-node-id="884:750" data-name="Frame">
              <p className="fg-31b19a5ba7" dir="auto" data-node-id="884:751">
                تلاش مجدد
              </p>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="884:669" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="884:670" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="884:671">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="884:672" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="884:673" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="884:674" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="884:675" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="884:676" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/a4cc0b99.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="884:677">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="884:678" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="884:679" data-name="Group-0">
              <DesignAction className="fg-fcc641ace6" data-node-id="884:680" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="884:681" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="884:683">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="884:684" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="884:685" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="884:686" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:688">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:689" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="884:690" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="884:691" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:693">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:694" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="884:695" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="884:696" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:698">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:699" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="884:700" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="884:701" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:703">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:704" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="884:705" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="884:706" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:708">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:709" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="884:710" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="884:711" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:713">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:714" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="884:715" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="884:716" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:718">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:719" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="884:720" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="884:721" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:723">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="884:724" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="884:725" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="884:726">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="884:727">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="884:728" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
