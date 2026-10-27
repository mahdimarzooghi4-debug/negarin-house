import { test, expect, type Page } from "@playwright/test";
import inventory from "../../docs/implementation/customer-mobile-screen-inventory.json";

test.use({viewport:{width:390,height:844}});
async function ready(page:Page,screen:string){
 await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();
 await expect(page.locator(".customer-mobile")).toBeVisible();
}

test("every customer Figma frame renders with local images and no runtime errors",async({page})=>{
 test.setTimeout(120000);const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/preview/customer-mobile");await expect(page.locator(".preview-groups li")).toHaveCount(32);
 for(const screen of inventory){
  const response=await page.goto("/preview/customer-mobile/"+screen.slug+"?canvas=1");
  expect(response?.status(),screen.slug).toBe(200);await ready(page,screen.slug);
  await expect(page.locator(`.customer-mobile [data-node-id="${screen.id}"]`)).toBeVisible();
  const images=await page.locator(".customer-mobile img").evaluateAll(images=>Promise.all(images.map(async img=>{const i=img as HTMLImageElement;await i.decode();return {src:i.getAttribute("src"),loaded:i.naturalWidth>0};})));
  for(const img of images){expect(img.loaded,screen.slug).toBe(true);expect(img.src).toMatch(/^\/customer-mobile-assets\//);}
 }
 expect(errors).toEqual([]);
});

test("source purchase flow validates sample login and OTP before shipping and payment",async({page})=>{
 await page.goto("/preview/customer-mobile/product-detail");await ready(page,"product-detail");
 await page.locator('[data-node-id="566:48"]').click();await ready(page,"cart");
 await page.getByRole("button",{name:"کاهش تعداد",exact:true}).isDisabled().then(disabled=>expect(disabled).toBe(true));
 await page.getByRole("button",{name:"افزایش تعداد",exact:true}).click();
 await expect(page.locator('[data-node-id="572:18"]')).toHaveText("۲");
 await page.locator('[data-node-id="572:36"]').click();await ready(page,"login-and-register");
 await page.locator('[data-node-id="722:19"]').click();await expect(page.getByRole("status")).toContainText("شماره همراه معتبر");
 await page.getByRole("textbox",{name:"شماره موبایل",exact:true}).fill("۰۹۱۲۳۴۵۶۷۸۹");
 await page.locator('[data-node-id="722:19"]').click();await ready(page,"otp-verification");
 await page.locator('[data-node-id="723:20"]').click();await expect(page.getByRole("status")).toContainText("شش‌رقمی");
 for(let i=1;i<=6;i++)await page.getByRole("textbox",{name:`رقم ${i} کد تأیید`,exact:true}).fill(String(i));
 await page.locator('[data-node-id="723:20"]').click();await ready(page,"checkout-shipping-info");
 await page.getByRole("textbox",{name:"نام گیرنده",exact:true}).fill("مشتری نمونه");
 await page.locator('[data-node-id="511:279"]').click();await ready(page,"checkout-review-and-payment");
 await expect(page.locator('[data-node-id="574:34"]')).toContainText("ناموفق");
 await page.locator('[data-node-id="574:18"]').click();await ready(page,"checkout-shipping-info");
 await expect(page.getByRole("textbox",{name:"نام گیرنده",exact:true})).toHaveValue("مشتری نمونه");
 await page.locator('[data-node-id="511:279"]').click();await ready(page,"checkout-review-and-payment");
 await page.locator('[data-node-id="574:44"]').click();await ready(page,"order-confirmation");
 await page.locator('[data-node-id="591:28"]').click();await ready(page,"order-detail");
});

test("search, filter choices and profile edits remain in the customer preview",async({page})=>{
 await page.goto("/preview/customer-mobile/search-and-discover");await ready(page,"search-and-discover");
 await page.getByRole("textbox",{name:"جستجو",exact:true}).fill("میناکاری");await page.getByRole("textbox",{name:"جستجو",exact:true}).press("Enter");await ready(page,"search-results");
 await page.goto("/preview/customer-mobile/filters-and-sort");await ready(page,"filters-and-sort");
 await page.getByRole("button",{name:"جدیدترین",exact:true}).click();
 await expect(page.getByRole("button",{name:"جدیدترین",exact:true})).toHaveAttribute("aria-pressed","true");
 await expect(page.getByRole("button",{name:"پیشنهادی",exact:true})).toHaveAttribute("aria-pressed","false");
 await page.locator('[data-node-id="657:89"]').click();await ready(page,"filtered-results");
 await page.goto("/preview/customer-mobile/account-information");await ready(page,"account-information");
 await page.getByRole("textbox",{name:"نام و نام خانوادگی",exact:true}).fill("مشتری آزمایشی");
 await page.locator('[data-node-id="624:38"]').click();await ready(page,"account");
 await page.locator('[data-node-id="603:34"]').click();await ready(page,"account-information");
 await expect(page.getByRole("textbox",{name:"نام و نام خانوادگی",exact:true})).toHaveValue("مشتری آزمایشی");
});

test("saved header and story cards preserve prototype links alongside independent controls",async({page})=>{
 await page.goto("/preview/customer-mobile/landing");await ready(page,"landing");
 await page.locator('[data-node-id="401:11"]').click();await ready(page,"saved");
 await page.goto("/preview/customer-mobile/stories");await ready(page,"stories");
 const card=page.locator('[data-node-id="560:43"]');await expect(card).toHaveAttribute("role","link");
 await card.focus();await page.keyboard.press("Enter");await ready(page,"story-detail");
 await page.goto("/preview/customer-mobile/login-and-register");await ready(page,"login-and-register");
 await page.locator('[data-node-id="772:7"]').click();await ready(page,"corporate-buyer-access");
 await page.goto("/preview/customer-mobile/otp-verification");await ready(page,"otp-verification");
 await page.locator('[data-node-id="724:4"]').click();await ready(page,"login-and-register");
});
