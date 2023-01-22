import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

import { User } from '../../users/entities';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  slug: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({ required: false })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  sizes?: string[];

  @ApiProperty({ required: false })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  @IsOptional()
  gender?: string;

  @ApiProperty({
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsOptional()
  user?: User;
}
