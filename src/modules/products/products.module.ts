import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';
import { HandleExceptionsService } from '../common/exceptions/handle-exceptions.service';
import { AuthModule } from '../auth/auth.module';
import { ProductsRepository } from './repository/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, HandleExceptionsService, ProductsRepository],
  imports: [TypeOrmModule.forFeature([Product, ProductImage]), AuthModule],
  exports: [ProductsService],
})
export class ProductsModule {}
