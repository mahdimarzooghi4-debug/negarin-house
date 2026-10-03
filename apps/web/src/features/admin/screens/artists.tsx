// Figma 884:196 — Admin / Artists — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminArtistsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="884:196" data-name="Admin / Artists — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="884:257" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="884:258" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="884:259" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="884:260" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="884:261" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/72b768a8.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="884:265" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="884:266" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، محصولات، سفارش‌ها و ...">
              <p className="fg-7350bdf7b6" dir="auto" data-node-id="884:267">
                جستجو در هنرمندان، محصولات، سفارش‌ها و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="884:268" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="884:270">
              مدیریت هنرمندان نگارین
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="884:271" data-name="Scrollable Content">
          <div className="fg-89c5c241e8" data-node-id="884:272" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="884:273" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="884:274" data-name="Frame">
                <div className="fg-a3b2a587b5" data-node-id="884:275" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="884:276">
                    وضعیت عضویت
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="884:277" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="884:278">
                    سطح رشد
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="884:279" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="884:280">
                    وضعیت مدارک
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="884:281" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="884:282">
                    وضعیت غرفه
                  </p>
                </div>
              </div>
              <div className="fg-e8210ba625" data-node-id="884:283" data-name="Frame">
                <DesignField className="fg-8fa0f7fc5c" data-node-id="884:284" data-name="Search Input" label="جستجو" placeholder="جستجو در هنرمندان...">
                  <p className="fg-f68c5e162d" dir="auto" data-node-id="884:285">
                    جستجو در هنرمندان...
                  </p>
                </DesignField>
              </div>
            </div>
          </div>
          <div className="fg-fb2ad4a36a" data-node-id="884:286" data-name="Table Card">
            <div className="fg-5a60ba4653" data-node-id="884:287" data-name="Table Header Row">
              <p className="fg-fa0d4d9a92" dir="auto" data-node-id="884:288">
                اقدام
              </p>
              <p className="fg-44d10f1b20" dir="auto" data-node-id="884:289">
                نیازمند اقدام
              </p>
              <p className="fg-44d10f1b20" dir="auto" data-node-id="884:290">
                تاریخ عضویت
              </p>
              <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="884:291">
                وضعیت غرفه
              </p>
              <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="884:292">
                وضعیت مدارک
              </p>
              <p className="fg-8d481b53ec" dir="auto" data-node-id="884:293">
                سطح رشد
              </p>
              <p className="fg-8d481b53ec" dir="auto" data-node-id="884:294">
                وضعیت عضویت
              </p>
              <p className="fg-c30e166dd2" dir="auto" data-node-id="884:295">
                غرفه / برند
              </p>
              <p className="fg-5fa1cff2ec" dir="auto" data-node-id="884:296">
                هنرمند
              </p>
            </div>
            <div className="fg-e16ac02b64" data-node-id="884:297" data-name="Table Body">
              <div className="fg-4f547a8b42" data-node-id="884:298" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:299" data-name="Col Action" label="مشاهده" destination="artist-detail">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:300">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:301" data-name="Col Action Required">
                  <div className="fg-bc154bd16e" data-node-id="884:302" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="884:303">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="884:304">
                  ۱۴۰۲/۰۴/۱۲
                </p>
                <div className="fg-82303a202c" data-node-id="884:305" data-name="Col Booth">
                  <div className="fg-e6bf96a33c" data-node-id="884:306" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:307">
                      فعال
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="884:308" data-name="Col Docs">
                  <div className="fg-e6bf96a33c" data-node-id="884:309" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:310">
                      تأیید شده
                    </p>
                  </div>
                </div>
                <p className="fg-1a83b0c863" dir="auto" data-node-id="884:311">
                  سفیر جهانی
                </p>
                <div className="fg-d3a9b73303" data-node-id="884:312" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="884:313" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:314">
                      فعال
                    </p>
                  </div>
                </div>
                <p className="fg-9bdf394443" dir="auto" data-node-id="884:315">
                  نگارستان زری
                </p>
                <div className="fg-8d22ca4f90" data-node-id="884:316" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:317">
                    زهرا کریمی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:318">
                    ART-1092
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:319" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:320" data-name="Col Action" label="مشاهده" destination="artist-detail">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:321">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:322" data-name="Col Action Required">
                  <div className="fg-f858729e81" data-node-id="884:323" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:324">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="884:325">
                  ۱۴۰۲/۰۶/۱۸
                </p>
                <div className="fg-82303a202c" data-node-id="884:326" data-name="Col Booth">
                  <div className="fg-f5a735ebf8" data-node-id="884:327" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="884:328">
                      غیرفعال
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="884:329" data-name="Col Docs">
                  <div className="fg-f5a735ebf8" data-node-id="884:330" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="884:331">
                      نیازمند اصلاح
                    </p>
                  </div>
                </div>
                <p className="fg-1a83b0c863" dir="auto" data-node-id="884:332">
                  شکوفه
                </p>
                <div className="fg-d3a9b73303" data-node-id="884:333" data-name="Col Status">
                  <div className="fg-f5a735ebf8" data-node-id="884:334" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="884:335">
                      غیرفعال
                    </p>
                  </div>
                </div>
                <p className="fg-9bdf394443" dir="auto" data-node-id="884:336">
                  کارگاه هنر کویر
                </p>
                <div className="fg-8d22ca4f90" data-node-id="884:337" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:338">
                    علی علوی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:339">
                    ART-1045
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:340" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:341" data-name="Col Action" label="مشاهده" destination="artist-detail">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:342">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:343" data-name="Col Action Required">
                  <div className="fg-f858729e81" data-node-id="884:344" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:345">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="884:346">
                  ۱۴۰۲/۰۸/۰۵
                </p>
                <div className="fg-82303a202c" data-node-id="884:347" data-name="Col Booth">
                  <div className="fg-f858729e81" data-node-id="884:348" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:349">
                      در انتظار بررسی
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="884:350" data-name="Col Docs">
                  <div className="fg-f858729e81" data-node-id="884:351" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:352">
                      در انتظار بررسی
                    </p>
                  </div>
                </div>
                <p className="fg-1a83b0c863" dir="auto" data-node-id="884:353">
                  جوانه
                </p>
                <div className="fg-d3a9b73303" data-node-id="884:354" data-name="Col Status">
                  <div className="fg-f858729e81" data-node-id="884:355" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:356">
                      در انتظار بررسی
                    </p>
                  </div>
                </div>
                <p className="fg-9bdf394443" dir="auto" data-node-id="884:357">
                  زیورآلات مریم
                </p>
                <div className="fg-8d22ca4f90" data-node-id="884:358" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:359">
                    مریم حسینی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:360">
                    ART-2051
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:361" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:362" data-name="Col Action" label="مشاهده" destination="artist-detail">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:363">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:364" data-name="Col Action Required">
                  <div className="fg-bc154bd16e" data-node-id="884:365" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="884:366">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="884:367">
                  ۱۴۰۲/۰۱/۲۲
                </p>
                <div className="fg-82303a202c" data-node-id="884:368" data-name="Col Booth">
                  <div className="fg-e6bf96a33c" data-node-id="884:369" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:370">
                      فعال
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="884:371" data-name="Col Docs">
                  <div className="fg-e6bf96a33c" data-node-id="884:372" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:373">
                      تأیید شده
                    </p>
                  </div>
                </div>
                <p className="fg-1a83b0c863" dir="auto" data-node-id="884:374">
                  سرو زرین
                </p>
                <div className="fg-d3a9b73303" data-node-id="884:375" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="884:376" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:377">
                      فعال
                    </p>
                  </div>
                </div>
                <p className="fg-9bdf394443" dir="auto" data-node-id="884:378">
                  مسینه‌سازان شمال
                </p>
                <div className="fg-8d22ca4f90" data-node-id="884:379" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:380">
                    رضا رضایی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:381">
                    ART-1984
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:382" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:383" data-name="Col Action" label="مشاهده" destination="artist-detail">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:384">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:385" data-name="Col Action Required">
                  <div className="fg-f858729e81" data-node-id="884:386" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:387">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="884:388">
                  ۱۴۰۲/۰۹/۰۱
                </p>
                <div className="fg-82303a202c" data-node-id="884:389" data-name="Col Booth">
                  <div className="fg-f5a735ebf8" data-node-id="884:390" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="884:391">
                      غیرفعال
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="884:392" data-name="Col Docs">
                  <div className="fg-f858729e81" data-node-id="884:393" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:394">
                      در انتظار بررسی
                    </p>
                  </div>
                </div>
                <p className="fg-1a83b0c863" dir="auto" data-node-id="884:395">
                  شکوفه
                </p>
                <div className="fg-d3a9b73303" data-node-id="884:396" data-name="Col Status">
                  <div className="fg-f858729e81" data-node-id="884:397" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:398">
                      در انتظار بررسی
                    </p>
                  </div>
                </div>
                <p className="fg-9bdf394443" dir="auto" data-node-id="884:399">
                  استودیو گِل و نقش
                </p>
                <div className="fg-8d22ca4f90" data-node-id="884:400" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:401">
                    فاطمه معتمد
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:402">
                    ART-2114
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:403" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:404" data-name="Col Action" label="مشاهده" destination="artist-detail">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:405">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:406" data-name="Col Action Required">
                  <div className="fg-bc154bd16e" data-node-id="884:407" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="884:408">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="884:409">
                  ۱۴۰۲/۰۳/۱۵
                </p>
                <div className="fg-82303a202c" data-node-id="884:410" data-name="Col Booth">
                  <div className="fg-e6bf96a33c" data-node-id="884:411" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:412">
                      فعال
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="884:413" data-name="Col Docs">
                  <div className="fg-e6bf96a33c" data-node-id="884:414" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:415">
                      تأیید شده
                    </p>
                  </div>
                </div>
                <p className="fg-1a83b0c863" dir="auto" data-node-id="884:416">
                  سرو زرین
                </p>
                <div className="fg-d3a9b73303" data-node-id="884:417" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="884:418" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:419">
                      فعال
                    </p>
                  </div>
                </div>
                <p className="fg-9bdf394443" dir="auto" data-node-id="884:420">
                  سفالینه‌های لالجین
                </p>
                <div className="fg-8d22ca4f90" data-node-id="884:421" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:422">
                    حسین موسوی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:423">
                    ART-1102
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:424" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:425" data-name="Col Action" label="مشاهده" destination="artist-detail">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:426">
                    مشاهده
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:427" data-name="Col Action Required">
                  <div className="fg-f858729e81" data-node-id="884:428" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:429">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-c35355b7a4" data-node-id="884:430">
                  ۱۴۰۲/۰۷/۳۰
                </p>
                <div className="fg-82303a202c" data-node-id="884:431" data-name="Col Booth">
                  <div className="fg-f5a735ebf8" data-node-id="884:432" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="884:433">
                      غیرفعال
                    </p>
                  </div>
                </div>
                <div className="fg-82303a202c" data-node-id="884:434" data-name="Col Docs">
                  <div className="fg-f5a735ebf8" data-node-id="884:435" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="884:436">
                      نیازمند اصلاح
                    </p>
                  </div>
                </div>
                <p className="fg-1a83b0c863" dir="auto" data-node-id="884:437">
                  جوانه
                </p>
                <div className="fg-d3a9b73303" data-node-id="884:438" data-name="Col Status">
                  <div className="fg-f5a735ebf8" data-node-id="884:439" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="884:440">
                      غیرفعال
                    </p>
                  </div>
                </div>
                <p className="fg-9bdf394443" dir="auto" data-node-id="884:441">
                  چرم‌دوزی سارا
                </p>
                <div className="fg-8d22ca4f90" data-node-id="884:442" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:443">
                    سارا محمدی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:444">
                    ART-1240
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-c87bdb284a" data-node-id="884:445" data-name="Pagination">
              <div className="fg-92b7da7864" data-node-id="884:446" data-name="Frame">
                <div className="fg-480aeaca9c" data-node-id="884:447" data-name="Frame">
                  <p className="fg-934ca87244" dir="auto" data-node-id="884:448">
                    قبلی
                  </p>
                </div>
                <div className="fg-f2c3587a20" data-node-id="884:449" data-name="Frame">
                  <p className="fg-05ebd28202" data-node-id="884:450">
                    ۱
                  </p>
                </div>
                <div className="fg-fef640a389" data-node-id="884:451" data-name="Frame">
                  <p className="fg-899c8bd72f" data-node-id="884:452">
                    ۲
                  </p>
                </div>
                <div className="fg-480aeaca9c" data-node-id="884:453" data-name="Frame">
                  <p className="fg-934ca87244" dir="auto" data-node-id="884:454">
                    بعدی
                  </p>
                </div>
              </div>
              <p className="fg-899c8bd72f" dir="auto" data-node-id="884:455">
                نمایش ۱ تا ۷ از ۷۴ هنرمند
              </p>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="884:197" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="884:198" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="884:199">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="884:200" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="884:201" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="884:202" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="884:203" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="884:204" data-name="Dashboard Icon">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/a4cc0b99.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="884:205">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="884:206" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="884:207" data-name="Group-0">
              <DesignAction className="fg-fcc641ace6" data-node-id="884:208" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="884:209" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="884:211">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="884:212" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="884:213" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="884:214" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:216">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:217" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="884:218" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="884:219" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:221">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:222" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="884:223" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="884:224" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:226">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:227" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="884:228" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="884:229" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:231">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:232" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="884:233" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="884:234" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:236">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:237" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="884:238" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="884:239" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:241">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:242" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="884:243" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="884:244" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:246">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:247" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="884:248" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="884:249" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="884:251">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="884:252" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="884:253" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="884:254">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="884:255">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="884:256" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
