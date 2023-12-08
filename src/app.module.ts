import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './Product/product.module';
import { UserController } from './User/user.controller';
import { OrderModule } from './Order/order.module';

@Module({
  imports: [UserModule, AuthModule, OrderModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
