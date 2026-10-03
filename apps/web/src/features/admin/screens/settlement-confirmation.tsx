// Figma 894:4279 — Admin / Settlement Confirmation — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminSettlementConfirmationDesktop() {
  return (
    <div className="fg-a9d80d349c" data-node-id="894:4279" data-name="Admin / Settlement Confirmation — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:4331" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:4332" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:4333" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:4334" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/66617e5f.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:4335" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:4338" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:4339" data-name="Global Search" label="جستجو" placeholder="جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:4340">
                جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:4996" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4342">
              تأیید نهایی درخواست تسویه
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:4343" data-name="Scrollable Content">
          <div className="fg-07f6f7136d" data-node-id="894:4344" data-name="Breadcrumb">
            <p className="fg-0b8e764216" dir="auto" data-node-id="894:4345">
              تأیید نهایی
            </p>
            <p className="fg-3502070eee" data-node-id="894:4346">{`<`}</p>
            <p className="fg-3502070eee" data-node-id="894:4347">
              SET-1024
            </p>
            <p className="fg-3502070eee" data-node-id="894:4348">{`<`}</p>
            <p className="fg-7de654a4e5" dir="auto" data-node-id="894:4349">
              تسویه‌حساب‌ها
            </p>
          </div>
          <div className="fg-661a3c6ade" data-node-id="894:4350" data-name="Dialog Card">
            <div className="fg-3debdf563b" data-node-id="894:4351" data-name="Warning Alert">
              <p className="fg-0b73d7fe8a" dir="auto" data-node-id="894:4352">
                هشدار امنیتی: پس از تأیید، این درخواست تسویه جهت صدور حواله پایا به واحد مالی و خزانه‌داری ارجاع خواهد شد و امکان لغو آن از این پنل وجود ندارد.
              </p>
              <div className="fg-b2a182ecf4" data-node-id="894:5143" data-name="alert-triangle">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/c9bfc608.svg" />
              </div>
            </div>
            <div className="fg-cd68a27429" data-node-id="894:4354" data-name="Title Block">
              <p className="fg-b7d0c9925e" dir="auto" data-node-id="894:4355">
                تأیید و ارسال درخواست تسویه به واحد پردازش
              </p>
              <p className="fg-b9131b899d" dir="auto" data-node-id="894:4356">
                لطفاً اطلاعات خلاصه زیر را پیش از ارسال نهایی به دقت بررسی فرمایید.
              </p>
            </div>
            <div className="fg-cd558f4fcf" data-node-id="894:4357" data-name="Summary Details">
              <div className="fg-06de4b3240" data-node-id="894:4358" data-name="Row 1">
                <div className="fg-a26da4f281" data-node-id="894:4359" data-name="Cell">
                  <p className="fg-cd46926171" dir="auto" data-node-id="894:4360">
                    شناسه درخواست تسویه
                  </p>
                  <p className="fg-fabc7db0ce" data-node-id="894:4361">
                    SET-1024
                  </p>
                </div>
                <div className="fg-da34886eb0" data-node-id="894:4362" data-name="Cell">
                  <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4363">
                    هنرمند ذینفع
                  </p>
                  <p className="fg-80f44fa64b" dir="auto" data-node-id="894:4364">
                    زهرا کریمی (ART-1092)
                  </p>
                </div>
              </div>
              <div className="fg-df0a3de519" data-node-id="894:4365" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/9eb0e5f9.svg" />
                </div>
              </div>
              <div className="fg-867b1b2e34" data-node-id="894:4366" data-name="Row 2">
                <div className="fg-a26da4f281" data-node-id="894:4367" data-name="Cell">
                  <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4368">
                    مبلغ درخواستی تسویه
                  </p>
                  <p className="fg-3e46eb501c" dir="auto" data-node-id="894:4369">
                    ۱۵۰۰۰۰۰ تومان
                  </p>
                </div>
                <div className="fg-a26da4f281" data-node-id="894:4370" data-name="Cell">
                  <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4371">
                    تاریخ ثبت درخواست
                  </p>
                  <p className="fg-a3a2aaf4af" data-node-id="894:4372">
                    ۱۴۰۳/۰۷/۱۲
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-5cc2abd8ad" data-node-id="894:4373" data-name="Status Transition">
              <div className="fg-46dacc6090" data-node-id="894:4374" data-name="Next Status">
                <p className="fg-05ebd28202" dir="auto" data-node-id="894:4375">
                  در حال پردازش (پایا)
                </p>
              </div>
              <p className="fg-7ac86579a7" data-node-id="894:4376">
                ◀
              </p>
              <div className="fg-22c9479508" data-node-id="894:4377" data-name="Current Status">
                <p className="fg-c41323270e" dir="auto" data-node-id="894:4378">
                  تأیید شده — در انتظار ارسال
                </p>
              </div>
              <p className="fg-934ca87244" dir="auto" data-node-id="894:4379">
                تغییر وضعیت درخواست:
              </p>
            </div>
            <div className="fg-452d346712" data-node-id="894:4380" data-name="Action Buttons">
              <DesignAction className="fg-541d041ceb" data-node-id="894:4381" data-name="Btn Cancel" label="انصراف و بازگشت" destination="settlement-requests">
                <p className="fg-0e55fb6792" dir="auto" data-node-id="894:4382">
                  انصراف و بازگشت
                </p>
              </DesignAction>
              <DesignAction className="fg-3dfb1b6374" data-node-id="894:4383" data-name="Btn Confirm" label="تأیید نهایی و ارسال به پردازش" destination="settlement-requests">
                <p className="fg-7d346f89f5" dir="auto" data-node-id="894:4384">
                  تأیید نهایی و ارسال به پردازش
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:4280" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:4281" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:4282">
            خانه نگارین
          </p>
          <div className="fg-b648a26f15" data-node-id="894:4283" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:4284" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:4285" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:4286" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:4963" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:4288">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="894:4289" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:4290" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4291" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:4966" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4293">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:4294" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:4295" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:4969" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4297">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4298" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4299" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:4972" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4301">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4302" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4303" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:4975" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4305">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4306" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4307" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:4978" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4309">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4310" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:4311" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:4981" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:4313">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4314" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:4315" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:4984" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4317">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4318" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4319" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:4987" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4321">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4322" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4323" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:4990" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4325">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:4326" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:4327" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:4328">
              کارشناس عملیات مالی
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:4329">
              مدیر مالی و تسویه‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:4330" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/d868643a.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
