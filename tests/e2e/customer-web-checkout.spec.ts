import {test,expect} from "@playwright/test";
test.use({viewport:{width:1440,height:1100}});
const id="00000000-0000-4000-8000-000000000001";
const address={id,isDefault:true,recipientName:"گیرندهٔ آزمون",recipientPhone:"+989121234567",province:"تهران",city:"تهران",postalCode:"1234567890",fullAddress:"خیابان نمونه"};
const cart={version:3,items:[{productId:id,quantity:1,status:"available",product:{id,title:"اثر آزمون",priceToman:"1000",coverImageId:null},lineSubtotalToman:"1000"}],subtotalToman:"1000",canCheckout:true};
test("checkout retries the exact command after an ambiguous response",async({page})=>{
  await page.route("**/api/customer/cart",route=>route.fulfill({json:cart}));
  await page.route("**/api/customer/addresses",route=>route.fulfill({json:{version:7,addresses:[address]}}));
  let first:Record<string,unknown>|null=null;
  let attempts=0;
  await page.route("**/api/customer/orders",async route=>{
    const body=route.request().postDataJSON();
    attempts++;
    if(attempts===1){first=body;await route.fulfill({status:502,json:{error:"unavailable"}});return;}
    expect(body).toEqual(first);
    expect(body).toMatchObject({cartVersion:3,addressBookVersion:7,addressId:id,expectedSubtotalToman:"1000"});
    await route.fulfill({json:{id,status:"reserved",paymentStatus:"unpaid",subtotalToman:"1000",reservedUntil:"2026-11-05T10:00:00.000Z"}});
  });
  await page.goto("/customer/checkout-review?addressId="+id);
  await expect(page.getByRole("heading",{name:address.recipientName})).toBeVisible();
  await page.getByRole("button",{name:"ثبت سفارش و رزرو آثار",exact:true}).click();
  await page.getByRole("button",{name:"تلاش دوباره برای ثبت سفارش",exact:true}).click();
  await expect(page.getByRole("heading",{name:"سفارش ثبت شد",exact:true})).toBeVisible();
  expect(attempts).toBe(2);
});
