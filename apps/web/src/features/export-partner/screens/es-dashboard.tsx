// Figma 915:8050 — Export Partner / Dashboard — es
import { ExportSidebar, ExportAction, ExportField } from "../export-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Small";
  state?: "Default";
  style?: "Primary";
};

function NegarinButton({ className, label = "ادامه", size: _size = "Small", state: _state = "Default", style: _style = "Primary" }: NegarinButtonProps) {
  return (
    <ExportAction label={label} destination="export-products" className={className || "bg-[var(--negarin-action-primary-background,#041b65)] content-stretch flex h-[36px] items-center justify-center px-[12px] relative rounded-[var(--negarin-radius-control,12px)] w-[140px]"} data-node-id="46:2">
      <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:3">
        {label}
      </p>
    </ExportAction>
  );
}

export default function ExportPartnerDashboardEs() {
  return (
    <div className="fg-6d2e928743" data-node-id="915:8050" data-name="Export Partner / Dashboard — es">
      <ExportSidebar className="fg-c78fefc68e" data-node-id="1206:3326" data-name="Sidebar / es / Dashboard — es">
        <div className="fg-9bc243bde1" data-node-id="I1206:3326;1206:494" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:3326;1206:453" data-name="brand-header">
            <div className="fg-458c46521a" data-node-id="I1206:3326;1206:454" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
            <div className="fg-7ae4f26cd2" data-node-id="I1206:3326;1206:455" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:3326;1206:456">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:3326;1206:457">
                Partner Portal
              </p>
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:3326;1206:458" data-name="nav-menu">
            <ExportAction className="fg-0b202358f2" data-node-id="I1206:3326;1206:459" data-name="nav-item-0" label="Panel de Control" destination="dashboard">
              <div className="fg-58d29b27c0" data-node-id="I1206:3326;1206:460" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/90bffe89.svg" />
              </div>
              <p className="fg-0c6bcb5085" data-node-id="I1206:3326;1206:462">
                Panel de Control
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3326;1206:463" data-name="nav-item-1" label="Artistas de la Red" destination="network-artists">
              <div className="fg-58d29b27c0" data-node-id="I1206:3326;1206:464" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e55ce224.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3326;1206:466">
                Artistas de la Red
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3326;1206:467" data-name="nav-item-2" label="Productos de exportación" destination="export-products">
              <div className="fg-58d29b27c0" data-node-id="I1206:3326;1206:468" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/2fe75b2a.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3326;1206:470">
                Productos de exportación
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3326;1206:471" data-name="nav-item-3" label="Pedidos" destination="orders-list">
              <div className="fg-58d29b27c0" data-node-id="I1206:3326;1206:472" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d55e0bcd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3326;1206:474">
                Pedidos
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3326;1206:475" data-name="nav-item-4" label="Borradores de pedidos" destination="order-draft">
              <div className="fg-58d29b27c0" data-node-id="I1206:3326;1206:476" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/ab7ee671.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3326;1206:478">
                Borradores de pedidos
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3326;1206:479" data-name="nav-item-5" label="Informes">
              <div className="fg-58d29b27c0" data-node-id="I1206:3326;1206:480" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/70374f56.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3326;1206:482">
                Informes
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:3326;1206:483" data-name="nav-item-6" label="Cuenta" destination="account-preferences">
              <div className="fg-58d29b27c0" data-node-id="I1206:3326;1206:484" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/fb31637d.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:3326;1206:486">
                Cuenta
              </p>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:3326;1206:487" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:3326;1206:488" data-name="user-profile">
            <div className="fg-d05a0d0fe8" data-node-id="I1206:3326;1206:489" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
            <div className="fg-eb694bd6ff" data-node-id="I1206:3326;1206:490" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:3326;1206:491">
                Alejandro Sanz
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:3326;1206:492">
                Socio Gestor
              </p>
            </div>
          </div>
        </div>
      </ExportSidebar>
      <div className="fg-c92c0aceed" data-node-id="915:8077" data-name="main-content">
        <div className="fg-da0a20a5fb" data-node-id="915:8078" data-name="topbar">
          <div className="fg-29404e38d0" data-node-id="915:8079" data-name="left-section">
            <p className="fg-8a4192bbc5" data-node-id="915:8080">
              Export Partner / Dashboard
            </p>
            <p className="fg-36dac9be9e" data-node-id="915:8081">
              Panel de Control de Exportación
            </p>
          </div>
          <div className="fg-a34c8fe932" data-node-id="915:8082" data-name="right-section">
            <ExportField className="fg-fa58954494" data-node-id="915:8083" data-name="search-bar" label="Buscar..." placeholder="Buscar..." search>
              <div className="fg-c51752dc8c" data-node-id="915:8678" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/c8ffb594.svg" />
              </div>
              <p className="fg-5d80891ca2" data-node-id="915:8085">
                Buscar...
              </p>
            </ExportField>
            <ExportAction className="fg-969e755a8a" data-node-id="915:8086" data-name="notification-bell" label="notification-bell">
              <div className="fg-58d29b27c0" data-node-id="915:8741" data-name="bell-dot">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e578d0ba.svg" />
              </div>
            </ExportAction>
          </div>
        </div>
        <div className="fg-597aaf7207" data-node-id="915:8088" data-name="content-wrapper">
          <div className="fg-7a98ae2751" data-node-id="1206:388" data-name="primary-action-card">
            <div className="fg-c96fe10678" data-node-id="1206:389" data-name="action-header">
              <div className="fg-293d4b346b" data-node-id="1206:390" data-name="action-copy">
                <p className="fg-20c0cefedf" data-node-id="1206:391">
                  Acceso rápido a productos
                </p>
                <p className="fg-a122c0304b" data-node-id="1206:392">
                  Explora el catálogo de productos de exportación y continúa con tu flujo habitual desde la misma interfaz.
                </p>
              </div>
              <NegarinButton className="fg-1c0550e0fd" label="Explorar productos de exportación" />
            </div>
          </div>
          <div className="fg-b13473824d" data-node-id="915:8089" data-name="kpi-row">
            <div className="fg-cb000faab6" data-node-id="915:8090" data-name="kpi-card-0">
              <div className="fg-c96fe10678" data-node-id="915:8091" data-name="Frame">
                <p className="fg-a8d7f282bb" data-node-id="915:8092">
                  Pedidos Activos
                </p>
                <div className="fg-9f73394a60" data-node-id="915:8093" data-name="Frame">
                  <div className="fg-c51752dc8c" data-node-id="915:8753" data-name="truck">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/68220867.svg" />
                  </div>
                </div>
              </div>
              <div className="fg-101191c5ef" data-node-id="915:8095" data-name="Frame">
                <p className="fg-dda9ce0269" data-node-id="915:8096">
                  47
                </p>
                <p className="fg-a8fe3f7b80" data-node-id="915:8097">
                  En tránsito
                </p>
              </div>
            </div>
            <div className="fg-cb000faab6" data-node-id="915:8098" data-name="kpi-card-1">
              <div className="fg-c96fe10678" data-node-id="915:8099" data-name="Frame">
                <p className="fg-a8d7f282bb" data-node-id="915:8100">
                  Valor Total de Pedidos
                </p>
                <div className="fg-d9fed66607" data-node-id="915:8101" data-name="Frame">
                  <div className="fg-c51752dc8c" data-node-id="915:8708" data-name="wallet">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/82734a94.svg" />
                  </div>
                </div>
              </div>
              <div className="fg-101191c5ef" data-node-id="915:8103" data-name="Frame">
                <p className="fg-dda9ce0269" data-node-id="915:8104">
                  $124,500
                </p>
                <p className="fg-a8fe3f7b80" data-node-id="915:8105">
                  +12.4% vs mes anterior
                </p>
              </div>
            </div>
            <div className="fg-cb000faab6" data-node-id="915:8106" data-name="kpi-card-2">
              <div className="fg-c96fe10678" data-node-id="915:8107" data-name="Frame">
                <p className="fg-a8d7f282bb" data-node-id="915:8108">
                  Mercados Activos
                </p>
                <div className="fg-2de19a11eb" data-node-id="915:8109" data-name="Frame">
                  <div className="fg-c51752dc8c" data-node-id="915:8768" data-name="chart-network">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/23a359ce.svg" />
                  </div>
                </div>
              </div>
              <div className="fg-101191c5ef" data-node-id="915:8111" data-name="Frame">
                <p className="fg-dda9ce0269" data-node-id="915:8112">
                  4
                </p>
                <p className="fg-a8fe3f7b80" data-node-id="915:8113">
                  UE, RU, TR, Global
                </p>
              </div>
            </div>
            <div className="fg-cb000faab6" data-node-id="915:8114" data-name="kpi-card-3">
              <div className="fg-c96fe10678" data-node-id="915:8115" data-name="Frame">
                <p className="fg-a8d7f282bb" data-node-id="915:8116">
                  Artistas en Exportación
                </p>
                <div className="fg-86894b1c96" data-node-id="915:8117" data-name="Frame">
                  <div className="fg-c51752dc8c" data-node-id="915:8738" data-name="guitar">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/70c0b271.svg" />
                  </div>
                </div>
              </div>
              <div className="fg-101191c5ef" data-node-id="915:8119" data-name="Frame">
                <p className="fg-dda9ce0269" data-node-id="915:8120">
                  89
                </p>
                <p className="fg-a8fe3f7b80" data-node-id="915:8121">
                  Autores representados
                </p>
              </div>
            </div>
          </div>
          <div className="fg-b13473824d" data-node-id="915:8122" data-name="Frame">
            <div className="fg-74b6c2ebf3" data-node-id="915:8123" data-name="Frame">
              <div className="fg-43fc3f35b0" data-node-id="915:8124" data-name="Frame">
                <p className="fg-e2575f513c" data-node-id="915:8125">
                  Evolución de Ingresos (USD)
                </p>
                <p className="fg-96e90c3117" data-node-id="915:8126">
                  Ver Informe Completo
                </p>
              </div>
              <div className="fg-ea085e2cef" data-node-id="915:8127" data-name="Frame">
                <div className="fg-89862f9edc" data-node-id="915:8128" data-name="Frame">
                  <div className="fg-ccb4582961" data-node-id="915:8129" data-name="Frame">
                    <div className="fg-be9eccd508" data-node-id="915:8130" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8131">
                      Ene
                    </p>
                  </div>
                  <div className="fg-ccb4582961" data-node-id="915:8132" data-name="Frame">
                    <div className="fg-0bbcbc9895" data-node-id="915:8133" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8134">
                      Feb
                    </p>
                  </div>
                  <div className="fg-ccb4582961" data-node-id="915:8135" data-name="Frame">
                    <div className="fg-51e59cfccb" data-node-id="915:8136" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8137">
                      Mar
                    </p>
                  </div>
                  <div className="fg-ccb4582961" data-node-id="915:8138" data-name="Frame">
                    <div className="fg-6702b33d69" data-node-id="915:8139" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8140">
                      Abr
                    </p>
                  </div>
                  <div className="fg-ccb4582961" data-node-id="915:8141" data-name="Frame">
                    <div className="fg-f7be32938a" data-node-id="915:8142" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8143">
                      May
                    </p>
                  </div>
                  <div className="fg-ccb4582961" data-node-id="915:8144" data-name="Frame">
                    <div className="fg-00686d1269" data-node-id="915:8145" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8146">
                      Jun
                    </p>
                  </div>
                  <div className="fg-ccb4582961" data-node-id="915:8147" data-name="Frame">
                    <div className="fg-ce1296ffeb" data-node-id="915:8148" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8149">
                      Jul
                    </p>
                  </div>
                  <div className="fg-ccb4582961" data-node-id="915:8150" data-name="Frame">
                    <div className="fg-6e27eb25f7" data-node-id="915:8151" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8152">
                      Ago
                    </p>
                  </div>
                  <div className="fg-ccb4582961" data-node-id="915:8153" data-name="Frame">
                    <div className="fg-4c1659b724" data-node-id="915:8154" data-name="Rectangle" />
                    <p className="fg-6e59021a3e" data-node-id="915:8155">
                      Sep
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-3457e4d147" data-node-id="915:8156" data-name="Frame">
              <p className="fg-d837ff618b" data-node-id="915:8157">
                Distribución por Mercado
              </p>
              <div className="fg-e8efcc8266" data-node-id="915:8158" data-name="Frame">
                <div className="fg-23662eaf14" data-node-id="915:8159" data-name="chart-frame">
                  <div className="fg-564248c110" data-node-id="915:8160" data-name="Ellipse">
                    <div className="fg-4bd9ac1305">
                      <img alt="" className="fg-acc3667e96" src="/export-partner-assets/c36fa5ad.svg" />
                    </div>
                  </div>
                  <div className="fg-564248c110" data-node-id="915:8161" data-name="Ellipse">
                    <div className="fg-5b7b63f1ff">
                      <img alt="" className="fg-acc3667e96" src="/export-partner-assets/5ca56b0b.svg" />
                    </div>
                  </div>
                  <div className="fg-564248c110" data-node-id="915:8162" data-name="Ellipse">
                    <div className="fg-6acf6b6b5b">
                      <img alt="" className="fg-acc3667e96" src="/export-partner-assets/4a0bfc2e.svg" />
                    </div>
                  </div>
                  <div className="fg-564248c110" data-node-id="915:8163" data-name="Ellipse">
                    <div className="fg-89073730bb">
                      <img alt="" className="fg-acc3667e96" src="/export-partner-assets/351552c8.svg" />
                    </div>
                  </div>
                  <div className="fg-13c14e09ea" data-node-id="915:8164" data-name="Frame">
                    <p className="fg-375f23bdd7" data-node-id="915:8165">
                      4
                    </p>
                    <p className="fg-abf827cb3e" data-node-id="915:8166">
                      Regiones
                    </p>
                  </div>
                </div>
                <div className="fg-62f39da6b2" data-node-id="915:8167" data-name="Frame">
                  <div className="fg-c96fe10678" data-node-id="915:8168" data-name="Frame">
                    <div className="fg-9eae8902b4" data-node-id="915:8169" data-name="Frame">
                      <div className="fg-fc08538add" data-node-id="915:8170" data-name="Ellipse">
                        <img alt="" className="fg-8faf267d30" src="/export-partner-assets/8aa0ea2e.svg" />
                      </div>
                      <p className="fg-57fb9fa32a" data-node-id="915:8171">
                        Unión Europea (UE)
                      </p>
                    </div>
                    <p className="fg-d0fec9e082" data-node-id="915:8172">
                      50%
                    </p>
                  </div>
                  <div className="fg-c96fe10678" data-node-id="915:8173" data-name="Frame">
                    <div className="fg-9eae8902b4" data-node-id="915:8174" data-name="Frame">
                      <div className="fg-fc08538add" data-node-id="915:8175" data-name="Ellipse">
                        <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f7f1cde2.svg" />
                      </div>
                      <p className="fg-57fb9fa32a" data-node-id="915:8176">
                        Reino Unido (RU)
                      </p>
                    </div>
                    <p className="fg-d0fec9e082" data-node-id="915:8177">
                      28%
                    </p>
                  </div>
                  <div className="fg-c96fe10678" data-node-id="915:8178" data-name="Frame">
                    <div className="fg-9eae8902b4" data-node-id="915:8179" data-name="Frame">
                      <div className="fg-fc08538add" data-node-id="915:8180" data-name="Ellipse">
                        <img alt="" className="fg-8faf267d30" src="/export-partner-assets/0ca64170.svg" />
                      </div>
                      <p className="fg-57fb9fa32a" data-node-id="915:8181">
                        Turquía (TR)
                      </p>
                    </div>
                    <p className="fg-d0fec9e082" data-node-id="915:8182">
                      14%
                    </p>
                  </div>
                  <div className="fg-c96fe10678" data-node-id="915:8183" data-name="Frame">
                    <div className="fg-9eae8902b4" data-node-id="915:8184" data-name="Frame">
                      <div className="fg-fc08538add" data-node-id="915:8185" data-name="Ellipse">
                        <img alt="" className="fg-8faf267d30" src="/export-partner-assets/19d78fa6.svg" />
                      </div>
                      <p className="fg-57fb9fa32a" data-node-id="915:8186">
                        Otros Mercados
                      </p>
                    </div>
                    <p className="fg-d0fec9e082" data-node-id="915:8187">
                      8%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fg-883749e5b7" data-node-id="915:8188" data-name="Frame">
            <p className="fg-d837ff618b" data-node-id="915:8189">
              Pedidos Recientes de Exportación
            </p>
            <div className="fg-153c0a1809" data-node-id="915:8190" data-name="Frame">
              <div className="fg-e1bde1e062" data-node-id="915:8191" data-name="Frame">
                <p className="fg-7f2be8036c" data-node-id="915:8192">
                  ID Pedido
                </p>
                <p className="fg-4a9b73a3b7" data-node-id="915:8193">
                  Artista / Álbum
                </p>
                <p className="fg-7f2be8036c" data-node-id="915:8194">
                  Destino
                </p>
                <p className="fg-7f2be8036c" data-node-id="915:8195">
                  Total
                </p>
                <p className="fg-7f2be8036c" data-node-id="915:8196">
                  Estado
                </p>
              </div>
              <div className="fg-0c6e34b373" data-node-id="915:8197" data-name="Frame">
                <ExportAction className="fg-ad660d6227" data-node-id="915:8198" label="XORD-4509" destination="order-detail">
                  XORD-4509
                </ExportAction>
                <div className="fg-1a00ed6a7f" data-node-id="915:8199" data-name="Frame">
                  <p className="fg-cbb98471f3" data-node-id="915:8200">
                    El Madrileño - Vinilo
                  </p>
                  <p className="fg-4ef702aacd" data-node-id="915:8201">
                    C. Tangana
                  </p>
                </div>
                <p className="fg-2909c904ba" data-node-id="915:8202">
                  Alemania (UE)
                </p>
                <p className="fg-ad660d6227" data-node-id="915:8203">
                  €4,250.00
                </p>
                <div className="fg-447401f34f" data-node-id="915:8204" data-name="Frame">
                  <div className="fg-9401e93a84" data-node-id="915:8205" data-name="Frame">
                    <p className="fg-ad820720ff" data-node-id="915:8206">
                      Enviado
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-0c6e34b373" data-node-id="915:8207" data-name="Frame">
                <ExportAction className="fg-ad660d6227" data-node-id="915:8208" label="XORD-4508" destination="order-detail">
                  XORD-4508
                </ExportAction>
                <div className="fg-1a00ed6a7f" data-node-id="915:8209" data-name="Frame">
                  <p className="fg-cbb98471f3" data-node-id="915:8210">
                    Motomami - CD Especial
                  </p>
                  <p className="fg-4ef702aacd" data-node-id="915:8211">
                    Rosalía
                  </p>
                </div>
                <p className="fg-2909c904ba" data-node-id="915:8212">
                  Reino Unido (RU)
                </p>
                <p className="fg-ad660d6227" data-node-id="915:8213">
                  £3,120.00
                </p>
                <div className="fg-447401f34f" data-node-id="915:8214" data-name="Frame">
                  <div className="fg-5cff65f215" data-node-id="915:8215" data-name="Frame">
                    <p className="fg-fb81d9b6c5" data-node-id="915:8216">
                      En Proceso
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-0c6e34b373" data-node-id="915:8217" data-name="Frame">
                <ExportAction className="fg-ad660d6227" data-node-id="915:8218" label="XORD-4507" destination="order-detail">
                  XORD-4507
                </ExportAction>
                <div className="fg-1a00ed6a7f" data-node-id="915:8219" data-name="Frame">
                  <p className="fg-cbb98471f3" data-node-id="915:8220">
                    Calambre - Digital Bundle
                  </p>
                  <p className="fg-4ef702aacd" data-node-id="915:8221">
                    Nathy Peluso
                  </p>
                </div>
                <p className="fg-2909c904ba" data-node-id="915:8222">
                  Turquía (TR)
                </p>
                <p className="fg-ad660d6227" data-node-id="915:8223">
                  ₺42,000.00
                </p>
                <div className="fg-447401f34f" data-node-id="915:8224" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="915:8225" data-name="Frame">
                    <p className="fg-afc766b3c8" data-node-id="915:8226">
                      En Tránsito
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-0c6e34b373" data-node-id="915:8227" data-name="Frame">
                <ExportAction className="fg-ad660d6227" data-node-id="915:8228" label="XORD-4506" destination="order-detail">
                  XORD-4506
                </ExportAction>
                <div className="fg-1a00ed6a7f" data-node-id="915:8229" data-name="Frame">
                  <p className="fg-cbb98471f3" data-node-id="915:8230">
                    Claros del Bosque - Vinilo
                  </p>
                  <p className="fg-4ef702aacd" data-node-id="915:8231">
                    Silvia Pérez Cruz
                  </p>
                </div>
                <p className="fg-2909c904ba" data-node-id="915:8232">
                  Francia (UE)
                </p>
                <p className="fg-ad660d6227" data-node-id="915:8233">
                  €1,850.00
                </p>
                <div className="fg-447401f34f" data-node-id="915:8234" data-name="Frame">
                  <div className="fg-9401e93a84" data-node-id="915:8235" data-name="Frame">
                    <p className="fg-ad820720ff" data-node-id="915:8236">
                      Entregado
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
