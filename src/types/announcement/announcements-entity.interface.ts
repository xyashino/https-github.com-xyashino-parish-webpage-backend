import { AnnouncementsItem } from './announcement-item';
import { AnnouncementStatus } from '../../enums/announcement-status.enum';

export interface Announcements {
  id: string;
  title: string;
  subtitle: string;
  status?: AnnouncementStatus;
  announcements: AnnouncementsItem[];
}

export interface AnnouncementsResponse extends Announcements {}
