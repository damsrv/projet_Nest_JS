import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/User/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserService } from 'src/User/user.service';


@Controller('auth')
export class AuthController 
{
    constructor
    (
        private readonly authService: AuthService,
    )
    {}

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> 
    {
        const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;
        const result = await this.authService.create(createUserDto);   
        return result;
    }

    @Post('/login')
    login(@Body() { email, password }: LoginDto) 
    {
      console.log("HERE");
      
      return this.authService.login(email, password);
    }
    
}
