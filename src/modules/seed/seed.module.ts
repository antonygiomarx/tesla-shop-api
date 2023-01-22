import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { HandleExceptionsService } from '../common/exceptions/handle-exceptions.service';

@Module({
  imports: [ProductsModule, AuthModule, UsersModule],
  controllers: [SeedController],
  providers: [SeedService, HandleExceptionsService],
})
export class SeedModule {}
