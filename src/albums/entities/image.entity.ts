import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from './album.entity';
import { Image } from '../../types';

@Entity()
export class ImageEntity extends BaseEntity implements Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  oldName: string;

  @Column()
  extname: string;

  @Column({
    nullable: true,
    default: true,
  })
  url: string;

  @ManyToOne(() => AlbumEntity, (album) => album)
  images: AlbumEntity;
}
