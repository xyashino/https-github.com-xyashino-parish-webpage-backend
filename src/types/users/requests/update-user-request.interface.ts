import { UserEntity } from '../../../user/entities/user.entity';

export interface UpdateUserRequest {
  email?: UserEntity['email'];
  newPassword?: string;
  password: string;
}
