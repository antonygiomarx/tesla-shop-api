import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './repository/users.repository';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }

  async removeAll() {
    return await this.userRepository.removeAll();
  }

  async removeAllExceptAdmin(user: User) {
    return await this.userRepository.removeAllExceptAdmin(user);
  }

  async createMany(users: User[]) {
    return await this.userRepository.createMany(users);
  }
}
