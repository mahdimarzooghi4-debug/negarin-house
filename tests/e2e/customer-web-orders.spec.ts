import {test,expect} from "@playwright/test";
test.use({viewport:{width:1440,height:1100}});
const id="00000000-0000-4000-8000-000000000001";
const order={id,version:0,status:"reserved",paymentStatus:"unpaid",subtotalToman:"1000",reservedUntil:"2026-11-05T10:30:00.000Z",createdAt:"2026-11-05T10:00:00.000Z",shippingAddress:{recipientName:"گیرندهٔ سفارش",recipientPhone:"+989121234567",province:"تهران",city:"تهران",postalCode:"1234567890",fullAddress:"نشانی ثبت‌شده"},items:[{productId:id,title:"اثر سفارش",quantity:1,unitPriceToman:"1000",lineSubtotalToman:"1000",imageIds:[]}]};
test("customer order list opens the selected order and handles concealed resources",async({page})=>{
  await page.route("**/api/customer/orders?*",route=>route.fulfill({json:{page:1,pageSize:6,hasMore:false,items:[order]}}));
  await page.route("**/api/customer/orders/"+id,route=>route.fulfill({json:order}));
  await page.goto("/customer/orders");
  await page.getByRole("link",{name:"مشاهدهٔ جزئیات سفارش",exact:true}).click();
  await expect(page).toHaveURL(new RegExp("/customer/order-detail\\?id="+id));
  await expect(page.getByRole("heading",{name:"اثر سفارش",exact:true})).toBeVisible();
  await expect(page.getByText("گیرندهٔ سفارش",{exact:true})).toBeVisible();
  await expect(page.getByText("وضعیت پرداخت پرداخت‌نشده",{exact:true})).toBeVisible();
  await page.route("**/api/customer/orders/"+id,route=>route.fulfill({status:404,json:{error:"not-found"}}));
  await page.reload();
  await expect(page.locator(".customer-web-design").getByRole("alert")).toContainText("این سفارش در حساب شما پیدا نشد");
  await expect(page.getByRole("heading",{name:"اثر سفارش",exact:true})).toHaveCount(0);
});
