import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from '../docs/strategies/swagger.strategy';

@ApiTags(Tag.USERS)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a list of users.',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a user.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
