import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { data } from './data/data';
import { User } from '../users/entities';
import { UsersService } from '../users/users.service';
import { HandleExceptionsService } from '../common/exceptions/handle-exceptions.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
    private readonly handleException: HandleExceptionsService,
  ) {}

  async run(user: User) {
    try {
      await this.productsService.removeAll();

      this.logger.log('Seed started');

      const mappedProducts = data.products.map((product) => ({
        ...product,
        user,
      }));

      await this.productsService.createMany(mappedProducts);

      this.logger.log('Seed completed');
    } catch (error) {
      this.handleException.handleDatabaseError(error, SeedService.name);
    }
  }
}
