import { CustomerQuantityStep, CustomerQuantityValue } from "../customer-controls";
// Figma 572:5 — Customer / Cart - Mobile
import { DesignAction } from "../../artist/design-controls";

export default function CustomerCartMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="572:5" data-name="Customer / Cart - Mobile">
      <div className="fg-8f19c175cd" data-node-id="572:6" data-name="Cart / Top Bar">
        <DesignAction className="fg-ad8180083c" data-node-id="590:284" label="arrow_forward" destination="product-detail">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
        <div className="fg-aaa27c81be" data-node-id="572:8">
          <p className="fg-32bd4c7660" dir="auto">
            سبد خرید
          </p>
        </div>
      </div>
      <div className="fg-fedcf675b5" data-node-id="572:9">
        <p className="fg-32bd4c7660" dir="auto">
          ۱ محصول در سبد
        </p>
      </div>
      <div className="fg-5424545ab4" data-node-id="572:10" data-name="Cart Item / Product">
        <div className="fg-bf630d3d75" data-node-id="572:11" data-name="Product Image">
          <div className="fg-e0404e6168" data-node-id="572:12" data-name="Product Image Fill">
            <img alt="" className="fg-71eecc63f8" src="/customer-mobile-assets/27c9ed56.png" />
          </div>
        </div>
        <div className="fg-0e071cc1ac" data-node-id="572:13">
          <p className="fg-32bd4c7660" dir="auto">
            بشقاب میناکاری طرح شاه‌عباسی
          </p>
        </div>
        <div className="fg-ff9a82be77" data-node-id="572:14">
          <p className="fg-32bd4c7660" dir="auto">
            اثر زهرا محمدی
          </p>
        </div>
        <div className="fg-187a0a62b3" data-node-id="572:15">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۴۵۰,۰۰۰ تومان
          </p>
        </div>
        <div className="fg-f425601ad9" data-node-id="572:16" data-name="Quantity Stepper">
          <CustomerQuantityStep className="fg-007ef058f0" data-node-id="572:17" step={1}>
            <p className="fg-32bd4c7660">add</p>
          </CustomerQuantityStep>
          <CustomerQuantityValue className="fg-8770dd2a91" data-node-id="572:18">
            <p className="fg-32bd4c7660">۱</p>
          </CustomerQuantityValue>
          <CustomerQuantityStep className="fg-ad15adead5" data-node-id="572:19" step={-1}>
            <p className="fg-32bd4c7660">remove</p>
          </CustomerQuantityStep>
        </div>
        <div className="fg-3dd3d6fc70" data-node-id="572:20">
          <DesignAction className="fg-32bd4c7660" label="delete_outline">delete_outline</DesignAction>
        </div>
      </div>
      <div className="fg-047e80ed50" data-node-id="572:21" data-name="Shipping Note">
        <div className="fg-4d6f807028" data-node-id="572:22">
          <p className="fg-32bd4c7660">local_shipping</p>
        </div>
        <div className="fg-4e0d1322ce" data-node-id="572:23">
          <p className="fg-32bd4c7660" dir="auto">
            پست پیشتاز
          </p>
        </div>
        <div className="fg-bc55565afb" data-node-id="572:24">
          <p className="fg-32bd4c7660" dir="auto">
            روش پیش‌فرض فروشگاه زهرا محمدی • هزینه ارسال: ۸۵,۰۰۰ تومان
          </p>
        </div>
      </div>
      <div className="fg-d28e52635d" data-node-id="572:25" data-name="Order Summary">
        <div className="fg-9ac7048c5f" data-node-id="572:26">
          <p className="fg-32bd4c7660" dir="auto">
            خلاصه سفارش
          </p>
        </div>
        <div className="fg-fa75b4ae87" data-node-id="572:27">
          <p className="fg-32bd4c7660" dir="auto">
            جمع کالاها
          </p>
        </div>
        <div className="fg-f24d0d2b6a" data-node-id="572:28">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۴۵۰,۰۰۰ تومان
          </p>
        </div>
        <div className="fg-1940c3fb7b" data-node-id="572:29">
          <p className="fg-32bd4c7660" dir="auto">
            هزینه ارسال
          </p>
        </div>
        <div className="fg-10bd21285a" data-node-id="572:30">
          <p className="fg-32bd4c7660" dir="auto">
            ۸۵,۰۰۰ تومان
          </p>
        </div>
        <div className="fg-3f584f5492" data-node-id="572:31" data-name="Summary Divider" />
        <div className="fg-932b36443a" data-node-id="572:32">
          <p className="fg-32bd4c7660" dir="auto">
            مبلغ قابل پرداخت
          </p>
        </div>
        <div className="fg-e261bb0a59" data-node-id="572:33">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۵۳۵,۰۰۰ تومان
          </p>
        </div>
      </div>
      <div className="fg-ec9b2f4dcf" data-node-id="572:34">
        <p className="fg-32bd4c7660" dir="auto">
          هزینه ارسال از خریدار دریافت می‌شود و در مبلغ نهایی لحاظ شده است.
        </p>
      </div>
      <div className="fg-7937e7fa5a" data-node-id="572:35" data-name="Cart / Sticky Footer">
        <DesignAction className="fg-7e0452064f" data-node-id="572:36" data-name="Checkout CTA" label="ادامه به اطلاعات ارسال" destination="login-and-register">
          <div className="fg-662f363437" data-node-id="572:37">
            <p className="fg-32bd4c7660" dir="auto">
              ادامه به اطلاعات ارسال
            </p>
          </div>
        </DesignAction>
      </div>
    </div>
  );
}
