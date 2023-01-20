import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptionsService } from '../shared/handle-exceptions/handle-exceptions.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { ProductImage } from './entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>,
    private readonly handleExceptionsService: HandleExceptionsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productData } = createProductDto;

      const product = this.productsRepository.create({
        ...productData,
        images: images.map((image) =>
          this.productImagesRepository.create({
            url: image,
          }),
        ),
      });

      await this.productsRepository.save(product);

      return {
        ...product,
        images,
      };
    } catch (error) {
      this.handleExceptionsService.handleDatabaseError(
        error,
        ProductsService.name,
      );
    }
  }

  async createMany(products: CreateProductDto[]) {
    const productsToSave = products.map((product) => {
      const { images = [], ...productData } = product;

      return this.productsRepository.create({
        ...productData,
        images: images.map((image) =>
          this.productImagesRepository.create({
            url: image,
          }),
        ),
      });
    });

    await this.productsRepository.save(productsToSave);

    return productsToSave;
  }

  async findAll(paginationQuery: PaginationDto) {
    const products = await this.productsRepository.find({
      take: paginationQuery.limit || 10,
      skip: paginationQuery.offset || 0,
      relations: ['images'],
    });

    return products.map(({ images, ...product }) => ({
      ...product,
      images: images.map((image) => image.url),
    }));
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
        .where('product.slug = :slug or LOWER(product.name) = LOWER(:name)', {
          slug: id,
          name: id,
        })
        .leftJoinAndSelect('product.images', 'images')
        .getOne();
    }

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async findOnePlain(id: string) {
    const { images = [], ...product } = await this.findOne(id);

    return {
      ...product,
      images: images.map((image) => image.url),
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...productData } = updateProductDto;

    const product = await this.productsRepository.preload({
      id,
      ...productData,
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    const queryRunner =
      this.productsRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(product);

      if (!images) {
        await queryRunner.commitTransaction();
        return this.findOnePlain(id);
      }

      await queryRunner.manager.delete(ProductImage, {
        product: {
          id,
        },
      });

      product.images = images.map((image) =>
        this.productImagesRepository.create({
          url: image,
          product,
        }),
      );

      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      await queryRunner.release();

      this.handleExceptionsService.handleDatabaseError(
        error,
        ProductsService.name,
      );
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    await this.productsRepository.remove(product);

    return {
      message: `Product ${id} deleted`,
    };
  }

  async removeAll() {
    await this.productsRepository.delete({});

    return {
      message: 'All products deleted',
    };
  }
}
