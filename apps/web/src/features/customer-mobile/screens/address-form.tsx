import { CustomerCardLink } from "../customer-controls";
// Figma 638:5 — Customer / Address Form - Mobile
import { DesignAction, DesignField, DesignChoice } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";

export default function CustomerAddressFormMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="638:5" data-name="Customer / Address Form - Mobile">
      <div className="fg-cbfa65986b" data-node-id="638:6" data-name="Add Address / Top Bar">
        <div className="fg-277f5ccad5" data-node-id="638:7">
          <p className="fg-32bd4c7660" dir="auto">
            آدرس تحویل
          </p>
        </div>
        <DesignAction className="fg-71cf523d17" data-node-id="638:8" label="arrow_forward" destination="addresses">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
      </div>
      <div className="fg-2a56a7fd1d" data-node-id="638:9" data-name="Add Address / Intro">
        <div className="fg-25261074ef" data-node-id="638:10">
          <p className="fg-32bd4c7660">add_location_alt</p>
        </div>
        <div className="fg-e4c9df0a2c" data-node-id="638:11">
          <p className="fg-32bd4c7660" dir="auto">
            افزودن یا ویرایش آدرس
          </p>
        </div>
        <div className="fg-98c999de3f" data-node-id="638:12">
          <p className="fg-32bd4c7660" dir="auto">
            اطلاعات آدرس را تکمیل یا اصلاح کن؛ این نشانی در مرحله تکمیل خرید قابل انتخاب است.
          </p>
        </div>
      </div>
      <div className="fg-54ed47265d" data-node-id="638:13">
        <p className="fg-32bd4c7660" dir="auto">
          اطلاعات تحویل
        </p>
      </div>
      <DesignField className="fg-74f4b0b0f8" data-node-id="638:14" data-name="Recipient Name" label="نام گیرنده" placeholder="person نام گیرنده وارد کن">
        <div className="fg-abab1bc3bb" data-node-id="638:15">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <div className="fg-8ac23fb933" data-node-id="638:16">
          <p className="fg-32bd4c7660" dir="auto">
            نام گیرنده
          </p>
        </div>
        <div className="fg-91d65c88c9" data-node-id="638:17">
          <p className="fg-32bd4c7660" dir="auto">
            وارد کن
          </p>
        </div>
      </DesignField>
      <DesignField className="fg-282d43fee5" data-node-id="638:18" data-name="Recipient Mobile" label="موبایل گیرنده" placeholder="smartphone شماره موبایل وارد کن">
        <div className="fg-abab1bc3bb" data-node-id="638:19">
          <p className="fg-32bd4c7660">smartphone</p>
        </div>
        <div className="fg-8ac23fb933" data-node-id="638:20">
          <p className="fg-32bd4c7660" dir="auto">
            شماره موبایل
          </p>
        </div>
        <div className="fg-91d65c88c9" data-node-id="638:21">
          <p className="fg-32bd4c7660" dir="auto">
            وارد کن
          </p>
        </div>
      </DesignField>
      <DesignField className="fg-cf0d528050" data-node-id="638:22" data-name="Province" label="استان" placeholder="map استان انتخاب کن chevron_left">
        <div className="fg-abab1bc3bb" data-node-id="638:23">
          <p className="fg-32bd4c7660">map</p>
        </div>
        <div className="fg-8ac23fb933" data-node-id="638:24">
          <p className="fg-32bd4c7660" dir="auto">
            استان
          </p>
        </div>
        <div className="fg-91d65c88c9" data-node-id="638:25">
          <p className="fg-32bd4c7660" dir="auto">
            انتخاب کن
          </p>
        </div>
        <div className="fg-603cd3421f" data-node-id="638:26">
          <p className="fg-32bd4c7660">chevron_left</p>
        </div>
      </DesignField>
      <DesignField className="fg-a67220dcfa" data-node-id="638:27" data-name="City" label="شهر" placeholder="location_city شهر انتخاب کن chevron_left">
        <div className="fg-abab1bc3bb" data-node-id="638:28">
          <p className="fg-32bd4c7660">location_city</p>
        </div>
        <div className="fg-8ac23fb933" data-node-id="638:29">
          <p className="fg-32bd4c7660" dir="auto">
            شهر
          </p>
        </div>
        <div className="fg-91d65c88c9" data-node-id="638:30">
          <p className="fg-32bd4c7660" dir="auto">
            انتخاب کن
          </p>
        </div>
        <div className="fg-603cd3421f" data-node-id="638:31">
          <p className="fg-32bd4c7660">chevron_left</p>
        </div>
      </DesignField>
      <DesignField className="fg-bef73654cd" data-node-id="638:32" data-name="Postal Code" label="کد پستی" placeholder="markunread_mailbox کد پستی وارد کن">
        <div className="fg-abab1bc3bb" data-node-id="638:33">
          <p className="fg-32bd4c7660">markunread_mailbox</p>
        </div>
        <div className="fg-8ac23fb933" data-node-id="638:34">
          <p className="fg-32bd4c7660" dir="auto">
            کد پستی
          </p>
        </div>
        <div className="fg-91d65c88c9" data-node-id="638:35">
          <p className="fg-32bd4c7660" dir="auto">
            وارد کن
          </p>
        </div>
      </DesignField>
      <DesignField className="fg-e51f20f51a" data-node-id="638:36" data-name="Full Address" label="نشانی کامل" placeholder="home_work آدرس کامل خیابان، کوچه، پلاک و واحد را وارد کن">
        <div className="fg-975cb63cd8" data-node-id="638:37">
          <p className="fg-32bd4c7660">home_work</p>
        </div>
        <div className="fg-b6728d85a3" data-node-id="638:38">
          <p className="fg-32bd4c7660" dir="auto">
            آدرس کامل
          </p>
        </div>
        <div className="fg-bb4fedb0a0" data-node-id="638:39">
          <p className="fg-32bd4c7660" dir="auto">
            خیابان، کوچه، پلاک و واحد را وارد کن
          </p>
        </div>
      </DesignField>
      <div className="fg-822f89256d" data-node-id="638:40" data-name="Default Address">
        <div className="fg-ac02978cd4" data-node-id="638:41">
          <p className="fg-32bd4c7660">star_outline</p>
        </div>
        <div className="fg-402b607ce0" data-node-id="638:42">
          <p className="fg-32bd4c7660" dir="auto">
            این آدرس به‌عنوان آدرس پیش‌فرض ذخیره شود
          </p>
        </div>
        <DesignChoice className="fg-cd86f7aa53" data-node-id="638:43" data-name="Default Address / Toggle" label="Default Address / Toggle" group="Default Address" initial={false} multiple>
          <img alt="" className="fg-8faf267d30" src="/customer-mobile-assets/a70e3e9f.svg" />
        </DesignChoice>
      </div>
      <CustomerCardLink className="fg-09334f9d0a" data-node-id="638:45" data-name="Save Address" label="ذخیره آدرس" destination="addresses">
        <DesignAction className="fg-81912878bb" data-node-id="638:46" label="ذخیره آدرس" destination="addresses">
          <p className="fg-32bd4c7660" dir="auto">
            ذخیره آدرس
          </p>
        </DesignAction>
      </CustomerCardLink>
      <MobileNavigation className="fg-7466b2ac0a" data-node-id="638:47" data-name="Bottom Navigation">
        <div className="fg-27ea8a0f04" data-node-id="638:48">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-1acc6d63a3" data-node-id="638:49" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
        <div className="fg-8cbe47f7e8" data-node-id="638:50">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-40feae7dbc" data-node-id="638:51" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-f4672a9e2c" data-node-id="638:52">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-4c9c978e03" data-node-id="638:53" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-99437dfe63" data-node-id="638:54">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-c3a8fdd083" data-node-id="638:55">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-66018a29f4" data-node-id="638:56">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-f5d4fe5c20" data-node-id="638:57" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
      </MobileNavigation>
    </div>
  );
}
