import { Body, Controller, Get, Param, Res, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { log } from 'console';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guards';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

  constructor
  (
    private userService: UserService 
  ) {}

  @Get()
  findAll(/*@Res() res: Response*/) 
  {
    return this.userService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) 
  {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) 
  {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) 
  {
    return await this.userService.delete(+id);
  }


}