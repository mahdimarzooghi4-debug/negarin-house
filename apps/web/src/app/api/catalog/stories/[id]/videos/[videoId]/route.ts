import {NextResponse,type NextRequest} from "next/server";
import {isUuid} from "../../../../../../../server/negarin-api";
import {publicCatalogProxy} from "../../../../../../../server/public-catalog-proxy";
export async function GET(request:NextRequest,context:{params:Promise<{id:string;videoId:string}>}){
const {id,videoId}=await context.params;if(!isUuid(id)||!isUuid(videoId))return NextResponse.json({error:"invalid-id"},{status:400});
return publicCatalogProxy(`/api/v1/catalog/stories/${id}/videos/${videoId}`);
}
