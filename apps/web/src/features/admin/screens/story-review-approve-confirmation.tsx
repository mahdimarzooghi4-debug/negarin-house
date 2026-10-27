import { DesignDialog } from "../../artist/design-controls";
// Figma 894:7005 — Admin / Story Review — Approve Confirmation
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStoryReviewApproveConfirmation() {
  return (
    <div className="fg-360fef389f" data-node-id="894:7005" data-name="Admin / Story Review — Approve Confirmation">
      <div className="fg-3f0a7e612f" data-node-id="894:7006" data-name="Base Page Content" inert>
        <div className="fg-4d95428dfd" data-node-id="894:7007" data-name="Admin / Story Review — Desktop">
          <div className="fg-f7cede9c7c" data-node-id="894:7008" data-name="Main Workspace">
            <div className="fg-e0ff570bad" data-node-id="894:7009" data-name="Header">
              <div className="fg-a34c8fe932" data-node-id="894:7010" data-name="Left Actions">
                <div className="fg-08c31cb510" data-node-id="894:7011" data-name="Staff Profile Circle">
                  <img alt="" className="fg-8038e5755b" src="/admin-assets/81cf0dd9.png" />
                </div>
                <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:7012" data-name="Notification Bell Button" label="Notification Bell Button">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
                </DesignAction>
              </div>
              <div className="fg-460d084997" data-node-id="894:7015" data-name="Right Header">
                <DesignField className="fg-bed5bc97c2" data-node-id="894:7016" data-name="Global Search" label="جستجو" placeholder="جستجو در استوری‌ها، هنرمندان، محصولات و ...">
                  <p className="fg-72b13cff4d" dir="auto" data-node-id="894:7017">
                    جستجو در استوری‌ها، هنرمندان، محصولات و ...
                  </p>
                  <div className="fg-c51752dc8c" data-node-id="894:7456" data-name="search">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                  </div>
                </DesignField>
                <p className="fg-99f699cdc3" dir="auto" data-node-id="894:7019">
                  بررسی و مدیریت استوری
                </p>
              </div>
            </div>
            <div className="fg-28892a2677" data-node-id="894:7020" data-name="Scrollable Content">
              <div className="fg-c96fe10678" data-node-id="894:7021" data-name="Breadcrumbs">
                <div className="fg-e00fb2c26c" data-node-id="894:7022" data-name="Back button">
                  <DesignAction className="fg-0edaeac592" dir="auto" data-node-id="894:7023" label="بازگشت" destination="story-review">
                    بازگشت
                  </DesignAction>
                </div>
                <div className="fg-aeb445f664" data-node-id="894:7024" data-name="Crumbs Stack">
                  <p className="fg-eb8ea69b62" data-node-id="894:7025">
                    STY-1031
                  </p>
                  <p className="fg-b80efb661d" data-node-id="894:7026">{`>`}</p>
                  <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:7027">
                    صف بررسی
                  </p>
                </div>
              </div>
              <div className="fg-aa1341f363" data-node-id="894:7028" data-name="Title Header block">
                <div className="fg-a5c1c82555" data-node-id="894:7029" data-name="Left Actions" />
                <div className="fg-a34c8fe932" data-node-id="894:7030" data-name="Right Header block">
                  <div className="fg-de4de0d814" data-node-id="894:7031" data-name="Badge">
                    <p className="fg-5778f11f94" dir="auto" data-node-id="894:7032">
                      در انتظار بررسی
                    </p>
                  </div>
                  <p className="fg-d96aa1abe1" dir="auto" data-node-id="894:7033">
                    بررسی استوری STY-1031
                  </p>
                </div>
              </div>
              <div className="fg-03bb2e10b3" data-node-id="894:7034" data-name="Two Column Grid">
                <div className="fg-f049e64a4d" data-node-id="894:7035" data-name="Right Metas Column">
                  <div className="fg-0113fcb192" data-node-id="894:7036" data-name="Story Info Card">
                    <p className="fg-71540d62d9" dir="auto" data-node-id="894:7037">
                      اطلاعات استوری
                    </p>
                    <div className="fg-4c55611945" data-node-id="894:7038" data-name="Rows">
                      <div className="fg-c96fe10678" data-node-id="894:7039" data-name="Meta Row">
                        <p className="fg-314298eacb" data-node-id="894:7040">
                          STY-1031
                        </p>
                        <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:7041">
                          شناسه استوری
                        </p>
                      </div>
                      <div className="fg-6654b9cd82" data-node-id="894:7042" data-name="Meta Row">
                        <p className="fg-7da7073880" dir="auto" data-node-id="894:7043">
                          تصویر (JPG)
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:7044">
                          نوع فایل
                        </p>
                      </div>
                      <div className="fg-6654b9cd82" data-node-id="894:7045" data-name="Meta Row">
                        <p className="fg-7da7073880" dir="auto" data-node-id="894:7046">
                          ۲۵ دی ۱۴۰۲
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:7047">
                          تاریخ ثبت
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fg-0113fcb192" data-node-id="894:7048" data-name="Artist Card">
                    <p className="fg-71540d62d9" dir="auto" data-node-id="894:7049">
                      اطلاعات هنرمند
                    </p>
                    <div className="fg-4c55611945" data-node-id="894:7050" data-name="Rows">
                      <div className="fg-6654b9cd82" data-node-id="894:7051" data-name="Meta Row">
                        <p className="fg-80d4c3a7e2" dir="auto" data-node-id="894:7052">
                          مریم علوی
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:7053">
                          نام هنرمند
                        </p>
                      </div>
                      <div className="fg-c96fe10678" data-node-id="894:7054" data-name="Meta Row">
                        <p className="fg-7da7073880" data-node-id="894:7055">
                          ART-4821
                        </p>
                        <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:7056">
                          شناسه کاربری
                        </p>
                      </div>
                      <div className="fg-6654b9cd82" data-node-id="894:7057" data-name="Meta Row">
                        <p className="fg-7da7073880" dir="auto" data-node-id="894:7058">
                          عضویت ویژه
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:7059">
                          نوع عضویت
                        </p>
                      </div>
                      <div className="fg-6654b9cd82" data-node-id="894:7060" data-name="Meta Row">
                        <p className="fg-7da7073880" dir="auto" data-node-id="894:7061">
                          سطح رشد ۳ (حرفه‌ای)
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:7062">
                          سطح رشد
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fg-0113fcb192" data-node-id="894:7063" data-name="Product Card">
                    <p className="fg-71540d62d9" dir="auto" data-node-id="894:7064">
                      محصول مرتبط لینک‌شده
                    </p>
                    <div className="fg-4c55611945" data-node-id="894:7065" data-name="Rows">
                      <div className="fg-6654b9cd82" data-node-id="894:7066" data-name="Meta Row">
                        <p className="fg-80d4c3a7e2" dir="auto" data-node-id="894:7067">
                          گلیم رومیزی سنتی دست‌بافت
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:7068">
                          عنوان محصول
                        </p>
                      </div>
                      <div className="fg-c96fe10678" data-node-id="894:7069" data-name="Meta Row">
                        <p className="fg-7da7073880" data-node-id="894:7070">
                          PRD-2201
                        </p>
                        <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:7071">
                          شناسه محصول
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fg-401d222ac4" data-node-id="894:7072" data-name="Action Area">
                    <DesignAction className="fg-7d523fefa0" data-node-id="894:7073" data-name="Approve Button" label="تأیید و انتشار استوری" destination="story-review-queue">
                      <p className="fg-7d346f89f5" dir="auto" data-node-id="894:7074">
                        تأیید و انتشار استوری
                      </p>
                    </DesignAction>
                    <DesignAction className="fg-9546600e86" data-node-id="894:7075" data-name="Reject Button" label="درخواست بازنگری">
                      <p className="fg-cb2a1565c7" dir="auto" data-node-id="894:7076">
                        درخواست بازنگری
                      </p>
                    </DesignAction>
                  </div>
                </div>
                <div className="fg-527ec53b97" data-node-id="894:7077" data-name="Left Media Preview Column">
                  <div className="fg-511d247513" data-node-id="894:7078" data-name="Media Card">
                    <div className="fg-1f8aa3eda1" data-node-id="894:7079" data-name="Large Image Showcase">
                      <img alt="" className="fg-6c9f0a61a6" src="/admin-assets/4c224407.png" />
                    </div>
                    <div className="fg-f1e587701f" data-node-id="894:7080" data-name="Media Metadata Info">
                      <p className="fg-d452ad70ec" dir="auto" data-node-id="894:7081">
                        رزولوشن تصویر: ۱۰۸۰ × ۱۹۲۰
                      </p>
                      <p className="fg-d452ad70ec" dir="auto" data-node-id="894:7082">
                        فرمت: JPG (۱.۲ مگابایت)
                      </p>
                    </div>
                  </div>
                  <div className="fg-8dfe4db1eb" data-node-id="894:7083" data-name="Caption Card">
                    <p className="fg-f2d7a5c84d" dir="auto" data-node-id="894:7084">
                      کپشن و توضیحات استوری
                    </p>
                    <p className="fg-195d90b774" dir="auto" data-node-id="894:7085">
                      تار و پود این گلیم رومیزی سنتی با عشق و هنر اصیل دستان زنان عشایر بافته شده است. طرح‌های هندسی شکسته بازگوکننده قصه‌های کهن سرزمین پهناور ایران است.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:7086" data-name="Sidebar">
            <div className="fg-bfcc56511d" data-node-id="894:7087" data-name="Brand">
              <p className="fg-013587b973" dir="auto" data-node-id="894:7088">
                خانه نگارین
              </p>
              <div className="fg-bb3f247d9d" data-node-id="894:7089" data-name="Logo Container">
                <div className="fg-842ae29a35" data-node-id="997:268" data-name="Brand / Negarin Logo">
                  <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
                </div>
              </div>
            </div>
            <div className="fg-6803f66aba" data-node-id="894:7091" data-name="Navigation">
              <DesignAction className="fg-4a871e0b11" data-node-id="894:7092" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
                <div className="fg-c51752dc8c" data-node-id="894:7459" data-name="layout-dashboard">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
                </div>
                <p className="fg-6abfcd3772" dir="auto" data-node-id="894:7094">
                  داشبورد
                </p>
              </DesignAction>
              <div className="fg-67e167c8b7" data-node-id="894:7095" data-name="Nav Groups">
                <div className="fg-3f106e1f96" data-node-id="894:7096" data-name="Group-0">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:7097" data-name="Group Header" label="هنرمندان" destination="artists">
                    <div className="fg-fc08538add" data-node-id="894:7462" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7099">
                      هنرمندان
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-239f54e425" data-node-id="894:7100" data-name="Group-1">
                  <DesignAction className="fg-ca8b7daf93" data-node-id="894:7101" data-name="Group Header" label="بازار" destination="products">
                    <div className="fg-fc08538add" data-node-id="894:7465" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7103">
                      بازار
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:7104" data-name="Group-2">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:7105" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                    <div className="fg-fc08538add" data-node-id="894:7468" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7107">
                      سفارش و ارسال
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:7112" data-name="Group-4">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:7113" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                    <div className="fg-fc08538add" data-node-id="894:7474" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7115">
                      رشد و خدمات
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:7116" data-name="Group-5">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:7117" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                    <div className="fg-fc08538add" data-node-id="894:7477" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7119">
                      فرصت‌ها
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:7120" data-name="Group-6">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:7121" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                    <div className="fg-fc08538add" data-node-id="894:7480" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7123">
                      مالی و عضویت
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:7124" data-name="Group-7">
                  <div className="fg-9e3538324e" data-node-id="894:7125" data-name="Group Header">
                    <div className="fg-fc08538add" data-node-id="894:7483" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7127">
                      بین‌الملل
                    </p>
                  </div>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:7128" data-name="Group-8">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:7129" data-name="Group Header" label="گزارش‌ها" destination="reports">
                    <div className="fg-fc08538add" data-node-id="894:7486" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7131">
                      گزارش‌ها
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:7132" data-name="Group-9">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:7133" data-name="Group Header" label="تنظیمات" destination="settings">
                    <div className="fg-fc08538add" data-node-id="894:7489" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:7135">
                      تنظیمات
                    </p>
                  </DesignAction>
                </div>
              </div>
            </div>
            <div className="fg-20fc7845ff" data-node-id="894:7136" data-name="Staff Profile">
              <div className="fg-15b486e966" data-node-id="894:7137" data-name="Profile Details">
                <p className="fg-fe647e601f" dir="auto" data-node-id="894:7138">
                  کارشناس محتوا
                </p>
                <p className="fg-b3b828a019" dir="auto" data-node-id="894:7139">
                  مدیر بررسی استوری‌ها
                </p>
              </div>
              <div className="fg-e409306ac6" data-node-id="894:7140" data-name="Staff Avatar">
                <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/67d2ec8d.png" />
              </div>
            </div>
          </AdminSidebar>
        </div>
      </div>
      <div className="fg-63d316ee7d" data-node-id="894:7141" data-name="Modal Backdrop" />
      <DesignDialog className="fg-4d7e3619fa" data-node-id="894:7142" data-name="Modal Dialog" label="Admin / Story Review — Approve Confirmation" closeDestination="story-review-queue">
        <p className="fg-4f3073a855" dir="auto" data-node-id="894:7143">
          تأیید و انتشار استوری
        </p>
        <div className="fg-00c639d5c5" data-node-id="894:7144" data-name="Confirm Context Box">
          <div className="fg-cd57ec60fd" data-node-id="894:7145" data-name="Text Meta">
            <p className="fg-537045f06d" dir="auto" data-node-id="894:7146">
              تأیید استوری STY-1031
            </p>
            <p className="fg-812fcd728b" dir="auto" data-node-id="894:7147">
              هنرمند: مریم علوی
            </p>
          </div>
          <div className="fg-362590f22d" data-node-id="894:7148" data-name="Mini Thumb">
            <img alt="" className="fg-6b9f409558" src="/admin-assets/70be3317.png" />
          </div>
        </div>
        <p className="fg-42db30e4cd" dir="auto" data-node-id="894:7149">
          آیا از تأیید و انتشار این استوری اطمینان دارید؟ پس از تأیید، استوری به صورت عمومی منتشر خواهد شد.
        </p>
        <div className="fg-452d346712" data-node-id="894:7150" data-name="Button Actions Row">
          <div className="fg-f7cd8d5b01" data-node-id="894:7151" data-name="Confirm Btn">
            <p className="fg-8ffc872800" dir="auto" data-node-id="894:7152">
              تأیید و انتشار
            </p>
          </div>
          <DesignAction className="fg-b211577930" data-node-id="894:7153" data-name="Cancel Btn" label="انصراف" destination="role-detail">
            <p className="fg-0edaeac592" dir="auto" data-node-id="894:7154">
              انصراف
            </p>
          </DesignAction>
        </div>
      </DesignDialog>
    </div>
  );
}
