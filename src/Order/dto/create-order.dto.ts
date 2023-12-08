import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto 
{    
    
    @IsString()
    order_date: Date;
    user_id: number;

}