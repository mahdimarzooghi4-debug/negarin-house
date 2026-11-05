import {NextResponse,type NextRequest} from "next/server";
import {authenticatedProxy,jsonBody,rejectCrossOriginMutation} from "./api-proxy";

export async function changeCustomerAddress(request:NextRequest,path:string,method:"POST"|"PUT"|"DELETE") {
  const forbidden=rejectCrossOriginMutation(request);
  if(forbidden)return forbidden;
  const body=await jsonBody(request,16*1024);
  if(body===null)return NextResponse.json({error:"invalid-body"},{status:400});
  return authenticatedProxy(request,path,{method,body});
}
