import {NextResponse,type NextRequest} from "next/server";
import {authenticatedProxy,jsonBody,rejectCrossOriginMutation} from "../../../../../server/api-proxy";

export async function GET(request:NextRequest) {
  const includeArchived=request.nextUrl.searchParams.get("includeArchived");
  if (request.nextUrl.searchParams.size>(includeArchived===null?0:1) ||
      (includeArchived!==null&&includeArchived!=="true"&&includeArchived!=="false")) {
    return NextResponse.json({error:"invalid-query"},{status:400,headers:{"Cache-Control":"no-store"}});
  }
  return authenticatedProxy(request,"/api/v1/artist/products"+(includeArchived===null?"":"?includeArchived="+includeArchived));
}

export async function POST(request:NextRequest) {
  const forbidden=rejectCrossOriginMutation(request);if(forbidden)return forbidden;
  const body=await jsonBody(request,24*1024);
  if(body===null)return NextResponse.json({error:"invalid-body"},{status:400,headers:{"Cache-Control":"no-store"}});
  return authenticatedProxy(request,"/api/v1/artist/products",{method:"POST",body});
}
