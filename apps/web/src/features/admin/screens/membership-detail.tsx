// Figma 894:5341 — Admin / Membership Detail — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminMembershipDetailDesktop() {
  return (
    <div className="fg-596cc44889" data-node-id="894:5341" data-name="Admin / Membership Detail — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:5342" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:5343" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:5344" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:5345" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/0241110b.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:5346" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/e6770525.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:5350" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:5351" data-name="Global Search" label="جستجو" placeholder="نام هنرمند یا شناسه عضویت...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:5352">
                نام هنرمند یا شناسه عضویت...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:5353" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/b8907765.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:5355">
              جزئیات پرونده عضویت هنرمند
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:5356" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="894:5357" data-name="Breadcrumb Row">
            <div className="fg-4944cb2049" data-node-id="894:5358" data-name="Back Nav">
              <DesignAction className="fg-0edaeac592" dir="auto" data-node-id="894:5359" label="بازگشت" destination="memberships">
                بازگشت
              </DesignAction>
            </div>
            <div className="fg-811d881bcb" data-node-id="894:5360" data-name="Breadcrumbs">
              <p className="fg-fb36021cec" dir="auto" data-node-id="894:5361">
                پرونده ART-1092
              </p>
              <p className="fg-b80efb661d" data-node-id="894:5362">{`>`}</p>
              <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:5363">
                عضویت‌ها
              </p>
            </div>
          </div>
          <div className="fg-03bb2e10b3" data-node-id="894:5364" data-name="Details Grid">
            <div className="fg-7aa245312c" data-node-id="894:5365" data-name="Left Column">
              <div className="fg-de835e0649" data-node-id="894:5366" data-name="Upgrade History Section">
                <p className="fg-2ed64816ff" dir="auto" data-node-id="894:5367">
                  تاریخچه ارتقا و دوره‌ها
                </p>
                <div className="fg-89ff0050f4" data-node-id="894:5368" data-name="List">
                  <div className="fg-285e7e0288" data-node-id="894:5369" data-name="History Item">
                    <div className="fg-c96fe10678" data-node-id="894:5370" data-name="Row">
                      <p className="fg-58d61dbfc5" data-node-id="894:5371">
                        ۱۴۰۳/۰۱/۱۵
                      </p>
                      <p className="fg-537045f06d" dir="auto" data-node-id="894:5372">
                        ارتقای میان‌دوره به حرفه‌ای سالانه
                      </p>
                    </div>
                    <p className="fg-f454976ee1" dir="auto" data-node-id="894:5373">
                      سهمیه‌ها ارتقا یافت • ارجاع تراکنش: TRX-8831
                    </p>
                  </div>
                  <div className="fg-116c9d174b" data-node-id="894:5374" data-name="History Item">
                    <div className="fg-c96fe10678" data-node-id="894:5375" data-name="Row">
                      <p className="fg-58d61dbfc5" data-node-id="894:5376">
                        ۱۴۰۲/۱۲/۲۹
                      </p>
                      <p className="fg-537045f06d" dir="auto" data-node-id="894:5377">
                        ثبت عضویت پایه سالانه
                      </p>
                    </div>
                    <p className="fg-f454976ee1" dir="auto" data-node-id="894:5378">
                      شروع دوره یک‌ساله هنرمند • ارجاع تراکنش: TRX-7712
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-24081ceef5" data-node-id="894:5379" data-name="Recent Activities Section">
                <p className="fg-8c96560c87" dir="auto" data-node-id="894:5380">
                  فعالیت‌های اخیر عضویت
                </p>
                <div className="fg-89ff0050f4" data-node-id="894:5381" data-name="Activities List">
                  <div className="fg-1e0b110e51" data-node-id="894:5382" data-name="Activity Row">
                    <p className="fg-d5ea27d553" dir="auto" data-node-id="894:5383">
                      ۲ ساعت پیش
                    </p>
                    <p className="fg-8b55499214" dir="auto" data-node-id="894:5384">
                      استفاده از ۱ سهمیه عکاسی صنعتی توسط نگار حسینی
                    </p>
                    <div className="fg-814236e220" data-node-id="894:5385" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/e42ace74.svg" />
                    </div>
                  </div>
                  <div className="fg-1e0b110e51" data-node-id="894:5386" data-name="Activity Row">
                    <p className="fg-d5ea27d553" dir="auto" data-node-id="894:5387">
                      ۳ روز پیش
                    </p>
                    <p className="fg-8b55499214" dir="auto" data-node-id="894:5388">
                      ثبت درخواست ارتقا به سطح حرفه‌ای در وضعیت در انتظار پرداخت
                    </p>
                    <div className="fg-814236e220" data-node-id="894:5389" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/618eba4f.svg" />
                    </div>
                  </div>
                  <div className="fg-bca4c382de" data-node-id="894:5390" data-name="Activity Row">
                    <p className="fg-d5ea27d553" dir="auto" data-node-id="894:5391">
                      ۱ هفته پیش
                    </p>
                    <p className="fg-8b55499214" dir="auto" data-node-id="894:5392">
                      تغییر اطلاعات حمایت سازمانی از بدون حامی به بنیاد هنرهای سنتی
                    </p>
                    <div className="fg-814236e220" data-node-id="894:5393" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/0f84942d.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-3467b8fac9" data-node-id="894:5394" data-name="Right Column">
              <div className="fg-c96fe10678" data-node-id="894:5395" data-name="Section Header Group">
                <div className="fg-92b7da7864" data-node-id="894:5396" data-name="Actions">
                  <DesignAction className="fg-6334529e9a" data-node-id="894:5397" data-name="Action" label="لغو عضویت سالانه" destination="memberships">
                    <p className="fg-fcdff1eff0" dir="auto" data-node-id="894:5398">
                      لغو عضویت سالانه
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-2b0f66fe8b" data-node-id="894:5399" data-name="Action" label="ویرایش دستی پرونده">
                    <p className="fg-fcdff1eff0" dir="auto" data-node-id="894:5400">
                      ویرایش دستی پرونده
                    </p>
                  </DesignAction>
                </div>
                <p className="fg-8c96560c87" dir="auto" data-node-id="894:5401">
                  شناسنامه عضویت هنرمند
                </p>
              </div>
              <div className="fg-f965fdea79" data-node-id="894:5402" data-name="Info Card">
                <div className="fg-c93a8f5cea" data-node-id="894:5403" data-name="Data Row">
                  <div className="fg-bc62023f85" data-node-id="894:5404" data-name="Field">
                    <p className="fg-07b48db54a" dir="auto" data-node-id="894:5405">
                      کد عضویت پرونده
                    </p>
                    <p className="fg-053123e8c0" data-node-id="894:5406">
                      MEM-9022
                    </p>
                  </div>
                  <div className="fg-02fb1875bb" data-node-id="894:5407" data-name="Field">
                    <p className="fg-b2e13de1fc" dir="auto" data-node-id="894:5408">
                      وضعیت فعلی
                    </p>
                    <div className="fg-489a397814" data-node-id="894:5409" data-name="Badge">
                      <p className="fg-aa981ea395" dir="auto" data-node-id="894:5410">
                        فعال (سالانه)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fg-7d744d1b62" data-node-id="894:5411" data-name="Data Row">
                  <div className="fg-c8e84114ca" data-node-id="894:5412" data-name="Field">
                    <p className="fg-58d61dbfc5" dir="auto" data-node-id="894:5413">
                      بازه زمانی عضویت سالانه
                    </p>
                    <p className="fg-0c2c618947" dir="auto" data-node-id="894:5414">
                      ۱۴۰۳/۰۱/۰۱ الی ۱۴۰۳/۱۲/۲۹
                    </p>
                  </div>
                  <div className="fg-02fb1875bb" data-node-id="894:5415" data-name="Field">
                    <p className="fg-07b48db54a" dir="auto" data-node-id="894:5416">
                      تراکنش مرجع تمدید
                    </p>
                    <p className="fg-204f4e5723" data-node-id="894:5417">
                      TRX-9012
                    </p>
                  </div>
                </div>
                <div className="fg-df0a3de519" data-node-id="894:5418" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/admin-assets/781450b8.svg" />
                  </div>
                </div>
                <div className="fg-de835e0649" data-node-id="894:5419" data-name="Service Quotas Group">
                  <p className="fg-537045f06d" dir="auto" data-node-id="894:5420">
                    سهمیه خدمات مصرف‌شده
                  </p>
                  <div className="fg-f913b1a7dc" data-node-id="894:5421" data-name="Quota Progress Section">
                    <div className="fg-a26da4f281" data-node-id="894:5422" data-name="Progress info">
                      <p className="fg-b9aba281d0" dir="auto" data-node-id="894:5423">
                        سهمیه عکاسی صنعتی اثار
                      </p>
                      <p className="fg-1b90c6d8d3" dir="auto" data-node-id="894:5424">
                        ۵ از ۱۰ مورد استفاده‌شده
                      </p>
                    </div>
                    <div className="fg-a26da4f281" data-node-id="894:5425" data-name="Progress info">
                      <p className="fg-b9aba281d0" dir="auto" data-node-id="894:5426">
                        سهمیه مشاوره بازاریابی
                      </p>
                      <p className="fg-1b90c6d8d3" dir="auto" data-node-id="894:5427">
                        ۲ از ۳ مورد استفاده‌شده
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fg-df0a3de519" data-node-id="894:5428" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/admin-assets/781450b8.svg" />
                  </div>
                </div>
                <div className="fg-0578e37a11" data-node-id="894:5429" data-name="Institutional Support">
                  <p className="fg-58d61dbfc5" dir="auto" data-node-id="894:5430">
                    سازمان حامی عضویت
                  </p>
                  <p className="fg-3e5c4ee5c5" dir="auto" data-node-id="894:5431">
                    بنیاد هنرهای سنتی ایران (ORG-1024)
                  </p>
                </div>
                <div className="fg-df0a3de519" data-node-id="894:5432" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/admin-assets/781450b8.svg" />
                  </div>
                </div>
                <div className="fg-c3b2efc371" data-node-id="894:5433" data-name="Operational Issues">
                  <p className="fg-6826a0afc8" dir="auto" data-node-id="894:5434">
                    مشکلات عملیاتی پرونده
                  </p>
                  <p className="fg-3ec307e88f" dir="auto" data-node-id="894:5435">
                    درخواست تمدید دستی قبلی به دلیل عدم تایید نهایی تراکنش بانکی توسط ناظر متوقف شده است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:5436" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:5437" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:5438">
            خانه نگارین
          </p>
          <div className="fg-7d8647fa8b" data-node-id="894:5439" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:263" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:5441" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:5442" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:5443" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/a4cc0b99.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:5444">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-1df709db2b" data-node-id="894:5445" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:5446" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5447" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:5448" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5450">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:5451" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:5452" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:5453" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5455">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5456" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5457" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:5458" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5460">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5461" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5462" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:5463" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5465">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5466" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5467" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:5468" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5470">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5471" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:5472" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:5473" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-6c6e16a8e2" dir="auto" data-node-id="894:5475">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5476" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:5477" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:5478" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5480">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5481" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5482" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:5483" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5485">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5486" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5487" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:5488" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5490">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:5491" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:5492" data-name="Profile Details">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="894:5493">
              کارشناس عضویت
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:5494">
              مدیریت اعضا و سهمیه‌ها
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:5495" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a00df1d2.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
