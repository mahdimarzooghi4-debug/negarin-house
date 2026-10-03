// Native Figma 1191:318 — Customer / Artist Stories — Web
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
  const isAccentAndMediumAndDefault = style === "Accent" && size === "Medium" && state === "Default";
  const isPrimaryAndLargeAndDefault = style === "Primary" && size === "Large" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isAccentAndLargeAndDefault ? "node-46_32" : isAccentAndMediumAndDefault ? "node-46_28" : isPrimaryAndLargeAndDefault ? "node-46_8" : "node-46_2"} label={label}>
      {style === "Primary" && state === "Default" && ["Small", "Large"].includes(size) && (
        <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:3">
          {label}
        </p>
      )}
      {style === "Accent" && state === "Default" && ["Medium", "Large"].includes(size) && (
        <p className="fg-ace2ed9f91" dir="auto" data-node-id="46:29">
          {label}
        </p>
      )}
    </CustomerAction>
  );
}

export default function CustomerArtistStoriesWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1191:318" data-name="Customer / Artist Stories — Web">
      <div className="fg-6f037ae468" data-node-id="1191:319" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1191:320" data-name="Customer actions">
          <div className="fg-7901589539" data-node-id="1191:321" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:322">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:323" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1191:324" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:325">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:326" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1191:327" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:328">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:329" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-b59211dbe5" data-node-id="1191:330" data-name="Primary navigation">
          <div className="fg-8758c09eb2" data-node-id="1191:331" data-name="Navigation link">
            <CustomerAction className="fg-5237d233f5" dir="auto" data-node-id="1191:332" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
            <div className="fg-fce9070434" data-node-id="1191:333" data-name="Rectangle" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1191:334" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1191:335" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1191:336" data-name="Rectangle" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1191:337" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1191:338" label="خانه">
              خانه
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1191:339" data-name="Rectangle" />
          </div>
        </div>
        <div className="fg-3ee1409559" data-node-id="1191:340" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1191:341" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1191:342">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1191:343">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1191:344" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-3bc09ce3d9" data-node-id="1191:345" data-name="Breadcrumbs">
        <div className="fg-3859e08116" data-node-id="1191:346" data-name="Share actions">
          <CustomerAction className="fg-63326cf1ce" data-node-id="1191:347" data-name="Share artwork" label="share">
            <p className="fg-f90ef3cbd0" data-node-id="1191:348">
              share
            </p>
          </CustomerAction>
          <CustomerAction className="fg-63326cf1ce" data-node-id="1191:349" data-name="Save artwork" label="bookmark_border">
            <p className="fg-f90ef3cbd0" data-node-id="1191:350">
              bookmark_border
            </p>
          </CustomerAction>
        </div>
        <p className="fg-ad1e7d5517" dir="auto" data-node-id="1191:351">{`خانه  /  هنرمندان  /  مریم سهرابی  /  روایت‌ها`}</p>
      </div>
      <div className="fg-f65d5afd9d" data-node-id="1191:352" data-name="Artist stories hero">
        <div className="fg-d1f075ac19" data-node-id="1191:353" data-name="Hero panel">
          <div className="fg-c257f8e22f" data-node-id="1191:354" data-name="Artist composition">
            <div className="fg-2e8563a8f5" data-node-id="1191:355" data-name="Artist notes">
              <div className="fg-055f14de55" data-node-id="1191:356" data-name="Material note">
                <div className="fg-1f1e892480" data-node-id="1191:357" data-name="Material image">
                  <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/c015e63d.png" />
                </div>
                <p className="fg-1e621bc88c" dir="auto" data-node-id="1191:358">
                  میناکاری
                </p>
              </div>
              <div className="fg-055f14de55" data-node-id="1191:359" data-name="Material note">
                <div className="fg-1f1e892480" data-node-id="1191:360" data-name="Material image">
                  <img alt="" className="fg-8e3c2e60fd" src="/customer-web-assets/9466e47c.png" />
                </div>
                <p className="fg-1e621bc88c" dir="auto" data-node-id="1191:361">
                  کارگاه هنری
                </p>
              </div>
            </div>
            <div className="fg-713ca3f404" data-node-id="1191:362" data-name="Featured artwork">
              <div className="fg-01e71c0036" data-node-id="1191:363" data-name="Artwork image">
                <img alt="" className="fg-b440a5c4af" src="/customer-web-assets/e932e662.png" />
              </div>
              <div className="fg-0a09a79c4c" data-node-id="1191:364" data-name="Artwork caption">
                <p className="fg-374f98fc6e" dir="auto" data-node-id="1191:365">
                  میناکاری
                </p>
                <p className="fg-4ddf6232e3" dir="auto" data-node-id="1191:366">
                  بشقاب میناکاری آبیِ نقش‌جهان
                </p>
              </div>
            </div>
          </div>
          <div className="fg-cc88995f4d" data-node-id="1191:367" data-name="Hero copy">
            <div className="fg-9c5437cde0" data-node-id="1191:368" data-name="Hero eyebrow">
              <div className="fg-2595163ef1" data-node-id="1191:369" data-name="Ellipse">
                <img alt="" className="fg-8faf267d30" src="/customer-web-assets/eda6f56a.svg" />
              </div>
              <p className="fg-74bdd036ed" dir="auto" data-node-id="1191:370">
                روایت‌های هنرمند
              </p>
            </div>
            <div className="fg-53fb3391ce" data-node-id="1191:371">
              <p className="fg-96eff31b51" dir="auto">
                روایت‌های مریم سهرابی را
              </p>
              <p className="fg-a4d2b1adae" dir="auto">
                بخوان، ببین و حس کن
              </p>
            </div>
            <p className="fg-795e7696f3" dir="auto" data-node-id="1191:372">
              از آتش کوره تا لحظه‌های صبح کارگاه، مسیر خلق آثار میناکاری را از زبان هنرمند دنبال کن و با هر اثر بیشتر آشنا شو.
            </p>
            <div className="fg-fe93f710ff" data-node-id="1191:373" data-name="Hero actions">
              <NegarinButton className="fg-86ffa2da8f" label="کشف آثار" size="Large" />
              <NegarinButton className="fg-fc22c6d318" label="مشاهده همه روایت‌ها" size="Large" style="Accent" />
            </div>
          </div>
          <div className="fg-2bda7b8deb" data-node-id="1191:380" data-name="Top motif">
            <img alt="" className="fg-8faf267d30" src="/customer-web-assets/ea264737.svg" />
          </div>
        </div>
      </div>
      <div className="fg-512336a8a1" data-node-id="1191:381" data-name="Story library section">
        <div className="fg-2f377c905c" data-node-id="1191:382" data-name="Section header">
          <div className="fg-9782aa7bbc" data-node-id="1191:383" data-name="Section action">
            <p className="fg-49ddcd9150" data-node-id="1191:384">
              arrow_back
            </p>
            <p className="fg-fd87dcd811" dir="auto" data-node-id="1191:385">
              بازگشت به فروشگاه هنرمند
            </p>
          </div>
          <div className="fg-506edd7e56" data-node-id="1191:386" data-name="Section copy">
            <p className="fg-d373ed4508" dir="auto" data-node-id="1191:387">
              روایت‌های عمومی هنرمند
            </p>
            <p className="fg-5269867602" dir="auto" data-node-id="1191:388">
              روایت‌های تصویری و ویدیویی هنرمند را در یک صفحه ببینید و هر کدام را برای مطالعه بیشتر انتخاب کنید.
            </p>
          </div>
        </div>
        <div className="fg-a14631f11c" data-node-id="1191:389" data-name="Story filters">
          <div className="fg-c9f7e7b263" data-node-id="1191:390" data-name="Filter chips">
            <div className="fg-0c5b78ce90" data-node-id="1191:391" data-name="Frame">
              <p className="fg-13645c1b54" dir="auto" data-node-id="1191:392">
                همه
              </p>
            </div>
            <div className="fg-ed55a72576" data-node-id="1191:393" data-name="Frame">
              <p className="fg-13645c1b54" dir="auto" data-node-id="1191:394">
                تصویری
              </p>
            </div>
            <div className="fg-ed55a72576" data-node-id="1191:395" data-name="Frame">
              <p className="fg-13645c1b54" dir="auto" data-node-id="1191:396">
                ویدیویی
              </p>
            </div>
            <div className="fg-ed55a72576" data-node-id="1191:397" data-name="Frame">
              <p className="fg-13645c1b54" dir="auto" data-node-id="1191:398">
                با محصول
              </p>
            </div>
          </div>
          <p className="fg-dcac34836e" dir="auto" data-node-id="1191:399">
            ۳ روایت برای نمایش
          </p>
        </div>
        <div className="fg-153c0a1809" data-node-id="1191:400" data-name="Story grid">
          <div className="fg-3a63c83c7f" data-node-id="1191:401" data-name="Story row">
            <div className="fg-23f4a207df" data-node-id="1191:402" data-name="Story card selected">
              <div className="fg-cd82b7c1b5" data-node-id="1191:403" data-name="Story media">
                <div className="fg-10552d7368" data-node-id="1191:404" data-name="Rectangle">
                  <img alt="" className="fg-6296272086" src="/customer-web-assets/7ba14f9f.png" />
                </div>
                <div className="fg-2503ec01eb" data-node-id="1191:405" data-name="Media badge">
                  <p className="fg-9fef477172" dir="auto" data-node-id="1191:406">
                    تصویری
                  </p>
                </div>
                <div className="fg-98485a3aab" data-node-id="1191:407" data-name="Product badge">
                  <p className="fg-9fef477172" dir="auto" data-node-id="1191:408">
                    با محصول
                  </p>
                </div>
              </div>
              <div className="fg-12deb5dde1" data-node-id="1191:409" data-name="Story details">
                <p className="fg-1376618a75" dir="auto" data-node-id="1191:410">
                  از آتش تا آبی
                </p>
                <p className="fg-d3f087181a" dir="auto" data-node-id="1191:411">
                  ۱۴ اردیبهشت ۱۴۰۳
                </p>
                <p className="fg-d3f087181a" dir="auto" data-node-id="1191:412">
                  مرتبط با بشقاب میناکاری آبیِ نقش‌جهان
                </p>
              </div>
              <div className="fg-a14631f11c" data-node-id="1191:413" data-name="Story actions">
                <p className="fg-9a5ffe1fb1" dir="auto" data-node-id="1191:414">
                  روایت انتخاب‌شده
                </p>
                <NegarinButton className="fg-8cb7c7dd66" label="مشاهده روایت" />
              </div>
            </div>
            <div className="fg-462efdcecd" data-node-id="1191:417" data-name="Story card">
              <div className="fg-cd82b7c1b5" data-node-id="1191:418" data-name="Story media">
                <div className="fg-10552d7368" data-node-id="1191:419" data-name="Rectangle">
                  <img alt="" className="fg-6296272086" src="/customer-web-assets/1cdc06fc.png" />
                </div>
                <div className="fg-2503ec01eb" data-node-id="1191:420" data-name="Media badge">
                  <p className="fg-9fef477172" dir="auto" data-node-id="1191:421">
                    تصویری
                  </p>
                </div>
                <div className="fg-98485a3aab" data-node-id="1191:422" data-name="Product badge">
                  <p className="fg-9fef477172" dir="auto" data-node-id="1191:423">
                    با محصول
                  </p>
                </div>
              </div>
              <div className="fg-12deb5dde1" data-node-id="1191:424" data-name="Story details">
                <p className="fg-1376618a75" dir="auto" data-node-id="1191:425">
                  نقش‌زدن یک ترنج
                </p>
                <p className="fg-d3f087181a" dir="auto" data-node-id="1191:426">
                  ۷ اردیبهشت ۱۴۰۳
                </p>
                <p className="fg-d3f087181a" dir="auto" data-node-id="1191:427">
                  مرتبط با گلدان میناکاری ترنج
                </p>
              </div>
              <NegarinButton className="fg-321947be2e" label="مشاهده روایت" />
            </div>
            <div className="fg-462efdcecd" data-node-id="1191:430" data-name="Story card">
              <div className="fg-cd82b7c1b5" data-node-id="1191:431" data-name="Story media">
                <div className="fg-10552d7368" data-node-id="1191:432" data-name="Rectangle">
                  <img alt="" className="fg-6296272086" src="/customer-web-assets/1aef2281.png" />
                </div>
                <div className="fg-2503ec01eb" data-node-id="1191:433" data-name="Media badge">
                  <p className="fg-9fef477172" dir="auto" data-node-id="1191:434">
                    ویدیویی
                  </p>
                </div>
              </div>
              <div className="fg-12deb5dde1" data-node-id="1191:435" data-name="Story details">
                <p className="fg-1376618a75" dir="auto" data-node-id="1191:436">
                  صبح‌های کارگاه
                </p>
                <p className="fg-d3f087181a" dir="auto" data-node-id="1191:437">
                  ۲۸ فروردین ۱۴۰۳
                </p>
                <p className="fg-d3f087181a" dir="auto" data-node-id="1191:438">
                  بدون محصول مرتبط
                </p>
              </div>
              <NegarinButton className="fg-321947be2e" label="مشاهده روایت" />
            </div>
          </div>
        </div>
      </div>
      <div className="fg-c5fb577cc9" data-node-id="1191:441" data-name="Story viewer section">
        <div className="fg-5bc1dbdc6d" data-node-id="1191:442" data-name="Story image frame">
          <div className="fg-26a6af9d57" data-node-id="1191:443" data-name="Story artwork">
            <img alt="" className="fg-2ce1fee1c9" src="/customer-web-assets/1fba160c.png" />
          </div>
        </div>
        <div className="fg-0dd91557e0" data-node-id="1191:444" data-name="Story copy">
          <p className="fg-0943947114" dir="auto" data-node-id="1191:445">
            روایت انتخاب‌شده
          </p>
          <p className="fg-c671acba7b" dir="auto" data-node-id="1191:446">
            از آتش تا آبی
          </p>
          <p className="fg-e42c3e31ad" dir="auto" data-node-id="1191:447">
            این روایت مسیر خلق بشقاب میناکاری آبیِ نقش‌جهان را از طرح اولیه تا آخرین لایه لعاب و تثبیت در کوره نشان می‌دهد. مریم سهرابی در این روایت می‌گوید که هر بار رنگ‌های آبی و فیروزه‌ای چگونه در آتش جان می‌گیرند و یک اثر منحصربه‌فرد می‌شوند.
          </p>
          <div className="fg-db5114044e" data-node-id="1191:448" data-name="Story meta">
            <div className="fg-2d1bbf93f3" data-node-id="1191:449" data-name="Frame">
              <p className="fg-7a841b706a" dir="auto" data-node-id="1191:450">
                ۵ دقیقه خواندن
              </p>
            </div>
            <div className="fg-2d1bbf93f3" data-node-id="1191:451" data-name="Frame">
              <p className="fg-7a841b706a" dir="auto" data-node-id="1191:452">
                روایت تصویری
              </p>
            </div>
            <div className="fg-2d1bbf93f3" data-node-id="1191:453" data-name="Frame">
              <p className="fg-7a841b706a" dir="auto" data-node-id="1191:454">
                منتشر در ۱۴ اردیبهشت ۱۴۰۳
              </p>
            </div>
          </div>
          <NegarinButton className="fg-5f5f993372" label="مشاهده محصول مرتبط" size="Medium" style="Accent" />
        </div>
      </div>
      <div className="fg-007cb0bf85" data-node-id="1191:458" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1191:459" data-name="Footer content">
          <div className="fg-0e1b23ee44" data-node-id="1191:460" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1191:461">
              حساب مشتری
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:462" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:463" label="سبد">
              سبد
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:464" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-0e1b23ee44" data-node-id="1191:465" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1191:466">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:467" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:468" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1191:469" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1191:470" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1191:471" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1191:472">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1191:473">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1191:474" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-216633d331" data-node-id="1191:475" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1191:476">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1191:477">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
