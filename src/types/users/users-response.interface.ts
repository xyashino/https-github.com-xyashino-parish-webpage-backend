import { User } from './user-entity.interface';

export interface UsersResponse {
  id: User['id'];
  email: User['email'];
}
