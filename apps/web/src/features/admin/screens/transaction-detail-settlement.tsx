// Figma 894:4715 — Admin / Transaction Detail — Settlement
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminTransactionDetailSettlement() {
  return (
    <div className="fg-a9d80d349c" data-node-id="894:4715" data-name="Admin / Transaction Detail — Settlement">
      <div className="fg-f7cede9c7c" data-node-id="894:4767" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:4768" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:4769" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:4770" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/1fb6778c.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:4771" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:4774" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:4775" data-name="Global Search" label="جستجو" placeholder="جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:4776">
                جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:5104" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4778">
              جزئیات تراکنش تسویه حساب
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:4779" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="894:4780" data-name="Header Row">
            <div className="fg-ad50363799" data-node-id="894:4781" data-name="Badge Wrapper">
              <div className="fg-811841516a" data-node-id="894:4782" data-name="Badge">
                <p className="fg-9d90027e17" dir="auto" data-node-id="894:4783">
                  تکمیل‌شده
                </p>
              </div>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4784">
                تراکنش تسویه TRX-5031
              </p>
            </div>
            <div className="fg-f84793928b" data-node-id="894:4785" data-name="Breadcrumb">
              <p className="fg-4d1a7729d8" data-node-id="894:4786">
                TRX-5031
              </p>
              <p className="fg-3502070eee" data-node-id="894:4787">{`<`}</p>
              <p className="fg-7de654a4e5" dir="auto" data-node-id="894:4788">
                تراکنش‌ها
              </p>
              <p className="fg-3502070eee" data-node-id="894:4789">{`<`}</p>
              <DesignAction className="fg-7de654a4e5" dir="auto" data-node-id="894:4790" label="بازگشت" destination="settlement-requests">
                بازگشت
              </DesignAction>
            </div>
          </div>
          <div className="fg-c93a8f5cea" data-node-id="894:4791" data-name="Columns Wrapper">
            <div className="fg-78430902e8" data-node-id="894:4792" data-name="Left Summary Card">
              <p className="fg-e0e4f76b0b" dir="auto" data-node-id="894:4793">
                مبلغ تسویه شده
              </p>
              <p className="fg-1b84077c0f" dir="auto" data-node-id="894:4794">
                -۲۴۰۰۰۰۰ تومان
              </p>
              <div className="fg-df0a3de519" data-node-id="894:4795" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/ede57780.svg" />
                </div>
              </div>
              <p className="fg-415cfcd138" dir="auto" data-node-id="894:4796">
                نوع پرداخت: حواله بین‌بانکی پایا. کلیه تاییدیه های کارشناسی پیش از خروج وجه توسط مدیر مالی ثبت شده است.
              </p>
            </div>
            <div className="fg-c53583c017" data-node-id="894:4797" data-name="Right Panel">
              <div className="fg-5848865da4" data-node-id="894:4798" data-name="Section 1">
                <p className="fg-12c79e8288" dir="auto" data-node-id="894:4799">
                  اطلاعات تراکنش تسویه
                </p>
                <div className="fg-628fbd276e" data-node-id="894:4800" data-name="Grid Rows">
                  <div className="fg-0bab63b93d" data-node-id="894:4801" data-name="Grid Row">
                    <div className="fg-da34886eb0" data-node-id="894:4802" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4803">
                        نوع تراکنش
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4804">
                        تسویه‌حساب با هنرمند
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4805" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4806">
                        شناسه تراکنش
                      </p>
                      <p className="fg-c34c9a845e" data-node-id="894:4807">
                        TRX-5031
                      </p>
                    </div>
                  </div>
                  <div className="fg-666bf8dc45" data-node-id="894:4808" data-name="Grid Row">
                    <div className="fg-a26da4f281" data-node-id="894:4809" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4810">
                        تاریخ ثبت تراکنش
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4811">
                        ۱۴۰۳/۰۷/۰۷ - ساعت ۱۱:۱۵
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4812" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4813">
                        تاریخ تسویه حساب قطعی
                      </p>
                      <p className="fg-c34c9a845e" data-node-id="894:4814">
                        ۱۴۰۳/۰۷/۰۸
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-df0a3de519" data-node-id="894:4815" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/5809ecbb.svg" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="894:4816" data-name="Section 2">
                <p className="fg-abe46541cc" dir="auto" data-node-id="894:4817">
                  درخواست تسویه مرتبط
                </p>
                <div className="fg-153c0a1809" data-node-id="894:4818" data-name="Grid Rows">
                  <div className="fg-06de4b3240" data-node-id="894:4819" data-name="Grid Row">
                    <div className="fg-da34886eb0" data-node-id="894:4820" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4821">
                        مبلغ درخواستی اولیه
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4822">
                        ۲۴۰۰۰۰۰ تومان
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4823" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4824">
                        شناسه درخواست تسویه
                      </p>
                      <p className="fg-12d7c925c5" data-node-id="894:4825">
                        SET-1019
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-df0a3de519" data-node-id="894:4826" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/5809ecbb.svg" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="894:4827" data-name="Section 3">
                <p className="fg-abe46541cc" dir="auto" data-node-id="894:4828">
                  اطلاعات هنرمند ذینفع
                </p>
                <div className="fg-153c0a1809" data-node-id="894:4829" data-name="Grid Rows">
                  <div className="fg-06de4b3240" data-node-id="894:4830" data-name="Grid Row">
                    <div className="fg-a26da4f281" data-node-id="894:4831" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4832">
                        شناسه هنرمند
                      </p>
                      <p className="fg-12d7c925c5" data-node-id="894:4833">
                        ART-2015
                      </p>
                    </div>
                    <div className="fg-da34886eb0" data-node-id="894:4834" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4835">
                        نام کامل هنرمند
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4836">
                        نیلوفر عباسی
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:4716" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:4717" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:4718">
            خانه نگارین
          </p>
          <div className="fg-b648a26f15" data-node-id="894:4719" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:4720" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:4721" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:4722" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:5071" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:4724">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="894:4725" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:4726" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4727" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:5074" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4729">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:4730" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:4731" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:5077" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4733">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4734" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4735" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:5080" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4737">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4738" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4739" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:5083" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4741">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4742" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4743" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:5086" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4745">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4746" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:4747" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:5089" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:4749">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4750" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:4751" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:5092" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4753">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4754" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4755" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:5095" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4757">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4758" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4759" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:5098" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4761">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:4762" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:4763" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:4764">
              کارشناس عملیات مالی
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:4765">
              مدیر مالی و تسویه‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:4766" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/120f4dfc.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
