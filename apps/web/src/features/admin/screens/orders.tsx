// Figma 888:206 — Admin / Orders — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOrdersDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="888:206" data-name="Admin / Orders — Desktop">
      <div className="fg-708b484433" data-node-id="888:207" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="888:208" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="888:209" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="888:210" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="888:211" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/aeb1c8f6.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="888:215" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="888:216" data-name="Global Search" label="جستجو" placeholder="جستجو در سفارش‌ها، خریداران، هنرمندان و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="888:217">
                جستجو در سفارش‌ها، خریداران، هنرمندان و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="888:218" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="888:220">
              مدیریت سفارش‌های نگارین
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="888:221" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="888:222" data-name="Operational Summary">
            <DesignAction className="fg-bff106adf2" data-node-id="888:223" data-name="Metric Shortcut" label="۱ مورد نیازمند رسیدگی" destination="service-requests">
              <p className="fg-73ab430732" dir="auto" data-node-id="888:224">
                ۱ مورد
              </p>
              <p className="fg-774c445393" dir="auto" data-node-id="888:225">
                نیازمند رسیدگی
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="888:226" data-name="Metric Shortcut" label="۲۴ سفارش ارسال شده" destination="orders-needs-action">
              <p className="fg-4dbbe7cf6e" dir="auto" data-node-id="888:227">
                ۲۴ سفارش
              </p>
              <p className="fg-774c445393" dir="auto" data-node-id="888:228">
                ارسال شده
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="888:229" data-name="Metric Shortcut" label="۱۲ سفارش در حال انجام" destination="orders-needs-action">
              <p className="fg-1fada239a3" dir="auto" data-node-id="888:230">
                ۱۲ سفارش
              </p>
              <p className="fg-774c445393" dir="auto" data-node-id="888:231">
                در حال انجام
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="888:232" data-name="Metric Shortcut" label="۱۴۸ سفارش کل سفارش‌های امروز" destination="orders-needs-action">
              <p className="fg-6edbc50726" dir="auto" data-node-id="888:233">
                ۱۴۸ سفارش
              </p>
              <p className="fg-774c445393" dir="auto" data-node-id="888:234">
                کل سفارش‌های امروز
              </p>
            </DesignAction>
          </div>
          <div className="fg-89c5c241e8" data-node-id="888:235" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="888:236" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="888:237" data-name="Frame">
                <div className="fg-a3b2a587b5" data-node-id="888:238" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:239">
                    بازه زمانی
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:240" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:241">
                    وضعیت مشکل
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:242" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:243">
                    وضعیت ارسال
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:244" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:245">
                    وضعیت سفارش
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="888:246" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="888:247">
                    هنرمند
                  </p>
                </div>
              </div>
              <div className="fg-e8210ba625" data-node-id="888:248" data-name="Frame">
                <DesignField className="fg-8fa0f7fc5c" data-node-id="888:249" data-name="Search Input" label="جستجو" placeholder="جستجو در سفارش‌ها...">
                  <p className="fg-f68c5e162d" dir="auto" data-node-id="888:250">
                    جستجو در سفارش‌ها...
                  </p>
                </DesignField>
              </div>
            </div>
          </div>
          <div className="fg-c7a881f669" data-node-id="888:251" data-name="Worklist Section">
            <p className="fg-5f8b9f0bac" dir="auto" data-node-id="888:252">
              لیست سفارش‌های اخیر
            </p>
            <div className="fg-048dc4f7ae" data-node-id="888:253" data-name="Table Wrapper">
              <div className="fg-5a60ba4653" data-node-id="888:254" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="888:255">
                  اقدام
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:256">
                  آخرین بروزرسانی
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="888:257">
                  وضعیت مشکل
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="888:258">
                  وضعیت ارسال
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="888:259">
                  وضعیت انجام
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="888:260">
                  هنرمند
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="888:261">
                  خریدار
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="888:262">
                  سفارش
                </p>
              </div>
              <div className="fg-e16ac02b64" data-node-id="888:263" data-name="Table Body">
                <div className="fg-4f547a8b42" data-node-id="888:264" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:265" data-name="Col Action" label="مشاهده" destination="order-detail">
                    <p className="fg-daa786dbb1" dir="auto" data-node-id="888:266">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:267">
                    ۱۰ دقیقه پیش
                  </p>
                  <div className="fg-7aeb751870" data-node-id="888:268" data-name="Col Issue">
                    <p className="fg-7ac86579a7" data-node-id="888:269">
                      —
                    </p>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="888:270" data-name="Col Ship">
                    <div className="fg-e5d563b780" data-node-id="888:271" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="888:272">
                        در انتظار
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="888:273" data-name="Col Fulfill">
                    <div className="fg-f858729e81" data-node-id="888:274" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="888:275">
                        سفارش جدید
                      </p>
                    </div>
                  </div>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="888:276">
                    زهرا کریمی
                  </p>
                  <p className="fg-9bdf394443" dir="auto" data-node-id="888:277">
                    حمید رضا رضایی
                  </p>
                  <div className="fg-7c219a7f79" data-node-id="888:278" data-name="Col ID">
                    <p className="fg-934ca87244" data-node-id="888:279">
                      ORD-1024
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="888:280" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:281" data-name="Col Action" label="مشاهده" destination="order-detail">
                    <p className="fg-daa786dbb1" dir="auto" data-node-id="888:282">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:283">
                    ۱ ساعت پیش
                  </p>
                  <div className="fg-7aeb751870" data-node-id="888:284" data-name="Col Issue">
                    <p className="fg-7ac86579a7" data-node-id="888:285">
                      —
                    </p>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="888:286" data-name="Col Ship">
                    <div className="fg-e5d563b780" data-node-id="888:287" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="888:288">
                        در انتظار
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="888:289" data-name="Col Fulfill">
                    <div className="fg-f858729e81" data-node-id="888:290" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="888:291">
                        در حال آماده‌سازی
                      </p>
                    </div>
                  </div>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="888:292">
                    علی علوی
                  </p>
                  <p className="fg-9bdf394443" dir="auto" data-node-id="888:293">
                    سارا احمدی
                  </p>
                  <div className="fg-7c219a7f79" data-node-id="888:294" data-name="Col ID">
                    <p className="fg-934ca87244" data-node-id="888:295">
                      ORD-1025
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="888:296" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:297" data-name="Col Action" label="مشاهده" destination="order-detail">
                    <p className="fg-daa786dbb1" dir="auto" data-node-id="888:298">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:299">
                    ۳ ساعت پیش
                  </p>
                  <div className="fg-7aeb751870" data-node-id="888:300" data-name="Col Issue">
                    <div className="fg-f5a735ebf8" data-node-id="888:301" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="888:302">
                        خطای آدرس خریدار
                      </p>
                    </div>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="888:303" data-name="Col Ship">
                    <div className="fg-e5d563b780" data-node-id="888:304" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="888:305">
                        آماده ارسال
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="888:306" data-name="Col Fulfill">
                    <div className="fg-f858729e81" data-node-id="888:307" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="888:308">
                        بسته‌بندی
                      </p>
                    </div>
                  </div>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="888:309">
                    مریم حسینی
                  </p>
                  <p className="fg-9bdf394443" dir="auto" data-node-id="888:310">
                    محمد محسنی
                  </p>
                  <div className="fg-7c219a7f79" data-node-id="888:311" data-name="Col ID">
                    <p className="fg-934ca87244" data-node-id="888:312">
                      ORD-1026
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="888:313" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:314" data-name="Col Action" label="مشاهده" destination="order-detail">
                    <p className="fg-daa786dbb1" dir="auto" data-node-id="888:315">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:316">
                    ۵ ساعت پیش
                  </p>
                  <div className="fg-7aeb751870" data-node-id="888:317" data-name="Col Issue">
                    <p className="fg-7ac86579a7" data-node-id="888:318">
                      —
                    </p>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="888:319" data-name="Col Ship">
                    <div className="fg-f858729e81" data-node-id="888:320" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="888:321">
                        در حال ارسال
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="888:322" data-name="Col Fulfill">
                    <div className="fg-e6bf96a33c" data-node-id="888:323" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="888:324">
                        ارسال شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="888:325">
                    رضا رضایی
                  </p>
                  <p className="fg-9bdf394443" dir="auto" data-node-id="888:326">
                    نیلوفر عباسی
                  </p>
                  <div className="fg-7c219a7f79" data-node-id="888:327" data-name="Col ID">
                    <p className="fg-934ca87244" data-node-id="888:328">
                      ORD-1027
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="888:329" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:330" data-name="Col Action" label="مشاهده" destination="order-detail">
                    <p className="fg-daa786dbb1" dir="auto" data-node-id="888:331">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:332">
                    ۱ روز پیش
                  </p>
                  <div className="fg-7aeb751870" data-node-id="888:333" data-name="Col Issue">
                    <p className="fg-7ac86579a7" data-node-id="888:334">
                      —
                    </p>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="888:335" data-name="Col Ship">
                    <div className="fg-e6bf96a33c" data-node-id="888:336" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="888:337">
                        تحویل شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="888:338" data-name="Col Fulfill">
                    <div className="fg-e6bf96a33c" data-node-id="888:339" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="888:340">
                        تحویل داده شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="888:341">
                    فاطمه معتمد
                  </p>
                  <p className="fg-9bdf394443" dir="auto" data-node-id="888:342">
                    آرش رحیمی
                  </p>
                  <div className="fg-7c219a7f79" data-node-id="888:343" data-name="Col ID">
                    <p className="fg-934ca87244" data-node-id="888:344">
                      ORD-1028
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="888:345" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:346" data-name="Col Action" label="مشاهده" destination="order-detail">
                    <p className="fg-daa786dbb1" dir="auto" data-node-id="888:347">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:348">
                    ۲ روز پیش
                  </p>
                  <div className="fg-7aeb751870" data-node-id="888:349" data-name="Col Issue">
                    <p className="fg-7ac86579a7" data-node-id="888:350">
                      —
                    </p>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="888:351" data-name="Col Ship">
                    <div className="fg-e6bf96a33c" data-node-id="888:352" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="888:353">
                        تحویل شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="888:354" data-name="Col Fulfill">
                    <div className="fg-e6bf96a33c" data-node-id="888:355" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="888:356">
                        تکمیل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="888:357">
                    حسین موسوی
                  </p>
                  <p className="fg-9bdf394443" dir="auto" data-node-id="888:358">
                    نسرین مقصودی
                  </p>
                  <div className="fg-7c219a7f79" data-node-id="888:359" data-name="Col ID">
                    <p className="fg-934ca87244" data-node-id="888:360">
                      ORD-1029
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="888:361" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:362" data-name="Col Action" label="مشاهده" destination="order-detail">
                    <p className="fg-daa786dbb1" dir="auto" data-node-id="888:363">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:364">
                    ۲ روز پیش
                  </p>
                  <div className="fg-7aeb751870" data-node-id="888:365" data-name="Col Issue">
                    <p className="fg-7ac86579a7" data-node-id="888:366">
                      —
                    </p>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="888:367" data-name="Col Ship">
                    <div className="fg-e5d563b780" data-node-id="888:368" data-name="Badge">
                      <p className="fg-1636b45c60" dir="auto" data-node-id="888:369">
                        در انتظار
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="888:370" data-name="Col Fulfill">
                    <div className="fg-f858729e81" data-node-id="888:371" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="888:372">
                        سفارش جدید
                      </p>
                    </div>
                  </div>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="888:373">
                    سارا محمدی
                  </p>
                  <p className="fg-9bdf394443" dir="auto" data-node-id="888:374">
                    امیر تهرانی
                  </p>
                  <div className="fg-7c219a7f79" data-node-id="888:375" data-name="Col ID">
                    <p className="fg-934ca87244" data-node-id="888:376">
                      ORD-1030
                    </p>
                  </div>
                </div>
                <div className="fg-4f547a8b42" data-node-id="888:377" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="888:378" data-name="Col Action" label="مشاهده" destination="order-detail">
                    <p className="fg-daa786dbb1" dir="auto" data-node-id="888:379">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-411821570a" dir="auto" data-node-id="888:380">
                    ۳ روز پیش
                  </p>
                  <div className="fg-7aeb751870" data-node-id="888:381" data-name="Col Issue">
                    <p className="fg-7ac86579a7" data-node-id="888:382">
                      —
                    </p>
                  </div>
                  <div className="fg-d3a9b73303" data-node-id="888:383" data-name="Col Ship">
                    <div className="fg-e6bf96a33c" data-node-id="888:384" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="888:385">
                        تحویل شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="888:386" data-name="Col Fulfill">
                    <div className="fg-e6bf96a33c" data-node-id="888:387" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="888:388">
                        تکمیل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="888:389">
                    بابک راد
                  </p>
                  <p className="fg-9bdf394443" dir="auto" data-node-id="888:390">
                    لیلا صالحی
                  </p>
                  <div className="fg-7c219a7f79" data-node-id="888:391" data-name="Col ID">
                    <p className="fg-934ca87244" data-node-id="888:392">
                      ORD-1031
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-c87bdb284a" data-node-id="888:393" data-name="Pagination">
                <div className="fg-92b7da7864" data-node-id="888:394" data-name="Frame">
                  <div className="fg-480aeaca9c" data-node-id="888:395" data-name="Frame">
                    <p className="fg-934ca87244" dir="auto" data-node-id="888:396">
                      قبلی
                    </p>
                  </div>
                  <div className="fg-f2c3587a20" data-node-id="888:397" data-name="Frame">
                    <p className="fg-05ebd28202" data-node-id="888:398">
                      ۱
                    </p>
                  </div>
                  <div className="fg-fef640a389" data-node-id="888:399" data-name="Frame">
                    <p className="fg-899c8bd72f" data-node-id="888:400">
                      ۲
                    </p>
                  </div>
                  <div className="fg-480aeaca9c" data-node-id="888:401" data-name="Frame">
                    <p className="fg-934ca87244" dir="auto" data-node-id="888:402">
                      بعدی
                    </p>
                  </div>
                </div>
                <p className="fg-899c8bd72f" dir="auto" data-node-id="888:403">
                  نمایش ۱ تا ۸ از ۸۴ سفارش
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-b14d76332e" data-node-id="888:404" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="888:405" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="888:406">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="888:407" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="888:408" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="888:409" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="888:410" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="888:891" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="888:412">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="888:413" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="888:414" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="888:415" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="888:416" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:418">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="888:419" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="888:420" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="888:421" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:423">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:424" data-name="Group-2">
              <DesignAction className="fg-fcc641ace6" data-node-id="888:425" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="888:426" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="888:428">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:429" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="888:430" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="888:431" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:433">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:434" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="888:435" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="888:436" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:438">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:439" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="888:440" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="888:441" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:443">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:444" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="888:445" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="888:446" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:448">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:449" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="888:450" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="888:451" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:453">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="888:454" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="888:455" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="888:456" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="888:458">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="888:459" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="888:460" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="888:461">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="888:462">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="888:463" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
