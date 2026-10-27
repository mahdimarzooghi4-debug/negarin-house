// Figma 894:6718 — Admin / Story Review — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStoryReviewDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:6718" data-name="Admin / Story Review — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:6719" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:6720" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:6721" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:6722" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/ec40b9d4.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:6723" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:6726" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:6727" data-name="Global Search" label="جستجو" placeholder="جستجو در استوری‌ها، هنرمندان، محصولات و ...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:6728">
                جستجو در استوری‌ها، هنرمندان، محصولات و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:7378" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:6730">
              بررسی و مدیریت استوری
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:6731" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="894:6732" data-name="Breadcrumbs">
            <div className="fg-e00fb2c26c" data-node-id="894:6733" data-name="Back button">
              <DesignAction className="fg-0edaeac592" dir="auto" data-node-id="894:6734" label="بازگشت" destination="story-review">
                بازگشت
              </DesignAction>
            </div>
            <div className="fg-aeb445f664" data-node-id="894:6735" data-name="Crumbs Stack">
              <p className="fg-eb8ea69b62" data-node-id="894:6736">
                STY-1031
              </p>
              <p className="fg-b80efb661d" data-node-id="894:6737">{`>`}</p>
              <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:6738">
                صف بررسی
              </p>
            </div>
          </div>
          <div className="fg-aa1341f363" data-node-id="894:6739" data-name="Title Header block">
            <div className="fg-a5c1c82555" data-node-id="894:6740" data-name="Left Actions" />
            <div className="fg-a34c8fe932" data-node-id="894:6741" data-name="Right Header block">
              <div className="fg-de4de0d814" data-node-id="894:6742" data-name="Badge">
                <p className="fg-5778f11f94" dir="auto" data-node-id="894:6743">
                  در انتظار بررسی
                </p>
              </div>
              <p className="fg-d96aa1abe1" dir="auto" data-node-id="894:6744">
                بررسی استوری STY-1031
              </p>
            </div>
          </div>
          <div className="fg-03bb2e10b3" data-node-id="894:6745" data-name="Two Column Grid">
            <div className="fg-f049e64a4d" data-node-id="894:6746" data-name="Right Metas Column">
              <div className="fg-0113fcb192" data-node-id="894:6747" data-name="Story Info Card">
                <p className="fg-71540d62d9" dir="auto" data-node-id="894:6748">
                  اطلاعات استوری
                </p>
                <div className="fg-4c55611945" data-node-id="894:6749" data-name="Rows">
                  <div className="fg-c96fe10678" data-node-id="894:6750" data-name="Meta Row">
                    <p className="fg-314298eacb" data-node-id="894:6751">
                      STY-1031
                    </p>
                    <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:6752">
                      شناسه استوری
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6753" data-name="Meta Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="894:6754">
                      تصویر (JPG)
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:6755">
                      نوع فایل
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6756" data-name="Meta Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="894:6757">
                      ۲۵ دی ۱۴۰۲
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:6758">
                      تاریخ ثبت
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-0113fcb192" data-node-id="894:6759" data-name="Artist Card">
                <p className="fg-71540d62d9" dir="auto" data-node-id="894:6760">
                  اطلاعات هنرمند
                </p>
                <div className="fg-4c55611945" data-node-id="894:6761" data-name="Rows">
                  <div className="fg-6654b9cd82" data-node-id="894:6762" data-name="Meta Row">
                    <p className="fg-80d4c3a7e2" dir="auto" data-node-id="894:6763">
                      مریم علوی
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:6764">
                      نام هنرمند
                    </p>
                  </div>
                  <div className="fg-c96fe10678" data-node-id="894:6765" data-name="Meta Row">
                    <p className="fg-7da7073880" data-node-id="894:6766">
                      ART-4821
                    </p>
                    <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:6767">
                      شناسه کاربری
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6768" data-name="Meta Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="894:6769">
                      عضویت ویژه
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:6770">
                      نوع عضویت
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6771" data-name="Meta Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="894:6772">
                      سطح رشد ۳ (حرفه‌ای)
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:6773">
                      سطح رشد
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-0113fcb192" data-node-id="894:6774" data-name="Product Card">
                <p className="fg-71540d62d9" dir="auto" data-node-id="894:6775">
                  محصول مرتبط لینک‌شده
                </p>
                <div className="fg-4c55611945" data-node-id="894:6776" data-name="Rows">
                  <div className="fg-6654b9cd82" data-node-id="894:6777" data-name="Meta Row">
                    <p className="fg-80d4c3a7e2" dir="auto" data-node-id="894:6778">
                      گلیم رومیزی سنتی دست‌بافت
                    </p>
                    <p className="fg-b80efb661d" dir="auto" data-node-id="894:6779">
                      عنوان محصول
                    </p>
                  </div>
                  <div className="fg-c96fe10678" data-node-id="894:6780" data-name="Meta Row">
                    <p className="fg-7da7073880" data-node-id="894:6781">
                      PRD-2201
                    </p>
                    <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:6782">
                      شناسه محصول
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-401d222ac4" data-node-id="894:6783" data-name="Action Area">
                <DesignAction className="fg-7d523fefa0" data-node-id="894:6784" data-name="Approve Button" label="تأیید و انتشار استوری" destination="story-review-approve-confirmation">
                  <p className="fg-7d346f89f5" dir="auto" data-node-id="894:6785">
                    تأیید و انتشار استوری
                  </p>
                </DesignAction>
                <DesignAction className="fg-9546600e86" data-node-id="894:6786" data-name="Reject Button" label="درخواست بازنگری">
                  <p className="fg-cb2a1565c7" dir="auto" data-node-id="894:6787">
                    درخواست بازنگری
                  </p>
                </DesignAction>
              </div>
            </div>
            <div className="fg-527ec53b97" data-node-id="894:6788" data-name="Left Media Preview Column">
              <div className="fg-511d247513" data-node-id="894:6789" data-name="Media Card">
                <div className="fg-1f8aa3eda1" data-node-id="894:6790" data-name="Large Image Showcase">
                  <img alt="" className="fg-6c9f0a61a6" src="/admin-assets/0c49f6e5.png" />
                </div>
                <div className="fg-f1e587701f" data-node-id="894:6791" data-name="Media Metadata Info">
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="894:6792">
                    رزولوشن تصویر: ۱۰۸۰ × ۱۹۲۰
                  </p>
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="894:6793">
                    فرمت: JPG (۱.۲ مگابایت)
                  </p>
                </div>
              </div>
              <div className="fg-8dfe4db1eb" data-node-id="894:6794" data-name="Caption Card">
                <p className="fg-f2d7a5c84d" dir="auto" data-node-id="894:6795">
                  کپشن و توضیحات استوری
                </p>
                <p className="fg-195d90b774" dir="auto" data-node-id="894:6796">
                  تار و پود این گلیم رومیزی سنتی با عشق و هنر اصیل دستان زنان عشایر بافته شده است. طرح‌های هندسی شکسته بازگوکننده قصه‌های کهن سرزمین پهناور ایران است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:6797" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:6798" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:6799">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="894:6800" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:266" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:6802" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:6803" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:7381" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:6805">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="894:6806" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:6807" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6808" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:7384" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6810">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:6811" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="894:6812" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:7387" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6814">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6815" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6816" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:7390" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6818">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6823" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6824" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:7396" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6826">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6827" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6828" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:7399" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6830">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6831" data-name="Group-6">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6832" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:7402" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6834">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6835" data-name="Group-7">
              <div className="fg-9e3538324e" data-node-id="894:6836" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:7405" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6838">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6839" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6840" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:7408" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6842">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6843" data-name="Group-9">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6844" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:7411" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6846">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:6847" data-name="Staff Profile">
          <div className="fg-15b486e966" data-node-id="894:6848" data-name="Profile Details">
            <p className="fg-fe647e601f" dir="auto" data-node-id="894:6849">
              کارشناس محتوا
            </p>
            <p className="fg-b3b828a019" dir="auto" data-node-id="894:6850">
              مدیر بررسی استوری‌ها
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:6851" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/8256b180.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
