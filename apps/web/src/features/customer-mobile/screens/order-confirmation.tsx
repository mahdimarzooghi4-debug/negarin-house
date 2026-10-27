import { CustomerCardLink } from "../customer-controls";
// Figma 591:2 — Customer / Order Confirmation - Mobile
import { DesignAction } from "../../artist/design-controls";
export default function CustomerOrderConfirmationMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="591:2" data-name="Customer / Order Confirmation - Mobile">
      <div className="fg-8f19c175cd" data-node-id="591:3" data-name="Order Confirmation / Top Bar">
        <div className="fg-2e4058efab" data-node-id="591:4">
          <p className="fg-32bd4c7660">close</p>
        </div>
        <div className="fg-dcb8b3c956" data-node-id="591:5">
          <p className="fg-32bd4c7660" dir="auto">
            سفارش ثبت شد
          </p>
        </div>
      </div>
      <div className="fg-5c716a2264" data-node-id="591:6" data-name="Order Confirmation / Success Hero">
        <div className="fg-d7cefd1a92" data-node-id="591:7" data-name="Success Icon">
          <div className="fg-9e98ca50bf" data-node-id="591:8">
            <p className="fg-32bd4c7660">check_circle</p>
          </div>
        </div>
        <div className="fg-62500a35db" data-node-id="591:9">
          <p className="fg-32bd4c7660" dir="auto">
            پرداخت با موفقیت انجام شد
          </p>
        </div>
        <div className="fg-9ee9b9a4e3" data-node-id="591:10">
          <p className="fg-32bd4c7660" dir="auto">
            سفارش ثبت شد و برای هنرمند ارسال شد.
          </p>
        </div>
      </div>
      <div className="fg-0b00da7653" data-node-id="591:11" data-name="Order Confirmation / Amount">
        <div className="fg-d50940c2dc" data-node-id="591:12">
          <p className="fg-32bd4c7660" dir="auto">
            مبلغ پرداخت‌شده
          </p>
        </div>
        <div className="fg-f996fb5ee7" data-node-id="591:13">
          <p className="fg-32bd4c7660" dir="auto">
            ۲,۵۳۵,۰۰۰ تومان
          </p>
        </div>
      </div>
      <div className="fg-22064adf5f" data-node-id="591:14" data-name="Order Confirmation / Shipping Locked">
        <div className="fg-04200f709f" data-node-id="591:15">
          <p className="fg-32bd4c7660">local_shipping</p>
        </div>
        <div className="fg-7eaa12c6b2" data-node-id="591:16">
          <p className="fg-32bd4c7660" dir="auto">
            پست پیشتاز
          </p>
        </div>
        <div className="fg-c9f5ce82f8" data-node-id="591:17">
          <p className="fg-32bd4c7660" dir="auto">
            هزینه ارسال: ۸۵,۰۰۰ تومان
          </p>
        </div>
        <div className="fg-6de763b2a5" data-node-id="591:18" data-name="Locked Badge">
          <div className="fg-5bc868f8d9" data-node-id="591:19">
            <p className="fg-32bd4c7660">lock</p>
          </div>
          <div className="fg-2b4502f64e" data-node-id="591:20">
            <p className="fg-32bd4c7660" dir="auto">
              روش قفل شد
            </p>
          </div>
        </div>
        <div className="fg-9c9ead7461" data-node-id="591:21">
          <p className="fg-32bd4c7660" dir="auto">
            روش و تعرفه این سفارش پس از ثبت قابل تغییر نیست.
          </p>
        </div>
      </div>
      <div className="fg-35264da3e6" data-node-id="591:22" data-name="Order Confirmation / Next Steps">
        <div className="fg-c59bb7b796" data-node-id="591:23">
          <p className="fg-32bd4c7660" dir="auto">
            بعدش چه می‌شود؟
          </p>
        </div>
        <div className="fg-114fb28aa5" data-node-id="591:24">
          <p className="fg-32bd4c7660">inventory_2</p>
        </div>
        <div className="fg-8588e1699d" data-node-id="591:25">
          <p className="fg-32bd4c7660" dir="auto">
            هنرمند سفارش را آماده می‌کند.
          </p>
        </div>
        <div className="fg-56ac0c9651" data-node-id="591:26">
          <p className="fg-32bd4c7660">local_shipping</p>
        </div>
        <div className="fg-c5b7744f0d" data-node-id="591:27">
          <p className="fg-32bd4c7660" dir="auto">
            بعد از تحویل به شبکه ارسال، رهگیری فعال می‌شود.
          </p>
        </div>
      </div>
      <CustomerCardLink className="fg-055c540714" data-node-id="591:28" data-name="CTA / Track Order" label="پیگیری سفارش" destination="order-detail">
        <DesignAction className="fg-a5333b2ddb" data-node-id="591:29" label="پیگیری سفارش" destination="order-detail">
          <p className="fg-32bd4c7660" dir="auto">
            پیگیری سفارش
          </p>
        </DesignAction>
      </CustomerCardLink>
      <CustomerCardLink className="fg-7a9a558c33" data-node-id="591:30" data-name="CTA / Back Home" label="بازگشت به خانه" destination="landing">
        <DesignAction className="fg-e5984e498e" data-node-id="591:31" label="بازگشت به خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            بازگشت به خانه
          </p>
        </DesignAction>
      </CustomerCardLink>
    </div>
  );
}
