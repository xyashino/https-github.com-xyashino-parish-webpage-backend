import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { RegisterUserRequest } from '../../types/users/requests/register-user-request.interface';

export class RegisterUserDto implements RegisterUserRequest {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 256)
  password: string;
}
