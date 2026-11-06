import {NextResponse,type NextRequest} from "next/server";
import {authenticatedProxy,jsonBody,rejectCrossOriginMutation} from "../../../../../../server/api-proxy";
import {isUuid} from "../../../../../../server/negarin-api";
type Context={params:Promise<{id:string}>};
export async function GET(request:NextRequest,{params}:Context) {
  const {id}=await params;
  if(!isUuid(id))return NextResponse.json({error:"invalid-id"},{status:400});
  return authenticatedProxy(request,"/api/v1/artist/products/"+id);
}
export async function PATCH(request:NextRequest,{params}:Context) {
  const forbidden=rejectCrossOriginMutation(request);if(forbidden)return forbidden;
  const {id}=await params;
  if(!isUuid(id))return NextResponse.json({error:"invalid-id"},{status:400});
  const body=await jsonBody(request,24*1024);
  if(body===null)return NextResponse.json({error:"invalid-body"},{status:400});
  return authenticatedProxy(request,"/api/v1/artist/products/"+id,{method:"PATCH",body});
}
