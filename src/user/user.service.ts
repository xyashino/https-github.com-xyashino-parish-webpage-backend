import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteUserDto } from './dto/delete-user.dto';
import { compare, hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  @Inject(forwardRef(() => ConfigService))
  public configService: ConfigService;

  async findAll(): Promise<any> {
    return await UserEntity.find();
  }
  async findOne(userId: string) {
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async register(body: RegisterUserDto): Promise<any> {
    const { email, password } = body;

    await this.checkConflictData(email);

    const user = new UserEntity();
    user.email = email;
    user.hashedPassword = await hash(
      password,
      +this.configService.get<number>('ROUNDS_SALT'),
    );

    return await user.save();
  }
  async remove(id: string, body: DeleteUserDto) {
    const user = await UserEntity.findOneBy({ id });
    if (!user || !(await compare(body.password, user.hashedPassword))) {
      throw new NotAcceptableException();
    }
    await user.remove();
  }

  getCurrentUser(user: UserEntity) {
    return user;
  }

  private async checkConflictData(email: string): Promise<void> {
    const userExist: UserEntity = await UserEntity.findOneBy({ email });
    if (userExist) throw new ConflictException('Email is taken');
  }
}
