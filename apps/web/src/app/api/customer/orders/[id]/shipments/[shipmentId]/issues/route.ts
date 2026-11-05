import {NextResponse,type NextRequest} from "next/server";
import {authenticatedProxy,jsonBody,rejectCrossOriginMutation} from "../../../../../../../../server/api-proxy";
import {isUuid} from "../../../../../../../../server/negarin-api";
export async function POST(request:NextRequest,{params}:{params:Promise<{id:string;shipmentId:string}>}){
  const forbidden=rejectCrossOriginMutation(request);
  if(forbidden)return forbidden;
  const {id,shipmentId}=await params;
  if(!isUuid(id)||!isUuid(shipmentId))return NextResponse.json({error:"invalid-id"},{status:400});
  const body=await jsonBody(request,16*1024);
  if(body===null)return NextResponse.json({error:"invalid-body"},{status:400});
  return authenticatedProxy(request,`/api/v1/customer/orders/${id}/shipments/${shipmentId}/issues`,{method:"POST",body});
}
