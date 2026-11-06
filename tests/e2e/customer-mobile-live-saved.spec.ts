import {test,expect} from "@playwright/test";
test.use({viewport:{width:390,height:844}});
const id="00000000-0000-4000-8000-000000000001";
const product={id,title:"بشقاب میناکاری",category:"میناکاری",priceToman:"2450000",coverImageId:null,availability:"in_stock"};
test("mobile saved products use server revisions and remain within the viewport",async({page})=>{
 let version=3,items=[{productId:id,savedAt:"2026-11-06T10:00:00.000Z",product}];
 await page.route("**/api/customer/favorites",route=>route.fulfill({json:{version,items}}));await page.route("**/api/customer/favorites/"+id,route=>{expect(route.request().method()).toBe("DELETE");expect(route.request().postDataJSON()).toEqual({version:3});version=4;items=[];return route.fulfill({json:{version,items}});});
 await page.goto("/customer-mobile/saved");await expect(page.getByRole("heading",{name:product.title,exact:true})).toBeVisible();await expect(page.getByRole("link",{name:"مشاهده محصول",exact:true})).toHaveAttribute("href","/customer/product-detail?id="+id);await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.getByRole("button",{name:"حذف از ذخیره‌شده‌ها: "+product.title,exact:true}).click();await expect(page.getByText("هنوز اثری ذخیره نکرده‌ای.",{exact:true})).toBeVisible();await expect(page.getByRole("heading",{name:product.title,exact:true})).toHaveCount(0);
 await page.setViewportSize({width:320,height:740});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
test("mobile saved conflict hides stale actions until refreshed",async({page})=>{
 let reads=0;await page.route("**/api/customer/favorites",route=>{reads++;return route.fulfill({json:{version:reads,items:reads===1?[{productId:id,savedAt:"2026-11-06T10:00:00.000Z",product:null}]:[]}});});await page.route("**/api/customer/favorites/"+id,route=>route.fulfill({status:409,json:{error:"conflict"}}));
 await page.goto("/customer-mobile/saved");await expect(page.getByText("این اثر دیگر در دسترس نیست.")).toBeVisible();await page.getByRole("button",{name:"حذف از ذخیره‌شده‌ها",exact:true}).click();await expect(page.locator("main").getByRole("alert")).toContainText("فهرست تغییر کرده");await expect(page.getByRole("button",{name:"حذف از ذخیره‌شده‌ها",exact:true})).toHaveCount(0);await page.getByRole("button",{name:"دریافت دوباره ذخیره‌شده‌ها",exact:true}).click();await expect(page.getByText("هنوز اثری ذخیره نکرده‌ای.")).toBeVisible();
});
test("mobile saved requires a real customer session",async({page})=>{await page.route("**/api/customer/favorites",route=>route.fulfill({status:401,json:{error:"unauthorized"}}));await page.goto("/customer-mobile/saved");await expect(page.locator("main").getByRole("alert")).toContainText("وارد شوید");await expect(page.getByRole("heading",{name:product.title,exact:true})).toHaveCount(0);});
