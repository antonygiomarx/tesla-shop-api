import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { User } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptionsService } from '../common/exceptions/handle-exceptions.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, HandleExceptionsService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, UsersRepository, TypeOrmModule],
})
export class UsersModule {}
