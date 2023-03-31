import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnouncementItemEntity } from './announcement-item.entity';
import { Announcements } from '../../types';
import { AnnouncementStatus } from '../../enums/announcement-status.enum';

@Entity()
export class AnnouncementsEntity extends BaseEntity implements Announcements {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;
  @Column({
    type: 'enum',
    nullable: true,
    unique: true,
    default: null,
    enum: AnnouncementStatus,
  })
  status: AnnouncementStatus;

  @OneToMany(
    () => AnnouncementItemEntity,
    (intention) => intention.announcement,
    {
      cascade: true,
    },
  )
  announcements: AnnouncementItemEntity[];
}
