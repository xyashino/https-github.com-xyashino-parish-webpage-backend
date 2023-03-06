import { User } from '../user-entity.interface';

export interface UpdateUserRequest {
  email?: User['email'];
  newPassword?: string;
  password: string;
}
