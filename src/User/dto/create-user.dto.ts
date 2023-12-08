import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    
    @IsString()
    email: string;
    @IsString()
    firstname: string;
    @IsString()
    lastname:  string;
    @IsString()
    password: string;

}