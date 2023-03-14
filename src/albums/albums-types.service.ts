import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AlbumTypeEntity } from './entities/album-type.entity';
import { CreateAlbumTypeDto } from './dto/create-album-type.dto';
import { UpdateAlbumTypeDto } from './dto/update-album-type.dto';

@Injectable()
export class AlbumsTypesService {
  @Inject(forwardRef(() => ConfigService))
  private configService: ConfigService;
  async create({ name, order }: CreateAlbumTypeDto) {
    if (await AlbumTypeEntity.findOneBy({ name }))
      throw new ConflictException('Album type with this name exist');

    const newAlbumType = new AlbumTypeEntity();
    newAlbumType.name = name;
    if (order) {
      newAlbumType.order = order;
    }
    return newAlbumType.save();
  }
  async findOne(id: string) {
    const albumTypeEntity = await AlbumTypeEntity.findOne({
      where: { id },
      relations: { albums: true },
    });
    if (!albumTypeEntity) throw new NotFoundException('Album was not found');
    return albumTypeEntity;
  }

  findAll() {
    return AlbumTypeEntity.find({ order: { order: 'DESC' } });
  }
  async remove(id: string) {
    const albumTypeEntity = await this.findOne(id);
    await albumTypeEntity.remove();
  }
  async update(id: string, { name }: UpdateAlbumTypeDto) {
    const albumTypeEntity = await this.findOne(id);
    albumTypeEntity.name = name;
    return albumTypeEntity.save();
  }
}
