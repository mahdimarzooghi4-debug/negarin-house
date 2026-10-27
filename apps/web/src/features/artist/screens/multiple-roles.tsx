// Figma 831:820 — Auth / Multiple Roles - Desktop
import { DesignAction, DesignChoice } from "../design-controls";

export default function AuthMultipleRolesDesktop() {
  return (
    <div className="fg-99d0c089cd" data-node-id="831:820" data-name="Auth / Multiple Roles - Desktop">
      <div className="fg-e465380936" data-node-id="831:821" data-name="form-area">
        <div className="fg-2714b01eb3" data-node-id="831:822" data-name="desktop-topbar">
          <div className="fg-976f46d270" data-node-id="831:823" data-name="support-phone">
            <p className="fg-a59e64f9d3" dir="auto" data-node-id="831:824">
              پشتیبانی نگارین
            </p>
          </div>
          <p className="fg-3f962418df" dir="auto" data-node-id="831:825">
            نگارین
          </p>
        </div>
        <div className="fg-b81de20732" data-node-id="831:826" data-name="center-form-container">
          <div className="fg-b5412eeedb" data-node-id="831:827" data-name="auth-card">
            <div className="fg-14a8663693" data-node-id="831:828" data-name="welcome-badge">
              <p className="fg-08e6628ffa" dir="auto" data-node-id="831:829">
                خوش آمدید، زهرا عزیز
              </p>
              <p className="fg-30b045c267" dir="auto" data-node-id="831:830">
                با کدام حساب می‌خواهید ادامه دهید؟
              </p>
            </div>
            <div className="fg-0d3c7473d8" data-node-id="831:831" data-name="roles-list">
              <DesignChoice className="fg-6c549124f2" data-node-id="831:832" data-name="role-card-active" label="هنرمند مدیریت کارگاه، فروشگاه و عرضه محصولات هنری اصیل" group="roles-list" initial={true}>
                <div className="fg-85cdbba19b" data-node-id="831:833" data-name="role-icon-wrap">
                  <div className="fg-eaa60f1c42" data-node-id="831:972" data-name="palette">
                    <img alt="" className="fg-8faf267d30" src="/artist-assets/3c41e031164457a3.svg" />
                  </div>
                </div>
                <div className="fg-6e780b76ab" data-node-id="831:835" data-name="role-text">
                  <p className="fg-a93b181558" dir="auto" data-node-id="831:836">
                    هنرمند
                  </p>
                  <p className="fg-d18225e26b" dir="auto" data-node-id="831:837">
                    مدیریت کارگاه، فروشگاه و عرضه محصولات هنری اصیل
                  </p>
                </div>
                <div className="fg-88b9a0c95f" data-node-id="831:838" data-name="active-indicator">
                  <div className="fg-fc08538add" data-node-id="831:975" data-name="check">
                    <img alt="" className="fg-8faf267d30" src="/artist-assets/6cd33fbcb5182d66.svg" />
                  </div>
                </div>
              </DesignChoice>
              <DesignChoice className="fg-0201ed2f6f" data-node-id="831:840" data-name="role-card" label="خریدار جستجو، خرید آثار معتبر و حمایت از هنرمندان بومی" group="roles-list" initial={false}>
                <div className="fg-ba82126d62" data-node-id="831:841" data-name="role-icon-wrap">
                  <div className="fg-eaa60f1c42" data-node-id="831:978" data-name="shopping-bag">
                    <img alt="" className="fg-8faf267d30" src="/artist-assets/7971a4d06310bbd0.svg" />
                  </div>
                </div>
                <div className="fg-6e780b76ab" data-node-id="831:843" data-name="role-text">
                  <p className="fg-a93b181558" dir="auto" data-node-id="831:844">
                    خریدار
                  </p>
                  <p className="fg-d18225e26b" dir="auto" data-node-id="831:845">
                    جستجو، خرید آثار معتبر و حمایت از هنرمندان بومی
                  </p>
                </div>
                <div className="fg-b2a182ecf4" data-node-id="831:846" data-name="Frame" />
              </DesignChoice>
              <DesignChoice className="fg-0201ed2f6f" data-node-id="831:847" data-name="role-card" label="همکار خدمات ارائه خدمات تخصصی بسته‌بندی، شناسنامه و ارسال آثار" group="roles-list" initial={false}>
                <div className="fg-ba82126d62" data-node-id="831:848" data-name="role-icon-wrap">
                  <div className="fg-eaa60f1c42" data-node-id="831:981" data-name="truck">
                    <img alt="" className="fg-8faf267d30" src="/artist-assets/4df10486ce14113a.svg" />
                  </div>
                </div>
                <div className="fg-6e780b76ab" data-node-id="831:850" data-name="role-text">
                  <p className="fg-a93b181558" dir="auto" data-node-id="831:851">
                    همکار خدمات
                  </p>
                  <p className="fg-d18225e26b" dir="auto" data-node-id="831:852">
                    ارائه خدمات تخصصی بسته‌بندی، شناسنامه و ارسال آثار
                  </p>
                </div>
                <div className="fg-b2a182ecf4" data-node-id="831:853" data-name="Frame" />
              </DesignChoice>
              <DesignChoice className="fg-0201ed2f6f" data-node-id="831:854" data-name="role-card" label="خریدار سازمانی تهیه هدایای نفیس سازمانی و خریدهای کلان با فاکتور رسمی" group="roles-list" initial={false}>
                <div className="fg-ba82126d62" data-node-id="831:855" data-name="role-icon-wrap">
                  <div className="fg-eaa60f1c42" data-node-id="831:984" data-name="briefcase">
                    <img alt="" className="fg-8faf267d30" src="/artist-assets/fc2019e17145dc17.svg" />
                  </div>
                </div>
                <div className="fg-6e780b76ab" data-node-id="831:857" data-name="role-text">
                  <p className="fg-a93b181558" dir="auto" data-node-id="831:858">
                    خریدار سازمانی
                  </p>
                  <p className="fg-d18225e26b" dir="auto" data-node-id="831:859">
                    تهیه هدایای نفیس سازمانی و خریدهای کلان با فاکتور رسمی
                  </p>
                </div>
                <div className="fg-b2a182ecf4" data-node-id="831:860" data-name="Frame" />
              </DesignChoice>
              <DesignChoice className="fg-0201ed2f6f" data-node-id="836:106" data-name="role-card" label="سازمان / نهاد حمایت از هنرمندان و پروژه‌های فرهنگی-هنری" group="roles-list" initial={false}>
                <div className="fg-ba82126d62" data-node-id="836:107" data-name="role-icon-wrap">
                  <div className="fg-46bbc80874" data-node-id="836:108" data-name="building">
                    <div className="fg-eae18afc32" data-node-id="836:123" data-name="building">
                      <img alt="" className="fg-8faf267d30" src="/artist-assets/9d1b9365cfdce7b3.svg" />
                    </div>
                  </div>
                </div>
                <div className="fg-6e780b76ab" data-node-id="836:110" data-name="role-text">
                  <p className="fg-a93b181558" dir="auto" data-node-id="836:111">
                    سازمان / نهاد
                  </p>
                  <p className="fg-d18225e26b" dir="auto" data-node-id="836:112">
                    حمایت از هنرمندان و پروژه‌های فرهنگی-هنری
                  </p>
                </div>
                <div className="fg-b2a182ecf4" data-node-id="836:113" data-name="Frame" />
              </DesignChoice>
              <DesignChoice className="fg-0201ed2f6f" data-node-id="836:114" data-name="role-card" label="مدیر نگارین مدیریت و نظارت بر عملیات پلتفرم" group="roles-list" initial={false}>
                <div className="fg-ba82126d62" data-node-id="836:115" data-name="role-icon-wrap">
                  <div className="fg-46bbc80874" data-node-id="836:116" data-name="shield">
                    <div className="fg-eae18afc32" data-node-id="836:126" data-name="shield">
                      <img alt="" className="fg-8faf267d30" src="/artist-assets/fbba52cebc9f09ea.svg" />
                    </div>
                  </div>
                </div>
                <div className="fg-6e780b76ab" data-node-id="836:118" data-name="role-text">
                  <p className="fg-a93b181558" dir="auto" data-node-id="836:119">
                    مدیر نگارین
                  </p>
                  <p className="fg-d18225e26b" dir="auto" data-node-id="836:120">
                    مدیریت و نظارت بر عملیات پلتفرم
                  </p>
                </div>
                <div className="fg-b2a182ecf4" data-node-id="836:121" data-name="Frame" />
              </DesignChoice>
            </div>
            <DesignAction className="fg-a9c1ba3b38" data-node-id="831:861" data-name="Negarin / Button" destination="dashboard" label="ورود به پنل انتخابی">
              <p className="fg-d10f2ddccf" dir="auto" data-node-id="I831:861;46:9">
                ورود به پنل انتخابی
              </p>
            </DesignAction>
            <p className="fg-8139ff9612" dir="auto" data-node-id="831:864">
              نقش‌های شما بر اساس دسترسی‌های تأیید شده نمایش داده می‌شود.
            </p>
          </div>
        </div>
        <div className="fg-b79c743993" data-node-id="831:865" data-name="desktop-footer">
          <p className="fg-3f962418df" dir="auto" data-node-id="831:866">
            تمامی حقوق مادی و معنوی محفوظ است.
          </p>
        </div>
      </div>
      <div className="fg-92cd0a7784" data-node-id="831:867" data-name="visual-panel">
        <div className="fg-6bb8431576" data-node-id="1171:36" data-name="Persian Girih Pattern">
          <div className="fg-dbf3c7319b">
            <img alt="" className="fg-acc3667e96" src="/artist-assets/b5a31b1dc5ac23d7.svg" />
          </div>
        </div>
        <div className="fg-bd8cbd285d" data-node-id="831:868" data-name="top-tag">
          <div className="fg-2e0ff451d2" data-node-id="831:869" data-name="brand-header">
            <div className="fg-aa3cc88f7e" data-node-id="831:870" data-name="logo">
              <div className="fg-f84de76785" data-node-id="836:65" data-name="Negarin Logo">
                <img alt="" className="fg-71eecc63f8" src="/artist-assets/71ee9bd1446ae19.png" />
              </div>
            </div>
            <p className="fg-1a0ee5dd8f" dir="auto" data-node-id="831:873">
              نــگــاریــن
            </p>
          </div>
        </div>
        <div className="fg-0fd3ae64ad" data-node-id="831:874" data-name="hero-copy">
          <p className="fg-03b587c50b" dir="auto" data-node-id="831:875">
            انتخاب نقش
          </p>
          <p className="fg-889bf1aa9a" dir="auto" data-node-id="831:876">
            با یک حساب کاربری، به نقش‌های مختلف خود در نگارین دسترسی داشته باشید.
          </p>
        </div>
        <div className="fg-397ec49421" data-node-id="831:877" data-name="footer-stamp">
          <p className="fg-2464397d98" dir="auto" data-node-id="831:878">
            تمامی حقوق مادی و معنوی برای نگارین محفوظ است.
          </p>
        </div>
      </div>
    </div>
  );
}