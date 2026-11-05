import {BadRequestException,ConflictException,ForbiddenException,Injectable} from "@nestjs/common";
import type {AuthorizationContext} from "@negarin/authz";
import {PrismaService} from "./prisma.service.js";
import {parseCartCommand} from "./customer-cart.js";
export function parseProfileCommand(body:unknown){
  if(!body||typeof body!=="object"||Array.isArray(body))throw new BadRequestException();
  const raw=body as Record<string,unknown>;
  if(Object.keys(raw).some(key=>!["version","displayName"].includes(key))||typeof raw.displayName!=="string"||/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u.test(raw.displayName))throw new BadRequestException();
  const displayName=raw.displayName.trim();
  if(!displayName||displayName.length>100)throw new BadRequestException();
  return {version:parseCartCommand({version:raw.version}).version,displayName};
}
const select={version:true,displayName:true,user:{select:{phone:true}}} as const;
function view(p:{version:number;displayName:string;user:{phone:string}}){return {version:p.version,displayName:p.displayName,phone:p.user.phone};}
@Injectable()
export class CustomerProfileService {
 constructor(private readonly db:PrismaService){}
 private customer(context:AuthorizationContext){if(context.activeRole!=="customer")throw new ForbiddenException();}
 async get(context:AuthorizationContext){
  this.customer(context);
  await this.db.customerProfile.createMany({data:[{userId:context.userId}],skipDuplicates:true});
  return view(await this.db.customerProfile.findUniqueOrThrow({where:{userId:context.userId},select}));
 }
 async change(context:AuthorizationContext,input:ReturnType<typeof parseProfileCommand>){
  this.customer(context);
  return this.db.$transaction(async tx=>{
   await tx.customerProfile.createMany({data:[{userId:context.userId}],skipDuplicates:true});
   const changed=await tx.customerProfile.updateMany({where:{userId:context.userId,version:input.version},data:{displayName:input.displayName,version:{increment:1}}});
   if(changed.count!==1)throw new ConflictException("profile-state-changed");
   return view(await tx.customerProfile.findUniqueOrThrow({where:{userId:context.userId},select}));
  });
 }
}
