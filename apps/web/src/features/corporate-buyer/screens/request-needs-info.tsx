// Figma 961:1348 — Corporate Buyer / Request Needs Info — Desktop
import { DesignField } from "../../artist/design-controls";
import { CorporateAction, CorporateSidebar } from "../corporate-controls";

export default function CorporateBuyerRequestNeedsInfoDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="961:1348" data-name="Corporate Buyer / Request Needs Info — Desktop">
      <div className="fg-c92c0aceed" data-node-id="961:1349" data-name="Frame">
        <div className="fg-15f4aa1b2d" data-node-id="961:1350" data-name="topbar">
          <div className="fg-a34c8fe932" data-node-id="961:1351" data-name="Frame">
            <div className="fg-842ae29a35" data-node-id="961:1352" data-name="Frame">
              <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/85670485.svg" />
            </div>
            <div className="fg-ad50363799" data-node-id="961:1354" data-name="Frame">
              <div className="fg-a214e008aa" data-node-id="961:1355" data-name="Frame">
                <p className="fg-75512d01b6" dir="auto" data-node-id="961:1356">
                  امیرحسین کریمی
                </p>
                <p className="fg-8c28c3d92c" dir="auto" data-node-id="961:1357">
                  مسئول خرید
                </p>
              </div>
              <div className="fg-88436b85ac" data-node-id="961:1358" data-name="Rectangle">
                <img alt="" className="fg-b440a5c4af" src="/corporate-buyer-assets/fd4c5bed.png" />
              </div>
            </div>
          </div>
          <p className="fg-35e98a7c03" dir="auto" data-node-id="961:1359">
            جزئیات درخواست
          </p>
        </div>
        <div className="fg-1353533246" data-node-id="961:1360" data-name="Frame">
          <div className="fg-3db3332c05" data-node-id="961:1361" data-name="Frame">
            <p className="fg-8c4a25da75" data-node-id="961:1362">
              REQ-B2B-3003
            </p>
            <p className="fg-d93ba30183" data-node-id="961:1363">{`<`}</p>
            <p className="fg-6463ebb9b1" dir="auto" data-node-id="961:1364">
              درخواست‌های خرید
            </p>
          </div>
          <div className="fg-c93a8f5cea" data-node-id="961:1365" data-name="Frame">
            <div className="fg-3d7de8083b" data-node-id="961:1366" data-name="Frame">
              <div className="fg-9d40d43977" data-node-id="961:1367" data-name="Frame">
                <div className="fg-9eae8902b4" data-node-id="961:1368" data-name="Frame">
                  <p className="fg-e0cb05badb" dir="auto" data-node-id="961:1369">
                    نیازمند اطلاعات تکمیلی
                  </p>
                  <div className="fg-58d29b27c0" data-node-id="961:1482" data-name="alert-triangle">
                    <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/9f0d0f6d.svg" />
                  </div>
                </div>
                <p className="fg-f46b44f909" dir="auto" data-node-id="961:1371">
                  نگارین برای بررسی درخواست شما به اطلاعات تکمیلی نیاز دارد:
                </p>
                <div className="fg-91a2a1630f" data-node-id="961:1372" data-name="Frame">
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="961:1373">
                    • فایل لوگوی شرکت با کیفیت بالا (فرمت SVG یا PNG)
                  </p>
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="961:1374">
                    • رنگ دقیق موردنظر برای زمینه بشقاب
                  </p>
                </div>
              </div>
              <div className="fg-cecd20642f" data-node-id="961:1375" data-name="Frame">
                <p className="fg-e802c69302" dir="auto" data-node-id="961:1376">
                  ارسال پاسخ و فایل‌های درخواستی
                </p>
                <div className="fg-62f39da6b2" data-node-id="961:1377" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1378">
                    توضیحات تکمیلی
                  </p>
                  <DesignField className="fg-ec8a9db7f3" data-node-id="961:1379" data-name="Frame" label="توضیحات تکمیلی" placeholder="پاسخ خود را در این بخش بنویسید..." multiline>
                    <p className="fg-2e764d81dd" dir="auto" data-node-id="961:1380">
                      پاسخ خود را در این بخش بنویسید...
                    </p>
                  </DesignField>
                </div>
                <div className="fg-35ebe7492c" data-node-id="961:1381" data-name="Frame">
                  <div className="fg-eaa60f1c42" data-node-id="961:1485" data-name="upload-cloud">
                    <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/b529db06.svg" />
                  </div>
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="961:1383">
                    آپلود فایل لوگو (فرمت تصویر یا وکتور)
                  </p>
                  <p className="fg-985ff37081" dir="auto" data-node-id="961:1384">
                    حداکثر حجم فایل: ۱۰ مگابایت
                  </p>
                </div>
                <CorporateAction className="fg-9ee2e2889d" data-node-id="961:1385" data-name="Frame" label="ارسال اطلاعات" destination="purchase-request-detail">
                  <p className="fg-31b19a5ba7" dir="auto" data-node-id="961:1386">
                    ارسال اطلاعات
                  </p>
                </CorporateAction>
              </div>
              <div className="fg-c707604945" data-node-id="961:1387" data-name="Frame">
                <div className="fg-c96fe10678" data-node-id="961:1388" data-name="Frame">
                  <div className="fg-ed561e06bb" data-node-id="961:1389" data-name="Frame">
                    <p className="fg-6c57c078d8" dir="auto" data-node-id="961:1390">
                      نیازمند اطلاعات
                    </p>
                  </div>
                  <div className="fg-639a507765" data-node-id="961:1391" data-name="Frame">
                    <p className="fg-3595d64c2c" dir="auto" data-node-id="961:1392">
                      بشقاب اختصاصی با لوگو
                    </p>
                    <p className="fg-f67fe8535c" dir="auto" data-node-id="961:1393">
                      شناسه درخواست: REQ-B2B-3003
                    </p>
                  </div>
                </div>
                <div className="fg-df0a3de519" data-node-id="961:1394" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/62f08da6.svg" />
                  </div>
                </div>
                <div className="fg-2b391e5b8e" data-node-id="961:1395" data-name="Frame">
                  <div className="fg-02fb1875bb" data-node-id="961:1396" data-name="Frame">
                    <p className="fg-6369efee4c" dir="auto" data-node-id="961:1397">
                      تاریخ موردنیاز
                    </p>
                    <p className="fg-a73bec9965" data-node-id="961:1398">
                      ۱۴۰۳/۰۸/۲۰
                    </p>
                  </div>
                  <div className="fg-02fb1875bb" data-node-id="961:1399" data-name="Frame">
                    <p className="fg-6369efee4c" dir="auto" data-node-id="961:1400">
                      تعداد
                    </p>
                    <p className="fg-a73bec9965" dir="auto" data-node-id="961:1401">
                      ۱۰۰ عدد
                    </p>
                  </div>
                  <div className="fg-02fb1875bb" data-node-id="961:1402" data-name="Frame">
                    <p className="fg-6369efee4c" dir="auto" data-node-id="961:1403">
                      نوع
                    </p>
                    <p className="fg-a73bec9965" dir="auto" data-node-id="961:1404">
                      سفارش اختصاصی
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-96c4d70ce9" data-node-id="961:1405" data-name="Frame">
              <p className="fg-5a24206a77" dir="auto" data-node-id="961:1406">
                روند بررسی درخواست
              </p>
              <div className="fg-f380acb1b8" data-node-id="961:1407" data-name="Frame">
                <div className="fg-b8be7c6624" data-node-id="961:1408" data-name="Frame">
                  <div className="fg-80ab50a574" data-node-id="961:1409" data-name="Frame">
                    <p className="fg-ab31461af7" dir="auto" data-node-id="961:1410">
                      نیازمند اطلاعات
                    </p>
                    <p className="fg-6369efee4c" data-node-id="961:1411">
                      ۱۴۰۳/۰۷/۱۶
                    </p>
                    <p className="fg-5d99e9850c" dir="auto" data-node-id="961:1412">
                      برای ادامه فرآیند طراحی به لوگو و رنگ پایه نیاز است.
                    </p>
                  </div>
                  <div className="fg-9d1ddd1d77" data-node-id="961:1413" data-name="Frame">
                    <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/436e60fe.svg" />
                  </div>
                </div>
                <div className="fg-b8be7c6624" data-node-id="961:1416" data-name="Frame">
                  <div className="fg-80ab50a574" data-node-id="961:1417" data-name="Frame">
                    <p className="fg-aa0f103852" dir="auto" data-node-id="961:1418">
                      ثبت درخواست
                    </p>
                    <p className="fg-5d99e9850c" data-node-id="961:1419">
                      ۱۴۰۳/۰۷/۱۰
                    </p>
                  </div>
                  <div className="fg-c51752dc8c" data-node-id="961:1420" data-name="Frame">
                    <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/d217a90f.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CorporateSidebar className="fg-7826810f37" data-node-id="961:1422" data-name="sidebar">
        <div className="fg-35f9b3d3c7" data-node-id="961:1490" data-name="Brand / Negarin Logo">
          <img alt="" className="fg-b5304dc4b2" src="/corporate-buyer-assets/530a0f8f.png" />
        </div>
        <div className="fg-f380acb1b8" data-node-id="961:1423" data-name="Frame">
          <div className="fg-6a0a0c42d7" data-node-id="961:1424" data-name="Frame">
            <div className="fg-914cbaa88f" data-node-id="961:1425" data-name="Frame">
              <p className="fg-b3ed119fef" dir="auto" data-node-id="961:1426">
                نگارین
              </p>
              <div className="fg-6d8bff7f85" data-node-id="961:1427" data-name="Rectangle" />
            </div>
            <p className="fg-9f013eccd1" dir="auto" data-node-id="961:1428">
              پرتال خریدار سازمانی
            </p>
          </div>
          <div className="fg-df0a3de519" data-node-id="961:1429" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/bd008523.svg" />
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="961:1430" data-name="Frame">
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1431" data-name="nav-item-پیشخوان" label="پیشخوان" destination="dashboard">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1432">
                پیشخوان
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1433" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/e091a0f0.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-d373383830" data-node-id="961:1434" data-name="nav-item-درخواست‌های خرید" label="درخواست‌های خرید" destination="purchase-requests">
              <p className="fg-356a992da1" dir="auto" data-node-id="961:1435">
                درخواست‌های خرید
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1436" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/b20cd4df.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1437" data-name="nav-item-محصولات سازمانی" label="محصولات سازمانی" destination="corporate-products">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1438">
                محصولات سازمانی
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1439" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/227b91c3.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1440" data-name="nav-item-پیشنهادها" label="پیشنهادها" destination="proposals">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1441">
                پیشنهادها
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1442" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/5f37f654.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1443" data-name="nav-item-سفارش‌ها" label="سفارش‌ها" destination="orders">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1444">
                سفارش‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1445" data-name="Vector">
                <div className="fg-5dfb79d1fb">
                  <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/b1057738.svg" />
                </div>
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1446" data-name="nav-item-تحویل‌ها" label="تحویل‌ها" destination="deliveries">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1447">
                تحویل‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1448" data-name="Vector">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/b60a8d51.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1449" data-name="nav-item-گزارش‌ها" label="گزارش‌ها" destination="reports">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1450">
                گزارش‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1451" data-name="Vector">
                <div className="fg-a468e0c1b0">
                  <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/f23afdfa.svg" />
                </div>
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="961:1452" data-name="nav-item-حساب سازمان" label="حساب سازمان" destination="account">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="961:1453">
                حساب سازمان
              </p>
              <div className="fg-58d29b27c0" data-node-id="961:1454" data-name="Vector">
                <div className="fg-8a19d1d92f">
                  <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/ab3e5866.svg" />
                </div>
              </div>
            </CorporateAction>
          </div>
        </div>
        <div className="fg-24081ceef5" data-node-id="961:1455" data-name="Frame">
          <div className="fg-df0a3de519" data-node-id="961:1456" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/bd008523.svg" />
            </div>
          </div>
          <div className="fg-6079b9fd3c" data-node-id="961:1457" data-name="Frame">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="961:1458">
              شرکت آریان صنعت پارس
            </p>
            <p className="fg-d4235d1d7b" dir="auto" data-node-id="961:1459">
              مدیر حساب سازمانی
            </p>
          </div>
        </div>
      </CorporateSidebar>
    </div>
  );
}
