// Figma 894:4840 — Admin / Transaction Detail — Refund
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminTransactionDetailRefund() {
  return (
    <div className="fg-a9d80d349c" data-node-id="894:4840" data-name="Admin / Transaction Detail — Refund">
      <div className="fg-f7cede9c7c" data-node-id="894:4892" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:4893" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:4894" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:4895" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/cfd5ff67.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:4896" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:4899" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:4900" data-name="Global Search" label="جستجو" placeholder="جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:4901">
                جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:5140" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4903">
              جزئیات تراکنش استرداد وجه
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:4904" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="894:4905" data-name="Header Row">
            <div className="fg-ad50363799" data-node-id="894:4906" data-name="Badge Wrapper">
              <div className="fg-811841516a" data-node-id="894:4907" data-name="Badge">
                <p className="fg-9d90027e17" dir="auto" data-node-id="894:4908">
                  پردازش‌شده
                </p>
              </div>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4909">
                تراکنش استرداد TRX-5042
              </p>
            </div>
            <div className="fg-f84793928b" data-node-id="894:4910" data-name="Breadcrumb">
              <p className="fg-4d1a7729d8" data-node-id="894:4911">
                TRX-5042
              </p>
              <p className="fg-3502070eee" data-node-id="894:4912">{`<`}</p>
              <p className="fg-7de654a4e5" dir="auto" data-node-id="894:4913">
                تراکنش‌ها
              </p>
              <p className="fg-3502070eee" data-node-id="894:4914">{`<`}</p>
              <DesignAction className="fg-7de654a4e5" dir="auto" data-node-id="894:4915" label="بازگشت" destination="transactions">
                بازگشت
              </DesignAction>
            </div>
          </div>
          <div className="fg-c93a8f5cea" data-node-id="894:4916" data-name="Columns Wrapper">
            <div className="fg-78430902e8" data-node-id="894:4917" data-name="Left Summary Card">
              <p className="fg-e0e4f76b0b" dir="auto" data-node-id="894:4918">
                مبلغ مسترد شده
              </p>
              <p className="fg-e04e96e86a" dir="auto" data-node-id="894:4919">
                -۸۵۰۰۰۰ تومان
              </p>
              <div className="fg-df0a3de519" data-node-id="894:4920" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/ede57780.svg" />
                </div>
              </div>
              <p className="fg-415cfcd138" dir="auto" data-node-id="894:4921">
                این تراکنش بابت بازگشت کل وجه پرداختی خریدار صادر شده است. اطلاعات تراکنش فروش اولیه در پایین صفحه پیوست شده است.
              </p>
            </div>
            <div className="fg-c53583c017" data-node-id="894:4922" data-name="Right Panel">
              <div className="fg-5848865da4" data-node-id="894:4923" data-name="Section 1">
                <p className="fg-12c79e8288" dir="auto" data-node-id="894:4924">
                  اطلاعات تراکنش استرداد
                </p>
                <div className="fg-628fbd276e" data-node-id="894:4925" data-name="Grid Rows">
                  <div className="fg-0bab63b93d" data-node-id="894:4926" data-name="Grid Row">
                    <div className="fg-da34886eb0" data-node-id="894:4927" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4928">
                        دلیل استرداد وجه
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4929">
                        انصراف خریدار پیش از ارسال و تایید نهایی
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4930" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4931">
                        شناسه تراکنش
                      </p>
                      <p className="fg-c34c9a845e" data-node-id="894:4932">
                        TRX-5042
                      </p>
                    </div>
                  </div>
                  <div className="fg-666bf8dc45" data-node-id="894:4933" data-name="Grid Row">
                    <div className="fg-a26da4f281" data-node-id="894:4934" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4935">
                        تاریخ انجام استرداد
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4936">
                        ۱۴۰۳/۰۷/۱۱ - ساعت ۱۸:۰۰
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4937" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4938">
                        روش بازگشت وجه
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4939">
                        کارت به کارت خودکار سیستم
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-df0a3de519" data-node-id="894:4940" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/5809ecbb.svg" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="894:4941" data-name="Section 2">
                <p className="fg-abe46541cc" dir="auto" data-node-id="894:4942">
                  سفارش مرتبط
                </p>
                <div className="fg-153c0a1809" data-node-id="894:4943" data-name="Grid Rows">
                  <div className="fg-06de4b3240" data-node-id="894:4944" data-name="Grid Row">
                    <div className="fg-da34886eb0" data-node-id="894:4945" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4946">
                        نام مشتری خریدار
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4947">
                        بابک راد
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4948" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4949">
                        مرجع سفارش ابطال‌شده
                      </p>
                      <p className="fg-12d7c925c5" data-node-id="894:4950">
                        ORD-8812
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-df0a3de519" data-node-id="894:4951" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/5809ecbb.svg" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="894:4952" data-name="Section 3">
                <p className="fg-abe46541cc" dir="auto" data-node-id="894:4953">
                  هنرمند و تراکنش مرتبط اولیه
                </p>
                <div className="fg-153c0a1809" data-node-id="894:4954" data-name="Grid Rows">
                  <div className="fg-06de4b3240" data-node-id="894:4955" data-name="Grid Row">
                    <div className="fg-a26da4f281" data-node-id="894:4956" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4957">
                        تراکنش فروش اولیه مرتبط
                      </p>
                      <p className="fg-12d7c925c5" data-node-id="894:4958">
                        TRX-4412
                      </p>
                    </div>
                    <div className="fg-da34886eb0" data-node-id="894:4959" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4960">
                        هنرمند مرتبط
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4961">
                        مریم حسینی (ART-3920)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:4841" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:4842" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:4843">
            خانه نگارین
          </p>
          <div className="fg-b648a26f15" data-node-id="894:4844" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:4845" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:4846" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:4847" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:5107" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:4849">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="894:4850" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:4851" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4852" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:5110" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4854">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:4855" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:4856" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:5113" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4858">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4859" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4860" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:5116" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4862">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4863" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4864" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:5119" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4866">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4867" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4868" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:5122" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4870">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4871" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:4872" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:5125" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:4874">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4875" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:4876" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:5128" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4878">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4879" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4880" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:5131" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4882">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4883" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4884" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:5134" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4886">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:4887" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:4888" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:4889">
              کارشناس عملیات مالی
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:4890">
              مدیر مالی و تسویه‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:4891" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/05aae989.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
