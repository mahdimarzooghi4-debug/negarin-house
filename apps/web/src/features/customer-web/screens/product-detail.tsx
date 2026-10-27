// Native Figma 1176:5471 — Customer / Product Detail - Web
import {CustomerAction} from "../customer-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Medium" | "Small" | "Large";
  state?: "Default";
  style?: "Primary" | "Secondary" | "Accent";
};

function NegarinButton({ className, label = "ادامه", size = "Large", state = "Default", style = "Primary" }: NegarinButtonProps) {
  const isAccentAndMediumAndDefault = style === "Accent" && size === "Medium" && state === "Default";
  const isSecondaryAndSmallAndDefault = style === "Secondary" && size === "Small" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isAccentAndMediumAndDefault ? "node-46_28" : isSecondaryAndSmallAndDefault ? "node-46_12" : "node-46_8"} label={label}>
      {style === "Primary" && size === "Large" && state === "Default" && (
        <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:9">
          {label}
        </p>
      )}
      {isSecondaryAndSmallAndDefault && (
        <p className="fg-e4a7d61a6f" dir="auto" data-node-id="46:13">
          {label}
        </p>
      )}
      {isAccentAndMediumAndDefault && (
        <p className="fg-ace2ed9f91" dir="auto" data-node-id="46:29">
          {label}
        </p>
      )}
    </CustomerAction>
  );
}

export default function CustomerProductDetailWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1176:5471" data-name="Customer / Product Detail - Web">
      <div className="fg-6f037ae468" data-node-id="1176:5472" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1176:5473" data-name="Customer actions">
          <div className="fg-7901589539" data-node-id="1176:5474" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5475">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5476" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1176:5477" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5478">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5479" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1176:5480" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1176:5481">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1176:5482" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-b59211dbe5" data-node-id="1176:5483" data-name="Primary navigation">
          <div className="fg-8758c09eb2" data-node-id="1176:5484" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1176:5485" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1176:5486" data-name="Active indicator" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1176:5487" data-name="Navigation link">
            <CustomerAction className="fg-5237d233f5" dir="auto" data-node-id="1176:5488" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <div className="fg-fce9070434" data-node-id="1176:5489" data-name="Active indicator" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1176:5490" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1176:5491" label="خانه">
              خانه
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1176:5492" data-name="Active indicator" />
          </div>
        </div>
        <div className="fg-3ee1409559" data-node-id="1176:5493" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1176:5494" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1176:5495">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1176:5496">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1176:5497" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-3bc09ce3d9" data-node-id="1176:5498" data-name="Breadcrumbs">
        <div className="fg-3859e08116" data-node-id="1176:5499" data-name="Share actions">
          <CustomerAction className="fg-63326cf1ce" data-node-id="1176:5500" data-name="Share artwork" label="share">
            <p className="fg-f90ef3cbd0" data-node-id="1176:5501">
              share
            </p>
          </CustomerAction>
          <CustomerAction className="fg-63326cf1ce" data-node-id="1176:5502" data-name="Save artwork" label="bookmark_border">
            <p className="fg-f90ef3cbd0" data-node-id="1176:5503">
              bookmark_border
            </p>
          </CustomerAction>
        </div>
        <p className="fg-ad1e7d5517" dir="auto" data-node-id="1176:5504">{`خانه  /  آثار  /  میناکاری  /  بشقاب طرح شاه‌عباسی`}</p>
      </div>
      <div className="fg-5441fa8366" data-node-id="1176:5505" data-name="Product overview">
        <div className="fg-e2ec8b0acd" data-node-id="1176:5506" data-name="Product gallery">
          <div className="fg-64307c0dfa" data-node-id="1176:5507" data-name="Main artwork">
            <div className="fg-26a6af9d57" data-node-id="1176:5508" data-name="Artwork image">
              <img alt="" className="fg-2ce1fee1c9" src="/customer-web-assets/2932d3a9.png" />
            </div>
            <div className="fg-1d3745dbe4" data-node-id="1176:5509" data-name="Artwork badge">
              <p className="fg-585f829b1a" dir="auto" data-node-id="1176:5510">
                اثر منحصربه‌فرد
              </p>
            </div>
          </div>
          <div className="fg-73fe6d119b" data-node-id="1176:5511" data-name="Gallery thumbnails">
            <div className="fg-5afdc7942c" data-node-id="1176:5512" data-name="Gallery thumbnail">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/40705752.png" />
            </div>
            <div className="fg-407d979676" data-node-id="1176:5513" data-name="Gallery thumbnail">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/8c9ea522.png" />
            </div>
            <div className="fg-407d979676" data-node-id="1176:5514" data-name="Gallery thumbnail">
              <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/0cd6abb0.png" />
            </div>
            <div className="fg-f96ab49fe7" data-node-id="1176:5515" data-name="Gallery note">
              <p className="fg-d8c2a26a52" dir="auto" data-node-id="1176:5516">
                نمای نزدیک
              </p>
              <p className="fg-b5424de509" dir="auto" data-node-id="1176:5517">
                جزئیات قلم‌گیری و لعاب اثر
              </p>
            </div>
          </div>
        </div>
        <div className="fg-af2bba6a06" data-node-id="1176:5518" data-name="Product information">
          <div className="fg-cbcb935861" data-node-id="1176:5519" data-name="Product title">
            <div className="fg-e3c197f051" data-node-id="1176:5520" data-name="Category tag">
              <p className="fg-585f829b1a" dir="auto" data-node-id="1176:5521">
                میناکاری
              </p>
            </div>
            <p className="fg-28b3225b4a" dir="auto" data-node-id="1176:5522">
              بشقاب میناکاری طرح شاه‌عباسی
            </p>
            <p className="fg-4c6177599c" dir="auto" data-node-id="1176:5523">
              ۲,۴۵۰,۰۰۰ تومان
            </p>
          </div>
          <div className="fg-460149fb8e" data-node-id="1176:5524" data-name="Artist profile">
            <NegarinButton className="fg-15bc78f789" label="مشاهده پروفایل" size="Small" style="Secondary" />
            <div className="fg-520ffdf14b" data-node-id="1176:5528" data-name="Artist copy">
              <div className="fg-d03a5b24b0" data-node-id="1176:5529" data-name="Verified artist">
                <p className="fg-9e46259ae7" data-node-id="1176:5530">
                  verified
                </p>
                <p className="fg-719ee233d9" dir="auto" data-node-id="1176:5531">
                  زهرا محمدی
                </p>
              </div>
              <p className="fg-3f80f9a777" dir="auto" data-node-id="1176:5532">
                فروشگاه زهرا محمدی · هنرمند تأییدشده نگارین
              </p>
            </div>
            <div className="fg-3d51711349" data-node-id="1176:5533" data-name="Artist portrait">
              <div className="fg-323fcffdb2">
                <img alt="" className="fg-acc3667e96" height="72" src="/customer-web-assets/95692c10.png" width="72" />
              </div>
            </div>
          </div>
          <div className="fg-12deb5dde1" data-node-id="1176:5534" data-name="Description">
            <p className="fg-372374564f" dir="auto" data-node-id="1176:5535">
              درباره اثر
            </p>
            <p className="fg-949e5e7c85" dir="auto" data-node-id="1176:5536">
              این بشقاب با الهام از نقش شاه‌عباسی و با قلم‌گیری ظریف روی زمینه مسی ساخته شده است. لایه‌های رنگ و لعاب، هر بار در آتش تثبیت شده‌اند تا آبی‌های عمیق و نقش‌های زنده اثر شکل بگیرند.
            </p>
          </div>
          <div className="fg-0cd8e02b4c" data-node-id="1176:5537" data-name="Available product details">
            <div className="fg-27cc53fe69" data-node-id="1176:5538" data-name="Product detail">
              <p className="fg-3a836691bd" dir="auto" data-node-id="1176:5539">
                میناکاری
              </p>
              <p className="fg-e601233141" dir="auto" data-node-id="1176:5540">
                دسته
              </p>
            </div>
            <div className="fg-27cc53fe69" data-node-id="1176:5541" data-name="Product detail">
              <p className="fg-3a836691bd" dir="auto" data-node-id="1176:5542">
                مس، رنگ و لعاب مینا
              </p>
              <p className="fg-e601233141" dir="auto" data-node-id="1176:5543">
                جنس
              </p>
            </div>
            <div className="fg-27cc53fe69" data-node-id="1176:5544" data-name="Product detail">
              <p className="fg-3a836691bd" dir="auto" data-node-id="1176:5545">
                قطر ۲۵ سانتی‌متر
              </p>
              <p className="fg-e601233141" dir="auto" data-node-id="1176:5546">
                ابعاد
              </p>
            </div>
            <div className="fg-27cc53fe69" data-node-id="1176:5547" data-name="Product detail">
              <p className="fg-3a836691bd" dir="auto" data-node-id="1176:5548">
                موجود برای خرید
              </p>
              <p className="fg-e601233141" dir="auto" data-node-id="1176:5549">
                وضعیت
              </p>
            </div>
          </div>
          <div className="fg-e10cb974a7" data-node-id="1176:5550" data-name="Purchase actions">
            <div className="fg-ff2f2ef5a3" data-node-id="1176:5551" data-name="Save action">
              <p className="fg-3ec0940cf0" data-node-id="1176:5552">
                bookmark_border
              </p>
            </div>
            <NegarinButton className="fg-cbef04e7c5" label="افزودن به سبد" />
          </div>
        </div>
      </div>
      <div className="fg-73f5b7f1dd" data-node-id="1176:5556" data-name="Artwork story">
        <div className="fg-5bc1dbdc6d" data-node-id="1176:5557" data-name="Story image frame">
          <div className="fg-26a6af9d57" data-node-id="1176:5558" data-name="Story artwork">
            <img alt="" className="fg-2ce1fee1c9" src="/customer-web-assets/3603a70d.png" />
          </div>
        </div>
        <div className="fg-c54869ef1b" data-node-id="1176:5559" data-name="Story copy">
          <p className="fg-0943947114" dir="auto" data-node-id="1176:5560">
            روایت ساخت این اثر
          </p>
          <p className="fg-c671acba7b" dir="auto" data-node-id="1176:5561">
            نقشی که از دل آتش جان می‌گیرد
          </p>
          <p className="fg-e42c3e31ad" dir="auto" data-node-id="1176:5562">
            زهرا از طرح اولیه تا آخرین لایه لعاب، هر مرحله را با دست و صبوری پیش می‌برد. این اثر بخشی از روایتی است که پیوند نقش ایرانی و زندگی امروز را دنبال می‌کند.
          </p>
          <NegarinButton className="fg-5f5f993372" label="مشاهده روایت مرتبط" size="Medium" style="Accent" />
        </div>
      </div>
      <div className="fg-007cb0bf85" data-node-id="1176:5566" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1176:5567" data-name="Footer content">
          <div className="fg-0e1b23ee44" data-node-id="1176:5568" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1176:5569">
              حساب مشتری
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5570" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5571" label="سبد">
              سبد
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5572" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-0e1b23ee44" data-node-id="1176:5573" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1176:5574">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5575" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5576" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1176:5577" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1176:5578" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1176:5579" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1176:5580">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1176:5581">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1176:5582" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-216633d331" data-node-id="1176:5583" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1176:5584">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1176:5585">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
