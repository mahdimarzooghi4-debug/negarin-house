import { test, expect } from "@playwright/test";
import inventory from "../../docs/implementation/artist-screen-inventory.json";

async function ready(page: import("@playwright/test").Page, screen:string){
  await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();
  await expect(page.locator(".artist-design")).toBeVisible();
}

test("catalog covers every imported Figma screen and route",async({page,request})=>{
  test.setTimeout(120000);
  await page.goto("/preview/artist");
  await expect(page.locator(".preview-groups li")).toHaveCount(83);
  for(const screen of inventory){
    await expect(page.locator(`.preview-groups a[href="/preview/artist/${screen.slug}"]`)).toHaveCount(1);
    const response=await request.get("/preview/artist/"+screen.slug);
    expect(response.status(),screen.slug).toBe(200);
    expect(await response.text()).toContain(`data-node-id="${screen.id}"`);
  }
  await page.goto("/preview/artist/not-a-screen");
  await expect(page.getByRole("heading",{name:"404",exact:true})).toBeVisible();
});

test("product draft fields survive navigation and files stay local",async({page})=>{
  await page.goto("/preview/artist/dashboard");await ready(page,"dashboard");
  await page.getByRole("link",{name:"افزودن محصول",exact:true}).click();await ready(page,"product-editor");
  await page.getByRole("textbox",{name:"نام محصول",exact:true}).fill("کیف نمونهٔ تست");
  await page.locator('input[type="file"]').first().setInputFiles({name:"sample.png",mimeType:"image/png",buffer:Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN1sAAAAASUVORK5CYII=","base64")});
  await expect(page.getByRole("status")).toContainText("هنوز بارگذاری سرور انجام نشده");
  await page.getByRole("link",{name:"ذخیره پیش‌نویس",exact:true}).click();await ready(page,"products");
  await page.getByRole("link",{name:"افزودن محصول",exact:true}).click();await ready(page,"product-editor");
  await expect(page.getByRole("textbox",{name:"نام محصول",exact:true})).toHaveValue("کیف نمونهٔ تست");
  await page.getByRole("link",{name:"ارسال برای بررسی",exact:true}).click();await ready(page,"product-review-status");
});

test("order modal blocks background navigation and closes with Escape",async({page})=>{
  await page.goto("/preview/artist/order-detail-preparing");await ready(page,"order-detail-preparing");
  await page.getByRole("link",{name:"ثبت پیشرفت تولید",exact:true}).click();await ready(page,"order-progress-update-modal");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator('[data-name="Artist / Main"]')).toHaveAttribute("inert","");
  await page.keyboard.press("Escape");await ready(page,"order-detail-preparing");
});

test("Persian phone and OTP input validate before sample verification",async({page})=>{
  await page.goto("/preview/artist/login-and-register");await ready(page,"login-and-register");
  await page.getByRole("button",{name:"دریافت کد تأیید",exact:true}).click();
  await expect(page.getByRole("status")).toContainText("شماره همراه معتبر");
  await page.getByRole("textbox",{name:"شماره تلفن همراه",exact:true}).fill("۰۹۱۲۳۴۵۶۷۸۹");
  await page.getByRole("button",{name:"دریافت کد تأیید",exact:true}).click();await ready(page,"otp-verification");
  await page.getByRole("button",{name:"تأیید",exact:true}).click();
  await expect(page.getByRole("status")).toContainText("شش‌رقمی");
  for(let digit=1;digit<=6;digit++)await page.getByRole("textbox",{name:`رقم ${digit} کد تأیید`,exact:true}).fill(String(digit));
  await page.getByRole("button",{name:"تأیید",exact:true}).click();await ready(page,"verification-success");
});
