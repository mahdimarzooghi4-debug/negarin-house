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

test('all 26 native screens are enabled in the nine source catalog sections',async({page})=>{
 expect(inventory).toHaveLength(26);expect(inventory.every(s=>s.implemented)).toBe(true);
 await page.goto('/preview/corporate-buyer');await expect(page.locator('.preview-groups section')).toHaveCount(9);await expect(page.locator('.preview-groups li')).toHaveCount(26);await expect(page.locator('.preview-groups li small')).toHaveCount(0);
 for(const screen of inventory)await expect(page.locator(`.preview-groups a[href="/preview/corporate-buyer/${screen.slug}"]`)).toHaveCount(1);
});

test('the eight source sidebar destinations and quick purchase actions remain within the corporate portal',async({page})=>{
 await page.goto('/preview/corporate-buyer/dashboard');await ready(page,'dashboard');const sidebar=page.getByRole('complementary',{name:'منوی خریدار سازمانی'});await expect(sidebar.getByRole('link')).toHaveCount(8);
 for(const destination of ['dashboard','purchase-requests','corporate-products','proposals','orders','deliveries','reports','account'])await expect(sidebar.locator(`a[href="/preview/corporate-buyer/${destination}"]`)).toHaveCount(1);
 await sidebar.getByRole('link',{name:'محصولات سازمانی',exact:true}).click();await ready(page,'corporate-products');await sidebar.getByRole('link',{name:'پیشخوان',exact:true}).click();await ready(page,'dashboard');
 await page.getByRole('link',{name:'ثبت درخواست خرید',exact:true}).click();await expect(page).toHaveURL(/new-purchase-request$/);await ready(page,'new-purchase-request');await page.getByRole('link',{name:'همهٔ صفحه‌های خریدار سازمانی',exact:true}).click();await expect(page.locator('.preview-groups li')).toHaveCount(26);
});

test('catalog actions reach native details and editable request forms and filter controls acknowledge preview scope',async({page})=>{
 await page.goto('/preview/corporate-buyer/corporate-products');await ready(page,'corporate-products');await expect(page.getByRole('link',{name:'مشاهده محصول',exact:true})).toHaveCount(6);await expect(page.getByRole('link',{name:'افزودن به درخواست',exact:true})).toHaveCount(6);
 await page.getByRole('button',{name:'فیلتر',exact:true}).click();await expect(page.getByRole('status')).toContainText('عملیات واقعی پس از اتصال بک‌اند');await expect(page.getByRole('link',{name:'مشاهده محصول',exact:true})).toHaveCount(6);
 await page.getByRole('link',{name:'مشاهده محصول',exact:true}).first().click();await expect(page).toHaveURL(/product-detail$/);await ready(page,'product-detail');
 await page.goto('/preview/corporate-buyer/corporate-products');await ready(page,'corporate-products');await page.getByRole('link',{name:'افزودن به درخواست',exact:true}).first().click();await expect(page).toHaveURL(/new-purchase-request$/);await ready(page,'new-purchase-request');await expect(page.getByRole('textbox')).toHaveCount(10);
});


test('purchase preview requires a title, description and positive Persian or Latin quantity',async({page})=>{
 await page.goto('/preview/corporate-buyer/new-purchase-request');await ready(page,'new-purchase-request');
 await page.getByRole('button',{name:'ثبت درخواست',exact:true}).click();await expect(page.getByRole('status')).toContainText('عنوان، شرح نیاز');await expect(page).toHaveURL(/new-purchase-request$/);
 await page.getByRole('textbox',{name:'عنوان درخواست',exact:true}).fill('هدایای پایان سال');await page.getByRole('textbox',{name:'شرح نیاز',exact:true}).fill('میناکاری با بسته‌بندی سازمانی');await page.getByRole('textbox',{name:'تعداد تقریبی',exact:true}).fill('۰');await page.getByRole('button',{name:'ثبت درخواست',exact:true}).click();await expect(page).toHaveURL(/new-purchase-request$/);
 await page.getByRole('textbox',{name:'تعداد تقریبی',exact:true}).fill('۵۰۰');await page.getByRole('button',{name:'ثبت درخواست',exact:true}).click();await ready(page,'purchase-request-detail');
 await page.goto('/preview/corporate-buyer/proposal-detail');await ready(page,'proposal-detail');await expect(page.locator('a[href="/preview/corporate-buyer/proposal-revision"]')).toHaveCount(1);
});

test('issue preview validates contact and accepts only native JPG/PNG attachments up to 5 MB',async({page})=>{
 await page.goto('/preview/corporate-buyer/report-issue');await ready(page,'report-issue');
 await page.getByRole('button',{name:'ارسال گزارش',exact:true}).click();await expect(page.getByRole('status')).toContainText('شرح مشکل');await expect(page).toHaveURL(/report-issue$/);
 const upload=page.getByLabel('تصاویر مشکل');await upload.setInputFiles({name:'invalid.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF')});await expect(page.getByRole('status')).toContainText('۵ مگابایت');await expect(upload).toHaveValue('');
 await upload.setInputFiles({name:'large.png',mimeType:'image/png',buffer:Buffer.alloc(5*1024*1024+1)});await expect(upload).toHaveValue('');
 await upload.setInputFiles({name:'damage.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jS1cAAAAASUVORK5CYII=','base64')});await expect(page.getByRole('status')).toContainText('damage.png');
 await page.getByRole('textbox',{name:'شرح مشکل',exact:true}).fill('آسیب بسته در زمان تحویل');await page.getByRole('textbox',{name:'شماره تماس جهت پیگیری',exact:true}).fill('۰۲۱-۸۸۹۹۰۰۱۱');await page.getByRole('button',{name:'ارسال گزارش',exact:true}).click();await ready(page,'issue-detail');
});
