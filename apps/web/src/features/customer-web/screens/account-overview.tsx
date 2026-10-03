// Native Figma 1198:1531 — Customer / Account Overview — Web
import {CustomerAction} from "../customer-controls";

type NegarinButtonProps = {
  className?: string;
  label?: string;
  size?: "Medium" | "Small";
  state?: "Default";
  style?: "Secondary";
};

function NegarinButton({ className, label = "ادامه", size = "Small", state = "Default", style = "Secondary" }: NegarinButtonProps) {
  const isSecondaryAndMediumAndDefault = style === "Secondary" && size === "Medium" && state === "Default";
  return (
    <CustomerAction className={className || "customer-native-button"} id={isSecondaryAndMediumAndDefault ? "node-46_16" : "node-46_12"} label={label}>
      <p className="fg-e4a7d61a6f" dir="auto" data-node-id="46:13">
        {label}
      </p>
    </CustomerAction>
  );
}

export default function CustomerAccountOverviewWeb() {
  return (
    <div className="fg-d37209cb37" data-node-id="1198:1531" data-name="Customer / Account Overview — Web">
      <div className="fg-6f037ae468" data-node-id="1198:1532" data-name="Desktop header">
        <div className="fg-8f04d00ba8" data-node-id="1198:1533" data-name="Customer actions">
          <div className="fg-3d7277edba" data-node-id="1198:1534" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1535">
              person_outline
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1536" label="حساب">
              حساب
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1198:1537" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1538">
              shopping_cart
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1539" label="سبد">
              سبد
            </CustomerAction>
          </div>
          <div className="fg-d263b583e1" data-node-id="1198:1540" data-name="Header action">
            <p className="fg-cf5ed33e67" data-node-id="1198:1541">
              bookmark_border
            </p>
            <CustomerAction className="fg-cf6303640d" dir="auto" data-node-id="1198:1542" label="ذخیره‌ها">
              ذخیره‌ها
            </CustomerAction>
          </div>
        </div>
        <div className="fg-954c66e000" data-node-id="1198:1543" data-name="Primary navigation">
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1544" label="روایت‌ها">
            روایت‌ها
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1545" label="کشف آثار">
            کشف آثار
          </CustomerAction>
          <CustomerAction className="fg-d452ad70ec" dir="auto" data-node-id="1198:1546" label="خانه">
            خانه
          </CustomerAction>
        </div>
        <div className="fg-3ee1409559" data-node-id="1198:1547" data-name="Brand">
          <div className="fg-a7815243f4" data-node-id="1198:1548" data-name="Brand copy">
            <p className="fg-6edbc50726" dir="auto" data-node-id="1198:1549">
              خانه نگارین
            </p>
            <p className="fg-8df68b0b1d" dir="auto" data-node-id="1198:1550">
              روایتگر هنر اصیل ایرانی
            </p>
          </div>
          <div className="fg-725c69b4f4" data-node-id="1198:1551" data-name="Negarin logo">
            <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/c88918c1.png" />
          </div>
        </div>
      </div>
      <div className="fg-641e585cf3" data-node-id="1198:1552" data-name="Page heading">
        <div className="fg-24380cf9d7" data-node-id="1198:1553" data-name="Heading accent">
          <p className="fg-440e08aff4" data-node-id="1198:1554">
            person_outline
          </p>
        </div>
        <div className="fg-26054c25d0" data-node-id="1198:1555" data-name="Heading copy">
          <p className="fg-3b2de6ae27" dir="auto" data-node-id="1198:1556">
            حساب من
          </p>
          <p className="fg-3f8a9e3928" dir="auto" data-node-id="1198:1557">
            خلاصه سفارش‌ها، آدرس‌ها و آثار ذخیره‌شده‌ات را از اینجا ببین.
          </p>
        </div>
      </div>
      <div className="fg-9413dfa16b" data-node-id="1198:1558" data-name="Account content">
        <div className="fg-2ef19ca527" data-node-id="1198:1559" data-name="Welcome panel">
          <div className="fg-0d1b10235c" data-node-id="1198:1560" data-name="Account summary">
            <div className="fg-a9ffbf07ff" data-node-id="1198:1561" data-name="Summary item">
              <p className="fg-00b08f6bc3" data-node-id="1198:1562">
                ۳
              </p>
              <p className="fg-25f21a90e4" dir="auto" data-node-id="1198:1563">
                سفارش اخیر
              </p>
            </div>
            <div className="fg-a9ffbf07ff" data-node-id="1198:1564" data-name="Summary item">
              <p className="fg-00b08f6bc3" data-node-id="1198:1565">
                ۴
              </p>
              <p className="fg-25f21a90e4" dir="auto" data-node-id="1198:1566">
                اثر محبوب
              </p>
            </div>
            <div className="fg-a9ffbf07ff" data-node-id="1198:1567" data-name="Summary item">
              <p className="fg-00b08f6bc3" data-node-id="1198:1568">
                ۲
              </p>
              <p className="fg-25f21a90e4" dir="auto" data-node-id="1198:1569">
                آدرس ذخیره‌شده
              </p>
            </div>
          </div>
          <div className="fg-072aa948fb" data-node-id="1198:1570" data-name="Welcome copy">
            <div className="fg-c2fdb18328" data-node-id="1198:1571" data-name="Greeting">
              <p className="fg-6a2294b6bc" dir="auto" data-node-id="1198:1572">
                مریم احمدی، خوش آمدی
              </p>
              <p className="fg-f2c636a509" dir="auto" data-node-id="1198:1573">
                حساب تو آماده است؛ سفارش در جریان و میان‌برهای پرکاربردت همین‌جا هستند.
              </p>
            </div>
            <div className="fg-71ca42af71" data-node-id="1198:1574" data-name="Customer avatar">
              <p className="fg-d47e20c32f" dir="auto" data-node-id="1198:1575">
                م
              </p>
            </div>
          </div>
        </div>
        <div className="fg-d6f889b3e9" data-node-id="1198:1576" data-name="Account paths section">
          <div className="fg-4e378bdac5" data-node-id="1198:1577" data-name="Section heading">
            <p className="fg-05ba77bfa5" dir="auto" data-node-id="1198:1578">
              دسترسی سریع
            </p>
            <p className="fg-d1c0cea3bd" dir="auto" data-node-id="1198:1579">
              برای مدیریت هر بخش، مسیر مستقل خودش را انتخاب کن.
            </p>
          </div>
          <div className="fg-0bab63b93d" data-node-id="1198:1580" data-name="Account paths">
            <div className="fg-b909c45a8e" data-node-id="1198:1581" data-name="Account path">
              <div className="fg-a14631f11c" data-node-id="1198:1582" data-name="Path heading">
                <div className="fg-74337db06e" data-node-id="1198:1583" data-name="Path icon">
                  <p className="fg-3faefdb384" data-node-id="1198:1584">
                    receipt_long
                  </p>
                </div>
                <div className="fg-763a480777" data-node-id="1198:1585" data-name="Path copy">
                  <p className="fg-d438b4ca78" dir="auto" data-node-id="1198:1586">
                    سفارش‌های من
                  </p>
                  <p className="fg-0f31dd6a99" dir="auto" data-node-id="1198:1587">
                    پیگیری وضعیت و مرور خریدهای قبلی
                  </p>
                </div>
              </div>
              <p className="fg-7b0e9429da" dir="auto" data-node-id="1198:1588">
                ۱ سفارش در جریان
              </p>
              <NegarinButton className="fg-936ea39c6e" label="مشاهده سفارش‌ها" />
            </div>
            <div className="fg-b909c45a8e" data-node-id="1198:1592" data-name="Account path">
              <div className="fg-a14631f11c" data-node-id="1198:1593" data-name="Path heading">
                <div className="fg-74337db06e" data-node-id="1198:1594" data-name="Path icon">
                  <p className="fg-3faefdb384" data-node-id="1198:1595">
                    location_on
                  </p>
                </div>
                <div className="fg-763a480777" data-node-id="1198:1596" data-name="Path copy">
                  <CustomerAction className="fg-d438b4ca78" dir="auto" data-node-id="1198:1597" label="آدرس‌ها">
                    آدرس‌ها
                  </CustomerAction>
                  <p className="fg-0f31dd6a99" dir="auto" data-node-id="1198:1598">
                    مدیریت نشانی‌های تحویل ذخیره‌شده
                  </p>
                </div>
              </div>
              <p className="fg-7b0e9429da" dir="auto" data-node-id="1198:1599">
                ۲ آدرس ذخیره‌شده
              </p>
              <NegarinButton className="fg-936ea39c6e" label="مدیریت آدرس‌ها" />
            </div>
            <div className="fg-b909c45a8e" data-node-id="1198:1603" data-name="Account path">
              <div className="fg-a14631f11c" data-node-id="1198:1604" data-name="Path heading">
                <div className="fg-74337db06e" data-node-id="1198:1605" data-name="Path icon">
                  <p className="fg-3faefdb384" data-node-id="1198:1606">
                    favorite_border
                  </p>
                </div>
                <div className="fg-763a480777" data-node-id="1198:1607" data-name="Path copy">
                  <p className="fg-d438b4ca78" dir="auto" data-node-id="1198:1608">
                    علاقه‌مندی‌ها
                  </p>
                  <p className="fg-0f31dd6a99" dir="auto" data-node-id="1198:1609">
                    بازگشت سریع به آثار محبوبت
                  </p>
                </div>
              </div>
              <p className="fg-7b0e9429da" dir="auto" data-node-id="1198:1610">
                ۴ اثر ذخیره‌شده
              </p>
              <NegarinButton className="fg-936ea39c6e" label="دیدن علاقه‌مندی‌ها" />
            </div>
            <div className="fg-b909c45a8e" data-node-id="1198:1614" data-name="Account path">
              <div className="fg-a14631f11c" data-node-id="1198:1615" data-name="Path heading">
                <div className="fg-74337db06e" data-node-id="1198:1616" data-name="Path icon">
                  <p className="fg-3faefdb384" data-node-id="1198:1617">
                    manage_accounts
                  </p>
                </div>
                <div className="fg-763a480777" data-node-id="1198:1618" data-name="Path copy">
                  <p className="fg-d438b4ca78" dir="auto" data-node-id="1198:1619">
                    اطلاعات حساب
                  </p>
                  <p className="fg-0f31dd6a99" dir="auto" data-node-id="1198:1620">
                    نام، شماره تماس و تنظیمات حساب
                  </p>
                </div>
              </div>
              <p className="fg-7b0e9429da" dir="auto" data-node-id="1198:1621">
                اطلاعات حساب کامل است
              </p>
              <NegarinButton className="fg-936ea39c6e" label="ویرایش اطلاعات" />
            </div>
          </div>
        </div>
        <div className="fg-4632536a12" data-node-id="1198:1625" data-name="Recent orders section">
          <div className="fg-a14631f11c" data-node-id="1198:1626" data-name="Orders heading">
            <NegarinButton className="fg-daa84107d1" label="مشاهده همه سفارش‌ها" size="Medium" />
            <div className="fg-851e7b5fce" data-node-id="1198:1630" data-name="Heading copy">
              <p className="fg-cbf2c4bfe6" dir="auto" data-node-id="1198:1631">
                سفارش‌های اخیر
              </p>
              <p className="fg-b72ba594c7" dir="auto" data-node-id="1198:1632">
                خلاصه سه سفارش آخر تو
              </p>
            </div>
          </div>
          <div className="fg-fc896df784" data-node-id="1198:1633" data-name="Recent orders">
            <div className="fg-8642a821ad" data-node-id="1198:1634" data-name="Recent order">
              <div className="fg-09e0f89736" data-node-id="1198:1635" data-name="Status">
                <p className="fg-585f829b1a" dir="auto" data-node-id="1198:1636">
                  در حال آماده‌سازی
                </p>
              </div>
              <p className="fg-6023ef33c9" dir="auto" data-node-id="1198:1637">
                ۶,۲۵۰,۰۰۰ تومان
              </p>
              <p className="fg-b765878d9a" dir="auto" data-node-id="1198:1638">
                ۱۴ اردیبهشت ۱۴۰۳
              </p>
              <div className="fg-57c13d9488" data-node-id="1198:1639" data-name="Order identity">
                <p className="fg-7320b0b031" dir="auto" data-node-id="1198:1640">
                  سفارش #NG-1054
                </p>
                <p className="fg-f624da537b" dir="auto" data-node-id="1198:1641">
                  پرداخت‌شده
                </p>
              </div>
              <p className="fg-751ef583d4" data-node-id="1198:1642">
                arrow_back
              </p>
            </div>
            <div className="fg-3cde6a351a" data-node-id="1198:1643" data-name="Recent order">
              <div className="fg-45f4788a82" data-node-id="1198:1644" data-name="Status">
                <p className="fg-56911f5afa" dir="auto" data-node-id="1198:1645">
                  تحویل‌شده
                </p>
              </div>
              <p className="fg-6023ef33c9" dir="auto" data-node-id="1198:1646">
                ۲,۹۰۰,۰۰۰ تومان
              </p>
              <p className="fg-b765878d9a" dir="auto" data-node-id="1198:1647">
                ۲۶ فروردین ۱۴۰۳
              </p>
              <div className="fg-57c13d9488" data-node-id="1198:1648" data-name="Order identity">
                <p className="fg-7320b0b031" dir="auto" data-node-id="1198:1649">
                  سفارش #NG-1028
                </p>
                <p className="fg-f624da537b" dir="auto" data-node-id="1198:1650">
                  پرداخت‌شده
                </p>
              </div>
              <p className="fg-751ef583d4" data-node-id="1198:1651">
                arrow_back
              </p>
            </div>
            <div className="fg-3cde6a351a" data-node-id="1198:1652" data-name="Recent order">
              <div className="fg-45f4788a82" data-node-id="1198:1653" data-name="Status">
                <p className="fg-56911f5afa" dir="auto" data-node-id="1198:1654">
                  تحویل‌شده
                </p>
              </div>
              <p className="fg-6023ef33c9" dir="auto" data-node-id="1198:1655">
                ۱,۷۵۰,۰۰۰ تومان
              </p>
              <p className="fg-b765878d9a" dir="auto" data-node-id="1198:1656">
                ۱۸ اسفند ۱۴۰۲
              </p>
              <div className="fg-57c13d9488" data-node-id="1198:1657" data-name="Order identity">
                <p className="fg-7320b0b031" dir="auto" data-node-id="1198:1658">
                  سفارش #NG-0996
                </p>
                <p className="fg-f624da537b" dir="auto" data-node-id="1198:1659">
                  پرداخت‌شده
                </p>
              </div>
              <p className="fg-751ef583d4" data-node-id="1198:1660">
                arrow_back
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fg-ebe0531eb3" data-node-id="1198:1661" data-name="Desktop footer">
        <div className="fg-2be1b2270e" data-node-id="1198:1662" data-name="Footer content">
          <div className="fg-e1c7d3948f" data-node-id="1198:1663" data-name="Customer links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1198:1664">
              حساب مشتری
            </p>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1198:1665">
              سفارش‌های من
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1666" label="آدرس‌ها">
              آدرس‌ها
            </CustomerAction>
            <p className="fg-c51a7b686d" dir="auto" data-node-id="1198:1667">
              علاقه‌مندی‌ها
            </p>
          </div>
          <div className="fg-e1c7d3948f" data-node-id="1198:1668" data-name="Explore links">
            <p className="fg-fabc7db0ce" dir="auto" data-node-id="1198:1669">
              کشف نگارین
            </p>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1670" label="خانه">
              خانه
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1671" label="کشف آثار">
              کشف آثار
            </CustomerAction>
            <CustomerAction className="fg-c51a7b686d" dir="auto" data-node-id="1198:1672" label="روایت‌ها">
              روایت‌ها
            </CustomerAction>
          </div>
          <div className="fg-9ecf6cfa1b" data-node-id="1198:1673" data-name="Footer brand">
            <div className="fg-e19e0142ae" data-node-id="1198:1674" data-name="Brand statement">
              <p className="fg-06368e013e" dir="auto" data-node-id="1198:1675">
                خانه نگارین
              </p>
              <p className="fg-7e28ce9b07" dir="auto" data-node-id="1198:1676">
                نگارین؛ جایی برای کشف، دنبال‌کردن و خرید هنر اصیل ایرانی.
              </p>
            </div>
            <div className="fg-beea325091" data-node-id="1198:1677" data-name="Negarin logo">
              <img alt="" className="fg-71eecc63f8" src="/customer-web-assets/01b0ec06.png" />
            </div>
          </div>
        </div>
        <div className="fg-8638944801" data-node-id="1198:1678" data-name="Footer base">
          <p className="fg-99a1849dc3" dir="auto" data-node-id="1198:1679">
            © خانه نگارین
          </p>
          <p className="fg-6ce4899cac" dir="auto" data-node-id="1198:1680">
            هنر اصیل، روایت ماندگار
          </p>
        </div>
      </div>
    </div>
  );
}
