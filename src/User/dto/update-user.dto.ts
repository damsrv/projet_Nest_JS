import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
    
    @IsString()
    email: string;
    @IsString()
    firstname: string;
    @IsString()
    lastname:  string;
    @IsString()
    password: string;

}