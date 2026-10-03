// Figma 915:5830 — Export Partner / Export Products - zh-CN
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

export default function ExportPartnerExportProductsZhCn() {
  return (
    <div className="fg-ddc267ddb5" data-node-id="915:5830" data-name="Export Partner / Export Products - zh-CN">
      <ExportSidebar className="fg-c78fefc68e" data-node-id="1206:2486" data-name="Sidebar / zh-CN / Export Products - zh-CN">
        <div className="fg-9bc243bde1" data-node-id="I1206:2486;1206:494" data-name="sidebar-top">
          <div className="fg-47aacf6d1d" data-node-id="I1206:2486;1206:453" data-name="brand-header">
            <div className="fg-458c46521a" data-node-id="I1206:2486;1206:454" data-name="logo-icon">
              <img alt="" className="fg-092d128a1f" src="/export-partner-assets/6a265170.png" />
            </div>
            <div className="fg-7ae4f26cd2" data-node-id="I1206:2486;1206:455" data-name="brand-text">
              <p className="fg-1964e681ac" data-node-id="I1206:2486;1206:456">
                Negarin
              </p>
              <p className="fg-fa37b6b97c" data-node-id="I1206:2486;1206:457">
                Partner Portal
              </p>
            </div>
          </div>
          <div className="fg-4c62e33c8f" data-node-id="I1206:2486;1206:458" data-name="nav-menu">
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2486;1206:459" data-name="nav-item-0" label="仪表板" destination="dashboard">
              <div className="fg-58d29b27c0" data-node-id="I1206:2486;1206:460" data-name="layout-dashboard">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/b0f9b3dd.svg" />
              </div>
              <p className="fg-908364b277" data-node-id="I1206:2486;1206:462">
                仪表板
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2486;1206:463" data-name="nav-item-1" label="网络/艺术家" destination="network-artists">
              <div className="fg-58d29b27c0" data-node-id="I1206:2486;1206:464" data-name="users-2">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/6a1c4a13.svg" />
              </div>
              <p className="fg-908364b277" data-node-id="I1206:2486;1206:466">
                网络/艺术家
              </p>
            </ExportAction>
            <ExportAction className="fg-0b202358f2" data-node-id="I1206:2486;1206:467" data-name="nav-item-2" label="出口产品" destination="export-products">
              <div className="fg-58d29b27c0" data-node-id="I1206:2486;1206:468" data-name="book-open">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/1e2a35d1.svg" />
              </div>
              <p className="fg-2579f769cd" data-node-id="I1206:2486;1206:470">
                出口产品
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2486;1206:471" data-name="nav-item-3" label="订单" destination="orders-list">
              <div className="fg-58d29b27c0" data-node-id="I1206:2486;1206:472" data-name="package">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d55e0bcd.svg" />
              </div>
              <p className="fg-908364b277" data-node-id="I1206:2486;1206:474">
                订单
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2486;1206:475" data-name="nav-item-4" label="订单草稿" destination="order-draft">
              <div className="fg-58d29b27c0" data-node-id="I1206:2486;1206:476" data-name="file-text">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/42a3600b.svg" />
              </div>
              <p className="fg-908364b277" data-node-id="I1206:2486;1206:478">
                订单草稿
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2486;1206:479" data-name="nav-item-5" label="报告">
              <div className="fg-58d29b27c0" data-node-id="I1206:2486;1206:480" data-name="bar-chart">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/e3297a1b.svg" />
              </div>
              <p className="fg-908364b277" data-node-id="I1206:2486;1206:482">
                报告
              </p>
            </ExportAction>
            <ExportAction className="fg-48260a3ed7" data-node-id="I1206:2486;1206:483" data-name="nav-item-6" label="账户" destination="account-preferences">
              <div className="fg-58d29b27c0" data-node-id="I1206:2486;1206:484" data-name="user-circle">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/530b9fe2.svg" />
              </div>
              <p className="fg-908364b277" data-node-id="I1206:2486;1206:486">
                账户
              </p>
            </ExportAction>
          </div>
        </div>
        <div className="fg-1fd043bec0" data-node-id="I1206:2486;1206:487" data-name="sidebar-footer">
          <div className="fg-ce55cba48d" data-node-id="I1206:2486;1206:488" data-name="user-profile">
            <div className="fg-d05a0d0fe8" data-node-id="I1206:2486;1206:489" data-name="user-avatar">
              <img alt="" className="fg-2ce1fee1c9" src="/export-partner-assets/3b436e13.png" />
            </div>
            <div className="fg-27715a0e3d" data-node-id="I1206:2486;1206:490" data-name="user-details">
              <p className="fg-a7c8b03b38" data-node-id="I1206:2486;1206:491">
                张伟经理
              </p>
              <p className="fg-e9a333dd28" data-node-id="I1206:2486;1206:492">
                高级协调员
              </p>
            </div>
          </div>
        </div>
      </ExportSidebar>
      <div className="fg-c92c0aceed" data-node-id="915:5867" data-name="Frame">
        <div className="fg-0ce89bddfe" data-node-id="915:5868" data-name="header">
          <p className="fg-50c0aa7709" data-node-id="915:5869">
            出口产品
          </p>
          <div className="fg-a34c8fe932" data-node-id="915:5870" data-name="Frame">
            <ExportField className="fg-55dd14993d" data-node-id="915:5871" data-name="Frame" label="全球搜索..." placeholder="全球搜索..." search>
              <div className="fg-c51752dc8c" data-node-id="915:6142" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d09790d0.svg" />
              </div>
              <p className="fg-99ce9575f7" data-node-id="915:5873">
                全球搜索...
              </p>
            </ExportField>
            <div className="fg-0c3f483010" data-node-id="915:5874" data-name="Frame">
              <div className="fg-58d29b27c0" data-node-id="915:6145" data-name="bell">
                <img alt="" className="fg-8faf267d30" src="/export-partner-assets/518b2fef.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="fg-771645303d" data-node-id="915:5876" data-name="Frame">
          <div className="fg-da8ef9475e" data-node-id="915:5877" data-name="Frame">
            <div className="fg-c96fe10678" data-node-id="915:5878" data-name="Frame">
              <p className="fg-03809e0cc1" data-node-id="915:5879">
                出口产品列表
              </p>
            </div>
            <div className="fg-47aacf6d1d" data-node-id="1206:408" data-name="search-and-filters">
              <ExportField className="fg-b11e56a6d7" data-node-id="1206:409" data-name="product-search" label="搜索产品名称、SKU、艺术家..." placeholder="搜索产品名称、SKU、艺术家..." search>
                <div className="fg-c51752dc8c" data-node-id="1206:410" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/d09790d0.svg" />
                </div>
                <p className="fg-fe5b9b8d14" data-node-id="1206:412">
                  搜索产品名称、SKU、艺术家...
                </p>
              </ExportField>
              <div className="fg-9cc9b2eaeb" data-node-id="1206:413" data-name="filter-destination">
                <p className="fg-1224831ac7" data-node-id="1206:414">
                  目的地：全部
                </p>
                <div className="fg-8a0ff48924" data-node-id="1206:415" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-9cc9b2eaeb" data-node-id="1206:417" data-name="filter-category">
                <p className="fg-1224831ac7" data-node-id="1206:418">
                  类别：全部
                </p>
                <div className="fg-8a0ff48924" data-node-id="1206:419" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
              <div className="fg-9cc9b2eaeb" data-node-id="1206:421" data-name="filter-inventory">
                <p className="fg-1224831ac7" data-node-id="1206:422">
                  库存：全部
                </p>
                <div className="fg-8a0ff48924" data-node-id="1206:423" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/export-partner-assets/f10ade1f.svg" />
                </div>
              </div>
            </div>
            <div className="fg-153c0a1809" data-node-id="915:5885" data-name="Frame">
              <div className="fg-e79d959a02" data-node-id="915:5886" data-name="Frame">
                <p className="fg-619b4baa27" data-node-id="915:5887">
                  缩略图
                </p>
                <p className="fg-4a9b73a3b7" data-node-id="915:5888">
                  产品名称
                </p>
                <p className="fg-7f2be8036c" data-node-id="915:5889">
                  SKU编号
                </p>
                <p className="fg-7f2be8036c" data-node-id="915:5890">
                  艺术家/车间
                </p>
                <p className="fg-097e9474ee" data-node-id="915:5891">
                  类别
                </p>
                <p className="fg-fc82b04d0c" data-node-id="915:5892">
                  已发布价格
                </p>
                <p className="fg-c37becc1f9" data-node-id="915:5893">
                  库存
                </p>
                <p className="fg-fc82b04d0c" data-node-id="1202:43">
                  出口状态
                </p>
                <p className="fg-bacee74b35" data-node-id="1202:44">
                  操作
                </p>
              </div>
              <div className="fg-b9604e44e5" data-node-id="1202:46" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1202:47" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/b1ee3b7f.png" />
                </div>
                <div className="fg-293d4b346b" data-node-id="1202:48" data-name="Frame">
                  <p className="fg-887e96a97b" data-node-id="915:5899">
                    伊斯法罕珐琅盘
                  </p>
                  <p className="fg-cf31b0651c" data-node-id="915:5900">
                    SKU: PRD-MNK-2401
                  </p>
                </div>
                <p className="fg-16b1d555d7" data-node-id="1202:49">
                  PRD-MNK-2401
                </p>
                <p className="fg-2191be369f" data-node-id="915:5902">
                  伊斯法罕工坊
                </p>
                <p className="fg-bf995482e7" data-node-id="1202:50">
                  珐琅工艺
                </p>
                <p className="fg-5f04927c71" data-node-id="1202:51">
                  $95.00
                </p>
                <p className="fg-c9a812862c" data-node-id="915:5905">
                  45
                </p>
                <div className="fg-fb9c17bad0" data-node-id="915:5906" data-name="Frame">
                  <div className="fg-10fec148da" data-node-id="1202:52" data-name="Frame">
                    <p className="fg-a9acb58fa3" data-node-id="915:5908">
                      可出口
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1202:53" data-name="Frame">
                  <NegarinButton className="fg-24cad047bd" label="加入草稿" />
                  <NegarinButton className="fg-458c3f730b" label="查看详情" style="Secondary" />
                </div>
              </div>
              <div className="fg-b9604e44e5" data-node-id="1202:59" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1202:60" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/19a7ddbb.png" />
                </div>
                <div className="fg-293d4b346b" data-node-id="915:5914" data-name="Frame">
                  <p className="fg-887e96a97b" data-node-id="1202:61">
                    大不里士手工基里姆
                  </p>
                  <p className="fg-cf31b0651c" data-node-id="915:5916">
                    SKU: PRD-KLM-2402
                  </p>
                </div>
                <p className="fg-16b1d555d7" data-node-id="1202:62">
                  PRD-KLM-2402
                </p>
                <p className="fg-2191be369f" data-node-id="915:5918">
                  克尔曼基里姆工坊
                </p>
                <p className="fg-bf995482e7" data-node-id="915:5919">
                  基里姆
                </p>
                <p className="fg-5f04927c71" data-node-id="915:5920">
                  $280.00
                </p>
                <p className="fg-c9a812862c" data-node-id="915:5921">
                  12
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1202:63" data-name="Frame">
                  <div className="fg-10fec148da" data-node-id="1202:64" data-name="Frame">
                    <p className="fg-a9acb58fa3" data-node-id="915:5924">
                      可出口
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="915:5925" data-name="Frame">
                  <NegarinButton className="fg-24cad047bd" label="加入草稿" />
                  <NegarinButton className="fg-458c3f730b" label="查看详情" style="Secondary" />
                </div>
              </div>
              <div className="fg-b9604e44e5" data-node-id="915:5928" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1202:70" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/58fd72b0.png" />
                </div>
                <div className="fg-293d4b346b" data-node-id="1202:71" data-name="Frame">
                  <p className="fg-887e96a97b" data-node-id="915:5931">
                    哈塔姆镶嵌首饰盒
                  </p>
                  <p className="fg-cf31b0651c" data-node-id="915:5932">
                    SKU: PRD-KHT-2403
                  </p>
                </div>
                <p className="fg-16b1d555d7" data-node-id="915:5933">
                  PRD-KHT-2403
                </p>
                <p className="fg-2191be369f" data-node-id="1202:72">
                  设拉子哈塔姆工坊
                </p>
                <p className="fg-bf995482e7" data-node-id="915:5935">
                  木工工艺
                </p>
                <p className="fg-5f04927c71" data-node-id="1202:73">
                  $150.00
                </p>
                <p className="fg-c9a812862c" data-node-id="1202:74">
                  30
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1202:75" data-name="Frame">
                  <div className="fg-10fec148da" data-node-id="1202:76" data-name="Frame">
                    <p className="fg-a9acb58fa3" data-node-id="1202:77">
                      可出口
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1202:78" data-name="Frame">
                  <NegarinButton className="fg-24cad047bd" label="加入草稿" />
                  <NegarinButton className="fg-458c3f730b" label="查看详情" style="Secondary" />
                </div>
              </div>
              <div className="fg-b9604e44e5" data-node-id="1202:84" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1202:85" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/792cd6d8.png" />
                </div>
                <div className="fg-293d4b346b" data-node-id="1202:86" data-name="Frame">
                  <p className="fg-887e96a97b" data-node-id="1202:87">
                    拉勒金绿松石花瓶
                  </p>
                  <p className="fg-cf31b0651c" data-node-id="1202:88">
                    SKU: PRD-CRM-2404
                  </p>
                </div>
                <p className="fg-16b1d555d7" data-node-id="1202:89">
                  PRD-CRM-2404
                </p>
                <p className="fg-2191be369f" data-node-id="1202:90">
                  拉勒金陶艺工坊
                </p>
                <p className="fg-bf995482e7" data-node-id="1202:91">
                  陶瓷
                </p>
                <p className="fg-5f04927c71" data-node-id="1202:92">
                  $65.00
                </p>
                <p className="fg-c9a812862c" data-node-id="1202:93">
                  85
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1202:94" data-name="Frame">
                  <div className="fg-10fec148da" data-node-id="1202:95" data-name="Frame">
                    <p className="fg-a9acb58fa3" data-node-id="1202:96">
                      可出口
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1202:97" data-name="Frame">
                  <NegarinButton className="fg-24cad047bd" label="加入草稿" />
                  <NegarinButton className="fg-458c3f730b" label="查看详情" style="Secondary" />
                </div>
              </div>
              <div className="fg-b9604e44e5" data-node-id="1202:103" data-name="Frame">
                <div className="fg-006dc33734" data-node-id="1202:104" data-name="Rectangle">
                  <img alt="" className="fg-3cf40fed90" src="/export-partner-assets/42c22dfe.png" />
                </div>
                <div className="fg-293d4b346b" data-node-id="1202:105" data-name="Frame">
                  <p className="fg-887e96a97b" data-node-id="1202:106">
                    亚兹德特美丝绸桌旗
                  </p>
                  <p className="fg-cf31b0651c" data-node-id="1202:107">
                    SKU: PRD-TRM-2405
                  </p>
                </div>
                <p className="fg-16b1d555d7" data-node-id="1202:108">
                  PRD-TRM-2405
                </p>
                <p className="fg-2191be369f" data-node-id="1202:109">
                  亚兹德编织工坊
                </p>
                <p className="fg-bf995482e7" data-node-id="1202:110">
                  纺织品
                </p>
                <p className="fg-5f04927c71" data-node-id="1202:111">
                  $120.00
                </p>
                <p className="fg-9b7efdfad8" data-node-id="1202:112">
                  0
                </p>
                <div className="fg-fb9c17bad0" data-node-id="1202:113" data-name="Frame">
                  <div className="fg-1f8a5d94d5" data-node-id="1202:114" data-name="Frame">
                    <p className="fg-3ab145009e" data-node-id="1202:115">
                      缺货
                    </p>
                  </div>
                </div>
                <div className="fg-c517537d53" data-node-id="1202:116" data-name="Frame">
                  <NegarinButton className="fg-24cad047bd" label="加入草稿" />
                  <NegarinButton className="fg-458c3f730b" label="查看详情" style="Secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
