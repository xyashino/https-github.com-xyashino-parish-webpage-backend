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

  @Column({
    type: 'tinyint',
    default: -1,
  })
  order: number;

  @OneToMany(() => AlbumEntity, (album) => album.type, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  albums: AlbumEntity[];
}
