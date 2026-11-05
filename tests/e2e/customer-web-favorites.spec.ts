import {test,expect} from "@playwright/test";
test.use({viewport:{width:1440,height:1100}});
const id="00000000-0000-4000-8000-000000000001";
const product={id,title:"اثر محبوب آزمایشی",category:"سفال",priceToman:"1000",coverImageId:null,availability:"in_stock"};
test("customer saves an artwork and removes it from persistent favorites",async({page})=>{
  let version=0,saved=false;
  const snapshot=()=>({version,items:saved?[{productId:id,savedAt:"2026-11-05T10:00:00.000Z",product}]:[]});
  await page.route("**/api/catalog/products/"+id,route=>route.fulfill({json:{...product,description:null,dimensions:null,materials:null,weight:null,color:null,technique:null,careInstructions:null,imageIds:[],createdAt:"2026-11-05T10:00:00.000Z"}}));
  await page.route("**/api/customer/favorites",route=>route.fulfill({json:snapshot()}));
  await page.route("**/api/customer/favorites/"+id,route=>{
    expect(route.request().postDataJSON()).toEqual({version});
    saved=route.request().method()==="PUT";version++;
    return route.fulfill({json:snapshot()});
  });
  await page.goto("/customer/product-detail?id="+id);
  await page.getByRole("button",{name:"ذخیره اثر",exact:true}).click();
  await expect(page.getByRole("button",{name:"حذف از علاقه‌مندی‌ها",exact:true})).toHaveAttribute("aria-pressed","true");
  await page.goto("/customer/favorites");
  await expect(page.getByRole("heading",{name:product.title,exact:true})).toBeVisible();
  await page.getByRole("button",{name:"حذف از علاقه‌مندی‌ها",exact:true}).click();
  await expect(page.getByText("هنوز اثری ذخیره نکرده‌ای.",{exact:true})).toBeVisible();
  expect(version).toBe(2);
});
test("withdrawn favorites remain removable without exposing product metadata",async({page})=>{
  await page.route("**/api/customer/favorites",route=>route.fulfill({json:{version:2,items:[{productId:id,savedAt:"2026-11-05T10:00:00.000Z",product:null}]}}));
  await page.route("**/api/customer/favorites/"+id,route=>route.fulfill({status:409,json:{error:"favorites-state-changed"}}));
  await page.goto("/customer/favorites");
  await expect(page.getByText("این اثر دیگر در دسترس نیست.",{exact:true})).toBeVisible();
  await expect(page.getByRole("link",{name:"مشاهده محصول",exact:true})).toHaveCount(0);
  await page.getByRole("button",{name:"حذف از علاقه‌مندی‌ها",exact:true}).click();
  await expect(page.locator(".customer-web-design").getByRole("alert")).toContainText("فهرست تغییر کرده");
  await expect(page.getByRole("button",{name:"حذف از علاقه‌مندی‌ها",exact:true})).toHaveCount(0);
});
