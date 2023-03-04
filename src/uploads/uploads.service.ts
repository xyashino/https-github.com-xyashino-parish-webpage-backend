import { Injectable } from '@nestjs/common';
import tinify from 'tinify';
import { ConfigService } from '@nestjs/config';
import { ImageEntity } from '../albums/entities/image.entity';
import { extname } from 'path';
import { AlbumsService } from '../albums/albums.service';
@Injectable()
export class UploadsService {
  constructor(
    private configService: ConfigService,
    private albumsService: AlbumsService,
  ) {
    tinify.key = this.configService.get('TINIFY_KEY');
  }

  async addFileToAlbum(file: Express.Multer.File, albumId) {
    const { buffer, originalname } = file;

    const foundAlbum = await this.albumsService.findOne(albumId);

    const newImage = new ImageEntity();
    newImage.extname = extname(originalname);
    newImage.oldName = originalname;
    newImage.images = foundAlbum;
    const { id, images, extname: imageExtname } = await newImage.save();
    newImage.url = `/${images.id}/${id}${imageExtname}`;
    await newImage.save();

    if (!foundAlbum.backgroundImage) {
      foundAlbum.backgroundImage = newImage.url;
      await foundAlbum.save();
    }

    const albumPath =
      this.configService.get('ALBUM_DIR') + `/${foundAlbum.id}/`;

    try {
      await this.optimizeAndFormatImg(
        buffer,
        albumPath,
        newImage.id + newImage.extname,
      );
    } catch (e) {
      return {
        status: 'error',
        message: 'File upload failed',
      };
    }

    return {
      status: 'success',
      message: 'File uploaded successfully',
    };
  }

  async optimizeAndFormatImg(buffer: string | Uint8Array, dest, name) {
    await tinify.fromBuffer(buffer).toFile(`${dest}${name}`);
  }
}
