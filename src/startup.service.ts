import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { Day } from './enums/day.enum';
import { IntentionsDayEntity } from './intentions/entities/intentions-day.entity';
import { AnnouncementsEntity } from './announcements/entities/announcements.entity';

@Injectable()
export class StartupService implements OnModuleInit {
  async onModuleInit() {
    // await this.checkDirExist();
    await this.createAdminAccount();
    await this.createIntentions();
    await this.createAnnouncement();
  }

  @Inject(forwardRef(() => ConfigService))
  private configService: ConfigService;
  @Inject(forwardRef(() => UserService))
  private userService: UserService;

  // private async checkDirExist() {
  //   const albumDir = this.configService.get('ALBUM_DIR');
  //   try {
  //     await stat(albumDir);
  //   } catch (e) {
  //     await mkdir(albumDir, { recursive: true });
  //   }
  // }

  private async createAdminAccount() {
    if (!UserEntity) return;
    const adminLogin = this.configService.get('ADMIN_LOGIN');
    const adminPassword = this.configService.get('ADMIN_PWD');
    if (await UserEntity.findOneBy({ email: adminLogin })) return;
    await this.userService.register({
      email: adminLogin,
      password: adminPassword,
    });
  }

  private async createIntentions() {
    if (!IntentionsDayEntity) return;
    const existDays = (
      await IntentionsDayEntity.find({
        select: {
          day: true,
        },
      })
    ).map(({ day }) => day);
    if (existDays.length >= 7) return;
    const requiredDays = Object.values(Day).map((el) => el);
    const missingDays = requiredDays.filter((el) => !existDays.includes(el));
    for (const missingDay of missingDays) {
      const newIntentionsDayEntity = new IntentionsDayEntity();
      newIntentionsDayEntity.day = missingDay;
      await newIntentionsDayEntity.save();
    }
  }
  private async createAnnouncement() {
    if (!AnnouncementsEntity) return;
    if ((await AnnouncementsEntity.find()).length !== 0) return;
    const newAnnouncementsEntity = new AnnouncementsEntity();
    newAnnouncementsEntity.title = 'baseTitle';
    newAnnouncementsEntity.subtitle = 'baseSubtitle';
    await newAnnouncementsEntity.save();
  }
}
