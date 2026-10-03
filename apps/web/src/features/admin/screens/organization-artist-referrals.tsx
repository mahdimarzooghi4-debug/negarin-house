// Figma 894:3355 — Admin / Organization Artist Referrals — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOrganizationArtistReferralsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:3355" data-name="Admin / Organization Artist Referrals — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:3356" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:3357" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:3358" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:3359" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/b9ca6baa.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:3360" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:3364" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:3365" data-name="Global Search" label="جستجو" placeholder="جستجو در سازمان‌ها، برنامه‌های حمایتی و کدهای پیگیری...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="894:3366">
                جستجو در سازمان‌ها، برنامه‌های حمایتی و کدهای پیگیری...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:3367" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:3369">
              لیست معرفی‌نامه‌های هنرمندان
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:3370" data-name="Scrollable Content">
          <div className="fg-43fc3f35b0" data-node-id="894:3371" data-name="Breadcrumbs Row">
            <p className="fg-dbd7dea966" dir="auto" data-node-id="894:3372">
              توجه: ثبت معرفی‌نامه به منزله تأیید نهایی عضویت یا تخصیص سهمیه نیست و نیازمند بررسی مدارک توسط کارشناس است.
            </p>
            <div className="fg-91d20ad9f5" data-node-id="894:3373" data-name="Breadcrumbs">
              <p className="fg-fb36021cec" dir="auto" data-node-id="894:3374">
                معرفی هنرمندان
              </p>
              <p className="fg-b80efb661d" data-node-id="894:3375">{`>`}</p>
              <p className="fg-597fe7f1f0" dir="auto" data-node-id="894:3376">
                بنیاد هنرهای سنتی
              </p>
              <p className="fg-b80efb661d" data-node-id="894:3377">{`>`}</p>
              <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:3378">
                سازمان‌های حامی
              </p>
            </div>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="894:3379" data-name="Filters Card">
            <div className="fg-c96fe10678" data-node-id="894:3380" data-name="Filter Content">
              <div className="fg-9708e8d183" data-node-id="894:3381" data-name="Interactive Filter Badges">
                <div className="fg-89553f2c19" data-node-id="894:3382" data-name="Filter">
                  <p className="fg-7c79984bbb" dir="auto" data-node-id="894:3383">
                    وضعیت پذیرش (همه)
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:3384" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="894:3385">
                    در انتظار بررسی
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:3386" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="894:3387">
                    تأیید شده
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:3388" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="894:3389">
                    رد شده
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="fg-c7a881f669" data-node-id="894:3390" data-name="Referrals Table Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="894:3391">
              لیست معرفی‌نامه‌های دریافتی از بنیاد هنرهای سنتی
            </p>
            <div className="fg-ceebe80a1f" data-node-id="894:3392" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="894:3393" data-name="Table Header Row">
                <p className="fg-207ea3ad86" dir="auto" data-node-id="894:3394">
                  اقدام
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:3395">
                  وضعیت هنرمند
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3396">
                  سطح رشد فعلی
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3397">
                  حمایت سهمیه
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3398">
                  وضعیت عضویت
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:3399">
                  وضعیت پذیرش
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3400">
                  تاریخ معرفی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:3401">
                  هنرمند معرفی‌شده
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="894:3402" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="894:3403" data-name="TRow">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3404" data-name="Col Action" label="مشاهده">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3405">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-79459257d8" dir="auto" data-node-id="894:3406">
                    فعال
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3407">
                    شکوفه
                  </p>
                  <p className="fg-803007c664" dir="auto" data-node-id="894:3408">
                    دارای سهمیه
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3409">
                    فعال
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:3410" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:3411" data-name="Frame">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3412">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" data-node-id="894:3413">
                    ۱۴۰۲/۱۰/۰۲
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3414" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3415">
                      زهرا کریمی
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3416">
                      ART-2051
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:3417" data-name="TRow">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3418" data-name="Col Action" label="مشاهده">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3419">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-79459257d8" dir="auto" data-node-id="894:3420">
                    فعال
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3421">
                    جوانه
                  </p>
                  <p className="fg-4238471968" data-node-id="894:3422">
                    —
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3423">
                    فعال
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:3424" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:3425" data-name="Frame">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3426">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" data-node-id="894:3427">
                    ۱۴۰۲/۱۰/۰۳
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3428" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3429">
                      محمد محسنی
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3430">
                      ART-2052
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:3431" data-name="TRow">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3432" data-name="Col Action" label="مشاهده">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3433">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-79459257d8" dir="auto" data-node-id="894:3434">
                    فعال
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3435">
                    سرو زرین
                  </p>
                  <p className="fg-803007c664" dir="auto" data-node-id="894:3436">
                    دارای سهمیه
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3437">
                    فعال
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:3438" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:3439" data-name="Frame">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3440">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" data-node-id="894:3441">
                    ۱۴۰۲/۱۰/۰۴
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3442" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3443">
                      سودابه یزدانی
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3444">
                      ART-2053
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:3445" data-name="TRow">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3446" data-name="Col Action" label="مشاهده">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3447">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-de861aa5d7" data-node-id="894:3448">
                    —
                  </p>
                  <p className="fg-8fda5c5742" data-node-id="894:3449">
                    —
                  </p>
                  <p className="fg-4238471968" data-node-id="894:3450">
                    —
                  </p>
                  <p className="fg-4238471968" dir="auto" data-node-id="894:3451">
                    در انتظار
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:3452" data-name="Frame">
                    <div className="fg-8c9afb9183" data-node-id="894:3453" data-name="Frame">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:3454">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" data-node-id="894:3455">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3456" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3457">
                      کیوان فرزاد
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3458">
                      ART-2054
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:3459" data-name="TRow">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3460" data-name="Col Action" label="مشاهده">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3461">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-de861aa5d7" data-node-id="894:3462">
                    —
                  </p>
                  <p className="fg-8fda5c5742" data-node-id="894:3463">
                    —
                  </p>
                  <p className="fg-4238471968" data-node-id="894:3464">
                    —
                  </p>
                  <p className="fg-4238471968" dir="auto" data-node-id="894:3465">
                    در انتظار
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:3466" data-name="Frame">
                    <div className="fg-8c9afb9183" data-node-id="894:3467" data-name="Frame">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:3468">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" data-node-id="894:3469">
                    ۱۴۰۲/۱۰/۱۴
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3470" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3471">
                      سحر الوندی
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3472">
                      ART-2055
                    </p>
                  </div>
                </div>
                <div className="fg-836f598d9f" data-node-id="894:3473" data-name="TRow">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:3474" data-name="Col Action" label="مشاهده">
                    <p className="fg-562985b02c" dir="auto" data-node-id="894:3475">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-79ed1a70ea" dir="auto" data-node-id="894:3476">
                    غیرفعال
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3477">
                    جوانه
                  </p>
                  <p className="fg-4238471968" data-node-id="894:3478">
                    —
                  </p>
                  <p className="fg-4238471968" data-node-id="894:3479">
                    —
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:3480" data-name="Frame">
                    <div className="fg-f5a735ebf8" data-node-id="894:3481" data-name="Frame">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="894:3482">
                        رد شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-8fda5c5742" data-node-id="894:3483">
                    ۱۴۰۲/۰۹/۲۰
                  </p>
                  <div className="fg-c7e21226fd" data-node-id="894:3484" data-name="Frame">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:3485">
                      کامران دیبا
                    </p>
                    <p className="fg-58d61dbfc5" data-node-id="894:3486">
                      ART-2041
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:3487" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:3488" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:3489">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="894:3490" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:261" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:3492" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:3493" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:3494" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/0f5a52de.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:3495">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:3496" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:3497" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3498" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:3499" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3501">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:3502" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:3503" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:3504" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3506">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3507" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3508" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:3509" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3511">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3512" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3513" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:3514" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3516">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3517" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:3518" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:3519" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:3521">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3522" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3523" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:3524" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3526">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3527" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:3528" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:3529" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3531">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3532" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3533" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:3534" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3536">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3537" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3538" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:3539" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3541">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:3542" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:3543" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:3544">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:3545">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:3546" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/4e2c9aef.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
