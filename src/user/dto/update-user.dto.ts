import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UpdateUserRequest } from '../../types';

export class UpdateUserDto
  extends PartialType(RegisterUserDto)
  implements UpdateUserRequest
{
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(8, 256)
  password: string;

  @IsOptional()
  @IsString()
  @Length(8, 256)
  newPassword: string;
}
