"use client";
import Link from "next/link";
import {StoryVideo} from "../artist/story-video";
import {StoryImage} from "../artist/story-image";
import {useEffect,useMemo,useState,type ReactNode} from "react";
import "@fontsource-variable/vazirmatn";
import "@fontsource/material-icons-round";
import "./customer-web.css";
import {CustomerLiveNavigation} from "./customer-controls";
import {ProductImage} from "./live-catalog";
import {formatToman,formatPersianDate,isUuid} from "../corporate-buyer/live-data";
import {parsePublicArtist,parsePublicStory,parseArtistPage,parseStoryPage,parseArtistProducts,type PublicStory,type PublicArtist} from "./public-content-data";
import CustomerArtistStoreWeb from "./screens/artist-store";
import CustomerArtistStoriesWeb from "./screens/artist-stories";
import CustomerStoryViewerWeb from "./screens/story-viewer";
import styles from "./live-catalog.module.css";
function useContent<T>(path:string|null,parse:(value:unknown)=>T|null){
 const [data,setData]=useState<T|null>(null),[error,setError]=useState(""),[retry,setRetry]=useState(0);
 useEffect(()=>{
  setData(null);setError("");if(!path){setError("شناسهٔ صفحه معتبر نیست.");return;}
  const controller=new AbortController();
  void fetch(path,{signal:controller.signal,cache:"no-store"}).then(async response=>{
   if(!response.ok)throw new Error(response.status===404?"این محتوا منتشر نشده یا دیگر در دسترس نیست.":"دریافت محتوا انجام نشد.");
   const parsed=parse(await response.json());if(!parsed)throw new Error("اطلاعات محتوا قابل نمایش نیست.");if(!controller.signal.aborted)setData(parsed);
  }).catch(error=>{if(!controller.signal.aborted)setError(error instanceof Error?error.message:"ارتباط برقرار نشد.");});
  return()=>controller.abort();
 },[path,parse,retry]);
 return {data,error,refresh:()=>setRetry(value=>value+1)};
}
function State({data,error,refresh}:{data:unknown;error:string;refresh:()=>void}){return error?<div role="alert"><p>{error}</p><button onClick={refresh}>تلاش دوباره</button></div>:!data?<p role="status">در حال دریافت اطلاعات…</p>:null;}
function Paging({page,hasMore,onPage}:{page:number;hasMore:boolean;onPage:(page:number)=>void}){return <nav className={styles.pagination} aria-label="صفحه‌بندی محتوا"><button disabled={page<=1} onClick={()=>onPage(page-1)}>قبلی</button><span>{new Intl.NumberFormat("fa-IR").format(page)}</span><button disabled={!hasMore||page>=1000} onClick={()=>onPage(page+1)}>بعدی</button></nav>;}
function StoryProduct({story}:{story:PublicStory}){return story.product?<section><h3>محصول مرتبط: {story.product.title}</h3><p>{formatToman(story.product.priceToman)} · {story.product.availability==="in_stock"?"موجود":"ناموجود"}</p><Link href={"/customer/product-detail?id="+story.product.id}>مشاهده محصول مرتبط</Link></section>:null;}
function StoryCard({story}:{story:PublicStory}){return <article className={styles.fulfillmentCard}><h3>{story.title}</h3>{story.imageId&&<StoryImage id={story.id} imageId={story.imageId}/>}<p>{story.profile.displayName} · {formatPersianDate(story.publishedAt)}</p>{story.videoId&&<StoryVideo id={story.id} videoId={story.videoId}/>}<p>{story.body.slice(0,180)}</p><StoryProduct story={story}/><Link className={styles.accountLink} href={"/customer/story-viewer?id="+story.id}>خواندن روایت</Link></article>;}
function ArtistCard({artist}:{artist:PublicArtist}){return <article className={styles.fulfillmentCard}><h3>{artist.displayName}</h3><p>{artist.craft} · {artist.city}</p><p>{artist.biography.slice(0,180)}</p><Link className={styles.accountLink} href={"/customer/artist-store?id="+artist.artistId}>مشاهده فروشگاه هنرمند</Link><Link href={"/customer/artist-stories?artistId="+artist.artistId}>روایت‌های هنرمند</Link></article>;}
export function PublicArtistTeasers(){
 const [page,setPage]=useState(1);
 const parser=useMemo(()=>(value:unknown)=>parseArtistPage(value,page,6),[page]);
 const result=useContent(`/api/catalog/artists?page=${page}&pageSize=6`,parser);
 return <section className={styles.homeWorks} dir="rtl"><h2>هنرمندان نگارین</h2><State {...result}/>{result.data?.items.length===0&&<p>هنوز هنرمندی برای معرفی منتشر نشده است.</p>}<div className={styles.grid}>{result.data?.items.map(artist=><ArtistCard key={artist.artistId} artist={artist}/>)}</div>{result.data&&<Paging page={page} hasMore={result.data.hasMore} onPage={setPage}/>}</section>;
}
export function PublicStoryTeasers(){const [parser]=useState(()=>(value:unknown)=>parseStoryPage(value,1,3));const result=useContent("/api/catalog/stories?page=1&pageSize=3",parser);return <section className={styles.homeWorks} dir="rtl"><h2>روایت‌های نگارین</h2><State {...result}/><div className={styles.grid}>{result.data?.items.map(story=><StoryCard key={story.id} story={story}/>)}</div>{result.data?.items.length===0&&<p>هنوز روایتی منتشر نشده است.</p>}<Link href="/customer/artist-stories">همهٔ روایت‌ها</Link></section>;}
function ContentShell({children}:{children:ReactNode}){return <CustomerLiveNavigation.Provider value={true}><main className={`customer-web-design ${styles.page} ${styles.contentPage}`} lang="fa" dir="ltr">{children}</main></CustomerLiveNavigation.Provider>;}
export function CustomerArtistStoreLive({id}:{id:string}){
 const [page,setPage]=useState(1);
 const artistParser=useMemo(()=>(value:unknown)=>{const parsed=parsePublicArtist(value);return parsed?.artistId.toLowerCase()===id.toLowerCase()?parsed:null;},[id]);
 const artist=useContent(isUuid(id)?"/api/catalog/artists/"+id:null,artistParser);
 const parser=useStablePageParser(page);
 const products=useContent(artist.data?`/api/catalog/artists/${id}/products?page=${page}&pageSize=6`:null,parser.products);
 const content=<section className={styles.ordersWorkspace} dir="rtl"><Link href="/customer/home">خانه</Link><State {...artist}/>{artist.data&&<><h1>فروشگاه {artist.data.displayName}</h1><p>{artist.data.craft} · {artist.data.city}</p><p className={styles.storyText}>{artist.data.biography}</p><Link href={"/customer/artist-stories?artistId="+id}>روایت‌های هنرمند</Link><h2>آثار هنرمند</h2><State {...products}/>{products.data?.items.length===0&&<p>هنوز اثری برای فروش منتشر نشده است.</p>}<div className={styles.grid}>{products.data?.items.map(product=><article className="fg-462efdcecd" key={product.id}><ProductImage product={product}/><h3>{product.title}</h3><p>{formatToman(product.priceToman)}</p><Link className={styles.accountLink} href={"/customer/product-detail?id="+product.id}>مشاهده اثر</Link></article>)}</div>{products.data&&<Paging page={page} hasMore={products.data.hasMore} onPage={setPage}/>}</>}</section>;
 return <ContentShell><CustomerArtistStoreWeb content={content}/></ContentShell>;
}
function useStablePageParser(page:number){
 return useMemo(()=>({products:(value:unknown)=>parseArtistProducts(value,page,6),stories:(value:unknown)=>parseStoryPage(value,page,6)}),[page]);
}
export function CustomerArtistStoriesLive({artistId}:{artistId?:string}){
 const [page,setPage]=useState(1);const parser=useStablePageParser(page);
 const path=artistId===undefined?"/api/catalog/stories":isUuid(artistId)?`/api/catalog/artists/${artistId}/stories`:null;
 const storyParser=useMemo(()=>(value:unknown)=>{const result=parser.stories(value);return result&&(!artistId||result.items.every(item=>item.profile.artistId.toLowerCase()===artistId.toLowerCase()))?result:null;},[parser,artistId]);
 const result=useContent(path?`${path}?page=${page}&pageSize=6`:null,storyParser);
 const content=<section className={styles.ordersWorkspace} dir="rtl"><h1>روایت‌های هنرمندان</h1>{artistId&&isUuid(artistId)&&<Link href={"/customer/artist-store?id="+artistId}>فروشگاه هنرمند</Link>}<State {...result}/>{result.data?.items.length===0&&<p>هنوز روایتی منتشر نشده است.</p>}<div className={styles.grid}>{result.data?.items.map(story=><StoryCard story={story} key={story.id}/>)}</div>{result.data&&<Paging page={page} hasMore={result.data.hasMore} onPage={setPage}/>}</section>;
 return <ContentShell><CustomerArtistStoriesWeb content={content}/></ContentShell>;
}
export function CustomerStoryViewerLive({id}:{id:string}){
 const parser=useMemo(()=>(value:unknown)=>{const parsed=parsePublicStory(value);return parsed?.id.toLowerCase()===id.toLowerCase()?parsed:null;},[id]);
 const result=useContent(isUuid(id)?"/api/catalog/stories/"+id:null,parser);
 const content=<section className={styles.ordersWorkspace} dir="rtl"><Link href="/customer/artist-stories">بازگشت به روایت‌ها</Link><State {...result}/>{result.data&&<><article className={styles.storyHero}><h1>{result.data.title}</h1><p>{result.data.profile.displayName} · {formatPersianDate(result.data.publishedAt)}</p></article>{result.data.imageId&&<StoryImage id={result.data.id} imageId={result.data.imageId}/>}{result.data.videoId&&<StoryVideo id={result.data.id} videoId={result.data.videoId}/>}<p className={styles.storyText}>{result.data.body}</p><StoryProduct story={result.data}/><ArtistCard artist={result.data.profile}/></>}</section>;
 return <ContentShell><CustomerStoryViewerWeb content={content}/></ContentShell>;
}
