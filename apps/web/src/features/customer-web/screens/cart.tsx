// Native Figma 1176:5587 — Customer / Cart - Web
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

export default function CustomerCartWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1176:5587" data-name="Customer / Cart - Web">
      <div className="fg-6f037ae468" data-node-id="1176:5588" data-name="Desktop header">
        <div className="fg-8f04d00ba8" data-node-id="1176:5589" data-name="Customer actions">
          <div className="fg-d263b583e1" data-node-id="1176:5590" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5591">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5592" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-3d7277edba" data-node-id="1176:5593" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5594">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5595" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1176:5596" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5597">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5598" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-b59211dbe5" data-node-id="1176:5599" data-name="Primary navigation">
          <div className="fg-8758c09eb2" data-node-id="1176:5600" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1176:5601" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1176:5602" data-name="Active indicator" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1176:5603" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1176:5604" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1176:5605" data-name="Active indicator" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1176:5606" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1176:5607" label="خانه">
              خانه
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1176:5608" data-name="Active indicator" />
          </div>
        </div>
        <div className="fg-3ee1409559" data-node-id="1176:5609" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1176:5610" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1176:5611">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1176:5612">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1176:5613" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-9890a7b8e5" data-node-id="1176:5614" data-name="Cart heading">
        <p className="fg-94f1d1748f" dir="auto" data-node-id="1176:5615">
          سبد خرید
        </p>
        <p className="fg-e96f100936" dir="auto" data-node-id="1176:5616">
          ۲ محصول در سبد
        </p>
      </div>
      <div className="fg-973b6e4c3a" data-node-id="1176:5617" data-name="Cart content">
        <div className="fg-e5b6735640" data-node-id="1176:5618" data-name="Cart items">
          <div className="fg-2092a3a3b1" data-node-id="1176:5619" data-name="Cart item">
            <div className="fg-57a505001e" data-node-id="1176:5620" data-name="Item controls">
              <CustomerAction className="fg-ef40580853" data-node-id="1176:5621" data-name="Remove action" label="delete_outline حذف">
                <p className="fg-1739af98d4" data-node-id="1176:5622">
                  delete_outline
                </p>
                <p className="fg-928c763e23" dir="auto" data-node-id="1176:5623">
                  حذف
                </p>
              </CustomerAction>
              <CustomerAction className="fg-2a0e1770e6" data-node-id="1176:5624" data-name="Quantity controls" label="remove ۱ add">
                <p className="fg-2e35a54018" data-node-id="1176:5625">
                  remove
                </p>
                <p className="fg-0c7d1fadc8" data-node-id="1176:5626">
                  ۱
                </p>
                <p className="fg-2e35a54018" data-node-id="1176:5627">
                  add
                </p>
              </CustomerAction>
            </div>
            <div className="fg-e19e0142ae" data-node-id="1176:5628" data-name="Item details">
              <p className="fg-1e2d9da6b2" dir="auto" data-node-id="1176:5629">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
              <p className="fg-d3f087181a" dir="auto" data-node-id="1176:5630">
                اثر زهرا محمدی
              </p>
              <p className="fg-6dcfa5a275" dir="auto" data-node-id="1176:5631">
                ۲,۴۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-9df85809a0" data-node-id="1176:5632" data-name="Artwork image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/ca24fd96.png" />
            </div>
          </div>
          <div className="fg-2092a3a3b1" data-node-id="1176:5633" data-name="Cart item">
            <div className="fg-57a505001e" data-node-id="1176:5634" data-name="Item controls">
              <CustomerAction className="fg-ef40580853" data-node-id="1176:5635" data-name="Remove action" label="delete_outline حذف">
                <p className="fg-1739af98d4" data-node-id="1176:5636">
                  delete_outline
                </p>
                <p className="fg-928c763e23" dir="auto" data-node-id="1176:5637">
                  حذف
                </p>
              </CustomerAction>
              <CustomerAction className="fg-2a0e1770e6" data-node-id="1176:5638" data-name="Quantity controls" label="remove ۱ add">
                <p className="fg-2e35a54018" data-node-id="1176:5639">
                  remove
                </p>
                <p className="fg-0c7d1fadc8" data-node-id="1176:5640">
                  ۱
                </p>
                <p className="fg-2e35a54018" data-node-id="1176:5641">
                  add
                </p>
              </CustomerAction>
            </div>
            <div className="fg-e19e0142ae" data-node-id="1176:5642" data-name="Item details">
              <p className="fg-1e2d9da6b2" dir="auto" data-node-id="1176:5643">
                گلیم دست‌بافت نقش هراتی
              </p>
              <p className="fg-d3f087181a" dir="auto" data-node-id="1176:5644">
                اثر مریم رضایی
              </p>
              <p className="fg-6dcfa5a275" dir="auto" data-node-id="1176:5645">
                ۳,۸۰۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-9df85809a0" data-node-id="1176:5646" data-name="Artwork image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/041e00b8.png" />
            </div>
          </div>
          <div className="fg-a0bc0ae832" data-node-id="1176:5647" data-name="Cart reassurance">
            <p className="fg-57c80ef35e" dir="auto" data-node-id="1176:5648">
              آثار انتخاب‌شده در همین سبد نگه داشته می‌شوند تا برای ادامه آماده باشی.
            </p>
            <p className="fg-2508cdc5a6" data-node-id="1176:5649">
              shopping_bag
            </p>
          </div>
        </div>
        <div className="fg-e8dcb6caf1" data-node-id="1176:5650" data-name="Order summary">
          <p className="fg-1ce1b3e4f9" dir="auto" data-node-id="1176:5651">
            خلاصه سبد
          </p>
          <div className="fg-0a09a79c4c" data-node-id="1176:5652" data-name="Subtotal row">
            <p className="fg-3e46eb501c" dir="auto" data-node-id="1176:5653">
              ۶,۲۵۰,۰۰۰ تومان
            </p>
            <p className="fg-fc8cc5a9b8" dir="auto" data-node-id="1176:5654">
              جمع کالاها
            </p>
          </div>
          <div className="fg-def44e4465" data-node-id="1176:5655" data-name="Divider" />
          <p className="fg-b922adc9d5" dir="auto" data-node-id="1176:5656">
            در مرحله بعد، اطلاعات لازم برای ادامه خرید را تکمیل می‌کنی.
          </p>
          <NegarinButton className="fg-a9c1ba3b38" label="ادامه خرید" />
          <p className="fg-28deb441dc" dir="auto" data-node-id="1176:5660">
            بازگشت به آثار
          </p>
        </div>
      </div>
      <div className="fg-f03e2eebd1" data-node-id="1176:5661" data-name="Empty cart example">
        <p className="fg-b3ba1ee156" dir="auto" data-node-id="1176:5662">
          حالت سبد خالی
        </p>
        <div className="fg-c6210e7853" data-node-id="1176:5663" data-name="Empty state">
          <div className="fg-07188e1367" data-node-id="1176:5664" data-name="Empty icon">
            <p className="fg-41e7705102" data-node-id="1176:5665">
              shopping_cart
            </p>
          </div>
          <p className="fg-e0ca0c8c06" dir="auto" data-node-id="1176:5666">
            سبد خریدت خالی است
          </p>
          <p className="fg-4c2fcff3a1" dir="auto" data-node-id="1176:5667">
            می‌توانی میان آثار نگارین بگردی و اثرهای مورد علاقه‌ات را به سبد اضافه کنی.
          </p>
          <div className="fg-ea8f5abfbd" data-node-id="1176:5668" data-name="Empty action">
            <CustomerAction className="fg-9a5ffe1fb1" dir="auto" data-node-id="1176:5669" label="کشف آثار">
              کشف آثار
            </CustomerAction>
          </div>
        </div>
      </div>
      <div className="fg-007cb0bf85" data-node-id="1176:5670" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1176:5671" data-name="Footer content">
          <div className="fg-0e1b23ee44" data-node-id="1176:5672" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1176:5673">
              حساب مشتری
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5674" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5675" label="سبد">
              سبد
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5676" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-0e1b23ee44" data-node-id="1176:5677" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1176:5678">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5679" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5680" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5681" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1176:5682" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1176:5683" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1176:5684">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1176:5685">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1176:5686" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-216633d331" data-node-id="1176:5687" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1176:5688">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1176:5689">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
