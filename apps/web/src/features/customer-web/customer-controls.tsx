"use client";
import {type HTMLAttributes,type ReactNode} from "react";
import {useRouter} from "next/navigation";
import {DesignAction,normalizeDigits} from "../artist/design-controls";
import {usePreview} from "../artist/preview-state";
import {Button} from "@negarin/ui";

function destination(label:string,screen:string){
 const text=label.replace(/person_outline|shopping_cart|bookmark_border|bookmark|arrow_back|arrow_forward|chevron_left/g,"").trim();
 if(text==='ادامه')return screen==='login'?'otp-verification':undefined;
 if(text==='ادامه خرید'&&screen==='cart')return 'login';
 if(text==='ذخیره آدرس')return 'checkout-review';
 if(text==='ادامه برای پرداخت')return 'payment-redirect';
 if(text==='بازگشت')return screen==='otp-verification'?'login':'home';
 if(/^(خانه|بازگشت به خانه|بازگشت به صفحه اصلی)$/.test(text))return 'home';
 if(/^(حساب|حساب کاربری|حساب مشتری)$/.test(text))return 'account-overview';
 if(/^(سبد|سبد خرید|مشاهده سبد)$/.test(text)||/افزودن به سبد/.test(text))return 'cart';
 if(/^(ذخیره‌ها|علاقه‌مندی‌ها)$/.test(text))return 'favorites';
 if(/^(روایت‌ها|ورود به روایت‌ها|مشاهده روایت‌ها)$/.test(text))return 'artist-stories';
 if(/مشاهده روایت|خواندن روایت|دیدن روایت/.test(text))return 'story-viewer';
 if(/کشف آثار|مشاهده آثار|دیدن آثار|جستجو|بازگشت به خرید|ادامه خرید|مشاهده محصولات/.test(text))return 'products';
 if(/مشاهده محصول|مشاهده اثر|دیدن اثر|مشاهده جزئیات اثر/.test(text))return 'product-detail';
 if(/مشاهده فروشگاه|فروشگاه هنرمند|مشاهده هنرمند/.test(text))return 'artist-store';
 if(/مشاهده سفارش‌ها|همه سفارش|سفارش‌های من/.test(text))return 'orders';
 if(/مشاهده سفارش|جزئیات سفارش|پیگیری سفارش/.test(text))return 'order-detail';
 if(/آدرس|نشانی/.test(text)&&text.length<30)return 'address-book';
 if(/تکمیل خرید|ادامه سفارش/.test(text))return 'login';
 if(/دریافت کد|ارسال کد|ورود.*ثبت|ورود و/.test(text))return 'otp-verification';
 if(/تأیید.*ادامه|تایید.*ادامه|ادامه خرید/.test(text)&&screen==='otp-verification')return 'address-book';
 if(/ادامه.*پرداخت|ادامه.*بررسی|ثبت.*نشانی|ذخیره.*ادامه/.test(text))return 'checkout-review';
 if(/پرداخت|درگاه/.test(text)&&screen==='checkout-review')return 'payment-redirect';
 if(/تلاش مجدد|پرداخت مجدد/.test(text))return 'checkout-review';
 if(/تغییر شماره/.test(text))return 'login';
 return undefined;
}
export function CustomerAction({label,children,...props}:HTMLAttributes<HTMLElement>&{label:string;children:ReactNode}){
 const preview=usePreview(),router=useRouter();const target=destination(label,preview.screen);
 const phone=preview.screen==='login'&&target==='otp-verification';const otp=preview.screen==='otp-verification'&&/تأیید|تایید|ادامه/.test(label);
 if(phone||otp)return <Button {...props} variant="unstyled" aria-label={label} onClick={()=>{
  if(phone&&!Object.values(preview.values).some(v=>/^09\d{9}$/.test(normalizeDigits(v)))){preview.notify('شماره همراه معتبر با ۱۱ رقم و شروع ۰۹ وارد کنید.');return;}
  if(otp){const code=Object.entries(preview.values).filter(([k])=>k.startsWith('otp-verification:رقم ')).sort(([a],[b])=>a.localeCompare(b)).map(([,v])=>v).join('');if(normalizeDigits(code)!=='123456'){preview.notify('کد نمونه برای پیش‌نمایش: ۱۲۳۴۵۶');return;}}
  router.push(preview.basePath+'/'+(phone?'otp-verification':'address-book'));
 }}>{children}</Button>;
 return <DesignAction {...props} label={label} destination={target}>{children}</DesignAction>;
}
