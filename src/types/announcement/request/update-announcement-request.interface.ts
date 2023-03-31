import { Announcements } from '../announcements-entity.interface';

export interface UpdateAnnouncementRequest {
  title?: Announcements['title'];
  subtitle?: Announcements['subtitle'];
  announcements: Announcements['announcements'];

  status: Announcements['status'];
}
