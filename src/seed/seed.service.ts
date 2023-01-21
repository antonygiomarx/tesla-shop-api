import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { data } from './data/data';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly productsService: ProductsService) {}

  async run() {
    await this.productsService.removeAll();

    await this.productsService.createMany(data.products);

    this.logger.log('Seed completed');
  }
}
