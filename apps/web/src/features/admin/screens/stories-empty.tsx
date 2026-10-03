// Figma 894:5982 — Admin / Stories — Empty
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStoriesEmpty() {
  return (
    <div className="fg-9917a372d9" data-node-id="894:5982" data-name="Admin / Stories — Empty">
      <div className="fg-f7cede9c7c" data-node-id="894:6038" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:6039" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:6040" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:6041" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/d50e68e3.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:6042" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:6045" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:6046" data-name="Global Search" label="جستجو" placeholder="جستجو در استوری‌ها، هنرمندان، محصولات و ...">
              <p className="fg-f68c5e162d" dir="auto" data-node-id="894:6047">
                جستجو در استوری‌ها، هنرمندان، محصولات و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:6440" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:6049">
              مدیریت استوری‌های هنرمندان
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:6050" data-name="Scrollable Content">
          <div className="fg-df4057f7e5" data-node-id="894:6051" data-name="Filters Strip">
            <div className="fg-ad50363799" data-node-id="894:6052" data-name="Left Filters">
              <div className="fg-709fb60e1b" data-node-id="894:6053" data-name="Active Filter Tag">
                <div className="fg-fc08538add" data-node-id="894:6443" data-name="x-circle">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f940a871.svg" />
                </div>
                <p className="fg-a488e25b43" dir="auto" data-node-id="894:6055">
                  وضعیت انتشار: پیش‌نویس
                </p>
              </div>
              <div className="fg-a3b2a587b5" data-node-id="894:6056" data-name="Filter">
                <p className="fg-899c8bd72f" dir="auto" data-node-id="894:6057">
                  نوع محتوا
                </p>
              </div>
              <div className="fg-a3b2a587b5" data-node-id="894:6058" data-name="Filter">
                <p className="fg-899c8bd72f" dir="auto" data-node-id="894:6059">
                  وضعیت بررسی
                </p>
              </div>
            </div>
            <DesignField className="fg-8fa0f7fc5c" data-node-id="894:6060" data-name="Right Search" label="جستجو" placeholder="جستجو در استوری‌ها...">
              <p className="fg-f68c5e162d" dir="auto" data-node-id="894:6061">
                جستجو در استوری‌ها...
              </p>
            </DesignField>
          </div>
          <div className="fg-347137de39" data-node-id="894:6062" data-name="Worklist Section">
            <div className="fg-1030b1d12c" data-node-id="894:6063" data-name="Empty State Inner">
              <div className="fg-5c5322c0d9" data-node-id="894:6064" data-name="Icon Container">
                <div className="fg-f84de76785" data-node-id="894:6527" data-name="image-off">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/18712661.svg" />
                </div>
              </div>
              <div className="fg-81c6ff72a8" data-node-id="894:6066" data-name="Text Group">
                <p className="fg-4504ee7a2f" dir="auto" data-node-id="894:6067">
                  استوری‌ای یافت نشد
                </p>
                <p className="fg-ae185ab569" dir="auto" data-node-id="894:6068">
                  هیچ استوری ثبت‌شده‌ای با فیلترهای انتخاب‌شده شما همخوانی ندارد.
                </p>
              </div>
              <DesignAction className="fg-2b2896228f" data-node-id="894:6069" data-name="Clear Filter Button" label="پاک کردن تمام فیلترها">
                <p className="fg-31b19a5ba7" dir="auto" data-node-id="894:6070">
                  پاک کردن تمام فیلترها
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:5983" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:5984" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:5985">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="894:5986" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:5987" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:5988" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:5989" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:6404" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:5991">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-f3a73e70c3" data-node-id="894:5992" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:5993" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="894:5994" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:6407" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5996">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:5997" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="894:5998" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:6410" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6000">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6001" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6002" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:6413" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6004">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6009" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6010" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:6419" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6012">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6013" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6014" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:6422" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6016">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6017" data-name="Group-6">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6018" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:6425" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6020">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6021" data-name="Group-7">
              <div className="fg-9e3538324e" data-node-id="894:6022" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:6428" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6024">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6025" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6026" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:6431" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6028">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6029" data-name="Group-9">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6030" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:6434" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6032">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:6033" data-name="Staff Profile">
          <div className="fg-15b486e966" data-node-id="894:6034" data-name="Profile Details">
            <p className="fg-fe647e601f" dir="auto" data-node-id="894:6035">
              کارشناس محتوا
            </p>
            <p className="fg-a9d1c863d0" dir="auto" data-node-id="894:6036">
              مدیر بررسی استوری‌ها
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:6037" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/861a7d2a.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
