import {test,expect} from "@playwright/test";
test.use({viewport:{width:1440,height:1100}});
const id="00000000-0000-4000-8000-000000000001";
test("account loads actual empty summaries, links to management and revokes session",async({page})=>{
  await page.route("**/api/auth/context",route=>route.fulfill({json:{userId:id,activeRole:"customer"}}));
  await page.route("**/api/customer/orders?*",route=>route.fulfill({json:{page:1,pageSize:3,hasMore:false,items:[]}}));
  await page.route("**/api/customer/addresses",route=>route.fulfill({json:{version:0,addresses:[]}}));
  await page.route("**/api/customer/profile",route=>route.fulfill({json:{version:0,displayName:"",phone:"+989121234567"}}));
  await page.goto("/customer/account-overview");
  await expect(page.getByText("هنوز سفارشی در حساب شما ثبت نشده است.",{exact:true})).toBeVisible();
  await expect(page.getByText("مریم احمدی، خوش آمدی",{exact:true})).toHaveCount(0);
  await expect(page.getByRole("link",{name:"مدیریت آدرس‌ها",exact:true})).toHaveAttribute("href","/customer/address-book");
  await page.route("**/api/auth/session",route=>route.fulfill({status:502,json:{error:"logout-failed"}}));
  await page.getByRole("button",{name:"خروج از حساب",exact:true}).click();
  await expect(page.locator(".customer-web-design").getByRole("alert")).toContainText("خروج انجام نشد");
  await expect(page).toHaveURL(/\/customer\/account-overview$/);
  await page.route("**/api/auth/session",route=>{expect(route.request().method()).toBe("DELETE");return route.fulfill({status:204});});
  await page.getByRole("button",{name:"خروج از حساب",exact:true}).click();
  await expect(page).toHaveURL(/\/customer\/products$/);
});
test("account conceals summaries when the session is missing",async({page})=>{
  let protectedReads=0;
  await page.route("**/api/auth/context",route=>route.fulfill({status:401,json:{error:"unauthorized"}}));
  await page.route("**/api/customer/**",route=>{protectedReads++;return route.fulfill({status:401});});
  await page.goto("/customer/account-overview");
  await expect(page.locator(".customer-web-design").getByRole("alert")).toContainText("برای مشاهدهٔ حساب وارد شوید");
  expect(protectedReads).toBe(0);
  await expect(page.getByRole("button",{name:"خروج از حساب",exact:true})).toHaveCount(0);
});

test("customer edits the profile and sees the persisted name, then refreshes after a conflict",async({page})=>{
 let profile={version:0,displayName:"",phone:"+989121234567"};
 let conflict=false;
 await page.route("**/api/auth/context",route=>route.fulfill({json:{userId:id,activeRole:"customer"}}));
 await page.route("**/api/customer/orders?*",route=>route.fulfill({json:{page:1,pageSize:3,hasMore:false,items:[]}}));
 await page.route("**/api/customer/addresses",route=>route.fulfill({json:{version:0,addresses:[]}}));
 await page.route("**/api/customer/profile",route=>{
  if(route.request().method()==="PUT"){
   const body=route.request().postDataJSON();expect(body.version).toBe(profile.version);
   expect(Object.keys(body).sort()).toEqual(["displayName","version"]);
   if(conflict)return route.fulfill({status:409,json:{error:"profile-state-changed"}});
   profile={...profile,version:profile.version+1,displayName:body.displayName};
  }
  return route.fulfill({json:profile});
 });
 await page.goto("/customer/account-overview");
 await page.getByRole("button",{name:"ویرایش اطلاعات",exact:true}).click();
 await page.getByLabel("نام و نام خانوادگی",{exact:true}).fill("مریم احمدی");
 await page.getByRole("button",{name:"ذخیره مشخصات",exact:true}).click();
 await expect(page.getByRole("heading",{name:"مریم احمدی، خوش آمدی",exact:true})).toBeVisible();
 await page.reload();
 await expect(page.getByRole("heading",{name:"مریم احمدی، خوش آمدی",exact:true})).toBeVisible();
 conflict=true;
 await page.getByRole("button",{name:"ویرایش اطلاعات",exact:true}).click();
 await page.getByLabel("نام و نام خانوادگی",{exact:true}).fill("نام تازه");
 await page.getByRole("button",{name:"ذخیره مشخصات",exact:true}).click();
 await expect(page.locator(".customer-web-design").getByRole("alert")).toContainText("اطلاعات حساب تغییر کرده");
 await expect(page.getByRole("button",{name:"ذخیره مشخصات",exact:true})).toHaveCount(0);
 await page.getByRole("button",{name:"تازه‌سازی مشخصات",exact:true}).click();
 await expect(page.getByRole("heading",{name:"مریم احمدی، خوش آمدی",exact:true})).toBeVisible();
});
