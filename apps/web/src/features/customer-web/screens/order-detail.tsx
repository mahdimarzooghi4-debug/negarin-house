// Native Figma 1180:2797 — Customer / Order Detail - Web
import {CustomerAction} from "../customer-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Medium";
  state?: "Default";
  style?: "Secondary";
};

function NegarinButton({ className, label = "ادامه", size: _size = "Medium", state: _state = "Default", style: _style = "Secondary" }: NegarinButtonProps) {
  return (
    <CustomerAction className={className || "customer-native-button"} data-node-id="46:16" label={label}>
      <p className="fg-e4a7d61a6f" dir="auto" data-node-id="46:17">
        {label}
      </p>
    </CustomerAction>
  );
}

export default function CustomerOrderDetailWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1180:2797" data-name="Customer / Order Detail - Web">
      <div className="fg-6f037ae468" data-node-id="1180:2798" data-name="Desktop header">
        <div className="fg-8f04d00ba8" data-node-id="1180:2799" data-name="Customer actions">
          <div className="fg-3d7277edba" data-node-id="1180:2800" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2801">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2802" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1180:2803" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2804">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2805" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1180:2806" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2807">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2808" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1180:2809" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2810" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2811" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2812" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1180:2813" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1180:2814" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1180:2815">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1180:2816">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1180:2817" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-641e585cf3" data-node-id="1180:2818" data-name="Page heading">
        <div className="fg-24380cf9d7" data-node-id="1180:2819" data-name="Heading accent">
          <p className="fg-440e08aff4" data-node-id="1180:2820">
            inventory_2
          </p>
        </div>
        <div className="fg-392f643781" data-node-id="1180:2821" data-name="Heading copy">
          <p className="fg-3b2de6ae27" dir="auto" data-node-id="1180:2822">
            جزئیات سفارش
          </p>
          <p className="fg-3f8a9e3928" dir="auto" data-node-id="1180:2823">
            محصول، آدرس تحویل، مبلغ و وضعیت فعلی سفارش #NG-1054
          </p>
        </div>
      </div>
      <div className="fg-b7fc111890" data-node-id="1180:2824" data-name="Order detail content">
        <div className="fg-67e3517108" data-node-id="1180:2825" data-name="Order hero">
          <div className="fg-e2d4f1f4da" data-node-id="1180:2826" data-name="Status pill">
            <p className="fg-e7b41df947" dir="auto" data-node-id="1180:2827">
              در حال آماده‌سازی
            </p>
          </div>
          <div className="fg-99f811552b" data-node-id="1180:2828" data-name="Order identity">
            <p className="fg-94055221e6" dir="auto" data-node-id="1180:2829">
              سفارش #NG-1054
            </p>
            <p className="fg-b72ba594c7" dir="auto" data-node-id="1180:2830">
              پرداخت‌شده · روش ارسال ثبت شده
            </p>
          </div>
        </div>
        <div className="fg-760d30155f" data-node-id="1180:2831" data-name="Status panel">
          <div className="fg-ba13029937" data-node-id="1180:2832" data-name="Section heading">
            <p className="fg-24992208b4" dir="auto" data-node-id="1180:2833">
              وضعیت سفارش
            </p>
            <p className="fg-923e8ecac0" dir="auto" data-node-id="1180:2834">
              هنرمند در حال آماده‌سازی سفارش است.
            </p>
          </div>
          <div className="fg-a05dd5d28e" data-node-id="1180:2835" data-name="Status timeline">
            <div className="fg-efb538373a" data-node-id="1180:2836" data-name="Status step">
              <div className="fg-35368e3199" data-node-id="1180:2837" data-name="Step dot">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/b1de1e53.svg" />
              </div>
              <p className="fg-da2d5fb183" dir="auto" data-node-id="1180:2838">
                تحویل
              </p>
            </div>
            <div className="fg-efb538373a" data-node-id="1180:2839" data-name="Status step">
              <div className="fg-35368e3199" data-node-id="1180:2840" data-name="Step dot">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/b1de1e53.svg" />
              </div>
              <p className="fg-da2d5fb183" dir="auto" data-node-id="1180:2841">
                ارسال
              </p>
            </div>
            <div className="fg-efb538373a" data-node-id="1180:2842" data-name="Status step">
              <div className="fg-35368e3199" data-node-id="1180:2843" data-name="Step dot">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/7e9be701.svg" />
              </div>
              <p className="fg-3d52284018" dir="auto" data-node-id="1180:2844">
                آماده‌سازی
              </p>
            </div>
            <div className="fg-efb538373a" data-node-id="1180:2845" data-name="Status step">
              <div className="fg-35368e3199" data-node-id="1180:2846" data-name="Step dot">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/7e9be701.svg" />
              </div>
              <p className="fg-da2d5fb183" dir="auto" data-node-id="1180:2847">
                ثبت سفارش
              </p>
            </div>
          </div>
        </div>
        <div className="fg-c93a8f5cea" data-node-id="1180:2848" data-name="Detail columns">
          <div className="fg-32a898441e" data-node-id="1180:2849" data-name="Order summary">
            <p className="fg-d12cfb63f6" dir="auto" data-node-id="1180:2850">
              خلاصه سفارش
            </p>
            <div className="fg-6df3738dfe" data-node-id="1180:2851" data-name="Total">
              <p className="fg-838c3173a4" dir="auto" data-node-id="1180:2852">
                مبلغ پرداخت‌شده
              </p>
              <p className="fg-f28b45dc1a" dir="auto" data-node-id="1180:2853">
                ۶,۲۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-d789c2c13a" data-node-id="1180:2854" data-name="Recipient address">
              <div className="fg-a3975f456a" data-node-id="1180:2855" data-name="Address title">
                <p className="fg-02e3e86077" dir="auto" data-node-id="1180:2856">
                  آدرس تحویل
                </p>
                <p className="fg-0c383a7b37" data-node-id="1180:2857">
                  location_on
                </p>
              </div>
              <p className="fg-4aee2596d6" dir="auto" data-node-id="1180:2858">
                مریم احمدی · ۰۹۱۲ ۱۲۳ ۴۵۶۷
              </p>
              <p className="fg-35e2856b3f" dir="auto" data-node-id="1180:2859">
                تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچه نگار، پلاک ۲۴، واحد ۳
              </p>
            </div>
            <NegarinButton className="fg-757a28680d" label="بازگشت به سفارش‌ها" />
          </div>
          <div className="fg-113dddd8f9" data-node-id="1180:2863" data-name="Order products">
            <div className="fg-ba13029937" data-node-id="1180:2864" data-name="Section heading">
              <p className="fg-24992208b4" dir="auto" data-node-id="1180:2865">
                محصولات سفارش
              </p>
              <p className="fg-923e8ecac0" dir="auto" data-node-id="1180:2866">
                ۲ محصول در این سفارش
              </p>
            </div>
            <div className="fg-e1311569d4" data-node-id="1180:2867" data-name="Ordered product">
              <div className="fg-48e3de540b" data-node-id="1180:2868" data-name="Product amount">
                <p className="fg-d1c0cea3bd" dir="auto" data-node-id="1180:2869">
                  تعداد: ۱ + ۱
                </p>
                <p className="fg-d3b71de962" dir="auto" data-node-id="1180:2870">
                  ۲,۴۵۰,۰۰۰ تومان · ۳,۸۰۰,۰۰۰ تومان
                </p>
              </div>
              <div className="fg-8b36981331" data-node-id="1180:2871" data-name="Product copy">
                <p className="fg-b6414e7f94" dir="auto" data-node-id="1180:2872">
                  بشقاب میناکاری طرح شاه‌عباسی · گلیم دست‌بافت نقش هراتی
                </p>
                <p className="fg-d1c0cea3bd" dir="auto" data-node-id="1180:2873">
                  آثار زهرا محمدی و مریم رضایی
                </p>
              </div>
              <div className="fg-fc24eebaa4" data-node-id="1180:2874" data-name="Product image">
                <img alt="" className="fg-d642291d8a" src="/customer-web-assets/a358b564.png" />
              </div>
            </div>
            <div className="fg-e5998cd330" data-node-id="1180:2875" data-name="Current status note">
              <p className="fg-57c80ef35e" dir="auto" data-node-id="1180:2876">
                وضعیت فعلی سفارش «در حال آماده‌سازی» است.
              </p>
              <p className="fg-a449c71555" data-node-id="1180:2877">
                pending_actions
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fg-ebe0531eb3" data-node-id="1180:2878" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1180:2879" data-name="Footer content">
          <div className="fg-e1c7d3948f" data-node-id="1180:2880" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1180:2881">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1180:2882">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2883" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2884" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
          <div className="fg-e1c7d3948f" data-node-id="1180:2885" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1180:2886">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2887" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2888" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2889" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1180:2890" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1180:2891" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1180:2892">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1180:2893">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1180:2894" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-8638944801" data-node-id="1180:2895" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1180:2896">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1180:2897">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
