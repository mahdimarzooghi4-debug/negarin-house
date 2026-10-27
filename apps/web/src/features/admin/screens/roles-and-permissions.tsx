// Figma 903:1861 — Admin / Roles & Permissions — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminRolesPermissionsDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="903:1861" data-name="Admin / Roles & Permissions — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:1862" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="903:1863" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:1864" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:1865" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/21768f90.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="903:1866" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-e36f3c3d24" data-node-id="903:1869" data-name="Right Header">
            <DesignField className="fg-26c42d8f06" data-node-id="903:1870" data-name="Search and Title" label="جستجو" placeholder="جستجو در نام، شناسه کاربری یا نقش... نقش‌ها و سطوح دسترسی">
              <DesignField className="fg-9ce4e1a1a3" data-node-id="903:1871" data-name="Global Search" label="جستجو" placeholder="جستجو در نام، شناسه کاربری یا نقش...">
                <p className="fg-7350bdf7b6" dir="auto" data-node-id="903:1872">
                  جستجو در نام، شناسه کاربری یا نقش...
                </p>
                <div className="fg-c51752dc8c" data-node-id="903:2495" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </DesignField>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="903:1874">
                نقش‌ها و سطوح دسترسی
              </p>
            </DesignField>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="903:1875" data-name="Scrollable Content">
          <div className="fg-c96fe10678" data-node-id="903:1876" data-name="Action Header">
            <DesignAction className="fg-a47da601aa" data-node-id="903:1877" data-name="Create Role Button" label="+ ایجاد نقش جدید" destination="role-editor">
              <p className="fg-8ffc872800" dir="auto" data-node-id="903:1878">
                + ایجاد نقش جدید
              </p>
            </DesignAction>
            <p className="fg-ebba4376f7" dir="auto" data-node-id="903:1879">
              تعریف نقش‌های سازمانی
            </p>
          </div>
          <div className="fg-e16ac02b64" data-node-id="903:1880" data-name="Table Block">
            <div className="fg-cb667e7a05" data-node-id="903:1881" data-name="Table Wrapper">
              <div className="fg-5a60ba4653" data-node-id="903:1882" data-name="TableHeader">
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1883">
                  اقدام
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="903:1884">
                  تعداد کاربران
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:1885">
                  توضیحات نقش
                </p>
                <p className="fg-44d10f1b20" dir="auto" data-node-id="903:1886">
                  شناسه
                </p>
                <p className="fg-c7dd25f208" dir="auto" data-node-id="903:1887">
                  نام نقش
                </p>
              </div>
              <div className="fg-c475d979ca" data-node-id="903:1888" data-name="TableBody">
                <div className="fg-4f547a8b42" data-node-id="903:1889" data-name="Table Row">
                  <DesignAction className="fg-4fbb6df1eb" data-node-id="903:1890" data-name="Col Action" label="محافظت‌شده">
                    <div className="fg-73aa0521ac" data-node-id="903:1891" data-name="Protected Tag">
                      <p className="fg-5ba8343c21" dir="auto" data-node-id="903:1892">
                        محافظت‌شده
                      </p>
                    </div>
                  </DesignAction>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="903:1893">
                    ۲ کاربر
                  </p>
                  <p className="fg-c1713194dc" dir="auto" data-node-id="903:1894">
                    دسترسی کامل و بی قید و شرط به تمام ماژول‌های مدیریتی
                  </p>
                  <p className="fg-60291bf025" data-node-id="903:1895">
                    ROLE-1001
                  </p>
                  <p className="fg-8a7c7869f8" dir="auto" data-node-id="903:1896">
                    مدیر سیستم
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1897" data-name="Table Row">
                  <DesignAction className="fg-4fbb6df1eb" data-node-id="903:1898" data-name="Col Action" label="ویرایش دسترسی" destination="role-editor">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1899">
                      ویرایش دسترسی
                    </p>
                  </DesignAction>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="903:1900">
                    ۳ کاربر
                  </p>
                  <p className="fg-c1713194dc" dir="auto" data-node-id="903:1901">
                    مدیریت، تایید و رسیدگی به امور لجستیکی سفارشات مشتریان
                  </p>
                  <p className="fg-60291bf025" data-node-id="903:1902">
                    ROLE-1002
                  </p>
                  <p className="fg-8a7c7869f8" dir="auto" data-node-id="903:1903">
                    عملیات سفارشات
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1904" data-name="Table Row">
                  <DesignAction className="fg-4fbb6df1eb" data-node-id="903:1905" data-name="Col Action" label="ویرایش دسترسی" destination="role-editor">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1906">
                      ویرایش دسترسی
                    </p>
                  </DesignAction>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="903:1907">
                    ۲ کاربر
                  </p>
                  <p className="fg-c1713194dc" dir="auto" data-node-id="903:1908">
                    کنترل کیفی و تایید نهایی محصولات هنری جهت انتشار در بازار
                  </p>
                  <p className="fg-60291bf025" data-node-id="903:1909">
                    ROLE-1003
                  </p>
                  <p className="fg-8a7c7869f8" dir="auto" data-node-id="903:1910">
                    بررسی محصول
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1911" data-name="Table Row">
                  <DesignAction className="fg-4fbb6df1eb" data-node-id="903:1912" data-name="Col Action" label="ویرایش دسترسی" destination="role-editor">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1913">
                      ویرایش دسترسی
                    </p>
                  </DesignAction>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="903:1914">
                    ۲ کاربر
                  </p>
                  <p className="fg-c1713194dc" dir="auto" data-node-id="903:1915">
                    بررسی مدارک، سوابق و تایید حساب‌های کاربری هنرمندان جدید
                  </p>
                  <p className="fg-60291bf025" data-node-id="903:1916">
                    ROLE-1004
                  </p>
                  <p className="fg-8a7c7869f8" dir="auto" data-node-id="903:1917">
                    عملیات هنرمندان
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1918" data-name="Table Row">
                  <DesignAction className="fg-4fbb6df1eb" data-node-id="903:1919" data-name="Col Action" label="ویرایش دسترسی" destination="role-editor">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1920">
                      ویرایش دسترسی
                    </p>
                  </DesignAction>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="903:1921">
                    ۱ کاربر
                  </p>
                  <p className="fg-c1713194dc" dir="auto" data-node-id="903:1922">
                    مدیریت حسابداری، تسویه‌ حساب‌ها و گزارش‌های مالی سیستم
                  </p>
                  <p className="fg-60291bf025" data-node-id="903:1923">
                    ROLE-1005
                  </p>
                  <p className="fg-8a7c7869f8" dir="auto" data-node-id="903:1924">
                    مالی
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1925" data-name="Table Row">
                  <DesignAction className="fg-4fbb6df1eb" data-node-id="903:1926" data-name="Col Action" label="ویرایش دسترسی" destination="role-editor">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1927">
                      ویرایش دسترسی
                    </p>
                  </DesignAction>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="903:1928">
                    ۲ کاربر
                  </p>
                  <p className="fg-c1713194dc" dir="auto" data-node-id="903:1929">
                    مدیریت ارسال آثار به خارج از کشور و عملیات بین‌المللی
                  </p>
                  <p className="fg-60291bf025" data-node-id="903:1930">
                    ROLE-1006
                  </p>
                  <p className="fg-8a7c7869f8" dir="auto" data-node-id="903:1931">
                    عملیات بین‌المللی
                  </p>
                </div>
                <div className="fg-4f547a8b42" data-node-id="903:1932" data-name="Table Row">
                  <DesignAction className="fg-4fbb6df1eb" data-node-id="903:1933" data-name="Col Action" label="ویرایش دسترسی" destination="role-editor">
                    <p className="fg-07cda96c5d" dir="auto" data-node-id="903:1934">
                      ویرایش دسترسی
                    </p>
                  </DesignAction>
                  <p className="fg-ca3610f320" dir="auto" data-node-id="903:1935">
                    ۱ کاربر
                  </p>
                  <p className="fg-c1713194dc" dir="auto" data-node-id="903:1936">
                    تولید محتوا، ثبت وبلاگ و داستان‌های هنری
                  </p>
                  <p className="fg-60291bf025" data-node-id="903:1937">
                    ROLE-1007
                  </p>
                  <p className="fg-8a7c7869f8" dir="auto" data-node-id="903:1938">
                    محتوا
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:1939" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="903:1940" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="903:1941">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="903:1942" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:283" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="903:1944" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="903:1945" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="903:2600" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="903:1947">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-b9552021d1" data-node-id="903:1948" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="903:1949" data-name="Group-هنرمندان">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1950" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="903:2498" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1952">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="903:1953" data-name="Group-بازار">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="903:1954" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="903:2501" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1956">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1957" data-name="Group-سفارش و ارسال">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1958" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="903:2504" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1960">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1961" data-name="Group-رشد و خدمات">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1962" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="903:2507" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1964">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1965" data-name="Group-فرصت‌ها">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1966" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="903:2510" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1968">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1969" data-name="Group-مالی و عضویت">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1970" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="903:2513" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1972">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1973" data-name="Group-بین‌الملل">
              <div className="fg-c7482c92d9" data-node-id="903:1974" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="903:2516" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1976">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1977" data-name="Group-گزارش‌ها">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:1978" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="903:2519" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:1980">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:1981" data-name="Group-تنظیمات">
              <DesignAction className="fg-9dda82322e" data-node-id="903:1982" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="903:2522" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-44cbb6f8f0" dir="auto" data-node-id="903:1984">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="903:1985" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="903:1986" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="903:1987">
              کارشناس ارشد سیستم
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="903:1988">
              مدیر کنترل دسترسی
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="903:1989" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/ff491d91.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
