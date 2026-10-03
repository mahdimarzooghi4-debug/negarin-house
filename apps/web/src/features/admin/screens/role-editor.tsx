import { DesignChoice } from "../../artist/design-controls";
// Figma 903:2161 — Admin / Role Editor — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminRoleEditorDesktop() {
  return (
    <div className="fg-360fef389f" data-node-id="903:2161" data-name="Admin / Role Editor — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:2162" data-name="Main Workspace">
        <div className="fg-77ab100845" data-node-id="903:2163" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:2164" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:2165" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/2ef7fd66.png" />
            </div>
            <DesignAction className="fg-a6f8c7bf2d" data-node-id="903:2166" data-name="Notification Bell Button" label="Notification Bell Button">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/8d07a5d1.svg" />
            </DesignAction>
          </div>
          <div className="fg-e36f3c3d24" data-node-id="903:2169" data-name="Right Header">
            <div className="fg-db65f399cd" data-node-id="903:2170" data-name="Title and Path">
              <div className="fg-860c2f1554" data-node-id="903:2171" data-name="Breadcrumbs">
                <div className="fg-2eb97a30c3" data-node-id="903:2172" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:2173">
                    نقش‌ها
                  </p>
                  <p className="fg-29a4797011" data-node-id="903:2174">{`>`}</p>
                </div>
                <div className="fg-2eb97a30c3" data-node-id="903:2175" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:2176">
                    ویرایش نقش
                  </p>
                  <p className="fg-29a4797011" data-node-id="903:2177">{`>`}</p>
                </div>
                <div className="fg-e8210ba625" data-node-id="903:2178" data-name="Frame">
                  <DesignAction className="fg-ceb56afd4f" dir="auto" data-node-id="903:2179" label="بازگشت" destination="role-detail">
                    بازگشت
                  </DesignAction>
                </div>
              </div>
              <p className="fg-5330a4ecde" dir="auto" data-node-id="903:2180">
                ویرایش نقش سازمانی
              </p>
            </div>
          </div>
        </div>
        <div className="fg-3790a374a3" data-node-id="903:2181" data-name="Scrollable Content">
          <div className="fg-03bb2e10b3" data-node-id="903:2182" data-name="Form Block">
            <div className="fg-a12a1cd3e5" data-node-id="903:2183" data-name="Switches Container">
              <p className="fg-ade5fd2235" dir="auto" data-node-id="903:2184">
                تنظیم دقیق دسترسی ماژول‌ها (حداقل دسترسی لازم)
              </p>
              <div className="fg-5fc17eff4f" data-node-id="903:2185" data-name="Switch Matrix List">
                <div className="fg-516a07c8fc" data-node-id="903:2186" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2187" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2188" data-name="Switch Option" label="هنرمندان — مدیریت" group="903:2188" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2189" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2191">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2192" data-name="Switch Option" label="هنرمندان — بررسی" group="903:2192" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2193" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2195">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2196" data-name="Switch Option" label="هنرمندان — مشاهده" group="903:2196" multiple initial>
                      <div className="fg-1d91c46fa1" data-node-id="903:2197" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/eecd5ef7.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2199">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2200" data-name="Spacer" />
                  <div className="fg-5ebe67f435" data-node-id="903:2201" data-name="Module Label">
                    <p className="fg-934ca87244" dir="auto" data-node-id="903:2202">{`هنرمندان `}</p>
                  </div>
                </div>
                <div className="fg-516a07c8fc" data-node-id="903:2203" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2204" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2205" data-name="Switch Option" label="محصولات — مدیریت" group="903:2205" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2206" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2208">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2209" data-name="Switch Option" label="محصولات — بررسی" group="903:2209" multiple initial>
                      <div className="fg-1d91c46fa1" data-node-id="903:2210" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/eecd5ef7.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2212">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2213" data-name="Switch Option" label="محصولات — مشاهده" group="903:2213" multiple initial>
                      <div className="fg-1d91c46fa1" data-node-id="903:2214" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/eecd5ef7.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2216">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2217" data-name="Spacer" />
                  <div className="fg-5ebe67f435" data-node-id="903:2218" data-name="Module Label">
                    <p className="fg-934ca87244" dir="auto" data-node-id="903:2219">{`محصولات `}</p>
                  </div>
                </div>
                <div className="fg-516a07c8fc" data-node-id="903:2220" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2221" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2222" data-name="Switch Option" label="سفارشات و ارسال — مدیریت" group="903:2222" multiple initial>
                      <div className="fg-1d91c46fa1" data-node-id="903:2223" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/eecd5ef7.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2225">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2226" data-name="Switch Option" label="سفارشات و ارسال — بررسی" group="903:2226" multiple initial>
                      <div className="fg-1d91c46fa1" data-node-id="903:2227" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/eecd5ef7.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2229">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2230" data-name="Switch Option" label="سفارشات و ارسال — مشاهده" group="903:2230" multiple initial>
                      <div className="fg-1d91c46fa1" data-node-id="903:2231" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/eecd5ef7.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2233">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2234" data-name="Spacer" />
                  <div className="fg-5ebe67f435" data-node-id="903:2235" data-name="Module Label">
                    <p className="fg-934ca87244" dir="auto" data-node-id="903:2236">{`سفارشات و ارسال `}</p>
                  </div>
                </div>
                <div className="fg-516a07c8fc" data-node-id="903:2237" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2238" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2239" data-name="Switch Option" label="رشد و خدمات — مدیریت" group="903:2239" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2240" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2242">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2243" data-name="Switch Option" label="رشد و خدمات — بررسی" group="903:2243" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2244" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2246">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2247" data-name="Switch Option" label="رشد و خدمات — مشاهده" group="903:2247" multiple initial>
                      <div className="fg-1d91c46fa1" data-node-id="903:2248" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/eecd5ef7.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2250">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2251" data-name="Spacer" />
                  <div className="fg-5ebe67f435" data-node-id="903:2252" data-name="Module Label">
                    <p className="fg-934ca87244" dir="auto" data-node-id="903:2253">{`رشد و خدمات `}</p>
                  </div>
                </div>
                <div className="fg-516a07c8fc" data-node-id="903:2254" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2255" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2256" data-name="Switch Option" label="فرصت‌ها — مدیریت" group="903:2256" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2257" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2259">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2260" data-name="Switch Option" label="فرصت‌ها — بررسی" group="903:2260" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2261" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2263">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2264" data-name="Switch Option" label="فرصت‌ها — مشاهده" group="903:2264" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2265" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2267">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2268" data-name="Spacer" />
                  <div className="fg-5ebe67f435" data-node-id="903:2269" data-name="Module Label">
                    <p className="fg-934ca87244" dir="auto" data-node-id="903:2270">{`فرصت‌ها `}</p>
                  </div>
                </div>
                <div className="fg-de97e154cd" data-node-id="903:2271" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2272" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2273" data-name="Switch Option" label="مالی و تسویه (حساس) — مدیریت" group="903:2273" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2274" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2276">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2277" data-name="Switch Option" label="مالی و تسویه (حساس) — بررسی" group="903:2277" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2278" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2280">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2281" data-name="Switch Option" label="مالی و تسویه (حساس) — مشاهده" group="903:2281" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2282" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2284">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2285" data-name="Spacer" />
                  <div className="fg-8e754c94fa" data-node-id="903:2286" data-name="Module Label">
                    <div className="fg-8a0ff48924" data-node-id="903:2558" data-name="lock">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/49fae0f7.svg" />
                    </div>
                    <p className="fg-9f06a6291b" dir="auto" data-node-id="903:2288">
                      مالی و تسویه (حساس)
                    </p>
                  </div>
                </div>
                <div className="fg-516a07c8fc" data-node-id="903:2289" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2290" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2291" data-name="Switch Option" label="بین‌الملل — مدیریت" group="903:2291" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2292" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2294">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2295" data-name="Switch Option" label="بین‌الملل — بررسی" group="903:2295" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2296" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2298">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2299" data-name="Switch Option" label="بین‌الملل — مشاهده" group="903:2299" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2300" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2302">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2303" data-name="Spacer" />
                  <div className="fg-5ebe67f435" data-node-id="903:2304" data-name="Module Label">
                    <p className="fg-934ca87244" dir="auto" data-node-id="903:2305">{`بین‌الملل `}</p>
                  </div>
                </div>
                <div className="fg-516a07c8fc" data-node-id="903:2306" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2307" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2308" data-name="Switch Option" label="محتوا — مدیریت" group="903:2308" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2309" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2311">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2312" data-name="Switch Option" label="محتوا — بررسی" group="903:2312" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2313" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2315">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2316" data-name="Switch Option" label="محتوا — مشاهده" group="903:2316" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2317" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2319">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2320" data-name="Spacer" />
                  <div className="fg-5ebe67f435" data-node-id="903:2321" data-name="Module Label">
                    <p className="fg-934ca87244" dir="auto" data-node-id="903:2322">{`محتوا `}</p>
                  </div>
                </div>
                <div className="fg-516a07c8fc" data-node-id="903:2323" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2324" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2325" data-name="Switch Option" label="گزارش‌ها — مدیریت" group="903:2325" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2326" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2328">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2329" data-name="Switch Option" label="گزارش‌ها — بررسی" group="903:2329" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2330" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2332">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2333" data-name="Switch Option" label="گزارش‌ها — مشاهده" group="903:2333" multiple initial>
                      <div className="fg-1d91c46fa1" data-node-id="903:2334" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/eecd5ef7.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2336">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2337" data-name="Spacer" />
                  <div className="fg-5ebe67f435" data-node-id="903:2338" data-name="Module Label">
                    <p className="fg-934ca87244" dir="auto" data-node-id="903:2339">{`گزارش‌ها `}</p>
                  </div>
                </div>
                <div className="fg-de97e154cd" data-node-id="903:2340" data-name="Switch Row">
                  <div className="fg-9c6c6c92c0" data-node-id="903:2341" data-name="Switches Group">
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2342" data-name="Switch Option" label="تنظیمات (حساس) — مدیریت" group="903:2342" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2343" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2345">
                        مدیریت
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2346" data-name="Switch Option" label="تنظیمات (حساس) — بررسی" group="903:2346" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2347" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2349">
                        بررسی
                      </p>
                    </DesignChoice>
                    <DesignChoice className="fg-860c2f1554" data-node-id="903:2350" data-name="Switch Option" label="تنظیمات (حساس) — مشاهده" group="903:2350" multiple>
                      <div className="fg-1d91c46fa1" data-node-id="903:2351" data-name="Toggle Track">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/15497bea.svg" />
                      </div>
                      <p className="fg-6a4d461090" dir="auto" data-node-id="903:2353">
                        مشاهده
                      </p>
                    </DesignChoice>
                  </div>
                  <div className="fg-38bd06a24d" data-node-id="903:2354" data-name="Spacer" />
                  <div className="fg-8e754c94fa" data-node-id="903:2355" data-name="Module Label">
                    <div className="fg-8a0ff48924" data-node-id="903:2561" data-name="lock">
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/4ccc6fb7.svg" />
                    </div>
                    <p className="fg-9f06a6291b" dir="auto" data-node-id="903:2357">
                      تنظیمات (حساس)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fg-d620a80568" data-node-id="903:2358" data-name="Inputs Container">
              <p className="fg-ade5fd2235" dir="auto" data-node-id="903:2359">
                اطلاعات اولیه نقش
              </p>
              <div className="fg-82e01851cd" data-node-id="903:2360" data-name="Input Group">
                <p className="fg-7245498489" dir="auto" data-node-id="903:2361">
                  نام نقش
                </p>
                <DesignField className="fg-cb4e4ee617" data-node-id="903:2362" data-name="Textbox" label="نام نقش" placeholder="عملیات سفارشات و زنجیره تأمین">
                  <p className="fg-45de269970" dir="auto" data-node-id="903:2363">
                    عملیات سفارشات و زنجیره تأمین
                  </p>
                </DesignField>
              </div>
              <div className="fg-82e01851cd" data-node-id="903:2364" data-name="Input Group">
                <p className="fg-7245498489" dir="auto" data-node-id="903:2365">
                  توضیحات دسترسی
                </p>
                <DesignField className="fg-6e3e8bb77d" data-node-id="903:2366" data-name="Textarea" label="توضیحات دسترسی" placeholder="مدیریت تمام سفارشات خریداران، هماهنگی ارسال با شرکت‌های لجستیکی و پیگیری مغایرت‌ها">
                  <p className="fg-027cf2c70f" dir="auto" data-node-id="903:2367">
                    مدیریت تمام سفارشات خریداران، هماهنگی ارسال با شرکت‌های لجستیکی و پیگیری مغایرت‌ها
                  </p>
                </DesignField>
              </div>
              <div className="fg-c2551bae2a" data-node-id="903:2368" data-name="Warning Box">
                <p className="fg-460dd26f5a" dir="auto" data-node-id="903:2369">
                  هرگونه تغییر در این بخش فوراً روی دسترسی جاری ۳ کاربر فعال تأثیر می‌گذارد.
                </p>
                <div className="fg-5cca20e57d" data-node-id="903:2591" data-name="alert-circle">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/b384ba06.svg" />
                </div>
              </div>
              <div className="fg-df0a3de519" data-node-id="903:2371" data-name="Line">
                <div className="fg-cf771a9448">
                  <img alt="" className="fg-acc3667e96" src="/admin-assets/27813f37.svg" />
                </div>
              </div>
              <div className="fg-452d346712" data-node-id="903:2372" data-name="Form Actions">
                <DesignAction className="fg-7b0601dd8e" data-node-id="903:2373" data-name="Cancel btn" label="انصراف" destination="role-detail">
                  <p className="fg-9cf1fca571" dir="auto" data-node-id="903:2374">
                    انصراف
                  </p>
                </DesignAction>
                <DesignAction className="fg-e464195ded" data-node-id="903:2375" data-name="Save btn" label="ذخیره تغییرات">
                  <p className="fg-8ffc872800" dir="auto" data-node-id="903:2376">
                    ذخیره تغییرات
                  </p>
                </DesignAction>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:2377" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="903:2378" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="903:2379">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="903:2380" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:285" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="903:2382" data-name="Navigation">
          <DesignAction className="fg-4a871e0b11" data-node-id="903:2383" data-name="Nav / Dashboard" label="داشبورد" destination="dashboard">
            <div className="fg-c51752dc8c" data-node-id="903:2606" data-name="layout-dashboard">
              <img alt="" className="fg-8faf267d30" src="/admin-assets/f1445aa6.svg" />
            </div>
            <p className="fg-6abfcd3772" dir="auto" data-node-id="903:2385">
              داشبورد
            </p>
          </DesignAction>
          <div className="fg-b9552021d1" data-node-id="903:2386" data-name="Nav Groups">
            <div className="fg-3f106e1f96" data-node-id="903:2387" data-name="Group-هنرمندان">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:2388" data-name="Group Header" label="هنرمندان" destination="artists">
                <div className="fg-fc08538add" data-node-id="903:2564" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:2390">
                  هنرمندان
                </p>
              </DesignAction>
            </div>
            <div className="fg-239f54e425" data-node-id="903:2391" data-name="Group-بازار">
              <DesignAction className="fg-a03b5fb6ac" data-node-id="903:2392" data-name="Group Header" label="بازار" destination="products">
                <div className="fg-fc08538add" data-node-id="903:2567" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:2394">
                  بازار
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:2395" data-name="Group-سفارش و ارسال">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:2396" data-name="Group Header" label="سفارش و ارسال" destination="orders">
                <div className="fg-fc08538add" data-node-id="903:2570" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:2398">
                  سفارش و ارسال
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:2399" data-name="Group-رشد و خدمات">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:2400" data-name="Group Header" label="رشد و خدمات" destination="growth-overview">
                <div className="fg-fc08538add" data-node-id="903:2573" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:2402">
                  رشد و خدمات
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:2403" data-name="Group-فرصت‌ها">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:2404" data-name="Group Header" label="فرصت‌ها" destination="opportunities">
                <div className="fg-fc08538add" data-node-id="903:2576" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:2406">
                  فرصت‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:2407" data-name="Group-مالی و عضویت">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:2408" data-name="Group Header" label="مالی و عضویت" destination="finance-overview">
                <div className="fg-fc08538add" data-node-id="903:2579" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:2410">
                  مالی و عضویت
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:2411" data-name="Group-بین‌الملل">
              <div className="fg-c7482c92d9" data-node-id="903:2412" data-name="Group Header">
                <div className="fg-fc08538add" data-node-id="903:2582" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:2414">
                  بین‌الملل
                </p>
              </div>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:2415" data-name="Group-گزارش‌ها">
              <DesignAction className="fg-c7482c92d9" data-node-id="903:2416" data-name="Group Header" label="گزارش‌ها" destination="reports">
                <div className="fg-fc08538add" data-node-id="903:2585" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/25da2986.svg" />
                </div>
                <p className="fg-a0d8ce95c4" dir="auto" data-node-id="903:2418">
                  گزارش‌ها
                </p>
              </DesignAction>
            </div>
            <div className="fg-3f106e1f96" data-node-id="903:2419" data-name="Group-تنظیمات">
              <DesignAction className="fg-9dda82322e" data-node-id="903:2420" data-name="Group Header" label="تنظیمات" destination="settings">
                <div className="fg-fc08538add" data-node-id="903:2588" data-name="chevron-down">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/820d98a0.svg" />
                </div>
                <p className="fg-44cbb6f8f0" dir="auto" data-node-id="903:2422">
                  تنظیمات
                </p>
              </DesignAction>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="903:2423" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="903:2424" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="903:2425">
              کارشناس ارشد سیستم
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="903:2426">
              مدیر کنترل دسترسی
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="903:2427" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/7235b42c.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
