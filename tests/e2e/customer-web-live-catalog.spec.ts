import {test,expect} from "@playwright/test";

const product = {
  id:"00000000-0000-4000-8000-000000000001",title:"اثر منتشرشدهٔ آزمون",description:"توضیح اثر",category:"میناکاری",
  dimensions:null,materials:null,weight:null,color:null,technique:null,careInstructions:null,
  priceToman:"2450000",imageIds:[],coverImageId:null,availability:"in_stock",createdAt:"2026-10-05T00:00:00.000Z"
};

test("customer entry displays real catalog data and sends search and filters to the API",async({page})=>{
  await page.route("**/api/catalog/products?*",route=>{
    const params=new URL(route.request().url()).searchParams;
    return route.fulfill({json:{page:Number(params.get("page")),pageSize:6,hasMore:false,items:[product]}});
  });
  await page.goto("/customer");
  await expect(page).toHaveURL(/\/customer\/products$/);
  await expect(page.getByRole("heading",{name:product.title})).toBeVisible();
  await expect(page.getByText("بشقاب میناکاری طرح شاه‌عباسی",{exact:true})).toHaveCount(0);
  await expect(page.getByText("۲٬۴۵۰٬۰۰۰ تومان",{exact:true})).toBeVisible();

  await page.getByRole("textbox",{name:"جستجوی آثار"}).fill("ظرف");
  const search=page.waitForRequest(request=>new URL(request.url()).searchParams.get("q")==="ظرف");
  await page.getByRole("button",{name:"جست‌وجو",exact:true}).click();
  await search;
  const stock=page.waitForRequest(request=>new URL(request.url()).searchParams.get("inStock")==="true");
  await page.getByRole("checkbox",{name:"فقط آثار موجود"}).check();
  await stock;
  const category=page.waitForRequest(request=>new URL(request.url()).searchParams.get("category")==="میناکاری");
  await page.getByRole("button",{name:"میناکاری",exact:true}).click();
  await category;
  await expect(page.getByRole("heading",{name:product.title})).toBeVisible();
  await expect(page.getByRole("button",{name:"بعدی",exact:true})).toBeDisabled();
});

test("an unavailable or empty catalog never falls back to sample products",async({page})=>{
  let unavailable=true;
  await page.route("**/api/catalog/products?*",route=>unavailable
    ?route.fulfill({status:502,json:{error:"catalog-unavailable"}})
    :route.fulfill({json:{page:1,pageSize:6,hasMore:false,items:[]}}));
  await page.goto("/customer/products");
  await expect(page.getByRole("alert")).toContainText("دریافت آثار انجام نشد");
  unavailable=false;
  await page.getByRole("button",{name:"تلاش دوباره"}).click();
  await expect(page.getByRole("heading",{name:"اثری با این فیلترها پیدا نشد"})).toBeVisible();
  await expect(page.locator("article")).toHaveCount(0);
});

test("view artwork opens the selected published product and handles missing products",async({page})=>{
  await page.route("**/api/catalog/products?*",route=>route.fulfill({json:{page:1,pageSize:6,hasMore:false,items:[product]}}));
  await page.route("**/api/catalog/products/"+product.id,route=>route.fulfill({json:{...product,materials:"مس",dimensions:"۲۵ سانتی‌متر"}}));
  await page.goto("/customer/products");
  await page.getByRole("link",{name:"مشاهده اثر",exact:true}).click();
  await expect(page).toHaveURL(new RegExp("/customer/product-detail\\?id="+product.id));
  await expect(page.getByRole("heading",{name:product.title,exact:true})).toBeVisible();
  await expect(page.getByText("مس",{exact:true})).toBeVisible();
  await expect(page.getByRole("button",{name:"افزودن به سبد",exact:true})).toBeDisabled();
  await page.route("**/api/catalog/products/"+product.id,route=>route.fulfill({status:404,json:{error:"not-found"}}));
  await page.reload();
  await expect(page.getByRole("alert")).toContainText("این اثر برای نمایش در دسترس نیست");
  await expect(page.getByRole("heading",{name:product.title,exact:true})).toHaveCount(0);
});
