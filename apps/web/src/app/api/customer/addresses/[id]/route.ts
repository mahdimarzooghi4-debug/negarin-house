import {NextResponse,type NextRequest} from "next/server";
import {isUuid} from "../../../../../server/negarin-api";
import {changeCustomerAddress} from "../../../../../server/customer-address-proxy";
type Context={params:Promise<{id:string}>};
async function change(request:NextRequest,context:Context,method:"PUT"|"DELETE"){
  const {id}=await context.params;
  if(!isUuid(id))return NextResponse.json({error:"invalid-id"},{status:400});
  return changeCustomerAddress(request,`/api/v1/customer/addresses/${id}`,method);
}
export async function PUT(request:NextRequest,context:Context){return change(request,context,"PUT");}
export async function DELETE(request:NextRequest,context:Context){return change(request,context,"DELETE");}
