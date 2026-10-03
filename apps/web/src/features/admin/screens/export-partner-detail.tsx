// Figma 899:796 — Admin / Export Partner Detail — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminExportPartnerDetailDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="899:796" data-name="Admin / Export Partner Detail — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="899:797" data-name="Main Content Area">
        <div className="fg-aa86f531f3" data-node-id="899:798" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="899:799" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="899:800" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="899:801" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="899:802" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-6c36c0b5c6" data-node-id="899:803" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="899:1781" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/54a52c90.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="899:805" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="899:806" data-name="Global Search" label="جستجو" placeholder="جستجو در کدهای EXP، بازارها و محصولات...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="899:807">
                جستجو در کدهای EXP، بازارها و محصولات...
              </p>
              <div className="fg-f422037977" data-node-id="899:808" data-name="Icon Container">
                <div className="fg-5cca20e57d" data-node-id="899:1784" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/c635e3e4.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="899:810">
              جزئیات شریک صادراتی
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="899:811" data-name="Scrollable Content Inner">
          <div className="fg-24081ceef5" data-node-id="899:812" data-name="Header Row">
            <div className="fg-787154cfd0" data-node-id="899:813" data-name="Breadcrumb Row">
              <div className="fg-98b2f2b29d" data-node-id="899:814" data-name="Item">
                <p className="fg-1b90c6d8d3" data-node-id="899:815">{` > `}</p>
                <DesignAction className="fg-7781021315" dir="auto" data-node-id="899:816" label="بازگشت" destination="export-partners">
                  بازگشت
                </DesignAction>
              </div>
              <div className="fg-54b45105c3" data-node-id="899:817" data-name="Item">
                <p className="fg-d039218d38" data-node-id="899:818">{` > `}</p>
                <p className="fg-958079a1f2" data-node-id="899:819">
                  EXP-1024
                </p>
              </div>
              <div className="fg-e8210ba625" data-node-id="899:820" data-name="Item">
                <p className="fg-421489d5c7" dir="auto" data-node-id="899:821">
                  شرکای صادراتی
                </p>
              </div>
            </div>
            <div className="fg-c96fe10678" data-node-id="899:822" data-name="Title and Badge">
              <div className="fg-9708e8d183" data-node-id="899:823" data-name="Actions Block">
                <DesignAction className="fg-e54722c263" data-node-id="899:824" data-name="Btn Action" label="ویرایش شریک">
                  <p className="fg-8ffc872800" dir="auto" data-node-id="899:825">
                    ویرایش شریک
                  </p>
                </DesignAction>
                <DesignAction className="fg-e00fb2c26c" data-node-id="899:826" data-name="Btn Action" label="غیرفعال‌سازی موقت">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="899:827">
                    غیرفعال‌سازی موقت
                  </p>
                </DesignAction>
              </div>
              <div className="fg-ad50363799" data-node-id="899:828" data-name="Title Block">
                <div className="fg-489a397814" data-node-id="899:829" data-name="Status Badge">
                  <p className="fg-aa981ea395" dir="auto" data-node-id="899:830">
                    فعال
                  </p>
                </div>
                <p className="fg-99f699cdc3" dir="auto" data-node-id="899:831">
                  شرکت بازرگانی آریا پارس لندن (EXP-1024)
                </p>
              </div>
            </div>
          </div>
          <div className="fg-c93a8f5cea" data-node-id="899:832" data-name="Dashboard Grid Split">
            <div className="fg-3d7de8083b" data-node-id="899:833" data-name="Left Details Column">
              <div className="fg-229cf46169" data-node-id="899:834" data-name="Active Orders Table">
                <p className="fg-3c3426ebaa" dir="auto" data-node-id="899:835">
                  سفارش‌های صادراتی فعال
                </p>
                <div className="fg-560e2b0708" data-node-id="899:836" data-name="Table Wrapper">
                  <div className="fg-e822853fe2" data-node-id="899:837" data-name="Table Header">
                    <p className="fg-7e3af72b0e" dir="auto" data-node-id="899:838">
                      اقدام
                    </p>
                    <p className="fg-8d481b53ec" dir="auto" data-node-id="899:839">
                      وضعیت
                    </p>
                    <p className="fg-8d481b53ec" dir="auto" data-node-id="899:840">
                      تاریخ ثبت
                    </p>
                    <p className="fg-5fa1cff2ec" dir="auto" data-node-id="899:841">
                      اقلام و حجم کالا
                    </p>
                    <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="899:842">
                      شناسه سفارش
                    </p>
                  </div>
                  <div className="fg-153c0a1809" data-node-id="899:843" data-name="Table Body">
                    <div className="fg-2b3d1d935e" data-node-id="899:844" data-name="Row">
                      <p className="fg-cb50178370" dir="auto" data-node-id="899:845">
                        مشاهده جزئیات
                      </p>
                      <div className="fg-d3a9b73303" data-node-id="899:846" data-name="Frame">
                        <div className="fg-489a397814" data-node-id="899:847" data-name="Status Badge">
                          <p className="fg-aa981ea395" dir="auto" data-node-id="899:848">
                            ارسال شده
                          </p>
                        </div>
                      </div>
                      <p className="fg-4238471968" data-node-id="899:849">
                        ۱۴۰۲/۱۰/۱۸
                      </p>
                      <p className="fg-54c3c26167" dir="auto" data-node-id="899:850">
                        ۴ قلم صنایع دستی نقره و سرامیک
                      </p>
                      <p className="fg-d64c6e5d68" data-node-id="899:851">
                        XORD-2094
                      </p>
                    </div>
                    <div className="fg-2b3d1d935e" data-node-id="899:852" data-name="Row">
                      <p className="fg-cb50178370" dir="auto" data-node-id="899:853">
                        مشاهده جزئیات
                      </p>
                      <div className="fg-d3a9b73303" data-node-id="899:854" data-name="Frame">
                        <div className="fg-8c9afb9183" data-node-id="899:855" data-name="Status Badge">
                          <p className="fg-5778f11f94" dir="auto" data-node-id="899:856">
                            در حال بسته‌بندی
                          </p>
                        </div>
                      </div>
                      <p className="fg-4238471968" data-node-id="899:857">
                        ۱۴۰۲/۱۰/۱۶
                      </p>
                      <p className="fg-54c3c26167" dir="auto" data-node-id="899:858">
                        ۱۲ عدد گلیم دست‌بافت شیراز
                      </p>
                      <p className="fg-d64c6e5d68" data-node-id="899:859">
                        XORD-2081
                      </p>
                    </div>
                    <div className="fg-2b3d1d935e" data-node-id="899:860" data-name="Row">
                      <p className="fg-cb50178370" dir="auto" data-node-id="899:861">
                        مشاهده جزئیات
                      </p>
                      <div className="fg-d3a9b73303" data-node-id="899:862" data-name="Frame">
                        <div className="fg-489a397814" data-node-id="899:863" data-name="Status Badge">
                          <p className="fg-aa981ea395" dir="auto" data-node-id="899:864">
                            پرداخت شده
                          </p>
                        </div>
                      </div>
                      <p className="fg-4238471968" data-node-id="899:865">
                        ۱۴۰۲/۱۰/۱۲
                      </p>
                      <p className="fg-54c3c26167" dir="auto" data-node-id="899:866">
                        ۱ قطعه مینیاتور نفیس استاد کمالی
                      </p>
                      <p className="fg-d64c6e5d68" data-node-id="899:867">
                        XORD-2012
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-229cf46169" data-node-id="899:868" data-name="Operational Timeline">
                <p className="fg-3c3426ebaa" dir="auto" data-node-id="899:869">
                  فعالیت‌های اخیر شریک صادراتی
                </p>
                <div className="fg-022870b042" data-node-id="899:870" data-name="Timeline Stack">
                  <div className="fg-e8fd000608" data-node-id="899:871" data-name="Timeline Item">
                    <div className="fg-80ab50a574" data-node-id="899:872" data-name="Item Text">
                      <p className="fg-379a645d7e" dir="auto" data-node-id="899:873">
                        ۲۴ محصول واجد شرایط به شبکه صادراتی بریتانیا اضافه شد
                      </p>
                      <p className="fg-58d61dbfc5" dir="auto" data-node-id="899:874">
                        توسط مهدی صالحی
                      </p>
                    </div>
                    <div className="fg-de66bca469" data-node-id="899:875" data-name="Item Bullet Column">
                      <div className="fg-ed684af670" data-node-id="899:876" data-name="Ellipse">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                      </div>
                      <div className="fg-df0a3de519" data-node-id="899:877" data-name="Line">
                        <div className="fg-d8bbe4cdae">
                          <img alt="" className="fg-acc3667e96" src="/admin-assets/53777b74.svg" />
                        </div>
                      </div>
                    </div>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="899:878">
                      ۳ ساعت پیش
                    </p>
                  </div>
                  <div className="fg-e8fd000608" data-node-id="899:879" data-name="Timeline Item">
                    <div className="fg-80ab50a574" data-node-id="899:880" data-name="Item Text">
                      <p className="fg-379a645d7e" dir="auto" data-node-id="899:881">
                        تغییر وضعیت سفارش XORD-2081 به وضعیت در حال بسته‌بندی
                      </p>
                      <p className="fg-58d61dbfc5" dir="auto" data-node-id="899:882">
                        سیستم خودکار
                      </p>
                    </div>
                    <div className="fg-de66bca469" data-node-id="899:883" data-name="Item Bullet Column">
                      <div className="fg-ed684af670" data-node-id="899:884" data-name="Ellipse">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                      </div>
                      <div className="fg-df0a3de519" data-node-id="899:885" data-name="Line">
                        <div className="fg-d8bbe4cdae">
                          <img alt="" className="fg-acc3667e96" src="/admin-assets/53777b74.svg" />
                        </div>
                      </div>
                    </div>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="899:886">
                      دیروز
                    </p>
                  </div>
                  <div className="fg-e8fd000608" data-node-id="899:887" data-name="Timeline Item">
                    <div className="fg-80ab50a574" data-node-id="899:888" data-name="Item Text">
                      <p className="fg-379a645d7e" dir="auto" data-node-id="899:889">
                        به‌روزرسانی شرایط تجاری شریک
                      </p>
                      <p className="fg-58d61dbfc5" dir="auto" data-node-id="899:890">
                        توسط سارا مقدم
                      </p>
                    </div>
                    <div className="fg-de66bca469" data-node-id="899:891" data-name="Item Bullet Column">
                      <div className="fg-ed684af670" data-node-id="899:892" data-name="Ellipse">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                      </div>
                      <div className="fg-df0a3de519" data-node-id="899:893" data-name="Line">
                        <div className="fg-d8bbe4cdae">
                          <img alt="" className="fg-acc3667e96" src="/admin-assets/53777b74.svg" />
                        </div>
                      </div>
                    </div>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="899:894">
                      ۲ روز پیش
                    </p>
                  </div>
                  <div className="fg-e8fd000608" data-node-id="899:895" data-name="Timeline Item">
                    <div className="fg-80ab50a574" data-node-id="899:896" data-name="Item Text">
                      <p className="fg-379a645d7e" dir="auto" data-node-id="899:897">
                        تأیید مدارک ارسال بین‌المللی فرودگاه امام
                      </p>
                      <p className="fg-58d61dbfc5" dir="auto" data-node-id="899:898">
                        توسط کارشناس ناظر
                      </p>
                    </div>
                    <div className="fg-de66bca469" data-node-id="899:899" data-name="Item Bullet Column">
                      <div className="fg-ed684af670" data-node-id="899:900" data-name="Ellipse">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                      </div>
                      <div className="fg-df0a3de519" data-node-id="899:901" data-name="Line">
                        <div className="fg-d8bbe4cdae">
                          <img alt="" className="fg-acc3667e96" src="/admin-assets/53777b74.svg" />
                        </div>
                      </div>
                    </div>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="899:902">
                      ۵ روز پیش
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-a81dfced2b" data-node-id="899:903" data-name="Right Config Column">
              <div className="fg-26e95cea85" data-node-id="899:904" data-name="Quick Actions">
                <p className="fg-bd44308bf8" dir="auto" data-node-id="899:905">
                  اقدامات سریع مدیریتی
                </p>
                <div className="fg-4c55611945" data-node-id="899:906" data-name="Actions List">
                  <div className="fg-f347fe4af4" data-node-id="899:907" data-name="Action Item">
                    <p className="fg-80d4c3a7e2" dir="auto" data-node-id="899:908">
                      مدیریت بازار بریتانیا
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:909">
                      مدیریت و پیکربندی بازار
                    </p>
                  </div>
                  <div className="fg-f347fe4af4" data-node-id="899:910" data-name="Action Item">
                    <p className="fg-80d4c3a7e2" dir="auto" data-node-id="899:911">
                      مشاهده کاتالوگ صادراتی
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:912">
                      لیست اقلام ارسالی و کاتالوگ فعال
                    </p>
                  </div>
                  <div className="fg-f347fe4af4" data-node-id="899:913" data-name="Action Item">
                    <p className="fg-80d4c3a7e2" dir="auto" data-node-id="899:914">
                      شرایط تجاری شریک
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:915">
                      مدیریت کارمزد و شرایط تجاری طرف خارجی
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-5f2f383ff9" data-node-id="899:916" data-name="Partner General Info">
                <p className="fg-f76f17eaf5" dir="auto" data-node-id="899:917">
                  اطلاعات اصلی شریک صادراتی
                </p>
                <div className="fg-76597d4ea3" data-node-id="899:918" data-name="Rows Wrap">
                  <div className="fg-eac506f344" data-node-id="899:919" data-name="Data Row">
                    <p className="fg-b73c9c3acf" data-node-id="899:920">
                      EXP-1024
                    </p>
                    <p className="fg-c0b81437cf" dir="auto" data-node-id="899:921">
                      شناسه یکتا
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:922" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:923">
                      شرکت بازرگانی آریا پارس لندن
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:924">
                      نام شریک
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:925" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:926">
                      بریتانیا (UK)
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:927">
                      بازار هدف اصلی
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:928" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:929">
                      فعال و در حال فعالیت
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:930">
                      وضعیت عملیاتی
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:931" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:932">
                      توزیع مستقیم در بازار مقصد
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:933">
                      نوع همکاری
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:934" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:935">
                      لندن، خیابان کنزینگتون - دفتر عملیاتی
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:936">
                      ارتباطات
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-5f2f383ff9" data-node-id="899:937" data-name="Market Configuration">
                <p className="fg-f76f17eaf5" dir="auto" data-node-id="899:938">
                  پیکربندی بازار صادراتی
                </p>
                <div className="fg-76597d4ea3" data-node-id="899:939" data-name="Rows Wrap">
                  <div className="fg-eac506f344" data-node-id="899:940" data-name="Data Row">
                    <p className="fg-7da7073880" data-node-id="899:941">
                      en-GB
                    </p>
                    <p className="fg-c0b81437cf" dir="auto" data-node-id="899:942">
                      کد لوکال
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:943" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:944">
                      GBP - پوند استرلینگ (£)
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:945">
                      ارز مبادلاتی
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:946" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:947">
                      فعال (۱۲۰ محصول آماده فروش)
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:948">
                      وضعیت کاتالوگ
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:949" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:950">
                      فعال و همگام با محصولات تأییدشده
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:951">
                      وضعیت انتشار محصولات
                    </p>
                  </div>
                  <div className="fg-893701453d" data-node-id="899:952" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="899:953">
                      کانال ارسال فعال فرودگاه
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:954">
                      وضعیت ارسال و توزیع
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="899:955" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="899:956" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="899:957">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="899:958" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="899:959" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="899:960" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="899:961" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-f422037977" data-node-id="899:962" data-name="Icon Container">
              <div className="fg-5cca20e57d" data-node-id="899:1787" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/96fddb76.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="899:964">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="899:965" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="899:966" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:967" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-4f7067505a" data-node-id="899:968" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1790" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:970">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="899:971" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="899:972" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-4f7067505a" data-node-id="899:973" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1793" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:975">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:976" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:977" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-4f7067505a" data-node-id="899:978" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1796" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:980">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:981" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:982" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-4f7067505a" data-node-id="899:983" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1799" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:985">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:986" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:987" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-4f7067505a" data-node-id="899:988" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1802" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:990">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:991" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:992" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-4f7067505a" data-node-id="899:993" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1805" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:995">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:996" data-name="Group-6">
              <div className="fg-9dda82322e" data-node-id="899:997" data-name="Group Header">
                <div className="fg-4f7067505a" data-node-id="899:998" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1808" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/f69258e4.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="899:1000">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:1001" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:1002" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-4f7067505a" data-node-id="899:1003" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1811" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:1005">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:1006" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:1007" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-4f7067505a" data-node-id="899:1008" data-name="Icon Container">
                  <div className="fg-ed684af670" data-node-id="899:1814" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:1010">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="899:1011" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="899:1012" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="899:1013">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="899:1014">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="899:1015" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
