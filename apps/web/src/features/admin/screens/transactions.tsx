// Figma 894:4387 — Admin / Transactions — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminTransactionsDesktop() {
  return (
    <div className="fg-a9d80d349c" data-node-id="894:4387" data-name="Admin / Transactions — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:4439" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:4440" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:4441" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:4442" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/725a0ee0.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:4443" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:4446" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:4447" data-name="Global Search" label="جستجو" placeholder="جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:4448">
                جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:5032" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4450">
              لیست تراکنش‌های مالی سیستم
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:4451" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="894:4452" data-name="Stats Row">
            <div className="fg-8f76a4e2ed" data-node-id="894:4453" data-name="Stat Card">
              <p className="fg-cbf2c4bfe6" dir="auto" data-node-id="894:4454">
                ۱۸۲ تراکنش
              </p>
              <p className="fg-b9131b899d" dir="auto" data-node-id="894:4455">
                کل تراکنش‌های ماه
              </p>
            </div>
            <div className="fg-8f76a4e2ed" data-node-id="894:4456" data-name="Stat Card">
              <p className="fg-b4c3d742fe" dir="auto" data-node-id="894:4457">
                ۱۴۶ مورد
              </p>
              <p className="fg-b9131b899d" dir="auto" data-node-id="894:4458">
                تراکنش‌های فروش
              </p>
            </div>
            <div className="fg-8f76a4e2ed" data-node-id="894:4459" data-name="Stat Card">
              <p className="fg-f81d05d172" dir="auto" data-node-id="894:4460">
                ۳۱ مورد
              </p>
              <p className="fg-b9131b899d" dir="auto" data-node-id="894:4461">
                تسویه‌حساب‌های انجام شده
              </p>
            </div>
            <div className="fg-8f76a4e2ed" data-node-id="894:4462" data-name="Stat Card">
              <p className="fg-4318f122ae" dir="auto" data-node-id="894:4463">
                ۵ مورد
              </p>
              <p className="fg-b9131b899d" dir="auto" data-node-id="894:4464">
                استرداد وجه مشتریان
              </p>
            </div>
          </div>
          <div className="fg-5328db2be5" data-node-id="894:4465" data-name="Filters Box">
            <DesignField className="fg-83f738a02a" data-node-id="894:4466" data-name="Search Input" label="جستجو" placeholder="جستجو با شناسه تراکنش، هنرمند یا مرجع...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:4467">
                جستجو با شناسه تراکنش، هنرمند یا مرجع...
              </p>
            </DesignField>
            <div className="fg-0e6d0987bb" data-node-id="894:4468" data-name="Filters List">
              <div className="fg-c5b186ab72" data-node-id="894:4469" data-name="Filter Pill">
                <p className="fg-f5d0ae1dd4" dir="auto" data-node-id="894:4470">
                  بازه زمانی: همه
                </p>
              </div>
              <div className="fg-c5b186ab72" data-node-id="894:4471" data-name="Filter Pill">
                <p className="fg-f5d0ae1dd4" dir="auto" data-node-id="894:4472">
                  وضعیت: همه
                </p>
              </div>
              <div className="fg-c5b186ab72" data-node-id="894:4473" data-name="Filter Pill">
                <p className="fg-f5d0ae1dd4" dir="auto" data-node-id="894:4474">
                  نوع تراکنش: همه
                </p>
              </div>
            </div>
          </div>
          <div className="fg-cb667e7a05" data-node-id="894:4475" data-name="Table Wrapper">
            <div className="fg-5a60ba4653" data-node-id="894:4476" data-name="Table Header Row">
              <p className="fg-fa0d4d9a92" dir="auto" data-node-id="894:4477">
                اقدام
              </p>
              <p className="fg-8d481b53ec" dir="auto" data-node-id="894:4478">
                وضعیت
              </p>
              <p className="fg-44d10f1b20" dir="auto" data-node-id="894:4479">
                تاریخ
              </p>
              <p className="fg-c68de40718" dir="auto" data-node-id="894:4480">
                مبلغ (تومان)
              </p>
              <p className="fg-44d10f1b20" dir="auto" data-node-id="894:4481">
                مرجع مرتبط
              </p>
              <p className="fg-44d10f1b20" dir="auto" data-node-id="894:4482">
                نوع
              </p>
              <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:4483">
                هنرمند ذینفع
              </p>
              <p className="fg-648e3447c7" dir="auto" data-node-id="894:4484">
                شناسه تراکنش
              </p>
            </div>
            <div className="fg-c475d979ca" data-node-id="894:4485" data-name="Table Body">
              <div className="fg-4f547a8b42" data-node-id="894:4486" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="894:4487" data-name="Col Action" label="مشاهده" destination="transaction-detail-sale">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="894:4488">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-d3a9b73303" data-node-id="894:4489" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="894:4490" data-name="Badge">
                    <p className="fg-f412706158" dir="auto" data-node-id="894:4491">
                      تکمیل‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="894:4492">
                  ۱۴۰۳/۰۷/۱۲
                </p>
                <p className="fg-8bff2ac759" dir="auto" data-node-id="894:4493">
                  ۱۵۰۰۰۰۰ تومان
                </p>
                <p className="fg-6c1b7e9494" data-node-id="894:4494">
                  ORD-9081
                </p>
                <p className="fg-ca3610f320" dir="auto" data-node-id="894:4495">
                  فروش
                </p>
                <div className="fg-5dabfd850c" data-node-id="894:4496" data-name="Col Artist">
                  <p className="fg-4398fa8b14" dir="auto" data-node-id="894:4497">
                    زهرا کریمی
                  </p>
                  <p className="fg-a9d1c863d0" data-node-id="894:4498">
                    ART-1092
                  </p>
                </div>
                <p className="fg-653ea2b11e" data-node-id="894:4499">
                  TRX-5024
                </p>
              </div>
              <div className="fg-4f547a8b42" data-node-id="894:4500" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="894:4501" data-name="Col Action" label="مشاهده" destination="transaction-detail-settlement">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="894:4502">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-d3a9b73303" data-node-id="894:4503" data-name="Col Status">
                  <div className="fg-f858729e81" data-node-id="894:4504" data-name="Badge">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="894:4505">
                      در حال پردازش
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="894:4506">
                  ۱۴۰۳/۰۷/۱۲
                </p>
                <p className="fg-8bff2ac759" dir="auto" data-node-id="894:4507">
                  -۴۵۰۰۰۰۰ تومان
                </p>
                <p className="fg-6c1b7e9494" data-node-id="894:4508">
                  SET-1024
                </p>
                <p className="fg-ca3610f320" dir="auto" data-node-id="894:4509">
                  تسویه
                </p>
                <div className="fg-5dabfd850c" data-node-id="894:4510" data-name="Col Artist">
                  <p className="fg-4398fa8b14" dir="auto" data-node-id="894:4511">
                    رضا رضایی
                  </p>
                  <p className="fg-a9d1c863d0" data-node-id="894:4512">
                    ART-3004
                  </p>
                </div>
                <p className="fg-653ea2b11e" data-node-id="894:4513">
                  TRX-5025
                </p>
              </div>
              <div className="fg-4f547a8b42" data-node-id="894:4514" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="894:4515" data-name="Col Action" label="مشاهده" destination="transaction-detail-refund">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="894:4516">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-d3a9b73303" data-node-id="894:4517" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="894:4518" data-name="Badge">
                    <p className="fg-f412706158" dir="auto" data-node-id="894:4519">
                      تکمیل‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="894:4520">
                  ۱۴۰۳/۰۷/۱۱
                </p>
                <p className="fg-8bff2ac759" dir="auto" data-node-id="894:4521">
                  -۸۵۰۰۰۰ تومان
                </p>
                <p className="fg-6c1b7e9494" data-node-id="894:4522">
                  ORD-8812
                </p>
                <p className="fg-ca3610f320" dir="auto" data-node-id="894:4523">
                  استرداد
                </p>
                <div className="fg-5dabfd850c" data-node-id="894:4524" data-name="Col Artist">
                  <p className="fg-4398fa8b14" dir="auto" data-node-id="894:4525">
                    مریم حسینی
                  </p>
                  <p className="fg-a9d1c863d0" data-node-id="894:4526">
                    ART-3920
                  </p>
                </div>
                <p className="fg-653ea2b11e" data-node-id="894:4527">
                  TRX-5026
                </p>
              </div>
              <div className="fg-4f547a8b42" data-node-id="894:4528" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="894:4529" data-name="Col Action" label="مشاهده" destination="transaction-detail-sale">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="894:4530">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-d3a9b73303" data-node-id="894:4531" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="894:4532" data-name="Badge">
                    <p className="fg-f412706158" dir="auto" data-node-id="894:4533">
                      تکمیل‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="894:4534">
                  ۱۴۰۳/۰۷/۱۰
                </p>
                <p className="fg-8bff2ac759" dir="auto" data-node-id="894:4535">
                  ۳۴۰۰۰۰ تومان
                </p>
                <p className="fg-6c1b7e9494" data-node-id="894:4536">
                  ORD-9076
                </p>
                <p className="fg-ca3610f320" dir="auto" data-node-id="894:4537">
                  فروش
                </p>
                <div className="fg-5dabfd850c" data-node-id="894:4538" data-name="Col Artist">
                  <p className="fg-4398fa8b14" dir="auto" data-node-id="894:4539">
                    علی علوی
                  </p>
                  <p className="fg-a9d1c863d0" data-node-id="894:4540">
                    ART-1044
                  </p>
                </div>
                <p className="fg-653ea2b11e" data-node-id="894:4541">
                  TRX-5027
                </p>
              </div>
              <div className="fg-4f547a8b42" data-node-id="894:4542" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="894:4543" data-name="Col Action" label="مشاهده" destination="transaction-detail-settlement">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="894:4544">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-d3a9b73303" data-node-id="894:4545" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="894:4546" data-name="Badge">
                    <p className="fg-f412706158" dir="auto" data-node-id="894:4547">
                      تکمیل‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="894:4548">
                  ۱۴۰۳/۰۷/۰۹
                </p>
                <p className="fg-8bff2ac759" dir="auto" data-node-id="894:4549">
                  -۱۲۸۰۰۰۰ تومان
                </p>
                <p className="fg-6c1b7e9494" data-node-id="894:4550">
                  SET-1021
                </p>
                <p className="fg-ca3610f320" dir="auto" data-node-id="894:4551">
                  تسویه
                </p>
                <div className="fg-5dabfd850c" data-node-id="894:4552" data-name="Col Artist">
                  <p className="fg-4398fa8b14" dir="auto" data-node-id="894:4553">
                    حمید رضا رضایی
                  </p>
                  <p className="fg-a9d1c863d0" data-node-id="894:4554">
                    ART-0941
                  </p>
                </div>
                <p className="fg-653ea2b11e" data-node-id="894:4555">
                  TRX-5028
                </p>
              </div>
              <div className="fg-4f547a8b42" data-node-id="894:4556" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="894:4557" data-name="Col Action" label="مشاهده" destination="transaction-detail-sale">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="894:4558">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-d3a9b73303" data-node-id="894:4559" data-name="Col Status">
                  <div className="fg-f5a735ebf8" data-node-id="894:4560" data-name="Badge">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="894:4561">
                      لغو‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="894:4562">
                  ۱۴۰۳/۰۷/۰۸
                </p>
                <p className="fg-8bff2ac759" dir="auto" data-node-id="894:4563">
                  ۵۶۰۰۰۰۰ تومان
                </p>
                <p className="fg-6c1b7e9494" data-node-id="894:4564">
                  ORD-9065
                </p>
                <p className="fg-ca3610f320" dir="auto" data-node-id="894:4565">
                  فروش
                </p>
                <div className="fg-5dabfd850c" data-node-id="894:4566" data-name="Col Artist">
                  <p className="fg-4398fa8b14" dir="auto" data-node-id="894:4567">
                    سارا احمدی
                  </p>
                  <p className="fg-a9d1c863d0" data-node-id="894:4568">
                    ART-1122
                  </p>
                </div>
                <p className="fg-653ea2b11e" data-node-id="894:4569">
                  TRX-5029
                </p>
              </div>
              <div className="fg-4f547a8b42" data-node-id="894:4570" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="894:4571" data-name="Col Action" label="مشاهده" destination="transaction-detail-settlement">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="894:4572">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-d3a9b73303" data-node-id="894:4573" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="894:4574" data-name="Badge">
                    <p className="fg-f412706158" dir="auto" data-node-id="894:4575">
                      تکمیل‌شده
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="894:4576">
                  ۱۴۰۳/۰۷/۰۷
                </p>
                <p className="fg-8bff2ac759" dir="auto" data-node-id="894:4577">
                  -۲۴۰۰۰۰۰ تومان
                </p>
                <p className="fg-6c1b7e9494" data-node-id="894:4578">
                  SET-1019
                </p>
                <p className="fg-ca3610f320" dir="auto" data-node-id="894:4579">
                  تسویه
                </p>
                <div className="fg-5dabfd850c" data-node-id="894:4580" data-name="Col Artist">
                  <p className="fg-4398fa8b14" dir="auto" data-node-id="894:4581">
                    نیلوفر عباسی
                  </p>
                  <p className="fg-a9d1c863d0" data-node-id="894:4582">
                    ART-2015
                  </p>
                </div>
                <p className="fg-653ea2b11e" data-node-id="894:4583">
                  TRX-5030
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:4388" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:4389" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:4390">
            خانه نگارین
          </p>
          <div className="fg-b648a26f15" data-node-id="894:4391" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:4392" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:4393" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:4394" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:4999" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:4396">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="894:4397" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:4398" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4399" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:5002" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4401">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:4402" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:4403" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:5005" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4405">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4406" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4407" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:5008" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4409">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4410" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4411" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:5011" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4413">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4414" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4415" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:5014" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4417">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4418" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:4419" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:5017" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:4421">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4422" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:4423" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:5020" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4425">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4426" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4427" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:5023" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4429">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4430" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4431" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:5026" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4433">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:4434" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:4435" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:4436">
              کارشناس عملیات مالی
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:4437">
              مدیر مالی و تسویه‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:4438" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/8e42e850.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
