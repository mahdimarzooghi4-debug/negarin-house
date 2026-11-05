import {isUuid,parseProductPage} from "../corporate-buyer/live-data";
export type PublicArtist={artistId:string;displayName:string;biography:string;craft:string;city:string};
export type PublicStory={id:string;title:string;body:string;publishedAt:string;profile:PublicArtist};
export type ContentPage<T>={page:number;pageSize:number;hasMore:boolean;items:T[]};
function record(v:unknown){return v!==null&&typeof v==="object"&&!Array.isArray(v)?v as Record<string,unknown>:null;}
export function parsePublicArtist(value:unknown):PublicArtist|null{
 const p=record(value),keys=["artistId","displayName","biography","craft","city"];
 if(!p||Object.keys(p).some(k=>!keys.includes(k))||!isUuid(p.artistId))return null;
 for(const key of keys.slice(1)){if(typeof p[key]!=="string"||!String(p[key]).trim()||String(p[key]).length>(key==="biography"?2000:100))return null;}
 return {artistId:p.artistId,displayName:p.displayName as string,biography:p.biography as string,craft:p.craft as string,city:p.city as string};
}
export function parsePublicStory(value:unknown):PublicStory|null{
 const s=record(value);if(!s||!isUuid(s.id)||typeof s.title!=="string"||!s.title.trim()||s.title.length>200||typeof s.body!=="string"||!s.body.trim()||s.body.length>10000||typeof s.publishedAt!=="string")return null;
 const date=new Date(s.publishedAt);if(!Number.isFinite(date.getTime())||date.toISOString()!==s.publishedAt)return null;
 const profile=parsePublicArtist(s.profile);return profile?{id:s.id,title:s.title,body:s.body,publishedAt:s.publishedAt,profile}:null;
}
function parsePage<T>(value:unknown,page:number,size:number,parse:(item:unknown)=>T|null,key:(item:T)=>string):ContentPage<T>|null{
 const p=record(value);if(!p||p.page!==page||p.pageSize!==size||typeof p.hasMore!=="boolean"||!Array.isArray(p.items)||p.items.length>size||(p.hasMore&&p.items.length!==size))return null;
 const items=p.items.map(parse);if(items.some(item=>item===null))return null;
 const parsed=items as T[];if(new Set(parsed.map(item=>key(item).toLowerCase())).size!==parsed.length)return null;
 return {page,pageSize:size,hasMore:p.hasMore,items:parsed};
}
export function parseArtistPage(value:unknown,page:number,size:number){return parsePage(value,page,size,parsePublicArtist,item=>item.artistId);}
export function parseStoryPage(value:unknown,page:number,size:number){return parsePage(value,page,size,parsePublicStory,item=>item.id);}
export function parseArtistProducts(value:unknown,page:number,size:number){return parseProductPage(value,{page,pageSize:size});}
