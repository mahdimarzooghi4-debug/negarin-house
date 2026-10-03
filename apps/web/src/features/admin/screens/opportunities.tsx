// Figma 894:229 — Admin / Opportunities — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOpportunitiesDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:229" data-name="Admin / Opportunities — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:230" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:231" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:232" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:233" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/ca03c512.png" />
            </div>
            <DesignAction className="fg-328252374d" data-node-id="894:234" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="894:235" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-6c36c0b5c6" data-node-id="894:236" data-name="Icon-Wrapper">
                <div className="fg-58d29b27c0" data-node-id="894:978" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/4e203f5d.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:238" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:239" data-name="Global Search" label="جستجو" placeholder="جستجو در فرصت‌ها، سازمان‌ها، کدهای پیگیری و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="894:240">
                جستجو در فرصت‌ها، سازمان‌ها، کدهای پیگیری و ...
              </p>
              <div className="fg-f422037977" data-node-id="894:241" data-name="Icon-Wrapper">
                <div className="fg-c51752dc8c" data-node-id="894:984" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:243">
              فرصت‌های عملیاتی نگارین
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:244" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="894:245" data-name="Operational Summary">
            <DesignAction className="fg-bff106adf2" data-node-id="894:246" data-name="Metric Shortcut" label="۲۹ کل فرصت‌های سیستم" destination="service-requests">
              <p className="fg-347c9bc708" data-node-id="894:247">
                ۲۹
              </p>
              <p className="fg-774c445393" dir="auto" data-node-id="894:248">
                کل فرصت‌های سیستم
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="894:249" data-name="Metric Shortcut" label="۸ در حال تطبیق ظرفیت" destination="service-requests">
              <p className="fg-1fada239a3" data-node-id="894:250">
                ۸
              </p>
              <p className="fg-774c445393" dir="auto" data-node-id="894:251">
                در حال تطبیق ظرفیت
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="894:252" data-name="Metric Shortcut" label="۱۵ فرصت‌های فعال" destination="service-requests">
              <p className="fg-347c9bc708" data-node-id="894:253">
                ۱۵
              </p>
              <p className="fg-774c445393" dir="auto" data-node-id="894:254">
                فرصت‌های فعال
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="894:255" data-name="Metric Shortcut" label="۶ تکمیل و نهایی شده" destination="service-requests">
              <p className="fg-4dbbe7cf6e" data-node-id="894:256">
                ۶
              </p>
              <p className="fg-774c445393" dir="auto" data-node-id="894:257">
                تکمیل و نهایی شده
              </p>
            </DesignAction>
          </div>
          <div className="fg-89c5c241e8" data-node-id="894:258" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="894:259" data-name="Filter Content">
              <div className="fg-9708e8d183" data-node-id="894:260" data-name="Interactive Filter Badges">
                <div className="fg-4688866a31" data-node-id="894:261" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:262">
                    وضعیت فرصت
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:263" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:264">
                    وضعیت تطبیق
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:265" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:266">
                    نوع فرصت
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:267" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:268">
                    نیازمند اقدام
                  </p>
                </div>
              </div>
              <DesignField className="fg-e8210ba625" data-node-id="894:269" data-name="Search Section" label="جستجو" placeholder="شناسه یا نام فرصت...">
                <div className="fg-8fa0f7fc5c" data-node-id="894:270" data-name="Search Input Container">
                  <p className="fg-f68c5e162d" dir="auto" data-node-id="894:271">
                    شناسه یا نام فرصت...
                  </p>
                </div>
              </DesignField>
            </div>
          </div>
          <div className="fg-c7a881f669" data-node-id="894:272" data-name="Worklist Section">
            <p className="fg-5f8b9f0bac" dir="auto" data-node-id="894:273">
              لیست فرصت‌ها
            </p>
            <div className="fg-cb667e7a05" data-node-id="894:274" data-name="Table Wrapper">
              <div className="fg-4fa78505e5" data-node-id="894:275" data-name="Table Header Row">
                <p className="fg-207ea3ad86" dir="auto" data-node-id="894:276">
                  اقدام
                </p>
                <p className="fg-648e3447c7" dir="auto" data-node-id="894:277">
                  نیازمند اقدام
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:278">
                  آخرین بروزرسانی
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:279">
                  وضعیت تخصیص
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:280">
                  وضعیت تطبیق
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:281">
                  وضعیت درخواست‌ها
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="894:282">
                  خریدار/سازمان
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:283">
                  نوع فرصت
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:284">
                  فرصت
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="894:285" data-name="Table Body">
                <div className="fg-4f547a8b42" data-node-id="894:286" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:287" data-name="Col Action" label="بررسی" destination="opportunity-detail">
                    <p className="fg-3493d35690" dir="auto" data-node-id="894:288">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-fd83d7fca4" dir="auto" data-node-id="894:289">
                    بله
                  </p>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="894:290">
                    ۱۰ دقیقه پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:291" data-name="Col Alloc">
                    <div className="fg-e6bf96a33c" data-node-id="894:292" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:293">
                        تخصیص شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="894:294" data-name="Col Match">
                    <div className="fg-f858729e81" data-node-id="894:295" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="894:296">
                        در حال تطبیق
                      </p>
                    </div>
                  </div>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="894:297">
                    ۱۲ درخواست
                  </p>
                  <p className="fg-c8ba0972fa" dir="auto" data-node-id="894:298">
                    بانک ملی ایران
                  </p>
                  <p className="fg-bd7db83059" dir="auto" data-node-id="894:299">
                    تقاضای سازمانی
                  </p>
                  <div className="fg-5fe89510b9" data-node-id="894:300" data-name="Col Opportunity">
                    <p className="fg-d087d713a8" dir="auto" data-node-id="894:301">
                      خرید سالانه صنایع‌دستی بانک ملی
                    </p>
                    <p className="fg-7f846ac2e7" data-node-id="894:302">
                      OPP-1024
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="894:303" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:304" data-name="Col Action" label="مشاهده" destination="opportunity-detail">
                    <p className="fg-3493d35690" dir="auto" data-node-id="894:305">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-6a321d7465" data-node-id="894:306">
                    —
                  </p>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="894:307">
                    ۱ ساعت پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:308" data-name="Col Alloc">
                    <div className="fg-e6bf96a33c" data-node-id="894:309" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:310">
                        تأیید هنرمند
                      </p>
                    </div>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="894:311" data-name="Col Match">
                    <div className="fg-e6bf96a33c" data-node-id="894:312" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:313">
                        تکمیل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="894:314">
                    ۳۵ درخواست
                  </p>
                  <p className="fg-c8ba0972fa" dir="auto" data-node-id="894:315">
                    وزارت میراث فرهنگی
                  </p>
                  <p className="fg-bd7db83059" dir="auto" data-node-id="894:316">
                    برنامه حمایتی
                  </p>
                  <div className="fg-5fe89510b9" data-node-id="894:317" data-name="Col Opportunity">
                    <p className="fg-d087d713a8" dir="auto" data-node-id="894:318">
                      برنامه حمایتی خانه خلاق نگارستان
                    </p>
                    <p className="fg-7f846ac2e7" data-node-id="894:319">
                      OPP-1025
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="894:320" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:321" data-name="Col Action" label="مشاهده" destination="opportunity-detail">
                    <p className="fg-3493d35690" dir="auto" data-node-id="894:322">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-fd83d7fca4" dir="auto" data-node-id="894:323">
                    بله
                  </p>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="894:324">
                    ۳ ساعت پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:325" data-name="Col Alloc">
                    <div className="fg-1c5311eee5" data-node-id="894:326" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="894:327">
                        تخصیص نشده
                      </p>
                    </div>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="894:328" data-name="Col Match">
                    <div className="fg-f858729e81" data-node-id="894:329" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="894:330">
                        در حال تطبیق
                      </p>
                    </div>
                  </div>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="894:331">
                    ۸ درخواست
                  </p>
                  <p className="fg-c8ba0972fa" dir="auto" data-node-id="894:332">
                    شهرداری مشهد
                  </p>
                  <p className="fg-bd7db83059" dir="auto" data-node-id="894:333">
                    تقاضای سازمانی
                  </p>
                  <div className="fg-5fe89510b9" data-node-id="894:334" data-name="Col Opportunity">
                    <p className="fg-d087d713a8" dir="auto" data-node-id="894:335">
                      تجهیز المان‌های شهری شهرداری مشهد
                    </p>
                    <p className="fg-7f846ac2e7" data-node-id="894:336">
                      OPP-1026
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="894:337" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:338" data-name="Col Action" label="مشاهده" destination="opportunity-detail">
                    <p className="fg-3493d35690" dir="auto" data-node-id="894:339">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-6a321d7465" data-node-id="894:340">
                    —
                  </p>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="894:341">
                    ۵ ساعت پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:342" data-name="Col Alloc">
                    <div className="fg-e6bf96a33c" data-node-id="894:343" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:344">
                        تأیید هنرمند
                      </p>
                    </div>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="894:345" data-name="Col Match">
                    <div className="fg-e6bf96a33c" data-node-id="894:346" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:347">
                        تکمیل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="894:348">
                    ۴۲ درخواست
                  </p>
                  <p className="fg-c8ba0972fa" dir="auto" data-node-id="894:349">
                    شرکت فولاد مبارکه
                  </p>
                  <p className="fg-bd7db83059" dir="auto" data-node-id="894:350">
                    تقاضای سازمانی
                  </p>
                  <div className="fg-5fe89510b9" data-node-id="894:351" data-name="Col Opportunity">
                    <p className="fg-d087d713a8" dir="auto" data-node-id="894:352">
                      سفارش هدایای نوروزی فولاد مبارکه
                    </p>
                    <p className="fg-7f846ac2e7" data-node-id="894:353">
                      OPP-1027
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="894:354" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:355" data-name="Col Action" label="مشاهده" destination="opportunity-detail">
                    <p className="fg-3493d35690" dir="auto" data-node-id="894:356">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-fd83d7fca4" dir="auto" data-node-id="894:357">
                    بله
                  </p>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="894:358">
                    ۱ روز پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:359" data-name="Col Alloc">
                    <div className="fg-1c5311eee5" data-node-id="894:360" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="894:361">
                        تخصیص نشده
                      </p>
                    </div>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="894:362" data-name="Col Match">
                    <div className="fg-e5d563b780" data-node-id="894:363" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="894:364">
                        در انتظار
                      </p>
                    </div>
                  </div>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="894:365">
                    ۱۵ درخواست
                  </p>
                  <p className="fg-c8ba0972fa" data-node-id="894:366">
                    —
                  </p>
                  <p className="fg-bd7db83059" dir="auto" data-node-id="894:367">
                    ابتکار نگارین
                  </p>
                  <div className="fg-5fe89510b9" data-node-id="894:368" data-name="Col Opportunity">
                    <p className="fg-d087d713a8" dir="auto" data-node-id="894:369">
                      ابتکار نگارین برای هنرمندان جوان سفالگر
                    </p>
                    <p className="fg-7f846ac2e7" data-node-id="894:370">
                      OPP-1028
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="894:371" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:372" data-name="Col Action" label="مشاهده" destination="opportunity-detail">
                    <p className="fg-3493d35690" dir="auto" data-node-id="894:373">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-6a321d7465" data-node-id="894:374">
                    —
                  </p>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="894:375">
                    ۲ روز پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:376" data-name="Col Alloc">
                    <div className="fg-1c5311eee5" data-node-id="894:377" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="894:378">
                        تخصیص نشده
                      </p>
                    </div>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="894:379" data-name="Col Match">
                    <div className="fg-e5d563b780" data-node-id="894:380" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="894:381">
                        در انتظار
                      </p>
                    </div>
                  </div>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="894:382">
                    ۶ درخواست
                  </p>
                  <p className="fg-c8ba0972fa" dir="auto" data-node-id="894:383">
                    اداره کل هنرهای تجسمی
                  </p>
                  <p className="fg-bd7db83059" dir="auto" data-node-id="894:384">
                    تقاضای سازمانی
                  </p>
                  <div className="fg-5fe89510b9" data-node-id="894:385" data-name="Col Opportunity">
                    <p className="fg-d087d713a8" dir="auto" data-node-id="894:386">
                      تامین اقلام موزه هنرهای معاصر
                    </p>
                    <p className="fg-7f846ac2e7" data-node-id="894:387">
                      OPP-1029
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="894:388" data-name="Table Row">
                  <DesignAction className="fg-7b391c49f6" data-node-id="894:389" data-name="Col Action" label="مشاهده" destination="opportunity-detail">
                    <p className="fg-3493d35690" dir="auto" data-node-id="894:390">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-fd83d7fca4" dir="auto" data-node-id="894:391">
                    بله
                  </p>
                  <p className="fg-8eb7a5104d" dir="auto" data-node-id="894:392">
                    ۳ روز پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:393" data-name="Col Alloc">
                    <div className="fg-e6bf96a33c" data-node-id="894:394" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:395">
                        تخصیص شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="894:396" data-name="Col Match">
                    <div className="fg-f858729e81" data-node-id="894:397" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="894:398">
                        در حال تطبیق
                      </p>
                    </div>
                  </div>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="894:399">
                    ۱۹ درخواست
                  </p>
                  <p className="fg-c8ba0972fa" dir="auto" data-node-id="894:400">
                    بخش فرهنگی سفارت ژاپن
                  </p>
                  <p className="fg-bd7db83059" dir="auto" data-node-id="894:401">
                    برنامه حمایتی
                  </p>
                  <div className="fg-5fe89510b9" data-node-id="894:402" data-name="Col Opportunity">
                    <p className="fg-d087d713a8" dir="auto" data-node-id="894:403">
                      فراخوان بین‌المللی صنایع‌دستی توکیو
                    </p>
                    <p className="fg-7f846ac2e7" data-node-id="894:404">
                      OPP-1030
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-c87bdb284a" data-node-id="894:405" data-name="Pagination">
                <div className="fg-92b7da7864" data-node-id="894:406" data-name="Pagination Buttons">
                  <DesignAction className="fg-480aeaca9c" data-node-id="894:407" data-name="Prev Button" label="قبلی">
                    <p className="fg-934ca87244" dir="auto" data-node-id="894:408">
                      قبلی
                    </p>
                  </DesignAction>
                  <div className="fg-f2c3587a20" data-node-id="894:409" data-name="Page Pill Active">
                    <p className="fg-05ebd28202" data-node-id="894:410">
                      ۱
                    </p>
                  </div>
                  <div className="fg-fef640a389" data-node-id="894:411" data-name="Page Pill Default">
                    <p className="fg-899c8bd72f" data-node-id="894:412">
                      ۲
                    </p>
                  </div>
                  <DesignAction className="fg-480aeaca9c" data-node-id="894:413" data-name="Next Button" label="بعدی">
                    <p className="fg-934ca87244" dir="auto" data-node-id="894:414">
                      بعدی
                    </p>
                  </DesignAction>
                </div>
                <p className="fg-899c8bd72f" dir="auto" data-node-id="894:415">
                  نمایش ۱ تا ۷ از ۲۹ فرصت فعال
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:416" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:417" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:418">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="894:419" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:246" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="894:421" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:422" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-f422037977" data-node-id="894:423" data-name="Icon-Wrapper">
              <div className="fg-c51752dc8c" data-node-id="894:981" data-name="Android / Mobile Signal">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:425">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:426" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:427" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:428" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-4f7067505a" data-node-id="894:429" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:987" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:431">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:432" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:433" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-4f7067505a" data-node-id="894:434" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:990" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:436">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:437" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:438" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-4f7067505a" data-node-id="894:439" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:993" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:441">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:442" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:443" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-4f7067505a" data-node-id="894:444" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:996" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:446">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:447" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:448" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-4f7067505a" data-node-id="894:449" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:999" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:451">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:452" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:453" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-4f7067505a" data-node-id="894:454" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1002" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:456">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:457" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:458" data-name="Group Header">
                <div className="fg-4f7067505a" data-node-id="894:459" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1005" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:461">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:462" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:463" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-4f7067505a" data-node-id="894:464" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1008" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:466">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:467" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:468" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-4f7067505a" data-node-id="894:469" data-name="Icon-Wrapper">
                  <div className="fg-fc08538add" data-node-id="894:1011" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:471">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="894:472" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:473" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="894:474">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:475">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="894:476" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/6bdcedb0.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
