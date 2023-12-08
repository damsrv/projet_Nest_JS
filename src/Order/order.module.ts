import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Global()
@Module
(
    {
        imports: [PrismaModule],
        controllers: [OrderController],
        providers: [OrderService],
        exports: [OrderService],
    }
)

export class OrderModule {}
