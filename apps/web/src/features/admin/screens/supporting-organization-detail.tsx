// Figma 894:3161 — Admin / Supporting Organization Detail — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminSupportingOrganizationDetailDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:3161" data-name="Admin / Supporting Organization Detail — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:3162" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:3163" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:3164" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:3165" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/629d5f4e.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:3166" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:3170" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:3171" data-name="Global Search" label="جستجو" placeholder="جستجو در سازمان‌ها، برنامه‌های حمایتی و کدهای پیگیری...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="894:3172">
                جستجو در سازمان‌ها، برنامه‌های حمایتی و کدهای پیگیری...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:3173" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:3175">
              جزئیات سازمان حامی
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:3176" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="894:3177" data-name="Action bar & Breadcrumbs">
            <div className="fg-92b7da7864" data-node-id="894:3178" data-name="Actions">
              <DesignAction className="fg-61b2399ccb" data-node-id="894:3179" data-name="Negarin / Button" label="معرفی هنرمند جدید">
                <p className="fg-7ee08abcb6" dir="auto" data-node-id="I894:3179;46:3">
                  معرفی هنرمند جدید
                </p>
              </DesignAction>
              <DesignAction className="fg-61b2399ccb" data-node-id="894:3181" data-name="Negarin / Button" label="بررسی معرفی‌نامه‌ها">
                <p className="fg-01af75c3f6" dir="auto" data-node-id="I894:3181;46:3">
                  بررسی معرفی‌نامه‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-aeb445f664" data-node-id="894:3183" data-name="Breadcrumbs">
              <p className="fg-9eb0d25c1f" data-node-id="894:3184">
                ORG-1024
              </p>
              <p className="fg-b80efb661d" data-node-id="894:3185">{`>`}</p>
              <p className="fg-597fe7f1f0" dir="auto" data-node-id="894:3186">
                بنیاد هنرهای سنتی
              </p>
              <p className="fg-b80efb661d" data-node-id="894:3187">{`>`}</p>
              <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:3188">
                سازمان‌های حامی
              </p>
              <p className="fg-b80efb661d" data-node-id="894:3189">{`>`}</p>
              <DesignAction className="fg-31a2b6f0b0" dir="auto" data-node-id="894:3190" label="بازگشت" destination="supporting-organizations">
                بازگشت
              </DesignAction>
            </div>
          </div>
          <div className="fg-03bb2e10b3" data-node-id="894:3191" data-name="Detail Workspace Grid">
            <div className="fg-46ebc1fb1e" data-node-id="894:3192" data-name="Left Info Panel">
              <div className="fg-24081ceef5" data-node-id="894:3193" data-name="Frame">
                <p className="fg-8c96560c87" dir="auto" data-node-id="894:3194">
                  اطلاعات سازمان حامی
                </p>
                <div className="fg-df0a3de519" data-node-id="894:3195" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                  </div>
                </div>
                <div className="fg-1edcdaada8" data-node-id="894:3196" data-name="Frame">
                  <p className="fg-9eb0d25c1f" dir="auto" data-node-id="894:3197">
                    بنیاد هنرهای سنتی
                  </p>
                  <p className="fg-b80efb661d" dir="auto" data-node-id="894:3198">
                    نام نهاد
                  </p>
                </div>
                <div className="fg-f51c23fd12" data-node-id="894:3199" data-name="Frame">
                  <p className="fg-9eb0d25c1f" data-node-id="894:3200">
                    ORG-1024
                  </p>
                  <p className="fg-31a2b6f0b0" dir="auto" data-node-id="894:3201">
                    شناسه مرجع
                  </p>
                </div>
                <div className="fg-1edcdaada8" data-node-id="894:3202" data-name="Frame">
                  <p className="fg-f49fd59fa7" dir="auto" data-node-id="894:3203">
                    حمایت عضویت / برنامه رشد
                  </p>
                  <p className="fg-b80efb661d" dir="auto" data-node-id="894:3204">
                    نوع حمایت
                  </p>
                </div>
                <div className="fg-6d58331409" data-node-id="894:3205" data-name="Frame">
                  <p className="fg-063eaed2c5" dir="auto" data-node-id="894:3206">
                    شرح برنامه حمایتی:
                  </p>
                  <p className="fg-ed228cf2d2" dir="auto" data-node-id="894:3207">
                    تأمین مالی عضویت هنرمندان مستعد سفالگری و سرامیک جهت ارتقاء به سطوح رشد شکوفه و بالاتر و ارایه سهمیه کارگاهی.
                  </p>
                </div>
              </div>
              <div className="fg-24081ceef5" data-node-id="894:3208" data-name="Frame">
                <p className="fg-8c96560c87" dir="auto" data-node-id="894:3209">
                  خلاصه حمایت‌ها
                </p>
                <div className="fg-df0a3de519" data-node-id="894:3210" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                  </div>
                </div>
                <div className="fg-46d38f88e2" data-node-id="894:3211" data-name="Frame">
                  <p className="fg-e6fcaf5196" dir="auto" data-node-id="894:3212">
                    ۳۴ هنرمند
                  </p>
                  <p className="fg-2e7f5eb388" dir="auto" data-node-id="894:3213">
                    عضویت‌های فعال تحت حمایت
                  </p>
                </div>
                <div className="fg-46d38f88e2" data-node-id="894:3214" data-name="Frame">
                  <p className="fg-dfff493a6a" dir="auto" data-node-id="894:3215">
                    ۱۵ میلیون تومان
                  </p>
                  <p className="fg-2e7f5eb388" dir="auto" data-node-id="894:3216">
                    سهمیه خدمات کارگاهی کل
                  </p>
                </div>
                <div className="fg-46d38f88e2" data-node-id="894:3217" data-name="Frame">
                  <p className="fg-73b2c5c6cc" dir="auto" data-node-id="894:3218">
                    ۱ برنامه فعال
                  </p>
                  <p className="fg-2e7f5eb388" dir="auto" data-node-id="894:3219">
                    برنامه‌های در حال اجرا
                  </p>
                </div>
              </div>
              <div className="fg-24081ceef5" data-node-id="894:3220" data-name="Frame">
                <p className="fg-8c96560c87" dir="auto" data-node-id="894:3221">
                  فرصت‌های مرتبط
                </p>
                <div className="fg-df0a3de519" data-node-id="894:3222" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/admin-assets/f97e70e6.svg" />
                  </div>
                </div>
                <div className="fg-7a3fcc48e2" data-node-id="894:3223" data-name="Frame">
                  <p className="fg-80d4c3a7e2" data-node-id="894:3224">
                    OPP-1024
                  </p>
                  <p className="fg-c0b81437cf" dir="auto" data-node-id="894:3225">
                    طرح تجهیز المان‌های شهری سفالی
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-ee0ddf2a8d" data-node-id="894:3226" data-name="Right Panel Content">
              <div className="fg-f833e0c35b" data-node-id="894:3227" data-name="Org Summary Card">
                <div className="fg-c96fe10678" data-node-id="894:3228" data-name="General Spec Header">
                  <div className="fg-489a397814" data-node-id="894:3229" data-name="Badge">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3230">
                      فعال
                    </p>
                  </div>
                  <p className="fg-55e7af8786" dir="auto" data-node-id="894:3231">
                    بنیاد هنرهای سنتی (برنامه حمایتی ارتقای سفالگری)
                  </p>
                </div>
              </div>
              <div className="fg-cd12f2a8cf" data-node-id="894:3232" data-name="Supported Artists Section">
                <div className="fg-6dd7f43e28" data-node-id="894:3233" data-name="Apps Header">
                  <p className="fg-98c5a6f979" dir="auto" data-node-id="894:3234">
                    مشاهده لیست کامل معرفی‌شدگان
                  </p>
                  <p className="fg-2ed64816ff" dir="auto" data-node-id="894:3235">
                    هنرمندان منتخب تحت حمایت
                  </p>
                </div>
                <div className="fg-cfdd37b604" data-node-id="894:3236" data-name="Linked Artists Table">
                  <div className="fg-dc6c006a70" data-node-id="894:3237" data-name="THead">
                    <p className="fg-097e9474ee" dir="auto" data-node-id="894:3238">
                      سطح رشد فعلی
                    </p>
                    <p className="fg-097e9474ee" dir="auto" data-node-id="894:3239">
                      وضعیت حمایت
                    </p>
                    <p className="fg-097e9474ee" dir="auto" data-node-id="894:3240">
                      تاریخ معرفی
                    </p>
                    <p className="fg-4a9b73a3b7" dir="auto" data-node-id="894:3241">
                      هنرمند
                    </p>
                  </div>
                  <div className="fg-eeea8bc30c" data-node-id="894:3242" data-name="TRow">
                    <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3243">
                      شکوفه
                    </p>
                    <div className="fg-d3a9b73303" data-node-id="894:3244" data-name="Frame">
                      <div className="fg-489a397814" data-node-id="894:3245" data-name="Frame">
                        <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3246">
                          فعال
                        </p>
                      </div>
                    </div>
                    <p className="fg-8fda5c5742" data-node-id="894:3247">
                      ۱۴۰۲/۱۰/۰۲
                    </p>
                    <div className="fg-c7e21226fd" data-node-id="894:3248" data-name="Frame">
                      <p className="fg-8fc2866737" dir="auto" data-node-id="894:3249">
                        زهرا کریمی
                      </p>
                      <p className="fg-58d61dbfc5" data-node-id="894:3250">
                        ART-2051
                      </p>
                    </div>
                  </div>
                  <div className="fg-eeea8bc30c" data-node-id="894:3251" data-name="TRow">
                    <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3252">
                      جوانه
                    </p>
                    <div className="fg-d3a9b73303" data-node-id="894:3253" data-name="Frame">
                      <div className="fg-489a397814" data-node-id="894:3254" data-name="Frame">
                        <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3255">
                          فعال
                        </p>
                      </div>
                    </div>
                    <p className="fg-8fda5c5742" data-node-id="894:3256">
                      ۱۴۰۲/۱۰/۰۳
                    </p>
                    <div className="fg-c7e21226fd" data-node-id="894:3257" data-name="Frame">
                      <p className="fg-8fc2866737" dir="auto" data-node-id="894:3258">
                        محمد محسنی
                      </p>
                      <p className="fg-58d61dbfc5" data-node-id="894:3259">
                        ART-2052
                      </p>
                    </div>
                  </div>
                  <div className="fg-eeea8bc30c" data-node-id="894:3260" data-name="TRow">
                    <p className="fg-8fda5c5742" dir="auto" data-node-id="894:3261">
                      سرو زرین
                    </p>
                    <div className="fg-d3a9b73303" data-node-id="894:3262" data-name="Frame">
                      <div className="fg-489a397814" data-node-id="894:3263" data-name="Frame">
                        <p className="fg-5daf48ad35" dir="auto" data-node-id="894:3264">
                          فعال
                        </p>
                      </div>
                    </div>
                    <p className="fg-8fda5c5742" data-node-id="894:3265">
                      ۱۴۰۲/۱۰/۰۴
                    </p>
                    <div className="fg-c7e21226fd" data-node-id="894:3266" data-name="Frame">
                      <p className="fg-8fc2866737" dir="auto" data-node-id="894:3267">
                        سودابه یزدانی
                      </p>
                      <p className="fg-58d61dbfc5" data-node-id="894:3268">
                        ART-2053
                      </p>
                    </div>
                  </div>
                  <div className="fg-0feb1f5b6b" data-node-id="894:3269" data-name="TRow">
                    <p className="fg-8fda5c5742" data-node-id="894:3270">
                      —
                    </p>
                    <div className="fg-d3a9b73303" data-node-id="894:3271" data-name="Frame">
                      <div className="fg-8c9afb9183" data-node-id="894:3272" data-name="Frame">
                        <p className="fg-de972ba962" dir="auto" data-node-id="894:3273">
                          در انتظار تخصیص
                        </p>
                      </div>
                    </div>
                    <p className="fg-8fda5c5742" data-node-id="894:3274">
                      ۱۴۰۲/۱۰/۱۲
                    </p>
                    <div className="fg-c7e21226fd" data-node-id="894:3275" data-name="Frame">
                      <p className="fg-8fc2866737" dir="auto" data-node-id="894:3276">
                        کیوان فرزاد
                      </p>
                      <p className="fg-58d61dbfc5" data-node-id="894:3277">
                        ART-2054
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fg-cd12f2a8cf" data-node-id="894:3278" data-name="Recent Activity Section">
                <p className="fg-8c96560c87" dir="auto" data-node-id="894:3279">
                  فعالیت‌های اخیر سازمان
                </p>
                <div className="fg-df0a3de519" data-node-id="894:3280" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/admin-assets/9d8a1ce6.svg" />
                  </div>
                </div>
                <div className="fg-24081ceef5" data-node-id="894:3281" data-name="Activity Timeline">
                  <div className="fg-47aacf6d1d" data-node-id="894:3282" data-name="Frame">
                    <p className="fg-b2e13de1fc" data-node-id="894:3283">
                      ۱۴۰۲/۱۰/۱۶
                    </p>
                    <p className="fg-8b55499214" dir="auto" data-node-id="894:3284">
                      پرداخت قسط دوم سهمیه خدمات کارگاهی هنرمندان
                    </p>
                    <div className="fg-814236e220" data-node-id="894:3285" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/e42ace74.svg" />
                    </div>
                  </div>
                  <div className="fg-47aacf6d1d" data-node-id="894:3286" data-name="Frame">
                    <p className="fg-b2e13de1fc" data-node-id="894:3287">
                      ۱۴۰۲/۱۰/۱۲
                    </p>
                    <p className="fg-8b55499214" dir="auto" data-node-id="894:3288">
                      معرفی هنرمند جدید کیوان فرزاد (ART-2054)
                    </p>
                    <div className="fg-814236e220" data-node-id="894:3289" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/618eba4f.svg" />
                    </div>
                  </div>
                  <div className="fg-47aacf6d1d" data-node-id="894:3290" data-name="Frame">
                    <p className="fg-b2e13de1fc" data-node-id="894:3291">
                      ۱۴۰۲/۱۰/۰۲
                    </p>
                    <p className="fg-8b55499214" dir="auto" data-node-id="894:3292">
                      تأیید نهایی تخصیص عضویت برای ۳ هنرمند معرفی‌شده
                    </p>
                    <div className="fg-814236e220" data-node-id="894:3293" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/e42ace74.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:3294" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:3295" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:3296">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="894:3297" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:260" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:3299" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:3300" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:3301" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/0f5a52de.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:3302">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:3303" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:3304" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3305" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:3306" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3308">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:3309" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:3310" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:3311" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3313">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3314" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3315" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:3316" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3318">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3319" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3320" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:3321" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3323">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3324" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:3325" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:3326" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:3328">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3329" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3330" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:3331" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3333">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3334" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:3335" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:3336" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3338">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3339" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3340" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:3341" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3343">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:3344" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:3345" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:3346" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:3348">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:3349" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:3350" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:3351">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:3352">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:3353" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/754e3416.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
