// Native Figma 1170:3283 — Customer / Web — Home
import {CustomerAction} from "../customer-controls";
import {DesignField} from "../../artist/design-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Medium" | "Large";
  state?: "Default";
  style?: "Primary" | "Accent";
};

function NegarinButton({ className, label = "ادامه", size = "Medium", state = "Default", style = "Primary" }: NegarinButtonProps) {
  const isAccentAndLargeAndDefault = style === "Accent" && size === "Large" && state === "Default";
  const isPrimaryAndLargeAndDefault = style === "Primary" && size === "Large" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isAccentAndLargeAndDefault ? "node-46_32" : isPrimaryAndLargeAndDefault ? "node-46_8" : "node-45_10"} label={label}>
      {style === "Primary" && state === "Default" && (
        <p className="fg-1daf25f4c0" dir="auto" data-node-id="45:11">
          {label}
        </p>
      )}
      {isAccentAndLargeAndDefault && (
        <p className="fg-ace2ed9f91" dir="auto" data-node-id="46:33">
          {label}
        </p>
      )}
    </CustomerAction>
  );
}

export default function CustomerWebHome() {
  return (
    <div className="fg-d37209cb37" data-node-id="1170:3283" data-name="Customer / Web — Home">
      <div className="fg-b12d59061d" data-node-id="1170:3284" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1170:3285" data-name="Customer actions">
          <div className="fg-56cc07f311" data-node-id="1170:3286" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1170:3287">
              person_outline
            </p>
            <CustomerAction className="fg-d90ccb677e" dir="auto" data-node-id="1170:3288" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-56cc07f311" data-node-id="1170:3289" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1170:3290">
              shopping_cart
            </p>
            <CustomerAction className="fg-d90ccb677e" dir="auto" data-node-id="1170:3291" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-56cc07f311" data-node-id="1170:3292" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1170:3293">
              bookmark_border
            </p>
            <CustomerAction className="fg-d90ccb677e" dir="auto" data-node-id="1170:3294" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-b59211dbe5" data-node-id="1170:3295" data-name="Primary navigation">
          <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1170:3296" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1170:3297" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <div className="fg-8758c09eb2" data-node-id="1170:3298" data-name="Active link">
            <CustomerAction className="fg-5237d233f5" dir="auto" data-node-id="1170:3299" label="خانه">
              خانه
            </CustomerAction>
            <div className="fg-fce9070434" data-node-id="1170:3300" data-name="Active indicator" />
          </div>
        </div>
        <div className="fg-3ee1409559" data-node-id="1170:3301" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1170:3302" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1170:3303">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1170:3304">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1170:3305" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-47c08af0a2" data-node-id="1170:3306" data-name="Hero section">
        <div className="fg-d1f075ac19" data-node-id="1170:3307" data-name="Hero panel">
          <div className="fg-c257f8e22f" data-node-id="1170:3308" data-name="Artwork composition">
            <div className="fg-2e8563a8f5" data-node-id="1170:3309" data-name="Artwork notes">
              <div className="fg-055f14de55" data-node-id="1170:3310" data-name="Material note">
                <div className="fg-1f1e892480" data-node-id="1170:3311" data-name="Material image">
                  <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/0b6f6d41.png" />
                </div>
                <p className="fg-1e621bc88c" dir="auto" data-node-id="1170:3312">
                  گلیم دست‌باف
                </p>
              </div>
              <div className="fg-055f14de55" data-node-id="1170:3313" data-name="Material note">
                <div className="fg-1f1e892480" data-node-id="1170:3314" data-name="Material image">
                  <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/bf308255.png" />
                </div>
                <p className="fg-1e621bc88c" dir="auto" data-node-id="1170:3315">
                  هنر چوب
                </p>
              </div>
            </div>
            <div className="fg-713ca3f404" data-node-id="1170:3316" data-name="Featured artwork">
              <div className="fg-01e71c0036" data-node-id="1170:3317" data-name="Artwork image">
                <img alt="" className="fg-b440a5c4af" src="/customer-web-assets/560c234b.png" />
              </div>
              <div className="fg-0a09a79c4c" data-node-id="1170:3318" data-name="Artwork caption">
                <p className="fg-374f98fc6e" dir="auto" data-node-id="1170:3319">
                  میناکاری
                </p>
                <p className="fg-4ddf6232e3" dir="auto" data-node-id="1170:3320">
                  بشقاب طرح شاه‌عباسی
                </p>
              </div>
            </div>
          </div>
          <div className="fg-cc88995f4d" data-node-id="1170:3321" data-name="Hero copy">
            <div className="fg-9c5437cde0" data-node-id="1170:3322" data-name="Hero eyebrow">
              <div className="fg-2595163ef1" data-node-id="1170:3323" data-name="Eyebrow dot">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/eda6f56a.svg" />
              </div>
              <p className="fg-74bdd036ed" dir="auto" data-node-id="1170:3324">
                روایت، هنر، زندگی
              </p>
            </div>
            <div className="fg-53fb3391ce" data-node-id="1170:3325">
              <p className="fg-96eff31b51" dir="auto">
                هنر را کشف کن،
              </p>
              <p className="fg-a4d2b1adae" dir="auto">
                هنرمند را دنبال کن
              </p>
            </div>
            <p className="fg-795e7696f3" dir="auto" data-node-id="1170:3326">
              داستان ساخت آثار را ببین، هنرمندهای محبوبت را دنبال کن و وقتی چیزی دوست داشتی، مستقیم از خود هنرمند بخر.
            </p>
            <div className="fg-fe93f710ff" data-node-id="1170:3327" data-name="Hero actions">
              <NegarinButton className="fg-86ffa2da8f" label="کشف آثار" size="Large" />
              <NegarinButton className="fg-fc22c6d318" label="ورود به روایت‌ها" size="Large" style="Accent" />
            </div>
          </div>
          <div className="fg-2bda7b8deb" data-node-id="1170:3334" data-name="Top motif">
            <img alt="" className="fg-8faf267d30" src="/customer-web-assets/444af47a.svg" />
          </div>
        </div>
      </div>
      <div className="fg-1cce95504e" data-node-id="1170:3335" data-name="Search section">
        <DesignField className="fg-7ca9804e6a" data-node-id="1170:3336" data-name="Search field" label="جستجوی آثار" placeholder="جست‌وجو جست‌وجوی اثر، هنرمند یا دسته search">
          <div className="fg-c96da37925" data-node-id="1170:3337" data-name="Search shortcut">
            <p className="fg-b234cd4997" dir="auto" data-node-id="1170:3338">
              جست‌وجو
            </p>
          </div>
          <div className="fg-579ab71698" data-node-id="1170:3339" data-name="Search prompt">
            <p className="fg-4b9489802a" dir="auto" data-node-id="1170:3340">
              جست‌وجوی اثر، هنرمند یا دسته
            </p>
            <p className="fg-de603c3a2a" data-node-id="1170:3341">
              search
            </p>
          </div>
        </DesignField>
      </div>
      <div className="fg-10750df20b" data-node-id="1170:3342" data-name="Categories section">
        <div className="fg-1f0d820576" data-node-id="1170:3343" data-name="Section header">
          <div className="fg-0971c055ad" data-node-id="1170:3344" data-name="Section action">
            <p className="fg-49ddcd9150" data-node-id="1170:3345">
              arrow_back
            </p>
            <p className="fg-fd87dcd811" dir="auto" data-node-id="1170:3346">
              مشاهده همه دسته‌ها
            </p>
          </div>
          <div className="fg-d01222b5e6" data-node-id="1170:3347" data-name="Section copy">
            <p className="fg-778d3cbe42" dir="auto" data-node-id="1170:3348">
              دسته‌ها را کشف کن
            </p>
          </div>
        </div>
        <div className="fg-73fe6d119b" data-node-id="1170:3349" data-name="Category grid">
          <div className="fg-5cfab7290c" data-node-id="1170:3350" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3351" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/9eaff63a.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3352">
              چرم
            </p>
          </div>
          <div className="fg-5cfab7290c" data-node-id="1170:3353" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3354" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/2a209d45.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3355">
              گلیم
            </p>
          </div>
          <div className="fg-5cfab7290c" data-node-id="1170:3356" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3357" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/ce72a622.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3358">
              فلز
            </p>
          </div>
          <div className="fg-5cfab7290c" data-node-id="1170:3359" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3360" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/bc3f405d.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3361">
              پارچه
            </p>
          </div>
          <div className="fg-5cfab7290c" data-node-id="1170:3362" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3363" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/59ca727f.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3364">
              زیور
            </p>
          </div>
          <div className="fg-5cfab7290c" data-node-id="1170:3365" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3366" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/3481d4b1.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3367">
              چوب
            </p>
          </div>
          <div className="fg-5cfab7290c" data-node-id="1170:3368" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3369" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/5626da65.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3370">
              بافت
            </p>
          </div>
          <div className="fg-5cfab7290c" data-node-id="1170:3371" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3372" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/28da9482.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3373">
              سفال
            </p>
          </div>
          <div className="fg-5cfab7290c" data-node-id="1170:3374" data-name="Category card">
            <div className="fg-c3029439ce" data-node-id="1170:3375" data-name="Category image">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/e8b31449.png" />
            </div>
            <p className="fg-99538ea78b" dir="auto" data-node-id="1170:3376">
              مینا
            </p>
          </div>
        </div>
      </div>
      <div className="fg-772ba3f285" data-node-id="1170:3377" data-name="Artists section">
        <div className="fg-2f377c905c" data-node-id="1170:3378" data-name="Section header">
          <div className="fg-9782aa7bbc" data-node-id="1170:3379" data-name="Section action">
            <p className="fg-49ddcd9150" data-node-id="1170:3380">
              arrow_back
            </p>
            <p className="fg-fd87dcd811" dir="auto" data-node-id="1170:3381">
              مشاهده همه هنرمندان
            </p>
          </div>
          <div className="fg-506edd7e56" data-node-id="1170:3382" data-name="Section copy">
            <p className="fg-d373ed4508" dir="auto" data-node-id="1170:3383">
              هنرمندانی برای دنبال کردن
            </p>
            <p className="fg-5269867602" dir="auto" data-node-id="1170:3384">
              آدم‌های پشت آثار را بشناس و دنبال کن
            </p>
          </div>
        </div>
        <div className="fg-2336acf1fe" data-node-id="1170:3385" data-name="Artist cards">
          <div className="fg-9976d760a7" data-node-id="1170:3386" data-name="Artist card">
            <div className="fg-a84c4fb86b" data-node-id="1170:3387" data-name="Artist portrait">
              <div className="fg-1c2bc863d2">
                <img alt="" className="fg-acc3667e96" height="92" src="/customer-web-assets/f0b7a633.png" width="92" />
              </div>
            </div>
            <div className="fg-88cb7a7b81" data-node-id="1170:3388" data-name="Verified artist">
              <div className="fg-60c64f3432" data-node-id="1170:3389" data-name="Verification badge">
                <p className="fg-ddd95accc7" data-node-id="1170:3390">
                  check
                </p>
              </div>
              <p className="fg-8b7a696f46" dir="auto" data-node-id="1170:3391">
                زهرا محمدی
              </p>
            </div>
            <p className="fg-f83adca793" dir="auto" data-node-id="1170:3392">
              میناکاری
            </p>
            <div className="fg-778348babf" data-node-id="1170:3393" data-name="Follow action">
              <p className="fg-73881fb111" dir="auto" data-node-id="1170:3394">
                دنبال کردن
              </p>
            </div>
          </div>
          <div className="fg-9976d760a7" data-node-id="1170:3395" data-name="Artist card">
            <div className="fg-a84c4fb86b" data-node-id="1170:3396" data-name="Artist portrait">
              <div className="fg-1c2bc863d2">
                <img alt="" className="fg-acc3667e96" height="92" src="/customer-web-assets/f0b7a633.png" width="92" />
              </div>
            </div>
            <div className="fg-88cb7a7b81" data-node-id="1170:3397" data-name="Verified artist">
              <div className="fg-60c64f3432" data-node-id="1170:3398" data-name="Verification badge">
                <p className="fg-ddd95accc7" data-node-id="1170:3399">
                  check
                </p>
              </div>
              <p className="fg-8b7a696f46" dir="auto" data-node-id="1170:3400">
                زهرا محمدی
              </p>
            </div>
            <p className="fg-f83adca793" dir="auto" data-node-id="1170:3401">
              میناکاری
            </p>
            <div className="fg-778348babf" data-node-id="1170:3402" data-name="Follow action">
              <p className="fg-73881fb111" dir="auto" data-node-id="1170:3403">
                دنبال کردن
              </p>
            </div>
          </div>
          <div className="fg-9976d760a7" data-node-id="1170:3404" data-name="Artist card">
            <div className="fg-a84c4fb86b" data-node-id="1170:3405" data-name="Artist portrait">
              <div className="fg-1c2bc863d2">
                <img alt="" className="fg-acc3667e96" height="92" src="/customer-web-assets/f0b7a633.png" width="92" />
              </div>
            </div>
            <div className="fg-88cb7a7b81" data-node-id="1170:3406" data-name="Verified artist">
              <div className="fg-60c64f3432" data-node-id="1170:3407" data-name="Verification badge">
                <p className="fg-ddd95accc7" data-node-id="1170:3408">
                  check
                </p>
              </div>
              <p className="fg-8b7a696f46" dir="auto" data-node-id="1170:3409">
                زهرا محمدی
              </p>
            </div>
            <p className="fg-f83adca793" dir="auto" data-node-id="1170:3410">
              میناکاری
            </p>
            <div className="fg-778348babf" data-node-id="1170:3411" data-name="Follow action">
              <p className="fg-73881fb111" dir="auto" data-node-id="1170:3412">
                دنبال کردن
              </p>
            </div>
          </div>
          <div className="fg-9976d760a7" data-node-id="1170:3413" data-name="Artist card">
            <div className="fg-a84c4fb86b" data-node-id="1170:3414" data-name="Artist portrait">
              <div className="fg-1c2bc863d2">
                <img alt="" className="fg-acc3667e96" height="92" src="/customer-web-assets/f0b7a633.png" width="92" />
              </div>
            </div>
            <div className="fg-88cb7a7b81" data-node-id="1170:3415" data-name="Verified artist">
              <div className="fg-60c64f3432" data-node-id="1170:3416" data-name="Verification badge">
                <p className="fg-ddd95accc7" data-node-id="1170:3417">
                  check
                </p>
              </div>
              <p className="fg-8b7a696f46" dir="auto" data-node-id="1170:3418">
                زهرا محمدی
              </p>
            </div>
            <p className="fg-f83adca793" dir="auto" data-node-id="1170:3419">
              میناکاری
            </p>
            <div className="fg-778348babf" data-node-id="1170:3420" data-name="Follow action">
              <p className="fg-73881fb111" dir="auto" data-node-id="1170:3421">
                دنبال کردن
              </p>
            </div>
          </div>
          <div className="fg-9976d760a7" data-node-id="1170:3422" data-name="Artist card">
            <div className="fg-a84c4fb86b" data-node-id="1170:3423" data-name="Artist portrait">
              <div className="fg-1c2bc863d2">
                <img alt="" className="fg-acc3667e96" height="92" src="/customer-web-assets/f0b7a633.png" width="92" />
              </div>
            </div>
            <div className="fg-88cb7a7b81" data-node-id="1170:3424" data-name="Verified artist">
              <div className="fg-60c64f3432" data-node-id="1170:3425" data-name="Verification badge">
                <p className="fg-ddd95accc7" data-node-id="1170:3426">
                  check
                </p>
              </div>
              <p className="fg-8b7a696f46" dir="auto" data-node-id="1170:3427">
                زهرا محمدی
              </p>
            </div>
            <p className="fg-f83adca793" dir="auto" data-node-id="1170:3428">
              میناکاری
            </p>
            <div className="fg-778348babf" data-node-id="1170:3429" data-name="Follow action">
              <p className="fg-73881fb111" dir="auto" data-node-id="1170:3430">
                دنبال کردن
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fg-bcccdfcf0f" data-node-id="1170:3431" data-name="Negarin stories section">
        <div className="fg-2f377c905c" data-node-id="1170:3432" data-name="Section header">
          <div className="fg-9782aa7bbc" data-node-id="1170:3433" data-name="Section action">
            <p className="fg-49ddcd9150" data-node-id="1170:3434">
              arrow_back
            </p>
            <p className="fg-fd87dcd811" dir="auto" data-node-id="1170:3435">
              ورود به روایت‌ها
            </p>
          </div>
          <div className="fg-506edd7e56" data-node-id="1170:3436" data-name="Section copy">
            <p className="fg-d373ed4508" dir="auto" data-node-id="1170:3437">
              شبکه نگارین
            </p>
            <p className="fg-5269867602" dir="auto" data-node-id="1170:3438">
              روایت ساخت آثار را از زبان هنرمندان بخوان
            </p>
          </div>
        </div>
        <div className="fg-ff93a6cc15" data-node-id="1170:3439" data-name="Editorial stories">
          <div className="fg-deb42145e3" data-node-id="1170:3440" data-name="Story notes">
            <div className="fg-15c8bf234c" data-node-id="1170:3441" data-name="Story note copy">
              <p className="fg-1de3e1959e" dir="auto" data-node-id="1170:3442">
                روایت تازه
              </p>
              <div className="fg-c709a3a0ac" data-node-id="1170:3443">
                <p className="fg-71e9336307" dir="auto">
                  نقشی که از دل
                </p>
                <p className="fg-f289274a85" dir="auto">
                  آتش جان می‌گیرد
                </p>
              </div>
              <div className="fg-b24e1b8725" data-node-id="1170:3444">
                <p className="fg-4e12e9eafc" dir="auto">
                  از طرح اولیه تا آخرین لایه لعاب؛
                </p>
                <p className="fg-4e12e9eafc" dir="auto">
                  با دستان هنرمند و مسیر شکل‌گیری
                </p>
                <p className="fg-6d8d7aaea8" dir="auto">
                  یک اثر همراه شو.
                </p>
              </div>
            </div>
            <div className="fg-db7ba0b341" data-node-id="1170:3445" data-name="Story note footer">
              <p className="fg-4dd9cb5d72" dir="auto" data-node-id="1170:3446">
                ۵ دقیقه خواندن
              </p>
              <p className="fg-92d4d12c21" dir="auto" data-node-id="1170:3447">
                خواندن روایت ←
              </p>
            </div>
          </div>
          <div className="fg-49f842449c" data-node-id="1170:3448" data-name="Featured story">
            <div className="fg-64f9bd2291" data-node-id="1170:3449" data-name="Story details">
              <div className="fg-db5114044e" data-node-id="1170:3450" data-name="Artist identity">
                <div className="fg-f3576091b1" data-node-id="1170:3451" data-name="Artist copy">
                  <div className="fg-88cb7a7b81" data-node-id="1170:3452" data-name="Verified artist">
                    <div className="fg-60c64f3432" data-node-id="1170:3453" data-name="Verification badge">
                      <p className="fg-ddd95accc7" data-node-id="1170:3454">
                        check
                      </p>
                    </div>
                    <p className="fg-728615b341" dir="auto" data-node-id="1170:3455">
                      زهرا محمدی
                    </p>
                  </div>
                  <p className="fg-5e57dc7d09" dir="auto" data-node-id="1170:3456">
                    فروشگاه زهرا محمدی
                  </p>
                </div>
                <div className="fg-19efab1ec1" data-node-id="1170:3457" data-name="Artist portrait">
                  <img alt="" className="fg-8faf267d30" height="48" src="/customer-web-assets/9c65fb86.png" width="48" />
                </div>
              </div>
              <div className="fg-e052228e18" data-node-id="1170:3458" data-name="Story copy">
                <p className="fg-27388c22c7" dir="auto" data-node-id="1170:3459">
                  قصه‌ی یک بشقاب میناکاری
                </p>
                <div className="fg-2d176b7ed3" data-node-id="1170:3460">
                  <p className="fg-4e12e9eafc" dir="auto">
                    «بشقاب میناکاری طرح شاه‌عباسی»؛
                  </p>
                  <p className="fg-4e12e9eafc" dir="auto">
                    بخشی از روایت ساخت این اثر و دستان
                  </p>
                  <p className="fg-6d8d7aaea8" dir="auto">
                    هنرمندی که پشت آن است.
                  </p>
                </div>
              </div>
              <div className="fg-0a09a79c4c" data-node-id="1170:3461" data-name="Story reactions">
                <p className="fg-0f0b591aa2" data-node-id="1170:3462">
                  bookmark_border
                </p>
                <div className="fg-1707e5033e" data-node-id="1170:3463" data-name="Reaction counts">
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="1170:3464">
                    ۱۴۰ پسند
                  </p>
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="1170:3465">
                    ۵ دیدگاه
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-264b00f828" data-node-id="1170:3466" data-name="Story artwork">
              <img alt="" className="fg-8038e5755b" src="/customer-web-assets/0f0ca41a.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="fg-57096db4c5" data-node-id="1170:3467" data-name="Popular works section">
        <div className="fg-2f377c905c" data-node-id="1170:3468" data-name="Section header">
          <div className="fg-9782aa7bbc" data-node-id="1170:3469" data-name="Section action">
            <p className="fg-49ddcd9150" data-node-id="1170:3470">
              arrow_back
            </p>
            <p className="fg-fd87dcd811" dir="auto" data-node-id="1170:3471">
              مشاهده همه آثار
            </p>
          </div>
          <div className="fg-506edd7e56" data-node-id="1170:3472" data-name="Section copy">
            <p className="fg-d373ed4508" dir="auto" data-node-id="1170:3473">
              محبوب برای خرید
            </p>
            <p className="fg-5269867602" dir="auto" data-node-id="1170:3474">
              گزیده‌ای از آثاری که این روزها بیشتر دیده می‌شوند
            </p>
          </div>
        </div>
        <div className="fg-3a63c83c7f" data-node-id="1170:3475" data-name="Artwork grid">
          <div className="fg-359ac6e667" data-node-id="1170:3476" data-name="Artwork card">
            <div className="fg-26c206c1da" data-node-id="1170:3477" data-name="Artwork media">
              <div className="fg-10552d7368" data-node-id="1170:3478" data-name="Artwork image">
                <img alt="" className="fg-6296272086" src="/customer-web-assets/f2e34add.png" />
              </div>
              <CustomerAction className="fg-e15bf0de36" data-node-id="1170:3479" data-name="Save artwork" label="bookmark_border">
                <p className="fg-9b07ad86fc" data-node-id="1170:3480">
                  bookmark_border
                </p>
              </CustomerAction>
              <div className="fg-af470569be" data-node-id="1170:3481" data-name="Artwork marker">
                <p className="fg-13ee81ec75" dir="auto" data-node-id="1170:3482">
                  اثر محبوب
                </p>
              </div>
            </div>
            <div className="fg-12deb5dde1" data-node-id="1170:3483" data-name="Artwork details">
              <p className="fg-7153eb558b" dir="auto" data-node-id="1170:3484">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
              <p className="fg-f93bee5b75" dir="auto" data-node-id="1170:3485">
                اثر زهرا محمدی
              </p>
              <p className="fg-6dcfa5a275" dir="auto" data-node-id="1170:3486">
                ۲,۴۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-fc1381f8e6" data-node-id="1170:3487" data-name="Artwork action row">
              <NegarinButton className="fg-c0c04ac187" label="مشاهده اثر" />
            </div>
          </div>
          <div className="fg-359ac6e667" data-node-id="1170:3491" data-name="Artwork card">
            <div className="fg-26c206c1da" data-node-id="1170:3492" data-name="Artwork media">
              <div className="fg-10552d7368" data-node-id="1170:3493" data-name="Artwork image">
                <img alt="" className="fg-6296272086" src="/customer-web-assets/f2e34add.png" />
              </div>
              <CustomerAction className="fg-e15bf0de36" data-node-id="1170:3494" data-name="Save artwork" label="bookmark_border">
                <p className="fg-9b07ad86fc" data-node-id="1170:3495">
                  bookmark_border
                </p>
              </CustomerAction>
              <div className="fg-af470569be" data-node-id="1170:3496" data-name="Artwork marker">
                <p className="fg-13ee81ec75" dir="auto" data-node-id="1170:3497">
                  اثر محبوب
                </p>
              </div>
            </div>
            <div className="fg-12deb5dde1" data-node-id="1170:3498" data-name="Artwork details">
              <p className="fg-7153eb558b" dir="auto" data-node-id="1170:3499">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
              <p className="fg-f93bee5b75" dir="auto" data-node-id="1170:3500">
                اثر زهرا محمدی
              </p>
              <p className="fg-6dcfa5a275" dir="auto" data-node-id="1170:3501">
                ۲,۴۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-fc1381f8e6" data-node-id="1170:3502" data-name="Artwork action row">
              <NegarinButton className="fg-c0c04ac187" label="مشاهده اثر" />
            </div>
          </div>
          <div className="fg-359ac6e667" data-node-id="1170:3506" data-name="Artwork card">
            <div className="fg-26c206c1da" data-node-id="1170:3507" data-name="Artwork media">
              <div className="fg-10552d7368" data-node-id="1170:3508" data-name="Artwork image">
                <img alt="" className="fg-6296272086" src="/customer-web-assets/f2e34add.png" />
              </div>
              <CustomerAction className="fg-e15bf0de36" data-node-id="1170:3509" data-name="Save artwork" label="bookmark_border">
                <p className="fg-9b07ad86fc" data-node-id="1170:3510">
                  bookmark_border
                </p>
              </CustomerAction>
              <div className="fg-af470569be" data-node-id="1170:3511" data-name="Artwork marker">
                <p className="fg-13ee81ec75" dir="auto" data-node-id="1170:3512">
                  اثر محبوب
                </p>
              </div>
            </div>
            <div className="fg-12deb5dde1" data-node-id="1170:3513" data-name="Artwork details">
              <p className="fg-7153eb558b" dir="auto" data-node-id="1170:3514">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
              <p className="fg-f93bee5b75" dir="auto" data-node-id="1170:3515">
                اثر زهرا محمدی
              </p>
              <p className="fg-6dcfa5a275" dir="auto" data-node-id="1170:3516">
                ۲,۴۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-fc1381f8e6" data-node-id="1170:3517" data-name="Artwork action row">
              <NegarinButton className="fg-c0c04ac187" label="مشاهده اثر" />
            </div>
          </div>
          <div className="fg-359ac6e667" data-node-id="1170:3521" data-name="Artwork card">
            <div className="fg-26c206c1da" data-node-id="1170:3522" data-name="Artwork media">
              <div className="fg-10552d7368" data-node-id="1170:3523" data-name="Artwork image">
                <img alt="" className="fg-6296272086" src="/customer-web-assets/f2e34add.png" />
              </div>
              <CustomerAction className="fg-e15bf0de36" data-node-id="1170:3524" data-name="Save artwork" label="bookmark_border">
                <p className="fg-9b07ad86fc" data-node-id="1170:3525">
                  bookmark_border
                </p>
              </CustomerAction>
              <div className="fg-8cc36c5f17" data-node-id="1170:3526" data-name="Artwork marker">
                <p className="fg-13ee81ec75" dir="auto" data-node-id="1170:3527">
                  اثر محبوب
                </p>
              </div>
            </div>
            <div className="fg-12deb5dde1" data-node-id="1170:3528" data-name="Artwork details">
              <p className="fg-7153eb558b" dir="auto" data-node-id="1170:3529">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
              <p className="fg-f93bee5b75" dir="auto" data-node-id="1170:3530">
                اثر زهرا محمدی
              </p>
              <p className="fg-6dcfa5a275" dir="auto" data-node-id="1170:3531">
                ۲,۴۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-fc1381f8e6" data-node-id="1170:3532" data-name="Artwork action row">
              <NegarinButton className="fg-c0c04ac187" label="مشاهده اثر" />
            </div>
          </div>
        </div>
      </div>
      <div className="fg-fe00f0bc99" data-node-id="1170:3536" data-name="Join Negarin section">
        <div className="fg-7a16b181cc" data-node-id="1170:3537" data-name="Join panel">
          <div className="fg-6b791bc33d" data-node-id="1170:3538" data-name="Registration action">
            <NegarinButton className="fg-dd99fcf189" label="شروع عضویت" size="Large" style="Accent" />
            <p className="fg-28004cab6b" dir="auto" data-node-id="1170:3542">
              ساخت حساب کمتر از دو دقیقه
            </p>
          </div>
          <div className="fg-af40187e9a" data-node-id="1170:3543" data-name="Join copy">
            <p className="fg-22fd221048" dir="auto" data-node-id="1170:3544">
              به شبکه نگارین بپیوند
            </p>
            <p className="fg-5b00262469" dir="auto" data-node-id="1170:3545">
              ثبت‌نام کن، پروفایلت را کامل کن و مسیر عضویت سالانه را برای فعال‌سازی فروشگاه ادامه بده.
            </p>
          </div>
        </div>
      </div>
      <div className="fg-cc60e75b9a" data-node-id="1170:3546" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1170:3547" data-name="Footer content">
          <div className="fg-e2342f1d2c" data-node-id="1170:3548" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1170:3549">
              حساب مشتری
            </p>
            <CustomerAction className="fg-2df528dca1" dir="auto" data-node-id="1170:3550" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
            <CustomerAction className="fg-2df528dca1" dir="auto" data-node-id="1170:3551" label="سبد">
              سبد
            </CustomerAction>
            <CustomerAction className="fg-2df528dca1" dir="auto" data-node-id="1170:3552" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-e2342f1d2c" data-node-id="1170:3553" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1170:3554">
              کشف نگارین
            </p>
            <CustomerAction className="fg-2df528dca1" dir="auto" data-node-id="1170:3555" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-2df528dca1" dir="auto" data-node-id="1170:3556" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-2df528dca1" dir="auto" data-node-id="1170:3557" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-6e8165ea86" data-node-id="1170:3558" data-name="Footer brand">
            <div className="fg-5db7c3a069" data-node-id="1170:3559" data-name="Brand statement">
              <p className="fg-24992208b4" dir="auto" data-node-id="1170:3560">
                خانه نگارین
              </p>
              <p className="fg-52ce500770" dir="auto" data-node-id="1170:3561">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر
              </p>
              <p className="fg-3d505c9ccd" dir="auto" data-node-id="1170:3562">
                روایتگر هنر اصیل ایرانی
              </p>
            </div>
            <div className="fg-791a4ad62e" data-node-id="1170:3563" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/b65a7682.png" />
            </div>
          </div>
        </div>
        <div className="fg-89826d30c2" data-node-id="1170:3564" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1170:3565">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1170:3566">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
