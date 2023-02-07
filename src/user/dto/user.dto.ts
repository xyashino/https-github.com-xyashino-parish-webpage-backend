import { Expose } from 'class-transformer';
import { UsersResponse } from '../../types/users/users-response.interface';

export class UserDto implements UsersResponse {
  @Expose()
  id: string;
  @Expose()
  email: string;
}
