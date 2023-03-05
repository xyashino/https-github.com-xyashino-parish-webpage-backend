import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @Inject(forwardRef(() => ConfigService))
  public configService: ConfigService;

  async findAll(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }
  async findOne(userId: string): Promise<UserEntity> {
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
      +this.configService.get<number>('BCRYPT_SALT_ROUNDS'),
    );

    return await user.save();
  }
  async remove(id: string, admin: UserEntity) {
    const user = await UserEntity.findOneBy({ id });
    if (!user) throw new NotFoundException('Invalid id');
    if (
      user.email === this.configService.get('ADMIN_LOGIN') ||
      admin.id === user.id
    )
      throw new UnauthorizedException(`Can't remove this user.`);

    await user.remove();
  }
  getCurrentUser(user: UserEntity) {
    return user;
  }

  async updateCurrentUser(
    user: UserEntity,
    { password, newPassword, email }: UpdateUserDto,
  ) {
    if (!(await compare(password, user.hashedPassword)))
      throw new UnauthorizedException('Invalid credentials');

    if (email) {
      await this.checkConflictData(email);
      user.email = email ?? user.email;
    }
    if (newPassword) {
      user.hashedPassword = await hash(
        newPassword,
        this.configService.get('BCRYPT_SALT_ROUNDS'),
      );
    }

    return user.save();
  }

  private async checkConflictData(email: string): Promise<void> {
    const userExist: UserEntity = await UserEntity.findOneBy({ email });
    if (userExist) throw new ConflictException('Email is taken');
  }
}
