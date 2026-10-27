// Figma 915:7021 — Export Partner / Export Products - fr
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
    <ExportAction className={className} label={label} destination={style === "Secondary" ? "product-detail" : "order-draft"}>
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

export default function ExportPartnerExportProductsFr() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="915:7021" data-name="Export Partner / Export Products - fr">
      <ExportSidebar className="fg-c78fefc68e" data-node-id="1206:2948" data-name="Sidebar / fr / Export Products - fr">
        <div className="fg-9bc243bde1" data-node-id="I1206:2948;1206:494" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:2948;1206:453" data-name="brand-header">
            <div className="fg-458c46521a" data-node-id="I1206:2948;1206:454" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
            <div className="fg-7ae4f26cd2" data-node-id="I1206:2948;1206:455" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:2948;1206:456">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:2948;1206:457">
                Partner Portal
              </p>
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:2948;1206:458" data-name="nav-menu">
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2948;1206:459" data-name="nav-item-0" label="Tableau de bord" destination="dashboard">
              <div className="fg-58d29b27c0" data-node-id="I1206:2948;1206:460" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b0f9b3dd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2948;1206:462">
                Tableau de bord
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2948;1206:463" data-name="nav-item-1" label="Réseau / Artistes" destination="network-artists">
              <div className="fg-58d29b27c0" data-node-id="I1206:2948;1206:464" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6a1c4a13.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2948;1206:466">
                Réseau / Artistes
              </p>
            </ExportAction>
            <ExportAction className="fg-0b202358f2" data-node-id="I1206:2948;1206:467" data-name="nav-item-2" label="nav-item-2" destination="export-products">
              <div className="fg-58d29b27c0" data-node-id="I1206:2948;1206:468" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/1e2a35d1.svg" />
              </div>
              <p className="fg-0c6bcb5085" data-node-id="I1206:2948;1206:470">{`Produits d'exportation`}</p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2948;1206:471" data-name="nav-item-3" label="Commandes" destination="orders-list">
              <div className="fg-58d29b27c0" data-node-id="I1206:2948;1206:472" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d55e0bcd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2948;1206:474">
                Commandes
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2948;1206:475" data-name="nav-item-4" label="Brouillons de commandes" destination="order-draft">
              <div className="fg-58d29b27c0" data-node-id="I1206:2948;1206:476" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/42a3600b.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2948;1206:478">
                Brouillons de commandes
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2948;1206:479" data-name="nav-item-5" label="Rapports">
              <div className="fg-58d29b27c0" data-node-id="I1206:2948;1206:480" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e3297a1b.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2948;1206:482">
                Rapports
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2948;1206:483" data-name="nav-item-6" label="Compte" destination="account-preferences">
              <div className="fg-58d29b27c0" data-node-id="I1206:2948;1206:484" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/9a909e52.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2948;1206:486">
                Compte
              </p>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:2948;1206:487" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:2948;1206:488" data-name="user-profile">
            <div className="fg-d05a0d0fe8" data-node-id="I1206:2948;1206:489" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
            <div className="fg-eb694bd6ff" data-node-id="I1206:2948;1206:490" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:2948;1206:491">
                Jean-Pierre M.
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:2948;1206:492">
                Responsable Export
              </p>
            </div>
          </div>
        </div>
      </ExportSidebar>
      <div className="fg-c92c0aceed" data-node-id="915:7056" data-name="Frame">
        <div className="fg-de69b6bc37" data-node-id="915:7057" data-name="Frame">
          <div className="fg-1f16158d1e" data-node-id="915:7058" data-name="Frame">
            <p className="fg-244140ef7c" data-node-id="915:7059">{`Produits d'exportation`}</p>
            <p className="fg-b794a69c73" data-node-id="915:7060">{`Parcourir les produits disponibles à l'exportation et sélectionner pour vos commandes`}</p>
          </div>
          <div className="fg-a34c8fe932" data-node-id="915:7061" data-name="Frame">
            <ExportField className="fg-48a1745341" data-node-id="915:7062" data-name="Frame" label="Rechercher..." placeholder="Rechercher..." search>
              <div className="fg-c51752dc8c" data-node-id="915:7361" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/63e030e4.svg" />
              </div>
              <p className="fg-5a82e9724c" data-node-id="915:7064">
                Rechercher...
              </p>
            </ExportField>
            <div className="fg-a95f7ad5f9" data-node-id="915:7065" data-name="Frame">
              <div className="fg-b2a182ecf4" data-node-id="915:7283" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/0150c597.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="fg-959e861787" data-node-id="915:7067" data-name="Frame">
          <div className="fg-da8ef9475e" data-node-id="915:7068" data-name="Frame">
            <div className="fg-c96fe10678" data-node-id="915:7069" data-name="Frame">
              <div className="fg-9708e8d183" data-node-id="915:7070" data-name="Frame">
                <div className="fg-63619a0184" data-node-id="915:7071" data-name="Frame">
                  <p className="fg-431dee8e60" data-node-id="915:7072">
                    Tous les produits
                  </p>
                </div>
                <div className="fg-08f839aa67" data-node-id="915:7073" data-name="Frame">
                  <p className="fg-fe798b99e5" data-node-id="915:7074">
                    Céramique
                  </p>
                </div>
                <div className="fg-08f839aa67" data-node-id="915:7075" data-name="Frame">
                  <p className="fg-fe798b99e5" data-node-id="915:7076">
                    Textile
                  </p>
                </div>
                <div className="fg-08f839aa67" data-node-id="915:7077" data-name="Frame">
                  <p className="fg-fe798b99e5" data-node-id="915:7078">
                    Métallerie
                  </p>
                </div>
              </div>
              <div className="fg-ab3f18a493" data-node-id="915:7079" data-name="Frame">
                <div className="fg-c51752dc8c" data-node-id="915:7313" data-name="plus">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/59c47955.svg" />
                </div>
                <ExportAction className="fg-561fa0e339" data-node-id="915:7081" label="Parcourir les produits" destination="export-products">
                  Parcourir les produits
                </ExportAction>
              </div>
            </div>
            <div className="fg-c96fe10678" data-node-id="1206:427" data-name="catalog-action-bar">
              <div className="fg-ad50363799" data-node-id="1206:428" data-name="filters-and-search">
                <ExportField className="fg-841034ea1f" data-node-id="1206:429" data-name="search-catalog" label="Rechercher des produits..." placeholder="Rechercher des produits..." search>
                  <div className="fg-5cca20e57d" data-node-id="1206:430" data-name="search">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/2d6da1c2.svg" />
                  </div>
                  <p className="fg-605ff848ea" data-node-id="1206:432">
                    Rechercher des produits...
                  </p>
                </ExportField>
                <div className="fg-5bbbbaf5eb" data-node-id="1206:433" data-name="filter-destination">
                  <p className="fg-5c46f152db" data-node-id="1206:434">
                    Marché : Tous
                  </p>
                  <div className="fg-8a0ff48924" data-node-id="1206:435" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                  </div>
                </div>
                <div className="fg-5bbbbaf5eb" data-node-id="1206:437" data-name="filter-category">
                  <p className="fg-5c46f152db" data-node-id="1206:438">
                    Catégorie : Toutes
                  </p>
                  <div className="fg-8a0ff48924" data-node-id="1206:439" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                  </div>
                </div>
                <div className="fg-5bbbbaf5eb" data-node-id="1206:441" data-name="filter-inventory">
                  <p className="fg-5c46f152db" data-node-id="1206:442">
                    Stock : Tous
                  </p>
                  <div className="fg-8a0ff48924" data-node-id="1206:443" data-name="chevron-down">
                    <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                  </div>
                </div>
              </div>
              <div className="fg-2a56071f93" data-node-id="1206:445" data-name="bulk-actions" />
            </div>
            <div className="fg-153c0a1809" data-node-id="915:7082" data-name="Frame">
              <div className="fg-f8d1a4dbaf" data-node-id="915:7083" data-name="Frame">
                <p className="fg-619b4baa27" data-node-id="915:7084">
                  Aperçu
                </p>
                <p className="fg-4a9b73a3b7" data-node-id="915:7085">
                  Nom du produit
                </p>
                <p className="fg-097e9474ee" data-node-id="915:7086">
                  Catégorie
                </p>
                <p className="fg-96c68af9d8" data-node-id="915:7087">
                  Artiste / Atelier
                </p>
                <p className="fg-44d10f1b20" data-node-id="915:7088">
                  Prix publié
                </p>
                <p className="fg-fa0d4d9a92" data-node-id="915:7089">
                  Stock
                </p>
                <p className="fg-7f2be8036c" data-node-id="915:7090">
                  Statut export
                </p>
                <p className="fg-c30e166dd2" data-node-id="1203:53">
                  Actions
                </p>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="915:7092" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="915:7094" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/18737542.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="915:7093" data-name="Frame">
                  <p className="fg-bc98c8a2e0" data-node-id="915:7095">{`Plat émaillé Minakari d'Ispahan`}</p>
                  <p className="fg-5012900936" data-node-id="915:7096">
                    SKU: PRD-MNK-2401
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="915:7097">
                  Minakari
                </p>
                <p className="fg-c8246ad9d1" data-node-id="915:7098">
                  Atelier Isfahan
                </p>
                <p className="fg-2bf98aca7f" data-node-id="915:7099">
                  95,00 $
                </p>
                <p className="fg-2ed01bc180" data-node-id="915:7101">
                  45
                </p>
                <div className="fg-447401f34f" data-node-id="915:7102" data-name="Frame">
                  <div className="fg-549483b13c" data-node-id="915:7103" data-name="Frame">
                    <p className="fg-96a3f2aebc" data-node-id="915:7104">{`Prêt à l'export`}</p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="915:7105" data-name="Frame">
                  <NegarinButton className="fg-8681c69caa" label="Ajouter au brouillon" />
                  <NegarinButton className="fg-b643913e86" label="Voir les détails" style="Secondary" />
                </div>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="915:7118" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1203:60" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/d11adec4.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1203:61" data-name="Frame">
                  <p className="fg-bc98c8a2e0" data-node-id="915:7121">
                    Kilim tissé main de Tabriz
                  </p>
                  <p className="fg-5012900936" data-node-id="915:7122">
                    SKU: PRD-KLM-2402
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="915:7123">
                  Kilim
                </p>
                <p className="fg-c8246ad9d1" data-node-id="915:7124">
                  Kilim Bafan Kerman
                </p>
                <p className="fg-2bf98aca7f" data-node-id="915:7125">
                  280,00 $
                </p>
                <p className="fg-2ed01bc180" data-node-id="915:7127">
                  12
                </p>
                <div className="fg-447401f34f" data-node-id="915:7128" data-name="Frame">
                  <div className="fg-549483b13c" data-node-id="915:7129" data-name="Frame">
                    <p className="fg-96a3f2aebc" data-node-id="915:7130">{`Prêt à l'export`}</p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="915:7131" data-name="Frame">
                  <NegarinButton className="fg-8681c69caa" label="Ajouter au brouillon" />
                  <NegarinButton className="fg-b643913e86" label="Voir les détails" style="Secondary" />
                </div>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="1203:67" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1203:68" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/5d8acf4f.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1203:69" data-name="Frame">
                  <p className="fg-bc98c8a2e0" data-node-id="915:7137">
                    Coffret Khatamkari de Chiraz
                  </p>
                  <p className="fg-5012900936" data-node-id="915:7138">
                    SKU: PRD-KHT-2403
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="1203:70">
                  Artisanat bois
                </p>
                <p className="fg-c8246ad9d1" data-node-id="915:7140">
                  Khatam-kari Chiraz
                </p>
                <p className="fg-2bf98aca7f" data-node-id="1203:71">
                  150,00 $
                </p>
                <p className="fg-2ed01bc180" data-node-id="1203:72">
                  30
                </p>
                <div className="fg-447401f34f" data-node-id="1203:73" data-name="Frame">
                  <div className="fg-549483b13c" data-node-id="915:7144" data-name="Frame">
                    <p className="fg-96a3f2aebc" data-node-id="1203:74">{`Prêt à l'export`}</p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1203:75" data-name="Frame">
                  <NegarinButton className="fg-8681c69caa" label="Ajouter au brouillon" />
                  <NegarinButton className="fg-b643913e86" label="Voir les détails" style="Secondary" />
                </div>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="1203:81" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1203:82" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/a3e68cfd.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1203:83" data-name="Frame">
                  <p className="fg-bc98c8a2e0" data-node-id="1203:84">
                    Vase turquoise de Lalejin
                  </p>
                  <p className="fg-5012900936" data-node-id="915:7153">
                    SKU: PRD-CRM-2404
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="1203:85">
                  Céramique
                </p>
                <p className="fg-c8246ad9d1" data-node-id="1203:86">
                  Sefal-e Lalejin
                </p>
                <p className="fg-2bf98aca7f" data-node-id="915:7156">
                  65,00 $
                </p>
                <p className="fg-2ed01bc180" data-node-id="1203:87">
                  85
                </p>
                <div className="fg-447401f34f" data-node-id="1203:88" data-name="Frame">
                  <div className="fg-549483b13c" data-node-id="1203:89" data-name="Frame">
                    <p className="fg-96a3f2aebc" data-node-id="1203:90">{`Prêt à l'export`}</p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1203:91" data-name="Frame">
                  <NegarinButton className="fg-8681c69caa" label="Ajouter au brouillon" />
                  <NegarinButton className="fg-b643913e86" label="Voir les détails" style="Secondary" />
                </div>
              </div>
              <div className="fg-4f1ec5a9fb" data-node-id="1203:97" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1203:98" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/977c6499.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1203:99" data-name="Frame">
                  <p className="fg-bc98c8a2e0" data-node-id="1203:100">
                    Chemin de soie Termeh de Yazd
                  </p>
                  <p className="fg-5012900936" data-node-id="1203:101">
                    SKU: PRD-TRM-2405
                  </p>
                </div>
                <p className="fg-1d0a806a4b" data-node-id="1203:102">
                  Textile
                </p>
                <p className="fg-c8246ad9d1" data-node-id="1203:103">
                  Baft-e Yazd
                </p>
                <p className="fg-2bf98aca7f" data-node-id="1203:104">
                  120,00 $
                </p>
                <p className="fg-3942ae89a2" data-node-id="1203:105">
                  0
                </p>
                <div className="fg-447401f34f" data-node-id="1203:106" data-name="Frame">
                  <div className="fg-0c1841ad74" data-node-id="1203:107" data-name="Frame">
                    <p className="fg-5be4fd8550" data-node-id="1203:108">
                      En rupture
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1203:109" data-name="Frame">
                  <NegarinButton className="fg-8681c69caa" label="Ajouter au brouillon" />
                  <NegarinButton className="fg-b643913e86" label="Voir les détails" style="Secondary" />
                </div>
              </div>
            </div>
            <div className="fg-278a6f0953" data-node-id="1203:115" data-name="Frame">
              <p className="fg-ef9af842dd" data-node-id="1203:116">
                Affichage 1 à 5 sur 48 produits
              </p>
              <div className="fg-92b7da7864" data-node-id="1203:117" data-name="Frame">
                <div className="fg-b878995460" data-node-id="1203:118" data-name="Frame">
                  <p className="fg-854f5de0f2" data-node-id="1203:119">
                    Précédent
                  </p>
                </div>
                <div className="fg-b878995460" data-node-id="1203:120" data-name="Frame">
                  <p className="fg-854f5de0f2" data-node-id="1203:121">
                    Suivant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
