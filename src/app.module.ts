import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeormConfigAsync } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentionsModule } from './intentions/intentions.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { ArticlesModule } from './articles/articles.module';
import { UploadsModule } from './uploads/uploads.module';
import { AlbumsModule } from './albums/albums.module';

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
    ArticlesModule,
    UploadsModule,
    AlbumsModule,
  ],
  // providers: [StartupService],
})
export class AppModule {}
