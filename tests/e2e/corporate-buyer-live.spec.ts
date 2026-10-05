import {expect,test} from "@playwright/test";

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
