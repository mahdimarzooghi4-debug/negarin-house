// Figma 903:518 — Admin / Report Detail — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminReportDetailDesktop() {
  return (
    <div className="fg-2f84151df8" data-node-id="903:518" data-name="Admin / Report Detail — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:593" data-name="Main Workspace">
        <div className="fg-aa86f531f3" data-node-id="903:594" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:595" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:596" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="903:597" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="903:598" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-ccdeeb4977" data-node-id="903:599" data-name="Icon Container">
                <div className="fg-58d29b27c0" data-node-id="903:1386" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3afd6085.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="903:601" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="903:602" data-name="Global Search" label="جستجو" placeholder="جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="903:603">
                جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...
              </p>
              <div className="fg-c5bca379c9" data-node-id="903:604" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1389" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </div>
            </DesignField>
            <div className="fg-db65f399cd" data-node-id="903:606" data-name="Title and Path">
              <div className="fg-860c2f1554" data-node-id="903:607" data-name="Breadcrumbs">
                <div className="fg-f1a0c10dac" data-node-id="903:608" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:609">
                    گزارش‌ها
                  </p>
                  <p className="fg-29a4797011" data-node-id="903:610">{`>`}</p>
                </div>
                <div className="fg-f1a0c10dac" data-node-id="903:611" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:612">
                    سفارشات
                  </p>
                  <p className="fg-29a4797011" data-node-id="903:613">{`>`}</p>
                </div>
                <div className="fg-e8210ba625" data-node-id="903:614" data-name="Frame">
                  <p className="fg-79f0034e69" dir="auto" data-node-id="903:615">
                    وضعیت سفارشات
                  </p>
                </div>
              </div>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="903:616">
                گزارش وضعیت سفارشات
              </p>
            </div>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="903:617" data-name="Scrollable Content">
          <div className="fg-02bb0cecf2" data-node-id="903:618" data-name="Filters and Action Bar">
            <DesignAction className="fg-765fed4140" data-node-id="903:619" data-name="Export Action" label="دریافت خروجی گزارش (CSV)">
              <p className="fg-8ffc872800" dir="auto" data-node-id="903:620">
                دریافت خروجی گزارش (CSV)
              </p>
              <div className="fg-922563b3e9" data-node-id="903:621" data-name="Icon Container">
                <div className="fg-5cca20e57d" data-node-id="903:1392" data-name="download">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/39a5aa61.svg" />
                </div>
              </div>
            </DesignAction>
            <div className="fg-ad50363799" data-node-id="903:623" data-name="Filters">
              <div className="fg-6ea4dc7891" data-node-id="903:624" data-name="Filter Pill">
                <p className="fg-71ce793e77" dir="auto" data-node-id="903:625">
                  دسته محصول: همه آثار
                </p>
              </div>
              <div className="fg-6ea4dc7891" data-node-id="903:626" data-name="Filter Pill">
                <p className="fg-71ce793e77" dir="auto" data-node-id="903:627">
                  وضعیت سفارش: همه موارد
                </p>
              </div>
              <div className="fg-89553f2c19" data-node-id="903:628" data-name="Filter Pill">
                <p className="fg-ff4c51614b" dir="auto" data-node-id="903:629">
                  محدوده تاریخ: ۳۰ روز گذشته
                </p>
              </div>
            </div>
          </div>
          <div className="fg-867b1b2e34" data-node-id="903:630" data-name="Operational Summary">
            <DesignAction className="fg-616d4e64ad" data-node-id="903:631" data-name="Metric Shortcut" label="۱,۲۴۸ کل سفارشات" >
              <p className="fg-9728c0b444" data-node-id="903:632">
                ۱,۲۴۸
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="903:633">
                کل سفارشات
              </p>
            </DesignAction>
            <DesignAction className="fg-616d4e64ad" data-node-id="903:634" data-name="Metric Shortcut" label="۳۲ در انتظار تأیید" >
              <p className="fg-f18fe9a823" data-node-id="903:635">
                ۳۲
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="903:636">
                در انتظار تأیید
              </p>
            </DesignAction>
            <DesignAction className="fg-b90e01578b" data-node-id="903:637" data-name="Metric Shortcut" label="۸۷ در حال پردازش" >
              <p className="fg-791fde6e0f" data-node-id="903:638">
                ۸۷
              </p>
              <p className="fg-4bcc234a39" dir="auto" data-node-id="903:639">
                در حال پردازش
              </p>
            </DesignAction>
            <DesignAction className="fg-616d4e64ad" data-node-id="903:640" data-name="Metric Shortcut" label="۱۵۶ ارسال‌شده" >
              <p className="fg-074eadf4bf" data-node-id="903:641">
                ۱۵۶
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="903:642">
                ارسال‌شده
              </p>
            </DesignAction>
            <DesignAction className="fg-616d4e64ad" data-node-id="903:643" data-name="Metric Shortcut" label="۹۴۳ تحویل‌شده" >
              <p className="fg-9de1f6a6f9" data-node-id="903:644">
                ۹۴۳
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="903:645">
                تحویل‌شده
              </p>
            </DesignAction>
            <DesignAction className="fg-616d4e64ad" data-node-id="903:646" data-name="Metric Shortcut" label="۳۰ مسئله‌دار" >
              <p className="fg-4318f122ae" data-node-id="903:647">
                ۳۰
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="903:648">
                مسئله‌دار
              </p>
            </DesignAction>
          </div>
          <div className="fg-347137de39" data-node-id="903:649" data-name="Worklist Section">
            <div className="fg-ceebe80a1f" data-node-id="903:650" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="903:651" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="903:652">
                  عملیات
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="903:653">
                  آخرین تغییر
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="903:654">
                  تاریخ ثبت
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:655">
                  محصول خریداری‌شده
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="903:656">
                  هنرمند
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="903:657">
                  وضعیت
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="903:658">
                  شناسه سفارش
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="903:659" data-name="Table Body">
                <div className="fg-12192fcff3" data-node-id="903:660" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:661" data-name="Col Action" label="مشاهده جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:662">
                      مشاهده جزئیات
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="903:663">
                    ۱۴۰۲/۱۰/۱۸
                  </p>
                  <p className="fg-4238471968" data-node-id="903:664">
                    ۱۴۰۲/۱۰/۱۶
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="903:665">
                    قالیچه تمام ابریشم تبریز کد ۱۲
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="903:666">
                    رضا رضایی
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:667" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="903:668" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="903:669">
                        تحویل‌شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-bb0bfceabe" data-node-id="903:670">
                    ORD-9412
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="903:671" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:672" data-name="Col Action" label="مشاهده جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:673">
                      مشاهده جزئیات
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="903:674">
                    ۱۴۰۲/۱۰/۱۷
                  </p>
                  <p className="fg-4238471968" data-node-id="903:675">
                    ۱۴۰۲/۱۰/۱۶
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="903:676">
                    گلدان سفالی لعاب‌دار فیروزه
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="903:677">
                    نیلوفر عباسی
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:678" data-name="Col Status">
                    <div className="fg-c9a49f4476" data-node-id="903:679" data-name="Badge">
                      <p className="fg-645e8110ca" dir="auto" data-node-id="903:680">
                        در حال پردازش
                      </p>
                    </div>
                  </div>
                  <p className="fg-bb0bfceabe" data-node-id="903:681">
                    ORD-9413
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="903:682" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:683" data-name="Col Action" label="مشاهده جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:684">
                      مشاهده جزئیات
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="903:685">
                    ۱۴۰۲/۱۰/۱۶
                  </p>
                  <p className="fg-4238471968" data-node-id="903:686">
                    ۱۴۰۲/۱۰/۱۵
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="903:687">
                    مجموعه مینیاتور نگارگری مکتب اصفهان
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="903:688">
                    بابک راد
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:689" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="903:690" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="903:691">
                        مسئله‌دار
                      </p>
                    </div>
                  </div>
                  <p className="fg-bb0bfceabe" data-node-id="903:692">
                    ORD-9414
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="903:693" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:694" data-name="Col Action" label="مشاهده جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:695">
                      مشاهده جزئیات
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="903:696">
                    ۱۴۰۲/۱۰/۱۵
                  </p>
                  <p className="fg-4238471968" data-node-id="903:697">
                    ۱۴۰۲/۱۰/۱۴
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="903:698">
                    بشقاب میناکاری اصفهان طرح شمسه
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="903:699">
                    سارا محمدی
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:700" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="903:701" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="903:702">
                        ارسال‌شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-bb0bfceabe" data-node-id="903:703">
                    ORD-9415
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="903:704" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:705" data-name="Col Action" label="مشاهده جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:706">
                      مشاهده جزئیات
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="903:707">
                    ۱۴۰۲/۱۰/۱۴
                  </p>
                  <p className="fg-4238471968" data-node-id="903:708">
                    ۱۴۰۲/۱۰/۱۴
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="903:709">
                    سینی مسی قلم‌زنی دست‌ساز شیراز
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="903:710">
                    امیر تهرانی
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:711" data-name="Col Status">
                    <div className="fg-d7139b82ce" data-node-id="903:712" data-name="Badge">
                      <p className="fg-ade22fcf80" dir="auto" data-node-id="903:713">
                        در انتظار تأیید
                      </p>
                    </div>
                  </div>
                  <p className="fg-bb0bfceabe" data-node-id="903:714">
                    ORD-9416
                  </p>
                </div>
                <div className="fg-12192fcff3" data-node-id="903:715" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="903:716" data-name="Col Action" label="مشاهده جزئیات">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="903:717">
                      مشاهده جزئیات
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="903:718">
                    ۱۴۰۲/۱۰/۱۵
                  </p>
                  <p className="fg-4238471968" data-node-id="903:719">
                    ۱۴۰۲/۱۰/۱۳
                  </p>
                  <p className="fg-50225ff4bd" dir="auto" data-node-id="903:720">
                    رومیزی پته‌دوزی کرمان طرح ترنج
                  </p>
                  <p className="fg-2460fb40d1" dir="auto" data-node-id="903:721">
                    فاطمه حسینی
                  </p>
                  <div className="fg-82303a202c" data-node-id="903:722" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="903:723" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="903:724">
                        تحویل‌شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-bb0bfceabe" data-node-id="903:725">
                    ORD-9417
                  </p>
                </div>
              </div>
              <div className="fg-b41c1dd5f3" data-node-id="903:726" data-name="Pagination">
                <div className="fg-92b7da7864" data-node-id="903:727" data-name="Pagination Buttons">
                  <DesignAction className="fg-ea51d20d85" data-node-id="903:728" data-name="Prev Button" label="قبلی">
                    <p className="fg-63174a1a4b" dir="auto" data-node-id="903:729">
                      قبلی
                    </p>
                  </DesignAction>
                  <div className="fg-9951e6e211" data-node-id="903:730" data-name="Page Pill Active">
                    <p className="fg-7c79984bbb" data-node-id="903:731">
                      ۱
                    </p>
                  </div>
                  <div className="fg-fef640a389" data-node-id="903:732" data-name="Page Pill Default">
                    <p className="fg-35eebb81d9" data-node-id="903:733">
                      ۲
                    </p>
                  </div>
                  <div className="fg-fef640a389" data-node-id="903:734" data-name="Page Pill Default">
                    <p className="fg-35eebb81d9" data-node-id="903:735">
                      ۳
                    </p>
                  </div>
                  <DesignAction className="fg-ea51d20d85" data-node-id="903:736" data-name="Next Button" label="بعدی">
                    <p className="fg-63174a1a4b" dir="auto" data-node-id="903:737">
                      بعدی
                    </p>
                  </DesignAction>
                </div>
                <p className="fg-35eebb81d9" dir="auto" data-node-id="903:738">
                  نمایش ۱ تا ۶ از ۱,۲۴۸ نتیجه پیدا شده
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:519" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="903:520" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="903:521">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="903:522" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:278" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="903:524" data-name="Navigation">
          <div className="fg-4a871e0b11" data-node-id="903:525" data-name="Nav Group - هنرمندان">
            <div className="fg-66002a03ce" data-node-id="903:526" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1332" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-3d814de2a2" data-node-id="903:528" data-name="Label Group">
              <p className="fg-b79c8b94b2" dir="auto" data-node-id="903:529">
                هنرمندان
              </p>
              <div className="fg-e747b81e51" data-node-id="903:530" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1335" data-name="users">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f8ecedc7.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:532" data-name="Nav Group - بازار">
            <div className="fg-66002a03ce" data-node-id="903:533" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1338" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-03e9160301" data-node-id="903:535" data-name="Label Group">
              <p className="fg-b32cdc0c3d" dir="auto" data-node-id="903:536">
                بازار
              </p>
              <div className="fg-0495670d86" data-node-id="903:537" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1341" data-name="shopping-bag">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/735bc7e1.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:539" data-name="Nav Group - سفارش و ارسال">
            <div className="fg-66002a03ce" data-node-id="903:540" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1344" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-f382adfae7" data-node-id="903:542" data-name="Label Group">
              <p className="fg-d3dc98ec1a" dir="auto" data-node-id="903:543">
                سفارش و ارسال
              </p>
              <div className="fg-21a7e4c908" data-node-id="903:544" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1347" data-name="truck">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/0efab747.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:546" data-name="Nav Group - رشد و خدمات">
            <div className="fg-66002a03ce" data-node-id="903:547" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1350" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-d87227fb46" data-node-id="903:549" data-name="Label Group">
              <p className="fg-5d47f1d2f4" dir="auto" data-node-id="903:550">
                رشد و خدمات
              </p>
              <div className="fg-bb81ba1266" data-node-id="903:551" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1353" data-name="award">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/9d31bb3e.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:553" data-name="Nav Group - فرصت‌ها">
            <div className="fg-66002a03ce" data-node-id="903:554" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1356" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-4e71a3c96b" data-node-id="903:556" data-name="Label Group">
              <p className="fg-a00b815a53" dir="auto" data-node-id="903:557">
                فرصت‌ها
              </p>
              <div className="fg-78d08da6be" data-node-id="903:558" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1359" data-name="briefcase">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/66bfa012.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:560" data-name="Nav Group - مالی و عضویت">
            <div className="fg-66002a03ce" data-node-id="903:561" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1362" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-bd12e2ac82" data-node-id="903:563" data-name="Label Group">
              <p className="fg-ed94e4edb1" dir="auto" data-node-id="903:564">
                مالی و عضویت
              </p>
              <div className="fg-ce26aa0e85" data-node-id="903:565" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1365" data-name="credit-card">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/23e2b086.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:567" data-name="Nav Group - بین‌الملل">
            <div className="fg-66002a03ce" data-node-id="903:568" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1368" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-4e71a3c96b" data-node-id="903:570" data-name="Label Group">
              <p className="fg-a00b815a53" dir="auto" data-node-id="903:571">
                بین‌الملل
              </p>
              <div className="fg-78d08da6be" data-node-id="903:572" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1371" data-name="globe">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/e48b5ba4.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:574" data-name="Nav Group - گزارش‌ها">
            <div className="fg-66002a03ce" data-node-id="903:575" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1374" data-name="chevron-left">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/f745641b.svg" />
              </div>
            </div>
            <div className="fg-fbfe6c292b" data-node-id="903:577" data-name="Label Group">
              <p className="fg-2996ed7236" dir="auto" data-node-id="903:578">
                گزارش‌ها
              </p>
              <div className="fg-3041b2d85a" data-node-id="903:579" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1377" data-name="trending-up">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/b2ce7318.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:581" data-name="Nav Group - تنظیمات">
            <div className="fg-66002a03ce" data-node-id="903:582" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1380" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-f0757704bb" data-node-id="903:584" data-name="Label Group">
              <p className="fg-c3598a6087" dir="auto" data-node-id="903:585">
                تنظیمات
              </p>
              <div className="fg-da91c13c70" data-node-id="903:586" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1383" data-name="settings">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/fec4b634.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="903:588" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="903:589" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="903:590">
              کارشناس عملیات ارشد
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="903:591">
              مدیر سیستم پشتیبان
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="903:592" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
