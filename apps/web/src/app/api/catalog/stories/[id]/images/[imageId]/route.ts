import {NextResponse,type NextRequest} from "next/server";
import {isUuid} from "../../../../../../../server/negarin-api";
import {publicCatalogProxy} from "../../../../../../../server/public-catalog-proxy";
export async function GET(request:NextRequest,context:{params:Promise<{id:string;imageId:string}>}){
const {id,imageId}=await context.params;if(!isUuid(id)||!isUuid(imageId))return NextResponse.json({error:"invalid-id"},{status:400});
return publicCatalogProxy(`/api/v1/catalog/stories/${id}/images/${imageId}`);
}
