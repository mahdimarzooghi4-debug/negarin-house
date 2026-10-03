// Figma 915:4585 — Export Partner / Export Products - ru
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
    <div className={className || `content-stretch flex h-[36px] items-center justify-center px-[12px] relative rounded-[var(--negarin-radius-control,12px)] w-[140px] ${isSecondaryAndSmallAndDefault ? "bg-[var(--negarin-action-secondary-background,white)] border border-[var(--negarin-action-secondary-border,#041b65)] border-solid" : "bg-[var(--negarin-action-primary-background,#041b65)]"}`} data-component-id={isSecondaryAndSmallAndDefault ? "node-46_12" : "node-46_2"}>
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
    </div>
  );
}

export default function ExportPartnerExportProductsRu() {
  return (
    <div className="fg-15cfb4f32e" data-node-id="915:4585" data-name="Export Partner / Export Products - ru">
      <ExportSidebar className="fg-c6c3968b81" data-node-id="1206:2024" data-name="Sidebar / ru / Export Products - ru">
        <div className="fg-9bc243bde1" data-node-id="I1206:2024;1206:494" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:2024;1206:453" data-name="brand-header">
            <div className="fg-458c46521a" data-node-id="I1206:2024;1206:454" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
            <div className="fg-7ae4f26cd2" data-node-id="I1206:2024;1206:455" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:2024;1206:456">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:2024;1206:457">
                Partner Portal
              </p>
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:2024;1206:458" data-name="nav-menu">
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2024;1206:459" data-name="nav-item-0" label="Панель управления" destination="dashboard">
              <div className="fg-58d29b27c0" data-node-id="I1206:2024;1206:460" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b0f9b3dd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2024;1206:462">
                Панель управления
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2024;1206:463" data-name="nav-item-1" label="Сеть / Художники" destination="network-artists">
              <div className="fg-58d29b27c0" data-node-id="I1206:2024;1206:464" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6a1c4a13.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2024;1206:466">
                Сеть / Художники
              </p>
            </ExportAction>
            <ExportAction className="fg-0b202358f2" data-node-id="I1206:2024;1206:467" data-name="nav-item-2" label="Экспортные товары" destination="export-products">
              <div className="fg-58d29b27c0" data-node-id="I1206:2024;1206:468" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/1e2a35d1.svg" />
              </div>
              <p className="fg-0c6bcb5085" data-node-id="I1206:2024;1206:470">
                Экспортные товары
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2024;1206:471" data-name="nav-item-3" label="Заказы" destination="orders-list">
              <div className="fg-58d29b27c0" data-node-id="I1206:2024;1206:472" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d55e0bcd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2024;1206:474">
                Заказы
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2024;1206:475" data-name="nav-item-4" label="Черновики заказов" destination="order-draft">
              <div className="fg-58d29b27c0" data-node-id="I1206:2024;1206:476" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/bd51caec.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2024;1206:478">
                Черновики заказов
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2024;1206:479" data-name="nav-item-5" label="Отчёты">
              <div className="fg-58d29b27c0" data-node-id="I1206:2024;1206:480" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e3297a1b.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2024;1206:482">
                Отчёты
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2024;1206:483" data-name="nav-item-6" label="Аккаунт" destination="account-preferences">
              <div className="fg-58d29b27c0" data-node-id="I1206:2024;1206:484" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/20f337fd.svg" />
              </div>
              <p className="fg-c0b84d28d8" data-node-id="I1206:2024;1206:486">
                Аккаунт
              </p>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:2024;1206:487" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:2024;1206:488" data-name="user-profile">
            <div className="fg-d05a0d0fe8" data-node-id="I1206:2024;1206:489" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
            <div className="fg-eb694bd6ff" data-node-id="I1206:2024;1206:490" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:2024;1206:491">
                Елена Смирнова
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:2024;1206:492">
                Администратор
              </p>
            </div>
          </div>
        </div>
      </ExportSidebar>
      <div className="fg-95773e0afe" data-node-id="915:4621" data-name="Frame">
        <div className="fg-bb9338a234" data-node-id="915:4622" data-name="Header">
          <p className="fg-ac57a5ba08" data-node-id="915:4630">
            Экспортные товары
          </p>
          <div className="fg-a34c8fe932" data-node-id="915:4631" data-name="Frame">
            <div className="fg-54e1ccac81" data-node-id="915:4632" data-name="Frame">
              <div className="fg-58d29b27c0" data-node-id="915:4914" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/52d56098.svg" />
              </div>
            </div>
            <ExportLanguagePicker className="fg-ff14d2263f" data-node-id="915:4634" data-name="Frame">
              <p className="fg-6e5aca339d" data-node-id="915:4635">
                RU
              </p>
              <div className="fg-5cca20e57d" data-node-id="915:4917" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/a7e00a3d.svg" />
              </div>
            </ExportLanguagePicker>
          </div>
        </div>
        <div className="fg-597aaf7207" data-node-id="915:4637" data-name="Frame">
          <div className="fg-c96fe10678" data-node-id="915:4638" data-name="catalog-action-bar">
            <div className="fg-ad50363799" data-node-id="915:4640" data-name="filters-and-search">
              <ExportField className="fg-841034ea1f" data-node-id="1201:34" data-name="search-catalog" label="Поиск по названию или SKU..." placeholder="Поиск по названию или SKU..." search>
                <div className="fg-5cca20e57d" data-node-id="915:4920" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/8a8d5cda.svg" />
                </div>
                <p className="fg-605ff848ea" data-node-id="915:4642">
                  Поиск по названию или SKU...
                </p>
              </ExportField>
              <div className="fg-5bbbbaf5eb" data-node-id="915:4643" data-name="filter-destination">
                <p className="fg-5c46f152db" data-node-id="1201:35">
                  Назначение: Все
                </p>
                <div className="fg-8a0ff48924" data-node-id="915:4923" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f281734b.svg" />
                </div>
              </div>
              <div className="fg-5bbbbaf5eb" data-node-id="1201:36" data-name="filter-category">
                <p className="fg-5c46f152db" data-node-id="1201:37">
                  Категория: Все
                </p>
                <div className="fg-8a0ff48924" data-node-id="1201:38" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-111aa4c9bc" data-node-id="915:4647" data-name="filter-inventory">
                <p className="fg-162a6065b1" data-node-id="915:4648">
                  Остаток: Все
                </p>
                <div className="fg-8a0ff48924" data-node-id="1201:40" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
            </div>
            <div className="fg-2a56071f93" data-node-id="1201:42" data-name="bulk-actions" />
          </div>
          <div className="fg-df58b696c2" data-node-id="1201:49" data-name="catalog-table-card">
            <div className="fg-153c0a1809" data-node-id="1201:50" data-name="table-view">
              <div className="fg-12bdcbcaf4" data-node-id="1201:51" data-name="table-head">
                <p className="fg-619b4baa27" data-node-id="1201:52">
                  Изображение
                </p>
                <p className="fg-4a9b73a3b7" data-node-id="1201:53">
                  Товар
                </p>
                <p className="fg-fc82b04d0c" data-node-id="1201:54">
                  Категория
                </p>
                <p className="fg-938bdd3210" data-node-id="1201:55">
                  Художник / Мастерская
                </p>
                <p className="fg-0c0e4accff" data-node-id="1201:56">
                  Цена
                </p>
                <p className="fg-74b68c679c" data-node-id="1201:57">
                  Остаток
                </p>
                <p className="fg-7f2be8036c" data-node-id="1201:58">
                  Статус экспорта
                </p>
                <p className="fg-47facc161d" data-node-id="1201:59">
                  Действия
                </p>
              </div>
              <div className="fg-f64e211d3d" data-node-id="1201:60" data-name="table-row-0">
                <div className="fg-006dc33734" data-node-id="1201:61" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/961ddfcd.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1201:62" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1201:63">
                    Минакари тарелка из Исфахана
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1201:64">
                    SKU: PRD-MNK-2401
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="1201:65">
                  Минакари
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1201:66">
                  Ателье Исфахан
                </p>
                <p className="fg-611c34ed77" data-node-id="1201:67">
                  $95.00
                </p>
                <p className="fg-e7d992e3a3" data-node-id="1201:68">
                  45
                </p>
                <div className="fg-447401f34f" data-node-id="1201:69" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1201:70" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1201:71">
                      Готов к экспорту
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1201:72" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Добавить в черновик" />
                  <NegarinButton className="fg-b643913e86" label="Подробнее" style="Secondary" />
                </div>
              </div>
              <div className="fg-f64e211d3d" data-node-id="1201:78" data-name="table-row-1">
                <div className="fg-006dc33734" data-node-id="1201:79" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/f0958055.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1201:80" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1201:81">
                    Килим ручной работы из Тебриза
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1201:82">
                    SKU: PRD-KLM-2402
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="1201:83">
                  Килим
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1201:84">
                  Килим Бафан Керман
                </p>
                <p className="fg-611c34ed77" data-node-id="1201:85">
                  $280.00
                </p>
                <p className="fg-e7d992e3a3" data-node-id="1201:86">
                  12
                </p>
                <div className="fg-447401f34f" data-node-id="1201:87" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1201:88" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1201:89">
                      Готов к экспорту
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1201:90" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Добавить в черновик" />
                  <NegarinButton className="fg-b643913e86" label="Подробнее" style="Secondary" />
                </div>
              </div>
              <div className="fg-f64e211d3d" data-node-id="1201:96" data-name="table-row-2">
                <div className="fg-006dc33734" data-node-id="1201:97" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/5e9fb4aa.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1201:98" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1201:99">
                    Шкатулка хатамкари из Шираза
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1201:100">
                    SKU: PRD-KHT-2403
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="1201:101">
                  Ремесло
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1201:102">
                  Хатамкари Шираз
                </p>
                <p className="fg-611c34ed77" data-node-id="1201:103">
                  $150.00
                </p>
                <p className="fg-e7d992e3a3" data-node-id="1201:104">
                  30
                </p>
                <div className="fg-447401f34f" data-node-id="1201:105" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1201:106" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1201:107">
                      Готов к экспорту
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1201:108" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Добавить в черновик" />
                  <NegarinButton className="fg-b643913e86" label="Подробнее" style="Secondary" />
                </div>
              </div>
              <div className="fg-f64e211d3d" data-node-id="1201:114" data-name="table-row-3">
                <div className="fg-006dc33734" data-node-id="1201:115" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/2ccb95f0.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1201:116" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1201:117">
                    Бирюзовая ваза из Лаледжина
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1201:118">
                    SKU: PRD-CRM-2404
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="1201:119">
                  Керамика
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1201:120">
                  Сефаль-е Лаледжин
                </p>
                <p className="fg-611c34ed77" data-node-id="1201:121">
                  $65.00
                </p>
                <p className="fg-e7d992e3a3" data-node-id="1201:122">
                  85
                </p>
                <div className="fg-447401f34f" data-node-id="1201:123" data-name="Frame">
                  <div className="fg-2613a091b3" data-node-id="1201:124" data-name="Frame">
                    <p className="fg-85012e9f69" data-node-id="1201:125">
                      Готов к экспорту
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1201:126" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Добавить в черновик" />
                  <NegarinButton className="fg-b643913e86" label="Подробнее" style="Secondary" />
                </div>
              </div>
              <div className="fg-f64e211d3d" data-node-id="1201:132" data-name="table-row-4">
                <div className="fg-006dc33734" data-node-id="1201:133" data-name="product-thumbnail">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/ce1caf60.png" />
                </div>
                <div className="fg-ddb31de544" data-node-id="1201:134" data-name="product-summary">
                  <p className="fg-bc98c8a2e0" data-node-id="1201:135">
                    Термех шёлковая дорожка
                  </p>
                  <p className="fg-b7d5c757c3" data-node-id="1201:136">
                    SKU: PRD-TRM-2405
                  </p>
                </div>
                <p className="fg-830ed17e6a" data-node-id="1201:137">
                  Текстиль
                </p>
                <p className="fg-9fe3150cd8" data-node-id="1201:138">
                  Бафт-е Язд
                </p>
                <p className="fg-611c34ed77" data-node-id="1201:139">
                  $120.00
                </p>
                <p className="fg-e7d992e3a3" data-node-id="1201:140">
                  0
                </p>
                <div className="fg-447401f34f" data-node-id="1201:141" data-name="Frame">
                  <div className="fg-5cff65f215" data-node-id="1201:142" data-name="Frame">
                    <p className="fg-5be4fd8550" data-node-id="1201:143">
                      Нет в наличии
                    </p>
                  </div>
                </div>
                <div className="fg-2bd06e4f2e" data-node-id="1201:144" data-name="product-actions">
                  <NegarinButton className="fg-8681c69caa" label="Добавить в черновик" />
                  <NegarinButton className="fg-b643913e86" label="Подробнее" style="Secondary" />
                </div>
              </div>
            </div>
            <div className="fg-278a6f0953" data-node-id="1201:150" data-name="table-pagination">
              <p className="fg-ef9af842dd" data-node-id="1201:151">
                Показано 1–5 из 48 товаров
              </p>
              <div className="fg-92b7da7864" data-node-id="1201:152" data-name="pagination-controls">
                <ExportAction className="fg-b878995460" data-node-id="1201:153" data-name="btn-prev" label="Назад">
                  <p className="fg-854f5de0f2" data-node-id="1201:154">
                    Назад
                  </p>
                </ExportAction>
                <ExportAction className="fg-b878995460" data-node-id="1201:155" data-name="btn-next" label="Далее">
                  <p className="fg-854f5de0f2" data-node-id="1201:156">
                    Далее
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
