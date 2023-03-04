import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ConfigService } from '@nestjs/config';
import { AlbumsTypesService } from './albums-types.service';
import { AlbumsTypesController } from './albums-types.controller';

@Module({
  controllers: [AlbumsTypesController, AlbumsController],
  providers: [AlbumsService, ConfigService, AlbumsTypesService],
  exports: [AlbumsService, AlbumsTypesService],
})
export class AlbumsModule {}
