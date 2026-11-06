import {storyVideoBase64} from "./fixtures/story-video";
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
 await page.route("**/api/artist/stories/eligible-products?*",route=>route.fulfill({json:{page:1,pageSize:20,hasMore:false,items:[]}}));
 await page.route(/\/api\/artist\/stories\/[0-9a-f-]{36}$/i,route=>{expect(route.request().method()).toBe("PUT");expect(saved).toBeNull();const body=route.request().postDataJSON();expect(body.version).toBe(0);saved={...body,id:route.request().url().split("/").pop(),artistId,version:1,published:false};return route.fulfill({status:502,json:{error:"ambiguous"}});});
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
test("artist links a product as a draft and customer opens the published product",async({page})=>{
 const id="00000000-0000-4000-8000-000000000002",productId="00000000-0000-4000-8000-000000000003";
 const profile={artistId,displayName:"هنرمند",biography:"کارگاه",craft:"سفال",city:"تهران"},product={id:productId,title:"گلدان کارگاه",priceToman:"9007199254740993",availability:"out_of_stock"};
 let story={id,artistId,version:1,title:"روایت محصول",body:"ساخت گلدان",published:true,relatedProductId:null as string|null};
 await page.route("**/api/artist/public-profile",route=>route.fulfill({json:{...profile,version:1,published:true}}));await page.route("**/api/artist/stories",route=>route.fulfill({json:[story]}));
 await page.route("**/api/artist/stories/eligible-products?*",route=>route.fulfill({json:{page:1,pageSize:20,hasMore:false,items:[product]}}));
 await page.route(`**/api/artist/stories/${id}/product`,route=>{expect(route.request().postDataJSON()).toEqual({version:1,productId});story={...story,version:2,relatedProductId:productId,published:false};return route.fulfill({json:story});});
 await page.route(`**/api/artist/stories/${id}/publication`,route=>{expect(route.request().postDataJSON()).toEqual({version:2,published:true});story={...story,version:3,published:true};return route.fulfill({json:story});});
 await page.goto("/artist/story-editor?id="+id);await page.getByRole("button",{name:"اتصال گلدان کارگاه",exact:true}).click();await expect(page.getByText("محصول مرتبط ذخیره شد؛ روایت پیش‌نویس است.")).toBeVisible();await expect(page.getByRole("button",{name:"محصول انتخاب‌شده",exact:true})).toBeDisabled();await page.getByRole("button",{name:"انتشار عمومی",exact:true}).click();await expect(page.getByText("انتشار ثبت شد.")).toBeVisible();
 await page.route("**/api/catalog/stories/"+id,route=>route.fulfill({json:{id,title:story.title,body:story.body,publishedAt:"2026-11-06T10:00:00.000Z",profile,product}}));
 await page.goto("/customer/story-viewer?id="+id);await expect(page.getByRole("heading",{name:"محصول مرتبط: گلدان کارگاه",exact:true})).toBeVisible();await expect(page.getByRole("link",{name:"مشاهده محصول مرتبط",exact:true})).toHaveAttribute("href","/customer/product-detail?id="+productId);await page.getByRole("link",{name:"مشاهده محصول مرتبط",exact:true}).click();await expect(page).toHaveURL(new RegExp("product-detail\\?id="+productId));
});
test("a conflicting story product edit requires a fresh read",async({page})=>{
 const id="00000000-0000-4000-8000-000000000002",productId="00000000-0000-4000-8000-000000000003";
 const product={id:productId,title:"گلدان",priceToman:"1000",availability:"in_stock"};let version=1;
 await page.route("**/api/artist/public-profile",route=>route.fulfill({json:{artistId,displayName:"هنرمند",biography:"کارگاه",craft:"سفال",city:"تهران",version:1,published:true}}));await page.route("**/api/artist/stories",route=>route.fulfill({json:[{id,artistId,version,title:"روایت",body:"متن",published:false,relatedProductId:version===1?null:productId}]}));await page.route("**/api/artist/stories/eligible-products?*",route=>route.fulfill({json:{page:1,pageSize:20,hasMore:false,items:[product]}}));await page.route(`**/api/artist/stories/${id}/product`,route=>{version=2;return route.fulfill({status:409,json:{error:"conflict"}});});
 await page.goto("/artist/story-editor?id="+id);await page.getByRole("button",{name:"اتصال گلدان",exact:true}).click();await expect(page.locator(".artist-design").getByRole("alert")).toContainText("دوباره دریافت کنید");await expect(page.getByRole("button",{name:"انتشار عمومی",exact:true})).toHaveCount(0);await page.getByRole("button",{name:"دریافت دوباره اطلاعات",exact:true}).click();await expect(page.getByRole("button",{name:"محصول انتخاب‌شده",exact:true})).toBeDisabled();
});

test("artist video upload returns to draft and published video loads in the customer player",async({page})=>{
 const id="00000000-0000-4000-8000-000000000002",videoId="00000000-0000-4000-8000-000000000003";
 const profile={artistId,displayName:"هنرمند",biography:"کارگاه",craft:"سفال",city:"تهران"};let story={id,artistId,version:1,title:"روایت ویدئویی",body:"معرفی کارگاه",published:true,videoId:null as string|null};
 await page.route("**/api/artist/public-profile",route=>route.fulfill({json:{...profile,version:1,published:true}}));await page.route("**/api/artist/stories",route=>route.fulfill({json:[story]}));await page.route("**/api/artist/stories/eligible-products?*",route=>route.fulfill({json:{page:1,pageSize:20,hasMore:false,items:[]}}));
 await page.route(`**/api/artist/stories/${id}/video`,route=>{const body=route.request().postDataJSON();expect(body.version).toBe(story.version);if(route.request().method()==="POST")expect(body.base64).toBe("YWJj");story={...story,version:story.version+1,published:false,videoId:route.request().method()==="POST"?videoId:null};return route.fulfill({json:story});});
 await page.route(`**/api/artist/stories/${id}/publication`,route=>{expect(route.request().postDataJSON()).toEqual({version:2,published:true});story={...story,version:3,published:true};return route.fulfill({json:story});});
 await page.route("https://videos.example/clip.mp4",route=>route.fulfill({contentType:"video/mp4",body:Buffer.from(storyVideoBase64,"base64")}));
 for(const audience of ["artist","catalog"])await page.route(`**/api/${audience}/stories/${id}/videos/${videoId}`,route=>route.fulfill({json:{id:videoId,contentType:"video/mp4",url:"https://videos.example/clip.mp4"}}));
 await page.goto("/artist/story-editor?id="+id);await page.getByLabel("انتخاب ویدئو",{exact:true}).setInputFiles({name:"clip.mp4",mimeType:"video/mp4",buffer:Buffer.from("abc")});await expect(page.getByText("ویدئو به‌روز شد؛ روایت پیش‌نویس است.")).toBeVisible();await expect(page.locator('video[aria-label="ویدئوی روایت"]')).toHaveAttribute("controls","");await page.getByRole("button",{name:"انتشار عمومی",exact:true}).click();await expect(page.getByText("انتشار ثبت شد.")).toBeVisible();
 await page.route("**/api/catalog/stories/"+id,route=>route.fulfill({json:{id,title:story.title,body:story.body,videoId,publishedAt:"2026-11-06T10:00:00.000Z",profile}}));await page.goto("/customer/story-viewer?id="+id);await expect(page.locator("video")).toHaveAttribute("src","https://videos.example/clip.mp4");await expect(page.locator("video")).toHaveAttribute("preload","metadata");await expect.poll(()=>page.locator("video").evaluate((video:HTMLVideoElement)=>video.duration)).toBeGreaterThan(0);
 await page.goto("/artist/story-editor?id="+id);await page.getByRole("button",{name:"حذف ویدئوی روایت",exact:true}).click();await expect(page.locator("video")).toHaveCount(0);await expect(page.getByRole("button",{name:"انتشار عمومی",exact:true})).toBeEnabled();
});
