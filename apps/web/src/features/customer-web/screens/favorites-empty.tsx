// Native Figma 1198:1466 — Customer / Favorites Empty — Web
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

export default function CustomerFavoritesEmptyWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1198:1466" data-name="Customer / Favorites Empty — Web">
      <div className="fg-6f037ae468" data-node-id="1198:1467" data-name="Desktop header">
        <div className="fg-8f04d00ba8" data-node-id="1198:1468" data-name="Customer actions">
          <div className="fg-d263b583e1" data-node-id="1198:1469" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1470">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1471" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1198:1472" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1473">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1474" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-3d7277edba" data-node-id="1198:1475" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1476">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1477" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1198:1478" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1479" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1480" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1481" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1198:1482" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1198:1483" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1198:1484">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1198:1485">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1198:1486" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-641e585cf3" data-node-id="1198:1487" data-name="Page heading">
        <div className="fg-24380cf9d7" data-node-id="1198:1488" data-name="Heading accent">
          <p className="fg-440e08aff4" data-node-id="1198:1489">
            favorite_border
          </p>
        </div>
        <div className="fg-26054c25d0" data-node-id="1198:1490" data-name="Heading copy">
          <p className="fg-3b2de6ae27" dir="auto" data-node-id="1198:1491">
            علاقه‌مندی‌های من
          </p>
          <p className="fg-3f8a9e3928" dir="auto" data-node-id="1198:1492">
            هر اثری که دوست داری ذخیره کن تا بعداً سریع و ساده به آن برگردی.
          </p>
        </div>
      </div>
      <div className="fg-13e42717aa" data-node-id="1198:1493" data-name="Empty favorites stage">
        <div className="fg-fe45dcd68e" data-node-id="1198:1494" data-name="Empty state">
          <div className="fg-80350e5ce7" data-node-id="1198:1495" data-name="Empty illustration">
            <div className="fg-4837f94624" data-node-id="1198:1496" data-name="Background motif">
              <img alt="" className="fg-8faf267d30" src="/customer-web-assets/87c27153.svg" />
            </div>
            <div className="fg-01038e048e" data-node-id="1198:1497" data-name="Artwork plate">
              <div className="fg-221400e746">
                <img alt="" className="fg-acc3667e96" src="/customer-web-assets/14d7ce1e.svg" />
              </div>
            </div>
            <div className="fg-5697f32472" data-node-id="1198:1498" data-name="Plate detail">
              <img alt="" className="fg-8faf267d30" src="/customer-web-assets/8f7d24ac.svg" />
            </div>
            <p className="fg-0fc671f8b2" data-node-id="1198:1499">
              auto_awesome
            </p>
            <div className="fg-fd0d23b4d7" data-node-id="1198:1500" data-name="Bookmark ornament">
              <p className="fg-416f39f11c" data-node-id="1198:1501">
                bookmark_border
              </p>
            </div>
            <div className="fg-0adfc2d672" data-node-id="1198:1502">
              <div className="fg-60ee7f90ae">
                <div className="fg-cba70d8c9f" data-name="Decorative stroke" />
              </div>
            </div>
            <div className="fg-39f37ad43c" data-node-id="1198:1503" data-name="Decorative dot">
              <img alt="" className="fg-8faf267d30" src="/customer-web-assets/cc0e792f.svg" />
            </div>
          </div>
          <div className="fg-b44829d6e3" data-node-id="1198:1504" data-name="Empty copy">
            <p className="fg-e3de32be27" dir="auto" data-node-id="1198:1505">
              هنوز اثری ذخیره نکرده‌ای
            </p>
            <p className="fg-e2baaac909" dir="auto" data-node-id="1198:1506">
              در میان آثار هنرمندان نگارین بگرد؛ هر اثری که دلت را برد با نشان ذخیره نگه دار تا اینجا همیشه در دسترس باشد.
            </p>
          </div>
          <NegarinButton className="fg-68d3aea71f" label="رفتن به کشف آثار" />
        </div>
      </div>
      <div className="fg-ebe0531eb3" data-node-id="1198:1510" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1198:1511" data-name="Footer content">
          <div className="fg-e1c7d3948f" data-node-id="1198:1512" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1198:1513">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1198:1514">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1515" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1198:1516">
              علاقه‌مندی‌ها
            </p>
          </div>
          <div className="fg-e1c7d3948f" data-node-id="1198:1517" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1198:1518">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1519" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1520" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1521" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-9ecf6cfa1b" data-node-id="1198:1522" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1198:1523" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1198:1524">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1198:1525">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1198:1526" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-8638944801" data-node-id="1198:1527" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1198:1528">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1198:1529">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
