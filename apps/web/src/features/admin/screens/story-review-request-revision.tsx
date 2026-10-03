import { DesignDialog } from "../../artist/design-controls";
// Figma 894:6853 — Admin / Story Review — Request Revision
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStoryReviewRequestRevision() {
  return (
    <div className="fg-360fef389f" data-node-id="894:6853" data-name="Admin / Story Review — Request Revision">
      <div className="fg-3f0a7e612f" data-node-id="894:6854" data-name="Base Page Content" inert>
        <div className="fg-4d95428dfd" data-node-id="894:6855" data-name="Admin / Story Review — Desktop">
          <div className="fg-f7cede9c7c" data-node-id="894:6856" data-name="Main Workspace">
            <div className="fg-e0ff570bad" data-node-id="894:6857" data-name="Header">
              <div className="fg-a34c8fe932" data-node-id="894:6858" data-name="Left Actions">
                <div className="fg-08c31cb510" data-node-id="894:6859" data-name="Staff Profile Circle">
                  <img alt="" className="fg-8038e5755b" src="/admin-assets/158e398d.png" />
                </div>
                <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:6860" data-name="Notification Bell Button" label="Notification Bell Button">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
                </DesignAction>
              </div>
              <div className="fg-460d084997" data-node-id="894:6863" data-name="Right Header">
                <DesignField className="fg-bed5bc97c2" data-node-id="894:6864" data-name="Global Search" label="جستجو" placeholder="جستجو در استوری‌ها، هنرمندان، محصولات و ...">
                  <p className="fg-72b13cff4d" dir="auto" data-node-id="894:6865">
                    جستجو در استوری‌ها، هنرمندان، محصولات و ...
                  </p>
                  <div className="fg-c51752dc8c" data-node-id="894:7417" data-name="search">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                  </div>
                </DesignField>
                <p className="fg-99f699cdc3" dir="auto" data-node-id="894:6867">
                  بررسی و مدیریت استوری
                </p>
              </div>
            </div>
            <div className="fg-28892a2677" data-node-id="894:6868" data-name="Scrollable Content">
              <div className="fg-c96fe10678" data-node-id="894:6869" data-name="Breadcrumbs">
                <div className="fg-e00fb2c26c" data-node-id="894:6870" data-name="Back button">
                  <DesignAction className="fg-0edaeac592" dir="auto" data-node-id="894:6871" label="بازگشت" destination="story-review">
                    بازگشت
                  </DesignAction>
                </div>
                <div className="fg-aeb445f664" data-node-id="894:6872" data-name="Crumbs Stack">
                  <p className="fg-eb8ea69b62" data-node-id="894:6873">
                    STY-1031
                  </p>
                  <p className="fg-b80efb661d" data-node-id="894:6874">{`>`}</p>
                  <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:6875">
                    صف بررسی
                  </p>
                </div>
              </div>
              <div className="fg-aa1341f363" data-node-id="894:6876" data-name="Title Header block">
                <div className="fg-a5c1c82555" data-node-id="894:6877" data-name="Left Actions" />
                <div className="fg-a34c8fe932" data-node-id="894:6878" data-name="Right Header block">
                  <div className="fg-de4de0d814" data-node-id="894:6879" data-name="Badge">
                    <p className="fg-5778f11f94" dir="auto" data-node-id="894:6880">
                      در انتظار بررسی
                    </p>
                  </div>
                  <p className="fg-d96aa1abe1" dir="auto" data-node-id="894:6881">
                    بررسی استوری STY-1031
                  </p>
                </div>
              </div>
              <div className="fg-03bb2e10b3" data-node-id="894:6882" data-name="Two Column Grid">
                <div className="fg-f049e64a4d" data-node-id="894:6883" data-name="Right Metas Column">
                  <div className="fg-0113fcb192" data-node-id="894:6884" data-name="Story Info Card">
                    <p className="fg-71540d62d9" dir="auto" data-node-id="894:6885">
                      اطلاعات استوری
                    </p>
                    <div className="fg-4c55611945" data-node-id="894:6886" data-name="Rows">
                      <div className="fg-c96fe10678" data-node-id="894:6887" data-name="Meta Row">
                        <p className="fg-314298eacb" data-node-id="894:6888">
                          STY-1031
                        </p>
                        <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:6889">
                          شناسه استوری
                        </p>
                      </div>
                      <div className="fg-6654b9cd82" data-node-id="894:6890" data-name="Meta Row">
                        <p className="fg-7da7073880" dir="auto" data-node-id="894:6891">
                          تصویر (JPG)
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:6892">
                          نوع فایل
                        </p>
                      </div>
                      <div className="fg-6654b9cd82" data-node-id="894:6893" data-name="Meta Row">
                        <p className="fg-7da7073880" dir="auto" data-node-id="894:6894">
                          ۲۵ دی ۱۴۰۲
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:6895">
                          تاریخ ثبت
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fg-0113fcb192" data-node-id="894:6896" data-name="Artist Card">
                    <p className="fg-71540d62d9" dir="auto" data-node-id="894:6897">
                      اطلاعات هنرمند
                    </p>
                    <div className="fg-4c55611945" data-node-id="894:6898" data-name="Rows">
                      <div className="fg-6654b9cd82" data-node-id="894:6899" data-name="Meta Row">
                        <p className="fg-80d4c3a7e2" dir="auto" data-node-id="894:6900">
                          مریم علوی
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:6901">
                          نام هنرمند
                        </p>
                      </div>
                      <div className="fg-c96fe10678" data-node-id="894:6902" data-name="Meta Row">
                        <p className="fg-7da7073880" data-node-id="894:6903">
                          ART-4821
                        </p>
                        <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:6904">
                          شناسه کاربری
                        </p>
                      </div>
                      <div className="fg-6654b9cd82" data-node-id="894:6905" data-name="Meta Row">
                        <p className="fg-7da7073880" dir="auto" data-node-id="894:6906">
                          عضویت ویژه
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:6907">
                          نوع عضویت
                        </p>
                      </div>
                      <div className="fg-6654b9cd82" data-node-id="894:6908" data-name="Meta Row">
                        <p className="fg-7da7073880" dir="auto" data-node-id="894:6909">
                          سطح رشد ۳ (حرفه‌ای)
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:6910">
                          سطح رشد
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fg-0113fcb192" data-node-id="894:6911" data-name="Product Card">
                    <p className="fg-71540d62d9" dir="auto" data-node-id="894:6912">
                      محصول مرتبط لینک‌شده
                    </p>
                    <div className="fg-4c55611945" data-node-id="894:6913" data-name="Rows">
                      <div className="fg-6654b9cd82" data-node-id="894:6914" data-name="Meta Row">
                        <p className="fg-80d4c3a7e2" dir="auto" data-node-id="894:6915">
                          گلیم رومیزی سنتی دست‌بافت
                        </p>
                        <p className="fg-b80efb661d" dir="auto" data-node-id="894:6916">
                          عنوان محصول
                        </p>
                      </div>
                      <div className="fg-c96fe10678" data-node-id="894:6917" data-name="Meta Row">
                        <p className="fg-7da7073880" data-node-id="894:6918">
                          PRD-2201
                        </p>
                        <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:6919">
                          شناسه محصول
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fg-401d222ac4" data-node-id="894:6920" data-name="Action Area">
                    <DesignAction className="fg-7d523fefa0" data-node-id="894:6921" data-name="Approve Button" label="تأیید و انتشار استوری">
                      <p className="fg-7d346f89f5" dir="auto" data-node-id="894:6922">
                        تأیید و انتشار استوری
                      </p>
                    </DesignAction>
                    <DesignAction className="fg-9546600e86" data-node-id="894:6923" data-name="Reject Button" label="درخواست بازنگری">
                      <p className="fg-cb2a1565c7" dir="auto" data-node-id="894:6924">
                        درخواست بازنگری
                      </p>
                    </DesignAction>
                  </div>
                </div>
                <div className="fg-527ec53b97" data-node-id="894:6925" data-name="Left Media Preview Column">
                  <div className="fg-511d247513" data-node-id="894:6926" data-name="Media Card">
                    <div className="fg-1f8aa3eda1" data-node-id="894:6927" data-name="Large Image Showcase">
                      <img alt="" className="fg-6c9f0a61a6" src="/admin-assets/ac822084.png" />
                    </div>
                    <div className="fg-f1e587701f" data-node-id="894:6928" data-name="Media Metadata Info">
                      <p className="fg-d452ad70ec" dir="auto" data-node-id="894:6929">
                        رزولوشن تصویر: ۱۰۸۰ × ۱۹۲۰
                      </p>
                      <p className="fg-d452ad70ec" dir="auto" data-node-id="894:6930">
                        فرمت: JPG (۱.۲ مگابایت)
                      </p>
                    </div>
                  </div>
                  <div className="fg-8dfe4db1eb" data-node-id="894:6931" data-name="Caption Card">
                    <p className="fg-f2d7a5c84d" dir="auto" data-node-id="894:6932">
                      کپشن و توضیحات استوری
                    </p>
                    <p className="fg-195d90b774" dir="auto" data-node-id="894:6933">
                      تار و پود این گلیم رومیزی سنتی با عشق و هنر اصیل دستان زنان عشایر بافته شده است. طرح‌های هندسی شکسته بازگوکننده قصه‌های کهن سرزمین پهناور ایران است.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:6934" data-name="Sidebar">
            <div className="fg-bfcc56511d" data-node-id="894:6935" data-name="Brand">
              <p className="fg-013587b973" dir="auto" data-node-id="894:6936">
                خانه نگارین
              </p>
              <div className="fg-bb3f247d9d" data-node-id="894:6937" data-name="Logo Container">
                <div className="fg-842ae29a35" data-node-id="997:267" data-name="Brand / Negarin Logo">
                  <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
                </div>
              </div>
            </div>
            <div className="fg-6803f66aba" data-node-id="894:6939" data-name="Navigation">
              <DesignAction className="fg-4a871e0b11" data-node-id="894:6940" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
                <div className="fg-c51752dc8c" data-node-id="894:7420" data-name="layout-dashboard">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
                </div>
                <p className="fg-6abfcd3772" dir="auto" data-node-id="894:6942">
                  داشبورد
                </p>
              </DesignAction>
              <div className="fg-67e167c8b7" data-node-id="894:6943" data-name="Nav Groups">
                <div className="fg-3f106e1f96" data-node-id="894:6944" data-name="Group-0">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:6945" data-name="Group Header" label="هنرمندان" destination="artists">
                    <div className="fg-fc08538add" data-node-id="894:7423" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6947">
                      هنرمندان
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-239f54e425" data-node-id="894:6948" data-name="Group-1">
                  <DesignAction className="fg-ca8b7daf93" data-node-id="894:6949" data-name="Group Header" label="بازار" destination="products">
                    <div className="fg-fc08538add" data-node-id="894:7426" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6951">
                      بازار
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:6952" data-name="Group-2">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:6953" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                    <div className="fg-fc08538add" data-node-id="894:7429" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6955">
                      سفارش و ارسال
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:6960" data-name="Group-4">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:6961" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                    <div className="fg-fc08538add" data-node-id="894:7435" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6963">
                      رشد و خدمات
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:6964" data-name="Group-5">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:6965" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                    <div className="fg-fc08538add" data-node-id="894:7438" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6967">
                      فرصت‌ها
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:6968" data-name="Group-6">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:6969" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                    <div className="fg-fc08538add" data-node-id="894:7441" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6971">
                      مالی و عضویت
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:6972" data-name="Group-7">
                  <div className="fg-9e3538324e" data-node-id="894:6973" data-name="Group Header">
                    <div className="fg-fc08538add" data-node-id="894:7444" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6975">
                      بین‌الملل
                    </p>
                  </div>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:6976" data-name="Group-8">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:6977" data-name="Group Header" label="گزارش‌ها" destination="reports">
                    <div className="fg-fc08538add" data-node-id="894:7447" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6979">
                      گزارش‌ها
                    </p>
                  </DesignAction>
                </div>
                <div className="fg-3f106e1f96" data-node-id="894:6980" data-name="Group-9">
                  <DesignAction className="fg-9e3538324e" data-node-id="894:6981" data-name="Group Header" label="تنظیمات" destination="settings">
                    <div className="fg-fc08538add" data-node-id="894:7450" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                    </div>
                    <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6983">
                      تنظیمات
                    </p>
                  </DesignAction>
                </div>
              </div>
            </div>
            <div className="fg-20fc7845ff" data-node-id="894:6984" data-name="Staff Profile">
              <div className="fg-15b486e966" data-node-id="894:6985" data-name="Profile Details">
                <p className="fg-fe647e601f" dir="auto" data-node-id="894:6986">
                  کارشناس محتوا
                </p>
                <p className="fg-b3b828a019" dir="auto" data-node-id="894:6987">
                  مدیر بررسی استوری‌ها
                </p>
              </div>
              <div className="fg-e409306ac6" data-node-id="894:6988" data-name="Staff Avatar">
                <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/df63fd7b.png" />
              </div>
            </div>
          </AdminSidebar>
        </div>
      </div>
      <div className="fg-63d316ee7d" data-node-id="894:6989" data-name="Modal Backdrop" />
      <DesignDialog className="fg-6f094cb89d" data-node-id="894:6990" data-name="Modal Dialog" label="Admin / Story Review — Request Revision" closeDestination="story-review">
        <p className="fg-4f3073a855" dir="auto" data-node-id="894:6991">
          درخواست بازنگری استوری STY-1031
        </p>
        <div className="fg-00c639d5c5" data-node-id="894:6992" data-name="Context Box">
          <p className="fg-8b55499214" dir="auto" data-node-id="894:6993">
            هنرمند: مریم علوی (ART-4821)
          </p>
          <div className="fg-362590f22d" data-node-id="894:6994" data-name="Mini Thumb">
            <img alt="" className="fg-6b9f409558" src="/admin-assets/daef6097.png" />
          </div>
        </div>
        <DesignField className="fg-62f39da6b2" data-node-id="894:6995" data-name="Input Field Group" label="هنرمند: مریم علوی (ART-4821)" placeholder="توضیحات بازنگری (اجباری) دلیل درخواست بازنگری را شرح دهید (مثلاً: تصویر تار است، کپشن نیاز به اصلاح دارد و...)">
          <p className="fg-e6fd92eab7" dir="auto" data-node-id="894:6996">
            توضیحات بازنگری (اجباری)
          </p>
          <div className="fg-b07013b68e" data-node-id="894:6997" data-name="Textarea Wrapper">
            <p className="fg-72b13cff4d" dir="auto" data-node-id="894:6998">
              دلیل درخواست بازنگری را شرح دهید (مثلاً: تصویر تار است، کپشن نیاز به اصلاح دارد و...)
            </p>
          </div>
        </DesignField>
        <div className="fg-452d346712" data-node-id="894:6999" data-name="Button Actions Row">
          <div className="fg-4631763020" data-node-id="894:7000" data-name="Confirm Btn">
            <p className="fg-8ffc872800" dir="auto" data-node-id="894:7001">
              ارسال درخواست بازنگری
            </p>
          </div>
          <DesignAction className="fg-b211577930" data-node-id="894:7002" data-name="Cancel Btn" label="انصراف" destination="role-detail">
            <p className="fg-0edaeac592" dir="auto" data-node-id="894:7003">
              انصراف
            </p>
          </DesignAction>
        </div>
      </DesignDialog>
    </div>
  );
}
