import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageEntity } from './image.entity';

@Entity()
export class AlbumEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  type: string;
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
}
