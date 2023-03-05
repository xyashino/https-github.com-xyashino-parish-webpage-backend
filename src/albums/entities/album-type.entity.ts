import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from './album.entity';
import { AlbumType } from '../../types';

@Entity()
export class AlbumTypeEntity extends BaseEntity implements AlbumType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => AlbumEntity, (album) => album.type, { nullable: true })
  albums: AlbumEntity[];
}
