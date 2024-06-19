import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/comman';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{

  private readonly logger =new Logger('ProductService');
  onModuleInit() {
    this.$connect()
    this.logger.log('Database connected')
  }
  create(createProductDto: CreateProductDto) {
    
    return this.product.create({

      data: createProductDto,

    });

  }

  async findAll(PaginationDto:PaginationDto) {
const {page,limit }=PaginationDto;

const totalpages =await this.product.count({where:{available:true}})
const lastpage =Math.ceil(totalpages/limit)
    return this.product.findMany({  
      skip:(page -1)*limit,
      take: limit,
      where:{available:true}

     }
    )
    
    //return `This action returns all products`;
  }

  async findOne(id: number) {
    const product= await this.product.findFirst({
      where:{id,available:true}

    });
    if (!product ){
      throw new NotFoundException(`producto with id ${id} not found `)
    }
return product;
    
    //return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
  await this.findOne(id );
    return this.product.update({
where:{id},
data:updateProductDto,


  })
  }

async  remove(id: number) {

await this.findOne(id);
const product=await this.product.update({
where: {id},
data:{
  available :false
}

});
//return this.product.delete({
 // where:{id}
//})
  }
}
