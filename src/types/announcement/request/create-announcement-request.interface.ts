import { Announcements } from '../announcements-entity.interface';
import { CreateAnnouncementItem } from '../announcement-item';

export interface CreateAnnouncementRequest {
  title: Announcements['title'];
  subtitle: Announcements['subtitle'];
  announcements: CreateAnnouncementItem[];
  status?: Announcements['status'];
}
