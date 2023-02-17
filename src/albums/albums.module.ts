import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, ConfigService],
})
export class AlbumsModule {}
