// Figma 771:62 — Customer / Corporate Buyer Handoff - Mobile
import { DesignAction } from "../../artist/design-controls";
import { MobileNavigation } from "../mobile-navigation";
export default function CustomerCorporateBuyerHandoffMobile() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="771:62" data-name="Customer / Corporate Buyer Handoff - Mobile">
      <div className="fg-cbfa65986b" data-node-id="771:63" data-name="Add Address / Top Bar">
        <div className="fg-277f5ccad5" data-node-id="771:64">
          <p className="fg-32bd4c7660" dir="auto">
            خرید سازمانی
          </p>
        </div>
        <DesignAction className="fg-71cf523d17" data-node-id="771:65" label="arrow_forward" destination="corporate-buyer-access">
          <p className="fg-32bd4c7660">arrow_forward</p>
        </DesignAction>
      </div>
      <div className="fg-2a56a7fd1d" data-node-id="771:66" data-name="Add Address / Intro">
        <div className="fg-25261074ef" data-node-id="771:67">
          <p className="fg-32bd4c7660">add_location_alt</p>
        </div>
        <div className="fg-e4c9df0a2c" data-node-id="771:68">
          <p className="fg-32bd4c7660" dir="auto">
            پرتال خریدار سازمانی نگارین
          </p>
        </div>
        <div className="fg-b2a75a6412" data-node-id="771:69">
          <p className="fg-32bd4c7660" dir="auto">
            برای هدایای سازمانی، سفارش عمده یا سفارش اختصاصی از پرتال خریدار سازمانی استفاده کنید.
          </p>
        </div>
      </div>
      <div className="fg-54ed47265d" data-node-id="771:70">
        <p className="fg-32bd4c7660" dir="auto">
          ادامه در نقش سازمانی
        </p>
      </div>
      <DesignAction className="fg-f5c6cb5cf3" data-node-id="771:102" data-name="Continue to Corporate Buyer Access" label="ادامه با نقش خریدار سازمانی" destination="corporate-buyer-access">
        <div className="fg-81912878bb" data-node-id="771:103">
          <p className="fg-32bd4c7660" dir="auto">
            ادامه با نقش خریدار سازمانی
          </p>
        </div>
      </DesignAction>
      <MobileNavigation className="fg-7466b2ac0a" data-node-id="771:104" data-name="Bottom Navigation">
        <div className="fg-27ea8a0f04" data-node-id="771:105">
          <p className="fg-32bd4c7660">person</p>
        </div>
        <DesignAction className="fg-1acc6d63a3" data-node-id="771:106" label="حساب" destination="account">
          <p className="fg-32bd4c7660" dir="auto">
            حساب
          </p>
        </DesignAction>
        <div className="fg-8cbe47f7e8" data-node-id="771:107">
          <p className="fg-32bd4c7660">shopping_cart</p>
        </div>
        <DesignAction className="fg-40feae7dbc" data-node-id="771:108" label="سبد" destination="cart">
          <p className="fg-32bd4c7660" dir="auto">
            سبد
          </p>
        </DesignAction>
        <div className="fg-f4672a9e2c" data-node-id="771:109">
          <p className="fg-32bd4c7660">dynamic_feed</p>
        </div>
        <DesignAction className="fg-4c9c978e03" data-node-id="771:110" label="روایت‌ها" destination="stories">
          <p className="fg-32bd4c7660" dir="auto">
            روایت‌ها
          </p>
        </DesignAction>
        <div className="fg-99437dfe63" data-node-id="771:111">
          <p className="fg-32bd4c7660">search</p>
        </div>
        <div className="fg-c3a8fdd083" data-node-id="771:112">
          <p className="fg-32bd4c7660" dir="auto">
            جستجو
          </p>
        </div>
        <div className="fg-66018a29f4" data-node-id="771:113">
          <p className="fg-32bd4c7660">home</p>
        </div>
        <DesignAction className="fg-f5d4fe5c20" data-node-id="771:114" label="خانه" destination="landing">
          <p className="fg-32bd4c7660" dir="auto">
            خانه
          </p>
        </DesignAction>
      </MobileNavigation>
      <div className="fg-e6a9e113db" data-node-id="1004:12" data-name="Corporate Buyer / Handoff Info">
        <p className="fg-61cd8ac40c" dir="auto" data-node-id="1004:13">
          درخواست سازمانی از حساب مشتری ثبت نمی‌شود
        </p>
        <p className="fg-dcba748046" dir="auto" data-node-id="1004:14">
          در پرتال خریدار سازمانی می‌توانید درخواست خرید بسازید، پیشنهاد نگارین را بررسی کنید و سفارش و تحویل سازمان خود را پیگیری کنید. اطلاعات و سفارش‌های شخصی شما از این نقش جدا می‌مانند.
        </p>
      </div>
    </div>
  );
}
