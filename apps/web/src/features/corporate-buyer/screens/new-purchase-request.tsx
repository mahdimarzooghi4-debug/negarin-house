// Figma 961:1109 — Corporate Buyer / New Purchase Request — Desktop
import { DesignField } from "../../artist/design-controls";
import { CorporateAction, CorporateSidebar } from "../corporate-controls";

export default function CorporateBuyerNewPurchaseRequestDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="961:1109" data-name="Corporate Buyer / New Purchase Request — Desktop">
      <div className="fg-c92c0aceed" data-node-id="961:1110" data-name="Frame">
        <div className="fg-15f4aa1b2d" data-node-id="961:1111" data-name="topbar">
          <div className="fg-a34c8fe932" data-node-id="961:1112" data-name="Frame">
            <div className="fg-842ae29a35" data-node-id="961:1113" data-name="Frame">
              <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/669dce3f.svg" />
            </div>
            <div className="fg-ad50363799" data-node-id="961:1115" data-name="Frame">
              <div className="fg-a214e008aa" data-node-id="961:1116" data-name="Frame">
                <p className="fg-75512d01b6" dir="auto" data-node-id="961:1117">
                  امیرحسین کریمی
                </p>
                <p className="fg-8c28c3d92c" dir="auto" data-node-id="961:1118">
                  مسئول خرید
                </p>
              </div>
              <div className="fg-88436b85ac" data-node-id="961:1119" data-name="Rectangle">
                <img alt="" className="fg-b440a5c4af" src="/corporate-buyer-assets/fd4c5bed.png" />
              </div>
            </div>
          </div>
          <p className="fg-35e98a7c03" dir="auto" data-node-id="961:1120">
            ثبت درخواست خرید
          </p>
        </div>
        <div className="fg-1353533246" data-node-id="961:1121" data-name="Frame">
          <div className="fg-3db3332c05" data-node-id="961:1122" data-name="Frame">
            <p className="fg-0d0a58ac52" dir="auto" data-node-id="961:1123">
              ثبت درخواست جدید
            </p>
            <p className="fg-d93ba30183" data-node-id="961:1124">{`<`}</p>
            <p className="fg-6463ebb9b1" dir="auto" data-node-id="961:1125">
              درخواست‌های خرید
            </p>
          </div>
          <div className="fg-85c069b329" data-node-id="961:1126" data-name="Frame">
            <div className="fg-f380acb1b8" data-node-id="961:1127" data-name="Frame">
              <div className="fg-c93a8f5cea" data-node-id="961:1128" data-name="Frame">
                <div className="fg-57ac4716f3" data-node-id="961:1129" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1130">
                    نوع درخواست
                  </p>
                  <DesignField className="fg-80928427a4" data-node-id="961:1131" data-name="Frame" label="نوع درخواست" placeholder="هدیه سازمانی">
                    <div className="fg-c51752dc8c" data-node-id="961:1473" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/4b33d813.svg" />
                    </div>
                    <p className="fg-1e7372bd06" dir="auto" data-node-id="961:1133">
                      هدیه سازمانی
                    </p>
                  </DesignField>
                </div>
                <div className="fg-57ac4716f3" data-node-id="961:1134" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1135">
                    عنوان درخواست
                  </p>
                  <DesignField className="fg-0ba8e8b93a" data-node-id="961:1136" data-name="Frame" label="عنوان درخواست" placeholder="مثال: تامین هدایای پایان سال">
                    <p className="fg-7fb392fed0" dir="auto" data-node-id="961:1137">
                      مثال: تامین هدایای پایان سال
                    </p>
                  </DesignField>
                </div>
              </div>
              <div className="fg-62f39da6b2" data-node-id="961:1138" data-name="Frame">
                <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1139">
                  شرح نیاز
                </p>
                <DesignField className="fg-ec8a9db7f3" data-node-id="961:1140" data-name="Frame" label="شرح نیاز" placeholder="جزئیات و کیفیت مورد نظر خود را توصیف کنید..." multiline>
                  <p className="fg-2e764d81dd" dir="auto" data-node-id="961:1141">
                    جزئیات و کیفیت مورد نظر خود را توصیف کنید...
                  </p>
                </DesignField>
              </div>
              <div className="fg-c93a8f5cea" data-node-id="961:1142" data-name="Frame">
                <div className="fg-57ac4716f3" data-node-id="961:1143" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1144">
                    تاریخ موردنیاز
                  </p>
                  <DesignField className="fg-80928427a4" data-node-id="961:1145" data-name="Frame" label="تاریخ موردنیاز" placeholder="انتخاب تاریخ">
                    <div className="fg-c51752dc8c" data-node-id="961:1476" data-name="calendar">
                      <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/0c06c886.svg" />
                    </div>
                    <p className="fg-7fb392fed0" dir="auto" data-node-id="961:1147">
                      انتخاب تاریخ
                    </p>
                  </DesignField>
                </div>
                <div className="fg-57ac4716f3" data-node-id="961:1148" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1149">
                    بازه بودجه (تومان)
                  </p>
                  <DesignField className="fg-0ba8e8b93a" data-node-id="961:1150" data-name="Frame" label="بازه بودجه (تومان)" placeholder="مثال: ۵۰ تا ۱۰۰ میلیون تومان">
                    <p className="fg-7fb392fed0" dir="auto" data-node-id="961:1151">
                      مثال: ۵۰ تا ۱۰۰ میلیون تومان
                    </p>
                  </DesignField>
                </div>
                <div className="fg-57ac4716f3" data-node-id="961:1152" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1153">
                    تعداد تقریبی
                  </p>
                  <DesignField className="fg-0ba8e8b93a" data-node-id="961:1154" data-name="Frame" label="تعداد تقریبی" placeholder="مثال: ۵۰۰">
                    <p className="fg-7fb392fed0" dir="auto" data-node-id="961:1155">
                      مثال: ۵۰۰
                    </p>
                  </DesignField>
                </div>
              </div>
              <div className="fg-c93a8f5cea" data-node-id="961:1156" data-name="Frame">
                <div className="fg-57ac4716f3" data-node-id="961:1157" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1158">
                    شهر / استان تحویل
                  </p>
                  <DesignField className="fg-80928427a4" data-node-id="961:1159" data-name="Frame" label="شهر / استان تحویل" placeholder="تهران">
                    <div className="fg-c51752dc8c" data-node-id="961:1479" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/4b33d813.svg" />
                    </div>
                    <p className="fg-1e7372bd06" dir="auto" data-node-id="961:1161">
                      تهران
                    </p>
                  </DesignField>
                </div>
                <div className="fg-57ac4716f3" data-node-id="961:1162" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1163">
                    مناسبت / کاربرد
                  </p>
                  <DesignField className="fg-0ba8e8b93a" data-node-id="961:1164" data-name="Frame" label="مناسبت / کاربرد" placeholder="مثال: رویداد سالانه، نوروز">
                    <p className="fg-7fb392fed0" dir="auto" data-node-id="961:1165">
                      مثال: رویداد سالانه، نوروز
                    </p>
                  </DesignField>
                </div>
              </div>
              <div className="fg-62f39da6b2" data-node-id="961:1166" data-name="Frame">
                <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1167">
                  محصولات انتخاب‌شده
                </p>
                <div className="fg-c7560e824a" data-node-id="961:1168" data-name="Frame">
                  <div className="fg-f84de76785" data-node-id="961:1169" data-name="Vector">
                    <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/8afac7c6.svg" />
                  </div>
                  <p className="fg-9e0d29e29d" dir="auto" data-node-id="961:1170">
                    محصولی انتخاب نشده — از بخش محصولات سازمانی اضافه کنید
                  </p>
                </div>
              </div>
              <div className="fg-c93a8f5cea" data-node-id="961:1171" data-name="Frame">
                <div className="fg-57ac4716f3" data-node-id="961:1172" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1173">
                    توضیحات تکمیلی
                  </p>
                  <DesignField className="fg-0ba8e8b93a" data-node-id="961:1174" data-name="Frame" label="توضیحات تکمیلی" placeholder="موارد دیگری که لازم است بدانیم...">
                    <p className="fg-7fb392fed0" dir="auto" data-node-id="961:1175">
                      موارد دیگری که لازم است بدانیم...
                    </p>
                  </DesignField>
                </div>
                <div className="fg-57ac4716f3" data-node-id="961:1176" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1177">
                    نیازهای شخصی‌سازی
                  </p>
                  <DesignField className="fg-0ba8e8b93a" data-node-id="961:1178" data-name="Frame" label="نیازهای شخصی‌سازی" placeholder="مثال: حک لوگوی سازمانی روی جعبه">
                    <p className="fg-7fb392fed0" dir="auto" data-node-id="961:1179">
                      مثال: حک لوگوی سازمانی روی جعبه
                    </p>
                  </DesignField>
                </div>
              </div>
            </div>
            <div className="fg-452d346712" data-node-id="961:1180" data-name="Frame">
              <CorporateAction className="fg-9ee2e2889d" data-node-id="961:1181" data-name="Frame" label="ثبت درخواست" destination="purchase-request-detail">
                <p className="fg-31b19a5ba7" dir="auto" data-node-id="961:1182">
                  ثبت درخواست
                </p>
              </CorporateAction>
              <CorporateAction className="fg-ca21f55701" data-node-id="961:1183" data-name="Frame" label="ذخیره پیش‌نویس">
                <p className="fg-9ba6850a8f" dir="auto" data-node-id="961:1184">
                  ذخیره پیش‌نویس
                </p>
              </CorporateAction>
            </div>
          </div>
        </div>
      </div>
      <CorporateSidebar className="fg-7826810f37" data-node-id="961:1185" data-name="sidebar">
        <div className="fg-35f9b3d3c7" data-node-id="961:1488" data-name="Brand / Negarin Logo">
          <img alt="" className="fg-b5304dc4b2" src="/corporate-buyer-assets/530a0f8f.png" />
        </div>
        <div className="fg-f380acb1b8" data-node-id="961:1186" data-name="Frame">
          <div className="fg-6a0a0c42d7" data-node-id="961:1187" data-name="Frame">
            <div className="fg-914cbaa88f" data-node-id="961:1188" data-name="Frame">
              <p className="fg-b3ed119fef" dir="auto" data-node-id="961:1189">
                نگارین
              </p>
              <div className="fg-6d8bff7f85" data-node-id="961:1190" data-name="Rectangle" />
            </div>
            <p className="fg-9f013eccd1" dir="auto" data-node-id="961:1191">
              پرتال خریدار سازمانی
            </p>
          </div>
          <div className="fg-df0a3de519" data-node-id="961:1192" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/bd008523.svg" />
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="961:1193" data-name="Frame">
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1194" data-name="nav-item-پیشخوان" label="پیشخوان" destination="dashboard">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1195">
                پیشخوان
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1196" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/18aeed20.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-d373383830" data-node-id="961:1197" data-name="nav-item-درخواست‌های خرید" label="درخواست‌های خرید" destination="purchase-requests">
              <p className="fg-356a992da1" dir="auto" data-node-id="961:1198">
                درخواست‌های خرید
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1199" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/2bfbc123.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1200" data-name="nav-item-محصولات سازمانی" label="محصولات سازمانی" destination="corporate-products">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1201">
                محصولات سازمانی
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1202" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/25219ac7.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1203" data-name="nav-item-پیشنهادها" label="پیشنهادها" destination="proposals">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1204">
                پیشنهادها
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1205" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/b2b16e70.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1206" data-name="nav-item-سفارش‌ها" label="سفارش‌ها" destination="orders">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1207">
                سفارش‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1208" data-name="Vector">
                <div className="fg-5dfb79d1fb">
                  <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/5ca7d108.svg" />
                </div>
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1209" data-name="nav-item-تحویل‌ها" label="تحویل‌ها" destination="deliveries">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1210">
                تحویل‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1211" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/aaaa2711.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1212" data-name="nav-item-گزارش‌ها" label="گزارش‌ها" destination="reports">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1213">
                گزارش‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1214" data-name="Vector">
                <div className="fg-a468e0c1b0">
                  <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/f23afdfa.svg" />
                </div>
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1215" data-name="nav-item-حساب سازمان" label="حساب سازمان" destination="account">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1216">
                حساب سازمان
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1217" data-name="Vector">
                <div className="fg-8a19d1d92f">
                  <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/0b77ce66.svg" />
                </div>
              </div>
            </CorporateAction>
          </div>
        </div>
        <div className="fg-24081ceef5" data-node-id="961:1218" data-name="Frame">
          <div className="fg-df0a3de519" data-node-id="961:1219" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/bd008523.svg" />
            </div>
          </div>
          <div className="fg-6079b9fd3c" data-node-id="961:1220" data-name="Frame">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="961:1221">
              شرکت آریان صنعت پارس
            </p>
            <p className="fg-d4235d1d7b" dir="auto" data-node-id="961:1222">
              مدیر حساب سازمانی
            </p>
          </div>
        </div>
      </CorporateSidebar>
    </div>
  );
}
