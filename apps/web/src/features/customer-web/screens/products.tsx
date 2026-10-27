// Native Figma 1176:5254 — Customer / Products - Web
import {CustomerAction} from "../customer-controls";
import {DesignField} from "../../artist/design-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Medium" | "Small";
  state?: "Default";
  style?: "Primary";
};

function NegarinButton({ className, label = "ادامه", size = "Small", state = "Default", style = "Primary" }: NegarinButtonProps) {
  const isPrimaryAndSmallAndDefault = style === "Primary" && size === "Small" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isPrimaryAndSmallAndDefault ? "node-46_2" : "node-45_10"} label={label}>
      <p className="fg-1daf25f4c0" dir="auto" data-node-id="45:11">
        {label}
      </p>
    </CustomerAction>
  );
}

export default function CustomerProductsWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1176:5254" data-name="Customer / Products - Web">
      <div className="fg-6f037ae468" data-node-id="1176:5255" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1176:5256" data-name="Customer actions">
          <div className="fg-7901589539" data-node-id="1176:5257" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5258">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5259" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1176:5260" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5261">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5262" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1176:5263" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5264">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5265" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-b59211dbe5" data-node-id="1176:5266" data-name="Primary navigation">
          <div className="fg-8758c09eb2" data-node-id="1176:5267" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1176:5268" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1176:5269" data-name="Active indicator" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1176:5270" data-name="Navigation link">
            <CustomerAction className="fg-5237d233f5" dir="auto" data-node-id="1176:5271" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <div className="fg-fce9070434" data-node-id="1176:5272" data-name="Active indicator" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1176:5273" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1176:5274" label="خانه">
              خانه
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1176:5275" data-name="Active indicator" />
          </div>
        </div>
        <div className="fg-3ee1409559" data-node-id="1176:5276" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1176:5277" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1176:5278">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1176:5279">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1176:5280" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-bd55cc6d1a" data-node-id="1176:5281" data-name="Discovery hero">
        <div className="fg-12deb5dde1" data-node-id="1176:5282" data-name="Hero copy">
          <p className="fg-3b2de6ae27" dir="auto" data-node-id="1176:5283">
            کشف آثار نگارین
          </p>
          <p className="fg-5f73541aa3" dir="auto" data-node-id="1176:5284">
            آثار هنرمندان را بر اساس دسته، سلیقه و موجودی کشف کن.
          </p>
        </div>
        <DesignField className="fg-c4c2f97603" data-node-id="1176:5285" data-name="Search field" label="جستجوی آثار" placeholder="جست‌وجو جست‌وجوی اثر، هنرمند یا دسته search">
          <div className="fg-2a10b4066a" data-node-id="1176:5286" data-name="Search shortcut">
            <p className="fg-b234cd4997" dir="auto" data-node-id="1176:5287">
              جست‌وجو
            </p>
          </div>
          <div className="fg-0d1b10235c" data-node-id="1176:5288" data-name="Search prompt">
            <p className="fg-c1a0d9ea2d" dir="auto" data-node-id="1176:5289">
              جست‌وجوی اثر، هنرمند یا دسته
            </p>
            <p className="fg-4cc0ab8bf8" data-node-id="1176:5290">
              search
            </p>
          </div>
        </DesignField>
      </div>
      <div className="fg-5140499efc" data-node-id="1176:5291" data-name="Category selection">
        <div className="fg-4e378bdac5" data-node-id="1176:5292" data-name="Section heading">
          <p className="fg-f14b7f23d9" dir="auto" data-node-id="1176:5293">
            دسته‌ها را کشف کن
          </p>
          <p className="fg-d1c0cea3bd" dir="auto" data-node-id="1176:5294">
            یک دسته را انتخاب کن تا آثار و هنرمندان مرتبط را ببینی.
          </p>
        </div>
        <div className="fg-7757f91b36" data-node-id="1176:5295" data-name="Category grid">
          <div className="fg-385bfe6f35" data-node-id="1176:5296" data-name="Category card">
            <div className="fg-4e1c3419fa" data-node-id="1176:5297" data-name="Category image">
              <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/edefd154.png" />
            </div>
            <p className="fg-31ff02479b" dir="auto" data-node-id="1176:5298">
              میناکاری
            </p>
          </div>
          <div className="fg-7c0d221aa3" data-node-id="1176:5299" data-name="Category card">
            <div className="fg-4e1c3419fa" data-node-id="1176:5300" data-name="Category image">
              <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/08481530.png" />
            </div>
            <p className="fg-a338e5e67b" dir="auto" data-node-id="1176:5301">
              سفال
            </p>
          </div>
          <div className="fg-7c0d221aa3" data-node-id="1176:5302" data-name="Category card">
            <div className="fg-4e1c3419fa" data-node-id="1176:5303" data-name="Category image">
              <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/a7e91d2f.png" />
            </div>
            <p className="fg-a338e5e67b" dir="auto" data-node-id="1176:5304">
              گلیم
            </p>
          </div>
          <div className="fg-7c0d221aa3" data-node-id="1176:5305" data-name="Category card">
            <div className="fg-4e1c3419fa" data-node-id="1176:5306" data-name="Category image">
              <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/0c011643.png" />
            </div>
            <p className="fg-a338e5e67b" dir="auto" data-node-id="1176:5307">
              چرم
            </p>
          </div>
          <div className="fg-7c0d221aa3" data-node-id="1176:5308" data-name="Category card">
            <div className="fg-4e1c3419fa" data-node-id="1176:5309" data-name="Category image">
              <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/fd6780e8.png" />
            </div>
            <p className="fg-a338e5e67b" dir="auto" data-node-id="1176:5310">
              چوب
            </p>
          </div>
          <div className="fg-7c0d221aa3" data-node-id="1176:5311" data-name="Category card">
            <div className="fg-4e1c3419fa" data-node-id="1176:5312" data-name="Category image">
              <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/36b2bf23.png" />
            </div>
            <p className="fg-a338e5e67b" dir="auto" data-node-id="1176:5313">
              پارچه
            </p>
          </div>
          <div className="fg-7c0d221aa3" data-node-id="1176:5314" data-name="Category card">
            <div className="fg-4e1c3419fa" data-node-id="1176:5315" data-name="Category image">
              <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/2c1b163a.png" />
            </div>
            <p className="fg-a338e5e67b" dir="auto" data-node-id="1176:5316">
              زیور
            </p>
          </div>
          <div className="fg-7c0d221aa3" data-node-id="1176:5317" data-name="Category card">
            <div className="fg-4e1c3419fa" data-node-id="1176:5318" data-name="Category image">
              <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/a90c9966.png" />
            </div>
            <p className="fg-a338e5e67b" dir="auto" data-node-id="1176:5319">
              فلز
            </p>
          </div>
        </div>
      </div>
      <div className="fg-92a0d0998e" data-node-id="1176:5320" data-name="Catalog">
        <div className="fg-da907fb7ae" data-node-id="1176:5321" data-name="Results">
          <div className="fg-0a09a79c4c" data-node-id="1176:5322" data-name="Results heading">
            <CustomerAction className="fg-0b98d4113a" data-node-id="1176:5323" data-name="Sort control" label="پیشنهادی sort">
              <p className="fg-0911c133e6" dir="auto" data-node-id="1176:5324">
                پیشنهادی
              </p>
              <p className="fg-f63fadfb46" data-node-id="1176:5325">
                sort
              </p>
            </CustomerAction>
            <div className="fg-335cd1bbca" data-node-id="1176:5326" data-name="Heading copy">
              <p className="fg-5d24156dfa" dir="auto" data-node-id="1176:5327">
                همه آثار
              </p>
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1176:5328">
                ۶ اثر برای کشف
              </p>
            </div>
          </div>
          <div className="fg-42e2fdfae0" data-node-id="1176:5329" data-name="Artwork grid">
            <div className="fg-3a63c83c7f" data-node-id="1176:5330" data-name="Artwork row">
              <div className="fg-462efdcecd" data-node-id="1176:5331" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1176:5332" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1176:5333" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/caa5f954.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1176:5334" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1176:5335">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-99ec71f24f" data-node-id="1176:5336" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1176:5337">
                      میناکاری
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1176:5338" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1176:5339">
                    بشقاب میناکاری طرح شاه‌عباسی
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1176:5340">
                    اثر زهرا محمدی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1176:5341">
                    ۲,۴۵۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
              <div className="fg-462efdcecd" data-node-id="1176:5344" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1176:5345" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1176:5346" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/c5033372.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1176:5347" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1176:5348">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-99ec71f24f" data-node-id="1176:5349" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1176:5350">
                      گلیم
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1176:5351" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1176:5352">
                    گلیم دست‌بافت نقش هراتی
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1176:5353">
                    اثر مریم رضایی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1176:5354">
                    ۳,۸۰۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
              <div className="fg-462efdcecd" data-node-id="1176:5357" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1176:5358" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1176:5359" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/c35dea26.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1176:5360" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1176:5361">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-99ec71f24f" data-node-id="1176:5362" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1176:5363">
                      سفال
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1176:5364" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1176:5365">
                    گلدان سفالی لعاب فیروزه‌ای
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1176:5366">
                    اثر سارا احمدی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1176:5367">
                    ۱,۲۸۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
            </div>
            <div className="fg-3a63c83c7f" data-node-id="1176:5370" data-name="Artwork row">
              <div className="fg-462efdcecd" data-node-id="1176:5371" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1176:5372" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1176:5373" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/82b3f1bb.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1176:5374" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1176:5375">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-99ec71f24f" data-node-id="1176:5376" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1176:5377">
                      چرم
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1176:5378" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1176:5379">
                    کیف چرم دست‌دوز آفتاب
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1176:5380">
                    اثر علی مرادی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1176:5381">
                    ۲,۹۰۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
              <div className="fg-462efdcecd" data-node-id="1176:5384" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1176:5385" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1176:5386" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/0aae378e.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1176:5387" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1176:5388">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-99ec71f24f" data-node-id="1176:5389" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1176:5390">
                      زیور
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1176:5391" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1176:5392">
                    گردنبند نقره و فیروزه
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1176:5393">
                    اثر نسترن اکبری
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1176:5394">
                    ۱,۷۵۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
              <div className="fg-462efdcecd" data-node-id="1176:5397" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1176:5398" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1176:5399" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/b4e5344e.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1176:5400" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1176:5401">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-99ec71f24f" data-node-id="1176:5402" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1176:5403">
                      پارچه
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1176:5404" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1176:5405">
                    رومیزی قلمکار نقش بته
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1176:5406">
                    اثر الهام کریمی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1176:5407">
                    ۹۸۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
            </div>
          </div>
          <div className="fg-fc896df784" data-node-id="1176:5410" data-name="No results example">
            <p className="fg-b3ba1ee156" dir="auto" data-node-id="1176:5411">
              اگر نتیجه‌ای پیدا نشود
            </p>
            <div className="fg-c6210e7853" data-node-id="1176:5412" data-name="Empty state">
              <div className="fg-07188e1367" data-node-id="1176:5413" data-name="Empty icon">
                <p className="fg-41e7705102" data-node-id="1176:5414">
                  search_off
                </p>
              </div>
              <p className="fg-e0ca0c8c06" dir="auto" data-node-id="1176:5415">
                اثری با این فیلترها پیدا نشد
              </p>
              <p className="fg-4c2fcff3a1" dir="auto" data-node-id="1176:5416">
                فیلترها را تغییر بده یا عبارت دیگری جست‌وجو کن.
              </p>
              <div className="fg-ea8f5abfbd" data-node-id="1176:5417" data-name="Empty action">
                <p className="fg-9a5ffe1fb1" dir="auto" data-node-id="1176:5418">
                  پاک کردن فیلترها
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="fg-0911d11db5" data-node-id="1176:5419" data-name="Filters">
          <div className="fg-0a09a79c4c" data-node-id="1176:5420" data-name="Filter heading">
            <p className="fg-3886341540" dir="auto" data-node-id="1176:5421">
              پاک کردن
            </p>
            <p className="fg-6edbc50726" dir="auto" data-node-id="1176:5422">
              فیلترها
            </p>
          </div>
          <div className="fg-864f45f1de" data-node-id="1176:5423" data-name="Filter option">
            <CustomerAction className="fg-fb0c4ef341" data-node-id="1176:5424" data-name="Toggle" label="">
              <div className="fg-d4cf01a488" data-node-id="1176:5425" data-name="Toggle dot" />
            </CustomerAction>
            <div className="fg-44a995c6f6" data-node-id="1176:5426" data-name="Filter copy">
              <p className="fg-04bdfc5e90" dir="auto" data-node-id="1176:5427">
                فقط آثار موجود
              </p>
              <p className="fg-b5424de509" dir="auto" data-node-id="1176:5428">
                آثاری را ببین که اکنون امکان خرید دارند.
              </p>
            </div>
            <p className="fg-2ff14cc447" data-node-id="1176:5429">
              inventory_2
            </p>
          </div>
          <div className="fg-864f45f1de" data-node-id="1176:5430" data-name="Filter option">
            <CustomerAction className="fg-12f3675309" data-node-id="1176:5431" data-name="Toggle" label="">
              <div className="fg-d4cf01a488" data-node-id="1176:5432" data-name="Toggle dot" />
            </CustomerAction>
            <div className="fg-44a995c6f6" data-node-id="1176:5433" data-name="Filter copy">
              <p className="fg-04bdfc5e90" dir="auto" data-node-id="1176:5434">
                هنرمندان تأییدشده
              </p>
              <p className="fg-b5424de509" dir="auto" data-node-id="1176:5435">
                آثار هنرمندان دارای نشان تأیید نگارین.
              </p>
            </div>
            <p className="fg-2ff14cc447" data-node-id="1176:5436">
              verified
            </p>
          </div>
          <div className="fg-598bd13204" data-node-id="1176:5437" data-name="Price range">
            <p className="fg-abe46541cc" dir="auto" data-node-id="1176:5438">
              بازه قیمت
            </p>
            <div className="fg-3af50ae4ba" data-node-id="1176:5439" data-name="Range fields">
              <div className="fg-682cc982a1" data-node-id="1176:5440" data-name="Price field">
                <p className="fg-837b8efcb8" dir="auto" data-node-id="1176:5441">
                  تا
                </p>
              </div>
              <div className="fg-682cc982a1" data-node-id="1176:5442" data-name="Price field">
                <p className="fg-837b8efcb8" dir="auto" data-node-id="1176:5443">
                  از
                </p>
              </div>
            </div>
          </div>
          <div className="fg-ffbe95077f" data-node-id="1176:5444" data-name="Active filter">
            <p className="fg-e9d12098fc" data-node-id="1176:5445">
              close
            </p>
            <p className="fg-0911c133e6" dir="auto" data-node-id="1176:5446">
              دسته: میناکاری
            </p>
          </div>
          <NegarinButton className="fg-a900263ddf" label="نمایش نتایج" size="Medium" />
        </div>
      </div>
      <div className="fg-007cb0bf85" data-node-id="1176:5450" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1176:5451" data-name="Footer content">
          <div className="fg-0e1b23ee44" data-node-id="1176:5452" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1176:5453">
              حساب مشتری
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5454" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5455" label="سبد">
              سبد
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5456" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-0e1b23ee44" data-node-id="1176:5457" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1176:5458">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5459" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5460" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5461" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1176:5462" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1176:5463" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1176:5464">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1176:5465">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1176:5466" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-216633d331" data-node-id="1176:5467" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1176:5468">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1176:5469">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
