import {NextResponse} from "next/server";
import {publicCatalogProxy} from "../../../../../server/public-catalog-proxy";
import {isUuid} from "../../../../../server/negarin-api";
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;if(!isUuid(id))return NextResponse.json({error:"invalid-id"},{status:400});return publicCatalogProxy(`/api/v1/catalog/stories/${id}`);}
