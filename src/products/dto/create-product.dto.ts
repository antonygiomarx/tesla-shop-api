import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  @IsOptional()
  gender: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];
}
