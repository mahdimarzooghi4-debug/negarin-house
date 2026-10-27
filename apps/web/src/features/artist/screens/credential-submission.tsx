// Figma 316:10 — Artist / Credential Submission — Desktop
import { DesignAction, DesignField, DesignUpload, DesignChoice } from "../design-controls";
import { ArtistSidebar } from "../artist-sidebar";

export default function ArtistCredentialSubmissionDesktop() {
  return (
    <div className="fg-3d2c2bcc0e" data-node-id="316:10" data-name="Artist / Credential Submission — Desktop">
      <div className="fg-24990da9c2" data-node-id="316:11" data-name="Artist / Main">
        <div className="fg-e1f4917983" data-node-id="318:2" data-name="Credential Submission / Header">
          <div className="fg-24cb66ce62" data-node-id="318:3">
            <p className="fg-32bd4c7660" dir="auto">
              ارسال مدرک حرفه‌ای
            </p>
          </div>
          <div className="fg-5d6658a75e" data-node-id="318:4">
            <p className="fg-32bd4c7660" dir="auto">
              ارسال اختیاری مدرک برای دریافت نشان تأیید حرفه‌ای نگارین
            </p>
          </div>
          <DesignAction className="fg-55871d140a" data-node-id="318:5" data-name="Back Button" destination="professional-credentials" label="بازگشت به مدارک">
            <div className="fg-f6fd144817" data-node-id="318:6">
              <p className="fg-32bd4c7660" dir="auto">
                بازگشت به مدارک
              </p>
            </div>
          </DesignAction>
        </div>
        <div className="fg-32a3a53908" data-node-id="318:7" data-name="Credential Submission / Intro">
          <div className="fg-d2677626b4" data-node-id="318:10">
            <p className="fg-32bd4c7660" dir="auto">
              اگر مدرک حرفه‌ای داری، می‌توانی آن را ارسال کنی
            </p>
          </div>
          <div className="fg-0cae731aa2" data-node-id="318:11">
            <p className="fg-32bd4c7660" dir="auto">
              داشتن مدرک برای عضویت، فعال‌شدن فروشگاه یا فروش الزامی نیست. فقط اگر مدرک معتبر ارسال و تأیید شود، نشان آبی «هنرمند تأییدشده نگارین» در پروفایل عمومی نمایش داده می‌شود.
            </p>
          </div>
          <div className="fg-fb6d678a99" data-node-id="318:8" data-name="Status Pill">
            <div className="fg-ff6fe564b6" data-node-id="318:9">
              <p className="fg-32bd4c7660" dir="auto">
                اختیاری
              </p>
            </div>
          </div>
        </div>
        <div className="fg-356692db6d" data-node-id="318:12" data-name="Credential Submission / Accepted Types">
          <div className="fg-ff0f824d45" data-node-id="318:13">
            <p className="fg-32bd4c7660" dir="auto">
              مدارک قابل پذیرش
            </p>
          </div>
          <div className="fg-bbba051c62" data-node-id="318:14">
            <p className="fg-32bd4c7660" dir="auto">
              یکی از مدارک معتبر زیر را انتخاب کن
            </p>
          </div>
          <div className="fg-222c2a79c3" data-node-id="318:21">
            <p className="fg-32bd4c7660" dir="auto">
              ارسال نکردن مدرک مانع فعالیت، فروش یا رشد هنرمند نمی‌شود.
            </p>
          </div>
          <div className="fg-57a999056f" data-node-id="318:15" data-name="Accepted / TVTO">
            <div className="fg-254e3f4d54" data-node-id="318:16">
              <p className="fg-32bd4c7660" dir="auto">
                گواهینامه سازمان فنی‌وحرفه‌ای
              </p>
            </div>
            <div className="fg-c6bdd8a022" data-node-id="318:17">
              <p className="fg-32bd4c7660" dir="auto">
                گواهی معتبر مرتبط با رشته یا مهارت حرفه‌ای
              </p>
            </div>
          </div>
          <div className="fg-d562a00086" data-node-id="318:18" data-name="Accepted / Heritage License">
            <div className="fg-591c3016ba" data-node-id="318:19">
              <p className="fg-32bd4c7660" dir="auto">
                مجوز وزارت میراث فرهنگی، گردشگری و صنایع‌دستی
              </p>
            </div>
            <div className="fg-5c27407ca3" data-node-id="318:20">
              <p className="fg-32bd4c7660" dir="auto">
                مجوز معتبر فعالیت حرفه‌ای در حوزه صنایع‌دستی
              </p>
            </div>
          </div>
        </div>
        <div className="fg-6422e6cb2e" data-node-id="318:22" data-name="Credential Submission / Form">
          <div className="fg-f1674c75fa" data-node-id="318:23">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات مدرک
            </p>
          </div>
          <div className="fg-d847c2617a" data-node-id="318:24">
            <p className="fg-32bd4c7660" dir="auto">
              اطلاعات را مطابق مدرک بارگذاری‌شده وارد کن
            </p>
          </div>
          <div className="fg-e2dc430884" data-node-id="318:25">
            <p className="fg-32bd4c7660" dir="auto">
              نوع مدرک
            </p>
          </div>
          <div className="fg-8ad7c9daf0" data-node-id="318:31">
            <p className="fg-32bd4c7660" dir="auto">
              شماره مدرک / مجوز
            </p>
          </div>
          <div className="fg-e8a0621bdf" data-node-id="318:34">
            <p className="fg-32bd4c7660" dir="auto">
              تاریخ اعتبار
            </p>
          </div>
          <div className="fg-b1fe3388d2" data-node-id="318:37">
            <p className="fg-32bd4c7660" dir="auto">
              فایل مدرک
            </p>
          </div>
          <div className="fg-645226978e" data-node-id="318:43">
            <p className="fg-32bd4c7660" dir="auto">
              یادداشت اختیاری
            </p>
          </div>
          <div className="fg-d0244f8e79" data-node-id="318:26" data-name="Credential Type Selector">
            <DesignChoice className="fg-afa1a8f211" data-node-id="318:27" data-name="Radio 1" label="Radio 1" group="Credential Type Selector" initial={false}>
              <img alt="" className="fg-8faf267d30" src="/artist-assets/10ae2195ab4c6c5.svg" />
            </DesignChoice>
            <div className="fg-babfe7f6e2" data-node-id="318:28">
              <p className="fg-32bd4c7660" dir="auto">
                گواهینامه سازمان فنی‌وحرفه‌ای
              </p>
            </div>
            <DesignChoice className="fg-c0366d2d5b" data-node-id="318:29" data-name="Radio 2" label="Radio 2" group="Credential Type Selector" initial={false}>
              <img alt="" className="fg-8faf267d30" src="/artist-assets/3f56b7a6deb56cea.svg" />
            </DesignChoice>
            <div className="fg-6dbc3b08c7" data-node-id="318:30">
              <p className="fg-32bd4c7660" dir="auto">
                مجوز وزارت میراث فرهنگی، گردشگری و صنایع‌دستی
              </p>
            </div>
          </div>
          <DesignField className="fg-5aabd06825" data-node-id="318:32" data-name="شماره مدرک / مجوز / Field" label="شماره مدرک / مجوز" placeholder="شماره درج‌شده روی مدرک">
            <div className="fg-ac10d7cc7f" data-node-id="318:33">
              <p className="fg-32bd4c7660" dir="auto">
                شماره درج‌شده روی مدرک
              </p>
            </div>
          </DesignField>
          <DesignField className="fg-a15cb36edb" data-node-id="318:35" data-name="تاریخ اعتبار / Field" label="تاریخ اعتبار" placeholder="تاریخ پایان اعتبار مدرک">
            <div className="fg-ac10d7cc7f" data-node-id="318:36">
              <p className="fg-32bd4c7660" dir="auto">
                تاریخ پایان اعتبار مدرک
              </p>
            </div>
          </DesignField>
          <div className="fg-b13849abe5" data-node-id="318:38" data-name="Credential Upload Field">
            <div className="fg-636a99d50e" data-node-id="318:39">
              <p className="fg-32bd4c7660" dir="auto">
                بارگذاری تصویر یا فایل مدرک
              </p>
            </div>
            <div className="fg-dba592e10f" data-node-id="318:40">
              <p className="fg-32bd4c7660" dir="auto">
                فایل خوانا و کامل از مدرک معتبر
              </p>
            </div>
            <DesignUpload className="fg-ddfa22331b" data-node-id="318:41" data-name="Upload Button" label="Upload Button">
              <div className="fg-322a38161f" data-node-id="318:42">
                <p className="fg-32bd4c7660" dir="auto">
                  انتخاب فایل
                </p>
              </div>
            </DesignUpload>
          </div>
          <DesignField className="fg-feea49b165" data-node-id="318:44" data-name="یادداشت اختیاری / Field" label="یادداشت اختیاری" placeholder="در صورت نیاز توضیح کوتاه اضافه کن">
            <div className="fg-a7f5b15094" data-node-id="318:45">
              <p className="fg-32bd4c7660" dir="auto">
                در صورت نیاز توضیح کوتاه اضافه کن
              </p>
            </div>
          </DesignField>
        </div>
        <div className="fg-3121b509a8" data-node-id="318:46" data-name="Credential Submission / Independence Note">
          <div className="fg-3e01ecaeed" data-node-id="318:47">
            <p className="fg-32bd4c7660" dir="auto">
              مدرک حرفه‌ای اختیاری است
            </p>
          </div>
          <div className="fg-25526289c4" data-node-id="318:48">
            <p className="fg-32bd4c7660" dir="auto">
              بدون مدرک هم می‌توانی عضو باشی، فروشگاه فعال داشته باشی و فروش انجام دهی. تأیید مدرک فقط یک نشان مستقل برای اعتبار حرفه‌ای است و سطح رشد را تغییر نمی‌دهد.
            </p>
          </div>
        </div>
        <div className="fg-549108a113" data-node-id="318:49" data-name="Credential Submission / Actions">
          <div className="fg-68bcfd1276" data-node-id="318:50">
            <p className="fg-32bd4c7660" dir="auto">
              اگر مدرک ارسال کنی، وضعیت آن به «در حال بررسی» تغییر می‌کند.
            </p>
          </div>
          <DesignAction className="fg-a3513d9c33" data-node-id="318:51" data-name="Submit Credential" destination="credential-under-review" label="ارسال برای بررسی">
            <p className="fg-7ee08abcb6" dir="auto" data-node-id="I318:51;45:11">
              ارسال برای بررسی
            </p>
          </DesignAction>
          <DesignAction className="fg-e48315ea40" data-node-id="318:53" data-name="Cancel Button" destination="professional-credentials" label="انصراف">
            <div className="fg-81ee7e82e1" data-node-id="318:54">
              <p className="fg-32bd4c7660" dir="auto">
                انصراف
              </p>
            </div>
          </DesignAction>
        </div>
      </div>
      <ArtistSidebar variant="sidebar-6d35b434a6" />
    </div>
  );
}