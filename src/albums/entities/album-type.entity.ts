import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {AlbumEntity} from "./album.entity";

@Entity()
export class AlbumTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => AlbumEntity, (album) => album.type,{nullable:true})
  albums: AlbumEntity[];
}
