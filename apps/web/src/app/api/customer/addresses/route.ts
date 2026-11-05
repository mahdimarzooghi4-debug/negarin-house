import type {NextRequest} from "next/server";
import {authenticatedProxy} from "../../../../server/api-proxy";
import {changeCustomerAddress} from "../../../../server/customer-address-proxy";
export async function GET(request:NextRequest){return authenticatedProxy(request,"/api/v1/customer/addresses"+request.nextUrl.search);}
export async function POST(request:NextRequest){return changeCustomerAddress(request,"/api/v1/customer/addresses","POST");}
