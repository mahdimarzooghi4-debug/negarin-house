import {test,expect,type Page} from "@playwright/test";
import inventory from "../../docs/implementation/export-partner-screen-inventory.json";
import slots from "../../docs/implementation/export-partner-asset-slots.json";
import controls from "../../docs/implementation/export-partner-controls.json";
import {exportLanguages,exportPending} from "../../apps/web/src/features/export-partner/languages";

test.use({viewport:{width:1440,height:1024}});
async function ready(page:Page,screen:string){await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();await expect(page.locator('.export-partner-design')).toBeVisible();}

test('all complete foreign partner frames load original assets and preserve sidebar and native bounds',async({page})=>{
 test.setTimeout(180000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const screen of inventory.filter(s=>s.implemented)){
  const response=await page.goto('/preview/export-partner/'+screen.slug+'?canvas=1');expect(response?.status()).toBe(200);await ready(page,screen.slug);
  await expect(page.locator('.export-partner-design')).toHaveAttribute('lang',screen.language);
  await expect(page.getByRole('complementary')).toHaveCount(1);await expect(page.getByRole('complementary').getByRole('link')).toHaveCount(6);await expect(page.getByRole('complementary').getByRole('button')).toHaveCount(1);
  await page.evaluate(()=>document.fonts.ready);const actual=await page.locator('.export-partner-design img').evaluateAll(async images=>{await Promise.all(images.map(img=>(img as HTMLImageElement).decode()));return images.map(el=>{const img=el as HTMLImageElement,r=img.getBoundingClientRect();return {src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0,x:r.x,y:r.y,w:r.width,h:r.height};});});
  const expected=slots.filter(s=>s.screen===screen.slug);expect(actual).toHaveLength(expected.length);
  for(let i=0;i<actual.length;i++){expect(actual[i].src).toBe(expected[i].path);expect(actual[i].loaded).toBe(true);for(const key of ['x','y','w','h']as const)expect(Math.abs(actual[i][key]-expected[i][key]),screen.slug+' '+expected[i].node+' '+key).toBeLessThanOrEqual(2);}
 }
 expect(errors).toEqual([]);
});

test('catalog accounts for every language and enables all 77 native reference screens',async({page})=>{
 await page.goto('/preview/export-partner');await expect(page.locator('.preview-groups section')).toHaveCount(7);await expect(page.locator('.preview-groups li')).toHaveCount(77);await expect(page.locator('.preview-groups li small')).toHaveCount(0);
 for(const s of inventory.filter(s=>!s.implemented)){await page.goto('/preview/export-partner/'+s.slug);await expect(page.getByText(exportPending[s.language as keyof typeof exportPending],{exact:true})).toBeVisible();await expect(page.locator('.export-partner-design')).toHaveCount(0);}
});

test('order draft, review and submitted flows stay in each partner language',async({page})=>{
 for(const locale of exportLanguages){const prefix=locale.code.toLowerCase();await page.goto('/preview/export-partner/'+prefix+'-dashboard');await ready(page,prefix+'-dashboard');
  await page.getByRole('complementary').locator('[data-name="nav-item-4"]').click();await ready(page,prefix+'-order-draft');
  for(const [from,to]of [['order-draft','order-review'],['order-review','order-submitted'],['order-submitted','order-detail']]as const){const c=controls.find(c=>c.screen===prefix+'-'+from&&c.destination===to)!;expect(c).toBeDefined();await page.getByRole('link',{name:c.label,exact:true}).first().click();await ready(page,prefix+'-'+to);}
  await page.getByRole('complementary').locator('[data-name="nav-item-2"]').click();if(inventory.find(s=>s.slug===prefix+'-export-products')?.implemented)await ready(page,prefix+'-export-products');else await expect(page.getByText(exportPending[locale.code],{exact:true})).toBeVisible();
 }
});

test('local fields and preferences retain edits and language selector opens equivalent screen',async({page})=>{
 await page.goto('/preview/export-partner/en-order-draft');await ready(page,'en-order-draft');const field=page.getByRole('textbox',{name:'TOTAL QUANTITY (UNITS)',exact:true});await field.fill('42');
 await page.getByRole('complementary').locator('[data-name="nav-item-0"]').click();await ready(page,'en-dashboard');await page.getByRole('complementary').locator('[data-name="nav-item-4"]').click();await ready(page,'en-order-draft');await expect(field).toHaveValue('42');
 await page.getByRole('complementary').locator('[data-name="nav-item-6"]').click();await ready(page,'en-account-preferences');const choice=page.locator('[data-name="switch-active"]');await choice.click();await expect(choice).toHaveAttribute('aria-pressed','false');await page.getByRole('button',{name:'Apply Configuration',exact:true}).click();await expect(page.getByRole('status')).toContainText('this preview only');
 await page.getByRole('combobox',{name:'Language',exact:true}).selectOption('ar');await ready(page,'ar-account-preferences');await page.getByRole('complementary').locator('[data-name="nav-item-5"]').click();await expect(page.getByRole('status')).toHaveAttribute('lang','ar');await expect(page.getByRole('status')).toContainText('معاينة');
});
