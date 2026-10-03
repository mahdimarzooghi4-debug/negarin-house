// Figma 915:3343 — Export Partner / Export Products - tr-TR
import { ExportSidebar, ExportAction, ExportLanguagePicker, ExportField } from "../export-controls";

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

export default function ExportPartnerExportProductsTrTr() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="915:3343" data-name="Export Partner / Export Products - tr-TR">
      <ExportSidebar className="fg-c6c3968b81" data-node-id="1206:1562" data-name="Sidebar / tr-TR / Export Products - tr-TR">
        <div className="fg-9bc243bde1" data-node-id="I1206:1562;1206:494" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:1562;1206:453" data-name="brand-header">
            <div className="fg-458c46521a" data-node-id="I1206:1562;1206:454" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
            <div className="fg-7ae4f26cd2" data-node-id="I1206:1562;1206:455" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:1562;1206:456">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:1562;1206:457">
                Partner Portal
              </p>
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:1562;1206:458" data-name="nav-menu">
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:1562;1206:459" data-name="nav-item-0" label="Gösterge Paneli" destination="dashboard">
              <div className="fg-58d29b27c0" data-node-id="I1206:1562;1206:460" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b0f9b3dd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:1562;1206:462">
                Gösterge Paneli
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:1562;1206:463" data-name="nav-item-1" label="Ağ / Sanatçılar" destination="network-artists">
              <div className="fg-58d29b27c0" data-node-id="I1206:1562;1206:464" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6a1c4a13.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:1562;1206:466">
                Ağ / Sanatçılar
              </p>
            </ExportAction>
            <ExportAction className="fg-0b202358f2" data-node-id="I1206:1562;1206:467" data-name="nav-item-2" label="İhracat Ürünleri" destination="export-products">
              <div className="fg-58d29b27c0" data-node-id="I1206:1562;1206:468" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/1e2a35d1.svg" />
              </div>
              <p className="fg-0c6bcb5085" data-node-id="I1206:1562;1206:470">
                İhracat Ürünleri
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:1562;1206:471" data-name="nav-item-3" label="Siparişler" destination="orders-list">
              <div className="fg-58d29b27c0" data-node-id="I1206:1562;1206:472" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d55e0bcd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:1562;1206:474">
                Siparişler
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:1562;1206:475" data-name="nav-item-4" label="Sipariş Taslakları" destination="order-draft">
              <div className="fg-58d29b27c0" data-node-id="I1206:1562;1206:476" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/bd51caec.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:1562;1206:478">
                Sipariş Taslakları
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:1562;1206:479" data-name="nav-item-5" label="Raporlar">
              <div className="fg-58d29b27c0" data-node-id="I1206:1562;1206:480" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e3297a1b.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:1562;1206:482">
                Raporlar
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:1562;1206:483" data-name="nav-item-6" label="Hesap" destination="account-preferences">
              <div className="fg-58d29b27c0" data-node-id="I1206:1562;1206:484" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/c66fb123.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:1562;1206:486">
                Hesap
              </p>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:1562;1206:487" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:1562;1206:488" data-name="user-profile">
            <div className="fg-d05a0d0fe8" data-node-id="I1206:1562;1206:489" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
            <div className="fg-eb694bd6ff" data-node-id="I1206:1562;1206:490" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:1562;1206:491">
                Metehan Güneş
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:1562;1206:492">
                Yönetici Ortak
              </p>
            </div>
          </div>
        </div>
      </ExportSidebar>
      <div className="fg-95773e0afe" data-node-id="915:3386" data-name="workspace">
        <div className="fg-c40c1ab18c" data-node-id="915:3387" data-name="header">
          <div className="fg-06344a6866" data-node-id="915:3388" data-name="header-titles">
            <p className="fg-d875c33095" data-node-id="915:3389">
              İhracat Ürünleri
            </p>
            <p className="fg-a3eaa11797" data-node-id="915:3390">
              İhracat Ürünleri
            </p>
          </div>
          <div className="fg-a34c8fe932" data-node-id="915:3391" data-name="header-actions">
            <ExportLanguagePicker className="fg-a43409d6d6" data-node-id="915:3392" data-name="lang-badge">
              <p className="fg-85012e9f69" data-node-id="915:3393">
                TR
              </p>
            </ExportLanguagePicker>
            <ExportAction className="fg-c5568acde0" data-node-id="915:3394" data-name="notification-btn" label="notification-btn">
              <div className="fg-6c36c0b5c6" data-node-id="915:3395" data-name="icon-bell">
                <div className="fg-58d29b27c0" data-node-id="915:3684" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/52d56098.svg" />
                </div>
              </div>
            </ExportAction>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="915:3397" data-name="content-body">
          <div className="fg-c96fe10678" data-node-id="915:3398" data-name="filters-bar">
            <div className="fg-ad50363799" data-node-id="915:3399" data-name="search-filters">
              <ExportField className="fg-ad6392bde6" data-node-id="915:3400" data-name="search-input" label="Ürün veya SKU ara..." placeholder="Ürün veya SKU ara..." search>
                <div className="fg-f422037977" data-node-id="915:3401" data-name="icon-search">
                  <div className="fg-c51752dc8c" data-node-id="915:3687" data-name="search">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d09790d0.svg" />
                  </div>
                </div>
                <p className="fg-ef9af842dd" data-node-id="915:3403">
                  Ürün veya SKU ara...
                </p>
              </ExportField>
              <div className="fg-825ee095a7" data-node-id="915:3404" data-name="filter-select">
                <p className="fg-5c46f152db" data-node-id="915:3405">
                  Kategori: Hepsi
                </p>
                <div className="fg-d6f6d889a2" data-node-id="915:3406" data-name="icon-chevron-down">
                  <div className="fg-5cca20e57d" data-node-id="915:3690" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b4f60ec6.svg" />
                  </div>
                </div>
              </div>
              <div className="fg-825ee095a7" data-node-id="1206:396" data-name="filter-destination">
                <p className="fg-5c46f152db" data-node-id="1206:397">
                  Hedef Pazar: Hepsi
                </p>
                <div className="fg-d6f6d889a2" data-node-id="1206:398" data-name="icon-chevron-down">
                  <div className="fg-5cca20e57d" data-node-id="1206:399" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b4f60ec6.svg" />
                  </div>
                </div>
              </div>
              <div className="fg-825ee095a7" data-node-id="1206:401" data-name="filter-inventory">
                <p className="fg-5c46f152db" data-node-id="1206:402">
                  Stok: Hepsi
                </p>
                <div className="fg-d6f6d889a2" data-node-id="1206:403" data-name="icon-chevron-down">
                  <div className="fg-5cca20e57d" data-node-id="1206:404" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b4f60ec6.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fg-c17afe828e" data-node-id="915:3412" data-name="catalog-table-card">
            <div className="fg-e16ac02b64" data-node-id="915:3413" data-name="table">
              <div className="fg-09fa6c71dd" data-node-id="915:3414" data-name="table-header">
                <p className="fg-619b4baa27" data-node-id="915:3415">
                  Resim
                </p>
                <p className="fg-4a9b73a3b7" data-node-id="915:3416">
                  Ürün Adı
                </p>
                <p className="fg-47facc161d" data-node-id="915:3417">
                  Sanatçı / Atölye
                </p>
                <p className="fg-b841a63777" data-node-id="915:3418">
                  Kategori
                </p>
                <p className="fg-097e9474ee" data-node-id="915:3419">
                  Yayınlanan Fiyat
                </p>
                <p className="fg-78dec5f199" data-node-id="915:3420">
                  Stok
                </p>
                <p className="fg-097e9474ee" data-node-id="915:3421">
                  Durum
                </p>
                <p className="fg-bacee74b35" data-node-id="1200:23">
                  Eylemler
                </p>
              </div>
              <div className="fg-491ec28ead" data-node-id="915:3423" data-name="product-row-PRD-MNK-2401">
                <div className="fg-006dc33734" data-node-id="1200:25" data-name="thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/b1ee3b7f.png" />
                </div>
                <div className="fg-1a00ed6a7f" data-node-id="1200:26" data-name="product-info">
                  <p className="fg-d172edbcf5" data-node-id="915:3426">
                    Isfahan Minakari Tabağı
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="915:3427">
                    SKU: PRD-MNK-2401
                  </p>
                </div>
                <p className="fg-32f42d0d34" data-node-id="915:3428">
                  Atölye İsfahan
                </p>
                <p className="fg-163a3502eb" data-node-id="1200:27">
                  Minakari
                </p>
                <p className="fg-d06b3a3a9e" data-node-id="915:3430">
                  USD 95,00
                </p>
                <p className="fg-8fa02fdfb5" data-node-id="1200:28">
                  45 Adet
                </p>
                <div className="fg-7fee4cc88d" data-node-id="915:3432" data-name="status-cell">
                  <div className="fg-eb71b057e3" data-node-id="1200:29" data-name="status-badge">
                    <p className="fg-85012e9f69" data-node-id="1200:30">
                      İhracata Hazır
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1200:31" data-name="actions">
                  <NegarinButton className="fg-24cad047bd" label="Taslak Ekle" />
                  <NegarinButton className="fg-458c3f730b" label="Detayları Gör" style="Secondary" />
                </div>
              </div>
              <div className="fg-491ec28ead" data-node-id="1200:37" data-name="product-row-PRD-KLM-2402">
                <div className="fg-006dc33734" data-node-id="1200:38" data-name="thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/19a7ddbb.png" />
                </div>
                <div className="fg-1a00ed6a7f" data-node-id="1200:39" data-name="product-info">
                  <p className="fg-d172edbcf5" data-node-id="915:3441">
                    El Dokuma Tebriz Kilimi
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1200:40">
                    SKU: PRD-KLM-2402
                  </p>
                </div>
                <p className="fg-32f42d0d34" data-node-id="1200:41">
                  Kilim Bafan Kerman
                </p>
                <p className="fg-163a3502eb" data-node-id="915:3444">
                  Kilim
                </p>
                <p className="fg-d06b3a3a9e" data-node-id="1200:42">
                  USD 280,00
                </p>
                <p className="fg-8fa02fdfb5" data-node-id="915:3446">
                  12 Adet
                </p>
                <div className="fg-7fee4cc88d" data-node-id="1200:43" data-name="status-cell">
                  <div className="fg-eb71b057e3" data-node-id="1200:44" data-name="status-badge">
                    <p className="fg-85012e9f69" data-node-id="915:3449">
                      İhracata Hazır
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1200:45" data-name="actions">
                  <NegarinButton className="fg-24cad047bd" label="Taslak Ekle" />
                  <NegarinButton className="fg-458c3f730b" label="Detayları Gör" style="Secondary" />
                </div>
              </div>
              <div className="fg-491ec28ead" data-node-id="915:3453" data-name="product-row-PRD-KHT-2403">
                <div className="fg-006dc33734" data-node-id="1200:51" data-name="thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/58fd72b0.png" />
                </div>
                <div className="fg-5508e62a8a" data-node-id="1200:52" data-name="product-info">
                  <p className="fg-d172edbcf5" data-node-id="1200:53">
                    Hatamkari Mücevher Kutusu
                  </p>
                  <p className="fg-1d9d8b39af" data-node-id="915:3457">
                    SKU: PRD-KHT-2403
                  </p>
                </div>
                <p className="fg-32f42d0d34" data-node-id="915:3458">
                  Hatamkari Şiraz
                </p>
                <p className="fg-163a3502eb" data-node-id="915:3459">
                  Ahşap İşçiliği
                </p>
                <p className="fg-d06b3a3a9e" data-node-id="915:3460">
                  USD 150,00
                </p>
                <p className="fg-8fa02fdfb5" data-node-id="915:3461">
                  30 Adet
                </p>
                <div className="fg-7fee4cc88d" data-node-id="1200:54" data-name="status-cell">
                  <div className="fg-eb71b057e3" data-node-id="1200:55" data-name="status-badge">
                    <p className="fg-85012e9f69" data-node-id="1200:56">
                      İhracata Hazır
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="915:3465" data-name="actions">
                  <NegarinButton className="fg-24cad047bd" label="Taslak Ekle" />
                  <NegarinButton className="fg-458c3f730b" label="Detayları Gör" style="Secondary" />
                </div>
              </div>
              <div className="fg-491ec28ead" data-node-id="1200:62" data-name="product-row-PRD-CRM-2404">
                <div className="fg-006dc33734" data-node-id="1200:63" data-name="thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/792cd6d8.png" />
                </div>
                <div className="fg-1a00ed6a7f" data-node-id="1200:64" data-name="product-info">
                  <p className="fg-d172edbcf5" data-node-id="1200:65">
                    Lalejin Turkuaz Vazo
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1200:66">
                    SKU: PRD-CRM-2404
                  </p>
                </div>
                <p className="fg-32f42d0d34" data-node-id="1200:67">
                  Sefal-e Lalejin
                </p>
                <p className="fg-163a3502eb" data-node-id="1200:68">
                  Seramik
                </p>
                <p className="fg-d06b3a3a9e" data-node-id="1200:69">
                  USD 65,00
                </p>
                <p className="fg-8fa02fdfb5" data-node-id="1200:70">
                  85 Adet
                </p>
                <div className="fg-7fee4cc88d" data-node-id="1200:71" data-name="status-cell">
                  <div className="fg-eb71b057e3" data-node-id="1200:72" data-name="status-badge">
                    <p className="fg-85012e9f69" data-node-id="1200:73">
                      İhracata Hazır
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1200:74" data-name="actions">
                  <NegarinButton className="fg-24cad047bd" label="Taslak Ekle" />
                  <NegarinButton className="fg-458c3f730b" label="Detayları Gör" style="Secondary" />
                </div>
              </div>
              <div className="fg-491ec28ead" data-node-id="1200:80" data-name="product-row-PRD-TRM-2405">
                <div className="fg-006dc33734" data-node-id="1200:81" data-name="thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/42c22dfe.png" />
                </div>
                <div className="fg-1a00ed6a7f" data-node-id="1200:82" data-name="product-info">
                  <p className="fg-d172edbcf5" data-node-id="1200:83">
                    Yezd Termeh İpek Runner
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1200:84">
                    SKU: PRD-TRM-2405
                  </p>
                </div>
                <p className="fg-32f42d0d34" data-node-id="1200:85">
                  Baft-e Yezd
                </p>
                <p className="fg-163a3502eb" data-node-id="1200:86">
                  Tekstil
                </p>
                <p className="fg-d06b3a3a9e" data-node-id="1200:87">
                  USD 120,00
                </p>
                <p className="fg-8fa02fdfb5" data-node-id="1200:88">
                  0 Adet
                </p>
                <div className="fg-7fee4cc88d" data-node-id="1200:89" data-name="status-cell">
                  <div className="fg-286987ec42" data-node-id="1200:90" data-name="status-badge">
                    <p className="fg-5be4fd8550" data-node-id="1200:91">
                      Stok Tükendi
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1200:92" data-name="actions">
                  <NegarinButton className="fg-24cad047bd" label="Taslak Ekle" />
                  <NegarinButton className="fg-458c3f730b" label="Detayları Gör" style="Secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
