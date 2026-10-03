// Native Figma 1191:59 — Customer / Artist Store — Web
import {CustomerAction} from "../customer-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Medium" | "Small" | "Large";
  state?: "Default";
  style?: "Primary" | "Accent";
};

function NegarinButton({ className, label = "ادامه", size = "Small", state = "Default", style = "Primary" }: NegarinButtonProps) {
  const isAccentAndLargeAndDefault = style === "Accent" && size === "Large" && state === "Default";
  const isPrimaryAndLargeAndDefault = style === "Primary" && size === "Large" && state === "Default";
  const isPrimaryAndSmallAndDefault = style === "Primary" && size === "Small" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isAccentAndLargeAndDefault ? "node-46_32" : isPrimaryAndLargeAndDefault ? "node-46_8" : isPrimaryAndSmallAndDefault ? "node-46_2" : "node-45_10"} label={label}>
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

export default function CustomerArtistStoreWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1191:59" data-name="Customer / Artist Store — Web">
      <div className="fg-6f037ae468" data-node-id="1191:60" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1191:61" data-name="Customer actions">
          <div className="fg-7901589539" data-node-id="1191:62" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:63">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:64" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1191:65" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:66">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:67" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1191:68" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:69">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:70" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-b59211dbe5" data-node-id="1191:71" data-name="Primary navigation">
          <div className="fg-8758c09eb2" data-node-id="1191:72" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1191:73" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1191:74" data-name="Active indicator" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1191:75" data-name="Navigation link">
            <CustomerAction className="fg-5237d233f5" dir="auto" data-node-id="1191:76" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <div className="fg-fce9070434" data-node-id="1191:77" data-name="Active indicator" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1191:78" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1191:79" label="خانه">
              خانه
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1191:80" data-name="Active indicator" />
          </div>
        </div>
        <div className="fg-3ee1409559" data-node-id="1191:81" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1191:82" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1191:83">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1191:84">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1191:85" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-f65d5afd9d" data-node-id="1191:86" data-name="Artist hero">
        <div className="fg-d1f075ac19" data-node-id="1191:87" data-name="Hero panel">
          <div className="fg-c257f8e22f" data-node-id="1191:88" data-name="Artist composition">
            <div className="fg-2e8563a8f5" data-node-id="1191:89" data-name="Artist notes">
              <div className="fg-055f14de55" data-node-id="1191:90" data-name="Material note">
                <div className="fg-1f1e892480" data-node-id="1191:91" data-name="Material image">
                  <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/c015e63d.png" />
                </div>
                <p className="fg-1e621bc88c" dir="auto" data-node-id="1191:92">
                  میناکاری
                </p>
              </div>
              <div className="fg-055f14de55" data-node-id="1191:93" data-name="Material note">
                <div className="fg-1f1e892480" data-node-id="1191:94" data-name="Material image">
                  <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/9466e47c.png" />
                </div>
                <p className="fg-1e621bc88c" dir="auto" data-node-id="1191:95">
                  کارگاه هنری
                </p>
              </div>
            </div>
            <div className="fg-713ca3f404" data-node-id="1191:96" data-name="Featured artwork">
              <div className="fg-01e71c0036" data-node-id="1191:97" data-name="Artwork image">
                <img alt="" className="fg-b440a5c4af" src="/customer-web-assets/e932e662.png" />
              </div>
              <div className="fg-0a09a79c4c" data-node-id="1191:98" data-name="Artwork caption">
                <p className="fg-374f98fc6e" dir="auto" data-node-id="1191:99">
                  میناکاری
                </p>
                <p className="fg-4ddf6232e3" dir="auto" data-node-id="1191:100">
                  بشقاب میناکاری آبیِ نقش‌جهان
                </p>
              </div>
            </div>
          </div>
          <div className="fg-cc88995f4d" data-node-id="1191:101" data-name="Hero copy">
            <div className="fg-9c5437cde0" data-node-id="1191:102" data-name="Hero eyebrow">
              <div className="fg-2595163ef1" data-node-id="1191:103" data-name="Eyebrow dot">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/eda6f56a.svg" />
              </div>
              <p className="fg-74bdd036ed" dir="auto" data-node-id="1191:104">
                هنرمند تأییدشده
              </p>
            </div>
            <div className="fg-53fb3391ce" data-node-id="1191:105">
              <p className="fg-96eff31b51" dir="auto">
                میناکاری‌های مریم سهرابی را
              </p>
              <p className="fg-a4d2b1adae" dir="auto">
                کشف کن و بخر
              </p>
            </div>
            <p className="fg-795e7696f3" dir="auto" data-node-id="1191:106">
              آثار دست‌ساز مریم سهرابی با ۱۲ سال تجربه در کارگاه اصفهان، از ترکیب رنگ و آتش به اشیاء ماندگاری تبدیل می‌شود که هر کدام یک روایت دارند.
            </p>
            <div className="fg-fe93f710ff" data-node-id="1191:107" data-name="Hero actions">
              <NegarinButton className="fg-86ffa2da8f" label="کشف آثار" size="Large" />
              <NegarinButton className="fg-fc22c6d318" label="ورود به روایت‌ها" size="Large" style="Accent" />
            </div>
          </div>
          <div className="fg-2bda7b8deb" data-node-id="1191:114" data-name="Top motif">
            <img alt="" className="fg-8faf267d30" src="/customer-web-assets/99f5e2e1.svg" />
          </div>
        </div>
      </div>
      <div className="fg-3bc09ce3d9" data-node-id="1191:115" data-name="Breadcrumbs">
        <div className="fg-3859e08116" data-node-id="1191:116" data-name="Share actions">
          <CustomerAction className="fg-63326cf1ce" data-node-id="1191:117" data-name="Share artwork" label="share">
            <p className="fg-f90ef3cbd0" data-node-id="1191:118">
              share
            </p>
          </CustomerAction>
          <CustomerAction className="fg-63326cf1ce" data-node-id="1191:119" data-name="Save artwork" label="bookmark_border">
            <p className="fg-f90ef3cbd0" data-node-id="1191:120">
              bookmark_border
            </p>
          </CustomerAction>
        </div>
        <p className="fg-ad1e7d5517" dir="auto" data-node-id="1191:121">{`خانه  /  هنرمندان  /  مریم سهرابی`}</p>
      </div>
      <div className="fg-78b26f619a" data-node-id="1191:122" data-name="Artist profile section">
        <div className="fg-99db687c90" data-node-id="1191:123" data-name="Artist profile panel">
          <div className="fg-d593448dd9" data-node-id="1191:124" data-name="Profile copy">
            <div className="fg-3ee1409559" data-node-id="1191:125" data-name="Profile header">
              <div className="fg-88cb7a7b81" data-node-id="1191:126" data-name="Verified artist">
                <div className="fg-60c64f3432" data-node-id="1191:127" data-name="Verification badge">
                  <p className="fg-ddd95accc7" data-node-id="1191:128">
                    check
                  </p>
                </div>
                <p className="fg-728615b341" dir="auto" data-node-id="1191:129">
                  مریم سهرابی
                </p>
              </div>
              <p className="fg-a051dbd6b6" dir="auto" data-node-id="1191:130">
                اصفهان
              </p>
              <p className="fg-a051dbd6b6" dir="auto" data-node-id="1191:131">
                میناکاری
              </p>
            </div>
            <p className="fg-79c962b07a" dir="auto" data-node-id="1191:132">
              رنگ و آتش را به نقش‌هایی ماندگار برای خانه‌های امروز تبدیل می‌کنم. هر اثر در کارگاه اصفهان با صبوری و دقت ساخته می‌شود تا هم به عنوان اثر هنری و هم به عنوان بخشی از زندگی روزمره باقی بماند.
            </p>
            <div className="fg-3cb53632f1" data-node-id="1191:133" data-name="Profile stats">
              <div className="fg-555985bbb3" data-node-id="1191:134" data-name="Stat card">
                <p className="fg-34f9f973f6" dir="auto" data-node-id="1191:135">
                  سابقه هنری
                </p>
                <p className="fg-00b08f6bc3" dir="auto" data-node-id="1191:136">
                  ۱۲ سال
                </p>
              </div>
              <div className="fg-555985bbb3" data-node-id="1191:137" data-name="Stat card">
                <p className="fg-34f9f973f6" dir="auto" data-node-id="1191:138">
                  آثار در فروشگاه
                </p>
                <p className="fg-00b08f6bc3" dir="auto" data-node-id="1191:139">
                  ۴ اثر
                </p>
              </div>
              <div className="fg-555985bbb3" data-node-id="1191:140" data-name="Stat card">
                <p className="fg-34f9f973f6" dir="auto" data-node-id="1191:141">
                  روایت‌های منتشرشده
                </p>
                <p className="fg-00b08f6bc3" dir="auto" data-node-id="1191:142">
                  ۳ روایت
                </p>
              </div>
            </div>
          </div>
          <div className="fg-e949698c17" data-node-id="1191:143" data-name="Profile media">
            <div className="fg-2894893bc7" data-node-id="1191:144" data-name="Artist portrait">
              <div className="fg-38b8ee31da">
                <img alt="" className="fg-acc3667e96" height="126" src="/customer-web-assets/c8895db5.png" width="126" />
              </div>
            </div>
            <div className="fg-1ba4984b4d" data-node-id="1191:145" data-name="Studio image">
              <div className="fg-9b860cb334" data-node-id="1191:146" data-name="Studio image">
                <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/47c5d1a4.png" />
              </div>
              <p className="fg-e581c13b70" dir="auto" data-node-id="1191:147">
                کارگاه هنری مریم سهرابی در اصفهان، جایی که هر اثر با صبوری و دقت ساخته می‌شود.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fg-92a0d0998e" data-node-id="1191:148" data-name="Catalog">
        <div className="fg-da907fb7ae" data-node-id="1191:149" data-name="Results">
          <div className="fg-0a09a79c4c" data-node-id="1191:150" data-name="Results heading">
            <CustomerAction className="fg-0b98d4113a" data-node-id="1191:151" data-name="Sort control" label="جدیدترین‌ها sort">
              <p className="fg-0911c133e6" dir="auto" data-node-id="1191:152">
                جدیدترین‌ها
              </p>
              <p className="fg-f63fadfb46" data-node-id="1191:153">
                sort
              </p>
            </CustomerAction>
            <div className="fg-335cd1bbca" data-node-id="1191:154" data-name="Heading copy">
              <p className="fg-5d24156dfa" dir="auto" data-node-id="1191:155">
                آثار مریم سهرابی
              </p>
              <p className="fg-34f9f973f6" dir="auto" data-node-id="1191:156">
                ۴ اثر برای خرید
              </p>
            </div>
          </div>
          <div className="fg-42e2fdfae0" data-node-id="1191:157" data-name="Artwork grid">
            <div className="fg-3a63c83c7f" data-node-id="1191:158" data-name="Artwork row">
              <div className="fg-462efdcecd" data-node-id="1191:159" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1191:160" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1191:161" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/caa5f954.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1191:162" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1191:163">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-f474be6e00" data-node-id="1191:164" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1191:165">
                      میناکاری
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1191:166" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1191:167">
                    بشقاب میناکاری آبیِ نقش‌جهان
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1191:168">
                    اثر مریم سهرابی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1191:169">
                    ۲,۴۸۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
              <div className="fg-462efdcecd" data-node-id="1191:172" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1191:173" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1191:174" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/0bfd4979.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1191:175" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1191:176">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-f474be6e00" data-node-id="1191:177" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1191:178">
                      میناکاری
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1191:179" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1191:180">
                    گلدان میناکاری ترنج
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1191:181">
                    اثر مریم سهرابی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1191:182">
                    ۱,۹۸۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
              <div className="fg-462efdcecd" data-node-id="1191:185" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1191:186" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1191:187" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/3e74e085.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1191:188" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1191:189">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-f474be6e00" data-node-id="1191:190" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1191:191">
                      میناکاری
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1191:192" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1191:193">
                    جعبه جواهرات فیروزه‌نشان
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1191:194">
                    اثر مریم سهرابی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1191:195">
                    ۱,۶۵۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
            </div>
            <div className="fg-5c941ab3a3" data-node-id="1191:198" data-name="Artwork row">
              <div className="fg-462efdcecd" data-node-id="1191:199" data-name="Artwork card">
                <div className="fg-cd82b7c1b5" data-node-id="1191:200" data-name="Artwork media">
                  <div className="fg-10552d7368" data-node-id="1191:201" data-name="Artwork image">
                    <img alt="" className="fg-6296272086" src="/customer-web-assets/10dd6ad1.png" />
                  </div>
                  <CustomerAction className="fg-2d33bf0a12" data-node-id="1191:202" data-name="Save artwork" label="bookmark_border">
                    <p className="fg-ce795296df" data-node-id="1191:203">
                      bookmark_border
                    </p>
                  </CustomerAction>
                  <div className="fg-99ec71f24f" data-node-id="1191:204" data-name="Category tag">
                    <p className="fg-9fef477172" dir="auto" data-node-id="1191:205">
                      میناکاری
                    </p>
                  </div>
                </div>
                <div className="fg-f66c14e190" data-node-id="1191:206" data-name="Artwork details">
                  <p className="fg-1376618a75" dir="auto" data-node-id="1191:207">
                    دیوارکوب میناکاری سرو
                  </p>
                  <p className="fg-f93bee5b75" dir="auto" data-node-id="1191:208">
                    اثر مریم سهرابی
                  </p>
                  <p className="fg-826fb50f4c" dir="auto" data-node-id="1191:209">
                    ۲,۱۵۰,۰۰۰ تومان
                  </p>
                </div>
                <NegarinButton className="fg-321947be2e" label="مشاهده اثر" />
              </div>
            </div>
          </div>
        </div>
        <div className="fg-0911d11db5" data-node-id="1191:212" data-name="Filters">
          <div className="fg-0a09a79c4c" data-node-id="1191:213" data-name="Filter heading">
            <p className="fg-3886341540" dir="auto" data-node-id="1191:214">
              پاک کردن
            </p>
            <p className="fg-6edbc50726" dir="auto" data-node-id="1191:215">
              فیلترها
            </p>
          </div>
          <div className="fg-864f45f1de" data-node-id="1191:216" data-name="Filter option">
            <CustomerAction className="fg-fb0c4ef341" data-node-id="1191:217" data-name="Toggle" label="">
              <div className="fg-d4cf01a488" data-node-id="1191:218" data-name="Toggle dot" />
            </CustomerAction>
            <div className="fg-44a995c6f6" data-node-id="1191:219" data-name="Filter copy">
              <p className="fg-04bdfc5e90" dir="auto" data-node-id="1191:220">
                فقط آثار موجود
              </p>
              <p className="fg-b5424de509" dir="auto" data-node-id="1191:221">
                آثاری را ببین که اکنون امکان خرید دارند.
              </p>
            </div>
            <p className="fg-2ff14cc447" data-node-id="1191:222">
              inventory_2
            </p>
          </div>
          <div className="fg-864f45f1de" data-node-id="1191:223" data-name="Filter option">
            <CustomerAction className="fg-12f3675309" data-node-id="1191:224" data-name="Toggle" label="">
              <div className="fg-d4cf01a488" data-node-id="1191:225" data-name="Toggle dot" />
            </CustomerAction>
            <div className="fg-44a995c6f6" data-node-id="1191:226" data-name="Filter copy">
              <p className="fg-04bdfc5e90" dir="auto" data-node-id="1191:227">
                هنرمندان تأییدشده
              </p>
              <p className="fg-b5424de509" dir="auto" data-node-id="1191:228">
                آثار هنرمندان دارای نشان تأیید نگارین.
              </p>
            </div>
            <p className="fg-2ff14cc447" data-node-id="1191:229">
              verified
            </p>
          </div>
          <div className="fg-598bd13204" data-node-id="1191:230" data-name="Price range">
            <p className="fg-abe46541cc" dir="auto" data-node-id="1191:231">
              بازه قیمت
            </p>
            <div className="fg-3af50ae4ba" data-node-id="1191:232" data-name="Range fields">
              <div className="fg-682cc982a1" data-node-id="1191:233" data-name="Price field">
                <p className="fg-837b8efcb8" dir="auto" data-node-id="1191:234">
                  تا
                </p>
              </div>
              <div className="fg-682cc982a1" data-node-id="1191:235" data-name="Price field">
                <p className="fg-837b8efcb8" dir="auto" data-node-id="1191:236">
                  از
                </p>
              </div>
            </div>
          </div>
          <NegarinButton className="fg-a900263ddf" label="نمایش نتایج" size="Medium" />
        </div>
      </div>
      <div className="fg-772ba3f285" data-node-id="1191:240" data-name="About artist section">
        <div className="fg-2f377c905c" data-node-id="1191:241" data-name="Section header">
          <div className="fg-9782aa7bbc" data-node-id="1191:242" data-name="Section action">
            <p className="fg-49ddcd9150" data-node-id="1191:243">
              arrow_back
            </p>
            <p className="fg-fd87dcd811" dir="auto" data-node-id="1191:244">
              مشاهده همه هنرمندان
            </p>
          </div>
          <div className="fg-506edd7e56" data-node-id="1191:245" data-name="Section copy">
            <p className="fg-d373ed4508" dir="auto" data-node-id="1191:246">
              درباره هنرمند
            </p>
            <p className="fg-5269867602" dir="auto" data-node-id="1191:247">
              با سابقه ۱۲ ساله در کارگاه اصفهان، مریم سهرابی آثار میناکاری را با دقت و صبوری خلق می‌کند.
            </p>
          </div>
        </div>
        <div className="fg-0abb578a1b" data-node-id="1191:248" data-name="About content">
          <div className="fg-5bc1dbdc6d" data-node-id="1191:249" data-name="About image frame">
            <div className="fg-26a6af9d57" data-node-id="1191:250" data-name="About artwork">
              <img alt="" className="fg-2ce1fee1c9" src="/customer-web-assets/3603a70d.png" />
            </div>
          </div>
          <div className="fg-c54869ef1b" data-node-id="1191:251" data-name="About copy">
            <p className="fg-0c8ec127b5" dir="auto" data-node-id="1191:252">
              اعتبار حرفه‌ای هنرمند
            </p>
            <p className="fg-8d061bd1ec" dir="auto" data-node-id="1191:253">
              مریم سهرابی با ۱۲ سال تجربه در کارگاه اصفهان، بر ترکیب لعاب، رنگ و آتش تسلط دارد. آثار او نه تنها به‌عنوان اثر هنری که به‌عنوان بخشی از دکوراسیون و هویت خانه‌های ایرانی شناخته می‌شود. هر اثر با دقت قلم‌گیری، چندین مرحله لعاب‌کاری و تثبیت در کوره خلق می‌شود تا نتیجه‌ای ماندگار و یکتای ایرانی داشته باشد.
            </p>
            <div className="fg-e10cb974a7" data-node-id="1191:254" data-name="Credibility chips">
              <div className="fg-1458992fcf" data-node-id="1191:255" data-name="Chip">
                <p className="fg-13645c1b54" dir="auto" data-node-id="1191:256">
                  تأییدشده نگارین
                </p>
              </div>
              <div className="fg-1458992fcf" data-node-id="1191:257" data-name="Chip">
                <p className="fg-13645c1b54" dir="auto" data-node-id="1191:258">
                  کارگاه اصفهان
                </p>
              </div>
              <div className="fg-1458992fcf" data-node-id="1191:259" data-name="Chip">
                <p className="fg-13645c1b54" dir="auto" data-node-id="1191:260">
                  ۱۲ سال سابقه
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fg-bcccdfcf0f" data-node-id="1191:261" data-name="Negarin stories section">
        <div className="fg-2f377c905c" data-node-id="1191:262" data-name="Section header">
          <div className="fg-9782aa7bbc" data-node-id="1191:263" data-name="Section action">
            <p className="fg-49ddcd9150" data-node-id="1191:264">
              arrow_back
            </p>
            <p className="fg-fd87dcd811" dir="auto" data-node-id="1191:265">
              ورود به روایت‌ها
            </p>
          </div>
          <div className="fg-506edd7e56" data-node-id="1191:266" data-name="Section copy">
            <p className="fg-d373ed4508" dir="auto" data-node-id="1191:267">
              روایت‌های هنرمند
            </p>
            <p className="fg-5269867602" dir="auto" data-node-id="1191:268">
              روایت ساخت آثار را از زبان هنرمند بخوان و با مسیر خلق هر اثر آشنا شوید.
            </p>
          </div>
        </div>
        <div className="fg-ff93a6cc15" data-node-id="1191:269" data-name="Editorial stories">
          <div className="fg-deb42145e3" data-node-id="1191:270" data-name="Story notes">
            <div className="fg-15c8bf234c" data-node-id="1191:271" data-name="Story note copy">
              <p className="fg-1de3e1959e" dir="auto" data-node-id="1191:272">
                روایت تازه
              </p>
              <div className="fg-c709a3a0ac" data-node-id="1191:273">
                <p className="fg-71e9336307" dir="auto">
                  نقشی که از دل
                </p>
                <p className="fg-f289274a85" dir="auto">
                  آتش جان می‌گیرد
                </p>
              </div>
              <div className="fg-b24e1b8725" data-node-id="1191:274">
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
            <div className="fg-db7ba0b341" data-node-id="1191:275" data-name="Story note footer">
              <p className="fg-4dd9cb5d72" dir="auto" data-node-id="1191:276">
                ۵ دقیقه خواندن
              </p>
              <p className="fg-92d4d12c21" dir="auto" data-node-id="1191:277">
                خواندن روایت ←
              </p>
            </div>
          </div>
          <div className="fg-49f842449c" data-node-id="1191:278" data-name="Featured story">
            <div className="fg-64f9bd2291" data-node-id="1191:279" data-name="Story details">
              <div className="fg-db5114044e" data-node-id="1191:280" data-name="Artist identity">
                <div className="fg-f3576091b1" data-node-id="1191:281" data-name="Artist copy">
                  <div className="fg-88cb7a7b81" data-node-id="1191:282" data-name="Verified artist">
                    <div className="fg-60c64f3432" data-node-id="1191:283" data-name="Verification badge">
                      <p className="fg-ddd95accc7" data-node-id="1191:284">
                        check
                      </p>
                    </div>
                    <p className="fg-728615b341" dir="auto" data-node-id="1191:285">
                      مریم سهرابی
                    </p>
                  </div>
                  <p className="fg-5e57dc7d09" dir="auto" data-node-id="1191:286">
                    فروشگاه مریم سهرابی
                  </p>
                </div>
                <div className="fg-19efab1ec1" data-node-id="1191:287" data-name="Artist portrait">
                  <img alt="" className="fg-8faf267d30" height="48" src="/customer-web-assets/9c65fb86.png" width="48" />
                </div>
              </div>
              <div className="fg-e052228e18" data-node-id="1191:288" data-name="Story copy">
                <p className="fg-27388c22c7" dir="auto" data-node-id="1191:289">
                  قصه‌ی یک بشقاب میناکاری
                </p>
                <div className="fg-2d176b7ed3" data-node-id="1191:290">
                  <p className="fg-4e12e9eafc" dir="auto">
                    «بشقاب میناکاری آبیِ نقش‌جهان»؛
                  </p>
                  <p className="fg-4e12e9eafc" dir="auto">
                    بخشی از روایت ساخت این اثر و دستان
                  </p>
                  <p className="fg-6d8d7aaea8" dir="auto">
                    هنرمندی که پشت آن است.
                  </p>
                </div>
              </div>
              <div className="fg-0a09a79c4c" data-node-id="1191:291" data-name="Story reactions">
                <p className="fg-0f0b591aa2" data-node-id="1191:292">
                  bookmark_border
                </p>
                <div className="fg-1707e5033e" data-node-id="1191:293" data-name="Reaction counts">
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="1191:294">
                    ۱۴۰ پسند
                  </p>
                  <p className="fg-d452ad70ec" dir="auto" data-node-id="1191:295">
                    ۵ دیدگاه
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-264b00f828" data-node-id="1191:296" data-name="Story artwork">
              <img alt="" className="fg-8038e5755b" src="/customer-web-assets/d8726fad.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="fg-007cb0bf85" data-node-id="1191:297" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1191:298" data-name="Footer content">
          <div className="fg-0e1b23ee44" data-node-id="1191:299" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1191:300">
              حساب مشتری
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:301" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:302" label="سبد">
              سبد
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:303" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-0e1b23ee44" data-node-id="1191:304" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1191:305">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:306" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:307" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:308" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1191:309" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1191:310" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1191:311">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1191:312">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1191:313" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-216633d331" data-node-id="1191:314" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1191:315">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1191:316">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
