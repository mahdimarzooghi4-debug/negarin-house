// Native Figma 1194:594 — Customer / Payment Success — Web
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

export default function CustomerPaymentSuccessWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1194:594" data-name="Customer / Payment Success — Web">
      <div className="fg-6f037ae468" data-node-id="1194:595" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1194:596" data-name="Customer actions">
          <div className="fg-7901589539" data-node-id="1194:597" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:598">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:599" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1194:600" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:601">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:602" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1194:603" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:604">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:605" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1194:606" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:607" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:608" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:609" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1194:610" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1194:611" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1194:612">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1194:613">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1194:614" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-dcb2e457d1" data-node-id="1194:615" data-name="Payment success stage">
        <div className="fg-b9469d7b8b" data-node-id="1194:616" data-name="Payment status card">
          <div className="fg-a45f1b4cf4" data-node-id="1194:617" data-name="Status heading">
            <div className="fg-097616f84e" data-node-id="1194:618" data-name="Status illustration">
              <div className="fg-5b445b9617" data-node-id="1194:619" data-name="Outer ring">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/7ff1409c.svg" />
              </div>
              <div className="fg-fa56d56fba" data-node-id="1194:620" data-name="Inner circle">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/88a5d279.svg" />
              </div>
              <p className="fg-11b6ce0ea3" data-node-id="1194:621">
                check
              </p>
            </div>
            <div className="fg-845f6178fa" data-node-id="1194:622" data-name="Status label">
              <p className="fg-835e7ccbbc" dir="auto" data-node-id="1194:623">
                پرداخت موفق
              </p>
            </div>
            <p className="fg-43802c52b1" dir="auto" data-node-id="1194:624">
              سفارش با موفقیت ثبت شد
            </p>
            <p className="fg-745d3d42ce" dir="auto" data-node-id="1194:625">
              پرداختت با موفقیت انجام شد و سفارش #NG-1054 در خانه نگارین ثبت شد. جزئیات و روند آماده‌سازی را از بخش سفارش‌ها می‌توانی دنبال کنی.
            </p>
          </div>
          <div className="fg-abf34ed7e8" data-node-id="1194:626" data-name="Order summary">
            <div className="fg-e9296b6a0e" data-node-id="1194:627" data-name="Amount">
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1194:628">
                مبلغ پرداخت‌شده
              </p>
              <p className="fg-3e46eb501c" dir="auto" data-node-id="1194:629">
                ۶,۲۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-ea9e4326ac" data-node-id="1194:630" data-name="Divider" />
            <div className="fg-e9296b6a0e" data-node-id="1194:631" data-name="Order number">
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1194:632">
                شماره سفارش
              </p>
              <p className="fg-00b08f6bc3" data-node-id="1194:633">
                #NG-1054
              </p>
            </div>
          </div>
          <div className="fg-c3e6dfd29f" data-node-id="1194:634" data-name="Status note">
            <p className="fg-9f70416e12" dir="auto" data-node-id="1194:635">
              رسید پرداخت و اطلاعات سفارش در حساب کاربری تو ثبت شده است.
            </p>
            <p className="fg-797ff91bac" data-node-id="1194:636">
              task_alt
            </p>
          </div>
          <div className="fg-e10cb974a7" data-node-id="1194:637" data-name="Actions">
            <NegarinButton className="fg-c0047fcdc0" label="بازگشت به صفحهٔ اصلی" style="Secondary" />
            <NegarinButton className="fg-b37cd6aeab" label="پیگیری سفارش" />
          </div>
        </div>
      </div>
      <div className="fg-7df543f928" data-node-id="1194:644" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1194:645" data-name="Footer content">
          <div className="fg-d312e73b04" data-node-id="1194:646" data-name="Footer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1194:647">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1194:648">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:649" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:650" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
          <div className="fg-d312e73b04" data-node-id="1194:651" data-name="Footer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1194:652">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:653" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:654" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:655" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-9ecf6cfa1b" data-node-id="1194:656" data-name="Footer brand">
            <div className="fg-f44fc0c04f" data-node-id="1194:657" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1194:658">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1194:659">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-93afce054f" data-node-id="1194:660" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c5fefb6d.png" />
            </div>
          </div>
        </div>
        <div className="fg-a97164bcb0" data-node-id="1194:661" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1194:662">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1194:663">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
