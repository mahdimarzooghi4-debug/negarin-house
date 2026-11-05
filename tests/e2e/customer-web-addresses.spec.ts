import {test,expect} from "@playwright/test";
test.use({viewport:{width:1440,height:1100}});
const id="00000000-0000-4000-8000-000000000001";
test("customer address book persists create, edit and delete using the current version",async({page})=>{
  let version=0;
  let addresses:Record<string,unknown>[]=[];
  await page.route("**/api/customer/addresses**",async route=>{
    const method=route.request().method();
    if(method!=="GET"){
      const body=route.request().postDataJSON();
      expect(body.version).toBe(version);
      version++;
      if(method==="DELETE")addresses=[];
      else addresses=[{id,recipientName:body.recipientName,recipientPhone:"+989121234567",province:body.province,city:body.city,postalCode:"1234567890",fullAddress:body.fullAddress,isDefault:true}];
    }
    await route.fulfill({json:{version,addresses}});
  });
  await page.goto("/customer/address-book");
  await expect(page.getByText("هنوز آدرسی ثبت نکرده‌اید.",{exact:true})).toBeVisible();
  for(const [label,value] of [["نام گیرنده","گیرندهٔ آزمون"],["شماره همراه گیرنده","۰۹۱۲۱۲۳۴۵۶۷"],["استان","تهران"],["شهر","تهران"],["کدپستی","۱۲۳۴۵۶۷۸۹۰"],["نشانی کامل","خیابان نمونه، پلاک ۱"]])await page.getByLabel(label,{exact:true}).fill(value);
  await page.getByRole("button",{name:"ذخیره آدرس",exact:true}).click();
  await expect(page.getByRole("heading",{name:"گیرندهٔ آزمون · پیش‌فرض"})).toBeVisible();
  await page.getByRole("button",{name:"ویرایش",exact:true}).click();
  await page.getByLabel("شهر",{exact:true}).fill("ری");
  await page.getByRole("button",{name:"ذخیره آدرس",exact:true}).click();
  await expect(page.getByText("تهران، ری، خیابان نمونه، پلاک ۱",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"حذف",exact:true}).click();
  await expect(page.getByText("هنوز آدرسی ثبت نکرده‌اید.",{exact:true})).toBeVisible();
  expect(version).toBe(3);
});
