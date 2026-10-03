// Figma 915:8367 — Export Partner / Export Products - es
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

export default function ExportPartnerExportProductsEs() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="915:8367" data-name="Export Partner / Export Products - es">
      <ExportSidebar className="fg-c6c3968b81" data-node-id="1206:3410" data-name="Sidebar / es / Export Products - es">
        <div className="fg-9bc243bde1" data-node-id="I1206:3410;1206:494" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:3410;1206:453" data-name="brand-header">
            <div className="fg-458c46521a" data-node-id="I1206:3410;1206:454" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
            <div className="fg-7ae4f26cd2" data-node-id="I1206:3410;1206:455" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:3410;1206:456">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:3410;1206:457">
                Partner Portal
              </p>
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:3410;1206:458" data-name="nav-menu">
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3410;1206:459" data-name="nav-item-0" label="Panel de Control" destination="dashboard">
              <div className="fg-58d29b27c0" data-node-id="I1206:3410;1206:460" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b0f9b3dd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3410;1206:462">
                Panel de Control
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3410;1206:463" data-name="nav-item-1" label="Artistas de la Red" destination="network-artists">
              <div className="fg-58d29b27c0" data-node-id="I1206:3410;1206:464" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6a1c4a13.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3410;1206:466">
                Artistas de la Red
              </p>
            </ExportAction>
            <ExportAction className="fg-0b202358f2" data-node-id="I1206:3410;1206:467" data-name="nav-item-2" label="Productos de exportación" destination="export-products">
              <div className="fg-58d29b27c0" data-node-id="I1206:3410;1206:468" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/1e2a35d1.svg" />
              </div>
              <p className="fg-0c6bcb5085" data-node-id="I1206:3410;1206:470">
                Productos de exportación
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3410;1206:471" data-name="nav-item-3" label="Pedidos" destination="orders-list">
              <div className="fg-58d29b27c0" data-node-id="I1206:3410;1206:472" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d55e0bcd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3410;1206:474">
                Pedidos
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3410;1206:475" data-name="nav-item-4" label="Borradores de pedidos" destination="order-draft">
              <div className="fg-58d29b27c0" data-node-id="I1206:3410;1206:476" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/42a3600b.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3410;1206:478">
                Borradores de pedidos
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3410;1206:479" data-name="nav-item-5" label="Informes">
              <div className="fg-58d29b27c0" data-node-id="I1206:3410;1206:480" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e3297a1b.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3410;1206:482">
                Informes
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3410;1206:483" data-name="nav-item-6" label="Cuenta" destination="account-preferences">
              <div className="fg-58d29b27c0" data-node-id="I1206:3410;1206:484" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/a90beae8.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3410;1206:486">
                Cuenta
              </p>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:3410;1206:487" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:3410;1206:488" data-name="user-profile">
            <div className="fg-d05a0d0fe8" data-node-id="I1206:3410;1206:489" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
            <div className="fg-eb694bd6ff" data-node-id="I1206:3410;1206:490" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:3410;1206:491">
                Alejandro Sanz
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:3410;1206:492">
                Socio Gestor
              </p>
            </div>
          </div>
        </div>
      </ExportSidebar>
      <div className="fg-95773e0afe" data-node-id="915:8394" data-name="main-content">
        <div className="fg-0ce89bddfe" data-node-id="915:8395" data-name="topbar">
          <div className="fg-29404e38d0" data-node-id="915:8396" data-name="left-section">
            <p className="fg-8a4192bbc5" data-node-id="915:8397">
              Export Partner / Productos de exportación
            </p>
            <p className="fg-36dac9be9e" data-node-id="915:8398">
              Productos de exportación
            </p>
          </div>
          <div className="fg-a34c8fe932" data-node-id="915:8399" data-name="right-section">
            <ExportField className="fg-cd987897ce" data-node-id="915:8400" data-name="search-bar" label="Buscar productos, pedidos..." placeholder="Buscar productos, pedidos..." search>
              <div className="fg-c51752dc8c" data-node-id="915:8687" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d09790d0.svg" />
              </div>
              <p className="fg-605ff848ea" data-node-id="915:8402">
                Buscar productos, pedidos...
              </p>
            </ExportField>
            <ExportAction className="fg-9d9b633ec4" data-node-id="915:8403" data-name="notification-bell" label="notification-bell">
              <div className="fg-58d29b27c0" data-node-id="915:8747" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/7932733a.svg" />
              </div>
            </ExportAction>
          </div>
        </div>
        <div className="fg-597aaf7207" data-node-id="915:8405" data-name="content-wrapper">
          <div className="fg-c96fe10678" data-node-id="915:8406" data-name="catalog-action-bar">
            <div className="fg-ad50363799" data-node-id="915:8407" data-name="filters-and-search">
              <ExportField className="fg-841034ea1f" data-node-id="915:8408" data-name="search-catalog" label="Buscar productos..." placeholder="Buscar productos..." search>
                <div className="fg-5cca20e57d" data-node-id="915:8690" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/8a8d5cda.svg" />
                </div>
                <p className="fg-605ff848ea" data-node-id="915:8410">
                  Buscar productos...
                </p>
              </ExportField>
              <div className="fg-5bbbbaf5eb" data-node-id="915:8411" data-name="filter-destination">
                <p className="fg-5c46f152db" data-node-id="915:8412">
                  Destino: Todos
                </p>
                <div className="fg-8a0ff48924" data-node-id="915:8720" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-5bbbbaf5eb" data-node-id="1204:63" data-name="filter-category">
                <p className="fg-5c46f152db" data-node-id="915:8414">
                  Categoría: Todos
                </p>
                <div className="fg-8a0ff48924" data-node-id="1204:64" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-5bbbbaf5eb" data-node-id="915:8415" data-name="filter-inventory">
                <p className="fg-5c46f152db" data-node-id="1204:67">
                  Inventario: Todos
                </p>
                <div className="fg-8a0ff48924" data-node-id="1204:68" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
            </div>
            <p className="fg-2708f493f7" data-node-id="1204:70">
              <span className="fg-32bd4c7660">{`Mostrando `}</span>
              <span className="fg-5474cd2cce">5 productos</span>
            </p>
          </div>
          <div className="fg-df58b696c2" data-node-id="1204:71" data-name="catalog-table-card">
            <div className="fg-153c0a1809" data-node-id="1204:72" data-name="table-view">
              <div className="fg-68c69a98d8" data-node-id="1204:73" data-name="table-head">
                <p className="fg-619b4baa27" data-node-id="1204:74">
                  Imagen
                </p>
                <p className="fg-4a9b73a3b7" data-node-id="915:8422">
                  Producto
                </p>
                <p className="fg-32bcc2d56d">Categoría</p>
                <p className="fg-fcc20f756c">Taller / Artista</p>
                <p className="fg-0c0e4accff" data-node-id="1204:75">
                  Precio
                </p>
                <p className="fg-74b68c679c" data-node-id="1204:76">
                  Inventario
                </p>
                <p className="fg-b841a63777" data-node-id="915:8427">
                  Estado exportación
                </p>
                <p className="fg-6b527a72cb">Acciones</p>
              </div>
              <div className="fg-b9604e44e5" data-node-id="1204:77" data-name="table-row-0">
                <div className="fg-006dc33734" data-node-id="1204:78" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/b1ee3b7f.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1204:79" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1204:80">
                    Plato esmaltado Minakari de Isfahán
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1204:81">
                    SKU: PRD-MNK-2401
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="1204:82">
                  Minakari
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1204:83">
                  Taller Isfahán
                </p>
                <p className="fg-a2be40cc14">$95.00</p>
                <p className="fg-5d005000d0">45</p>
                <div className="fg-34fbe2d314" data-node-id="1204:84" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1204:85" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="915:8440">
                      Listo para exportar
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1204:86" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Añadir al borrador" />
                  <NegarinButton className="fg-b643913e86" label="Ver detalles" style="Secondary" />
                </div>
              </div>
              <div className="fg-b9604e44e5" data-node-id="1204:92" data-name="table-row-1">
                <div className="fg-006dc33734" data-node-id="1204:93" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/19a7ddbb.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1204:94" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1204:95">
                    Kilim tejido a mano de Tabriz
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="915:8448">
                    SKU: PRD-KLM-2402
                  </p>
                </div>
                <p className="fg-ba9497694a">Kilim</p>
                <p className="fg-2f913c6df5">Kilim Bafan Kerman</p>
                <p className="fg-611c34ed77" data-node-id="1204:96">
                  $280.00
                </p>
                <p className="fg-e7d992e3a3" data-node-id="1204:97">
                  12
                </p>
                <div className="fg-34fbe2d314" data-node-id="1204:98" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1204:99" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1204:100">
                      Listo para exportar
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1204:101" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Añadir al borrador" />
                  <NegarinButton className="fg-b643913e86" label="Ver detalles" style="Secondary" />
                </div>
              </div>
              <div className="fg-b9604e44e5" data-node-id="1204:107" data-name="table-row-2">
                <div className="fg-006dc33734" data-node-id="1204:108" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/58fd72b0.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1204:109" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1204:110">
                    Caja Khatamkari de Shiraz
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1204:111">
                    SKU: PRD-KHT-2403
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="1204:112">
                  Artesanía madera
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1204:113">
                  Khatamkari Shiraz
                </p>
                <p className="fg-611c34ed77" data-node-id="915:8466">
                  $150.00
                </p>
                <p className="fg-5d005000d0">30</p>
                <div className="fg-34fbe2d314" data-node-id="1204:114" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1204:115" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1204:116">
                      Listo para exportar
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1204:117" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Añadir al borrador" />
                  <NegarinButton className="fg-b643913e86" label="Ver detalles" style="Secondary" />
                </div>
              </div>
              <div className="fg-b9604e44e5" data-node-id="1204:123" data-name="table-row-3">
                <div className="fg-006dc33734" data-node-id="1204:124" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/792cd6d8.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1204:125" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1204:126">
                    Jarrón turquesa de Lalejin
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1204:127">
                    SKU: PRD-CRM-2404
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="915:8479">
                  Cerámica
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1204:128">
                  Sefal-e Lalejin
                </p>
                <p className="fg-611c34ed77" data-node-id="1204:129">
                  $65.00
                </p>
                <p className="fg-e7d992e3a3" data-node-id="1204:130">
                  85
                </p>
                <div className="fg-34fbe2d314" data-node-id="1204:131" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1204:132" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1204:133">
                      Listo para exportar
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1204:134" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Añadir al borrador" />
                  <NegarinButton className="fg-b643913e86" label="Ver detalles" style="Secondary" />
                </div>
              </div>
              <div className="fg-79f7f85994" data-node-id="1204:140" data-name="table-row-4">
                <div className="fg-006dc33734" data-node-id="1204:141" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/42c22dfe.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1204:142" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1204:143">
                    Camino de seda Termeh de Yazd
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1204:144">
                    SKU: PRD-TRM-2405
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="1204:145">
                  Textil
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1204:146">
                  Baft-e Yazd
                </p>
                <p className="fg-611c34ed77" data-node-id="1204:147">
                  $120.00
                </p>
                <p className="fg-e7d992e3a3" data-node-id="1204:148">
                  0
                </p>
                <div className="fg-34fbe2d314" data-node-id="1204:149" data-name="Frame">
                  <div className="fg-5cff65f215" data-node-id="1204:150" data-name="Frame">
                    <p className="fg-5be4fd8550" data-node-id="1204:151">
                      Agotado
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1204:152" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Añadir al borrador" />
                  <NegarinButton className="fg-b643913e86" label="Ver detalles" style="Secondary" />
                </div>
              </div>
            </div>
            <div className="fg-278a6f0953" data-node-id="1204:158" data-name="table-pagination">
              <p className="fg-833f78313e">Mostrando 1 a 5 de 5 productos</p>
              <div className="fg-92b7da7864" data-node-id="1204:160" data-name="pagination-controls">
                <ExportAction className="fg-b878995460" data-node-id="1204:161" data-name="btn-prev" label="Anterior">
                  <p className="fg-854f5de0f2" data-node-id="1204:162">
                    Anterior
                  </p>
                </ExportAction>
                <ExportAction className="fg-b878995460" data-node-id="1204:163" data-name="btn-next" label="Siguiente">
                  <p className="fg-854f5de0f2" data-node-id="1204:164">
                    Siguiente
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
