import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Auth, CurrentUser } from '../auth/decorators';
import { Role } from '../auth/interfaces';
import { User } from '../users/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from '../docs/strategies/swagger.strategy';

@ApiTags(Tag.PRODUCTS)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @Post()
  @Auth()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User,
  ) {
    return this.productsService.create({ ...createProductDto, user });
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a list of products.',
  })
  @Get()
  @Auth()
  findAll(@Query() paginationQuery: PaginationDto) {
    return this.productsService.findAll(paginationQuery);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns a product.',
  })
  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.productsService.findOneAndReturnEntity(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: User,
  ) {
    return this.productsService.update(id, { ...updateProductDto, user });
  }

  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
