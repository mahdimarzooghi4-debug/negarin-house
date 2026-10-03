// Native Figma 1180:2696 — Customer / Orders - Web
import {CustomerAction} from "../customer-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Medium";
  state?: "Default";
  style?: "Primary";
};

function NegarinButton({ className, label = "ادامه", size: _size = "Medium", state: _state = "Default", style: _style = "Primary" }: NegarinButtonProps) {
  return (
    <CustomerAction className={className || "customer-native-button"} data-node-id="45:10" label={label}>
      <p className="fg-1daf25f4c0" dir="auto" data-node-id="45:11">
        {label}
      </p>
    </CustomerAction>
  );
}

export default function CustomerOrdersWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1180:2696" data-name="Customer / Orders - Web">
      <div className="fg-6f037ae468" data-node-id="1180:2697" data-name="Desktop header">
        <div className="fg-8f04d00ba8" data-node-id="1180:2698" data-name="Customer actions">
          <div className="fg-3d7277edba" data-node-id="1180:2699" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2700">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2701" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1180:2702" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2703">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2704" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1180:2705" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2706">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2707" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1180:2708" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2709" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2710" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2711" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1180:2712" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1180:2713" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1180:2714">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1180:2715">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1180:2716" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-641e585cf3" data-node-id="1180:2717" data-name="Page heading">
        <div className="fg-24380cf9d7" data-node-id="1180:2718" data-name="Heading accent">
          <p className="fg-440e08aff4" data-node-id="1180:2719">
            receipt_long
          </p>
        </div>
        <div className="fg-392f643781" data-node-id="1180:2720" data-name="Heading copy">
          <p className="fg-3b2de6ae27" dir="auto" data-node-id="1180:2721">
            سفارش‌های من
          </p>
          <p className="fg-3f8a9e3928" dir="auto" data-node-id="1180:2722">
            سفارش‌های ثبت‌شده و وضعیت فعلی هر سفارش را از این بخش دنبال کن.
          </p>
        </div>
      </div>
      <div className="fg-a1e6856140" data-node-id="1180:2723" data-name="Orders content">
        <div className="fg-c0040bf3e4" data-node-id="1180:2724" data-name="Order tabs">
          <CustomerAction className="fg-f9ef55927f" data-node-id="1180:2725" data-name="Tab" label="گذشته">
            <p className="fg-a051dbd6b6" dir="auto" data-node-id="1180:2726">
              گذشته
            </p>
          </CustomerAction>
          <div className="fg-6948338330" data-node-id="1180:2727" data-name="Active tab">
            <p className="fg-e7b41df947" dir="auto" data-node-id="1180:2728">
              در جریان
            </p>
          </div>
        </div>
        <div className="fg-1f0d820576" data-node-id="1180:2729" data-name="Orders heading row">
          <div className="fg-8c342cbf60" data-node-id="1180:2730" data-name="Order count">
            <p className="fg-585f829b1a" dir="auto" data-node-id="1180:2731">
              ۱ سفارش در جریان
            </p>
          </div>
          <div className="fg-df44c715e3" data-node-id="1180:2732" data-name="Section heading">
            <p className="fg-24992208b4" dir="auto" data-node-id="1180:2733">
              تاریخچه سفارش‌ها
            </p>
            <p className="fg-923e8ecac0" dir="auto" data-node-id="1180:2734">
              خلاصه سفارش و وضعیت فعلی را ببین یا وارد جزئیات شو.
            </p>
          </div>
        </div>
        <div className="fg-a76652c027" data-node-id="1180:2735" data-name="Order card">
          <div className="fg-a14631f11c" data-node-id="1180:2736" data-name="Order header">
            <div className="fg-f69790ca19" data-node-id="1180:2737" data-name="Status">
              <p className="fg-9a5ffe1fb1" dir="auto" data-node-id="1180:2738">
                در حال آماده‌سازی
              </p>
            </div>
            <div className="fg-d007f21719" data-node-id="1180:2739" data-name="Order identity">
              <p className="fg-6edbc50726" dir="auto" data-node-id="1180:2740">
                سفارش #NG-1054
              </p>
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1180:2741">
                پرداخت‌شده · روش ارسال ثبت شده
              </p>
            </div>
          </div>
          <div className="fg-87601b9de8" data-node-id="1180:2742" data-name="Order summary">
            <div className="fg-5c66abd3db" data-node-id="1180:2743" data-name="Order actions">
              <div className="fg-4a2254e7ba" data-node-id="1180:2744" data-name="Paid total">
                <p className="fg-838c3173a4" dir="auto" data-node-id="1180:2745">
                  مبلغ پرداخت‌شده
                </p>
                <p className="fg-5e911acd4a" dir="auto" data-node-id="1180:2746">
                  ۶,۲۵۰,۰۰۰ تومان
                </p>
              </div>
              <NegarinButton className="fg-a900263ddf" label="مشاهده جزئیات سفارش" />
            </div>
            <div className="fg-cfd51a3b71" data-node-id="1180:2750" data-name="Status summary">
              <p className="fg-a531b28426" dir="auto" data-node-id="1180:2751">
                وضعیت سفارش
              </p>
              <div className="fg-fe2923e631" data-node-id="1180:2752" data-name="Order timeline">
                <div className="fg-7abd327694" data-node-id="1180:2753" data-name="Timeline dots">
                  <div className="fg-f2d1aa97bb" data-node-id="1180:2754" data-name="Timeline step">
                    <div className="fg-b2a182ecf4" data-node-id="1180:2755" data-name="Step dot">
                      <img alt="" className="fg-8faf267d30" src="/customer-web-assets/9136b58b.svg" />
                    </div>
                    <p className="fg-057007d9c5" dir="auto" data-node-id="1180:2756">
                      تحویل
                    </p>
                  </div>
                  <div className="fg-f2d1aa97bb" data-node-id="1180:2757" data-name="Timeline step">
                    <div className="fg-b2a182ecf4" data-node-id="1180:2758" data-name="Step dot">
                      <img alt="" className="fg-8faf267d30" src="/customer-web-assets/9136b58b.svg" />
                    </div>
                    <p className="fg-057007d9c5" dir="auto" data-node-id="1180:2759">
                      ارسال
                    </p>
                  </div>
                  <div className="fg-f2d1aa97bb" data-node-id="1180:2760" data-name="Timeline step">
                    <div className="fg-b2a182ecf4" data-node-id="1180:2761" data-name="Step dot">
                      <img alt="" className="fg-8faf267d30" src="/customer-web-assets/b3398159.svg" />
                    </div>
                    <p className="fg-b77699d39b" dir="auto" data-node-id="1180:2762">
                      آماده‌سازی
                    </p>
                  </div>
                  <div className="fg-f2d1aa97bb" data-node-id="1180:2763" data-name="Timeline step">
                    <div className="fg-b2a182ecf4" data-node-id="1180:2764" data-name="Step dot">
                      <img alt="" className="fg-8faf267d30" src="/customer-web-assets/b3398159.svg" />
                    </div>
                    <p className="fg-057007d9c5" dir="auto" data-node-id="1180:2765">
                      ثبت سفارش
                    </p>
                  </div>
                </div>
                <p className="fg-38ca229380" dir="auto" data-node-id="1180:2766">
                  هنرمند در حال آماده‌سازی سفارش است.
                </p>
              </div>
            </div>
            <div className="fg-678c918e2e" data-node-id="1180:2767" data-name="Product summary">
              <div className="fg-f44fc0c04f" data-node-id="1180:2768" data-name="Product copy">
                <p className="fg-936e7fe89e" dir="auto" data-node-id="1180:2769">
                  بشقاب میناکاری طرح شاه‌عباسی · گلیم دست‌بافت نقش هراتی
                </p>
                <p className="fg-f93bee5b75" dir="auto" data-node-id="1180:2770">
                  آثار زهرا محمدی و مریم رضایی
                </p>
                <p className="fg-f93bee5b75" dir="auto" data-node-id="1180:2771">
                  ۲ محصول · هرکدام ۱ عدد
                </p>
              </div>
              <div className="fg-befc69fd48" data-node-id="1180:2772" data-name="Product image">
                <img alt="" className="fg-d642291d8a" src="/customer-web-assets/444442cb.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="fg-5842fe8fdb" data-node-id="1180:2773" data-name="Orders note">
          <p className="fg-da81154ffc" dir="auto" data-node-id="1180:2774">
            ۲,۴۵۰,۰۰۰ تومان + ۳,۸۰۰,۰۰۰ تومان = ۶,۲۵۰,۰۰۰ تومان
          </p>
          <p className="fg-0c383a7b37" data-node-id="1180:2775">
            notifications_none
          </p>
        </div>
      </div>
      <div className="fg-ebe0531eb3" data-node-id="1180:2776" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1180:2777" data-name="Footer content">
          <div className="fg-e1c7d3948f" data-node-id="1180:2778" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1180:2779">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1180:2780">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2781" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2782" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
          <div className="fg-e1c7d3948f" data-node-id="1180:2783" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1180:2784">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2785" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2786" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2787" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1180:2788" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1180:2789" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1180:2790">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1180:2791">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1180:2792" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-8638944801" data-node-id="1180:2793" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1180:2794">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1180:2795">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
