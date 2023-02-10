import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { stat } from 'fs/promises';
import { mkdir } from 'node:fs/promises';
import { UserEntity } from './user/entities/user.entity';
import { UserService } from './user/user.service';

@Injectable()
export class StartupService implements OnModuleInit {
  async onModuleInit() {
    await this.checkDirExist();
    await this.createAdminAccount();
  }
  @Inject(forwardRef(() => ConfigService))
  public configService: ConfigService;
  @Inject(forwardRef(() => UserService))
  public userService: UserService;
  private async checkDirExist() {
    const albumDir = this.configService.get('ALBUM_DIR');
    try {
      await stat(albumDir);
    } catch (e) {
      await mkdir(albumDir, { recursive: true });
    }
  }

  private async createAdminAccount() {
    const adminLogin = this.configService.get('ADMIN_LOGIN');
    const adminPassword = this.configService.get('ADMIN_PWD');
    if (await UserEntity.findOneBy({ email: adminLogin })) return;

    await this.userService.register({
      email: adminLogin,
      password: adminPassword,
    });
  }
}
