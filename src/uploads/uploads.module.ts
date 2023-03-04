import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { AlbumsModule } from '../albums/albums.module';
import { AlbumsService } from '../albums/albums.service';

@Module({
  imports: [AlbumsModule],
  controllers: [UploadsController],
  providers: [UploadsService, AlbumsService],
})
export class UploadsModule {}
