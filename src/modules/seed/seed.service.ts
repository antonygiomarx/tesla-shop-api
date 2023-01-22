import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { data } from './data/data';
import { User } from '../users/entities';
import { UsersService } from '../users/users.service';
import { HandleExceptionsService } from '../common/exceptions/handle-exceptions.service';
import { GetRandomUserUtil } from './utils/get-random-user.util';

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
      await this.userService.removeAllExceptAdmin(user);

      this.logger.log('Seed started');

      const users = await this.userService.createMany(data.users as User[]);

      const mappedProducts = data.products.map((product) => ({
        ...product,
        user: GetRandomUserUtil.getRandomUser(users),
      }));

      const [{ status: usersStatus }, { status: productsStatus }] =
        await Promise.allSettled([
          users,
          this.productsService.createMany(mappedProducts),
        ]);

      if (usersStatus === 'rejected' || productsStatus === 'rejected') {
        throw new Error('Error creating users or products');
      }

      this.logger.log('Seed completed');
    } catch (error) {
      this.handleException.handleDatabaseError(error, SeedService.name);
    }
  }
}
