import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnouncementItemEntity } from './announcement-item.entity';
import { Announcements } from '../../types/announcement/announcements-entity.interface';

@Entity()
export class AnnouncementsEntity extends BaseEntity implements Announcements {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @OneToMany(
    (type) => AnnouncementItemEntity,
    (intention) => intention.announcement,
    {
      cascade: true,
    },
  )
  announcements: AnnouncementItemEntity[];
}
