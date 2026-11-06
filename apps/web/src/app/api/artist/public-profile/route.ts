import {NextResponse,type NextRequest} from "next/server";
import {authenticatedProxy,jsonBody,rejectCrossOriginMutation} from "../../../../server/api-proxy";
export async function GET(request:NextRequest){return authenticatedProxy(request,"/api/v1/artist/public-profile");}
export async function PUT(request:NextRequest){
const forbidden=rejectCrossOriginMutation(request);if(forbidden)return forbidden;
const body=await jsonBody(request,16384);if(body===null)return NextResponse.json({error:"invalid-body"},{status:400});
return authenticatedProxy(request,"/api/v1/artist/public-profile",{method:"PUT",body});
}
