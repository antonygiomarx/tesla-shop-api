import { CreateUserDto, UpdateUserDto } from '../dto';
import { EncryptUtil } from '../../auth/utils/encrypt.util';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';
import { HandleExceptionsService } from '../../common/exceptions/handle-exceptions.service';
import { Logger, NotFoundException } from '@nestjs/common';

export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly handleException: HandleExceptionsService,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const password = await EncryptUtil.encrypt(user.password);

      const userEntity = this.userRepository.create({
        ...user,
        password,
        active: true,
      } as User);

      const userCreated = await this.userRepository.save(userEntity);

      this.logger.log(`User created: ${userCreated.email}`);

      return userCreated;
    } catch (error) {
      this.handleException.handleDatabaseError(error, UsersRepository.name);
    }
  }

  async findAll() {
    const users = await this.userRepository.find();

    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneAndReturnEntity(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByCriteria(criteria: FindOptionsWhere<User>) {
    return await this.userRepository.find({
      where: criteria,
    });
  }

  async update(id: string, user: UpdateUserDto) {
    const userFound = await this.findOne(id);

    return await this.userRepository.save({
      ...userFound,
      ...user,
    });
  }

  async remove(id: string) {
    const userFound = await this.findOneAndReturnEntity(id);

    return await this.userRepository.remove(userFound);
  }

  async removeAll() {
    return await this.userRepository.delete({});
  }

  async createMany(users: User[]) {
    const hashUsersPassword = users.map(async (user) => {
      const password = await EncryptUtil.encrypt(user.password);
      return { ...user, password };
    });

    const usersHashed = await Promise.all(hashUsersPassword);

    return await this.userRepository.save(usersHashed);
  }

  async removeAllExceptAdmin(user: User) {
    return await this.userRepository.delete({
      id: Not(user.id),
    });
  }
}
