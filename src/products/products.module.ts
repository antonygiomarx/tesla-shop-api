import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { HandleExceptionsService } from '../shared/handle-exceptions/handle-exceptions.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, HandleExceptionsService],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
