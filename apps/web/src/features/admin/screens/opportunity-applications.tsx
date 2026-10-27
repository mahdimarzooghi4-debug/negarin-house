// Figma 894:1169 — Admin / Opportunity Applications — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminOpportunityApplicationsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="894:1169" data-name="Admin / Opportunity Applications — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="894:1170" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="894:1171" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="894:1172" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="894:1173" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/171646b8.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="894:1174" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="894:1175" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-87f65ec773" data-node-id="894:1176" data-name="bell">
                <div className="fg-0bb5547f93" data-node-id="894:1917" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/03ae448d.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="894:1178" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="894:1179" data-name="Global Search" label="جستجو" placeholder="جستجو در فرصت‌ها، هنرمندان و ...">
              <p className="fg-72b13cff4d" dir="auto" data-node-id="894:1180">
                جستجو در فرصت‌ها، هنرمندان و ...
              </p>
              <div className="fg-c55cd499f6" data-node-id="894:1181" data-name="search">
                <div className="fg-0bb5547f93" data-node-id="894:1920" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/1d6399f8.svg" />
                </div>
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="894:1183">
              درخواست‌های فرصت نگارین
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="894:1184" data-name="Scrollable Content">
          <div className="fg-787154cfd0" data-node-id="894:1185" data-name="Breadcrumbs">
            <div className="fg-98b2f2b29d" data-node-id="894:1186" data-name="Frame">
              <p className="fg-8fc2866737" dir="auto" data-node-id="894:1187">
                درخواست‌ها
              </p>
              <p className="fg-58d61dbfc5" data-node-id="894:1188">{`<`}</p>
            </div>
            <div className="fg-54b45105c3" data-node-id="894:1189" data-name="Frame">
              <p className="fg-e0a2bb2a5c" data-node-id="894:1190">
                OPP-1024
              </p>
              <p className="fg-95fadf4847" data-node-id="894:1191">{`<`}</p>
            </div>
            <div className="fg-e8210ba625" data-node-id="894:1192" data-name="Frame">
              <p className="fg-8de26e16c8" dir="auto" data-node-id="894:1193">
                فرصت‌ها
              </p>
            </div>
          </div>
          <div className="fg-867b1b2e34" data-node-id="894:1194" data-name="Operational Summary">
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:1195" data-name="Metric Shortcut" label="۳ در انتظار بررسی" destination="product-review-queue">
              <p className="fg-c9547361f2" data-node-id="894:1196">
                ۳
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:1197">
                در انتظار بررسی
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:1198" data-name="Metric Shortcut" label="۱ رد شده" destination="service-requests">
              <p className="fg-73ab430732" data-node-id="894:1199">
                ۱
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:1200">
                رد شده
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:1201" data-name="Metric Shortcut" label="۸ واجد شرایط" destination="service-requests">
              <p className="fg-bdab2c756d" data-node-id="894:1202">
                ۸
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:1203">
                واجد شرایط
              </p>
            </DesignAction>
            <DesignAction className="fg-89dbc7beb5" data-node-id="894:1204" data-name="Metric Shortcut" label="۱۲ کل درخواست‌ها" destination="service-requests">
              <p className="fg-5061c0f8a0" data-node-id="894:1205">
                ۱۲
              </p>
              <p className="fg-e13e713556" dir="auto" data-node-id="894:1206">
                کل درخواست‌ها
              </p>
            </DesignAction>
          </div>
          <div className="fg-b7fb0ce9ee" data-node-id="894:1207" data-name="Filters Row">
            <div className="fg-c96fe10678" data-node-id="894:1208" data-name="Filter Content">
              <div className="fg-9708e8d183" data-node-id="894:1209" data-name="Interactive Filter Badges">
                <div className="fg-4688866a31" data-node-id="894:1210" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:1211">
                    وضعیت درخواست: همه
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:1212" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:1213">
                    سطح رشد: همه
                  </p>
                </div>
                <div className="fg-4688866a31" data-node-id="894:1214" data-name="Filter">
                  <p className="fg-899c8bd72f" dir="auto" data-node-id="894:1215">
                    وضعیت تطبیق: همه
                  </p>
                </div>
              </div>
              <div className="fg-8c27ae93a2" data-node-id="894:1216" data-name="Search Input Container">
                <p className="fg-f68c5e162d" dir="auto" data-node-id="894:1217">
                  جستجوی هنرمند...
                </p>
              </div>
            </div>
          </div>
          <div className="fg-a1f410f2dc" data-node-id="894:1218" data-name="Worklist Section">
            <p className="fg-4f3073a855" dir="auto" data-node-id="894:1219">
              لیست درخواست‌های دریافتی
            </p>
            <div className="fg-ceebe80a1f" data-node-id="894:1220" data-name="Table Wrapper">
              <div className="fg-6c8ad47165" data-node-id="894:1221" data-name="Table Header Row">
                <p className="fg-fa0d4d9a92" dir="auto" data-node-id="894:1222">
                  اقدام
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:1223">
                  وضعیت تطبیق
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:1224">
                  وضعیت درخواست
                </p>
                <p className="fg-e2cdd0cb7a" dir="auto" data-node-id="894:1225">
                  وضعیت واجد شرایط
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="894:1226">
                  سطح رشد
                </p>
                <p className="fg-8d481b53ec" dir="auto" data-node-id="894:1227">
                  تاریخ درخواست
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="894:1228">
                  هنرمند
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="894:1229" data-name="Table Body">
                <div className="fg-1c3fd25193" data-node-id="894:1230" data-name="Table Row">
                  <div className="fg-1fbe046d7b" data-node-id="894:1231" data-name="Frame">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:1232">
                      بررسی
                    </p>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:1233">
                    تطبیق نشده
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:1234" data-name="Frame">
                    <div className="fg-b121f56fe2" data-node-id="894:1235" data-name="Badge">
                      <p className="fg-8357c38e8d" dir="auto" data-node-id="894:1236">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="894:1237" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1238" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1239">
                        واجد شرایط
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:1240" data-name="Frame">
                    <div className="fg-a84a6d5394" data-node-id="894:1241" data-name="Badge">
                      <p className="fg-ae3a1d36e3" dir="auto" data-node-id="894:1242">
                        شکوفه
                      </p>
                    </div>
                  </div>
                  <p className="fg-4238471968" data-node-id="894:1243">
                    ۱۴۰۲/۱۰/۰۶
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1244" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1245">
                      ART-1092
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1246">
                      زهرا کریمی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1247" data-name="Table Row">
                  <div className="fg-1fbe046d7b" data-node-id="894:1248" data-name="Frame">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:1249">
                      بررسی
                    </p>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:1250">
                    تطبیق شده
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:1251" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1252" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1253">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="894:1254" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1255" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1256">
                        واجد شرایط
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:1257" data-name="Frame">
                    <div className="fg-72f83005ac" data-node-id="894:1258" data-name="Badge">
                      <p className="fg-f19c552b5e" dir="auto" data-node-id="894:1259">
                        سرو زرین
                      </p>
                    </div>
                  </div>
                  <p className="fg-4238471968" data-node-id="894:1260">
                    ۱۴۰۲/۱۰/۰۷
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1261" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1262">
                      ART-1104
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1263">
                      محمد محسنی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1264" data-name="Table Row">
                  <div className="fg-1fbe046d7b" data-node-id="894:1265" data-name="Frame">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:1266">
                      بررسی
                    </p>
                  </div>
                  <p className="fg-57209d77cd" data-node-id="894:1267">
                    —
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:1268" data-name="Frame">
                    <div className="fg-f5a735ebf8" data-node-id="894:1269" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="894:1270">
                        رد شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="894:1271" data-name="Frame">
                    <div className="fg-f5a735ebf8" data-node-id="894:1272" data-name="Badge">
                      <p className="fg-415f50ee1d" dir="auto" data-node-id="894:1273">
                        عدم تطابق
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:1274" data-name="Frame">
                    <div className="fg-b121f56fe2" data-node-id="894:1275" data-name="Badge">
                      <p className="fg-e8a87bbeef" dir="auto" data-node-id="894:1276">
                        جوانه
                      </p>
                    </div>
                  </div>
                  <p className="fg-4238471968" data-node-id="894:1277">
                    ۱۴۰۲/۱۰/۰۸
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1278" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1279">
                      ART-1051
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1280">
                      علی علوی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1281" data-name="Table Row">
                  <div className="fg-1fbe046d7b" data-node-id="894:1282" data-name="Frame">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:1283">
                      بررسی
                    </p>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:1284">
                    تطبیق شده
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:1285" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1286" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1287">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="894:1288" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1289" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1290">
                        واجد شرایط
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:1291" data-name="Frame">
                    <div className="fg-e6867ec637" data-node-id="894:1292" data-name="Badge">
                      <p className="fg-0199d7f0d5" dir="auto" data-node-id="894:1293">
                        سفیر جهانی
                      </p>
                    </div>
                  </div>
                  <p className="fg-4238471968" data-node-id="894:1294">
                    ۱۴۰۲/۱۰/۰۸
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1295" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1296">
                      ART-1212
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1297">
                      مریم رضایی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1298" data-name="Table Row">
                  <div className="fg-1fbe046d7b" data-node-id="894:1299" data-name="Frame">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:1300">
                      بررسی
                    </p>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:1301">
                    تطبیق نشده
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:1302" data-name="Frame">
                    <div className="fg-b121f56fe2" data-node-id="894:1303" data-name="Badge">
                      <p className="fg-8357c38e8d" dir="auto" data-node-id="894:1304">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="894:1305" data-name="Frame">
                    <div className="fg-b121f56fe2" data-node-id="894:1306" data-name="Badge">
                      <p className="fg-8357c38e8d" dir="auto" data-node-id="894:1307">
                        بررسی نشده
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:1308" data-name="Frame">
                    <div className="fg-b121f56fe2" data-node-id="894:1309" data-name="Badge">
                      <p className="fg-e8a87bbeef" dir="auto" data-node-id="894:1310">
                        جوانه
                      </p>
                    </div>
                  </div>
                  <p className="fg-4238471968" data-node-id="894:1311">
                    ۱۴۰۲/۱۰/۰۹
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1312" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1313">
                      ART-1033
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1314">
                      رضا احمدی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1315" data-name="Table Row">
                  <div className="fg-1fbe046d7b" data-node-id="894:1316" data-name="Frame">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:1317">
                      بررسی
                    </p>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:1318">
                    تطبیق نشده
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:1319" data-name="Frame">
                    <div className="fg-b121f56fe2" data-node-id="894:1320" data-name="Badge">
                      <p className="fg-8357c38e8d" dir="auto" data-node-id="894:1321">
                        در انتظار بررسی
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="894:1322" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1323" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1324">
                        واجد شرایط
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:1325" data-name="Frame">
                    <div className="fg-a84a6d5394" data-node-id="894:1326" data-name="Badge">
                      <p className="fg-ae3a1d36e3" dir="auto" data-node-id="894:1327">
                        شکوفه
                      </p>
                    </div>
                  </div>
                  <p className="fg-4238471968" data-node-id="894:1328">
                    ۱۴۰۲/۱۰/۱۰
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1329" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1330">
                      ART-1154
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1331">
                      فاطمه حسینی
                    </p>
                  </div>
                </div>
                <div className="fg-1c3fd25193" data-node-id="894:1332" data-name="Table Row">
                  <div className="fg-1fbe046d7b" data-node-id="894:1333" data-name="Frame">
                    <p className="fg-19ad7f67c4" dir="auto" data-node-id="894:1334">
                      بررسی
                    </p>
                  </div>
                  <p className="fg-57209d77cd" dir="auto" data-node-id="894:1335">
                    تطبیق شده
                  </p>
                  <div className="fg-82303a202c" data-node-id="894:1336" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1337" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1338">
                        تأیید شده
                      </p>
                    </div>
                  </div>
                  <div className="fg-82303a202c" data-node-id="894:1339" data-name="Frame">
                    <div className="fg-489a397814" data-node-id="894:1340" data-name="Badge">
                      <p className="fg-5daf48ad35" dir="auto" data-node-id="894:1341">
                        واجد شرایط
                      </p>
                    </div>
                  </div>
                  <div className="fg-bf03e2ee0f" data-node-id="894:1342" data-name="Frame">
                    <div className="fg-72f83005ac" data-node-id="894:1343" data-name="Badge">
                      <p className="fg-f19c552b5e" dir="auto" data-node-id="894:1344">
                        سرو زرین
                      </p>
                    </div>
                  </div>
                  <p className="fg-4238471968" data-node-id="894:1345">
                    ۱۴۰۲/۱۰/۱۱
                  </p>
                  <div className="fg-aee6f31316" data-node-id="894:1346" data-name="Frame">
                    <p className="fg-58d61dbfc5" data-node-id="894:1347">
                      ART-1088
                    </p>
                    <p className="fg-8fc2866737" dir="auto" data-node-id="894:1348">
                      امیر کاظمی
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="894:1349" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="894:1350" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="894:1351">
            خانه نگارین
          </p>
          <div className="fg-bb3f247d9d" data-node-id="894:1352" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:251" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-6803f66aba" data-node-id="894:1354" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="894:1355" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-0a9542d889" data-node-id="894:1356" data-name="chevron-left">
              <div className="fg-0bb5547f93" data-node-id="894:1923" data-name="chevron-left">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/4c0815cf.svg" />
              </div>
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="894:1358">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-c1bc7f9234" data-node-id="894:1359" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="894:1360" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1361" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-0a9542d889" data-node-id="894:1362" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1926" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1364">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="894:1365" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="894:1366" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-0a9542d889" data-node-id="894:1367" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1929" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1369">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1370" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1371" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-0a9542d889" data-node-id="894:1372" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1932" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1374">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1375" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1376" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-0a9542d889" data-node-id="894:1377" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1935" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1379">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1380" data-name="Group-4">
              <DesignAction className="fg-9dda82322e" data-node-id="894:1381" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-0a9542d889" data-node-id="894:1382" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1938" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/e8fe059c.svg" />
                  </div>
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="894:1384">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1385" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1386" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-0a9542d889" data-node-id="894:1387" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1941" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1389">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1390" data-name="Group-6">
              <div className="fg-c7482c92d9" data-node-id="894:1391" data-name="Group Header">
                <div className="fg-0a9542d889" data-node-id="894:1392" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1944" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1394">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1395" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1396" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-0a9542d889" data-node-id="894:1397" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1947" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1399">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="894:1400" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="894:1401" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-0a9542d889" data-node-id="894:1402" data-name="chevron-down">
                  <div className="fg-0bb5547f93" data-node-id="894:1950" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/admin-assets/4bbcd4ca.svg" />
                  </div>
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="894:1404">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-20fc7845ff" data-node-id="894:1405" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="894:1406" data-name="Profile Details">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="894:1407">
              کارشناس عملیات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="894:1408">
              مدیر عملیات سیستم
            </p>
          </div>
          <div className="fg-e409306ac6" data-node-id="894:1409" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/24ccb891.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
