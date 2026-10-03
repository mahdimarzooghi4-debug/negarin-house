// Figma 888:556 — Admin / Orders — Empty
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOrdersEmpty() {
  return (
    <div className="fg-360fef389f" data-node-id="888:556" data-name="Admin / Orders — Empty">
      <div className="fg-708b484433" data-node-id="888:557" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="888:558" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="888:559" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="888:560" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="888:561" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="888:565" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="888:566" data-name="Global Search" label="جستجو" placeholder="جستجو در سفارش‌ها، خریداران، هنرمندان و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="888:567">
                جستجو در سفارش‌ها، خریداران، هنرمندان و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="888:568" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="888:570">
              مدیریت سفارش‌های نگارین
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="888:571" data-name="Scrollable Content">
          <div className="fg-89c5c241e8" data-node-id="888:572" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="888:573" data-name="Frame">
              <div className="fg-34d33d0078" data-node-id="888:574" data-name="Frame">
                <div className="fg-5d45c60578" data-node-id="888:575" data-name="Filter">
                  <p className="fg-4e606cf534" dir="auto" data-node-id="888:576">
                    وضعیت مشکل: دارای خطا ×
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="fg-347137de39" data-node-id="888:577" data-name="Worklist Section">
            <div className="fg-dcd0c3d3f4" data-node-id="888:578" data-name="Empty State Inner">
              <div className="fg-3d51711349" data-node-id="888:903" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/cbe99693.svg" />
              </div>
              <p className="fg-3c2ea8c9ad" dir="auto" data-node-id="888:580">
                سفارشی یافت نشد
              </p>
              <p className="fg-4d2c63efab" dir="auto" data-node-id="888:581">
                هیچ سفارشی مطابق با فیلترهای انتخابی وجود ندارد.
              </p>
              <DesignAction className="fg-7902cb33b7" data-node-id="888:582" data-name="Negarin / Button" label="پاک کردن تمام فیلترها">
                <p className="fg-7ee08abcb6" dir="auto" data-node-id="I888:582;45:11">
                  پاک کردن تمام فیلترها
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-b14d76332e" data-node-id="888:585" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="888:586" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="888:587">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="888:588" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="888:589" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="888:590" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="888:591" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="888:897" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="888:593">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="888:594" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="888:595" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="888:596" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="888:597" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:599">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="888:600" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="888:601" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="888:602" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:604">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:605" data-name="Group-2">
              <DesignAction className="fg-fcc641ace6" data-node-id="888:606" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="888:607" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="888:609">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:610" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="888:611" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="888:612" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:614">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:615" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="888:616" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="888:617" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:619">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:620" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="888:621" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="888:622" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:624">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:625" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="888:626" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="888:627" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:629">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:630" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="888:631" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="888:632" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:634">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:635" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="888:636" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="888:637" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:639">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="888:640" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="888:641" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="888:642">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="888:643">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="888:644" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
