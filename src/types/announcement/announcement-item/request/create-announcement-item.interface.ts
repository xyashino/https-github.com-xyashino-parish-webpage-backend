import { AnnouncementsItem } from '../announcement-item-entity.interface';

export interface CreateAnnouncementItem {
  body: AnnouncementsItem['body'];
  order: AnnouncementsItem['order'];
}
