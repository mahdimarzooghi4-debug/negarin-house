// Figma 903:247 — Admin / Reports — Desktop
import { DesignAction, DesignField } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminReportsDesktop() {
  return (
    <div className="fg-2f84151df8" data-node-id="903:247" data-name="Admin / Reports — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:322" data-name="Main Workspace">
        <div className="fg-aa86f531f3" data-node-id="903:323" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:324" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:325" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="903:326" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="903:327" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-ccdeeb4977" data-node-id="903:328" data-name="Icon Container">
                <div className="fg-58d29b27c0" data-node-id="903:1230" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3afd6085.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="903:330" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="903:331" data-name="Global Search" label="جستجو" placeholder="جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="903:332">
                جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...
              </p>
              <div className="fg-c5bca379c9" data-node-id="903:333" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1233" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </div>
            </DesignField>
            <div className="fg-db65f399cd" data-node-id="903:335" data-name="Title and Path">
              <div className="fg-860c2f1554" data-node-id="903:336" data-name="Breadcrumbs">
                <div className="fg-f1a0c10dac" data-node-id="903:337" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:338">
                    داشبورد عملیات
                  </p>
                  <p className="fg-29a4797011" data-node-id="903:339">{`>`}</p>
                </div>
                <div className="fg-e8210ba625" data-node-id="903:340" data-name="Frame">
                  <p className="fg-79f0034e69" dir="auto" data-node-id="903:341">
                    گزارش‌ها
                  </p>
                </div>
              </div>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="903:342">
                گزارش‌ها و آمارهای عملیاتی
              </p>
            </div>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="903:343" data-name="Scrollable Content">
          <div className="fg-cd68a27429" data-node-id="903:344" data-name="Operational Description">
            <p className="fg-2ed64816ff" dir="auto" data-node-id="903:345">
              حوزه‌های عملیاتی سیستم نگارین
            </p>
            <p className="fg-1b90c6d8d3" dir="auto" data-node-id="903:346">
              یکی از بخش‌های زیر را برای مدیریت، بارگذاری و خروجی گزارش‌های پیشرفته سیستم انتخاب کنید.
            </p>
          </div>
          <div className="fg-6f66965dd3" data-node-id="903:347" data-name="Report Grid">
            <div className="fg-b13473824d" data-node-id="903:348" data-name="Row 1">
              <div className="fg-9f31144bd9" data-node-id="903:349" data-name="Report Group Tile">
                <div className="fg-c96fe10678" data-node-id="903:350" data-name="Tile Header">
                  <div className="fg-46e2561d54" data-node-id="903:351" data-name="Count Badge">
                    <p className="fg-76639a9d5c" dir="auto" data-node-id="903:352">
                      ۵ گزارش
                    </p>
                  </div>
                  <div className="fg-9eae8902b4" data-node-id="903:353" data-name="Title Group">
                    <p className="fg-737cde4ab2" dir="auto" data-node-id="903:354">
                      هنرمندان
                    </p>
                    <div className="fg-8d3835ab59" data-node-id="903:355" data-name="Icon Container">
                      <div className="fg-b2a182ecf4" data-node-id="903:1236" data-name="users">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/a189e939.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-ab493c410b" data-node-id="903:357" data-name="Report List">
                  <DesignAction className="fg-c96fe10678" data-node-id="903:358" data-name="Report Link Row" label="گزارش وضعیت حساب کاربری هنرمندان" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:359" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1239" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:361">
                      گزارش وضعیت حساب کاربری هنرمندان
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:362" data-name="Report Link Row" label="آمار توزیع سطوح رشد هنرمندان (جوانه تا سفیر)" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:363" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1242" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:365">
                      آمار توزیع سطوح رشد هنرمندان (جوانه تا سفیر)
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:366" data-name="Report Link Row" label="بررسی صلاحیت‌ها و تأیید مدارک ارسالی" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:367" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1245" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:369">
                      بررسی صلاحیت‌ها و تأیید مدارک ارسالی
                    </p>
                  </DesignAction>
                </div>
              </div>
              <div className="fg-9f31144bd9" data-node-id="903:370" data-name="Report Group Tile">
                <div className="fg-c96fe10678" data-node-id="903:371" data-name="Tile Header">
                  <div className="fg-46e2561d54" data-node-id="903:372" data-name="Count Badge">
                    <p className="fg-76639a9d5c" dir="auto" data-node-id="903:373">
                      ۴ گزارش
                    </p>
                  </div>
                  <div className="fg-9eae8902b4" data-node-id="903:374" data-name="Title Group">
                    <p className="fg-737cde4ab2" dir="auto" data-node-id="903:375">
                      محصولات
                    </p>
                    <div className="fg-8d3835ab59" data-node-id="903:376" data-name="Icon Container">
                      <div className="fg-b2a182ecf4" data-node-id="903:1248" data-name="shopping-bag">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/53859971.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-ab493c410b" data-node-id="903:378" data-name="Report List">
                  <DesignAction className="fg-c96fe10678" data-node-id="903:379" data-name="Report Link Row" label="گزارش صف بررسی و تایید آثار هنری" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:380" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1251" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:382">
                      گزارش صف بررسی و تایید آثار هنری
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:383" data-name="Report Link Row" label="تغییرات قیمت و آمار انتشار آثار" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:384" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1254" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:386">
                      تغییرات قیمت و آمار انتشار آثار
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:387" data-name="Report Link Row" label="موجودی انبار و بازخورد مشتریان" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:388" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1257" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:390">
                      موجودی انبار و بازخورد مشتریان
                    </p>
                  </DesignAction>
                </div>
              </div>
              <div className="fg-9f31144bd9" data-node-id="903:391" data-name="Report Group Tile">
                <div className="fg-c96fe10678" data-node-id="903:392" data-name="Tile Header">
                  <div className="fg-46e2561d54" data-node-id="903:393" data-name="Count Badge">
                    <p className="fg-76639a9d5c" dir="auto" data-node-id="903:394">
                      ۶ گزارش
                    </p>
                  </div>
                  <div className="fg-9eae8902b4" data-node-id="903:395" data-name="Title Group">
                    <p className="fg-737cde4ab2" dir="auto" data-node-id="903:396">
                      سفارشات
                    </p>
                    <div className="fg-8d3835ab59" data-node-id="903:397" data-name="Icon Container">
                      <div className="fg-b2a182ecf4" data-node-id="903:1260" data-name="truck">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ceac7a0d.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-ab493c410b" data-node-id="903:399" data-name="Report List">
                  <DesignAction className="fg-c96fe10678" data-node-id="903:400" data-name="Report Link Row" label="گزارش فرآیند کامل چرخه‌عمر سفارشات" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:401" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1263" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:403">
                      گزارش فرآیند کامل چرخه‌عمر سفارشات
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:404" data-name="Report Link Row" label="آمار تاخیر تامین آثار و لجستیک ارسال" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:405" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1266" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:407">
                      آمار تاخیر تامین آثار و لجستیک ارسال
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:408" data-name="Report Link Row" label="گزارش مغایرت‌ها و مرجوعی‌ها" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:409" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1269" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:411">
                      گزارش مغایرت‌ها و مرجوعی‌ها
                    </p>
                  </DesignAction>
                </div>
              </div>
              <div className="fg-9f31144bd9" data-node-id="903:412" data-name="Report Group Tile">
                <div className="fg-c96fe10678" data-node-id="903:413" data-name="Tile Header">
                  <div className="fg-46e2561d54" data-node-id="903:414" data-name="Count Badge">
                    <p className="fg-76639a9d5c" dir="auto" data-node-id="903:415">
                      ۵ گزارش
                    </p>
                  </div>
                  <div className="fg-9eae8902b4" data-node-id="903:416" data-name="Title Group">
                    <p className="fg-737cde4ab2" dir="auto" data-node-id="903:417">
                      رشد و خدمات
                    </p>
                    <div className="fg-8d3835ab59" data-node-id="903:418" data-name="Icon Container">
                      <div className="fg-b2a182ecf4" data-node-id="903:1272" data-name="award">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ab33f8c1.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-ab493c410b" data-node-id="903:420" data-name="Report List">
                  <DesignAction className="fg-c96fe10678" data-node-id="903:421" data-name="Report Link Row" label="گزارش درخواست‌های خدمات فعال و تخصیص" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:422" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1275" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:424">
                      گزارش درخواست‌های خدمات فعال و تخصیص
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:425" data-name="Report Link Row" label="آمار مصرف اعتبارات عملیاتی و اعتبارسنجی" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:426" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1278" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:428">
                      آمار مصرف اعتبارات عملیاتی و اعتبارسنجی
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:429" data-name="Report Link Row" label="پیشرفت پروژه‌های توانمندسازی هنرمندان" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:430" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1281" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:432">
                      پیشرفت پروژه‌های توانمندسازی هنرمندان
                    </p>
                  </DesignAction>
                </div>
              </div>
            </div>
            <div className="fg-b13473824d" data-node-id="903:433" data-name="Row 2">
              <div className="fg-9f31144bd9" data-node-id="903:434" data-name="Report Group Tile">
                <div className="fg-c96fe10678" data-node-id="903:435" data-name="Tile Header">
                  <div className="fg-46e2561d54" data-node-id="903:436" data-name="Count Badge">
                    <p className="fg-76639a9d5c" dir="auto" data-node-id="903:437">
                      ۴ گزارش
                    </p>
                  </div>
                  <div className="fg-9eae8902b4" data-node-id="903:438" data-name="Title Group">
                    <p className="fg-737cde4ab2" dir="auto" data-node-id="903:439">
                      فرصت‌ها
                    </p>
                    <div className="fg-8d3835ab59" data-node-id="903:440" data-name="Icon Container">
                      <div className="fg-b2a182ecf4" data-node-id="903:1284" data-name="briefcase">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/d0096495.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-ab493c410b" data-node-id="903:442" data-name="Report List">
                  <DesignAction className="fg-c96fe10678" data-node-id="903:443" data-name="Report Link Row" label="گزارش فرصت‌های فعال و نرخ همسان‌سازی" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:444" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1287" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:446">
                      گزارش فرصت‌های فعال و نرخ همسان‌سازی
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:447" data-name="Report Link Row" label="آمار پذیرش درخواست‌ها و ظرفیت شرکا" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:448" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1290" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:450">
                      آمار پذیرش درخواست‌ها و ظرفیت شرکا
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:451" data-name="Report Link Row" label="ارزیابی اثربخشی پروژه‌های حمایتی" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:452" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1293" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:454">
                      ارزیابی اثربخشی پروژه‌های حمایتی
                    </p>
                  </DesignAction>
                </div>
              </div>
              <div className="fg-9f31144bd9" data-node-id="903:455" data-name="Report Group Tile">
                <div className="fg-c96fe10678" data-node-id="903:456" data-name="Tile Header">
                  <div className="fg-46e2561d54" data-node-id="903:457" data-name="Count Badge">
                    <p className="fg-76639a9d5c" dir="auto" data-node-id="903:458">
                      ۷ گزارش
                    </p>
                  </div>
                  <div className="fg-9eae8902b4" data-node-id="903:459" data-name="Title Group">
                    <p className="fg-737cde4ab2" dir="auto" data-node-id="903:460">
                      مالی
                    </p>
                    <div className="fg-8d3835ab59" data-node-id="903:461" data-name="Icon Container">
                      <div className="fg-b2a182ecf4" data-node-id="903:1296" data-name="credit-card">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/9520dec3.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-ab493c410b" data-node-id="903:463" data-name="Report List">
                  <DesignAction className="fg-c96fe10678" data-node-id="903:464" data-name="Report Link Row" label="گزارش فرآیند تسویه‌حساب با هنرمندان" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:465" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1299" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:467">
                      گزارش فرآیند تسویه‌حساب با هنرمندان
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:468" data-name="Report Link Row" label="تحلیل تراکنش‌ها، کارمزدها و استردادها" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:469" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1302" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:471">
                      تحلیل تراکنش‌ها، کارمزدها و استردادها
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:472" data-name="Report Link Row" label="تراز مالی و جریان وجوه نقدی سیستم" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:473" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1305" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/ae8cc8be.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:475">
                      تراز مالی و جریان وجوه نقدی سیستم
                    </p>
                  </DesignAction>
                </div>
              </div>
              <div className="fg-9f31144bd9" data-node-id="903:476" data-name="Report Group Tile">
                <div className="fg-c96fe10678" data-node-id="903:477" data-name="Tile Header">
                  <div className="fg-46e2561d54" data-node-id="903:478" data-name="Count Badge">
                    <p className="fg-76639a9d5c" dir="auto" data-node-id="903:479">
                      ۳ گزارش
                    </p>
                  </div>
                  <div className="fg-9eae8902b4" data-node-id="903:480" data-name="Title Group">
                    <p className="fg-737cde4ab2" dir="auto" data-node-id="903:481">
                      سازمانی
                    </p>
                    <div className="fg-8d3835ab59" data-node-id="903:482" data-name="Icon Container">
                      <div className="fg-b2a182ecf4" data-node-id="903:1308" data-name="book-open">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/1e96135a.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-ab493c410b" data-node-id="903:484" data-name="Report List">
                  <DesignAction className="fg-c96fe10678" data-node-id="903:485" data-name="Report Link Row" label="آمار خریدهای سازمانی و ارگان‌های پشتیبان" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:486" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1311" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:488">
                      آمار خریدهای سازمانی و ارگان‌های پشتیبان
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:489" data-name="Report Link Row" label="گزارش کدهای معرف و بازاریابی حمایتی" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:490" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1314" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:492">
                      گزارش کدهای معرف و بازاریابی حمایتی
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:493" data-name="Report Link Row" label="پیمان‌های همکاری چندجانبه فعال" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:494" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1317" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:496">
                      پیمان‌های همکاری چندجانبه فعال
                    </p>
                  </DesignAction>
                </div>
              </div>
              <div className="fg-9f31144bd9" data-node-id="903:497" data-name="Report Group Tile">
                <div className="fg-c96fe10678" data-node-id="903:498" data-name="Tile Header">
                  <div className="fg-46e2561d54" data-node-id="903:499" data-name="Count Badge">
                    <p className="fg-76639a9d5c" dir="auto" data-node-id="903:500">
                      ۴ گزارش
                    </p>
                  </div>
                  <div className="fg-9eae8902b4" data-node-id="903:501" data-name="Title Group">
                    <p className="fg-737cde4ab2" dir="auto" data-node-id="903:502">
                      بین‌الملل
                    </p>
                    <div className="fg-8d3835ab59" data-node-id="903:503" data-name="Icon Container">
                      <div className="fg-b2a182ecf4" data-node-id="903:1320" data-name="globe">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/cb9c080a.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-ab493c410b" data-node-id="903:505" data-name="Report List">
                  <DesignAction className="fg-c96fe10678" data-node-id="903:506" data-name="Report Link Row" label="گزارش وضعیت صادرات و ارسال بین‌الملل" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:507" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1323" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:509">
                      گزارش وضعیت صادرات و ارسال بین‌الملل
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:510" data-name="Report Link Row" label="عملکرد شرکای صادراتی و بازارهای هدف" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:511" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1326" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:513">
                      عملکرد شرکای صادراتی و بازارهای هدف
                    </p>
                  </DesignAction>
                  <DesignAction className="fg-c96fe10678" data-node-id="903:514" data-name="Report Link Row" label="وضعیت عملیات صادراتی و آمار ارسال" destination="report-detail">
                    <div className="fg-fea147ec46" data-node-id="903:515" data-name="Icon Container">
                      <div className="fg-8a0ff48924" data-node-id="903:1329" data-name="arrow-left">
                        <img alt="" className="fg-8faf267d30" src="/admin-assets/283fbdd6.svg" />
                      </div>
                    </div>
                    <p className="fg-71ce793e77" dir="auto" data-node-id="903:517">
                      وضعیت عملیات صادراتی و آمار ارسال
                    </p>
                  </DesignAction>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:248" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="903:249" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="903:250">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="903:251" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:277" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="903:253" data-name="Navigation">
          <div className="fg-4a871e0b11" data-node-id="903:254" data-name="Nav Group - هنرمندان">
            <div className="fg-66002a03ce" data-node-id="903:255" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1176" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-3d814de2a2" data-node-id="903:257" data-name="Label Group">
              <p className="fg-b79c8b94b2" dir="auto" data-node-id="903:258">
                هنرمندان
              </p>
              <div className="fg-e747b81e51" data-node-id="903:259" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1185" data-name="users">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/f8ecedc7.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:261" data-name="Nav Group - بازار">
            <div className="fg-66002a03ce" data-node-id="903:262" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1179" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-03e9160301" data-node-id="903:264" data-name="Label Group">
              <p className="fg-b32cdc0c3d" dir="auto" data-node-id="903:265">
                بازار
              </p>
              <div className="fg-0495670d86" data-node-id="903:266" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1182" data-name="shopping-bag">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/735bc7e1.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:268" data-name="Nav Group - سفارش و ارسال">
            <div className="fg-66002a03ce" data-node-id="903:269" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1188" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-f382adfae7" data-node-id="903:271" data-name="Label Group">
              <p className="fg-d3dc98ec1a" dir="auto" data-node-id="903:272">
                سفارش و ارسال
              </p>
              <div className="fg-21a7e4c908" data-node-id="903:273" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1191" data-name="truck">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/0efab747.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:275" data-name="Nav Group - رشد و خدمات">
            <div className="fg-66002a03ce" data-node-id="903:276" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1194" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-d87227fb46" data-node-id="903:278" data-name="Label Group">
              <p className="fg-5d47f1d2f4" dir="auto" data-node-id="903:279">
                رشد و خدمات
              </p>
              <div className="fg-bb81ba1266" data-node-id="903:280" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1197" data-name="award">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/9d31bb3e.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:282" data-name="Nav Group - فرصت‌ها">
            <div className="fg-66002a03ce" data-node-id="903:283" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1200" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-4e71a3c96b" data-node-id="903:285" data-name="Label Group">
              <p className="fg-a00b815a53" dir="auto" data-node-id="903:286">
                فرصت‌ها
              </p>
              <div className="fg-78d08da6be" data-node-id="903:287" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1203" data-name="briefcase">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/66bfa012.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:289" data-name="Nav Group - مالی و عضویت">
            <div className="fg-66002a03ce" data-node-id="903:290" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1206" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-bd12e2ac82" data-node-id="903:292" data-name="Label Group">
              <p className="fg-ed94e4edb1" dir="auto" data-node-id="903:293">
                مالی و عضویت
              </p>
              <div className="fg-ce26aa0e85" data-node-id="903:294" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1209" data-name="credit-card">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/23e2b086.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:296" data-name="Nav Group - بین‌الملل">
            <div className="fg-66002a03ce" data-node-id="903:297" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1212" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-4e71a3c96b" data-node-id="903:299" data-name="Label Group">
              <p className="fg-a00b815a53" dir="auto" data-node-id="903:300">
                بین‌الملل
              </p>
              <div className="fg-78d08da6be" data-node-id="903:301" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1215" data-name="globe">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/4eb0d4b0.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:303" data-name="Nav Group - گزارش‌ها">
            <div className="fg-66002a03ce" data-node-id="903:304" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1218" data-name="chevron-left">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/f745641b.svg" />
              </div>
            </div>
            <div className="fg-fbfe6c292b" data-node-id="903:306" data-name="Label Group">
              <p className="fg-2996ed7236" dir="auto" data-node-id="903:307">
                گزارش‌ها
              </p>
              <div className="fg-3041b2d85a" data-node-id="903:308" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1221" data-name="trending-up">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/b2ce7318.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:310" data-name="Nav Group - تنظیمات">
            <div className="fg-66002a03ce" data-node-id="903:311" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1224" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-f0757704bb" data-node-id="903:313" data-name="Label Group">
              <p className="fg-c3598a6087" dir="auto" data-node-id="903:314">
                تنظیمات
              </p>
              <div className="fg-da91c13c70" data-node-id="903:315" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1227" data-name="settings">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/fec4b634.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="903:317" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="903:318" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="903:319">
              کارشناس عملیات ارشد
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="903:320">
              مدیر سیستم پشتیبان
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="903:321" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
