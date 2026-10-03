// Native Figma 1191:57 — Customer / Story Viewer — Web
import {CustomerAction} from "../customer-controls";

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

export default function CustomerStoryViewerWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1191:57" data-name="Customer / Story Viewer — Web">
      <div className="fg-6f037ae468" data-node-id="1191:479" data-name="Desktop header">
        <div className="fg-f3fa02e255" data-node-id="1191:480" data-name="Customer actions">
          <div className="fg-7901589539" data-node-id="1191:481" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:482">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:483" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1191:484" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:485">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:486" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-7901589539" data-node-id="1191:487" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1191:488">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1191:489" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-b59211dbe5" data-node-id="1191:490" data-name="Primary navigation">
          <div className="fg-8758c09eb2" data-node-id="1191:491" data-name="Navigation link">
            <CustomerAction className="fg-5237d233f5" dir="auto" data-node-id="1191:492" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
            <div className="fg-fce9070434" data-node-id="1191:493" data-name="Rectangle" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1191:494" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1191:495" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1191:496" data-name="Rectangle" />
          </div>
          <div className="fg-8758c09eb2" data-node-id="1191:497" data-name="Navigation link">
            <CustomerAction className="fg-d63802fd89" dir="auto" data-node-id="1191:498" label="خانه">
              خانه
            </CustomerAction>
            <div className="fg-f06eed5690" data-node-id="1191:499" data-name="Rectangle" />
          </div>
        </div>
        <div className="fg-3ee1409559" data-node-id="1191:500" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1191:501" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1191:502">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1191:503">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1191:504" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-3bc09ce3d9" data-node-id="1191:505" data-name="Breadcrumbs">
        <div className="fg-3859e08116" data-node-id="1191:506" data-name="Share actions">
          <CustomerAction className="fg-63326cf1ce" data-node-id="1191:507" data-name="Share artwork" label="share">
            <p className="fg-f90ef3cbd0" data-node-id="1191:508">
              share
            </p>
          </CustomerAction>
          <CustomerAction className="fg-63326cf1ce" data-node-id="1191:509" data-name="Save artwork" label="bookmark_border">
            <p className="fg-f90ef3cbd0" data-node-id="1191:510">
              bookmark_border
            </p>
          </CustomerAction>
        </div>
        <p className="fg-ad1e7d5517" dir="auto" data-node-id="1191:511">{`خانه  /  هنرمندان  /  مریم سهرابی  /  روایت‌ها  /  از آتش تا آبی`}</p>
      </div>
      <div className="fg-557df4fd44" data-node-id="1191:512" data-name="Viewer content">
        <div className="fg-cee59485ab" data-node-id="1191:513" data-name="Story hero">
          <div className="fg-a14631f11c" data-node-id="1191:514" data-name="Hero top">
            <div className="fg-db5114044e" data-node-id="1191:515" data-name="Artist identity">
              <div className="fg-f3576091b1" data-node-id="1191:516" data-name="Artist copy">
                <div className="fg-88cb7a7b81" data-node-id="1191:517" data-name="Verified artist">
                  <div className="fg-60c64f3432" data-node-id="1191:518" data-name="Verification badge">
                    <p className="fg-ddd95accc7" data-node-id="1191:519">
                      check
                    </p>
                  </div>
                  <p className="fg-7d346f89f5" dir="auto" data-node-id="1191:520">
                    مریم سهرابی
                  </p>
                </div>
                <p className="fg-ed69a0d8d2" dir="auto" data-node-id="1191:521">
                  هنرمند تأییدشده میناکاری از اصفهان
                </p>
              </div>
              <div className="fg-19efab1ec1" data-node-id="1191:522" data-name="Artist portrait">
                <img alt="" className="fg-8faf267d30" height="48" src="/customer-web-assets/9c65fb86.png" width="48" />
              </div>
            </div>
            <div className="fg-db5114044e" data-node-id="1191:523" data-name="Story meta">
              <div className="fg-2d1bbf93f3" data-node-id="1191:524" data-name="Frame">
                <p className="fg-7a841b706a" dir="auto" data-node-id="1191:525">
                  ۵ دقیقه خواندن
                </p>
              </div>
              <div className="fg-2d1bbf93f3" data-node-id="1191:526" data-name="Frame">
                <p className="fg-7a841b706a" dir="auto" data-node-id="1191:527">
                  روایت تصویری
                </p>
              </div>
              <div className="fg-2d1bbf93f3" data-node-id="1191:528" data-name="Frame">
                <p className="fg-7a841b706a" dir="auto" data-node-id="1191:529">
                  منتشر در ۱۴ اردیبهشت ۱۴۰۳
                </p>
              </div>
            </div>
          </div>
          <div className="fg-d3fbe9e402" data-node-id="1191:530" data-name="Hero copy">
            <p className="fg-f572101322" dir="auto" data-node-id="1191:531">
              روایت انتخاب‌شده
            </p>
            <p className="fg-7935773971" dir="auto" data-node-id="1191:532">
              از آتش تا آبی
            </p>
            <p className="fg-e92f88848f" dir="auto" data-node-id="1191:533">
              این روایت مسیر خلق بشقاب میناکاری آبیِ نقش‌جهان را از طرح اولیه تا آخرین لایه لعاب و تثبیت در کوره نشان می‌دهد. مریم سهرابی در این روایت می‌گوید که هر بار رنگ‌های آبی و فیروزه‌ای چگونه در آتش جان می‌گیرند و یک اثر منحصربه‌فرد می‌شوند.
            </p>
          </div>
          <div className="fg-ec2487c82c" data-node-id="1191:534" data-name="Story media">
            <img alt="" className="fg-2377bfb0e7" src="/customer-web-assets/ce29b136.png" />
            <div className="fg-b62d239c7b" data-node-id="1191:535" data-name="Media badge">
              <p className="fg-9fef477172" dir="auto" data-node-id="1191:536">
                تصویری
              </p>
            </div>
            <div className="fg-856c014a2c" data-node-id="1191:537" data-name="Product badge">
              <p className="fg-9fef477172" dir="auto" data-node-id="1191:538">
                با محصول
              </p>
            </div>
          </div>
        </div>
        <div className="fg-bebd4e6cbd" data-node-id="1191:539" data-name="Viewer controls">
          <div className="fg-db5114044e" data-node-id="1191:540" data-name="Navigation controls">
            <div className="fg-7901589539" data-node-id="1191:541" data-name="Previous story">
              <p className="fg-2e35a54018" data-node-id="1191:542">
                arrow_back
              </p>
              <p className="fg-8b2b82f27c" dir="auto" data-node-id="1191:543">
                روایت قبلی
              </p>
            </div>
            <div className="fg-7901589539" data-node-id="1191:544" data-name="Next story">
              <p className="fg-8b2b82f27c" dir="auto" data-node-id="1191:545">
                روایت بعدی
              </p>
              <p className="fg-2e35a54018" data-node-id="1191:546">
                arrow_forward
              </p>
            </div>
          </div>
          <div className="fg-7901589539" data-node-id="1191:547" data-name="Close viewer">
            <p className="fg-2e35a54018" data-node-id="1191:548">
              close
            </p>
            <p className="fg-8b2b82f27c" dir="auto" data-node-id="1191:549">
              بستن صفحه
            </p>
          </div>
        </div>
        <div className="fg-87601b9de8" data-node-id="1191:550" data-name="Viewer body">
          <div className="fg-c54869ef1b" data-node-id="1191:551" data-name="Story details">
            <p className="fg-413bf14193" dir="auto" data-node-id="1191:552">
              درباره این روایت
            </p>
            <p className="fg-8d061bd1ec" dir="auto" data-node-id="1191:553">
              مریم سهرابی با ۱۲ سال تجربه در کارگاه اصفهان، بر ترکیب لعاب، رنگ و آتش تسلط دارد. آثار او نه تنها به‌عنوان اثر هنری که به‌عنوان بخشی از دکوراسیون و هویت خانه‌های ایرانی شناخته می‌شود. هر اثر با دقت قلم‌گیری، چندین مرحله لعاب‌کاری و تثبیت در کوره خلق می‌شود تا نتیجه‌ای ماندگار و یکتای ایرانی داشته باشد.
            </p>
            <div className="fg-65355ef526" data-node-id="1191:554" data-name="Artist bio">
              <p className="fg-249d7a7440" dir="auto" data-node-id="1191:555">
                درباره هنرمند
              </p>
              <p className="fg-b8397999f6" dir="auto" data-node-id="1191:556">
                رنگ و آتش را به نقش‌هایی ماندگار برای خانه‌های امروز تبدیل می‌کنم.
              </p>
              <div className="fg-e10cb974a7" data-node-id="1191:557" data-name="Credibility chips">
                <div className="fg-1458992fcf" data-node-id="1191:558" data-name="Frame">
                  <p className="fg-13645c1b54" dir="auto" data-node-id="1191:559">
                    تأییدشده نگارین
                  </p>
                </div>
                <div className="fg-1458992fcf" data-node-id="1191:560" data-name="Frame">
                  <p className="fg-13645c1b54" dir="auto" data-node-id="1191:561">
                    کارگاه اصفهان
                  </p>
                </div>
                <div className="fg-1458992fcf" data-node-id="1191:562" data-name="Frame">
                  <p className="fg-13645c1b54" dir="auto" data-node-id="1191:563">
                    ۱۲ سال سابقه
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-cca2204899" data-node-id="1191:564" data-name="Related product">
              <div className="fg-d429e06d5f" data-node-id="1191:565" data-name="Frame">
                <p className="fg-71037d7258" dir="auto" data-node-id="1191:566">
                  محصول مرتبط
                </p>
                <p className="fg-02da03f5fa" dir="auto" data-node-id="1191:567">
                  بشقاب میناکاری آبیِ نقش‌جهان
                </p>
              </div>
              <div className="fg-cb5660b1e7" data-node-id="1191:568" data-name="Frame">
                <div className="fg-a7290a2a6a" data-node-id="1191:569" data-name="Rectangle">
                  <img alt="" className="fg-7f65b5d6bb" src="/customer-web-assets/5ee740a5.png" />
                </div>
                <div className="fg-1cda3131c3" data-node-id="1191:570" data-name="Frame">
                  <p className="fg-e96f100936" dir="auto" data-node-id="1191:571">
                    اثر مریم سهرابی
                  </p>
                  <p className="fg-ef7095d9fc" dir="auto" data-node-id="1191:572">
                    ۲٬۴۸۰٬۰۰۰ تومان
                  </p>
                </div>
              </div>
              <NegarinButton className="fg-a900263ddf" label="مشاهده محصول" size="Medium" />
            </div>
          </div>
          <div className="fg-0911d11db5" data-node-id="1191:576" data-name="Sidebar">
            <div className="fg-cca2204899" data-node-id="1191:577" data-name="Artist card">
              <div className="fg-a14631f11c" data-node-id="1191:578" data-name="Frame">
                <div className="fg-3d51711349" data-node-id="1191:579" data-name="Ellipse">
                  <div className="fg-323fcffdb2">
                    <img alt="" className="fg-acc3667e96" height="72" src="/customer-web-assets/95692c10.png" width="72" />
                  </div>
                </div>
                <div className="fg-57c13d9488" data-node-id="1191:580" data-name="Frame">
                  <p className="fg-7320b0b031" dir="auto" data-node-id="1191:581">
                    مریم سهرابی
                  </p>
                  <p className="fg-d1c0cea3bd" dir="auto" data-node-id="1191:582">
                    هنرمند تأییدشده میناکاری از اصفهان
                  </p>
                </div>
              </div>
              <p className="fg-bb808a362f" dir="auto" data-node-id="1191:583">
                رنگ و آتش را به نقش‌هایی ماندگار برای خانه‌های امروز تبدیل می‌کنم.
              </p>
              <div className="fg-3cb53632f1" data-node-id="1191:584" data-name="Frame">
                <div className="fg-9e3517d3fe" data-node-id="1191:585" data-name="Frame">
                  <p className="fg-34f9f973f6" dir="auto" data-node-id="1191:586">
                    سابقه هنری
                  </p>
                  <p className="fg-719ee233d9" dir="auto" data-node-id="1191:587">
                    ۱۲ سال
                  </p>
                </div>
                <div className="fg-9e3517d3fe" data-node-id="1191:588" data-name="Frame">
                  <p className="fg-34f9f973f6" dir="auto" data-node-id="1191:589">
                    آثار در فروشگاه
                  </p>
                  <p className="fg-719ee233d9" dir="auto" data-node-id="1191:590">
                    ۴ اثر
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-cca2204899" data-node-id="1191:591" data-name="Related stories">
              <p className="fg-249d7a7440" dir="auto" data-node-id="1191:592">
                روایت‌های دیگر هنرمند
              </p>
              <div className="fg-9a673af06a" data-node-id="1191:593" data-name="Frame">
                <div className="fg-0a09a79c4c" data-node-id="1191:594" data-name="Frame">
                  <p className="fg-b72ba594c7" dir="auto" data-node-id="1191:595">
                    ۱۴ اردیبهشت ۱۴۰۳
                  </p>
                  <p className="fg-fabc7db0ce" dir="auto" data-node-id="1191:596">
                    نقش‌زدن یک ترنج
                  </p>
                </div>
                <p className="fg-38ca229380" dir="auto" data-node-id="1191:597">
                  روایت مرتبط با گلدان میناکاری ترنج
                </p>
                <NegarinButton className="fg-321947be2e" label="مشاهده روایت" />
              </div>
              <div className="fg-9a673af06a" data-node-id="1191:600" data-name="Frame">
                <div className="fg-0a09a79c4c" data-node-id="1191:601" data-name="Frame">
                  <p className="fg-b72ba594c7" dir="auto" data-node-id="1191:602">
                    ۲۸ فروردین ۱۴۰۳
                  </p>
                  <p className="fg-fabc7db0ce" dir="auto" data-node-id="1191:603">
                    صبح‌های کارگاه
                  </p>
                </div>
                <p className="fg-38ca229380" dir="auto" data-node-id="1191:604">
                  روایت بدون محصول مرتبط
                </p>
                <NegarinButton className="fg-321947be2e" label="مشاهده روایت" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
