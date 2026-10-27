// Native Figma 1194:523 — Customer / Payment Redirect — Web
import {CustomerAction} from "../customer-controls";

export default function CustomerPaymentRedirectWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1194:523" data-name="Customer / Payment Redirect — Web">
      <div className="fg-6f037ae468" data-node-id="1194:524" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1194:525" data-name="Customer actions">
          <div className="fg-7901589539" data-node-id="1194:526" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:527">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:528" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1194:529" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:530">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:531" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1194:532" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1194:533">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1194:534" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1194:535" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:536" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:537" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1194:538" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1194:539" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1194:540" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1194:541">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1194:542">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1194:543" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-ffc04c8214" data-node-id="1194:544" data-name="Payment redirect stage">
        <div className="fg-b9469d7b8b" data-node-id="1194:545" data-name="Payment status card">
          <div className="fg-a45f1b4cf4" data-node-id="1194:546" data-name="Status heading">
            <div className="fg-097616f84e" data-node-id="1194:547" data-name="Status illustration">
              <div className="fg-5b445b9617" data-node-id="1194:548" data-name="Outer ring">
                <img alt="" className="fg-8faf267d30" height="112" src="/customer-web-assets/1230ebb9.png" width="112" />
              </div>
              <div className="fg-fa56d56fba" data-node-id="1194:549" data-name="Inner circle">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/63cd8486.svg" />
              </div>
              <p className="fg-bba84fe07b" data-node-id="1194:550">
                lock
              </p>
              <div className="fg-a600659fff" data-node-id="1194:551" data-name="Progress dot">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/00da8890.svg" />
              </div>
            </div>
            <div className="fg-4e953de06d" data-node-id="1194:552" data-name="Status label">
              <p className="fg-585f829b1a" dir="auto" data-node-id="1194:553">
                پرداخت امن
              </p>
            </div>
            <p className="fg-43802c52b1" dir="auto" data-node-id="1194:554">
              در حال انتقال به صفحهٔ پرداخت
            </p>
            <p className="fg-745d3d42ce" dir="auto" data-node-id="1194:555">
              برای تکمیل پرداخت، تا چند لحظهٔ دیگر به محیط امن پرداخت منتقل می‌شوی. لطفاً این صفحه را نبند و از بازگشت مرورگر استفاده نکن.
            </p>
          </div>
          <div className="fg-abf34ed7e8" data-node-id="1194:556" data-name="Order summary">
            <div className="fg-e9296b6a0e" data-node-id="1194:557" data-name="Amount">
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1194:558">
                مبلغ سفارش
              </p>
              <p className="fg-3e46eb501c" dir="auto" data-node-id="1194:559">
                ۶,۲۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-ea9e4326ac" data-node-id="1194:560" data-name="Divider" />
            <div className="fg-e9296b6a0e" data-node-id="1194:561" data-name="Order number">
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1194:562">
                شماره سفارش
              </p>
              <p className="fg-00b08f6bc3" data-node-id="1194:563">
                #NG-1054
              </p>
            </div>
          </div>
          <div className="fg-f0e05f6449" data-node-id="1194:564" data-name="Loading state">
            <div className="fg-6567f4a755" data-node-id="1194:565" data-name="Loading dots">
              <img alt="" className="fg-8faf267d30" src="/customer-web-assets/143e2641.svg" />
            </div>
            <p className="fg-141d2642ed" dir="auto" data-node-id="1194:569">
              در حال برقراری اتصال امن…
            </p>
          </div>
          <div className="fg-40bfedab40" data-node-id="1194:570" data-name="Status note">
            <p className="fg-9f70416e12" dir="auto" data-node-id="1194:571">
              اطلاعات پرداخت در یک ارتباط رمزگذاری‌شده ارسال می‌شود و نگارین اطلاعات کارت بانکی را نگه‌داری نمی‌کند.
            </p>
            <p className="fg-0fcc229d74" data-node-id="1194:572">
              verified_user
            </p>
          </div>
        </div>
      </div>
      <div className="fg-7df543f928" data-node-id="1194:573" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1194:574" data-name="Footer content">
          <div className="fg-d312e73b04" data-node-id="1194:575" data-name="Footer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1194:576">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1194:577">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:578" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:579" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
          <div className="fg-d312e73b04" data-node-id="1194:580" data-name="Footer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1194:581">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:582" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:583" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1194:584" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-9ecf6cfa1b" data-node-id="1194:585" data-name="Footer brand">
            <div className="fg-f44fc0c04f" data-node-id="1194:586" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1194:587">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1194:588">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-93afce054f" data-node-id="1194:589" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c5fefb6d.png" />
            </div>
          </div>
        </div>
        <div className="fg-a97164bcb0" data-node-id="1194:590" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1194:591">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1194:592">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
