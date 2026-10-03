// Native Figma 1198:1338 — Customer / Favorites — Web
import {CustomerAction} from "../customer-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Small";
  state?: "Default";
  style?: "Primary" | "Danger";
};

function NegarinButton({ className, label = "ادامه", size = "Small", state = "Default", style = "Primary" }: NegarinButtonProps) {
  const isDangerAndSmallAndDefault = style === "Danger" && size === "Small" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isDangerAndSmallAndDefault ? "node-46_36" : "node-46_2"} label={label}>
      {style === "Primary" && size === "Small" && state === "Default" && (
        <p className="fg-1daf25f4c0" dir="auto" data-node-id="46:3">
          {label}
        </p>
      )}
      {isDangerAndSmallAndDefault && (
        <p className="fg-7bef705492" dir="auto" data-node-id="46:37">
          {label}
        </p>
      )}
    </CustomerAction>
  );
}

export default function CustomerFavoritesWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1198:1338" data-name="Customer / Favorites — Web">
      <div className="fg-6f037ae468" data-node-id="1198:1339" data-name="Desktop header">
        <div className="fg-8f04d00ba8" data-node-id="1198:1340" data-name="Customer actions">
          <div className="fg-d263b583e1" data-node-id="1198:1341" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1342">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1343" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1198:1344" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1345">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1346" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-3d7277edba" data-node-id="1198:1347" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1348">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1349" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1198:1350" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1351" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1352" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1353" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1198:1354" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1198:1355" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1198:1356">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1198:1357">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1198:1358" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-641e585cf3" data-node-id="1198:1359" data-name="Page heading">
        <div className="fg-24380cf9d7" data-node-id="1198:1360" data-name="Heading accent">
          <p className="fg-440e08aff4" data-node-id="1198:1361">
            favorite_border
          </p>
        </div>
        <div className="fg-26054c25d0" data-node-id="1198:1362" data-name="Heading copy">
          <p className="fg-3b2de6ae27" dir="auto" data-node-id="1198:1363">
            علاقه‌مندی‌های من
          </p>
          <p className="fg-3f8a9e3928" dir="auto" data-node-id="1198:1364">
            آثار محبوبت را یک‌جا نگه دار، مقایسه کن و هر وقت آماده بودی به صفحه محصول برو.
          </p>
        </div>
      </div>
      <div className="fg-384d72b743" data-node-id="1198:1365" data-name="Favorites content">
        <div className="fg-0a09a79c4c" data-node-id="1198:1366" data-name="Collection controls">
          <CustomerAction className="fg-0b98d4113a" data-node-id="1198:1367" data-name="Sort control" label="تازه‌ترین ذخیره‌ها sort">
            <p className="fg-0911c133e6" dir="auto" data-node-id="1198:1368">
              تازه‌ترین ذخیره‌ها
            </p>
            <p className="fg-f63fadfb46" data-node-id="1198:1369">
              sort
            </p>
          </CustomerAction>
          <div className="fg-335cd1bbca" data-node-id="1198:1370" data-name="Collection summary">
            <p className="fg-cbf2c4bfe6" dir="auto" data-node-id="1198:1371">
              آثار ذخیره‌شده
            </p>
            <p className="fg-b72ba594c7" dir="auto" data-node-id="1198:1372">
              ۴ اثر در علاقه‌مندی‌های تو
            </p>
          </div>
        </div>
        <div className="fg-3a63c83c7f" data-node-id="1198:1373" data-name="Favorite products">
          <div className="fg-462efdcecd" data-node-id="1198:1374" data-name="Favorite product card">
            <div className="fg-0653586f90" data-node-id="1198:1375" data-name="Product media">
              <div className="fg-10552d7368" data-node-id="1198:1376" data-name="Product image">
                <img alt="" className="fg-6296272086" src="/customer-web-assets/05637143.png" />
              </div>
              <div className="fg-dc1339af5f" data-node-id="1198:1377" data-name="Saved marker">
                <p className="fg-9b07ad86fc" data-node-id="1198:1378">
                  bookmark
                </p>
              </div>
              <div className="fg-62387e402f" data-node-id="1198:1379" data-name="Category tag">
                <p className="fg-9fef477172" dir="auto" data-node-id="1198:1380">
                  میناکاری
                </p>
              </div>
            </div>
            <div className="fg-f66c14e190" data-node-id="1198:1381" data-name="Product details">
              <p className="fg-1376618a75" dir="auto" data-node-id="1198:1382">
                بشقاب میناکاری طرح شاه‌عباسی
              </p>
              <p className="fg-f93bee5b75" dir="auto" data-node-id="1198:1383">
                اثر زهرا محمدی
              </p>
              <p className="fg-826fb50f4c" dir="auto" data-node-id="1198:1384">
                ۲,۴۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-4a6cc29e39" data-node-id="1198:1385" data-name="Product actions">
              <NegarinButton className="fg-972741ee8f" label="حذف از علاقه‌مندی‌ها" style="Danger" />
              <NegarinButton className="fg-a4423dd39f" label="مشاهده محصول" />
            </div>
          </div>
          <div className="fg-462efdcecd" data-node-id="1198:1391" data-name="Favorite product card">
            <div className="fg-0653586f90" data-node-id="1198:1392" data-name="Product media">
              <div className="fg-10552d7368" data-node-id="1198:1393" data-name="Product image">
                <img alt="" className="fg-6296272086" src="/customer-web-assets/6b1dc3c4.png" />
              </div>
              <div className="fg-dc1339af5f" data-node-id="1198:1394" data-name="Saved marker">
                <p className="fg-9b07ad86fc" data-node-id="1198:1395">
                  bookmark
                </p>
              </div>
              <div className="fg-62387e402f" data-node-id="1198:1396" data-name="Category tag">
                <p className="fg-9fef477172" dir="auto" data-node-id="1198:1397">
                  گلیم
                </p>
              </div>
            </div>
            <div className="fg-f66c14e190" data-node-id="1198:1398" data-name="Product details">
              <p className="fg-1376618a75" dir="auto" data-node-id="1198:1399">
                گلیم دست‌بافت نقش هراتی
              </p>
              <p className="fg-f93bee5b75" dir="auto" data-node-id="1198:1400">
                اثر مریم رضایی
              </p>
              <p className="fg-826fb50f4c" dir="auto" data-node-id="1198:1401">
                ۳,۸۰۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-4a6cc29e39" data-node-id="1198:1402" data-name="Product actions">
              <NegarinButton className="fg-972741ee8f" label="حذف از علاقه‌مندی‌ها" style="Danger" />
              <NegarinButton className="fg-a4423dd39f" label="مشاهده محصول" />
            </div>
          </div>
          <div className="fg-462efdcecd" data-node-id="1198:1408" data-name="Favorite product card">
            <div className="fg-0653586f90" data-node-id="1198:1409" data-name="Product media">
              <div className="fg-10552d7368" data-node-id="1198:1410" data-name="Product image">
                <img alt="" className="fg-6296272086" src="/customer-web-assets/f6b2d00a.png" />
              </div>
              <div className="fg-dc1339af5f" data-node-id="1198:1411" data-name="Saved marker">
                <p className="fg-9b07ad86fc" data-node-id="1198:1412">
                  bookmark
                </p>
              </div>
              <div className="fg-62387e402f" data-node-id="1198:1413" data-name="Category tag">
                <p className="fg-9fef477172" dir="auto" data-node-id="1198:1414">
                  سفال
                </p>
              </div>
            </div>
            <div className="fg-f66c14e190" data-node-id="1198:1415" data-name="Product details">
              <p className="fg-1376618a75" dir="auto" data-node-id="1198:1416">
                گلدان سفالی لعاب فیروزه‌ای
              </p>
              <p className="fg-f93bee5b75" dir="auto" data-node-id="1198:1417">
                اثر سارا احمدی
              </p>
              <p className="fg-826fb50f4c" dir="auto" data-node-id="1198:1418">
                ۱,۲۸۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-4a6cc29e39" data-node-id="1198:1419" data-name="Product actions">
              <NegarinButton className="fg-972741ee8f" label="حذف از علاقه‌مندی‌ها" style="Danger" />
              <NegarinButton className="fg-a4423dd39f" label="مشاهده محصول" />
            </div>
          </div>
          <div className="fg-462efdcecd" data-node-id="1198:1425" data-name="Favorite product card">
            <div className="fg-0653586f90" data-node-id="1198:1426" data-name="Product media">
              <div className="fg-10552d7368" data-node-id="1198:1427" data-name="Product image">
                <img alt="" className="fg-6296272086" src="/customer-web-assets/237a0d49.png" />
              </div>
              <div className="fg-dc1339af5f" data-node-id="1198:1428" data-name="Saved marker">
                <p className="fg-9b07ad86fc" data-node-id="1198:1429">
                  bookmark
                </p>
              </div>
              <div className="fg-d3d3dc1cfe" data-node-id="1198:1430" data-name="Category tag">
                <p className="fg-9fef477172" dir="auto" data-node-id="1198:1431">
                  زیور
                </p>
              </div>
            </div>
            <div className="fg-f66c14e190" data-node-id="1198:1432" data-name="Product details">
              <p className="fg-1376618a75" dir="auto" data-node-id="1198:1433">
                گردنبند نقره و فیروزه
              </p>
              <p className="fg-f93bee5b75" dir="auto" data-node-id="1198:1434">
                اثر نسترن اکبری
              </p>
              <p className="fg-826fb50f4c" dir="auto" data-node-id="1198:1435">
                ۱,۷۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-4a6cc29e39" data-node-id="1198:1436" data-name="Product actions">
              <NegarinButton className="fg-972741ee8f" label="حذف از علاقه‌مندی‌ها" style="Danger" />
              <NegarinButton className="fg-a4423dd39f" label="مشاهده محصول" />
            </div>
          </div>
        </div>
        <div className="fg-9b928c4bcc" data-node-id="1198:1442" data-name="Collection note">
          <p className="fg-57c80ef35e" dir="auto" data-node-id="1198:1443">
            موجودی آثار دست‌ساز محدود است؛ پیش از خرید، صفحه محصول و زمان آماده‌سازی را بررسی کن.
          </p>
          <p className="fg-0fcc229d74" data-node-id="1198:1444">
            notifications_none
          </p>
        </div>
      </div>
      <div className="fg-ebe0531eb3" data-node-id="1198:1445" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1198:1446" data-name="Footer content">
          <div className="fg-e1c7d3948f" data-node-id="1198:1447" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1198:1448">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1198:1449">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1450" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1198:1451">
              علاقه‌مندی‌ها
            </p>
          </div>
          <div className="fg-e1c7d3948f" data-node-id="1198:1452" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1198:1453">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1454" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1455" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1456" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-9ecf6cfa1b" data-node-id="1198:1457" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1198:1458" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1198:1459">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1198:1460">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1198:1461" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-8638944801" data-node-id="1198:1462" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1198:1463">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1198:1464">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
