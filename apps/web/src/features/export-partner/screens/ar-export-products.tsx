// Figma 915:1991 — Export Partner / Export Products - ar
import { ExportLanguagePicker, ExportAction, ExportField, ExportSidebar } from "../export-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Small";
  state?: "Default";
  style?: "Primary" | "Secondary";
};

function NegarinButton({ className, label = "ادامه", size = "Small", state = "Default", style = "Primary" }: NegarinButtonProps) {
  const isSecondaryAndSmallAndDefault = style === "Secondary" && size === "Small" && state === "Default";
  return (
    <ExportAction label={label} destination={/draft|pedido|الطلب|المسودة|订单|草稿|panier|заказ|Tasla/i.test(label)?"order-draft":"product-detail"} className={className || `content-stretch flex h-[36px] items-center justify-center px-[12px] relative rounded-[var(--negarin-radius-control,12px)] w-[140px] ${isSecondaryAndSmallAndDefault ? "bg-[var(--negarin-action-secondary-background,white)] border border-[var(--negarin-action-secondary-border,#041b65)] border-solid" : "bg-[var(--negarin-action-primary-background,#041b65)]"}`} data-component-id={isSecondaryAndSmallAndDefault ? "node-46_12" : "node-46_2"}>
      {style === "Primary" && size === "Small" && state === "Default" && (
        <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:3">
          {label}
        </p>
      )}
      {isSecondaryAndSmallAndDefault && (
        <p className="fg-e4a7d61a6f" dir="auto" data-node-id="46:13">
          {label}
        </p>
      )}
    </ExportAction>
  );
}

export default function ExportPartnerExportProductsAr() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="915:1991" data-name="Export Partner / Export Products - ar">
      <div className="fg-95773e0afe" data-node-id="915:1992" data-name="Frame">
        <div className="fg-5465095764" data-node-id="915:1993" data-name="topbar">
          <div className="fg-a34c8fe932" data-node-id="915:1994" data-name="left-actions">
            <div className="fg-811ed34518" data-node-id="915:1995" data-name="Frame">
              <div className="fg-b2a182ecf4" data-node-id="915:2361" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/ac739238.svg" />
              </div>
            </div>
            <div className="fg-811ed34518" data-node-id="915:1997" data-name="Frame">
              <div className="fg-b2a182ecf4" data-node-id="915:2364" data-name="globe">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/ede8772d.svg" />
              </div>
            </div>
            <div className="fg-958b7f9d37" data-node-id="915:1999">
              <div className="fg-854fb15a0f">
                <div className="fg-b5827fca1c" data-name="Line">
                  <div className="fg-cf771a9448">
                    <img alt="" className="fg-acc3667e96" src="/export-partner-assets/d1f80a4b.svg" />
                  </div>
                </div>
              </div>
            </div>
            <ExportLanguagePicker className="fg-9eae8902b4" data-node-id="915:2000" data-name="Frame">
              <p className="fg-ceba9e9639" data-node-id="915:2001">
                AR
              </p>
              <div className="fg-5cca20e57d" data-node-id="915:2367" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/847ce7ea.svg" />
              </div>
            </ExportLanguagePicker>
          </div>
          <div className="fg-f4e21e9df8" data-node-id="915:2003" data-name="right-title">
            <p className="fg-12260dca4f" dir="auto" data-node-id="915:2004" style={{ fontVariationSettings: '"wdth" 100' }}>
              المنتجات التصديرية
            </p>
            <p className="fg-65395c0c5a" dir="auto" data-node-id="915:2005" style={{ fontVariationSettings: '"wdth" 100' }}>
              تصفح المنتجات الحرفية الإيرانية المتاحة للتصدير واختيار المنتجات لطلبات التصدير
            </p>
          </div>
        </div>
        <div className="fg-cf5ff4fa1f" data-node-id="915:2006" data-name="Frame">
          <div className="fg-c96fe10678" data-node-id="915:2007" data-name="Frame">
            <div className="fg-9708e8d183" data-node-id="915:2008" data-name="Frame">
              <div className="fg-c582e8f877" data-node-id="915:2009" data-name="Frame">
                <ExportAction className="fg-3798177b10" dir="auto" data-node-id="915:2010" style={{ fontVariationSettings: '"wdth" 100' }} label="تصفح المنتجات التصديرية" destination="export-products">
                  تصفح المنتجات التصديرية
                </ExportAction>
              </div>
            </div>
            <div className="fg-92b7da7864" data-node-id="915:2013" data-name="Frame">
              <div className="fg-ded5df24a1" data-node-id="915:2014" data-name="Frame">
                <p className="fg-c5e39b5f7c" dir="auto" data-node-id="915:2015" style={{ fontVariationSettings: '"wdth" 100' }}>
                  الكل
                </p>
              </div>
              <div className="fg-feca9b573f" data-node-id="915:2016" data-name="Frame">
                <p className="fg-2188c40ed6" dir="auto" data-node-id="915:2017" style={{ fontVariationSettings: '"wdth" 100' }}>
                  سيراميك
                </p>
              </div>
              <div className="fg-feca9b573f" data-node-id="915:2018" data-name="Frame">
                <p className="fg-2188c40ed6" dir="auto" data-node-id="915:2019" style={{ fontVariationSettings: '"wdth" 100' }}>
                  منسوجات
                </p>
              </div>
              <div className="fg-feca9b573f" data-node-id="915:2020" data-name="Frame">
                <p className="fg-2188c40ed6" dir="auto" data-node-id="915:2021" style={{ fontVariationSettings: '"wdth" 100' }}>
                  أعمال معدنية
                </p>
              </div>
              <div className="fg-feca9b573f" data-node-id="915:2022" data-name="Frame">
                <p className="fg-2188c40ed6" dir="auto" data-node-id="915:2023" style={{ fontVariationSettings: '"wdth" 100' }}>
                  صناعة الجلود
                </p>
              </div>
            </div>
          </div>
          <div className="fg-c96fe10678" data-node-id="1199:439" data-name="catalog-action-bar">
            <div className="fg-ad50363799" data-node-id="1199:440" data-name="filters-and-search">
              <ExportField className="fg-841034ea1f" data-node-id="1199:441" data-name="search-catalog" label="البحث في المنتجات..." placeholder="البحث في المنتجات..." search>
                <div className="fg-5cca20e57d" data-node-id="1199:442" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f1798152.svg" />
                </div>
                <p className="fg-90d4cc0057" dir="auto" data-node-id="1199:444" style={{ fontVariationSettings: '"wdth" 100' }}>
                  البحث في المنتجات...
                </p>
              </ExportField>
              <div className="fg-5bbbbaf5eb" data-node-id="1199:445" data-name="filter-destination">
                <p className="fg-d72981a25a" dir="auto" data-node-id="1199:446" style={{ fontVariationSettings: '"wdth" 100' }}>
                  الوجهة: الكل
                </p>
                <div className="fg-8a0ff48924" data-node-id="1199:447" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-5bbbbaf5eb" data-node-id="1199:449" data-name="filter-category">
                <p className="fg-d72981a25a" dir="auto" data-node-id="1199:450" style={{ fontVariationSettings: '"wdth" 100' }}>
                  الفئة: الكل
                </p>
                <div className="fg-8a0ff48924" data-node-id="1199:451" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-5bbbbaf5eb" data-node-id="1199:453" data-name="filter-inventory">
                <p className="fg-d72981a25a" dir="auto" data-node-id="1199:454" style={{ fontVariationSettings: '"wdth" 100' }}>
                  المخزون: الكل
                </p>
                <div className="fg-8a0ff48924" data-node-id="1199:455" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
            </div>
            <div className="fg-48c689a6a5" data-node-id="1199:457" data-name="bulk-actions" />
          </div>
          <div className="fg-1cd01b7717" data-node-id="915:2024" data-name="Frame">
            <div className="fg-c96fe10678" data-node-id="915:2025" data-name="Frame">
              <div className="fg-9eae8902b4" data-node-id="915:2026" data-name="Frame">
                <p className="fg-038fdda4a0" dir="auto" data-node-id="915:2027" style={{ fontVariationSettings: '"wdth" 100' }}>
                  ترتيب حسب: الأحدث
                </p>
                <div className="fg-5cca20e57d" data-node-id="915:2370" data-name="sliders">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/28b8b554.svg" />
                </div>
              </div>
              <p className="fg-d4400db126" dir="auto" data-node-id="915:2029" style={{ fontVariationSettings: '"wdth" 100' }}>
                قائمة المنتجات التصديرية
              </p>
            </div>
            <div className="fg-153c0a1809" data-node-id="915:2030" data-name="Frame">
              <div className="fg-47296bfb46" data-node-id="915:2031" data-name="Frame">
                <p className="fg-097e9474ee" dir="auto" data-node-id="915:2032" style={{ fontVariationSettings: '"wdth" 100' }}>
                  الحالة
                </p>
                <p className="fg-78dec5f199" dir="auto" data-node-id="915:2033" style={{ fontVariationSettings: '"wdth" 100' }}>
                  المخزون
                </p>
                <p className="fg-7f2be8036c" dir="auto" data-node-id="915:2034" style={{ fontVariationSettings: '"wdth" 100' }}>
                  السعر المنشور
                </p>
                <p className="fg-097e9474ee" dir="auto" data-node-id="915:2035" style={{ fontVariationSettings: '"wdth" 100' }}>
                  الرمز
                </p>
                <p className="fg-7f2be8036c" dir="auto" data-node-id="915:2036" style={{ fontVariationSettings: '"wdth" 100' }}>
                  الفئة
                </p>
                <p className="fg-b841a63777" dir="auto" data-node-id="915:2037" style={{ fontVariationSettings: '"wdth" 100' }}>
                  ورشة / فنان
                </p>
                <p className="fg-7f2be8036c" dir="auto" data-node-id="915:2038" style={{ fontVariationSettings: '"wdth" 100' }}>
                  الرمز
                </p>
                <p className="fg-4a9b73a3b7" dir="auto" data-node-id="915:2039" style={{ fontVariationSettings: '"wdth" 100' }}>
                  اسم المنتج
                </p>
              </div>
              <div className="fg-981f5f969e" data-node-id="915:2040" data-name="Frame">
                <div className="fg-2bd06e4f2e" data-node-id="1199:462" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="إضافة إلى المسودة" />
                  <NegarinButton className="fg-b643913e86" label="عرض التفاصيل" style="Secondary" />
                </div>
                <div className="fg-7fee4cc88d" data-node-id="915:2041" data-name="Frame">
                  <div className="fg-eb71b057e3" data-node-id="915:2042" data-name="Frame">
                    <p className="fg-c5e39b5f7c" dir="auto" data-node-id="915:2043" style={{ fontVariationSettings: '"wdth" 100' }}>
                      جاهز للتصدير
                    </p>
                  </div>
                </div>
                <p className="fg-25929a5dc9" data-node-id="915:2044">
                  45
                </p>
                <p className="fg-fd5c113650" data-node-id="915:2045">
                  USD 95.00
                </p>
                <p className="fg-f62b62c879" data-node-id="915:2046">
                  PRD-MNK-2401
                </p>
                <p className="fg-475dde99f2" dir="auto" data-node-id="915:2047" style={{ fontVariationSettings: '"wdth" 100' }}>
                  میناکاری
                </p>
                <p className="fg-aae876546c" dir="auto" data-node-id="915:2048" style={{ fontVariationSettings: '"wdth" 100' }}>
                  ورشة أصفهان
                </p>
                <p className="fg-c2bf87dd6e" dir="auto" data-node-id="915:2050" style={{ fontVariationSettings: '"wdth" 100' }}>
                  صحن مینا اصفهانی
                </p>
                <div className="fg-106d1f99e1" data-node-id="1206:367" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/9918a013.png" />
                </div>
              </div>
              <div className="fg-981f5f969e" data-node-id="915:2051" data-name="Frame">
                <div className="fg-2bd06e4f2e" data-node-id="1199:468" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="إضافة إلى المسودة" />
                  <NegarinButton className="fg-b643913e86" label="عرض التفاصيل" style="Secondary" />
                </div>
                <div className="fg-7fee4cc88d" data-node-id="915:2052" data-name="Frame">
                  <div className="fg-eb71b057e3" data-node-id="915:2053" data-name="Frame">
                    <p className="fg-c5e39b5f7c" dir="auto" data-node-id="915:2054" style={{ fontVariationSettings: '"wdth" 100' }}>
                      جاهز للتصدير
                    </p>
                  </div>
                </div>
                <p className="fg-25929a5dc9" data-node-id="915:2055">
                  12
                </p>
                <p className="fg-fd5c113650" data-node-id="915:2056">
                  USD 280.00
                </p>
                <p className="fg-f62b62c879" data-node-id="915:2057">
                  PRD-KLM-2402
                </p>
                <p className="fg-475dde99f2" dir="auto" data-node-id="915:2058" style={{ fontVariationSettings: '"wdth" 100' }}>
                  کلیم
                </p>
                <p className="fg-aae876546c" dir="auto" data-node-id="915:2059" style={{ fontVariationSettings: '"wdth" 100' }}>
                  کلیم‌بافان کرمان
                </p>
                <p className="fg-c2bf87dd6e" dir="auto" data-node-id="915:2061" style={{ fontVariationSettings: '"wdth" 100' }}>
                  کلیم تبریز يدوي
                </p>
                <div className="fg-106d1f99e1" data-node-id="1206:368" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/4869d327.png" />
                </div>
              </div>
              <div className="fg-981f5f969e" data-node-id="915:2062" data-name="Frame">
                <div className="fg-2bd06e4f2e" data-node-id="1199:474" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="إضافة إلى المسودة" />
                  <NegarinButton className="fg-b643913e86" label="عرض التفاصيل" style="Secondary" />
                </div>
                <div className="fg-7fee4cc88d" data-node-id="915:2063" data-name="Frame">
                  <div className="fg-eb71b057e3" data-node-id="915:2064" data-name="Frame">
                    <p className="fg-c5e39b5f7c" dir="auto" data-node-id="915:2065" style={{ fontVariationSettings: '"wdth" 100' }}>
                      جاهز للتصدير
                    </p>
                  </div>
                </div>
                <p className="fg-25929a5dc9" data-node-id="915:2066">
                  30
                </p>
                <p className="fg-fd5c113650" data-node-id="915:2067">
                  USD 150.00
                </p>
                <p className="fg-f62b62c879" data-node-id="915:2068">
                  PRD-KHT-2403
                </p>
                <p className="fg-475dde99f2" dir="auto" data-node-id="915:2069" style={{ fontVariationSettings: '"wdth" 100' }}>
                  خاتم‌کاری
                </p>
                <p className="fg-aae876546c" dir="auto" data-node-id="915:2070" style={{ fontVariationSettings: '"wdth" 100' }}>
                  خاتم‌کاری شیراز
                </p>
                <p className="fg-c2bf87dd6e" dir="auto" data-node-id="915:2072" style={{ fontVariationSettings: '"wdth" 100' }}>
                  صندوق خاتم‌کاری شیرازی
                </p>
                <div className="fg-106d1f99e1" data-node-id="1206:369" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/faa767fa.png" />
                </div>
              </div>
              <div className="fg-981f5f969e" data-node-id="915:2073" data-name="Frame">
                <div className="fg-2bd06e4f2e" data-node-id="1199:480" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="إضافة إلى المسودة" />
                  <NegarinButton className="fg-b643913e86" label="عرض التفاصيل" style="Secondary" />
                </div>
                <div className="fg-7fee4cc88d" data-node-id="915:2074" data-name="Frame">
                  <div className="fg-eb71b057e3" data-node-id="915:2075" data-name="Frame">
                    <p className="fg-c5e39b5f7c" dir="auto" data-node-id="915:2076" style={{ fontVariationSettings: '"wdth" 100' }}>
                      جاهز للتصدير
                    </p>
                  </div>
                </div>
                <p className="fg-25929a5dc9" data-node-id="915:2077">
                  85
                </p>
                <p className="fg-fd5c113650" data-node-id="915:2078">
                  USD 65.00
                </p>
                <p className="fg-f62b62c879" data-node-id="915:2079">
                  PRD-CRM-2404
                </p>
                <p className="fg-475dde99f2" dir="auto" data-node-id="915:2080" style={{ fontVariationSettings: '"wdth" 100' }}>
                  سيراميك
                </p>
                <p className="fg-aae876546c" dir="auto" data-node-id="915:2081" style={{ fontVariationSettings: '"wdth" 100' }}>
                  سفال لالجین
                </p>
                <p className="fg-c2bf87dd6e" dir="auto" data-node-id="915:2083" style={{ fontVariationSettings: '"wdth" 100' }}>
                  مزهرية لالجین فيروزية
                </p>
                <div className="fg-106d1f99e1" data-node-id="1206:370" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/e860f092.png" />
                </div>
              </div>
              <div className="fg-981f5f969e" data-node-id="915:2084" data-name="Frame">
                <div className="fg-2bd06e4f2e" data-node-id="1199:486" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="إضافة إلى المسودة" />
                  <NegarinButton className="fg-b643913e86" label="عرض التفاصيل" style="Secondary" />
                </div>
                <div className="fg-7fee4cc88d" data-node-id="915:2085" data-name="Frame">
                  <div className="fg-286987ec42" data-node-id="915:2086" data-name="Frame">
                    <p className="fg-021334e3a3" dir="auto" data-node-id="915:2087" style={{ fontVariationSettings: '"wdth" 100' }}>
                      نفد المخزون
                    </p>
                  </div>
                </div>
                <p className="fg-25929a5dc9" data-node-id="915:2088">
                  0
                </p>
                <p className="fg-fd5c113650" data-node-id="915:2089">
                  USD 120.00
                </p>
                <p className="fg-f62b62c879" data-node-id="915:2090">
                  PRD-TRM-2405
                </p>
                <p className="fg-475dde99f2" dir="auto" data-node-id="915:2091" style={{ fontVariationSettings: '"wdth" 100' }}>
                  منسوجات
                </p>
                <p className="fg-aae876546c" dir="auto" data-node-id="915:2092" style={{ fontVariationSettings: '"wdth" 100' }}>
                  بافت یزد
                </p>
                <p className="fg-c2bf87dd6e" dir="auto" data-node-id="915:2094" style={{ fontVariationSettings: '"wdth" 100' }}>
                  ترمه یزد حریری
                </p>
                <div className="fg-106d1f99e1" data-node-id="1206:371" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/6740ed96.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-278a6f0953" data-node-id="1199:492" data-name="table-pagination">
            <p className="fg-a8a112703d" dir="auto" data-node-id="1199:493" style={{ fontVariationSettings: '"wdth" 100' }}>
              إظهار 1 إلى 5 من 48 منتجًا
            </p>
            <div className="fg-92b7da7864" data-node-id="1199:494" data-name="pagination-controls">
              <ExportAction className="fg-b878995460" data-node-id="1199:495" data-name="btn-prev" label="السابق">
                <p className="fg-8b76e9808d" dir="auto" data-node-id="1199:496" style={{ fontVariationSettings: '"wdth" 100' }}>
                  السابق
                </p>
              </ExportAction>
              <ExportAction className="fg-b878995460" data-node-id="1199:497" data-name="btn-next" label="التالي">
                <p className="fg-8b76e9808d" dir="auto" data-node-id="1199:498" style={{ fontVariationSettings: '"wdth" 100' }}>
                  التالي
                </p>
              </ExportAction>
            </div>
          </div>
        </div>
      </div>
      <ExportSidebar className="fg-c6c3968b81" data-node-id="1206:1100" data-name="Sidebar / ar / Export Products - ar">
        <div className="fg-9bc243bde1" data-node-id="I1206:1100;1206:512" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:1100;1206:513" data-name="brand-header">
            <div className="fg-831fd632a0" data-node-id="I1206:1100;1206:515" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:1100;1206:516">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:1100;1206:517">
                Partner Portal
              </p>
            </div>
            <div className="fg-458c46521a" data-node-id="I1206:1100;1206:514" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:1100;1206:518" data-name="nav-menu">
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1100;1206:519" data-name="nav-item-0" label="لوحة المعلومات" destination="dashboard">
              <p className="fg-1817896daa" data-node-id="I1206:1100;1206:522" style={{ fontVariationSettings: '"wdth" 100' }}>
                لوحة المعلومات
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1100;1206:520" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b0f9b3dd.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1100;1206:523" data-name="nav-item-1" label="الشبكة / الفنانون" destination="network-artists">
              <p className="fg-1817896daa" data-node-id="I1206:1100;1206:526" style={{ fontVariationSettings: '"wdth" 100' }}>
                الشبكة / الفنانون
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1100;1206:524" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6a1c4a13.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-d7fa19c21f" data-node-id="I1206:1100;1206:527" data-name="nav-item-2" label="المنتجات التصديرية" destination="export-products">
              <p className="fg-48b4384e35" data-node-id="I1206:1100;1206:530" style={{ fontVariationSettings: '"wdth" 100' }}>
                المنتجات التصديرية
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1100;1206:528" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/1e2a35d1.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1100;1206:531" data-name="nav-item-3" label="الطلبات" destination="orders-list">
              <p className="fg-1817896daa" data-node-id="I1206:1100;1206:534" style={{ fontVariationSettings: '"wdth" 100' }}>
                الطلبات
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1100;1206:532" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/70b19da6.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1100;1206:535" data-name="nav-item-4" label="مسودات الطلبات" destination="order-draft">
              <p className="fg-1817896daa" data-node-id="I1206:1100;1206:538" style={{ fontVariationSettings: '"wdth" 100' }}>
                مسودات الطلبات
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1100;1206:536" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/bd51caec.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1100;1206:539" data-name="nav-item-5" label="التقارير">
              <p className="fg-1817896daa" data-node-id="I1206:1100;1206:542" style={{ fontVariationSettings: '"wdth" 100' }}>
                التقارير
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1100;1206:540" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e3297a1b.svg" />
              </div>
            </ExportAction>
            <ExportAction className="fg-8ca4152b55" data-node-id="I1206:1100;1206:543" data-name="nav-item-6" label="الحساب" destination="account-preferences">
              <p className="fg-1817896daa" data-node-id="I1206:1100;1206:546" style={{ fontVariationSettings: '"wdth" 100' }}>
                الحساب
              </p>
              <div className="fg-58d29b27c0" data-node-id="I1206:1100;1206:544" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/5499e48f.svg" />
              </div>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:1100;1206:547" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:1100;1206:548" data-name="user-profile">
            <div className="fg-e0149fe643" data-node-id="I1206:1100;1206:550" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:1100;1206:551" style={{ fontVariationSettings: '"wdth" 100' }}>
                محترفون بلا حدود
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:1100;1206:552" style={{ fontVariationSettings: '"wdth" 100' }}>
                PARTNER-8821
              </p>
            </div>
            <div className="fg-d05a0d0fe8" data-node-id="I1206:1100;1206:549" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
          </div>
        </div>
      </ExportSidebar>
    </div>
  );
}
