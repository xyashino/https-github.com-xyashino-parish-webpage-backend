import { UserEntity } from '../../../user/entities/user.entity';

export interface RegisterUserRequest {
  email: UserEntity['email'];
  password: string;
}
