import { UserEntity } from '../../user/entities/user.entity';

export interface UsersResponse {
  id: UserEntity['id'];
  email: UserEntity['email'];
}
