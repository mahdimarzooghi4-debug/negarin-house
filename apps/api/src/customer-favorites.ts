import {ConflictException,ForbiddenException,Injectable,NotFoundException} from "@nestjs/common";
import type {AuthorizationContext} from "@negarin/authz";
import type {Prisma} from "./generated/prisma/client.js";
import {PrismaService} from "./prisma.service.js";
const select={version:true,items:{orderBy:[{createdAt:"desc"},{productId:"asc"}],select:{productId:true,createdAt:true,product:{select:{id:true,title:true,category:true,priceToman:true,imageIds:true,stockQuantity:true,publicationStatus:true,archivedAt:true}}}}} satisfies Prisma.CustomerFavoritesSelect;
type Snapshot=Prisma.CustomerFavoritesGetPayload<{select:typeof select}>;
export function favoritesView(snapshot:Snapshot){
  return {version:snapshot.version,items:snapshot.items.map(item=>{
    const p=item.product;
    const visible=p.publicationStatus==="published"&&p.archivedAt===null;
    return {productId:item.productId,savedAt:item.createdAt.toISOString(),product:visible?{id:p.id,title:p.title,category:p.category,priceToman:p.priceToman.toString(),coverImageId:p.imageIds[0]??null,availability:p.stockQuantity>0?"in_stock":"out_of_stock"}:null};
  })};
}
@Injectable()
export class CustomerFavoritesService {
  constructor(private readonly db:PrismaService){}
  private customer(context:AuthorizationContext){if(context.activeRole!=="customer")throw new ForbiddenException();}
  private async snapshot(tx:Prisma.TransactionClient,userId:string){return favoritesView(await tx.customerFavorites.findUniqueOrThrow({where:{userId},select}));}
  async get(context:AuthorizationContext){
    this.customer(context);
    await this.db.customerFavorites.createMany({data:[{userId:context.userId}],skipDuplicates:true});
    return this.db.$transaction(tx=>this.snapshot(tx,context.userId),{isolationLevel:"RepeatableRead"});
  }
  async change(context:AuthorizationContext,version:number,productId:string,saved:boolean){
    this.customer(context);
    return this.db.$transaction(async tx=>{
      await tx.customerFavorites.createMany({data:[{userId:context.userId}],skipDuplicates:true});
      const locked=await tx.customerFavorites.updateMany({where:{userId:context.userId,version},data:{version:{increment:1}}});
      if(locked.count!==1)throw new ConflictException("favorites-state-changed");
      let changed=false;
      if(saved){
        const product=await tx.artistProduct.findFirst({where:{id:productId,publicationStatus:"published",archivedAt:null},select:{id:true}});
        if(!product)throw new NotFoundException();
        const existing=await tx.customerFavorite.findUnique({where:{userId_productId:{userId:context.userId,productId}}});
        if(!existing){
          if(await tx.customerFavorite.count({where:{userId:context.userId}})>=100)throw new ConflictException("favorites-limit");
          await tx.customerFavorite.create({data:{userId:context.userId,productId}});changed=true;
        }
      }else changed=(await tx.customerFavorite.deleteMany({where:{userId:context.userId,productId}})).count>0;
      if(!changed)await tx.customerFavorites.update({where:{userId:context.userId},data:{version}});
      return this.snapshot(tx,context.userId);
    });
  }
}
