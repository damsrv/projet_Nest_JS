import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import prisma from 'src/utils/db';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { UpdateOrderDto } from 'src/Order/dto/update-order.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService 
{
    constructor(private prisma: PrismaService){}

    async findAll() 
    {
        console.log("GET ALL PRODUCTS");
        return this.prisma.product.findMany();
    }

    async findOne(id: number)
    {
        console.log("GET ONE PRODUCT");

        const product = await this.prisma.product.findUnique({where: {id}});
        
        return {
          statusCode: 200,
          data: product,
        };

    }

    //OK 
    async create(createProductDto: CreateProductDto)
    {
      console.log("CREATE PRODUCT");

      createProductDto.price = +createProductDto.price; 

      return await this.prisma.product.create({
        data: createProductDto,
      }); 
    }

    //OK
    async update(id: number, updateProductDto: UpdateProductDto) 
    {
      console.log("UPDATE PRODUCT");
      
      const updateProduct = await this.prisma.product.update({data: updateProductDto, where: {id}});

      return {
        statusCode: 200,
        data: updateProduct,
      };
    }
    //OK
    async delete(id: number) 
    {
      console.log("DELETE PRODUCT");

      const deletedProduct = await this.prisma.product.delete({where: {id}});

      return {
        statusCode: 200,
        data: deletedProduct,
        message:`Success delete ${id}`,
      };
    }
}