import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dtos';
import { Auth, User } from './decorators';
import { Role } from './interfaces';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  create(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Get('authStatus')
  @Auth()
  async authStatus(@CurrentUser() user: User) {
    return this.authService.authStatus(user);
  }
}
