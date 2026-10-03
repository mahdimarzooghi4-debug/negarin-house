// Figma 884:960 — Admin / Professional Credentials — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminProfessionalCredentialsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="884:960" data-name="Admin / Professional Credentials — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="884:961" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="884:962" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="884:963" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="884:964" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/9c6eb95b.png" />
            </div>
            <DesignAction className="fg-328252374d" data-node-id="884:965" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="884:966" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-87f65ec773" data-node-id="884:967" data-name="bell">
                <div className="fg-ad11617f24" data-node-id="884:1657" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/bc212c1c.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="884:969" data-name="Right Header">
            <DesignField className="fg-9ce4e1a1a3" data-node-id="884:970" data-name="Global Search" label="جستجو" placeholder="جستجو در مدارک...">
              <p className="fg-f68c5e162d" dir="auto" data-node-id="884:971">
                جستجو در مدارک...
              </p>
              <div className="fg-c55cd499f6" data-node-id="884:972" data-name="search">
                <div className="fg-a0cc0c55d5" data-node-id="884:1660" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/6c8a56a3.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-5330a4ecde" dir="auto" data-node-id="884:974">
              مدارک حرفه‌ای
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="884:975" data-name="Scrollable Content">
          <div className="fg-89c5c241e8" data-node-id="884:976" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="884:977" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="884:978" data-name="Frame">
                <div className="fg-db56c86ccf" data-node-id="884:979" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="884:980">
                    بازه زمانی
                  </p>
                </div>
                <div className="fg-db56c86ccf" data-node-id="884:981" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="884:982">
                    نیازمند اقدام
                  </p>
                </div>
                <div className="fg-db56c86ccf" data-node-id="884:983" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="884:984">
                    نوع مدرک
                  </p>
                </div>
                <div className="fg-db56c86ccf" data-node-id="884:985" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="884:986">
                    وضعیت مدرک
                  </p>
                </div>
              </div>
              <div className="fg-e8210ba625" data-node-id="884:987" data-name="Frame">
                <DesignField className="fg-8fa0f7fc5c" data-node-id="884:988" data-name="Search Input" label="جستجو" placeholder="جستجو در مدارک...">
                  <p className="fg-f68c5e162d" dir="auto" data-node-id="884:989">
                    جستجو در مدارک...
                  </p>
                </DesignField>
              </div>
            </div>
          </div>
          <div className="fg-f308a76a7e" data-node-id="884:990" data-name="Table Card">
            <div className="fg-5a60ba4653" data-node-id="884:991" data-name="Table Header Row">
              <p className="fg-fa0d4d9a92" dir="auto" data-node-id="884:992">
                اقدام
              </p>
              <p className="fg-44d10f1b20" dir="auto" data-node-id="884:993">
                نیازمند اقدام
              </p>
              <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="884:994">
                مسئول بررسی
              </p>
              <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="884:995">
                وضعیت
              </p>
              <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="884:996">
                تاریخ ارسال
              </p>
              <p className="fg-5fa1cff2ec" dir="auto" data-node-id="884:997">
                عنوان مدرک / ارسال
              </p>
              <p className="fg-7bce7dd075" dir="auto" data-node-id="884:998">
                هنرمند
              </p>
            </div>
            <div className="fg-e16ac02b64" data-node-id="884:999" data-name="Table Body">
              <div className="fg-4f547a8b42" data-node-id="884:1000" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:1001" data-name="Col Action" label="بررسی" destination="credential-review">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:1002">
                    بررسی
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:1003" data-name="Col Action Required">
                  <div className="fg-f858729e81" data-node-id="884:1004" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:1005">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-bd7db83059" dir="auto" data-node-id="884:1006">
                  تخصیص نشده
                </p>
                <div className="fg-82303a202c" data-node-id="884:1007" data-name="Col Status">
                  <div className="fg-6e2aeb8423" data-node-id="884:1008" data-name="Frame">
                    <p className="fg-a3692aa1db" dir="auto" data-node-id="884:1009">
                      ارسال شده
                    </p>
                  </div>
                </div>
                <p className="fg-411821570a" data-node-id="884:1010">
                  ۱۴۰۲/۰۸/۱۰
                </p>
                <p className="fg-7c9aad097a" dir="auto" data-node-id="884:1011">
                  گواهی درجه ۲ صنایع دستی
                </p>
                <div className="fg-f0fe28d95a" data-node-id="884:1012" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:1013">
                    زهرا کریمی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:1014">
                    ART-1092
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:1015" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:1016" data-name="Col Action" label="بررسی" destination="credential-review">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:1017">
                    بررسی
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:1018" data-name="Col Action Required">
                  <div className="fg-f858729e81" data-node-id="884:1019" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:1020">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-bd7db83059" dir="auto" data-node-id="884:1021">
                  کارشناس عملیات
                </p>
                <div className="fg-82303a202c" data-node-id="884:1022" data-name="Col Status">
                  <div className="fg-f858729e81" data-node-id="884:1023" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:1024">
                      در حال بررسی
                    </p>
                  </div>
                </div>
                <p className="fg-411821570a" data-node-id="884:1025">
                  ۱۴۰۲/۰۸/۱۲
                </p>
                <p className="fg-7c9aad097a" dir="auto" data-node-id="884:1026">
                  جواز تأسیس کارگاه خانگی
                </p>
                <div className="fg-f0fe28d95a" data-node-id="884:1027" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:1028">
                    علی علوی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:1029">
                    ART-1045
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:1030" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:1031" data-name="Col Action" label="بررسی" destination="credential-review">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:1032">
                    بررسی
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:1033" data-name="Col Action Required">
                  <div className="fg-f858729e81" data-node-id="884:1034" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:1035">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-bd7db83059" dir="auto" data-node-id="884:1036">
                  تخصیص نشده
                </p>
                <div className="fg-82303a202c" data-node-id="884:1037" data-name="Col Status">
                  <div className="fg-6e2aeb8423" data-node-id="884:1038" data-name="Frame">
                    <p className="fg-a3692aa1db" dir="auto" data-node-id="884:1039">
                      ارسال شده
                    </p>
                  </div>
                </div>
                <p className="fg-411821570a" data-node-id="884:1040">
                  ۱۴۰۲/۰۸/۱۴
                </p>
                <p className="fg-7c9aad097a" dir="auto" data-node-id="884:1041">
                  گواهینامه آموزشی طراحی سنتی
                </p>
                <div className="fg-f0fe28d95a" data-node-id="884:1042" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:1043">
                    مریم حسینی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:1044">
                    ART-2051
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:1045" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:1046" data-name="Col Action" label="بررسی" destination="credential-review">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:1047">
                    بررسی
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:1048" data-name="Col Action Required">
                  <div className="fg-e5d563b780" data-node-id="884:1049" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="884:1050">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-bd7db83059" dir="auto" data-node-id="884:1051">
                  کارشناس عملیات
                </p>
                <div className="fg-82303a202c" data-node-id="884:1052" data-name="Col Status">
                  <div className="fg-e6bf96a33c" data-node-id="884:1053" data-name="Frame">
                    <p className="fg-f412706158" dir="auto" data-node-id="884:1054">
                      تأیید شده
                    </p>
                  </div>
                </div>
                <p className="fg-411821570a" data-node-id="884:1055">
                  ۱۴۰۲/۰۸/۱۵
                </p>
                <p className="fg-7c9aad097a" dir="auto" data-node-id="884:1056">
                  پروانه فعالیت هنری همجوشی شیشه
                </p>
                <div className="fg-f0fe28d95a" data-node-id="884:1057" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:1058">
                    رضا رضایی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:1059">
                    ART-1984
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:1060" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:1061" data-name="Col Action" label="بررسی" destination="credential-review">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:1062">
                    بررسی
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:1063" data-name="Col Action Required">
                  <div className="fg-e5d563b780" data-node-id="884:1064" data-name="Frame">
                    <p className="fg-1636b45c60" dir="auto" data-node-id="884:1065">
                      خیر
                    </p>
                  </div>
                </div>
                <p className="fg-bd7db83059" dir="auto" data-node-id="884:1066">
                  کارشناس عملیات
                </p>
                <div className="fg-82303a202c" data-node-id="884:1067" data-name="Col Status">
                  <div className="fg-f5a735ebf8" data-node-id="884:1068" data-name="Frame">
                    <p className="fg-415f50ee1d" dir="auto" data-node-id="884:1069">
                      نیازمند اصلاح
                    </p>
                  </div>
                </div>
                <p className="fg-411821570a" data-node-id="884:1070">
                  ۱۴۰۲/۰۸/۱۶
                </p>
                <p className="fg-7c9aad097a" dir="auto" data-node-id="884:1071">
                  جواز تأسیس کارگاه صنایع دستی
                </p>
                <div className="fg-f0fe28d95a" data-node-id="884:1072" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:1073">
                    فاطمه معتمد
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:1074">
                    ART-2114
                  </p>
                </div>
              </div>
              <div className="fg-4f547a8b42" data-node-id="884:1075" data-name="Table Row">
                <DesignAction className="fg-1fbe046d7b" data-node-id="884:1076" data-name="Col Action" label="بررسی" destination="credential-review">
                  <p className="fg-daa786dbb1" dir="auto" data-node-id="884:1077">
                    بررسی
                  </p>
                </DesignAction>
                <div className="fg-bf03e2ee0f" data-node-id="884:1078" data-name="Col Action Required">
                  <div className="fg-f858729e81" data-node-id="884:1079" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:1080">
                      بله
                    </p>
                  </div>
                </div>
                <p className="fg-bd7db83059" dir="auto" data-node-id="884:1081">
                  کارشناس عملیات
                </p>
                <div className="fg-82303a202c" data-node-id="884:1082" data-name="Col Status">
                  <div className="fg-f858729e81" data-node-id="884:1083" data-name="Frame">
                    <p className="fg-024e3e4169" dir="auto" data-node-id="884:1084">
                      در حال بررسی
                    </p>
                  </div>
                </div>
                <p className="fg-411821570a" data-node-id="884:1085">
                  ۱۴۰۲/۰۸/۱۷
                </p>
                <p className="fg-7c9aad097a" dir="auto" data-node-id="884:1086">
                  کارت شناسایی صنعتگری منبت
                </p>
                <div className="fg-f0fe28d95a" data-node-id="884:1087" data-name="Col Artist">
                  <p className="fg-e798a14019" dir="auto" data-node-id="884:1088">
                    سارا محمدی
                  </p>
                  <p className="fg-7f846ac2e7" data-node-id="884:1089">
                    ART-1240
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-c87bdb284a" data-node-id="884:1090" data-name="Pagination">
              <div className="fg-92b7da7864" data-node-id="884:1091" data-name="Frame">
                <div className="fg-480aeaca9c" data-node-id="884:1092" data-name="Frame">
                  <p className="fg-934ca87244" dir="auto" data-node-id="884:1093">
                    قبلی
                  </p>
                </div>
                <div className="fg-f2c3587a20" data-node-id="884:1094" data-name="Frame">
                  <p className="fg-05ebd28202" data-node-id="884:1095">
                    ۱
                  </p>
                </div>
                <div className="fg-fef640a389" data-node-id="884:1096" data-name="Frame">
                  <p className="fg-899c8bd72f" data-node-id="884:1097">
                    ۲
                  </p>
                </div>
                <div className="fg-480aeaca9c" data-node-id="884:1098" data-name="Frame">
                  <p className="fg-934ca87244" dir="auto" data-node-id="884:1099">
                    بعدی
                  </p>
                </div>
              </div>
              <p className="fg-899c8bd72f" dir="auto" data-node-id="884:1100">
                نمایش ۱ تا ۶ از ۲۴ پرونده مدارک
              </p>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="884:1101" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="884:1102" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="884:1103">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="884:1104" data-name="Logo Container">
            <div className="fg-f84de76785" data-node-id="884:1105" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-6296272086" src="/admin-assets/530a0f8f.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="884:1106" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="884:1107" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="884:1804" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="884:1109">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="884:1110" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="884:1111" data-name="Group-0">
              <DesignAction className="fg-fcc641ace6" data-node-id="884:1112" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-0a9542d889" data-node-id="884:1113" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1663" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/818ca440.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="884:1115">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="884:1116" data-name="Group-1">
              <DesignAction className="fg-ca8b7daf93" data-node-id="884:1117" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-0a9542d889" data-node-id="884:1118" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1666" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/3669d33e.svg" />
                  </div>
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="884:1120">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:1121" data-name="Group-2">
              <DesignAction className="fg-9e3538324e" data-node-id="884:1122" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-0a9542d889" data-node-id="884:1123" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1669" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/ae9780f0.svg" />
                  </div>
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="884:1125">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:1126" data-name="Group-3">
              <DesignAction className="fg-9e3538324e" data-node-id="884:1127" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-0a9542d889" data-node-id="884:1128" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1672" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/18c0daac.svg" />
                  </div>
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="884:1130">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:1131" data-name="Group-4">
              <DesignAction className="fg-9e3538324e" data-node-id="884:1132" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-0a9542d889" data-node-id="884:1133" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1675" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/b7bfd496.svg" />
                  </div>
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="884:1135">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:1136" data-name="Group-5">
              <DesignAction className="fg-9e3538324e" data-node-id="884:1137" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-0a9542d889" data-node-id="884:1138" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1678" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/cd15e5ac.svg" />
                  </div>
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="884:1140">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:1141" data-name="Group-6">
              <div className="fg-9e3538324e" data-node-id="884:1142" data-name="Group Header">
                <div className="fg-0a9542d889" data-node-id="884:1143" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1681" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/0395b1d4.svg" />
                  </div>
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="884:1145">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:1146" data-name="Group-7">
              <DesignAction className="fg-9e3538324e" data-node-id="884:1147" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-0a9542d889" data-node-id="884:1148" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1684" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/46fdf61a.svg" />
                  </div>
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="884:1150">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="884:1151" data-name="Group-8">
              <DesignAction className="fg-9e3538324e" data-node-id="884:1152" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-0a9542d889" data-node-id="884:1153" data-name="chevron-down">
                  <div className="fg-f43d93deaa" data-node-id="884:1687" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/7e2e7078.svg" />
                  </div>
                </div>
                <p className="fg-4bd985e862" dir="auto" data-node-id="884:1155">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="884:1156" data-name="Staff Profile">
          <div className="fg-15b486e966" data-node-id="884:1157" data-name="Profile Details">
            <p className="fg-fe647e601f" dir="auto" data-node-id="884:1158">
              کارشناس عملیات
            </p>
            <p className="fg-a9d1c863d0" dir="auto" data-node-id="884:1159">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="884:1160" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/f489ddc3.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
