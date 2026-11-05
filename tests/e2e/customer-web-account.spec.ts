import {test,expect} from "@playwright/test";
test.use({viewport:{width:1440,height:1100}});
const id="00000000-0000-4000-8000-000000000001";
test("account loads actual empty summaries, links to management and revokes session",async({page})=>{
  await page.route("**/api/auth/context",route=>route.fulfill({json:{userId:id,activeRole:"customer"}}));
  await page.route("**/api/customer/orders?*",route=>route.fulfill({json:{page:1,pageSize:3,hasMore:false,items:[]}}));
  await page.route("**/api/customer/addresses",route=>route.fulfill({json:{version:0,addresses:[]}}));
  await page.goto("/customer/account-overview");
  await expect(page.getByText("هنوز سفارشی در حساب شما ثبت نشده است.",{exact:true})).toBeVisible();
  await expect(page.getByText("مریم احمدی، خوش آمدی",{exact:true})).toHaveCount(0);
  await expect(page.getByRole("link",{name:"مدیریت آدرس‌ها",exact:true})).toHaveAttribute("href","/customer/address-book");
  await page.route("**/api/auth/session",route=>route.fulfill({status:502,json:{error:"logout-failed"}}));
  await page.getByRole("button",{name:"خروج از حساب",exact:true}).click();
  await expect(page.getByRole("alert")).toContainText("خروج انجام نشد");
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
  await expect(page.getByRole("alert")).toContainText("برای مشاهدهٔ حساب وارد شوید");
  expect(protectedReads).toBe(0);
  await expect(page.getByRole("button",{name:"خروج از حساب",exact:true})).toHaveCount(0);
});
