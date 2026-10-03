// Figma 888:646 — Admin / Orders — Error
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOrdersError() {
  return (
    <div className="fg-360fef389f" data-node-id="888:646" data-name="Admin / Orders — Error">
      <div className="fg-708b484433" data-node-id="888:647" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="888:648" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="888:649" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="888:650" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="888:651" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="888:655" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="888:656" data-name="Global Search" label="جستجو" placeholder="جستجو در سفارش‌ها، خریداران، هنرمندان و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="888:657">
                جستجو در سفارش‌ها، خریداران، هنرمندان و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="888:658" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="888:660">
              مدیریت سفارش‌های نگارین
            </p>
          </div>
        </div>
        <div className="fg-3790a374a3" data-node-id="888:661" data-name="Scrollable Content">
          <div className="fg-f2d6d7c62a" data-node-id="888:662" data-name="Error Main">
            <div className="fg-3d51711349" data-node-id="888:900" data-name="Android / Battery">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/1f58c05c.svg" />
            </div>
            <p className="fg-4f2ed0e116" dir="auto" data-node-id="888:664">
              خطا در بارگذاری اطلاعات
            </p>
            <p className="fg-4d2c63efab" dir="auto" data-node-id="888:665">
              برقراری ارتباط با سرور با مشکل مواجه شد. لطفاً اتصال اینترنت خود را بررسی نمایید.
            </p>
            <DesignAction className="fg-7902cb33b7" data-node-id="888:666" data-name="Negarin / Button" label="تلاش مجدد" destination="orders">
              <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:666;45:11">
                تلاش مجدد
              </p>
            </DesignAction>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-b14d76332e" data-node-id="888:669" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="888:670" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="888:671">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="888:672" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="888:673" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="888:674" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="888:675" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="888:906" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="888:677">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="888:678" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="888:679" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="888:680" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="888:681" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:683">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="888:684" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="888:685" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="888:686" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:688">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:689" data-name="Group-2">
              <DesignAction className="fg-fcc641ace6" data-node-id="888:690" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="888:691" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="888:693">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:694" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="888:695" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="888:696" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:698">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:699" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="888:700" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="888:701" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:703">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:704" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="888:705" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="888:706" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:708">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:709" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="888:710" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="888:711" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:713">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:714" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="888:715" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="888:716" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:718">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:719" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="888:720" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="888:721" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:723">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="888:724" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="888:725" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="888:726">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="888:727">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="888:728" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
