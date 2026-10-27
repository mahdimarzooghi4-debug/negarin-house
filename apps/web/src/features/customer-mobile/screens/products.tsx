// Figma 703:5 — Customer / Products - Mobile
import { DesignAction, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerProductsMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="703:5" data-name="Customer / Products - Mobile">
      <div className="fg-8f19c175cd" data-node-id="703:6" data-name="Category / Top Bar">
        <div className="fg-277f5ccad5" data-node-id="703:7">
          <p className="fg-32bd4c7660" dir="auto">
            آثار
          </p>
        </div>
        <DesignAction className="fg-59b0ad3200" data-node-id="703:8" label="arrow_forward" destination="landing">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
      </div>
      <DesignAction className="fg-bc6c58105b" data-node-id="703:9" data-name="Category / Intro" label="auto_awesome_mosaic کشف آثار نگارین آثار هنرمندان را بر اساس دسته، سلیقه و موجودی کشف کن." destination="category-minakari">
        <div className="fg-eb4799596f" data-node-id="703:10">
          <p className="fg-32bd4c7660">auto_awesome_mosaic</p>
        </div>
        <div className="fg-aae6f04781" data-node-id="703:11">
          <p className="fg-32bd4c7660" dir="auto">
            کشف آثار نگارین
          </p>
        </div>
        <div className="fg-446fb30bf5" data-node-id="703:12">
          <p className="fg-32bd4c7660" dir="auto">
            آثار هنرمندان را بر اساس دسته، سلیقه و موجودی کشف کن.
          </p>
        </div>
      </DesignAction>
      <div className="fg-5bbd6bc631" data-node-id="703:13" data-name="Filter Button">
        <div className="fg-7e72d46ce2" data-node-id="703:14">
          <p className="fg-32bd4c7660">filter_list</p>
        </div>
        <DesignAction className="fg-cce66ade8d" data-node-id="703:15" label="فیلتر" destination="filters-and-sort">
          <p className="fg-32bd4c7660" dir="auto">
            فیلتر
          </p>
        </DesignAction>
      </div>
      <div className="fg-78f6399712" data-node-id="703:16" data-name="Sort Button">
        <div className="fg-d292eb715f" data-node-id="703:17">
          <p className="fg-32bd4c7660">sort</p>
        </div>
        <DesignAction className="fg-33b759b825" data-node-id="703:18" label="مرتب‌سازی" destination="filters-and-sort">
          <p className="fg-32bd4c7660" dir="auto">
            مرتب‌سازی
          </p>
        </DesignAction>
      </div>
      <div className="fg-8dba8535df" data-node-id="703:19">
        <p className="fg-32bd4c7660" dir="auto">
          همه آثار
        </p>
      </div>
      <div className="fg-263d409427" data-node-id="703:20" data-name="Category / Product">
        <div className="fg-867ae8fd36" data-node-id="703:21" data-name="Product Image">
          <img alt="" className="fg-d642291d8a" src="/customer-mobile-assets/777b8799.png" />
        </div>
        <div className="fg-baf8c4680e" data-node-id="703:22">
          <p className="fg-32bd4c7660" dir="auto">
            بشقاب میناکاری طرح شاه‌عباسی
          </p>
        </div>
        <div className="fg-3566d45bb8" data-node-id="703:23">
          <p className="fg-32bd4c7660" dir="auto">
            اثر زهرا محمدی
          </p>
        </div>
        <div className="fg-e5e0a7405f" data-node-id="703:24">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۴۵۰,۰۰۰ تومان
          </p>
        </div>
        <div className="fg-8a0cc1ef62" data-node-id="703:25">
          <DesignChoice className="fg-32bd4c7660" label="favorite_border" group="" initial={false} multiple>favorite_border</DesignChoice>
        </div>
        <div className="fg-af7e41b5c7" data-node-id="703:26">
          <p className="fg-32bd4c7660" dir="auto">
            برای پیشنهادهای بهتر
          </p>
        </div>
      </div>
      <div className="fg-a69646feb6" data-node-id="703:27" data-name="Category Badge">
        <div className="fg-0bcacf0856" data-node-id="703:28">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
      </div>
      <DesignAction className="fg-65453832ae" data-node-id="703:42" data-name="Category / Discovery Note" label="person_search کشف بر اساس دسته برای دیدن آثار بیشتر، یک دسته هنری را انتخاب کن." destination="category-minakari">
        <div className="fg-ddd7dc479d" data-node-id="675:140">
          <p className="fg-32bd4c7660">person_search</p>
        </div>
        <div className="fg-b93c17150e" data-node-id="703:44">
          <p className="fg-32bd4c7660" dir="auto">
            کشف بر اساس دسته
          </p>
        </div>
        <div className="fg-fd3e6100d6" data-node-id="703:45">
          <p className="fg-32bd4c7660" dir="auto">
            برای دیدن آثار بیشتر، یک دسته هنری را انتخاب کن.
          </p>
        </div>
      </DesignAction>
      <MobileNavigation className="fg-df983d935c" data-node-id="703:46" data-name="Bottom Navigation">
        <div className="fg-d39f212892" data-node-id="703:47">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-0f5f1290ca" data-node-id="703:48" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
        <div className="fg-4edc1ea99c" data-node-id="703:49">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-92ae24095f" data-node-id="703:50" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-d021d0ddc9" data-node-id="703:51">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-65ddd92ba1" data-node-id="703:52" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-42ae53004c" data-node-id="703:53">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-eaef08fe31" data-node-id="703:54">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-0077ccce1f" data-node-id="703:55">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-10c7bb0959" data-node-id="703:56" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
      </MobileNavigation>
      <DesignAction className="fg-552835d8a0" data-node-id="703:57" data-name="Category Chip / میناکاری" label="میناکاری" destination="category-minakari">
        <div className="fg-a8415567dd" data-node-id="703:58">
          <p className="fg-32bd4c7660" dir="auto">
            میناکاری
          </p>
        </div>
      </DesignAction>
      <DesignAction className="fg-869854dc8a" data-node-id="703:59" data-name="Category Chip / سفال" label="سفال" destination="category-minakari">
        <div className="fg-a8415567dd" data-node-id="703:60">
          <p className="fg-32bd4c7660" dir="auto">
            سفال
          </p>
        </div>
      </DesignAction>
      <DesignAction className="fg-3a85127b93" data-node-id="703:61" data-name="Category Chip / گلیم" label="گلیم" destination="category-minakari">
        <div className="fg-a8415567dd" data-node-id="703:62">
          <p className="fg-32bd4c7660" dir="auto">
            گلیم
          </p>
        </div>
      </DesignAction>
      <DesignAction className="fg-ce78f31523" data-node-id="703:63" data-name="Category Chip / چرم" label="چرم" destination="category-minakari">
        <div className="fg-a8415567dd" data-node-id="703:64">
          <p className="fg-32bd4c7660" dir="auto">
            چرم
          </p>
        </div>
      </DesignAction>
      <p className="fg-121c307d45" dir="auto" data-node-id="703:65">
        فیلتر و مرتب‌سازی برای رسیدن سریع‌تر به اثر مناسب در دسترس است.
      </p>
    </div>
  );
}
