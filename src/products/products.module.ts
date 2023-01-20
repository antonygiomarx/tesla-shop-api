import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';
import { HandleExceptionsService } from '../shared/handle-exceptions/handle-exceptions.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, HandleExceptionsService],
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  exports: [ProductsService],
})
export class ProductsModule {}
