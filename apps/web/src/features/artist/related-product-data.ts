import {isUuid} from "../corporate-buyer/live-data";
export type RelatedProduct={id:string;title:string;priceToman:string;availability:"in_stock"|"out_of_stock"};
function record(value:unknown){return value!==null&&typeof value==="object"&&!Array.isArray(value)?value as Record<string,unknown>:null;}
export function parseRelatedProduct(value:unknown):RelatedProduct|null{
 const item=record(value);if(!item||!isUuid(item.id)||typeof item.title!=="string"||!item.title.trim()||typeof item.priceToman!=="string"||!/^(0|[1-9]\d{0,18})$/.test(item.priceToman)||BigInt(item.priceToman)>9223372036854775807n||!["in_stock","out_of_stock"].includes(String(item.availability)))return null;
 return {id:item.id,title:item.title,priceToman:item.priceToman,availability:item.availability as RelatedProduct["availability"]};
}
export function parseRelatedProductPage(value:unknown,page:number,pageSize:number){const data=record(value);if(!data||data.page!==page||data.pageSize!==pageSize||typeof data.hasMore!=="boolean"||!Array.isArray(data.items)||data.items.length>pageSize||(data.hasMore&&data.items.length!==pageSize))return null;const items=data.items.map(parseRelatedProduct);if(items.some(item=>!item))return null;const parsed=items as RelatedProduct[];if(new Set(parsed.map(item=>item.id.toLowerCase())).size!==parsed.length)return null;return {items:parsed,hasMore:data.hasMore};}
