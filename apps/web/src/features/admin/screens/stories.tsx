// Figma 894:5635 — Admin / Stories — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStoriesDesktop() {
  return (
    <div className="fg-9917a372d9" data-node-id="894:5635" data-name="Admin / Stories — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:5691" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="894:5692" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:5693" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:5694" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/e66b9452.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:5695" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:5698" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="894:5699" data-name="Global Search" label="جستجو" placeholder="جستجو در استوری‌ها، هنرمندان، محصولات و ...">
              <p className="fg-f68c5e162d" dir="auto" data-node-id="894:5700">
                جستجو در استوری‌ها، هنرمندان، محصولات و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:6350" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="894:5702">
              مدیریت استوری‌های هنرمندان
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:5703" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="894:5704" data-name="Operational Summary">
            <DesignAction className="fg-bff106adf2" data-node-id="894:5705" data-name="Metric Shortcut" label="۱۲۴ کل استوری‌ها" destination="service-requests">
              <p className="fg-cbf2c4bfe6" data-node-id="894:5706">
                ۱۲۴
              </p>
              <p className="fg-0929981b97" dir="auto" data-node-id="894:5707">
                کل استوری‌ها
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="894:5708" data-name="Metric Shortcut" label="۸۲ منتشرشده" destination="service-requests">
              <p className="fg-b4c3d742fe" data-node-id="894:5709">
                ۸۲
              </p>
              <p className="fg-0929981b97" dir="auto" data-node-id="894:5710">
                منتشرشده
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="894:5711" data-name="Metric Shortcut" label="۴۲ پیش‌نویس" destination="service-requests">
              <p className="fg-2181579efc" data-node-id="894:5712">
                ۴۲
              </p>
              <p className="fg-0929981b97" dir="auto" data-node-id="894:5713">
                پیش‌نویس
              </p>
            </DesignAction>
            <DesignAction className="fg-bff106adf2" data-node-id="894:5714" data-name="Metric Shortcut" label="۹ نیاز به بررسی" destination="product-review-queue">
              <p className="fg-16cfff2cee" data-node-id="894:5715">
                ۹
              </p>
              <p className="fg-0929981b97" dir="auto" data-node-id="894:5716">
                نیاز به بررسی
              </p>
            </DesignAction>
          </div>
          <div className="fg-df4057f7e5" data-node-id="894:5717" data-name="Filters Strip">
            <div className="fg-9708e8d183" data-node-id="894:5718" data-name="Left Filters">
              <div className="fg-5cb86bfc14" data-node-id="894:5719" data-name="Filter">
                <p className="fg-9f06a6291b" dir="auto" data-node-id="894:5720">
                  نیاز به اقدام (۹)
                </p>
              </div>
              <div className="fg-a3b2a587b5" data-node-id="894:5721" data-name="Filter">
                <p className="fg-899c8bd72f" dir="auto" data-node-id="894:5722">
                  نوع محتوا
                </p>
              </div>
              <div className="fg-a3b2a587b5" data-node-id="894:5723" data-name="Filter">
                <p className="fg-899c8bd72f" dir="auto" data-node-id="894:5724">
                  وضعیت بررسی
                </p>
              </div>
              <div className="fg-a3b2a587b5" data-node-id="894:5725" data-name="Filter">
                <p className="fg-899c8bd72f" dir="auto" data-node-id="894:5726">
                  وضعیت انتشار
                </p>
              </div>
            </div>
            <DesignField className="fg-8fa0f7fc5c" data-node-id="894:5727" data-name="Right Search" label="جستجو" placeholder="جستجو در استوری‌ها...">
              <p className="fg-f68c5e162d" dir="auto" data-node-id="894:5728">
                جستجو در استوری‌ها...
              </p>
            </DesignField>
          </div>
          <div className="fg-c7a881f669" data-node-id="894:5729" data-name="Worklist Section">
            <p className="fg-5f8b9f0bac" dir="auto" data-node-id="894:5730">
              لیست استوری‌های اخیر
            </p>
            <div className="fg-048dc4f7ae" data-node-id="894:5731" data-name="Table Wrapper">
              <div className="fg-0611869c9d" data-node-id="894:5732" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="894:5733">
                  اقدام
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:5734">
                  آخرین بروزرسانی
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:5735">
                  وضعیت بررسی
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:5736">
                  وضعیت انتشار
                </p>
                <p className="fg-976b6a194c" dir="auto" data-node-id="894:5737">
                  نوع محتوا
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="894:5738">
                  محصول مرتبط
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="894:5739">
                  هنرمند
                </p>
                <p className="fg-33074dfcf6" dir="auto" data-node-id="894:5740">
                  شناسه
                </p>
                <p className="fg-207ea3ad86" dir="auto" data-node-id="894:5741">
                  پیش‌نمایش
                </p>
              </div>
              <div className="fg-e16ac02b64" data-node-id="894:5742" data-name="Table Body">
                <div className="fg-83960d1ae6" data-node-id="894:5743" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5744" data-name="Col Action" label="مشاهده" destination="story-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="894:5745">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-c35355b7a4" dir="auto" data-node-id="894:5746">
                    ۱۰ دقیقه پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5747" data-name="Col Review">
                    <div className="fg-e6bf96a33c" data-node-id="894:5748" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:5749">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:5750" data-name="Col Pub">
                    <div className="fg-6e2aeb8423" data-node-id="894:5751" data-name="Badge">
                      <p className="fg-9d67af1ff0" dir="auto" data-node-id="894:5752">
                        منتشرشده
                      </p>
                    </div>
                  </div>
                  <div className="fg-80643d08ac" data-node-id="894:5753" data-name="Col Type">
                    <div className="fg-c51752dc8c" data-node-id="894:6353" data-name="image">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/74261262.svg" />
                    </div>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5755" data-name="Col Product">
                    <p className="fg-9cf6570e2d" dir="auto" data-node-id="894:5756">
                      گلیم رومیزی سنتی
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5757">
                      PRD-2201
                    </p>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5758" data-name="Col Artist">
                    <p className="fg-5980cac0a2" dir="auto" data-node-id="894:5759">
                      مریم علوی
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5760">
                      ART-4821
                    </p>
                  </div>
                  <p className="fg-1729573680" data-node-id="894:5761">
                    STY-1024
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:5762" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:5763" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/bf1cebbf.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-83960d1ae6" data-node-id="894:5764" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5765" data-name="Col Action" label="مشاهده" destination="story-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="894:5766">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-c35355b7a4" dir="auto" data-node-id="894:5767">
                    ۲ ساعت پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5768" data-name="Col Review">
                    <div className="fg-e6bf96a33c" data-node-id="894:5769" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:5770">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:5771" data-name="Col Pub">
                    <div className="fg-6e2aeb8423" data-node-id="894:5772" data-name="Badge">
                      <p className="fg-9d67af1ff0" dir="auto" data-node-id="894:5773">
                        منتشرشده
                      </p>
                    </div>
                  </div>
                  <div className="fg-80643d08ac" data-node-id="894:5774" data-name="Col Type">
                    <div className="fg-c51752dc8c" data-node-id="894:6530" data-name="video">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/f5801465.svg" />
                    </div>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5776" data-name="Col Product">
                    <p className="fg-9cf6570e2d" dir="auto" data-node-id="894:5777">
                      بشقاب میناکاری اصفهان
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5778">
                      PRD-3510
                    </p>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5779" data-name="Col Artist">
                    <p className="fg-5980cac0a2" dir="auto" data-node-id="894:5780">
                      علیرضا عباسی
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5781">
                      ART-1102
                    </p>
                  </div>
                  <p className="fg-1729573680" data-node-id="894:5782">
                    STY-1025
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:5783" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:5784" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/e22042ae.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-83960d1ae6" data-node-id="894:5785" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5786" data-name="Col Action" label="بررسی" destination="story-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="894:5787">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-c35355b7a4" dir="auto" data-node-id="894:5788">
                    ۵ ساعت پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5789" data-name="Col Review">
                    <div className="fg-f858729e81" data-node-id="894:5790" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="894:5791">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:5792" data-name="Col Pub">
                    <div className="fg-1c5311eee5" data-node-id="894:5793" data-name="Badge">
                      <p className="fg-9d67af1ff0" dir="auto" data-node-id="894:5794">
                        پیش‌نویس
                      </p>
                    </div>
                  </div>
                  <div className="fg-80643d08ac" data-node-id="894:5795" data-name="Col Type">
                    <div className="fg-c51752dc8c" data-node-id="894:6356" data-name="image">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/74261262.svg" />
                    </div>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5797" data-name="Col Product">
                    <p className="fg-9cf6570e2d" dir="auto" data-node-id="894:5798">
                      گلدان سفالی خاک رس
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5799">
                      PRD-4091
                    </p>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5800" data-name="Col Artist">
                    <p className="fg-5980cac0a2" dir="auto" data-node-id="894:5801">
                      زهرا کریمی
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5802">
                      ART-9921
                    </p>
                  </div>
                  <p className="fg-1729573680" data-node-id="894:5803">
                    STY-1026
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:5804" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:5805" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/c3d14553.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-83960d1ae6" data-node-id="894:5806" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5807" data-name="Col Action" label="مشاهده" destination="story-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="894:5808">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-c35355b7a4" dir="auto" data-node-id="894:5809">
                    ۱ روز پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5810" data-name="Col Review">
                    <div className="fg-f5a735ebf8" data-node-id="894:5811" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="894:5812">
                        بازنگری
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:5813" data-name="Col Pub">
                    <div className="fg-6e2aeb8423" data-node-id="894:5814" data-name="Badge">
                      <p className="fg-9d67af1ff0" dir="auto" data-node-id="894:5815">
                        منتشرشده
                      </p>
                    </div>
                  </div>
                  <div className="fg-80643d08ac" data-node-id="894:5816" data-name="Col Type">
                    <div className="fg-c51752dc8c" data-node-id="894:6533" data-name="video">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/f5801465.svg" />
                    </div>
                  </div>
                  <div className="fg-9ad71c3d4e" data-node-id="894:5818" data-name="Col Product">
                    <p className="fg-1a2068ea6e" data-node-id="894:5819">
                      —
                    </p>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5820" data-name="Col Artist">
                    <p className="fg-5980cac0a2" dir="auto" data-node-id="894:5821">
                      محمد محسنی
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5822">
                      ART-3401
                    </p>
                  </div>
                  <p className="fg-1729573680" data-node-id="894:5823">
                    STY-1027
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:5824" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:5825" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/bb855e56.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-83960d1ae6" data-node-id="894:5826" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5827" data-name="Col Action" label="بررسی" destination="story-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="894:5828">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-c35355b7a4" dir="auto" data-node-id="894:5829">
                    ۲ روز پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5830" data-name="Col Review">
                    <div className="fg-f858729e81" data-node-id="894:5831" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="894:5832">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:5833" data-name="Col Pub">
                    <div className="fg-1c5311eee5" data-node-id="894:5834" data-name="Badge">
                      <p className="fg-9d67af1ff0" dir="auto" data-node-id="894:5835">
                        پیش‌نویس
                      </p>
                    </div>
                  </div>
                  <div className="fg-80643d08ac" data-node-id="894:5836" data-name="Col Type">
                    <div className="fg-c51752dc8c" data-node-id="894:6359" data-name="image">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/74261262.svg" />
                    </div>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5838" data-name="Col Product">
                    <p className="fg-9cf6570e2d" dir="auto" data-node-id="894:5839">
                      آینه با قاب خاتم‌کاری
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5840">
                      PRD-1094
                    </p>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5841" data-name="Col Artist">
                    <p className="fg-5980cac0a2" dir="auto" data-node-id="894:5842">
                      سارا احمدی
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5843">
                      ART-2291
                    </p>
                  </div>
                  <p className="fg-1729573680" data-node-id="894:5844">
                    STY-1028
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:5845" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:5846" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/6f1b9e51.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-83960d1ae6" data-node-id="894:5847" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:5848" data-name="Col Action" label="مشاهده" destination="story-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="894:5849">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-c35355b7a4" dir="auto" data-node-id="894:5850">
                    ۳ روز پیش
                  </p>
                  <div className="fg-d3a9b73303" data-node-id="894:5851" data-name="Col Review">
                    <div className="fg-e6bf96a33c" data-node-id="894:5852" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="894:5853">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:5854" data-name="Col Pub">
                    <div className="fg-6e2aeb8423" data-node-id="894:5855" data-name="Badge">
                      <p className="fg-9d67af1ff0" dir="auto" data-node-id="894:5856">
                        منتشرشده
                      </p>
                    </div>
                  </div>
                  <div className="fg-80643d08ac" data-node-id="894:5857" data-name="Col Type">
                    <div className="fg-c51752dc8c" data-node-id="894:6362" data-name="image">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/74261262.svg" />
                    </div>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5859" data-name="Col Product">
                    <p className="fg-9cf6570e2d" dir="auto" data-node-id="894:5860">
                      کیف چرمی دوز سنتی
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5861">
                      PRD-5401
                    </p>
                  </div>
                  <div className="fg-3f29947b02" data-node-id="894:5862" data-name="Col Artist">
                    <p className="fg-5980cac0a2" dir="auto" data-node-id="894:5863">
                      امیر تهرانی
                    </p>
                    <p className="fg-a9d1c863d0" data-node-id="894:5864">
                      ART-7023
                    </p>
                  </div>
                  <p className="fg-1729573680" data-node-id="894:5865">
                    STY-1029
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:5866" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:5867" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/3cc883d1.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:5636" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:5637" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:5638">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="894:5639" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="894:5640" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:5641" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:5642" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:6314" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:5644">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-f3a73e70c3" data-node-id="894:5645" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:5646" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="894:5647" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:6317" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5649">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:5650" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="894:5651" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:6320" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5653">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5654" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="894:5655" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:6323" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5657">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5662" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="894:5663" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:6329" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5665">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5666" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="894:5667" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:6332" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5669">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5670" data-name="Group-6">
              <DesignAction className="fg-9e3538324e" data-node-id="894:5671" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:6335" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5673">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5674" data-name="Group-7">
              <div className="fg-9e3538324e" data-node-id="894:5675" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:6338" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5677">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5678" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="894:5679" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:6341" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5681">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:5682" data-name="Group-9">
              <DesignAction className="fg-9e3538324e" data-node-id="894:5683" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:6344" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="894:5685">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:5686" data-name="Staff Profile">
          <div className="fg-15b486e966" data-node-id="894:5687" data-name="Profile Details">
            <p className="fg-fe647e601f" dir="auto" data-node-id="894:5688">
              کارشناس محتوا
            </p>
            <p className="fg-a9d1c863d0" dir="auto" data-node-id="894:5689">
              مدیر بررسی استوری‌ها
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:5690" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/1790aaa4.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
