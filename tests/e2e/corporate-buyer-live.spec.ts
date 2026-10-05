import {randomBytes,randomInt,randomUUID} from "node:crypto";
import {expect,test} from "@playwright/test";

const BASE_URL="http://127.0.0.1:3000";

async function seedCorporateGoldenPath(){
  const [{PrismaService},{hashSessionToken}]=await Promise.all([
    import("../../apps/api/dist/prisma.service.js"),
    import("../../apps/api/dist/identity-core.js")
  ]);
  const database=new PrismaService();
  await database.$connect();

  const buyer=await database.identityUser.create({data:{phone:`+1555${randomInt(1_000_000,9_999_999)}`}});
  const artist=await database.identityUser.create({data:{phone:`+1555${randomInt(1_000_000,9_999_999)}`}});
  const organizationId=randomUUID();
  const artistGrant=await database.roleGrant.create({data:{userId:buyer.id,role:"artist"}});
  const corporateGrant=await database.roleGrant.create({data:{
    userId:buyer.id,role:"corporate_buyer",organizationId
  }});
  const sessionToken=randomBytes(32).toString("base64url");
  await database.authSession.create({data:{
    userId:buyer.id,
    tokenHash:hashSessionToken(sessionToken),
    expiresAt:new Date(Date.now()+60*60_000),
    activeGrantId:artistGrant.id
  }});

  const imageId=randomUUID();
  const title=`اثر سازمانی E2E ${randomInt(100_000,999_999)}`;
  const product=await database.artistProduct.create({data:{
    artistUserId:artist.id,
    title,
    description:"محصول منتشرشده برای مسیر واقعی Corporate Buyer",
    category:"آزمون سازمانی",
    materials:"مس",
    priceToman:12_345_678n,
    publicationStatus:"published",
    stockQuantity:3,
    imageIds:[imageId]
  }});
  await database.productImage.create({data:{
    id:imageId,
    productId:product.id,
    objectKey:`e2e/${product.id}/${imageId}.webp`,
    width:640,
    height:480,
    byteLength:1024
  }});

  async function cleanup(){
    const requests=await database.corporatePurchaseRequest.findMany({
      where:{createdByUserId:buyer.id},
      select:{id:true}
    });
    const requestIds=requests.map(request=>request.id);
    if(requestIds.length){
      await database.corporatePurchaseRequestEvent.deleteMany({where:{requestId:{in:requestIds}}});
      await database.corporatePurchaseRequestItem.deleteMany({where:{requestId:{in:requestIds}}});
      await database.corporatePurchaseRequest.deleteMany({where:{id:{in:requestIds}}});
    }
    await database.productImage.deleteMany({where:{productId:product.id}});
    await database.artistProduct.deleteMany({where:{id:product.id}});
    await database.authSession.deleteMany({where:{userId:buyer.id}});
    await database.roleGrant.deleteMany({where:{userId:buyer.id}});
    await database.identityUser.deleteMany({where:{id:{in:[buyer.id,artist.id]}}});
    await database.$disconnect();
  }

  return {sessionToken,organizationId,corporateGrantId:corporateGrant.id,productId:product.id,imageId,title,cleanup};
}

test("Corporate operational route does not fall back to sample preview data without a session",async({page})=>{
  await page.goto("/corporate-buyer");
  await expect(page).toHaveURL(/\/corporate-buyer\/corporate-products$/);
  await expect(page.getByRole("heading",{name:"ورود لازم است"})).toBeVisible();
  await expect(page.getByText("برای دادهٔ واقعی باید نشست معتبر نگارین داشته باشید.")).toBeVisible();
  await expect(page.getByText("بشقاب میناکاری اصفهان")).toHaveCount(0);
});

test("Corporate authenticated BFF refuses reads without the HttpOnly session cookie",async({request})=>{
  const products=await request.get("/api/corporate/products");
  expect(products.status()).toBe(401);
  expect(products.headers()["cache-control"]).toBe("no-store");

  const requests=await request.get("/api/corporate/purchase-requests");
  expect(requests.status()).toBe(401);
});

test("Corporate Buyer completes the authenticated live PurchaseRequest golden path",async({page,context})=>{
  const fixture=await seedCorporateGoldenPath();
  try{
    const attached=await context.request.post("/api/auth/dev-session",{
      headers:{origin:BASE_URL},
      data:{sessionToken:fixture.sessionToken}
    });
    expect(attached.status()).toBe(200);
    const sessionCookie=(await context.cookies()).find(cookie=>cookie.name==="negarin_session");
    expect(sessionCookie).toMatchObject({httpOnly:true,sameSite:"Lax"});

    const before=await context.request.get("/api/auth/context");
    expect(before.status()).toBe(200);
    expect(await before.json()).toMatchObject({activeRole:"artist"});

    await page.goto("/corporate-buyer/corporate-products");
    await expect(page.getByRole("heading",{name:"سازمان را انتخاب کنید"})).toBeVisible();
    await page.getByRole("button",{name:`سازمان ${fixture.organizationId.slice(0,8)}…`}).click();

    await expect(page.getByRole("heading",{name:"محصولات سازمانی"})).toBeVisible();
    await expect(page.getByText(fixture.title,{exact:true})).toBeVisible();

    const after=await context.request.get("/api/auth/context");
    expect(after.status()).toBe(200);
    expect(await after.json()).toMatchObject({
      activeRole:"corporate-buyer",
      organizationId:fixture.organizationId
    });

    const imageMetadata=await context.request.get(
      `/api/corporate/products/${fixture.productId}/images/${fixture.imageId}`
    );
    expect(imageMetadata.status()).toBe(200);
    expect(await imageMetadata.json()).toMatchObject({
      id:fixture.imageId,
      contentType:"image/webp",
      expiresInSeconds:300
    });

    await page.getByRole("link",{name:"مشاهده جزئیات"}).click();
    await expect(page).toHaveURL(new RegExp(`/corporate-buyer/product-detail\\?id=${fixture.productId}$`));
    await expect(page.getByRole("heading",{name:"جزئیات محصول"})).toBeVisible();
    await expect(page.getByText(fixture.title,{exact:true})).toBeVisible();

    await page.getByRole("link",{name:"افزودن به درخواست خرید"}).click();
    await expect(page.getByRole("heading",{name:"ثبت درخواست خرید"})).toBeVisible();
    const quantity=page.getByLabel("تعداد "+fixture.title);
    await quantity.fill("2");
    await page.getByRole("button",{name:"ذخیره پیش‌نویس"}).click();
    await expect(page).toHaveURL(/\/corporate-buyer\/purchase-request-detail\?id=[0-9a-f-]+$/i);

    const draftUrl=new URL(page.url());
    const requestId=draftUrl.searchParams.get("id");
    expect(requestId).toMatch(/^[0-9a-f-]{36}$/i);
    await expect(page.getByText("پیش‌نویس",{exact:true})).toBeVisible();
    await expect(page.getByText("ایجاد پیش‌نویس",{exact:true})).toBeVisible();

    await page.getByRole("button",{name:"ارسال برای بررسی نگارین"}).click();
    await expect(page.getByText("ارسال‌شده",{exact:true})).toBeVisible();
    await expect(page.getByText("ارسال درخواست",{exact:true})).toBeVisible();

    const detail=await context.request.get(`/api/corporate/purchase-requests/${requestId}`);
    expect(detail.status()).toBe(200);
    expect(await detail.json()).toMatchObject({
      id:requestId,
      status:"submitted",
      version:1,
      items:[{productId:fixture.productId,quantity:2}],
      history:[{version:0,action:"created"},{version:1,action:"submitted"}]
    });

    await page.goto("/corporate-buyer/purchase-requests");
    const shortId=`${requestId!.slice(0,8)}…${requestId!.slice(-4)}`;
    const row=page.getByRole("row").filter({hasText:shortId});
    await expect(row).toContainText("ارسال‌شده");
    await expect(row).toContainText("۲");

    expect(page.url()).not.toContain(fixture.sessionToken);
    const browserStorage=await page.evaluate(()=>JSON.stringify({
      local:Object.entries(localStorage),
      session:Object.entries(sessionStorage)
    }));
    expect(browserStorage).not.toContain(fixture.sessionToken);
  }finally{
    await fixture.cleanup();
  }
});
