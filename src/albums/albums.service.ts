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

@Injectable()
export class AlbumsService {
  @Inject(forwardRef(() => ConfigService))
  private configService: ConfigService;

  async create({ type, title, subtitle }: CreateAlbumDto) {
    const albumDirPath = this.configService.get('ALBUM_DIR');
    const newAlbum = new AlbumEntity();

    newAlbum.type = type;
    newAlbum.title = title;
    newAlbum.subtitle = subtitle;

    const { id } = await newAlbum.save();
    await mkdir(`${albumDirPath}/${id}`);

    return newAlbum;
  }

  findAll() {
    return AlbumEntity.find();
  }

  async findOne(id: string) {
    const albumEntity = await AlbumEntity.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });
    if (!albumEntity) throw new NotFoundException('Directory was not found');
    return albumEntity;
  }
  async remove(id: string) {
    const albumEntity = await AlbumEntity.findOneBy({ id });
    if (!albumEntity) throw new NotFoundException('Directory was not found');
    await this.removeRecursiveDir(albumEntity.id);
    await albumEntity.remove();
    return {
      type: 'success',
      message: 'Directory was successfully removed.',
    };
  }

  // @TODO this is good?
  async getTypes() {
    const types = (await AlbumEntity.query(
      'SELECT type FROM album_entity WHERE 1 GROUP BY type;',
    )) as { type: AlbumEntity['type'] }[];
    return types.map((el) => el.type);
  }
  async update(
    id: string,
    { backgroundImage, ...restOfAlbumDto }: UpdateAlbumDto,
  ) {
    const albumEntity = await AlbumEntity.findOneBy({ id });
    if (!albumEntity) throw new NotFoundException('Album was not found');

    if (backgroundImage) {
      const image = await ImageEntity.findOneBy({ url: backgroundImage });
      if (!image) throw new UnprocessableEntityException();
      albumEntity.backgroundImage = backgroundImage;
    }

    for (const [key, value] of Object.keys(restOfAlbumDto)) {
      albumEntity[key] = value;
    }
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
