// Figma 899:2152 — Admin / Export Order Detail - Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminExportOrderDetailDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="899:2152" data-name="Admin / Export Order Detail - Desktop">
      <div className="fg-f7cede9c7c" data-node-id="899:2153" data-name="Main Workspace">
        <div className="fg-e0ff570bad" data-node-id="899:2154" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="899:2155" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="899:2156" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/2458b0bc.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="899:2157" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="899:2160" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="899:2161" data-name="Global Search" label="جستجو" placeholder="جستجو در سفارش‌های صادراتی، شرکا و کدهای EXP...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="899:2162">
                جستجو در سفارش‌های صادراتی، شرکا و کدهای EXP...
              </p>
              <div className="fg-c51752dc8c" data-node-id="899:2504" data-name="search">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
              </div>
            </DesignField>
            <p className="fg-99f699cdc3" dir="auto" data-node-id="899:2164">
              جزئیات سفارش صادراتی
            </p>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="899:2165" data-name="Scrollable Content Inner">
          <div className="fg-24081ceef5" data-node-id="899:2166" data-name="Header Row">
            <div className="fg-787154cfd0" data-node-id="899:2167" data-name="Breadcrumb Row">
              <div className="fg-e8210ba625" data-node-id="899:2168" data-name="Item">
                <DesignAction className="fg-7c79984bbb" dir="auto" data-node-id="899:2169" label="بازگشت" destination="export-orders">
                  بازگشت
                </DesignAction>
              </div>
              <div className="fg-54b45105c3" data-node-id="899:2170" data-name="Item">
                <p className="fg-d039218d38" data-node-id="899:2171">{` < `}</p>
                <p className="fg-958079a1f2" data-node-id="899:2172">
                  XORD-2024-0847
                </p>
              </div>
              <div className="fg-54b45105c3" data-node-id="899:2173" data-name="Item">
                <p className="fg-d039218d38" data-node-id="899:2174">{` < `}</p>
                <p className="fg-3097f8b282" dir="auto" data-node-id="899:2175">
                  سفارش‌های صادراتی
                </p>
              </div>
            </div>
            <div className="fg-c96fe10678" data-node-id="899:2176" data-name="Title and Badge">
              <div className="fg-9708e8d183" data-node-id="899:2177" data-name="Left Buttons">
                <DesignAction className="fg-e54722c263" data-node-id="899:2178" data-name="Btn Edit" label="مدیریت عملیات">
                  <p className="fg-8ffc872800" dir="auto" data-node-id="899:2179">
                    مدیریت عملیات
                  </p>
                </DesignAction>
                <DesignAction className="fg-e00fb2c26c" data-node-id="899:2180" data-name="Btn Pause" label="ثبت مسئله / اختلاف">
                  <p className="fg-35eebb81d9" dir="auto" data-node-id="899:2181">
                    ثبت مسئله / اختلاف
                  </p>
                </DesignAction>
              </div>
              <div className="fg-ad50363799" data-node-id="899:2182" data-name="Title Block">
                <div className="fg-8c9afb9183" data-node-id="899:2183" data-name="Status Badge">
                  <p className="fg-5778f11f94" dir="auto" data-node-id="899:2184">
                    در حال ارسال بین‌المللی
                  </p>
                </div>
                <p className="fg-99f699cdc3" dir="auto" data-node-id="899:2185">
                  سفارش صادراتی XORD-2024-0847
                </p>
              </div>
            </div>
          </div>
          <div className="fg-5323f550ad" data-node-id="899:2186" data-name="Split Grid">
            <div className="fg-3d7de8083b" data-node-id="899:2187" data-name="Left Column">
              <div className="fg-5f2f383ff9" data-node-id="899:2188" data-name="Fulfillment Progress Card">
                <p className="fg-d530805c51" dir="auto" data-node-id="899:2189">
                  چرخه معامله محافظت‌شده
                </p>
                <div className="fg-deac9b8267" data-node-id="899:2190" data-name="Timeline Row">
                  <div className="fg-c951ffb9f9" data-node-id="899:2191" data-name="Frame">
                    <div className="fg-eaa60f1c42" data-node-id="899:2192" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/1bbb0973.svg" />
                    </div>
                    <p className="fg-6e69d93640" dir="auto" data-node-id="899:2193">
                      تحویل و تأیید کیفیت
                    </p>
                  </div>
                  <div className="fg-3cc22d28b0" data-node-id="899:2194" data-name="Line">
                    <div className="fg-d8bbe4cdae">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/9a9e240c.svg" />
                    </div>
                  </div>
                  <div className="fg-c951ffb9f9" data-node-id="899:2195" data-name="Frame">
                    <div className="fg-25a8d0e243" data-node-id="899:2196" data-name="Frame">
                      <p className="fg-19d83ec7f3" data-node-id="899:2197">
                        ✓
                      </p>
                    </div>
                    <p className="fg-e622b085ba" dir="auto" data-node-id="899:2198">
                      ارسال و تحویل
                    </p>
                    <p className="fg-2e5bda1f5b" data-node-id="899:2199">
                      ۱۴۰۲/۱۰/۱۸
                    </p>
                  </div>
                  <div className="fg-3cc22d28b0" data-node-id="899:2200" data-name="Line">
                    <div className="fg-d8bbe4cdae">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/bf4c95f4.svg" />
                    </div>
                  </div>
                  <div className="fg-c951ffb9f9" data-node-id="899:2201" data-name="Frame">
                    <div className="fg-25a8d0e243" data-node-id="899:2202" data-name="Frame">
                      <p className="fg-19d83ec7f3" data-node-id="899:2203">
                        ✓
                      </p>
                    </div>
                    <p className="fg-53159490e7" dir="auto" data-node-id="899:2204">
                      کنترل کیفیت و آماده‌سازی
                    </p>
                    <p className="fg-2e5bda1f5b" data-node-id="899:2205">
                      ۱۴۰۲/۱۰/۱۵
                    </p>
                  </div>
                  <div className="fg-3cc22d28b0" data-node-id="899:2206" data-name="Line">
                    <div className="fg-d8bbe4cdae">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/bf4c95f4.svg" />
                    </div>
                  </div>
                  <div className="fg-c951ffb9f9" data-node-id="899:2207" data-name="Frame">
                    <div className="fg-25a8d0e243" data-node-id="899:2208" data-name="Frame">
                      <p className="fg-19d83ec7f3" data-node-id="899:2209">
                        ✓
                      </p>
                    </div>
                    <p className="fg-53159490e7" dir="auto" data-node-id="899:2210">
                      وجه نزد نگارین محفوظ / آغاز تحقق
                    </p>
                    <p className="fg-2e5bda1f5b" data-node-id="899:2211">
                      ۱۴۰۲/۱۰/۱۴
                    </p>
                  </div>
                  <div className="fg-3cc22d28b0" data-node-id="899:2212" data-name="Line">
                    <div className="fg-d8bbe4cdae">
                      <img alt="" className="fg-acc3667e96" src="/admin-assets/bf4c95f4.svg" />
                    </div>
                  </div>
                  <div className="fg-c951ffb9f9" data-node-id="899:2213" data-name="Frame">
                    <div className="fg-25a8d0e243" data-node-id="899:2214" data-name="Frame">
                      <p className="fg-19d83ec7f3" data-node-id="899:2215">
                        ✓
                      </p>
                    </div>
                    <p className="fg-996ee33170" dir="auto" data-node-id="899:2216">
                      سفارش ثبت شد / پرداخت شریک دریافت شد
                    </p>
                    <p className="fg-2e5bda1f5b" data-node-id="899:2217">
                      ۱۴۰۲/۱۰/۱۲
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-a3aed82e9c" data-node-id="899:2218" data-name="Artist Product Card">
                <p className="fg-0696b29e72" dir="auto" data-node-id="899:2219">
                  تخصیص هنرمند / بخشی از سفارش صادراتی
                </p>
                <div className="fg-071288b844" data-node-id="899:2220" data-name="Info Wrapper">
                  <div className="fg-a5b4ef8781" data-node-id="899:2221" data-name="Data Row">
                    <p className="fg-f49fd59fa7" dir="auto" data-node-id="899:2222">
                      زهرا محمدی (ART-1092)
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:2223">
                      هنرمند تخصیص‌یافته
                    </p>
                  </div>
                  <div className="fg-a5b4ef8781" data-node-id="899:2224" data-name="Data Row">
                    <p className="fg-9eb0d25c1f" dir="auto" data-node-id="899:2225">
                      گلدان میناکاری بزرگ (PRD-MNK-2401)
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:2226">
                      محصول صادراتی
                    </p>
                  </div>
                  <div className="fg-a5b4ef8781" data-node-id="899:2227" data-name="Data Row">
                    <p className="fg-9eb0d25c1f" dir="auto" data-node-id="899:2228">
                      ۲۴ عدد
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:2229">
                      تعداد تخصیص‌یافته
                    </p>
                  </div>
                  <div className="fg-c6678c60ec" data-node-id="899:2230" data-name="Data Row">
                    <p className="fg-afa0b2ddc2" dir="auto" data-node-id="899:2231">
                      ۲٬۴۵۰٬۰۰۰ تومان
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="899:2232">
                      مبلغ تسویه داخلی هنرمند
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-5f2f383ff9" data-node-id="899:2233" data-name="Recent Activity Card">
                <p className="fg-d530805c51" dir="auto" data-node-id="899:2234">
                  فعالیت‌های اخیر و لاگ‌های سیستمی
                </p>
                <div className="fg-24081ceef5" data-node-id="899:2235" data-name="Event stack">
                  <div className="fg-e8fd000608" data-node-id="899:2236" data-name="Frame">
                    <p className="fg-5aae26f1a2" dir="auto" data-node-id="899:2237">
                      مرسوله وارد جریان ارسال هماهنگ‌شده نگارین شد.
                    </p>
                    <div className="fg-ed684af670" data-node-id="899:2238" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                    </div>
                    <p className="fg-252c8b5793" data-node-id="899:2239">
                      ۱۴۰۲/۱۰/۱۸
                    </p>
                  </div>
                  <div className="fg-e8fd000608" data-node-id="899:2240" data-name="Frame">
                    <p className="fg-5aae26f1a2" dir="auto" data-node-id="899:2241">
                      کنترل کیفیت بسته‌بندی و تطابق سفارش ثبت شد.
                    </p>
                    <div className="fg-ed684af670" data-node-id="899:2242" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                    </div>
                    <p className="fg-252c8b5793" data-node-id="899:2243">
                      ۱۴۰۲/۱۰/۱۶
                    </p>
                  </div>
                  <div className="fg-e8fd000608" data-node-id="899:2244" data-name="Frame">
                    <p className="fg-5aae26f1a2" dir="auto" data-node-id="899:2245">
                      هنرمند مرجع تاییدیه آمادگی کالا جهت ارسال را ثبت کرد.
                    </p>
                    <div className="fg-ed684af670" data-node-id="899:2246" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                    </div>
                    <p className="fg-252c8b5793" data-node-id="899:2247">
                      ۱۴۰۲/۱۰/۱۴
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-f6f8550647" data-node-id="899:2248" data-name="Right Config Column">
              <div className="fg-d6f889b3e9" data-node-id="928:1714" data-name="Partner Domain">
                <div className="fg-5f2f383ff9" data-node-id="928:1715" data-name="Partner Commercial Context">
                  <p className="fg-d530805c51" dir="auto" data-node-id="928:1716">
                    بخش تجاری شریک صادراتی
                  </p>
                  <div className="fg-2f9b298bcc" data-node-id="928:1717" data-name="Rows">
                    <div className="fg-c2927bbedd" data-node-id="928:1718" data-name="Data Row">
                      <p className="fg-7da7073880" dir="auto" data-node-id="928:1719">
                        Hakim Trading GmbH (EXP-0847)
                      </p>
                      <p className="fg-c0b81437cf" dir="auto" data-node-id="928:1720">
                        شریک صادراتی
                      </p>
                    </div>
                    <div className="fg-8a8d3c8125" data-node-id="928:1721" data-name="Data Row">
                      <p className="fg-7da7073880" dir="auto" data-node-id="928:1722">
                        آلمان (EUR €)
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1723">
                        بازار
                      </p>
                    </div>
                    <div className="fg-8a8d3c8125" data-node-id="928:1724" data-name="Data Row">
                      <p className="fg-7da7073880" dir="auto" data-node-id="928:1725">
                        گلدان میناکاری بزرگ (PRD-MNK-2401)
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1726">
                        محصول صادراتی
                      </p>
                    </div>
                    <div className="fg-8a8d3c8125" data-node-id="928:1727" data-name="Data Row">
                      <p className="fg-7da7073880" dir="auto" data-node-id="928:1728">
                        ۲۴ عدد
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1729">
                        تعداد تخصیص‌یافته
                      </p>
                    </div>
                    <div className="fg-c2927bbedd" data-node-id="928:1730" data-name="Data Row">
                      <p className="fg-7da7073880" data-node-id="928:1731">
                        €8,724.00
                      </p>
                      <p className="fg-c0b81437cf" dir="auto" data-node-id="928:1732">
                        ارزش کل سفارش
                      </p>
                    </div>
                    <div className="fg-8a8d3c8125" data-node-id="928:1733" data-name="Data Row">
                      <p className="fg-7da7073880" dir="auto" data-node-id="928:1734">
                        طبق قرارداد تجاری
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1735">
                        کارمزد نگارین بین‌المللی
                      </p>
                    </div>
                    <div className="fg-8b9eef77d9" data-node-id="928:1736" data-name="Data Row">
                      <p className="fg-eb8ea69b62" dir="auto" data-node-id="928:1737">
                        تأییدشده پیش از پرداخت
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1738">
                        وضعیت مبلغ قابل پرداخت شریک
                      </p>
                    </div>
                  </div>
                  <div className="fg-326edec1be" data-node-id="928:1739" data-name="Payment Status">
                    <p className="fg-5778f11f94" dir="auto" data-node-id="928:1740">
                      پرداخت دریافت شده — وجه نزد نگارین محفوظ
                    </p>
                  </div>
                </div>
                <div className="fg-df66760d2b" data-node-id="928:1741" data-name="Negarin International Fee">
                  <p className="fg-c66a40ca20" dir="auto" data-node-id="928:1742">
                    کارمزد بین‌المللی نگارین
                  </p>
                  <p className="fg-180b0da4d0" dir="auto" data-node-id="928:1743">
                    طبق قرارداد تجاری
                  </p>
                  <p className="fg-38d5792ead" dir="auto" data-node-id="928:1744">
                    درآمد نگارین از سمت شریک تجاری بین‌المللی
                  </p>
                </div>
              </div>
              <div className="fg-d6f889b3e9" data-node-id="928:1745" data-name="Artist Domain">
                <div className="fg-5f2f383ff9" data-node-id="928:1746" data-name="Artist Fulfillment Context">
                  <p className="fg-d530805c51" dir="auto" data-node-id="928:1747">
                    وضعیت تحقق هنرمند
                  </p>
                  <div className="fg-153c0a1809" data-node-id="928:1748" data-name="Rows">
                    <div className="fg-23951b8df3" data-node-id="928:1749" data-name="Data Row">
                      <p className="fg-f49fd59fa7" dir="auto" data-node-id="928:1750">
                        زهرا محمدی (ART-1092)
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1751">
                        هنرمند
                      </p>
                    </div>
                    <div className="fg-23951b8df3" data-node-id="928:1752" data-name="Data Row">
                      <p className="fg-7da7073880" dir="auto" data-node-id="928:1753">
                        گلدان میناکاری بزرگ (PRD-MNK-2401)
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1754">
                        محصول
                      </p>
                    </div>
                    <div className="fg-23951b8df3" data-node-id="928:1755" data-name="Data Row">
                      <p className="fg-7da7073880" dir="auto" data-node-id="928:1756">
                        ۲۴ عدد
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1757">
                        تعداد
                      </p>
                    </div>
                    <div className="fg-07e824e67b" data-node-id="928:1758" data-name="Data Row">
                      <div className="fg-8c9afb9183" data-node-id="928:1759" data-name="Frame">
                        <p className="fg-5778f11f94" dir="auto" data-node-id="928:1760">
                          آماده‌سازی
                        </p>
                      </div>
                      <p className="fg-35eebb81d9" dir="auto" data-node-id="928:1761">
                        وضعیت تحقق
                      </p>
                    </div>
                  </div>
                  <div className="fg-6485be02b3" data-node-id="928:1762" data-name="Link">
                    <p className="fg-ff4c51614b" dir="auto" data-node-id="928:1763">
                      مشاهده جزئیات تحقق هنرمند
                    </p>
                  </div>
                </div>
                <div className="fg-5f2f383ff9" data-node-id="928:1764" data-name="Artist Settlement Context">
                  <p className="fg-d530805c51" dir="auto" data-node-id="928:1765">
                    تسویه داخلی هنرمند
                  </p>
                  <div className="fg-153c0a1809" data-node-id="928:1766" data-name="Rows">
                    <div className="fg-23951b8df3" data-node-id="928:1767" data-name="Data Row">
                      <p className="fg-9eb0d25c1f" dir="auto" data-node-id="928:1768">
                        تومان (داخلی)
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1769">
                        ارز تسویه
                      </p>
                    </div>
                    <div className="fg-23951b8df3" data-node-id="928:1770" data-name="Data Row">
                      <p className="fg-eb8ea69b62" dir="auto" data-node-id="928:1771">
                        ۲٬۴۵۰٬۰۰۰ تومان
                      </p>
                      <p className="fg-4cf247727e" dir="auto" data-node-id="928:1772">
                        مبلغ تسویه داخلی هنرمند
                      </p>
                    </div>
                    <div className="fg-07e824e67b" data-node-id="928:1773" data-name="Data Row">
                      <div className="fg-8c9afb9183" data-node-id="928:1774" data-name="Frame">
                        <p className="fg-5778f11f94" dir="auto" data-node-id="928:1775">
                          در انتظار تأیید تحویل و کیفیت
                        </p>
                      </div>
                      <p className="fg-35eebb81d9" dir="auto" data-node-id="928:1776">
                        وضعیت تسویه
                      </p>
                    </div>
                  </div>
                  <div className="fg-6485be02b3" data-node-id="928:1777" data-name="Link">
                    <p className="fg-ff4c51614b" dir="auto" data-node-id="928:1778">
                      مشاهده در بخش تسویه‌حساب‌ها
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-e45b11c1e1" data-node-id="928:1779" data-name="Shipping Context">
                <p className="fg-5e3cdbd29d" dir="auto" data-node-id="928:1780">
                  مشخصات ترابری بین‌المللی
                </p>
                <div className="fg-071288b844" data-node-id="928:1781" data-name="Rows">
                  <div className="fg-8a8d3c8125" data-node-id="928:1782" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="928:1783">
                      ارسال شده
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="928:1784">
                      وضعیت ارسال
                    </p>
                  </div>
                  <div className="fg-8a8d3c8125" data-node-id="928:1785" data-name="Data Row">
                    <p className="fg-7da7073880" dir="auto" data-node-id="928:1786">
                      ارسال هماهنگ‌شده توسط نگارین
                    </p>
                    <p className="fg-4cf247727e" dir="auto" data-node-id="928:1787">
                      روش ارسال
                    </p>
                  </div>
                  <div className="fg-07e824e67b" data-node-id="928:1788" data-name="Data Row">
                    <p className="fg-b73c9c3acf" data-node-id="928:1789">
                      SHP-0847
                    </p>
                    <p className="fg-c0b81437cf" dir="auto" data-node-id="928:1790">
                      کد رهگیری مرسوله
                    </p>
                  </div>
                </div>
              </div>
              <div className="fg-5f2f383ff9" data-node-id="928:1791" data-name="Recent Activity Card">
                <p className="fg-d530805c51" dir="auto" data-node-id="928:1792">
                  فعالیت‌های اخیر و لاگ‌های سیستمی
                </p>
                <div className="fg-24081ceef5" data-node-id="928:1793" data-name="Event stack">
                  <div className="fg-e8fd000608" data-node-id="928:1794" data-name="Frame">
                    <p className="fg-5aae26f1a2" dir="auto" data-node-id="928:1795">
                      مرسوله وارد جریان ارسال هماهنگ‌شده نگارین شد.
                    </p>
                    <div className="fg-ed684af670" data-node-id="928:1796" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                    </div>
                    <p className="fg-252c8b5793" data-node-id="928:1797">
                      ۱۴۰۲/۱۰/۱۸
                    </p>
                  </div>
                  <div className="fg-e8fd000608" data-node-id="928:1798" data-name="Frame">
                    <p className="fg-5aae26f1a2" dir="auto" data-node-id="928:1799">
                      کنترل کیفیت بسته‌بندی و تطابق سفارش ثبت شد.
                    </p>
                    <div className="fg-ed684af670" data-node-id="928:1800" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                    </div>
                    <p className="fg-252c8b5793" data-node-id="928:1801">
                      ۱۴۰۲/۱۰/۱۶
                    </p>
                  </div>
                  <div className="fg-e8fd000608" data-node-id="928:1802" data-name="Frame">
                    <p className="fg-5aae26f1a2" dir="auto" data-node-id="928:1803">
                      هنرمند مرجع تاییدیه آمادگی کالا جهت ارسال را ثبت کرد.
                    </p>
                    <div className="fg-ed684af670" data-node-id="928:1804" data-name="Ellipse">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/8fbe3454.svg" />
                    </div>
                    <p className="fg-252c8b5793" data-node-id="928:1805">
                      ۱۴۰۲/۱۰/۱۴
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="899:2282" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="899:2283" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="899:2284">
            خانه نگارین
          </p>
          <div className="fg-d3e4e849d5" data-node-id="899:2285" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:275" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="899:2287" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="899:2288" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="899:2507" data-name="Android / Mobile Signal">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/41176b6b.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="899:2290">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-67e167c8b7" data-node-id="899:2291" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="899:2292" data-name="Group-0">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2293" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="899:2510" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2295">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="899:2296" data-name="Group-1">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="899:2297" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="899:2513" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2299">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2300" data-name="Group-2">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2301" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="899:2516" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2303">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2304" data-name="Group-3">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2305" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="899:2519" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2307">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2308" data-name="Group-4">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2309" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="899:2522" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2311">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2312" data-name="Group-5">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2313" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="899:2525" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2315">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2316" data-name="Group-6">
              <div className="fg-9dda82322e" data-node-id="899:2317" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="899:2528" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-81a7a808ad" dir="auto" data-node-id="899:2319">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2320" data-name="Group-7">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2321" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="899:2531" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2323">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="899:2324" data-name="Group-8">
              <DesignAction className="fg-c7482c92d9" data-node-id="899:2325" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="899:2534" data-name="Android / Wi-Fi">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/2c51962b.svg" />
                </div>
                <p className="fg-68399534eb" dir="auto" data-node-id="899:2327">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="899:2328" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="899:2329" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="899:2330">
              کارشناس عملیات صادرات
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="899:2331">
              مدیر بخش بین‌الملل
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="899:2332" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/994ddd95.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
