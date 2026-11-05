import {test,expect} from "@playwright/test";
test.use({viewport:{width:1440,height:1100}});
const id="00000000-0000-4000-8000-000000000001";
const order={preparation:[],id,version:0,status:"reserved",paymentStatus:"unpaid",subtotalToman:"1000",reservedUntil:"2026-11-05T10:30:00.000Z",createdAt:"2026-11-05T10:00:00.000Z",shippingAddress:{recipientName:"گیرندهٔ سفارش",recipientPhone:"+989121234567",province:"تهران",city:"تهران",postalCode:"1234567890",fullAddress:"نشانی ثبت‌شده"},items:[{productId:id,title:"اثر سفارش",quantity:1,unitPriceToman:"1000",lineSubtotalToman:"1000",imageIds:[]}]};
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

test("customer sees artist-reported dispatch separately from confirmed receipt",async({page})=>{
  const shipment={id,status:"reported_dispatched",source:"artist_report",carrierVerified:false,customerVersion:0,issue:null,carrierName:"پست",trackingCode:"00123AB",reportedAt:order.createdAt,receipt:null};
  await page.route("**/api/customer/orders/"+id,route=>route.fulfill({json:{...order,status:"placed",paymentStatus:"paid",preparation:[{items:[id],status:"ready_for_dispatch",version:5,shipment}]}}));
  await page.goto("/customer/order-detail?id="+id);
  const section=page.getByRole("region",{name:"آماده‌سازی و ارسال"});
  await expect(section.getByText("00123AB",{exact:true})).toBeVisible();
  await expect(section).toContainText("شرکت حمل هنوز آن را تأیید نکرده است");
  await expect(section).not.toContainText("دریافت توسط مشتری تأیید شده است");
});

test("customer confirms receipt and reports damage with current shipment versions",async({page})=>{
  let shipment={id,status:"reported_dispatched",source:"artist_report",carrierVerified:false,customerVersion:0,issue:null as unknown,carrierName:"پست",trackingCode:"00123AB",reportedAt:order.createdAt,receipt:null as unknown};
  await page.route("**/api/customer/orders/"+id,route=>route.fulfill({json:{...order,status:"placed",paymentStatus:"paid",preparation:[{items:[id],status:"ready_for_dispatch",version:5,shipment}]}}));
  await page.route(`**/api/customer/orders/${id}/shipments/${id}/receipt`,async route=>{
    expect(route.request().postDataJSON()).toEqual({version:0});
    shipment={...shipment,customerVersion:1,receipt:{source:"customer_confirmation",receivedAt:order.createdAt}};
    await route.fulfill({json:shipment});
  });
  await page.route(`**/api/customer/orders/${id}/shipments/${id}/issues`,async route=>{
    expect(route.request().postDataJSON()).toEqual({version:1,kind:"damaged",description:"بسته آسیب دیده است"});
    shipment={...shipment,customerVersion:2,issue:{refundReview:null,kind:"damaged",description:"بسته آسیب دیده است",status:"open",resolution:null,resolutionSummary:null}};
    await route.fulfill({json:shipment});
  });
  await page.goto("/customer/order-detail?id="+id);
  await page.getByRole("button",{name:"تأیید دریافت مرسوله",exact:true}).click();
  await page.getByRole("checkbox",{name:"این مرسوله را دریافت کرده‌ام."}).check();
  await page.getByRole("button",{name:"ثبت تأیید دریافت",exact:true}).click();
  await expect(page.getByText(/دریافت توسط مشتری تأیید شده است:/)).toBeVisible();
  await page.getByRole("button",{name:"گزارش مشکل مرسوله",exact:true}).click();
  await expect(page.getByRole("option",{name:"مرسوله نرسیده است"})).toHaveCount(0);
  await page.getByLabel("نوع مشکل",{exact:true}).selectOption("damaged");
  await page.getByLabel("شرح مشکل",{exact:true}).fill("بسته آسیب دیده است");
  await page.getByRole("button",{name:"ثبت گزارش مشکل",exact:true}).click();
  await expect(page.getByText("وضعیت رسیدگی: ثبت‌شده",{exact:true})).toBeVisible();
  await expect(page.getByRole("button",{name:"گزارش مشکل مرسوله",exact:true})).toHaveCount(0);
});

test("customer cancels a reservation and sees the server's final state",async({page})=>{
  let current={...order};
  await page.route("**/api/customer/orders/"+id,route=>route.fulfill({json:current}));
  await page.route(`**/api/customer/orders/${id}/cancel`,async route=>{
    expect(route.request().postDataJSON()).toEqual({version:0});
    current={...current,status:"cancelled",version:1};
    await route.fulfill({json:current});
  });
  await page.goto("/customer/order-detail?id="+id);
  await page.getByRole("button",{name:"لغو سفارش",exact:true}).click();
  await page.getByRole("checkbox",{name:"لغو این سفارش را تأیید می‌کنم."}).check();
  await page.getByRole("button",{name:"ثبت لغو سفارش",exact:true}).click();
  await expect(page.getByText("لغوشده",{exact:true})).toBeVisible();
  await expect(page.getByRole("button",{name:"لغو سفارش",exact:true})).toHaveCount(0);
});

test("approved refund is explicitly shown as not executed",async({page})=>{
  const issue={kind:"damaged",description:"آسیب",status:"closed",resolution:"referred_for_refund_review",resolutionSummary:"بررسی مالی",refundReview:{decision:"approved",amountToman:"1000",reviewedAt:order.createdAt,executionStatus:"not_executed"}};
  const shipment={id,status:"reported_dispatched",source:"artist_report",carrierVerified:false,customerVersion:1,issue,carrierName:"پست",trackingCode:"001",reportedAt:order.createdAt,receipt:null};
  await page.route("**/api/customer/orders/"+id,route=>route.fulfill({json:{...order,status:"placed",paymentStatus:"paid",preparation:[{items:[id],status:"ready_for_dispatch",version:5,shipment}]}}));
  await page.goto("/customer/order-detail?id="+id);
  await expect(page.getByRole("region",{name:"نتیجهٔ بررسی بازپرداخت"})).toContainText("وجهی واریز نشده است");
  await expect(page.getByRole("button",{name:"لغو سفارش",exact:true})).toHaveCount(0);
});
