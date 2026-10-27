// Figma 888:465 — Admin / Orders — Loading
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOrdersLoading() {
  return (
    <div className="fg-360fef389f" data-node-id="888:465" data-name="Admin / Orders — Loading">
      <div className="fg-708b484433" data-node-id="888:466" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="888:467" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="888:468" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="888:469" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="888:470" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="888:474" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="888:475" data-name="Global Search" label="جستجو" placeholder="جستجو در سفارش‌ها، خریداران، هنرمندان و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="888:476">
                جستجو در سفارش‌ها، خریداران، هنرمندان و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="888:477" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="888:479">
              مدیریت سفارش‌های نگارین
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="888:480" data-name="Scrollable Content">
          <div className="fg-0bab63b93d" data-node-id="888:481" data-name="Loading Summary">
            <div className="fg-07ea3dde9a" data-node-id="888:482" data-name="Frame" />
            <div className="fg-07ea3dde9a" data-node-id="888:483" data-name="Frame" />
            <div className="fg-07ea3dde9a" data-node-id="888:484" data-name="Frame" />
            <div className="fg-07ea3dde9a" data-node-id="888:485" data-name="Frame" />
          </div>
          <div className="fg-c7a881f669" data-node-id="888:486" data-name="Worklist Section">
            <p className="fg-5f8b9f0bac" dir="auto" data-node-id="888:487">
              نیازمند اقدام
            </p>
            <div className="fg-dd3ded27c3" data-node-id="888:488" data-name="Table Wrapper">
              <div className="fg-756a8ed86f" data-node-id="888:489" data-name="Frame">
                <div className="fg-2a5f6b7b04" data-node-id="888:490" data-name="Rectangle" />
                <div className="fg-d9957121ff" data-node-id="888:491" data-name="Rectangle" />
                <div className="fg-d9957121ff" data-node-id="888:492" data-name="Rectangle" />
                <div className="fg-d9957121ff" data-node-id="888:493" data-name="Rectangle" />
                <div className="fg-d9957121ff" data-node-id="888:494" data-name="Rectangle" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-b14d76332e" data-node-id="888:495" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="888:496" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="888:497">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="888:498" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="888:499" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="888:500" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="888:501" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="888:894" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="888:503">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="888:504" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="888:505" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="888:506" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="888:507" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:509">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="888:510" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="888:511" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="888:512" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:514">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:515" data-name="Group-2">
              <DesignAction className="fg-fcc641ace6" data-node-id="888:516" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="888:517" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="888:519">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:520" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="888:521" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="888:522" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:524">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:525" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="888:526" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="888:527" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:529">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:530" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="888:531" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="888:532" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:534">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:535" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="888:536" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="888:537" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:539">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:540" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="888:541" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="888:542" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:544">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:545" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="888:546" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="888:547" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:549">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="888:550" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="888:551" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="888:552">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="888:553">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="888:554" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
