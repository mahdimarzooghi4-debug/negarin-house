// Figma 771:7 — Customer / Corporate Buyer Access - Mobile
import { DesignAction } from "../../artist/design-controls";
export default function CustomerCorporateBuyerAccessMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="771:7" data-name="Customer / Corporate Buyer Access - Mobile">
      <div className="fg-cbfa65986b" data-node-id="771:8" data-name="Add Address / Top Bar">
        <div className="fg-277f5ccad5" data-node-id="771:9">
          <p className="fg-32bd4c7660" dir="auto">
            دسترسی خریدار سازمانی
          </p>
        </div>
        <DesignAction className="fg-71cf523d17" data-node-id="771:10" label="arrow_forward" destination="landing">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
      </div>
      <div className="fg-2a56a7fd1d" data-node-id="771:11" data-name="Add Address / Intro">
        <div className="fg-25261074ef" data-node-id="771:12">
          <p className="fg-32bd4c7660">add_location_alt</p>
        </div>
        <div className="fg-e4c9df0a2c" data-node-id="771:13">
          <p className="fg-32bd4c7660" dir="auto">
            ورود با نقش خریدار سازمانی
          </p>
        </div>
        <div className="fg-b2a75a6412" data-node-id="771:14">
          <p className="fg-32bd4c7660" dir="auto">
            خرید سازمانی نقش مستقلی در نگارین است. ابتدا با احراز هویت مشترک وارد شوید؛ سپس دسترسی خریدار سازمانی بر اساس حساب شما تعیین می‌شود.
          </p>
        </div>
      </div>
      <div className="fg-54ed47265d" data-node-id="771:15">
        <p className="fg-32bd4c7660" dir="auto">
          مرز حساب‌ها
        </p>
      </div>
      <DesignAction className="fg-f5c6cb5cf3" data-node-id="771:47" data-name="Continue to Shared Auth" label="ادامه به ورود / ثبت‌نام" destination="login-and-register">
        <div className="fg-81912878bb" data-node-id="771:48">
          <p className="fg-32bd4c7660" dir="auto">
            ادامه به ورود / ثبت‌نام
          </p>
        </div>
      </DesignAction>
      <div className="fg-e2589509e1" data-node-id="1004:8" data-name="Corporate Buyer Access / Info">
        <p className="fg-61cd8ac40c" dir="auto" data-node-id="1004:9">
          خرید شخصی و سازمانی یک جریان نیستند
        </p>
        <p className="fg-7a39da9a26" dir="auto" data-node-id="1004:10">
          درخواست خرید، پیشنهاد، سفارش و تحویل سازمانی در پرتال Corporate Buyer مدیریت می‌شوند. این صفحه فقط شما را به احراز هویت مشترک هدایت می‌کند و هیچ درخواست سازمانی داخل حساب مشتری شخصی ثبت نمی‌کند.
        </p>
      </div>
    </div>
  );
}
