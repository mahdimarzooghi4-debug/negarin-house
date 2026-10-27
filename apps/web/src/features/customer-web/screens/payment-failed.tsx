// Native Figma 1194:665 — Customer / Payment Failed — Web
import {CustomerAction} from "../customer-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Large";
  state?: "Default";
  style?: "Primary" | "Secondary";
};

function NegarinButton({ className, label = "ادامه", size = "Large", state = "Default", style = "Primary" }: NegarinButtonProps) {
  const isSecondaryAndLargeAndDefault = style === "Secondary" && size === "Large" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isSecondaryAndLargeAndDefault ? "node-46_20" : "node-46_8"} label={label}>
      {style === "Primary" && size === "Large" && state === "Default" && (
        <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:9">
          {label}
        </p>
      )}
      {isSecondaryAndLargeAndDefault && (
        <p className="fg-e4a7d61a6f" dir="auto" data-node-id="46:21">
          {label}
        </p>
      )}
    </CustomerAction>
  );
}

export default function CustomerPaymentFailedWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1194:665" data-name="Customer / Payment Failed — Web">
      <div className="fg-6f037ae468" data-node-id="1194:666" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1194:667" data-name="Customer actions">
          <div className="fg-7901589539" data-node-id="1194:668" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:669">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:670" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1194:671" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:672">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:673" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1194:674" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:675">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:676" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1194:677" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:678" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:679" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:680" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1194:681" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1194:682" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1194:683">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1194:684">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1194:685" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-dcb2e457d1" data-node-id="1194:686" data-name="Payment failed stage">
        <div className="fg-b9469d7b8b" data-node-id="1194:687" data-name="Payment status card">
          <div className="fg-a45f1b4cf4" data-node-id="1194:688" data-name="Status heading">
            <div className="fg-097616f84e" data-node-id="1194:689" data-name="Status illustration">
              <div className="fg-5b445b9617" data-node-id="1194:690" data-name="Outer ring">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/40f8862d.svg" />
              </div>
              <div className="fg-fa56d56fba" data-node-id="1194:691" data-name="Inner circle">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/1153fd81.svg" />
              </div>
              <p className="fg-bc6197f84d" data-node-id="1194:692">
                close
              </p>
            </div>
            <div className="fg-d2856ca3d9" data-node-id="1194:693" data-name="Status label">
              <p className="fg-d1d72a8bdb" dir="auto" data-node-id="1194:694">
                پرداخت تکمیل نشد
              </p>
            </div>
            <p className="fg-43802c52b1" dir="auto" data-node-id="1194:695">
              پرداخت انجام نشد
            </p>
            <p className="fg-745d3d42ce" dir="auto" data-node-id="1194:696">
              پرداخت لغو شد یا فرایند آن کامل نشد. وضعیت سفارش #NG-1054 هنوز نهایی نشده و مبلغی برای این سفارش ثبت نشده است.
            </p>
          </div>
          <div className="fg-abf34ed7e8" data-node-id="1194:697" data-name="Order summary">
            <div className="fg-e9296b6a0e" data-node-id="1194:698" data-name="Amount">
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1194:699">
                مبلغ سفارش
              </p>
              <p className="fg-3e46eb501c" dir="auto" data-node-id="1194:700">
                ۶,۲۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-ea9e4326ac" data-node-id="1194:701" data-name="Divider" />
            <div className="fg-e9296b6a0e" data-node-id="1194:702" data-name="Order number">
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1194:703">
                شماره سفارش
              </p>
              <p className="fg-00b08f6bc3" data-node-id="1194:704">
                #NG-1054
              </p>
            </div>
          </div>
          <div className="fg-21e57c515b" data-node-id="1194:705" data-name="Status note">
            <p className="fg-9f70416e12" dir="auto" data-node-id="1194:706">
              اگر مبلغی موقتاً از حسابت کسر شده باشد، مطابق روال بانکی به حساب تو بازمی‌گردد.
            </p>
            <p className="fg-211661ff14" data-node-id="1194:707">
              info
            </p>
          </div>
          <div className="fg-e10cb974a7" data-node-id="1194:708" data-name="Actions">
            <NegarinButton className="fg-c0047fcdc0" label="بازگشت به سفارش" style="Secondary" />
            <NegarinButton className="fg-b37cd6aeab" label="تلاش دوباره برای پرداخت" />
          </div>
        </div>
      </div>
      <div className="fg-7df543f928" data-node-id="1194:715" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1194:716" data-name="Footer content">
          <div className="fg-d312e73b04" data-node-id="1194:717" data-name="Footer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1194:718">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1194:719">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:720" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:721" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
          <div className="fg-d312e73b04" data-node-id="1194:722" data-name="Footer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1194:723">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:724" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:725" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:726" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-9ecf6cfa1b" data-node-id="1194:727" data-name="Footer brand">
            <div className="fg-f44fc0c04f" data-node-id="1194:728" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1194:729">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1194:730">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-93afce054f" data-node-id="1194:731" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c5fefb6d.png" />
            </div>
          </div>
        </div>
        <div className="fg-a97164bcb0" data-node-id="1194:732" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1194:733">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1194:734">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
