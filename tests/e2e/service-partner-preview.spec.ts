import { test, expect, type Page } from "@playwright/test";
import inventory from "../../docs/implementation/service-partner-screen-inventory.json";
import slots from "../../docs/implementation/service-partner-asset-slots.json";

test.use({viewport:{width:1440,height:1024}});
async function ready(page:Page,screen:string){
 await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();
 await expect(page.locator(".service-partner-design")).toBeVisible();
}

test("all eight service partner frames preserve local original logo and shared navigation",async({page})=>{
 const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/preview/service-partner");await expect(page.locator(".preview-groups li")).toHaveCount(8);
 for(const screen of inventory){
  const response=await page.goto("/preview/service-partner/"+screen.slug+"?canvas=1");expect(response?.status()).toBe(200);await ready(page,screen.slug);
  await expect(page.getByRole("complementary",{name:"منوی همکار خدمات"})).toBeVisible();
  await expect(page.getByRole("complementary").getByRole("link")).toHaveCount(6);
  await page.evaluate(()=>document.fonts.ready);
  const img=page.locator(".service-partner-design img");await img.evaluate(el=>(el as HTMLImageElement).decode());
  await expect(img).toHaveAttribute("src","/service-partner-assets/negarin-logo.png");
  const expected=slots.find(s=>s.screen===screen.slug)!;const bounds=await img.boundingBox();expect(bounds).not.toBeNull();
  for(const key of ["x","y"] as const)expect(Math.abs(bounds![key]-expected[key]),screen.slug+key).toBeLessThanOrEqual(2);
  expect(bounds?.width).toBe(40);expect(bounds?.height).toBe(40);
 }
 expect(errors).toEqual([]);
});

test("assigned request actions and partner sidebar keep navigation within the portal",async({page})=>{
 await page.goto("/preview/service-partner/dashboard");await ready(page,"dashboard");
 await page.getByRole("link",{name:"درخواست‌های خدمات",exact:true}).click();await ready(page,"assigned-requests");
 await page.getByRole("link",{name:"بررسی",exact:true}).click();await ready(page,"request-detail");
 await page.getByRole("link",{name:"پذیرش درخواست",exact:true}).click();await ready(page,"schedule-and-execution");
 await page.getByRole("button",{name:"ثبت پیشرفت",exact:true}).click();await expect(page.getByRole("status")).toContainText("عملیات واقعی پس از اتصال بک‌اند");
 await page.getByRole("link",{name:"تحویل‌ها / خروجی‌ها",exact:true}).click();await ready(page,"submit-deliverable");
});

test("delivery feedback persists locally and file selection does not upload or mutate records",async({page})=>{
 await page.goto("/preview/service-partner/submit-deliverable");await ready(page,"submit-deliverable");
 const note=page.getByRole("textbox",{name:"یادداشت تحویل",exact:true});await note.fill("تصاویر نمونه آماده بررسی هستند.");
 await page.getByRole("button",{name:"ذخیره پیش‌نویس",exact:true}).click();await expect(page.getByRole("status")).toContainText("همین پیش‌نمایش");
 await page.getByRole("link",{name:"سوابق",exact:true}).click();await ready(page,"history");
 await page.getByRole("link",{name:"تحویل‌ها / خروجی‌ها",exact:true}).click();await ready(page,"submit-deliverable");await expect(note).toHaveValue("تصاویر نمونه آماده بررسی هستند.");
 await page.getByLabel("فایل خروجی خدمت",{exact:true}).setInputFiles({name:"sample-output.pdf",mimeType:"application/pdf",buffer:Buffer.from("%PDF-1.4\npreview only\n%%EOF")});
 await expect(page.getByRole("status")).toContainText("هنوز بارگذاری سرور انجام نشده");
 await expect(page.locator(".design-upload-name")).toHaveText("sample-output.pdf");
 await page.getByRole("button",{name:"ارسال خروجی به نگارین",exact:true}).click();await expect(page.getByRole("status")).toContainText("عملیات واقعی پس از اتصال بک‌اند");
 await expect(note).toHaveValue("تصاویر نمونه آماده بررسی هستند.");
});

test("QA retry and account controls communicate their sample scope",async({page})=>{
 await page.goto("/preview/service-partner/states-and-qa");await ready(page,"states-and-qa");
 await page.getByRole("link",{name:"تلاش دوباره",exact:true}).click();await ready(page,"assigned-requests");
 await page.getByRole("link",{name:"حساب",exact:true}).click();await ready(page,"account");
 await page.getByRole("button",{name:"مدیریت",exact:true}).first().click();await expect(page.getByRole("status")).toContainText("عملیات واقعی پس از اتصال بک‌اند");
 await page.getByRole("button",{name:"خروج از حساب",exact:true}).click();await expect(page.getByRole("status")).toContainText("پیش‌نمایش");
 await expect(page).toHaveURL(/\/preview\/service-partner\/account$/);
});
