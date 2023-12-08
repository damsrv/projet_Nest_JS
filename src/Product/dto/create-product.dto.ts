import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto 
{    
    @IsString()
    name: string;
    price: number;
}