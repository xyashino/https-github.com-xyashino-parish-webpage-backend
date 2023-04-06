import { AnnouncementsItem } from './announcement-item';

export interface Announcements {
  id: string;
  title: string;
  subtitle: string;
  status: 'ACTIVE' | 'UPCOMING' | null;
  announcements: AnnouncementsItem[];
}

export interface AnnouncementsResponse extends Announcements {}
