import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeormConfigAsync } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentionsModule } from './intentions/intentions.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { UploadsModule } from './uploads/uploads.module';
import { AlbumsModule } from './albums/albums.module';
import { StartupService } from './startup.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeormConfigAsync),
    IntentionsModule,
    AuthModule,
    UserModule,
    AnnouncementsModule,
    UploadsModule,
    AlbumsModule,
  ],
  providers: [StartupService],
})
export class AppModule {}
