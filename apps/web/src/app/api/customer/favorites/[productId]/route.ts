import {NextResponse,type NextRequest} from "next/server";
import {authenticatedProxy,jsonBody,rejectCrossOriginMutation} from "../../../../../server/api-proxy";
import {isUuid} from "../../../../../server/negarin-api";
type Context={params:Promise<{productId:string}>};
async function change(request:NextRequest,{params}:Context,method:"PUT"|"DELETE"){
 const forbidden=rejectCrossOriginMutation(request);if(forbidden)return forbidden;
 const {productId}=await params;
 if(!isUuid(productId))return NextResponse.json({error:"invalid-id"},{status:400});
 const body=await jsonBody(request,4096);
 if(body===null)return NextResponse.json({error:"invalid-body"},{status:400});
 return authenticatedProxy(request,"/api/v1/customer/favorites/"+productId,{method,body});
}
export async function PUT(request:NextRequest,context:Context){return change(request,context,"PUT");}
export async function DELETE(request:NextRequest,context:Context){return change(request,context,"DELETE");}
