import { User } from '../user-entity.interface';

export interface RegisterUserRequest {
  email: User['email'];
  password: string;
}
