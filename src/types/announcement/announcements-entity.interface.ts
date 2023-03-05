import { AnnouncementsItem } from './announcement-item';

export interface Announcements {
  id: string;
  title: string;
  subtitle: string;

  announcements: AnnouncementsItem[];
}

export interface AnnouncementsResponse extends Announcements {}
