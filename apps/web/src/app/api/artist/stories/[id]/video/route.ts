import {NextResponse,type NextRequest} from "next/server";
import {isUuid} from "../../../../../../server/negarin-api";
import {authenticatedProxy,jsonBody,rejectCrossOriginMutation} from "../../../../../../server/api-proxy";
export async function POST(request:NextRequest,context:{params:Promise<{id:string}>}){
const forbidden=rejectCrossOriginMutation(request);if(forbidden)return forbidden;
const {id}=await context.params;if(!isUuid(id))return NextResponse.json({error:"invalid-id"},{status:400});
const body=await jsonBody(request,7*1024*1024);if(body===null)return NextResponse.json({error:"invalid-body"},{status:400});
return authenticatedProxy(request,`/api/v1/artist/stories/${id}/video`,{method:"POST",body});
}
export async function DELETE(request:NextRequest,context:{params:Promise<{id:string}>}){
const forbidden=rejectCrossOriginMutation(request);if(forbidden)return forbidden;
const {id}=await context.params;if(!isUuid(id))return NextResponse.json({error:"invalid-id"},{status:400});
const body=await jsonBody(request,4096);if(body===null)return NextResponse.json({error:"invalid-body"},{status:400});
return authenticatedProxy(request,`/api/v1/artist/stories/${id}/video`,{method:"DELETE",body});
}
