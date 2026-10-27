import {test,expect,type Page} from "@playwright/test";
import inventory from "../../docs/implementation/customer-web-screen-inventory.json";
import slots from "../../docs/implementation/customer-web-asset-slots.json";

test.use({viewport:{width:1440,height:1100}});
async function ready(page:Page,screen:string){await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();await expect(page.locator('.customer-web-design')).toBeVisible();}

test('all 19 customer web screens preserve original assets and visible native bounds',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const screen of inventory){
  await page.setViewportSize({width:1440,height:screen.h});expect((await page.goto('/preview/customer-web/'+screen.slug+'?canvas=1'))?.status()).toBe(200);await ready(page,screen.slug);await page.evaluate(()=>document.fonts.ready);
  const actual=await page.locator('.customer-web-design img').evaluateAll(async images=>{await Promise.all(images.map(el=>(el as HTMLImageElement).decode()));return images.map(el=>{const img=el as HTMLImageElement,r=img.getBoundingClientRect();const v={left:r.left,right:r.right,top:r.top,bottom:r.bottom};for(let p=img.parentElement;p;p=p.parentElement){const c=getComputedStyle(p),b=p.getBoundingClientRect();if(['hidden','clip','auto','scroll'].includes(c.overflowX)){v.left=Math.max(v.left,b.left);v.right=Math.min(v.right,b.right);}if(['hidden','clip','auto','scroll'].includes(c.overflowY)){v.top=Math.max(v.top,b.top);v.bottom=Math.min(v.bottom,b.bottom);}}return {src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0,x:v.left,y:v.top,w:v.right-v.left,h:v.bottom-v.top};});});
  const expected=slots.filter(s=>s.screen===screen.slug);expect(actual).toHaveLength(expected.length);
  for(let i=0;i<actual.length;i++){const a=expected[i],b=actual[i],bounds=a.strokeBounds,native={x:bounds.x-screen.x,y:bounds.y-screen.y,w:bounds.width,h:bounds.height};expect(b.src).toBe(a.path);expect(b.loaded).toBe(true);for(const key of ['x','y','w','h']as const)expect(Math.abs(b[key]-native[key]),screen.slug+' '+a.node+' '+key).toBeLessThanOrEqual(2);}
 }
 expect(errors).toEqual([]);
});

test('catalog includes every customer route and navigation stays in the customer web preview',async({page})=>{
 await page.goto('/preview/customer-web');await expect(page.locator('.preview-groups li')).toHaveCount(19);
 await page.goto('/preview/customer-web/home');await ready(page,'home');await page.getByRole('link',{name:'کشف آثار',exact:true}).first().click();await ready(page,'products');await page.getByRole('link',{name:'مشاهده اثر',exact:true}).first().click();await ready(page,'product-detail');await page.getByRole('link',{name:/افزودن به سبد/}).click();await ready(page,'cart');await page.getByRole('link',{name:'ادامه خرید',exact:true}).click();await ready(page,'login');
});

test('phone and sample OTP validation precede the address and checkout flow',async({page})=>{
 await page.goto('/preview/customer-web/login');await ready(page,'login');await page.getByRole('button',{name:'ادامه',exact:true}).click();await expect(page.getByRole('status')).toContainText('شماره همراه معتبر');await page.getByRole('textbox',{name:'شماره همراه',exact:true}).fill('۰۹۱۲۱۲۳۴۵۶۷');await page.getByRole('button',{name:'ادامه',exact:true}).click();await ready(page,'otp-verification');await page.getByRole('button',{name:'تأیید و ادامه',exact:true}).click();await expect(page.getByRole('status')).toContainText('کد نمونه');
 for(let i=0;i<6;i++)await page.getByRole('textbox',{name:'رقم '+(i+1)+' کد تأیید',exact:true}).fill(String(i+1));await page.getByRole('button',{name:'تأیید و ادامه',exact:true}).click();await ready(page,'address-book');await expect(page.getByRole('textbox')).toHaveCount(6);await page.getByRole('link',{name:'ذخیره آدرس',exact:true}).click();await ready(page,'checkout-review');await page.getByRole('link',{name:'ادامه برای پرداخت',exact:true}).click();await ready(page,'payment-redirect');
});

test('payment outcomes, empty favorites, and account pages remain directly reviewable',async({page})=>{
 for(const screen of ['payment-success','payment-failed','favorites','favorites-empty','account-overview','orders','order-detail']){await page.goto('/preview/customer-web/'+screen);await ready(page,screen);await expect(page.locator('.customer-web-design')).toHaveAttribute('lang','fa');}
});
