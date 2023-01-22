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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from '../docs/strategies/swagger.strategy';

@ApiTags(Tag.AUTH)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @Post('signup')
  create(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @ApiResponse({
    status: 200,
    description: 'User authentication status, returns user if authenticated.',
  })
  @Get('authStatus')
  @Auth()
  async authStatus(@CurrentUser() user: User) {
    return this.authService.authStatus(user);
  }
}
