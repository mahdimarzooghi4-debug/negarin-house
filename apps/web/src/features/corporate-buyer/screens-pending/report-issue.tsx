// Figma 962:246 — Corporate Buyer / Report Issue — Desktop
import { DesignField } from "../../artist/design-controls";
import { CorporateAction, CorporateSidebar } from "../corporate-controls";

export default function CorporateBuyerReportIssueDesktop() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="962:246" data-name="Corporate Buyer / Report Issue — Desktop">
      <div className="fg-c92c0aceed" data-node-id="962:247" data-name="Frame">
        <div className="fg-15f4aa1b2d" data-node-id="962:248" data-name="topbar">
          <div className="fg-a34c8fe932" data-node-id="962:249" data-name="Frame">
            <div className="fg-efb4742ac1" data-node-id="962:250" data-name="Frame">
              <div className="fg-b2a182ecf4" data-node-id="962:251" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/9852f819.svg" />
              </div>
            </div>
            <div className="fg-ad50363799" data-node-id="962:253" data-name="Frame">
              <div className="fg-a214e008aa" data-node-id="962:254" data-name="Frame">
                <p className="fg-75512d01b6" dir="auto" data-node-id="962:255">
                  امیرحسین کریمی
                </p>
                <p className="fg-8c28c3d92c" dir="auto" data-node-id="962:256">
                  مسئول خرید
                </p>
              </div>
              <div className="fg-88436b85ac" data-node-id="962:257" data-name="Rectangle">
                <img alt="" className="fg-b440a5c4af" src="/corporate-buyer-assets/fd4c5bed.png" />
              </div>
            </div>
          </div>
          <p className="fg-35e98a7c03" dir="auto" data-node-id="962:258">
            گزارش مشکل
          </p>
        </div>
        <div className="fg-1353533246" data-node-id="962:259" data-name="Frame">
          <div className="fg-787154cfd0" data-node-id="962:260" data-name="breadcrumb">
            <div className="fg-e8210ba625" data-node-id="962:261" data-name="Frame">
              <p className="fg-86f2702692" dir="auto" data-node-id="962:262">
                تحویل‌ها
              </p>
            </div>
            <div className="fg-910c6d23f1" data-node-id="962:263" data-name="Frame">
              <p className="fg-6f95b9f0e1" data-node-id="962:264">{` < `}</p>
              <p className="fg-57081c183e" data-node-id="962:265">
                DLV-B2B-5001
              </p>
            </div>
            <div className="fg-3f3ad26eef" data-node-id="962:266" data-name="Frame">
              <p className="fg-d93ba30183" data-node-id="962:267">{` < `}</p>
              <p className="fg-2876baf180" dir="auto" data-node-id="962:268">
                گزارش مشکل
              </p>
            </div>
          </div>
          <div className="fg-3a2864586c" data-node-id="962:269" data-name="Frame">
            <p className="fg-310f7cad56" dir="auto" data-node-id="962:270">
              ثبت گزارش مشکل تحویل کالا
            </p>
            <div className="fg-e1bd344c57" data-node-id="962:271" data-name="Frame">
              <div className="fg-82e01851cd" data-node-id="962:272" data-name="Frame">
                <p className="fg-02ecbfbf4c" dir="auto" data-node-id="962:273">
                  نوع مشکل
                </p>
                <DesignField className="fg-bebb609fd2" data-node-id="962:274" data-name="Frame" label="نوع مشکل" placeholder="آسیب‌دیدگی محصول">
                  <div className="fg-c55cd499f6" data-node-id="962:275" data-name="Frame">
                    <div className="fg-0bb5547f93" data-node-id="962:789" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/46c19856.svg" />
                    </div>
                  </div>
                  <p className="fg-1e7372bd06" dir="auto" data-node-id="962:277">
                    آسیب‌دیدگی محصول
                  </p>
                </DesignField>
              </div>
              <div className="fg-0bab63b93d" data-node-id="962:278" data-name="Frame">
                <div className="fg-9412fca834" data-node-id="962:279" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="962:280">
                    شناسه سفارش
                  </p>
                  <CorporateAction className="fg-7ec9a37596" data-node-id="962:281" data-name="Frame" label="ORD-B2B-2035">
                    <p className="fg-162d7ef36c" data-node-id="962:282">
                      ORD-B2B-2035
                    </p>
                  </CorporateAction>
                </div>
                <div className="fg-9412fca834" data-node-id="962:283" data-name="Frame">
                  <p className="fg-02ecbfbf4c" dir="auto" data-node-id="962:284">
                    شناسه تحویل
                  </p>
                  <CorporateAction className="fg-7ec9a37596" data-node-id="962:285" data-name="Frame" label="DLV-B2B-5001">
                    <p className="fg-162d7ef36c" data-node-id="962:286">
                      DLV-B2B-5001
                    </p>
                  </CorporateAction>
                </div>
              </div>
              <div className="fg-82e01851cd" data-node-id="962:287" data-name="Frame">
                <p className="fg-02ecbfbf4c" dir="auto" data-node-id="962:288">
                  شرح مشکل
                </p>
                <DesignField className="fg-9f751214e6" data-node-id="962:289" data-name="Frame" label="شرح مشکل" placeholder="لطفاً جزئیات مشکل را شرح دهید" multiline>
                  <p className="fg-2e764d81dd" dir="auto" data-node-id="962:290">
                    لطفاً جزئیات مشکل را شرح دهید
                  </p>
                </DesignField>
              </div>
              <div className="fg-82e01851cd" data-node-id="962:291" data-name="Frame">
                <p className="fg-02ecbfbf4c" dir="auto" data-node-id="962:292">
                  بارگذاری تصاویر
                </p>
                <div className="fg-6382f44a8e" data-node-id="962:293" data-name="Frame">
                  <div className="fg-b4aa134644" data-node-id="962:294" data-name="Frame">
                    <div className="fg-0bb5547f93" data-node-id="962:822" data-name="image-up">
                      <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/abbb61c1.svg" />
                    </div>
                  </div>
                  <p className="fg-2a2672efd4" dir="auto" data-node-id="962:296">
                    انتخاب فایل تصویر یا رها کردن آن در این قسمت
                  </p>
                  <p className="fg-985ff37081" dir="auto" data-node-id="962:297">
                    فرمت‌های مجاز: JPG, PNG تا حداکثر ۵ مگابایت
                  </p>
                </div>
              </div>
              <div className="fg-82e01851cd" data-node-id="962:298" data-name="Frame">
                <p className="fg-02ecbfbf4c" dir="auto" data-node-id="962:299">
                  شماره تماس جهت پیگیری
                </p>
                <DesignField className="fg-ba9223790e" data-node-id="962:300" data-name="Frame" label="شماره تماس جهت پیگیری" placeholder="۰۲۱-۸۸۹۹۰۰۱۱">
                  <p className="fg-ae076a03dc" data-node-id="962:301">
                    ۰۲۱-۸۸۹۹۰۰۱۱
                  </p>
                </DesignField>
              </div>
            </div>
            <div className="fg-ffb43f0d5d" data-node-id="962:302" data-name="Frame">
              <div className="fg-bea167d64e" data-node-id="962:303" data-name="Frame">
                <CorporateAction className="fg-e6db421dc7" data-node-id="962:304" data-name="Frame" label="انصراف" destination="delivery-detail">
                  <p className="fg-bc9afa31fd" dir="auto" data-node-id="962:305">
                    انصراف
                  </p>
                </CorporateAction>
                <CorporateAction className="fg-58256e3f6a" data-node-id="962:306" data-name="Frame" label="ارسال گزارش" destination="issue-detail">
                  <p className="fg-31b19a5ba7" dir="auto" data-node-id="962:307">
                    ارسال گزارش
                  </p>
                </CorporateAction>
              </div>
              <CorporateAction className="fg-2dee1b2131" data-node-id="962:308" data-name="Frame" label="پس از ارسال، کارشناس نگارین ظرف ۲۴ ساعت بررسی خواهد کرد.">
                <p className="fg-da13247b19" dir="auto" data-node-id="962:309">
                  پس از ارسال، کارشناس نگارین ظرف ۲۴ ساعت بررسی خواهد کرد.
                </p>
                <div className="fg-c55cd499f6" data-node-id="962:310" data-name="Frame">
                  <div className="fg-0bb5547f93" data-node-id="962:816" data-name="info">
                    <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/2823fb85.svg" />
                  </div>
                </div>
              </CorporateAction>
            </div>
          </div>
        </div>
      </div>
      <CorporateSidebar className="fg-7826810f37" data-node-id="962:312" data-name="sidebar">
        <div className="fg-58d2e6303a" data-node-id="962:824" data-name="Negarin Logo">
          <img alt="" className="fg-71eecc63f8" src="/corporate-buyer-assets/742e6917.png" />
        </div>
        <div className="fg-f380acb1b8" data-node-id="962:313" data-name="logo-section">
          <div className="fg-6a0a0c42d7" data-node-id="962:314" data-name="logo-header">
            <div className="fg-914cbaa88f" data-node-id="962:315" data-name="logo-title-group">
              <p className="fg-b3ed119fef" dir="auto" data-node-id="962:316">
                نگارین
              </p>
              <div className="fg-6d8bff7f85" data-node-id="962:317" data-name="Rectangle" />
            </div>
            <p className="fg-9f013eccd1" dir="auto" data-node-id="962:318">
              پرتال خریدار سازمانی
            </p>
          </div>
          <div className="fg-df0a3de519" data-node-id="962:319" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/bd008523.svg" />
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="962:320" data-name="nav-items">
            <CorporateAction className="fg-337d3f989a" data-node-id="962:321" data-name="nav-item-0" label="پیشخوان" destination="dashboard">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:322">
                پیشخوان
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:323" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/963d6b72.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:325" data-name="nav-item-1" label="درخواست‌های خرید" destination="purchase-requests">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:326">
                درخواست‌های خرید
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:327" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/c2d4a530.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:329" data-name="nav-item-2" label="محصولات سازمانی" destination="corporate-products">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:330">
                محصولات سازمانی
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:331" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/a4c87c4c.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:333" data-name="nav-item-3" label="پیشنهادها" destination="proposals">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:334">
                پیشنهادها
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:335" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/5dd8b926.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:337" data-name="nav-item-4" label="سفارش‌ها" destination="orders">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:338">
                سفارش‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:339" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/5de05c95.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-d373383830" data-node-id="962:341" data-name="nav-item-5" label="تحویل‌ها" destination="deliveries">
              <p className="fg-356a992da1" dir="auto" data-node-id="962:342">
                تحویل‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:343" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/107c59f9.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:345" data-name="nav-item-6" label="گزارش‌ها" destination="reports">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:346">
                گزارش‌ها
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:347" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/a594af1b.svg" />
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:349" data-name="nav-item-7" label="اعلان‌ها" destination="notifications">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:350">
                اعلان‌ها
              </p>
              <div className="fg-87f65ec773" data-node-id="962:351" data-name="Frame">
                <div className="fg-217a2ce4bd" data-node-id="962:792" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/d9d89571.svg" />
                </div>
              </div>
            </CorporateAction>
            <CorporateAction className="fg-337d3f989a" data-node-id="962:353" data-name="nav-item-8" label="حساب سازمان" destination="account">
              <p className="fg-79fc3d21bd" dir="auto" data-node-id="962:354">
                حساب سازمان
              </p>
              <div className="fg-58d29b27c0" data-node-id="962:355" data-name="Frame">
                <img alt="" className="fg-8faf267d30" src="/corporate-buyer-assets/e44594e2.svg" />
              </div>
            </CorporateAction>
          </div>
        </div>
        <div className="fg-24081ceef5" data-node-id="962:357" data-name="sidebar-footer">
          <div className="fg-df0a3de519" data-node-id="962:358" data-name="Line">
            <div className="fg-cf771a9448">
              <img alt="" className="fg-acc3667e96" src="/corporate-buyer-assets/bd008523.svg" />
            </div>
          </div>
          <div className="fg-6079b9fd3c" data-node-id="962:359" data-name="Frame">
            <p className="fg-fd87dcd811" dir="auto" data-node-id="962:360">
              شرکت آریان صنعت پارس
            </p>
            <p className="fg-d4235d1d7b" dir="auto" data-node-id="962:361">
              مدیر حساب سازمانی
            </p>
          </div>
        </div>
      </CorporateSidebar>
    </div>
  );
}
