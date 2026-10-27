// Figma 894:6541 — Admin / Story Review Queue — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminStoryReviewQueueDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:6541" data-name="Admin / Story Review Queue — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:6542" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:6543" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:6544" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:6545" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/b75452d4.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="894:6546" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:6549" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:6550" data-name="Global Search" label="جستجو" placeholder="جستجو در استوری‌ها، هنرمندان، محصولات و ...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:6551">
                جستجو در استوری‌ها، هنرمندان، محصولات و ...
              </p>
              <div className="fg-c51752dc8c" data-node-id="894:7336" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:6553">
              صف بررسی استوری‌ها
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:6554" data-name="Scrollable Content">
          <div className="fg-867b1b2e34" data-node-id="894:6555" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:6556" data-name="Metric Shortcut" label="۹ در انتظار بررسی" destination="product-review-queue">
              <p className="fg-f18fe9a823" data-node-id="894:6557">
                ۹
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:6558">
                در انتظار بررسی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:6559" data-name="Metric Shortcut" label="۴ بازنگری درخواست‌شده" destination="service-requests">
              <p className="fg-4318f122ae" data-node-id="894:6560">
                ۴
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:6561">
                بازنگری درخواست‌شده
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:6562" data-name="Metric Shortcut" label="۲۸ بررسی‌شده امروز" destination="product-review-queue">
              <p className="fg-9de1f6a6f9" data-node-id="894:6563">
                ۲۸
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:6564">
                بررسی‌شده امروز
              </p>
            </DesignAction>
          </div>
          <div className="fg-02bb0cecf2" data-node-id="894:6565" data-name="Filters Strip">
            <div className="fg-9708e8d183" data-node-id="894:6566" data-name="Left Filters">
              <div className="fg-89553f2c19" data-node-id="894:6567" data-name="Filter active">
                <p className="fg-7c79984bbb" dir="auto" data-node-id="894:6568">
                  وضعیت بررسی: همه
                </p>
              </div>
              <div className="fg-6ea4dc7891" data-node-id="894:6569" data-name="Filter">
                <p className="fg-35eebb81d9" dir="auto" data-node-id="894:6570">
                  نوع محتوا: همه
                </p>
              </div>
            </div>
            <DesignField className="fg-5ea91692ac" data-node-id="894:6571" data-name="Right Search" label="جستجو" placeholder="جستجو با هنرمند یا STY...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:6572">
                جستجو با هنرمند یا STY...
              </p>
              <div className="fg-5cca20e57d" data-node-id="894:7339" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/c1bf1582.svg" />
              </div>
            </DesignField>
          </div>
          <div className="fg-a1f410f2dc" data-node-id="894:6574" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="894:6575">
              لیست استوری‌های منتظر اقدام
            </p>
            <div className="fg-ceebe80a1f" data-node-id="894:6576" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="894:6577" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="894:6578">
                  اقدام
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:6579">
                  تاریخ ارسال
                </p>
                <p className="fg-c68de40718" dir="auto" data-node-id="894:6580">
                  وضعیت
                </p>
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="894:6581">
                  نوع
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="894:6582">
                  محصول مرتبط
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="894:6583">
                  هنرمند
                </p>
                <p className="fg-33074dfcf6" dir="auto" data-node-id="894:6584">
                  شناسه
                </p>
                <p className="fg-207ea3ad86" dir="auto" data-node-id="894:6585">
                  پیش‌نمایش
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="894:6586" data-name="Table Body">
                <div className="fg-16297fd7ca" data-node-id="894:6587" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:6588" data-name="Col Action" label="بررسی" destination="story-review">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:6589">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="894:6590">
                    ۱۰ دقیقه پیش
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:6591" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="894:6592" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:6593">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-041b5ca852" dir="auto" data-node-id="894:6594">
                    تصویر
                  </p>
                  <p className="fg-18bb87d558" dir="auto" data-node-id="894:6595">
                    گلیم رومیزی سنتی
                  </p>
                  <div className="fg-3f29947b02" data-node-id="894:6596" data-name="Col Artist">
                    <p className="fg-1ae29d11c7" dir="auto" data-node-id="894:6597">
                      مریم علوی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:6598">
                      ART-4821
                    </p>
                  </div>
                  <p className="fg-976cff39f8" data-node-id="894:6599">
                    STY-1031
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:6600" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:6601" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/c8c42235.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-16297fd7ca" data-node-id="894:6602" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:6603" data-name="Col Action" label="بررسی" destination="story-review">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:6604">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="894:6605">
                    ۲ ساعت پیش
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:6606" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="894:6607" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:6608">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-041b5ca852" dir="auto" data-node-id="894:6609">
                    ویدیو
                  </p>
                  <p className="fg-18bb87d558" dir="auto" data-node-id="894:6610">
                    بشقاب میناکاری
                  </p>
                  <div className="fg-3f29947b02" data-node-id="894:6611" data-name="Col Artist">
                    <p className="fg-1ae29d11c7" dir="auto" data-node-id="894:6612">
                      رضا کریمی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:6613">
                      ART-1102
                    </p>
                  </div>
                  <p className="fg-976cff39f8" data-node-id="894:6614">
                    STY-1032
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:6615" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:6616" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/bc5f48d1.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-16297fd7ca" data-node-id="894:6617" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:6618" data-name="Col Action" label="بررسی" destination="story-review">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:6619">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="894:6620">
                    ۵ ساعت پیش
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:6621" data-name="Col Status">
                    <div className="fg-f5a735ebf8" data-node-id="894:6622" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="894:6623">
                        بازنگری درخواست‌شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-041b5ca852" dir="auto" data-node-id="894:6624">
                    تصویر
                  </p>
                  <p className="fg-18bb87d558" dir="auto" data-node-id="894:6625">
                    کوزه سفالی لالجین
                  </p>
                  <div className="fg-3f29947b02" data-node-id="894:6626" data-name="Col Artist">
                    <p className="fg-1ae29d11c7" dir="auto" data-node-id="894:6627">
                      زهرا طاهری
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:6628">
                      ART-9921
                    </p>
                  </div>
                  <p className="fg-976cff39f8" data-node-id="894:6629">
                    STY-1033
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:6630" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:6631" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/fceec8ef.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-16297fd7ca" data-node-id="894:6632" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:6633" data-name="Col Action" label="بررسی" destination="story-review">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:6634">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="894:6635">
                    ۱ روز پیش
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:6636" data-name="Col Status">
                    <div className="fg-c9a49f4476" data-node-id="894:6637" data-name="Badge">
                      <p className="fg-645e8110ca" dir="auto" data-node-id="894:6638">
                        ارسال مجدد
                      </p>
                    </div>
                  </div>
                  <p className="fg-041b5ca852" dir="auto" data-node-id="894:6639">
                    تصویر
                  </p>
                  <p className="fg-18bb87d558" data-node-id="894:6640">
                    —
                  </p>
                  <div className="fg-3f29947b02" data-node-id="894:6641" data-name="Col Artist">
                    <p className="fg-1ae29d11c7" dir="auto" data-node-id="894:6642">
                      علی احمدی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:6643">
                      ART-3401
                    </p>
                  </div>
                  <p className="fg-976cff39f8" data-node-id="894:6644">
                    STY-1034
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:6645" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:6646" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/eb3a967e.png" />
                    </div>
                  </div>
                </div>
                <div className="fg-16297fd7ca" data-node-id="894:6647" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="894:6648" data-name="Col Action" label="بررسی" destination="story-review">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:6649">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-de861aa5d7" dir="auto" data-node-id="894:6650">
                    ۲ روز پیش
                  </p>
                  <div className="fg-7101d81e60" data-node-id="894:6651" data-name="Col Status">
                    <div className="fg-8c9afb9183" data-node-id="894:6652" data-name="Badge">
                      <p className="fg-de972ba962" dir="auto" data-node-id="894:6653">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-041b5ca852" dir="auto" data-node-id="894:6654">
                    ویدیو
                  </p>
                  <p className="fg-18bb87d558" dir="auto" data-node-id="894:6655">
                    کیف چرمی دست‌دوز
                  </p>
                  <div className="fg-3f29947b02" data-node-id="894:6656" data-name="Col Artist">
                    <p className="fg-1ae29d11c7" dir="auto" data-node-id="894:6657">
                      سارا بهرامی
                    </p>
                    <p className="fg-56eba8c972" data-node-id="894:6658">
                      ART-2291
                    </p>
                  </div>
                  <p className="fg-976cff39f8" data-node-id="894:6659">
                    STY-1035
                  </p>
                  <div className="fg-7b391c49f6" data-node-id="894:6660" data-name="Col Thumbnail">
                    <div className="fg-66a1c0850b" data-node-id="894:6661" data-name="Rectangle">
                      <img alt="" className="fg-3cf40fed90" src="/admin-assets/f5bcae53.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:6662" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:6663" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:6664">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="894:6665" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:265" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:6667" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:6668" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="894:7342" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:6670">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="894:6671" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:6672" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6673" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="894:7345" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6675">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:6676" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="894:6677" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="894:7348" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6679">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6680" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6681" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="894:7351" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6683">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6688" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6689" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="894:7357" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6691">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6692" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6693" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="894:7360" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6695">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6696" data-name="Group-6">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6697" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="894:7363" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6699">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6700" data-name="Group-7">
              <div className="fg-9e3538324e" data-node-id="894:6701" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="894:7366" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6703">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6704" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6705" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="894:7369" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6707">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:6708" data-name="Group-9">
              <DesignAction className="fg-9e3538324e" data-node-id="894:6709" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="894:7372" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2662b648.svg" />
                </div>
                <p className="fg-46c6f2178e" dir="auto" data-node-id="894:6711">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:6712" data-name="Staff Profile">
          <div className="fg-15b486e966" data-node-id="894:6713" data-name="Profile Details">
            <p className="fg-fe647e601f" dir="auto" data-node-id="894:6714">
              کارشناس محتوا
            </p>
            <p className="fg-b3b828a019" dir="auto" data-node-id="894:6715">
              مدیر بررسی استوری‌ها
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:6716" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/961f55be.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
