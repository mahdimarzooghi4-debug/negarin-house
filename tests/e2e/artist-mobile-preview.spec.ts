import { test, expect, type Page } from "@playwright/test";
import inventory from "../../docs/implementation/artist-mobile-screen-inventory.json";

test.use({viewport:{width:390,height:844}});
async function ready(page:Page,screen:string){
  await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();
  await expect(page.locator(".artist-mobile")).toBeVisible();
}

test("mobile inventory covers all 91 native frames",async({page,request})=>{
  test.setTimeout(120000);
  await page.goto("/preview/artist-mobile");
  await expect(page.locator(".preview-groups li")).toHaveCount(91);
  expect(inventory.filter(s=>s.implemented)).toHaveLength(91);
  for(const screen of inventory){
    const response=await request.get("/preview/artist-mobile/"+screen.slug);
    expect(response.status(),screen.slug).toBe(200);
    const html=await response.text();
    expect(html).toContain(screen.implemented?`data-node-id="${screen.id}"`:`data-pending-screen="${screen.slug}"`);
  }
});

test("mobile navigation and product draft stay within mobile preview",async({page})=>{
  await page.goto("/preview/artist-mobile/dashboard");await ready(page,"dashboard");
  await page.getByRole("navigation",{name:"منوی هنرمند"}).getByRole("link",{name:"محصولات",exact:true}).click();await ready(page,"products");
  await page.getByRole("link",{name:"ادامه ویرایش",exact:true}).click();await ready(page,"product-editor");
  await page.getByRole("textbox",{name:"نام محصول",exact:true}).fill("ظرف نمونهٔ موبایل");
  await page.locator('input[type="file"]').first().setInputFiles({name:"sample.png",mimeType:"image/png",buffer:Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN1sAAAAASUVORK5CYII=","base64")});
  await expect(page.getByRole("status")).toContainText("هنوز بارگذاری سرور انجام نشده");
  await page.getByRole("link",{name:"ذخیره پیش‌نویس",exact:true}).click();await ready(page,"products");
  await page.getByRole("link",{name:"ادامه ویرایش",exact:true}).click();await ready(page,"product-editor");
  await expect(page.getByRole("textbox",{name:"نام محصول",exact:true})).toHaveValue("ظرف نمونهٔ موبایل");
  await page.getByRole("link",{name:"ارسال برای بررسی",exact:true}).click();await ready(page,"product-review-status");
});

test("mobile order sheet counter and Escape work with an inert background",async({page})=>{
  await page.goto("/preview/artist-mobile/order-progress-update");await ready(page,"order-progress-update");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator('[data-name="Backdrop Content"]')).toHaveAttribute("inert","");
  await expect(page.locator('[data-counter-initial]')).toHaveText("۱۴");
  await page.getByRole("button",{name:"افزایش تعداد",exact:true}).click();
  await expect(page.locator('[data-counter-initial]')).toHaveText("۱۵");
  await page.keyboard.press("Escape");await ready(page,"order-detail-preparing");
});

test("story media choices and caption do not cause hydration errors",async({page})=>{
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));
  await page.goto("/preview/artist-mobile/story-editor");await ready(page,"story-editor");
  await page.getByRole("button",{name:"عکس",exact:true}).click();
  await expect(page.getByRole("button",{name:"عکس",exact:true})).toHaveAttribute("aria-pressed","true");
  await page.getByRole("button",{name:"ویدیو",exact:true}).click();
  await expect(page.getByRole("button",{name:"عکس",exact:true})).toHaveAttribute("aria-pressed","false");
  await page.getByRole("textbox",{name:"متن روایت",exact:true}).fill("داستان ساخت محصول نمونه");
  await page.locator('input[type="file"]').setInputFiles({name:"sample.webm",mimeType:"video/webm",buffer:Buffer.from("preview sample")});
  await expect(page.getByRole("status")).toContainText("هنوز بارگذاری سرور انجام نشده");
  expect(errors).toEqual([]);
});

test("completed mobile account supports profile drafts and independent notification preferences",async({page})=>{
 await page.goto('/preview/artist-mobile/account');await ready(page,'account');await page.getByRole('link',{name:'اطلاعات حساب',exact:true}).click();await ready(page,'account-information');await page.getByRole('link',{name:'ویرایش اطلاعات',exact:true}).click();await ready(page,'edit-profile');
 const name=page.getByRole('textbox',{name:'نام هنرمند / نام نمایشی غرفه',exact:true});await name.fill('هنرمند نمونه');await page.getByRole('button',{name:'ذخیره تغییرات',exact:true}).click();await expect(page.getByRole('status')).toContainText('داده‌ای به سرور ارسال نشده');await page.getByRole('link',{name:'بازگشت',exact:true}).click();await ready(page,'account');
 await page.getByRole('link',{name:'اعلان‌ها',exact:true}).click();await ready(page,'notification-settings');const orders=page.getByRole('button',{name:'سفارش جدید غرفه',exact:true});const sms=page.getByRole('button',{name:'پیامک تراکنش جدید مالی',exact:true});await expect(orders).toHaveAttribute('aria-pressed','true');await expect(sms).toHaveAttribute('aria-pressed','false');await orders.click();await expect(orders).toHaveAttribute('aria-pressed','false');await expect(sms).toHaveAttribute('aria-pressed','false');await sms.click();await expect(sms).toHaveAttribute('aria-pressed','true');
 await page.getByRole('link',{name:'بازگشت',exact:true}).click();await ready(page,'account');await page.getByRole('link',{name:'اطلاعات حساب',exact:true}).click();await ready(page,'account-information');await page.getByRole('link',{name:'ویرایش اطلاعات',exact:true}).click();await ready(page,'edit-profile');await expect(name).toHaveValue('هنرمند نمونه');
});

test("mobile logout sheet cancels to account and performs no real authentication mutation",async({page})=>{
 await page.goto('/preview/artist-mobile/account');await ready(page,'account');await page.getByRole('link',{name:'خروج از حساب',exact:true}).click();await ready(page,'logout-confirmation');const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await expect(page.locator('[data-node-id="858:1401"]')).toHaveAttribute('inert','');await page.keyboard.press('Escape');await ready(page,'account');
 await page.getByRole('link',{name:'خروج از حساب',exact:true}).click();await ready(page,'logout-confirmation');await dialog.getByRole('button',{name:'بله، خروج از حساب',exact:true}).click();await expect(page.getByRole('status')).toContainText('عملیات واقعی پس از اتصال بک‌اند');await expect(page).toHaveURL(/logout-confirmation$/);
});
