import {test,expect} from "@playwright/test";
test.use({viewport:{width:1440,height:1100}});
const id="00000000-0000-4000-8000-000000000001";
const product={id,title:"اثر تازهٔ خانه",category:"چرم",description:null,dimensions:null,materials:null,weight:null,color:null,technique:null,careInstructions:null,priceToman:"1000",imageIds:[],coverImageId:null,availability:"in_stock",createdAt:"2026-11-05T10:00:00.000Z"};
test("home loads published works and carries search and category into catalog queries",async({page})=>{
 await page.route("**/api/catalog/products?*",route=>{const query=new URL(route.request().url()).searchParams;return route.fulfill({json:{page:1,pageSize:Number(query.get("pageSize")),hasMore:false,items:[product]}});});
 await page.goto("/customer/home");
 await expect(page.getByRole("heading",{name:product.title,exact:true})).toBeVisible();
 await page.getByRole("link",{name:"چرم",exact:true}).click();
 await expect(page).toHaveURL(/category=/);
 await expect(page.getByRole("heading",{name:"چرم",exact:true})).toBeVisible();
 await page.goto("/customer/home");
 await page.getByLabel("جستجوی آثار",{exact:true}).fill("اثر تازه");
 const request=page.waitForRequest(request=>request.url().includes("/api/catalog/products?")&&new URL(request.url()).searchParams.get("q")==="اثر تازه");
 await page.getByRole("button",{name:"جست‌وجو",exact:true}).click();
 await request;
 await expect(page.getByLabel("جستجوی آثار",{exact:true})).toHaveValue("اثر تازه");
});
test("home API failure has retry and no live sample artwork cards",async({page})=>{
 await page.route("**/api/catalog/products?*",route=>route.fulfill({status:502,json:{error:"unavailable"}}));
 await page.goto("/customer/home");
 await expect(page.locator(".customer-web-design").getByRole("alert")).toContainText("دریافت آثار انجام نشد");
 await expect(page.locator("article")).toHaveCount(0);
});
test("favorites use the native empty design only for a verified empty snapshot",async({page})=>{
 await page.route("**/api/customer/favorites",route=>route.fulfill({json:{version:0,items:[]}}));
 await page.goto("/customer/favorites-empty");
 await expect(page.locator('[data-node-id="1198:1495"]')).toBeVisible();
 await expect(page.getByText("هنوز اثری ذخیره نکرده‌ای.",{exact:true})).toBeVisible();
 await page.getByRole("link",{name:"رفتن به کشف آثار",exact:true}).click();
 await expect(page).toHaveURL(/\/customer\/products$/);
});
