import {test,expect,type Page} from "@playwright/test";
import inventory from "../../docs/implementation/supporting-organization-screen-inventory.json";
import slots from "../../docs/implementation/supporting-organization-asset-slots.json";
const organizationConsent="با ارسال اطلاعات، تأیید می‌کنم که مجوز ارائه اطلاعات تماس هنرمند به نگارین را دارم.";

test.use({viewport:{width:1440,height:1024}});
async function ready(page:Page,screen:string){await expect(page.locator(`[data-preview-ready="true"][data-preview-screen="${screen}"]`)).toBeAttached();await expect(page.locator('.supporting-organization-design')).toBeVisible();}

test('every organization screen preserves native asset bounds and the seven sidebar destinations',async({page})=>{
 test.setTimeout(120000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const screen of inventory){
  const response=await page.goto('/preview/supporting-organization/'+screen.slug+'?canvas=1');expect(response?.status()).toBe(200);await ready(page,screen.slug);
  await expect(page.locator('.supporting-organization-design')).toHaveAttribute('lang','fa');
  await expect(page.getByRole('complementary',{name:'منوی سازمان حامی'})).toHaveCount(1);
  const nav=page.getByRole('complementary').getByRole('link');await expect(nav).toHaveCount(7);
  for(const destination of ['dashboard','support-programs','artist-referrals','my-supports','activity-report','notifications','account'])await expect(page.getByRole('complementary').locator(`a[href="/preview/supporting-organization/${destination}"]`)).toHaveCount(1);
  await page.evaluate(()=>document.fonts.ready);
  const actual=await page.locator('.supporting-organization-design img').evaluateAll(async images=>{await Promise.all(images.map(img=>(img as HTMLImageElement).decode()));return images.map(el=>{const img=el as HTMLImageElement,r=img.getBoundingClientRect();return {src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0,x:r.x,y:r.y,w:r.width,h:r.height};});});
  const expected=slots.filter(s=>s.screen===screen.slug);expect(actual).toHaveLength(expected.length);
  for(let i=0;i<actual.length;i++){expect(actual[i].src).toBe(expected[i].path);expect(actual[i].loaded).toBe(true);for(const key of ['x','y','w','h']as const)expect(Math.abs(actual[i][key]-expected[i][key]),screen.slug+' '+expected[i].node+' '+key).toBeLessThanOrEqual(2);}
  if(screen.slug==='loading-state')await expect(page.locator(`[data-node-id="${screen.id}"]`)).toHaveAttribute('aria-busy','true');
 }
 expect(errors).toEqual([]);await page.goto('/preview/supporting-organization');await expect(page.locator('.preview-groups li')).toHaveCount(19);
});

test('support program and artist drilldowns and notification cards open their sample destinations',async({page})=>{
 await page.goto('/preview/supporting-organization/dashboard');await ready(page,'dashboard');
 await page.getByRole('complementary').getByRole('link',{name:'برنامه‌های حمایتی',exact:true}).click();await ready(page,'support-programs');
 await page.locator('[data-name="program-card-0"]').click();await ready(page,'support-program-detail');
 await page.locator('[data-name="table-row-0"]').click();await ready(page,'supported-artist');
 await page.locator('[data-name="table-row-0"]').click();await ready(page,'support-detail');
 await page.getByRole('complementary').getByRole('link',{name:'اعلان‌ها',exact:true}).click();await ready(page,'notifications');
 const card=page.locator('[data-name="notif-card-0"]');await expect(card).toHaveAttribute('href',/referral-detail|support-detail|activity-detail-report/);await card.click();await expect(page).toHaveURL(/\/(referral-detail|support-detail|activity-detail-report)$/);
});

test('referral validates Persian phone input and consent and keeps the multiline draft on navigation',async({page})=>{
 await page.goto('/preview/supporting-organization/new-artist-referral');await ready(page,'new-artist-referral');
 await page.getByRole('button',{name:'ثبت معرفی',exact:true}).click();await expect(page.getByRole('status')).toContainText('شماره تماس معتبر');
 await page.getByRole('textbox',{name:'نام و نام خانوادگی هنرمند',exact:true}).fill('هنرمند نمونه');await page.getByRole('textbox',{name:'شماره تماس',exact:true}).fill('۰۹۱۲۳۴۵۶۷۸۹');
 const description=page.getByRole('textbox',{name:'توضیح کوتاه درباره معرفی',exact:true});await expect(description).toHaveJSProperty('tagName','TEXTAREA');await description.fill('معرفی برای حمایت\nجزئیات نمونه');
 const consent=page.getByRole('button',{name:organizationConsent,exact:true});await expect(consent).toHaveAttribute('aria-pressed','true');await consent.click();await page.getByRole('button',{name:'ثبت معرفی',exact:true}).click();await expect(page.getByRole('status')).toContainText('مجوز ارائه اطلاعات تماس');await expect(page).toHaveURL(/new-artist-referral$/);
 await page.getByRole('complementary').getByRole('link',{name:'هنرمندان معرفی‌شده',exact:true}).click();await ready(page,'artist-referrals');await page.getByRole('link',{name:'معرفی هنرمند جدید',exact:true}).click();await ready(page,'new-artist-referral');await expect(description).toHaveValue('معرفی برای حمایت\nجزئیات نمونه');await expect(consent).toHaveAttribute('aria-pressed','false');
 await consent.click();await page.getByRole('button',{name:'ثبت معرفی',exact:true}).click();await ready(page,'referral-submitted');await page.getByRole('link',{name:'مشاهده جزئیات معرفی',exact:true}).click();await ready(page,'referral-detail');
});

test('account preferences are independent and invitation validation sends no server request',async({page})=>{
 await page.goto('/preview/supporting-organization/account');await ready(page,'account');const first=page.getByRole('button',{name:'تغییر وضعیت معرفی هنرمند',exact:true}),second=page.getByRole('button',{name:'فعال‌سازی حمایت',exact:true});await first.click();await expect(first).toHaveAttribute('aria-pressed','false');await expect(second).toHaveAttribute('aria-pressed','true');
 await page.getByRole('link',{name:'کاربران و دسترسی‌ها',exact:true}).click();await ready(page,'users-and-access');await page.locator('[data-name="btn-invite"]').click();await ready(page,'invite-user');
 await page.getByRole('button',{name:'ارسال دعوت‌نامه',exact:true}).click();await expect(page.getByRole('status')).toContainText('ایمیل معتبر');await page.getByRole('textbox',{name:'نام و نام خانوادگی همکار',exact:true}).fill('همکار نمونه');await page.getByRole('textbox',{name:'آدرس ایمیل کاری',exact:true}).fill('invalid');await page.getByRole('button',{name:'ارسال دعوت‌نامه',exact:true}).click();await expect(page.getByRole('status')).toContainText('ایمیل معتبر');
 await page.getByRole('textbox',{name:'آدرس ایمیل کاری',exact:true}).fill('colleague@example.org');const mutations:string[]=[];page.on('request',r=>{if(r.method()!=='GET'&&r.method()!=='HEAD')mutations.push(r.url());});await page.getByRole('button',{name:'ارسال دعوت‌نامه',exact:true}).click();await expect(page.getByRole('status')).toContainText('ایمیلی ارسال نشده');expect(mutations).toEqual([]);await expect(page).toHaveURL(/invite-user$/);
 await page.getByRole('complementary').getByRole('link',{name:'حساب سازمان',exact:true}).click();await ready(page,'account');await expect(first).toHaveAttribute('aria-pressed','false');await expect(second).toHaveAttribute('aria-pressed','true');
 await page.goto('/preview/supporting-organization/error-state');await ready(page,'error-state');await page.locator('[data-name="retry-button"]').click();await ready(page,'dashboard');
});
