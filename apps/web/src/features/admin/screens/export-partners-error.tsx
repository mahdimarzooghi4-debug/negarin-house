// Figma 899:680 — Admin / Export Partners — Error
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminExportPartnersError() {
  return (
    <div className="fg-360fef389f" data-node-id="899:680" data-name="Admin / Export Partners — Error">
      <div className="fg-708b484433" data-node-id="899:681" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="899:682" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="899:683" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="899:684" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="899:685" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="899:689" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="899:690" data-name="Global Search" label="جستجو" placeholder="تلاش مجدد...">
              <p className="fg-ec988b1348" dir="auto" data-node-id="899:691">
                تلاش مجدد...
              </p>
              <div className="fg-c51752dc8c" data-node-id="899:692" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <div className="fg-e8210ba625" data-node-id="899:694" data-name="Title Block">
              <p className="fg-99f699cdc3" dir="auto" data-node-id="899:695">
                خطای سیستم
              </p>
            </div>
          </div>
        </div>
        <div className="fg-82ef0f7123" data-node-id="899:696" data-name="Main Layout">
          <div className="fg-fb73a74366" data-node-id="899:697" data-name="Scrollable Content">
            <div className="fg-ed2ac530de" data-node-id="899:698" data-name="Error Main">
              <div className="fg-dd48e8f44b" data-node-id="899:699" data-name="Error Icon Wrapper">
                <div className="fg-842ae29a35" data-node-id="899:788" data-name="alert-triangle">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/51b3f351.svg" />
                </div>
              </div>
              <div className="fg-eb1a799c25" data-node-id="899:701" data-name="Error Message">
                <p className="fg-957b6355c0" dir="auto" data-node-id="899:702">
                  خطا در بارگذاری اطلاعات
                </p>
                <p className="fg-aba06bc9b3" dir="auto" data-node-id="899:703">
                  در برقراری ارتباط با سرور و دریافت لیست شرکای صادراتی خطایی رخ داده است.
                </p>
              </div>
              <div className="fg-9708e8d183" data-node-id="899:704" data-name="Action Group">
                <DesignAction className="fg-72f7ce2aa8" data-node-id="899:705" data-name="Support Button" label="تماس با پشتیبانی فنی">
                  <p className="fg-0edaeac592" dir="auto" data-node-id="899:706">
                    تماس با پشتیبانی فنی
                  </p>
                </DesignAction>
                <DesignAction className="fg-58de45c893" data-node-id="899:707" data-name="Retry Button" label="تلاش مجدد" destination="export-partners">
                  <p className="fg-8ffc872800" dir="auto" data-node-id="899:708">
                    تلاش مجدد
                  </p>
                </DesignAction>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-b14d76332e" data-node-id="899:709" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="899:710" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="899:711">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="899:712" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:273" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="899:714" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="899:715" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="899:785" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="899:717">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="899:718" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="899:719" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:720" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="899:721" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:723">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="899:724" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="899:725" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="899:726" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:728">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:729" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:730" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="899:731" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:733">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:734" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:735" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="899:736" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:738">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:739" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:740" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="899:741" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:743">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:744" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:745" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="899:746" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:748">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:749" data-name="Group-6">
              <div className="fg-9dda82322e" data-node-id="899:750" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="899:751" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="899:753">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:754" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:755" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="899:756" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:758">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:759" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:760" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="899:761" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:763">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="899:764" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="899:765" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="899:766">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="899:767">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="899:768" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
