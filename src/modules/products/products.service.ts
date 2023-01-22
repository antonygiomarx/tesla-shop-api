import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './repository/products.repository';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(paginationQuery: PaginationDto) {
    return this.productsRepository.findAll(paginationQuery);
  }

  async findOneAndReturnEntity(id: string) {
    return this.productsRepository.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    return this.productsRepository.remove(id);
  }

  async create(createProductDto: CreateProductDto) {
    return this.productsRepository.create(createProductDto);
  }

  async createMany(products: CreateProductDto[]) {
    return this.productsRepository.createMany(products);
  }

  async removeAll() {
    return this.productsRepository.removeAll();
  }
}
