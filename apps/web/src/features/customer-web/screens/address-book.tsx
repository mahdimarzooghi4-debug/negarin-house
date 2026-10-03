// Native Figma 1180:2440 — Customer / Address Book - Web
import {CustomerAction} from "../customer-controls";
import {DesignField} from "../../artist/design-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Large";
  state?: "Default";
  style?: "Primary" | "Secondary";
};

function NegarinButton({ className, label = "ادامه", size = "Large", state = "Default", style = "Primary" }: NegarinButtonProps) {
  const isSecondaryAndLargeAndDefault = style === "Secondary" && size === "Large" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isSecondaryAndLargeAndDefault ? "node-46_20" : "node-46_8"} label={label}>
      {style === "Primary" && size === "Large" && state === "Default" && (
        <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:9">
          {label}
        </p>
      )}
      {isSecondaryAndLargeAndDefault && (
        <p className="fg-e4a7d61a6f" dir="auto" data-node-id="46:21">
          {label}
        </p>
      )}
    </CustomerAction>
  );
}

export default function CustomerAddressBookWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1180:2440" data-name="Customer / Address Book - Web">
      <div className="fg-6f037ae468" data-node-id="1180:2441" data-name="Desktop header">
        <div className="fg-8f04d00ba8" data-node-id="1180:2442" data-name="Customer actions">
          <div className="fg-3d7277edba" data-node-id="1180:2443" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2444">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2445" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1180:2446" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2447">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2448" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1180:2449" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1180:2450">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1180:2451" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1180:2452" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2453" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2454" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1180:2455" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1180:2456" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1180:2457" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1180:2458">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1180:2459">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1180:2460" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-641e585cf3" data-node-id="1180:2461" data-name="Page heading">
        <div className="fg-24380cf9d7" data-node-id="1180:2462" data-name="Heading accent">
          <p className="fg-440e08aff4" data-node-id="1180:2463">
            location_on
          </p>
        </div>
        <div className="fg-392f643781" data-node-id="1180:2464" data-name="Heading copy">
          <p className="fg-3b2de6ae27" dir="auto" data-node-id="1180:2465">
            آدرس‌های تحویل
          </p>
          <p className="fg-3f8a9e3928" dir="auto" data-node-id="1180:2466">
            آدرس‌ها را ذخیره کن تا هنگام تکمیل خرید، نشانی مناسب را سریع انتخاب کنی.
          </p>
        </div>
      </div>
      <div className="fg-bc05a3ea97" data-node-id="1180:2467" data-name="Address workspace">
        <div className="fg-1746f0535d" data-node-id="1180:2468" data-name="Saved addresses">
          <div className="fg-ba13029937" data-node-id="1180:2469" data-name="Section heading">
            <p className="fg-24992208b4" dir="auto" data-node-id="1180:2470">
              آدرس‌های ذخیره‌شده
            </p>
            <p className="fg-923e8ecac0" dir="auto" data-node-id="1180:2471">
              یکی از آدرس‌ها را برای تحویل انتخاب کن.
            </p>
          </div>
          <div className="fg-2372b0288f" data-node-id="1180:2472" data-name="Saved address">
            <div className="fg-a14631f11c" data-node-id="1180:2473" data-name="Address heading">
              <CustomerAction className="fg-d1b1b05c92" data-node-id="1180:2474" data-name="Selection" label="انتخاب‌شده">
                <div className="fg-b2a182ecf4" data-node-id="1180:2475" data-name="Radio">
                  <img alt="" className="fg-8faf267d30" src="/customer-web-assets/5729d8e2.svg" />
                </div>
                <p className="fg-585f829b1a" dir="auto" data-node-id="1180:2476">
                  انتخاب‌شده
                </p>
              </CustomerAction>
              <div className="fg-4cdde57f17" data-node-id="1180:2477" data-name="Address identity">
                <div className="fg-9eda404c6f" data-node-id="1180:2478" data-name="Address copy">
                  <p className="fg-dd958381dd" dir="auto" data-node-id="1180:2479">
                    آدرس تحویل پیش‌فرض
                  </p>
                  <p className="fg-6af90b7b6a" dir="auto" data-node-id="1180:2480">
                    پیش‌فرض
                  </p>
                </div>
                <p className="fg-d2b3618773" data-node-id="1180:2481">
                  location_on
                </p>
              </div>
            </div>
            <p className="fg-997883c36c" dir="auto" data-node-id="1180:2482">
              تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچه نگار، پلاک ۲۴، واحد ۳
            </p>
            <p className="fg-38ca229380" dir="auto" data-node-id="1180:2483">
              گیرنده: مریم احمدی · ۰۹۱۲ ۱۲۳ ۴۵۶۷
            </p>
            <div className="fg-966f6893f1" data-node-id="1180:2484" data-name="Address actions">
              <CustomerAction className="fg-08997833ac" data-node-id="1180:2485" data-name="Remove action" label="delete_outline حذف">
                <p className="fg-49ddcd9150" data-node-id="1180:2486">
                  delete_outline
                </p>
                <p className="fg-d95a381b97" dir="auto" data-node-id="1180:2487">
                  حذف
                </p>
              </CustomerAction>
              <CustomerAction className="fg-068b3f3be7" data-node-id="1180:2488" data-name="Edit action" label="edit ویرایش">
                <p className="fg-49ddcd9150" data-node-id="1180:2489">
                  edit
                </p>
                <p className="fg-d95a381b97" dir="auto" data-node-id="1180:2490">
                  ویرایش
                </p>
              </CustomerAction>
            </div>
          </div>
          <div className="fg-13af6e5ce0" data-node-id="1180:2491" data-name="Saved address">
            <div className="fg-a14631f11c" data-node-id="1180:2492" data-name="Address heading">
              <CustomerAction className="fg-d1b1b05c92" data-node-id="1180:2493" data-name="Selection" label="انتخاب آدرس">
                <div className="fg-b2a182ecf4" data-node-id="1180:2494" data-name="Radio">
                  <img alt="" className="fg-8faf267d30" src="/customer-web-assets/9136b58b.svg" />
                </div>
                <p className="fg-f59bffd33b" dir="auto" data-node-id="1180:2495">
                  انتخاب آدرس
                </p>
              </CustomerAction>
              <div className="fg-c9f7e7b263" data-node-id="1180:2496" data-name="Address identity">
                <div className="fg-75545099af" data-node-id="1180:2497" data-name="Address copy">
                  <p className="fg-1685345637" dir="auto" data-node-id="1180:2498">
                    آدرس محل کار
                  </p>
                </div>
                <p className="fg-7fb9e5c6f9" data-node-id="1180:2499">
                  location_on
                </p>
              </div>
            </div>
            <p className="fg-997883c36c" dir="auto" data-node-id="1180:2500">
              تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچه نگار، پلاک ۲۴، واحد ۳
            </p>
            <p className="fg-38ca229380" dir="auto" data-node-id="1180:2501">
              گیرنده: مریم احمدی · ۰۹۱۲ ۱۲۳ ۴۵۶۷
            </p>
            <div className="fg-966f6893f1" data-node-id="1180:2502" data-name="Address actions">
              <CustomerAction className="fg-08997833ac" data-node-id="1180:2503" data-name="Remove action" label="delete_outline حذف">
                <p className="fg-49ddcd9150" data-node-id="1180:2504">
                  delete_outline
                </p>
                <p className="fg-d95a381b97" dir="auto" data-node-id="1180:2505">
                  حذف
                </p>
              </CustomerAction>
              <CustomerAction className="fg-068b3f3be7" data-node-id="1180:2506" data-name="Edit action" label="edit ویرایش">
                <p className="fg-49ddcd9150" data-node-id="1180:2507">
                  edit
                </p>
                <p className="fg-d95a381b97" dir="auto" data-node-id="1180:2508">
                  ویرایش
                </p>
              </CustomerAction>
            </div>
          </div>
          <NegarinButton className="fg-a9c1ba3b38" label="افزودن آدرس جدید" />
          <div className="fg-09522c0784" data-node-id="1180:2512" data-name="Privacy note">
            <p className="fg-34f8a9e4d3" dir="auto" data-node-id="1180:2513">
              اطلاعات آدرس فقط برای ارسال سفارش و مدیریت تحویل استفاده می‌شود.
            </p>
            <p className="fg-0fcc229d74" data-node-id="1180:2514">
              lock_outline
            </p>
          </div>
        </div>
        <div className="fg-a96e74522b" data-node-id="1180:2515" data-name="Address form">
          <div className="fg-867e292a20" data-node-id="1180:2516" data-name="Form intro">
            <div className="fg-ee2d7296e1" data-node-id="1180:2517" data-name="Intro copy">
              <p className="fg-06368e013e" dir="auto" data-node-id="1180:2518">
                افزودن یا ویرایش آدرس
              </p>
              <p className="fg-923e8ecac0" dir="auto" data-node-id="1180:2519">
                اطلاعات آدرس را تکمیل یا اصلاح کن؛ این نشانی در مرحله تکمیل خرید قابل انتخاب است.
              </p>
            </div>
            <p className="fg-32e3ff026b" data-node-id="1180:2520">
              add_location_alt
            </p>
          </div>
          <div className="fg-ba13029937" data-node-id="1180:2521" data-name="Section heading">
            <p className="fg-24992208b4" dir="auto" data-node-id="1180:2522">
              اطلاعات تحویل
            </p>
            <p className="fg-923e8ecac0" dir="auto" data-node-id="1180:2523">
              همه اطلاعات این فرم به زبان فارسی ثبت می‌شود.
            </p>
          </div>
          <div className="fg-4fae23d7ee" data-node-id="1180:2524" data-name="Recipient fields">
            <DesignField className="fg-528f4fe7f5" data-node-id="1180:2525" data-name="Address field" label="شماره موبایل ۰۹۱۲ ۱۲۳" placeholder="شماره موبایل ۰۹۱۲ ۱۲۳ ۴۵۶۷ smartphone">
              <div className="fg-1d9f7dd7f1" data-node-id="1180:2526" data-name="Field copy">
                <p className="fg-838c3173a4" dir="auto" data-node-id="1180:2527">
                  شماره موبایل
                </p>
                <p className="fg-e2589f573d" data-node-id="1180:2528">
                  ۰۹۱۲ ۱۲۳ ۴۵۶۷
                </p>
              </div>
              <p className="fg-0c383a7b37" data-node-id="1180:2529">
                smartphone
              </p>
            </DesignField>
            <DesignField className="fg-528f4fe7f5" data-node-id="1180:2530" data-name="Address field" label="نام گیرنده مریم احمدی" placeholder="نام گیرنده مریم احمدی person">
              <div className="fg-1d9f7dd7f1" data-node-id="1180:2531" data-name="Field copy">
                <p className="fg-838c3173a4" dir="auto" data-node-id="1180:2532">
                  نام گیرنده
                </p>
                <p className="fg-e2589f573d" dir="auto" data-node-id="1180:2533">
                  مریم احمدی
                </p>
              </div>
              <p className="fg-0c383a7b37" data-node-id="1180:2534">
                person
              </p>
            </DesignField>
          </div>
          <div className="fg-4fae23d7ee" data-node-id="1180:2535" data-name="Location fields">
            <DesignField className="fg-528f4fe7f5" data-node-id="1180:2536" data-name="Address field" label="شهر تهران location_city" placeholder="شهر تهران location_city">
              <div className="fg-1d9f7dd7f1" data-node-id="1180:2537" data-name="Field copy">
                <p className="fg-838c3173a4" dir="auto" data-node-id="1180:2538">
                  شهر
                </p>
                <p className="fg-e2589f573d" dir="auto" data-node-id="1180:2539">
                  تهران
                </p>
              </div>
              <p className="fg-0c383a7b37" data-node-id="1180:2540">
                location_city
              </p>
            </DesignField>
            <DesignField className="fg-528f4fe7f5" data-node-id="1180:2541" data-name="Address field" label="استان تهران map" placeholder="استان تهران map">
              <div className="fg-1d9f7dd7f1" data-node-id="1180:2542" data-name="Field copy">
                <p className="fg-838c3173a4" dir="auto" data-node-id="1180:2543">
                  استان
                </p>
                <p className="fg-e2589f573d" dir="auto" data-node-id="1180:2544">
                  تهران
                </p>
              </div>
              <p className="fg-0c383a7b37" data-node-id="1180:2545">
                map
              </p>
            </DesignField>
          </div>
          <DesignField className="fg-2b653c7949" data-node-id="1180:2546" data-name="Address field" label="کد پستی ۱۹۶۷۶۵۴۳۲۱ markunread_mailbox" placeholder="کد پستی ۱۹۶۷۶۵۴۳۲۱ markunread_mailbox">
            <div className="fg-1d9f7dd7f1" data-node-id="1180:2547" data-name="Field copy">
              <p className="fg-838c3173a4" dir="auto" data-node-id="1180:2548">
                کد پستی
              </p>
              <p className="fg-e2589f573d" data-node-id="1180:2549">
                ۱۹۶۷۶۵۴۳۲۱
              </p>
            </div>
            <p className="fg-0c383a7b37" data-node-id="1180:2550">
              markunread_mailbox
            </p>
          </DesignField>
          <DesignField className="fg-fa59d75371" data-node-id="1180:2551" data-name="Address field" label="آدرس کامل خیابان ولیعصر،" placeholder="آدرس کامل خیابان ولیعصر، بالاتر از پارک ساعی، کوچه نگار، پلاک ۲۴، واحد ۳ home_work">
            <div className="fg-1d9f7dd7f1" data-node-id="1180:2552" data-name="Field copy">
              <p className="fg-838c3173a4" dir="auto" data-node-id="1180:2553">
                آدرس کامل
              </p>
              <p className="fg-e2589f573d" dir="auto" data-node-id="1180:2554">
                خیابان ولیعصر، بالاتر از پارک ساعی، کوچه نگار، پلاک ۲۴، واحد ۳
              </p>
            </div>
            <p className="fg-0c383a7b37" data-node-id="1180:2555">
              home_work
            </p>
          </DesignField>
          <div className="fg-ee1cee4ce0" data-node-id="1180:2556" data-name="Default setting">
            <CustomerAction className="fg-8830da3b2e" data-node-id="1180:2557" data-name="Toggle" label="">
              <img alt="" className="fg-8faf267d30" src="/customer-web-assets/7cfeadce.svg" />
            </CustomerAction>
            <div className="fg-4cdde57f17" data-node-id="1180:2559" data-name="Default copy">
              <p className="fg-818988fd4b" dir="auto" data-node-id="1180:2560">
                این آدرس به‌عنوان آدرس پیش‌فرض ذخیره شود
              </p>
              <p className="fg-c83f865187" data-node-id="1180:2561">
                star_outline
              </p>
            </div>
          </div>
          <div className="fg-e10cb974a7" data-node-id="1180:2562" data-name="Form actions">
            <NegarinButton className="fg-154029f4f7" label="انصراف" style="Secondary" />
            <NegarinButton className="fg-b37cd6aeab" label="ذخیره آدرس" />
          </div>
        </div>
      </div>
      <div className="fg-ebe0531eb3" data-node-id="1180:2569" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1180:2570" data-name="Footer content">
          <div className="fg-e1c7d3948f" data-node-id="1180:2571" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1180:2572">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1180:2573">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2574" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2575" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
          <div className="fg-e1c7d3948f" data-node-id="1180:2576" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1180:2577">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2578" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2579" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1180:2580" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-dda4a8e5f9" data-node-id="1180:2581" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1180:2582" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1180:2583">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1180:2584">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1180:2585" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-8638944801" data-node-id="1180:2586" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1180:2587">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1180:2588">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
