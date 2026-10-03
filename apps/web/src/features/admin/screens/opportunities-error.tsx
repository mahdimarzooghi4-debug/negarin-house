// Figma 894:695 — Admin / Opportunities — Error
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOpportunitiesError() {
  return (
    <div className="fg-360fef389f" data-node-id="894:695" data-name="Admin / Opportunities — Error">
      <div className="fg-f7cede9c7c" data-node-id="894:696" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:697" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:698" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:699" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/1087bb6a.png" />
            </div>
            <DesignAction className="fg-328252374d" data-node-id="894:700" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="894:701" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-6c36c0b5c6" data-node-id="894:702" data-name="Icon-Wrapper">
                <div className="fg-58d29b27c0" data-node-id="894:1089" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/4e203f5d.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:704" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:705" data-name="Global Search" label="جستجو" placeholder="جستجو در فرصت‌ها، هنرمندان و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:706">
                جستجو در فرصت‌ها، هنرمندان و ...
              </p>
              <div className="fg-f422037977" data-node-id="894:707" data-name="Icon-Wrapper">
                <div className="fg-c51752dc8c" data-node-id="894:1092" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:709">
              خطای سیستم
            </p>
          </div>
        </div>
        <div className="fg-3790a374a3" data-node-id="894:710" data-name="Scrollable Content">
          <div className="fg-07a9e856e6" data-node-id="894:711" data-name="Error Main Panel">
            <div className="fg-3d51711349" data-node-id="894:712" data-name="Error background container">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8e7de79e.svg" />
            </div>
            <p className="fg-c6f2a3c572" dir="auto" data-node-id="894:714">
              خطا در بارگذاری اطلاعات
            </p>
            <p className="fg-375a36f042" dir="auto" data-node-id="894:715">
              ارتباط با سرور نگارین برقرار نشد. لطفاً وضعیت اتصال خود را بررسی کرده و مجدداً تلاش کنید.
            </p>
            <DesignAction className="fg-7902cb33b7" data-node-id="894:716" data-name="Negarin / Button" label="تلاش مجدد" destination="opportunities">
              <p className="fg-7ee08abcb6" dir="auto" data-node-id="I894:716;45:11">
                تلاش مجدد
              </p>
            </DesignAction>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:719" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:720" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:721">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="894:722" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:249" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:724" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:725" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-f422037977" data-node-id="894:726" data-name="Icon-Wrapper">
              <div className="fg-c51752dc8c" data-node-id="894:1095" data-name="Android / Mobile Signal">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:728">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:729" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:730" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:731" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-4f7067505a" data-node-id="894:732" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1098" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:734">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:735" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:736" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-4f7067505a" data-node-id="894:737" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1101" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:739">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:740" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:741" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-4f7067505a" data-node-id="894:742" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1104" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:744">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:745" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:746" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-4f7067505a" data-node-id="894:747" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1107" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:749">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:750" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:751" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-4f7067505a" data-node-id="894:752" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1110" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:754">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:755" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:756" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-4f7067505a" data-node-id="894:757" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1113" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:759">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:760" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:761" data-name="Group Header">
                <div className="fg-4f7067505a" data-node-id="894:762" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1116" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:764">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:765" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:766" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-4f7067505a" data-node-id="894:767" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1119" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:769">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:770" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:771" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-4f7067505a" data-node-id="894:772" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1122" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:774">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:775" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:776" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:777">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:778">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:779" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/95c3ee44.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
