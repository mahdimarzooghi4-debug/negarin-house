// Figma 894:5150 — Admin / Memberships — Desktop
import { DesignAction, DesignField, DesignChoice } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminMembershipsDesktop() {
  return (
    <div className="fg-596cc44889" data-node-id="894:5150" data-name="Admin / Memberships — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:5151" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:5152" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:5153" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:5154" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:5155" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/e6770525.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:5159" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:5160" data-name="Global Search" label="جستجو" placeholder="جستجو با نام هنرمند یا کد ART-XXXX">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:5161">
                جستجو با نام هنرمند یا کد ART-XXXX
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:5162" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/b8907765.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:5164">
              مدیریت عضویت‌های سالانه
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:5165" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="894:5166" data-name="Operational Summary">
            <DesignAction className="fg-8f5afdb4b9" data-node-id="894:5167" data-name="Metric Shortcut" label="۴۱۲ مورد کل عضویت‌های فعال و سالانه" destination="service-requests">
              <p className="fg-59433049b5" dir="auto" data-node-id="894:5168">
                ۴۱۲ مورد
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:5169">
                کل عضویت‌های فعال و سالانه
              </p>
            </DesignAction>
            <DesignAction className="fg-8f5afdb4b9" data-node-id="894:5170" data-name="Metric Shortcut" label="۳۸۴ مورد عضویت‌های کاملاً فعال" destination="service-requests">
              <p className="fg-95a72ad62b" dir="auto" data-node-id="894:5171">
                ۳۸۴ مورد
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:5172">
                عضویت‌های کاملاً فعال
              </p>
            </DesignAction>
            <DesignAction className="fg-8f5afdb4b9" data-node-id="894:5173" data-name="Metric Shortcut" label="۲۲ مورد در انتظار تمدید سالانه" destination="service-requests">
              <p className="fg-c4c7e937ce" dir="auto" data-node-id="894:5174">
                ۲۲ مورد
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:5175">
                در انتظار تمدید سالانه
              </p>
            </DesignAction>
            <DesignAction className="fg-8f5afdb4b9" data-node-id="894:5176" data-name="Metric Shortcut" label="۶ مورد عضویت‌های منقضی‌شده" destination="service-requests">
              <p className="fg-1733ae3e8a" dir="auto" data-node-id="894:5177">
                ۶ مورد
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:5178">
                عضویت‌های منقضی‌شده
              </p>
            </DesignAction>
          </div>
          <div className="fg-15cc2626be" data-node-id="894:5179" data-name="Filters Box">
            <div className="fg-c805d7e9ed" data-node-id="894:5180" data-name="Filter Content">
              <div className="fg-34d33d0078" data-node-id="894:5181" data-name="Action Area">
                <DesignAction className="fg-e54722c263" data-node-id="894:5182" data-name="Action Button" label="اعمال فیلترها">
                  <p className="fg-8ffc872800" dir="auto" data-node-id="894:5183">
                    اعمال فیلترها
                  </p>
                </DesignAction>
              </div>
              <div className="fg-9708e8d183" data-node-id="894:5184" data-name="Interactive Filter Badges">
                <DesignChoice className="fg-a3b2a587b5" data-node-id="894:5185" data-name="Filter Option 1" label="وضعیت عضویت: همه" group="Interactive Filter Badges" initial={false}>
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:5186">
                    وضعیت عضویت: همه
                  </p>
                </DesignChoice>
                <DesignChoice className="fg-a3b2a587b5" data-node-id="894:5187" data-name="Filter Option 2" label="نیاز به اقدام" group="Interactive Filter Badges" initial={false}>
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:5188">
                    نیاز به اقدام
                  </p>
                </DesignChoice>
                <DesignChoice className="fg-20172b4a41" data-node-id="894:5189" data-name="Filter Option 3" label="دوره سالانه ۱۴۰۳" group="Interactive Filter Badges" initial={false}>
                  <p className="fg-5419541f68" dir="auto" data-node-id="894:5190">
                    دوره سالانه ۱۴۰۳
                  </p>
                </DesignChoice>
              </div>
            </div>
          </div>
          <div className="fg-c7a881f669" data-node-id="894:5191" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="894:5192">
              لیست عضویت‌های ثبت‌شده هنرمندان
            </p>
            <div className="fg-ceebe80a1f" data-node-id="894:5193" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="894:5194" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="894:5195">
                  اقدام
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:5196">
                  تمدید مجدد
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:5197">
                  ارتقای میان‌دوره
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="894:5198">
                  سهمیه خدمات (مصرف/کل)
                </p>
                <p className="fg-c7dd25f208" dir="auto" data-node-id="894:5199">
                  دوره عضویت (یک‌ساله)
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:5200">
                  وضعیت
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:5201">
                  هنرمند
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="894:5202" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="894:5203" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5204" data-name="Col Action" label="مشاهده" destination="membership-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:5205">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" dir="auto" data-node-id="894:5206">
                    تمدید خودکار
                  </p>
                  <p className="fg-8fda5c5742" data-node-id="894:5207">
                    —
                  </p>
                  <p className="fg-b17afba5fd" dir="auto" data-node-id="894:5208">
                    ۴ از ۱۰ سهمیه
                  </p>
                  <p className="fg-787899ac2a" data-node-id="894:5209">
                    ۱۴۰۳/۰۱/۰۱ — ۱۴۰۳/۱۲/۲۹
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5210" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="894:5211" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:5212">
                        فعال
                      </p>
                    </div>
                  </div>
                  <div className="fg-5dabfd850c" data-node-id="894:5213" data-name="Col Artist">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:5214">
                      نگار حسینی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:5215">
                      ART-1092
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:5216" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5217" data-name="Col Action" label="مشاهده" destination="membership-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:5218">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-2b8dcdc694" dir="auto" data-node-id="894:5219">
                    نیاز به اقدام
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:5220">
                    در حال بررسی
                  </p>
                  <p className="fg-3a43d573f5" dir="auto" data-node-id="894:5221">
                    ۹ از ۱۰ سهمیه
                  </p>
                  <p className="fg-787899ac2a" data-node-id="894:5222">
                    ۱۴۰۲/۰۲/۱۵ — ۱۴۰۳/۰۲/۱۴
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5223" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="894:5224" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:5225">
                        در انتظار تمدید
                      </p>
                    </div>
                  </div>
                  <div className="fg-5dabfd850c" data-node-id="894:5226" data-name="Col Artist">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:5227">
                      سهراب سپهری
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:5228">
                      ART-3044
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:5229" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5230" data-name="Col Action" label="مشاهده" destination="membership-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:5231">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="894:5232">
                    —
                  </p>
                  <p className="fg-8fda5c5742" data-node-id="894:5233">
                    —
                  </p>
                  <p className="fg-b7c4a50b96" dir="auto" data-node-id="894:5234">
                    ۱۰ از ۱۰ (پایان)
                  </p>
                  <p className="fg-787899ac2a" data-node-id="894:5235">
                    ۱۴۰۱/۱۱/۰۱ — ۱۴۰۲/۱۰/۳۰
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5236" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="894:5237" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="894:5238">
                        منقضی‌شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-5dabfd850c" data-node-id="894:5239" data-name="Col Artist">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:5240">
                      سارا جلیلی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:5241">
                      ART-1042
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:5242" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5243" data-name="Col Action" label="مشاهده" destination="membership-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:5244">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" dir="auto" data-node-id="894:5245">
                    تمدید خودکار
                  </p>
                  <p className="fg-2b8dcdc694" dir="auto" data-node-id="894:5246">
                    در حال بررسی
                  </p>
                  <p className="fg-b17afba5fd" dir="auto" data-node-id="894:5247">
                    ۲ از ۶ سهمیه
                  </p>
                  <p className="fg-787899ac2a" data-node-id="894:5248">
                    ۱۴۰۳/۰۲/۰۱ — ۱۴۰۴/۰۱/۳۱
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5249" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="894:5250" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:5251">
                        فعال
                      </p>
                    </div>
                  </div>
                  <div className="fg-5dabfd850c" data-node-id="894:5252" data-name="Col Artist">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:5253">
                      امیر عباسی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:5254">
                      ART-2015
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:5255" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5256" data-name="Col Action" label="مشاهده" destination="membership-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:5257">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-4238471968" dir="auto" data-node-id="894:5258">
                    تمدید خودکار
                  </p>
                  <p className="fg-8fda5c5742" dir="auto" data-node-id="894:5259">
                    تکمیل‌شده
                  </p>
                  <p className="fg-b17afba5fd" dir="auto" data-node-id="894:5260">
                    ۸ از ۱۲ سهمیه
                  </p>
                  <p className="fg-787899ac2a" data-node-id="894:5261">
                    ۱۴۰۳/۰۳/۱۰ — ۱۴۰۴/۰۳/۰۹
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5262" data-name="Col Status">
                    <div className="fg-489a397814" data-node-id="894:5263" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:5264">
                        فعال
                      </p>
                    </div>
                  </div>
                  <div className="fg-5dabfd850c" data-node-id="894:5265" data-name="Col Artist">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:5266">
                      سیمین دانشور
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:5267">
                      ART-4412
                    </p>
                  </div>
                </div>
                <div className="fg-836f598d9f" data-node-id="894:5268" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5269" data-name="Col Action" label="مشاهده" destination="membership-detail">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:5270">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-8fda5c5742" data-node-id="894:5271">
                    —
                  </p>
                  <p className="fg-8fda5c5742" data-node-id="894:5272">
                    —
                  </p>
                  <p className="fg-b7c4a50b96" dir="auto" data-node-id="894:5273">
                    ۱ از ۵ سهمیه
                  </p>
                  <p className="fg-787899ac2a" data-node-id="894:5274">
                    ۱۴۰۲/۰۱/۰۱ — ۱۴۰۲/۱۲/۲۹
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5275" data-name="Col Status">
                    <div className="fg-bc154bd16e" data-node-id="894:5276" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="894:5277">
                        منقضی‌شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-5dabfd850c" data-node-id="894:5278" data-name="Col Artist">
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:5279">
                      بابک راد
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:5280">
                      ART-9013
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:5281" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:5282" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:5283">
            خانه نگارین
          </p>
          <div className="fg-7d8647fa8b" data-node-id="894:5284" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:262" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:5286" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:5287" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:5288" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/a4cc0b99.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:5289">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-1df709db2b" data-node-id="894:5290" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:5291" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5292" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:5293" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5295">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:5296" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:5297" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:5298" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5300">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5301" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5302" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:5303" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5305">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5306" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5307" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:5308" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5310">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5311" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5312" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:5313" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5315">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5316" data-name="Group-5">
              <DesignAction className="fg-9dda82322e" data-node-id="894:5317" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:5318" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-6c6e16a8e2" dir="auto" data-node-id="894:5320">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5321" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:5322" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:5323" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5325">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5326" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5327" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:5328" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5330">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5331" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:5332" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:5333" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-551bd5dcb4" dir="auto" data-node-id="894:5335">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:5336" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:5337" data-name="Profile Details">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="894:5338">
              کارشناس عضویت
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:5339">
              مدیریت اعضا و سهمیه‌ها
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:5340" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
