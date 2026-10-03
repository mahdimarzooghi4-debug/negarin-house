// Figma 894:3553 — Admin / Finance Overview — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminFinanceOverviewDesktop() {
  return (
    <div className="fg-a9d80d349c" data-node-id="894:3553" data-name="Admin / Finance Overview — Desktop">
      <div className="fg-e359c64fae" data-node-id="894:3615" data-name="Admin / Finance Overview — Desktop">
        <div className="fg-e16ac02b64" data-node-id="894:3616" data-name="Main Workspace">
          <div className="fg-77ab100845" data-node-id="894:3617" data-name="Header">
            <div className="fg-a34c8fe932" data-node-id="894:3618" data-name="Left Actions">
              <div className="fg-08c31cb510" data-node-id="894:3619" data-name="Staff Profile Circle">
                <img alt="" className="fg-8038e5755b" src="/admin-assets/0241110b.png" />
              </div>
              <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:3620" data-name="Notification Bell Button" label="Notification Bell Button">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/b6e22344.svg" />
              </DesignAction>
            </div>
            <div className="fg-460d084997" data-node-id="894:3624" data-name="Right Header">
              <DesignField className="fg-9ce4e1a1a3" data-node-id="894:3625" data-name="Global Search" label="جستجو" placeholder="جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...">
                <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:3626">
                  جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...
                </p>
                <div className="fg-c51752dc8c" data-node-id="894:3627" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/6c4afaaa.svg" />
                </div>
              </DesignField>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="894:3629">
                داشبورد مالی و تسویه‌حساب‌ها
              </p>
            </div>
          </div>
          <div className="fg-28892a2677" data-node-id="894:3630" data-name="Scrollable Content">
            <div className="fg-867b1b2e34" data-node-id="894:3631" data-name="Operational Summary">
              <DesignAction className="fg-8f76a4e2ed" data-node-id="894:3632" data-name="Metric Shortcut" label="۱۲ مورد درخواست‌های تسویه در انتظار" destination="settlement-requests">
                <p className="fg-8834b4fe70" dir="auto" data-node-id="894:3633">
                  ۱۲ مورد
                </p>
                <p className="fg-774c445393" dir="auto" data-node-id="894:3634">
                  درخواست‌های تسویه در انتظار
                </p>
              </DesignAction>
              <DesignAction className="fg-8f76a4e2ed" data-node-id="894:3635" data-name="Metric Shortcut" label="۸ مورد تسویه‌های در حال پردازش" destination="settlement-requests">
                <p className="fg-eea57500b3" dir="auto" data-node-id="894:3636">
                  ۸ مورد
                </p>
                <p className="fg-774c445393" dir="auto" data-node-id="894:3637">
                  تسویه‌های در حال پردازش
                </p>
              </DesignAction>
              <DesignAction className="fg-8f76a4e2ed" data-node-id="894:3638" data-name="Metric Shortcut" label="۱۴۸ مورد تسویه‌های تکمیل‌شده (۳۰ روز اخیر)" destination="settlement-requests">
                <p className="fg-ba8ade0071" dir="auto" data-node-id="894:3639">
                  ۱۴۸ مورد
                </p>
                <p className="fg-774c445393" dir="auto" data-node-id="894:3640">
                  تسویه‌های تکمیل‌شده (۳۰ روز اخیر)
                </p>
              </DesignAction>
              <DesignAction className="fg-8f76a4e2ed" data-node-id="894:3641" data-name="Metric Shortcut" label="۳ مورد تراکنش‌های مسترد" destination="service-requests">
                <p className="fg-1733ae3e8a" dir="auto" data-node-id="894:3642">
                  ۳ مورد
                </p>
                <p className="fg-774c445393" dir="auto" data-node-id="894:3643">
                  تراکنش‌های مسترد
                </p>
              </DesignAction>
            </div>
            <div className="fg-03bb2e10b3" data-node-id="894:3644" data-name="Dashboard Grid">
              <div className="fg-7aa245312c" data-node-id="894:3645" data-name="Left Column">
                <div className="fg-a0b97fcdaa" data-node-id="894:3646" data-name="Exceptions Section">
                  <p className="fg-4202f57487" dir="auto" data-node-id="894:3647">
                    استثنائات مالی و نیازمند مداخله
                  </p>
                  <div className="fg-24081ceef5" data-node-id="894:3648" data-name="Exceptions List">
                    <div className="fg-3910786a5e" data-node-id="894:3649" data-name="Exception Card">
                      <div className="fg-7ced9ecbbc" data-node-id="894:3650" data-name="Exc Header">
                        <p className="fg-376886d042" dir="auto" data-node-id="894:3651">
                          نیازمند میانجی‌گری
                        </p>
                        <p className="fg-6068afdc55" dir="auto" data-node-id="894:3652">
                          استرداد مورد اختلاف (TRX-4412)
                        </p>
                      </div>
                      <p className="fg-6b6cc5f7d1" dir="auto" data-node-id="894:3653">
                        اختلاف در اصالت اثر ارسالی و تقاضای بازگشت وجه توسط خریدار
                      </p>
                    </div>
                    <div className="fg-3910786a5e" data-node-id="894:3654" data-name="Exception Card">
                      <div className="fg-7ced9ecbbc" data-node-id="894:3655" data-name="Exc Header">
                        <p className="fg-4493b927d9" dir="auto" data-node-id="894:3656">
                          نیازمند اصلاح شبا
                        </p>
                        <p className="fg-6068afdc55" dir="auto" data-node-id="894:3657">
                          خطای پردازش پایا (SET-1011)
                        </p>
                      </div>
                      <p className="fg-6b6cc5f7d1" dir="auto" data-node-id="894:3658">
                        کد شبا نامعتبر است یا توسط بانک پذیرنده رد شده است
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fg-24081ceef5" data-node-id="894:3659" data-name="Transactions Section">
                  <p className="fg-ebba4376f7" dir="auto" data-node-id="894:3660">
                    خلاصه فعالیت تراکنش‌ها
                  </p>
                  <div className="fg-c4a2520ad4" data-node-id="894:3661" data-name="Transactions List">
                    <div className="fg-4638b1ee46" data-node-id="894:3662" data-name="Trx Row">
                      <p className="fg-43e1f0655a" dir="auto" data-node-id="894:3663">
                        ۱۰ دقیقه پیش
                      </p>
                      <p className="fg-434ce9be25" dir="auto" data-node-id="894:3664">
                        +۱۸۵۰۰۰۰ تومان
                      </p>
                      <p className="fg-50f4508c2f" dir="auto" data-node-id="894:3665">
                        رضا رضایی
                      </p>
                      <div className="fg-a05bae617b" data-node-id="894:3666" data-name="Type Badge">
                        <p className="fg-9d90027e17" dir="auto" data-node-id="894:3667">
                          فروش
                        </p>
                      </div>
                      <p className="fg-23e99fa084" data-node-id="894:3668">
                        TRX-9011
                      </p>
                    </div>
                    <div className="fg-4638b1ee46" data-node-id="894:3669" data-name="Trx Row">
                      <p className="fg-43e1f0655a" dir="auto" data-node-id="894:3670">
                        ۱ ساعت پیش
                      </p>
                      <p className="fg-6957aee650" dir="auto" data-node-id="894:3671">
                        -۲۴۰۰۰۰۰ تومان
                      </p>
                      <p className="fg-50f4508c2f" dir="auto" data-node-id="894:3672">
                        نیلوفر عباسی
                      </p>
                      <div className="fg-1c192d4481" data-node-id="894:3673" data-name="Type Badge">
                        <p className="fg-ceb56afd4f" dir="auto" data-node-id="894:3674">
                          تسویه
                        </p>
                      </div>
                      <p className="fg-23e99fa084" data-node-id="894:3675">
                        TRX-9012
                      </p>
                    </div>
                    <div className="fg-4638b1ee46" data-node-id="894:3676" data-name="Trx Row">
                      <p className="fg-43e1f0655a" dir="auto" data-node-id="894:3677">
                        ۳ ساعت پیش
                      </p>
                      <p className="fg-6957aee650" dir="auto" data-node-id="894:3678">
                        -۶۰۰۰۰۰ تومان
                      </p>
                      <p className="fg-50f4508c2f" dir="auto" data-node-id="894:3679">
                        بابک راد
                      </p>
                      <div className="fg-07f5245fc8" data-node-id="894:3680" data-name="Type Badge">
                        <p className="fg-c9037b27ab" dir="auto" data-node-id="894:3681">
                          استرداد
                        </p>
                      </div>
                      <p className="fg-23e99fa084" data-node-id="894:3682">
                        TRX-9013
                      </p>
                    </div>
                    <div className="fg-4638b1ee46" data-node-id="894:3683" data-name="Trx Row">
                      <p className="fg-43e1f0655a" dir="auto" data-node-id="894:3684">
                        ۵ ساعت پیش
                      </p>
                      <p className="fg-434ce9be25" dir="auto" data-node-id="894:3685">
                        +۱۲۰۰۰۰۰ تومان
                      </p>
                      <p className="fg-50f4508c2f" dir="auto" data-node-id="894:3686">
                        سارا محمدی
                      </p>
                      <div className="fg-a05bae617b" data-node-id="894:3687" data-name="Type Badge">
                        <p className="fg-9d90027e17" dir="auto" data-node-id="894:3688">
                          فروش
                        </p>
                      </div>
                      <p className="fg-23e99fa084" data-node-id="894:3689">
                        TRX-9014
                      </p>
                    </div>
                    <div className="fg-d475eb5b42" data-node-id="894:3690" data-name="Trx Row">
                      <p className="fg-43e1f0655a" dir="auto" data-node-id="894:3691">
                        ۱ روز پیش
                      </p>
                      <p className="fg-6957aee650" dir="auto" data-node-id="894:3692">
                        -۴۵۰۰۰۰۰ تومان
                      </p>
                      <p className="fg-50f4508c2f" dir="auto" data-node-id="894:3693">
                        امیر تهرانی
                      </p>
                      <div className="fg-1c192d4481" data-node-id="894:3694" data-name="Type Badge">
                        <p className="fg-ceb56afd4f" dir="auto" data-node-id="894:3695">
                          تسویه
                        </p>
                      </div>
                      <p className="fg-23e99fa084" data-node-id="894:3696">
                        TRX-9015
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-0c72ada7e1" data-node-id="894:3697" data-name="Right Column">
                <p className="fg-ebba4376f7" dir="auto" data-node-id="894:3698">
                  درخواست‌های تسویه نیازمند اقدام
                </p>
                <div className="fg-cb667e7a05" data-node-id="894:3699" data-name="Table Wrapper">
                  <div className="fg-5a60ba4653" data-node-id="894:3700" data-name="Table Header Row">
                    <p className="fg-fa0d4d9a92" dir="auto" data-node-id="894:3701">
                      اقدام
                    </p>
                    <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:3702">
                      وضعیت
                    </p>
                    <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3703">
                      تاریخ ثبت
                    </p>
                    <p className="fg-c68de40718" dir="auto" data-node-id="894:3704">
                      مبلغ درخواست
                    </p>
                    <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:3705">
                      هنرمند
                    </p>
                    <p className="fg-33074dfcf6" dir="auto" data-node-id="894:3706">
                      شناسه
                    </p>
                  </div>
                  <div className="fg-c475d979ca" data-node-id="894:3707" data-name="Table Body">
                    <div className="fg-4f547a8b42" data-node-id="894:3708" data-name="Table Row">
                      <DesignAction className="fg-1fbe046d7b" data-node-id="894:3709" data-name="Col Action" label="بررسی" destination="settlement-requests">
                        <p className="fg-07cda96c5d" dir="auto" data-node-id="894:3710">
                          بررسی
                        </p>
                      </DesignAction>
                      <div className="fg-82303a202c" data-node-id="894:3711" data-name="Col Status">
                        <div className="fg-f858729e81" data-node-id="894:3712" data-name="Badge">
                          <p className="fg-024e3e4169" dir="auto" data-node-id="894:3713">
                            در انتظار بررسی
                          </p>
                        </div>
                      </div>
                      <p className="fg-7f42459aa3" dir="auto" data-node-id="894:3714">
                        ۳ ساعت پیش
                      </p>
                      <p className="fg-094d24e25e" dir="auto" data-node-id="894:3715">
                        ۴۵۰۰۰۰۰ تومان
                      </p>
                      <p className="fg-ddda882120" dir="auto" data-node-id="894:3716">
                        زهرا کریمی
                      </p>
                      <p className="fg-de2d23cb2b" data-node-id="894:3717">
                        SET-1024
                      </p>
                    </div>
                    <div className="fg-4f547a8b42" data-node-id="894:3718" data-name="Table Row">
                      <DesignAction className="fg-1fbe046d7b" data-node-id="894:3719" data-name="Col Action" label="بررسی" destination="settlement-requests">
                        <p className="fg-07cda96c5d" dir="auto" data-node-id="894:3720">
                          بررسی
                        </p>
                      </DesignAction>
                      <div className="fg-82303a202c" data-node-id="894:3721" data-name="Col Status">
                        <div className="fg-f858729e81" data-node-id="894:3722" data-name="Badge">
                          <p className="fg-024e3e4169" dir="auto" data-node-id="894:3723">
                            در انتظار بررسی
                          </p>
                        </div>
                      </div>
                      <p className="fg-7f42459aa3" dir="auto" data-node-id="894:3724">
                        ۵ ساعت پیش
                      </p>
                      <p className="fg-094d24e25e" dir="auto" data-node-id="894:3725">
                        ۱۲۸۰۰۰۰ تومان
                      </p>
                      <p className="fg-ddda882120" dir="auto" data-node-id="894:3726">
                        حمید رضا رضایی
                      </p>
                      <p className="fg-de2d23cb2b" data-node-id="894:3727">
                        SET-1025
                      </p>
                    </div>
                    <div className="fg-4f547a8b42" data-node-id="894:3728" data-name="Table Row">
                      <DesignAction className="fg-1fbe046d7b" data-node-id="894:3729" data-name="Col Action" label="بررسی" destination="settlement-requests">
                        <p className="fg-07cda96c5d" dir="auto" data-node-id="894:3730">
                          بررسی
                        </p>
                      </DesignAction>
                      <div className="fg-82303a202c" data-node-id="894:3731" data-name="Col Status">
                        <div className="fg-f858729e81" data-node-id="894:3732" data-name="Badge">
                          <p className="fg-024e3e4169" dir="auto" data-node-id="894:3733">
                            در انتظار تایید
                          </p>
                        </div>
                      </div>
                      <p className="fg-7f42459aa3" dir="auto" data-node-id="894:3734">
                        ۱ روز پیش
                      </p>
                      <p className="fg-094d24e25e" dir="auto" data-node-id="894:3735">
                        ۸۵۰۰۰۰۰ تومان
                      </p>
                      <p className="fg-ddda882120" dir="auto" data-node-id="894:3736">
                        علی علوی
                      </p>
                      <p className="fg-de2d23cb2b" data-node-id="894:3737">
                        SET-1026
                      </p>
                    </div>
                    <div className="fg-0a1861513f" data-node-id="894:3738" data-name="Table Row">
                      <DesignAction className="fg-1fbe046d7b" data-node-id="894:3739" data-name="Col Action" label="بررسی" destination="settlement-requests">
                        <p className="fg-07cda96c5d" dir="auto" data-node-id="894:3740">
                          بررسی
                        </p>
                      </DesignAction>
                      <div className="fg-82303a202c" data-node-id="894:3741" data-name="Col Status">
                        <div className="fg-f858729e81" data-node-id="894:3742" data-name="Badge">
                          <p className="fg-024e3e4169" dir="auto" data-node-id="894:3743">
                            در انتظار بررسی
                          </p>
                        </div>
                      </div>
                      <p className="fg-7f42459aa3" dir="auto" data-node-id="894:3744">
                        ۲ روز پیش
                      </p>
                      <p className="fg-094d24e25e" dir="auto" data-node-id="894:3745">
                        ۳۴۰۰۰۰ تومان
                      </p>
                      <p className="fg-ddda882120" dir="auto" data-node-id="894:3746">
                        مریم حسینی
                      </p>
                      <p className="fg-de2d23cb2b" data-node-id="894:3747">
                        SET-1027
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-734182496e" data-node-id="894:3554" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:3555" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:3556">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="894:3557" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="894:3558" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:3559" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:3560" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:3561" data-name="dashboard-icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/50e3d057.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:3563">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:3564" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:3565" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3566" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:3567" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/64daf5fe.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3569">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:3570" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:3571" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:3572" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/e4095ba6.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3574">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3575" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3576" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:3577" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/d223247e.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3579">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3580" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3581" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:3582" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3059718a.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3584">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3585" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3586" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:3587" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f1d6b8aa.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3589">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3590" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:3591" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:3592" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/326d0c30.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:3594">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3595" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:3596" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:3597" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/dadf67c2.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3599">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3600" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3601" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:3602" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/72e3c95e.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3604">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3605" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3606" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:3607" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/5975000e.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3609">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:3610" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:3611" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:3612">
              کارشناس عملیات مالی
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:3613">
              مدیر مالی و تسویه‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:3614" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a00df1d2.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
