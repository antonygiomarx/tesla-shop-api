import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dtos';
import { Auth, CurrentUser } from './decorators';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from '../users/entities';

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
