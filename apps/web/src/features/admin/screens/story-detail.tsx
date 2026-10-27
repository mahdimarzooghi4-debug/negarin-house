// Figma 894:6148 — Admin / Story Detail — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStoryDetailDesktop() {
  return (
    <div className="fg-9917a372d9" data-node-id="894:6148" data-name="Admin / Story Detail — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:6204" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:6205" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:6206" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:6207" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a3e1435c.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:6208" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:6211" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:6212" data-name="Global Search" label="جستجو" placeholder="جستجو در استوری‌ها، هنرمندان، محصولات و ...">
              <p className="fg-f68c5e162d" dir="auto" data-node-id="894:6213">
                جستجو در استوری‌ها، هنرمندان، محصولات و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:6524" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:6215">
              جزئیات استوری
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:6216" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="894:6217" data-name="Breadcrumbs">
            <div className="fg-8112b56d4a" data-node-id="894:6218" data-name="Back button">
              <DesignAction className="fg-9cf1fca571" dir="auto" data-node-id="894:6219" label="بازگشت" destination="stories">
                بازگشت
              </DesignAction>
            </div>
            <div className="fg-aeb445f664" data-node-id="894:6220" data-name="Crumbs Stack">
              <p className="fg-31080c18e3" data-node-id="894:6221">
                STY-1024
              </p>
              <p className="fg-3502070eee" data-node-id="894:6222">{`>`}</p>
              <p className="fg-7de654a4e5" dir="auto" data-node-id="894:6223">
                استوری‌ها
              </p>
            </div>
          </div>
          <div className="fg-1978179a5f" data-node-id="894:6224" data-name="Title Header block">
            <DesignAction className="fg-4dd87ce456" data-node-id="894:6225" data-name="Action CTA Button" label="لغو انتشار استوری" destination="stories">
              <p className="fg-9f06a6291b" dir="auto" data-node-id="894:6226">
                لغو انتشار استوری
              </p>
            </DesignAction>
            <div className="fg-a34c8fe932" data-node-id="894:6227" data-name="Right Header block">
              <div className="fg-92b7da7864" data-node-id="894:6228" data-name="Badges">
                <div className="fg-811841516a" data-node-id="894:6229" data-name="Badge">
                  <p className="fg-9d90027e17" dir="auto" data-node-id="894:6230">
                    تأیید شده
                  </p>
                </div>
                <div className="fg-e539418721" data-node-id="894:6231" data-name="Badge">
                  <p className="fg-e6bf863d45" dir="auto" data-node-id="894:6232">
                    منتشرشده
                  </p>
                </div>
              </div>
              <p className="fg-d4856fba20" dir="auto" data-node-id="894:6233">
                جزئیات استوری STY-1024
              </p>
            </div>
          </div>
          <div className="fg-5323f550ad" data-node-id="894:6234" data-name="Two Column Grid">
            <div className="fg-f049e64a4d" data-node-id="894:6235" data-name="Right Metas Column">
              <div className="fg-7f5e1c17d3" data-node-id="894:6236" data-name="Story Info Card">
                <p className="fg-1f5bd86875" dir="auto" data-node-id="894:6237">
                  اطلاعات استوری
                </p>
                <div className="fg-4c55611945" data-node-id="894:6238" data-name="Rows">
                  <div className="fg-c96fe10678" data-node-id="894:6239" data-name="Meta Row">
                    <p className="fg-a0d369e3f2" data-node-id="894:6240">
                      STY-1024
                    </p>
                    <p className="fg-7de654a4e5" dir="auto" data-node-id="894:6241">
                      شناسه محتوا
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6242" data-name="Meta Row">
                    <p className="fg-8d0b47c7e7" dir="auto" data-node-id="894:6243">
                      تصویر
                    </p>
                    <p className="fg-3502070eee" dir="auto" data-node-id="894:6244">
                      نوع فایل
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6245" data-name="Meta Row">
                    <p className="fg-8d0b47c7e7" dir="auto" data-node-id="894:6246">
                      ۲۴ دی ۱۴۰۲
                    </p>
                    <p className="fg-3502070eee" dir="auto" data-node-id="894:6247">
                      تاریخ ایجاد
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6248" data-name="Meta Row">
                    <p className="fg-8d0b47c7e7" dir="auto" data-node-id="894:6249">
                      ۱۰ دقیقه پیش
                    </p>
                    <p className="fg-3502070eee" dir="auto" data-node-id="894:6250">
                      آخرین بروزرسانی
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6251" data-name="Meta Row">
                    <p className="fg-5e1b1ad2cb" dir="auto" data-node-id="894:6252">
                      منتشرشده
                    </p>
                    <p className="fg-3502070eee" dir="auto" data-node-id="894:6253">
                      وضعیت انتشار
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-7f5e1c17d3" data-node-id="894:6254" data-name="Artist Card">
                <p className="fg-1f5bd86875" dir="auto" data-node-id="894:6255">
                  اطلاعات هنرمند تولیدکننده
                </p>
                <div className="fg-4c55611945" data-node-id="894:6256" data-name="Rows">
                  <div className="fg-6654b9cd82" data-node-id="894:6257" data-name="Meta Row">
                    <p className="fg-ee10103119" dir="auto" data-node-id="894:6258">
                      مریم علوی
                    </p>
                    <p className="fg-3502070eee" dir="auto" data-node-id="894:6259">
                      نام هنرمند
                    </p>
                  </div>
                  <div className="fg-c96fe10678" data-node-id="894:6260" data-name="Meta Row">
                    <p className="fg-8d0b47c7e7" data-node-id="894:6261">
                      ART-4821
                    </p>
                    <p className="fg-7de654a4e5" dir="auto" data-node-id="894:6262">
                      شناسه کاربری
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6263" data-name="Meta Row">
                    <p className="fg-8d0b47c7e7" dir="auto" data-node-id="894:6264">
                      گلیم‌بافی و نساجی سنتی
                    </p>
                    <p className="fg-3502070eee" dir="auto" data-node-id="894:6265">
                      حوزه تخصصی
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-7f5e1c17d3" data-node-id="894:6266" data-name="Product Card">
                <p className="fg-1f5bd86875" dir="auto" data-node-id="894:6267">
                  محصول مرتبط لینک‌شده
                </p>
                <div className="fg-4c55611945" data-node-id="894:6268" data-name="Rows">
                  <div className="fg-6654b9cd82" data-node-id="894:6269" data-name="Meta Row">
                    <p className="fg-ee10103119" dir="auto" data-node-id="894:6270">
                      گلیم رومیزی سنتی دست‌بافت
                    </p>
                    <p className="fg-3502070eee" dir="auto" data-node-id="894:6271">
                      عنوان محصول
                    </p>
                  </div>
                  <div className="fg-c96fe10678" data-node-id="894:6272" data-name="Meta Row">
                    <p className="fg-8d0b47c7e7" data-node-id="894:6273">
                      PRD-2201
                    </p>
                    <p className="fg-7de654a4e5" dir="auto" data-node-id="894:6274">
                      شناسه محصول
                    </p>
                  </div>
                  <div className="fg-6654b9cd82" data-node-id="894:6275" data-name="Meta Row">
                    <p className="fg-8d0b47c7e7" dir="auto" data-node-id="894:6276">
                      ۱۸۵۰۰۰۰ تومان
                    </p>
                    <p className="fg-3502070eee" dir="auto" data-node-id="894:6277">
                      قیمت بازار
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-5dc79e25e0" data-node-id="894:6278" data-name="Timeline Card">
                <p className="fg-ade5fd2235" dir="auto" data-node-id="894:6279">
                  تاریخچه بررسی و تایید
                </p>
                <div className="fg-d6f889b3e9" data-node-id="894:6280" data-name="Timeline Stack">
                  <div className="fg-452d346712" data-node-id="894:6281" data-name="Timeline Step">
                    <div className="fg-ef1c18a4d5" data-node-id="894:6282" data-name="Step Details">
                      <p className="fg-3ad04c8bc9" dir="auto" data-node-id="894:6283">
                        ارسال برای بررسی اولیه
                      </p>
                      <p className="fg-21be259992" dir="auto" data-node-id="894:6284">
                        ۲۴ دی ۱۴۰۲ - ساعت ۱۰:۱۵
                      </p>
                      <p className="fg-e8d39c1043" dir="auto" data-node-id="894:6285">
                        توسط هنرمند مریم علوی
                      </p>
                    </div>
                    <div className="fg-39cb218f17" data-node-id="894:6286" data-name="Line indicator node">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/6e7d2030.svg" />
                    </div>
                  </div>
                  <div className="fg-452d346712" data-node-id="894:6289" data-name="Timeline Step">
                    <div className="fg-ef1c18a4d5" data-node-id="894:6290" data-name="Step Details">
                      <p className="fg-3ad04c8bc9" dir="auto" data-node-id="894:6291">
                        بررسی کارشناس عملیات
                      </p>
                      <p className="fg-21be259992" dir="auto" data-node-id="894:6292">
                        ۲۴ دی ۱۴۰۲ - ساعت ۱۴:۳۰
                      </p>
                      <p className="fg-e8d39c1043" dir="auto" data-node-id="894:6293">
                        توسط کارشناس عملیات محتوا
                      </p>
                    </div>
                    <div className="fg-39cb218f17" data-node-id="894:6294" data-name="Line indicator node">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/6e7d2030.svg" />
                    </div>
                  </div>
                  <div className="fg-452d346712" data-node-id="894:6297" data-name="Timeline Step">
                    <div className="fg-ef1c18a4d5" data-node-id="894:6298" data-name="Step Details">
                      <p className="fg-3ad04c8bc9" dir="auto" data-node-id="894:6299">
                        تأیید نهایی و انتشار
                      </p>
                      <p className="fg-21be259992" dir="auto" data-node-id="894:6300">
                        ۲۴ دی ۱۴۰۲ - ساعت ۱۴:۳۵
                      </p>
                      <p className="fg-e8d39c1043" dir="auto" data-node-id="894:6301">
                        وضعیت استوری به منتشرشده تغییر یافت
                      </p>
                    </div>
                    <div className="fg-b1edf17844" data-node-id="894:6302" data-name="Line indicator node">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/9342b5d1.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-527ec53b97" data-node-id="894:6304" data-name="Left Media Preview Column">
              <div className="fg-ad2b6ec0ae" data-node-id="894:6305" data-name="Media Card">
                <div className="fg-1f8aa3eda1" data-node-id="894:6306" data-name="Large Image Showcase">
                  <img alt="" className="fg-6c9f0a61a6" src="/admin-assets/e65f50e6.png" />
                </div>
                <div className="fg-56fd0e2d38" data-node-id="894:6307" data-name="Media Metadata Info">
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="894:6308">
                    رزولوشن تصویر: ۱۰۸۰ × ۱۹۲۰
                  </p>
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="894:6309">
                    فرمت: JPG (۱.۲ مگابایت)
                  </p>
                </div>
              </div>
              <div className="fg-7ddd47ad36" data-node-id="894:6310" data-name="Caption Card">
                <p className="fg-5b54436444" dir="auto" data-node-id="894:6311">
                  کپشن و توضیحات استوری
                </p>
                <p className="fg-73062b9f52" dir="auto" data-node-id="894:6312">
                  تار و پود این گلیم رومیزی سنتی با عشق و هنر اصیل دستان زنان عشایر بافته شده است. طرح‌های هندسی شکسته بازگوکننده قصه‌های کهن سرزمین پهناور ایران است. هماهنگ با سبک زندگی مدرن و کلاسیک.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:6149" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:6150" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:6151">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="894:6152" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:6153" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:6154" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:6155" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:6488" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:6157">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-f3a73e70c3" data-node-id="894:6158" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:6159" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6160" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:6491" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6162">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:6163" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="894:6164" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:6494" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6166">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6167" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6168" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:6497" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6170">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6175" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6176" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:6503" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6178">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6179" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6180" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:6506" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6182">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6183" data-name="Group-6">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6184" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:6509" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6186">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6187" data-name="Group-7">
              <div className="fg-9e3538324e" data-node-id="894:6188" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:6512" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6190">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6191" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6192" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:6515" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6194">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6195" data-name="Group-9">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6196" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:6518" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:6198">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:6199" data-name="Staff Profile">
          <div className="fg-15b486e966" data-node-id="894:6200" data-name="Profile Details">
            <p className="fg-fe647e601f" dir="auto" data-node-id="894:6201">
              کارشناس محتوا
            </p>
            <p className="fg-a9d1c863d0" dir="auto" data-node-id="894:6202">
              مدیر بررسی استوری‌ها
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:6203" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/266b2667.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
