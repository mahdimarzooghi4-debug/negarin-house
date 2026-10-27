// Figma 870:200 — Admin / Dashboard — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminDashboardDesktop() {
  return (
    <div className="fg-95cbbbbdb3" data-node-id="870:200" data-name="Admin / Dashboard — Desktop">
      <div className="fg-4d95428dfd" data-node-id="870:202" data-name="Negarin Admin Dashboard Desktop">
        <div className="fg-f7cede9c7c" data-node-id="870:203" data-name="Main Workspace">
          <div className="fg-982b1ce7e4" data-node-id="870:204" data-name="Header">
            <div className="fg-a34c8fe932" data-node-id="870:205" data-name="Left Actions">
              <div className="fg-08c31cb510" data-node-id="870:206" data-name="Staff Profile Circle">
                <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
              </div>
              <DesignAction className="fg-a6f8c7bf2d" data-node-id="870:207" data-name="Notification Bell Button" label="Notification Bell Button">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/cd271c58.svg" />
              </DesignAction>
            </div>
            <div className="fg-460d084997" data-node-id="870:210" data-name="Right Header">
              <DesignField className="fg-bed5bc97c2" data-node-id="870:211" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، محصولات، سفارش‌ها و ...">
                <p className="fg-3a06ee4cfb" dir="auto" data-node-id="870:212">
                  جستجو در هنرمندان، محصولات، سفارش‌ها و ...
                </p>
                <div className="fg-c51752dc8c" data-node-id="870:692" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </DesignField>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="870:214">
                داشبورد عملیات نگارین
              </p>
            </div>
          </div>
          <div className="fg-28892a2677" data-node-id="870:215" data-name="Scrollable Content">
            <div className="fg-867b1b2e34" data-node-id="870:216" data-name="Operational Summary">
              <DesignAction className="fg-89dbc7beb5" data-node-id="870:217" data-name="Metric Shortcut" label="۷ درخواست‌های خدمات فعال" destination="service-requests">
                <p className="fg-f4472f86ce" data-node-id="870:218">
                  ۷
                </p>
                <p className="fg-8f2e8dbd17" dir="auto" data-node-id="870:219">
                  درخواست‌های خدمات فعال
                </p>
              </DesignAction>
              <DesignAction className="fg-89dbc7beb5" data-node-id="870:220" data-name="Metric Shortcut" label="۱۴ تسویه‌های در انتظار" destination="settlement-requests">
                <p className="fg-c9547361f2" data-node-id="870:221">
                  ۱۴
                </p>
                <p className="fg-8f2e8dbd17" dir="auto" data-node-id="870:222">
                  تسویه‌های در انتظار
                </p>
              </DesignAction>
              <DesignAction className="fg-89dbc7beb5" data-node-id="870:223" data-name="Metric Shortcut" label="۵ سفارش‌های نیازمند مداخله" destination="orders-needs-action">
                <p className="fg-73ab430732" data-node-id="870:224">
                  ۵
                </p>
                <p className="fg-8f2e8dbd17" dir="auto" data-node-id="870:225">
                  سفارش‌های نیازمند مداخله
                </p>
              </DesignAction>
              <DesignAction className="fg-89dbc7beb5" data-node-id="870:226" data-name="Metric Shortcut" label="۳۱ بررسی‌های باز" destination="product-review-queue">
                <p className="fg-5061c0f8a0" data-node-id="870:227">
                  ۳۱
                </p>
                <p className="fg-8f2e8dbd17" dir="auto" data-node-id="870:228">
                  بررسی‌های باز
                </p>
              </DesignAction>
            </div>
            <div className="fg-c7a881f669" data-node-id="870:229" data-name="Worklist Section">
              <p className="fg-4f3073a855" dir="auto" data-node-id="870:230">
                نیازمند اقدام
              </p>
              <div className="fg-ceebe80a1f" data-node-id="870:231" data-name="Table Wrapper">
                <div className="fg-6c8ad47165" data-node-id="870:232" data-name="Table Header Row">
                  <p className="fg-207ea3ad86" dir="auto" data-node-id="870:233">
                    اقدام
                  </p>
                  <p className="fg-44d10f1b20" dir="auto" data-node-id="870:234">
                    مسئول
                  </p>
                  <p className="fg-44d10f1b20" dir="auto" data-node-id="870:235">
                    زمان ثبت
                  </p>
                  <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="870:236">
                    وضعیت
                  </p>
                  <p className="fg-5fa1cff2ec" dir="auto" data-node-id="870:237">
                    موضوع
                  </p>
                  <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="870:238">
                    نوع
                  </p>
                </div>
                <div className="fg-c475d979ca" data-node-id="870:239" data-name="Table Body">
                  <div className="fg-836f598d9f" data-node-id="870:240" data-name="Table Row">
                    <DesignAction className="fg-7b391c49f6" data-node-id="870:241" data-name="Col Action" label="بررسی" destination="credential-review">
                      <p className="fg-c094a3d14b" dir="auto" data-node-id="870:242">
                        بررسی
                      </p>
                    </DesignAction>
                    <p className="fg-40e95d8efd" dir="auto" data-node-id="870:243">
                      تخصیص نشده
                    </p>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="870:244">
                      ۳ ساعت پیش
                    </p>
                    <div className="fg-82303a202c" data-node-id="870:245" data-name="Col Status">
                      <div className="fg-8c9afb9183" data-node-id="870:246" data-name="Badge">
                        <p className="fg-de972ba962" dir="auto" data-node-id="870:247">
                          در انتظار بررسی
                        </p>
                      </div>
                    </div>
                    <p className="fg-50225ff4bd" dir="auto" data-node-id="870:248">
                      نمونه هنرمند
                    </p>
                    <p className="fg-03703be2b6" dir="auto" data-node-id="870:249">
                      بررسی مدرک
                    </p>
                  </div>
                  <div className="fg-836f598d9f" data-node-id="870:250" data-name="Table Row">
                    <DesignAction className="fg-7b391c49f6" data-node-id="870:251" data-name="Col Action" label="بررسی" destination="product-review-new-product">
                      <p className="fg-c094a3d14b" dir="auto" data-node-id="870:252">
                        بررسی
                      </p>
                    </DesignAction>
                    <p className="fg-40e95d8efd" dir="auto" data-node-id="870:253">
                      تخصیص نشده
                    </p>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="870:254">
                      ۵ ساعت پیش
                    </p>
                    <div className="fg-82303a202c" data-node-id="870:255" data-name="Col Status">
                      <div className="fg-c9a49f4476" data-node-id="870:256" data-name="Badge">
                        <p className="fg-645e8110ca" dir="auto" data-node-id="870:257">
                          در انتظار بررسی
                        </p>
                      </div>
                    </div>
                    <p className="fg-50225ff4bd" dir="auto" data-node-id="870:258">
                      نمونه محصول PRD-XXXX
                    </p>
                    <p className="fg-03703be2b6" dir="auto" data-node-id="870:259">
                      بررسی محصول
                    </p>
                  </div>
                  <div className="fg-836f598d9f" data-node-id="870:260" data-name="Table Row">
                    <DesignAction className="fg-7b391c49f6" data-node-id="870:261" data-name="Col Action" label="رسیدگی" destination="order-issue-detail">
                      <p className="fg-c094a3d14b" dir="auto" data-node-id="870:262">
                        رسیدگی
                      </p>
                    </DesignAction>
                    <p className="fg-40e95d8efd" dir="auto" data-node-id="870:263">
                      تخصیص نشده
                    </p>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="870:264">
                      ۱ روز پیش
                    </p>
                    <div className="fg-82303a202c" data-node-id="870:265" data-name="Col Status">
                      <div className="fg-f5a735ebf8" data-node-id="870:266" data-name="Badge">
                        <p className="fg-415f50ee1d" dir="auto" data-node-id="870:267">
                          نیازمند رسیدگی
                        </p>
                      </div>
                    </div>
                    <p className="fg-50225ff4bd" dir="auto" data-node-id="870:268">
                      سفارش ORD-XXXX
                    </p>
                    <p className="fg-03703be2b6" dir="auto" data-node-id="870:269">
                      مسئله سفارش
                    </p>
                  </div>
                  <div className="fg-836f598d9f" data-node-id="870:270" data-name="Table Row">
                    <DesignAction className="fg-7b391c49f6" data-node-id="870:271" data-name="Col Action" label="بررسی" destination="settlement-review">
                      <p className="fg-c094a3d14b" dir="auto" data-node-id="870:272">
                        بررسی
                      </p>
                    </DesignAction>
                    <p className="fg-40e95d8efd" dir="auto" data-node-id="870:273">
                      تخصیص نشده
                    </p>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="870:274">
                      ۲ ساعت پیش
                    </p>
                    <div className="fg-82303a202c" data-node-id="870:275" data-name="Col Status">
                      <div className="fg-8c9afb9183" data-node-id="870:276" data-name="Badge">
                        <p className="fg-de972ba962" dir="auto" data-node-id="870:277">
                          در انتظار تأیید
                        </p>
                      </div>
                    </div>
                    <p className="fg-50225ff4bd" dir="auto" data-node-id="870:278">
                      درخواست SET-XXXX
                    </p>
                    <p className="fg-03703be2b6" dir="auto" data-node-id="870:279">
                      تأیید تسویه
                    </p>
                  </div>
                  <div className="fg-836f598d9f" data-node-id="870:280" data-name="Table Row">
                    <DesignAction className="fg-7b391c49f6" data-node-id="870:281" data-name="Col Action" label="رسیدگی" destination="service-request-detail">
                      <p className="fg-c094a3d14b" dir="auto" data-node-id="870:282">
                        رسیدگی
                      </p>
                    </DesignAction>
                    <p className="fg-40e95d8efd" dir="auto" data-node-id="870:283">
                      تخصیص نشده
                    </p>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="870:284">
                      ۴ ساعت پیش
                    </p>
                    <div className="fg-82303a202c" data-node-id="870:285" data-name="Col Status">
                      <div className="fg-d7139b82ce" data-node-id="870:286" data-name="Badge">
                        <p className="fg-ade22fcf80" dir="auto" data-node-id="870:287">
                          در انتظار تخصیص
                        </p>
                      </div>
                    </div>
                    <p className="fg-50225ff4bd" dir="auto" data-node-id="870:288">
                      نمونه خدمت SRV-XXXX
                    </p>
                    <p className="fg-03703be2b6" dir="auto" data-node-id="870:289">
                      درخواست خدمت
                    </p>
                  </div>
                  <div className="fg-836f598d9f" data-node-id="870:290" data-name="Table Row">
                    <DesignAction className="fg-7b391c49f6" data-node-id="870:291" data-name="Col Action" label="مشاهده" destination="opportunity-detail">
                      <p className="fg-c094a3d14b" dir="auto" data-node-id="870:292">
                        مشاهده
                      </p>
                    </DesignAction>
                    <p className="fg-40e95d8efd" dir="auto" data-node-id="870:293">
                      تخصیص نشده
                    </p>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="870:294">
                      ۶ ساعت پیش
                    </p>
                    <div className="fg-82303a202c" data-node-id="870:295" data-name="Col Status">
                      <div className="fg-489a397814" data-node-id="870:296" data-name="Badge">
                        <p className="fg-5daf48ad35" dir="auto" data-node-id="870:297">
                          در انتظار بررسی
                        </p>
                      </div>
                    </div>
                    <p className="fg-50225ff4bd" dir="auto" data-node-id="870:298">
                      فرصت OPP-XXXX
                    </p>
                    <p className="fg-03703be2b6" dir="auto" data-node-id="870:299">
                      بررسی فرصت
                    </p>
                  </div>
                  <div className="fg-836f598d9f" data-node-id="870:300" data-name="Table Row">
                    <DesignAction className="fg-7b391c49f6" data-node-id="870:301" data-name="Col Action" label="بررسی" destination="credential-review">
                      <p className="fg-c094a3d14b" dir="auto" data-node-id="870:302">
                        بررسی
                      </p>
                    </DesignAction>
                    <p className="fg-40e95d8efd" dir="auto" data-node-id="870:303">
                      تخصیص نشده
                    </p>
                    <p className="fg-252c8b5793" dir="auto" data-node-id="870:304">
                      ۱ روز پیش
                    </p>
                    <div className="fg-82303a202c" data-node-id="870:305" data-name="Col Status">
                      <DesignAction className="fg-bc154bd16e" data-node-id="870:306" data-name="Badge" label="بازگشت اصلاحات" destination="dashboard">
                        <p className="fg-1636b45c60" dir="auto" data-node-id="870:307">
                          بازگشت اصلاحات
                        </p>
                      </DesignAction>
                    </div>
                    <p className="fg-50225ff4bd" dir="auto" data-node-id="870:308">
                      نمونه هنرمند
                    </p>
                    <p className="fg-03703be2b6" dir="auto" data-node-id="870:309">
                      بررسی مدرک
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-243899f592" data-node-id="870:310" data-name="Active Flows Row">
              <p className="fg-224af4107d" dir="auto" data-node-id="870:311">
                جریان‌های فعال سیستم
              </p>
              <div className="fg-0bab63b93d" data-node-id="870:312" data-name="Flows Container">
                <DesignAction className="fg-c32a7b0ac8" data-node-id="870:313" data-name="Flow Card" label="مسائل سفارش ● ۳ مورد باز" destination="order-issues">
                  <p className="fg-f9065292ba" dir="auto" data-node-id="870:314">
                    مسائل سفارش
                  </p>
                  <div className="fg-7ced9ecbbc" data-node-id="870:315" data-name="Value Group">
                    <p className="fg-f26e4773f1" data-node-id="870:316">
                      ●
                    </p>
                    <p className="fg-6c1fe9d28c" dir="auto" data-node-id="870:317">
                      ۳ مورد باز
                    </p>
                  </div>
                </DesignAction>
                <DesignAction className="fg-c32a7b0ac8" data-node-id="870:318" data-name="Flow Card" label="تسویه‌ها ● ۱۴ درخواست فعال" destination="settlement-requests">
                  <p className="fg-f9065292ba" dir="auto" data-node-id="870:319">
                    تسویه‌ها
                  </p>
                  <div className="fg-7ced9ecbbc" data-node-id="870:320" data-name="Value Group">
                    <p className="fg-f02be03cf5" data-node-id="870:321">
                      ●
                    </p>
                    <p className="fg-6c1fe9d28c" dir="auto" data-node-id="870:322">
                      ۱۴ درخواست فعال
                    </p>
                  </div>
                </DesignAction>
                <DesignAction className="fg-c32a7b0ac8" data-node-id="870:323" data-name="Flow Card" label="مدارک حرفه‌ای ● ۸ مورد در انتظار" destination="order-issues">
                  <p className="fg-f9065292ba" dir="auto" data-node-id="870:324">
                    مدارک حرفه‌ای
                  </p>
                  <div className="fg-7ced9ecbbc" data-node-id="870:325" data-name="Value Group">
                    <p className="fg-b33f490ec7" data-node-id="870:326">
                      ●
                    </p>
                    <p className="fg-6c1fe9d28c" dir="auto" data-node-id="870:327">
                      ۸ مورد در انتظار
                    </p>
                  </div>
                </DesignAction>
                <DesignAction className="fg-c32a7b0ac8" data-node-id="870:328" data-name="Flow Card" label="بررسی محصولات ● ۲۳ مورد در صف" destination="product-review-queue">
                  <p className="fg-f9065292ba" dir="auto" data-node-id="870:329">
                    بررسی محصولات
                  </p>
                  <div className="fg-7ced9ecbbc" data-node-id="870:330" data-name="Value Group">
                    <p className="fg-39d82156fc" data-node-id="870:331">
                      ●
                    </p>
                    <p className="fg-6c1fe9d28c" dir="auto" data-node-id="870:332">
                      ۲۳ مورد در صف
                    </p>
                  </div>
                </DesignAction>
              </div>
            </div>
            <div className="fg-a0b97fcdaa" data-node-id="870:333" data-name="Ecosystem Grid Section">
              <p className="fg-8390bc5777" dir="auto" data-node-id="870:334">
                نمای کلی اکوسیستم نگارین
              </p>
              <div className="fg-ceb469fd60" data-node-id="870:335" data-name="Eco Container">
                <div className="fg-52a7200d7a" data-node-id="870:336" data-name="Eco Tile">
                  <p className="fg-537045f06d" data-node-id="870:337">
                    ۴۸
                  </p>
                  <p className="fg-d3f6cdc950" dir="auto" data-node-id="870:338">
                    خدمات فعال
                  </p>
                </div>
                <div className="fg-52a7200d7a" data-node-id="870:339" data-name="Eco Tile">
                  <p className="fg-537045f06d" data-node-id="870:340">
                    ۱۵
                  </p>
                  <p className="fg-d3f6cdc950" dir="auto" data-node-id="870:341">
                    فرصت‌های باز
                  </p>
                </div>
                <div className="fg-52a7200d7a" data-node-id="870:342" data-name="Eco Tile">
                  <p className="fg-537045f06d" data-node-id="870:343">
                    ۲۹
                  </p>
                  <p className="fg-d3f6cdc950" dir="auto" data-node-id="870:344">
                    سفارش‌های فعال
                  </p>
                </div>
                <div className="fg-52a7200d7a" data-node-id="870:345" data-name="Eco Tile">
                  <p className="fg-537045f06d" data-node-id="870:346">
                    ۴,۱۲۸
                  </p>
                  <p className="fg-d3f6cdc950" dir="auto" data-node-id="870:347">
                    محصولات منتشرشده
                  </p>
                </div>
                <div className="fg-52a7200d7a" data-node-id="870:348" data-name="Eco Tile">
                  <p className="fg-537045f06d" data-node-id="870:349">
                    ۸۴۲
                  </p>
                  <p className="fg-d3f6cdc950" dir="auto" data-node-id="870:350">
                    هنرمندان فعال
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminSidebar className="fg-1ae6468b1f" data-node-id="870:351" data-name="Sidebar">
          <div className="fg-bfcc56511d" data-node-id="870:352" data-name="Brand">
            <p className="fg-013587b973" dir="auto" data-node-id="870:353">
              خانه نگارین
            </p>
            <div className="fg-85567f1031" data-node-id="870:354" data-name="Logo Container">
              <div className="fg-842ae29a35" data-node-id="880:3" data-name="Brand / Negarin Logo">
                <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
              </div>
            </div>
          </div>
          <div className="fg-47d4dde56b" data-node-id="870:356" data-name="Navigation">
            <DesignAction className="fg-4a871e0b11" data-node-id="870:357" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
              <div className="fg-c51752dc8c" data-node-id="870:358" data-name="Dashboard Icon">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/2f386285.svg" />
              </div>
              <p className="fg-6abfcd3772" dir="auto" data-node-id="870:359">
                داشبورد
              </p>
            </DesignAction>
            <div className="fg-b9552021d1" data-node-id="870:360" data-name="Nav Groups">
              <div className="fg-3f106e1f96" data-node-id="870:361" data-name="Group-0">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:362" data-name="Group Header" label="هنرمندان" destination="artists">
                  <div className="fg-fc08538add" data-node-id="870:689" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:364">
                    هنرمندان
                  </p>
                </DesignAction>
              </div>
              <div className="fg-239f54e425" data-node-id="870:365" data-name="Group-1">
                <DesignAction className="fg-95957b1f9c" data-node-id="870:366" data-name="Group Header" label="بازار" destination="products">
                  <div className="fg-fc08538add" data-node-id="870:695" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:368">
                    بازار
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:369" data-name="Group-2">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:370" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                  <div className="fg-fc08538add" data-node-id="870:698" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:372">
                    سفارش و ارسال
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:373" data-name="Group-3">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:374" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                  <div className="fg-fc08538add" data-node-id="870:701" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:376">
                    رشد و خدمات
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:377" data-name="Group-4">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:378" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                  <div className="fg-fc08538add" data-node-id="870:704" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:380">
                    فرصت‌ها
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:381" data-name="Group-5">
                <DesignAction className="fg-558da3a1d5" data-node-id="870:382" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                  <div className="fg-fc08538add" data-node-id="870:707" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:384">
                    مالی و عضویت
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="870:385" data-name="Group-6">
                <div className="fg-558da3a1d5" data-node-id="870:386" data-name="Group Header">
                  <div className="fg-fc08538add" data-node-id="870:710" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="870:388">
                    بین‌الملل
                  </p>
                </div>
              </div>
              <div className="fg-3f106e1f96" data-node-id="874:3" data-name="Group-7">
                <DesignAction className="fg-558da3a1d5" data-node-id="874:4" data-name="Group Header" label="گزارش‌ها" destination="reports">
                  <div className="fg-fc08538add" data-node-id="874:5" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="874:7">
                    گزارش‌ها
                  </p>
                </DesignAction>
              </div>
              <div className="fg-3f106e1f96" data-node-id="874:8" data-name="Group-8">
                <DesignAction className="fg-558da3a1d5" data-node-id="874:9" data-name="Group Header" label="تنظیمات" destination="settings">
                  <div className="fg-fc08538add" data-node-id="874:10" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                  <p className="fg-a0d8ce95c4" dir="auto" data-node-id="874:12">
                    تنظیمات
                  </p>
                </DesignAction>
              </div>
            </div>
          </div>
          <div className="fg-2f3d1bdf48" data-node-id="870:389" data-name="Staff Profile">
            <div className="fg-0d2351e917" data-node-id="870:390" data-name="Profile Details">
              <p className="fg-7ec414a4a7" dir="auto" data-node-id="870:391">
                کارشناس عملیات
              </p>
              <p className="fg-80235ae490" dir="auto" data-node-id="870:392">
                مدیر عملیات سیستم
              </p>
            </div>
            <div className="fg-3dfce0fd89" data-node-id="870:393" data-name="Staff Avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
            </div>
          </div>
        </AdminSidebar>
      </div>
    </div>
  );
}
