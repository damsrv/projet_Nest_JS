import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/User/dto/create-user.dto';
import { User } from 'src/User/user.interface';
import * as bcrypt from 'bcrypt';

  @Injectable()
  export class AuthService 
  {
    constructor
    (
      private prisma: PrismaService, 
      private jwtService: JwtService
    ) {}
  
    async login(email: string, password: string): Promise<{ accessToken: string }> 
    {
      const user = await this.prisma.user.findUnique({ where: { email: email } });
  
      if (!user) 
      {
        throw new NotFoundException(`No user found for email: ${email}`);
      }
      
      console.log(email + " " + password + " " + user.password );
  
      //const hashedPassword: string = await bcrypt.hash(password, 10);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      console.log(isPasswordValid);
      
      if (!isPasswordValid) 
      {
        throw new UnauthorizedException('mot de passe non valides');
      }

      return { accessToken: this.jwtService.sign({ userId: user.id })};
    }

    async create(createUserDto: CreateUserDto): Promise<User> 
    {
        console.log("CREATE USERS WITH HASH PASSWORD");
        
        console.log(createUserDto);

        return await this.prisma.user.create({
          data: createUserDto,
        }); 
    }




  }