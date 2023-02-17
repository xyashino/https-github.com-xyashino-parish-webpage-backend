import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from './album.entity';

@Entity()
export class ImageEntity extends BaseEntity {
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

  @ManyToOne(() => AlbumEntity, (album) => album.images)
  images: AlbumEntity;
}
