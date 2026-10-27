// Figma 894:4587 — Admin / Transaction Detail — Sale
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminTransactionDetailSale() {
  return (
    <div className="fg-a9d80d349c" data-node-id="894:4587" data-name="Admin / Transaction Detail — Sale">
      <div className="fg-f7cede9c7c" data-node-id="894:4639" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:4640" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:4641" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:4642" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/dadaee1e.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:4643" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:4646" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:4647" data-name="Global Search" label="جستجو" placeholder="جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:4648">
                جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:5068" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4650">
              جزئیات تراکنش فروش اثر
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:4651" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="894:4652" data-name="Header Row">
            <div className="fg-ad50363799" data-node-id="894:4653" data-name="Badge Wrapper">
              <div className="fg-811841516a" data-node-id="894:4654" data-name="Badge">
                <p className="fg-9d90027e17" dir="auto" data-node-id="894:4655">
                  تکمیل‌شده
                </p>
              </div>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4656">
                تراکنش فروش TRX-5024
              </p>
            </div>
            <div className="fg-f84793928b" data-node-id="894:4657" data-name="Breadcrumb">
              <p className="fg-4d1a7729d8" data-node-id="894:4658">
                TRX-5024
              </p>
              <p className="fg-3502070eee" data-node-id="894:4659">{`<`}</p>
              <p className="fg-7de654a4e5" dir="auto" data-node-id="894:4660">
                تراکنش‌ها
              </p>
              <p className="fg-3502070eee" data-node-id="894:4661">{`<`}</p>
              <DesignAction className="fg-7de654a4e5" dir="auto" data-node-id="894:4662" label="بازگشت" destination="transactions">
                بازگشت
              </DesignAction>
            </div>
          </div>
          <div className="fg-c93a8f5cea" data-node-id="894:4663" data-name="Columns Wrapper">
            <div className="fg-78430902e8" data-node-id="894:4664" data-name="Left Summary Card">
              <p className="fg-e0e4f76b0b" dir="auto" data-node-id="894:4665">
                مبلغ ناخالص تراکنش
              </p>
              <p className="fg-06ae0bdf2c" dir="auto" data-node-id="894:4666">
                ۱۵۰۰۰۰۰ تومان
              </p>
              <div className="fg-df0a3de519" data-node-id="894:4667" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/ede57780.svg" />
                </div>
              </div>
              <p className="fg-415cfcd138" dir="auto" data-node-id="894:4668">
                توضیحات: این مبلغ حاصل از فروش مستقیم محصول در بازار خانه نگارین است و مطابق قرارداد کل مبلغ بدون کسر کمیسیون به حساب هنرمند منظور می‌گردد.
              </p>
            </div>
            <div className="fg-c53583c017" data-node-id="894:4669" data-name="Right Panel">
              <div className="fg-5848865da4" data-node-id="894:4670" data-name="Section 1">
                <p className="fg-12c79e8288" dir="auto" data-node-id="894:4671">
                  اطلاعات پایه تراکنش
                </p>
                <div className="fg-628fbd276e" data-node-id="894:4672" data-name="Grid Rows">
                  <div className="fg-0bab63b93d" data-node-id="894:4673" data-name="Grid Row">
                    <div className="fg-da34886eb0" data-node-id="894:4674" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4675">
                        نوع تراکنش
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4676">
                        فروش اثر هنری
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4677" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4678">
                        شناسه تراکنش (سیستم)
                      </p>
                      <p className="fg-c34c9a845e" data-node-id="894:4679">
                        TRX-5024
                      </p>
                    </div>
                  </div>
                  <div className="fg-666bf8dc45" data-node-id="894:4680" data-name="Grid Row">
                    <div className="fg-a26da4f281" data-node-id="894:4681" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4682">
                        تاریخ ثبت سیستم
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4683">
                        ۱۴۰۳/۰۷/۱۲ - ساعت ۱۴:۳۰
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4684" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4685">
                        روش پرداخت
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4686">
                        درگاه آنلاین شاپرک
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-df0a3de519" data-node-id="894:4687" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/5809ecbb.svg" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="894:4688" data-name="Section 2">
                <p className="fg-abe46541cc" dir="auto" data-node-id="894:4689">
                  اطلاعات سفارش مرتبط
                </p>
                <div className="fg-24081ceef5" data-node-id="894:4690" data-name="Grid Rows">
                  <div className="fg-06de4b3240" data-node-id="894:4691" data-name="Grid Row">
                    <div className="fg-da34886eb0" data-node-id="894:4692" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4693">
                        نام خریدار
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4694">
                        امیرحسین باقری
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:4695" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4696">
                        مرجع سفارش
                      </p>
                      <p className="fg-12d7c925c5" data-node-id="894:4697">
                        ORD-9081
                      </p>
                    </div>
                  </div>
                  <div className="fg-5c941ab3a3" data-node-id="894:4698" data-name="Grid Row">
                    <div className="fg-80ab50a574" data-node-id="894:4699" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4700">
                        خلاصه اقلام سفارش
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4701">
                        یک قطعه تابلوی مینیاتور روی مس - اثر زهرا کریمی
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-df0a3de519" data-node-id="894:4702" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/5809ecbb.svg" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="894:4703" data-name="Section 3">
                <p className="fg-abe46541cc" dir="auto" data-node-id="894:4704">
                  اطلاعات هنرمند ذینفع
                </p>
                <div className="fg-153c0a1809" data-node-id="894:4705" data-name="Grid Rows">
                  <div className="fg-06de4b3240" data-node-id="894:4706" data-name="Grid Row">
                    <div className="fg-a26da4f281" data-node-id="894:4707" data-name="Field">
                      <p className="fg-cd46926171" dir="auto" data-node-id="894:4708">
                        شناسه هنرمند
                      </p>
                      <p className="fg-12d7c925c5" data-node-id="894:4709">
                        ART-1092
                      </p>
                    </div>
                    <div className="fg-da34886eb0" data-node-id="894:4710" data-name="Field">
                      <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4711">
                        نام هنرمند
                      </p>
                      <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4712">
                        زهرا کریمی
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:4588" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:4589" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:4590">
            خانه نگارین
          </p>
          <div className="fg-b648a26f15" data-node-id="894:4591" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:4592" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:4593" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:4594" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:5035" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:4596">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="894:4597" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:4598" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4599" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:5038" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4601">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:4602" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:4603" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:5041" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4605">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4606" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4607" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:5044" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4609">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4610" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4611" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:5047" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4613">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4614" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4615" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:5050" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4617">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4618" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:4619" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:5053" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:4621">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4622" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:4623" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:5056" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4625">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4626" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4627" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:5059" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4629">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4630" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4631" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:5062" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4633">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:4634" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:4635" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:4636">
              کارشناس عملیات مالی
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:4637">
              مدیر مالی و تسویه‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:4638" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/4a316737.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
