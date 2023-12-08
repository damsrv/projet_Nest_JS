import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDto {
    
    @IsString()
    order_date: Date;
    user_id: number;

}