import { test, expect, type Page } from "@playwright/test";
import inventory from "../../docs/implementation/admin-screen-inventory.json";

test.use({viewport:{width:1440,height:1100}});
async function ready(page:Page,screen:string){
 await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();
 await expect(page.locator(".admin-design")).toBeVisible();
}

test("admin inventory distinguishes complete screens and missing original source",async({page})=>{
 test.setTimeout(180000);const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/preview/admin");await expect(page.locator(".preview-groups li")).toHaveCount(105);
 expect(inventory.filter(s=>s.implemented)).toHaveLength(79);
 expect(inventory.filter(s=>s.pendingReason==="asset-quota")).toHaveLength(3);
 expect(inventory.filter(s=>s.pendingReason==="context-quota")).toHaveLength(23);
 for(const screen of inventory){
  const response=await page.goto("/preview/admin/"+screen.slug+"?canvas=1");expect(response?.status(),screen.slug).toBe(200);
  if(!screen.implemented){await expect(page.locator(`[data-pending-screen="${screen.slug}"]`)).toBeVisible();continue;}
  await ready(page,screen.slug);
  const images=await page.locator(".admin-design img").evaluateAll(images=>Promise.all(images.map(async img=>{const i=img as HTMLImageElement;await i.decode();return {src:i.getAttribute("src"),loaded:i.naturalWidth>0};})));
  for(const img of images){expect(img.loaded,screen.slug).toBe(true);expect(img.src).toMatch(/^\/admin-assets\//);}
 }
 expect(errors).toEqual([]);
});

test("visible source sidebar and table actions open artist detail",async({page})=>{
 await page.goto("/preview/admin/dashboard");await ready(page,"dashboard");
 await page.locator('[data-node-id="870:362"]').click();await ready(page,"artists");
 await page.locator('[data-node-id="884:299"]').click();await ready(page,"artist-detail");
});

test("product revision modal keeps preview feedback and submits to sample queue",async({page})=>{
 await page.goto("/preview/admin/product-review-new-product");await ready(page,"product-review-new-product");
 await page.locator('[data-node-id="887:1575"]').click();await ready(page,"product-review-request-revision");
 const dialog=page.getByRole("dialog");await expect(dialog).toBeVisible();
 const feedback=dialog.getByRole("textbox",{name:"توضیحات اصلاح مورد نیاز",exact:true});await feedback.fill("تصویر اصلی محصول به اصلاح نیاز دارد.");
 await feedback.press("Escape");await ready(page,"product-review-new-product");
 await page.locator('[data-node-id="887:1575"]').click();await ready(page,"product-review-request-revision");
 await expect(feedback).toHaveValue("تصویر اصلی محصول به اصلاح نیاز دارد.");
 await dialog.locator('[data-node-id="887:1813"]').click();await ready(page,"product-review-queue");
});

test("credential confirmation traps keyboard focus and leaves background inert",async({page})=>{
 await page.goto("/preview/admin/credential-review");await ready(page,"credential-review");
 await page.locator('[data-node-id="884:1229"]').click();await ready(page,"credential-approve-confirmation");
 const dialog=page.getByRole("dialog");await expect(dialog).toBeVisible();
 await expect(page.locator('aside[aria-label="منوی مدیریت"]')).toHaveAttribute("inert","");
 const actions=dialog.locator("a,button,input,textarea");await actions.last().focus();await page.keyboard.press("Tab");await expect(actions.first()).toBeFocused();
 await page.keyboard.press("Escape");await ready(page,"professional-credentials");
 await page.goto("/preview/admin/settlement-review");await ready(page,"settlement-review");
 await page.locator('[data-node-id="894:4251"]').click();await ready(page,"settlement-confirmation");
});
