import {NextResponse,type NextRequest} from "next/server";
import {authenticatedProxy} from "../../../../server/api-proxy";
function pageQuery(request:NextRequest):string|null {
  const params=request.nextUrl.searchParams;
  if([...params.keys()].some(key=>(key!=="page"&&key!=="pageSize")||params.getAll(key).length!==1))return null;
  const page=params.get("page")??"1",pageSize=params.get("pageSize")??"20";
  if(!/^[1-9][0-9]{0,5}$/.test(page)||!/^[1-9][0-9]{0,2}$/.test(pageSize))return null;
  const p=Number(page),s=Number(pageSize);
  if(!Number.isSafeInteger(p)||p>100000||!Number.isSafeInteger(s)||s>100)return null;
  return "?page="+p+"&pageSize="+s;
}
export async function GET(request:NextRequest){
  const query=pageQuery(request);
  if(query===null)return NextResponse.json({error:"invalid-query"},{status:400,headers:{"Cache-Control":"no-store"}});
  return authenticatedProxy(request,"/api/v1/artist/orders"+query);
}