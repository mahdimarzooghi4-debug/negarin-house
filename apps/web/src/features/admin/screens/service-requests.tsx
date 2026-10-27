// Figma 892:958 — Admin / Service Requests — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminServiceRequestsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="892:958" data-name="Admin / Service Requests — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="892:959" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="892:960" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="892:961" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="892:962" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/c9853d9c.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="892:963" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="892:964" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-87f65ec773" data-node-id="892:965" data-name="bell">
                <div className="fg-0bb5547f93" data-node-id="892:1311" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/03ae448d.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="892:967" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="892:968" data-name="Global Search" label="جستجو" placeholder="جستجو در هنرمندان، برنامه‌های رشد، خدمات و ...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="892:969">
                جستجو در هنرمندان، برنامه‌های رشد، خدمات و ...
              </p>
              <div className="fg-c55cd499f6" data-node-id="892:970" data-name="search">
                <div className="fg-0bb5547f93" data-node-id="892:1314" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/1d6399f8.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="892:972">
              لیست درخواست‌های خدمات سیستم
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="892:973" data-name="Scrollable Content Area 5">
          <div className="fg-867b1b2e34" data-node-id="892:974" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:975" data-name="Metric Shortcut" label="۴۸ مورد کل درخواست‌های جاری" destination="service-requests">
              <p className="fg-5061c0f8a0" dir="auto" data-node-id="892:976">
                ۴۸ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:977">
                کل درخواست‌های جاری
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:978" data-name="Metric Shortcut" label="۱۵ مورد در انتظار بررسی" destination="product-review-queue">
              <p className="fg-c9547361f2" dir="auto" data-node-id="892:979">
                ۱۵ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:980">
                در انتظار بررسی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:981" data-name="Metric Shortcut" label="۱۲ مورد در حال انجام" destination="service-requests">
              <p className="fg-f4472f86ce" dir="auto" data-node-id="892:982">
                ۱۲ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:983">
                در حال انجام
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="892:984" data-name="Metric Shortcut" label="۲۱ مورد تکمیل شده این ماه" destination="service-requests">
              <p className="fg-bdab2c756d" dir="auto" data-node-id="892:985">
                ۲۱ مورد
              </p>
              <p className="fg-8f2e8dbd17" dir="auto" data-node-id="892:986">
                تکمیل شده این ماه
              </p>
            </DesignAction>
          </div>
          <div className="fg-89c5c241e8" data-node-id="892:987" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="892:988" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="892:989" data-name="Frame">
                <div className="fg-a3b2a587b5" data-node-id="892:990" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="892:991">
                    نوع خدمت (همه)
                  </p>
                </div>
                <div className="fg-a3b2a587b5" data-node-id="892:992" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="892:993">
                    وضعیت درخواست (باز)
                  </p>
                </div>
              </div>
              <DesignField className="fg-8fa0f7fc5c" data-node-id="892:994" data-name="Search Input" label="جستجو" placeholder="جستجو در خدمات...">
                <p className="fg-f68c5e162d" dir="auto" data-node-id="892:995">
                  جستجو در خدمات...
                </p>
              </DesignField>
            </div>
          </div>
          <div className="fg-a1f410f2dc" data-node-id="892:996" data-name="Worklist Section">
            <p className="fg-5f8b9f0bac" dir="auto" data-node-id="892:997">
              لیست تفصیلی درخواست‌های ارتقای توانمندی
            </p>
            <div className="fg-cb667e7a05" data-node-id="892:998" data-name="Table Wrapper">
              <div className="fg-5a60ba4653" data-node-id="892:999" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="892:1000">
                  اقدام
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="892:1001">
                  شریک خدمات
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="892:1002">
                  وضعیت درخواست
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="892:1003">
                  وضعیت سهمیه
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="892:1004">
                  تاریخ درخواست
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="892:1005">
                  نوع خدمت
                </p>
                <p className="fg-c30e166dd2" dir="auto" data-node-id="892:1006">
                  هنرمند
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="892:1007">
                  شناسه
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="892:1008" data-name="Table Body">
                <div className="fg-4f547a8b42" data-node-id="892:1009" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1010" data-name="Col Action" label="بررسی" destination="service-request-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="892:1011">
                      بررسی
                    </p>
                  </DesignAction>
                  <p className="fg-c93931428a" dir="auto" data-node-id="892:1012">
                    تخصیص نشده
                  </p>
                  <div className="fg-82303a202c" data-node-id="892:1013" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="892:1014" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="892:1015">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <p className="fg-1a83b0c863" dir="auto" data-node-id="892:1016">
                    سهمیه حرفه‌ای
                  </p>
                  <p className="fg-411821570a" data-node-id="892:1017">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1018">
                    عکاسی صنعتی
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1019">
                    زهرا کریمی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:1020">
                    SRV-1002
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:1021" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1022" data-name="Col Action" label="پیگیری">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="892:1023">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-ce205855af" dir="auto" data-node-id="892:1024">
                    مدرسه نگارین
                  </p>
                  <div className="fg-82303a202c" data-node-id="892:1025" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="892:1026" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="892:1027">
                        در حال انجام
                      </p>
                    </div>
                  </div>
                  <p className="fg-1a83b0c863" dir="auto" data-node-id="892:1028">
                    سهمیه پایه
                  </p>
                  <p className="fg-411821570a" data-node-id="892:1029">
                    ۱۴۰۲/۱۰/۱۲
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1030">
                    آموزش پیشرفته
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1031">
                    علی علوی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:1032">
                    SRV-1003
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:1033" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1034" data-name="Col Action" label="مشاهده" destination="service-request-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="892:1035">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-ce205855af" dir="auto" data-node-id="892:1036">
                    استودیو نوین
                  </p>
                  <div className="fg-82303a202c" data-node-id="892:1037" data-name="Frame">
                    <div className="fg-e6bf96a33c" data-node-id="892:1038" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="892:1039">
                        تکمیل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-1a83b0c863" dir="auto" data-node-id="892:1040">
                    سهمیه ویژه
                  </p>
                  <p className="fg-411821570a" data-node-id="892:1041">
                    ۱۴۰۲/۱۰/۱۰
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1042">
                    طراحی بسته‌بندی
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1043">
                    سارا احمدی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:1044">
                    SRV-1004
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:1045" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1046" data-name="Col Action" label="تخصیص" destination="service-assignment">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="892:1047">
                      تخصیص
                    </p>
                  </DesignAction>
                  <p className="fg-c93931428a" dir="auto" data-node-id="892:1048">
                    تخصیص نشده
                  </p>
                  <div className="fg-82303a202c" data-node-id="892:1049" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="892:1050" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="892:1051">
                        در انتظار تخصیص
                      </p>
                    </div>
                  </div>
                  <p className="fg-1a83b0c863" dir="auto" data-node-id="892:1052">
                    سهمیه حرفه‌ای
                  </p>
                  <p className="fg-411821570a" data-node-id="892:1053">
                    ۱۴۰۲/۱۰/۰۹
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1054">
                    تولید محتوا
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1055">
                    مریم حسینی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:1056">
                    SRV-1005
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:1057" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1058" data-name="Col Action" label="مشاهده" destination="service-request-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="892:1059">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-c93931428a" dir="auto" data-node-id="892:1060">
                    تخصیص نشده
                  </p>
                  <div className="fg-82303a202c" data-node-id="892:1061" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="892:1062" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="892:1063">
                        رد شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-1a83b0c863" dir="auto" data-node-id="892:1064">
                    بدون سهمیه
                  </p>
                  <p className="fg-411821570a" data-node-id="892:1065">
                    ۱۴۰۲/۱۰/۰۸
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1066">
                    طراحی بسته‌بندی
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1067">
                    حمید رضا رضایی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:1068">
                    SRV-1006
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:1069" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1070" data-name="Col Action" label="مشاهده" destination="service-request-detail">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="892:1071">
                      مشاهده
                    </p>
                  </DesignAction>
                  <p className="fg-ce205855af" dir="auto" data-node-id="892:1072">
                    استودیو نوین
                  </p>
                  <div className="fg-82303a202c" data-node-id="892:1073" data-name="Frame">
                    <div className="fg-e6bf96a33c" data-node-id="892:1074" data-name="Badge">
                      <p className="fg-f412706158" dir="auto" data-node-id="892:1075">
                        تکمیل شده
                      </p>
                    </div>
                  </div>
                  <p className="fg-1a83b0c863" dir="auto" data-node-id="892:1076">
                    سهمیه ویژه
                  </p>
                  <p className="fg-411821570a" data-node-id="892:1077">
                    ۱۴۰۲/۱۰/۰۵
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1078">
                    عکاسی صنعتی
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1079">
                    نیلوفر عباسی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:1080">
                    SRV-1007
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="892:1081" data-name="Table Row">
                  <DesignAction className="fg-1fbe046d7b" data-node-id="892:1082" data-name="Col Action" label="پیگیری">
                    <p className="fg-ea96f18f60" dir="auto" data-node-id="892:1083">
                      پیگیری
                    </p>
                  </DesignAction>
                  <p className="fg-ce205855af" dir="auto" data-node-id="892:1084">
                    مدرسه نگارین
                  </p>
                  <div className="fg-82303a202c" data-node-id="892:1085" data-name="Frame">
                    <div className="fg-f858729e81" data-node-id="892:1086" data-name="Badge">
                      <p className="fg-024e3e4169" dir="auto" data-node-id="892:1087">
                        در حال انجام
                      </p>
                    </div>
                  </div>
                  <p className="fg-1a83b0c863" dir="auto" data-node-id="892:1088">
                    سهمیه پایه
                  </p>
                  <p className="fg-411821570a" data-node-id="892:1089">
                    ۱۴۰۲/۱۰/۰۳
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1090">
                    آموزش پیشرفته
                  </p>
                  <p className="fg-e023ff4ca7" dir="auto" data-node-id="892:1091">
                    امیر تهرانی
                  </p>
                  <p className="fg-4b2855593f" data-node-id="892:1092">
                    SRV-1008
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="892:1093" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="892:1094" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="892:1095">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="892:1096" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="892:1097" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="892:1098" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="892:1099" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c55cd499f6" data-node-id="892:1100" data-name="Android / Mobile Signal">
              <div className="fg-169610c3a2" data-node-id="892:1317" data-name="Android / Mobile Signal">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="892:1102">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="892:1103" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="892:1104" data-name="Group-0">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1105" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-0a9542d889" data-node-id="892:1106" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1320" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1108">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="892:1109" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="892:1110" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-0a9542d889" data-node-id="892:1111" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1323" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1113">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1114" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1115" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-0a9542d889" data-node-id="892:1116" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1326" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1118">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1119" data-name="Group-3">
              <DesignAction className="fg-fcc641ace6" data-node-id="892:1120" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-0a9542d889" data-node-id="892:1121" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1329" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="892:1123">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1124" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1125" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-0a9542d889" data-node-id="892:1126" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1332" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1128">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1129" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1130" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-0a9542d889" data-node-id="892:1131" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1335" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1133">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1134" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="892:1135" data-name="Group Header">
                <div className="fg-0a9542d889" data-node-id="892:1136" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1338" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1138">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1139" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1140" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-0a9542d889" data-node-id="892:1141" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1341" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1143">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="892:1144" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="892:1145" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-0a9542d889" data-node-id="892:1146" data-name="chevron-down">
                  <div className="fg-6c085e001e" data-node-id="892:1344" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="892:1148">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="892:1149" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="892:1150" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="892:1151">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="892:1152">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="892:1153" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/6dbc1d24.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
