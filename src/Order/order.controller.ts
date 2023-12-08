import { Body, Controller, Get, Param, Res, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { log } from 'console';
import { Response } from 'express';
import { OrderService } from './order.service';
import { Order } from './order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guards';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {

  constructor
  (
    private orderService: OrderService 
  ) {}

  @Get()
  findAll(/*@Res() res: Response*/) 
  {
    console.log("HERE");
    
    return this.orderService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) 
  {
    return this.orderService.findOne(+id);
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto)
  {
    console.log("CREATE ORDERS");
    return await this.orderService.create(createOrderDto);      
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) 
  {
    return await this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) 
  {
    return await this.orderService.delete(+id);
  }


}