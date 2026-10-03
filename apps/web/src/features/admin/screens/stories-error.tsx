// Figma 894:6071 — Admin / Stories — Error
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStoriesError() {
  return (
    <div className="fg-9917a372d9" data-node-id="894:6071" data-name="Admin / Stories — Error">
      <div className="fg-f7cede9c7c" data-node-id="894:6127" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:6128" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:6129" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:6130" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/10b3ab60.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:6131" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:6134" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:6135" data-name="Global Search" label="جستجو" placeholder="جستجو در استوری‌ها، هنرمندان، محصولات و ...">
              <p className="fg-f68c5e162d" dir="auto" data-node-id="894:6136">
                جستجو در استوری‌ها، هنرمندان، محصولات و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:6482" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:6138">
              خطای سیستم
            </p>
          </div>
        </div>
        <div className="fg-3790a374a3" data-node-id="894:6139" data-name="Scrollable Content">
          <div className="fg-78a05598ea" data-node-id="894:6140" data-name="Error Main">
            <div className="fg-b313850ea1" data-node-id="894:6141" data-name="Icon Container">
              <div className="fg-842ae29a35" data-node-id="894:6485" data-name="alert-triangle">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/51b3f351.svg" />
              </div>
            </div>
            <div className="fg-81c6ff72a8" data-node-id="894:6143" data-name="Text Group">
              <p className="fg-9fa0557c84" dir="auto" data-node-id="894:6144">
                خطا در بارگذاری اطلاعات
              </p>
              <p className="fg-ae185ab569" dir="auto" data-node-id="894:6145">
                ارتباط با سرور نگارین برقرار نشد. لطفا اتصال اینترنت خود را بررسی کنید.
              </p>
            </div>
            <DesignAction className="fg-6142a37d09" data-node-id="894:6146" data-name="Retry Button" label="تلاش مجدد" destination="stories">
              <p className="fg-31b19a5ba7" dir="auto" data-node-id="894:6147">
                تلاش مجدد
              </p>
            </DesignAction>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:6072" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:6073" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:6074">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="894:6075" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:6076" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:6077" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:6078" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:6446" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:6080">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-f3a73e70c3" data-node-id="894:6081" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:6082" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6083" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:6449" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6085">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:6086" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="894:6087" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:6452" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6089">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6090" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6091" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:6455" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6093">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6098" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6099" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:6461" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6101">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6102" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6103" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:6464" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6105">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6106" data-name="Group-6">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6107" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:6467" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6109">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6110" data-name="Group-7">
              <div className="fg-9e3538324e" data-node-id="894:6111" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:6470" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6113">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6114" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6115" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:6473" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6117">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6118" data-name="Group-9">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6119" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:6476" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6121">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:6122" data-name="Staff Profile">
          <div className="fg-15b486e966" data-node-id="894:6123" data-name="Profile Details">
            <p className="fg-fe647e601f" dir="auto" data-node-id="894:6124">
              کارشناس محتوا
            </p>
            <p className="fg-a9d1c863d0" dir="auto" data-node-id="894:6125">
              مدیر بررسی استوری‌ها
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:6126" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a51fab29.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
