// Figma 894:3749 — Admin / Settlement Requests — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminSettlementRequestsDesktop() {
  return (
    <div className="fg-a9d80d349c" data-node-id="894:3749" data-name="Admin / Settlement Requests — Desktop">
      <div className="fg-e359c64fae" data-node-id="894:3811" data-name="Admin / Settlement Requests — Desktop">
        <div className="fg-e16ac02b64" data-node-id="894:3812" data-name="Main Workspace">
          <div className="fg-77ab100845" data-node-id="894:3813" data-name="Header">
            <div className="fg-a34c8fe932" data-node-id="894:3814" data-name="Left Actions">
              <div className="fg-08c31cb510" data-node-id="894:3815" data-name="Staff Profile Circle">
                <img alt="" className="fg-8038e5755b" src="/admin-assets/1d306017.png" />
              </div>
              <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:3816" data-name="Notification Bell Button" label="Notification Bell Button">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/764efd5c.svg" />
              </DesignAction>
            </div>
            <div className="fg-460d084997" data-node-id="894:3820" data-name="Right Header">
              <DesignField className="fg-9ce4e1a1a3" data-node-id="894:3821" data-name="Global Search" label="جستجو" placeholder="جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...">
                <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:3822">
                  جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...
                </p>
                <div className="fg-c51752dc8c" data-node-id="894:3823" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/42fc783a.svg" />
                </div>
              </DesignField>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="894:3825">
                مدیریت درخواست‌های تسویه‌حساب
              </p>
            </div>
          </div>
          <div className="fg-28892a2677" data-node-id="894:3826" data-name="Scrollable Content">
            <div className="fg-867b1b2e34" data-node-id="894:3827" data-name="Operational Summary">
              <DesignAction className="fg-8f76a4e2ed" data-node-id="894:3828" data-name="Metric Shortcut" label="۴۸ درخواست کل درخواست‌های ماه" destination="service-requests">
                <p className="fg-5d24156dfa" dir="auto" data-node-id="894:3829">
                  ۴۸ درخواست
                </p>
                <p className="fg-774c445393" dir="auto" data-node-id="894:3830">
                  کل درخواست‌های ماه
                </p>
              </DesignAction>
              <DesignAction className="fg-8f76a4e2ed" data-node-id="894:3831" data-name="Metric Shortcut" label="۱۲ مورد در انتظار بررسی" destination="product-review-queue">
                <p className="fg-8834b4fe70" dir="auto" data-node-id="894:3832">
                  ۱۲ مورد
                </p>
                <p className="fg-774c445393" dir="auto" data-node-id="894:3833">
                  در انتظار بررسی
                </p>
              </DesignAction>
              <DesignAction className="fg-8f76a4e2ed" data-node-id="894:3834" data-name="Metric Shortcut" label="۸ مورد در حال پردازش" destination="service-requests">
                <p className="fg-eea57500b3" dir="auto" data-node-id="894:3835">
                  ۸ مورد
                </p>
                <p className="fg-774c445393" dir="auto" data-node-id="894:3836">
                  در حال پردازش
                </p>
              </DesignAction>
              <DesignAction className="fg-8f76a4e2ed" data-node-id="894:3837" data-name="Metric Shortcut" label="۲۸ مورد تکمیل‌شده" destination="service-requests">
                <p className="fg-ba8ade0071" dir="auto" data-node-id="894:3838">
                  ۲۸ مورد
                </p>
                <p className="fg-774c445393" dir="auto" data-node-id="894:3839">
                  تکمیل‌شده
                </p>
              </DesignAction>
            </div>
            <div className="fg-89c5c241e8" data-node-id="894:3840" data-name="Filters Row">
              <div className="fg-c96fe10678" data-node-id="894:3841" data-name="Filter Content">
                <div className="fg-9708e8d183" data-node-id="894:3842" data-name="Interactive Filter Badges">
                  <div className="fg-a3b2a587b5" data-node-id="894:3843" data-name="Filter">
                    <p className="fg-899c8bd72f" dir="auto" data-node-id="894:3844">
                      وضعیت تسویه
                    </p>
                  </div>
                  <div className="fg-a3b2a587b5" data-node-id="894:3845" data-name="Filter">
                    <p className="fg-899c8bd72f" dir="auto" data-node-id="894:3846">
                      نیاز به اقدام
                    </p>
                  </div>
                </div>
                <DesignField className="fg-e8210ba625" data-node-id="894:3847" data-name="Search Section" label="جستجو" placeholder="شناسه تسویه (SET-XXXX) یا نام هنرمند...">
                  <div className="fg-83f738a02a" data-node-id="894:3848" data-name="Search Input Container">
                    <p className="fg-f68c5e162d" dir="auto" data-node-id="894:3849">
                      شناسه تسویه (SET-XXXX) یا نام هنرمند...
                    </p>
                  </div>
                </DesignField>
              </div>
            </div>
            <div className="fg-c7a881f669" data-node-id="894:3850" data-name="Worklist Section">
              <p className="fg-5f8b9f0bac" dir="auto" data-node-id="894:3851">
                لیست درخواست‌های تسویه
              </p>
              <div className="fg-cb667e7a05" data-node-id="894:3852" data-name="Table Wrapper">
                <div className="fg-5a60ba4653" data-node-id="894:3853" data-name="Table Header Row">
                  <p className="fg-fa0d4d9a92" dir="auto" data-node-id="894:3854">
                    اقدام
                  </p>
                  <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3855">
                    کارشناس مالی
                  </p>
                  <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3856">
                    اقدام مورد نیاز
                  </p>
                  <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:3857">
                    وضعیت
                  </p>
                  <p className="fg-c68de40718" dir="auto" data-node-id="894:3858">
                    مبلغ درخواستی (تومان)
                  </p>
                  <p className="fg-8d481b53ec" dir="auto" data-node-id="894:3859">
                    تاریخ درخواست
                  </p>
                  <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:3860">
                    هنرمند
                  </p>
                  <p className="fg-648e3447c7" dir="auto" data-node-id="894:3861">
                    شناسه تسویه
                  </p>
                </div>
                <div className="fg-c475d979ca" data-node-id="894:3862" data-name="Table Body">
                  <div className="fg-4f547a8b42" data-node-id="894:3863" data-name="Table Row">
                    <DesignAction className="fg-1fbe046d7b" data-node-id="894:3864" data-name="Col Action" label="بررسی" destination="settlement-detail">
                      <p className="fg-daa786dbb1" dir="auto" data-node-id="894:3865">
                        بررسی
                      </p>
                    </DesignAction>
                    <p className="fg-1a83b0c863" dir="auto" data-node-id="894:3866">
                      تخصیص نشده
                    </p>
                    <p className="fg-7ad1ee0600" dir="auto" data-node-id="894:3867">
                      بررسی
                    </p>
                    <div className="fg-82303a202c" data-node-id="894:3868" data-name="Col Status">
                      <div className="fg-f858729e81" data-node-id="894:3869" data-name="Badge">
                        <p className="fg-024e3e4169" dir="auto" data-node-id="894:3870">
                          در انتظار بررسی
                        </p>
                      </div>
                    </div>
                    <p className="fg-8bff2ac759" dir="auto" data-node-id="894:3871">
                      ۴۵۰۰۰۰۰ تومان
                    </p>
                    <p className="fg-8eb7a5104d" data-node-id="894:3872">
                      ۱۴۰۲/۱۲/۰۵
                    </p>
                    <div className="fg-5dabfd850c" data-node-id="894:3873" data-name="Col Artist">
                      <p className="fg-4398fa8b14" dir="auto" data-node-id="894:3874">
                        زهرا کریمی
                      </p>
                      <p className="fg-a9d1c863d0" data-node-id="894:3875">
                        ART-8821
                      </p>
                    </div>
                    <p className="fg-653ea2b11e" data-node-id="894:3876">
                      SET-1024
                    </p>
                  </div>
                  <div className="fg-4f547a8b42" data-node-id="894:3877" data-name="Table Row">
                    <DesignAction className="fg-1fbe046d7b" data-node-id="894:3878" data-name="Col Action" label="مشاهده" destination="settlement-detail">
                      <p className="fg-daa786dbb1" dir="auto" data-node-id="894:3879">
                        مشاهده
                      </p>
                    </DesignAction>
                    <p className="fg-1a83b0c863" dir="auto" data-node-id="894:3880">
                      کارشناس علیزاده
                    </p>
                    <p className="fg-7ad1ee0600" dir="auto" data-node-id="894:3881">
                      بررسی
                    </p>
                    <div className="fg-82303a202c" data-node-id="894:3882" data-name="Col Status">
                      <div className="fg-f858729e81" data-node-id="894:3883" data-name="Badge">
                        <p className="fg-024e3e4169" dir="auto" data-node-id="894:3884">
                          در حال بررسی
                        </p>
                      </div>
                    </div>
                    <p className="fg-8bff2ac759" dir="auto" data-node-id="894:3885">
                      ۱۲۸۰۰۰۰ تومان
                    </p>
                    <p className="fg-8eb7a5104d" data-node-id="894:3886">
                      ۱۴۰۲/۱۲/۰۴
                    </p>
                    <div className="fg-5dabfd850c" data-node-id="894:3887" data-name="Col Artist">
                      <p className="fg-4398fa8b14" dir="auto" data-node-id="894:3888">
                        علی علوی
                      </p>
                      <p className="fg-a9d1c863d0" data-node-id="894:3889">
                        ART-1044
                      </p>
                    </div>
                    <p className="fg-653ea2b11e" data-node-id="894:3890">
                      SET-1025
                    </p>
                  </div>
                  <div className="fg-4f547a8b42" data-node-id="894:3891" data-name="Table Row">
                    <DesignAction className="fg-1fbe046d7b" data-node-id="894:3892" data-name="Col Action" label="مشاهده" destination="settlement-detail">
                      <p className="fg-daa786dbb1" dir="auto" data-node-id="894:3893">
                        مشاهده
                      </p>
                    </DesignAction>
                    <p className="fg-1a83b0c863" dir="auto" data-node-id="894:3894">
                      کارشناس رضایی
                    </p>
                    <p className="fg-f3ae47edef" dir="auto" data-node-id="894:3895">
                      پیگیری
                    </p>
                    <div className="fg-82303a202c" data-node-id="894:3896" data-name="Col Status">
                      <div className="fg-6e2aeb8423" data-node-id="894:3897" data-name="Badge">
                        <p className="fg-a3692aa1db" dir="auto" data-node-id="894:3898">
                          در حال پردازش
                        </p>
                      </div>
                    </div>
                    <p className="fg-8bff2ac759" dir="auto" data-node-id="894:3899">
                      ۸۵۰۰۰۰۰ تومان
                    </p>
                    <p className="fg-8eb7a5104d" data-node-id="894:3900">
                      ۱۴۰۲/۱۲/۰۳
                    </p>
                    <div className="fg-5dabfd850c" data-node-id="894:3901" data-name="Col Artist">
                      <p className="fg-4398fa8b14" dir="auto" data-node-id="894:3902">
                        مریم حسینی
                      </p>
                      <p className="fg-a9d1c863d0" data-node-id="894:3903">
                        ART-3920
                      </p>
                    </div>
                    <p className="fg-653ea2b11e" data-node-id="894:3904">
                      SET-1026
                    </p>
                  </div>
                  <div className="fg-4f547a8b42" data-node-id="894:3905" data-name="Table Row">
                    <DesignAction className="fg-1fbe046d7b" data-node-id="894:3906" data-name="Col Action" label="مشاهده" destination="settlement-detail">
                      <p className="fg-daa786dbb1" dir="auto" data-node-id="894:3907">
                        مشاهده
                      </p>
                    </DesignAction>
                    <p className="fg-1a83b0c863" dir="auto" data-node-id="894:3908">
                      کارشناس علیزاده
                    </p>
                    <p className="fg-57f801f67f" data-node-id="894:3909">
                      —
                    </p>
                    <div className="fg-82303a202c" data-node-id="894:3910" data-name="Col Status">
                      <div className="fg-e6bf96a33c" data-node-id="894:3911" data-name="Badge">
                        <p className="fg-f412706158" dir="auto" data-node-id="894:3912">
                          تکمیل‌شده
                        </p>
                      </div>
                    </div>
                    <p className="fg-8bff2ac759" dir="auto" data-node-id="894:3913">
                      ۳۴۰۰۰۰ تومان
                    </p>
                    <p className="fg-8eb7a5104d" data-node-id="894:3914">
                      ۱۴۰۲/۱۲/۰۲
                    </p>
                    <div className="fg-5dabfd850c" data-node-id="894:3915" data-name="Col Artist">
                      <p className="fg-4398fa8b14" dir="auto" data-node-id="894:3916">
                        حمید رضا رضایی
                      </p>
                      <p className="fg-a9d1c863d0" data-node-id="894:3917">
                        ART-0941
                      </p>
                    </div>
                    <p className="fg-653ea2b11e" data-node-id="894:3918">
                      SET-1027
                    </p>
                  </div>
                  <div className="fg-4f547a8b42" data-node-id="894:3919" data-name="Table Row">
                    <DesignAction className="fg-1fbe046d7b" data-node-id="894:3920" data-name="Col Action" label="بررسی" destination="settlement-detail">
                      <p className="fg-daa786dbb1" dir="auto" data-node-id="894:3921">
                        بررسی
                      </p>
                    </DesignAction>
                    <p className="fg-1a83b0c863" dir="auto" data-node-id="894:3922">
                      تخصیص نشده
                    </p>
                    <p className="fg-7ad1ee0600" dir="auto" data-node-id="894:3923">
                      بررسی
                    </p>
                    <div className="fg-82303a202c" data-node-id="894:3924" data-name="Col Status">
                      <div className="fg-f858729e81" data-node-id="894:3925" data-name="Badge">
                        <p className="fg-024e3e4169" dir="auto" data-node-id="894:3926">
                          در انتظار بررسی
                        </p>
                      </div>
                    </div>
                    <p className="fg-8bff2ac759" dir="auto" data-node-id="894:3927">
                      ۵۶۰۰۰۰۰ تومان
                    </p>
                    <p className="fg-8eb7a5104d" data-node-id="894:3928">
                      ۱۴۰۲/۱۲/۰۱
                    </p>
                    <div className="fg-5dabfd850c" data-node-id="894:3929" data-name="Col Artist">
                      <p className="fg-4398fa8b14" dir="auto" data-node-id="894:3930">
                        سارا احمدی
                      </p>
                      <p className="fg-a9d1c863d0" data-node-id="894:3931">
                        ART-1122
                      </p>
                    </div>
                    <p className="fg-653ea2b11e" data-node-id="894:3932">
                      SET-1028
                    </p>
                  </div>
                  <div className="fg-0a1861513f" data-node-id="894:3933" data-name="Table Row">
                    <DesignAction className="fg-1fbe046d7b" data-node-id="894:3934" data-name="Col Action" label="مشاهده" destination="settlement-detail">
                      <p className="fg-daa786dbb1" dir="auto" data-node-id="894:3935">
                        مشاهده
                      </p>
                    </DesignAction>
                    <p className="fg-1a83b0c863" dir="auto" data-node-id="894:3936">
                      کارشناس رضایی
                    </p>
                    <p className="fg-57f801f67f" data-node-id="894:3937">
                      —
                    </p>
                    <div className="fg-82303a202c" data-node-id="894:3938" data-name="Col Status">
                      <div className="fg-e6bf96a33c" data-node-id="894:3939" data-name="Badge">
                        <p className="fg-f412706158" dir="auto" data-node-id="894:3940">
                          تکمیل‌شده
                        </p>
                      </div>
                    </div>
                    <p className="fg-8bff2ac759" dir="auto" data-node-id="894:3941">
                      ۱۲۰۰۰۰۰۰ تومان
                    </p>
                    <p className="fg-8eb7a5104d" data-node-id="894:3942">
                      ۱۴۰۲/۱۱/۳۰
                    </p>
                    <div className="fg-5dabfd850c" data-node-id="894:3943" data-name="Col Artist">
                      <p className="fg-4398fa8b14" dir="auto" data-node-id="894:3944">
                        رضا رضایی
                      </p>
                      <p className="fg-a9d1c863d0" data-node-id="894:3945">
                        ART-3004
                      </p>
                    </div>
                    <p className="fg-653ea2b11e" data-node-id="894:3946">
                      SET-1029
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-734182496e" data-node-id="894:3750" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:3751" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:3752">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="894:3753" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="894:3754" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:3755" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:3756" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:3757" data-name="dashboard-icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/45866901.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:3759">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:3760" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:3761" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3762" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:3763" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/30c36522.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3765">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:3766" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:3767" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:3768" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/50e3915a.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3770">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3771" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3772" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:3773" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f88311e6.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3775">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3776" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3777" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:3778" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/02157916.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3780">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3781" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3782" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:3783" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/68ed085e.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3785">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3786" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:3787" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:3788" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3d5eb02c.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:3790">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3791" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:3792" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:3793" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/a462ff12.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3795">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3796" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3797" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:3798" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/131cf6ae.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3800">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3801" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3802" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:3803" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/7aeeaa2a.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3805">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:3806" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:3807" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:3808">
              کارشناس عملیات مالی
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:3809">
              مدیر مالی و تسویه‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:3810" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/428a92f9.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
