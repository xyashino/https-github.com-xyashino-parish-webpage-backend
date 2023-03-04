import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageEntity } from './image.entity';
import { AlbumTypeEntity } from './album-type.entity';

@Entity()
export class AlbumEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
    default: null,
  })
  subtitle?: string;

  @Column({
    nullable: true,
    default: null,
  })
  backgroundImage?: string;

  @OneToMany(() => ImageEntity, (image) => image.images, {
    cascade: true,
  })
  images: ImageEntity[];

  @ManyToOne(() => AlbumTypeEntity, (albumType) => albumType.albums, {
    nullable: true,
  })
  @JoinColumn()
  @JoinColumn()
  type: AlbumTypeEntity;
}
