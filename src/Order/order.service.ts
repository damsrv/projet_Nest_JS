import { Injectable } from '@nestjs/common';
import { Order } from './order.interface';
import prisma from 'src/utils/db';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';


@Injectable()
export class OrderService 
{
    constructor(private prisma: PrismaService){}

    async findAll() 
    {
        console.log("GET ALL ORDERS");
        return this.prisma.order.findMany();
    }

    async findOne(id: number)
    {
        console.log("GET ONE ORDERS");

        const order = await this.prisma.order.findFirst({where: {id}});
        
        return {
          statusCode: 200,
          data: order,
        };
    }

    async create(createOrderDto: CreateOrderDto)
    {
      console.log("CREATE ORDERS");

      let date: Date = new Date(createOrderDto.order_date);

      createOrderDto.order_date = date;

      createOrderDto.user_id = +createOrderDto.user_id; // transforme la string en int.

      return await this.prisma.order.create({
        data: createOrderDto,
      }); 
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) 
    {
        console.log("UPDATE ORDERS");

        let date: Date = new Date(updateOrderDto.order_date);

        updateOrderDto.order_date = date;
        
        const updateOrder = await this.prisma.order.update({data: updateOrderDto, where: {id}});

        return {
          statusCode: 200,
          data: updateOrder,
        };
    }

    async delete(id: number) 
    {
        console.log("DELETE ORDERS");
  
        const deletedOrder = await this.prisma.order.delete({where: {id}});

        return {
          statusCode: 200,
          data: deletedOrder,
          message:`Success delete ${id}`,
        };
      }
}