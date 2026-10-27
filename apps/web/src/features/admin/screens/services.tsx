// Figma 892:785 — Admin / Services — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminServicesDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="892:785" data-name="Admin / Services — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="892:786" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="892:787" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="892:788" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="892:789" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/81390cb5.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="892:790" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="892:791" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-87f65ec773" data-node-id="892:792" data-name="bell">
                <div className="fg-0bb5547f93" data-node-id="892:1263" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/03ae448d.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="892:794" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="892:795" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، برنامه‌های رشد، خدمات و ...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="892:796">
                جستجو در هنرمندان، برنامه‌های رشد، خدمات و ...
              </p>
              <div className="fg-c55cd499f6" data-node-id="892:797" data-name="search">
                <div className="fg-0bb5547f93" data-node-id="892:1266" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/1d6399f8.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="892:799">
              مدیریت خدمات ارتقا و توانمندسازی
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="892:800" data-name="Scrollable Content Area 4">
          <div className="fg-867b1b2e34" data-node-id="892:801" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:802" data-name="Metric Shortcut" label="۴۸ خدمت کل خدمات فعال" destination="service-requests">
              <p className="fg-03f596c0d8" dir="auto" data-node-id="892:803">
                ۴۸ خدمت
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:804">
                کل خدمات فعال
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:805" data-name="Metric Shortcut" label="۱۵ درخواست درخواست‌های جاری" destination="service-requests">
              <p className="fg-c9547361f2" dir="auto" data-node-id="892:806">
                ۱۵ درخواست
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:807">
                درخواست‌های جاری
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:808" data-name="Metric Shortcut" label="۶ مورد در انتظار تخصیص" destination="service-requests">
              <p className="fg-5061c0f8a0" dir="auto" data-node-id="892:809">
                ۶ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:810">
                در انتظار تخصیص
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:811" data-name="Metric Shortcut" label="۱۲۸ درخواست تکمیل شده این ماه" destination="service-requests">
              <p className="fg-bdab2c756d" dir="auto" data-node-id="892:812">
                ۱۲۸ درخواست
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:813">
                تکمیل شده این ماه
              </p>
            </DesignAction>
          </div>
          <div className="fg-24081ceef5" data-node-id="892:814" data-name="Frame">
            <p className="fg-de8fba3b9f" dir="auto" data-node-id="892:815">
              دسته‌بندی‌های فعال خدمات
            </p>
            <div className="fg-0bab63b93d" data-node-id="892:816" data-name="Frame">
              <DesignAction className="fg-c32a7b0ac8" data-node-id="892:817" data-name="Flow Card" label="دسته خدمت ۱۲ درخواست آموزش و مربی‌گری" destination="order-issues">
                <p className="fg-d67d430e04" dir="auto" data-node-id="892:818">
                  دسته خدمت
                </p>
                <div className="fg-c96fe10678" data-node-id="892:819" data-name="Value Group">
                  <div className="fg-1c192d4481" data-node-id="892:820" data-name="Badge">
                    <p className="fg-ceb56afd4f" dir="auto" data-node-id="892:821">
                      ۱۲ درخواست
                    </p>
                  </div>
                  <div className="fg-860c2f1554" data-node-id="892:822" data-name="Frame">
                    <p className="fg-d530805c51" dir="auto" data-node-id="892:823">
                      آموزش و مربی‌گری
                    </p>
                    <div className="fg-c51752dc8c" data-node-id="892:1269" data-name="book-open">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/a5be2349.svg" />
                    </div>
                  </div>
                </div>
              </DesignAction>
              <DesignAction className="fg-c32a7b0ac8" data-node-id="892:825" data-name="Flow Card" label="دسته خدمت ۸ درخواست تولید محتوا و تبلیغات" destination="order-issues">
                <p className="fg-d67d430e04" dir="auto" data-node-id="892:826">
                  دسته خدمت
                </p>
                <div className="fg-c96fe10678" data-node-id="892:827" data-name="Value Group">
                  <div className="fg-1c192d4481" data-node-id="892:828" data-name="Badge">
                    <p className="fg-ceb56afd4f" dir="auto" data-node-id="892:829">
                      ۸ درخواست
                    </p>
                  </div>
                  <div className="fg-860c2f1554" data-node-id="892:830" data-name="Frame">
                    <p className="fg-d530805c51" dir="auto" data-node-id="892:831">
                      تولید محتوا و تبلیغات
                    </p>
                    <div className="fg-c51752dc8c" data-node-id="892:1272" data-name="video">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/c601eb42.svg" />
                    </div>
                  </div>
                </div>
              </DesignAction>
              <DesignAction className="fg-c32a7b0ac8" data-node-id="892:833" data-name="Flow Card" label="دسته خدمت ۱۵ درخواست طراحی و تولید بسته‌بندی" destination="order-issues">
                <p className="fg-d67d430e04" dir="auto" data-node-id="892:834">
                  دسته خدمت
                </p>
                <div className="fg-c96fe10678" data-node-id="892:835" data-name="Value Group">
                  <div className="fg-1c192d4481" data-node-id="892:836" data-name="Badge">
                    <p className="fg-ceb56afd4f" dir="auto" data-node-id="892:837">
                      ۱۵ درخواست
                    </p>
                  </div>
                  <div className="fg-860c2f1554" data-node-id="892:838" data-name="Frame">
                    <p className="fg-d530805c51" dir="auto" data-node-id="892:839">
                      طراحی و تولید بسته‌بندی
                    </p>
                    <div className="fg-c51752dc8c" data-node-id="892:1275" data-name="archive">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/2b27d9ba.svg" />
                    </div>
                  </div>
                </div>
              </DesignAction>
              <DesignAction className="fg-c32a7b0ac8" data-node-id="892:841" data-name="Flow Card" label="دسته خدمت ۱۳ درخواست عکاسی و تصویربرداری صنعتی" destination="order-issues">
                <p className="fg-d67d430e04" dir="auto" data-node-id="892:842">
                  دسته خدمت
                </p>
                <div className="fg-c96fe10678" data-node-id="892:843" data-name="Value Group">
                  <div className="fg-1c192d4481" data-node-id="892:844" data-name="Badge">
                    <p className="fg-ceb56afd4f" dir="auto" data-node-id="892:845">
                      ۱۳ درخواست
                    </p>
                  </div>
                  <div className="fg-860c2f1554" data-node-id="892:846" data-name="Frame">
                    <p className="fg-d530805c51" dir="auto" data-node-id="892:847">
                      عکاسی و تصویربرداری صنعتی
                    </p>
                    <div className="fg-c51752dc8c" data-node-id="892:1278" data-name="camera">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/e0441abc.svg" />
                    </div>
                  </div>
                </div>
              </DesignAction>
            </div>
          </div>
          <div className="fg-a1f410f2dc" data-node-id="892:849" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="892:850">
              آخرین درخواست‌های ثبت شده خدمات
            </p>
            <div className="fg-ceebe80a1f" data-node-id="892:851" data-name="Table Wrapper">
              <div className="fg-d2bcbf4692" data-node-id="892:852" data-name="Table Header Row">
                <p className="fg-47facc161d" dir="auto" data-node-id="892:853">
                  شریک خدمت
                </p>
                <p className="fg-b841a63777" dir="auto" data-node-id="892:854">
                  وضعیت درخواست
                </p>
                <p className="fg-097e9474ee" dir="auto" data-node-id="892:855">
                  تاریخ ثبت
                </p>
                <p className="fg-b841a63777" dir="auto" data-node-id="892:856">
                  نوع خدمت
                </p>
                <p className="fg-47facc161d" dir="auto" data-node-id="892:857">
                  هنرمند
                </p>
                <p className="fg-4a9b73a3b7" dir="auto" data-node-id="892:858">
                  شناسه درخواست
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="892:859" data-name="Table Body">
                <div className="fg-4f547a8b42" data-node-id="892:860" data-name="Table Row">
                  <p className="fg-c93931428a" dir="auto" data-node-id="892:861">
                    تخصیص نشده
                  </p>
                  <div className="fg-7101d81e60" data-node-id="892:862" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="892:863" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="892:864">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="892:865">
                    ۲ ساعت پیش
                  </p>
                  <p className="fg-e789454c80" dir="auto" data-node-id="892:866">
                    عکاسی صنعتی
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:867">
                    زهرا کریمی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:868">
                    SRV-1002
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:869" data-name="Table Row">
                  <p className="fg-ce205855af" dir="auto" data-node-id="892:870">
                    مدرسه نگارین
                  </p>
                  <div className="fg-7101d81e60" data-node-id="892:871" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="892:872" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="892:873">
                        در حال انجام
                      </p>
                    </div>
                  </div>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="892:874">
                    ۵ ساعت پیش
                  </p>
                  <p className="fg-e789454c80" dir="auto" data-node-id="892:875">
                    آموزش پیشرفته
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:876">
                    علی علوی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:877">
                    SRV-1003
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:878" data-name="Table Row">
                  <p className="fg-ce205855af" dir="auto" data-node-id="892:879">
                    استودیو چاپ نوین
                  </p>
                  <div className="fg-7101d81e60" data-node-id="892:880" data-name="Frame">
                    <div className="fg-e6bf96a33c" data-node-id="892:881" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="892:882">
                        کامل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="892:883">
                    ۱ روز پیش
                  </p>
                  <p className="fg-e789454c80" dir="auto" data-node-id="892:884">
                    طراحی بسته‌بندی
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:885">
                    مریم حسینی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:886">
                    SRV-1004
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:887" data-name="Table Row">
                  <p className="fg-c93931428a" dir="auto" data-node-id="892:888">
                    تخصیص نشده
                  </p>
                  <div className="fg-7101d81e60" data-node-id="892:889" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="892:890" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="892:891">
                        در انتظار تخصیص
                      </p>
                    </div>
                  </div>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="892:892">
                    ۳ روز پیش
                  </p>
                  <p className="fg-e789454c80" dir="auto" data-node-id="892:893">
                    تولید محتوا
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:894">
                    امیر تهرانی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:895">
                    SRV-1005
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="892:896" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="892:897" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="892:898">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="892:899" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="892:900" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="892:901" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="892:902" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c55cd499f6" data-node-id="892:903" data-name="Android / Mobile Signal">
              <div className="fg-169610c3a2" data-node-id="892:1281" data-name="Android / Mobile Signal">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="892:905">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="892:906" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="892:907" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="892:908" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-0a9542d889" data-node-id="892:909" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1284" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:911">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="892:912" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="892:913" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-0a9542d889" data-node-id="892:914" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1287" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:916">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:917" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="892:918" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-0a9542d889" data-node-id="892:919" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1290" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:921">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:922" data-name="Group-3">
              <DesignAction className="fg-fcc641ace6" data-node-id="892:923" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-0a9542d889" data-node-id="892:924" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1293" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="892:926">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:927" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="892:928" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-0a9542d889" data-node-id="892:929" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1296" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:931">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:932" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="892:933" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-0a9542d889" data-node-id="892:934" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1299" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:936">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:937" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="892:938" data-name="Group Header">
                <div className="fg-0a9542d889" data-node-id="892:939" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1302" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:941">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:942" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="892:943" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-0a9542d889" data-node-id="892:944" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1305" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:946">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:947" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="892:948" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-0a9542d889" data-node-id="892:949" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1308" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:951">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="892:952" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="892:953" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="892:954">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="892:955">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="892:956" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/d24a6fe0.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
