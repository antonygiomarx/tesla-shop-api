import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '../../auth/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
  })
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  role?: Role[];

  @ApiProperty({
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedAt?: Date;
}
