import {test,expect} from "@playwright/test";
const artistId="00000000-0000-4000-8000-000000000001";
test.use({viewport:{width:1440,height:1100}});
test("artist saves a profile draft before explicit publication",async({page})=>{
 let profile={artistId,version:0,displayName:"",biography:"",craft:"",city:"",published:false};
 await page.route("**/api/artist/stories",route=>route.fulfill({json:[]}));
 await page.route("**/api/artist/public-profile",route=>{if(route.request().method()==="PUT"){const body=route.request().postDataJSON();expect(body.version).toBe(profile.version);profile={...profile,...body,version:profile.version+1,published:false};}return route.fulfill({json:profile});});
 await page.route("**/api/artist/public-profile/publication",route=>{expect(route.request().postDataJSON()).toEqual({version:1,published:true});profile={...profile,version:2,published:true};return route.fulfill({json:profile});});
 await page.goto("/artist/storefront-editor");
 await page.getByLabel("نام نمایشی").fill("هنرمند آزمایشی");await page.getByLabel("درباره هنرمند").fill("معرفی کارگاه");await page.getByLabel("رشته هنری").fill("سفال");await page.getByLabel("شهر").fill("تهران");
 await expect(page.getByRole("button",{name:"انتشار عمومی",exact:true})).toBeDisabled();
 await page.getByRole("button",{name:"ذخیره پیش‌نویس"}).click();await expect(page.getByText("ذخیره شد؛ تغییرات به‌صورت پیش‌نویس هستند.")).toBeVisible();
 await page.getByRole("button",{name:"انتشار عمومی",exact:true}).click();await expect(page.getByRole("link",{name:"مشاهده صفحه عمومی"})).toHaveAttribute("href","/customer/artist-store?id="+artistId);
});
test("ambiguous story creation reconciles the same identifier before publication",async({page})=>{
 const profile={artistId,version:1,displayName:"هنرمند",biography:"کارگاه",craft:"سفال",city:"تهران",published:true};
 let saved:Record<string,unknown>|null=null;
 await page.route("**/api/artist/public-profile",route=>route.fulfill({json:profile}));await page.route("**/api/artist/stories",route=>route.fulfill({json:saved?[saved]:[]}));
 await page.route("**/api/artist/stories/*",route=>{expect(saved).toBeNull();const body=route.request().postDataJSON();expect(body.version).toBe(0);saved={...body,id:route.request().url().split("/").pop(),artistId,version:1,published:false};return route.fulfill({status:502,json:{error:"ambiguous"}});});
 await page.goto("/artist/story-new");await page.getByLabel("عنوان روایت").fill("روایت کارگاه");await page.getByLabel("متن روایت").fill("متن روایت هنرمند");await page.getByRole("button",{name:"ذخیره پیش‌نویس"}).click();
 await expect(page.locator(".artist-design").getByRole("alert")).toBeVisible();await page.getByRole("button",{name:"دریافت دوباره اطلاعات"}).click();await expect(page.getByLabel("عنوان روایت")).toHaveValue("روایت کارگاه");await expect(page.getByRole("button",{name:"انتشار عمومی",exact:true})).toBeEnabled();
});
test("uploading and removing a story photo keeps publication explicit",async({page})=>{
 const id="00000000-0000-4000-8000-000000000002",imageId="00000000-0000-4000-8000-000000000003";
 let story={id,artistId,version:1,title:"روایت عکس",body:"متن روایت",published:true,imageId:null as string|null};
 await page.route("**/api/artist/public-profile",route=>route.fulfill({json:{artistId,version:1,displayName:"هنرمند",biography:"کارگاه",craft:"سفال",city:"تهران",published:true}}));await page.route("**/api/artist/stories",route=>route.fulfill({json:[story]}));
 await page.route(`**/api/artist/stories/${id}/image`,route=>{const data=route.request().postDataJSON();expect(data.version).toBe(story.version);if(route.request().method()==="POST")expect(data.base64).toBe("YWJj");story={...story,version:story.version+1,published:false,imageId:route.request().method()==="POST"?imageId:null};return route.fulfill({json:story});});
 await page.route(`**/api/artist/stories/${id}/images/${imageId}`,route=>route.fulfill({json:{id:imageId,contentType:"image/webp",url:"https://images.example/story.webp"}}));await page.route("https://images.example/story.webp",route=>route.fulfill({contentType:"image/png",body:Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a5oAAAAAASUVORK5CYII=","base64")}));
 await page.goto("/artist/story-editor?id="+id);await page.getByLabel("انتخاب عکس").setInputFiles({name:"story.png",mimeType:"image/png",buffer:Buffer.from("abc")});await expect(page.getByText("عکس به‌روز شد؛ روایت پیش‌نویس است.")).toBeVisible();await expect(page.getByRole("img",{name:"عکس روایت"})).toBeVisible();await expect(page.getByRole("button",{name:"انتشار عمومی",exact:true})).toBeEnabled();await page.getByRole("button",{name:"حذف عکس روایت"}).click();await expect(page.getByRole("img",{name:"عکس روایت"})).toHaveCount(0);
});
