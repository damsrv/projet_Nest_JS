import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Global()
@Module
(
    {
        imports: [PrismaModule],
        controllers: [ProductController],
        providers: [ProductService],
        exports: [ProductService],
    }
)

export class ProductModule {}
