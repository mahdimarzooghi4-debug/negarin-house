import { CustomerClearFilters } from "../customer-controls";
// Figma 657:5 — Customer / Filters & Sort - Mobile
import { DesignAction, DesignChoice, DesignField } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerFiltersSortMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="657:5" data-name="Customer / Filters & Sort - Mobile">
      <div className="fg-8f19c175cd" data-node-id="657:6" data-name="Category / Top Bar">
        <div className="fg-14d803027a" data-node-id="657:7">
          <p className="fg-32bd4c7660" dir="auto">
            فیلتر و مرتب‌سازی
          </p>
        </div>
        <DesignAction className="fg-59b0ad3200" data-node-id="657:8" label="arrow_forward" destination="products">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
      </div>
      <MobileNavigation className="fg-df983d935c" data-node-id="657:44" data-name="Bottom Navigation">
        <div className="fg-d39f212892" data-node-id="657:45">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-0f5f1290ca" data-node-id="657:46" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
        <div className="fg-4edc1ea99c" data-node-id="657:47">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-92ae24095f" data-node-id="657:48" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-d021d0ddc9" data-node-id="657:49">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-65ddd92ba1" data-node-id="657:50" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-42ae53004c" data-node-id="657:51">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-eaef08fe31" data-node-id="657:52">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-0077ccce1f" data-node-id="657:53">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-10c7bb0959" data-node-id="657:54" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
      </MobileNavigation>
      <DesignAction className="fg-96fc6b2e84" data-node-id="657:55" label="مرتب‌سازی" destination="filters-and-sort">
        <p className="fg-32bd4c7660" dir="auto">
          مرتب‌سازی
        </p>
      </DesignAction>
      <DesignChoice className="fg-ef34af19f6" data-node-id="657:56" data-name="Sort / Suggested" label="پیشنهادی" group="sort" initial={true}>
        <div className="fg-8371347a90" data-node-id="657:57">
          <p className="fg-32bd4c7660" dir="auto">
            پیشنهادی
          </p>
        </div>
      </DesignChoice>
      <DesignChoice className="fg-eb7f5510bf" data-node-id="657:58" data-name="Sort / Newest" label="جدیدترین" group="sort" initial={false}>
        <div className="fg-1c774507e2" data-node-id="657:59">
          <p className="fg-32bd4c7660" dir="auto">
            جدیدترین
          </p>
        </div>
      </DesignChoice>
      <DesignChoice className="fg-1ff9ae3f2b" data-node-id="657:60" data-name="Sort / Price Low" label="قیمت: کم به زیاد" group="sort" initial={false}>
        <div className="fg-1fecaf7125" data-node-id="657:61">
          <p className="fg-32bd4c7660" dir="auto">
            قیمت: کم به زیاد
          </p>
        </div>
      </DesignChoice>
      <DesignChoice className="fg-fcb90eeb91" data-node-id="657:62" data-name="Sort / Price High" label="قیمت: زیاد به کم" group="sort" initial={false}>
        <div className="fg-2f575b9e8b" data-node-id="657:63">
          <p className="fg-32bd4c7660" dir="auto">
            قیمت: زیاد به کم
          </p>
        </div>
      </DesignChoice>
      <div className="fg-98d94d0bcc" data-node-id="657:64">
        <p className="fg-32bd4c7660" dir="auto">
          فیلترها
        </p>
      </div>
      <div className="fg-d38d8de547" data-node-id="657:65" data-name="Filter / Availability">
        <div className="fg-b96ccfc70e" data-node-id="657:66">
          <p className="fg-32bd4c7660">inventory_2</p>
        </div>
        <div className="fg-f5e26f89d8" data-node-id="657:67">
          <p className="fg-32bd4c7660" dir="auto">
            فقط آثار موجود
          </p>
        </div>
        <div className="fg-7bc68246db" data-node-id="657:68">
          <p className="fg-32bd4c7660" dir="auto">
            آثاری را ببین که اکنون امکان خرید دارند.
          </p>
        </div>
        <DesignChoice className="fg-13514698b1" data-node-id="657:69" data-name="Toggle / Availability" label="Toggle / Availability" group="Filter / Availability" initial={false} multiple>
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/a1b7bb36.svg" />
        </DesignChoice>
      </div>
      <div className="fg-25f9fed8e6" data-node-id="657:71" data-name="Filter / Artist Verification">
        <div className="fg-b96ccfc70e" data-node-id="657:72">
          <p className="fg-32bd4c7660">verified</p>
        </div>
        <div className="fg-f5e26f89d8" data-node-id="657:73">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمندان تأییدشده
          </p>
        </div>
        <div className="fg-7bc68246db" data-node-id="657:74">
          <p className="fg-32bd4c7660" dir="auto">
            نمایش آثار هنرمندان دارای نشان تأیید نگارین.
          </p>
        </div>
        <DesignChoice className="fg-13514698b1" data-node-id="657:75" data-name="Toggle / Verified Artists" label="Toggle / Verified Artists" group="Filter / Artist Verification" initial={false} multiple>
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/a1b7bb36.svg" />
        </DesignChoice>
      </div>
      <div className="fg-39faea34f4" data-node-id="657:77">
        <p className="fg-32bd4c7660" dir="auto">
          بازه قیمت
        </p>
      </div>
      <div className="fg-be20d95548" data-node-id="657:78" data-name="Filter / Price Range">
        <div className="fg-25697f11c0" data-node-id="657:79">
          <p className="fg-32bd4c7660" dir="auto">
            حداقل و حداکثر قیمت دلخواهت را وارد کن.
          </p>
        </div>
        <DesignField className="fg-cbe5a2ccb6" data-node-id="657:80" data-name="Price / From" label="حداقل قیمت" placeholder="از">
          <div className="fg-819cc4c7b0" data-node-id="657:81">
            <p className="fg-32bd4c7660" dir="auto">
              از
            </p>
          </div>
        </DesignField>
        <DesignField className="fg-4f8b699b2d" data-node-id="657:82" data-name="Price / To" label="حداکثر قیمت" placeholder="تا">
          <div className="fg-819cc4c7b0" data-node-id="657:83">
            <p className="fg-32bd4c7660" dir="auto">
              تا
            </p>
          </div>
        </DesignField>
      </div>
      <div className="fg-a95a532cc2" data-node-id="657:84" data-name="Filter / Category">
        <div className="fg-d4edb40694" data-node-id="657:85">
          <p className="fg-32bd4c7660">palette</p>
        </div>
        <div className="fg-2f099cf3b3" data-node-id="657:86">
          <p className="fg-32bd4c7660" dir="auto">
            دسته انتخاب‌شده: میناکاری
          </p>
        </div>
      </div>
      <CustomerClearFilters className="fg-fe388b9a40" data-node-id="657:87" data-name="Clear Filters">
        <div className="fg-5f6811ccb1" data-node-id="657:88">
          <p className="fg-32bd4c7660" dir="auto">
            پاک کردن فیلترها
          </p>
        </div>
      </CustomerClearFilters>
      <DesignAction className="fg-54398de067" data-node-id="657:89" data-name="Apply Filters" label="نمایش نتایج" destination="filtered-results">
        <div className="fg-d4663dc741" data-node-id="657:90">
          <p className="fg-32bd4c7660" dir="auto">
            نمایش نتایج
          </p>
        </div>
      </DesignAction>
    </div>
  );
}
