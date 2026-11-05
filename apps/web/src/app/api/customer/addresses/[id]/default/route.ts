import {NextResponse,type NextRequest} from "next/server";
import {isUuid} from "../../../../../../server/negarin-api";
import {changeCustomerAddress} from "../../../../../../server/customer-address-proxy";
export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  if(!isUuid(id))return NextResponse.json({error:"invalid-id"},{status:400});
  return changeCustomerAddress(request,`/api/v1/customer/addresses/${id}/default`,"PUT");
}
