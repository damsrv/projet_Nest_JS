import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import prisma from 'src/utils/db';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService 
{
    constructor(private prisma: PrismaService){}

    async findAll() 
    {
        console.log("GET ALL USERS");
        return this.prisma.user.findMany();
    }

    async findOne(id: number)
    {
      console.log("GET ONE USER");

      const user = await this.prisma.user.findUnique({where: {id}});

      return {
        statusCode: 200,
        data: user,
      };

    }

    async update(id: number, updateUserDto: UpdateUserDto) 
    {
      console.log("UPDATE USERS");

      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      
      const updateUser = await this.prisma.user.update({data: updateUserDto, where: {id}});

      return {
        statusCode: 200,
        data: updateUser,
      };
    }

    async delete(id: number) 
    {
      console.log("DELETE USERS");

      const deleteUser = 
        await this.prisma.user.delete({where: {id}});

      return {
        statusCode: 200,
        data: deleteUser,
        message:`Success delete ${id}`,
      };
    }
}