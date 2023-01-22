import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, LoginDto } from './dtos';
import { HandleExceptionsService } from '../common/exceptions/handle-exceptions.service';
import { EncryptUtil } from './utils/encrypt.util';
import { JwtPayload } from './interfaces';
import { UsersMapper } from '../users/mappers/users.mapper';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly handleException: HandleExceptionsService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: LoginDto) {
    const { email, password } = user;

    const userFound = await this.userService.findByEmail(email);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await EncryptUtil.compare(
      password,
      userFound.password,
    );

    if (!passwordMatch) {
      throw new ForbiddenException('Password does not match');
    }

    this.logger.log(`User logged in: ${userFound.email}`);

    return {
      ...UsersMapper.map(userFound),
      token: await this.generateToken({ id: userFound.id }),
    };
  }

  async signup(user: CreateUserDto) {
    const userCreated = await this.userService.create(user);

    return {
      ...UsersMapper.map(userCreated),
      token: await this.generateToken({
        id: userCreated.id,
      }),
    };
  }

  private async generateToken(payload: JwtPayload) {
    this.logger.log(`Generating token for user: ${payload.id}`);

    return await this.jwtService.signAsync(payload);
  }
}
