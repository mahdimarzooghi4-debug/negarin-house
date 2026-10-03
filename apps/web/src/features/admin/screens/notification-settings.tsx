// Figma 903:914 — Admin / Notification Settings — Desktop
import { DesignAction, DesignField, DesignChoice } from "../../artist/design-controls";
import { AdminSidebar } from "../admin-sidebar";

export default function AdminNotificationSettingsDesktop() {
  return (
    <div className="fg-2f84151df8" data-node-id="903:914" data-name="Admin / Notification Settings — Desktop">
      <div className="fg-f7cede9c7c" data-node-id="903:989" data-name="Main Workspace">
        <div className="fg-aa86f531f3" data-node-id="903:990" data-name="Header">
          <div className="fg-a34c8fe932" data-node-id="903:991" data-name="Left Actions">
            <div className="fg-08c31cb510" data-node-id="903:992" data-name="Staff Profile Circle">
              <img alt="" className="fg-8038e5755b" src="/admin-assets/a2ac74cc.png" />
            </div>
            <DesignAction className="fg-2f3c66203e" data-node-id="903:993" data-name="Notification Bell Button" label="Notification Bell Button">
              <div className="fg-b04bb497e9" data-node-id="903:994" data-name="Notification dot">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/03bf6957.svg" />
              </div>
              <div className="fg-ccdeeb4977" data-node-id="903:995" data-name="Icon Container">
                <div className="fg-58d29b27c0" data-node-id="903:1557" data-name="bell">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/3afd6085.svg" />
                </div>
              </div>
            </DesignAction>
          </div>
          <div className="fg-460d084997" data-node-id="903:997" data-name="Right Header">
            <DesignField className="fg-bed5bc97c2" data-node-id="903:998" data-name="Global Search" label="جستجو" placeholder="جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...">
              <p className="fg-3a06ee4cfb" dir="auto" data-node-id="903:999">
                جستجو در تنظیمات، گزارش‌ها و شناسه‌ها...
              </p>
              <div className="fg-c5bca379c9" data-node-id="903:1000" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1560" data-name="search">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/da89983a.svg" />
                </div>
              </div>
            </DesignField>
            <div className="fg-db65f399cd" data-node-id="903:1002" data-name="Title and Path">
              <div className="fg-860c2f1554" data-node-id="903:1003" data-name="Breadcrumbs">
                <div className="fg-f1a0c10dac" data-node-id="903:1004" data-name="Frame">
                  <p className="fg-6089ad2d75" dir="auto" data-node-id="903:1005">
                    تنظیمات سیستمی
                  </p>
                  <p className="fg-29a4797011" data-node-id="903:1006">{`>`}</p>
                </div>
                <div className="fg-e8210ba625" data-node-id="903:1007" data-name="Frame">
                  <p className="fg-79f0034e69" dir="auto" data-node-id="903:1008">
                    اعلان‌ها
                  </p>
                </div>
              </div>
              <p className="fg-99f699cdc3" dir="auto" data-node-id="903:1009">
                تنظیمات اعلان‌ها
              </p>
            </div>
          </div>
        </div>
        <div className="fg-28892a2677" data-node-id="903:1010" data-name="Scrollable Content">
          <div className="fg-4af8193516" data-node-id="903:1011" data-name="Header Card">
            <DesignAction className="fg-93bd4ba34f" data-node-id="903:1012" data-name="Save Action" label="ذخیره تنظیمات اعلان‌ها">
              <p className="fg-8ffc872800" dir="auto" data-node-id="903:1013">
                ذخیره تنظیمات اعلان‌ها
              </p>
              <div className="fg-922563b3e9" data-node-id="903:1014" data-name="Icon Container">
                <div className="fg-5cca20e57d" data-node-id="903:1563" data-name="check">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/d087ed07.svg" />
                </div>
              </div>
            </DesignAction>
            <div className="fg-639a507765" data-node-id="903:1016" data-name="Desc Group">
              <p className="fg-cc80f4f797" dir="auto" data-node-id="903:1017">
                پیکربندی کانال‌های اطلاع‌رسانی
              </p>
              <p className="fg-1b90c6d8d3" dir="auto" data-node-id="903:1018">
                دریافت هشدارها در پنل اداری (سیستمی) یا از طریق ارسال خودکار ایمیل به کارشناسان مربوطه را مشخص کنید.
              </p>
            </div>
          </div>
          <div className="fg-e0326b7162" data-node-id="903:1019" data-name="Notification Settings Scroll Area">
            <div className="fg-cd12f2a8cf" data-node-id="903:1020" data-name="Category Section Card">
              <div className="fg-3ed396a233" data-node-id="903:1021" data-name="Category Header">
                <p className="fg-0696b29e72" dir="auto" data-node-id="903:1022">
                  بخش سفارشات
                </p>
                <p className="fg-58d61dbfc5" dir="auto" data-node-id="903:1023">
                  هشدارهای مربوط به سفارش‌های ثبت‌شده جدید، تغییرات وضعیت لجستیکی و گزارش‌های مفقودی یا تاخیر.
                </p>
              </div>
              <div className="fg-7d23f29dfe" data-node-id="903:1024" data-name="Sub Table Header">
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1025">
                  اطلاع‌رسانی ایمیل
                </p>
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1026">
                  اعلان سیستمی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:1027">
                  رخداد سیستمی
                </p>
              </div>
              <div className="fg-62f39da6b2" data-node-id="903:1028" data-name="Sub Table Rows">
                <div className="fg-7ef07a434a" data-node-id="903:1029" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1030" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1031" data-name="Toggle Component" label="ایمیل — ثبت سفارش جدید توسط مشتری" group="Email Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1034" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1035" data-name="Toggle Component" label="سیستم — ثبت سفارش جدید توسط مشتری" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1038">
                    ثبت سفارش جدید توسط مشتری
                  </p>
                </div>
                <div className="fg-7ef07a434a" data-node-id="903:1039" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1040" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1041" data-name="Toggle Component" label="ایمیل — تغییر وضعیت ارسال به تحویل‌شده" group="Email Toggle Col" initial={false} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/f031fcc9.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1044" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1045" data-name="Toggle Component" label="سیستم — تغییر وضعیت ارسال به تحویل‌شده" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1048">
                    تغییر وضعیت ارسال به تحویل‌شده
                  </p>
                </div>
                <div className="fg-7ef07a434a" data-node-id="903:1049" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1050" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1051" data-name="Toggle Component" label="ایمیل — ثبت گزارش تاخیر در تحویل آثار" group="Email Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1054" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1055" data-name="Toggle Component" label="سیستم — ثبت گزارش تاخیر در تحویل آثار" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1058">
                    ثبت گزارش تاخیر در تحویل آثار
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-cd12f2a8cf" data-node-id="903:1059" data-name="Category Section Card">
              <div className="fg-3ed396a233" data-node-id="903:1060" data-name="Category Header">
                <p className="fg-0696b29e72" dir="auto" data-node-id="903:1061">
                  بخش بررسی محصول
                </p>
                <p className="fg-58d61dbfc5" dir="auto" data-node-id="903:1062">
                  هشدارهای مربوط به صف تایید آثار، بازخورد کارشناسان ارزیابی و لزوم اصلاح جزئیات محصول.
                </p>
              </div>
              <div className="fg-7d23f29dfe" data-node-id="903:1063" data-name="Sub Table Header">
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1064">
                  اطلاع‌رسانی ایمیل
                </p>
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1065">
                  اعلان سیستمی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:1066">
                  رخداد سیستمی
                </p>
              </div>
              <div className="fg-62f39da6b2" data-node-id="903:1067" data-name="Sub Table Rows">
                <div className="fg-7ef07a434a" data-node-id="903:1068" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1069" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1070" data-name="Toggle Component" label="ایمیل — بارگذاری محصول جدید در صف بررسی" group="Email Toggle Col" initial={false} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/f031fcc9.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1073" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1074" data-name="Toggle Component" label="سیستم — بارگذاری محصول جدید در صف بررسی" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1077">
                    بارگذاری محصول جدید در صف بررسی
                  </p>
                </div>
                <div className="fg-7ef07a434a" data-node-id="903:1078" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1079" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1080" data-name="Toggle Component" label="ایمیل — ثبت درخواست اصلاحات محصول توسط داور" group="Email Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1083" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1084" data-name="Toggle Component" label="سیستم — ثبت درخواست اصلاحات محصول توسط داور" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1087">
                    ثبت درخواست اصلاحات محصول توسط داور
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-cd12f2a8cf" data-node-id="903:1088" data-name="Category Section Card">
              <div className="fg-3ed396a233" data-node-id="903:1089" data-name="Category Header">
                <p className="fg-0696b29e72" dir="auto" data-node-id="903:1090">
                  بخش مالی و تسویه‌ها
                </p>
                <p className="fg-58d61dbfc5" dir="auto" data-node-id="903:1091">
                  اطلاع‌رسانی درخواست‌های تسویه هنرمندان، تایید شبا و فیش‌های پردازش پایا.
                </p>
              </div>
              <div className="fg-7d23f29dfe" data-node-id="903:1092" data-name="Sub Table Header">
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1093">
                  اطلاع‌رسانی ایمیل
                </p>
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1094">
                  اعلان سیستمی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:1095">
                  رخداد سیستمی
                </p>
              </div>
              <div className="fg-62f39da6b2" data-node-id="903:1096" data-name="Sub Table Rows">
                <div className="fg-7ef07a434a" data-node-id="903:1097" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1098" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1099" data-name="Toggle Component" label="ایمیل — ثبت درخواست تسویه جدید" group="Email Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1102" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1103" data-name="Toggle Component" label="سیستم — ثبت درخواست تسویه جدید" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1106">
                    ثبت درخواست تسویه جدید
                  </p>
                </div>
                <div className="fg-7ef07a434a" data-node-id="903:1107" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1108" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1109" data-name="Toggle Component" label="ایمیل — تکمیل موفقیت‌آمیز حواله پایا" group="Email Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1112" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1113" data-name="Toggle Component" label="سیستم — تکمیل موفقیت‌آمیز حواله پایا" group="System Toggle Col" initial={false} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/f031fcc9.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1116">
                    تکمیل موفقیت‌آمیز حواله پایا
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-cd12f2a8cf" data-node-id="903:1117" data-name="Category Section Card">
              <div className="fg-3ed396a233" data-node-id="903:1118" data-name="Category Header">
                <p className="fg-0696b29e72" dir="auto" data-node-id="903:1119">
                  بخش هنرمندان
                </p>
                <p className="fg-58d61dbfc5" dir="auto" data-node-id="903:1120">
                  هشدارهای مربوط به ثبت نام‌های جدید، تکمیل سطح رشد و ارسال تاییدیه مدارک.
                </p>
              </div>
              <div className="fg-7d23f29dfe" data-node-id="903:1121" data-name="Sub Table Header">
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1122">
                  اطلاع‌رسانی ایمیل
                </p>
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1123">
                  اعلان سیستمی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:1124">
                  رخداد سیستمی
                </p>
              </div>
              <div className="fg-62f39da6b2" data-node-id="903:1125" data-name="Sub Table Rows">
                <div className="fg-7ef07a434a" data-node-id="903:1126" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1127" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1128" data-name="Toggle Component" label="ایمیل — تکمیل ثبت‌نام و مدارک اولیه هنرمند" group="Email Toggle Col" initial={false} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/f031fcc9.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1131" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1132" data-name="Toggle Component" label="سیستم — تکمیل ثبت‌نام و مدارک اولیه هنرمند" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1135">
                    تکمیل ثبت‌نام و مدارک اولیه هنرمند
                  </p>
                </div>
                <div className="fg-7ef07a434a" data-node-id="903:1136" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1137" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1138" data-name="Toggle Component" label="ایمیل — ارتقای سطح رشد هنرمند به رتبه بالاتر" group="Email Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1141" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1142" data-name="Toggle Component" label="سیستم — ارتقای سطح رشد هنرمند به رتبه بالاتر" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1145">
                    ارتقای سطح رشد هنرمند به رتبه بالاتر
                  </p>
                </div>
              </div>
            </div>
            <div className="fg-cd12f2a8cf" data-node-id="903:1146" data-name="Category Section Card">
              <div className="fg-3ed396a233" data-node-id="903:1147" data-name="Category Header">
                <p className="fg-0696b29e72" dir="auto" data-node-id="903:1148">
                  بخش بین‌الملل
                </p>
                <p className="fg-58d61dbfc5" dir="auto" data-node-id="903:1149">
                  هشدارهای مربوط به بسته‌های صادراتی، شرکای بین‌المللی و عملیات ارسال.
                </p>
              </div>
              <div className="fg-7d23f29dfe" data-node-id="903:1150" data-name="Sub Table Header">
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1151">
                  اطلاع‌رسانی ایمیل
                </p>
                <p className="fg-0ec0a4ee14" dir="auto" data-node-id="903:1152">
                  اعلان سیستمی
                </p>
                <p className="fg-5fa1cff2ec" dir="auto" data-node-id="903:1153">
                  رخداد سیستمی
                </p>
              </div>
              <div className="fg-62f39da6b2" data-node-id="903:1154" data-name="Sub Table Rows">
                <div className="fg-7ef07a434a" data-node-id="903:1155" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1156" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1157" data-name="Toggle Component" label="ایمیل — به‌روزرسانی وضعیت ارسال بین‌المللی" group="Email Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1160" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1161" data-name="Toggle Component" label="سیستم — به‌روزرسانی وضعیت ارسال بین‌المللی" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1164">
                    به‌روزرسانی وضعیت ارسال بین‌المللی
                  </p>
                </div>
                <div className="fg-7ef07a434a" data-node-id="903:1165" data-name="Option Row">
                  <div className="fg-57c1226238" data-node-id="903:1166" data-name="Email Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1167" data-name="Toggle Component" label="ایمیل — اعلام نیاز به میانجی‌گری در سفارش صادراتی" group="Email Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <div className="fg-57c1226238" data-node-id="903:1170" data-name="System Toggle Col">
                    <DesignChoice className="fg-fe974d8e68" data-node-id="903:1171" data-name="Toggle Component" label="سیستم — اعلام نیاز به میانجی‌گری در سفارش صادراتی" group="System Toggle Col" initial={true} multiple>
                      <img alt="" className="fg-8faf267d30" src="/admin-assets/20053d1b.svg" />
                    </DesignChoice>
                  </div>
                  <p className="fg-8b55499214" dir="auto" data-node-id="903:1174">
                    اعلام نیاز به میانجی‌گری در سفارش صادراتی
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar className="fg-1ae6468b1f" data-node-id="903:915" data-name="Sidebar">
        <div className="fg-bfcc56511d" data-node-id="903:916" data-name="Brand">
          <p className="fg-013587b973" dir="auto" data-node-id="903:917">
            خانه نگارین
          </p>
          <div className="fg-85567f1031" data-node-id="903:918" data-name="Logo Container">
            <div className="fg-842ae29a35" data-node-id="997:280" data-name="Brand / Negarin Logo">
              <img alt="" className="fg-71eecc63f8" src="/admin-assets/9f534c0e.png" />
            </div>
          </div>
        </div>
        <div className="fg-47d4dde56b" data-node-id="903:920" data-name="Navigation">
          <div className="fg-4a871e0b11" data-node-id="903:921" data-name="Nav Group - هنرمندان">
            <div className="fg-66002a03ce" data-node-id="903:922" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1503" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-3d814de2a2" data-node-id="903:924" data-name="Label Group">
              <p className="fg-b79c8b94b2" dir="auto" data-node-id="903:925">
                هنرمندان
              </p>
              <div className="fg-e747b81e51" data-node-id="903:926" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1506" data-name="users">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/5e9a9f0c.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:928" data-name="Nav Group - بازار">
            <div className="fg-66002a03ce" data-node-id="903:929" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1509" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-03e9160301" data-node-id="903:931" data-name="Label Group">
              <p className="fg-b32cdc0c3d" dir="auto" data-node-id="903:932">
                بازار
              </p>
              <div className="fg-0495670d86" data-node-id="903:933" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1512" data-name="shopping-bag">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/735bc7e1.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:935" data-name="Nav Group - سفارش و ارسال">
            <div className="fg-66002a03ce" data-node-id="903:936" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1515" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-f382adfae7" data-node-id="903:938" data-name="Label Group">
              <p className="fg-d3dc98ec1a" dir="auto" data-node-id="903:939">
                سفارش و ارسال
              </p>
              <div className="fg-21a7e4c908" data-node-id="903:940" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1518" data-name="truck">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/40bac158.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:942" data-name="Nav Group - رشد و خدمات">
            <div className="fg-66002a03ce" data-node-id="903:943" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1521" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-d87227fb46" data-node-id="903:945" data-name="Label Group">
              <p className="fg-5d47f1d2f4" dir="auto" data-node-id="903:946">
                رشد و خدمات
              </p>
              <div className="fg-bb81ba1266" data-node-id="903:947" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1524" data-name="award">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/9d31bb3e.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:949" data-name="Nav Group - فرصت‌ها">
            <div className="fg-66002a03ce" data-node-id="903:950" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1527" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-4e71a3c96b" data-node-id="903:952" data-name="Label Group">
              <p className="fg-a00b815a53" dir="auto" data-node-id="903:953">
                فرصت‌ها
              </p>
              <div className="fg-78d08da6be" data-node-id="903:954" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1530" data-name="briefcase">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/ac50726a.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:956" data-name="Nav Group - مالی و عضویت">
            <div className="fg-66002a03ce" data-node-id="903:957" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1533" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-bd12e2ac82" data-node-id="903:959" data-name="Label Group">
              <p className="fg-ed94e4edb1" dir="auto" data-node-id="903:960">
                مالی و عضویت
              </p>
              <div className="fg-ce26aa0e85" data-node-id="903:961" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1536" data-name="credit-card">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/8691c991.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:963" data-name="Nav Group - بین‌الملل">
            <div className="fg-66002a03ce" data-node-id="903:964" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1539" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-4e71a3c96b" data-node-id="903:966" data-name="Label Group">
              <p className="fg-a00b815a53" dir="auto" data-node-id="903:967">
                بین‌الملل
              </p>
              <div className="fg-78d08da6be" data-node-id="903:968" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1542" data-name="globe">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/0cf078d5.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:970" data-name="Nav Group - گزارش‌ها">
            <div className="fg-66002a03ce" data-node-id="903:971" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1545" data-name="chevron-down">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/11ae659b.svg" />
              </div>
            </div>
            <div className="fg-fbfe6c292b" data-node-id="903:973" data-name="Label Group">
              <p className="fg-2996ed7236" dir="auto" data-node-id="903:974">
                گزارش‌ها
              </p>
              <div className="fg-3041b2d85a" data-node-id="903:975" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1548" data-name="trending-up">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/73d24f2b.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="fg-4a871e0b11" data-node-id="903:977" data-name="Nav Group - تنظیمات">
            <div className="fg-66002a03ce" data-node-id="903:978" data-name="Icon Container">
              <div className="fg-fc08538add" data-node-id="903:1551" data-name="chevron-left">
                <img alt="" className="fg-8faf267d30" src="/admin-assets/f745641b.svg" />
              </div>
            </div>
            <div className="fg-f0757704bb" data-node-id="903:980" data-name="Label Group">
              <p className="fg-c3598a6087" dir="auto" data-node-id="903:981">
                تنظیمات
              </p>
              <div className="fg-da91c13c70" data-node-id="903:982" data-name="Icon Container">
                <div className="fg-c51752dc8c" data-node-id="903:1554" data-name="settings">
                  <img alt="" className="fg-8faf267d30" src="/admin-assets/fec4b634.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fg-2f3d1bdf48" data-node-id="903:984" data-name="Staff Profile">
          <div className="fg-0d2351e917" data-node-id="903:985" data-name="Profile Details">
            <p className="fg-7ec414a4a7" dir="auto" data-node-id="903:986">
              کارشناس عملیات ارشد
            </p>
            <p className="fg-80235ae490" dir="auto" data-node-id="903:987">
              مدیر سیستم پشتیبان
            </p>
          </div>
          <div className="fg-3dfce0fd89" data-node-id="903:988" data-name="Staff Avatar">
            <img alt="" className="fg-2ce1fee1c9" src="/admin-assets/a36aa18d.png" />
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}
