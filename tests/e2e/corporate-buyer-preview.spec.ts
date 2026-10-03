import {test,expect,type Page} from "@playwright/test";
import inventory from "../../docs/implementation/corporate-buyer-screen-inventory.json";
import slots from "../../docs/implementation/corporate-buyer-asset-slots.json";

test.use({viewport:{width:1440,height:1100}});
async function ready(page:Page,screen:string){await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();await expect(page.locator('.corporate-buyer-design')).toBeVisible();}

test('complete corporate buyer frames load all original assets at native bounds',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const screen of inventory.filter(s=>s.implemented)){
  await page.setViewportSize({width:1440,height:screen.h});const response=await page.goto('/preview/corporate-buyer/'+screen.slug+'?canvas=1');expect(response?.status()).toBe(200);await ready(page,screen.slug);await expect(page.locator('.corporate-buyer-design')).toHaveAttribute('lang','fa');await page.evaluate(()=>document.fonts.ready);
  const actual=await page.locator('.corporate-buyer-design img').evaluateAll(async images=>{await Promise.all(images.map(img=>(img as HTMLImageElement).decode()));return images.map(el=>{const img=el as HTMLImageElement,r=img.getBoundingClientRect();return {src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0,x:r.x,y:r.y,w:r.width,h:r.height};});});
  const expected=slots.filter(s=>s.screen===screen.slug);expect(actual).toHaveLength(expected.length);
  for(let i=0;i<actual.length;i++){expect(actual[i].src).toBe(expected[i].path);expect(actual[i].loaded).toBe(true);for(const key of ['x','y','w','h']as const)expect(Math.abs(actual[i][key]-expected[i][key]),screen.slug+' '+expected[i].node+' '+key).toBeLessThanOrEqual(2);}
 }
 expect(errors).toEqual([]);
});

test('all 26 routes account for the 24 missing-asset checkpoints without rendering incomplete designs',async({page})=>{
 await page.goto('/preview/corporate-buyer');await expect(page.locator('.preview-groups section')).toHaveCount(9);await expect(page.locator('.preview-groups li')).toHaveCount(26);await expect(page.locator('.preview-groups li small')).toHaveCount(24);
 for(const screen of inventory.filter(s=>!s.implemented)){const response=await page.goto('/preview/corporate-buyer/'+screen.slug+'?canvas=1');expect(response?.status()).toBe(200);await expect(page.getByText('این صفحه در انتظار دریافت تصاویر و آیکن‌های اصلی فیگما است.',{exact:true})).toBeVisible();await expect(page.locator('.corporate-buyer-design')).toHaveCount(0);await expect(page.locator('img')).toHaveCount(0);await expect(page.getByRole('link',{name:'مشاهدهٔ طرح فیگما',exact:true})).toHaveAttribute('href',new RegExp('node-id='+screen.id.replace(':','-')));}
});

test('the eight source sidebar destinations and quick purchase actions remain within the corporate portal',async({page})=>{
 await page.goto('/preview/corporate-buyer/dashboard');await ready(page,'dashboard');const sidebar=page.getByRole('complementary',{name:'منوی خریدار سازمانی'});await expect(sidebar.getByRole('link')).toHaveCount(8);
 for(const destination of ['dashboard','purchase-requests','corporate-products','proposals','orders','deliveries','reports','account'])await expect(sidebar.locator(`a[href="/preview/corporate-buyer/${destination}"]`)).toHaveCount(1);
 await sidebar.getByRole('link',{name:'محصولات سازمانی',exact:true}).click();await ready(page,'corporate-products');await sidebar.getByRole('link',{name:'پیشخوان',exact:true}).click();await ready(page,'dashboard');
 await page.getByRole('link',{name:'ثبت درخواست خرید',exact:true}).click();await expect(page).toHaveURL(/new-purchase-request$/);await expect(page.getByText('این صفحه در انتظار دریافت تصاویر و آیکن‌های اصلی فیگما است.',{exact:true})).toBeVisible();await page.getByRole('link',{name:'همهٔ صفحه‌های خریدار سازمانی',exact:true}).click();await expect(page.locator('.preview-groups li')).toHaveCount(26);
});

test('catalog actions reach recorded checkpoints and filter controls acknowledge preview scope',async({page})=>{
 await page.goto('/preview/corporate-buyer/corporate-products');await ready(page,'corporate-products');await expect(page.getByRole('link',{name:'مشاهده محصول',exact:true})).toHaveCount(6);await expect(page.getByRole('link',{name:'افزودن به درخواست',exact:true})).toHaveCount(6);
 await page.getByRole('button',{name:'فیلتر',exact:true}).click();await expect(page.getByRole('status')).toContainText('عملیات واقعی پس از اتصال بک‌اند');await expect(page.getByRole('link',{name:'مشاهده محصول',exact:true})).toHaveCount(6);
 await page.getByRole('link',{name:'مشاهده محصول',exact:true}).first().click();await expect(page).toHaveURL(/product-detail$/);await expect(page.getByText('این صفحه در انتظار دریافت تصاویر و آیکن‌های اصلی فیگما است.',{exact:true})).toBeVisible();
 await page.goto('/preview/corporate-buyer/corporate-products');await ready(page,'corporate-products');await page.getByRole('link',{name:'افزودن به درخواست',exact:true}).first().click();await expect(page).toHaveURL(/new-purchase-request$/);await expect(page.locator('.corporate-buyer-design')).toHaveCount(0);
});
