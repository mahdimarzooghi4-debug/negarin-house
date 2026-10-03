// Figma 903:739 — Admin / Settings — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminSettingsDesktop() {
  return (
    <div className="fg-2f84151df8" data-node-id="903:739" data-name="Admin / Settings — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:814" data-name="Main Workspace">
        <div className="fg-aa86f531f3" data-node-id="903:815" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:816" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:817" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="903:818" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="903:819" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-ccdeeb4977" data-node-id="903:820" data-name="Icon Container">
                <div className="fg-58d29b27c0" data-node-id="903:1449" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3afd6085.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="903:822" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="903:823" data-name="Global Search" label="جستجو" placeholder="جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="903:824">
                جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...
              </p>
              <div className="fg-c5bca379c9" data-node-id="903:825" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1452" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </div>
            </DesignField>
            <div className="fg-db65f399cd" data-node-id="903:827" data-name="Title and Path">
              <div className="fg-860c2f1554" data-node-id="903:828" data-name="Breadcrumbs">
                <div className="fg-f1a0c10dac" data-node-id="903:829" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:830">
                    داشبورد عملیات
                  </p>
                  <p className="fg-29a4797011" data-node-id="903:831">{`>`}</p>
                </div>
                <div className="fg-e8210ba625" data-node-id="903:832" data-name="Frame">
                  <p className="fg-79f0034e69" dir="auto" data-node-id="903:833">
                    تنظیمات سیستمی
                  </p>
                </div>
              </div>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="903:834">
                تنظیمات سیستم
              </p>
            </div>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="903:835" data-name="Scrollable Content">
          <div className="fg-cd68a27429" data-node-id="903:836" data-name="Operational Description">
            <p className="fg-2ed64816ff" dir="auto" data-node-id="903:837">
              تنظیمات و پیکربندی‌های کلی پرتال نگارین
            </p>
            <p className="fg-1b90c6d8d3" dir="auto" data-node-id="903:838">
              حوزه‌های تنظیمات سیستمی را انتخاب و متناسب با سیاست‌های جاری و عملیاتی پلتفرم پیکربندی نمایید.
            </p>
          </div>
          <div className="fg-6f66965dd3" data-node-id="903:839" data-name="Settings Grid">
            <div className="fg-a84f592e22" data-node-id="903:840" data-name="Row 1">
              <DesignAction className="fg-d02529ca60" data-node-id="903:841" data-name="Setting Tile" label="تنظیمات عمومی مدیریت اطلاعات نمایشی، ترجیحات زبانی، واحد‌های پولی و مشخصات پایه‌ای پرتال اداری نگارین.">
                <div className="fg-c96fe10678" data-node-id="903:842" data-name="Header Row">
                  <div className="fg-922563b3e9" data-node-id="903:843" data-name="Icon Container">
                    <div className="fg-5cca20e57d" data-node-id="903:1455" data-name="chevron-left">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/d13b7264.svg" />
                    </div>
                  </div>
                  <div className="fg-ad50363799" data-node-id="903:845" data-name="Title Group">
                    <p className="fg-8c96560c87" dir="auto" data-node-id="903:846">
                      تنظیمات عمومی
                    </p>
                    <div className="fg-82d2c0618e" data-node-id="903:847" data-name="Icon Container">
                      <div className="fg-eaa60f1c42" data-node-id="903:1458" data-name="settings">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/1c6a2462.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fg-90464e3bf8" dir="auto" data-node-id="903:849">
                  مدیریت اطلاعات نمایشی، ترجیحات زبانی، واحد‌های پولی و مشخصات پایه‌ای پرتال اداری نگارین.
                </p>
              </DesignAction>
              <DesignAction className="fg-d02529ca60" data-node-id="903:850" data-name="Setting Tile" label="پیکربندی عملیاتی تنظیم گردش کار فرآیند ثبت و تأیید آثار هنری، تخصیص خودکار کارشناسان و قوانین بررسی.">
                <div className="fg-c96fe10678" data-node-id="903:851" data-name="Header Row">
                  <div className="fg-922563b3e9" data-node-id="903:852" data-name="Icon Container">
                    <div className="fg-5cca20e57d" data-node-id="903:1461" data-name="chevron-left">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/d13b7264.svg" />
                    </div>
                  </div>
                  <div className="fg-ad50363799" data-node-id="903:854" data-name="Title Group">
                    <p className="fg-8c96560c87" dir="auto" data-node-id="903:855">
                      پیکربندی عملیاتی
                    </p>
                    <div className="fg-82d2c0618e" data-node-id="903:856" data-name="Icon Container">
                      <div className="fg-eaa60f1c42" data-node-id="903:1464" data-name="cpu">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/afa185d5.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fg-90464e3bf8" dir="auto" data-node-id="903:858">
                  تنظیم گردش کار فرآیند ثبت و تأیید آثار هنری، تخصیص خودکار کارشناسان و قوانین بررسی.
                </p>
              </DesignAction>
              <DesignAction className="fg-d02529ca60" data-node-id="903:859" data-name="Setting Tile" label="پیکربندی عضویت تعیین شهریه سالانه عضویت هنرمندان، سهمیه‌ها و اعتبارات تخصیصی پیش‌فرض برای دوره‌های ارزیابی.">
                <div className="fg-c96fe10678" data-node-id="903:860" data-name="Header Row">
                  <div className="fg-922563b3e9" data-node-id="903:861" data-name="Icon Container">
                    <div className="fg-5cca20e57d" data-node-id="903:1467" data-name="chevron-left">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/d13b7264.svg" />
                    </div>
                  </div>
                  <div className="fg-ad50363799" data-node-id="903:863" data-name="Title Group">
                    <p className="fg-8c96560c87" dir="auto" data-node-id="903:864">
                      پیکربندی عضویت
                    </p>
                    <div className="fg-82d2c0618e" data-node-id="903:865" data-name="Icon Container">
                      <div className="fg-eaa60f1c42" data-node-id="903:1470" data-name="user-check">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/5d964728.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fg-90464e3bf8" dir="auto" data-node-id="903:867">
                  تعیین شهریه سالانه عضویت هنرمندان، سهمیه‌ها و اعتبارات تخصیصی پیش‌فرض برای دوره‌های ارزیابی.
                </p>
              </DesignAction>
              <DesignAction className="fg-d02529ca60" data-node-id="903:868" data-name="Setting Tile" label="پیکربندی خدمات مدیریت و دسته‌بندی خدمات رشد فعال ارائه‌شده به هنرمندان و نظارت بر تسهیلات همکار.">
                <div className="fg-c96fe10678" data-node-id="903:869" data-name="Header Row">
                  <div className="fg-922563b3e9" data-node-id="903:870" data-name="Icon Container">
                    <div className="fg-5cca20e57d" data-node-id="903:1473" data-name="chevron-left">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/d13b7264.svg" />
                    </div>
                  </div>
                  <div className="fg-ad50363799" data-node-id="903:872" data-name="Title Group">
                    <p className="fg-8c96560c87" dir="auto" data-node-id="903:873">
                      پیکربندی خدمات
                    </p>
                    <div className="fg-82d2c0618e" data-node-id="903:874" data-name="Icon Container">
                      <div className="fg-eaa60f1c42" data-node-id="903:1476" data-name="award">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/f6670311.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fg-90464e3bf8" dir="auto" data-node-id="903:876">
                  مدیریت و دسته‌بندی خدمات رشد فعال ارائه‌شده به هنرمندان و نظارت بر تسهیلات همکار.
                </p>
              </DesignAction>
            </div>
            <div className="fg-a84f592e22" data-node-id="903:877" data-name="Row 2">
              <DesignAction className="fg-d02529ca60" data-node-id="903:878" data-name="Setting Tile" label="پیکربندی فرصت‌ها تعیین فرآیند جریان و قالب فرصت‌های اشتغال و بازاریابی برای هنرمندان و ارگان‌ها.">
                <div className="fg-c96fe10678" data-node-id="903:879" data-name="Header Row">
                  <div className="fg-922563b3e9" data-node-id="903:880" data-name="Icon Container">
                    <div className="fg-5cca20e57d" data-node-id="903:1479" data-name="chevron-left">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/d13b7264.svg" />
                    </div>
                  </div>
                  <div className="fg-ad50363799" data-node-id="903:882" data-name="Title Group">
                    <p className="fg-8c96560c87" dir="auto" data-node-id="903:883">
                      پیکربندی فرصت‌ها
                    </p>
                    <div className="fg-82d2c0618e" data-node-id="903:884" data-name="Icon Container">
                      <div className="fg-eaa60f1c42" data-node-id="903:1482" data-name="briefcase">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/78738d3f.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fg-90464e3bf8" dir="auto" data-node-id="903:886">
                  تعیین فرآیند جریان و قالب فرصت‌های اشتغال و بازاریابی برای هنرمندان و ارگان‌ها.
                </p>
              </DesignAction>
              <DesignAction className="fg-d02529ca60" data-node-id="903:887" data-name="Setting Tile" label="پیکربندی بین‌المللی تنظیم بازارهای هدف صادراتی، کدهای EXP شرکا، ارزهای پیش‌فرض بین‌المللی.">
                <div className="fg-c96fe10678" data-node-id="903:888" data-name="Header Row">
                  <div className="fg-922563b3e9" data-node-id="903:889" data-name="Icon Container">
                    <div className="fg-5cca20e57d" data-node-id="903:1485" data-name="chevron-left">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/d13b7264.svg" />
                    </div>
                  </div>
                  <div className="fg-ad50363799" data-node-id="903:891" data-name="Title Group">
                    <p className="fg-8c96560c87" dir="auto" data-node-id="903:892">
                      پیکربندی بین‌المللی
                    </p>
                    <div className="fg-82d2c0618e" data-node-id="903:893" data-name="Icon Container">
                      <div className="fg-eaa60f1c42" data-node-id="903:1488" data-name="globe">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/94cf5ca2.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fg-90464e3bf8" dir="auto" data-node-id="903:895">
                  تنظیم بازارهای هدف صادراتی، کدهای EXP شرکا، ارزهای پیش‌فرض بین‌المللی.
                </p>
              </DesignAction>
              <DesignAction className="fg-d02529ca60" data-node-id="903:896" data-name="Setting Tile" label="تنظیمات اعلان‌ها پیکربندی الگوهای ارسال پیامک و ایمیل، هشدارهای خودکار سیستم در رخدادهای مختلف کاری." destination="notification-settings">
                <div className="fg-c96fe10678" data-node-id="903:897" data-name="Header Row">
                  <div className="fg-922563b3e9" data-node-id="903:898" data-name="Icon Container">
                    <div className="fg-5cca20e57d" data-node-id="903:1491" data-name="chevron-left">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/d13b7264.svg" />
                    </div>
                  </div>
                  <div className="fg-ad50363799" data-node-id="903:900" data-name="Title Group">
                    <p className="fg-8c96560c87" dir="auto" data-node-id="903:901">
                      تنظیمات اعلان‌ها
                    </p>
                    <div className="fg-82d2c0618e" data-node-id="903:902" data-name="Icon Container">
                      <div className="fg-eaa60f1c42" data-node-id="903:1494" data-name="bell">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/835e3099.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fg-90464e3bf8" dir="auto" data-node-id="903:904">
                  پیکربندی الگوهای ارسال پیامک و ایمیل، هشدارهای خودکار سیستم در رخدادهای مختلف کاری.
                </p>
              </DesignAction>
              <DesignAction className="fg-d02529ca60" data-node-id="903:905" data-name="Setting Tile" label="نقش‌ها و دسترسی‌ها تعریف نقش‌های کارمندان، سطوح دسترسی به پرونده‌ها و واگذاری مسئولیت‌های کارشناسان پشتیبانی." destination="roles-and-permissions">
                <div className="fg-c96fe10678" data-node-id="903:906" data-name="Header Row">
                  <div className="fg-922563b3e9" data-node-id="903:907" data-name="Icon Container">
                    <div className="fg-5cca20e57d" data-node-id="903:1497" data-name="chevron-left">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/d13b7264.svg" />
                    </div>
                  </div>
                  <div className="fg-ad50363799" data-node-id="903:909" data-name="Title Group">
                    <p className="fg-8c96560c87" dir="auto" data-node-id="903:910">
                      نقش‌ها و دسترسی‌ها
                    </p>
                    <div className="fg-82d2c0618e" data-node-id="903:911" data-name="Icon Container">
                      <div className="fg-eaa60f1c42" data-node-id="903:1500" data-name="shield">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/de95bc97.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fg-90464e3bf8" dir="auto" data-node-id="903:913">
                  تعریف نقش‌های کارمندان، سطوح دسترسی به پرونده‌ها و واگذاری مسئولیت‌های کارشناسان پشتیبانی.
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:740" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="903:741" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="903:742">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="903:743" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:279" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="903:745" data-name="Navigation">
          <div className="fg-4a871e0b11" data-node-id="903:746" data-name="Nav Group - هنرمندان">
            <div className="fg-66002a03ce" data-node-id="903:747" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1395" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-3d814de2a2" data-node-id="903:749" data-name="Label Group">
              <p className="fg-b79c8b94b2" dir="auto" data-node-id="903:750">
                هنرمندان
              </p>
              <div className="fg-e747b81e51" data-node-id="903:751" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1398" data-name="users">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/5e9a9f0c.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:753" data-name="Nav Group - بازار">
            <div className="fg-66002a03ce" data-node-id="903:754" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1401" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-03e9160301" data-node-id="903:756" data-name="Label Group">
              <p className="fg-b32cdc0c3d" dir="auto" data-node-id="903:757">
                بازار
              </p>
              <div className="fg-0495670d86" data-node-id="903:758" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1404" data-name="shopping-bag">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/735bc7e1.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:760" data-name="Nav Group - سفارش و ارسال">
            <div className="fg-66002a03ce" data-node-id="903:761" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1407" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-f382adfae7" data-node-id="903:763" data-name="Label Group">
              <p className="fg-d3dc98ec1a" dir="auto" data-node-id="903:764">
                سفارش و ارسال
              </p>
              <div className="fg-21a7e4c908" data-node-id="903:765" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1410" data-name="truck">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/40bac158.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:767" data-name="Nav Group - رشد و خدمات">
            <div className="fg-66002a03ce" data-node-id="903:768" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1413" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-d87227fb46" data-node-id="903:770" data-name="Label Group">
              <p className="fg-5d47f1d2f4" dir="auto" data-node-id="903:771">
                رشد و خدمات
              </p>
              <div className="fg-bb81ba1266" data-node-id="903:772" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1416" data-name="award">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/9d31bb3e.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:774" data-name="Nav Group - فرصت‌ها">
            <div className="fg-66002a03ce" data-node-id="903:775" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1419" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-4e71a3c96b" data-node-id="903:777" data-name="Label Group">
              <p className="fg-a00b815a53" dir="auto" data-node-id="903:778">
                فرصت‌ها
              </p>
              <div className="fg-78d08da6be" data-node-id="903:779" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1422" data-name="briefcase">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/ac50726a.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:781" data-name="Nav Group - مالی و عضویت">
            <div className="fg-66002a03ce" data-node-id="903:782" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1425" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-bd12e2ac82" data-node-id="903:784" data-name="Label Group">
              <p className="fg-ed94e4edb1" dir="auto" data-node-id="903:785">
                مالی و عضویت
              </p>
              <div className="fg-ce26aa0e85" data-node-id="903:786" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1428" data-name="credit-card">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/8691c991.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:788" data-name="Nav Group - بین‌الملل">
            <div className="fg-66002a03ce" data-node-id="903:789" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1431" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-4e71a3c96b" data-node-id="903:791" data-name="Label Group">
              <p className="fg-a00b815a53" dir="auto" data-node-id="903:792">
                بین‌الملل
              </p>
              <div className="fg-78d08da6be" data-node-id="903:793" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1434" data-name="globe">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/7898fead.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:795" data-name="Nav Group - گزارش‌ها">
            <div className="fg-66002a03ce" data-node-id="903:796" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1437" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-fbfe6c292b" data-node-id="903:798" data-name="Label Group">
              <p className="fg-2996ed7236" dir="auto" data-node-id="903:799">
                گزارش‌ها
              </p>
              <div className="fg-3041b2d85a" data-node-id="903:800" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1440" data-name="trending-up">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/73d24f2b.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:802" data-name="Nav Group - تنظیمات">
            <div className="fg-66002a03ce" data-node-id="903:803" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1443" data-name="chevron-left">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/f745641b.svg" />
              </div>
            </div>
            <div className="fg-f0757704bb" data-node-id="903:805" data-name="Label Group">
              <p className="fg-c3598a6087" dir="auto" data-node-id="903:806">
                تنظیمات
              </p>
              <div className="fg-da91c13c70" data-node-id="903:807" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1446" data-name="settings">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/fec4b634.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="903:809" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="903:810" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="903:811">
              کارشناس عملیات ارشد
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="903:812">
              مدیر سیستم پشتیبان
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="903:813" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
