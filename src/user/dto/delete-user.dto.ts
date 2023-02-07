import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { DeleteUserRequest } from '../../types/users/requests/delete-user-request.interface';

export class DeleteUserDto
  extends PartialType(UpdateUserDto)
  implements DeleteUserRequest
{
  @IsNotEmpty()
  @IsString()
  @Length(8, 256)
  password: string;
}
