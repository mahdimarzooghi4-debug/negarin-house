// Figma 894:4122 — Admin / Settlement Review — Desktop
import { DesignAction, DesignField, DesignChoice } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminSettlementReviewDesktop() {
  return (
    <div className="fg-a9d80d349c" data-node-id="894:4122" data-name="Admin / Settlement Review — Desktop">
      <div className="fg-e359c64fae" data-node-id="894:4184" data-name="Admin / Settlement Review — Desktop">
        <div className="fg-e16ac02b64" data-node-id="894:4185" data-name="Main Workspace">
          <div className="fg-77ab100845" data-node-id="894:4186" data-name="Header">
            <div className="fg-a34c8fe932" data-node-id="894:4187" data-name="Left Actions">
              <div className="fg-08c31cb510" data-node-id="894:4188" data-name="Staff Profile Circle">
                <img alt="" className="fg-8038e5755b" src="/admin-assets/d4ffb53b.png" />
              </div>
              <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:4189" data-name="Notification Bell Button" label="Notification Bell Button">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03b3ded8.svg" />
              </DesignAction>
            </div>
            <div className="fg-460d084997" data-node-id="894:4193" data-name="Right Header">
              <DesignField className="fg-9ce4e1a1a3" data-node-id="894:4194" data-name="Global Search" label="جستجو" placeholder="جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...">
                <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:4195">
                  جستجو در تسویه‌ها، هنرمندان، تراکنش‌ها و ...
                </p>
                <div className="fg-c51752dc8c" data-node-id="894:4196" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/61a8b8ea.svg" />
                </div>
              </DesignField>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="894:4198">
                بررسی کارشناسی و تایید تسویه حساب
              </p>
            </div>
          </div>
          <div className="fg-28892a2677" data-node-id="894:4199" data-name="Scrollable Content">
            <div className="fg-243899f592" data-node-id="894:4200" data-name="Detail Header Area">
              <div className="fg-7fdaf3505a" data-node-id="894:4201" data-name="Breadcrumb">
                <p className="fg-25b60542f9" dir="auto" data-node-id="894:4202">
                  بررسی درخواست تسویه
                </p>
                <p className="fg-fc7a3d01c3" data-node-id="894:4203">{`>`}</p>
                <p className="fg-911908855f" dir="auto" data-node-id="894:4204">
                  تسویه‌حساب‌ها
                </p>
              </div>
              <p className="fg-f715e44eb6" dir="auto" data-node-id="894:4205">
                بررسی نهایی و صدور حواله پایا SET-1024
              </p>
            </div>
            <div className="fg-661a3c6ade" data-node-id="894:4206" data-name="Form Area">
              <div className="fg-0a348fa5a9" data-node-id="894:4207" data-name="Artist Overview">
                <div className="fg-88d4e82801" data-node-id="894:4208" data-name="Meta Specs">
                  <div className="fg-db65f399cd" data-node-id="894:4209" data-name="Spec">
                    <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4210">
                      مبلغ درخواستی تسویه
                    </p>
                    <p className="fg-7dbd34c1e2" dir="auto" data-node-id="894:4211">
                      ۴۵۰۰۰۰۰ تومان
                    </p>
                  </div>
                  <div className="fg-db65f399cd" data-node-id="894:4212" data-name="Spec">
                    <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4213">
                      سطح عضویت هنرمند
                    </p>
                    <p className="fg-16eff7ac15" dir="auto" data-node-id="894:4214">
                      حرفه‌ای (سطح ۳)
                    </p>
                  </div>
                  <div className="fg-db65f399cd" data-node-id="894:4215" data-name="Spec">
                    <p className="fg-7f846ac2e7" dir="auto" data-node-id="894:4216">
                      نام هنرمند ذینفع
                    </p>
                    <p className="fg-c34c9a845e" dir="auto" data-node-id="894:4217">
                      زهرا کریمی (ART-8821)
                    </p>
                  </div>
                </div>
                <div className="fg-fad607f231" data-node-id="894:4218" data-name="Artist Pic">
                  <img alt="" className="fg-2377bfb0e7" src="/admin-assets/34a84c90.png" />
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="894:4219" data-name="Validation Checklist">
                <p className="fg-ade5fd2235" dir="auto" data-node-id="894:4220">
                  لیست کنترل ضوابط عملیاتی
                </p>
                <div className="fg-24081ceef5" data-node-id="894:4221" data-name="Checklist Items">
                  <div className="fg-93778178b8" data-node-id="894:4222" data-name="Checklist Row">
                    <p className="fg-899c8bd72f" dir="auto" data-node-id="894:4223">
                      تطابق کامل آدرس شبا و نام شناسنامه‌ای هنرمند
                    </p>
                    <DesignChoice className="fg-dcc9632b59" data-node-id="894:4224" data-name="Checkbox" label="Checkbox" group="Checklist Row" initial={false} multiple>
                      <div className="fg-fea147ec46" data-node-id="894:4225" data-name="check-icon">
                        <div className="fg-8a0ff48924" data-node-id="894:4254" data-name="check">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/8ce83a43.svg" />
                        </div>
                      </div>
                    </DesignChoice>
                  </div>
                  <div className="fg-93778178b8" data-node-id="894:4227" data-name="Checklist Row">
                    <p className="fg-899c8bd72f" dir="auto" data-node-id="894:4228">
                      تأیید کفایت موجودی انباشته در صندوق نگارین
                    </p>
                    <DesignChoice className="fg-dcc9632b59" data-node-id="894:4229" data-name="Checkbox" label="Checkbox" group="Checklist Row" initial={false} multiple>
                      <div className="fg-fea147ec46" data-node-id="894:4230" data-name="check-icon">
                        <div className="fg-8a0ff48924" data-node-id="894:4257" data-name="check">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/8ce83a43.svg" />
                        </div>
                      </div>
                    </DesignChoice>
                  </div>
                  <div className="fg-93778178b8" data-node-id="894:4232" data-name="Checklist Row">
                    <p className="fg-899c8bd72f" dir="auto" data-node-id="894:4233">
                      بررسی عدم وجود هرگونه مرجوعی یا استرداد فعال مرتبط
                    </p>
                    <DesignChoice className="fg-dcc9632b59" data-node-id="894:4234" data-name="Checkbox" label="Checkbox" group="Checklist Row" initial={false} multiple>
                      <div className="fg-fea147ec46" data-node-id="894:4235" data-name="check-icon">
                        <div className="fg-8a0ff48924" data-node-id="894:4260" data-name="check">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/8ce83a43.svg" />
                        </div>
                      </div>
                    </DesignChoice>
                  </div>
                  <div className="fg-93778178b8" data-node-id="894:4237" data-name="Checklist Row">
                    <p className="fg-899c8bd72f" dir="auto" data-node-id="894:4238">
                      عدم تداخل با تسویه‌های موازی در ۲۴ ساعت اخیر
                    </p>
                    <DesignChoice className="fg-dcc9632b59" data-node-id="894:4239" data-name="Checkbox" label="Checkbox" group="Checklist Row" initial={false} multiple>
                      <div className="fg-fea147ec46" data-node-id="894:4240" data-name="check-icon">
                        <div className="fg-8a0ff48924" data-node-id="894:4263" data-name="check">
                          <img alt="" className="fg-8faf267d30" src="/admin-assets/8ce83a43.svg" />
                        </div>
                      </div>
                    </DesignChoice>
                  </div>
                </div>
              </div>
              <div className="fg-59c61bcebe" data-node-id="894:4242" data-name="Decision Block">
                <p className="fg-19fa1bb32b" dir="auto" data-node-id="894:4243">
                  ثبت نظر کارشناسی و نتیجه بررسی
                </p>
                <DesignField className="fg-82e01851cd" data-node-id="894:4244" data-name="Input Field Group" label="ثبت نظر کارشناسی و نتیجه بررسی" placeholder="توضیحات کارشناسی (اختیاری) مستندات و بررسی تراکنش‌های ارجاعی با موفقیت تایید شد. شبا مقصد معتبر است.">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:4245">
                    توضیحات کارشناسی (اختیاری)
                  </p>
                  <DesignField className="fg-f6b2afd843" data-node-id="894:4246" data-name="Textarea" label="توضیحات کارشناسی (اختیاری)" placeholder="مستندات و بررسی تراکنش‌های ارجاعی با موفقیت تایید شد. شبا مقصد معتبر است.">
                    <p className="fg-f68c5e162d" dir="auto" data-node-id="894:4247">
                      مستندات و بررسی تراکنش‌های ارجاعی با موفقیت تایید شد. شبا مقصد معتبر است.
                    </p>
                  </DesignField>
                </DesignField>
              </div>
              <div className="fg-0bab63b93d" data-node-id="894:4248" data-name="Form Actions Row">
                <div className="fg-fce8aa9685" data-node-id="894:4249" data-name="Cancel Button">
                  <DesignAction className="fg-0e55fb6792" dir="auto" data-node-id="894:4250" label="بازگشت" destination="settlement-requests">
                    بازگشت
                  </DesignAction>
                </div>
                <DesignAction className="fg-4987203796" data-node-id="894:4251" data-name="Approve Button" label="تأیید نهایی و ارسال به صف پایا" destination="settlement-confirmation">
                  <p className="fg-31b19a5ba7" dir="auto" data-node-id="894:4252">
                    تأیید نهایی و ارسال به صف پایا
                  </p>
                </DesignAction>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-734182496e" data-node-id="894:4123" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:4124" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:4125">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="894:4126" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="894:4127" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:4128" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:4129" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:4130" data-name="dashboard-icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/2446f185.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:4132">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:4133" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:4134" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4135" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:4136" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3a0ef4da.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4138">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:4139" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:4140" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:4141" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/e649b40e.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4143">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4144" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4145" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:4146" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/51d3c846.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4148">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4149" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4150" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:4151" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/9c45ab6a.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4153">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4154" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4155" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:4156" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3324bdd2.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4158">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4159" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:4160" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:4161" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/b0e5c860.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:4163">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4164" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:4165" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:4166" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/e545bc1e.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4168">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4169" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4170" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:4171" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/17548dd6.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4173">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:4174" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:4175" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:4176" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/d4cf07aa.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:4178">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:4179" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:4180" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:4181">
              کارشناس عملیات مالی
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:4182">
              مدیر مالی و تسویه‌ها
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:4183" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/8058df28.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
