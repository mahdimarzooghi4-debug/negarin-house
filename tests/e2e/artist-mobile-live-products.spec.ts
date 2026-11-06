import {test,expect} from "@playwright/test";

test.use({viewport:{width:390,height:844}});
const id="00000000-0000-4000-8000-000000000001";
const imageId="00000000-0000-4000-8000-000000000002";
const base={
 id,title:"گلدان سفالی",description:"ساخت دست",category:"سفالگری",priceToman:"2450000",
 publicationStatus:"draft",version:1,inventoryVersion:2,stockQuantity:0,availability:"out_of_stock",
 archivedAt:null,updatedAt:"2026-11-06T10:00:00.000Z",imageIds:[] as string[]
};
test("artist mobile product list shows only backend products in 390px and 320px",async({page})=>{
  await page.route("**/api/artist/products",route=>route.fulfill({json:[base]}));
  await page.goto("/artist-mobile/products");
  await expect(page.getByRole("heading",{name:"گلدان سفالی",exact:true})).toBeVisible();
  await expect(page.getByText(new Intl.NumberFormat("fa-IR").format(2450000)+" تومان")).toBeVisible();
  await expect(page.getByRole("link",{name:"مدیریت محصول"})).toHaveAttribute("href","/artist-mobile/product-editor?id="+id);
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.setViewportSize({width:320,height:740});
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
test("artist mobile editor keeps inventory separate and only submits its current version for review",async({page})=>{
  let product={...base};
  await page.route("**/api/artist/products/"+id,route=>{
    if(route.request().method()==="PATCH"){
      const body=route.request().postDataJSON();
      expect(body).toEqual({version:1,title:"گلدان سفالی",description:"ساخت دست",category:"سفالگری",priceToman:"2500000"});
      product={...product,priceToman:body.priceToman};
    }
    return route.fulfill({json:product});
  });
  await page.route("**/api/artist/products/"+id+"/inventory",route=>{
    expect(route.request().postDataJSON()).toEqual({inventoryVersion:2,stockQuantity:3});
    product={...product,stockQuantity:3,inventoryVersion:3,availability:"in_stock"};
    return route.fulfill({json:{productId:id,stockQuantity:3,inventoryVersion:3,availability:"in_stock"}});
  });
  await page.route("**/api/artist/products/"+id+"/images",route=>{
    expect(route.request().postDataJSON()).toEqual({version:1,base64:"YWJj"});
    product={...product,version:2,imageIds:[imageId]};
    return route.fulfill({json:{id:imageId,version:2,imageIds:[imageId]}});
  });
  await page.route("**/api/artist/products/"+id+"/submit",route=>{
    expect(route.request().postDataJSON()).toEqual({version:2});
    product={...product,publicationStatus:"under_review",version:3};
    return route.fulfill({json:{id,version:3,publicationStatus:"under_review"}});
  });
  await page.goto("/artist-mobile/product-editor?id="+id);
  await page.getByLabel("قیمت فروش (تومان)").fill("۲۵۰۰۰۰۰");
  await page.getByRole("button",{name:"ذخیره تغییرات"}).click();
  await expect(page.getByText("تغییرات محصول از سرور تأیید شد.")).toBeVisible();
  await page.getByLabel("موجودی قابل فروش").fill("۳");
  await page.getByRole("button",{name:"ثبت موجودی"}).click();
  await expect(page.getByText("موجودی ثبت و از سرور تأیید شد.")).toBeVisible();
  await page.getByLabel("افزودن تصویر").setInputFiles({name:"art.png",mimeType:"image/png",buffer:Buffer.from("abc")});
  await expect(page.getByText("تصویر محصول ثبت و از سرور تأیید شد.")).toBeVisible();
  await expect(page.getByText("۱ تصویر ثبت‌شده")).toBeVisible();
  await page.getByRole("button",{name:"ارسال برای بررسی"}).click();
  await expect(page.getByText("برای بررسی ارسال شد؛ هنوز تأیید یا منتشر نشده است.")).toBeVisible();
  await expect(page.getByRole("button",{name:"انتشار محصول تأییدشده"})).toHaveCount(0);
});
test("artist mobile editor fails closed after version conflict until fresh read",async({page})=>{
  let attempts=0;
  await page.route("**/api/artist/products/"+id,route=>{
    if(route.request().method()==="PATCH"){
      return route.fulfill({status:409,json:{error:"product-state-changed"}});
    }
    attempts++;
    return route.fulfill({json:{...base,version:attempts}});
  });
  await page.goto("/artist-mobile/product-editor?id="+id);
  await page.getByLabel("قیمت فروش (تومان)").fill("3000000");
  await page.getByRole("button",{name:"ذخیره تغییرات"}).click();
  await expect(page.locator("main").getByRole("alert")).toContainText("دوباره دریافت کنید");
  await expect(page.getByRole("button",{name:"ذخیره تغییرات"})).toHaveCount(0);
  await page.getByRole("button",{name:"دریافت دوباره محصول"}).click();
  await expect(page.getByLabel("قیمت فروش (تومان)")).toHaveValue(base.priceToman);
  expect(attempts).toBe(2);
});
test("artist mobile without an active artist role does not show product content",async({page})=>{
  await page.route("**/api/artist/products",route=>route.fulfill({status:403,json:{error:"forbidden"}}));
  await page.goto("/artist-mobile/products");
  await expect(page.locator("main").getByRole("alert")).toContainText("نقش فعال");
  await expect(page.getByRole("heading",{name:base.title,exact:true})).toHaveCount(0);
});
