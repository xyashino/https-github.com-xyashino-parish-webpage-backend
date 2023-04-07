import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AnnouncementsService } from '../announcements/announcements.service';
import { AnnouncementStatus } from '../enums/announcement-status.enum';

@Injectable()
export class TaskService {
  @Inject(forwardRef(() => AnnouncementsService))
  private announcementsService: AnnouncementsService;
  @Cron('0 1 * * 1', { timeZone: 'Europe/Warsaw', name: 'Announcement' })
  async changeAnnouncments() {
    const [activeAnnouncement] = await this.announcementsService.findMany(
      AnnouncementStatus.Active,
    );
    const [upcomingAnnouncement] = await this.announcementsService.findMany(
      AnnouncementStatus.Upcoming,
    );
    if (!upcomingAnnouncement || !activeAnnouncement) return;
    await this.announcementsService.clearStatus(AnnouncementStatus.Upcoming);
    await this.announcementsService.clearStatus(AnnouncementStatus.Active);
    activeAnnouncement.status = AnnouncementStatus.Upcoming;
    upcomingAnnouncement.status = AnnouncementStatus.Active;

    await activeAnnouncement.save();
    await upcomingAnnouncement.save();
    console.log('Status Changed');
  }
}
