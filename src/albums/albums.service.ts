import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { mkdir, rm, unlink } from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import { AlbumEntity } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ImageEntity } from './entities/image.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsTypesService } from './albums-types.service';
import { clearEntities } from '../utils/clearEntities';

@Injectable()
export class AlbumsService {
  @Inject(forwardRef(() => ConfigService))
  private configService: ConfigService;
  @Inject(forwardRef(() => AlbumsTypesService))
  private albumsTypeService: AlbumsTypesService;

  async create({ type, ...restAlbum }: CreateAlbumDto) {
    const albumDirPath = this.configService.get('ALBUM_DIR');
    const newAlbum = new AlbumEntity();
    applyDataToEntity(newAlbum, restAlbum);
    type && (newAlbum.type = await this.albumsTypeService.findOne(type));

    const { id } = await newAlbum.save();
    await mkdir(`${albumDirPath}/${id}`);

    return newAlbum;
  }

  findAll() {
    return AlbumEntity.find({ relations: { type: true } });
  }

  async findOne(id: string) {
    const albumEntity = await AlbumEntity.findOne({
      where: { id },
      relations: {
        images: true,
        type: true,
      },
    });
    if (!albumEntity) throw new NotFoundException('Directory was not found');
    return albumEntity;
  }
  async remove(id: string) {
    const albumEntity = await this.findOne(id);
    await clearEntities(albumEntity.images);

    await this.removeRecursiveDir(albumEntity.id);
    await albumEntity.remove();
    return {
      type: 'success',
      message: 'Directory was successfully removed.',
    };
  }
  async update(
    id: string,
    { backgroundImage, type, ...restOfAlbumDto }: UpdateAlbumDto,
  ) {
    const albumEntity = await this.findOne(id);

    if (backgroundImage) {
      const image = await ImageEntity.findOneBy({ url: backgroundImage });
      if (!image) throw new UnprocessableEntityException();
      albumEntity.backgroundImage = backgroundImage;
    }
    type && (albumEntity.type = await this.albumsTypeService.findOne(type));
    applyDataToEntity(albumEntity, restOfAlbumDto);
    return albumEntity.save();
  }

  async removeImage(id: string) {
    const foundImage = await ImageEntity.findOneBy({ id });
    if (!foundImage) throw new NotFoundException('Image was not found');
    const albumDir = this.configService.get('ALBUM_DIR');
    try {
      await unlink(`${albumDir}${foundImage.url}`);
    } catch ({ message }) {
      throw new ConflictException(`File can't be deleted  \n ${message}`);
    }

    await foundImage.remove();
    return {
      status: 'success',
      message: 'File was successfully removed.',
    };
  }

  private async removeRecursiveDir(name: string) {
    const albumDir = this.configService.get('ALBUM_DIR');
    const dirPath = `${albumDir}/${name}`;
    try {
      await rm(dirPath, { recursive: true });
    } catch ({ message }) {
      throw new ConflictException(`Directory can't be deleted  \n ${message}`);
    }
  }
}
