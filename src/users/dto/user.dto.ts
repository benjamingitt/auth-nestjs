import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @MaxLength(21)
  @IsOptional()
  readonly name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  @IsOptional()
  readonly telephone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  readonly email?: string;
}
export class EmailUserDto {
  @ApiProperty({ description: 'email user' })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;
}
