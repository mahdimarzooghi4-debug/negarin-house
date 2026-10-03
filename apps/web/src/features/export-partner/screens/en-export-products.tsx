// Figma 915:551 — Export Partner / Export Products — en
import { ExportSidebar, ExportAction, ExportField } from "../export-controls";

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

export default function ExportPartnerExportProductsEn() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="915:551" data-name="Export Partner / Export Products — en">
      <ExportSidebar className="fg-c6c3968b81" data-node-id="1206:638" data-name="Sidebar / en / Export Products — en">
        <div className="fg-9bc243bde1" data-node-id="I1206:638;1206:494" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:638;1206:453" data-name="brand-header">
            <div className="fg-458c46521a" data-node-id="I1206:638;1206:454" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
            <div className="fg-7ae4f26cd2" data-node-id="I1206:638;1206:455" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:638;1206:456">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:638;1206:457">
                Partner Portal
              </p>
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:638;1206:458" data-name="nav-menu">
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:638;1206:459" data-name="nav-item-0" label="Dashboard" destination="dashboard">
              <div className="fg-58d29b27c0" data-node-id="I1206:638;1206:460" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b0f9b3dd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:638;1206:462">
                Dashboard
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:638;1206:463" data-name="nav-item-1" label="Network/Artists" destination="network-artists">
              <div className="fg-58d29b27c0" data-node-id="I1206:638;1206:464" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6a1c4a13.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:638;1206:466">
                Network/Artists
              </p>
            </ExportAction>
            <ExportAction className="fg-0b202358f2" data-node-id="I1206:638;1206:467" data-name="nav-item-2" label="Export Products" destination="export-products">
              <div className="fg-58d29b27c0" data-node-id="I1206:638;1206:468" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/1e2a35d1.svg" />
              </div>
              <p className="fg-0c6bcb5085" data-node-id="I1206:638;1206:470">
                Export Products
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:638;1206:471" data-name="nav-item-3" label="Orders" destination="orders-list">
              <div className="fg-58d29b27c0" data-node-id="I1206:638;1206:472" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/9036072d.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:638;1206:474">
                Orders
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:638;1206:475" data-name="nav-item-4" label="Order Drafts" destination="order-draft">
              <div className="fg-58d29b27c0" data-node-id="I1206:638;1206:476" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6aa4a031.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:638;1206:478">
                Order Drafts
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:638;1206:479" data-name="nav-item-5" label="Reports">
              <div className="fg-58d29b27c0" data-node-id="I1206:638;1206:480" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e3297a1b.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:638;1206:482">
                Reports
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:638;1206:483" data-name="nav-item-6" label="Account" destination="account-preferences">
              <div className="fg-58d29b27c0" data-node-id="I1206:638;1206:484" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/a0340f13.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:638;1206:486">
                Account
              </p>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:638;1206:487" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:638;1206:488" data-name="user-profile">
            <div className="fg-d05a0d0fe8" data-node-id="I1206:638;1206:489" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
            <div className="fg-eb694bd6ff" data-node-id="I1206:638;1206:490" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:638;1206:491">
                EuroDesign GmbH
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:638;1206:492">
                ID: EXP-4902
              </p>
            </div>
          </div>
        </div>
      </ExportSidebar>
      <div className="fg-95773e0afe" data-node-id="915:587" data-name="main-content-area">
        <div className="fg-bb9338a234" data-node-id="915:588" data-name="portal-topbar">
          <p className="fg-ac57a5ba08" data-node-id="915:589">
            Export Products
          </p>
          <div className="fg-a34c8fe932" data-node-id="915:590" data-name="topbar-actions">
            <ExportField className="fg-0b33f69ef8" data-node-id="915:591" data-name="search-container" label="Search products, orders..." placeholder="Search products, orders..." search>
              <div className="fg-c51752dc8c" data-node-id="915:861" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d09790d0.svg" />
              </div>
              <p className="fg-605ff848ea" data-node-id="915:593">
                Search products, orders...
              </p>
            </ExportField>
            <ExportAction className="fg-9d9b633ec4" data-node-id="915:594" data-name="notification-bell" label="notification-bell">
              <div className="fg-58d29b27c0" data-node-id="915:864" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/622a87ab.svg" />
              </div>
            </ExportAction>
          </div>
        </div>
        <div className="fg-318cb33346" data-node-id="915:596" data-name="scrollable-content">
          <div className="fg-c96fe10678" data-node-id="1199:7" data-name="catalog-action-bar">
            <div className="fg-ad50363799" data-node-id="1199:8" data-name="filters-and-search">
              <ExportField className="fg-841034ea1f" data-node-id="1199:9" data-name="search-catalog" label="Search products..." placeholder="Search products..." search>
                <div className="fg-5cca20e57d" data-node-id="1199:10" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/a9bd414e.svg" />
                </div>
                <p className="fg-605ff848ea" data-node-id="1199:12">
                  Search products...
                </p>
              </ExportField>
              <div className="fg-5bbbbaf5eb" data-node-id="1199:13" data-name="filter-destination">
                <p className="fg-5c46f152db" data-node-id="1199:14">
                  Destination: All
                </p>
                <div className="fg-8a0ff48924" data-node-id="1199:15" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-5bbbbaf5eb" data-node-id="1199:17" data-name="filter-category">
                <p className="fg-5c46f152db" data-node-id="1199:18">
                  Category: All
                </p>
                <div className="fg-8a0ff48924" data-node-id="1199:19" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-5bbbbaf5eb" data-node-id="1199:21" data-name="filter-inventory">
                <p className="fg-5c46f152db" data-node-id="1199:22">
                  Inventory: All
                </p>
                <div className="fg-8a0ff48924" data-node-id="1199:23" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
            </div>
            <div className="fg-2a56071f93" data-node-id="1199:25" data-name="bulk-actions" />
          </div>
          <div className="fg-df58b696c2" data-node-id="1199:32" data-name="catalog-table-card">
            <div className="fg-153c0a1809" data-node-id="1199:33" data-name="table-view">
              <div className="fg-12bdcbcaf4" data-node-id="1199:34" data-name="table-head">
                <p className="fg-619b4baa27" data-node-id="1199:35">
                  Thumbnail
                </p>
                <p className="fg-4a9b73a3b7" data-node-id="1199:36">
                  Product
                </p>
                <p className="fg-097e9474ee" data-node-id="1199:37">
                  Category
                </p>
                <p className="fg-96c68af9d8" data-node-id="1199:38">
                  Artist / Workshop
                </p>
                <p className="fg-0c0e4accff" data-node-id="1199:39">
                  Price
                </p>
                <p className="fg-b9d8972872" data-node-id="1199:40">
                  Inventory
                </p>
                <p className="fg-fc82b04d0c" data-node-id="1199:41">
                  Export Status
                </p>
                <p className="fg-bacee74b35" data-node-id="1199:42">
                  Actions
                </p>
              </div>
              <div className="fg-a4d047ecbd" data-node-id="1199:43" data-name="table-row-0">
                <div className="fg-006dc33734" data-node-id="1199:44" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/b1ee3b7f.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1199:45" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1199:46">
                    Minakari Enamel Plate
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1199:47">
                    SKU: PRD-MNK-2401
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="1199:48">
                  Minakari
                </p>
                <p className="fg-c8246ad9d1" data-node-id="1199:49">
                  Atelier Isfahan
                </p>
                <p className="fg-611c34ed77" data-node-id="1199:50">
                  $95.00
                </p>
                <p className="fg-149bbc486f" data-node-id="1199:51">
                  45
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1199:52" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1199:53" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1199:54">
                      Export Ready
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1199:55" data-name="product-actions">
                  <NegarinButton className="fg-24cad047bd" label="Add to draft" />
                  <NegarinButton className="fg-458c3f730b" label="View details" style="Secondary" />
                </div>
              </div>
              <div className="fg-a4d047ecbd" data-node-id="1199:61" data-name="table-row-1">
                <div className="fg-006dc33734" data-node-id="1199:62" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/19a7ddbb.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1199:63" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1199:64">
                    Hand-woven Tabriz Kilim
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1199:65">
                    SKU: PRD-KLM-2402
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="1199:66">
                  Kilim
                </p>
                <p className="fg-c8246ad9d1" data-node-id="1199:67">
                  Kilim Bafan Kerman
                </p>
                <p className="fg-611c34ed77" data-node-id="1199:68">
                  $280.00
                </p>
                <p className="fg-149bbc486f" data-node-id="1199:69">
                  12
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1199:70" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1199:71" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1199:72">
                      Export Ready
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1199:73" data-name="product-actions">
                  <NegarinButton className="fg-24cad047bd" label="Add to draft" />
                  <NegarinButton className="fg-458c3f730b" label="View details" style="Secondary" />
                </div>
              </div>
              <div className="fg-a4d047ecbd" data-node-id="1199:79" data-name="table-row-2">
                <div className="fg-006dc33734" data-node-id="1199:80" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/58fd72b0.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1199:81" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1199:82">
                    Khatam Inlaid Jewelry Box
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1199:83">
                    SKU: PRD-KHT-2403
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="1199:84">
                  Woodcraft
                </p>
                <p className="fg-c8246ad9d1" data-node-id="1199:85">
                  Khatam-kari Shiraz
                </p>
                <p className="fg-611c34ed77" data-node-id="1199:86">
                  $150.00
                </p>
                <p className="fg-149bbc486f" data-node-id="1199:87">
                  30
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1199:88" data-name="Frame">
                  <div className="fg-b699aaedec" data-node-id="1199:89" data-name="Frame">
                    <p className="fg-1fa66405f6" data-node-id="1199:90">
                      Export Ready
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1199:91" data-name="product-actions">
                  <NegarinButton className="fg-24cad047bd" label="Add to draft" />
                  <NegarinButton className="fg-458c3f730b" label="View details" style="Secondary" />
                </div>
              </div>
              <div className="fg-a4d047ecbd" data-node-id="1199:97" data-name="table-row-3">
                <div className="fg-006dc33734" data-node-id="1199:98" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/792cd6d8.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1199:99" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1199:100">
                    Turquoise Lalejin Vase
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1199:101">
                    SKU: PRD-CRM-2404
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="1199:102">
                  Ceramics
                </p>
                <p className="fg-c8246ad9d1" data-node-id="1199:103">
                  Sefal-e Lalejin
                </p>
                <p className="fg-611c34ed77" data-node-id="1199:104">
                  $65.00
                </p>
                <p className="fg-149bbc486f" data-node-id="1199:105">
                  85
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1199:106" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1199:107" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1199:108">
                      Export Ready
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1199:109" data-name="product-actions">
                  <NegarinButton className="fg-24cad047bd" label="Add to draft" />
                  <NegarinButton className="fg-458c3f730b" label="View details" style="Secondary" />
                </div>
              </div>
              <div className="fg-a4d047ecbd" data-node-id="1199:115" data-name="table-row-4">
                <div className="fg-006dc33734" data-node-id="1199:116" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/42c22dfe.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1199:117" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1199:118">
                    Termeh Yazd Silk Runner
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1199:119">
                    SKU: PRD-TRM-2405
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="1199:120">
                  Textiles
                </p>
                <p className="fg-c8246ad9d1" data-node-id="1199:121">
                  Baft-e Yazd
                </p>
                <p className="fg-611c34ed77" data-node-id="1199:122">
                  $120.00
                </p>
                <p className="fg-149bbc486f" data-node-id="1199:123">
                  0
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1199:124" data-name="Frame">
                  <div className="fg-5cff65f215" data-node-id="1199:125" data-name="Frame">
                    <p className="fg-5be4fd8550" data-node-id="1199:126">
                      Out of Stock
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1199:127" data-name="product-actions">
                  <NegarinButton className="fg-24cad047bd" label="Add to draft" />
                  <NegarinButton className="fg-458c3f730b" label="View details" style="Secondary" />
                </div>
              </div>
            </div>
            <div className="fg-278a6f0953" data-node-id="1199:133" data-name="table-pagination">
              <p className="fg-ef9af842dd" data-node-id="1199:134">
                Showing 1 to 5 of 48 products
              </p>
              <div className="fg-92b7da7864" data-node-id="1199:135" data-name="pagination-controls">
                <ExportAction className="fg-b878995460" data-node-id="1199:136" data-name="btn-prev" label="Previous">
                  <p className="fg-854f5de0f2" data-node-id="1199:137">
                    Previous
                  </p>
                </ExportAction>
                <ExportAction className="fg-b878995460" data-node-id="1199:138" data-name="btn-next" label="Next">
                  <p className="fg-854f5de0f2" data-node-id="1199:139">
                    Next
                  </p>
                </ExportAction>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
