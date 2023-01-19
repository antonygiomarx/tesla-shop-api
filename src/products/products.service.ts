import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptionsService } from '../shared/handle-exceptions/handle-exceptions.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly handleExceptionsService: HandleExceptionsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productsRepository.create(createProductDto);
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      this.handleExceptionsService.handleDatabaseError(
        error,
        ProductsService.name,
      );
    }
  }

  async findAll(paginationQuery: PaginationDto) {
    return await this.productsRepository.find({
      take: paginationQuery.limit || 10,
      skip: paginationQuery.offset || 0,
    });
  }

  async findOne(id: string) {
    let product: Product;

    if (isUUID(id)) {
      product = await this.productsRepository.findOne({
        where: {
          id,
        },
      });
    } else {
      const query = this.productsRepository.createQueryBuilder('product');

      product = await query
        .where('product.slug = :slug or product.name = :name', {
          slug: id,
          name: id,
        })
        .getOne();
    }

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    return await this.productsRepository.remove(product);
  }
}
