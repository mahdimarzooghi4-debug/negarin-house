// Figma 831:587 — Auth / OTP Expired — Desktop
import { DesignAction, DesignField } from "../design-controls";

export default function AuthOtpExpiredDesktop() {
  return (
    <div className="fg-99d0c089cd" data-node-id="831:587" data-name="Auth / OTP Expired — Desktop">
      <div className="fg-e465380936" data-node-id="831:588" data-name="form-area">
        <div className="fg-2714b01eb3" data-node-id="831:589" data-name="desktop-topbar">
          <div className="fg-976f46d270" data-node-id="831:590" data-name="Frame">
            <p className="fg-a59e64f9d3" dir="auto" data-node-id="831:591">
              پشتیبانی نگارین
            </p>
          </div>
          <p className="fg-3f962418df" dir="auto" data-node-id="831:592">
            نگارین
          </p>
        </div>
        <div className="fg-14c82fb485" data-node-id="831:593" data-name="center-form-container">
          <div className="fg-d1b9d61d4b" data-node-id="831:594" data-name="auth-card">
            <div className="fg-21f659ea15" data-node-id="831:595" data-name="nav-header">
              <div className="fg-3d40d1feb7" data-node-id="831:596" data-name="back-icon">
                <div className="fg-b2a182ecf4" data-node-id="831:597" data-name="arrow-right">
                  <img alt="" className="fg-8faf267d30" src="/artist-assets/15d1cedfffd5a38d.svg" />
                </div>
              </div>
              <p className="fg-8ca35112a1" dir="auto" data-node-id="831:599">
                کد تأیید
              </p>
              <div className="fg-842ae29a35" data-node-id="831:600" data-name="Frame" />
            </div>
            <div className="fg-f14f88cf06" data-node-id="831:601" data-name="text-group">
              <p className="fg-91c8a58fd4" dir="auto" data-node-id="831:602">
                <span className="fg-6467d29dc8">{`کد ۶ رقمی ارسال‌شده به شماره همراه `}</span>
                <span className="fg-8393d69736">۰۹۱۲•••۴۵۶۷</span>
                <span className="fg-6467d29dc8">{` را وارد کنید.`}</span>
              </p>
            </div>
            <div className="fg-566314eda9" data-node-id="831:603" data-name="otp-boxes">
              <DesignField className="fg-2d9ee49fc6" data-node-id="831:604" data-name="Frame" label="رقم 1 کد تأیید" placeholder="۱" otp>
                <p className="fg-c2ace299bc" data-node-id="831:605">
                  ۱
                </p>
              </DesignField>
              <DesignField className="fg-2d9ee49fc6" data-node-id="831:606" data-name="Frame" label="رقم 2 کد تأیید" placeholder="۸" otp>
                <p className="fg-c2ace299bc" data-node-id="831:607">
                  ۸
                </p>
              </DesignField>
              <DesignField className="fg-2d9ee49fc6" data-node-id="831:608" data-name="Frame" label="رقم 3 کد تأیید" placeholder="۴" otp>
                <p className="fg-c2ace299bc" data-node-id="831:609">
                  ۴
                </p>
              </DesignField>
              <DesignField className="fg-2d9ee49fc6" data-node-id="831:610" data-name="Frame" label="رقم 4 کد تأیید" placeholder="۰" otp>
                <p className="fg-c2ace299bc" data-node-id="831:611">
                  ۰
                </p>
              </DesignField>
              <DesignField className="fg-2d9ee49fc6" data-node-id="831:612" data-name="Frame" label="رقم 5 کد تأیید" placeholder="۹" otp>
                <p className="fg-c2ace299bc" data-node-id="831:613">
                  ۹
                </p>
              </DesignField>
              <DesignField className="fg-2d9ee49fc6" data-node-id="831:614" data-name="Frame" label="رقم 6 کد تأیید" placeholder="۲" otp>
                <p className="fg-c2ace299bc" data-node-id="831:615">
                  ۲
                </p>
              </DesignField>
            </div>
            <div className="fg-807a235ff9" data-node-id="831:616" data-name="error-alert">
              <p className="fg-5d460e0516" dir="auto" data-node-id="831:617">
                کد تأیید منقضی شده است.
              </p>
              <p className="fg-9f36b32762" dir="auto" data-node-id="831:618">
                زمان استفاده از کد به پایان رسیده. لطفاً مجدداً درخواست ارسال کد نمایید.
              </p>
            </div>
            <div className="fg-217c00de88" data-node-id="831:619" data-name="actions">
              <DesignAction className="fg-a9c1ba3b38" data-node-id="831:620" data-name="Negarin / Button" destination="otp-resend" label="ارسال مجدد کد">
                <p className="fg-d10f2ddccf" dir="auto" data-node-id="I831:620;46:9">
                  ارسال مجدد کد
                </p>
              </DesignAction>
              <p className="fg-0728a651f8" dir="auto" data-node-id="831:623">
                ویرایش شماره تلفن
              </p>
            </div>
          </div>
        </div>
        <div className="fg-b79c743993" data-node-id="831:624" data-name="desktop-footer">
          <p className="fg-62927fc617" dir="auto" data-node-id="831:625">
            تمامی حقوق مادی و معنوی محفوظ است.
          </p>
        </div>
      </div>
      <div className="fg-92cd0a7784" data-node-id="831:626" data-name="visual-panel">
        <div className="fg-b2439d383f" data-node-id="1171:31" data-name="Persian Girih Pattern">
          <div className="fg-dbf3c7319b">
            <img alt="" className="fg-acc3667e96" src="/artist-assets/5a2c9b9eab881522.svg" />
          </div>
        </div>
        <div className="fg-bd8cbd285d" data-node-id="831:627" data-name="top-tag">
          <div className="fg-2e0ff451d2" data-node-id="831:628" data-name="brand-header">
            <div className="fg-aa3cc88f7e" data-node-id="831:629" data-name="logo">
              <div className="fg-f84de76785" data-node-id="836:60" data-name="Negarin Logo">
                <img alt="" className="fg-71eecc63f8" src="/artist-assets/71ee9bd1446ae19.png" />
              </div>
            </div>
            <p className="fg-1a0ee5dd8f" dir="auto" data-node-id="831:632">
              نــگــاریــن
            </p>
          </div>
        </div>
        <div className="fg-0fd3ae64ad" data-node-id="831:633" data-name="hero-copy">
          <p className="fg-03b587c50b" dir="auto" data-node-id="831:634">
            امنیت و حریم خصوصی
          </p>
          <p className="fg-889bf1aa9a" dir="auto" data-node-id="831:635">
            حفاظت از اطلاعات شما اولویت نگارین است.
          </p>
        </div>
        <div className="fg-397ec49421" data-node-id="831:636" data-name="footer-stamp">
          <p className="fg-2464397d98" dir="auto" data-node-id="831:637">
            تمامی حقوق مادی و معنوی برای نگارین محفوظ است.
          </p>
        </div>
      </div>
    </div>
  );
}