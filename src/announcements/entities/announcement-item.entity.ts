import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnouncementsEntity } from './announcements.entity';

@Entity()
export class AnnouncementItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '1000',
  })
  body: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  @ManyToOne(() => AnnouncementsEntity, (intention) => intention.announcements)
  @JoinColumn()
  announcement: AnnouncementsEntity;
}
