// Figma 915:2716 — Export Partner / Order Draft — ar
import { ExportField, ExportChoice, ExportAction, ExportSidebar } from "../export-controls";

export default function ExportPartnerOrderDraftAr() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="915:2716" data-name="Export Partner / Order Draft — ar">
      <div className="fg-c92c0aceed" data-node-id="915:2717" data-name="main-content">
        <div className="fg-73485070de" data-node-id="915:2718" data-name="header">
          <div className="fg-a34c8fe932" data-node-id="915:2719" data-name="actions-left">
            <div className="fg-e5b942a166" data-node-id="915:2720" data-name="Frame">
              <div className="fg-b2a182ecf4" data-node-id="915:2985" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/0150c597.svg" />
              </div>
            </div>
            <div className="fg-38e853a86c" data-node-id="915:2722" data-name="search">
              <p className="fg-dcdfadefbd" dir="auto" data-node-id="915:2723" style={{ fontVariationSettings: '"wdth" 100' }}>
                البحث برقم الشحنة أو المنتج...
              </p>
              <div className="fg-58d29b27c0" data-node-id="915:2988" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/8bd40a72.svg" />
              </div>
            </div>
          </div>
          <p className="fg-7879ecdee3" dir="auto" data-node-id="915:2725" style={{ fontVariationSettings: '"wdth" 100' }}>
            إنشاء مسودة طلب تصدير جديدة
          </p>
        </div>
        <div className="fg-9d770b205b" data-node-id="915:2726" data-name="content-body">
          <div className="fg-c93a8f5cea" data-node-id="915:2727" data-name="Frame">
            <div className="fg-4fc3d003fc" data-node-id="915:2728" data-name="tariff-quote-column">
              <div className="fg-3963918f72" data-node-id="915:2729" data-name="quote-card">
                <p className="fg-2b21f33876" dir="auto" data-node-id="915:2730" style={{ fontVariationSettings: '"wdth" 100' }}>
                  مراجعة الطلب وتأكيد الشحن
                </p>
                <div className="fg-1d503c5769" data-node-id="915:2731" data-name="Frame">
                  <p className="fg-6ec76b9ece" dir="auto" data-node-id="915:2732" style={{ fontVariationSettings: '"wdth" 100' }}>
                    تكلفة الشحن المقدرة
                  </p>
                  <p className="fg-af87bbfc89" dir="auto" data-node-id="915:2733" style={{ fontVariationSettings: '"wdth" 100' }}>
                    بناءً على اختيار المنطقة ورموز HS المدخلة:
                  </p>
                  <div className="fg-c0d3d4dd6e" data-node-id="915:2734" data-name="Frame">
                    <p className="fg-43b1e49b93" data-node-id="915:2735">
                      2,450.00 USD
                    </p>
                    <p className="fg-f5555e866d" dir="auto" data-node-id="915:2736" style={{ fontVariationSettings: '"wdth" 100' }}>
                      رسوم نگارین الدولية
                    </p>
                  </div>
                </div>
                <div className="fg-153c0a1809" data-node-id="915:2737" data-name="Frame">
                  <p className="fg-e93324e870" dir="auto" data-node-id="915:2738" style={{ fontVariationSettings: '"wdth" 100' }}>
                    * هذا تقدير أولي وقد يتغير حسب الوزن النهائي ووجهة الشحن
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-697ebeb010" data-node-id="915:2739" data-name="form-column">
              <p className="fg-664583b723" dir="auto" data-node-id="915:2740" style={{ fontVariationSettings: '"wdth" 100' }}>
                بيانات ومواصفات الشحنة
              </p>
              <div className="fg-0bab63b93d" data-node-id="915:2741" data-name="Frame">
                <div className="fg-9412fca834" data-node-id="915:2742" data-name="Frame">
                  <p className="fg-125876b2bd" dir="auto" data-node-id="915:2743" style={{ fontVariationSettings: '"wdth" 100' }}>
                    الكمية المطلوبة (بالطن)
                  </p>
                  <ExportField className="fg-d2b05783ad" data-node-id="915:2744" data-name="Frame" label="الكمية المطلوبة (بالطن)" placeholder="25.5" numeric>
                    <p className="fg-57105cd2a8" data-node-id="915:2745">
                      25.5
                    </p>
                  </ExportField>
                </div>
                <div className="fg-9412fca834" data-node-id="915:2746" data-name="Frame">
                  <p className="fg-125876b2bd" dir="auto" data-node-id="915:2747" style={{ fontVariationSettings: '"wdth" 100' }}>
                    تحديد المنتج المصدر
                  </p>
                  <div className="fg-09132bc504" data-node-id="915:2748" data-name="Frame">
                    <div className="fg-c51752dc8c" data-node-id="915:2991" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b59bc56c.svg" />
                    </div>
                    <p className="fg-f62b3d685d" dir="auto" data-node-id="915:2750" style={{ fontVariationSettings: '"wdth" 100' }}>
                      إناء مينا كاري فاخر
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-0bab63b93d" data-node-id="915:2751" data-name="Frame">
                <div className="fg-9412fca834" data-node-id="915:2752" data-name="Frame">
                  <p className="fg-125876b2bd" dir="auto" data-node-id="915:2753" style={{ fontVariationSettings: '"wdth" 100' }}>
                    تفضيلات الشحن
                  </p>
                  <div className="fg-fbb5fbd514" data-node-id="915:2754" data-name="Frame">
                    <ExportChoice className="fg-3f70c2e54c" data-node-id="915:2755" data-name="Frame" label="دولي سريع" group="915:2754" initial={false}>
                      <p className="fg-2164dbd9fd" dir="auto" data-node-id="915:2756">
                        دولي سريع
                      </p>
                    </ExportChoice>
                    <ExportChoice className="fg-134f082e55" data-node-id="915:2757" data-name="Frame" label="دولي سريع" group="915:2754" initial={false}>
                      <p className="fg-cd0d96e767" dir="auto" data-node-id="915:2758">
                        دولي عادي
                      </p>
                    </ExportChoice>
                  </div>
                </div>
                <div className="fg-9412fca834" data-node-id="915:2759" data-name="Frame">
                  <p className="fg-125876b2bd" dir="auto" data-node-id="915:2760" style={{ fontVariationSettings: '"wdth" 100' }}>
                    المنطقة الجغرافية المستهدفة
                  </p>
                  <div className="fg-09132bc504" data-node-id="915:2761" data-name="Frame">
                    <div className="fg-c51752dc8c" data-node-id="915:2994" data-name="chevron-down">
                      <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b59bc56c.svg" />
                    </div>
                    <p className="fg-f62b3d685d" dir="auto" data-node-id="915:2763" style={{ fontVariationSettings: '"wdth" 100' }}>
                      المملكة المتحدة والاتحاد الأوروبي
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-6440fece43" data-node-id="915:2764" data-name="Frame">
                <div className="fg-7bee47a39c" data-node-id="915:2765" data-name="Frame">
                  <ExportAction className="fg-edb97902a7" dir="auto" data-node-id="915:2766" style={{ fontVariationSettings: '"wdth" 100' }} label="تفاصيل التشغيل" destination="order-review">
                    تفاصيل التشغيل
                  </ExportAction>
                </div>
                <ExportAction className="fg-5c625f1a59" data-node-id="915:2767" data-name="Frame" label="حفظ كمسودة مؤقتة">
                  <p className="fg-0ca29b85fb" dir="auto" data-node-id="915:2768" style={{ fontVariationSettings: '"wdth" 100' }}>
                    حفظ كمسودة مؤقتة
                  </p>
                </ExportAction>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExportSidebar className="fg-c78fefc68e" data-node-id="1206:1268" data-name="Sidebar / ar / Order Draft — ar">
        <div className="fg-9bc243bde1" data-node-id="I1206:1268;1206:512" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:1268;1206:513" data-name="brand-header">
            <div className="fg-831fd632a0" data-node-id="I1206:1268;1206:515" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:1268;1206:516">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:1268;1206:517">
                Partner Portal
              </p>
            </div>
            <div className="fg-458c46521a" data-node-id="I1206:1268;1206:514" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:1268;1206:518" data-name="nav-menu">
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1268;1206:519" data-name="nav-item-0" label="لوحة المعلومات" destination="dashboard">
              <p className="fg-1817896daa" data-node-id="I1206:1268;1206:522" style={{ fontVariationSettings: '"wdth" 100' }}>
                لوحة المعلومات
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1268;1206:520" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b0f9b3dd.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1268;1206:523" data-name="nav-item-1" label="الشبكة / الفنانون" destination="network-artists">
              <p className="fg-1817896daa" data-node-id="I1206:1268;1206:526" style={{ fontVariationSettings: '"wdth" 100' }}>
                الشبكة / الفنانون
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1268;1206:524" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6a1c4a13.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1268;1206:527" data-name="nav-item-2" label="المنتجات التصديرية" destination="export-products">
              <p className="fg-1817896daa" data-node-id="I1206:1268;1206:530" style={{ fontVariationSettings: '"wdth" 100' }}>
                المنتجات التصديرية
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1268;1206:528" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/4adeca73.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1268;1206:531" data-name="nav-item-3" label="الطلبات" destination="orders-list">
              <p className="fg-1817896daa" data-node-id="I1206:1268;1206:534" style={{ fontVariationSettings: '"wdth" 100' }}>
                الطلبات
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1268;1206:532" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d55e0bcd.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-d7fa19c21f" data-node-id="I1206:1268;1206:535" data-name="nav-item-4" label="مسودات الطلبات" destination="order-draft">
              <p className="fg-48b4384e35" data-node-id="I1206:1268;1206:538" style={{ fontVariationSettings: '"wdth" 100' }}>
                مسودات الطلبات
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1268;1206:536" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/9b81f4d6.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1268;1206:539" data-name="nav-item-5" label="التقارير">
              <p className="fg-1817896daa" data-node-id="I1206:1268;1206:542" style={{ fontVariationSettings: '"wdth" 100' }}>
                التقارير
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1268;1206:540" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e3297a1b.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1268;1206:543" data-name="nav-item-6" label="الحساب" destination="account-preferences">
              <p className="fg-1817896daa" data-node-id="I1206:1268;1206:546" style={{ fontVariationSettings: '"wdth" 100' }}>
                الحساب
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1268;1206:544" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/04c58deb.svg" />
              </div>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:1268;1206:547" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:1268;1206:548" data-name="user-profile">
            <div className="fg-e0149fe643" data-node-id="I1206:1268;1206:550" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:1268;1206:551" style={{ fontVariationSettings: '"wdth" 100' }}>
                محترفون بلا حدود
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:1268;1206:552" style={{ fontVariationSettings: '"wdth" 100' }}>
                PARTNER-8821
              </p>
            </div>
            <div className="fg-d05a0d0fe8" data-node-id="I1206:1268;1206:549" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
          </div>
        </div>
      </ExportSidebar>
    </div>
  );
}
