// Figma 214:10 — Artist / Orders Export — Modal
import { DesignAction, DesignField, DesignChoice, DesignDialog } from "../design-controls";
import { ArtistSidebar } from "../artist-sidebar";

export default function ArtistOrdersExportModal() {
  return (
    <div className="fg-3984f97129" data-node-id="214:10" data-name="Artist / Orders Export — Modal">
      <div className="fg-8918c2d906" data-node-id="214:11" data-name="Artist / Main" inert>
        <div className="fg-303f4615b9" data-node-id="214:12" data-name="Orders / Header">
          <DesignAction className="fg-401204ff71" data-node-id="214:13" data-name="Button / خروجی سفارش‌ها" label="خروجی سفارش‌ها">
            <div className="fg-99b05b9f5a" data-node-id="214:14">
              <p className="fg-32bd4c7660" dir="auto">
                خروجی سفارش‌ها
              </p>
            </div>
          </DesignAction>
          <div className="fg-618a79999c" data-node-id="214:15" data-name="Header / Text">
            <div className="fg-8591fef697" data-node-id="214:16">
              <p className="fg-32bd4c7660" dir="auto">
                سفارش‌ها
              </p>
            </div>
            <div className="fg-04f2e65621" data-node-id="214:17">
              <p className="fg-32bd4c7660" dir="auto">
                مدیریت سفارش‌های فروشگاه و سفارش‌های تخصیص‌یافته از فرصت‌ها
              </p>
            </div>
          </div>
        </div>
        <div className="fg-92635d9706" data-node-id="214:18" data-name="Orders / KPI Row">
          <div className="fg-1f44ecc4f5" data-node-id="214:19" data-name="Orders / KPI / نیاز به اقدام">
            <div className="fg-d5e4a8d3e9" data-node-id="214:20">
              <p className="fg-32bd4c7660" dir="auto">
                نیاز به اقدام
              </p>
            </div>
            <div className="fg-96a0e1d93f" data-node-id="214:21">
              <p className="fg-32bd4c7660" dir="auto">
                ۲ سفارش
              </p>
            </div>
            <div className="fg-94233e7fb2" data-node-id="214:22">
              <p className="fg-32bd4c7660" dir="auto">
                امروز باید بررسی شوند
              </p>
            </div>
          </div>
          <div className="fg-fd75249100" data-node-id="214:23" data-name="Orders / KPI / در حال آماده‌سازی">
            <div className="fg-d5e4a8d3e9" data-node-id="214:24">
              <p className="fg-32bd4c7660" dir="auto">
                در حال آماده‌سازی
              </p>
            </div>
            <div className="fg-96a0e1d93f" data-node-id="214:25">
              <p className="fg-32bd4c7660" dir="auto">
                ۳ سفارش
              </p>
            </div>
            <div className="fg-94233e7fb2" data-node-id="214:26">
              <p className="fg-32bd4c7660" dir="auto">
                در مراحل تولید و آماده‌سازی
              </p>
            </div>
          </div>
          <div className="fg-fd75249100" data-node-id="214:27" data-name="Orders / KPI / ارسال‌شده">
            <div className="fg-d5e4a8d3e9" data-node-id="214:28">
              <p className="fg-32bd4c7660" dir="auto">
                ارسال‌شده
              </p>
            </div>
            <div className="fg-96a0e1d93f" data-node-id="214:29">
              <p className="fg-32bd4c7660" dir="auto">
                ۲ سفارش
              </p>
            </div>
            <div className="fg-94233e7fb2" data-node-id="214:30">
              <p className="fg-32bd4c7660" dir="auto">
                در مسیر تحویل به مشتری
              </p>
            </div>
          </div>
          <div className="fg-fd75249100" data-node-id="214:31" data-name="Orders / KPI / تکمیل‌شده این ماه">
            <div className="fg-d5e4a8d3e9" data-node-id="214:32">
              <p className="fg-32bd4c7660" dir="auto">
                تکمیل‌شده این ماه
              </p>
            </div>
            <div className="fg-96a0e1d93f" data-node-id="214:33">
              <p className="fg-32bd4c7660" dir="auto">
                ۸ سفارش
              </p>
            </div>
            <div className="fg-94233e7fb2" data-node-id="214:34">
              <p className="fg-32bd4c7660" dir="auto">
                تحویل موفق و نهایی‌شده
              </p>
            </div>
          </div>
        </div>
        <div className="fg-90862355f6" data-node-id="214:35" data-name="Orders / Allocated Opportunity Banner">
          <div className="fg-5181ddc662" data-node-id="214:36" data-name="Banner / Action">
            <div className="fg-2aa955ef6f" data-node-id="214:37">
              <p className="fg-32bd4c7660" dir="auto">
                از فرصت سازمانی
              </p>
            </div>
            <div className="fg-8e8436c261" data-node-id="214:38">
              <p className="fg-32bd4c7660" dir="auto">
                ۲۴ عدد تخصیص‌یافته
              </p>
            </div>
            <DesignAction className="fg-06df45be68" data-node-id="214:39" data-name="Button / مشاهده سفارش" label="مشاهده سفارش">
              <div className="fg-cbcd3a7ab8" data-node-id="214:40">
                <p className="fg-32bd4c7660" dir="auto">
                  مشاهده سفارش
                </p>
              </div>
            </DesignAction>
          </div>
          <div className="fg-306e947698" data-node-id="214:41" data-name="Banner / Info">
            <div className="fg-57f410c048" data-node-id="214:42" data-name="Banner / Pills">
              <div className="fg-95293766ac" data-node-id="214:43" data-name="Pill / سفارش جدید">
                <div className="fg-e40134da9e" data-node-id="214:44">
                  <p className="fg-32bd4c7660" dir="auto">
                    سفارش جدید
                  </p>
                </div>
              </div>
              <div className="fg-b27d899df7" data-node-id="214:45" data-name="Pill / نیاز به پذیرش">
                <div className="fg-c4b6a77cdd" data-node-id="214:46">
                  <p className="fg-32bd4c7660" dir="auto">
                    نیاز به پذیرش
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-a49f9ce84a" data-node-id="214:47">
              <p className="fg-32bd4c7660" dir="auto">
                تأمین هدیه دست‌ساز برای رویداد شرکتی
              </p>
            </div>
            <div className="fg-4f2c88e190" data-node-id="214:48">
              <p className="fg-0a21096298" dir="auto">{`مهلت پاسخ: امروز  ·  زمان آماده‌سازی: ۱۲ روز کاری  ·  سهم تخصیص: ۲۴ عدد`}</p>
            </div>
          </div>
        </div>
        <div className="fg-d754253921" data-node-id="214:49" data-name="Orders / Filters">
          <div className="fg-a880f09fad" data-node-id="214:50" data-name="Pill / همه">
            <div className="fg-2aa955ef6f" data-node-id="214:51">
              <p className="fg-32bd4c7660" dir="auto">
                همه
              </p>
            </div>
          </div>
          <div className="fg-7dc1b51280" data-node-id="214:52" data-name="Pill / جدید">
            <div className="fg-200761397e" data-node-id="214:53">
              <p className="fg-32bd4c7660" dir="auto">
                جدید
              </p>
            </div>
          </div>
          <div className="fg-7378ed538d" data-node-id="214:54" data-name="Pill / پذیرفته‌شده">
            <div className="fg-200761397e" data-node-id="214:55">
              <p className="fg-32bd4c7660" dir="auto">
                پذیرفته‌شده
              </p>
            </div>
          </div>
          <div className="fg-052905b8ae" data-node-id="214:56" data-name="Pill / آماده‌سازی">
            <div className="fg-200761397e" data-node-id="214:57">
              <p className="fg-32bd4c7660" dir="auto">
                آماده‌سازی
              </p>
            </div>
          </div>
          <div className="fg-27d856280f" data-node-id="214:58" data-name="Pill / بسته‌بندی">
            <div className="fg-200761397e" data-node-id="214:59">
              <p className="fg-32bd4c7660" dir="auto">
                بسته‌بندی
              </p>
            </div>
          </div>
          <div className="fg-1de9e8a271" data-node-id="214:60" data-name="Pill / ارسال">
            <div className="fg-200761397e" data-node-id="214:61">
              <p className="fg-32bd4c7660" dir="auto">
                ارسال
              </p>
            </div>
          </div>
          <div className="fg-052905b8ae" data-node-id="214:62" data-name="Pill / تکمیل‌شده">
            <div className="fg-200761397e" data-node-id="214:63">
              <p className="fg-32bd4c7660" dir="auto">
                تکمیل‌شده
              </p>
            </div>
          </div>
        </div>
        <div className="fg-7698a7ed37" data-node-id="214:64" data-name="Orders / Section Header">
          <div className="fg-2b1ccf8db1" data-node-id="214:65">
            <p className="fg-32bd4c7660" dir="auto">
              ۱۲ سفارش
            </p>
          </div>
          <div className="fg-339e93995a" data-node-id="214:66" data-name="Section / Text">
            <div className="fg-6a9c2a134f" data-node-id="214:67">
              <p className="fg-32bd4c7660" dir="auto">
                سفارش‌های من
              </p>
            </div>
            <div className="fg-5f0d3e489d" data-node-id="214:68">
              <p className="fg-32bd4c7660" dir="auto">
                برای مشاهده جزئیات و تغییر مرحله هر سفارش، ردیف آن را باز کن.
              </p>
            </div>
          </div>
        </div>
        <div className="fg-f4c8d7fa27" data-node-id="214:69" data-name="Orders / Table">
          <div className="fg-389d81fd7e" data-node-id="214:70" data-name="Orders / Table Header">
            <div className="fg-19d45d92e5" data-node-id="214:71">
              <p className="fg-32bd4c7660" dir="auto">
                وضعیت
              </p>
            </div>
            <div className="fg-4ccefe4f4e" data-node-id="214:72">
              <p className="fg-32bd4c7660" dir="auto">
                مبلغ / تعداد
              </p>
            </div>
            <div className="fg-bb44c9a933" data-node-id="214:73">
              <p className="fg-32bd4c7660" dir="auto">
                مشتری / منبع
              </p>
            </div>
            <div className="fg-23239c91e9" data-node-id="214:74">
              <p className="fg-32bd4c7660" dir="auto">
                تاریخ
              </p>
            </div>
            <div className="fg-2bdb7c5673" data-node-id="214:75">
              <p className="fg-32bd4c7660" dir="auto">
                شماره سفارش
              </p>
            </div>
          </div>
          <div className="fg-5bfd3db841" data-node-id="214:76" data-name="Order Row / #NG-1052">
            <div className="fg-30c69096a6" data-node-id="214:77" data-name="Cell / Status">
              <div className="fg-dbb6380586" data-node-id="214:78" data-name="Pill / نیاز به پذیرش">
                <div className="fg-7e721cf25a" data-node-id="214:79">
                  <p className="fg-32bd4c7660" dir="auto">
                    نیاز به پذیرش
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-be21d3169c" data-node-id="214:80">
              <p className="fg-32bd4c7660" dir="auto">
                ۲۴ عدد
              </p>
            </div>
            <div className="fg-52af9e8896" data-node-id="214:81">
              <p className="fg-32bd4c7660" dir="auto">
                رویداد شرکتی / فرصت سازمانی
              </p>
            </div>
            <div className="fg-a7b3af3529" data-node-id="214:82">
              <p className="fg-32bd4c7660" dir="auto">
                امروز
              </p>
            </div>
            <div className="fg-861214b988" data-node-id="214:83">
              <p className="fg-32bd4c7660">#NG-1052</p>
            </div>
          </div>
          <div className="fg-80a82b2158" data-node-id="214:84" data-name="Order Row / #NG-1048">
            <div className="fg-30c69096a6" data-node-id="214:85" data-name="Cell / Status">
              <div className="fg-4e53addad8" data-node-id="214:86" data-name="Pill / آماده‌سازی">
                <div className="fg-c4b6a77cdd" data-node-id="214:87">
                  <p className="fg-32bd4c7660" dir="auto">
                    آماده‌سازی
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-be21d3169c" data-node-id="214:88">
              <p className="fg-32bd4c7660" dir="auto">
                ۲,۴۵۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-52af9e8896" data-node-id="214:89">
              <p className="fg-32bd4c7660" dir="auto">
                سمیه احمدی
              </p>
            </div>
            <div className="fg-a7b3af3529" data-node-id="214:90">
              <p className="fg-32bd4c7660" dir="auto">
                ۱۲ شهریور
              </p>
            </div>
            <div className="fg-861214b988" data-node-id="214:91">
              <p className="fg-32bd4c7660">#NG-1048</p>
            </div>
          </div>
          <div className="fg-80a82b2158" data-node-id="214:92" data-name="Order Row / #NG-1042">
            <div className="fg-30c69096a6" data-node-id="214:93" data-name="Cell / Status">
              <div className="fg-e50233349d" data-node-id="214:94" data-name="Pill / ارسال‌شده">
                <div className="fg-2aa955ef6f" data-node-id="214:95">
                  <p className="fg-32bd4c7660" dir="auto">
                    ارسال‌شده
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-be21d3169c" data-node-id="214:96">
              <p className="fg-32bd4c7660" dir="auto">
                ۱,۱۸۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-52af9e8896" data-node-id="214:97">
              <p className="fg-32bd4c7660" dir="auto">
                علی رضایی
              </p>
            </div>
            <div className="fg-a7b3af3529" data-node-id="214:98">
              <p className="fg-32bd4c7660" dir="auto">
                ۱۰ شهریور
              </p>
            </div>
            <div className="fg-861214b988" data-node-id="214:99">
              <p className="fg-32bd4c7660">#NG-1042</p>
            </div>
          </div>
          <div className="fg-80a82b2158" data-node-id="214:100" data-name="Order Row / #NG-1039">
            <div className="fg-30c69096a6" data-node-id="214:101" data-name="Cell / Status">
              <div className="fg-0deff7c3ca" data-node-id="214:102" data-name="Pill / تکمیل‌شده">
                <div className="fg-ffce0c038d" data-node-id="214:103">
                  <p className="fg-32bd4c7660" dir="auto">
                    تکمیل‌شده
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-be21d3169c" data-node-id="214:104">
              <p className="fg-32bd4c7660" dir="auto">
                ۳,۷۶۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-52af9e8896" data-node-id="214:105">
              <p className="fg-32bd4c7660" dir="auto">
                مریم کاظمی
              </p>
            </div>
            <div className="fg-a7b3af3529" data-node-id="214:106">
              <p className="fg-32bd4c7660" dir="auto">
                ۷ شهریور
              </p>
            </div>
            <div className="fg-861214b988" data-node-id="214:107">
              <p className="fg-32bd4c7660">#NG-1039</p>
            </div>
          </div>
          <div className="fg-80a82b2158" data-node-id="214:108" data-name="Order Row / #NG-1036">
            <div className="fg-30c69096a6" data-node-id="214:109" data-name="Cell / Status">
              <div className="fg-1712b23d41" data-node-id="214:110" data-name="Pill / بسته‌بندی">
                <div className="fg-0aa519afcd" data-node-id="214:111">
                  <p className="fg-32bd4c7660" dir="auto">
                    بسته‌بندی
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-be21d3169c" data-node-id="214:112">
              <p className="fg-32bd4c7660" dir="auto">
                ۹۸۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-52af9e8896" data-node-id="214:113">
              <p className="fg-32bd4c7660" dir="auto">
                نرگس محمدی
              </p>
            </div>
            <div className="fg-a7b3af3529" data-node-id="214:114">
              <p className="fg-32bd4c7660" dir="auto">
                ۵ شهریور
              </p>
            </div>
            <div className="fg-861214b988" data-node-id="214:115">
              <p className="fg-32bd4c7660">#NG-1036</p>
            </div>
          </div>
          <div className="fg-80a82b2158" data-node-id="214:116" data-name="Order Row / #NG-1031">
            <div className="fg-30c69096a6" data-node-id="214:117" data-name="Cell / Status">
              <div className="fg-866ad2730f" data-node-id="214:118" data-name="Pill / پذیرفته‌شده">
                <div className="fg-200761397e" data-node-id="214:119">
                  <p className="fg-32bd4c7660" dir="auto">
                    پذیرفته‌شده
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-be21d3169c" data-node-id="214:120">
              <p className="fg-32bd4c7660" dir="auto">
                ۱,۶۹۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-52af9e8896" data-node-id="214:121">
              <p className="fg-32bd4c7660" dir="auto">
                فاطمه کریمی
              </p>
            </div>
            <div className="fg-a7b3af3529" data-node-id="214:122">
              <p className="fg-32bd4c7660" dir="auto">
                ۳ شهریور
              </p>
            </div>
            <div className="fg-861214b988" data-node-id="214:123">
              <p className="fg-32bd4c7660">#NG-1031</p>
            </div>
          </div>
          <div className="fg-80a82b2158" data-node-id="214:124" data-name="Order Row / #NG-1027">
            <div className="fg-30c69096a6" data-node-id="214:125" data-name="Cell / Status">
              <div className="fg-0deff7c3ca" data-node-id="214:126" data-name="Pill / تکمیل‌شده">
                <div className="fg-ffce0c038d" data-node-id="214:127">
                  <p className="fg-32bd4c7660" dir="auto">
                    تکمیل‌شده
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-be21d3169c" data-node-id="214:128">
              <p className="fg-32bd4c7660" dir="auto">
                ۲,۱۲۰,۰۰۰ تومان
              </p>
            </div>
            <div className="fg-52af9e8896" data-node-id="214:129">
              <p className="fg-32bd4c7660" dir="auto">
                زهرا موسوی
              </p>
            </div>
            <div className="fg-a7b3af3529" data-node-id="214:130">
              <p className="fg-32bd4c7660" dir="auto">
                ۱ شهریور
              </p>
            </div>
            <div className="fg-861214b988" data-node-id="214:131">
              <p className="fg-32bd4c7660">#NG-1027</p>
            </div>
          </div>
        </div>
        <div className="fg-75ad79e568" data-node-id="214:132" data-name="Orders / Hint">
          <DesignAction className="fg-a97c265d85" data-node-id="214:133" data-name="Button / مشاهده فقط نیازمند اقدام" label="مشاهده فقط نیازمند اقدام">
            <div className="fg-99b05b9f5a" data-node-id="214:134">
              <p className="fg-32bd4c7660" dir="auto">
                مشاهده فقط نیازمند اقدام
              </p>
            </div>
          </DesignAction>
          <div className="fg-b6ae0806d8" data-node-id="214:135" data-name="Hint / Text">
            <div className="fg-cf82ba6382" data-node-id="214:136">
              <p className="fg-32bd4c7660" dir="auto">
                ۲ سفارش نیاز به اقدام تو دارند
              </p>
            </div>
            <div className="fg-bbc396f9ac" data-node-id="214:137">
              <p className="fg-32bd4c7660" dir="auto">
                اول سفارش‌های جدید و سفارش‌هایی که مهلت آماده‌سازی نزدیک دارند را بررسی کن.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ArtistSidebar variant="sidebar-edeca2e963" />
      <div className="fg-7d282c4d2c" data-node-id="214:216" data-name="Modal / Scrim" />
      <DesignDialog className="fg-5310081876" data-node-id="214:217" data-name="Orders Export / Modal" label="Orders Export / Modal">
        <DesignAction className="fg-aeb5b4c11e" data-node-id="214:218" data-name="Button / Close" destination="orders" back label="×">
          <div className="fg-6da5edbb5f" data-node-id="214:219">
            <p className="fg-32bd4c7660">×</p>
          </div>
        </DesignAction>
        <div className="fg-8438c61693" data-node-id="214:220">
          <p className="fg-32bd4c7660" dir="auto">
            خروجی سفارش‌ها
          </p>
        </div>
        <div className="fg-10a7f3e223" data-node-id="214:221">
          <p className="fg-32bd4c7660" dir="auto">
            فیلترهای خروجی را انتخاب کن و فایل سفارش‌ها را دریافت کن.
          </p>
        </div>
        <div className="fg-974aba601d" data-node-id="214:222" data-name="Rectangle" />
        <div className="fg-05eaec1d2b" data-node-id="214:223">
          <p className="fg-32bd4c7660" dir="auto">
            بازه زمانی
          </p>
        </div>
        <DesignField className="fg-9827e59ab5" data-node-id="214:224" data-name="Input / From" label="بازه زمانی" placeholder="از تاریخ">
          <div className="fg-7ec2cc5962" data-node-id="214:225">
            <p className="fg-32bd4c7660" dir="auto">
              از تاریخ
            </p>
          </div>
        </DesignField>
        <DesignField className="fg-09dbd8a5e5" data-node-id="214:226" data-name="Input / To" label="Input / To" placeholder="تا تاریخ">
          <div className="fg-7ec2cc5962" data-node-id="214:227">
            <p className="fg-32bd4c7660" dir="auto">
              تا تاریخ
            </p>
          </div>
        </DesignField>
        <div className="fg-e76ebf311c" data-node-id="214:228">
          <p className="fg-32bd4c7660" dir="auto">
            وضعیت سفارش‌ها
          </p>
        </div>
        <DesignChoice className="fg-c34d330b1e" data-node-id="214:229" data-name="Option / همه سفارش‌ها" label="همه سفارش‌ها ●" group="Orders Export / Modal" initial={true}>
          <div className="fg-0d5aeaea23" data-node-id="214:230">
            <p className="fg-32bd4c7660" dir="auto">
              همه سفارش‌ها
            </p>
          </div>
          <div className="fg-1c750b7785" data-node-id="214:231">
            <p className="fg-32bd4c7660">●</p>
          </div>
        </DesignChoice>
        <DesignChoice className="fg-151e64e0a5" data-node-id="214:232" data-name="Option / در حال انجام" label="در حال انجام ○" group="Orders Export / Modal" initial={false}>
          <div className="fg-3caaed1fa7" data-node-id="214:233">
            <p className="fg-32bd4c7660" dir="auto">
              در حال انجام
            </p>
          </div>
          <div className="fg-764fbe9fa3" data-node-id="214:234">
            <p className="fg-32bd4c7660">○</p>
          </div>
        </DesignChoice>
        <DesignChoice className="fg-322e75228d" data-node-id="214:235" data-name="Option / تکمیل‌شده" label="تکمیل‌شده ○" group="Orders Export / Modal" initial={false}>
          <div className="fg-3caaed1fa7" data-node-id="214:236">
            <p className="fg-32bd4c7660" dir="auto">
              تکمیل‌شده
            </p>
          </div>
          <div className="fg-764fbe9fa3" data-node-id="214:237">
            <p className="fg-32bd4c7660">○</p>
          </div>
        </DesignChoice>
        <DesignChoice className="fg-34161d7faf" data-node-id="214:238" data-name="Option / نیازمند اقدام" label="نیازمند اقدام ○" group="Orders Export / Modal" initial={false}>
          <div className="fg-3caaed1fa7" data-node-id="214:239">
            <p className="fg-32bd4c7660" dir="auto">
              نیازمند اقدام
            </p>
          </div>
          <div className="fg-764fbe9fa3" data-node-id="214:240">
            <p className="fg-32bd4c7660">○</p>
          </div>
        </DesignChoice>
        <div className="fg-544556e474" data-node-id="214:241">
          <p className="fg-32bd4c7660" dir="auto">
            فرمت خروجی
          </p>
        </div>
        <div className="fg-9fac9d3884" data-node-id="214:242" data-name="Format / Excel (.xlsx)">
          <div className="fg-19863f5786" data-node-id="214:243">
            <p className="fg-32bd4c7660">Excel (.xlsx)</p>
          </div>
        </div>
        <div className="fg-3e2cb65515" data-node-id="214:244" data-name="Format / CSV (.csv)">
          <div className="fg-c35bd6f763" data-node-id="214:245">
            <p className="fg-32bd4c7660">CSV (.csv)</p>
          </div>
        </div>
        <div className="fg-e12dec4f78" data-node-id="214:246" data-name="Format / PDF">
          <div className="fg-c35bd6f763" data-node-id="214:247">
            <p className="fg-32bd4c7660">PDF</p>
          </div>
        </div>
        <div className="fg-83b52e0cac" data-node-id="214:248" data-name="Info">
          <div className="fg-bf2a98dabf" data-node-id="214:249">
            <p className="fg-32bd4c7660" dir="auto">
              خروجی شامل شماره سفارش، وضعیت، تاریخ، نوع سفارش، تعداد/مبلغ و منبع سفارش خواهد بود.
            </p>
          </div>
        </div>
        <DesignAction className="fg-78184e00db" data-node-id="214:250" data-name="Button / Cancel" destination="orders" label="انصراف">
          <div className="fg-b00d984e16" data-node-id="214:251">
            <p className="fg-32bd4c7660" dir="auto">
              انصراف
            </p>
          </div>
        </DesignAction>
        <DesignAction className="fg-f793da923e" data-node-id="214:252" data-name="Button / Export" destination="orders" label="دریافت خروجی سفارش‌ها">
          <div className="fg-1884abd889" data-node-id="214:253">
            <p className="fg-32bd4c7660" dir="auto">
              دریافت خروجی سفارش‌ها
            </p>
          </div>
        </DesignAction>
      </DesignDialog>
    </div>
  );
}