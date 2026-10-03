// Native Figma 1180:2590 — Customer / Checkout Review - Web
import {CustomerAction} from "../customer-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Large";
  state?: "Default";
  style?: "Primary";
};

function NegarinButton({ className, label = "ادامه", size: _size = "Large", state: _state = "Default", style: _style = "Primary" }: NegarinButtonProps) {
  return (
    <CustomerAction className={className || "customer-native-button"} data-node-id="46:8" label={label}>
      <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:9">
        {label}
      </p>
    </CustomerAction>
  );
}

export default function CustomerCheckoutReviewWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1180:2590" data-name="Customer / Checkout Review - Web">
      <div className="fg-6f037ae468" data-node-id="1180:2591" data-name="Desktop header">
        <div className="fg-8f04d00ba8" data-node-id="1180:2592" data-name="Customer actions">
          <div className="fg-d263b583e1" data-node-id="1180:2593" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2594">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2595" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-3d7277edba" data-node-id="1180:2596" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2597">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2598" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1180:2599" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2600">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2601" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1180:2602" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2603" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2604" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2605" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1180:2606" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1180:2607" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1180:2608">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1180:2609">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1180:2610" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-641e585cf3" data-node-id="1180:2611" data-name="Page heading">
        <div className="fg-24380cf9d7" data-node-id="1180:2612" data-name="Heading accent">
          <p className="fg-440e08aff4" data-node-id="1180:2613">
            fact_check
          </p>
        </div>
        <div className="fg-392f643781" data-node-id="1180:2614" data-name="Heading copy">
          <p className="fg-3b2de6ae27" dir="auto" data-node-id="1180:2615">
            بررسی سفارش
          </p>
          <p className="fg-3f8a9e3928" dir="auto" data-node-id="1180:2616">
            پیش از ادامه، آدرس تحویل، اقلام سفارش و مبلغ نهایی را مرور کن.
          </p>
        </div>
      </div>
      <div className="fg-66a4315384" data-node-id="1180:2617" data-name="Checkout steps">
        <div className="fg-50427a0e30" data-node-id="1180:2618" data-name="Steps">
          <div className="fg-46eb0284d7" data-node-id="1180:2619" data-name="Step">
            <p className="fg-846320e04e" dir="auto" data-node-id="1180:2620">{`۲  بررسی سفارش`}</p>
          </div>
          <div className="fg-c5353632b5" data-node-id="1180:2621" data-name="Step">
            <p className="fg-fb7015ae0f" dir="auto" data-node-id="1180:2622">{`۱  اطلاعات ارسال`}</p>
          </div>
        </div>
      </div>
      <div className="fg-49c2cc15db" data-node-id="1180:2623" data-name="Checkout content">
        <div className="fg-da907fb7ae" data-node-id="1180:2624" data-name="Review details">
          <div className="fg-ba13029937" data-node-id="1180:2625" data-name="Section heading">
            <p className="fg-24992208b4" dir="auto" data-node-id="1180:2626">
              آدرس انتخاب‌شده
            </p>
            <p className="fg-923e8ecac0" dir="auto" data-node-id="1180:2627">
              اطلاعات گیرنده و نشانی ثبت‌شده برای این سفارش
            </p>
          </div>
          <div className="fg-0d6a93ce07" data-node-id="1180:2628" data-name="Selected address">
            <div className="fg-65405d3872" data-node-id="1180:2629" data-name="Address action">
              <p className="fg-585f829b1a" dir="auto" data-node-id="1180:2630">
                ویرایش اطلاعات
              </p>
            </div>
            <div className="fg-d3dbd83f80" data-node-id="1180:2631" data-name="Address copy">
              <p className="fg-8bde9ecac2" dir="auto" data-node-id="1180:2632">
                مریم احمدی · ۰۹۱۲ ۱۲۳ ۴۵۶۷
              </p>
              <p className="fg-3f8a9e3928" dir="auto" data-node-id="1180:2633">
                تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچه نگار، پلاک ۲۴، واحد ۳
              </p>
            </div>
            <p className="fg-440e08aff4" data-node-id="1180:2634">
              location_on
            </p>
          </div>
          <div className="fg-ba13029937" data-node-id="1180:2635" data-name="Section heading">
            <p className="fg-24992208b4" dir="auto" data-node-id="1180:2636">
              اقلام سفارش
            </p>
            <p className="fg-923e8ecac0" dir="auto" data-node-id="1180:2637">
              ۲ محصول در این سفارش
            </p>
          </div>
          <div className="fg-c20151b560" data-node-id="1180:2638" data-name="Order item">
            <div className="fg-6d516e45d1" data-node-id="1180:2639" data-name="Item meta">
              <div className="fg-bff72dfe42" data-node-id="1180:2640" data-name="Quantity">
                <p className="fg-49ddcd9150" data-node-id="1180:2641">
                  remove
                </p>
                <p className="fg-bb6c86720e" data-node-id="1180:2642">
                  ۱
                </p>
                <p className="fg-49ddcd9150" data-node-id="1180:2643">
                  add
                </p>
              </div>
              <p className="fg-9db31c7586" dir="auto" data-node-id="1180:2644">
                تعداد: ۱
              </p>
            </div>
            <div className="fg-f44fc0c04f" data-node-id="1180:2645" data-name="Item details">
              <p className="fg-d5e378cd85" dir="auto" data-node-id="1180:2646">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
              <p className="fg-d3f087181a" dir="auto" data-node-id="1180:2647">
                اثر زهرا محمدی
              </p>
              <p className="fg-d950575a6f" dir="auto" data-node-id="1180:2648">
                ۲,۴۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-b6d09118f7" data-node-id="1180:2649" data-name="Artwork image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/91709f73.png" />
            </div>
          </div>
          <div className="fg-c20151b560" data-node-id="1180:2650" data-name="Order item">
            <div className="fg-6d516e45d1" data-node-id="1180:2651" data-name="Item meta">
              <div className="fg-bff72dfe42" data-node-id="1180:2652" data-name="Quantity">
                <p className="fg-49ddcd9150" data-node-id="1180:2653">
                  remove
                </p>
                <p className="fg-bb6c86720e" data-node-id="1180:2654">
                  ۱
                </p>
                <p className="fg-49ddcd9150" data-node-id="1180:2655">
                  add
                </p>
              </div>
              <p className="fg-9db31c7586" dir="auto" data-node-id="1180:2656">
                تعداد: ۱
              </p>
            </div>
            <div className="fg-f44fc0c04f" data-node-id="1180:2657" data-name="Item details">
              <p className="fg-d5e378cd85" dir="auto" data-node-id="1180:2658">
                گلیم دست‌بافت نقش هراتی
              </p>
              <p className="fg-d3f087181a" dir="auto" data-node-id="1180:2659">
                اثر مریم رضایی
              </p>
              <p className="fg-d950575a6f" dir="auto" data-node-id="1180:2660">
                ۳,۸۰۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-b6d09118f7" data-node-id="1180:2661" data-name="Artwork image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/ab477130.png" />
            </div>
          </div>
        </div>
        <div className="fg-e8dcb6caf1" data-node-id="1180:2662" data-name="Order total">
          <p className="fg-1ce1b3e4f9" dir="auto" data-node-id="1180:2663">
            خلاصه سفارش
          </p>
          <div className="fg-0a09a79c4c" data-node-id="1180:2664" data-name="Total row">
            <p className="fg-38fc67e25c" dir="auto" data-node-id="1180:2665">
              ۶,۲۵۰,۰۰۰ تومان
            </p>
            <p className="fg-fc8cc5a9b8" dir="auto" data-node-id="1180:2666">
              مبلغ سفارش
            </p>
          </div>
          <div className="fg-def44e4465" data-node-id="1180:2667" data-name="Divider" />
          <div className="fg-aacf1214a0" data-node-id="1180:2668" data-name="Address confirmation">
            <p className="fg-34f8a9e4d3" dir="auto" data-node-id="1180:2669">
              آدرس انتخاب‌شده همراه سفارش ثبت می‌شود.
            </p>
            <p className="fg-ecf7e71f77" data-node-id="1180:2670">
              verified
            </p>
          </div>
          <NegarinButton className="fg-a9c1ba3b38" label="ادامه برای پرداخت" />
          <p className="fg-28deb441dc" dir="auto" data-node-id="1180:2674">
            بازگشت به سبد
          </p>
        </div>
      </div>
      <div className="fg-ebe0531eb3" data-node-id="1180:2675" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1180:2676" data-name="Footer content">
          <div className="fg-e1c7d3948f" data-node-id="1180:2677" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1180:2678">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1180:2679">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2680" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2681" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
          <div className="fg-e1c7d3948f" data-node-id="1180:2682" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1180:2683">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2684" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2685" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2686" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1180:2687" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1180:2688" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1180:2689">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1180:2690">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1180:2691" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-8638944801" data-node-id="1180:2692" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1180:2693">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1180:2694">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
