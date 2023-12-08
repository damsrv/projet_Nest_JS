import { Body, Controller, Get, Param, Res, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { log } from 'console';
import { Response } from 'express';
import { ProductService } from './product.service';
import { Product } from './product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateOrderDto } from 'src/Order/dto/update-order.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guards';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {

  constructor
  (
    private productService: ProductService 
  ) {}

  @Get()
  findAll(/*@Res() res: Response*/) 
  {
    return this.productService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) 
  {
    return this.productService.findOne(+id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto)
  {
    return await this.productService.create(createProductDto);      
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) 
  {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) 
  {
    return await this.productService.delete(+id);
  }


}