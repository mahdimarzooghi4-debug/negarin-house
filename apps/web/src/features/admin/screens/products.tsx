// Figma 887:206 — Admin / Products — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminProductsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="887:206" data-name="Admin / Products — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="887:268" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="887:269" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="887:270" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="887:271" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/fe858e88.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="887:272" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="887:273" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-ccdeeb4977" data-node-id="887:274" data-name="bell">
                <div className="fg-5cca20e57d" data-node-id="887:1038" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f3d2a5e4.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="887:276" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="887:277" data-name="Global Search" label="جستجو" placeholder="جستجو در محصولات...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="887:278">
                جستجو در محصولات...
              </p>
              <div className="fg-c5bca379c9" data-node-id="887:279" data-name="search">
                <div className="fg-8a0ff48924" data-node-id="887:1041" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c8382a4.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="887:281">
              مدیریت محصولات نگارین
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="887:282" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="887:283" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="887:284" data-name="Metric Shortcut" label="۸۴ کل محصولات ثبت‌شده" destination="service-requests">
              <p className="fg-f4472f86ce" data-node-id="887:285">
                ۸۴
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="887:286">
                کل محصولات ثبت‌شده
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="887:287" data-name="Metric Shortcut" label="۱۶ در انتظار بررسی کیفی" destination="product-review-queue">
              <p className="fg-c9547361f2" data-node-id="887:288">
                ۱۶
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="887:289">
                در انتظار بررسی کیفی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="887:290" data-name="Metric Shortcut" label="۴ رد شده/نیازمند اصلاح" destination="service-requests">
              <p className="fg-73ab430732" data-node-id="887:291">
                ۴
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="887:292">
                رد شده/نیازمند اصلاح
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="887:293" data-name="Metric Shortcut" label="۶۴ محصولات فعال در ویترین" destination="service-requests">
              <p className="fg-5061c0f8a0" data-node-id="887:294">
                ۶۴
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="887:295">
                محصولات فعال در ویترین
              </p>
            </DesignAction>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="887:296" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="887:297" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="887:298" data-name="Frame">
                <div className="fg-a3b2a587b5" data-node-id="887:299" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="887:300">
                    وضعیت بررسی
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="887:301" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="887:302">
                    وضعیت انتشار
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="887:303" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="887:304">
                    وضعیت موجودی
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="887:305" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="887:306">
                    دسته‌بندی
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="887:307" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="887:308">
                    هنرمند
                  </p>
                </div>
                <div className="fg-89553f2c19" data-node-id="887:309" data-name="Filter">
                  <p className="fg-e7934d44e5" dir="auto" data-node-id="887:310">
                    نیازمند اقدام
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="887:311" data-name="Filter">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="887:312">
                    بازه زمانی
                  </p>
                </div>
              </div>
              <div className="fg-e8210ba625" data-node-id="887:313" data-name="Frame">
                <DesignField className="fg-8c27ae93a2" data-node-id="887:314" data-name="Search Input" label="جستجو" placeholder="جستجو در محصولات...">
                  <p className="fg-72b13cff4d" dir="auto" data-node-id="887:315">
                    جستجو در محصولات...
                  </p>
                </DesignField>
              </div>
            </div>
          </div>
          <div className="fg-b451d8dfb6" data-node-id="887:316" data-name="Table Card">
            <div className="fg-6c8ad47165" data-node-id="887:317" data-name="Table Header Row">
              <p className="fg-207ea3ad86" dir="auto" data-node-id="887:318">
                اقدام
              </p>
              <p className="fg-33074dfcf6" dir="auto" data-node-id="887:319">
                نیازمند اقدام
              </p>
              <p className="fg-8d481b53ec" dir="auto" data-node-id="887:320">
                آخرین بروزرسانی
              </p>
              <p className="fg-44d10f1b20" dir="auto" data-node-id="887:321">
                وضعیت موجودی
              </p>
              <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="887:322">
                وضعیت بررسی
              </p>
              <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="887:323">
                وضعیت انتشار
              </p>
              <p className="fg-44d10f1b20" dir="auto" data-node-id="887:324">
                دسته‌بندی
              </p>
              <p className="fg-c30e166dd2" dir="auto" data-node-id="887:325">
                هنرمند
              </p>
              <p className="fg-5fa1cff2ec" dir="auto" data-node-id="887:326">
                محصول
              </p>
            </div>
            <div className="fg-e16ac02b64" data-node-id="887:327" data-name="Table Body">
              <div className="fg-16297fd7ca" data-node-id="887:328" data-name="Table Row">
                <DesignAction className="fg-7b391c49f6" data-node-id="887:329" data-name="Col Action" label="مشاهده" destination="product-detail">
                  <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:330">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-7d7fa0b1a1" data-node-id="887:331" data-name="Col Action Required">
                  <div className="fg-bc154bd16e" data-node-id="887:332" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="887:333">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-4238471968" dir="auto" data-node-id="887:334">
                  ۱ روز پیش
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:335">
                  موجود
                </p>
                <div className="fg-82303a202c" data-node-id="887:336" data-name="Col Check">
                  <div className="fg-489a397814" data-node-id="887:337" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:338">
                      تأیید شده
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="887:339" data-name="Col Publish">
                  <div className="fg-489a397814" data-node-id="887:340" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:341">
                      منتشر شده
                    </p>
                  </div>
                </div>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:342">
                  سفال
                </p>
                <div className="fg-3f29947b02" data-node-id="887:343" data-name="Col Artist">
                  <p className="fg-379a645d7e" dir="auto" data-node-id="887:344">
                    زهرا کریمی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:345">
                    ART-1092
                  </p>
                </div>
                <div className="fg-8d22ca4f90" data-node-id="887:346" data-name="Col Product">
                  <p className="fg-e519183ae3" dir="auto" data-node-id="887:347">
                    گلدان سفالی میناکاری طرح اسلیمی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:348">
                    PRD-1024
                  </p>
                </div>
              </div>
              <div className="fg-16297fd7ca" data-node-id="887:349" data-name="Table Row">
                <DesignAction className="fg-7b391c49f6" data-node-id="887:350" data-name="Col Action" label="مشاهده" destination="product-detail">
                  <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:351">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-7d7fa0b1a1" data-node-id="887:352" data-name="Col Action Required">
                  <div className="fg-8c9afb9183" data-node-id="887:353" data-name="Frame">
                    <p className="fg-de972ba962" dir="auto" data-node-id="887:354">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-4238471968" dir="auto" data-node-id="887:355">
                  ۳ ساعت پیش
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:356">
                  موجود
                </p>
                <div className="fg-82303a202c" data-node-id="887:357" data-name="Col Check">
                  <div className="fg-8c9afb9183" data-node-id="887:358" data-name="Frame">
                    <p className="fg-de972ba962" dir="auto" data-node-id="887:359">
                      در انتظار بررسی
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="887:360" data-name="Col Publish">
                  <div className="fg-bc154bd16e" data-node-id="887:361" data-name="Frame">
                    <p className="fg-e838f93e80" dir="auto" data-node-id="887:362">
                      پیش‌نویس
                    </p>
                  </div>
                </div>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:363">
                  نساجی
                </p>
                <div className="fg-3f29947b02" data-node-id="887:364" data-name="Col Artist">
                  <p className="fg-379a645d7e" dir="auto" data-node-id="887:365">
                    علی علوی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:366">
                    ART-1045
                  </p>
                </div>
                <div className="fg-8d22ca4f90" data-node-id="887:367" data-name="Col Product">
                  <p className="fg-e519183ae3" dir="auto" data-node-id="887:368">
                    فرش دستبافت پشمی طرح درختی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:369">
                    PRD-1025
                  </p>
                </div>
              </div>
              <div className="fg-16297fd7ca" data-node-id="887:370" data-name="Table Row">
                <DesignAction className="fg-7b391c49f6" data-node-id="887:371" data-name="Col Action" label="مشاهده" destination="product-detail">
                  <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:372">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-7d7fa0b1a1" data-node-id="887:373" data-name="Col Action Required">
                  <div className="fg-bc154bd16e" data-node-id="887:374" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="887:375">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-4238471968" dir="auto" data-node-id="887:376">
                  ۲ روز پیش
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:377">
                  موجود
                </p>
                <div className="fg-82303a202c" data-node-id="887:378" data-name="Col Check">
                  <div className="fg-489a397814" data-node-id="887:379" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:380">
                      تأیید شده
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="887:381" data-name="Col Publish">
                  <div className="fg-489a397814" data-node-id="887:382" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:383">
                      منتشر شده
                    </p>
                  </div>
                </div>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:384">
                  چرم
                </p>
                <div className="fg-3f29947b02" data-node-id="887:385" data-name="Col Artist">
                  <p className="fg-379a645d7e" dir="auto" data-node-id="887:386">
                    مریم حسینی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:387">
                    ART-2051
                  </p>
                </div>
                <div className="fg-8d22ca4f90" data-node-id="887:388" data-name="Col Product">
                  <p className="fg-e519183ae3" dir="auto" data-node-id="887:389">
                    کیف دوشی چرم طبیعی دست‌دوز
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:390">
                    PRD-1026
                  </p>
                </div>
              </div>
              <div className="fg-16297fd7ca" data-node-id="887:391" data-name="Table Row">
                <DesignAction className="fg-7b391c49f6" data-node-id="887:392" data-name="Col Action" label="مشاهده" destination="product-detail">
                  <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:393">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-7d7fa0b1a1" data-node-id="887:394" data-name="Col Action Required">
                  <div className="fg-8c9afb9183" data-node-id="887:395" data-name="Frame">
                    <p className="fg-de972ba962" dir="auto" data-node-id="887:396">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-4238471968" dir="auto" data-node-id="887:397">
                  ۴ ساعت پیش
                </p>
                <p className="fg-4f96cddf2a" dir="auto" data-node-id="887:398">
                  ناموجود
                </p>
                <div className="fg-82303a202c" data-node-id="887:399" data-name="Col Check">
                  <div className="fg-f5a735ebf8" data-node-id="887:400" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="887:401">
                      نیازمند اصلاح
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="887:402" data-name="Col Publish">
                  <div className="fg-489a397814" data-node-id="887:403" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:404">
                      منتشر شده
                    </p>
                  </div>
                </div>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:405">
                  خاتم‌کاری
                </p>
                <div className="fg-3f29947b02" data-node-id="887:406" data-name="Col Artist">
                  <p className="fg-379a645d7e" dir="auto" data-node-id="887:407">
                    رضا رضایی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:408">
                    ART-1984
                  </p>
                </div>
                <div className="fg-8d22ca4f90" data-node-id="887:409" data-name="Col Product">
                  <p className="fg-e519183ae3" dir="auto" data-node-id="887:410">
                    شکلات‌خوری خاتم‌کاری اصفهان ممتاز
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:411">
                    PRD-1027
                  </p>
                </div>
              </div>
              <div className="fg-16297fd7ca" data-node-id="887:412" data-name="Table Row">
                <DesignAction className="fg-7b391c49f6" data-node-id="887:413" data-name="Col Action" label="مشاهده" destination="product-detail">
                  <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:414">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-7d7fa0b1a1" data-node-id="887:415" data-name="Col Action Required">
                  <div className="fg-8c9afb9183" data-node-id="887:416" data-name="Frame">
                    <p className="fg-de972ba962" dir="auto" data-node-id="887:417">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-4238471968" dir="auto" data-node-id="887:418">
                  ۱ هفته پیش
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:419">
                  موجود
                </p>
                <div className="fg-82303a202c" data-node-id="887:420" data-name="Col Check">
                  <div className="fg-95680bef34" data-node-id="887:421" data-name="Frame">
                    <p className="fg-e8a87bbeef" dir="auto" data-node-id="887:422">
                      در حال بررسی
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="887:423" data-name="Col Publish">
                  <div className="fg-489a397814" data-node-id="887:424" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:425">
                      منتشر شده
                    </p>
                  </div>
                </div>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:426">
                  سفال
                </p>
                <div className="fg-3f29947b02" data-node-id="887:427" data-name="Col Artist">
                  <p className="fg-379a645d7e" dir="auto" data-node-id="887:428">
                    فاطمه معتمد
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:429">
                    ART-2114
                  </p>
                </div>
                <div className="fg-8d22ca4f90" data-node-id="887:430" data-name="Col Product">
                  <p className="fg-e519183ae3" dir="auto" data-node-id="887:431">
                    بشقاب سفالی نقاشی زیر لعابی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:432">
                    PRD-1028
                  </p>
                </div>
              </div>
              <div className="fg-16297fd7ca" data-node-id="887:433" data-name="Table Row">
                <DesignAction className="fg-7b391c49f6" data-node-id="887:434" data-name="Col Action" label="مشاهده" destination="product-detail">
                  <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:435">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-7d7fa0b1a1" data-node-id="887:436" data-name="Col Action Required">
                  <div className="fg-bc154bd16e" data-node-id="887:437" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="887:438">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-4238471968" dir="auto" data-node-id="887:439">
                  ۳ روز پیش
                </p>
                <p className="fg-57209d77cd" data-node-id="887:440">
                  —
                </p>
                <div className="fg-82303a202c" data-node-id="887:441" data-name="Col Check">
                  <div className="fg-489a397814" data-node-id="887:442" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:443">
                      تأیید شده
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="887:444" data-name="Col Publish">
                  <div className="fg-f5a735ebf8" data-node-id="887:445" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="887:446">
                      آرشیو شده
                    </p>
                  </div>
                </div>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:447">
                  نساجی
                </p>
                <div className="fg-3f29947b02" data-node-id="887:448" data-name="Col Artist">
                  <p className="fg-379a645d7e" dir="auto" data-node-id="887:449">
                    حسین موسوی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:450">
                    ART-1102
                  </p>
                </div>
                <div className="fg-8d22ca4f90" data-node-id="887:451" data-name="Col Product">
                  <p className="fg-e519183ae3" dir="auto" data-node-id="887:452">
                    رومیزی پته‌دوزی سنتی کرمان
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:453">
                    PRD-1029
                  </p>
                </div>
              </div>
              <div className="fg-16297fd7ca" data-node-id="887:454" data-name="Table Row">
                <DesignAction className="fg-7b391c49f6" data-node-id="887:455" data-name="Col Action" label="مشاهده" destination="product-detail">
                  <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:456">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-7d7fa0b1a1" data-node-id="887:457" data-name="Col Action Required">
                  <div className="fg-8c9afb9183" data-node-id="887:458" data-name="Frame">
                    <p className="fg-de972ba962" dir="auto" data-node-id="887:459">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-4238471968" dir="auto" data-node-id="887:460">
                  ۵ ساعت پیش
                </p>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:461">
                  موجود
                </p>
                <div className="fg-82303a202c" data-node-id="887:462" data-name="Col Check">
                  <div className="fg-8c9afb9183" data-node-id="887:463" data-name="Frame">
                    <p className="fg-de972ba962" dir="auto" data-node-id="887:464">
                      در انتظار بررسی
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="887:465" data-name="Col Publish">
                  <div className="fg-bc154bd16e" data-node-id="887:466" data-name="Frame">
                    <p className="fg-e838f93e80" dir="auto" data-node-id="887:467">
                      پیش‌نویس
                    </p>
                  </div>
                </div>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:468">
                  خاتم‌کاری
                </p>
                <div className="fg-3f29947b02" data-node-id="887:469" data-name="Col Artist">
                  <p className="fg-379a645d7e" dir="auto" data-node-id="887:470">
                    سارا محمدی
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:471">
                    ART-1240
                  </p>
                </div>
                <div className="fg-8d22ca4f90" data-node-id="887:472" data-name="Col Product">
                  <p className="fg-e519183ae3" dir="auto" data-node-id="887:473">
                    جعبه جواهرات خاتم‌کاری شده نگارین
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:474">
                    PRD-1030
                  </p>
                </div>
              </div>
              <div className="fg-16297fd7ca" data-node-id="887:475" data-name="Table Row">
                <DesignAction className="fg-7b391c49f6" data-node-id="887:476" data-name="Col Action" label="مشاهده" destination="product-detail">
                  <p className="fg-19ad7f67c4" dir="auto" data-node-id="887:477">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-7d7fa0b1a1" data-node-id="887:478" data-name="Col Action Required">
                  <div className="fg-bc154bd16e" data-node-id="887:479" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="887:480">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-4238471968" dir="auto" data-node-id="887:481">
                  ۶ ساعت پیش
                </p>
                <p className="fg-4f96cddf2a" dir="auto" data-node-id="887:482">
                  ناموجود
                </p>
                <div className="fg-82303a202c" data-node-id="887:483" data-name="Col Check">
                  <div className="fg-489a397814" data-node-id="887:484" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:485">
                      تأیید شده
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="887:486" data-name="Col Publish">
                  <div className="fg-489a397814" data-node-id="887:487" data-name="Frame">
                    <p className="fg-5daf48ad35" dir="auto" data-node-id="887:488">
                      منتشر شده
                    </p>
                  </div>
                </div>
                <p className="fg-57209d77cd" dir="auto" data-node-id="887:489">
                  چرم
                </p>
                <div className="fg-3f29947b02" data-node-id="887:490" data-name="Col Artist">
                  <p className="fg-379a645d7e" dir="auto" data-node-id="887:491">
                    امیر دهقان
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:492">
                    ART-1322
                  </p>
                </div>
                <div className="fg-8d22ca4f90" data-node-id="887:493" data-name="Col Product">
                  <p className="fg-e519183ae3" dir="auto" data-node-id="887:494">
                    کیف پول چرمی جیبی مدل مینی‌مال
                  </p>
                  <p className="fg-58d61dbfc5" data-node-id="887:495">
                    PRD-1031
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-0e1225defb" data-node-id="887:496" data-name="Pagination">
              <div className="fg-92b7da7864" data-node-id="887:497" data-name="Frame">
                <div className="fg-ea51d20d85" data-node-id="887:498" data-name="Frame">
                  <p className="fg-63174a1a4b" dir="auto" data-node-id="887:499">
                    قبلی
                  </p>
                </div>
                <div className="fg-9951e6e211" data-node-id="887:500" data-name="Frame">
                  <p className="fg-7c79984bbb" data-node-id="887:501">
                    ۱
                  </p>
                </div>
                <div className="fg-fef640a389" data-node-id="887:502" data-name="Frame">
                  <p className="fg-35eebb81d9" data-node-id="887:503">
                    ۲
                  </p>
                </div>
                <div className="fg-ea51d20d85" data-node-id="887:504" data-name="Frame">
                  <p className="fg-63174a1a4b" dir="auto" data-node-id="887:505">
                    بعدی
                  </p>
                </div>
              </div>
              <p className="fg-35eebb81d9" dir="auto" data-node-id="887:506">
                نمایش ۱ تا ۸ از ۸۴ محصول هنرمندان
              </p>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="887:207" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="887:208" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="887:209">
            خانه نگارین
          </p>
          <div className="fg-7d8647fa8b" data-node-id="887:210" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:237" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="887:212" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="887:213" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-f422037977" data-node-id="887:214" data-name="Icon-dashboard">
              <div className="fg-c51752dc8c" data-node-id="887:1182" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="887:216">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="887:217" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="887:218" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="887:219" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-66002a03ce" data-node-id="887:220" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1011" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="887:222">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="887:223" data-name="Group-1">
              <DesignAction className="fg-1182448444" data-node-id="887:224" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-66002a03ce" data-node-id="887:225" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1014" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/f69258e4.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="887:227">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="887:228" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="887:229" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-66002a03ce" data-node-id="887:230" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1017" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="887:232">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="887:233" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="887:234" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-66002a03ce" data-node-id="887:235" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1020" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="887:237">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="887:238" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="887:239" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-66002a03ce" data-node-id="887:240" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1023" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="887:242">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="887:243" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="887:244" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-66002a03ce" data-node-id="887:245" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1026" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="887:247">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="887:248" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="887:249" data-name="Group Header">
                <div className="fg-66002a03ce" data-node-id="887:250" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1029" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="887:252">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="887:253" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="887:254" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-66002a03ce" data-node-id="887:255" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1032" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="887:257">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="887:258" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="887:259" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-66002a03ce" data-node-id="887:260" data-name="chevron-down">
                  <div className="fg-ed684af670" data-node-id="887:1035" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/5fa089a2.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="887:262">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="887:263" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="887:264" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="887:265">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="887:266">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="887:267" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a6e7712f.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
