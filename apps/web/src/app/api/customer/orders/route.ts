import {NextResponse,type NextRequest} from "next/server";
import {authenticatedProxy,jsonBody,rejectCrossOriginMutation} from "../../../../server/api-proxy";

export async function POST(request:NextRequest){
  const forbidden=rejectCrossOriginMutation(request);
  if(forbidden)return forbidden;
  const body=await jsonBody(request,4096);
  if(body===null)return NextResponse.json({error:"invalid-body"},{status:400,headers:{"Cache-Control":"no-store"}});
  return authenticatedProxy(request,"/api/v1/customer/orders",{method:"POST",body});
}

export async function GET(request:NextRequest){return authenticatedProxy(request,"/api/v1/customer/orders"+request.nextUrl.search);}
